import type { Meta, StoryObj } from '@storybook/react';
import { Table } from './Table';
import type { TableColumn } from './Table';
import { Badge } from '../../3-primitives/Badge';
import { Avatar } from '../Avatar';
import { Button } from '../../3-primitives/Button';
import { Icon } from '../../3-primitives/Icon';
import { useState } from 'react';

const meta = {
  title: 'Ink Design System/Table',
  component: Table,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Comprehensive data table component with sorting, selection, and responsive features.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data
const sampleUsers = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'Admin', status: 'active', lastLogin: '2024-03-15' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Editor', status: 'active', lastLogin: '2024-03-14' },
  { id: 3, name: 'Bob Johnson', email: 'bob.johnson@example.com', role: 'Viewer', status: 'inactive', lastLogin: '2024-03-01' },
  { id: 4, name: 'Alice Brown', email: 'alice.brown@example.com', role: 'Editor', status: 'active', lastLogin: '2024-03-15' },
  { id: 5, name: 'Charlie Davis', email: 'charlie.davis@example.com', role: 'Admin', status: 'pending', lastLogin: '2024-02-28' },
];

const basicColumns: TableColumn[] = [
  { key: 'name', header: 'Name' },
  { key: 'email', header: 'Email' },
  { key: 'role', header: 'Role' },
  { key: 'status', header: 'Status' },
];

// Basic Example
export const Default: Story = {
  args: {
    columns: basicColumns,
    data: sampleUsers,
  },
};

// With Custom Rendering
export const WithCustomRender: Story = {
  args: {
    columns: [
      {
        key: 'name',
        header: 'User',
        render: (value, row) => (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Avatar name={value} size="small" />
            <div>
              <div>{value}</div>
              <div style={{ fontSize: '12px', color: 'var(--ink-neutral-60)' }}>{row.email}</div>
            </div>
          </div>
        ),
      },
      { key: 'role', header: 'Role', align: 'center' },
      {
        key: 'status',
        header: 'Status',
        align: 'center',
        render: (value) => {
          const variant = value === 'active' ? 'success' : value === 'pending' ? 'warning' : 'neutral';
          return <Badge variant={variant}>{value}</Badge>;
        },
      },
      {
        key: 'actions',
        header: 'Actions',
        align: 'center',
        render: () => (
          <div style={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
            <Button size="small" kind="tertiary">Edit</Button>
            <Button size="small" kind="tertiary">Delete</Button>
          </div>
        ),
      },
    ],
    data: sampleUsers,
  },
};

// With Sorting
export const WithSorting: Story = {
  render: () => {
    const [sortColumn, setSortColumn] = useState<string | undefined>();
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null);

    const columns: TableColumn[] = [
      { key: 'name', header: 'Name', sortable: true },
      { key: 'email', header: 'Email', sortable: true },
      { key: 'role', header: 'Role', sortable: true },
      {
        key: 'status',
        header: 'Status',
        sortable: true,
        render: (value) => {
          const variant = value === 'active' ? 'success' : value === 'pending' ? 'warning' : 'neutral';
          return <Badge variant={variant}>{value}</Badge>;
        },
      },
      { key: 'lastLogin', header: 'Last Login', sortable: true },
    ];

    return (
      <Table
        columns={columns}
        data={sampleUsers}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        onSortChange={(col, dir) => {
          setSortColumn(col);
          setSortDirection(dir);
        }}
      />
    );
  },
};

// With Selection
export const WithSelection: Story = {
  render: () => {
    const [selectedRows, setSelectedRows] = useState<Set<string | number>>(new Set());

    return (
      <div>
        <div style={{ marginBottom: '16px' }}>
          Selected: {selectedRows.size} row(s)
        </div>
        <Table
          columns={basicColumns}
          data={sampleUsers}
          selectable
          selectedRows={selectedRows}
          onSelectionChange={setSelectedRows}
          getRowKey={(row) => row.id}
        />
      </div>
    );
  },
};

// Clickable Rows
export const ClickableRows: Story = {
  render: () => {
    const [clickedRow, setClickedRow] = useState<any>(null);

    return (
      <div>
        <div style={{ marginBottom: '16px' }}>
          {clickedRow ? `Clicked: ${clickedRow.name}` : 'Click a row'}
        </div>
        <Table
          columns={basicColumns}
          data={sampleUsers}
          hoverable
          onRowClick={(row) => setClickedRow(row)}
        />
      </div>
    );
  },
};

// Variants
export const Bordered: Story = {
  args: {
    columns: basicColumns,
    data: sampleUsers,
    variant: 'bordered',
  },
};

export const Striped: Story = {
  args: {
    columns: basicColumns,
    data: sampleUsers,
    variant: 'striped',
  },
};

// Sizes
export const SmallSize: Story = {
  args: {
    columns: basicColumns,
    data: sampleUsers,
    size: 'small',
  },
};

export const LargeSize: Story = {
  args: {
    columns: basicColumns,
    data: sampleUsers,
    size: 'large',
  },
};

// Sticky Header with Scrolling
export const StickyHeader: Story = {
  args: {
    columns: basicColumns,
    data: [...sampleUsers, ...sampleUsers, ...sampleUsers],
    stickyHeader: true,
    maxHeight: '400px',
  },
};

// Empty State
export const EmptyState: Story = {
  args: {
    columns: basicColumns,
    data: [],
    emptyMessage: 'No users found. Try adjusting your filters or add a new user.',
  },
};

// Loading State
export const Loading: Story = {
  args: {
    columns: basicColumns,
    data: [],
    loading: true,
  },
};

// Complex Example - Document Management
export const DocumentManagement: Story = {
  name: 'Document Management Example',
  render: () => {
    const [selectedDocs, setSelectedDocs] = useState<Set<string | number>>(new Set());
    const [sortColumn, setSortColumn] = useState<string>('modified');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>('desc');

    const documents = [
      {
        id: 1,
        name: 'Q4 Financial Report.pdf',
        type: 'pdf',
        size: '2.4 MB',
        owner: 'John Doe',
        modified: '2024-03-15 14:30',
        status: 'completed',
        shared: 5,
      },
      {
        id: 2,
        name: 'Marketing Strategy 2024.pptx',
        type: 'presentation',
        size: '15.7 MB',
        owner: 'Jane Smith',
        modified: '2024-03-14 09:15',
        status: 'in_progress',
        shared: 12,
      },
      {
        id: 3,
        name: 'Employee Handbook.docx',
        type: 'document',
        size: '856 KB',
        owner: 'HR Department',
        modified: '2024-03-13 16:45',
        status: 'completed',
        shared: 45,
      },
      {
        id: 4,
        name: 'Product Roadmap.xlsx',
        type: 'spreadsheet',
        size: '3.2 MB',
        owner: 'Product Team',
        modified: '2024-03-12 11:00',
        status: 'draft',
        shared: 8,
      },
      {
        id: 5,
        name: 'Customer Survey Results.csv',
        type: 'data',
        size: '145 KB',
        owner: 'Analytics Team',
        modified: '2024-03-10 13:20',
        status: 'completed',
        shared: 3,
      },
    ];

    const getDocIcon = (type: string) => {
      const icons: Record<string, string> = {
        pdf: 'file',
        presentation: 'presentation',
        document: 'file-text',
        spreadsheet: 'table',
        data: 'database',
      };
      return icons[type] || 'file';
    };

    const columns: TableColumn[] = [
      {
        key: 'name',
        header: 'Name',
        sortable: true,
        render: (value, row) => (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Icon name={getDocIcon(row.type)} size="small" />
            <span>{value}</span>
          </div>
        ),
      },
      {
        key: 'size',
        header: 'Size',
        width: '100px',
        align: 'right',
      },
      {
        key: 'owner',
        header: 'Owner',
        width: '150px',
      },
      {
        key: 'modified',
        header: 'Modified',
        sortable: true,
        width: '160px',
      },
      {
        key: 'status',
        header: 'Status',
        sortable: true,
        width: '120px',
        align: 'center',
        render: (value) => {
          const variants: Record<string, any> = {
            completed: 'success',
            in_progress: 'warning',
            draft: 'neutral',
          };
          const labels: Record<string, string> = {
            completed: 'Completed',
            in_progress: 'In Progress',
            draft: 'Draft',
          };
          return <Badge variant={variants[value] || 'neutral'}>{labels[value] || value}</Badge>;
        },
      },
      {
        key: 'shared',
        header: 'Shared',
        sortable: true,
        width: '80px',
        align: 'center',
        render: (value) => (
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'center' }}>
            <Icon name="users" size="small" />
            <span>{value}</span>
          </div>
        ),
      },
      {
        key: 'actions',
        header: '',
        width: '50px',
        align: 'center',
        render: () => (
          <Button size="small" kind="tertiary">
            <Icon name="more-vertical" size="small" />
          </Button>
        ),
      },
    ];

    return (
      <div>
        <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            {selectedDocs.size > 0 && (
              <span>{selectedDocs.size} document(s) selected</span>
            )}
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {selectedDocs.size > 0 && (
              <>
                <Button size="small" kind="secondary">
                  <Icon name="download" size="small" /> Download
                </Button>
                <Button size="small" kind="danger">
                  <Icon name="trash-2" size="small" /> Delete
                </Button>
              </>
            )}
          </div>
        </div>
        <Table
          columns={columns}
          data={documents}
          variant="bordered"
          hoverable
          selectable
          selectedRows={selectedDocs}
          onSelectionChange={setSelectedDocs}
          getRowKey={(row) => row.id}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
          onSortChange={(col, dir) => {
            setSortColumn(col);
            setSortDirection(dir);
          }}
        />
      </div>
    );
  },
};