import React, { useState, useMemo, useCallback } from 'react';
import {
  Stack,
  Badge,
  Text,
  DocuSignShell,
  AgreementTableView,
  PageHeader,
  FilterBar,
  DataTable,
  DataTableColumn,
  DataTableAction,
  DataTablePaginationConfig,
  PageSizeOption,
  dataTableStyles,
  Banner,
  IrisIcon,
  Dropdown,
  Button,
  IconButton,
  Icon,
  ComboButton,
  AIIcon,
  Link,
} from '@/design-system';
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

const shellFeatures = [
  'GlobalNav always present',
  'LocalNav optional',
  'Sticky header',
  'Scrollable content',
  'Full-height layout',
  'Composes Layer 5 patterns',
];

const docuSignLogo = (
  <img src={DocuSignLogo} alt="DocuSign" style={{ height: '24px', width: 'auto' }} />
);

export const LayoutsShowcase: React.FC<LayoutsShowcaseProps> = ({ activeSubpage }) => {
  const [agreementsActive, setAgreementsActive] = useState('all-agreements');
  const [agreementsToggle, setAgreementsToggle] = useState(true);
  const [agreementsLocked, setAgreementsLocked] = useState(true);

  const agreementsSections = [
    {
      id: 'main',
      items: [
        {
          id: 'all-agreements',
          label: 'All Agreements',
          icon: 'envelope' as const,
          active: agreementsActive === 'all-agreements',
          onClick: () => setAgreementsActive('all-agreements'),
        },
        {
          id: 'drafts',
          label: 'Drafts',
          nested: true,
          active: agreementsActive === 'drafts',
          onClick: () => setAgreementsActive('drafts'),
        },
        {
          id: 'in-progress',
          label: 'In Progress',
          nested: true,
          active: agreementsActive === 'in-progress',
          onClick: () => setAgreementsActive('in-progress'),
        },
        {
          id: 'completed',
          label: 'Completed',
          nested: true,
          active: agreementsActive === 'completed',
          onClick: () => setAgreementsActive('completed'),
        },
        {
          id: 'deleted',
          label: 'Deleted',
          nested: true,
          active: agreementsActive === 'deleted',
          onClick: () => setAgreementsActive('deleted'),
        },
      ],
    },
    {
      id: 'folders',
      items: [
        {
          id: 'folders',
          label: 'Folders',
          icon: 'folder' as const,
          hasMenu: true,
          active: agreementsActive === 'folders',
          onClick: () => setAgreementsActive('folders'),
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
          icon: 'building-person' as const,
          badge: 'New',
          active: agreementsActive === 'parties',
          onClick: () => setAgreementsActive('parties'),
        },
        {
          id: 'requests',
          label: 'Requests',
          icon: 'ticket' as const,
          badge: 'New',
          active: agreementsActive === 'requests',
          onClick: () => setAgreementsActive('requests'),
        },
        {
          id: 'maestro-workflows',
          label: 'Maestro Workflows',
          icon: 'workflow' as const,
          badge: 'New',
          active: agreementsActive === 'maestro-workflows',
          onClick: () => setAgreementsActive('maestro-workflows'),
        },
        {
          id: 'workspaces',
          label: 'Workspaces',
          icon: 'transaction' as const,
          active: agreementsActive === 'workspaces',
          onClick: () => setAgreementsActive('workspaces'),
        },
        {
          id: 'powerforms',
          label: 'PowerForms',
          icon: 'flash' as const,
          active: agreementsActive === 'powerforms',
          onClick: () => setAgreementsActive('powerforms'),
        },
        {
          id: 'bulk-send',
          label: 'Bulk Send',
          icon: 'document-stack' as const,
          active: agreementsActive === 'bulk-send',
          onClick: () => setAgreementsActive('bulk-send'),
        },
      ],
    },
  ];

  // Demo data for AgreementTableView - Full production-style data
  interface Agreement {
    id: string;
    agreementId: string;
    fileName: string;
    fileStatus: 'uploaded' | 'completed' | 'pending';
    fileStatusDetail: string;
    parties: string[];
    status: 'active' | 'inactive' | 'expired';
    statusDate?: string;
    agreementType: string;
    contractValue?: string;
    effectiveDate?: string;
    expirationDate?: string;
    isAIAssisted?: boolean;
  }

  const demoAgreements: Agreement[] = [
    {
      id: '1',
      agreementId: 'a1868ad8-11c6-4656-a078-0af9ade15b50',
      fileName: '01_people_ai_guidebook.pdf',
      fileStatus: 'uploaded',
      fileStatusDetail: 'View Job',
      parties: [],
      status: 'inactive',
      agreementType: 'Handbook',
      isAIAssisted: true,
    },
    {
      id: '2',
      agreementId: '7f233bd9-4bec-41a0-aab5-7774c2d167a1',
      fileName: 'Restricted Access Request Form 1726...',
      fileStatus: 'completed',
      fileStatusDetail: 'Please DocuSign this...',
      parties: ['Akshat Mishra', '+2 More'],
      status: 'active',
      agreementType: 'Form',
      effectiveDate: '5/20/2025',
      isAIAssisted: true,
    },
    {
      id: '3',
      agreementId: 'd11088ef-d726-4fd7-8d89-220fc14bdf5f',
      fileName: 'Offer Letter 1.pdf',
      fileStatus: 'uploaded',
      fileStatusDetail: 'View Job',
      parties: ['KENNETH L. HARRIS', 'UNIVERSAL BIOENERGY INC'],
      status: 'inactive',
      statusDate: 'Expired 3/31/2016',
      agreementType: 'Offer Letter',
      contractValue: '$27,600.00 USD',
      effectiveDate: '3/26/2015',
      expirationDate: '3/31/2016',
      isAIAssisted: false,
    },
    {
      id: '4',
      agreementId: 'ba0feac4-5d33-429c-9cdc-d9198121428b',
      fileName: '1100.L0005-US01 - Inventor-approved...',
      fileStatus: 'completed',
      fileStatusDetail: '[SIGNATURE REQUIRE...',
      parties: [],
      status: 'inactive',
      agreementType: 'Miscellaneous',
      isAIAssisted: true,
    },
    {
      id: '5',
      agreementId: '100b0b4e-7756-46d2-aaa5-593984a3e3f1',
      fileName: '1100.L0005-US01 - Inventor-approved...',
      fileStatus: 'completed',
      fileStatusDetail: '[SIGNATURE REQUIRE...',
      parties: [],
      status: 'inactive',
      agreementType: 'Form',
      isAIAssisted: true,
    },
    {
      id: '6',
      agreementId: 'af0ffe1e-ccb5-422e-b68b-0a3beef6330c',
      fileName: '1100.L0005-US01 Combined Declaration...',
      fileStatus: 'completed',
      fileStatusDetail: '[SIGNATURE REQUIRE...',
      parties: ['INVENTOR', 'Docusign, Inc.'],
      status: 'active',
      agreementType: 'Miscellaneous',
      effectiveDate: '2/4/2025',
      isAIAssisted: false,
    },
  ];

  const [showBanner, setShowBanner] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [selectedRows, setSelectedRows] = useState<Set<string | number>>(new Set());
  const [sortColumn, setSortColumn] = useState<string | undefined>('fileName');
  const [sortDirection, setSortDirection] = useState<'ascending' | 'descending' | null>('ascending');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<PageSizeOption>(25);

  const capitalize = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1);

  const demoColumns: DataTableColumn<Agreement>[] = useMemo(
    () => [
      {
        key: 'aiAssisted',
        header: '',
        width: '40px',
        sticky: true,
        cell: (row) =>
          row.isAIAssisted ? (
            <span className={dataTableStyles.aiSparkle}>
              <AIIcon name="ai-spark-filled" size={14} />
            </span>
          ) : null,
      },
      {
        key: 'fileName',
        header: 'File Name',
        sortable: true,
        width: '280px',
        sticky: true,
        className: dataTableStyles.columnBorderRight,
        cell: (row) => (
          <div className={dataTableStyles.cellContent}>
            <Link discrete size="small" href="#" className={dataTableStyles.cellPrimary}>
              {row.fileName}
            </Link>
            <span className={dataTableStyles.cellSecondary}>
              {row.fileStatus === 'uploaded' ? '↑' : '✓'}{' '}
              {row.fileStatus === 'uploaded' ? 'Uploaded: ' : 'Completed envelope: '}
              <Link kind="subtle" size="xs" href="#">
                {row.fileStatusDetail}
              </Link>
            </span>
          </div>
        ),
      },
      {
        key: 'parties',
        header: 'Parties',
        width: '180px',
        cell: (row) => (
          <div className={dataTableStyles.cellContent}>
            {row.parties.length > 0 ? (
              row.parties.map((party, i) => {
                const isMoreLink = party.startsWith('+');
                if (isMoreLink) {
                  return (
                    <a key={i} href="#" className={dataTableStyles.partyMoreLink}>
                      {party}
                    </a>
                  );
                }
                return (
                  <span key={i} className={dataTableStyles.partyChip}>
                    <a href="#" className={dataTableStyles.partyLink}>
                      {party}
                    </a>
                  </span>
                );
              })
            ) : (
              <span className={dataTableStyles.cellSecondary}>—</span>
            )}
          </div>
        ),
      },
      {
        key: 'status',
        header: 'Status',
        sortable: true,
        width: '120px',
        cell: (row) => (
          <div className={dataTableStyles.statusCell}>
            <span className={dataTableStyles.statusDot} data-status={row.status} />
            <div className={dataTableStyles.statusText}>
              <span className={dataTableStyles.statusLabel}>
                {row.status === 'expired' ? 'Inactive' : capitalize(row.status)}
              </span>
              {row.statusDate && (
                <span className={dataTableStyles.statusDate}>{row.statusDate}</span>
              )}
            </div>
          </div>
        ),
      },
      {
        key: 'agreementType',
        header: 'Agreement Type',
        sortable: true,
        width: '140px',
      },
      {
        key: 'contractValue',
        header: 'Total Contract Value',
        sortable: true,
        width: '160px',
        alignment: 'right',
        cell: (row) => row.contractValue || '—',
      },
      {
        key: 'effectiveDate',
        header: 'Effective Date',
        sortable: true,
        width: '130px',
        cell: (row) => row.effectiveDate || '—',
      },
      {
        key: 'expirationDate',
        header: 'Expiration Date',
        sortable: true,
        width: '140px',
        cell: (row) => row.expirationDate || '—',
      },
      {
        key: 'agreementId',
        header: 'Agreement ID',
        width: '140px',
        cell: (row) => <span className={dataTableStyles.agreementId}>{row.agreementId}</span>,
      },
    ],
    []
  );

  const renderRowActions = useCallback(
    () => (
      <IconButton
        icon="more-vertical"
        variant="tertiary"
        size="medium"
        onClick={(e) => {
          e.stopPropagation();
        }}
      />
    ),
    []
  );

  const selectionActions: DataTableAction[] = useMemo(
    () => [
      { id: 'download', label: 'Download', icon: 'download', onClick: () => {} },
      { id: 'delete', label: 'Delete', icon: 'trash', variant: 'danger', onClick: () => {} },
    ],
    []
  );

  const demoPagination: DataTablePaginationConfig = useMemo(
    () => ({
      page,
      pageSize,
      totalItems: 38,
      onPageChange: setPage,
      onPageSizeChange: (size) => {
        setPageSize(size);
        setPage(1);
      },
      showInfo: true,
    }),
    [page, pageSize]
  );

  const handleSortChange = useCallback(
    (column: string, direction: 'ascending' | 'descending' | null) => {
      setSortColumn(direction ? column : undefined);
      setSortDirection(direction);
    },
    []
  );

  const agreementTableFeatures = [
    'PageHeader slot',
    'Optional Banner slot',
    'FilterBar slot',
    'DataTable content',
    'Configurable padding',
    'Composes Layer 5 patterns',
  ];

  if (activeSubpage === 'agreement-table-view') {
    return (
      <div className={styles.tokenPage}>
        {/* Full Demo */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>AgreementTableView (Full Demo)</h3>
          </div>
          <Text size="small" color="secondary" style={{ margin: '0 12px 8px' }}>
            Complete table-based list page layout for Navigator-style pages.
          </Text>
          <div className={styles.layoutPreviewContainer}>
            <DocuSignShell
              globalNav={{
                logo: docuSignLogo,
                navItems: globalNavItems,
                showSearch: true,
                user: { name: 'John Doe' },
              }}
              localNav={{
                headerLabel: 'Start',
                headerIcon: 'plus',
                sections: agreementsSections,
                activeItemId: agreementsActive,
                isLocked: agreementsLocked,
                onLockChange: setAgreementsLocked,
              }}
            >
              <AgreementTableView
                pageHeader={
                  <PageHeader
                    title="Completed"
                    showAIBadge
                    aiBadgeText="AI-Assisted"
                    actions={
                      <>
                        <ComboButton
                          variant="secondary"
                          size="medium"
                          startIcon="plus"
                          onClick={() => {}}
                          onDropdownClick={() => {}}
                        >
                          New
                        </ComboButton>
                      </>
                    }
                  />
                }
                banner={
                  showBanner ? (
                    <Banner
                      kind="promo"
                      customIcon={<IrisIcon />}
                      closable
                      onClose={() => setShowBanner(false)}
                    >
                      <strong>0 agreements</strong> with renewal notice dates in the next 30 days.
                    </Banner>
                  ) : undefined
                }
                filterBar={
                  <FilterBar
                    viewSelector={
                      <Dropdown
                        items={[
                          { label: 'Documents', onClick: () => {} },
                          { label: 'Envelopes', onClick: () => {} },
                        ]}
                      >
                        <Button
                          kind="secondary"
                          size="small"
                          endElement={<Icon name="chevron-down" size="small" />}
                        >
                          Documents
                        </Button>
                      </Dropdown>
                    }
                    search={{
                      value: searchValue,
                      onChange: setSearchValue,
                      placeholder: 'Search agreements...',
                    }}
                    filters={
                      <Button
                        kind="secondary"
                        size="small"
                        startElement={<Icon name="filter" size="small" />}
                      >
                        Filters
                      </Button>
                    }
                  />
                }
              >
                <DataTable
                  columns={demoColumns}
                  data={demoAgreements}
                  getRowKey={(row) => row.id}
                  selectable
                  selectedRows={selectedRows}
                  onSelectionChange={setSelectedRows}
                  sortColumn={sortColumn}
                  sortDirection={sortDirection}
                  onSortChange={handleSortChange}
                  selectionActions={selectionActions}
                  pagination={demoPagination}
                  showColumnControl
                  renderRowActions={renderRowActions}
                  rowHeight="tall"
                  stickyHeader
                />
              </AgreementTableView>
            </DocuSignShell>
          </div>
        </div>

        {/* Padding Variants */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Padding Variants</h3>
          </div>
          <div className={styles.demoRow}>
            <Badge variant="info">default</Badge>
            <span className={styles.demoDesc}>80px horizontal padding (standard Navigator)</span>
          </div>
          <div className={styles.demoRow}>
            <Badge variant="neutral">compact</Badge>
            <span className={styles.demoDesc}>32px horizontal padding (narrower screens)</span>
          </div>
        </div>

        {/* API */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>API</h3>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>pageHeader</span>
            <span className={styles.demoDesc}>PageHeader component (required)</span>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>banner</span>
            <span className={styles.demoDesc}>Optional Banner for alerts/promos</span>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>filterBar</span>
            <span className={styles.demoDesc}>FilterBar with search and filters (required)</span>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>children</span>
            <span className={styles.demoDesc}>DataTable or other content (required)</span>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>paddingVariant</span>
            <span className={styles.demoDesc}>&apos;default&apos; | &apos;compact&apos;</span>
          </div>
        </div>

        {/* Key Features */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Key Features</h3>
          </div>
          <div className={styles.demoGrid}>
            {agreementTableFeatures.map((feature) => (
              <Badge key={feature} variant="neutral">
                {feature}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    );
  }

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
          <div className={styles.layoutPreviewContainer}>
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
                isLocked: agreementsLocked,
                onLockChange: setAgreementsLocked,
                footerToggle: {
                  label: 'New navigation',
                  checked: agreementsToggle,
                  onChange: setAgreementsToggle,
                },
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
          <div
            className={styles.layoutPreviewContainer}
            style={{ height: 'var(--showcase-preview-height-medium)' }}
          >
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
            <span className={styles.demoDesc}>
              Shell without sidebar - useful for settings pages
            </span>
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
              <Badge key={feature} variant="neutral">
                {feature}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
};
