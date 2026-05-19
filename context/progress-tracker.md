# Progress Tracker

Update this file whenever the current phase, active feature, or implementation state changes.

## Current Phase

- 07 - Wire Editor Home

## Current Goal

- Wire the editor home sidebar and dialogs to the real project API.

## Completed

### Phase 07 - Wire Editor Home
- Created `lib/project-data.ts` with `getOwnedProjects()` and `getSharedProjects()` server-side helpers
- Created `hooks/use-project-actions.ts` — combined hook managing dialog state, project list, API mutations (create/rename/delete via fetch), and navigation (`useRouter`)
- Server-side data fetching: `app/editor/page.tsx` fetches owned projects via Prisma and passes as props to `EditorWorkspace`
- `EditorWorkspace` accepts `projects` and `userId` props, uses `useProjectActions` instead of mock-based `useProjectDialogs` + mock data
- `ProjectSidebar` uses real `ProjectData` type; `isOwner` computed via `ownerId === userId`
- `ProjectDialogs` simplified: replaced `projects[]` + `selectedProjectId` lookup with single `currentProjectName` string prop
- `npm run build` passes

### Phase 06 - Project APIs
- `GET /api/projects` — lists current user's projects (ordered by `createdAt` desc)
- `POST /api/projects` — creates a project with `ownerId` from Clerk; defaults missing name to `"Untitled Project"`
- `PATCH /api/projects/[projectId]` — renames a project; ownership check returns `403` for non-owners
- `DELETE /api/projects/[projectId]` — deletes a project; ownership check returns `403` for non-owners
- All unauthenticated requests return `401` via explicit `auth()` check in each handler
- Route files at `app/api/projects/route.ts` and `app/api/projects/[projectId]/route.ts`
- `npm run build` passes

### Phase 05 - Prisma
- Editor home screen with heading, description, and New Project button
- Create Project dialog with live slug preview
- Rename Project dialog with prefilled input, auto-focus, and Enter-to-submit
- Delete Project dialog with destructive confirmation
- Sidebar project items with rename/delete actions for owned projects
- Dedicated useProjectDialogs hook for dialog/form/loading state
- lib/slug.ts utility, lib/mock-projects.ts mock data
- Create/rename/delete operations update the sidebar project list

### Phase 03 - Auth
- Stripped Next.js boilerplate (global.css, public SVGs, page.tsx)
- Design system setup: shadcn init, dark theme CSS variables, lucide-react, cn() helper, 7 components
- Editor Navbar: fixed-height top bar with sidebar toggle (PanelLeftOpen/Close icons)
- Project Sidebar: floating sidebar with backdrop, tabs (My Projects / Shared), empty placeholder states, and New Project button
- Dialog pattern confirmed: existing dialog.tsx already supports title, description, and footer actions with proper color tokens
- @clerk/ui installed as a dependency
- proxy.ts created at project root with protected-first middleware (public: `/`, `/sign-in`, `/sign-up`)
- @clerk/ui/themes/shadcn.css imported in globals.css
- Root layout wrapped with ClerkProvider using dark theme and CSS variable overrides
- Sign-in page with two-panel layout (left: branding/features, right: Clerk form)
- Sign-up page with same two-panel layout
- Root page (`/`) redirects authenticated users to `/editor`, unauthenticated to `/sign-in`
- Editor workspace component created with navbar, sidebar, and workspace area
- UserButton added to editor navbar right section with theme-matched appearance
- Fixed logout render error: moved ClerkProvider inside `<body>` to prevent hydration edge cases, and set `afterSignOutUrl="/sign-in"` on ClerkProvider so sign-out redirects directly to sign-in instead of the double-redirect through `/`.
- Polished Clerk auth UI: added global CSS overrides in globals.css targeting the correct DOM class names. `cl-socialButtonsBlockButton` (the actual rendered selector, not `cl-socialButtonsIconButton`) now gets a visible `--border-default` border; `cl-socialButtonsBlockButtonText` uses `--text-primary`; `cl-lastAuthenticationStrategyBadge` uses visible muted/subtle colors. `cl-socialButtonsIconButton` also targeted for non-last-used icons.

### Phase 05 - Prisma
- Restructured schema for multi-file support: moved generator + datasource from `prisma/schema.prisma` to `prisma/models/schema.prisma` with updated output path (`../../app/generated/prisma`)
- Created `prisma/models/project.prisma` with Project model (ownerId, name, description?, status enum, canvasJsonPath?, timestamps, indexes) and ProjectCollaborator model (project relation with cascade delete, email, unique constraint, indexes)
- Updated `package.json` with `"prisma": { "schema": "prisma/models/" }` to point Prisma CLI at the models directory
- Existing `prisma.config.ts` (auto-generated) with `schema: "prisma/"` correctly resolves `.prisma` files in subdirectories
- Created `lib/prisma.ts` as a cached singleton, branching on `DATABASE_URL`: uses Accelerate when URL starts with `prisma+postgres://`, otherwise uses `@prisma/adapter-pg` with `pg.Pool`
- Caches client on `globalThis` in non-production for Next.js hot reload safety
- Ran `prisma migrate dev --name init` — migration created both tables with all indexes, unique constraints, and cascade delete
- `prisma generate` outputs client to `app/generated/prisma/`
- Import uses `@/app/generated/prisma/client` path alias instead of `@prisma/client` (which re-exports from `.prisma/client/default` — not present with custom output path)
- `npm run build` passes

## Next Up

- Workspace page route and canvas integration

## Open Questions

- None yet.

## Architecture Decisions

- Dark-only theme: all CSS variables are set in `:root` with dark values; no `.dark` selector.
- Project design tokens (--bg-base, --text-primary, etc.) live alongside shadcn variables in the same `:root` and `@theme inline` blocks.
- ClerkProvider uses `dark` theme from @clerk/ui/themes as base, overlaying CSS custom property overrides via `appearance.variables`.
- Protected-first middleware strategy: all routes are protected by default except `/`, `/sign-in`, and `/sign-up`.
- Auth pages use CSS variable tokens (`var(--accent-primary)`, `var(--text-primary)`, etc.) — no hardcoded colors.
- UserButton appearance mirrors the same theme override for visual consistency with the editor chrome.
- Schema split across multiple `.prisma` files under `prisma/models/` via Prisma's multi-file support (auto-discovered by `schema: "prisma/"` config in `prisma.config.ts`).
- Generator output path `../../app/generated/prisma` (relative to `prisma/models/`) keeps generated code outside `node_modules` for visibility.
- `lib/prisma.ts` imports from `@/app/generated/prisma/client` (via `@/*` alias) instead of `@prisma/client`, because the latter re-exports from `.prisma/client/default` which isn't populated with custom generator output paths.
- PrismaClient in Prisma 7 requires either `adapter` or `accelerateUrl`; the singleton branches on `DATABASE_URL` prefix to choose between Accelerate and direct PostgreSQL adapter.

## Session Notes

- globals.css stripped to just @import "tailwindcss" before design system work.
- shadcn init (base-nova style) created components.json, lib/utils.ts, and the Button component.
- lucide-react was already a transitive dependency; added explicitly.
- 6 additional components installed: Card, Dialog, Input, Tabs, Textarea, ScrollArea.
- Build and lint both pass cleanly.
- Created components/editor/ directory.
- Editor Navbar: ghost icon button (PanelLeftOpen when open, PanelLeftClose when closed), fixed h-12, bg-surface, bottom border, 3-section flex layout.
- Project Sidebar: fixed-position floating overlay with backdrop, slides via translate-x, rounded-2xl border-surface panel, controlled shadcn Tabs with two tabs, New Project button with Plus icon.
- Dialog pattern: no new code needed — existing dialog.tsx already exposes DialogHeader, DialogFooter, DialogTitle, DialogDescription with correct token usage.
- Auth (Phase 03) completed in one session: @clerk/ui installed, proxy.ts, ClerkProvider, sign-in/up pages, root page redirect, editor workspace, UserButton in navbar. All styles use CSS custom properties via Clerk appearance variables.
- Phase 05 (Prisma) completed in one session: multi-file schema restructure, Project + ProjectCollaborator models, lib/prisma.ts singleton, migration applied, generated client at `app/generated/prisma/`, build passes.
- Key lesson: Prisma 7's `@prisma/client` package re-exports from `.prisma/client/default`. With a custom generator output path, those files aren't created, so direct import from the generated client path is required.
- Key lesson: Prisma 7 `PrismaClient` constructor requires one argument — either `adapter` (for `@prisma/adapter-pg`) or `accelerateUrl` (for Accelerate). Empty options aren't accepted by the strict `Subset` type.
