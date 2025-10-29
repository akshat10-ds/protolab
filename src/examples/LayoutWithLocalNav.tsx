import React, { useState } from 'react';
import { LocalNav, GlobalNav } from '@/design-system/5-patterns';
import {
  Stack,
  Heading,
  Text,
  Card,
  Button,
  Badge,
  StatusLight,
  Table,
  Icon,
  Avatar,
} from '@/design-system';
import type { TableColumn } from '@/design-system';

// Sample agreement data
interface Agreement {
  id: string;
  name: string;
  status: 'completed' | 'in-progress' | 'draft';
  sender: string;
  created: string;
}

const sampleAgreements: Agreement[] = [
  {
    id: '1',
    name: 'Sales Agreement Q4 2024',
    status: 'completed',
    sender: 'John Smith',
    created: '2024-10-15',
  },
  {
    id: '2',
    name: 'NDA - Partner Agreement',
    status: 'in-progress',
    sender: 'Sarah Johnson',
    created: '2024-10-18',
  },
  {
    id: '3',
    name: 'Employment Contract - Jane Doe',
    status: 'completed',
    sender: 'HR Department',
    created: '2024-10-10',
  },
  {
    id: '4',
    name: 'Consulting Services Agreement',
    status: 'draft',
    sender: 'Michael Brown',
    created: '2024-10-22',
  },
];

export const LayoutWithLocalNav: React.FC = () => {
  const [activeItemId, setActiveItemId] = useState('in-progress');
  const [newNavEnabled, setNewNavEnabled] = useState(false);

  // Filter agreements based on active section
  const filteredAgreements = sampleAgreements.filter((agreement) => {
    if (activeItemId === 'drafts') return agreement.status === 'draft';
    if (activeItemId === 'in-progress') return agreement.status === 'in-progress';
    if (activeItemId === 'completed') return agreement.status === 'completed';
    return true;
  });

  const columns: TableColumn<Agreement>[] = [
    {
      key: 'name',
      header: 'Agreement Name',
      cell: (row) => <Text weight="medium">{row.name}</Text>,
      sortable: true,
    },
    {
      key: 'status',
      header: 'Status',
      cell: (row) => {
        const statusConfig = {
          completed: { kind: 'success' as const, label: 'Completed' },
          'in-progress': { kind: 'warning' as const, label: 'In Progress' },
          draft: { kind: 'neutral' as const, label: 'Draft' },
        };
        const config = statusConfig[row.status];
        return <StatusLight kind={config.kind}>{config.label}</StatusLight>;
      },
      width: '140px',
    },
    {
      key: 'sender',
      header: 'Sender',
      cell: (row) => <Text>{row.sender}</Text>,
      sortable: true,
    },
    {
      key: 'created',
      header: 'Created',
      cell: (row) => <Text color="secondary" size="sm">{row.created}</Text>,
      sortable: true,
      width: '120px',
    },
  ];

  const getSectionTitle = () => {
    switch (activeItemId) {
      case 'drafts':
        return 'Draft Agreements';
      case 'in-progress':
        return 'Agreements In Progress';
      case 'completed':
        return 'Completed Agreements';
      case 'deleted':
        return 'Deleted Agreements';
      case 'folders':
        return 'Folders';
      case 'all-parties':
        return 'All Parties';
      case 'employees':
        return 'Employees';
      case 'requests':
        return 'Requests';
      case 'maestro-workflows':
        return 'Maestro Workflows';
      case 'workspaces':
        return 'Workspaces';
      case 'powerforms':
        return 'Powerforms';
      case 'bulk-send':
        return 'Bulk Send';
      default:
        return 'Overview';
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      {/* Global Navigation (Top Bar) */}
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
          { id: 'agreements', label: 'Agreements', active: true, onClick: () => console.log('Agreements') },
          { id: 'templates', label: 'Templates', active: false, onClick: () => console.log('Templates') },
          { id: 'reports', label: 'Reports', active: false, onClick: () => console.log('Reports') },
        ]}
        showAppSwitcher={true}
        onAppSwitcherClick={() => console.log('App switcher clicked')}
        showSearch={true}
        onSearchClick={() => console.log('Search clicked')}
        showNotifications={true}
        notificationCount={3}
        onNotificationClick={() => console.log('Notifications clicked')}
        showSettings={true}
        onSettingsClick={() => console.log('Settings clicked')}
        user={{
          name: 'John Smith',
        }}
        onUserMenuClick={() => console.log('User menu clicked')}
      />

      {/* Main Layout: Sidebar + Content */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Local Navigation Sidebar */}
        <LocalNav
        headerLabel="Start"
        sections={[
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
              icon: 'plus',
              label: 'New Folder',
              onClick: () => console.log('New Folder clicked'),
            },
            items: [
              {
                id: 'folders',
                label: 'Folders',
                icon: 'folder',
                hasMenu: true,
                onMenuClick: (e) => {
                  console.log('Folders menu clicked');
                },
                onClick: () => setActiveItemId('folders'),
              },
              {
                id: 'all-parties',
                label: 'All Parties',
                icon: 'people',
                badge: 'New',
                onClick: () => setActiveItemId('all-parties'),
              },
              {
                id: 'employees',
                label: 'Employees',
                icon: 'user',
                onClick: () => setActiveItemId('employees'),
              },
            ],
          },
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
              {
                id: 'maestro-workflows',
                label: 'Maestro Workflows',
                icon: 'settings',
                onClick: () => setActiveItemId('maestro-workflows'),
              },
              {
                id: 'workspaces',
                label: 'Workspaces',
                icon: 'layout-grid',
                onClick: () => setActiveItemId('workspaces'),
              },
              {
                id: 'powerforms',
                label: 'Powerforms',
                icon: 'document',
                onClick: () => setActiveItemId('powerforms'),
              },
              {
                id: 'bulk-send',
                label: 'Bulk Send',
                icon: 'send',
                onClick: () => setActiveItemId('bulk-send'),
              },
            ],
          },
        ]}
        activeItemId={activeItemId}
        onHeaderClick={() => console.log('Header clicked')}
        footerToggle={{
          label: 'New navigation',
          checked: newNavEnabled,
          onChange: setNewNavEnabled,
          icon: 'lock',
        }}
      />

      {/* Main Content Area */}
      <div
        style={{
          flex: 1,
          overflow: 'auto',
          backgroundColor: 'var(--ink-neutral-10)',
        }}
      >
        <div style={{ padding: '32px', maxWidth: '1400px' }}>
          <Stack gap="xlarge">
            {/* Page Header */}
            <div>
              <Stack gap="small">
                <Heading level={1}>{getSectionTitle()}</Heading>
                <Text color="secondary" size="lg">
                  Manage and track your {activeItemId.replace('-', ' ')}
                </Text>
              </Stack>
            </div>

            {/* Action Bar */}
            <Card>
              <Card.Body>
                <Stack direction="horizontal" gap="medium" align="center" justify="space-between">
                  <Stack direction="horizontal" gap="medium" align="center">
                    <Button kind="brand" startElement={<Icon name="plus" />}>
                      Create New
                    </Button>
                    <Button kind="secondary" startElement={<Icon name="upload" />}>
                      Import
                    </Button>
                  </Stack>
                  <Stack direction="horizontal" gap="small" align="center">
                    <Badge variant="neutral">{filteredAgreements.length} items</Badge>
                    <Button kind="tertiary" startElement={<Icon name="filter" />}>
                      Filter
                    </Button>
                    <Button kind="tertiary" startElement={<Icon name="settings" />}>
                      Settings
                    </Button>
                  </Stack>
                </Stack>
              </Card.Body>
            </Card>

            {/* Data Table */}
            <Card>
              <Card.Body>
                {filteredAgreements.length > 0 ? (
                  <Table
                    columns={columns}
                    data={filteredAgreements}
                    striped
                    hoverable
                  />
                ) : (
                  <Stack gap="medium" align="center" style={{ padding: '64px 0' }}>
                    <Icon name="inbox" size="xlarge" />
                    <Stack gap="small" align="center">
                      <Heading level={3}>No {activeItemId.replace('-', ' ')} found</Heading>
                      <Text color="secondary">
                        Get started by creating your first agreement
                      </Text>
                    </Stack>
                    <Button kind="brand" startElement={<Icon name="plus" />}>
                      Create Agreement
                    </Button>
                  </Stack>
                )}
              </Card.Body>
            </Card>
          </Stack>
        </div>
      </div>
      </div>
    </div>
  );
};
