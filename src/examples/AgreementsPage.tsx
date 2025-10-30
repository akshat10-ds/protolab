import React, { useState } from 'react';
import { DashboardLayout } from '../design-system/6-layouts/DashboardLayout';
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

export const AgreementsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  // Mock navigation data for LocalNav
  const localNavSections = [
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
        { id: 'folder-1', label: 'My Folder', icon: 'folder' as const },
      ],
    },
    {
      id: 'section-3',
      title: 'All Parties',
      headerLabel: true,
      headerAction: {
        icon: 'plus' as const,
        label: 'New',
        onClick: () => console.log('New party'),
      },
      items: [
        { id: 'employees', label: 'Employees', nested: true },
        { id: 'vendors', label: 'Vendors', nested: true },
      ],
    },
    {
      id: 'section-4',
      title: 'Maestro Workflows',
      items: [
        { id: 'workflow-1', label: 'Workflow 1', icon: 'workflow' as const },
      ],
    },
    {
      id: 'section-5',
      title: 'Workspaces',
      items: [
        { id: 'workspace-1', label: 'Workspace 1', icon: 'people' as const },
      ],
    },
    {
      id: 'section-6',
      title: 'PowerForms',
      items: [
        { id: 'powerform-1', label: 'PowerForm 1', icon: 'document' as const },
      ],
    },
    {
      id: 'section-7',
      title: 'Bulk Send',
      items: [
        { id: 'bulk-1', label: 'Bulk Send 1', icon: 'envelope' as const },
      ],
    },
  ];

  // Mock global navigation data
  const globalNavItems = [
    { id: 'home', label: 'Home', href: '/showcase' },
    { id: 'agreements', label: 'Agreements', active: true },
    { id: 'templates', label: 'Templates', href: '#' },
    { id: 'insights', label: 'Insights', href: '#' },
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
      cell: (row: typeof agreementsData[0]) => (
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
      cell: (row: typeof agreementsData[0]) => (
        <Text>{row.party}</Text>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      cell: (row: typeof agreementsData[0]) => (
        <Stack gap="xs">
          <StatusLight
            status={row.status === 'Active' ? 'success' : row.status === 'Expiring Soon' ? 'warning' : 'default'}
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
      cell: (row: typeof agreementsData[0]) => (
        <Text>{row.type}</Text>
      ),
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
    <DashboardLayout
      header={
        <GlobalNav
          logo={<Heading level={3}>docusign</Heading>}
          navItems={globalNavItems}
          showSearch
          showNotifications
          notificationCount={3}
          showSettings
          user={{ name: 'Kathie Brown' }}
        />
      }
      navigation={
        <LocalNav
          headerLabel="Start"
          sections={localNavSections}
          onHeaderClick={() => console.log('Header clicked')}
        />
      }
    >
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
            <Text>
              15 agreements with renewal notice dates in the next 30 days.
            </Text>
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
          <Text color="secondary">
            1-50 of 100
          </Text>
          <Pagination
            currentPage={currentPage}
            totalPages={7}
            onPageChange={setCurrentPage}
          />
        </Inline>
      </Stack>
    </DashboardLayout>
  );
};
