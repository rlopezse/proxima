# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Próxima is a personal blog (Vue 3 + Vite + TypeScript) inspired by the minimalist design of overreacted.io. Posts are written in Markdown with the author, drafted with help from Claude Code, then reviewed and adjusted by the author. The site is deployed as a static site to Firebase Hosting.

## Commands

- `pnpm dev` — start the Vite dev server
- `pnpm run build` — type-check (`vue-tsc -b`) then build for production (`vite build`); this is what CI runs
- `pnpm preview` — preview the production build locally
- `pnpm prettier` — format the whole repo (`prettier --write .`)

There is no test suite or linter beyond `vue-tsc` type-checking and Prettier formatting.

Package manager is pnpm (pinned via `packageManager` in package.json — use pnpm, not npm/yarn).

## Architecture

### Posts are Markdown files compiled into Vue components

Each post lives at `src/data/post/<slug>/index.md` (Spanish, the default language) alongside its own images. `unplugin-vue-markdown` (configured in `vite.config.ts`) compiles each Markdown file into a Vue component at build time, with YAML frontmatter exposed as named exports on that module (`title`, `slug`, `spoiler`, `category`, `date`).

`src/composables/usePosts.ts` uses two eager `import.meta.glob` calls, one per language folder (`src/data/post/**/index.md` for `es`, `src/data/post-en/**/index.md` for `en` — note `import.meta.glob` requires literal path strings, so the two globs are separate, not parametrized), to load every post module up front. `usePosts(lang: 'es' | 'en' = 'es')` sorts the chosen language's posts by `date` (descending, parsed via `src/utils/date.ts` which expects `dd-mm-yyyy`) and returns `{ meta, component }` for each. This is the single source of truth for post listing/lookup — both `Home.vue` (lists all posts via `PostItem`) and `Post.vue` (looks up one post by `route.params.slug` and renders `<component :is="post.component" />`) consume it, picking the language from `route.meta.lang`.

To add a new Spanish post: create `src/data/post/<new-slug>/index.md` with frontmatter (`title`, `slug`, `spoiler`, `category`, `date` in `dd-mm-yyyy` format) and any images referenced relative to that folder — no other registration step is needed, `usePosts('es')` picks it up automatically. An English translation is optional and lives at `src/data/post-en/<english-slug>/index.md` with the same frontmatter shape (English `title`/`spoiler`, and its own English `slug` used for the `/en/:slug` route) — copy over any images it references into that folder. Every post currently has both a Spanish and an English version, so this is the pattern to keep following for new posts.

Within a post's content, `Post.vue` computes `previousPost`/`nextPost` from adjacent entries in the same language's date-sorted `usePosts()` list (previous = older, next = newer) and renders them below a divider (`.post_divider`) at the end of the post, each as `<RouterLink>` with the label ("Anterior"/"Previous", "Siguiente"/"Next") plus the adjacent post's title wrapped in a `.post_nav_link_title` span.

### Routing and i18n

`src/router/index.ts` mirrors every content route in Spanish (default) and English under `/en`: `/` and `/en` (Home), `/:slug` and `/en/:slug` (Post, catch-alls so they must stay last/ordered correctly), plus a single un-translated `/about` (currently unlinked from the nav — see below). Each route carries `meta: { lang: 'es' | 'en' }`; `Home.vue`, `Post.vue`, `PostItem.vue`, and `NavBar.vue` all read `route.meta.lang` to pick the right post set, internal link prefixes (`/` vs `/en/`), and date locale (`es-CL` vs `en-US` via `formattedDate(date, locale)` in `src/utils/date.ts`). Route changes fire a `gtag` `page_view` event (see `src/types/gtag.d.ts` for the `window.gtag` type augmentation).

`NavBar.vue` renders two separate things: an inline "Sobre Mí"/"About Me" link that goes straight to the external `https://ronaldlz.dev/` (not the internal `/about` route/`About.vue` page — that page is currently orphaned in the nav), and a `.lang_toggle` — a `position: fixed` pill button anchored to the top-right of the viewport (outside the `.navbar` flex layout) that links between `/` and `/en`.

### Head/SEO

Uses `@unhead/vue` for `<title>`/meta management. `App.vue` sets the default title template (`{page} | Proxima — Un blog personal`); individual pages call `useHead()` to override. Static meta (description, gtag script, fonts) lives in `index.html`.

### Deployment

Firebase Hosting serves the `dist/` SPA build with a catch-all rewrite to `index.html` (see `firebase.json`). `.github/workflows/firebase-hosting-merge.yml` auto-deploys on push to `main` (pnpm install → build → deploy via `FirebaseExtended/action-hosting-deploy`). There is no PR-preview workflow — only merge-to-main deploys.
