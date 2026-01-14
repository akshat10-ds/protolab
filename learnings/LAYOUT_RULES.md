# DocuSign Layout Rules

> Comprehensive layout rules extracted from DocuSign production for prototype generation.

---

## 1. Global Shell

### GlobalNav (Header)
```
Height: 64px
Padding: 0px 16px
Background: white (#fff)
Border-bottom: 1px solid rgba(19, 0, 50, 0.1)
Position: fixed top
Z-index: high (sticky)
```

### LocalNav (Sidebar)
```
Width: 280px (expanded)
Background: transparent (inherits from page)
Position: fixed left, below GlobalNav
```

### Content Area
```
Left offset: 280px (sidebar width)
Top offset: 64px (header height)
Padding: varies by page type
Max-width: none (full width)
```

---

## 2. Spacing System

### Base Unit
DocuSign uses a **4px base unit** with an **8px scale**.

### Spacing Scale
| Token | Value | Usage |
|-------|-------|-------|
| xs | 4px | Tight spacing, icon gaps |
| sm | 8px | Badge padding, compact spacing |
| md | 12px | Button padding, nav item spacing |
| lg | 16px | Cell padding, standard gaps |
| xl | 20px | Tab padding, section spacing |
| 2xl | 24px | Footer padding, card margins |

### Common Patterns
- **Button padding**: 4px 12px (vertical horizontal)
- **Nav item padding**: 11px 15px 11px 23px (top right bottom left)
- **Table cell padding**: 4px 16px
- **Tab padding**: 12px 20px
- **Card border-radius**: 4px (universal)

---

## 3. Typography Scale

### Headings
| Level | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| H1 | 32px | 400 | 40px | Page titles |
| H2 | 24px | 400 | 30px | Section headers, welcome text |
| H3 | 16px | 500 | 20px | Card titles, subsections |

### Body Text
| Level | Size | Weight | Usage |
|-------|------|--------|-------|
| Body Large | 16px | 400-500 | Buttons, inputs, primary actions |
| Body | 14px | 400 | Table cells, nav items, general text |
| Caption | 12px | 500-600 | Table headers, badges, section labels |

### Font Weights
- 400: Normal (body text, headings)
- 500: Medium (buttons, active states)
- 600: Semi-bold (labels, headers, active nav)
- 700: Bold (sidebar section headers)

---

## 4. Color Semantic Tokens

### Text Colors
| Token | Value | Usage |
|-------|-------|-------|
| text-primary | rgba(19, 0, 50, 0.9) | Primary text |
| text-secondary | rgba(19, 0, 50, 0.7) | Muted text, labels |
| text-white | #fff | On dark backgrounds |
| text-link | rgb(36, 99, 209) | Links |
| text-active | rgb(0, 95, 67) | Active/success status |

### Background Colors
| Token | Value | Usage |
|-------|-------|-------|
| bg-primary | rgb(38, 5, 89) | Primary buttons, brand |
| bg-primary-light | rgb(202, 194, 255) | Secondary brand (Start on Home) |
| bg-badge-dark | rgb(43, 40, 67) | NEW badges |
| bg-ghost | rgba(19, 0, 50, 0.05) | Ghost buttons |
| bg-white | #fff | Cards, surfaces |

### Border Colors
| Token | Value | Usage |
|-------|-------|-------|
| border-subtle | rgba(19, 0, 50, 0.1) | Card borders, dividers |
| border-medium | rgba(19, 0, 50, 0.5) | Outline buttons, inputs |
| border-white | rgba(255, 255, 255, 0.5) | Buttons on dark bg |

---

## 5. Component Dimensions

### Buttons
| Variant | Height | Padding | Border-radius |
|---------|--------|---------|---------------|
| Primary | 40px | 4px 12px | 4px |
| Secondary/Ghost | 40px | 4px 12px | 4px |
| Outline | 40px | 4px 12px | 4px |
| Filter/Compact | 32px | 0px 8px 0px 12px | 4px |

### Inputs
| Element | Height | Font Size |
|---------|--------|-----------|
| Search Input | 30-32px | 16px |
| Dropdown/Select | 32px | 16px |

### Navigation Items
| Element | Height | Font Size |
|---------|--------|-----------|
| GlobalNav item | 64px | 16px |
| LocalNav item | 48px | 14px |
| Sub-nav item | 44px | 14px |

### Table
| Element | Height | Font Size |
|---------|--------|-----------|
| Header row | 49px | 12px |
| Body row | 68px (default) | 14px |
| Body row expanded | 87px | 14px |

### Misc
| Element | Dimensions |
|---------|------------|
| Avatar | 40px × 40px |
| Icon button | 40px × 40px |
| Toggle switch | 44px × 32px |
| Checkbox | 32px × 44px |

---

## 6. Button Variants

### Primary Button
```css
background: rgb(38, 5, 89);
color: white;
border: none;
height: 40px;
padding: 4px 12px;
border-radius: 4px;
font: 16px/500;
```

### Secondary/Ghost Button
```css
background: rgba(19, 0, 50, 0.05);
color: rgba(19, 0, 50, 0.9);
border: none;
height: 40px;
padding: 4px 12px;
border-radius: 4px;
font: 16px/500;
```

### Outline Button
```css
background: transparent;
color: rgba(19, 0, 50, 0.9);
border: 1px solid rgba(19, 0, 50, 0.5);
height: 40px;
padding: 4px 12px;
border-radius: 4px;
font: 16px/500;
```

### Filter Button (Compact)
```css
background: transparent;
border: 1px solid rgba(19, 0, 50, 0.5);
height: 32px;
padding: 0px 8px 0px 12px;
border-radius: 4px;
font: 16px;
```

---

## 7. Status Indicators

### Status Text Colors
| Status | Color |
|--------|-------|
| Active | rgb(0, 95, 67) - green |
| Inactive | rgba(19, 0, 50, 0.7) - muted |
| Expired | rgba(19, 0, 50, 0.7) - muted |
| Voided | rgba(19, 0, 50, 0.7) - muted |

### Status Badge Pattern
- Font: 12px, 500 weight
- Usually accompanied by dot indicator

---

## 8. Visual Hierarchy Rules

### When to Use Cards
- Dashboard widgets
- Reports/chart containers
- Settings sections
- NOT for tables (tables are flat)

### Card Styling
```css
border: 1px solid rgba(19, 0, 50, 0.1);
border-radius: 4px;
background: transparent or white;
padding: varies (typically 16-24px);
```

### Section Headers
```css
/* Sidebar section headers */
font-size: 12px;
font-weight: 600;
letter-spacing: 0.12px;
color: rgba(19, 0, 50, 0.7);
text-transform: uppercase (visually);
```

### Dividers
- Use border-bottom: 1px solid rgba(19, 0, 50, 0.1)
- Between major sections
- NOT between table rows (rows have natural spacing)

---

## 9. Responsive Patterns

### Sidebar Behavior
- Desktop: 280px fixed sidebar
- Tablet/Mobile: Collapsible to icon-only or hidden

### Content Max-Width
- No max-width constraint
- Content fills available space
- Tables scroll horizontally if needed

---

## 10. Z-Index Layers
| Layer | Z-Index | Components |
|-------|---------|------------|
| Base | 0 | Content |
| Sticky | 10 | Table headers |
| Navigation | 100 | GlobalNav, LocalNav |
| Dropdown | 200 | Menus, popovers |
| Modal | 300 | Dialogs, overlays |
| Toast | 400 | Notifications |

---

## 11. Status Badge Variants (Pass 2)

### Colored Background Badges
Status badges can have colored backgrounds instead of just text color:

| Variant | Background | Text Color | Usage |
|---------|------------|------------|-------|
| Active | rgb(185, 246, 221) | rgb(0, 95, 67) | Active parties, statuses |
| Inactive | rgb(240, 239, 240) | rgba(19, 0, 50, 0.7) | Inactive parties |
| New | rgb(43, 40, 67) | white | Nav item badges |

### Badge Dimensions
```css
padding: 0px 8px;
border-radius: 4px;
font-size: 12px;
font-weight: 500;
```

---

## 12. Feature Introduction Pages (Pass 2)

### Hero Title (Onboarding)
Different from standard page title:
```css
font-size: 32px;
font-weight: 600; /* Heavier than normal page titles (400) */
line-height: 40px;
```

### Section Header (H2)
```css
font-size: 24px;
font-weight: 600;
line-height: 30px;
```

### Action Links (Purple)
Different from regular link blue:
```css
color: rgb(108, 58, 230); /* Purple, not blue */
font-size: 16px;
font-weight: 500;
text-decoration: none; /* No underline */
```

### Body Text (Intro)
```css
font-size: 16px;
font-weight: 400;
line-height: 24px;
color: rgba(19, 0, 50, 0.7); /* Muted */
```

---

## 13. Error Pages (Pass 2)

### Error Title (404)
```css
font-size: 32px;
font-weight: 700; /* Bold - heaviest weight */
color: rgb(0, 0, 0); /* Pure black */
```

### Error Description
```css
font-size: 16px;
font-weight: 400;
color: rgb(0, 0, 0);
```

### Error Page Layout
- Centered content
- Purple decorative illustration/line at top
- No sidebar
- Go Back button: Outline variant

---

## 14. Sub-Tabs Pattern (Pass 2)

### Sub-Tab Bar (e.g., All | Recent | Starred)
```css
height: ~44px;
padding: 12px 20px;
font-size: 14px;
font-weight: 500; /* active */
font-weight: 400; /* inactive */
```

Used on:
- Parties page (All, Recent, Starred)
- Templates page (Templates, Elastic Templates)

---

## 15. Admin Dashboard Layout (Pass 2)

### Admin Typography (Heavier than Main App)
```css
/* Page Title - Admin */
font-size: 32px;
font-weight: 700; /* Bold, vs 400 in main app */
line-height: 48px;

/* Section Headers - Admin */
font-size: 24px;
font-weight: 700; /* Bold */
line-height: 36px;
```

### Promo Card Pattern
```css
/* Promo Card Title */
font-size: 24px;
font-weight: 600;
line-height: 30px;

/* Promo Card Body */
font-size: 16px;
font-weight: 400;
line-height: 24px;
```

### Notification Item Pattern
```css
/* Notification Title */
font-size: 18.72px; /* ~19px */
font-weight: 700;

/* Notification Body */
font-size: 16px;
font-weight: 400;
line-height: 24px;

/* Timestamp */
font-size: 16px;
font-weight: 400;
```

### Admin Sidebar
- Account name at top: 19px, 700 weight
- Section headers: UPPERCASE labels
- Nav items: Same as main app

---

## 16. Settings Page Patterns (Pass 2)

### Form Section Layout
```
┌─────────────────────────────────────────────────────────────┐
│ [H2 Section Title: 24px/700]                                 │
│ Description text (16px, muted)                               │
│                                                              │
│ ┌── Link Button ──┐  ┌── Link Button ──┐                   │
│ │ In-session...   │  │ Watermark...    │                   │
│ └─────────────────┘  └─────────────────┘                   │
│                                                              │
│ Label text (16px)                                            │
│ ┌── Dropdown ──────────────────────────────┐                │
│ │ Selected value                        ▼  │                │
│ └──────────────────────────────────────────┘                │
└─────────────────────────────────────────────────────────────┘
```

### Checkbox Row Pattern
```css
height: 40px;
/* Contains: checkbox (20px) + label (16px, 400) */
```

### Radio Button Pattern
```css
/* Radio Button */
width: 20px;
height: 20px;

/* Radio Label */
font-size: 16px;
font-weight: 400;
```

### Link Button (Navigate to Sub-page)
```css
height: 40px;
padding: 4px 12px;
background: transparent;
border: 1px solid rgba(19, 0, 50, 0.5);
border-radius: 4px;
font-size: 16px;
```

### Compact Filter Dropdown
```css
height: 32px;
padding: 0px 8px 0px 12px;
font-size: 14px;
border-radius: 4px;
```

---

## 17. Reports/Dashboard Patterns (Pass 2)

### Chart Card
```css
width: 584px; /* Half of content area */
height: 400px;
border: 1px solid rgba(19, 0, 50, 0.1);
border-radius: 4px;
```

### Card Title (within chart card)
```css
font-size: 16px;
font-weight: 400;
line-height: 22.4px;
```

### Info Banner
```css
height: 54px;
/* Purple background with white text */
/* "See what's new" outline button */
```

---

## 18. Hover & Interaction States (Pass 3)

### Button Hover States
```css
/* Primary Button */
.button-primary {
  background: rgb(38, 5, 89);
}
.button-primary:hover {
  background: rgb(43, 4, 127); /* Lighter purple */
}

/* Ghost/Secondary Button */
.button-ghost {
  background: transparent;
}
.button-ghost:hover {
  background: rgba(19, 0, 50, 0.05); /* Light gray */
}

/* Outline Button */
.button-outline {
  background: transparent;
  border: 1px solid rgba(19, 0, 50, 0.5);
}
.button-outline:hover {
  background: rgba(19, 0, 50, 0.05);
}
```

### Nav Item States
```css
/* Default */
.nav-item {
  background: transparent;
}

/* Hover */
.nav-item:hover {
  background: rgba(19, 0, 50, 0.05);
}

/* Active/Selected */
.nav-item.active {
  border-left: 4px solid rgb(38, 5, 89);
  font-weight: 600;
  background: rgba(19, 0, 50, 0.05);
}
```

### Link States
```css
a {
  color: rgb(36, 99, 209);
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
```

### Table Row Hover
```css
tr:hover {
  background: rgba(19, 0, 50, 0.02); /* Very subtle */
}
```

---

## 19. Responsive Breakpoints (Pass 3)

### Breakpoint Scale
| Breakpoint | Width | Sidebar | Table |
|------------|-------|---------|-------|
| Desktop | 1024px+ | Full (280px) | All columns |
| Tablet | 768px-1023px | Visible | Truncated columns |
| Mobile | <768px | Hidden (hamburger) | Minimal + scroll |

### Mobile Layout Changes
```css
/* Mobile (< 768px) */
@media (max-width: 767px) {
  /* Header */
  .global-nav {
    /* Show hamburger menu icon */
    /* Hide text navigation items */
  }

  /* Sidebar */
  .local-nav {
    display: none; /* Hidden, opens from hamburger */
    position: fixed;
    z-index: 200;
  }

  /* Content */
  .content-area {
    margin-left: 0; /* Full width */
    padding: 16px;
  }

  /* Table */
  .data-table {
    overflow-x: auto; /* Horizontal scroll */
  }
  .data-table th:not(:first-child):not(:nth-child(2)) {
    display: none; /* Hide extra columns */
  }
}
```

### Mobile Navigation Pattern
- Hamburger menu icon (3 lines) in top-left
- Back arrow appears below header for navigation context
- Full-width content area
- Cards may stack vertically

---

## 20. Component Composition (Pass 4)

### Vertical Composition - List Page (Navigator)

```
┌─────────────────────────────────────────────────────────────┐
│ GlobalNav (64px)                                             │
├─────────────────────────────────────────────────────────────┤
│ ↓ 32px padding                                               │
│ ┌─ Page Title (H1) ────────────────────────────────────────┐│
│ │ Completed          [AI Badge]        [Icon] [Icon]      ││
│ └──────────────────────────────────────────────────────────┘│
│ ↓ 16px                                                       │
│ ┌─ Info Banner ────────────────────────────────────────────┐│
│ │ ✨ 0 agreements with renewal notice dates...     [Link]  ││
│ └──────────────────────────────────────────────────────────┘│
│ ↓ 0px (adjacent)                                             │
│ ┌─ ActionBar ──────────────────────────────────────────────┐│
│ │ [Dropdown▼] [🔍 Search...............] [⚙] [Filters] ... ││
│ └──────────────────────────────────────────────────────────┘│
│ ↓ 85px (large gap)                                           │
│ ┌─ Table ──────────────────────────────────────────────────┐│
│ │ [Header: 49px]                                            ││
│ │ [Row: 68px each]                                          ││
│ │ ...                                                        ││
│ └──────────────────────────────────────────────────────────┘│
│ ┌─ Pagination ─────────────────────────────────────────────┐│
│ │ [25/Page ▼]                              [<] [>] Page 1  ││
│ └──────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

### ActionBar - Horizontal Composition

```
┌─────────────────────────────────────────────────────────────────────────┐
│ [Documents▼]──53px──[🔍]─[Search Input: 366px]─8px─[💾]─8px─[Filters]─8px│
│                                                    [Status]─8px─[Parties]│
└─────────────────────────────────────────────────────────────────────────┘
```

**Pattern**: Consistent 8px gap between filter buttons

### Pagination - Split Layout

```
┌─────────────────────────────────────────────────────────────┐
│ [Page Size ▼]                                   [<] [>] 1/10│
│   LEFT-ALIGNED                                  RIGHT-ALIGNED│
└─────────────────────────────────────────────────────────────┘
```

### Alternative Composition - Templates Page

When sub-tabs are present:
```
┌─────────────────────────────────────────────────────────────┐
│ GlobalNav (64px)                                             │
├───────────────┬─────────────────────────────────────────────┤
│ LocalNav      │ [Templates] [Elastic Templates] ← Sub-tabs  │
│ (280px)       │─────────────────────────────────────────────│
│               │ Page Title (H1)                              │
│ ┌───────────┐ │                                              │
│ │SECTION    │ │ [ActionBar]                                  │
│ │ Item 1    │ │                                              │
│ │ Item 2    │ │ [Table]                                      │
│ │ Item 3    │ │                                              │
│ └───────────┘ │                                              │
│ ┌───────────┐ │                                              │
│ │SECTION 2  │ │                                              │
│ │ Item A    │ │                                              │
│ └───────────┘ │                                              │
└───────────────┴─────────────────────────────────────────────┘
```

**Sub-tabs position**: Immediately at y:64, no padding from GlobalNav

### Error Page - Centered Composition

```
┌─────────────────────────────────────────────────────────────┐
│ GlobalNav (64px, minimal)                                    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│              ~~~~ Purple Illustration ~~~~                   │
│                                                              │
│             Looks like this page is not here                │
│               Check your URL, or go back                     │
│                                                              │
│                     [ Go Back ]                              │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

**Pattern**: Centered layout, no sidebar

---

## 21. Composition Rules Summary (Pass 4)

| Rule | Value | Usage |
|------|-------|-------|
| Content top padding | 32px | From GlobalNav to first content |
| Title to Banner gap | 16px | Related elements |
| Banner to ActionBar | 0px | Directly adjacent |
| ActionBar to Table | ~85px | Large visual break |
| Filter button gap | 8px | Consistent horizontal spacing |
| Sub-tabs position | y:64 | No gap from GlobalNav |

---

*Generated from DocuSign production analysis - Pass 1, Pass 2, Pass 3 & Pass 4*
