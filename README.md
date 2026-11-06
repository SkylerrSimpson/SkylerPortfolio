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

Pages render on the server. Client components handle navigation, theme selection, email copying, and the TFTBIS tabs. The theme follows the browser by default; visitors can save a Light, Dark, or System preference. Animations respect reduced-motion settings.

The default layout is defined in `src/lib/directions.ts`. Alternate layouts at `/versions/workbench` and `/versions/editorial` share the same content and are marked `noindex`. Legacy Index URLs redirect to `/` and `/projects/[slug]`; `/contact` redirects to `/#contact`.

Technology tags share `TechBadge`, including their icons and light/dark hover colors. Fonts and icons are stored locally; their licenses are included in `public/fonts` and `public/licenses`.

## Checks

```sh
pnpm typecheck
pnpm test:unit
pnpm format:check
pnpm build
```

Type checking first generates Next.js route types. Unit tests cover theme resolution and project/section navigation. Browser tests cover navigation, light/dark themes, contrast, narrow layouts, clipboard feedback, and reduced motion:

```sh
pnpm exec playwright install chromium
pnpm test:e2e
```

Playwright reuses the development server on port 3004 or starts one automatically. Screenshots and failure traces are written to ignored test-output directories.

## TFTBIS screenshots

The TFTBIS project page includes a feature walkthrough. Screenshots appear when the capture files are present in `public/projects/tftbis`.

```sh
pnpm capture:tftbis
```

The capture script expects the TFTBIS checkout at `../tftbis`, with its dependencies, PostgreSQL, Redis, and a published dataset available. Set `TFTBIS_DIR` to use another checkout. Playwright Chromium must also be installed.

The script reuses TFTBIS on port 3002 or starts its web server. It captures populated champion builds, item-set results, and a build comparison at 1440×1000, then saves the images and capture date. It stops only the server it started. Data ingestion and workers are not started by the script.

Review the captured images before committing them. Capture before building for production because screenshot availability is determined during page generation. In development, refresh the project page after capturing.

## Deployment

```sh
pnpm build
pnpm start
```

Deploy to a host that supports Next.js. Production startup uses the host's `PORT` environment variable, defaulting to 3000. Development continues to use port 3004 on localhost.
