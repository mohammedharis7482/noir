import { gsap, ScrollTrigger, SplitText } from "@/lib/gsap";
import { ease, scrub } from "@/lib/motion";

/*
 * The pieces every entrance and statement shares (MOTION.md §2.5 and §4):
 * masked line splits, play-once entrances and scrubbed timelines. Each one
 * ends exactly at the static page (MOTION.md §0).
 */

/** Every Phase 4 timeline writes its tweens' start values as soon as they
 *  are created. GSAP otherwise defers them to its next tick when it hasn't
 *  rendered yet in the current frame, and until then new lines sit visible
 *  in place (MOTION.md §0). */
const writeAtOnce = { lazy: false } as const;

/** Text whose entrance has played, or never had to because the reader had
 *  already passed it: it stays at rest while it is mounted, even when a
 *  resize across 1024px rebuilds its section's motion. */
const atRest = new WeakSet<Element>();

/**
 * Splits text into lines, each inside a mask that clips its top and bottom
 * edges (MOTION.md §2.5). autoSplit splits again when the fonts arrive or
 * the width changes, and the animation onSplit returns carries its
 * progress over to the new lines.
 *
 * The masks are hidden from assistive technology, and each split element
 * holds one visually hidden copy of its text, so it still reads as one
 * sentence. SplitText's own aria-label isn't allowed on a paragraph, and
 * screen readers that ignore it there would read nothing. Reverting the
 * split restores the original markup, copy included.
 */
export function splitLines(
  targets: Element | Element[],
  onSplit: (split: SplitText) => gsap.core.Animation,
): SplitText {
  return SplitText.create(targets, {
    type: "lines",
    mask: "lines",
    linesClass: "reveal-line",
    autoSplit: true,
    aria: "none",
    onSplit: (split) => {
      for (const mask of split.masks) {
        mask.setAttribute("aria-hidden", "true");
        // Lines rise from below, so a mask clips only top and bottom.
        // SplitText clips every side, which would cut the antialiased edge
        // of a glyph that starts or ends a line at the text's own edge.
        (mask as HTMLElement).style.overflow = "visible clip";
      }
      for (const element of split.elements) {
        // Not selectable, so copying the statement doesn't copy it twice.
        const copy = document.createElement("span");
        copy.className = "sr-only select-none";
        copy.textContent = (element.textContent ?? "").replace(/\s+/g, " ").trim();
        element.prepend(copy);
      }
      return onSplit(split);
    },
  });
}

/**
 * Repaints a section once its motion has come to rest. When text returns
 * from its own layer (a split line, a fading caption), Chrome repaints only
 * the text's ink, but an antialiased edge can reach a pixel beyond it, and
 * that pixel keeps what was painted there while the text was hidden. A
 * transparent outline for one frame repaints the whole section, so its
 * pixels match the static page (MOTION.md §0).
 */
export function repaint(section: HTMLElement): void {
  section.style.outline = "1px solid transparent";
  requestAnimationFrame(() =>
    requestAnimationFrame(() => section.style.removeProperty("outline")),
  );
}

type EntranceOptions = {
  /** The text the entrance reveals, split into masked lines. */
  text: Element | Element[];
  /** What starts it: the section, or the text itself. */
  trigger: Element;
  start: string;
  refreshPriority: number;
  /** Adds the entrance's tweens to its timeline. Their fromTo start values,
   *  the hidden state, render at once, while the text is still off screen. */
  build: (timeline: gsap.core.Timeline, split: SplitText) => void;
  /** The entrance's section. Keyboard focus moving into it finishes the
   *  entrance at once, so focus never lands on something hidden. */
  section: HTMLElement;
};

/**
 * An entrance that plays once (MOTION.md §4). If its text is already on
 * screen or above it when the motion starts (a reload halfway down the
 * page), it stays at rest and never plays. Otherwise it plays when its
 * trigger enters and, at the end, reverts the split and every inline style,
 * so it rests exactly as the static page. Returns the cleanup for
 * gsap.matchMedia().
 */
export function playOnce({
  text,
  trigger,
  start,
  refreshPriority,
  build,
  section,
}: EntranceOptions): () => void {
  const first = Array.isArray(text) ? text[0] : text;
  if (atRest.has(first) || first.getBoundingClientRect().top < window.innerHeight) {
    atRest.add(first);
    return () => {};
  }

  let entered = false;
  let done = false;
  let timeline: gsap.core.Timeline | undefined;
  const split = splitLines(text, (self) => {
    timeline = gsap.timeline({ paused: !entered, defaults: writeAtOnce, onComplete: finish });
    build(timeline, self);
    return timeline;
  });
  const enter = ScrollTrigger.create({
    trigger,
    start,
    refreshPriority,
    onEnter: () => {
      entered = true;
      timeline?.play();
    },
  });
  const complete = () => {
    timeline?.progress(1);
    finish();
  };
  section.addEventListener("focusin", complete);

  function finish() {
    if (done) return;
    done = true;
    atRest.add(first);
    section.removeEventListener("focusin", complete);
    enter.kill();
    split.revert();
    repaint(section);
  }

  return () => section.removeEventListener("focusin", complete);
}

type ScrubOptions = ScrollTrigger.Vars & {
  /** Adds the tweens, whose start states render at once. Positions and
   *  durations are shares of the scroll range: the timeline lasts 1. */
  build: (timeline: gsap.core.Timeline) => void;
  /** Clears the inline styles the tweens leave at the end, so the end
   *  renders exactly as the static page (MOTION.md §0). */
  rest?: () => void;
  /** The section to repaint once it has come to rest (see repaint()). */
  section?: HTMLElement;
  /** Hears where every refresh left the timeline. */
  onJump?: (progress: number) => void;
};

/**
 * A scrubbed timeline (MOTION.md §2.2). Every refresh jumps it straight to
 * where the scroll is, the first one included, which runs as soon as it is
 * built: a reload halfway down the page shows the sections already passed
 * at rest, with no frame of their hidden state and no replay, and a resize
 * never scrubs through. Whenever it reaches its end, `rest` runs.
 */
export function scrubTimeline({ build, rest, section, onJump, ...vars }: ScrubOptions): gsap.core.Timeline {
  const atEnd = rest && (() => {
    rest();
    if (section) repaint(section);
  });
  const timeline = gsap.timeline({
    defaults: { ease: ease.linear, ...writeAtOnce },
    onComplete: atEnd,
    scrollTrigger: {
      ...vars,
      scrub,
      onRefresh: (self) => {
        const progress = gsap.utils.clamp(0, 1, (self.scroll() - self.start) / (self.end - self.start));
        self.getTween()?.progress(1);
        self.animation?.progress(progress, true);
        if (progress === 1) atEnd?.();
        onJump?.(progress);
      },
    },
  });
  build(timeline);
  timeline.scrollTrigger?.refresh();
  return timeline;
}

/** One column of a page grid plus its gutter, measured (MOTION.md §4.3). */
export function columnStep(grid: Element): number {
  const style = getComputedStyle(grid);
  return parseFloat(style.gridTemplateColumns) + parseFloat(style.columnGap);
}
