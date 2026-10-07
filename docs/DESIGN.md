# NOIR — Design system and compositions

This file is the source of truth for how NOIR looks and moves. Where it disagrees with `docs/BRIEF.md`, this file wins (reasons in §12). If a section is later designed as a Figma frame, the frame wins over the composition described here.

---

## 1. Concept: the exhibition catalogue

NOIR behaves like a well-made photography book that you walk through like a gallery. Every decision is checked against one question:

> Would this appear in a printed photography monograph or on a gallery wall?

What follows from it:

- Photographs are hung, not tiled: different sizes, different heights, generous wall space around them.
- Captions follow catalogue convention: the title of a work in italic serif, its details in small sans underneath.
- Structure comes from alignment and whitespace, not from boxes, borders or interface chrome.
- Numbers appear only where they index a real sequence: the five series, and the position in the gallery strip.

### The signature: from paper to darkroom

This is the one bold idea. Spend boldness here and keep everything else disciplined.

The page starts on paper (`#F4F2ED`). At the fullscreen moment (§6.07) a photograph takes over the viewport. When it scrolls away, the visitor is in the darkroom: About, Marquee, Contact and Footer all sit on `#111111`. There is never a visible colour tween; the dark sections simply begin where the photograph ends. This is where the name NOIR earns itself.

---

## 2. Colour

Paper context (sections 00–07)

| Token | Hex | Use |
|---|---|---|
| `paper` | `#F4F2ED` | background |
| `ink` | `#111111` | primary text |
| `ink-muted` | `#6B6761` | metadata, caption details, inactive states |
| `rule` | `#D9D6D0` | the two places rules exist; image placeholders |
| `white` | `#FFFFFF` | text over photographs only |

Darkroom context (sections 08–11)

| Token | Hex | Use |
|---|---|---|
| `dark` | `#111111` | background |
| `dark-ink` | `#F4F2ED` | primary text |
| `dark-muted` | `#8C877F` | metadata |
| `dark-rule` | `#2E2C29` | rules |

Notes

- The brief's secondary grey `#77736D` measures 4.21:1 on paper and 4.01:1 on dark, below WCAG AA for small text. `#6B6761` (5.02:1) and `#8C877F` (5.29:1) are the same hue nudged for legibility. Primary text is 16.88:1 in both contexts.
- Every section sets `data-theme="paper"` or `data-theme="dark"`. Components read semantic tokens (`fg`, `fg-muted`, `bg`, `line`) that resolve per theme, so no component hard-codes a hex value.
- No other colours, ever. The photographs supply all the colour on the page.

---

## 3. Typography

Typefaces, loaded with `next/font/google`:

- **Instrument Serif**, 400 roman and italic. Display and large text only; never set below 21px.
- **Hanken Grotesk**, 400 and 500 only. Metadata, interface, rare running text. Never bold.

| Role | Face | Size | Line height | Tracking | Used for |
|---|---|---|---|---|---|
| `display-xl` | Instrument Serif | `clamp(3.5rem, 10vw, 12rem)` | 0.9 | -0.02em | hero headline, contact statement |
| `display-l` | Instrument Serif | `clamp(2.5rem, 6vw, 6.5rem)` | 0.98 | -0.015em | intro, editorial statement, active series title, marquee |
| `display-m` | Instrument Serif | `clamp(2rem, 3.6vw, 3.75rem)` | 1.05 | -0.01em | section titles, email address |
| `text-l` | Instrument Serif | `clamp(1.5rem, 2.2vw, 2.25rem)` | 1.25 | 0 | About paragraph |
| `caption-title` | Instrument Serif italic | 21px | 1.2 | 0 | titles of works in captions |
| `body` | Hanken Grotesk 400 | 16px | 1.55 | 0 | rare running text |
| `meta` | Hanken Grotesk 400 | 13px | 1.4 | 0.01em | caption details, metadata, counters |
| `ui` | Hanken Grotesk 500 | 13px | 1 | 0.02em | navigation, links, CTA |

Fixed sizes come from the classic typographic scale (13, 16, 21, 24, 36, 48); display sizes are fluid.

Rules

- **Sentence case everywhere.** The only all-caps word on the site is the wordmark NOIR.
- **Italic has one meaning: the title of a work** (*Morning Light*, *Still Water*), as in a real catalogue. Statements are always roman. Never italicise, bold or colour a single word for emphasis.
- `text-wrap: balance` on display roles; `text-wrap: pretty` on text roles.
- `font-variant-numeric: tabular-nums` on counters and anything that changes number.
- Measure: `body` max 60ch; `text-l` max 34ch.
- Real typography: curly quotes and apostrophes (’), en dash for ranges (2024–2026), no double spaces.
- Optical alignment: `display-xl` and `display-l` shift left by about 0.05em so the letter stems, not the side bearings, sit on the grid edge.
- Metadata uses the brief's own format, slashes between parts: `Portrait / Kerala / 2026`. Never middle dots; never `WORD — fragment` labels.

---

## 4. Grid, space and shape

Grid

| Viewport | Columns | Margin | Gutter |
|---|---|---|---|
| ≥ 1024px | 12 | `clamp(1.25rem, 3.5vw, 4rem)` | `clamp(1rem, 1.5vw, 1.5rem)` |
| 640–1023px | 8 | same formula | same formula |
| < 640px | 4 | 1.25rem | 1rem |

- The grid spans the full viewport. There is no centred max-width content container. Above 2400px the grid stops growing and centres.
- A dev-only overlay toggled with the `g` key shows the columns.

Composition rules

1. Images span 3, 5, 7 or 9 columns by default. Two equal-width images side by side are not allowed.
2. Image blocks are never centred on the page. The fullscreen moment is the only exception.
3. Every major section has one element that bleeds off a viewport edge.
4. Neighbouring images sit at different heights. Never align a row of image tops.
5. Captions align to an image edge, left or right, never centred under an image.
6. One focal element per viewport. If two things compete, shrink one.
7. Vertical spacing is set per section (§6). There is no single repeated section padding.

Space scale (px): 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192, 256. Section spacing uses viewport units as specified in §6.

Shape

- Border radius is 0 everywhere. No shadows, no blur, no borders around images.
- 1px rules appear in exactly two places: the About facts list and the gallery progress line. Never as section dividers.

---

## 5. Image system

Every photograph renders through one component, `NoirImage`.

- **Props:** `plate` (from `src/content/plates.ts`), `sizes`, `priority`, `focal` and `focalMobile` (object-position values), and `ratio` (overrides the plate's ratio when a composition crops differently).
- **Structure:** an outer frame that owns the aspect ratio, `overflow: hidden` and any clip-path, and an inner layer that owns the image and any scale or translate. Animation always targets the frame or the inner layer, never the `<img>` itself.
- **Ratios in use:** 4:5, 3:4, 2:3, 3:2, 16:9, 21:9.
- **Loading:** the hero is `priority`; everything else lazy-loads with an explicit `sizes` value.
- **Placeholders:** until the real photographs exist, a missing file renders as a flat `rule`-coloured block at the correct ratio with the plate id in `meta` text. No stock fillers.
- **Alt text** describes the photograph, not its role: "A woman reading by a window in morning light", never "hero image".
- **Credits:** photographer and source for every plate live in `src/content/credits.ts`.

---

## 6. Page composition

### At a glance

| # | Section | Theme | Signature technique (see §7) |
|---|---|---|---|
| 00 | Navigation | follows section | hide on scroll down, colour follows theme |
| 01 | Hero | paper | load sequence, then camera push |
| 02 | Intro statement | paper | line mask reveal; covers the hero |
| 03 | Featured photograph | paper | clip reveal |
| 04 | Selected work | paper | pinned layer transitions |
| 05 | Editorial statement | paper | scrubbed line reveal and shift |
| 06 | Visual stories | paper | pinned horizontal strip |
| 07 | Fullscreen moment | paper → dark | takeover |
| 08 | About | dark | quiet line reveal |
| 09 | Marquee | dark | constant drift |
| 10 | Contact | dark | slow sequenced reveal |
| 11 | Footer | dark | none |

Wireframes below show the desktop 12-column grid. Column numbers are inclusive (`cols 6–10` means columns six through ten).

### 00 Navigation

```
|  NOIR              Photography / Visual stories                      Menu  |
```

- Wordmark `NOIR` in Hanken Grotesk 500, 13px, tracking 0.2em, at col 1. Descriptor in `meta`, `fg-muted`, at col 5. `Menu` in `ui`, right-aligned at col 12.
- Height 64px. No background, no border.
- Colour follows the theme of whatever is beneath it: `ink` on paper, `dark-ink` on dark sections and over photographs.
- Hides (translate up) on scroll down once past the hero; returns on scroll up.
- Mobile: wordmark and Menu only.
- Menu (built in the micro-interactions phase): a full-viewport dark layer listing the five series as italic `display-m` titles with their details. Closes with Escape; focus is trapped while open.

### 01 Hero

Theme paper. Height 100svh.

```
cols  1    2    3    4    5    6    7    8    9    10   11   12
      NOIR / 001               ┌──────────────────────────────────── bleed →
      Contemporary             │                                    (bleeds top)
      photography              │      hero photograph
                               │      cols 6–12, top 0 → 62svh
                               │
                               └────────────────────────────────────
      Every frame                                     Monsoon window
           holds a story.                             Portrait / Palakkad / 2026
```

- Photograph: cols 6–12, bleeding off the top and right edges, height 62svh. It reads as roughly 3:2; the crop comes from `focal`.
- Headline (`display-xl`, the page's only h1): two lines anchored near the bottom. Line 1 starts at col 1; line 2 starts at col 2. It must never overlap the photograph.
- Metadata `NOIR / 001` and `Contemporary photography` in `meta` at cols 1–3, top-aligned with the photograph's visible top.
- Caption at cols 10–12, top-aligned with headline line 1.
- Mobile: photograph full-bleed under the navigation at 4:5 (`focalMobile`), about 62svh tall; metadata, then the headline at about 14vw with line 2 indented one column; caption hidden.

Motion intent

- **Load** (the only page-load sequence on the site): the photograph fades in while settling from scale 1.08 to 1. The headline lines rise inside line masks, starting 0.4s later with a 0.1s stagger. Metadata and caption fade in last.
- **Scroll, desktop only:** the hero pins with `pinSpacing: false`. Over about 80vh the photograph's frame opens down and to the left (clip-path on a frame already sized to its end state) while the inner image counter-scales from 1 to 1.08 and its crop drifts by about 4%. The camera pushes in rather than zooming. The headline drifts up more slowly than the scroll and fades out. The Intro section, which has a solid paper background and a higher z-index, then slides up over the photograph like a page laid over a print.

### 02 Intro statement

Theme paper. 22vh top, 18vh bottom.

```
cols  1    2    3    4    5    6    7    8    9    10   11   12
                I photograph light, movement, people
                and places, and the quiet in between.
      Five series
      2024–2026
```

- Statement in `display-l` at cols 3–11, left-aligned.
- `meta` block at cols 1–2, bottom-aligned to the statement's last line.
- Motion: lines rise through masks one at a time, scrubbed as the section moves from 80% to 30% of the viewport. The meta block appears after the last line. Never per-word.
- Mobile: statement across cols 1–4, meta block below it.

### 03 Featured photograph

Theme paper. 8vh top, 26vh bottom.

```
cols  1    2    3    4    5    6    7    8    9    10   11   12
           ┌─────────────────────────────────────────────┐
           │                                             │
           │      featured photograph, 3:2, cols 2–10    │
           │                                             │
           └─────────────────────────────────────────────┘
                                                           Low tide
                                                           Landscape /
                                                           Alappuzha / 2026
```

- A standalone photograph, not one of the five series.
- Caption at cols 11–12, bottom-aligned with the photograph.
- Motion: clip reveal from the bottom edge upward, scrubbed as it enters, while the inner image settles from scale 1.15 to 1. While in view, the inner image keeps a gentle vertical drift (about ±6%). The caption fades in after the reveal completes.
- Mobile: photograph full-bleed, caption below at the left edge.

### 04 Selected work (the pinned story)

Theme paper. 18vh above the title row. The stage is 100svh and stays pinned for four viewport-heights of scroll (one per change).

Title row, before the stage: `Selected work` in `display-m` at col 1; `2024–2026` in `meta`, right-aligned at col 12.

Stage, showing series 01:

```
cols  1    2    3    4    5    6    7    8    9    10   11   12
      01 Morning Light          ┌────────────────────────┐
      02 Between Streets        │                        │        01 / 05
      03 Still Water            │   main photograph      │
      04 After Dark             │   4:5, cols 6–10       │   ┌────────────
      05 Quiet Forms            │                        │   │ support 3:2
                                │                        │   │ cols 11–12
                                └────────────────────────┘   └──── bleed →
      Morning Light
      Portrait / Kerala / 2026
```

- Index at cols 1–3: five rows in `ui`. The active row is `fg`; the others are `fg-muted`. Rows are buttons that scroll (Lenis `scrollTo`) to that series' rest point.
- Active series title in italic `display-l` (it is the title of a work) at cols 1–5, near the bottom, with its details in `meta` underneath.
- Counter `01 / 05` in `meta` with tabular figures, near the top of the main photograph.

Frame presets give the sequence its rhythm (large, small, quiet, large, unexpected):

| # | Series | Main photograph | Support photograph | Feel |
|---|---|---|---|---|
| 01 | Morning Light | 4:5, cols 6–10 | 3:2, cols 11–12, lower, bleeds right | large |
| 02 | Between Streets | 3:2, cols 7–11 | 3:4, cols 5–6, set high | small |
| 03 | Still Water | 16:9, cols 6–12, bleeds right | none | quiet |
| 04 | After Dark | 4:5, cols 7–11, taller (82svh) | 3:2, cols 5–7, overlapping the main photograph's lower-left corner | large |
| 05 | Quiet Forms | 2:3, cols 10–11, narrow | 3:2, cols 4–8, larger than the main | unexpected: the hierarchy flips |

Transition between series (scrubbed; each change uses one viewport of scroll)

- The outgoing main frame closes upward (clip from the bottom edge) while its inner image drifts up. The incoming main frame opens from its bottom edge while its inner image settles from 12% below. The two overlap by about 40%, which reads as pages turning, not as a slideshow fade.
- The support photograph changes about 15% later than the main, which gives the layers depth.
- The title's outgoing lines rise out of their masks while the incoming lines rise in.
- Counter digits roll vertically. The index row switches at the transition's midpoint.
- Desktop only: a soft snap to each series' rest point (duration 0.5–0.8s, short delay, `noir.inOut`).

Mobile and tablet (below 1024px): no pin. Each series stacks: main photograph full-bleed at 4:5, then the italic title in `display-m` and the details beneath, left-aligned. Support photographs and the index are omitted. Motion is limited to the inner drift and title line reveals.

### 05 Editorial statement

Theme paper. 30vh top, 30vh bottom. This is the breathing space between the two pinned sequences.

```
cols  1    2    3    4    5    6    7    8    9    10   11   12
      Photography is not about
                     taking pictures.

                                          I look for the moments
                                          between moments.
```

- The two main lines in `display-l`: line 1 from col 1, line 2 starting at col 5.
- Supporting line in `display-m` at cols 7–11, arriving below after a generous gap.
- Motion, scrubbed across about 120vh: line 1 reveals, then line 2, then the pair settles from scale 0.97 to 1 while line 2 slides about one column toward line 1 (transform only). The supporting line arrives last. Nothing else is on screen.

### 06 Visual stories (the horizontal strip)

Theme paper. 14vh top. On desktop the section pins for the strip's width minus the viewport width.

```
| Visual stories        ┌─────┐   ┌──────────────┐          ┌───┐     ┌──────
| Portrait, editorial,  │ 3:4 │   │     3:2      │          │2:3│     │ 4:5  ...→
| fashion, architecture │     │   └──────────────┘          │   │     │
| and documentary work, └─────┘   Title                     │   │     └──────
| 2024–2026.            Title     Editorial / Mumbai / 2025 └───┘     Title
|                       Portrait / Kochi / 2025                Title
|____________________________________________________________________ 03 / 08
```

- First panel: `Visual stories` in `display-m`, then one sentence in `meta`.
- Eight photographs at varied heights (40–78svh) and vertical positions (some top-aligned, some bottom-aligned, some centred). Gaps vary between 4vw and 12vw.
- Each photograph has a caption at its left edge: italic title plus `Category / Place / Year`.
- Along the bottom, a 1px progress rule spans the margins and fills with progress; a counter (`03 / 08`, tabular figures) sits at the right.
- Motion: the strip translates horizontally in direct proportion to scroll (no easing, no snapping). Each photograph's inner layer drifts slightly against the movement (about ±6% horizontally, via `containerAnimation`) to give depth.
- Mobile and tablet: no pin. A native horizontal scroll container with `scroll-snap-type: x proximity`; photographs about 72vw wide; captions below. The container is keyboard-focusable and labelled.

### 07 Fullscreen moment

Theme paper at the start. On desktop the section pins for about 150vh.

```
start                                          end of pin
cols  1 ...                                    ┌───────────────────────────────┐
                 ┌────────────┐                │                               │
                 │ 3:2 small  │                │   photograph fills the        │
                 │ cols 5–8   │       →        │   whole viewport              │
                 └────────────┘                │                               │
                 Before the rain               │   Before the rain             │
                 Landscape / Kumbalangi / 2026 │   Landscape / Kumbalangi / 2026│
                                               └───────────────────────────────┘
```

- Start: a small photograph at cols 5–8, the only centred image on the site, with its caption under its left edge.
- Motion: the frame (sized to the full viewport from the start) opens its clip from the small rectangle to the full viewport while the inner image settles from scale 1.3 to 1. The photograph appears to come closer rather than stretch. The caption fades out by 30% progress and returns in `white` at the bottom left over the photograph for the last 20%. The navigation switches to light colours while over the photograph.
- When the pin releases, the photograph scrolls up and the dark About section is directly beneath it. There is no paper spacing after the photograph, so the change of theme is never visible as a transition.
- Text over the photograph must meet 4.5:1. Choose a photograph with a calm dark area at bottom left; if that can't be guaranteed, put a flat 20% `ink` layer over the whole image. Never a gradient.
- Mobile: no pin. The photograph is full-bleed at 4:5 (`focalMobile`) and scales from 0.86 to 1 as it passes. The About section's dark background begins at its bottom edge.

### 08 About

Theme dark. 20vh top, 16vh bottom.

```
cols  1    2    3    4    5    6    7    8    9    10   11   12
           ┌──────────────┐               NOIR is the working name of an
           │              │               independent photographer based
           │  portrait    │               in Kerala. For ten years I have …
           │  3:4         │
           │  cols 2–4    │               Based          Kerala, India
           │              │               ─────────────────────────────────
           └──────────────┘               Working        India and the Gulf
                                          ─────────────────────────────────
                                          Commissions    Editorial, portrait,
                                                         architecture
```

- Portrait at cols 2–4, starting about 8vh lower than the text.
- Paragraph in `text-l` at cols 7–12, max 34ch.
- Facts list with 1px `dark-rule` lines between rows: label in `meta` `fg-muted` at cols 7–8, value in `meta` `fg` at cols 9–12.
- Motion: the paragraph's lines rise through masks (shorter distance and duration than the statements); the portrait's inner image drifts gently.
- Mobile: portrait at 3:4 across cols 1–3, then the paragraph, then the facts.

### 09 Marquee

Theme dark. 10vh top and bottom.

- One line in `display-l`, `dark-ink`: `Photography / Portrait / Editorial / Documentary / Architecture /`, repeating. The slashes are `dark-muted`.
- Constant linear drift, one loop about every 40 seconds. No coupling to scroll speed.
- Pauses when off-screen. Static under reduced motion. Duplicated copies are `aria-hidden`.

### 10 Contact

Theme dark. 24vh top, 20vh bottom.

```
cols  1    2    3    4    5    6    7    8    9    10   11   12
      Let’s create
           something worth
      remembering.
                                        hello@noir.studio
                                        Start a project →
```

- Statement in `display-xl`, three lines, with the middle line indented one column.
- Email in `display-m` at cols 7–12; CTA in `ui` beneath it.
- Motion: the statement lines rise slowly (1.2s each, 0.18s stagger) when the section reaches 70% of the viewport, then the email (0.8s), then the CTA.
- Hover, desktop only: the email's underline draws from the left (`scaleX`); the CTA arrow moves 4px to the right.
- The CTA is a `mailto:` link with a subject line.

### 11 Footer

Theme dark. 12vh top; the page margin at the bottom.

```
|  © 2026 NOIR         Designed and built by Mohammed Haris    Photo credits         Back to top  |
```

- One row in `meta`, `fg-muted`. Links are `fg` on hover.
- `Designed and built by Mohammed Haris` links to https://github.com/mohammedharis7482. `Photo credits` links to `/credits`, the page listing every plate's photographer and source from `src/content/credits.ts`.
- No social links (NOIR is fictional), no giant wordmark, no local-time clock, no coordinates.

---

## 7. Motion language

Personality: slow, intentional, precise. Motion behaves like a camera or like paper, never like an interface demo.

Tokens, defined once in `src/lib/motion.ts`:

| Token | Value |
|---|---|
| `noir.out` | `cubic-bezier(0.22, 1, 0.36, 1)` |
| `noir.inOut` | `cubic-bezier(0.65, 0, 0.35, 1)` |
| `duration.ui` | 0.45s |
| `duration.text` | 0.9s |
| `duration.image` | 1.2s |
| `duration.cinematic` | 1.6s |
| `stagger.lines` | 0.08–0.12s |
| scrubbed tweens | `scrub: 1` |

Vocabulary: each technique has assigned places. Using a technique anywhere else needs a reason and approval.

| Technique | Where |
|---|---|
| Scale settle (fade in, scale 1.08 → 1) | Hero load only |
| Camera push (frame opens, inner counter-scale, crop drift) | Hero scroll only |
| Line mask reveal | Hero headline, Intro, Editorial, Contact, About (smaller), series titles |
| Clip reveal | Featured photograph |
| Page-turn layer transition | Selected work |
| Horizontal scrub | Visual stories |
| Takeover | Fullscreen moment |
| Inner drift (crop moves inside a still frame) | Featured, About portrait, strip photographs |
| Constant drift | Marquee |

Principles

- Only the hero has a load sequence. Everything else is scrubbed or plays once on entry.
- Animate `transform`, `opacity` and `clip-path` only.
- No section uses the generic fade-and-rise entrance.
- The detailed per-section motion spec (scroll ranges, start and end values, cleanup) is written in `docs/MOTION.md` before the motion phases begin.

---

## 8. Responsive behaviour

Breakpoints: mobile below 640px, tablet 640–1023px, desktop 1024px and up. Hover only applies with `(hover: hover) and (pointer: fine)`.

| Section | Desktop | Mobile and tablet |
|---|---|---|
| Hero | load sequence, then pinned camera push; Intro covers it | load sequence only; Intro follows normally |
| Selected work | pinned page-turn story | stacked series, no index |
| Visual stories | pinned horizontal scrub | native horizontal scroll with snap |
| Fullscreen | pinned takeover | full-bleed scale 0.86 → 1 |
| Hover details | yes | none |

Lenis smooths wheel input only; touch scrolling stays native.

---

## 9. Accessibility floor

- **Reduced motion:** no Lenis, no pins, no scrubbed transforms. All content renders in its final state, the marquee is static, and the hero load becomes a 0.3s opacity fade.
- **Contrast:** all text at least 4.5:1 (§2). Text over photographs per §6.07.
- **Focus:** a 1px solid `currentColor` outline with a 4px offset on every interactive element. A "Skip to content" link comes first in the page.
- **Semantics:** header and nav, main, footer landmarks; sections labelled by their headings; exactly one h1 (the hero headline).
- **Keyboard:** the menu traps focus and closes with Escape; the mobile strip is focusable and labelled; index rows in Selected work are buttons.
- **Alt text** per §5. Marquee duplicates are `aria-hidden`.

---

## 10. Not on this site

These patterns make a site read as template-built or AI-generated. They are hard rules.

Layout and interface

- A centred hero with a subtitle and two buttons
- An eyebrow label stacked above a heading and a paragraph as a section opener
- Cards of any kind; equal-width grids
- Rounded corners, shadows, blur, glass effects, gradients, glows
- Pills, badges, tags, icon libraries (the only glyph is the → in "Start a project →", which the brief specifies)
- Section divider lines; boxed sections
- The same padding on every section
- A giant footer wordmark, local-time clocks, coordinates, "scroll" indicators, custom cursor graphics

Typography

- All caps anywhere except the wordmark
- Italic, bold or colour emphasis on single words
- Meta strings joined with middle dots; `WORD — fragment` labels
- Inter, Playfair Display, or a monospace face for labels

Motion

- The same fade-and-rise on every section
- Hover effects on everything
- Bounce, spring, rotation, random scale, distortion, WebGL, particles, noise overlays
- Scroll-velocity skews; magnetic buttons

Copy

- Marketing phrasing: "elevate", "unleash", "crafted with passion", "capturing moments that matter", "timeless"

---

## 11. Copy

All copy lives in `src/content/copy.ts`. Captions describe the current plates; when a temporary plate is replaced (`SHOTLIST.md`, “Temporary plates”), its caption is rewritten to match the new photograph.

**Navigation:** `NOIR`, `Photography / Visual stories`, `Menu`

**Hero**
- Headline (h1), with the line break: `Every frame` / `holds a story.`
- Metadata: `NOIR / 001`, `Contemporary photography`
- Caption: *Monsoon window*, `Portrait / Palakkad / 2026`

**Intro**
- `I photograph light, movement, people and places, and the quiet in between.`
- Metadata: `Five series`, `2024–2026`

**Featured caption:** *Low tide*, `Landscape / Alappuzha / 2026`

**Selected work**
- Title: `Selected work`, `2024–2026`
- 01 *Morning Light*, `Portrait / Kerala / 2026`
- 02 *Between Streets*, `Documentary / Mumbai / 2026`
- 03 *Still Water*, `Landscape / South India / 2026`
- 04 *After Dark*, `Editorial / 2026`
- 05 *Quiet Forms*, `Architecture / India / 2026`

**Editorial statement**
- `Photography is not about` / `taking pictures.`
- `I look for the moments between moments.`

**Visual stories**
- `Visual stories`
- `Portrait, editorial, fashion, architecture and documentary work, 2024–2026.`
- Strip captions, p12–p19 in strip order:
  - *Blue doorway*, `Portrait / Jodhpur / 2025`
  - *First catch*, `Editorial / Chennai / 2025`
  - *Kasavu*, `Fashion / Fort Kochi / 2026`
  - *Four o’clock*, `Architecture / Ahmedabad / 2024`
  - *Evening haul*, `Documentary / Kollam / 2024`
  - *Green shawl*, `Portrait / Thrissur / 2025`
  - *Brise-soleil*, `Architecture / Chandigarh / 2024`
  - *Looking up*, `Documentary / Howrah / 2026`

**Fullscreen caption:** *Before the rain*, `Landscape / Kumbalangi / 2026`

**About**
- `NOIR is the working name of an independent photographer based in Kerala. For ten years I have photographed people, streets and coastlines across India, on assignment for editorial clients and, more slowly, for myself. I work in natural light, usually with one camera and one lens, and I am more interested in what happens just before and just after a picture than in the picture itself.`
- Facts:
  - `Based`: Kerala, India
  - `Working`: India and the Gulf
  - `Commissions`: Editorial, portrait, architecture

**Marquee:** `Photography / Portrait / Editorial / Documentary / Architecture /`

**Contact**
- `Let’s create` / `something worth` / `remembering.`
- `hello@noir.studio`
- `Start a project →` (links to `mailto:hello@noir.studio?subject=New%20project`)

**Footer:** `© 2026 NOIR`, `Designed and built by Mohammed Haris` (links to https://github.com/mohammedharis7482), `Photo credits` (links to `/credits`), `Back to top`

---

## 12. Decisions log: departures from BRIEF.md

| # | Decision | Reason |
|---|---|---|
| 1 | No existing design; compositions are defined in §6 | The project starts from scratch |
| 2 | Selected work is the pinned story (brief §16); Visual stories is the horizontal gallery (brief §17); Featured is a standalone photograph | The brief's signature moments weren't mapped to its section list, and *Morning Light* would have appeared three times |
| 3 | First person singular throughout | The brief mixed "we" and "I"; NOIR is an independent artist |
| 4 | "Moments between moments" appears once, in the editorial statement; the intro was rewritten | The brief used the phrase twice |
| 5 | Sentence case for headlines and metadata | All caps flattens Instrument Serif, and tracked all-caps labels are a template tell |
| 6 | Italic reserved for titles of works; no single-word emphasis | Single-word italic emphasis is one of the most common generated-design tells; catalogue italics carry meaning |
| 7 | Secondary grey `#77736D` becomes `#6B6761` on paper and `#8C877F` on dark | The original fails WCAG AA for small text |
| 8 | Signature moment: paper to darkroom; sections 08–11 are dark | One bold idea, specific to the name NOIR |
| 9 | Rules limited to two places; radius 0 everywhere | Avoid a broadsheet-template look; the brief bans rounded containers |
| 10 | Instrument Serif and Hanken Grotesk | The brief left fonts open; both are free and distinctive at their roles |
| 11 | Footer: no Instagram or Behance links; `Designed and built by Mohammed Haris` (to GitHub) and `Photo credits` (to `/credits`) take their place | NOIR is fictional, so social profiles would lead nowhere; the footer credits the person who built the site and the photographers whose work it shows |
| 12 | The photographs are AI-generated (ChatGPT) stand-ins. Every plate’s source in `credits.ts` is “Generated with AI (ChatGPT)”, and `/credits` will say so | There is no photographer to credit, and the credits page should say plainly how the images were made. `SHOTLIST.md` lists the plates that must be replaced before the site is shown publicly |
