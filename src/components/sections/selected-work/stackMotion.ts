import { placeReader } from "@/components/motion/SmoothScroll";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { ease, lineRise, media, refreshPriority, selectedWork } from "@/lib/motion";
import { playOnce, scrubTimeline } from "@/lib/reveal";
import { pageTurnState } from "./pageTurnState";

/**
 * The stacked series' motion below 1024px (MOTION.md §5.6), inside a
 * gsap.matchMedia() branch: each photograph's innermost layer drifts as it
 * passes, each title's lines rise once. Returns the branch's cleanup.
 */
export function buildStack(section: HTMLElement): () => void {
  const q = gsap.utils.selector(section);
  const items = q("[data-series-stack] > li");
  const mobile = () => window.matchMedia(media.mobile).matches;

  // Narrowed from the pinned stage: the series it showed comes to the top
  // of the screen. Now, so the titles' entrances below find it already on
  // screen and stay at rest, and again once the refresh has laid out the
  // page.
  const handed = pageTurnState.takeHandOver("mobile");
  const item = handed === null ? undefined : items[handed];
  if (item) {
    const top = () => item.getBoundingClientRect().top + window.scrollY;
    window.scrollTo(0, top());
    placeReader(top);
  }

  // The series the reader is on, for a resize the other way: the last one
  // whose top has passed the middle of the screen, or null off the stack.
  // Measured at each refresh and read on each scroll, while this layout
  // holds.
  let tops: number[] = [];
  let bottom = 0;
  let reading: number | null = null;
  const follow = () => {
    if (!mobile()) return;
    const y = window.scrollY;
    const passed = tops.filter((top) => top <= y + window.innerHeight / 2).length - 1;
    reading = passed >= 0 && bottom > y ? passed : null;
  };
  const measure = () => {
    if (!mobile()) return;
    tops = items.map((li) => li.getBoundingClientRect().top + window.scrollY);
    bottom = (items[items.length - 1]?.getBoundingClientRect().bottom ?? 0) + window.scrollY;
    follow();
  };
  measure();
  ScrollTrigger.addEventListener("refresh", measure);
  window.addEventListener("scroll", follow, { passive: true });

  const { drift, title } = selectedWork.stack;
  q("[data-series-stack] [data-noir-drift]").forEach((layer) =>
    scrubTimeline({
      trigger: layer.parentElement ?? layer,
      start: drift.start,
      end: drift.end,
      refreshPriority: refreshPriority.selectedWork,
      build: (timeline) =>
        timeline.fromTo(layer, { yPercent: -drift.range }, { yPercent: drift.range, duration: 1 }),
    }),
  );
  const entrances = q("[data-series-stack] h3").map((heading) =>
    playOnce({
      text: heading,
      trigger: heading,
      start: title.start,
      refreshPriority: refreshPriority.selectedWork,
      section,
      build: (timeline, split) =>
        timeline.fromTo(
          split.lines,
          { yPercent: lineRise.fromYPercent },
          { yPercent: 0, duration: title.duration, stagger: title.stagger, ease: ease.out },
        ),
    }),
  );

  return () => {
    entrances.forEach((cleanup) => cleanup());
    ScrollTrigger.removeEventListener("refresh", measure);
    window.removeEventListener("scroll", follow);
    if (window.matchMedia(media.desktop).matches) pageTurnState.handOver(reading, "desktop");
  };
}
