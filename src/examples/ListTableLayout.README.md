# Layout Templates

Reusable layout patterns built with the Ink Design System components.

## ListTableLayout

A comprehensive layout for displaying data in table format with search, filters, pagination, and bulk actions.

### Features

- **Search**: Full-text search across all data fields
- **Filters**: Multiple filter dropdowns
- **Bulk Actions**: Select multiple rows and perform actions
- **Pagination**: Navigate through large datasets
- **Empty States**: Customizable empty state with call-to-action
- **Loading & Error States**: Built-in loading and error handling
- **Sorting**: Sortable columns
- **Responsive**: Adapts to different screen sizes

### Basic Usage

```tsx
import { ListTableLayout } from '@/layouts';
import type { TableColumn } from '@/design-system';

interface MyData {
  id: string;
  name: string;
  status: string;
}

const columns: TableColumn<MyData>[] = [
  {
    key: 'name',
    header: 'Name',
    cell: (row) => <Text>{row.name}</Text>,
    sortable: true,
  },
  {
    key: 'status',
    header: 'Status',
    cell: (row) => <Badge>{row.status}</Badge>,
  },
];

const data: MyData[] = [
  { id: '1', name: 'Item 1', status: 'Active' },
  { id: '2', name: 'Item 2', status: 'Pending' },
];

function MyListPage() {
  return (
    <ListTableLayout
      title="My Items"
      subtitle="Manage all your items"
      columns={columns}
      data={data}
      primaryAction={{
        label: 'Create Item',
        onClick: () => console.log('Create clicked'),
      }}
    />
  );
}
```

### With Search and Filters

```tsx
<ListTableLayout
  title="Documents"
  columns={columns}
  data={data}
  searchable
  searchPlaceholder="Search documents..."
  filterable
  filters={[
    {
      label: 'Status',
      value: statusFilter,
      options: [
        { label: 'All', value: 'all' },
        { label: 'Active', value: 'active' },
        { label: 'Pending', value: 'pending' },
      ],
      onChange: setStatusFilter,
    },
  ]}
/>
```

### With Bulk Actions

```tsx
<ListTableLayout
  title="Users"
  columns={columns}
  data={data}
  bulkActions
  bulkActionOptions={[
    { label: 'Delete Selected', value: 'delete' },
    { label: 'Export Selected', value: 'export' },
  ]}
/>
```

### With Pagination

```tsx
<ListTableLayout
  title="Documents"
  columns={columns}
  data={data}
  paginated
  itemsPerPage={25}
  showItemsPerPageSelector
/>
```

### With Empty State

```tsx
<ListTableLayout
  title="Documents"
  columns={columns}
  data={[]}
  emptyState={{
    title: 'No documents found',
    description: 'Get started by creating your first document',
    action: {
      label: 'Create Document',
      onClick: () => console.log('Create clicked'),
    },
  }}
/>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | required | Page title |
| `subtitle` | `string` | - | Optional subtitle/description |
| `columns` | `TableColumn<T>[]` | required | Table column configuration |
| `data` | `T[]` | required | Table data array |
| `searchable` | `boolean` | `true` | Enable search functionality |
| `searchPlaceholder` | `string` | `"Search..."` | Search input placeholder |
| `filterable` | `boolean` | `false` | Enable filtering |
| `filters` | `FilterConfig[]` | `[]` | Filter dropdown configurations |
| `bulkActions` | `boolean` | `false` | Enable bulk actions |
| `bulkActionOptions` | `ActionOption[]` | `[]` | Bulk action menu options |
| `paginated` | `boolean` | `true` | Enable pagination |
| `itemsPerPage` | `number` | `10` | Items per page |
| `showItemsPerPageSelector` | `boolean` | `true` | Show items per page dropdown |
| `primaryAction` | `ActionConfig` | - | Primary action button |
| `secondaryActions` | `ActionConfig[]` | `[]` | Secondary action buttons |
| `emptyState` | `EmptyStateConfig` | - | Empty state configuration |
| `loading` | `boolean` | `false` | Loading state |
| `error` | `string` | - | Error message |

## View Demo

Navigate to `/layouts` to see live examples and variations of the ListTableLayout.

## Future Layouts

Coming soon:
- Dashboard Layout
- Form Layout
- Detail/Settings Page
- Modal Patterns
