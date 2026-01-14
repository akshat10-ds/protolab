# DocuSign Layout Measurements

> Raw measurement data extracted from DocuSign production.
> Updated incrementally during exploration passes.

---

## Pass 1: Initial Extraction

### Shell & Global Layout

#### GlobalNav (Header)
| Property | Value | Notes |
|----------|-------|-------|
| Height | 64px | Fixed header |
| Padding | 0px 16px | Horizontal padding |
| Background | rgb(255, 255, 255) | White |
| Border-bottom | 1px solid rgba(19, 0, 50, 0.1) | Subtle separator |

#### LocalNav (Sidebar)
| Property | Value | Notes |
|----------|-------|-------|
| Width | 280px | Expanded state |
| Background | transparent | Inherits from shell |

#### Sidebar Nav Items
| Property | Value | Notes |
|----------|-------|-------|
| Height | 48px | Standard item |
| Padding | 11px 15px 11px 23px | Left indent for hierarchy |
| Font Size | 14px | Body text size |
| Font Weight | 400 (normal), 600 (active) | Bold when selected |
| Color | rgba(19, 0, 50, 0.9) | Near-black text |
| Section Headers | 32px height, 0.7 opacity | "Folders" style |

#### Start Button (Primary CTA)
| Property | Value | Notes |
|----------|-------|-------|
| Width | 248px | Full sidebar width minus padding |
| Height | 40px | Standard button height |
| Padding | 4px 12px 4px 8px | Asymmetric for icon |
| Background | rgb(38, 5, 89) | DocuSign purple |
| Border Radius | 4px | Subtle rounding |
| Font Size | 16px | Larger than nav items |
| Font Weight | 500 | Medium weight |

---

### Navigator (List View) Patterns

#### Page Title (H1)
| Property | Value | Notes |
|----------|-------|-------|
| Font Size | 32px | Large heading |
| Font Weight | 400 | Normal weight (not bold!) |
| Line Height | 40px | 1.25 ratio |
| Color | rgba(19, 0, 50, 0.9) | Near-black |
| Margin Bottom | 0px | Tight to content |

#### Table Header
| Property | Value | Notes |
|----------|-------|-------|
| Row Height | 49px | Header row |
| Cell Padding | 4px 16px | Horizontal padding |
| Font Size | 12px | Smaller than body |
| Font Weight | 600 | Semi-bold |
| Background | rgb(255, 255, 255) | White |

#### Table Body
| Property | Value | Notes |
|----------|-------|-------|
| Row Height | ~68px (default), ~87px (expanded) | Variable based on content |
| Cell Padding | 4px 16px | Consistent with header |
| Font Size | 14px | Body text |
| Font Weight | 400 | Normal |

#### Search Input
| Property | Value | Notes |
|----------|-------|-------|
| Width | 366px | Inner width |
| Height | 30px | Input height |
| Padding | 8px 16px 8px 0px | Right padding for icon |
| Font Size | 16px | Larger for readability |

#### Filter Dropdown
| Property | Value | Notes |
|----------|-------|-------|
| Height | 32px | Compact |
| Padding | 0px 48px 0px 16px | Right space for arrow |
| Border Radius | 4px | Consistent with buttons |

---

### Typography Scale (Observed)

| Level | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| H1 | 32px | 400 | 40px | Page titles |
| Body | 14px | 400 | - | Table cells, nav items |
| Body Large | 16px | 500 | - | Buttons, search input |
| Label/Header | 12px | 600 | - | Table headers, section labels |

---

### Color Palette (Observed)

| Token | Value | Usage |
|-------|-------|-------|
| Primary Purple | rgb(38, 5, 89) | Primary buttons, brand |
| Text Primary | rgba(19, 0, 50, 0.9) | Main text |
| Text Secondary | rgba(19, 0, 50, 0.7) | Muted text, section headers |
| Border | rgba(19, 0, 50, 0.1) | Subtle borders |
| Background | rgb(255, 255, 255) | Cards, headers |
| Link Blue | rgb(36, 99, 209) | Some links |

---

### Spacing Observations

| Context | Value | Notes |
|---------|-------|-------|
| Nav item padding-left | 23px | Indent from sidebar edge |
| Cell padding horizontal | 16px | Consistent table cells |
| Cell padding vertical | 4px | Tight vertical |
| Button padding | 4px 12px | Standard button |
| Border radius | 4px | Universal for buttons/inputs |

---

---

### Home/Dashboard Page

#### Welcome Banner
| Property | Value | Notes |
|----------|-------|-------|
| Background | rgb(38, 5, 89) | DocuSign purple gradient |
| Welcome text | 24px, 400 weight, 30px line-height | White text |

#### Quick Action Buttons (Home)
| Property | Value | Notes |
|----------|-------|-------|
| Height | 40px | Standard button |
| Padding | 4px 12px | Consistent |
| Font Size | 16px | Body large |
| Font Weight | 500 | Medium |
| Border Radius | 4px | Consistent |
| Start Button BG | rgb(202, 194, 255) | Lavender/light purple |
| Other Buttons | transparent | White border 1px rgba(255,255,255,0.5) |

#### Section Labels (Tasks, Overview, etc.)
| Property | Value | Notes |
|----------|-------|-------|
| Font Size | 16px | Body text size |
| Font Weight | 500 | Medium weight |
| Color | rgba(19, 0, 50, 0.9) | Standard text |

#### Status Text (Voided, etc.)
| Property | Value | Notes |
|----------|-------|-------|
| Font Size | 16px | Body text |
| Font Weight | 400 | Normal |
| Color | rgba(19, 0, 50, 0.7) | Muted/secondary |

#### Footer Measurements
| Property | Value | Notes |
|----------|-------|-------|
| Height | 51px | Footer bar |
| Padding | 0px 24px | Horizontal padding |

#### Pagination
| Property | Value | Notes |
|----------|-------|-------|
| Page Selector | 32px height, 136px width | Dropdown |
| Arrow Buttons | 40px × 40px | Square icon buttons |
| Font Size | 16px | Page selector text |

---

## Pass 1 Progress

- [x] GlobalNav measurements
- [x] LocalNav measurements
- [x] Sidebar nav items
- [x] Page title (H1)
- [x] Table header/body
- [x] Search input
- [x] Filter dropdown
- [x] Pagination
- [x] Footer
- [x] Dashboard/Home page
- [ ] Templates page
- [ ] Reports page
- [ ] Agreement Detail page

---

### Templates Page

#### Tabs (Sub-navigation)
| Property | Value | Notes |
|----------|-------|-------|
| Height | ~44px | Tab bar height |
| Padding | 12px 20px | Horizontal padding |
| Font Size | 14px | Body text |
| Active Weight | 500 | Medium weight |
| Inactive Weight | 400 | Normal |

#### Filter Buttons (Outline Style)
| Property | Value | Notes |
|----------|-------|-------|
| Height | 32px | Compact filter buttons |
| Padding | 0px 8px 0px 12px | Asymmetric for dropdown icon |
| Border | 1px solid rgba(19, 0, 50, 0.5) | Half opacity |
| Border Radius | 4px | Standard |
| Background | transparent | Outline style |

#### NEW Badge
| Property | Value | Notes |
|----------|-------|-------|
| Background | rgb(43, 40, 67) | Dark purple |
| Color | white | Contrast text |
| Font | 12px, 500 weight | Small, medium |
| Padding | 0px 8px | Compact |
| Border Radius | 4px | Standard |

#### Sidebar Section Headers
| Property | Value | Notes |
|----------|-------|-------|
| Font Size | 12px | Small, uppercase-style |
| Font Weight | 600 | Semi-bold |
| Letter Spacing | 0.12px | Slight tracking |
| Color | rgba(19, 0, 50, 0.7) | Muted |

---

### Reports Page

#### Dashboard Cards
| Property | Value | Notes |
|----------|-------|-------|
| Width | 584px | Half of content area |
| Height | 400px | Chart container |
| Border | 1px solid rgba(19, 0, 50, 0.1) | Subtle |
| Border Radius | 4px | Standard |

#### Chart Dimensions
| Property | Value | Notes |
|----------|-------|-------|
| Width | 550px | Inside card padding |
| Height | 305px | Chart area |

#### Ghost/Secondary Button
| Property | Value | Notes |
|----------|-------|-------|
| Height | 40px | Standard |
| Padding | 4px 12px | Standard |
| Background | rgba(19, 0, 50, 0.05) | Very light gray |
| Font | 16px | Body large |

---

### Agreement Detail Page

#### Avatar
| Property | Value | Notes |
|----------|-------|-------|
| Size | 40px × 40px | Square/circle |
| Border Radius | 9999px | Full circle |
| Font Size | 16px | Initials |

#### Copy Button (Outline in Header)
| Property | Value | Notes |
|----------|-------|-------|
| Height | 40px | Standard |
| Padding | 4px 12px | Standard |
| Border | 1px solid rgba(19, 0, 50, 0.5) | Outline style |
| Background | transparent | No fill |

#### Toggle Switch
| Property | Value | Notes |
|----------|-------|-------|
| Width | 44px | Track width |
| Height | 32px | Track height |

#### Section Headers (Detail Page)
| Property | Value | Notes |
|----------|-------|-------|
| Font Size | 12px | Small |
| Font Weight | 600 | Semi-bold |
| Color | rgba(19, 0, 50, 0.7) | Muted |

#### Link Text
| Property | Value | Notes |
|----------|-------|-------|
| Color | rgb(36, 99, 209) | Blue |
| Font | 16px, 400 weight | Body text |

---

## Pass 1 Progress

- [x] GlobalNav measurements
- [x] LocalNav measurements
- [x] Sidebar nav items
- [x] Page title (H1)
- [x] Table header/body
- [x] Search input
- [x] Filter dropdown
- [x] Pagination
- [x] Footer
- [x] Dashboard/Home page
- [x] Templates page
- [x] Reports page
- [x] Agreement Detail page

---

*Last updated: Pass 1, Phases 1-7 complete*

---

## Pass 2: Deep Dive Exploration

### Parties Page (New Page Type)

#### Sub-Tabs (All, Recent, Starred)
| Property | Value | Notes |
|----------|-------|-------|
| Height | 43.5px | Tab button height |
| Padding | 12px 20px | Horizontal padding |
| Font Size | 14px | Body text |
| Font Weight | 500 | Medium weight |

#### Status Badges (Active/Inactive)
| Property | Active | Inactive | Notes |
|----------|--------|----------|-------|
| Background | rgb(185, 246, 221) | rgb(240, 239, 240) | Green vs Gray |
| Color | rgb(0, 95, 67) | rgba(19, 0, 50, 0.7) | Dark green vs muted |
| Padding | 0px 8px | 0px 8px | Consistent |
| Border Radius | 4px | 4px | Standard |
| Font Size | 12px | 12px | Small |
| Font Weight | 500 | 500 | Medium |

#### Filter Dropdown (Compact Style)
| Property | Value | Notes |
|----------|-------|-------|
| Height | 32px | Compact filter |
| Font Size | 16px | Body text |

#### "New" Badge (Nav Items)
| Property | Value | Notes |
|----------|-------|-------|
| Background | rgb(43, 40, 67) | Dark purple |
| Color | rgb(255, 255, 255) | White |
| Padding | 0px 8px | Compact |
| Font Size | 12px | Small |
| Font Weight | 500 | Medium |
| Border Radius | 4px | Standard |

---

### Requests Page (Feature Introduction/Onboarding)

#### Hero Title (Intro Page)
| Property | Value | Notes |
|----------|-------|-------|
| Font Size | 32px | Same as page title |
| Font Weight | 600 | Heavier than regular page titles (400) |
| Line Height | 40px | Consistent |
| Color | rgba(19, 0, 50, 0.9) | Standard |

#### Section Header (H2)
| Property | Value | Notes |
|----------|-------|-------|
| Font Size | 24px | Medium heading |
| Font Weight | 600 | Semi-bold |
| Line Height | 30px | Tight |

#### Action Link (Feature Cards)
| Property | Value | Notes |
|----------|-------|-------|
| Font Size | 16px | Body text |
| Font Weight | 500 | Medium |
| Color | rgb(108, 58, 230) | Purple (different from link blue!) |
| Text Decoration | none | No underline |

#### Body Text (Intro)
| Property | Value | Notes |
|----------|-------|-------|
| Font Size | 16px | Body text |
| Font Weight | 400 | Normal |
| Line Height | 24px | Relaxed |
| Color | rgba(19, 0, 50, 0.7) | Muted |

---

### 404 Error Page

#### Error Title
| Property | Value | Notes |
|----------|-------|-------|
| Font Size | 32px | Large heading |
| Font Weight | 700 | Bold (heavier than other titles) |
| Color | rgb(0, 0, 0) | Pure black |

#### Error Description
| Property | Value | Notes |
|----------|-------|-------|
| Font Size | 16px | Body text |
| Font Weight | 400 | Normal |
| Color | rgb(0, 0, 0) | Pure black |

#### Go Back Button (Outline)
| Property | Value | Notes |
|----------|-------|-------|
| Height | 40px | Standard |
| Padding | 4px 12px | Standard |
| Background | transparent | Outline style |
| Color | rgba(19, 0, 50, 0.9) | Standard text |
| Border | 1px solid rgba(19, 0, 50, 0.5) | Half opacity |
| Border Radius | 4px | Standard |

---

### Home Page (Additional Detail)

#### Hero Outline Buttons
| Property | Value | Notes |
|----------|-------|-------|
| Height | 40px | Standard |
| Padding | 4px 12px | Standard |
| Background | transparent | Outline on purple |
| Color | rgb(255, 255, 255) | White text |
| Border | 1px solid rgba(255, 255, 255, 0.5) | White, half opacity |
| Border Radius | 4px | Standard |

#### Activity Document Title
| Property | Value | Notes |
|----------|-------|-------|
| Font Size | 16px | Body text |
| Font Weight | 500 | Medium |
| Color | rgba(19, 0, 50, 0.9) | Standard |

#### Stat Label
| Property | Value | Notes |
|----------|-------|-------|
| Font Size | 14px | Smaller body |
| Font Weight | 400 | Normal |
| Color | rgba(19, 0, 50, 0.9) | Standard |

#### Promo Card Title
| Property | Value | Notes |
|----------|-------|-------|
| Font Size | 16px | Body |
| Font Weight | 500 | Medium |
| Color | rgba(19, 0, 50, 0.7) | Muted |

---

### Reports Page (Pass 2)

#### Page Title
| Property | Value | Notes |
|----------|-------|-------|
| Font Size | 32px | Consistent with other pages |
| Font Weight | 400 | Normal (not bold) |
| Line Height | 40px | Standard |

#### Chart Card
| Property | Value | Notes |
|----------|-------|-------|
| Width | 584px | Dashboard card width |
| Height | 400px | Chart container height |
| Border | 1px solid rgba(19, 0, 50, 0.1) | Subtle border |
| Border Radius | 4px | Standard |

#### Card Title
| Property | Value | Notes |
|----------|-------|-------|
| Font Size | 16px | Body text size |
| Font Weight | 400 | Normal |
| Line Height | 22.4px | ~1.4 ratio |

#### See What's New Button
| Property | Value | Notes |
|----------|-------|-------|
| Height | 32px | Compact button |
| Padding | 4px 8px | Compact padding |
| Border | 1px solid rgba(19, 0, 50, 0.5) | Outline style |
| Border Radius | 4px | Standard |

#### View Dashboard Link
| Property | Value | Notes |
|----------|-------|-------|
| Font Size | 16px | Body text |
| Font Weight | 500 | Medium weight |
| Color | rgba(19, 0, 50, 0.9) | Standard text (not link blue) |

#### Sidebar Nav Headers (Reports)
| Property | Value | Notes |
|----------|-------|-------|
| Font Size | 15px | Slightly larger than 12px |
| Font Weight | 700 | Bold |

---

### Admin Dashboard Page (Pass 2)

#### Account Name
| Property | Value | Notes |
|----------|-------|-------|
| Font Size | 18.72px (~19px) | Larger than body |
| Font Weight | 700 | Bold |
| Color | rgba(19, 0, 50, 0.9) | Standard |

#### Section Headers (H2)
| Property | Value | Notes |
|----------|-------|-------|
| Font Size | 24px | H2 size |
| Font Weight | 700 | Bold (heavier than main app!) |
| Line Height | 36px | 1.5 ratio |

#### Promo Card Title
| Property | Value | Notes |
|----------|-------|-------|
| Font Size | 24px | Large |
| Font Weight | 600 | Semi-bold |
| Line Height | 30px | Standard |

#### Promo Card Body
| Property | Value | Notes |
|----------|-------|-------|
| Font Size | 16px | Body text |
| Font Weight | 400 | Normal |
| Line Height | 24px | 1.5 ratio |

#### Notification Item Title
| Property | Value | Notes |
|----------|-------|-------|
| Font Size | 18.72px (~19px) | Styled heading |
| Font Weight | 700 | Bold |

#### Notification Body
| Property | Value | Notes |
|----------|-------|-------|
| Font Size | 16px | Body text |
| Font Weight | 400 | Normal |
| Line Height | 24px | Standard |

#### Filter Dropdowns
| Property | Value | Notes |
|----------|-------|-------|
| Height | 32px | Compact |
| Font Size | 14px | Smaller than body |
| Padding | 0px 8px 0px 12px | Asymmetric |
| Border Radius | 4px 0px 0px 4px | Joined buttons |

---

### Settings Page - Signing Settings (Pass 2)

#### Page Title (Admin)
| Property | Value | Notes |
|----------|-------|-------|
| Font Size | 32px | Same as main app |
| Font Weight | 700 | Bold (different from main app 400!) |
| Line Height | 48px | Larger line height |

#### Section Headers (Settings)
| Property | Value | Notes |
|----------|-------|-------|
| Font Size | 24px | H2 size |
| Font Weight | 700 | Bold |
| Line Height | 36px | Standard |

#### Checkbox Row
| Property | Value | Notes |
|----------|-------|-------|
| Height | 40px | Consistent with button height |

#### Radio Button
| Property | Value | Notes |
|----------|-------|-------|
| Size | 20px × 20px | Standard radio size |

#### Radio/Checkbox Label
| Property | Value | Notes |
|----------|-------|-------|
| Font Size | 16px | Body text |
| Font Weight | 400 | Normal |

#### Link Button (Outline)
| Property | Value | Notes |
|----------|-------|-------|
| Height | 40px | Standard button |
| Padding | 4px 12px | Standard |
| Border | 1px solid rgba(19, 0, 50, 0.5) | Outline |
| Border Radius | 4px | Standard |
| Font Size | 16px | Body text |

#### Dropdown Label
| Property | Value | Notes |
|----------|-------|-------|
| Font Size | 16px | Body text |
| Font Weight | 400 | Normal |

#### Section Description
| Property | Value | Notes |
|----------|-------|-------|
| Font Size | 16px | Body text |
| Font Weight | 400 | Normal |
| Line Height | 24px | 1.5 ratio |

---

### Key Finding: Admin vs Main App Typography

**Main App (Navigator, Templates, etc.)**
- Page Title: 32px, **400 weight**
- Section headers vary by context

**Admin Area**
- Page Title: 32px, **700 weight** (bold)
- Section Headers: 24px, **700 weight** (bold)
- Overall heavier typography for administrative UI

---

### Pass 2 Progress

- [x] Parties page - Status badges, sub-tabs
- [x] Requests page - Feature intro pattern
- [x] 404 Error page - Error state pattern
- [x] Home page - Additional dashboard detail
- [x] Reports page - Dashboard cards, chart containers
- [x] Admin Dashboard - Promo cards, notifications
- [x] Settings page - Form patterns, checkboxes, radio buttons

---

## Pass 3: Edge Cases & Interaction States

### Hover States

#### Primary Button (Start)
| State | Property | Value |
|-------|----------|-------|
| Default | Background | rgb(38, 5, 89) |
| Hover | Background | rgb(43, 4, 127) |
| | | Slightly lighter purple on hover |

#### Ghost/Secondary Button
| State | Property | Value |
|-------|----------|-------|
| Default | Background | transparent |
| Hover | Background | rgba(19, 0, 50, 0.05) |
| | | Light gray on hover |

#### Nav Items
| State | Property | Value |
|-------|----------|-------|
| Default | Background | transparent |
| Hover | Background | rgba(19, 0, 50, 0.05) |
| Active | Border-left | 4px solid (purple) |
| Active | Font-weight | 600 |

#### Links
| State | Property | Value |
|-------|----------|-------|
| Default | Color | rgb(36, 99, 209) |
| Default | Text-decoration | none |
| Hover | Text-decoration | underline |

#### Table Rows
| State | Property | Value |
|-------|----------|-------|
| Default | Background | transparent |
| Hover | Background | rgba(19, 0, 50, 0.02) |
| | | Very subtle highlight |

---

### Responsive Breakpoints

#### Desktop (1024px+)
- Full sidebar visible (280px)
- All table columns visible
- Standard GlobalNav

#### Tablet (768px)
- Sidebar still visible
- Table columns truncate/hide
- Some columns abbreviated (e.g., "Agreement Type" → "Agr")

#### Mobile (375px)
| Element | Behavior |
|---------|----------|
| GlobalNav | Hamburger menu appears |
| Sidebar | Collapses/hidden |
| Table | Minimal columns + horizontal scroll |
| Info Banner | Text wraps to multiple lines |
| Search | Full width |
| Back Arrow | Appears below header for navigation |

#### Responsive Pattern Notes
- Sidebar collapse breakpoint: ~768px
- Table horizontal scroll enabled at narrow widths
- Mobile layout is card-like for list items
- Hamburger menu icon: 3 horizontal lines

---

### Pass 3 Progress

- [x] Primary button hover state
- [x] Secondary/ghost button hover state
- [x] Nav item hover and active states
- [x] Link hover states
- [x] Table row hover states
- [x] Responsive layout at tablet (768px)
- [x] Responsive layout at mobile (375px)
- [x] Sidebar collapse behavior

---

## Pass 4: Component Composition & Relationships

### Navigator Page - Vertical Composition

#### Component Stack Order (Top to Bottom)
| Component | Top (px) | Height (px) | Gap to Next |
|-----------|----------|-------------|-------------|
| GlobalNav | 0 | 64 | 32px to content |
| Page Title (H1) | 96 | 40 | 16px |
| Info Banner | 152 | 60 | 0px (adjacent) |
| ActionBar | 212 | 48 | 85px |
| Table Header | 345 | 49 | - |
| Table Body | 394 | ~68/row | - |
| Pagination | ~912 | 32 | - |

#### Spacing Pattern Summary
```
GlobalNav (64px)
    ↓ 32px (content padding)
H1 Page Title (40px)
    ↓ 16px
Info Banner (60px)
    ↓ 0px (directly adjacent)
ActionBar (48px)
    ↓ 85px (large gap to table)
Table
    ↓ variable
Pagination
```

---

### ActionBar - Horizontal Composition

#### Element Order (Left to Right)
| Element | Width | Gap to Next |
|---------|-------|-------------|
| Documents Dropdown | 118px | 53px |
| Search Toggle Icon | 24px | -11px (overlaps) |
| Search Input | 366px | 9px |
| Saved Search Icon | 32px | 8px |
| Filters Button | 85px | 8px |
| Status Filter | 87px | 8px |
| Parties Filter | 89px | 8px |
| Agreement Type | 148px | 8px |
| AI Suggestions | 138px | 8px |
| All Filters | 100px | - |

#### Pattern: Consistent 8px gap between filter buttons

---

### Pagination - Horizontal Composition

#### Element Arrangement
| Element | Position | Width |
|---------|----------|-------|
| Page Size Dropdown | Left (304px) | 136px |
| Prev Button | Right-aligned (1714px) | 32px |
| Next Button | Right-aligned (1750px) | 32px |

#### Pattern: Left/right split layout for pagination

---

### Templates Page - Alternative Composition

#### Sub-Tabs Position
| Property | Value |
|----------|-------|
| Top | 64px (immediately below GlobalNav) |
| Height | 43.5px |
| Left | 360px (aligned with content) |

#### Sidebar Sections (Secondary Navigation)
| Section | Top (px) | Items |
|---------|----------|-------|
| ENVELOPE TEMPLATES | 152 | My Templates, Shared with Me, Favorites |
| Document Templates | 400 | Single item with NEW badge |
| Workflow Templates | 448 | Single item with NEW badge |
| WEB FORMS | 512 | My Web Forms, Shared with Me, All Web Forms |

#### Pattern: Categorized sidebar with section headers

---

### 404 Error Page - Minimal Composition

#### Component Stack
| Component | Top (px) | Notes |
|-----------|----------|-------|
| GlobalNav | 0 | Present but minimal |
| Illustration | 64 | Purple decorative line |
| Error Title | 305 | Centered layout |
| Description | 357 | Below title |
| Go Back Button | 397 | Outline button style |

#### Pattern: Centered layout, no sidebar

---

### Composition Pattern Rules

1. **Content Padding**: Always 32px from GlobalNav to first content element
2. **Section Spacing**: 16px between related elements (title → banner)
3. **Large Gap Before Tables**: ~85px gap before table starts
4. **Filter Button Gap**: Consistent 8px between adjacent filters
5. **Pagination Split**: Page size left-aligned, navigation right-aligned
6. **Sub-tabs**: Positioned immediately at y:64 (no padding from GlobalNav)

---

### Pass 4 Progress

- [x] Navigator vertical composition
- [x] ActionBar horizontal composition
- [x] Pagination horizontal composition
- [x] Templates page alternative composition
- [x] Error page minimal composition
- [x] Identified composition pattern rules

---
