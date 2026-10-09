import { placeReader } from "@/components/motion/SmoothScroll";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { ease, media, refreshPriority, selectedWork } from "@/lib/motion";
import { repaint, scrubTimeline, splitLines } from "@/lib/reveal";
import { addTurns, photosOf, stagesOf, titleLines, type Stage } from "./pageTurnStages";
import { pageTurnState } from "./pageTurnState";

/*
 * The pinned page-turn of Selected work on desktop (MOTION.md §5.1–5.5).
 * The five static stages, stacked into one stage, take turns
 * (pageTurnStages.ts); at each rest point the series on the stage renders
 * exactly as its static stage.
 */

type PageTurnOptions = {
  /** The trigger: it keeps the static stages' height. */
  story: HTMLElement;
  /** What pins: the stages, stacked. */
  stack: HTMLElement;
  /** Scrolls to y, Lenis when it runs, and calls back on arrival. */
  travel: (y: number, onArrive: () => void) => void;
};

/**
 * Builds the page-turn inside a gsap.matchMedia() branch and returns its
 * cleanup, or nothing if the stages aren't all there (the static stages
 * then stay as they are).
 */
export function buildPageTurn({ story, stack, travel }: PageTurnOptions): (() => void) | undefined {
  const series = stagesOf(stack);
  if (!series) return;
  const last = series.length - 1;
  const { restTolerance } = selectedWork;
  const desktop = () => window.matchMedia(media.desktop).matches;
  // The series a time on the timeline shows, as the index does: its active
  // row switches halfway through each transition.
  const seriesAt = (time: number) => gsap.utils.clamp(0, last, Math.floor(time + 1 - selectedWork.transition.index));

  // At a rest point the series on the stage renders as its static stage:
  // its layers lose every inline style the tweens left (an identity
  // transform still changes how Chrome renders), the images lose
  // will-change, and the stage repaints (MOTION.md §0).
  const inners = series.flatMap((stage) => photosOf(stage).map(({ inner }) => inner));
  let page: gsap.core.Timeline | undefined;
  let live = true;
  let resting: number | null = null;
  const clearRest = (stage: Stage) => {
    const photos = photosOf(stage);
    gsap.set(photos.map(({ frame }) => frame), { clearProps: "clipPath" });
    gsap.set([...photos.map(({ inner }) => inner), stage.digits, ...stage.title.querySelectorAll(".reveal-line")], {
      clearProps: "transform",
    });
    gsap.set(stage.details, { clearProps: "opacity" });
  };
  // GSAP reverts the timeline before this branch's cleanup runs: nothing
  // here may follow it once the desktop layout has gone.
  const settle = (force = false) => {
    if (!page || !live || !desktop()) return;
    const time = page.time();
    pageTurnState.setActive(seriesAt(time));
    const nearest = Math.round(time);
    const rest = Math.abs(time - nearest) <= restTolerance ? nearest : null;
    if (rest !== null) clearRest(series[rest]);
    if (rest === resting && !force) return;
    resting = rest;
    gsap.set(inners, rest === null ? { willChange: "transform" } : { clearProps: "willChange" });
    if (rest === null) return;
    // ScrollTrigger places the pinned stack with a translate, an identity
    // one while it waits at the pin's start or stays fixed, and that too
    // shifts a row of a photograph's pixels. It writes it again whenever
    // it next moves the stack.
    if (gsap.getProperty(stack, "y") === 0) gsap.set(stack, { clearProps: "transform" });
    repaint(stack);
  };

  // MOTION.md §5.4: the stage snaps to the next rest point in the
  // direction the reader scrolled, only once they have scrolled. Every
  // refresh (a reload, the fonts, a resize) restarts ScrollTrigger's snap,
  // and a reload halfway through a transition must keep the state the reader
  // left; a snap started before ScrollTrigger's start-up has settled also
  // makes the scrub replay from where it was.
  const toRestPoint = ScrollTrigger.snapDirectional([...selectedWork.snap.points]);
  let refreshedAt: number | null = null;
  const snapTo = (progress: number, self?: ScrollTrigger) =>
    !self || self.scroll() === refreshedAt ? progress : toRestPoint(progress, self.direction);

  // The series the reader is on, or null off the stage, for a resize across
  // 1024px (MOTION.md §10.4). Read from the scroll position, on every
  // scroll and refresh: the timeline trails the scroll while it scrubs.
  let reading: number | null = null;
  const follow = () => {
    const trigger = page?.scrollTrigger;
    if (!trigger || !desktop()) return;
    const { start, end } = trigger;
    const y = window.scrollY;
    reading = y >= start - 1 && y <= end + 1 ? seriesAt(((y - start) / (end - start)) * last) : null;
  };
  // A rest point's scroll position, as the pin is measured now.
  const restPoint = (position: number) => {
    const trigger = page?.scrollTrigger;
    return trigger ? trigger.start + (position / last) * (trigger.end - trigger.start) : window.scrollY;
  };

  story.setAttribute("data-turning", "");
  scrubTimeline({
    trigger: story,
    pin: stack,
    pinSpacing: false, // globals.css keeps the story's height
    // A whole pixel: the stage's top sits a fraction of a pixel into it, as
    // the static stages do at the same scroll positions, so at every rest
    // point the pinned stage lands on exactly the same pixels.
    start: () => Math.floor(story.getBoundingClientRect().top + window.scrollY),
    end: selectedWork.pin.end,
    refreshPriority: refreshPriority.selectedWork,
    // Inertia off: ScrollTrigger measures the speed of the scrubbed
    // timeline, which is still catching up when the scroll has stopped, and
    // would carry a reader already at a rest point on to the next one.
    snap: {
      snapTo,
      duration: selectedWork.snap.duration,
      delay: selectedWork.snap.delay,
      ease: ease.inOut,
      inertia: false,
    },
    build: (timeline) => {
      page = timeline;
      addTurns(timeline, series);
      splitLines(
        series.map((stage) => stage.title),
        (split) => {
          const lines = titleLines(series, split);
          timeline.add(lines, 0);
          // SplitText sets the new lines' time after this returns.
          gsap.delayedCall(0, () => settle(true));
          return lines;
        },
      );
    },
    onJump: () => {
      refreshedAt = page?.scrollTrigger?.scroll() ?? null;
      follow();
      settle(true);
    },
  });
  page?.eventCallback("onUpdate", () => settle());
  window.addEventListener("scroll", follow, { passive: true });

  // Widened from the stacked series: the stage opens at the rest point of
  // the series the reader was on, once the refresh has measured the pin.
  const handed = pageTurnState.takeHandOver("desktop");
  if (handed !== null) placeReader(() => restPoint(handed));

  // MOTION.md §5.5: an index row travels to its series' rest point, then
  // moves focus to its title once the stage is at rest there, so focus never
  // lands on a layer still arriving.
  let arrival: ((time: number, deltaTime: number) => void) | null = null;
  const stopArrival = () => {
    if (arrival) gsap.ticker.remove(arrival);
    arrival = null;
  };
  pageTurnState.setTravel((position) => {
    if (!page?.scrollTrigger) return;
    stopArrival();
    travel(restPoint(position), () => {
      let waited = 0;
      arrival = (_time, deltaTime) => {
        waited += deltaTime / 1000;
        if (Math.abs((page?.time() ?? position) - position) > restTolerance && waited < selectedWork.index.focusBy) return;
        stopArrival();
        series[position].title.focus({ preventScroll: true });
      };
      gsap.ticker.add(arrival);
    });
  });

  return () => {
    live = false;
    stopArrival();
    window.removeEventListener("scroll", follow);
    if (window.matchMedia(media.mobile).matches) pageTurnState.handOver(reading, "mobile");
    pageTurnState.setTravel(null);
    pageTurnState.setActive(null);
    story.removeAttribute("data-turning");
  };
}
