/*
 * What the pinned page-turn shares with the static components it moves
 * (MOTION.md §5): the series on the stage, which the index shows as its
 * active row, and how an index row travels to a series. Both are unset
 * whenever the static stages show: under reduced motion, below 1024px and
 * before the page-turn is built.
 */

type Listener = () => void;

/** The two versions of the section: the pinned stage and the stacked series. */
export type Version = "desktop" | "mobile";

const listeners = new Set<Listener>();
let active: number | null = null;
let travel: ((position: number) => void) | null = null;
let handOver: { position: number; to: Version } | null = null;

export const pageTurnState = {
  /** The series on the pinned stage, 0-based, or null. */
  active: (): number | null => active,

  setActive(next: number | null) {
    if (next === active) return;
    active = next;
    listeners.forEach((listener) => listener());
  },

  subscribe(listener: Listener) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },

  /** Takes the reader to a series on the pinned stage. False when the
   *  page-turn isn't running, so the caller scrolls the static stages. */
  travelTo(position: number): boolean {
    if (!travel) return false;
    travel(position);
    return true;
  },

  setTravel(next: ((position: number) => void) | null) {
    travel = next;
  },

  /** A resize across 1024px hands the series the reader was on from one
   *  version of the section to the other. */
  handOver(position: number | null, to: Version) {
    handOver = position === null ? null : { position, to };
  },

  /** The series handed over to this version, once. */
  takeHandOver(to: Version): number | null {
    const handed = handOver?.to === to ? handOver.position : null;
    handOver = null;
    return handed;
  },
};
