# NOIR — Motion specification

This file defines how NOIR moves. `DESIGN.md` defines how it looks. Where the two disagree about motion, this file wins; where they disagree about layout, `DESIGN.md` wins.

## 0. The one rule

**Every animation ends exactly at the static layout built in Phase 2.** The static page is the rest state, and motion only adds the journey to it. That means:

- After any animation finishes, the page matches the approved Phase 2 screenshots pixel for pixel.
- The reduced-motion experience is simply the static page, so it is always complete.
- If a motion idea needs a different rest layout, it is a layout change: propose it and wait.
- One exception: a photograph whose inner layer drifts (Featured, the About portrait) never shows an empty edge inside its frame, so in motion mode the drifting layer is oversized just enough to cover its drift. For a drift of ±d of the layer's own height, it reaches d / (1 − 2d) of the frame's height beyond the frame's top and bottom, plus a pixel so that rounding never leaves a hairline: about 6.8% for Featured's ±6%, 4.3% for the portrait's ±4%. The photograph's crop may be that much tighter than on the static page. Everything else must still match the static page exactly (`DESIGN.md` §12, row 35).

Personality: slow, intentional, precise. Motion behaves like a camera or like paper, never like an interface demo.

---

## 1. Build order

| Phase | Builds | Sections |
|---|---|---|
| 3 | Motion foundation (§2) and the hero (§3) | Hero |
| 4 | Entrances and statements (§4) | Intro, Featured, Editorial, About, Marquee, Contact |
| 5 | The pinned page-turn (§5) | Selected work |
| 6 | The horizontal strip (§6) | Visual stories |
| 7 | The takeover (§7) | Fullscreen |
| 8 | Navigation, menu and hover (§8) | Navigation, Menu, hover details, CTA arrow glyph |
| 9 | Performance budget (§9) | Whole site |
| 10 | Polish | Timing, easing, spacing, crops, sequencing |

**Never animated:** the section titles "Selected work" and "Visual stories", the footer, the facts lists, the /credits page, the specimen page. Not everything moves; the quiet parts are what make the moving parts feel expensive.

---

## 2. Foundation (Phase 3)

### 2.1 Motion modes

Three branches, as in `CLAUDE.md`: desktop (`width >= 1024px`), mobile (`width < 1024px`), reduced (`prefers-reduced-motion: reduce`).

A tiny inline script in the `<head>` of the root layout runs before first paint:

- If the visitor does not prefer reduced motion, it sets `data-motion` on `<html>`.
- It starts a 4-second failsafe: if the motion code hasn't set `data-motion-ready` on `<html>` by then, it removes `data-motion`, and the static page shows.
- `<html>` gets `suppressHydrationWarning`, and there must be no hydration warnings in the console.

Rules that follow from it:

- **Initial hidden states live in CSS, scoped to `html[data-motion]`**, only for things visible on first paint (the hero) and for layouts that motion changes (the Selected work stage, the strip, the fullscreen start). Everything else gets its initial state from GSAP while it is still off screen.
- **Motion code only initialises if `html[data-motion]` is present** at that moment. If the failsafe has already removed it, the page stays static.
- Without JavaScript, or with reduced motion, the page is the complete static site.

### 2.2 Tools and tokens

- Plugins are registered once in `src/lib/gsap.ts`. Eases, durations, staggers and media conditions come from `src/lib/motion.ts`. No inline magic numbers: add a named token instead.
- Eases: `noir.out` for things arriving, `noir.inOut` for things travelling. Scrubbed tweens use `ease: "none"` unless this file says otherwise, because the scroll itself is the easing.
- Scrub: `scrub: 1` for choreography, `scrub: true` for the strip (Lenis already smooths it).

### 2.3 Structure

- One `useGSAP` hook per section, scoped to the section's ref. `gsap.matchMedia()` is created inside it so everything reverts on unmount.
- Refs and scoped selectors only. Never `document.querySelector`.
- Function-based values (anything measured from the layout, like column widths or strip length) use `invalidateOnRefresh: true`.

### 2.4 Pins, order and refresh

There are four pins on desktop, in page order: Hero, Selected work, Visual stories, Fullscreen.

- Pinned triggers must compute in page order regardless of React mount order. Use `refreshPriority` (higher for earlier sections) or `ScrollTrigger.sort()`.
- After all sections have mounted, the fonts are ready and the hero image has loaded, call `ScrollTrigger.refresh()` once.
- Verification for every motion phase: log each trigger's start and end in px at 1440×900 and check them against the measured positions of their elements.

### 2.5 Text

- SplitText with `mask: "lines"`, `autoSplit: true`, and the tween created and returned inside `onSplit`, so splits survive resizing and font loading.
- The accessible name of every split element must still read as the full sentence. Check it in the accessibility tree.
- Line reveals move `yPercent: 100 → 0` inside the mask. Never per-word, never per-letter.

### 2.6 Images

- Animate the `NoirImage` frame (clip-path) and its inner layer (transforms). Never the `<img>` itself.
- When two animations move one image (the hero's load settle and its scroll push), they target two different nested layers so they can never fight. Add the second layer to `NoirImage` as an option; don't duplicate the component.

### 2.7 Performance rules

- Animate `transform`, `opacity` and `clip-path` only.
- `will-change: transform` only on layers inside an active pin, and nowhere else permanently.
- No scroll listeners of our own: everything goes through ScrollTrigger and Lenis.

### 2.8 Scrolling

- All programmatic scrolling uses `lenis.scrollTo` when Lenis exists, native scrolling otherwise.
- One exception: after a full ScrollTrigger refresh, `SmoothScroll` restores the reader's place with a native `window.scrollTo`. Lenis hasn't seen the refresh's jump to the top yet, so its `scrollTo` to the same place returns early, while Lenis follows a native scroll (`DESIGN.md` §12, row 33).
- `lenis.stop()` while the menu is open; `lenis.start()` when it closes.

---

## 3. Hero (Phase 3)

### 3.1 Load sequence

Desktop and mobile. Time-based, plays once. Scrolling is never blocked.

| Time | Element | From → to | Duration | Ease |
|---|---|---|---|---|
| 0.00s | photo frame | opacity 0 → 1 | 0.8s | `noir.out` |
| 0.00s | photo settle layer | scale 1.08 → 1 | 1.6s | `noir.out` |
| 0.40s | headline lines | yPercent 105 → 0, stagger 0.10s | 1.0s | `noir.out` |
| 0.95s | metadata and caption | opacity 0 → 1 | 0.6s | `noir.out` |

- The navigation is visible from the first paint and doesn't animate.
- The photograph starts at once. It never waits for fonts, because it is the page's largest paint.
- The headline waits for `document.fonts.ready` and its split, but no longer than 1.2s after load. If fonts arrive later, `autoSplit` re-splits and the lines end in place.
- The headline must never flash visible before its animation. Its hidden state comes from CSS under `html[data-motion]`.
- Total: about 2 seconds. It should feel like a darkroom light coming up, not like a website loading.
- It plays once per visit. Returning to the home page without a reload (a client-side link from `/credits`) shows the hero at rest (`DESIGN.md` §12, row 34).

### 3.2 Scroll: the camera leans in (desktop)

- Pin the hero: `start: "top top"`, `end: "+=80%"`, `pinSpacing: false`, `scrub: 1`.
- Push layer (inner, separate from the settle layer): scale 1 → 1.1 and yPercent 0 → -3 over the whole range.
- Headline: y 0 → -10vh and opacity 1 → 0, between progress 0 and 0.6.
- Metadata and caption: opacity 1 → 0, between progress 0 and 0.35.
- The Intro section sits above the hero (z-index) on its solid paper background and simply scrolls up over the pinned hero. No tween is needed: it reads as a page laid over a print.
- The total scale change stays at or under 10%. This is a camera leaning in, not a zoom effect.

This replaces the description in `DESIGN.md` §6.01 where the frame "opens down and to the left". Growing the frame would need a full-viewport frame, which changes the approved rest crop and could cut the man out of it.

### 3.3 Mobile

No pin. The push layer drifts yPercent 0 → 8 as the hero leaves the screen (scrubbed from `"top top"` to `"bottom top"`). The headline doesn't move on scroll.

### 3.4 Reduced motion

The hero is fully static, with no fade (`DESIGN.md` §12, row 32).

### 3.5 Acceptance

- After load, the hero matches the Phase 2a screenshot exactly.
- The pin releases without a jump. Scrolling back up reverses cleanly.
- Nothing flashes on load, including on a slow 3G throttle.

---

## 4. Entrances and statements (Phase 4)

### 4.1 Intro statement

- Desktop: scrubbed, `start: "top 80%"`, `end: "top 30%"`. Lines move yPercent 100 → 0, each over an equal share of the range. The metadata block fades in (opacity 0 → 1) over the last 20%.
- Mobile: plays once at `"top 85%"`. Lines rise over 1.0s with a 0.1s stagger, then the metadata fades in over 0.6s.

### 4.2 Featured photograph: the clip reveal

- Desktop and mobile: scrubbed. The frame's clip-path goes from `inset(100% 0 0 0)` to `inset(0% 0 0 0)` (revealed from the bottom edge upward) while the inner layer settles from scale 1.15 to 1.
  - Desktop range: `"top 85%"` → `"top 35%"`. Mobile range: `"top 90%"` → `"top 50%"`.
- The caption fades in (0.6s, `noir.out`) once the reveal has completed, and fades out again if the reveal is reversed.
- Desktop only: while the photograph is in view, its inner layer drifts yPercent -6 → 6, scrubbed from `"top bottom"` to `"bottom top"`.

### 4.3 Editorial statement

Desktop, one scrubbed timeline from `"top 75%"` to `"bottom 70%"`:

| Progress | What happens |
|---|---|
| 0.00 – 0.30 | line 1 rises into place |
| 0.15 – 0.45 | line 2 rises into place |
| 0.20 – 0.80 | the pair settles from scale 0.97 to 1 (origin: left) |
| 0.30 – 0.80 | line 2 slides from one column to the right (column plus gutter, measured) to its rest position |
| 0.70 – 1.00 | the supporting line rises into place |

Mobile: the three lines rise once each at `"top 85%"`, 1.0s, 0.12s stagger. No scale, no slide.

### 4.4 About

- The paragraph's lines rise once at `"top 75%"`: 0.8s, 0.06s stagger, `noir.out`. Shorter and quicker than the statements, because this is reading text.
- The portrait's inner layer drifts yPercent -4 → 4, scrubbed across the section.
- The facts list doesn't move.

### 4.5 Marquee

- The track holds two copies of the line; the second is `aria-hidden`.
- Tween xPercent 0 → -50, `duration: 40` seconds, `ease: "none"`, `repeat: -1`.
- A ScrollTrigger plays it while the marquee is on screen and pauses it when it isn't.
- Reduced motion: a single static line, no copies.

### 4.6 Contact

Plays once at `"top 70%"`, desktop and mobile:

1. Statement lines rise: 1.2s each, 0.18s stagger, `noir.out`.
2. The email fades in (0.8s), starting as the last line settles.
3. The CTA fades in (0.6s), 0.3s after the email starts.

---

## 5. Selected work: the page-turn (Phase 5)

### 5.1 Layout switch

- Under `html[data-motion]` and `width >= 1024px`, CSS stacks the five series' layers into a single 100svh stage (all series share one grid area). Series 2–5 start clipped (`inset(100% 0 0 0)`), and their title lines start at yPercent 100 inside their masks.
- Under reduced motion or below 1024px, the static stacked version from Phase 2b stays exactly as it is.

### 5.2 Pin

`start: "top top"`, `end: "+=400%"` (four transitions, one viewport each), `scrub: 1`.

### 5.3 One transition

Each transition (series N → N+1) takes a quarter of the progress. Inside it, local time runs 0 → 1:

| Local time | Element | Change |
|---|---|---|
| 0.00 – 0.70 | outgoing main frame | clip `inset(0 0 0% 0)` → `inset(0 0 100% 0)` (closes upward); inner yPercent 0 → -8 |
| 0.30 – 1.00 | incoming main frame | clip `inset(100% 0 0 0)` → `inset(0% 0 0 0)` (opens from the bottom); inner yPercent 12 → 0 |
| 0.15 – 0.85 | outgoing support frame | as the outgoing main |
| 0.45 – 1.00 | incoming support frame | as the incoming main |
| 0.20 – 0.50 | outgoing title lines | yPercent 0 → -100 |
| 0.50 – 0.85 | incoming title lines | yPercent 100 → 0 |
| 0.20 – 0.40 | outgoing details | opacity 1 → 0 |
| 0.60 – 0.80 | incoming details | opacity 0 → 1 |
| 0.40 – 0.60 | counter digits | outgoing yPercent 0 → -100, incoming 100 → 0, inside a mask |
| 0.50 | index | the active row switches (class change; CSS colour transition 0.45s) |

- Photographs never crossfade with opacity: the moving clip edges are what make it feel like turning pages.
- *Still Water* has no support photograph; its slot simply stays empty.

### 5.4 Snap

Snap to the five rest points (`snapTo: [0, 0.25, 0.5, 0.75, 1]`), duration 0.5–0.8s, delay 0.15s, ease `noir.inOut`. If ScrollTrigger's snap fights Lenis, snap with `lenis.scrollTo` once scrolling ends instead. If neither feels smooth, ship without snap and say so in the report.

### 5.5 Index buttons

`lenis.scrollTo(pinStart + i × viewportHeight)` over about 1.2s, then move focus to that series' title without scrolling.

### 5.6 Mobile

The stacked version. Each photograph's inner layer drifts yPercent -5 → 5 as it passes. Each title's lines rise once at `"top 85%"` (1.0s, 0.1s stagger).

### 5.7 Acceptance

- At each rest point, the stage matches that series' Phase 2b screenshot.
- Scrolling backwards plays every transition in reverse, cleanly.
- It reads as turning pages in a book, not as a slideshow.

---

## 6. Visual stories: the strip (Phase 6)

### 6.1 Layout switch

Under `html[data-motion]` and `width >= 1024px`, the strip's scroll container becomes `overflow: visible`, and the section is pinned. Otherwise the native scroller stays, and on desktop under reduced motion its scrollbar is visible.

### 6.2 Pin and travel

- Pin: `start: "top top"`, `end: () => "+=" + (trackWidth - viewportWidth)`, `invalidateOnRefresh: true`.
- Track: x 0 → -(trackWidth - viewportWidth), `ease: "none"`, `scrub: true`. Direct and steady, no snap.

### 6.3 Depth

Each photograph's inner layer drifts xPercent -6 → 6 with `containerAnimation`, from `"left right"` to `"right left"`.

### 6.4 Progress

- The progress rule scales X from 0 to 1 (origin: left) on the same progress.
- The counter shows the photograph whose centre is nearest the viewport centre. It's a plain text update with tabular figures, not an animation.

### 6.5 Loading

The strip's images must be loaded before they enter the view. When the section comes within one viewport of the screen, switch its images to eager loading. Verify there are no blank frames on a throttled connection.

### 6.6 Mobile

The native scroller with snap, as built. No GSAP.

### 6.7 Acceptance

A steady film-strip glide with no jitter and no blank frames, releasing cleanly into the Fullscreen section.

---

## 7. Fullscreen: the takeover (Phase 7)

### 7.1 Pin

Desktop only: `start: "top top"`, `end: "+=150%"`, `scrub: 1`.

### 7.2 The photograph

- The frame is already the full viewport (the Phase 2c rest state). Its clip-path starts as the rectangle at cols 5–8, 3:2, vertically centred (measured from the grid, function-based) and opens to `inset(0)` over progress 0 → 0.8, ease `noir.inOut`.
- At the same time, the inner layer settles from scale 1.3 to 1. The photograph seems to come closer rather than stretch.

### 7.3 Captions

- A start caption (ink, under the small rectangle's left edge) exists only in motion mode and is `aria-hidden`. It fades out over progress 0 → 0.3.
- The real caption (white, bottom left) fades in over progress 0.8 → 1.0.

### 7.4 The join

When the pin releases, the photograph scrolls up and the dark About section is directly beneath it, as in the static layout. There must never be a paper flash at the join.

### 7.5 Mobile

No pin. The frame scales from 0.86 to 1 with `transform-origin: bottom center`, so its bottom edge stays attached to the dark About section and no paper gap ever appears. Scrubbed from `"top bottom"` to `"top 15%"`.

### 7.6 Acceptance

A photograph taking over the screen, not a zoom. The theme change to the darkroom is never visible as a transition.

---

## 8. Navigation, menu and hover (Phase 8)

### 8.1 Navigation

- The navigation becomes `position: fixed`. The 64px band stays in the layout as a spacer, so nothing below it moves.
- It hides (yPercent 0 → -100) when scrolling down past the end of the hero, and returns when scrolling up: 0.45s, `noir.out`. It's always visible at the top of the page and while the menu is open.
- Its colour follows the theme of whatever is under its centre line: paper sections give ink, dark sections give light. While the fullscreen photograph is behind it, it's light. Switch with a 0.3s CSS colour transition.

### 8.2 Menu

- A full-viewport dark layer. Opening: clip-path `inset(0 0 100% 0)` → `inset(0)`, 0.6s, `noir.inOut`, then the item lines rise (0.6s, 0.06s stagger). Closing: the reverse, in 0.45s.
- Items: the five series as italic `display-m` titles with their details. Choosing one closes the menu, then scrolls to that series' rest point.
- Focus is trapped while open, Escape closes, and focus returns to the Menu button. `lenis.stop()` while open.

### 8.3 Hover

Only under `(hover: hover) and (pointer: fine)`. Nothing else hovers.

- Selected work main photograph: inner scale 1 → 1.03 (0.6s, `noir.out`); its details shift 4px right.
- Strip photographs: inner scale 1 → 1.02.
- The email: underline draws from the left (scaleX 0 → 1, 0.45s).
- The CTA arrow moves 4px right.

### 8.4 The CTA arrow glyph

The self-hosted subset task already recorded in `CLAUDE.md`.

---

## 9. Performance budget (Phase 9)

- Lighthouse, mobile: performance ≥ 90. LCP under 2.5s (the hero photograph), CLS under 0.02, INP under 200ms.
- The failsafe (§2.1) stays at 4 seconds until it is measured against that LCP budget here. On a slow connection the JavaScript arrives after the failsafe, so the hero shows only when the failsafe fires (about 8.8s on Chrome's Slow 3G in Phase 3). If LCP fails, the first fixes to try are a shorter failsafe and showing the photograph without waiting for JavaScript (`DESIGN.md` §12, row 31).
- Desktop: a steady 60fps through every pin in Chrome's Performance panel at 1440×900, and no long tasks over 50ms while scrolling.
- ScrollTriggers: list every one with its section. Target 25 or fewer on desktop.
- Images: AVIF on; every `sizes` value correct; no image over 400KB transferred on a mobile viewport.
- Memory: navigate / → /credits → / five times; `ScrollTrigger.getAll().length` must return to the same number each time.
- Review `npm audit` (never `npm audit fix --force`).

---

## 10. How every motion phase is tested

1. **Frame strips:** screenshots at 0, 25, 50, 75 and 100% of every pinned or scrubbed range at 1440×900. For the hero load, at 0, 0.4, 0.8, 1.2 and 2.0 seconds.
2. **Reverse:** scroll back up through every changed section; everything plays backwards cleanly.
3. **Fling:** fast trackpad flings in both directions; no element is left stuck halfway.
4. **Resize:** resize from 1440 to 390 and back while in the middle of the page; pins rebuild correctly.
5. **Reduced motion:** turn it on; the page is the static site, with nothing moving.
6. **Keyboard:** Tab through the whole page, including during pins; focus is always visible and never lands on something hidden.
7. **Console:** no errors, no hydration warnings.
8. **Rest states:** after each animation, compare against the Phase 2 screenshots.
