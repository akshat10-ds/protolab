# Reusable Components

This module contains standalone, reusable UI components extracted from the DocuSign Send application. These components maintain **100% visual fidelity** with the original implementation.

## Dependencies

To achieve a 100% visual match, you need access to the DocuSign Design System packages:

```json
{
  "@ds/ui": "^x.x.x",
  "@ds/icons": "^x.x.x",
  "@ds/tokens": "^x.x.x",
  "@ds/components": "^x.x.x",
  "@emotion/react": "^11.x.x",
  "@reduxjs/toolkit": "^1.x.x"
}
```

## Components

### 1. CollapsibleSideNav

A side navigation component that can collapse/expand with hover detection and lock functionality.

#### Features
- Expands on mouse hover
- Collapses when mouse leaves (unless locked)
- Lock/unlock button to keep it expanded
- Mobile-responsive
- Keyboard accessible (expands on focus)

#### Usage

**Option A: Using the Hook (Recommended for local state)**

```tsx
import { CollapsibleSideNav, SideNavItem, useCollapsibleSideNav } from './reusable-components';
import { Home, Settings, Users } from '@ds/icons';

const MyNavigation = () => {
  const { sideNavProps, isExpanded } = useCollapsibleSideNav({
    allowCollapsibility: true,
    initialLocked: true,
  });

  return (
    <CollapsibleSideNav
      {...sideNavProps}
      containerAriaLabel="Main navigation"
      lockAccessibilityText="Unlock sidebar"
      unlockAccessibilityText="Lock sidebar"
    >
      <SideNavItem
        text="Home"
        dataQa="nav-home"
        icon={<Home />}
        selected={true}
        onClick={() => navigate('/home')}
        isExpanded={isExpanded}
      />
      <SideNavItem
        text="Settings"
        dataQa="nav-settings"
        icon={<Settings />}
        selected={false}
        onClick={() => navigate('/settings')}
        isExpanded={isExpanded}
      />
    </CollapsibleSideNav>
  );
};
```

**Option B: Using Redux (Recommended for shared state)**

```tsx
// store.ts
import { configureStore } from '@reduxjs/toolkit';
import { collapsibleSideNavReducer } from './reusable-components';

export const store = configureStore({
  reducer: {
    collapsibleSideNav: collapsibleSideNavReducer,
    // ... other reducers
  },
});

// MyNavigation.tsx
import { useDispatch, useSelector } from 'react-redux';
import {
  CollapsibleSideNav,
  selectIsLocked,
  selectIsHovered,
  selectIsExpanded,
  toggleLock,
  setHovered,
  setUnhovered,
} from './reusable-components';

const MyNavigation = () => {
  const dispatch = useDispatch();
  const isLocked = useSelector(selectIsLocked);
  const isHovered = useSelector(selectIsHovered);
  const isExpanded = useSelector((state) =>
    selectIsExpanded(state, {
      allowCollapsibility: true,
      isMobileView: false,
      isMobileSideNavVisible: false,
    })
  );

  return (
    <CollapsibleSideNav
      isLocked={isLocked}
      isHovered={isHovered}
      onToggleLock={() => dispatch(toggleLock())}
      onMouseEnter={() => dispatch(setHovered())}
      onMouseLeave={() => dispatch(setUnhovered())}
      allowCollapsibility={true}
    >
      {/* Nav items */}
    </CollapsibleSideNav>
  );
};
```

---

### 2. TopNav (Site Header)

The global header component with app switching, profile menu, notifications, and navigation tabs.

#### Features
- App switcher integration
- Tab-based navigation
- Profile dropdown menu
- Notifications bell
- Tasks icon
- Marketing/upgrade buttons
- Account switcher
- Custom branding/logo support
- Mobile responsive

#### Usage

**Option A: Direct Props**

```tsx
import { TopNav } from './reusable-components';
import type { HeaderProps } from '@ds/components';

const MyHeader = () => {
  const headerProps: HeaderProps = {
    appId: 'MyApp',
    appName: 'My Application',
    apiRootUrl: 'https://api.example.com',
    accountGuid: 'account-guid-123',
    accountId: '12345',
    meToken: 'me-token',
    homeUrl: '/home',
    tabItems: [
      { itemId: 'home', text: 'Home', onClick: () => navigate('/home') },
      { itemId: 'docs', text: 'Documents', onClick: () => navigate('/docs') },
    ],
    activeTabId: 'home',
    onLogoff: () => handleLogout(),
    rebrand2024: true,
  };

  return <TopNav {...headerProps} />;
};
```

**Option B: Using the Hook (Simplified setup)**

```tsx
import { TopNav, useTopNav } from './reusable-components';

const MyHeader = () => {
  const { topNavProps, setActiveTabId } = useTopNav({
    appId: 'MyApp',
    appName: 'My Application',
    apiRootUrl: 'https://api.example.com',
    accountGuid: 'account-guid-123',
    accountId: '12345',
    meToken: 'me-token',
    homeUrl: '/home',
    tabs: [
      { id: 'home', text: 'Home' },
      { id: 'docs', text: 'Documents' },
    ],
    initialActiveTab: 'home',
    onTabChange: (tabId) => navigate(`/${tabId}`),
    onLogoff: () => handleLogout(),
  });

  return <TopNav {...topNavProps} />;
};
```

---

## Styling

All components use the DocuSign Ink design system tokens for consistent styling. The styles are defined using `@emotion/react` CSS-in-JS.

### Customizing Styles

You can override styles by wrapping components or using the exported style objects:

```tsx
import { css } from '@emotion/react';
import {
  CollapsibleSideNav,
  collapsibleSideNavContainerStyle,
} from './reusable-components';

const customContainerStyle = css`
  ${collapsibleSideNavContainerStyle};
  background-color: #f5f5f5;
`;

// Use in your component
<div css={customContainerStyle}>
  <CollapsibleSideNav {...props}>{children}</CollapsibleSideNav>
</div>
```

---

## Translations

The original components use translation keys. You'll need to provide translations for:

### CollapsibleSideNav
- `COLLAPSIBLE_SIDENAV:CONTAINER` - Aria label for the navigation container
- `COLLAPSIBLE_SIDENAV:LOCK_SIDENAV` - Lock button accessibility text
- `COLLAPSIBLE_SIDENAV:UNLOCK_SIDENAV` - Unlock button accessibility text

You can pass these as props (`containerAriaLabel`, `lockAccessibilityText`, `unlockAccessibilityText`) or integrate with your i18n solution.

---

## File Structure

```
src/reusable-components/
├── index.ts                          # Main exports
├── README.md                         # This file
├── CollapsibleSideNav/
│   ├── index.ts                      # CollapsibleSideNav exports
│   ├── CollapsibleSideNav.tsx        # Main component
│   ├── SideNavItem.tsx               # Navigation item component
│   ├── useCollapsibleSideNav.ts      # Hook for local state
│   └── collapsibleSideNavSlice.ts    # Redux slice
└── TopNav/
    ├── index.ts                      # TopNav exports
    ├── TopNav.tsx                    # Main component (wraps @ds/components Header)
    └── useTopNav.ts                  # Hook for simplified setup
```

---

## Migration Guide

When copying these components to another project:

1. **Install dependencies** - Ensure all @ds/* packages are available
2. **Copy the `reusable-components` folder** to your project's `src` directory
3. **Add Redux reducer** (if using Redux for CollapsibleSideNav):
   ```tsx
   import { collapsibleSideNavReducer } from './reusable-components';
   // Add to your store configuration
   ```
4. **Set up translations** for accessibility labels
5. **Import and use** the components

---

## API Reference

See the TypeScript types in each component file for full API documentation. Key types:

- `CollapsibleSideNavProps` - Props for the CollapsibleSideNav component
- `SideNavItemProps` - Props for the SideNavItem component  
- `TopNavProps` - Props for the TopNav component (extends HeaderProps)
- `CollapsibleSideNavState` - Redux state shape
