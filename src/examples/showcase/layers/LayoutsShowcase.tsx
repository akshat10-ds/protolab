import React, { useState } from 'react';
import { Stack, Badge, Inline, Text, DocuSignShell } from '@/design-system';
import DocuSignLogo from '@/assets/Docusign Horizontal Black.svg';
import styles from '../Showcase.module.css';

export interface LayoutsShowcaseProps {
  activeSubpage: string;
}

// Data definitions
const headerMenuItems = [
  { id: 'envelopes', label: 'Envelopes', icon: 'envelope' as const, hasSubmenu: true },
  { id: 'create-request', label: 'Create Request', icon: 'document-plus' as const },
  { id: 'maestro', label: 'Maestro Workflows', icon: 'workflow' as const, hasSubmenu: true },
  { id: 'create-powerform', label: 'Create PowerForm', icon: 'bolt' as const },
  { id: 'create-workspace', label: 'Create Workspace', icon: 'folder-plus' as const },
];

const globalNavItems = [
  { id: 'home', label: 'Home' },
  { id: 'agreements', label: 'Agreements', active: true },
  { id: 'templates', label: 'Templates' },
  { id: 'reports', label: 'Reports' },
  { id: 'admin', label: 'Admin' },
];

const shellFeatures = ['GlobalNav always present', 'LocalNav optional', 'Sticky header', 'Scrollable content', 'Full-height layout', 'Composes Layer 5 patterns'];

const docuSignLogo = (
  <img src={DocuSignLogo} alt="DocuSign" style={{ height: '24px', width: 'auto' }} />
);

export const LayoutsShowcase: React.FC<LayoutsShowcaseProps> = ({ activeSubpage }) => {
  const [agreementsActive, setAgreementsActive] = useState('all-agreements');
  const [agreementsToggle, setAgreementsToggle] = useState(true);
  const [agreementsLocked, setAgreementsLocked] = useState(true);
  const [agreementsCollapsed, setAgreementsCollapsed] = useState(false);

  const handleLockClick = () => {
    const newLocked = !agreementsLocked;
    setAgreementsLocked(newLocked);
    setAgreementsCollapsed(!newLocked);
  };

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

  if (activeSubpage === 'docusign-shell') {
    return (
      <div className={styles.tokenPage}>
        {/* Full Shell Demo */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>DocuSign Agreements Page (Full Shell)</h3>
          </div>
          <Text size="small" color="secondary" style={{ margin: '0 12px 8px' }}>
            Exact replica of the DocuSign Agreements page with GlobalNav and LocalNav.
          </Text>
          <div style={{ border: '2px solid var(--ink-border-default)', borderRadius: 'var(--ink-radius-size-sm)', overflow: 'hidden', height: '700px', margin: '0 8px' }}>
            <DocuSignShell
              globalNav={{
                logo: docuSignLogo,
                navItems: globalNavItems,
                showSearch: true,
                showNotifications: true,
                notificationCount: 3,
                showSettings: true,
                user: { name: 'John Doe' },
              }}
              localNav={{
                headerLabel: 'Start',
                headerIcon: 'plus',
                headerMenuItems: headerMenuItems,
                sections: agreementsSections,
                activeItemId: agreementsActive,
                collapsed: agreementsCollapsed,
                footerToggle: { label: 'New navigation', checked: agreementsToggle, onChange: setAgreementsToggle },
                footerLockButton: { locked: agreementsLocked, onLockClick: handleLockClick },
              }}
            >
              <div />
            </DocuSignShell>
          </div>
          <div className={styles.demoRow}>
            <Badge variant={agreementsLocked ? 'success' : 'warning'}>
              {agreementsLocked ? 'Locked (Expanded)' : 'Unlocked (Collapsible)'}
            </Badge>
            <span className={styles.demoDesc}>
              {agreementsLocked ? 'Nav stays expanded' : 'Nav collapses on click away'}
            </span>
          </div>
        </div>

        {/* Without LocalNav */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Without LocalNav</h3>
          </div>
          <div style={{ border: '2px solid var(--ink-border-default)', borderRadius: 'var(--ink-radius-size-sm)', overflow: 'hidden', height: '400px', margin: '0 8px' }}>
            <DocuSignShell
              globalNav={{
                logo: docuSignLogo,
                navItems: [
                  { id: 'settings', label: 'Settings', active: true },
                  { id: 'billing', label: 'Billing' },
                  { id: 'team', label: 'Team' },
                ],
                showSearch: true,
                user: { name: 'Admin User' },
              }}
            >
              <div />
            </DocuSignShell>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoDesc}>Shell without sidebar - useful for settings pages</span>
          </div>
        </div>

        {/* API */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>API</h3>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>globalNav</span>
            <span className={styles.demoDesc}>Configuration for GlobalNav pattern (required)</span>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>localNav</span>
            <span className={styles.demoDesc}>Configuration for LocalNav pattern (optional)</span>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>children</span>
            <span className={styles.demoDesc}>Main content for the content area (required)</span>
          </div>
        </div>

        {/* Key Features */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Key Features</h3>
          </div>
          <div className={styles.demoGrid}>
            {shellFeatures.map((feature) => (
              <Badge key={feature} variant="neutral">{feature}</Badge>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
};
