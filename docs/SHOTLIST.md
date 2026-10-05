# NOIR — Photography shot list

21 photographs. Curate all of them before Phase 2 (static composition), because every composition in `DESIGN.md` is built around these roles and crops.

## The look: one photographer, not a stock library

- Natural light, soft contrast, slightly lifted shadows, restrained saturation. Warm neutrals with muted greens and blues.
- People unposed and rarely looking at the camera.
- Strong composition and plenty of negative space.
- Avoid HDR, teal-and-orange grading, drone shots, posed stock smiles, AI-generated faces, heavy vignettes and watermarks.
- Take most images from two or three photographers whose grading matches. When you find one you like, browse their whole profile; that is where cohesion comes from.

## Where to look

Unsplash (free licence) and Pexels. Useful searches: `kerala monsoon`, `fort kochi`, `kerala backwaters`, `alappuzha`, `mumbai street`, `mumbai local train`, `chandigarh architecture`, `brutalism india`, `night street india`, `fishermen kerala`, `natural light portrait`, `fashion editorial india`.

## Technical

- Download the largest size available. Long edge 3000–4000px; the fullscreen plate (p20) at least 3840px wide.
- JPG in sRGB, ideally under 2 MB each. `next/image` produces AVIF and WebP.
- Save as `public/images/plates/<file name below>`.
- Note the photographer's name and photo URL for each plate; they go into `src/content/credits.ts`.

## The plates

Titles, places and years are placeholders. Rewrite them to match each photograph you choose; a caption that says Kerala should show Kerala.

### Hero, featured and fullscreen

| File | Role | Crop | What to look for | Placeholder caption |
|---|---|---|---|---|
| `p01-hero.jpg` | Hero | about 3:2 on desktop **and** 4:5 on mobile | A person in a doorway or by a window, quiet morning or monsoon light, not looking at the camera. The subject must survive both crops, so leave room around them. | *Monsoon window*, Portrait / Palakkad / 2026 |
| `p02-featured.jpg` | Featured photograph | 3:2 | Water or coast at low tide, haze, small figures or boats, a lot of quiet space. | *Low tide*, Landscape / Alappuzha / 2026 |
| `p20-fullscreen.jpg` | Fullscreen moment | 16:9 or wider on desktop, 4:5 on mobile | The single strongest atmospheric frame on the site. Ideally a small figure in a large landscape, before rain or at dusk. Needs a calm dark area at bottom left for the caption, and a subject near the centre so the mobile crop works. | *Before the rain*, Landscape / Kumbalangi / 2026 |

### Selected work: five series

| File | Series | Role | Crop | What to look for |
|---|---|---|---|---|
| `p03-morning-light.jpg` | 01 Morning Light | main | 4:5 | A portrait in warm, low, side morning light. |
| `p04-morning-light-detail.jpg` | 01 Morning Light | support | 3:2 | A detail from the same light: hands, fabric, light falling on a wall. |
| `p05-between-streets.jpg` | 02 Between Streets | main | 3:2 | A layered street scene with movement. Mumbai if you can find it. |
| `p06-between-streets-detail.jpg` | 02 Between Streets | support | 3:4 | A vertical street detail: a doorway, a vendor, a long shadow. |
| `p07-still-water.jpg` | 03 Still Water | main | 16:9 | Calm backwaters, a low horizon, almost monochrome. This series has no support image. |
| `p08-after-dark.jpg` | 04 After Dark | main | 4:5 | A low-light editorial or fashion portrait lit by practical lights. |
| `p09-after-dark-detail.jpg` | 04 After Dark | support | 3:2 | Night street light: signage, a wet road, a lit window. |
| `p10-quiet-forms.jpg` | 05 Quiet Forms | main | 2:3 | A tall architectural detail: concrete, a stair, deep shadow. |
| `p11-quiet-forms-wide.jpg` | 05 Quiet Forms | support | 3:2 | A wider view of a building with strong geometry. In this series the support is shown larger than the main. |

### Visual stories: the horizontal strip

| File | Category | Crop | What to look for |
|---|---|---|---|
| `p12-portrait.jpg` | Portrait | 3:4 | An environmental portrait; the person in their place. |
| `p13-editorial.jpg` | Editorial | 3:2 | A scene that tells a story: a workshop, a kitchen, a market at opening time. |
| `p14-fashion.jpg` | Fashion | 2:3 | Fashion editorial, natural light, real location, not a studio. |
| `p15-architecture.jpg` | Architecture | 4:5 | An interior with light and shadow. |
| `p16-documentary.jpg` | Documentary | 3:2 | Work or ritual: fishermen, a festival, a station. |
| `p17-portrait.jpg` | Portrait | 4:5 | A close portrait, quieter than p12. |
| `p18-architecture.jpg` | Architecture | 16:9 | A wide facade or a repeating structure. |
| `p19-documentary.jpg` | Documentary | 3:4 | A small human moment in a public place. |

### About

| File | Role | Crop | What to look for |
|---|---|---|---|
| `p21-about.jpg` | Photographer portrait | 3:4 | A photographer seen from behind or in silhouette, holding a camera. No visible face. |

## Final check before handing over

Put all 21 thumbnails together in one view (Finder gallery view or a single Figma frame). If any image jumps out (a different colour cast, a different era, a different mood), replace it. One mismatched photograph is enough to make the whole site read as stock.
