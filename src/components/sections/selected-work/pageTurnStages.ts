import { gsap, type SplitText } from "@/lib/gsap";
import { ease, lineRise, selectedWork } from "@/lib/motion";
import { writeAtOnce } from "@/lib/reveal";

/*
 * The page-turn's layers and its timeline (MOTION.md §5.3). For each
 * transition the outgoing series' frames close upward while the incoming
 * ones open from their bottom edges, their images drifting with them, the
 * titles' lines leave and arrive through their masks, the details fade and
 * the counter's digits roll.
 */

type Photo = { frame: HTMLElement; inner: HTMLElement };

export type Stage = {
  main: Photo;
  support: Photo | null;
  /** The title heading, split into masked lines. */
  title: HTMLElement;
  details: HTMLElement;
  digits: HTMLElement;
};

type Share = readonly [from: number, to: number];

function photo(stage: HTMLElement, role: "main" | "support"): Photo | null {
  const frame = stage.querySelector<HTMLElement>(`[data-stage-frame="${role}"] [data-noir-frame]`);
  const inner = frame?.querySelector<HTMLElement>("[data-noir-inner]");
  return frame && inner ? { frame, inner } : null;
}

function stageOf(stage: HTMLElement): Stage | null {
  const main = photo(stage, "main");
  const title = stage.querySelector<HTMLElement>("h3");
  const details = stage.querySelector<HTMLElement>("[data-series-details]");
  const digits = stage.querySelector<HTMLElement>("[data-counter-digits]");
  if (!main || !title || !details || !digits) return null;
  return { main, support: photo(stage, "support"), title, details, digits };
}

/** The stages' layers, in page order, or null if any is missing. */
export function stagesOf(stack: HTMLElement): Stage[] | null {
  const stages = [...stack.querySelectorAll<HTMLElement>(":scope > .series-stage")].map(stageOf);
  return stages.length > 1 && stages.every((stage) => stage !== null) ? (stages as Stage[]) : null;
}

export const photosOf = (stage: Stage) => (stage.support ? [stage.main, stage.support] : [stage.main]);

const { transition: step, clip, drift, lineLeave } = selectedWork;
const at = (transition: number, [from]: Share) => transition + from;
const length = ([from, to]: Share) => to - from;
// An outgoing tween starts from the series at rest, which the stage
// already shows: it writes nothing until its transition begins, so it
// never overwrites the incoming tween that hid the same element.
const leave = { immediateRender: false };

// Series k comes in during transition k - 1, from its hidden state.
function arrive(timeline: gsap.core.Timeline, stage: Stage, transition: number) {
  photosOf(stage).forEach(({ frame, inner }, index) => {
    const share = index === 0 ? step.inMain : step.inSupport;
    const position = at(transition, share);
    timeline
      .fromTo(frame, { clipPath: clip.below }, { clipPath: clip.open, duration: length(share) }, position)
      .fromTo(inner, { yPercent: drift.in }, { yPercent: 0, duration: length(share) }, position);
  });
  timeline
    .fromTo(stage.details, { opacity: 0 }, { opacity: 1, duration: length(step.inDetails) }, at(transition, step.inDetails))
    .fromTo(stage.digits, { yPercent: lineRise.fromYPercent }, { yPercent: 0, duration: length(step.counter) }, at(transition, step.counter));
}

// And goes during transition k.
function depart(timeline: gsap.core.Timeline, stage: Stage, transition: number) {
  photosOf(stage).forEach(({ frame, inner }, index) => {
    const share = index === 0 ? step.outMain : step.outSupport;
    const position = at(transition, share);
    timeline
      .fromTo(frame, { clipPath: clip.open }, { clipPath: clip.above, duration: length(share), ...leave }, position)
      .fromTo(inner, { yPercent: 0 }, { yPercent: drift.out, duration: length(share), ...leave }, position);
  });
  timeline
    .fromTo(stage.details, { opacity: 1 }, { opacity: 0, duration: length(step.outDetails), ...leave }, at(transition, step.outDetails))
    .fromTo(stage.digits, { yPercent: 0 }, { yPercent: lineLeave.toYPercent, duration: length(step.counter), ...leave }, at(transition, step.counter));
}

/** Adds every transition's frames, details and counter to the page-turn's
 *  timeline, one unit of time per transition. */
export function addTurns(timeline: gsap.core.Timeline, series: Stage[]): void {
  const last = series.length - 1;
  series.forEach((stage, k) => {
    if (k > 0) arrive(timeline, stage, k - 1);
    if (k < last) depart(timeline, stage, k);
  });
}

/** The titles' lines, rebuilt whenever SplitText splits again (fonts,
 *  width): a child timeline in step with the page-turn's, which SplitText
 *  carries over to the new lines. */
export function titleLines(series: Stage[], split: SplitText): gsap.core.Timeline {
  const last = series.length - 1;
  const lines = gsap.timeline({ defaults: { ease: ease.linear, ...writeAtOnce } });
  series.forEach((stage, k) => {
    const own = split.lines.filter((line) => stage.title.contains(line));
    if (k > 0)
      lines.fromTo(own, { yPercent: lineRise.fromYPercent }, { yPercent: 0, duration: length(step.inTitle) }, at(k - 1, step.inTitle));
    if (k < last)
      lines.fromTo(own, { yPercent: 0 }, { yPercent: lineLeave.toYPercent, duration: length(step.outTitle), ...leave }, at(k, step.outTitle));
  });
  return lines;
}
