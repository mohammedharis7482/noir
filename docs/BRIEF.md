# NOIR — PREMIUM PHOTOGRAPHY EXPERIENCE

## MASTER DEVELOPMENT PROMPT FOR CLAUDE

You are acting as a **senior creative developer, frontend architect, interaction designer, and GSAP motion designer**.

We are building **NOIR**, a fictional premium contemporary photography portfolio / visual storytelling website.

This is primarily a **learning and showcase project** for advanced frontend development, visual design, interaction design, GSAP, scroll-driven animation, typography, image composition, performance, and production-quality React architecture.

The goal is NOT to build a normal photographer portfolio.

The goal is to create a **high-end digital photography experience** where photography, typography, layout, scrolling and motion work together as one visual story.

The final website should feel like something that could appear on a high-level digital design inspiration platform.

---

# 01 — MOST IMPORTANT CREATIVE GOAL

Build a website that feels:

* Premium
* Cinematic
* Editorial
* Artistic
* Contemporary
* Minimal
* Sophisticated
* Human-designed
* Highly intentional
* Visually memorable
* Motion-led
* International

The website must **NOT feel AI-generated**.

It must NOT look like:

* A generic AI portfolio
* A SaaS landing page
* A Webflow template
* A standard photographer website
* A dashboard
* A collection of cards
* A collection of random animations
* A collection of trendy effects

The design should communicate:

> **A digital photography exhibition with cinematic motion.**

Photography is the hero.

Typography is the second major visual element.

Motion supports the story.

UI stays quiet.

---

# 02 — EXISTING DESIGN IS THE FOUNDATION

The current homepage has already been designed as the visual foundation.

Do NOT throw away the existing visual direction and replace it with your own generic design.

First understand the current structure, typography, spacing, imagery, colors and composition.

Then improve and evolve it where necessary.

The existing visual direction is based around:

* Warm editorial background
* Near-black typography
* Elegant typography
* Large photography
* Asymmetric editorial composition
* Minimal navigation
* Large statements
* Small metadata
* Strong whitespace
* Minimal UI
* Premium photography

Preserve this overall identity.

Do not redesign the project into a completely different style just because you can.

---

# 03 — BRAND

Brand:

**NOIR**

Descriptor:

**PHOTOGRAPHY / VISUAL STORIES**

Concept:

A contemporary photographer / visual artist documenting:

* People
* Light
* Movement
* Architecture
* Places
* Atmosphere
* Quiet moments
* Editorial stories

The brand should feel independent and artistic.

---

# 04 — VISUAL SYSTEM

Use the existing visual direction.

### Colors

Background:

`#F4F2ED`

Primary:

`#111111`

Secondary:

`#77736D`

Subtle line:

`#D9D6D0`

White:

`#FFFFFF`

Avoid introducing unnecessary colors.

Photography should provide the majority of the visual color.

Do NOT introduce:

* Neon
* Gradients
* Glassmorphism
* Excessive shadows
* Bright accent colors
* Glow effects
* Futuristic UI

---

# 05 — TYPOGRAPHY

Typography must feel editorial and premium.

Use two primary typographic voices:

### Display

Elegant editorial serif / high-contrast serif.

Used for:

* Hero statement
* Large editorial statements
* Major section headings
* Emotional moments

### UI / Supporting

Modern grotesk / contemporary sans-serif.

Used for:

* Navigation
* Metadata
* Labels
* Categories
* Captions
* Buttons
* Supporting text

Typography should have:

* Strong hierarchy
* Carefully controlled line-height
* Intentional letter spacing
* Strong contrast between display and UI type
* Excellent readability

Do not use too many fonts.

Do not make every text element huge.

---

# 06 — TECHNOLOGY

Use a production-quality modern frontend architecture.

Preferred stack:

* Next.js
* TypeScript
* React
* Tailwind CSS where appropriate
* GSAP
* GSAP ScrollTrigger
* Lenis or an equivalent smooth-scroll solution
* Modern image optimization
* Semantic HTML

Use GSAP for major motion.

Use React state only when genuinely necessary.

Do not create unnecessary state-driven animation.

Avoid animation libraries that duplicate GSAP's responsibilities.

If Framer Motion already exists in the project, keep it only where it makes sense for small UI transitions. GSAP should be the primary animation system.

---

# 07 — DEVELOPMENT PRINCIPLE

Do NOT immediately write hundreds of lines of animation code.

Build systematically.

First:

1. Understand the existing project
2. Inspect the current component structure
3. Identify the homepage sections
4. Identify reusable components
5. Identify image assets
6. Identify typography
7. Identify existing dependencies
8. Identify what should be preserved
9. Establish the animation architecture
10. Then implement motion section by section

Do not blindly rewrite the entire project.

---

# 08 — HOMEPAGE EXPERIENCE

The homepage should feel like one continuous visual narrative.

Recommended structure:

1. Navigation
2. Hero
3. Intro Statement
4. Featured Photography
5. Selected Work
6. Editorial Statement
7. Visual Stories
8. Fullscreen Photography
9. About
10. Marquee
11. Contact
12. Footer

Each section should transition naturally into the next.

Avoid the feeling of:

"Section 1 ends → section 2 begins → section 3 begins."

Instead:

"One visual scene transforms into another."

---

# 09 — NAVIGATION

Create an extremely minimal navigation.

Example:

**NOIR**

**PHOTOGRAPHY / VISUAL STORIES**

**MENU**

Keep the navigation visually quiet.

Possible behavior:

* Initially visible
* Changes subtly based on scroll direction
* Can become slightly more compact
* Can transition between light/dark visual contexts when required

But keep these interactions subtle.

Do not create a giant animated menu just for the sake of animation.

---

# 10 — HERO EXPERIENCE

The hero is one of the most important parts of the website.

Headline:

**EVERY FRAME
HOLDS A STORY.**

Large premium editorial typography.

Hero photography should dominate the visual composition.

Possible small metadata:

**NOIR / 001**

**CONTEMPORARY PHOTOGRAPHY**

### Hero animation direction

The initial hero should feel calm.

Then introduce controlled motion:

* Headline enters naturally
* Individual lines can reveal vertically
* Image can subtly scale from slightly larger to its natural position
* Image crop can subtly change
* Typography can shift relative to scrolling
* Metadata can appear with a small delay
* Hero can transition into the next section

Do NOT make the hero chaotic.

Avoid:

* Huge zoom
* Flash effects
* Rapid text movement
* Excessive particles
* Distortion for no reason

The hero should feel cinematic.

---

# 11 — HERO SCROLL TRANSITION

Create a signature transition from hero into the next section.

Possible concept:

As the user scrolls:

* Hero image subtly enlarges
* Text begins moving away
* Image composition changes
* The image becomes a visual bridge
* Next section gradually enters the scene

The transition should feel like a camera movement.

Think:

**camera / editorial / film**

not:

**website animation demo**

---

# 12 — INTRO STATEMENT

Statement:

**We photograph the moments between moments — light, movement, people and places.**

Animation direction:

* Section enters with controlled vertical movement
* Text can reveal line by line
* Individual words may subtly move into place
* Supporting metadata appears separately

Avoid making every word animate independently.

Typography choreography must remain elegant.

---

# 13 — FEATURED PHOTOGRAPHY

Create a large featured image.

Example:

**01 / MORNING LIGHT**

**Portrait / Kerala / 2026**

Animation:

* Image reveal through clipping/masking
* Image subtly scales while entering
* Caption appears after image
* On scroll, image may have subtle movement inside its container

Use image masking carefully.

Do not overuse clip-path animations throughout every section.

---

# 14 — SELECTED WORK

Projects:

### 01

MORNING LIGHT
Portrait / Kerala / 2026

### 02

BETWEEN STREETS
Documentary / Mumbai / 2026

### 03

STILL WATER
Landscape / South India / 2026

### 04

AFTER DARK
Editorial / 2026

### 05

QUIET FORMS
Architecture / India / 2026

The portfolio must NOT become a standard grid.

Use an asymmetric editorial layout.

---

# 15 — SELECTED WORK ANIMATION SYSTEM

This should become one of the main interactive areas.

Potential behavior:

As the user scrolls:

* Images enter from different visual positions
* Image sizes subtly change
* Captions reveal
* Project numbers move slightly
* Images can overlap visually where appropriate
* The active project can become visually dominant
* Previous projects reduce in visual weight

Use ScrollTrigger.

Animations should be tied to scroll progress.

Do not make every item perform the same animation.

Create a visual rhythm:

**large → small → quiet → large → unexpected**

---

# 16 — PINNED STORY SECTION

Create one signature pinned section.

This should be one of the major "wow" moments.

Concept:

The section becomes temporarily pinned while the user scrolls.

Inside the pinned area:

* Main image changes
* Supporting image changes
* Project title changes
* Category changes
* Number changes

Example sequence:

01 MORNING LIGHT
02 BETWEEN STREETS
03 STILL WATER
04 AFTER DARK

The user feels like they are moving through a photography story while the page remains visually anchored.

Use ScrollTrigger carefully.

The animation should feel like:

**turning pages in a visual story**

not like a slideshow.

---

# 17 — HORIZONTAL PHOTOGRAPHY GALLERY

Create a horizontal-scroll section controlled by vertical scrolling.

The user continues scrolling vertically.

The photography moves horizontally.

Use:

GSAP + ScrollTrigger.

The section should:

* Pin during the horizontal sequence
* Translate the gallery horizontally
* Reveal multiple photographs
* Maintain smooth movement
* Finish naturally
* Return to normal vertical scrolling

The gallery should not feel like a generic carousel.

It should feel like a long photographic film strip / editorial sequence.

---

# 18 — IMAGE TRANSITIONS

Use different image transition techniques strategically.

Possible techniques:

### Clip reveal

Image reveals through a mask.

### Scale reveal

Image starts slightly enlarged and settles naturally.

### Crop movement

Image moves subtly inside its container.

### Layer transition

One image transitions into another.

### Fullscreen transformation

A smaller image can grow into a major visual moment.

Do NOT use the same effect everywhere.

Animation vocabulary should have variety.

---

# 19 — FULLSCREEN IMAGE MOMENT

Create one major cinematic image section.

This should be a visual pause.

As the user reaches it:

* Image grows naturally
* Container expands
* Image becomes dominant
* Surrounding content becomes minimal
* The composition feels immersive

Possible transition:

A previously smaller image becomes a large/full-width image.

This should feel like:

**a photograph taking over the screen.**

This can become one of the strongest visual moments on the website.

---

# 20 — TYPOGRAPHY CHOREOGRAPHY

Typography should participate in the motion system.

Use carefully selected text animation techniques:

* Line reveal
* Word reveal
* Masked text
* Subtle vertical movement
* Letter spacing transition
* Opacity progression
* Position interpolation

Do not animate every text element.

Reserve advanced typography motion for:

* Hero
* Major statements
* Section introductions
* Closing statement

Typography animation should feel editorial.

---

# 21 — EDITORIAL STATEMENT

Use:

**PHOTOGRAPHY IS NOT ABOUT TAKING PICTURES.**

Then:

**I LOOK FOR THE MOMENTS BETWEEN MOMENTS.**

This section should become a strong typographic composition.

Possible scroll behavior:

* Text gradually reveals
* Scale changes subtly
* Lines shift slightly
* Supporting line enters afterward

Do not create aggressive kinetic typography.

---

# 22 — VISUAL STORIES

Categories:

* Portrait
* Editorial
* Fashion
* Architecture
* Documentary

Create an editorial image composition.

On scroll:

* Images reveal at different timings
* Captions appear
* Small metadata moves subtly
* Image crops shift
* Visual hierarchy changes

The animation should feel organic rather than mechanical.

---

# 23 — IMAGE HOVER INTERACTIONS

Desktop-only.

Use subtle image interactions.

For example:

When hovering over a project:

* Image slightly scales
* Caption shifts a few pixels
* Secondary information appears
* Cursor may subtly respond

Keep it extremely restrained.

Do NOT create giant custom cursor graphics.

If a custom cursor is used, it should be minimal and optional.

---

# 24 — MARQUEE

Create a slow typography marquee.

Example:

**PHOTOGRAPHY / PORTRAIT / EDITORIAL / DOCUMENTARY / ARCHITECTURE**

The movement should be smooth and continuous.

Avoid excessive speed.

It should feel like an editorial closing device.

---

# 25 — CONTACT SECTION

Main statement:

**LET'S CREATE SOMETHING WORTH REMEMBERING.**

Contact:

**[hello@noir.studio](mailto:hello@noir.studio)**

CTA:

**START A PROJECT →**

Animation:

* Statement reveals slowly
* Email appears afterward
* CTA becomes visible last
* Footer transitions naturally

Keep this elegant.

---

# 26 — PAGE TRANSITIONS

If multiple pages are implemented later, establish a reusable transition system.

Potential transition:

1. Current page begins leaving
2. Visual layer covers viewport
3. New page loads
4. Layer reveals new page
5. Hero enters naturally

Keep transitions short and sophisticated.

Do not make the website feel slow.

---

# 27 — SMOOTH SCROLL

Implement smooth scrolling carefully.

Preferred approach:

**Lenis + GSAP ScrollTrigger**

Requirements:

* Smooth but responsive
* No excessive lag
* No delayed click interaction
* No broken anchor links
* ScrollTrigger must remain synchronized
* Mobile behavior must remain usable

Do not sacrifice usability for smoothness.

---

# 28 — PERFORMANCE

This is extremely important.

A visually impressive website that performs badly is not acceptable.

Optimize:

* Images
* Image dimensions
* Image loading
* Lazy loading
* Component rendering
* GSAP timelines
* ScrollTrigger instances
* DOM complexity
* Event listeners

Avoid:

* Hundreds of unnecessary DOM nodes
* Continuous requestAnimationFrame loops when unnecessary
* Excessive blur
* Heavy filters
* Huge unoptimized images
* Animating expensive layout properties

Prefer GPU-friendly properties:

* transform
* opacity
* scale
* translate
* clip-path where appropriate

Avoid constantly animating:

* width
* height
* top
* left
* margin
* padding

unless there is a strong reason.

---

# 29 — RESPONSIVE MOTION

Desktop and mobile should NOT receive identical animation behavior.

Desktop can support:

* Horizontal scrolling
* Hover
* Pinned sections
* Advanced image interaction
* Cursor interaction

Mobile should simplify where necessary.

Mobile priorities:

* Performance
* Readability
* Touch usability
* Image quality
* Smooth scrolling
* Controlled motion

Do not force desktop animation systems onto small screens.

Use reduced or alternate motion when appropriate.

---

# 30 — ACCESSIBILITY

Respect:

`prefers-reduced-motion`

If reduced motion is enabled:

* Disable major scroll choreography
* Reduce image movement
* Remove unnecessary parallax
* Keep content fully accessible
* Preserve the visual hierarchy

Animations should enhance the website, not prevent access to content.

---

# 31 — COMPONENT ARCHITECTURE

Build reusable components.

Suggested structure:

```text
components/
  navigation/
  hero/
  typography/
  image/
  projects/
  gallery/
  marquee/
  about/
  contact/
  footer/
  motion/
```

Create reusable motion utilities where useful.

For example:

* RevealText
* RevealImage
* ParallaxImage
* SplitTextReveal
* HorizontalScroll
* PinnedStory

Do not over-abstract everything.

Only create abstractions that genuinely improve maintainability.

---

# 32 — DATA-DRIVEN PROJECT CONTENT

Do not hard-code every project directly inside JSX.

Create structured project data.

Example:

```ts
const projects = [
  {
    number: "01",
    title: "Morning Light",
    category: "Portrait",
    location: "Kerala",
    year: "2026",
    image: "...",
  },
]
```

This makes it easier to add:

* More projects
* Project detail pages
* Categories
* Galleries
* Future CMS/backend

---

# 33 — IMAGE SYSTEM

Create a consistent image component.

The image system should support:

* Responsive sizing
* Lazy loading
* Priority loading for hero
* Aspect ratios
* Object positioning
* Animation hooks
* Accessible alt text

Do not let image behavior become inconsistent between sections.

---

# 34 — MOTION DESIGN RULES

This is extremely important.

### Rule 1

**Not everything needs animation.**

### Rule 2

Every major animation must have a visual purpose.

### Rule 3

Do not use effects simply because GSAP can do them.

### Rule 4

Motion should support photography.

### Rule 5

Motion should feel like camera movement, editorial composition, or physical space.

### Rule 6

Avoid excessive bounce.

### Rule 7

Avoid excessive spring effects.

### Rule 8

Avoid random rotation.

### Rule 9

Avoid random scaling.

### Rule 10

Avoid "showcase website" animation overload.

The website should feel expensive because it is controlled.

---

# 35 — MOTION PERSONALITY

The motion personality should be:

**Slow → intentional → cinematic → precise → smooth**

Not:

**Fast → flashy → chaotic → gimmicky**

Think about:

* Film
* Photography
* Editorial magazines
* Art galleries
* Luxury fashion campaigns
* Contemporary digital art

Use those principles when deciding animation timing.

---

# 36 — EASING

Use refined easing.

Prefer modern smooth curves such as:

* power2
* power3
* power4
* expo
* custom cubic-bezier curves

Avoid default linear motion for major visual interactions unless it is specifically appropriate for a marquee.

Animations should accelerate and settle naturally.

---

# 37 — ANIMATION TIMING

General direction:

Small UI motion:

~300–600ms

Text reveals:

~600–1000ms

Major image reveals:

~800–1400ms

Cinematic transitions:

~1000–1800ms

These are guidelines, not strict values.

Do not make the website slow simply because the animation is premium.

---

# 38 — SCROLL-BASED ANIMATION PRINCIPLE

Prefer animation driven by scroll progress where appropriate.

Example:

```text
Scroll progress
      ↓
0%    → image begins
25%   → image enters
50%   → composition reaches focus
75%   → typography transitions
100%  → section completes
```

Animations should feel connected to the user's movement.

Avoid triggering dozens of unrelated animations simply because the user crossed a viewport threshold.

---

# 39 — VISUAL HIERARCHY

At every moment, there should be one clear visual focus.

Possible hierarchy:

**Photography**

then

**Typography**

then

**Metadata**

then

**UI**

Never allow animation to overpower the photograph.

---

# 40 — DO NOT OVERUSE THESE EFFECTS

Avoid or use extremely sparingly:

* Glitch
* RGB split
* Noise overlays
* Heavy blur
* Liquid distortion
* WebGL effects
* Particle systems
* Neon glow
* Excessive 3D
* Excessive rotation
* Magnetic buttons everywhere
* Giant custom cursor
* Constant image distortion

These can easily make the project look like a generic creative-development demo.

The objective is **premium editorial motion**, not "look how many effects I can add."

---

# 41 — VISUAL QUALITY OF PHOTOGRAPHS

The photography is critical.

Use imagery that feels like it belongs to the same photographer.

Desired characteristics:

* Editorial
* Cinematic
* Natural light
* Strong composition
* Authentic people
* Architecture
* Documentary moments
* Atmospheric landscapes
* Fashion/editorial imagery
* Sophisticated color grading

Avoid:

* Generic stock photos
* AI-looking faces
* Overly polished commercial stock imagery
* Random photography styles
* Poorly cropped images
* Low-resolution assets

If temporary images are used, structure the code so they can easily be replaced later.

---

# 42 — PROJECT DETAIL PAGE FOUNDATION

Even if we initially focus on the homepage, architect the system so project detail pages can later exist.

Possible route:

```text
/work/morning-light
/work/between-streets
/work/still-water
```

A project page can later include:

* Project introduction
* Hero image
* Editorial description
* Full gallery
* Image transitions
* Project metadata
* Next project navigation

Do not build all of this now unless the current codebase already supports it.

Prepare the architecture without unnecessary scope expansion.

---

# 43 — CODE QUALITY

Write production-quality TypeScript.

Avoid:

* `any`
* giant components
* duplicated animation code
* magic numbers everywhere
* unnecessary global state
* fragile DOM selectors
* animation code scattered randomly through components

Use refs and scoped selectors appropriately.

Keep animation cleanup correct.

When using GSAP:

* Use React-safe GSAP patterns
* Properly clean up contexts
* Avoid memory leaks
* Kill ScrollTriggers when components unmount
* Keep animation initialization predictable

---

# 44 — DEVELOPMENT PROCESS

Do not attempt to implement everything in one giant change.

Use this implementation order:

### PHASE 1 — AUDIT

Inspect the existing project.

Report:

* Framework
* Folder structure
* Existing components
* Existing dependencies
* Current image system
* Existing styling
* Existing typography
* Current homepage sections
* Existing animation libraries

Do not modify anything yet.

---

### PHASE 2 — FOUNDATION

Prepare:

* GSAP
* ScrollTrigger
* Smooth scrolling
* Motion utilities
* Image utilities
* Responsive foundations

Make sure everything works before creating complex effects.

---

### PHASE 3 — HERO

Implement:

* Hero text reveal
* Image reveal
* Hero scale/crop motion
* Hero-to-next-section transition

Test desktop and mobile.

---

### PHASE 4 — TYPOGRAPHY

Implement:

* Statement reveals
* Editorial text choreography
* Section entrances

---

### PHASE 5 — PORTFOLIO

Implement:

* Selected work reveal
* Project interactions
* Image movement
* Metadata animation

---

### PHASE 6 — PINNED STORY

Implement the main pinned visual storytelling section.

---

### PHASE 7 — HORIZONTAL GALLERY

Implement vertical-scroll-controlled horizontal photography.

---

### PHASE 8 — FULLSCREEN IMAGE

Implement the major cinematic image transformation.

---

### PHASE 9 — MICRO INTERACTIONS

Only after the major motion works:

* Hover
* Small metadata transitions
* CTA interactions
* Navigation behavior

---

### PHASE 10 — PERFORMANCE

Audit:

* FPS
* Image loading
* Scroll performance
* Mobile performance
* Memory
* Animation cleanup

---

### PHASE 11 — POLISH

Finally refine:

* Timing
* Easing
* Spacing
* Typography
* Image crops
* Animation sequencing
* Section transitions

Do not polish micro-interactions before the core experience works.

---

# 45 — HOW YOU SHOULD WORK WITH ME

We are building this interactively.

Do not make massive uncontrolled changes.

For every major stage:

1. Explain what you found
2. Explain what you will change
3. Implement it
4. Tell me what changed
5. Tell me how I can test it
6. Tell me what the expected visual result is
7. Wait for feedback before moving to the next major stage

If something in the existing code is already good, preserve it.

If you believe a major structural change is necessary, explain why before doing it.

---

# 46 — IMPORTANT DESIGN DECISION RULE

Whenever you have two possible solutions, choose the one that creates:

**less UI + stronger composition + better photography + more intentional motion**

rather than:

**more components + more effects + more visual decoration**

---

# 47 — FINAL EXPERIENCE TARGET

When the user opens NOIR, the experience should roughly feel like:

### First impression

"That looks premium."

### After scrolling

"This feels carefully art-directed."

### After experiencing the motion

"This feels cinematic."

### After exploring the projects

"This feels like a real photographer / visual artist."

### After seeing the entire site

"This is not a template."

That is the target.

---

# 48 — FINAL NON-NEGOTIABLE RULES

Never sacrifice visual quality for adding more features.

Never sacrifice performance for animation.

Never sacrifice readability for typography effects.

Never sacrifice photography for UI.

Never add animation just to demonstrate a library.

Never turn the website into a generic AI-generated portfolio.

Never redesign the existing visual identity without a strong reason.

Never use excessive cards, rounded containers, gradients, glassmorphism or decorative UI.

Always prioritize:

**ART DIRECTION**

→ **PHOTOGRAPHY**

→ **TYPOGRAPHY**

→ **COMPOSITION**

→ **MOTION**

→ **PERFORMANCE**

→ **FUNCTIONALITY**

The final website should be a **premium cinematic photography experience**, not merely a portfolio with animations.

---

# START HERE

Before modifying the code:

### 1. Inspect the complete existing project.

### 2. Understand the current homepage and component structure.

### 3. Identify the current visual system.

### 4. Identify what should be preserved.

### 5. Identify what needs to be improved.

### 6. Identify the best architecture for GSAP + ScrollTrigger + smooth scrolling.

### 7. Give me a concise implementation assessment.

Then begin with **PHASE 1 — AUDIT**.

Do not implement all phases at once.

We will build the experience progressively and carefully.
