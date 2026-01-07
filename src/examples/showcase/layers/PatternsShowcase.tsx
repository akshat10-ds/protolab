import React from 'react';
import { Stack, Badge, Inline, Icon, Text, Grid } from '@/design-system';
import { GlobalNav, LocalNav } from '@/design-system/5-patterns';
import { List } from '@/design-system/4-composites';
import DocuSignLogo from '@/assets/Docusign Horizontal Black.svg';
import styles from '../Showcase.module.css';

export interface PatternsShowcaseProps {
  activeSubpage: string;
}

// Data definitions for compact rendering
const headerMenuItems = [
  { id: 'envelopes', label: 'Envelopes', icon: 'envelope' as const, hasSubmenu: true },
  { id: 'create-request', label: 'Create Request', icon: 'document-plus' as const },
  { id: 'maestro', label: 'Maestro Workflows', icon: 'workflow' as const, hasSubmenu: true },
  { id: 'powerform', label: 'Create PowerForm', icon: 'bolt' as const },
  { id: 'workspace', label: 'Create Workspace', icon: 'folder-plus' as const },
];

const globalNavFeatures = ['App switcher', 'Primary navigation', 'Search integration', 'Notification center', 'Settings access', 'User profile menu', 'Active state tracking', 'Avatar support'];
const localNavFeatures = ['Start dropdown menu', 'Collapsible sections', 'Item badges', 'Context menus', 'Active indicators', 'Icon support', 'Footer toggle', 'Footer lock button', 'Submenu indicators', 'Tooltips'];

const docuSignLogo = (
  <img src={DocuSignLogo} alt="DocuSign" style={{ height: '24px', width: 'auto' }} />
);

export const PatternsShowcase: React.FC<PatternsShowcaseProps> = ({ activeSubpage }) => {
  const [globalNavActive, setGlobalNavActive] = React.useState('insights');
  const [localNavActive, setLocalNavActive] = React.useState('in-progress');
  const [localNavToggle, setLocalNavToggle] = React.useState(false);
  const [localNavLocked, setLocalNavLocked] = React.useState(false);
  const [agreementsActive, setAgreementsActive] = React.useState('all-agreements');
  const [agreementsToggle, setAgreementsToggle] = React.useState(true);
  const [agreementsLocked, setAgreementsLocked] = React.useState(true);
  const [agreementsCollapsed, setAgreementsCollapsed] = React.useState(false);

  const handleLockClick = () => {
    const newLocked = !agreementsLocked;
    setAgreementsLocked(newLocked);
    setAgreementsCollapsed(!newLocked);
  };

  // GlobalNav items
  const globalNavItems = [
    { id: 'insights', label: 'Insights', active: globalNavActive === 'insights', onClick: () => setGlobalNavActive('insights') },
    { id: 'campaigns', label: 'Campaigns', active: globalNavActive === 'campaigns', onClick: () => setGlobalNavActive('campaigns') },
    { id: 'audiences', label: 'Audiences', active: globalNavActive === 'audiences', onClick: () => setGlobalNavActive('audiences') },
    { id: 'reports', label: 'Reports', active: globalNavActive === 'reports', onClick: () => setGlobalNavActive('reports') },
  ];

  // Agreements sections
  const agreementsSections = [
    {
      id: 'main',
      items: [
        { id: 'all-agreements', label: 'All Agreements', icon: 'envelope' as const, active: agreementsActive === 'all-agreements', onClick: () => setAgreementsActive('all-agreements') },
        { id: 'drafts', label: 'Drafts', nested: true, active: agreementsActive === 'drafts', onClick: () => setAgreementsActive('drafts') },
        { id: 'in-progress', label: 'In Progress', nested: true, active: agreementsActive === 'in-progress', onClick: () => setAgreementsActive('in-progress') },
        { id: 'completed', label: 'Completed', nested: true, active: agreementsActive === 'completed', onClick: () => setAgreementsActive('completed') },
        { id: 'deleted', label: 'Deleted', nested: true, active: agreementsActive === 'deleted', onClick: () => setAgreementsActive('deleted') },
      ],
    },
    {
      id: 'folders',
      items: [{ id: 'folders', label: 'Folders', icon: 'folder' as const, hasMenu: true, active: agreementsActive === 'folders', onClick: () => setAgreementsActive('folders') }],
    },
    {
      id: 'features',
      items: [
        { id: 'parties', label: 'Parties', icon: 'people' as const, badge: 'New', active: agreementsActive === 'parties', onClick: () => setAgreementsActive('parties') },
        { id: 'requests', label: 'Requests', icon: 'tag' as const, badge: 'New', active: agreementsActive === 'requests', onClick: () => setAgreementsActive('requests') },
        { id: 'maestro-workflows', label: 'Maestro Workflows', icon: 'workflow' as const, badge: 'New', active: agreementsActive === 'maestro-workflows', onClick: () => setAgreementsActive('maestro-workflows') },
        { id: 'workspaces', label: 'Workspaces', icon: 'layout-grid' as const, active: agreementsActive === 'workspaces', onClick: () => setAgreementsActive('workspaces') },
        { id: 'powerforms', label: 'PowerForms', icon: 'bolt' as const, active: agreementsActive === 'powerforms', onClick: () => setAgreementsActive('powerforms') },
        { id: 'bulk-send', label: 'Bulk Send', icon: 'duplicate' as const, active: agreementsActive === 'bulk-send', onClick: () => setAgreementsActive('bulk-send') },
      ],
    },
  ];

  // LocalNav sections
  const localNavSections = [
    {
      id: 'status',
      title: 'Status',
      headerLabel: true,
      items: [
        { id: 'in-progress', label: 'In Progress', icon: 'clock' as const, badge: '3', active: localNavActive === 'in-progress', onClick: () => setLocalNavActive('in-progress') },
        { id: 'completed', label: 'Completed', icon: 'check-circle' as const, active: localNavActive === 'completed', onClick: () => setLocalNavActive('completed') },
        { id: 'archived', label: 'Archived', icon: 'archive' as const, active: localNavActive === 'archived', onClick: () => setLocalNavActive('archived') },
      ],
    },
    {
      id: 'projects',
      title: 'Projects',
      collapsible: true,
      defaultExpanded: true,
      items: [
        { id: 'website-redesign', label: 'Website Redesign', icon: 'layout' as const, hasMenu: true, active: localNavActive === 'website-redesign', onClick: () => setLocalNavActive('website-redesign') },
        { id: 'mobile-app', label: 'Mobile App', icon: 'smartphone' as const, badge: '12', hasMenu: true, active: localNavActive === 'mobile-app', onClick: () => setLocalNavActive('mobile-app') },
        { id: 'dashboard-v2', label: 'Dashboard v2', icon: 'bar-chart' as const, hasMenu: true, active: localNavActive === 'dashboard-v2', onClick: () => setLocalNavActive('dashboard-v2') },
      ],
    },
    {
      id: 'teams',
      title: 'Teams',
      collapsible: true,
      defaultExpanded: false,
      items: [
        { id: 'design', label: 'Design Team', icon: 'people' as const, active: localNavActive === 'design', onClick: () => setLocalNavActive('design') },
        { id: 'engineering', label: 'Engineering', icon: 'code-bracket' as const, active: localNavActive === 'engineering', onClick: () => setLocalNavActive('engineering') },
        { id: 'marketing', label: 'Marketing', icon: 'megaphone' as const, active: localNavActive === 'marketing', onClick: () => setLocalNavActive('marketing') },
      ],
    },
  ];

  if (activeSubpage === 'globalnav') {
    return (
      <div className={styles.tokenPage}>
        {/* Complete GlobalNav */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Complete GlobalNav</h3>
          </div>
          <div className={styles.interactiveArea} style={{ padding: 0 }}>
            <GlobalNav
              logo={docuSignLogo}
              navItems={globalNavItems}
              showAppSwitcher
              showSearch
              showNotifications
              notificationCount={5}
              showSettings
              user={{ name: 'Jane Doe' }}
            />
          </div>
        </div>

        {/* With Notification Badge */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>With Notification Badge (99+)</h3>
          </div>
          <div className={styles.interactiveArea} style={{ padding: 0 }}>
            <GlobalNav
              logo={docuSignLogo}
              navItems={globalNavItems.slice(0, 3)}
              showNotifications
              notificationCount={99}
              user={{ name: 'John Smith' }}
            />
          </div>
        </div>

        {/* Minimal Configuration */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Minimal Configuration</h3>
          </div>
          <div className={styles.interactiveArea} style={{ padding: 0 }}>
            <GlobalNav logo={docuSignLogo} navItems={globalNavItems} />
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoDesc}>Only logo and navigation items - utility actions are optional</span>
          </div>
        </div>

        {/* With All Utilities */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>With All Utilities</h3>
          </div>
          <div className={styles.interactiveArea} style={{ padding: 0 }}>
            <GlobalNav
              logo={docuSignLogo}
              navItems={[
                { id: 'home', label: 'Home', active: true },
                { id: 'products', label: 'Products' },
                { id: 'analytics', label: 'Analytics' },
              ]}
              showAppSwitcher
              showSearch
              showNotifications
              notificationCount={12}
              showSettings
              user={{ name: 'Alex Chen', avatar: 'https://i.pravatar.cc/150?img=8' }}
            />
          </div>
        </div>

        {/* Key Features */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Key Features</h3>
          </div>
          <div className={styles.demoGrid}>
            {globalNavFeatures.map((feature) => (
              <Badge key={feature} variant="neutral">{feature}</Badge>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (activeSubpage === 'localnav') {
    return (
      <div className={styles.tokenPage}>
        {/* DocuSign Agreements Replica */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>DocuSign Agreements Page (Exact Replica)</h3>
          </div>
          <Text size="small" color="secondary" style={{ margin: '0 12px 8px' }}>
            Click lock/unlock button to toggle collapse behavior. When unlocked, nav collapses to icons only.
          </Text>
          <div style={{ height: '600px', border: '1px solid var(--ink-border-default)', borderRadius: 'var(--ink-radius-size-xs)', overflow: 'hidden', margin: '0 8px' }}>
            <LocalNav
              headerLabel="Start"
              headerIcon="plus"
              headerMenuItems={headerMenuItems}
              sections={agreementsSections}
              activeItemId={agreementsActive}
              collapsed={agreementsCollapsed}
              footerToggle={{ label: 'New navigation', checked: agreementsToggle, onChange: setAgreementsToggle }}
              footerLockButton={{ locked: agreementsLocked, onLockClick: handleLockClick }}
            />
          </div>
          <div className={styles.demoRow}>
            <Badge variant={agreementsLocked ? 'success' : 'warning'}>
              {agreementsLocked ? 'Locked (Expanded)' : 'Unlocked (Collapsible)'}
            </Badge>
          </div>
        </div>

        {/* Full-Featured LocalNav */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Full-Featured LocalNav</h3>
          </div>
          <div style={{ height: '600px', border: '1px solid var(--ink-border-default)', borderRadius: 'var(--ink-radius-size-xs)', overflow: 'hidden', margin: '0 8px' }}>
            <LocalNav
              headerLabel="Start"
              headerMenuItems={headerMenuItems}
              sections={localNavSections}
              activeItemId={localNavActive}
              footerToggle={{ label: 'New navigation', checked: localNavToggle, onChange: setLocalNavToggle, icon: 'bolt' }}
              footerLockButton={{ locked: localNavLocked, onLockClick: () => setLocalNavLocked(!localNavLocked) }}
            />
          </div>
        </div>

        {/* With Collapsible Sections */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>With Collapsible Sections</h3>
          </div>
          <div className={styles.stateRow}>
            <div className={styles.stateCell} style={{ minWidth: '250px' }}>
              <div style={{ height: '400px', border: '1px solid var(--ink-border-default)', borderRadius: 'var(--ink-radius-size-xs)', overflow: 'hidden' }}>
                <LocalNav headerLabel="Projects" sections={localNavSections} activeItemId={localNavActive} />
              </div>
            </div>
            <div className={styles.stateCell}>
              <Stack gap="small">
                <Text weight="medium">Features shown:</Text>
                <List size="small">
                  <List.Item startElement={<Icon name="check" size="small" />}>Section headers (label & collapsible)</List.Item>
                  <List.Item startElement={<Icon name="check" size="small" />}>Item badges for counts</List.Item>
                  <List.Item startElement={<Icon name="check" size="small" />}>Context menu buttons</List.Item>
                  <List.Item startElement={<Icon name="check" size="small" />}>Active state indicators</List.Item>
                </List>
              </Stack>
            </div>
          </div>
        </div>

        {/* Simple Navigation */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Simple Navigation</h3>
          </div>
          <div style={{ height: '300px', border: '1px solid var(--ink-border-default)', borderRadius: 'var(--ink-radius-size-xs)', overflow: 'hidden', margin: '0 8px' }}>
            <LocalNav
              headerLabel="Dashboard"
              sections={[{
                id: 'main',
                items: [
                  { id: 'overview', label: 'Overview', icon: 'home' as const, active: true },
                  { id: 'activity', label: 'Activity', icon: 'chart-bar' as const, badge: '5' },
                  { id: 'settings', label: 'Settings', icon: 'settings' as const },
                ],
              }]}
            />
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoDesc}>Minimal configuration with single section</span>
          </div>
        </div>

        {/* With Header Action */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>With Header Action</h3>
          </div>
          <div style={{ height: '300px', border: '1px solid var(--ink-border-default)', borderRadius: 'var(--ink-radius-size-xs)', overflow: 'hidden', margin: '0 8px' }}>
            <LocalNav
              headerLabel="Documents"
              sections={[{
                id: 'folders',
                title: 'Folders',
                headerLabel: true,
                headerAction: { icon: 'folder-plus', label: 'New folder', onClick: () => alert('Creating new folder...') },
                items: [
                  { id: 'design', label: 'Design Files', icon: 'folder' as const, badge: '24' },
                  { id: 'docs', label: 'Documentation', icon: 'folder' as const, badge: '8' },
                  { id: 'assets', label: 'Assets', icon: 'folder' as const, badge: '156' },
                ],
              }]}
            />
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoDesc}>Section header with action button (hover over "Folders")</span>
          </div>
        </div>

        {/* Key Features */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Key Features</h3>
          </div>
          <div className={styles.demoGrid}>
            {localNavFeatures.map((feature) => (
              <Badge key={feature} variant="neutral">{feature}</Badge>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
};
