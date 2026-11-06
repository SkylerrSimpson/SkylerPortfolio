# Skyler Portfolio

Personal website built with Next.js App Router, TypeScript, Tailwind CSS, and shadcn/ui.

## Development

Requires Node.js 24 or newer and pnpm 11.18.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open http://localhost:3004. The portfolio itself needs no database, API keys, or environment variables.

## Editing content

Profile information and page copy live in `src/lib/content.ts`:

- `profile` contains contact links and the About paragraphs.
- `projects` contains the personal projects and their detail pages. Its order controls the homepage, project numbering, and next-project navigation. Adding an entry also adds its route at `/projects/[slug]`.
- `experience` contains professional work.
- `skills` groups the tools shown in About.
- `archive` contains the earlier projects.

Project slugs must be unique. Next-project navigation wraps to the first entry and is omitted when only one project is listed.

## Structure

| Path                | Purpose                                            |
| ------------------- | -------------------------------------------------- |
| `src/app`           | Routes, metadata, and shared CSS tokens            |
| `src/components`    | Page sections and interactive controls             |
| `src/components/ui` | Local shadcn components built on Radix             |
| `src/hooks`         | Browser behavior, including section tracking       |
| `src/lib`           | Content, theme preferences, and navigation helpers |
| `tests`             | Unit and Playwright tests                          |
| `scripts`           | Local screenshot capture                           |
| `public`            | Fonts, project images, and asset licenses          |

Pages render at build time. Client components handle navigation, theme selection, email copying, and the TFTBIS tabs. The theme follows the browser by default; visitors can save a Light, Dark, or System preference. Animations respect reduced-motion settings.

The default layout is defined in `src/lib/directions.ts`. Alternate layouts at `/versions/workbench` and `/versions/editorial` share the same content and are marked `noindex`. Legacy Index URLs redirect to `/` and `/projects/[slug]`; `/contact` redirects to `/#contact`. These redirects use static HTML with a refresh instruction and a fallback link, so they also work without JavaScript.

Technology tags share `TechBadge`, including their icons and light/dark hover colors. Fonts and icons are stored locally; their licenses are included in `public/fonts` and `public/licenses`.

Search and sharing metadata live in `src/lib/metadata.ts`, using `profile.website` as the canonical domain. The sitemap lists the homepage and current project pages. Alternate layouts and redirect pages are excluded from indexing.

## Deployment

```sh
pnpm build
```

The site uses Next.js static export. Publish the entire `build` directory, including the route payloads used by client-side navigation. No Node.js server or start command is needed in production. Local development uses `pnpm dev` on port 3004.

For the Render Static Site:

| Setting           | Value           |
| ----------------- | --------------- |
| Branch            | `main`          |
| Build command     | `npm run build` |
| Publish directory | `build`         |

Render installs dependencies using the committed pnpm lockfile. Remove any old `/*` → `/index.html` rewrite: each route now has its own HTML file, and unknown paths should return the exported `404.html` page.

After deployment, check the homepage, a direct project URL, `/contact`, and a missing page. Images are served as static files; image optimization does not require a server.
