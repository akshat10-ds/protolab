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
| Input | ⏳ Pending | | |
| TextArea | ⏳ Pending | | |
| Select | ⏳ Pending | | |
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
| Tabs | ⏳ Pending | | |
| Table | ⏳ Pending | | |
| Accordion | ⏳ Pending | | |
| Menu | ⏳ Pending | | |
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

---

## Completed Log

| Component | Date | Notes |
|-----------|------|-------|
| Button | 2026-01-11 | Padding 8px vertical, min-width 80px, removed rounded, showcase curated |
| IconButton | 2026-01-11 | Danger variant fixed (transparent bg + red icon), removed shadows, registry fixed |
| ComboButton | 2026-01-11 | Tertiary always icon-only (compact), removed shadows, added to registry |
