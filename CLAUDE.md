# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Próxima is a personal blog (React 19 + Vite + TypeScript) inspired by the minimalist design of overreacted.io. Posts are written in Markdown with the author, drafted with help from Claude Code, then reviewed and adjusted by the author. The site is deployed as a static site to Firebase Hosting.

The project was migrated from Vue 3 to React 19.2.4; the codebase below is the current, post-migration state.

## Commands

- `pnpm dev` — start the Vite dev server
- `pnpm run build` — type-check (`tsc -b`) then build for production (`vite build`); this is what CI runs
- `pnpm preview` — preview the production build locally
- `pnpm prettier` — format the whole repo (`prettier --write .`)

There is no test suite or linter beyond `tsc` type-checking and Prettier formatting.

Package manager is pnpm (pinned via `packageManager` in package.json — use pnpm, not npm/yarn).

## Project structure

```
index.html                     entry HTML: <div id="root"> + <script src="/src/main.tsx">
vite.config.ts                 @vitejs/plugin-react + the custom markdownPosts() plugin
vite-plugins/
  markdown-posts.ts            compiles a post's index.md → a React component module
                                (frontmatter as named exports, body via dangerouslySetInnerHTML,
                                 relative image srcs rewritten to real ES imports)
src/
  main.tsx                     createRoot().render(<StrictMode><HelmetProvider><BrowserRouter>...)
  App.tsx / App.module.css     root layout: <Helmet titleTemplate/defaultTitle>, <NavBar />, <AppRoutes />
  router/
    index.tsx                  AppRoutes: react-router-dom <Routes>/<Route> table (ES + /en mirror)
                                + GtagPageView (fires gtag page_view on location change)
  hooks/
    usePosts.ts                usePosts(lang): memoized, sorted post list from the two
                                import.meta.glob calls below
  components/
    navbar/NavBar.tsx           logo, external "About Me" link, ES/EN toggle
    post-item/PostItem.tsx      one post's title/date/spoiler, used by Home
  pages/
    home/Home.tsx               lists all posts (no CSS of its own)
    post/Post.tsx + Post.css    single post view: prev/next nav, image-zoom click handler;
                                Post.css is plain global CSS (not a CSS module — see Architecture)
    about/About.tsx             static "about" content; currently orphaned, not linked from NavBar
  data/
    post/<slug>/index.md         Spanish posts (default language), image assets alongside each
    post-en/<slug>/index.md      English translations, same frontmatter shape
  utils/date.ts                 formattedDate() / parseDate(), dd-mm-yyyy
  services/axios.ts             a bare axios instance (VITE_API_URL) — not currently used anywhere
  assets/css/                   reset.css, variables.css (global, imported once in main.tsx)
  types/gtag.d.ts                window.gtag type augmentation
```

Each `.tsx` component with real styling has a sibling `<Name>.module.css` (CSS Modules), imported as `import styles from './<Name>.module.css'` and applied via `className={styles.foo}` — `Post.css` is the one deliberate exception (see Architecture, "Posts are Markdown files...").

## Architecture

### Posts are Markdown files compiled into React components

Each post lives at `src/data/post/<slug>/index.md` (Spanish, the default language) alongside its own images. `vite-plugins/markdown-posts.ts` (configured in `vite.config.ts`) compiles each Markdown file into a React component at build time, with frontmatter exposed as named exports on that module (`title`, `slug`, `spoiler`, `category`, `date`, `draft`) and the body rendered via `dangerouslySetInnerHTML` (wrapped in a `.markdown-body` div, styled by `src/pages/post/Post.css`) from `markdown-it`'s HTML output, with relative image sources rewritten to real ES imports so Vite still fingerprints/copies them.

`Post.css` is a plain global CSS file (not a CSS module) imported directly by `Post.tsx` — its selectors (`.post_content .markdown-body h1`, `img.enlarged`, etc.) must match plain, un-hashed tags/classes inside markdown content injected via `dangerouslySetInnerHTML`; CSS Modules would hash `.markdown-body` to something the generated markdown module's literal `className: 'markdown-body'` string could never match.

`src/hooks/usePosts.ts` uses two eager `import.meta.glob` calls, one per language folder (`src/data/post/**/index.md` for `es`, `src/data/post-en/**/index.md` for `en` — note `import.meta.glob` requires literal path strings, so the two globs are separate, not parametrized), to load every post module up front. `usePosts(lang: 'es' | 'en' = 'es')` sorts the chosen language's posts by `date` (descending, parsed via `src/utils/date.ts` which expects `dd-mm-yyyy`) and returns `{ meta, component }` for each, memoized via `useMemo(() => getPosts(lang), [lang])`. This is the single source of truth for post listing/lookup — `Home.tsx` (lists all posts via `PostItem`) and `Post.tsx` (looks up one post by `useParams().slug` and renders `<PostContent />`, where `const PostContent = post.component`) consume it, each getting the language via a `lang` prop from the router rather than reading it from the route itself.

To add a new Spanish post: create `src/data/post/<new-slug>/index.md` with frontmatter (`title`, `slug`, `spoiler`, `category`, `date` in `dd-mm-yyyy` format) and any images referenced relative to that folder — no other registration step is needed, `usePosts('es')` picks it up automatically. An English translation is optional and lives at `src/data/post-en/<english-slug>/index.md` with the same frontmatter shape (English `title`/`spoiler`, and its own English `slug` used for the `/en/:slug` route) — copy over any images it references into that folder. Every post currently has both a Spanish and an English version, so this is the pattern to keep following for new posts.

Within a post's content, `Post.tsx` computes `previousPost`/`nextPost` from adjacent entries in the same language's date-sorted `usePosts()` list (previous = older, next = newer) and renders them below a divider (`.post_divider`) at the end of the post, each as a `<Link>` with the label ("Anterior"/"Previous", "Siguiente"/"Next") plus the adjacent post's title wrapped in a `.post_nav_link_title` span.

### Routing and i18n

`src/router/index.tsx` exports a default `AppRoutes` component (`react-router-dom`'s `<Routes>`/`<Route>`, rendered inside `main.tsx`'s `<BrowserRouter>`) that mirrors every content route in Spanish (default) and English under `/en`: `/` and `/en` (Home), `/:slug` and `/en/:slug` (Post, catch-alls so they must stay last/ordered correctly), plus a single un-translated `/about` (currently unlinked from the nav — see below). Each route passes an explicit `lang="es"|"en"` prop to its `Home`/`Post` element (e.g. `<Route path="/" element={<Home lang="es" />} />`); `NavBar.tsx` instead derives it from `useLocation().pathname.startsWith('/en')`, since it sits outside the matched `<Route>` tree. Both use `lang` to pick the right post set, internal link prefixes (`/` vs `/en/`), and date locale (`es-CL` vs `en-US` via `formattedDate(date, locale)` in `src/utils/date.ts`). Route changes fire a `gtag` `page_view` event via a `GtagPageView` component (`useLocation()` + `useEffect`, rendered alongside `<Routes>`) — see `src/types/gtag.d.ts` for the `window.gtag` type augmentation.

`NavBar.tsx` renders two separate things inside `.navbar_container`'s flex layout: an inline "Sobre Mí"/"About Me" link that goes straight to the external `https://ronaldlz.dev/` (not the internal `/about` route/`About.tsx` page — that page is currently orphaned in the nav), and a `.lang_toggle` link at the end of the row that switches between `/` and `/en` (always to the _home_ of the other language, not an equivalent-slug post).

### Head/SEO

Uses `react-helmet-async` for `<title>`/meta management, via the `<HelmetProvider>` set up in `main.tsx`. `App.tsx` sets the default title template (`<Helmet titleTemplate="%s | Proxima — Un blog personal" defaultTitle="Proxima — Un blog personal" />`); individual pages render their own `<Helmet><title>…</title></Helmet>` to override (currently just `About.tsx`; `Home.tsx`/`Post.tsx` render none, so they get `defaultTitle`). Static meta (description, gtag script, fonts) lives in `index.html`.

### Deployment

Firebase Hosting serves the `dist/` SPA build with a catch-all rewrite to `index.html` (see `firebase.json`). `.github/workflows/firebase-hosting-merge.yml` auto-deploys on push to `main` (pnpm install → build → deploy via `FirebaseExtended/action-hosting-deploy`). There is no PR-preview workflow — only merge-to-main deploys.

## Known issues

`Post.tsx`'s fullscreen-image click handler (`handleClick`) sets `document.body`'s `enlarged` class correctly and it persists, but `target.classList.toggle('enlarged', next)` on the clicked `<img>` itself gets silently reverted within a few hundred ms — confirmed via `MutationObserver` that the exact DOM node holding the class gets swapped out from under it (not just the class removed), and confirmed it isn't a `<StrictMode>` double-invoke artifact (reproduced with `StrictMode` removed too). Worth checking whether the `.markdown-body` div's `dangerouslySetInnerHTML` is being reset on some re-render despite an unchanged `__html` string (which should normally make React skip touching that subtree).
