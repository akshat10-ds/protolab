/**
 * DataTable Test Component
 *
 * For testing sticky columns and hover states in isolation.
 * Uses dataTableStyles from design system to match Showcase exactly.
 */

import React, { useState, useMemo, useCallback } from 'react';
import { DataTable, DataTableColumn, DataTableAction, DataTablePaginationConfig, PageSizeOption, dataTableStyles } from '@/design-system/5-patterns/DataTable';
import { AIIcon } from '@/design-system/3-primitives/Icon/AIIcon';
import { Link } from '@/design-system/3-primitives/Link';
import { IconButton } from '@/design-system/3-primitives/IconButton';
import styles from './DataTableTest.module.css';

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

const DEMO_DATA: Agreement[] = [
  {
    id: '1',
    agreementId: 'a1868aa8-11c6-4656-a078-0af9ade15b50',
    fileName: '01_people_ai_guidebook.pdf',
    fileStatus: 'uploaded',
    fileStatusDetail: 'View Job',
    parties: ['HR Department'],
    status: 'inactive',
    agreementType: 'Handbook',
    isAIAssisted: true,
  },
  {
    id: '2',
    agreementId: 'b2979bb9-22d7-5767-b189-1bg0bef26c61',
    fileName: 'Restricted Access Request Form 1726.docx',
    fileStatus: 'completed',
    fileStatusDetail: 'View Details',
    parties: ['Akshat Mishra'],
    status: 'active',
    statusDate: 'Last activity May 2025',
    agreementType: 'Access Request',
    contractValue: '$5,000',
    effectiveDate: '2024-02-20',
    isAIAssisted: true,
  },
  {
    id: '3',
    agreementId: 'c3080cc0-33e8-6878-c290-2ch1cfg37d72',
    fileName: 'Offer Letter 1.pdf',
    fileStatus: 'completed',
    fileStatusDetail: 'View Details',
    parties: ['Kenneth L. Harris'],
    status: 'inactive',
    agreementType: 'Offer Letter',
    contractValue: '$2,500',
    effectiveDate: '2024-03-10',
    isAIAssisted: false,
  },
  {
    id: '4',
    agreementId: 'd4191dd1-44f9-7989-d3a1-3di2dgh48e83',
    fileName: '1100.L0005-US01 - Inventor-approved Application.pdf',
    fileStatus: 'completed',
    fileStatusDetail: 'View Details',
    parties: ['—'],
    status: 'inactive',
    agreementType: 'Patent',
    contractValue: '$10,000',
    effectiveDate: '2024-04-05',
    isAIAssisted: true,
  },
  {
    id: '5',
    agreementId: 'e5202ee2-55g0-8090-e4b2-4ej3ehi59f94',
    fileName: 'Service Agreement 2024.pdf',
    fileStatus: 'completed',
    fileStatusDetail: 'View Details',
    parties: ['John Smith', 'Acme Corp'],
    status: 'active',
    statusDate: 'Expiring in 30 days',
    agreementType: 'Service',
    contractValue: '$3,200',
    effectiveDate: '2024-05-12',
    expirationDate: '2025-05-12',
    isAIAssisted: false,
  },
  {
    id: '6',
    agreementId: 'f6313ff3-66h1-9101-f5c3-5fk4fij60g05',
    fileName: 'Confidentiality Agreement.docx',
    fileStatus: 'pending',
    fileStatusDetail: 'Awaiting signature',
    parties: ['Jane Doe'],
    status: 'active',
    agreementType: 'NDA',
    isAIAssisted: true,
  },
  {
    id: '7',
    agreementId: 'g7424gg4-77i2-0212-g6d4-6gl5gjk71h16',
    fileName: 'Employment Contract - Senior Engineer.pdf',
    fileStatus: 'completed',
    fileStatusDetail: 'View Details',
    parties: ['Alex Johnson'],
    status: 'active',
    agreementType: 'Employment',
    contractValue: '$150,000',
    effectiveDate: '2024-07-01',
    isAIAssisted: false,
  },
  {
    id: '8',
    agreementId: 'h8535hh5-88j3-1323-h7e5-7hm6hkl82i27',
    fileName: 'Vendor Agreement - Cloud Services.docx',
    fileStatus: 'completed',
    fileStatusDetail: 'View Details',
    parties: ['AWS Inc.'],
    status: 'active',
    agreementType: 'Vendor',
    contractValue: '$45,000',
    effectiveDate: '2024-07-15',
    isAIAssisted: true,
  },
  {
    id: '9',
    agreementId: 'i9646ii6-99k4-2434-i8f6-8in7ilm93j38',
    fileName: 'Master Services Agreement - Enterprise.pdf',
    fileStatus: 'completed',
    fileStatusDetail: 'View Details',
    parties: ['Microsoft Corp', 'Legal Team'],
    status: 'active',
    statusDate: 'Renewed Jan 2025',
    agreementType: 'MSA',
    contractValue: '$250,000',
    effectiveDate: '2024-01-15',
    expirationDate: '2027-01-15',
    isAIAssisted: true,
  },
  {
    id: '10',
    agreementId: 'j0757jj7-00l5-3545-j9g7-9jo8jmn04k49',
    fileName: 'Non-Disclosure Agreement - Partnership.docx',
    fileStatus: 'completed',
    fileStatusDetail: 'View Details',
    parties: ['Sarah Williams', 'TechStart Inc'],
    status: 'active',
    agreementType: 'NDA',
    contractValue: '$0',
    effectiveDate: '2024-08-01',
    isAIAssisted: false,
  },
  {
    id: '11',
    agreementId: 'k1868kk8-11m6-4656-k0h8-0kp9kno15l50',
    fileName: 'Consulting Services Contract.pdf',
    fileStatus: 'pending',
    fileStatusDetail: 'Awaiting review',
    parties: ['James Brown'],
    status: 'inactive',
    agreementType: 'Consulting',
    contractValue: '$75,000',
    effectiveDate: '2024-09-01',
    isAIAssisted: true,
  },
  {
    id: '12',
    agreementId: 'l2979ll9-22n7-5767-l1i9-1lq0lop26m61',
    fileName: 'Software License Agreement - Annual.pdf',
    fileStatus: 'completed',
    fileStatusDetail: 'View Details',
    parties: ['Oracle Systems'],
    status: 'active',
    statusDate: 'Auto-renews Dec 2025',
    agreementType: 'License',
    contractValue: '$120,000',
    effectiveDate: '2023-12-01',
    expirationDate: '2025-12-01',
    isAIAssisted: false,
  },
];

export default function DataTableTest() {
  // Selection state
  const [selectedRows, setSelectedRows] = useState<Set<string | number>>(new Set());

  // Sorting state
  const [sortColumn, setSortColumn] = useState<string | undefined>('fileName');
  const [sortDirection, setSortDirection] = useState<'ascending' | 'descending' | null>('ascending');

  // Pagination state
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<PageSizeOption>(10);

  // Define columns - Production Navigator style using dataTableStyles from design system
  const columns: DataTableColumn<Agreement>[] = useMemo(() => [
    {
      key: 'aiAssisted',
      header: '',
      width: '40px',
      sticky: true,
      cell: (row) => (
        row.isAIAssisted ? (
          <span className={dataTableStyles.aiSparkle}>
            <AIIcon name="ai-spark-filled" size={14} />
          </span>
        ) : null
      ),
    },
    {
      key: 'fileName',
      header: 'File Name',
      sortable: true,
      width: '260px',
      sticky: true,
      className: dataTableStyles.columnBorderRight,
      cell: (row) => (
        <div className={dataTableStyles.cellContent}>
          <Link discrete size="small" href="#" className={dataTableStyles.cellPrimary}>{row.fileName}</Link>
          <span className={dataTableStyles.cellSecondary}>
            {row.fileStatus === 'uploaded' ? '↑' : '✓'}{' '}
            {row.fileStatus === 'uploaded' ? 'Uploaded: ' : 'Completed envelope: '}
            <Link kind="subtle" size="xs" href="#">{row.fileStatusDetail}</Link>
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
          {row.parties.length > 0 && row.parties[0] !== '—' ? (
            row.parties.map((party, i) => {
              const isMoreLink = party.startsWith('+');
              if (isMoreLink) {
                return (
                  <a key={i} href="#" className={dataTableStyles.partyMoreLink}>{party}</a>
                );
              }
              return (
                <span key={i} className={dataTableStyles.partyChip}>
                  <a href="#" className={dataTableStyles.partyLink}>{party}</a>
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
          <span
            className={dataTableStyles.statusDot}
            data-status={row.status}
          />
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
      width: '130px',
    },
    {
      key: 'contractValue',
      header: 'Total Contract Value',
      sortable: true,
      width: '150px',
      alignment: 'right',
      cell: (row) => row.contractValue || '—',
    },
    {
      key: 'effectiveDate',
      header: 'Effective Date',
      sortable: true,
      width: '120px',
      cell: (row) => row.effectiveDate || '—',
    },
    {
      key: 'agreementId',
      header: 'Agreement ID',
      width: '130px',
      cell: (row) => (
        <span className={dataTableStyles.agreementId}>{row.agreementId}</span>
      ),
    },
  ], []);

  // Row actions renderer - renders in the column control cell, aligned with header icon
  const renderRowActions = useCallback(() => (
    <IconButton
      icon="more-vertical"
      variant="tertiary"
      size="medium"
      onClick={(e) => {
        e.stopPropagation();
        console.log('Row action menu');
      }}
    />
  ), []);

  // Selection actions
  const selectionActions: DataTableAction[] = useMemo(() => [
    {
      id: 'download',
      label: 'Download',
      icon: 'download',
      onClick: (rows) => console.log('Download:', rows),
    },
    {
      id: 'delete',
      label: 'Delete',
      icon: 'trash',
      variant: 'danger',
      onClick: (rows) => console.log('Delete:', rows),
    },
  ], []);

  // Pagination config
  const pagination: DataTablePaginationConfig = useMemo(() => ({
    page,
    pageSize,
    totalItems: DEMO_DATA.length,
    onPageChange: setPage,
    onPageSizeChange: (size) => {
      setPageSize(size);
      setPage(1);
    },
    showInfo: true,
  }), [page, pageSize]);

  // Handle sort
  const handleSortChange = useCallback((column: string, direction: 'ascending' | 'descending' | null) => {
    setSortColumn(direction ? column : undefined);
    setSortDirection(direction);
  }, []);

  // Get paginated data
  const paginatedData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return DEMO_DATA.slice(start, start + pageSize);
  }, [page, pageSize]);

  return (
    <div className={styles.container}>
      <div className={styles.tableWrapper}>
        <DataTable
          columns={columns}
          data={paginatedData}
          getRowKey={(row) => row.id}
          selectable
          selectedRows={selectedRows}
          onSelectionChange={setSelectedRows}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
          onSortChange={handleSortChange}
          selectionActions={selectionActions}
          pagination={pagination}
          showColumnControl
          renderRowActions={renderRowActions}
          rowHeight="tall"
          stickyHeader
        />
      </div>
    </div>
  );
}

// Helper to capitalize
function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
