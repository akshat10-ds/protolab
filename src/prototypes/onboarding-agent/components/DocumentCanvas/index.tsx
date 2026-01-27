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
import { Icon, IconButton, Tooltip, Skeleton } from '@/design-system';
import type { CitationData } from '../../data/agreement-studio-types';
import { DOCUMENT_PAGES } from '../../data/agreement-studio-data';
import styles from './DocumentCanvas.module.css';

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

  // Reset to citation page when citation changes
  useEffect(() => {
    if (pageData) {
      setSelectedPage(pageData.pageNumber);
    }
  }, [pageData]);

  // Generate mock page thumbnails
  const pageThumbnails = pageData
    ? Array.from({ length: pageData.totalPages }, (_, i) => i + 1)
    : [];

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
        {/* Canvas Header/Toolbar */}
        <div className={styles.canvasHeader}>
          <div className={styles.canvasHeaderLeft}>
            {/* Back button in narrow mode */}
            {isNarrowMode && (
              <button
                className={styles.canvasBackButton}
                onClick={onClose}
                aria-label="Back to chat"
              >
                <Icon name="arrow-left" size={18} />
              </button>
            )}
            <Icon name="document" size={18} />
            <span className={styles.canvasTitle}>{citation?.documentTitle || 'Document'}</span>
          </div>
          <div className={styles.canvasHeaderCenter}>
            {/* Page navigation in header */}
            <button
              className={styles.canvasNavButton}
              disabled={selectedPage <= 1}
              onClick={() => setSelectedPage((p) => p - 1)}
            >
              <Icon name="chevron-left" size={16} />
            </button>
            <span className={styles.canvasPageIndicator}>
              {selectedPage} / {pageData?.totalPages || 1}
            </span>
            <button
              className={styles.canvasNavButton}
              disabled={selectedPage >= (pageData?.totalPages || 1)}
              onClick={() => setSelectedPage((p) => p + 1)}
            >
              <Icon name="chevron-right" size={16} />
            </button>
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
            <IconButton
              icon="close"
              size="small"
              kind="tertiary"
              onClick={onClose}
              aria-label="Close"
            />
          </div>
        </div>

        {/* Canvas Body */}
        <div className={styles.canvasBody}>
          {/* Thumbnails sidebar */}
          <div className={styles.canvasThumbnails}>
            {isLoading
              ? // Skeleton thumbnails
                Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className={styles.canvasThumbSkeleton}>
                    <Skeleton variant="rounded" className={styles.skeletonThumb} />
                  </div>
                ))
              : pageThumbnails.map((pageNum) => (
                  <button
                    key={pageNum}
                    className={`${styles.canvasThumb} ${pageNum === selectedPage ? styles.canvasThumbActive : ''}`}
                    onClick={() => setSelectedPage(pageNum)}
                  >
                    <div className={styles.canvasThumbPage}>
                      {pageNum === pageData?.pageNumber && (
                        <div className={styles.canvasThumbHighlight} />
                      )}
                    </div>
                    <span className={styles.canvasThumbNum}>{pageNum}</span>
                  </button>
                ))}
          </div>

          {/* Document content area */}
          <div className={styles.canvasContent}>
            <div className={styles.canvasDocument}>
              {isLoading ? (
                // Skeleton loading state
                <div className={styles.skeletonDocument}>
                  <div className={styles.skeletonHeader}>
                    <Skeleton variant="rounded" className={styles.skeletonLogo} />
                    <div className={styles.skeletonHeaderText}>
                      <Skeleton variant="text" className={styles.skeletonTitle} />
                      <Skeleton variant="text" className={styles.skeletonSubtitle} />
                    </div>
                  </div>
                  <Skeleton variant="rectangular" className={styles.skeletonDivider} />
                  <Skeleton variant="text" className={styles.skeletonSectionTitle} />
                  <div className={styles.skeletonContent}>
                    <Skeleton variant="text" lines={3} className={styles.skeletonParagraph} />
                    <Skeleton variant="rounded" className={styles.skeletonHighlight} />
                    <Skeleton variant="text" lines={4} className={styles.skeletonParagraph} />
                  </div>
                </div>
              ) : (
                <>
                  {/* Document letterhead */}
                  <div className={styles.canvasLetterhead}>
                    <div className={styles.canvasCompanyLogo}>
                      <div className={styles.canvasLogoIcon}>A</div>
                      <div className={styles.canvasCompanyInfo}>
                        <span className={styles.canvasCompanyName}>ACME CORPORATION</span>
                        <span className={styles.canvasCompanyAddress}>
                          123 Business Park Drive, Suite 400
                        </span>
                        <span className={styles.canvasCompanyAddress}>San Francisco, CA 94102</span>
                      </div>
                    </div>
                    <div className={styles.canvasDocType}>
                      {citation?.documentTitle?.includes('MSA')
                        ? 'MASTER SERVICES AGREEMENT'
                        : citation?.documentTitle?.includes('Order Form')
                          ? 'ORDER FORM'
                          : citation?.documentTitle?.includes('SOW')
                            ? 'STATEMENT OF WORK'
                            : citation?.documentTitle?.includes('Amendment')
                              ? 'AMENDMENT'
                              : 'AGREEMENT'}
                    </div>
                  </div>

                  <div className={styles.canvasDivider} />

                  {/* Section header */}
                  {pageData && (
                    <h3 className={styles.canvasSectionTitle}>{pageData.sectionTitle}</h3>
                  )}

                  {/* Document text */}
                  {pageData && selectedPage === pageData.pageNumber ? (
                    <div className={styles.canvasTextContent}>
                      <div className={styles.canvasText}>
                        {pageData.beforeText.split('\n').map((line, i) => (
                          <p key={`before-${i}`}>{line || '\u00A0'}</p>
                        ))}
                      </div>

                      {/* Highlighted citation */}
                      <div className={styles.canvasCitation}>
                        <div className={styles.canvasCitationBadge}>
                          <Icon name="ai-spark" size={14} />
                          <span>Citation {citation?.id?.replace('cit-', '')}</span>
                        </div>
                        <p className={styles.canvasCitationText}>
                          <mark className={styles.canvasCitationHighlight}>
                            {pageData.highlightedText}
                          </mark>
                        </p>
                      </div>

                      <div className={styles.canvasText}>
                        {pageData.afterText.split('\n').map((line, i) => (
                          <p key={`after-${i}`}>{line || '\u00A0'}</p>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className={styles.canvasPlaceholder}>
                      <Icon name="document" size={40} />
                      <p>Page {selectedPage}</p>
                      <button
                        className={styles.canvasJumpButton}
                        onClick={() => setSelectedPage(pageData?.pageNumber || 1)}
                      >
                        Jump to citation (page {pageData?.pageNumber})
                      </button>
                    </div>
                  )}

                  {/* Page footer */}
                  <div className={styles.canvasPageFooter}>
                    <span>Page {selectedPage}</span>
                    <span>{citation?.documentTitle}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
