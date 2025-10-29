import React, { useState } from 'react';
import { ListTableLayout } from './ListTableExample';
import { Stack, Heading, Text, Tabs, Badge, StatusLight, Button, Icon } from '@/design-system';
import type { TableColumn } from '@/design-system';

// Sample data types
interface Document {
  id: string;
  name: string;
  status: 'signed' | 'pending' | 'draft' | 'expired';
  sender: string;
  recipients: number;
  created: string;
  updated: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  lastActive: string;
}

// Sample documents data
const documentsData: Document[] = [
  {
    id: '1',
    name: 'Sales Agreement Q4 2024',
    status: 'signed',
    sender: 'John Smith',
    recipients: 3,
    created: '2024-10-15',
    updated: '2024-10-20',
  },
  {
    id: '2',
    name: 'NDA - Partner Agreement',
    status: 'pending',
    sender: 'Sarah Johnson',
    recipients: 2,
    created: '2024-10-18',
    updated: '2024-10-18',
  },
  {
    id: '3',
    name: 'Employment Contract - Jane Doe',
    status: 'signed',
    sender: 'HR Department',
    recipients: 1,
    created: '2024-10-10',
    updated: '2024-10-12',
  },
  {
    id: '4',
    name: 'Consulting Services Agreement',
    status: 'draft',
    sender: 'Michael Brown',
    recipients: 4,
    created: '2024-10-22',
    updated: '2024-10-22',
  },
  {
    id: '5',
    name: 'License Agreement 2024',
    status: 'expired',
    sender: 'Legal Team',
    recipients: 5,
    created: '2024-08-01',
    updated: '2024-09-30',
  },
];

// Sample users data
const usersData: User[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice.johnson@company.com',
    role: 'Administrator',
    status: 'active',
    lastActive: '2 hours ago',
  },
  {
    id: '2',
    name: 'Bob Williams',
    email: 'bob.williams@company.com',
    role: 'Manager',
    status: 'active',
    lastActive: '1 day ago',
  },
  {
    id: '3',
    name: 'Carol Davis',
    email: 'carol.davis@company.com',
    role: 'User',
    status: 'inactive',
    lastActive: '2 weeks ago',
  },
  {
    id: '4',
    name: 'David Miller',
    email: 'david.miller@company.com',
    role: 'Manager',
    status: 'active',
    lastActive: '5 minutes ago',
  },
];

// Document columns
const documentColumns: TableColumn<Document>[] = [
  {
    key: 'name',
    header: 'Document Name',
    cell: (row) => <Text weight="medium">{row.name}</Text>,
    sortable: true,
  },
  {
    key: 'status',
    header: 'Status',
    cell: (row) => {
      const statusConfig = {
        signed: { kind: 'success' as const, label: 'Signed' },
        pending: { kind: 'warning' as const, label: 'Pending' },
        draft: { kind: 'neutral' as const, label: 'Draft' },
        expired: { kind: 'alert' as const, label: 'Expired' },
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
    key: 'recipients',
    header: 'Recipients',
    cell: (row) => <Badge>{row.recipients}</Badge>,
    align: 'center',
    width: '100px',
  },
  {
    key: 'created',
    header: 'Created',
    cell: (row) => <Text color="secondary" size="sm">{row.created}</Text>,
    sortable: true,
    width: '120px',
  },
  {
    key: 'updated',
    header: 'Last Updated',
    cell: (row) => <Text color="secondary" size="sm">{row.updated}</Text>,
    sortable: true,
    width: '120px',
  },
];

// User columns
const userColumns: TableColumn<User>[] = [
  {
    key: 'name',
    header: 'Name',
    cell: (row) => <Text weight="medium">{row.name}</Text>,
    sortable: true,
  },
  {
    key: 'email',
    header: 'Email',
    cell: (row) => <Text color="secondary">{row.email}</Text>,
    sortable: true,
  },
  {
    key: 'role',
    header: 'Role',
    cell: (row) => <Badge variant="neutral">{row.role}</Badge>,
    width: '120px',
  },
  {
    key: 'status',
    header: 'Status',
    cell: (row) => (
      <StatusLight kind={row.status === 'active' ? 'success' : 'neutral'} filled={false}>
        {row.status === 'active' ? 'Active' : 'Inactive'}
      </StatusLight>
    ),
    width: '120px',
  },
  {
    key: 'lastActive',
    header: 'Last Active',
    cell: (row) => <Text color="secondary" size="sm">{row.lastActive}</Text>,
    width: '140px',
  },
];

export const LayoutsDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState('documents');

  // Filter states for Documents tab
  const [docStatusFilter, setDocStatusFilter] = useState('pending');
  const [docDateFilter, setDocDateFilter] = useState('30d');

  // Filter states for Users tab
  const [userRoleFilter, setUserRoleFilter] = useState('manager');
  const [userStatusFilter, setUserStatusFilter] = useState('all');

  const tabItems = [
    {
      id: 'documents',
      label: 'Documents List',
      content: (
        <ListTableLayout<Document>
          title="Documents"
          subtitle="Manage and track all your documents"
          columns={documentColumns}
          data={documentsData}
          searchable
          searchPlaceholder="Search documents..."
          filterable
          filters={[
            {
              label: 'Status',
              value: docStatusFilter,
              options: [
                { label: 'All Statuses', value: 'all' },
                { label: 'Signed', value: 'signed' },
                { label: 'Pending', value: 'pending' },
                { label: 'Draft', value: 'draft' },
                { label: 'Expired', value: 'expired' },
              ],
              onChange: setDocStatusFilter,
            },
            {
              label: 'Date Range',
              value: docDateFilter,
              options: [
                { label: 'All Time', value: 'all' },
                { label: 'Last 7 days', value: '7d' },
                { label: 'Last 30 days', value: '30d' },
                { label: 'Last 90 days', value: '90d' },
              ],
              onChange: setDocDateFilter,
            },
          ]}
          bulkActions
          bulkActionOptions={[
            { label: 'Download Selected', value: 'download' },
            { label: 'Send Reminder', value: 'remind' },
            { label: 'Archive', value: 'archive' },
            { label: 'Delete', value: 'delete' },
          ]}
          paginated
          itemsPerPage={5}
          showItemsPerPageSelector
          primaryAction={{
            label: 'Create Document',
            onClick: () => alert('Create document clicked'),
          }}
          secondaryActions={[
            {
              label: 'Import',
              onClick: () => alert('Import clicked'),
            },
            {
              label: 'Export',
              onClick: () => alert('Export clicked'),
            },
          ]}
        />
      ),
    },
    {
      id: 'users',
      label: 'Users List',
      content: (
        <ListTableLayout<User>
          title="Team Members"
          subtitle="Manage users and their access permissions"
          columns={userColumns}
          data={usersData}
          searchable
          searchPlaceholder="Search users..."
          filterable
          filters={[
            {
              label: 'Role',
              value: userRoleFilter,
              options: [
                { label: 'All Roles', value: 'all' },
                { label: 'Administrator', value: 'admin' },
                { label: 'Manager', value: 'manager' },
                { label: 'User', value: 'user' },
              ],
              onChange: setUserRoleFilter,
            },
            {
              label: 'Status',
              value: userStatusFilter,
              options: [
                { label: 'All', value: 'all' },
                { label: 'Active', value: 'active' },
                { label: 'Inactive', value: 'inactive' },
              ],
              onChange: setUserStatusFilter,
            },
          ]}
          bulkActions
          bulkActionOptions={[
            { label: 'Change Role', value: 'role' },
            { label: 'Deactivate', value: 'deactivate' },
            { label: 'Send Message', value: 'message' },
          ]}
          paginated
          itemsPerPage={5}
          primaryAction={{
            label: 'Invite User',
            onClick: () => alert('Invite user clicked'),
          }}
          secondaryActions={[
            {
              label: 'Export CSV',
              onClick: () => alert('Export clicked'),
            },
          ]}
        />
      ),
    },
    {
      id: 'empty',
      label: 'Empty State',
      content: (
        <ListTableLayout<Document>
          title="Documents"
          subtitle="You don't have any documents yet"
          columns={documentColumns}
          data={[]}
          searchable={false}
          primaryAction={{
            label: 'Create Document',
            onClick: () => alert('Create document clicked'),
          }}
          emptyState={{
            title: 'No documents found',
            description: 'Get started by creating your first document',
            action: {
              label: 'Create Your First Document',
              onClick: () => alert('Create document clicked'),
            },
          }}
        />
      ),
    },
  ];

  return (
    <div style={{ padding: '32px', maxWidth: '1400px', margin: '0 auto' }}>
      <Stack gap="xlarge">
        <div>
          <Heading level={1}>Layout Templates</Heading>
          <Text color="secondary" size="lg">
            Reusable layout patterns built with Ink Design System components
          </Text>
        </div>

        <Tabs
          items={tabItems}
          activeTab={activeTab}
          onChange={setActiveTab}
        />
      </Stack>
    </div>
  );
};
