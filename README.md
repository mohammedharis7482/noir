# NOIR

A fictional photography portfolio designed as an exhibition catalogue: photography first, typography second, motion only where it has a purpose, interface almost invisible. A learning and showcase project, built to a production standard.

## Running it

Node 22 (pinned in `.nvmrc`) and npm.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint    # ESLint; the build does not run it
npm run plates  # after adding photographs while the dev server runs
```

`dev` and `build` first list the photographs in `public/images/plates` into `src/content/plate-files.ts`, which tells `NoirImage` which plates exist.

`/specimen` shows the design system at work: both colour themes with contrast ratios, every type role, the grid (press `g` for the column overlay), image placeholders and a scroll test that checks Lenis and ScrollTrigger stay in sync. It is not linked from the site and asks search engines not to index it.

## Where things are

- `docs/DESIGN.md`: the design system and every composition. The source of truth.
- `docs/BRIEF.md`: the original creative brief.
- `docs/SHOTLIST.md`: the 21 photographs, their roles and file names.
- `CLAUDE.md`: how the project is built, phase by phase.
- `src/content/`: all copy, the plates, the five series and photo credits.
- `public/images/plates/`: the photographs. A missing file renders as a placeholder.
