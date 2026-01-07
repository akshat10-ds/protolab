import React from 'react';
import { Badge } from '@/design-system';
import { GlobalNav, LocalNav } from '@/design-system/5-patterns';
import DocuSignLogo from '@/assets/Docusign Horizontal Black.svg';
import styles from '../Showcase.module.css';

export interface PatternsShowcaseProps {
  activeSubpage: string;
}

// Header menu items for LocalNav Start button dropdown
const headerMenuItems = [
  { id: 'envelopes', label: 'Envelopes', icon: 'envelope' as const, hasSubmenu: true },
  { id: 'create-request', label: 'Create Request', icon: 'document-plus' as const },
  { id: 'maestro', label: 'Maestro Workflows', icon: 'workflow' as const, hasSubmenu: true },
  { id: 'powerform', label: 'Create PowerForm', icon: 'bolt' as const },
  { id: 'workspace', label: 'Create Workspace', icon: 'folder-plus' as const },
];

const docuSignLogo = (
  <img src={DocuSignLogo} alt="DocuSign" style={{ height: '24px', width: 'auto' }} />
);

export const PatternsShowcase: React.FC<PatternsShowcaseProps> = ({ activeSubpage }) => {
  // GlobalNav state
  const [globalNavActive, setGlobalNavActive] = React.useState('agreements');

  // LocalNav state
  const [localNavActive, setLocalNavActive] = React.useState('completed');
  const [localNavToggle, setLocalNavToggle] = React.useState(true);
  const [localNavLocked, setLocalNavLocked] = React.useState(true);
  const [localNavCollapsed, setLocalNavCollapsed] = React.useState(false);

  const handleLockClick = () => {
    const newLocked = !localNavLocked;
    setLocalNavLocked(newLocked);
    setLocalNavCollapsed(!newLocked);
  };

  // GlobalNav items - DocuSign style
  const globalNavItems = [
    {
      id: 'home',
      label: 'Home',
      active: globalNavActive === 'home',
      onClick: () => setGlobalNavActive('home'),
    },
    {
      id: 'agreements',
      label: 'Agreements',
      active: globalNavActive === 'agreements',
      onClick: () => setGlobalNavActive('agreements'),
    },
    {
      id: 'templates',
      label: 'Templates',
      active: globalNavActive === 'templates',
      onClick: () => setGlobalNavActive('templates'),
    },
    {
      id: 'reports',
      label: 'Reports',
      active: globalNavActive === 'reports',
      onClick: () => setGlobalNavActive('reports'),
    },
    {
      id: 'admin',
      label: 'Admin',
      active: globalNavActive === 'admin',
      onClick: () => setGlobalNavActive('admin'),
    },
  ];

  // LocalNav sections - DocuSign Agreements style
  const localNavSections = [
    {
      id: 'main',
      items: [
        {
          id: 'all-agreements',
          label: 'All Agreements',
          icon: 'envelope' as const,
          active: localNavActive === 'all-agreements',
          onClick: () => setLocalNavActive('all-agreements'),
        },
        {
          id: 'drafts',
          label: 'Drafts',
          nested: true,
          active: localNavActive === 'drafts',
          onClick: () => setLocalNavActive('drafts'),
        },
        {
          id: 'in-progress',
          label: 'In Progress',
          nested: true,
          active: localNavActive === 'in-progress',
          onClick: () => setLocalNavActive('in-progress'),
        },
        {
          id: 'completed',
          label: 'Completed',
          nested: true,
          active: localNavActive === 'completed',
          onClick: () => setLocalNavActive('completed'),
        },
        {
          id: 'deleted',
          label: 'Deleted',
          nested: true,
          active: localNavActive === 'deleted',
          onClick: () => setLocalNavActive('deleted'),
        },
      ],
    },
    {
      id: 'folders',
      items: [
        {
          id: 'folders',
          label: 'Folders',
          icon: 'folder' as const,
          hasMenu: true,
          active: localNavActive === 'folders',
          onClick: () => setLocalNavActive('folders'),
        },
      ],
    },
    {
      id: 'features',
      hasDivider: true,
      items: [
        {
          id: 'parties',
          label: 'Parties',
          icon: 'building-person' as const,
          badge: 'New',
          active: localNavActive === 'parties',
          onClick: () => setLocalNavActive('parties'),
        },
        {
          id: 'requests',
          label: 'Requests',
          icon: 'ticket' as const,
          badge: 'New',
          active: localNavActive === 'requests',
          onClick: () => setLocalNavActive('requests'),
        },
        {
          id: 'maestro-workflows',
          label: 'Maestro Workflows',
          icon: 'workflow' as const,
          badge: 'New',
          active: localNavActive === 'maestro-workflows',
          onClick: () => setLocalNavActive('maestro-workflows'),
        },
        {
          id: 'workspaces',
          label: 'Workspaces',
          icon: 'transaction' as const,
          active: localNavActive === 'workspaces',
          onClick: () => setLocalNavActive('workspaces'),
        },
        {
          id: 'powerforms',
          label: 'PowerForms',
          icon: 'flash' as const,
          active: localNavActive === 'powerforms',
          onClick: () => setLocalNavActive('powerforms'),
        },
        {
          id: 'bulk-send',
          label: 'Bulk Send',
          icon: 'document-stack' as const,
          active: localNavActive === 'bulk-send',
          onClick: () => setLocalNavActive('bulk-send'),
        },
      ],
    },
  ];

  if (activeSubpage === 'globalnav') {
    return (
      <div className={styles.tokenPage}>
        {/* Default GlobalNav - DocuSign Style */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Default GlobalNav</h3>
          </div>
          <div style={{ margin: '-1px -1px 0 -1px', overflow: 'hidden' }}>
            <GlobalNav
              logo={docuSignLogo}
              navItems={globalNavItems}
              showAppSwitcher={false}
              showSearch
              searchVariant="pill"
              showNotifications
              notificationCount={1}
              showSettings
              settingsIcon="filter"
              user={{ name: 'AM' }}
            />
          </div>
        </div>

        {/* Key Features */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Features</h3>
          </div>
          <div className={styles.demoGrid}>
            <Badge variant="neutral">Logo</Badge>
            <Badge variant="neutral">Primary navigation</Badge>
            <Badge variant="neutral">Search pill</Badge>
            <Badge variant="neutral">Notifications</Badge>
            <Badge variant="neutral">Settings/Filter</Badge>
            <Badge variant="neutral">Help</Badge>
            <Badge variant="neutral">User avatar</Badge>
          </div>
        </div>
      </div>
    );
  }

  if (activeSubpage === 'localnav') {
    return (
      <div className={styles.tokenPage}>
        {/* Default LocalNav - DocuSign Agreements Style */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Default LocalNav</h3>
          </div>
          <div
            style={{
              height: '720px',
              border: '1px solid var(--ink-border-default)',
              borderRadius: 'var(--ink-radius-size-xs)',
              overflow: 'hidden',
              margin: '0 8px',
            }}
          >
            <LocalNav
              headerLabel="Start"
              headerIcon="plus"
              headerMenuItems={headerMenuItems}
              sections={localNavSections}
              activeItemId={localNavActive}
              collapsed={localNavCollapsed}
              footerToggle={{
                label: 'New navigation',
                checked: localNavToggle,
                onChange: setLocalNavToggle,
              }}
              footerLockButton={{ locked: localNavLocked, onLockClick: handleLockClick }}
            />
          </div>
          <div className={styles.demoRow}>
            <Badge variant={localNavLocked ? 'success' : 'warning'}>
              {localNavLocked ? 'Locked (Expanded)' : 'Unlocked (Collapsible)'}
            </Badge>
            <span className={styles.demoDesc}>Click lock icon to toggle collapse behavior</span>
          </div>
        </div>

        {/* Key Features */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Features</h3>
          </div>
          <div className={styles.demoGrid}>
            <Badge variant="neutral">Start dropdown</Badge>
            <Badge variant="neutral">Nested items</Badge>
            <Badge variant="neutral">Item badges</Badge>
            <Badge variant="neutral">Context menus</Badge>
            <Badge variant="neutral">Active indicators</Badge>
            <Badge variant="neutral">Icon support</Badge>
            <Badge variant="neutral">Footer toggle</Badge>
            <Badge variant="neutral">Lock/unlock</Badge>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
