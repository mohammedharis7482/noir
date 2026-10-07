import { failsafe, motionAllowed } from "./motion";

/*
 * The motion modes (MOTION.md §2.1). An inline script in the root layout's
 * <head> runs before first paint: unless the visitor prefers reduced motion,
 * it sets data-motion on <html>, which lets globals.css hide what the load
 * sequence reveals. If no motion code has claimed the page within the
 * failsafe, the script removes data-motion again and the static page shows.
 * Without JavaScript, or with reduced motion, the page is the static site.
 */

/** Set before first paint: motion may run. */
export const MOTION_ATTRIBUTE = "data-motion";

/** Set by the first motion code to start: the failsafe stands down. */
export const MOTION_READY_ATTRIBUTE = "data-motion-ready";

/** The inline script, as a string for the root layout's <head>. */
export const motionModeScript = `(function(){var h=document.documentElement;if(!window.matchMedia||!matchMedia("${motionAllowed}").matches)return;h.setAttribute("${MOTION_ATTRIBUTE}","");setTimeout(function(){h.hasAttribute("${MOTION_READY_ATTRIBUTE}")||h.removeAttribute("${MOTION_ATTRIBUTE}")},${failsafe * 1000})})()`;

/**
 * Every motion hook calls this before it builds anything. It returns false
 * when the page must stay static: reduced motion, or the failsafe already
 * fired. Otherwise it marks the page ready, so the failsafe stands down.
 */
export function claimMotion(): boolean {
  const html = document.documentElement;
  if (!html.hasAttribute(MOTION_ATTRIBUTE)) return false;
  html.setAttribute(MOTION_READY_ATTRIBUTE, "");
  return true;
}
