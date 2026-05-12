# Progress Tracker

Update this file wherever the current phase, active feature, or implementation state
changes.

## Current Phase

- Phase 1 — Foundation

## Current Goal

- Define the next feature unit to implement.

## Completed

- `01-design-system`: shadcn/ui (New York style) initialized, lucide-react installed, lib/utils.ts with cn() helper, components Button / Card / Dialog / Input / Tabs / Textarea / ScrollArea added, globals.css configured with dark-only brand palette (no .dark class required).

- `03-auth`: Clerk wired into the app. `ClerkProvider` wraps the root layout with dark appearance via CSS variable overrides (no hardcoded colors). `proxy.ts` at project root uses `clerkMiddleware` to protect all routes by default; `/sign-in` and `/sign-up` are public via `createRouteMatcher`. Root page redirects authenticated users to `/editor` and unauthenticated users to `/sign-in`. Sign-in and sign-up pages use a minimal two-panel layout (logo + tagline on left, Clerk form on right; form-only on small screens). `UserButton` added to the editor navbar right section. `npm run build` passes.

- `04-project-dialogs`: Editor home screen (heading + description + New Project button). `useProjectDialogs` hook manages dialog state, form state, loading state, and mock project list. Three controlled dialogs: Create (name input + live slug preview), Rename (prefilled + auto-focus + Enter submits), Delete (destructive confirm only). `EditorSidebar` with project list; rename/delete actions visible on hover for owned projects only, hidden for collaborator projects. Mobile: backdrop scrim + tap-outside closes sidebar. All wired: editor home New Project → Create dialog; sidebar `+` → Create dialog; sidebar rename/delete → respective dialogs. `npm run build` passes.

- `05-prisma`: Data models, Prisma client singleton, and first migration. `Project` and `ProjectCollaborator` models in `prisma/models/project.prisma`. `lib/prisma.ts` singleton branches on `DATABASE_URL` prefix: `prisma+postgres://` → Accelerate (`withAccelerate()`), otherwise direct `@prisma/adapter-pg`. Migration `20260512012253_init` applied. Client generated to `app/generated/prisma`. `npm run build` passes.

## In Progress

- None.

## Next Up

- `06-*`: Define the next planned feature unit.

## Open Questions

- `@clerk/ai` is listed as a dependency in `03-auth.md` but does not exist on npm. Skip until the package is published or the spec is updated.

## Architecture Decisions

- Dark-only theme: all shadcn CSS variable slots overridden in :root to match the brand palette from ui-context.md. No .dark class is used — the page is permanently dark.
- Tailwind v4 CSS-based config: no tailwind.config.js. Brand tokens mapped via @theme inline in globals.css.
- Clerk dark appearance: applied via `appearance.variables` using `var()` CSS variable references mapped to the brand palette. No `@clerk/themes` package required.
- Route protection: `proxy.ts` (Next.js 16 rename of middleware.ts) uses `clerkMiddleware` + `createRouteMatcher`. All routes are protected by default; public routes are derived from `NEXT_PUBLIC_CLERK_SIGN_IN_URL` and `NEXT_PUBLIC_CLERK_SIGN_UP_URL` env vars.

## Session Notes

- shadcn/ui 4.6.0 initialized with --defaults (New York style, zinc base, CSS variables). All seven components generated into components/ui/. lib/utils.ts created by shadcn CLI. globals.css rewritten to apply brand dark palette to all shadcn variable slots. npm run build passes cleanly.
- Auth implemented: proxy.ts, ClerkProvider in layout, sign-in/sign-up pages, root redirect, editor placeholder with UserButton. npm run build passes.
