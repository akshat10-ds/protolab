import React, { useState, useMemo, useCallback, useEffect } from 'react';
import svgPaths from "../imports/svg-icivvpv3d2";

export interface TableColumn<T> {
  key: string;
  header: string;
  sortable?: boolean;
  resizable?: boolean;
  defaultWidth?: number; // percentage of available width
  renderCell: (item: T, hoveredRow: string | null) => React.ReactNode;
}

export interface GenericDataTableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  getItemId: (item: T) => string;
  enableCheckboxes?: boolean;
  enableActions?: boolean;
  actionsWidth?: number;
  renderActions?: (item: T) => React.ReactNode;
}

export function GenericDataTable<T>({
  data,
  columns,
  getItemId,
  enableCheckboxes = true,
  enableActions = false,
  actionsWidth = 56,
  renderActions,
}: GenericDataTableProps<T>) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

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
  const CHECKBOX_WIDTH = enableCheckboxes ? 56 : 0;
  const ACTIONS_WIDTH = enableActions ? actionsWidth : 0;

  // Available width for resizable columns
  const availableWidth = tableWidth - CHECKBOX_WIDTH - ACTIONS_WIDTH;

  // Column widths state (percentages of available width)
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>(() => {
    const widths: Record<string, number> = {};
    columns.forEach(col => {
      widths[col.key] = col.defaultWidth || 100 / columns.length;
    });
    return widths;
  });

  // Convert percentages to pixels
  const getColumnWidth = (key: string) => (availableWidth * columnWidths[key]) / 100;

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

  const handleSort = (field: string) => {
    const column = columns.find(c => c.key === field);
    if (!column?.sortable) return;

    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedData = useMemo(() => {
    if (!sortField) return data;

    return [...data].sort((a, b) => {
      const aVal = (a as any)[sortField];
      const bVal = (b as any)[sortField];

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        const comparison = aVal.localeCompare(bVal);
        return sortDirection === 'asc' ? comparison : -comparison;
      }
      return 0;
    });
  }, [data, sortField, sortDirection]);

  const toggleSelectAll = () => {
    if (selectedIds.size === data.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(data.map(getItemId)));
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
    setStartWidth(columnWidths[column]);
  };

  const handleResizeMove = useCallback((e: MouseEvent) => {
    if (!resizing || !availableWidth) return;

    const diff = e.clientX - startX;
    const percentageDiff = (diff / availableWidth) * 100;
    const newWidth = Math.max(MIN_COLUMN_WIDTH, Math.min(MAX_COLUMN_WIDTH, startWidth + percentageDiff));

    setColumnWidths(prev => ({
      ...prev,
      [resizing]: newWidth
    }));
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

  const SortIcon = () => (
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
      const col = columns.find(c => c.key === column);
      if (col) {
        setColumnWidths(prev => ({
          ...prev,
          [column]: col.defaultWidth || 100 / columns.length
        }));
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
    return resizing ? 'none' : 'border-color 150ms ease-out';
  };

  // First column is always fixed on the left
  const firstColumn = columns[0];
  const firstColumnWidth = getColumnWidth(firstColumn.key);

  return (
    <div
      ref={tableRef}
      className="bg-white content-stretch flex items-start justify-end relative shrink-0 w-full z-[1]"
      onMouseEnter={() => setTableHovered(true)}
      onMouseLeave={() => { setHoveredRow(null); setTableHovered(false); }}
    >
      {/* Fixed Left Section */}
      <div className="content-stretch flex flex-col items-start relative shrink-0" style={{ width: `${CHECKBOX_WIDTH + firstColumnWidth}px` }}>
        {/* Header */}
        <div className="bg-gradient-to-t from-[rgba(255,255,255,0.05)] relative shrink-0 to-10% to-[#ffffff] w-full">
          <div className="flex flex-row items-center rounded-[inherit] size-full">
            <div className="box-border content-stretch flex items-center pl-0 pr-[16px] py-0 relative w-full">
              <div className="content-stretch flex items-end relative shrink-0">
                {/* Checkbox header */}
                {enableCheckboxes && (
                  <div className="h-[52px] min-w-[56px] shrink-0 w-[56px] flex items-center justify-center">
                    <Checkbox
                      checked={selectedIds.size === data.length && data.length > 0}
                      onChange={toggleSelectAll}
                    />
                  </div>
                )}
                {/* First column header */}
                <div className="flex flex-row items-end self-stretch">
                  <div
                    className={`box-border content-stretch flex gap-[4px] h-full items-end pb-[16px] pt-0 px-[16px] relative shrink-0 ${firstColumn.sortable ? 'cursor-pointer hover:opacity-80' : ''} transition-all`}
                    style={{
                      width: `${firstColumnWidth}px`,
                      backgroundColor: resizing === firstColumn.key ? 'rgba(142, 6, 255, 0.08)' : 'transparent'
                    }}
                    onClick={() => handleSort(firstColumn.key)}
                  >
                    <div className="absolute border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" style={{ borderColor: getDividerColor(firstColumn.key), transition: getDividerTransition() }} />
                    <div className="flex flex-col font-['DS_Indigo:Medium',_sans-serif] justify-center leading-[0] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-[rgba(26,29,32,0.9)] text-nowrap">
                      <p className="leading-[1.4] overflow-ellipsis overflow-hidden whitespace-pre" style={{ fontFamily: 'DSIndigo, sans-serif', fontSize: '14px', fontWeight: 500, lineHeight: 1.4 }}>{firstColumn.header}</p>
                    </div>
                    {firstColumn.sortable && <SortIcon />}
                    {firstColumn.resizable && <ResizeHandle column={firstColumn.key} />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rows - First column */}
        <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
          {sortedData.map((item) => {
            const itemId = getItemId(item);
            return (
              <div
                key={itemId}
                className={`content-stretch flex h-[72px] items-center relative shrink-0 w-full cursor-pointer ${hoveredRow === itemId ? 'bg-[var(--muted)]' : ''}`}
                onMouseEnter={() => setHoveredRow(itemId)}
              >
                <div className="absolute border-[0px_0px_1px] border-[rgba(26,29,32,0.15)] border-solid inset-0 pointer-events-none" />
                <div className="bg-transparent content-stretch flex items-center shrink-0 sticky top-0">
                  <div className="absolute border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" style={{ borderColor: getDividerColor(firstColumn.key), transition: getDividerTransition() }} />
                  {/* Checkbox cell */}
                  {enableCheckboxes && (
                    <div className="bg-transparent box-border content-stretch flex gap-[8px] h-[72px] items-center justify-center px-[16px] py-0 relative shrink-0">
                      <Checkbox
                        checked={selectedIds.has(itemId)}
                        onChange={() => toggleSelect(itemId)}
                      />
                    </div>
                  )}
                  {/* First column cell */}
                  <div className="bg-transparent box-border content-stretch flex gap-[4px] h-[72px] items-center pl-0 pr-[16px] py-[8px] relative shrink-0" style={{ width: `${firstColumnWidth}px` }}>
                    {firstColumn.renderCell(item, hoveredRow)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Scrollable Right Section */}
      <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px overflow-x-auto overflow-y-clip relative self-stretch shrink-0">
        {/* Header - Remaining columns */}
        <div className="bg-gradient-to-t content-stretch flex from-[rgba(255,255,255,0.05)] items-center justify-start relative shrink-0 to-10% to-[#ffffff] w-full">
          <div className="content-stretch flex items-center justify-start relative w-full">
            {columns.slice(1).map((col) => (
              <div
                key={col.key}
                className="relative shrink-0 transition-all"
                style={{
                  width: `${getColumnWidth(col.key)}px`,
                  backgroundColor: resizing === col.key ? 'rgba(142, 6, 255, 0.08)' : 'transparent'
                }}
              >
                <div className="absolute border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" style={{ borderColor: getDividerColor(col.key), transition: getDividerTransition() }} />
                <div
                  className={`box-border content-stretch flex gap-[4px] items-center p-[16px] relative w-full ${col.sortable ? 'cursor-pointer hover:opacity-80' : ''}`}
                  onClick={() => handleSort(col.key)}
                >
                  <div className="flex flex-col font-['DS_Indigo:Medium',_sans-serif] justify-center leading-[0] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-[rgba(26,29,32,0.9)] text-nowrap">
                    <p className="leading-[1.4] overflow-ellipsis overflow-hidden whitespace-pre" style={{ fontFamily: 'DSIndigo, sans-serif', fontSize: '14px', fontWeight: 500, lineHeight: 1.4 }}>{col.header}</p>
                  </div>
                  {col.sortable && <SortIcon />}
                  {col.resizable && <ResizeHandle column={col.key} />}
                </div>
              </div>
            ))}
            {/* Actions header */}
            {enableActions && (
              <div className="box-border content-stretch flex gap-[4px] h-[50px] items-center justify-end opacity-0 pl-[16px] pr-0 py-[16px] relative shrink-0" style={{ width: `${ACTIONS_WIDTH}px`, marginLeft: 'auto' }} />
            )}
          </div>
        </div>

        {/* Rows - Remaining columns */}
        {sortedData.map((item) => {
          const itemId = getItemId(item);
          return (
            <div
              key={`scroll-${itemId}`}
              className={`content-stretch flex h-[72px] items-center justify-start relative shrink-0 w-full ${hoveredRow === itemId ? 'bg-[var(--muted)]' : ''}`}
              onMouseEnter={() => setHoveredRow(itemId)}
            >
              <div className="absolute border-[0px_0px_1px] border-[rgba(26,29,32,0.15)] border-solid inset-0 pointer-events-none" />

              {columns.slice(1).map((col) => (
                <div
                  key={col.key}
                  className="relative shrink-0"
                  style={{ width: `${getColumnWidth(col.key)}px` }}
                >
                  <div className="absolute border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" style={{ borderColor: getDividerColor(col.key), transition: getDividerTransition() }} />
                  {col.renderCell(item, hoveredRow)}
                </div>
              ))}

              {/* Actions cell */}
              {enableActions && renderActions && (
                <div className="bg-transparent box-border content-stretch flex gap-[8px] h-[72px] items-center justify-center px-[16px] py-0 relative shrink-0" style={{ width: `${ACTIONS_WIDTH}px`, marginLeft: 'auto' }}>
                  {renderActions(item)}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
