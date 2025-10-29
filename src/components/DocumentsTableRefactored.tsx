import React, { useState, useMemo, useCallback, useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import svgPaths from "../imports/svg-icivvpv3d2";

interface Document {
  id: string;
  name: string;
  subtitle: string;
  subtitleLink?: string;
  party: string;
  status: 'completed' | 'in-progress';
  contractStatus?: {
    label: string;
    type: 'active' | 'expiring' | 'expired';
  };
  type: string;
}

const sampleDocuments: Document[] = [
  {
    id: '1',
    name: 'Offer Letter.pdf',
    subtitle: 'Completed envelope:',
    subtitleLink: 'Job Offer - Senior Analytics Manager',
    party: 'Mary Wilson',
    status: 'completed',
    contractStatus: { label: 'Active contract', type: 'active' },
    type: 'Intellectual Property'
  },
  {
    id: '2',
    name: 'Confirmation of Termination.pdf',
    subtitle: 'Completed envelope:',
    subtitleLink: 'Job Offer - Senior Analytics Manager',
    party: 'Mary Wilson',
    status: 'completed',
    contractStatus: { label: 'Active contract', type: 'active' },
    type: 'Intellectual Property'
  },
  {
    id: '3',
    name: 'Severance Agreement.pdf',
    subtitle: 'Synced via Workday:',
    subtitleLink: 'HRMS Sync Job',
    party: 'Mary Wilson',
    status: 'completed',
    contractStatus: { label: 'Expiring soon', type: 'expiring' },
    type: 'Intellectual Property'
  },
  {
    id: '4',
    name: 'Intellectual Property Agreement.pdf',
    subtitle: 'Imported from email:',
    subtitleLink: 'View Job',
    party: 'Mary Wilson',
    status: 'completed',
    contractStatus: { label: 'Active contract', type: 'active' },
    type: 'Intellectual Property'
  },
  {
    id: '5',
    name: 'Background Check.pdf',
    subtitle: 'Imported from email:',
    subtitleLink: 'View Job',
    party: 'Mary Wilson',
    status: 'completed',
    contractStatus: { label: 'Active contract', type: 'active' },
    type: 'Intellectual Property'
  },
  {
    id: '6',
    name: 'Individual Development Plan.pdf',
    subtitle: 'Synced via Workday:',
    subtitleLink: 'HRMS Sync Job',
    party: 'Mary Wilson',
    status: 'completed',
    contractStatus: { label: 'Expiring soon', type: 'expiring' },
    type: 'Intellectual Property'
  },
  {
    id: '7',
    name: 'Contractor NDA.pdf',
    subtitle: 'Synced via Workday:',
    subtitleLink: 'HRMS Sync Job',
    party: 'Mary Wilson',
    status: 'completed',
    contractStatus: { label: 'Active contract', type: 'active' },
    type: 'Intellectual Property'
  },
  {
    id: '8',
    name: 'Severance Agreement.pdf',
    subtitle: 'Uploaded to Docusign:',
    subtitleLink: 'View Job',
    party: 'Mary Wilson',
    status: 'completed',
    contractStatus: { label: 'Expiring soon', type: 'expiring' },
    type: 'Intellectual Property'
  },
  {
    id: '9',
    name: 'Intellectual Property Agreement.pdf',
    subtitle: 'Imported from email:',
    subtitleLink: 'View Job',
    party: 'Mary Wilson',
    status: 'completed',
    contractStatus: { label: 'Active contract', type: 'active' },
    type: 'Intellectual Property'
  },
  {
    id: '10',
    name: 'Background Check.pdf',
    subtitle: 'Completed envelope:',
    subtitleLink: 'Job Offer - Senior Analytics Manager',
    party: 'Mary Wilson',
    status: 'completed',
    contractStatus: { label: 'Expiring soon', type: 'expiring' },
    type: 'Intellectual Property'
  }
];

type SortField = 'name' | 'status' | 'type' | null;
type SortDirection = 'asc' | 'desc';

export function DocumentsTableRefactored() {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  // Measure table width
  const tableRef = React.useRef<HTMLDivElement>(null);
  const [tableWidth, setTableWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      if (tableRef.current) {
        setTableWidth(tableRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Fixed widths
  const CHECKBOX_WIDTH = 56;
  const ACTIONS_WIDTH = 56;

  // Available width for resizable columns
  const availableWidth = tableWidth - CHECKBOX_WIDTH - ACTIONS_WIDTH;

  // Column widths (percentages of available width)
  const [nameWidthPercent, setNameWidthPercent] = useState(35); // 35%
  const [partiesWidthPercent, setPartiesWidthPercent] = useState(18); // 18%
  const [statusWidthPercent, setStatusWidthPercent] = useState(25); // 25%
  const [typeWidthPercent, setTypeWidthPercent] = useState(22); // 22%

  // Convert percentages to pixels
  const nameWidth = (availableWidth * nameWidthPercent) / 100;
  const partiesWidth = (availableWidth * partiesWidthPercent) / 100;
  const statusWidth = (availableWidth * statusWidthPercent) / 100;
  const typeWidth = (availableWidth * typeWidthPercent) / 100;

  // Column constraints
  const MIN_COLUMN_WIDTH = 10; // 10% minimum
  const MAX_COLUMN_WIDTH = 60; // 60% maximum

  // Resize state
  const [resizing, setResizing] = useState<string | null>(null);
  const [startX, setStartX] = useState(0);
  const [startWidth, setStartWidth] = useState(0);

  // Divider state
  const [tableHovered, setTableHovered] = useState(false);
  const [hoveredDivider, setHoveredDivider] = useState<string | null>(null);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedDocuments = useMemo(() => {
    if (!sortField) return sampleDocuments;

    return [...sampleDocuments].sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        const comparison = aVal.localeCompare(bVal);
        return sortDirection === 'asc' ? comparison : -comparison;
      }
      return 0;
    });
  }, [sortField, sortDirection]);

  const toggleSelectAll = () => {
    if (selectedIds.size === sampleDocuments.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(sampleDocuments.map(d => d.id)));
    }
  };

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const handleResizeStart = (column: string, e: React.MouseEvent) => {
    e.preventDefault();
    setResizing(column);
    setStartX(e.clientX);
    switch (column) {
      case 'name':
        setStartWidth(nameWidthPercent);
        break;
      case 'parties':
        setStartWidth(partiesWidthPercent);
        break;
      case 'status':
        setStartWidth(statusWidthPercent);
        break;
      case 'type':
        setStartWidth(typeWidthPercent);
        break;
    }
  };

  const handleResizeMove = useCallback((e: MouseEvent) => {
    if (!resizing || !availableWidth) return;

    const diff = e.clientX - startX;
    // Convert pixel difference to percentage
    const percentageDiff = (diff / availableWidth) * 100;
    const newWidth = Math.max(MIN_COLUMN_WIDTH, Math.min(MAX_COLUMN_WIDTH, startWidth + percentageDiff));

    switch (resizing) {
      case 'name':
        setNameWidthPercent(newWidth);
        break;
      case 'parties':
        setPartiesWidthPercent(newWidth);
        break;
      case 'status':
        setStatusWidthPercent(newWidth);
        break;
      case 'type':
        setTypeWidthPercent(newWidth);
        break;
    }
  }, [resizing, startX, startWidth, availableWidth, MIN_COLUMN_WIDTH, MAX_COLUMN_WIDTH]);

  const handleResizeEnd = useCallback(() => {
    setResizing(null);
  }, []);

  useEffect(() => {
    if (resizing) {
      document.addEventListener('mousemove', handleResizeMove);
      document.addEventListener('mouseup', handleResizeEnd);
      return () => {
        document.removeEventListener('mousemove', handleResizeMove);
        document.removeEventListener('mouseup', handleResizeEnd);
      };
    }
  }, [resizing, handleResizeMove, handleResizeEnd]);

  const SortIcon = ({ active }: { active: boolean }) => (
    <div className="relative shrink-0 size-[20px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <path
          clipRule="evenodd"
          d={svgPaths.p1860e800}
          fill="var(--fill-0, #1A1D20)"
          fillOpacity="0.7"
          fillRule="evenodd"
          style={{ fill: "color(display-p3 0.1020 0.1137 0.1255)", fillOpacity: "0.7" }}
        />
      </svg>
    </div>
  );

  const Checkbox = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
    <div
      className="box-border content-stretch flex gap-[8px] items-start justify-center px-0 py-[8px] relative shrink-0 w-[24px] cursor-pointer"
      onClick={onChange}
    >
      <div className="relative shrink-0 size-[24px]">
        <div className="absolute bg-white left-1/2 rounded-[2px] size-[20px] top-1/2 translate-x-[-50%] translate-y-[-50%]">
          <div className="absolute border-2 border-[rgba(26,29,32,0.7)] border-solid inset-0 pointer-events-none rounded-[2px]" />
        </div>
      </div>
    </div>
  );

  const ResizeHandle = ({ column }: { column: string }) => {
    const handleDoubleClick = () => {
      // Auto-fit column to content (set to a reasonable default for now)
      switch (column) {
        case 'name':
          setNameWidthPercent(35);
          break;
        case 'parties':
          setPartiesWidthPercent(18);
          break;
        case 'status':
          setStatusWidthPercent(25);
          break;
        case 'type':
          setTypeWidthPercent(22);
          break;
      }
    };

    return (
      <div
        className="absolute top-0 h-full w-[16px] cursor-col-resize z-[999] flex items-center justify-center transition-all"
        onMouseDown={(e) => handleResizeStart(column, e)}
        onDoubleClick={handleDoubleClick}
        onMouseEnter={() => setHoveredDivider(column)}
        onMouseLeave={() => setHoveredDivider(null)}
        style={{
          right: '-8px',
          backgroundColor: hoveredDivider === column || resizing === column ? 'rgba(142, 6, 255, 0.15)' : 'transparent'
        }}
        title="Drag to resize, double-click to reset"
      >
        <div
          className="w-[3px] h-full transition-all"
          style={{
            backgroundColor: resizing === column
              ? '#8E06FF'
              : hoveredDivider === column
                ? 'rgba(142, 6, 255, 0.6)'
                : 'rgba(26, 29, 32, 0.15)'
          }}
        />
      </div>
    );
  };

  const getDividerColor = (column: string) => {
    if (!tableHovered) return 'transparent';
    if (hoveredDivider === column || resizing === column) return '#8E06FF';
    return 'rgba(26, 29, 32, 0.15)';
  };

  const getDividerTransition = () => {
    // No transition during resize for instant feedback
    return resizing ? 'none' : 'border-color 150ms ease-out';
  };

  return (
    <div
      ref={tableRef}
      className="bg-white content-stretch flex items-start justify-end relative shrink-0 w-full z-[1]"
      onMouseEnter={() => setTableHovered(true)}
      onMouseLeave={() => { setHoveredRow(null); setTableHovered(false); }}
    >
      {/* Fixed Left Section */}
      <div className="content-stretch flex flex-col items-start relative shrink-0" style={{ width: `${CHECKBOX_WIDTH + nameWidth}px` }}>
        {/* Header */}
        <div className="bg-gradient-to-t from-[rgba(255,255,255,0.05)] relative shrink-0 to-10% to-[#ffffff] w-full">
          <div className="flex flex-row items-center rounded-[inherit] size-full">
            <div className="box-border content-stretch flex items-center pl-0 pr-[16px] py-0 relative w-full">
              <div className="content-stretch flex items-end relative shrink-0">
                {/* Checkbox header */}
                <div className="h-[52px] min-w-[56px] shrink-0 w-[56px] flex items-center justify-center">
                  <Checkbox
                    checked={selectedIds.size === sampleDocuments.length && sampleDocuments.length > 0}
                    onChange={toggleSelectAll}
                  />
                </div>
                {/* Name header */}
                <div className="flex flex-row items-end self-stretch">
                  <div
                    className="box-border content-stretch flex gap-[4px] h-full items-end pb-[16px] pt-0 px-[16px] relative shrink-0 cursor-pointer hover:opacity-80 transition-all"
                    style={{
                      width: `${nameWidth}px`,
                      backgroundColor: resizing === 'name' ? 'rgba(142, 6, 255, 0.08)' : 'transparent'
                    }}
                    onClick={() => handleSort('name')}
                  >
                    <div className="absolute border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" style={{ borderColor: getDividerColor('name'), transition: getDividerTransition() }} />
                    <div className="flex flex-col font-['DS_Indigo:Medium',_sans-serif] justify-center leading-[0] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-[rgba(26,29,32,0.9)] text-nowrap">
                      <p className="leading-[1.4] overflow-ellipsis overflow-hidden whitespace-pre" style={{ fontFamily: 'DSIndigo, sans-serif', fontSize: '14px', fontWeight: 500, lineHeight: 1.4 }}>Name</p>
                    </div>
                    <SortIcon active={sortField === 'name'} />
                    <ResizeHandle column="name" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rows */}
        <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
          {sortedDocuments.map((doc) => (
            <div
              key={doc.id}
              className={`content-stretch flex h-[72px] items-center relative shrink-0 w-full cursor-pointer ${hoveredRow === doc.id ? 'bg-[var(--muted)]' : ''}`}
              onMouseEnter={() => setHoveredRow(doc.id)}
            >
              <div className="absolute border-[0px_0px_1px] border-[rgba(26,29,32,0.15)] border-solid inset-0 pointer-events-none" />
              <div className="bg-transparent content-stretch flex items-center shrink-0 sticky top-0">
                <div className="absolute border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" style={{ borderColor: getDividerColor('name'), transition: getDividerTransition() }} />
                {/* Checkbox cell */}
                <div className="bg-transparent box-border content-stretch flex gap-[8px] h-[72px] items-center justify-center px-[16px] py-0 relative shrink-0">
                  <Checkbox
                    checked={selectedIds.has(doc.id)}
                    onChange={() => toggleSelect(doc.id)}
                  />
                </div>
                {/* Name cell */}
                <div className="bg-transparent box-border content-stretch flex gap-[4px] h-[72px] items-center pl-0 pr-[16px] py-[8px] relative shrink-0" style={{ width: `${nameWidth}px` }}>
                  {/* AI Icon */}
                  <div className="h-[24px] relative shrink-0 w-[16px]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 24">
                      <g>
                        <path d={svgPaths.p1f335100} fill="var(--fill-0, #8E06FF)" style={{ fill: "color(display-p3 0.5569 0.0235 1.0000)", fillOpacity: "1" }} />
                      </g>
                    </svg>
                  </div>
                  {/* Text */}
                  <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px not-italic relative shrink-0">
                    <p className="-webkit-box css-bc38nt font-['DS_Indigo:Medium',_sans-serif] leading-[1.5] overflow-ellipsis overflow-hidden relative shrink-0 text-[#1e1e1e] text-[14px] w-full" style={{ fontFamily: 'DSIndigo, sans-serif', fontSize: '14px', fontWeight: 500, lineHeight: 1.5 }}>{doc.name}</p>
                    <p className="font-['DS_Indigo:Regular',_sans-serif] leading-[1.5] overflow-ellipsis overflow-hidden relative shrink-0 text-[12px] text-[rgba(25,24,35,0.65)] w-full" style={{ fontFamily: 'DSIndigo, sans-serif', fontSize: '12px', fontWeight: 400, lineHeight: 1.5 }}>
                      <span>{doc.subtitle} </span>
                      {doc.subtitleLink && (
                        <span className="[text-underline-position:from-font] decoration-solid not-italic underline cursor-pointer hover:text-[rgba(25,24,35,0.9)]">{doc.subtitleLink}</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scrollable Right Section */}
      <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px overflow-x-auto overflow-y-clip relative self-stretch shrink-0">
        {/* Header */}
        <div className="bg-gradient-to-t content-stretch flex from-[rgba(255,255,255,0.05)] items-center justify-start relative shrink-0 to-10% to-[#ffffff] w-full">
          <div className="content-stretch flex items-center justify-start relative w-full">
            {/* Parties header */}
            <div className="relative shrink-0 transition-all" style={{
              width: `${partiesWidth}px`,
              backgroundColor: resizing === 'parties' ? 'rgba(142, 6, 255, 0.08)' : 'transparent'
            }}>
              <div className="absolute border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" style={{ borderColor: getDividerColor('parties'), transition: getDividerTransition() }} />
              <div className="box-border content-stretch flex items-center p-[16px] relative w-full">
                <div className="flex flex-col font-['DS_Indigo:Medium',_sans-serif] justify-center leading-[0] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-[rgba(26,29,32,0.9)] text-nowrap">
                  <p className="leading-[1.4] overflow-ellipsis overflow-hidden whitespace-pre" style={{ fontFamily: 'DSIndigo, sans-serif', fontSize: '14px', fontWeight: 500, lineHeight: 1.4 }}>Parties</p>
                </div>
                <ResizeHandle column="parties" />
              </div>
            </div>
            {/* Status header */}
            <div className="relative shrink-0 transition-all" style={{
              width: `${statusWidth}px`,
              backgroundColor: resizing === 'status' ? 'rgba(142, 6, 255, 0.08)' : 'transparent'
            }}>
              <div className="absolute border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" style={{ borderColor: getDividerColor('status'), transition: getDividerTransition() }} />
              <div
                className="box-border content-stretch flex gap-[4px] items-center p-[16px] relative w-full cursor-pointer hover:opacity-80"
                onClick={() => handleSort('status')}
              >
                <div className="flex flex-col font-['DS_Indigo:Medium',_sans-serif] justify-center leading-[0] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-[rgba(26,29,32,0.9)] text-nowrap">
                  <p className="leading-[1.4] overflow-ellipsis overflow-hidden whitespace-pre" style={{ fontFamily: 'DSIndigo, sans-serif', fontSize: '14px', fontWeight: 500, lineHeight: 1.4 }}>Status</p>
                </div>
                <SortIcon active={sortField === 'status'} />
                <ResizeHandle column="status" />
              </div>
            </div>
            {/* Type header */}
            <div className="relative shrink-0 transition-all" style={{
              width: `${typeWidth}px`,
              backgroundColor: resizing === 'type' ? 'rgba(142, 6, 255, 0.08)' : 'transparent'
            }}>
              <div className="absolute border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" style={{ borderColor: getDividerColor('type'), transition: getDividerTransition() }} />
              <div
                className="box-border content-stretch flex gap-[4px] items-center p-[16px] relative w-full cursor-pointer hover:opacity-80"
                onClick={() => handleSort('type')}
              >
                <div className="flex flex-col font-['DS_Indigo:Medium',_sans-serif] justify-center leading-[0] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-[rgba(26,29,32,0.9)] text-nowrap">
                  <p className="leading-[1.4] overflow-ellipsis overflow-hidden whitespace-pre" style={{ fontFamily: 'DSIndigo, sans-serif', fontSize: '14px', fontWeight: 500, lineHeight: 1.4 }}>Type</p>
                </div>
                <SortIcon active={sortField === 'type'} />
                <ResizeHandle column="type" />
              </div>
            </div>
            {/* Actions header */}
            <div className="box-border content-stretch flex gap-[4px] h-[50px] items-center justify-end opacity-0 pl-[16px] pr-0 py-[16px] relative shrink-0" style={{ width: `${ACTIONS_WIDTH}px`, marginLeft: 'auto' }} />
          </div>
        </div>

        {/* Rows */}
        {sortedDocuments.map((doc) => (
          <div
            key={`scroll-${doc.id}`}
            className={`content-stretch flex h-[72px] items-center justify-start relative shrink-0 w-full ${hoveredRow === doc.id ? 'bg-[var(--muted)]' : ''}`}
            onMouseEnter={() => setHoveredRow(doc.id)}
          >
            <div className="absolute border-[0px_0px_1px] border-[rgba(26,29,32,0.15)] border-solid inset-0 pointer-events-none" />

            {/* Parties cell */}
            <div className="bg-transparent content-stretch flex flex-col items-start relative shrink-0" style={{ width: `${partiesWidth}px` }}>
              <div className="absolute border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" style={{ borderColor: getDividerColor('parties'), transition: getDividerTransition() }} />
              <div className="bg-transparent box-border content-stretch flex flex-col h-[72px] items-start justify-center px-[16px] py-[8px] relative shrink-0 w-full">
                <div className="basis-0 content-stretch flex flex-col gap-[6px] grow items-start justify-center min-h-px min-w-px relative shrink-0 w-full">
                  <div className="bg-[#f6f2ff] content-stretch flex items-center justify-center relative rounded-[2px] shrink-0">
                    <div className="absolute border-[#9845ff] border-[0px_0px_1px] border-dashed inset-0 pointer-events-none rounded-[2px]" />
                    <p className="font-['DS_Indigo:Regular',_sans-serif] leading-[18px] not-italic relative shrink-0 text-[14px] text-[rgba(25,24,35,0.9)] text-nowrap whitespace-pre">{doc.party}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Status cell */}
            <div className="bg-transparent box-border content-stretch flex flex-col gap-[4px] h-[72px] items-start justify-center px-[15px] py-[20px] relative shrink-0" style={{ width: `${statusWidth}px` }}>
              <div className="absolute border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" style={{ borderColor: getDividerColor('status'), transition: getDividerTransition() }} />
              <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full max-w-full">
                <div className="relative shrink-0 size-[24px]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                    <g>
                      <path d={svgPaths.p3aa3a300} fill="var(--fill-0, #130032)" fillOpacity="0.7" style={{ fill: "color(display-p3 0.0745 0.0000 0.1961)", fillOpacity: "0.7" }} />
                    </g>
                  </svg>
                </div>
                <div className="content-stretch flex flex-col items-start justify-center relative shrink-0">
                  <p className="font-['DS_Indigo:Regular',_sans-serif] leading-[1.4] not-italic relative shrink-0 text-[14px] text-[rgba(19,0,50,0.9)] w-full">Completed</p>
                </div>
              </div>
              {doc.contractStatus && (
                <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
                  <div className="relative shrink-0 size-[24px]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                      <g>
                        <path d={svgPaths.p331a3800} fill="var(--fill-0, #00875C)" style={{ fill: "color(display-p3 0.0000 0.5294 0.3608)", fillOpacity: "1" }} />
                      </g>
                    </svg>
                  </div>
                  <div className="content-stretch flex flex-col items-start justify-center relative shrink-0">
                    <div className="absolute border-[#8827dc] border-[0px_0px_1px] border-dashed inset-0 pointer-events-none" />
                    <p className="font-['DS_Indigo:Medium',_sans-serif] leading-[1.5] not-italic relative shrink-0 text-[12px] text-[rgba(19,0,50,0.9)] tracking-[0.16px] w-full">{doc.contractStatus.label}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Type cell */}
            <div className="bg-transparent content-stretch flex flex-col h-[72px] items-start justify-center px-[16px] py-[8px] relative shrink-0" style={{ width: `${typeWidth}px` }}>
              <div className="absolute border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" style={{ borderColor: getDividerColor('type'), transition: getDividerTransition() }} />
              <p className="font-['DS_Indigo:Regular',_sans-serif] leading-[1.4] not-italic relative shrink-0 text-[14px] text-[rgba(19,0,50,0.9)]">{doc.type}</p>
            </div>

            {/* Actions cell */}
            <div className="bg-transparent box-border content-stretch flex gap-[8px] h-[72px] items-center justify-center px-[16px] py-0 relative shrink-0" style={{ width: `${ACTIONS_WIDTH}px`, marginLeft: 'auto' }}>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="bg-[rgba(204,255,0,0)] box-border content-stretch flex gap-[8px] items-center justify-center p-[8px] relative rounded-[2px] shrink-0 size-[40px] cursor-pointer hover:bg-[rgba(26,29,32,0.05)]">
                    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                        <path d={svgPaths.p2fd4f00} fill="var(--fill-0, #1A1D20)" fillOpacity="0.7" style={{ fill: "color(display-p3 0.1020 0.1137 0.1255)", fillOpacity: "0.7" }} />
                      </svg>
                    </div>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View details</DropdownMenuItem>
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Download</DropdownMenuItem>
                  <DropdownMenuItem>Share</DropdownMenuItem>
                  <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
