import React, { useState } from 'react';
import { DocuSignShell } from '@/design-system';
import type { GlobalNavItem, LocalNavSection, HeaderMenuItem } from '@/design-system';
import DocuSignLogo from '@/assets/Docusign Horizontal Black.svg';
import CompletedAgreementsPage from './CompletedAgreementsPage';

// GlobalNav items - exact DocuSign setup
const globalNavItems: GlobalNavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'agreements', label: 'Agreements', active: true },
  { id: 'templates', label: 'Templates' },
  { id: 'reports', label: 'Reports' },
  { id: 'admin', label: 'Admin' },
];

// LocalNav header menu items
const headerMenuItems: HeaderMenuItem[] = [
  { id: 'envelopes', label: 'Envelopes', icon: 'envelope', hasSubmenu: true },
  { id: 'create-request', label: 'Create Request', icon: 'document-plus' },
  { id: 'maestro', label: 'Maestro Workflows', icon: 'workflow', hasSubmenu: true },
  { id: 'create-powerform', label: 'Create PowerForm', icon: 'bolt' },
  { id: 'create-workspace', label: 'Create Workspace', icon: 'folder-plus' },
];

const docuSignLogo = (
  <img src={DocuSignLogo} alt="DocuSign" style={{ height: '24px', width: 'auto' }} />
);

export default function DocuSignShellDemo() {
  const [activeItem, setActiveItem] = useState('completed');
  const [navToggle, setNavToggle] = useState(true);
  const [navLocked, setNavLocked] = useState(true);

  // LocalNav sections - exact DocuSign Agreements structure
  const agreementsSections: LocalNavSection[] = [
    {
      id: 'main',
      items: [
        {
          id: 'all-agreements',
          label: 'All Agreements',
          icon: 'envelope',
          active: activeItem === 'all-agreements',
          onClick: () => setActiveItem('all-agreements'),
        },
        {
          id: 'drafts',
          label: 'Drafts',
          nested: true,
          active: activeItem === 'drafts',
          onClick: () => setActiveItem('drafts'),
        },
        {
          id: 'in-progress',
          label: 'In Progress',
          nested: true,
          active: activeItem === 'in-progress',
          onClick: () => setActiveItem('in-progress'),
        },
        {
          id: 'completed',
          label: 'Completed',
          nested: true,
          active: activeItem === 'completed',
          onClick: () => setActiveItem('completed'),
        },
        {
          id: 'deleted',
          label: 'Deleted',
          nested: true,
          active: activeItem === 'deleted',
          onClick: () => setActiveItem('deleted'),
        },
      ],
    },
    {
      id: 'folders',
      items: [
        {
          id: 'folders',
          label: 'Folders',
          icon: 'folder',
          hasMenu: true,
          active: activeItem === 'folders',
          onClick: () => setActiveItem('folders'),
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
          icon: 'building-person',
          badge: 'New',
          active: activeItem === 'parties',
          onClick: () => setActiveItem('parties'),
        },
        {
          id: 'requests',
          label: 'Requests',
          icon: 'ticket',
          badge: 'New',
          active: activeItem === 'requests',
          onClick: () => setActiveItem('requests'),
        },
        {
          id: 'maestro-workflows',
          label: 'Maestro Workflows',
          icon: 'workflow',
          badge: 'New',
          active: activeItem === 'maestro-workflows',
          onClick: () => setActiveItem('maestro-workflows'),
        },
        {
          id: 'workspaces',
          label: 'Workspaces',
          icon: 'transaction',
          active: activeItem === 'workspaces',
          onClick: () => setActiveItem('workspaces'),
        },
        {
          id: 'powerforms',
          label: 'PowerForms',
          icon: 'flash',
          active: activeItem === 'powerforms',
          onClick: () => setActiveItem('powerforms'),
        },
        {
          id: 'bulk-send',
          label: 'Bulk Send',
          icon: 'document-stack',
          active: activeItem === 'bulk-send',
          onClick: () => setActiveItem('bulk-send'),
        },
      ],
    },
  ];

  return (
    <DocuSignShell
      globalNav={{
        logo: docuSignLogo,
        navItems: globalNavItems,
        showAppSwitcher: false,
        showSearch: true,
        searchVariant: 'pill',
        showNotifications: true,
        notificationCount: 3,
        showSettings: true,
        settingsIcon: 'filter',
        user: { name: 'AM' },
      }}
      localNav={{
        headerLabel: 'Start',
        headerIcon: 'plus',
        headerMenuItems: headerMenuItems,
        sections: agreementsSections,
        activeItemId: activeItem,
        isLocked: navLocked,
        onLockChange: setNavLocked,
        footerToggle: { label: 'New navigation', checked: navToggle, onChange: setNavToggle },
      }}
    >
      <CompletedAgreementsPage />
    </DocuSignShell>
  );
}
