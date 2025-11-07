import React, { useState } from 'react';
import { GlobalNav } from '../design-system/5-patterns/GlobalNav';
import { LocalNav } from '../design-system/5-patterns/LocalNav';
import { Stack } from '../design-system/2-utilities/Stack';
import { Inline } from '../design-system/2-utilities/Inline';
import { Heading, Text } from '../design-system/3-primitives/Typography';
import { Badge } from '../design-system/3-primitives/Badge';
import { IconButton } from '../design-system/3-primitives/IconButton';
import { Banner } from '../design-system/3-primitives/Banner';
import { Button } from '../design-system/3-primitives/Button';
import { SearchInput } from '../design-system/4-composites/SearchInput';
import { FilterTag } from '../design-system/4-composites/FilterTag';
import { Table } from '../design-system/4-composites/Table';
import { Pagination } from '../design-system/4-composites/Pagination';
import { StatusLight } from '../design-system/3-primitives/StatusLight';
import { Icon } from '../design-system/3-primitives/Icon';

// Custom layout styles for full-width header
const layoutStyles = {
  layout: {
    display: 'flex',
    flexDirection: 'column' as const,
    minHeight: '100vh',
    background: 'var(--ink-bg-secondary)',
  },
  header: {
    width: '100%',
    background: 'var(--ink-bg-primary)',
    borderBottom: '1px solid var(--ink-border-primary)',
    flexShrink: 0,
  },
  body: {
    display: 'flex',
    flex: 1,
    overflow: 'hidden',
  },
  nav: {
    width: '280px',
    background: 'var(--ink-bg-primary)',
    borderRight: '1px solid var(--ink-border-primary)',
    flexShrink: 0,
    overflowY: 'auto' as const,
  },
  content: {
    flex: 1,
    overflowY: 'auto' as const,
    minWidth: 0,
  },
};

export const AgreementsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [activeItemId, setActiveItemId] = useState('completed');
  const [newNavEnabled, setNewNavEnabled] = useState(false);

  // Mock navigation data for LocalNav
  const localNavSections = [
    {
      id: 'agreements',
      title: 'All Agreements',
      icon: 'envelope' as const,
      collapsible: true,
      defaultExpanded: true,
      items: [
        {
          id: 'drafts',
          label: 'Drafts',
          nested: true,
          onClick: () => setActiveItemId('drafts'),
        },
        {
          id: 'in-progress',
          label: 'In Progress',
          nested: true,
          onClick: () => setActiveItemId('in-progress'),
        },
        {
          id: 'completed',
          label: 'Completed',
          nested: true,
          onClick: () => setActiveItemId('completed'),
        },
        {
          id: 'deleted',
          label: 'Deleted',
          nested: true,
          onClick: () => setActiveItemId('deleted'),
        },
      ],
    },
    {
      id: 'folders-section',
      title: 'FOLDERS',
      headerLabel: true,
      headerAction: {
        icon: 'plus' as const,
        label: 'New Folder',
        onClick: () => console.log('New Folder'),
      },
      items: [
        {
          id: 'folders',
          label: 'Folders',
          icon: 'folder' as const,
          hasMenu: true,
          onMenuClick: (e: React.MouseEvent) => console.log('Folders menu clicked'),
          onClick: () => setActiveItemId('folders'),
        },
        {
          id: 'all-parties',
          label: 'All Parties',
          icon: 'people' as const,
          badge: 'New',
          onClick: () => setActiveItemId('all-parties'),
        },
      ],
    },
    {
      id: 'tools',
      items: [
        {
          id: 'requests',
          label: 'Requests',
          icon: 'envelope' as const,
          badge: 'New',
          onClick: () => setActiveItemId('requests'),
        },
        {
          id: 'maestro-workflows',
          label: 'Maestro Workflows',
          icon: 'settings' as const,
          onClick: () => setActiveItemId('maestro-workflows'),
        },
        {
          id: 'workspaces',
          label: 'Workspaces',
          icon: 'layout-grid' as const,
          onClick: () => setActiveItemId('workspaces'),
        },
        {
          id: 'powerforms',
          label: 'PowerForms',
          icon: 'document' as const,
          onClick: () => setActiveItemId('powerforms'),
        },
        {
          id: 'bulk-send',
          label: 'Bulk Send',
          icon: 'envelope' as const,
          onClick: () => setActiveItemId('bulk-send'),
        },
      ],
    },
  ];

  // Mock global navigation data
  const globalNavItems = [
    { id: 'home', label: 'Home', active: false, onClick: () => console.log('Home clicked') },
    {
      id: 'agreements',
      label: 'Agreements',
      active: true,
      onClick: () => console.log('Agreements clicked'),
    },
    {
      id: 'templates',
      label: 'Templates',
      active: false,
      onClick: () => console.log('Templates clicked'),
    },
    {
      id: 'insights',
      label: 'Insights',
      active: false,
      onClick: () => console.log('Insights clicked'),
    },
  ];

  // Mock agreements data
  const agreementsData = [
    {
      id: '1',
      name: 'Offer Letter.pdf',
      completedBy: 'Jul 25 for · Becca Schultz',
      party: 'Mary Wilson',
      status: 'Active',
      statusExpiry: 'Expires 7/24/28',
      type: 'Intellectual Property',
      aiIcon: true,
    },
    {
      id: '2',
      name: 'Confirmation of Termination.pdf',
      completedBy: 'Completed for · Becca Schultz',
      party: 'Mary Wilson',
      status: 'Expiring Soon',
      statusExpiry: 'Expires 7/24/28',
      type: 'Intellectual Property',
      aiIcon: true,
    },
    {
      id: '3',
      name: 'Service-level Agreement.pdf',
      completedBy: 'Completed for · Becca Schultz',
      party: 'Mary Wilson',
      status: 'Active',
      statusExpiry: 'Expires 8/12/27',
      type: 'Intellectual Property',
      aiIcon: false,
    },
    {
      id: '4',
      name: 'Intellectual Property Agreement.pdf',
      completedBy: 'On sent via HEMS Service Auto',
      party: 'Mary Wilson',
      status: 'Transferred',
      statusExpiry: 'Transferred 01/2024',
      type: 'Intellectual Property',
      aiIcon: false,
    },
    {
      id: '5',
      name: 'Background Check.pdf',
      completedBy: '1 hr ago via HEMS Service Auto',
      party: 'Mary Wilson',
      status: 'Active',
      statusExpiry: 'Expires 7/24/28',
      type: 'Intellectual Property',
      aiIcon: false,
    },
    {
      id: '6',
      name: 'Individual Development Plan.pdf',
      completedBy: 'Completed for · Becca Schultz',
      party: 'Mary Wilson',
      status: 'Expiring Soon',
      statusExpiry: 'Expires 7/24/28',
      type: 'Intellectual Property',
      aiIcon: true,
    },
    {
      id: '7',
      name: 'Contractor NDA.pdf',
      completedBy: '1 hr ago via HEMS Service Auto',
      party: 'Mary Wilson',
      status: 'Active',
      statusExpiry: 'Expires 7/24/28',
      type: 'Intellectual Property',
      aiIcon: true,
    },
  ];

  // Table columns configuration
  const columns = [
    {
      key: 'name',
      header: 'Name',
      width: '35%',
      cell: (row: (typeof agreementsData)[0]) => (
        <Stack gap="xs">
          <Inline gap="xs" align="center">
            {row.aiIcon && (
              <Icon name="spark" size="small" style={{ color: 'var(--ink-accent-primary)' }} />
            )}
            <Text weight="semibold">{row.name}</Text>
          </Inline>
          <Inline gap="xs" align="center">
            <Icon name="check" size="small" />
            <Text size="sm" color="secondary">
              {row.completedBy}
            </Text>
          </Inline>
        </Stack>
      ),
    },
    {
      key: 'party',
      header: 'Parties',
      cell: (row: (typeof agreementsData)[0]) => <Text>{row.party}</Text>,
    },
    {
      key: 'status',
      header: 'Status',
      cell: (row: (typeof agreementsData)[0]) => (
        <Stack gap="xs">
          <StatusLight
            status={
              row.status === 'Active'
                ? 'success'
                : row.status === 'Expiring Soon'
                  ? 'warning'
                  : 'default'
            }
            label={row.status}
          />
          <Text size="sm" color="secondary">
            {row.statusExpiry}
          </Text>
        </Stack>
      ),
    },
    {
      key: 'type',
      header: 'Type',
      cell: (row: (typeof agreementsData)[0]) => <Text>{row.type}</Text>,
    },
    {
      key: 'actions',
      header: '',
      width: '60px',
      cell: () => (
        <IconButton icon="more-vertical" size="small" onClick={() => console.log('Menu clicked')} />
      ),
    },
  ];

  return (
    <div style={layoutStyles.layout}>
      {/* Full-width Header */}
      <header style={layoutStyles.header}>
        <GlobalNav
          logo={
            <img
              src="/assets/docusign-logo.svg"
              alt="DocuSign"
              style={{ width: '119.25px', height: '24px', objectFit: 'contain' }}
            />
          }
          navItems={globalNavItems}
          showAppSwitcher={true}
          onAppSwitcherClick={() => console.log('App switcher clicked')}
          showSearch={true}
          onSearchClick={() => console.log('Search clicked')}
          showNotifications={true}
          notificationCount={3}
          onNotificationClick={() => console.log('Notifications clicked')}
          showSettings={true}
          onSettingsClick={() => console.log('Settings clicked')}
          user={{ name: 'Kathie Brown' }}
          onUserMenuClick={() => console.log('User menu clicked')}
        />
      </header>

      {/* Body with Navigation and Content */}
      <div style={layoutStyles.body}>
        {/* Left Navigation */}
        <aside style={layoutStyles.nav}>
          <LocalNav
            headerLabel="Start"
            sections={localNavSections}
            activeItemId={activeItemId}
            onHeaderClick={() => console.log('Header clicked')}
            footerToggle={{
              label: 'New navigation',
              checked: newNavEnabled,
              onChange: setNewNavEnabled,
              icon: 'lock' as const,
            }}
          />
        </aside>

        {/* Main Content */}
        <main style={layoutStyles.content}>
          <Stack gap="large" style={{ padding: '48px' }}>
            {/* Page Header */}
            <Stack direction="row" align="center" justify="space-between">
              <Inline gap="small" align="center">
                <Heading level={1}>Completed documents</Heading>
                <Badge variant="info">
                  <Inline gap="xs" align="center">
                    <Icon name="spark" size="small" />
                    <span>AI-Assisted</span>
                  </Inline>
                </Badge>
              </Inline>
              <Inline gap="small">
                <IconButton icon="upload" onClick={() => console.log('Upload')} />
                <IconButton icon="more-vertical" onClick={() => console.log('More')} />
              </Inline>
            </Stack>

            {/* Alert Banner */}
            <Banner variant="info" onDismiss={() => console.log('Dismiss banner')}>
              <Inline gap="medium" align="center" justify="space-between" style={{ width: '100%' }}>
                <Text>15 agreements with renewal notice dates in the next 30 days.</Text>
                <Button variant="text" size="small">
                  Show Insights
                </Button>
              </Inline>
            </Banner>

            {/* Filter Bar */}
            <Stack gap="medium">
              <Inline gap="small" align="center">
                <FilterTag label="Documents" onRemove={() => console.log('Remove filter')} />
                <SearchInput
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onClear={() => setSearchQuery('')}
                />
                <FilterTag label="Parties" onRemove={() => console.log('Remove filter')} />
                <FilterTag label="Type" onRemove={() => console.log('Remove filter')} />
                <FilterTag label="Expiration date" onRemove={() => console.log('Remove filter')} />
                <Button variant="text" size="small">
                  All Filters
                </Button>
              </Inline>
            </Stack>

            {/* Data Table */}
            <Table
              columns={columns}
              data={agreementsData}
              selectable
              selectedRows={selectedRows}
              onSelectionChange={setSelectedRows}
              sortable
            />

            {/* Pagination */}
            <Inline justify="space-between" align="center">
              <Text color="secondary">1-50 of 100</Text>
              <Pagination currentPage={currentPage} totalPages={7} onPageChange={setCurrentPage} />
            </Inline>
          </Stack>
        </main>
      </div>
    </div>
  );
};
