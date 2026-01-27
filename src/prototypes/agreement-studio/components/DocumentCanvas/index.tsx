/**
 * DocumentCanvas Component
 *
 * Full canvas view for documents with Gemini-style layout.
 * Features:
 * - Page thumbnails sidebar
 * - Citation highlighting
 * - Responsive layout (full-width in narrow mode)
 * - Jump to citation functionality
 *
 * This component is a candidate for design system extraction.
 */

import React, { useState, useEffect } from 'react';
import { IconButton, Tooltip, Skeleton, Input, Divider, ComboButton } from '@/design-system';
import type { CitationData } from '../../data/agreement-studio-types';
import { DOCUMENT_PAGES } from '../../data/agreement-studio-data';
import styles from './DocumentCanvas.module.css';

// Default total pages for the PDF (can be made dynamic later)
const DEFAULT_TOTAL_PAGES = 1;

export interface DocumentCanvasProps {
  isOpen: boolean;
  citation: CitationData | null;
  onClose: () => void;
  isNarrowMode: boolean;
  isLoading?: boolean;
}

export const DocumentCanvas: React.FC<DocumentCanvasProps> = ({
  isOpen,
  citation,
  onClose,
  isNarrowMode,
  isLoading = false,
}) => {
  const pageData = citation ? DOCUMENT_PAGES[citation.id] : null;
  const [selectedPage, setSelectedPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [pageInputValue, setPageInputValue] = useState('1');

  // Reset to citation page when citation changes
  useEffect(() => {
    if (pageData) {
      setSelectedPage(pageData.pageNumber);
      setPageInputValue(String(pageData.pageNumber));
    }
  }, [pageData]);

  // Sync page input with selected page
  useEffect(() => {
    setPageInputValue(String(selectedPage));
  }, [selectedPage]);

  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPageInputValue(e.target.value);
  };

  const handlePageInputBlur = () => {
    const page = parseInt(pageInputValue, 10);
    if (!isNaN(page) && page >= 1 && page <= (totalPages)) {
      setSelectedPage(page);
    } else {
      setPageInputValue(String(selectedPage));
    }
  };

  const handlePageInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handlePageInputBlur();
    }
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 25, 50));
  };

  // Get total pages (from pageData or default)
  const totalPages = pageData?.totalPages || DEFAULT_TOTAL_PAGES;

  // Wrapper classes for animation and responsive layout
  const wrapperClasses = [
    styles.documentCanvasWrapper,
    isOpen ? styles.documentCanvasWrapperOpen : '',
    isNarrowMode && isOpen ? styles.documentCanvasWrapperFullWidth : '',
  ]
    .filter(Boolean)
    .join(' ');

  const canvasClasses = styles.documentCanvas;

  return (
    <div className={wrapperClasses}>
      <div className={canvasClasses}>
        {/* Canvas Header - Document Navigation */}
        <div className={styles.canvasHeader}>
          <div className={styles.canvasHeaderLeft}>
            <Tooltip content="Previous document">
              <IconButton
                icon="chevron-left"
                size="small"
                kind="tertiary"
                aria-label="Previous document"
              />
            </Tooltip>
            <span className={styles.canvasTitle}>{citation?.documentTitle || 'Document'}</span>
            <Tooltip content="Next document">
              <IconButton
                icon="chevron-right"
                size="small"
                kind="tertiary"
                aria-label="Next document"
              />
            </Tooltip>
          </div>
          <div className={styles.canvasHeaderRight}>
            <Tooltip content="Open in Navigator">
              <IconButton
                icon="external-link"
                size="small"
                kind="tertiary"
                aria-label="Open in Navigator"
              />
            </Tooltip>
            <ComboButton variant="secondary" size="small">
              Download
            </ComboButton>
            <IconButton
              icon="close"
              size="small"
              kind="tertiary"
              onClick={onClose}
              aria-label="Close"
            />
          </div>
        </div>

        {/* Secondary Toolbar - Page & Zoom Controls */}
        <div className={styles.secondaryToolbar}>
          <div className={styles.toolbarCenter}>
            {/* Page Navigation */}
            <div className={styles.pageNavGroup}>
              <Input
                label="Page number"
                hideLabel
                size="small"
                value={pageInputValue}
                onChange={handlePageInputChange}
                onBlur={handlePageInputBlur}
                onKeyDown={handlePageInputKeyDown}
                className={styles.pageInput}
              />
              <span className={styles.pageTotalText}>/ {totalPages}</span>
              <div className={styles.pageNavButtons}>
                <Tooltip content="Previous page">
                  <IconButton
                    icon="chevron-up"
                    size="small"
                    kind="tertiary"
                    disabled={selectedPage <= 1}
                    onClick={() => setSelectedPage((p) => p - 1)}
                    aria-label="Previous page"
                  />
                </Tooltip>
                <Tooltip content="Next page">
                  <IconButton
                    icon="chevron-down"
                    size="small"
                    kind="tertiary"
                    disabled={selectedPage >= (totalPages)}
                    onClick={() => setSelectedPage((p) => p + 1)}
                    aria-label="Next page"
                  />
                </Tooltip>
              </div>
            </div>

            <Divider orientation="vertical" className={styles.toolbarDivider} />

            {/* Zoom Controls */}
            <div className={styles.zoomGroup}>
              <Tooltip content="Zoom in">
                <IconButton
                  icon="plus"
                  size="small"
                  kind="tertiary"
                  onClick={handleZoomIn}
                  disabled={zoomLevel >= 200}
                  aria-label="Zoom in"
                />
              </Tooltip>
              <span className={styles.zoomText}>{zoomLevel}%</span>
              <Tooltip content="Zoom out">
                <IconButton
                  icon="minus"
                  size="small"
                  kind="tertiary"
                  onClick={handleZoomOut}
                  disabled={zoomLevel <= 50}
                  aria-label="Zoom out"
                />
              </Tooltip>
            </div>
          </div>

          <div className={styles.toolbarRight}>
            <Tooltip content="Search in document">
              <IconButton
                icon="search"
                size="small"
                kind="tertiary"
                aria-label="Search in document"
              />
            </Tooltip>
          </div>
        </div>

        {/* Canvas Body - PDF Viewer */}
        <div className={styles.canvasBody}>
          <div className={styles.pdfContainer}>
            {isLoading ? (
              <div className={styles.skeletonDocument}>
                <Skeleton variant="rectangular" className={styles.skeletonPdf} />
              </div>
            ) : (
              <object
                data={`/documents/salesforce-msa-section-24.pdf#toolbar=0&navpanes=0&page=${selectedPage}`}
                type="application/pdf"
                className={styles.pdfViewer}
                aria-label={citation?.documentTitle || 'Document'}
              >
                <p>Unable to display PDF. <a href="/documents/salesforce-msa-section-24.pdf">Download</a> instead.</p>
              </object>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
