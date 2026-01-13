# Figma Sync Progress

Tracking component updates from Figma source of truth.

## Status Legend
- ✅ Completed
- 🔄 In Progress
- 📋 Planned (awaiting approval)
- ⏳ Pending

---

## Layer 3: Primitives

| Component | Status | Figma Node | Changes Summary |
|-----------|--------|------------|-----------------|
| Button | ✅ Completed | `10-557` | Padding 8px vertical, min-width 80px, removed rounded, showcase: small/medium only |
| IconButton | ✅ Completed | `14-953` | Danger: transparent bg with red icon (hover shows red bg), removed shadows |
| Link | ⏳ Pending | | |
| Input | ✅ Completed | `144-17002` | Wrapper gap 4px, description 12px/medium, focus: 2px solid cobalt-120 |
| TextArea | ✅ Completed | `261-2190` | Description typography aligned, min-height 64px, padding 8px |
| Select | ✅ Completed | `259-5197` | Border color tokens, description typography aligned |
| Checkbox | ⏳ Pending | | |
| Radio | ⏳ Pending | | |
| Switch | ⏳ Pending | | |
| Slider | ⏳ Pending | | |
| Card | ⏳ Pending | | |
| Badge | ⏳ Pending | | |
| Chip | ⏳ Pending | | |
| Avatar | ⏳ Pending | | |
| Tooltip | ⏳ Pending | | |
| Spinner | ⏳ Pending | | |
| ProgressBar | ⏳ Pending | | |
| Divider | ⏳ Pending | | |
| Icon | ⏳ Pending | | |

## Layer 4: Composites

| Component | Status | Figma Node | Changes Summary |
|-----------|--------|------------|-----------------|
| ComboButton | ✅ Completed | `14-4252` | Tertiary is always icon-only (compact), removed shadows |
| Modal | ⏳ Pending | | |
| Drawer | ⏳ Pending | | |
| Tabs | ✅ Completed | `875-21503` | Gap 0, 2px border, subtle/emphasis colors, semibold selected, min-width 80px |
| Table | ⏳ Pending | | |
| Accordion | ⏳ Pending | | |
| Menu/Dropdown | ✅ Completed | `31271-47714` | Added shadow (elevated), header 12px/600/0.16px, description 12px/500/0.16px |
| Popover | ⏳ Pending | | |
| SearchInput | ⏳ Pending | | |
| Pagination | ⏳ Pending | | |
| Breadcrumb | ⏳ Pending | | |
| List | ⏳ Pending | | |

## Layer 5: Patterns

| Component | Status | Figma Node | Changes Summary |
|-----------|--------|------------|-----------------|
| GlobalNav | ⏳ Pending | | |
| LocalNav | ⏳ Pending | | |

---

## Showcase Optimization Notes

Components should only show production-proven options:
- **Button**: small, medium only (no large/xlarge), no rounded prop
- **IconButton**: small, medium only, variant prop (not kind), danger shows unique behavior
- **ComboButton**: small, medium only, tertiary is always icon-only (compact)
- **Dropdown**: header prop for section titles, iconStyle='boxed' for view selectors, selected prop for checkmark

---

## Completed Log

| Component | Date | Notes |
|-----------|------|-------|
| Button | 2026-01-11 | Padding 8px vertical, min-width 80px, removed rounded, showcase curated |
| IconButton | 2026-01-11 | Danger variant fixed (transparent bg + red icon), removed shadows, registry fixed |
| ComboButton | 2026-01-11 | Tertiary always icon-only (compact), removed shadows, added to registry |
| Input | 2026-01-12 | Wrapper gap 4px, description 12px/medium/0.16px, focus: 2px cobalt-120 |
| TextArea | 2026-01-12 | Description typography aligned, min-height 64px, padding 8px, character count |
| Select | 2026-01-12 | Border token updated, description typography aligned |
| Tabs | 2026-01-12 | No gap, 2px border, subtle/emphasis colors, semibold selected |
| Dropdown | 2026-01-12 | Added shadow (elevated), header/description typography, registry updated |
