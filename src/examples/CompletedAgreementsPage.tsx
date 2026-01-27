import React, { useState } from 'react';
import {
  Stack,
  Inline,
  Heading,
  Text,
  Badge,
  Button,
  IconButton,
  Icon,
  Select,
  SearchInput,
  Table,
  Dropdown,
  Pagination,
  Alert,
  Link,
} from '@/design-system';

// Sample agreement data
const agreementsData = [
  {
    id: '1',
    fileName: '01_people_ai_guidebook.pdf',
    subtext: 'Uploaded: View Job',
    parties: '',
    status: 'Inactive',
    agreementType: 'Handbook',
  },
  {
    id: '2',
    fileName: 'Restricted Access Request Form 1 726 (4).docx',
    subtext: 'Completed envelope: Please Docusign this document...',
    parties: 'Akshat Mishra',
    partiesMore: '+2 More',
    status: 'Active',
    agreementType: 'Form',
  },
  {
    id: '3',
    fileName: 'Offer Letter 1.pdf',
    subtext: 'Uploaded: View Job',
    parties: 'KENNETH L. HARRIS',
    partiesOrg: 'UNIVERSAL BIOENERGY INC',
    status: 'Inactive',
    statusDate: 'Expired 3/31/2016',
    agreementType: 'Offer Letter',
  },
  {
    id: '4',
    fileName: '1100.L0005-US01 - Inventor-approved Application...',
    subtext: 'Completed envelope: [SIGNATURE REQUIRED BY 2/14/2025]...',
    parties: '',
    status: 'Inactive',
    agreementType: 'Miscellaneous',
  },
  {
    id: '5',
    fileName: '1100.L0005-US01 - Inventor-approved Application...',
    subtext: 'Completed envelope: [SIGNATURE REQUIRED BY 2/14/2025]...',
    parties: '',
    status: 'Inactive',
    agreementType: 'Form',
  },
  {
    id: '6',
    fileName: '1100.L0005-US01 Combined Declaration and...',
    subtext: 'Completed envelope: [SIGNATURE REQUIRED BY 2/14/2025]...',
    parties: 'INVENTOR',
    partiesOrg: 'Docusign Inc.',
    status: 'Active',
    agreementType: 'Miscellaneous',
  },
  {
    id: '7',
    fileName: 'reseller6.pdf',
    subtext: 'Uploaded: View Job',
    parties: '[INSERT FULL NAME OF RES...',
    partiesOrg: 'Voyager Worldwide',
    status: 'Inactive',
    agreementType: 'C_ Mariya_27s Reseller Agreement',
  },
  {
    id: '8',
    fileName: 'reseller8.pdf',
    subtext: 'Uploaded: View Job',
    parties: 'MiniO Inc.',
    status: 'Active',
    agreementType: 'C_ Mariya_27s Reseller Agreement',
  },
  {
    id: '9',
    fileName: 'reseller7.pdf',
    subtext: 'Uploaded: View Job',
    parties: 'Anchore Inc.',
    status: 'Inactive',
    agreementType: 'C_ Mariya_27s Reseller Agreement',
  },
  {
    id: '10',
    fileName: 'Doc with AI Obligations.docx',
    subtext: 'Uploaded: View Job',
    parties: 'Illumina',
    status: 'Expiring Soon',
    statusDate: 'Expires 12/31/2025',
    agreementType: 'Statement Of Work',
  },
  {
    id: '11',
    fileName: 'NDA Template (1).docx',
    subtext: 'Uploaded: View Job',
    parties: 'SpringCM Inc.',
    status: 'Inactive',
    agreementType: 'Non-Disclosure Agreement',
  },
];

// Action menu items for row actions
const actionMenuItems = [
  { id: 'view', label: 'View Details', icon: 'external-link' as const },
  { id: 'download', label: 'Download', icon: 'download' as const },
  { id: 'share', label: 'Share', icon: 'share' as const },
  { id: 'divider', divider: true },
  { id: 'delete', label: 'Delete', icon: 'trash' as const },
];

export default function CompletedAgreementsPage() {
  const [selectedRows, setSelectedRows] = useState<Set<string | number>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [showBanner, setShowBanner] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState('25');
  const [documentType, setDocumentType] = useState('documents');

  // Table columns configuration
  const columns = [
    {
      key: 'favorite',
      header: '',
      width: '48px',
      cell: () => <Icon name="spark" size="small" style={{ color: 'var(--ink-cobalt-100)' }} />,
    },
    {
      key: 'fileName',
      header: 'File Name',
      style: { borderRight: '1px solid var(--ink-neutral-fade-10)' },
      cell: (row: (typeof agreementsData)[0]) => (
        <Stack gap="none">
          <Text size="sm" weight="medium" style={{ color: 'var(--ink-font-default)' }}>
            {row.fileName}
          </Text>
          <Text size="xs" weight="medium" style={{ color: 'var(--ink-neutral-fade-70)' }}>
            {row.subtext.includes('View Job') ? (
              <>
                <Icon name="upload" size="small" /> {row.subtext.replace('View Job', '')}
                <Link href="#" kind="subtle" size="xs">
                  View Job
                </Link>
              </>
            ) : row.subtext.includes('Completed envelope') ? (
              <>
                <Icon name="check" size="small" style={{ color: 'var(--ink-green-80)' }} />{' '}
                Completed envelope:{' '}
                <Link href="#" kind="subtle" size="xs">
                  {row.subtext.replace('Completed envelope: ', '')}
                </Link>
              </>
            ) : (
              row.subtext
            )}
          </Text>
        </Stack>
      ),
    },
    {
      key: 'parties',
      header: 'Parties',
      cell: (row: (typeof agreementsData)[0]) => (
        <Stack gap="small">
          {row.parties && (
            <span
              style={{
                display: 'inline-block',
                padding: '0 var(--ink-spacing-100)',
                border: '1px solid var(--ink-neutral-fade-10)',
                borderRadius: 'var(--ink-radius-size-xs)',
                backgroundColor: 'var(--ink-white-100)',
              }}
            >
              <Link
                href="#"
                kind="subtle"
                size="small"
                style={{ fontWeight: 'var(--ink-font-weight-medium)' }}
              >
                {row.parties}
              </Link>
            </span>
          )}
          {row.partiesMore && (
            <Text size="sm" color="secondary">
              {row.partiesMore}
            </Text>
          )}
          {row.partiesOrg && (
            <span
              style={{
                display: 'inline-block',
                padding: '0 var(--ink-spacing-100)',
                border: '1px solid var(--ink-neutral-fade-10)',
                borderRadius: 'var(--ink-radius-size-xs)',
                backgroundColor: 'var(--ink-white-100)',
              }}
            >
              <Link
                href="#"
                kind="subtle"
                size="small"
                style={{ fontWeight: 'var(--ink-font-weight-medium)' }}
              >
                {row.partiesOrg}
              </Link>
            </span>
          )}
        </Stack>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      cell: (row: (typeof agreementsData)[0]) => (
        <Stack gap="none">
          <Inline gap="small" align="center">
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor:
                  row.status === 'Active'
                    ? 'var(--ink-status-success)'
                    : row.status === 'Expiring Soon'
                      ? 'var(--ink-status-warning)'
                      : 'var(--ink-neutral-40)',
              }}
            />
            <Text color={row.status === 'Expiring Soon' ? 'error' : 'primary'}>{row.status}</Text>
          </Inline>
          {row.statusDate && (
            <Text size="sm" color="secondary">
              {row.statusDate}
            </Text>
          )}
        </Stack>
      ),
    },
    {
      key: 'agreementType',
      header: 'Agreement Type',
      cell: (row: (typeof agreementsData)[0]) => (
        <Link href="#" kind="subtle" size="small">
          {row.agreementType}
        </Link>
      ),
    },
    {
      key: 'actions',
      header: (
        <IconButton icon="table" size="small" variant="tertiary" aria-label="Column settings" />
      ),
      width: '48px',
      align: 'center' as const,
      cell: () => (
        <Dropdown items={actionMenuItems} position="bottom" align="end">
          <IconButton
            icon="more-vertical"
            size="small"
            variant="tertiary"
            aria-label="More actions"
          />
        </Dropdown>
      ),
    },
  ];

  return (
    <Stack
      gap="medium"
      style={{
        padding: 'var(--ink-spacing-300)',
        backgroundColor: 'var(--ink-bg-canvas-page)',
        minHeight: '100%',
      }}
    >
      {/* Page Header */}
      <Inline justify="space-between" align="center">
        <Inline gap="small" align="center">
          <Heading
            level={1}
            style={{
              fontWeight: 400,
              fontSize: '32px',
              lineHeight: '40px',
              color: 'var(--ink-font-default)',
            }}
          >
            Completed
          </Heading>
          <Inline gap="small" align="center">
            <Icon name="spark" size="small" />
            <Text size="sm" color="secondary">
              AI-Assisted
            </Text>
          </Inline>
        </Inline>
        <Inline gap="none">
          <Inline gap="none" align="center">
            <IconButton icon="plus" variant="tertiary" aria-label="Add" />
            <IconButton
              icon="chevron-down"
              variant="tertiary"
              aria-label="Add options"
              size="small"
            />
          </Inline>
          <IconButton icon="settings" variant="tertiary" aria-label="Settings" />
          <IconButton icon="chevron-down" variant="tertiary" aria-label="More options" />
        </Inline>
      </Inline>

      {/* Alert Banner */}
      {showBanner && (
        <Alert
          kind="promo"
          shape="round"
          icon={<Icon name="spark" />}
          action={{
            label: 'View renewing contracts',
            onClick: () => console.log('View contracts'),
          }}
          onClose={() => setShowBanner(false)}
        >
          <strong>0 agreements</strong> with renewal notice dates in the next 30 days.
        </Alert>
      )}

      {/* Filter Bar */}
      <Inline gap="medium" align="center">
        <div style={{ width: '140px', flexShrink: 0 }}>
          <Select
            label="Document type"
            hideLabel
            value={documentType}
            onChange={(e) => setDocumentType(e.target.value)}
          >
            <option value="documents">Documents</option>
            <option value="all">All Types</option>
          </Select>
        </div>
        <div style={{ flex: 1, position: 'relative' }}>
          <div
            style={{
              position: 'absolute',
              top: '-4px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: 'var(--ink-button-primary-bg)',
            }}
          />
          <SearchInput
            placeholder='Try "agreements expiring in 90 days?"'
            value={searchQuery}
            onChange={setSearchQuery}
            clearable
          />
        </div>
        <Button kind="secondary" startElement={<Icon name="filter" size="small" />}>
          Filters
        </Button>
      </Inline>

      {/* Data Table */}
      <Table
        columns={columns}
        data={agreementsData}
        selectable
        selectedRows={selectedRows}
        onSelectionChange={setSelectedRows}
        getRowKey={(row) => row.id}
        hoverable
        variant="default"
        size="medium"
      />

      {/* Pagination - all right aligned like DocuSign */}
      <Inline justify="flex-end" align="center" gap="medium">
        <div style={{ width: '120px' }}>
          <Select
            label="Items per page"
            hideLabel
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(e.target.value)}
          >
            <option value="25">25 / Page</option>
            <option value="50">50 / Page</option>
            <option value="100">100 / Page</option>
          </Select>
        </div>
        <Text size="sm" color="secondary">
          1 - 25 of 38
        </Text>
        <Pagination
          currentPage={currentPage}
          totalPages={2}
          onPageChange={setCurrentPage}
          mode="simple"
        />
      </Inline>

      {/* Page Footer */}
      <Inline
        justify="space-between"
        align="center"
        style={{
          marginTop: 'auto',
          paddingTop: 'var(--ink-spacing-300)',
          borderTop: '1px solid var(--ink-border-default)',
        }}
      >
        <Inline gap="medium" align="center">
          <Select label="Language" hideLabel value="en-us" onChange={() => {}} size="small">
            <option value="en-us">English (US)</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
          </Select>
          <Link href="#">Contact Us</Link>
          <Link href="#">Terms of Use</Link>
          <Link href="#">Privacy</Link>
          <Link href="#">Intellectual Property</Link>
          <Link href="#">Trust</Link>
        </Inline>
        <Text size="sm" color="secondary">
          Copyright © 2025 Docusign, Inc. All rights reserved
        </Text>
      </Inline>
    </Stack>
  );
}
