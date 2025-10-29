import React, { useState } from 'react';
import {
  Stack,
  Card,
  Button,
  SearchInput,
  Select,
  FilterTag,
  Table,
  Pagination,
  Checkbox,
  Dropdown,
  Badge,
  StatusLight,
  Heading,
  Text,
  Divider,
} from '@/design-system';
import type { TableColumn } from '@/design-system';

export interface ListTableLayoutProps<T = any> {
  /** Page title */
  title: string;
  /** Optional subtitle/description */
  subtitle?: string;
  /** Table columns configuration */
  columns: TableColumn<T>[];
  /** Table data */
  data: T[];
  /** Enable search functionality */
  searchable?: boolean;
  /** Search placeholder text */
  searchPlaceholder?: string;
  /** Enable filtering */
  filterable?: boolean;
  /** Filter options */
  filters?: Array<{
    label: string;
    options: Array<{ label: string; value: string }>;
    value?: string;
    onChange?: (value: string) => void;
  }>;
  /** Enable bulk actions */
  bulkActions?: boolean;
  /** Bulk action options */
  bulkActionOptions?: Array<{ label: string; value: string; icon?: string }>;
  /** Enable pagination */
  paginated?: boolean;
  /** Items per page */
  itemsPerPage?: number;
  /** Show items per page selector */
  showItemsPerPageSelector?: boolean;
  /** Primary action button */
  primaryAction?: {
    label: string;
    onClick: () => void;
    icon?: string;
  };
  /** Secondary actions */
  secondaryActions?: Array<{
    label: string;
    onClick: () => void;
    icon?: string;
  }>;
  /** Empty state configuration */
  emptyState?: {
    title: string;
    description: string;
    action?: {
      label: string;
      onClick: () => void;
    };
  };
  /** Loading state */
  loading?: boolean;
  /** Error state */
  error?: string;
}

export const ListTableLayout = <T extends { id: string | number }>({
  title,
  subtitle,
  columns,
  data,
  searchable = true,
  searchPlaceholder = 'Search...',
  filterable = false,
  filters = [],
  bulkActions = false,
  bulkActionOptions = [],
  paginated = true,
  itemsPerPage: initialItemsPerPage = 10,
  showItemsPerPageSelector = true,
  primaryAction,
  secondaryActions = [],
  emptyState,
  loading = false,
  error,
}: ListTableLayoutProps<T>) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);
  const [selectedRows, setSelectedRows] = useState<Set<string | number>>(new Set());
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Filter data based on search
  const filteredData = searchQuery
    ? data.filter((row) =>
        Object.values(row).some((value) =>
          String(value).toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    : data;

  // Paginate data
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = paginated
    ? filteredData.slice(startIndex, startIndex + itemsPerPage)
    : filteredData;

  // Selection handlers
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(new Set(paginatedData.map((row) => row.id)));
    } else {
      setSelectedRows(new Set());
    }
  };

  const handleSelectRow = (id: string | number, checked: boolean) => {
    const newSelected = new Set(selectedRows);
    if (checked) {
      newSelected.add(id);
    } else {
      newSelected.delete(id);
    }
    setSelectedRows(newSelected);
  };

  const allSelected =
    paginatedData.length > 0 && paginatedData.every((row) => selectedRows.has(row.id));
  const someSelected = paginatedData.some((row) => selectedRows.has(row.id)) && !allSelected;

  // Enhanced columns with selection
  const enhancedColumns: TableColumn<T>[] = bulkActions
    ? [
        {
          key: '_select',
          header: (
            <Checkbox
              checked={allSelected}
              indeterminate={someSelected}
              onChange={(e) => handleSelectAll(e.target.checked)}
              aria-label="Select all rows"
            />
          ),
          cell: (row) => (
            <Checkbox
              checked={selectedRows.has(row.id)}
              onChange={(e) => handleSelectRow(row.id, e.target.checked)}
              aria-label={`Select row ${row.id}`}
            />
          ),
          width: '48px',
        },
        ...columns,
      ]
    : columns;

  // Render empty state
  if (!loading && !error && data.length === 0 && emptyState) {
    return (
      <Stack gap="large">
        <Stack direction="horizontal" justify="space-between" align="center">
          <div>
            <Heading level={2}>{title}</Heading>
            {subtitle && (
              <Text color="secondary" size="sm">
                {subtitle}
              </Text>
            )}
          </div>
        </Stack>

        <Card>
          <Card.Body>
            <Stack gap="large" align="center" style={{ padding: '48px 24px', textAlign: 'center' }}>
              <Stack gap="small" align="center">
                <Heading level={4}>{emptyState.title}</Heading>
                <Text color="secondary">{emptyState.description}</Text>
              </Stack>
              {emptyState.action && (
                <Button onClick={emptyState.action.onClick}>
                  {emptyState.action.label}
                </Button>
              )}
            </Stack>
          </Card.Body>
        </Card>
      </Stack>
    );
  }

  return (
    <Stack gap="large">
      {/* Header */}
      <Stack direction="horizontal" justify="space-between" align="center" wrap>
        <div>
          <Heading level={2}>{title}</Heading>
          {subtitle && (
            <Text color="secondary" size="sm">
              {subtitle}
            </Text>
          )}
        </div>

        <Stack direction="horizontal" gap="small">
          {secondaryActions.map((action, index) => (
            <Button
              key={index}
              kind="secondary"
              onClick={action.onClick}
            >
              {action.label}
            </Button>
          ))}
          {primaryAction && (
            <Button onClick={primaryAction.onClick}>
              {primaryAction.label}
            </Button>
          )}
        </Stack>
      </Stack>

      {/* Filters and Search Bar */}
      {(searchable || filterable || bulkActions) && (
        <Stack gap="medium">
              <Stack direction="horizontal" gap="medium" wrap align="center">
                {searchable && (
                  <div style={{ flex: 1, minWidth: '240px' }}>
                    <SearchInput
                      placeholder={searchPlaceholder}
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setCurrentPage(1);
                      }}
                      onClear={() => {
                        setSearchQuery('');
                        setCurrentPage(1);
                      }}
                    />
                  </div>
                )}

                {filterable && filters.length > 0 && (
                  <Stack direction="horizontal" gap="small" wrap>
                    {filters.map((filter, index) => {
                      const isActive = filter.value && filter.value !== 'all' && filter.value !== '';
                      const activeOption = filter.options.find(opt => opt.value === filter.value);

                      return (
                        <FilterTag
                          key={index}
                          label={isActive && activeOption ? `${filter.label}: ${activeOption.label}` : filter.label}
                          active={isActive}
                          onClick={() => {
                            // This would open a dropdown/modal to select filter
                            console.log('Open filter:', filter.label);
                          }}
                        />
                      );
                    })}
                  </Stack>
                )}
              </Stack>

              {/* Active Filters - Dismissible */}
              {filterable && filters.some(f => f.value && f.value !== 'all' && f.value !== '') && (
                <>
                  <Divider />
                  <Stack direction="horizontal" gap="small" wrap align="center">
                    <Text size="sm" weight="medium" color="secondary">
                      Active filters:
                    </Text>
                    {filters.map((filter, index) => {
                      const isActive = filter.value && filter.value !== 'all' && filter.value !== '';
                      if (!isActive) return null;

                      const activeOption = filter.options.find(opt => opt.value === filter.value);

                      return (
                        <FilterTag
                          key={`active-${index}`}
                          label={activeOption?.label || filter.value}
                          active
                          dismissible
                          showTrigger={false}
                          onDismiss={() => {
                            // Reset filter to first option (usually 'all')
                            filter.onChange?.(filter.options[0]?.value || '');
                          }}
                        />
                      );
                    })}
                  </Stack>
                </>
              )}

              {bulkActions && selectedRows.size > 0 && (
                <>
                  <Divider />
                  <Stack direction="horizontal" gap="medium" align="center">
                    <Text weight="medium">
                      {selectedRows.size} item{selectedRows.size !== 1 ? 's' : ''} selected
                    </Text>
                    {bulkActionOptions.length > 0 && (
                      <Dropdown
                        items={bulkActionOptions.map((option) => ({
                          label: option.label,
                          onClick: () => console.log('Bulk action:', option.value),
                        }))}
                        position="bottom-start"
                      >
                        <Button kind="secondary" size="small">
                          Actions
                        </Button>
                      </Dropdown>
                    )}
                    <Button
                      kind="tertiary"
                      size="small"
                      onClick={() => setSelectedRows(new Set())}
                    >
                      Clear selection
                    </Button>
                  </Stack>
                </>
              )}
        </Stack>
      )}

      {/* Error State */}
      {error && (
        <Card>
          <Card.Body>
            <Stack gap="small" align="center" style={{ padding: '24px', textAlign: 'center' }}>
              <Text color="error" weight="medium">
                {error}
              </Text>
            </Stack>
          </Card.Body>
        </Card>
      )}

      {/* Table */}
      {!error && (
        <Stack gap="medium">
          <Table
            columns={enhancedColumns}
            data={paginatedData}
            loading={loading}
          />

          {/* Pagination */}
          {paginated && !loading && filteredData.length > 0 && (
            <Stack direction="horizontal" justify="space-between" align="center" wrap>
              <Text color="secondary" size="sm">
                Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredData.length)} of{' '}
                {filteredData.length} results
              </Text>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                showItemsPerPage={showItemsPerPageSelector}
                itemsPerPage={itemsPerPage}
                onItemsPerPageChange={setItemsPerPage}
              />
            </Stack>
          )}
        </Stack>
      )}
    </Stack>
  );
};
