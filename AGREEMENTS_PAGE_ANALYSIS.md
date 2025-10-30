# Agreements Page - Pattern Analysis

**Comparing current implementation vs correct showcase patterns**

Date: 2025-10-29

---

## 🔍 GlobalNav Pattern Comparison

### ✅ Showcase Pattern (LayoutWithLocalNav.tsx:139-166)

```tsx
<GlobalNav
  logo={
    <img
      src="/assets/docusign-logo.svg"
      alt="DocuSign"
      style={{ width: '119.25px', height: '24px', objectFit: 'contain' }}
    />
  }
  navItems={[
    { id: 'home', label: 'Home', active: false, onClick: () => console.log('Home') },
    { id: 'agreements', label: 'Agreements', active: true },
    { id: 'templates', label: 'Templates', active: false },
  ]}
  showAppSwitcher={true}
  onAppSwitcherClick={() => console.log('App switcher')}
  showSearch={true}
  onSearchClick={() => console.log('Search')}
  showNotifications={true}
  notificationCount={3}
  onNotificationClick={() => console.log('Notifications')}
  showSettings={true}
  onSettingsClick={() => console.log('Settings')}
  user={{ name: 'John Smith' }}
  onUserMenuClick={() => console.log('User menu')}
/>
```

### ❌ Current Implementation (AgreementsPage.tsx:234-242)

```tsx
<GlobalNav
  logo={<Heading level={3}>docusign</Heading>}
  navItems={globalNavItems}
  showSearch
  showNotifications
  notificationCount={3}
  showSettings
  user={{ name: 'Kathie Brown' }}
/>
```

### 🐛 Issues Found

1. **Missing `showAppSwitcher` prop**
   - Showcase: `showAppSwitcher={true}`
   - Current: Missing
   - Impact: No app switcher icon visible

2. **Missing click handlers**
   - Showcase: Has `onAppSwitcherClick`, `onSearchClick`, `onNotificationClick`, `onSettingsClick`, `onUserMenuClick`
   - Current: Missing all handlers
   - Impact: Icons visible but non-functional

3. **NavItems missing onClick**
   - Showcase: `{ id: 'home', label: 'Home', active: false, onClick: () => {...} }`
   - Current: No onClick in items
   - Impact: Navigation items may not be interactive

---

## 🔍 LocalNav Pattern Comparison

### ✅ Showcase Pattern (LayoutWithLocalNav.tsx:171-287)

```tsx
<LocalNav
  headerLabel="Start"
  sections={[
    // Section 1: Collapsible group with icon and title
    {
      id: 'agreements',
      title: 'All Agreements',
      icon: 'envelope',
      collapsible: true,
      defaultExpanded: true,
      items: [
        {
          id: 'drafts',
          label: 'Drafts',
          nested: true,
          onClick: () => setActiveItemId('drafts'),
        },
        { id: 'in-progress', label: 'In Progress', nested: true, onClick: ... },
        { id: 'completed', label: 'Completed', nested: true, onClick: ... },
        { id: 'deleted', label: 'Deleted', nested: true, onClick: ... },
      ],
    },

    // Section 2: Header label style with action button
    {
      id: 'folders-section',
      title: 'FOLDERS',
      headerLabel: true,  // Makes title uppercase and styled as label
      headerAction: {
        icon: 'plus',
        label: 'New Folder',
        onClick: () => console.log('New Folder'),
      },
      items: [
        {
          id: 'folders',
          label: 'Folders',
          icon: 'folder',
          hasMenu: true,
          onMenuClick: (e) => console.log('Menu'),
          onClick: () => setActiveItemId('folders'),
        },
        {
          id: 'all-parties',
          label: 'All Parties',
          icon: 'people',
          badge: 'New',  // Shows badge next to label
          onClick: () => setActiveItemId('all-parties'),
        },
      ],
    },

    // Section 3: Simple items without title
    {
      id: 'tools',
      items: [
        {
          id: 'requests',
          label: 'Requests',
          icon: 'envelope',
          badge: 'New',
          onClick: () => setActiveItemId('requests'),
        },
        { id: 'maestro-workflows', label: 'Maestro Workflows', icon: 'settings', onClick: ... },
        { id: 'workspaces', label: 'Workspaces', icon: 'layout-grid', onClick: ... },
      ],
    },
  ]}
  activeItemId={activeItemId}  // Highlights active item
  onHeaderClick={() => console.log('Header clicked')}
  footerToggle={{
    label: 'New navigation',
    checked: newNavEnabled,
    onChange: setNewNavEnabled,
    icon: 'lock',
  }}
/>
```

### ❌ Current Implementation (AgreementsPage.tsx:25-85, 244-250)

```tsx
<LocalNav
  headerLabel="Start"
  sections={localNavSections}
  onHeaderClick={() => console.log('Header clicked')}
/>

// localNavSections structure:
[
  {
    id: 'section-1',
    items: [
      { id: 'all-agreements', label: 'All Agreements', active: false },
      { id: 'drafts', label: 'Drafts', active: false },
      { id: 'in-progress', label: 'In Progress', active: false },
      { id: 'completed', label: 'Completed', active: true },
      { id: 'deleted', label: 'Deleted', active: false },
    ],
  },
  {
    id: 'section-2',
    title: 'Folders',
    items: [
      { id: 'folder-1', label: 'My Folder', icon: 'folder' },
    ],
  },
  {
    id: 'section-3',
    title: 'All Parties',
    headerLabel: true,
    headerAction: { icon: 'plus', label: 'New', onClick: ... },
    items: [
      { id: 'employees', label: 'Employees', nested: true },
      { id: 'vendors', label: 'Vendors', nested: true },
    ],
  },
  // ... more flat sections
]
```

### 🐛 Issues Found

#### 1. **Section Structure Problems**

**Showcase uses 3 section types:**
- Type 1: Collapsible group (icon, title, collapsible, defaultExpanded)
- Type 2: Header label with action (title, headerLabel: true, headerAction)
- Type 3: Simple items (no title, just items)

**Current implementation:**
- All sections are flat
- No collapsible functionality
- Mixed structure (some have titles, some don't)
- No icons on section titles

#### 2. **Missing `activeItemId` Prop**

**Showcase:**
```tsx
activeItemId={activeItemId}  // Passed from state
```

**Current:**
- Missing entirely
- Items have `active: false/true` in data, but LocalNav doesn't use it
- Impact: No visual indication of active page

#### 3. **Items Missing onClick Handlers**

**Showcase:**
```tsx
{
  id: 'drafts',
  label: 'Drafts',
  nested: true,
  onClick: () => setActiveItemId('drafts'),  // ✅ Has handler
}
```

**Current:**
```tsx
{ id: 'drafts', label: 'Drafts', active: false }  // ❌ No onClick
```

- Impact: Items not clickable, no navigation

#### 4. **Missing Footer Toggle**

**Showcase:**
```tsx
footerToggle={{
  label: 'New navigation',
  checked: newNavEnabled,
  onChange: setNewNavEnabled,
  icon: 'lock',
}}
```

**Current:**
- Missing entirely
- Impact: No toggle control at bottom of sidebar

#### 5. **Badge Usage Incorrect**

**Showcase:**
```tsx
{
  id: 'all-parties',
  label: 'All Parties',
  icon: 'people',
  badge: 'New',  // String passed as prop
  onClick: ...
}
```

**Current:**
- No badges on items
- Impact: Can't show "New" indicators

#### 6. **Menu Functionality Missing**

**Showcase:**
```tsx
{
  id: 'folders',
  label: 'Folders',
  icon: 'folder',
  hasMenu: true,
  onMenuClick: (e) => console.log('Menu'),
  onClick: ...
}
```

**Current:**
- No hasMenu or onMenuClick
- Impact: Can't have item-level actions (3-dot menu)

---

## 📋 Visual Differences

### GlobalNav

| Feature | Showcase | Current | Status |
|---------|----------|---------|---------|
| App Switcher Icon | ✅ Visible & functional | ❌ Missing | **FIX** |
| Search Icon | ✅ Functional | ⚠️ Visible but non-functional | **FIX** |
| Notifications | ✅ Functional with count | ⚠️ Visible but non-functional | **FIX** |
| Settings Icon | ✅ Functional | ⚠️ Visible but non-functional | **FIX** |
| User Avatar | ✅ Functional | ⚠️ Visible but non-functional | **FIX** |
| Nav Items | ✅ Clickable | ⚠️ May not be functional | **FIX** |

### LocalNav

| Feature | Showcase | Current | Status |
|---------|----------|---------|---------|
| Collapsible Sections | ✅ First section collapsible | ❌ None collapsible | **FIX** |
| Active Highlighting | ✅ Active item highlighted | ❌ No highlighting | **FIX** |
| Section Icons | ✅ Icons on section titles | ❌ No section icons | **FIX** |
| Header Action Button | ✅ "+" button on FOLDERS | ✅ Has it | **OK** |
| Item Badges | ✅ "New" badges visible | ❌ No badges | **FIX** |
| Item Menus | ✅ 3-dot menu on items | ❌ No menus | **FIX** |
| Footer Toggle | ✅ "New navigation" toggle | ❌ Missing | **FIX** |
| Click Handlers | ✅ All items clickable | ❌ Not functional | **FIX** |

---

## 🔧 Fix Priority

### High Priority (Breaks Functionality)

1. **Add onClick handlers to LocalNav items** - Items not clickable
2. **Add activeItemId to LocalNav** - Can't see current page
3. **Add GlobalNav click handlers** - Icons non-functional
4. **Add showAppSwitcher to GlobalNav** - Missing core icon

### Medium Priority (Visual Mismatch)

5. **Restructure LocalNav sections** - Make first section collapsible
6. **Add section icons to LocalNav** - Visual hierarchy
7. **Add footer toggle to LocalNav** - Missing control
8. **Add badges to LocalNav items** - "New" indicators

### Low Priority (Nice to Have)

9. **Add hasMenu/onMenuClick to LocalNav items** - Item actions
10. **Match exact section structure** - Collapsible vs header label types

---

## 💡 Recommended Approach

Following WORKFLOW.md principles:

### Option 1: Fix Page Patterns ⭐ RECOMMENDED
**Time**: ~30 minutes
**Impact**: Page works correctly immediately

1. Update AgreementsPage.tsx to match showcase patterns
2. Add all missing props and handlers
3. Restructure sections to match showcase structure
4. Test with Playwright
5. Take screenshot comparison

### Option 2: Improve Components First
**Time**: 2-3 hours
**Impact**: All pages improve automatically

1. Analyze why patterns don't match
2. Check if LocalNav/GlobalNav components need updates
3. Add missing features to components
4. Test components in isolation
5. Update all pages using components

---

## 📝 Next Steps

1. **User Decision**: Which approach?
2. **If Option 1**: Fix AgreementsPage patterns
3. **If Option 2**: Identify component improvements needed
4. **Test**: Follow TEST_PLAN.md before committing
5. **Document**: Update findings in WORKFLOW.md

---

## 📚 References

- **Showcase Example**: `src/examples/LayoutWithLocalNav.tsx:136-366`
- **Current Implementation**: `src/examples/AgreementsPage.tsx:19-325`
- **GlobalNav Component**: `src/design-system/5-patterns/GlobalNav/GlobalNav.tsx`
- **LocalNav Component**: `src/design-system/5-patterns/LocalNav/LocalNav.tsx`
- **Process**: `WORKFLOW.md` - Step 1: Understand Requirements

---

**Status**: Analysis complete, awaiting user decision on fix approach.
