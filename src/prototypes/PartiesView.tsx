import { useState, useMemo } from 'react';
import {
  Card,
  Heading,
  Badge,
  IconButton,
  Stack,
  Container,
  Tabs,
  SearchInput,
  Table,
  Pagination,
  Text,
  Icon,
  DocuSignShell,
  Spacer,
} from '@/design-system';

/**
 * PartiesView Prototype
 *
 * A page to view all parties with tabbed navigation (All, Recent, Starred).
 * Features:
 * - Tabs (Layer 4) for filtering views
 * - SearchInput (Layer 4) for searching parties
 * - Table (Layer 4) for displaying party data
 * - Pagination (Layer 4) for navigating pages
 * - IconButton (Layer 3) for star/unstar action
 * - Badge (Layer 3) for role labels and tab counts
 */

// Types
interface Party {
  id: string;
  name: string;
  email: string;
  role: 'Vendor' | 'Customer' | 'Partner' | 'Contractor';
  activeAgreements: number;
  expiringAgreements: number;
  starred: boolean;
  lastActivity: Date;
}

// Mock data
const mockParties: Party[] = [
  {
    id: '1',
    name: 'Acme Corporation',
    email: 'contact@acmecorp.com',
    role: 'Vendor',
    activeAgreements: 12,
    expiringAgreements: 2,
    starred: false,
    lastActivity: new Date('2024-01-05'),
  },
  {
    id: '2',
    name: 'TechStart Inc',
    email: 'hello@techstart.io',
    role: 'Customer',
    activeAgreements: 8,
    expiringAgreements: 0,
    starred: true,
    lastActivity: new Date('2024-01-06'),
  },
  {
    id: '3',
    name: 'Global Partners Ltd',
    email: 'partners@globalpartners.com',
    role: 'Partner',
    activeAgreements: 24,
    expiringAgreements: 5,
    starred: false,
    lastActivity: new Date('2024-01-04'),
  },
  {
    id: '4',
    name: 'DataFlow Solutions',
    email: 'info@dataflow.dev',
    role: 'Vendor',
    activeAgreements: 3,
    expiringAgreements: 1,
    starred: true,
    lastActivity: new Date('2024-01-06'),
  },
  {
    id: '5',
    name: 'CloudBase Systems',
    email: 'support@cloudbase.io',
    role: 'Customer',
    activeAgreements: 15,
    expiringAgreements: 3,
    starred: false,
    lastActivity: new Date('2024-01-03'),
  },
  {
    id: '6',
    name: 'Innovation Labs',
    email: 'team@innovationlabs.co',
    role: 'Partner',
    activeAgreements: 7,
    expiringAgreements: 0,
    starred: true,
    lastActivity: new Date('2024-01-06'),
  },
  {
    id: '7',
    name: 'SecureNet Corp',
    email: 'security@securenet.com',
    role: 'Contractor',
    activeAgreements: 4,
    expiringAgreements: 1,
    starred: false,
    lastActivity: new Date('2024-01-02'),
  },
  {
    id: '8',
    name: 'Nexus Technologies',
    email: 'hello@nexustech.com',
    role: 'Vendor',
    activeAgreements: 19,
    expiringAgreements: 4,
    starred: false,
    lastActivity: new Date('2024-01-01'),
  },
  {
    id: '9',
    name: 'Summit Enterprises',
    email: 'contact@summit-ent.com',
    role: 'Customer',
    activeAgreements: 6,
    expiringAgreements: 2,
    starred: true,
    lastActivity: new Date('2024-01-05'),
  },
  {
    id: '10',
    name: 'Bridge Consulting',
    email: 'inquiries@bridgeconsulting.com',
    role: 'Contractor',
    activeAgreements: 2,
    expiringAgreements: 0,
    starred: false,
    lastActivity: new Date('2023-12-28'),
  },
];

// Role badge variant mapping
const roleBadgeVariant: Record<Party['role'], 'info' | 'success' | 'warning' | 'neutral'> = {
  Vendor: 'info',
  Customer: 'success',
  Partner: 'warning',
  Contractor: 'neutral',
};

// Items per page
const ITEMS_PER_PAGE = 5;

export function PartiesView() {
  // State
  const [parties, setParties] = useState<Party[]>(mockParties);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Toggle star status
  const handleToggleStar = (partyId: string) => {
    setParties((prev) =>
      prev.map((party) => (party.id === partyId ? { ...party, starred: !party.starred } : party))
    );
  };

  // Filter parties based on tab and search
  const filteredParties = useMemo(() => {
    let result = [...parties];

    // Filter by tab
    if (activeTab === 'recent') {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      result = result.filter((p) => p.lastActivity >= oneWeekAgo);
    } else if (activeTab === 'starred') {
      result = result.filter((p) => p.starred);
    }

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.email.toLowerCase().includes(query) ||
          p.role.toLowerCase().includes(query)
      );
    }

    return result;
  }, [parties, activeTab, searchQuery]);

  // Paginated parties
  const paginatedParties = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredParties.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredParties, currentPage]);

  // Total pages
  const totalPages = Math.ceil(filteredParties.length / ITEMS_PER_PAGE);

  // Tab counts
  const counts = useMemo(() => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    return {
      all: parties.length,
      recent: parties.filter((p) => p.lastActivity >= oneWeekAgo).length,
      starred: parties.filter((p) => p.starred).length,
    };
  }, [parties]);

  // Reset to page 1 when filters change
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  // Table columns - using 'header' not 'label'
  const columns = [
    {
      key: 'name',
      header: 'Party Name',
      sortable: true,
    },
    {
      key: 'email',
      header: 'Email',
      sortable: true,
      cell: (row: Party) => (
        <Text variant="body" color="secondary">
          {row.email}
        </Text>
      ),
    },
    {
      key: 'role',
      header: 'Role',
      cell: (row: Party) => (
        <Badge variant={roleBadgeVariant[row.role]} size="small">
          {row.role}
        </Badge>
      ),
    },
    {
      key: 'activeAgreements',
      header: 'Active',
      sortable: true,
      cell: (row: Party) => <Text variant="body">{row.activeAgreements}</Text>,
    },
    {
      key: 'expiringAgreements',
      header: 'Expiring',
      sortable: true,
      cell: (row: Party) => (
        <Stack direction="horizontal" gap="small" align="center">
          <Text variant="body">{row.expiringAgreements}</Text>
          {row.expiringAgreements > 0 && <Icon name="status-warn" size="small" />}
        </Stack>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      cell: (row: Party) => (
        <Stack direction="horizontal" gap="small">
          <IconButton
            icon={row.starred ? 'star-filled' : 'star'}
            size="small"
            variant="tertiary"
            onClick={() => handleToggleStar(row.id)}
            aria-label={row.starred ? 'Remove from starred' : 'Add to starred'}
          />
          <IconButton
            icon="more-vertical"
            size="small"
            variant="tertiary"
            aria-label="More actions"
          />
        </Stack>
      ),
    },
  ];

  // Table content component (shared across tabs)
  const TableContent = () => (
    <Stack gap="medium">
      {/* Search */}
      <SearchInput
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search parties..."
        clearable
      />

      {/* Table */}
      <Card>
        <Table
          columns={columns}
          data={paginatedParties}
          hoverable
          emptyMessage="No parties found"
          getRowKey={(row) => row.id}
        />
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </Stack>
  );

  // Tab definitions - Tabs component expects id, label (string), and content
  const tabs = [
    {
      id: 'all',
      label: `All (${counts.all})`,
      content: <TableContent />,
    },
    {
      id: 'recent',
      label: `Recent (${counts.recent})`,
      content: <TableContent />,
    },
    {
      id: 'starred',
      label: `Starred (${counts.starred})`,
      content: <TableContent />,
    },
  ];

  return (
    <DocuSignShell
      globalNav={{
        logo: <Text weight="semibold">PartyManager</Text>,
        navItems: [
          { label: 'Home', href: '/' },
          { label: 'Agreements', href: '/agreements' },
          { label: 'Parties', href: '/prototypes/parties-view', active: true },
        ],
        userMenu: { name: 'Demo User' },
      }}
    >
      <Container size="large" padded>
        <Spacer size="large" />
        <Stack gap="large">
          {/* Page Header */}
          <Heading level={1}>Parties</Heading>

          {/* Tabs with content */}
          <Tabs tabs={tabs} value={activeTab} onChange={handleTabChange} />
        </Stack>
      </Container>
    </DocuSignShell>
  );
}

export default PartiesView;
