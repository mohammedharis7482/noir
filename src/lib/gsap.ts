import "client-only";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { bezier, ease } from "@/lib/motion";

/*
 * The one place GSAP is set up. Motion code imports gsap and its plugins
 * from here, never from "gsap" directly, so registration has always run.
 * Module code runs once per page load; the window check keeps it out of
 * the server render of client components.
 */
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase, useGSAP);
  CustomEase.create(ease.out, bezier.out.join(","));
  CustomEase.create(ease.inOut, bezier.inOut.join(","));
}

export { CustomEase, gsap, ScrollTrigger, SplitText, useGSAP };
