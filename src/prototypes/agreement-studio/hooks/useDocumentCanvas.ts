/**
 * useDocumentCanvas Hook
 *
 * Manages document canvas state for viewing documents with citations:
 * - Open/close document canvas
 * - Active citation tracking
 * - Source tracking (opened from sidebar vs citation click)
 * - Coordination with agreements sidebar
 */

import { useState, useCallback } from 'react';
import type { CitationData, Agreement } from '../data/agreement-studio-types';

export interface UseDocumentCanvasOptions {
  /** Panel width for auto-expand behavior */
  panelWidth: number;
  /** Callback to change panel width */
  onWidthChange?: (width: number) => void;
}

export interface UseDocumentCanvasReturn {
  /** Whether document canvas is open */
  isDocumentCanvasOpen: boolean;
  /** Currently active citation being viewed */
  activeCitation: CitationData | null;
  /** Source of the document preview (sidebar or citation) */
  docPreviewSource: 'sidebar' | 'citation' | null;
  /** Open document canvas with a citation */
  openWithCitation: (citation: CitationData) => void;
  /** Open document canvas from clicking an agreement in sidebar */
  openFromAgreement: (agreement: Agreement) => void;
  /** Close document canvas */
  closeDocumentCanvas: () => void;
  /** Check if canvas should reopen sidebar on close */
  shouldReopenSidebar: () => boolean;
  /** Set citation directly */
  setActiveCitation: (citation: CitationData | null) => void;
}

export function useDocumentCanvas({
  panelWidth,
  onWidthChange,
}: UseDocumentCanvasOptions): UseDocumentCanvasReturn {
  const [isDocumentCanvasOpen, setIsDocumentCanvasOpen] = useState(false);
  const [activeCitation, setActiveCitation] = useState<CitationData | null>(null);
  const [docPreviewSource, setDocPreviewSource] = useState<'sidebar' | 'citation' | null>(null);

  const expandToFullWidth = useCallback(() => {
    if (onWidthChange && panelWidth < window.innerWidth - 50) {
      onWidthChange(window.innerWidth);
    }
  }, [panelWidth, onWidthChange]);

  const openWithCitation = useCallback(
    (citation: CitationData) => {
      setDocPreviewSource('citation');
      setActiveCitation(citation);
      setIsDocumentCanvasOpen(true);
      expandToFullWidth();
    },
    [expandToFullWidth]
  );

  const openFromAgreement = useCallback(
    (agreement: Agreement) => {
      // Create citation for the document
      const citation: CitationData = {
        id: `cit-${agreement.id}`,
        documentId: agreement.id,
        documentTitle: agreement.fileName,
        section: 'Section 1.1',
        excerpt: 'Agreement document preview',
      };

      setDocPreviewSource('sidebar');
      setActiveCitation(citation);
      setIsDocumentCanvasOpen(true);
      expandToFullWidth();
    },
    [expandToFullWidth]
  );

  const closeDocumentCanvas = useCallback(() => {
    setIsDocumentCanvasOpen(false);
    setDocPreviewSource(null);
  }, []);

  const shouldReopenSidebar = useCallback(() => {
    return docPreviewSource === 'sidebar';
  }, [docPreviewSource]);

  return {
    isDocumentCanvasOpen,
    activeCitation,
    docPreviewSource,
    openWithCitation,
    openFromAgreement,
    closeDocumentCanvas,
    shouldReopenSidebar,
    setActiveCitation,
  };
}
