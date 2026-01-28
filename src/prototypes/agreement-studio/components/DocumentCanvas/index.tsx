/**
 * DocumentCanvas Component
 *
 * Full canvas view for documents with Gemini-style layout.
 * Features:
 * - PDF rendering via react-pdf (PDF.js)
 * - Citation highlight overlay
 * - Page navigation and zoom controls
 * - Responsive layout (full-width in narrow mode)
 *
 * This component is a candidate for design system extraction.
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { IconButton, Tooltip, Skeleton, Input, Divider, ComboButton } from '@/design-system';
import type { CitationData } from '../../data/agreement-studio-types';
import styles from './DocumentCanvas.module.css';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// Fake highlight positions for demo (percentage-based for responsiveness)
// Each citation maps to a specific page and highlight area
interface HighlightConfig {
  page: number;
  top: number;
  left: number;
  width: number;
  height: number;
}

const DEMO_HIGHLIGHTS: Record<string, HighlightConfig> = {
  'cit-1': { page: 1, top: 32, left: 8, width: 84, height: 6 },
  'cit-2': { page: 1, top: 55, left: 8, width: 84, height: 8 },
  'cit-3': { page: 2, top: 20, left: 8, width: 84, height: 10 },
  'cit-4': { page: 2, top: 45, left: 8, width: 84, height: 6 },
  'cit-5': { page: 3, top: 25, left: 8, width: 84, height: 8 },
  'cit-6': { page: 3, top: 60, left: 8, width: 84, height: 6 },
  default: { page: 1, top: 40, left: 8, width: 84, height: 8 },
};

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
  const [selectedPage, setSelectedPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [pageInputValue, setPageInputValue] = useState('1');
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pdfError, setPdfError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(600);

  // Reset page when citation changes - use page from highlight config
  useEffect(() => {
    if (citation) {
      const config = DEMO_HIGHLIGHTS[citation.id] || DEMO_HIGHLIGHTS.default;
      const targetPage = Math.min(config.page, numPages || config.page);
      setSelectedPage(targetPage);
      setPageInputValue(String(targetPage));
    }
  }, [citation, numPages]);

  // Sync page input with selected page
  useEffect(() => {
    setPageInputValue(String(selectedPage));
  }, [selectedPage]);

  // Track container width for responsive PDF sizing
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width - 64);
      }
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [isOpen]);

  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPageInputValue(e.target.value);
  };

  const handlePageInputBlur = () => {
    const page = parseInt(pageInputValue, 10);
    if (!isNaN(page) && page >= 1 && page <= (numPages || 1)) {
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

  const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPdfError(null);
  }, []);

  const onDocumentLoadError = useCallback((error: Error) => {
    console.error('PDF load error:', error);
    setPdfError('Failed to load PDF document');
  }, []);

  const totalPages = numPages || 1;
  const pageWidth = Math.min(containerWidth, 800) * (zoomLevel / 100);

  // Get highlight position for current citation
  const highlight = citation ? DEMO_HIGHLIGHTS[citation.id] || DEMO_HIGHLIGHTS.default : null;

  const wrapperClasses = [
    styles.documentCanvasWrapper,
    isOpen ? styles.documentCanvasWrapperOpen : '',
    isNarrowMode && isOpen ? styles.documentCanvasWrapperFullWidth : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={wrapperClasses}>
      <div className={styles.documentCanvas}>
        {/* Canvas Header */}
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

        {/* Secondary Toolbar */}
        <div className={styles.secondaryToolbar}>
          <div className={styles.toolbarCenter}>
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
                    disabled={selectedPage >= totalPages}
                    onClick={() => setSelectedPage((p) => p + 1)}
                    aria-label="Next page"
                  />
                </Tooltip>
              </div>
            </div>

            <Divider orientation="vertical" className={styles.toolbarDivider} />

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
        <div className={styles.canvasBody} ref={containerRef}>
          <div className={styles.pdfContainer}>
            {isLoading ? (
              <div className={styles.skeletonDocument}>
                <Skeleton variant="rectangular" className={styles.skeletonPdf} />
              </div>
            ) : pdfError ? (
              <div className={styles.pdfError}>
                <p>{pdfError}</p>
                <a href="/documents/salesforce-msa-section-24.pdf" download>
                  Download PDF instead
                </a>
              </div>
            ) : (
              <div className={styles.pdfWrapper}>
                <Document
                  file="/documents/salesforce-msa-section-24.pdf"
                  onLoadSuccess={onDocumentLoadSuccess}
                  onLoadError={onDocumentLoadError}
                  loading={
                    <div className={styles.skeletonDocument}>
                      <Skeleton variant="rectangular" className={styles.skeletonPdf} />
                    </div>
                  }
                  className={styles.pdfDocument}
                >
                  <Page
                    pageNumber={selectedPage}
                    width={pageWidth}
                    renderTextLayer={true}
                    renderAnnotationLayer={true}
                    className={styles.pdfPage}
                    loading={<Skeleton variant="rectangular" className={styles.skeletonPdf} />}
                  />
                </Document>
                {/* Highlight overlay positioned over PDF using calculated pixels */}
                {(() => {
                  const pageHeight = pageWidth * 1.414; // A4 aspect ratio
                  const h = highlight || DEMO_HIGHLIGHTS.default;
                  return (
                    <div
                      className={styles.highlightOverlay}
                      style={{
                        top: (h.top / 100) * pageHeight,
                        left: (h.left / 100) * pageWidth,
                        width: (h.width / 100) * pageWidth,
                        height: (h.height / 100) * pageHeight,
                      }}
                    />
                  );
                })()}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
