# User Surface Redesign

## Scope

- Extend the existing auth redesign into the authenticated user product surfaces.
- Prioritize:
  - `frontend/src/views/user/DashboardView.vue`
  - `frontend/src/views/user/KeysView.vue`
  - `frontend/src/views/user/AvailableChannelsView.vue`
  - `frontend/src/views/user/UsageView.vue`
- Allow supporting changes in:
  - `frontend/src/components/layout/**`
  - `frontend/src/components/user/**`
  - `frontend/src/components/common/**`
  - `frontend/src/components/channels/**`
  - `frontend/src/style.css`
  - `frontend/tailwind.config.js`

## Source Of Truth

- Handoff scope: `handoff-wui.md`
- Stitch project id: `13054333511151816723`
- Stitch design system: `assets/7928076554918489394` (`Sub2API Register Copper Slate`)
- Stitch-generated local references:
  - `.stitch/designs/dashboard-screen.png`
  - `.stitch/designs/keys-screen.png`
  - `.stitch/designs/dashboard-screen.html`
  - `.stitch/designs/keys-screen.html`

## Product Intent

- The authenticated area should feel like an operator console, not a generic SaaS dashboard.
- The user should be able to scan balance, throughput, key health, and usage state quickly.
- Navigation, controls, and data panels should read as one system with the auth shell rather than a second unrelated theme.

## Visual Direction

- Style: dark slate industrial control panel with copper-led emphasis.
- Atmosphere: low-glow, layered graphite surfaces, faint technical grid, and compact panel spacing.
- Tone: premium, dense, and technical, with calm structure instead of flashy gradients.
- Hierarchy: strong header/section framing, clear data grouping, and restrained use of accent color.

## Implementation Guardrail

- Preserve the official page structure and data layout whenever possible.
- Prefer minimal visual adaptation over structural redesign:
  - recolor surfaces, borders, and emphasis
  - swap fonts
  - tighten or soften radius values
  - adjust button shape and weight
  - make small spacing and alignment corrections
- Do **not** introduce new side panels, hero blocks, auxiliary notes, or large layout reshuffles inside individual pages unless the operator explicitly asks for a deeper redesign pass.
- Apply the visual system primarily through:
  - `frontend/src/style.css`
  - shared controls in `frontend/src/components/common/**`
  - shell/layout files
- Only move into page-specific layout changes after shared theming is stable and verified.

## Palette

- Base background: `#121416`
- Structural darks: `#1a1c1e`, `#202224`, `#2d2f31`
- Border / divider: `#3d3f41` with opacity variants
- Copper primary: `#d48d62`
- Copper hover / warm accent: `#e5a682`
- Warm sand text accent: `#f0ddc6`
- Positive mint: `#7dd3b0`
- Critical / warning states remain semantic, but should sit inside the darker palette cleanly.

## Typography

- Headlines: `Space Grotesk`
- Body: `Inter`
- Utility / numbers / endpoint snippets: `JetBrains Mono`
- Labels should skew uppercase, tight, and compact for control-panel feel.

## Layout Model

- Persistent left rail with narrow active-state emphasis.
- Compact top utility header with environment/context information.
- Main content uses stacked sections:
  - page intro + action cluster
  - KPI strip
  - data / chart grid
  - detail tables and side utility cards
- Panels should be tighter and flatter than the previous rounded teal UI.

## Page Mapping

### Dashboard

- Introduce an operator-style title block with immediate action buttons.
- KPI strip should feel dense and tabular.
- Charts and recent activity should share one control-panel grid.
- Quick actions become a right-side utility rail instead of generic cards.

### API Keys

- Introduce a title/summary layer above filters.
- Add a summary strip for total keys, active keys, quotas, and spend.
- Frame filters and endpoint info as an operator toolbar.
- The table should read as the primary control surface with more compact contrast and better action grouping.

### Available Channels

- Add a proper intro and utility framing, not just a bare search row.
- Present channel data as an operator catalog with dense, grouped channel sections.
- Keep row semantics intact but move the shell toward the copper/slate system.

### Usage

- Treat summary stats as a control header, not detached marketing cards.
- Filters should live in the same panel system as dashboard and keys.
- Table and tooltips should feel like analysis infrastructure rather than default data-table styling.

## Interaction Constraints

- Do not break existing table behavior, filters, sorting, pagination, or actions.
- Do not remove current endpoint, quota, status, or export functionality.
- Keep business logic untouched unless a visual restructure absolutely requires moving markup.

## Verification Plan

- Build and run the frontend locally.
- Inspect the updated pages in-browser on this machine.
- Compare the live result against the downloaded Stitch dashboard and keys references.
