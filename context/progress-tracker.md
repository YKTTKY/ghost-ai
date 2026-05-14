# Progress Tracker

Update this file whenever the current phase, active feature, or implementation state changes.

## Current Phase

- 03 - Auth

## Current Goal

- Wire Clerk into the Next.js app: provider, proxy.ts, auth pages, route protection, and user menu.

## Completed

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

## In Progress

- None yet.

## Completed

- Fixed logout render error: moved ClerkProvider inside `<body>` to prevent hydration edge cases, and set `afterSignOutUrl="/sign-in"` on ClerkProvider so sign-out redirects directly to sign-in instead of the double-redirect through `/`.
- Polished Clerk auth UI: added global CSS overrides in globals.css targeting the correct DOM class names. `cl-socialButtonsBlockButton` (the actual rendered selector, not `cl-socialButtonsIconButton`) now gets a visible `--border-default` border; `cl-socialButtonsBlockButtonText` uses `--text-primary`; `cl-lastAuthenticationStrategyBadge` uses visible muted/subtle colors. `cl-socialButtonsIconButton` also targeted for non-last-used icons.

## Next Up

- TBD

## Open Questions

- None yet.

## Architecture Decisions

- Dark-only theme: all CSS variables are set in `:root` with dark values; no `.dark` selector.
- Project design tokens (--bg-base, --text-primary, etc.) live alongside shadcn variables in the same `:root` and `@theme inline` blocks.
- ClerkProvider uses `dark` theme from @clerk/ui/themes as base, overlaying CSS custom property overrides via `appearance.variables`.
- Protected-first middleware strategy: all routes are protected by default except `/`, `/sign-in`, and `/sign-up`.
- Auth pages use CSS variable tokens (`var(--accent-primary)`, `var(--text-primary)`, etc.) — no hardcoded colors.
- UserButton appearance mirrors the same theme override for visual consistency with the editor chrome.

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
