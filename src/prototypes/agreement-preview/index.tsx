/**
 * AgreementPreview
 *
 * Full-page agreement preview with:
 * - Document viewer with PDF
 * - Left sidebar with tools (annotations, comments, outline)
 * - Secondary toolbar with page nav, zoom, search
 * - Chat panel that pushes content when opened
 * - Floating "Try Agreement Q&A" CTA when chat is closed
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  IconButton,
  Tooltip,
  Input,
  Divider,
  ComboButton,
  Badge,
  Button,
  Icon,
  AIChat,
  Spinner,
} from '@/design-system';
import type { ChatMessage } from '@/design-system';
import styles from './AgreementPreview.module.css';

export interface AgreementPreviewProps {
  /** Document title */
  documentTitle?: string;
  /** PDF URL */
  pdfUrl?: string;
  /** Total pages in document */
  totalPages?: number;
  /** Callback when back button is clicked */
  onBack?: () => void;
}

// Document-scoped suggested questions
const SUGGESTED_QUESTIONS = [
  'When is this agreement expiring?',
  'Tell me about the governing law?',
  'Are there any renewal terms?',
  'What are the key obligations?',
  'Who are the parties involved?',
];

export const AgreementPreview: React.FC<AgreementPreviewProps> = ({
  documentTitle = 'FlexCorp-Tally_Statement-of-Work_01',
  pdfUrl = '/documents/salesforce-msa-section-24.pdf',
  totalPages = 24,
  onBack,
}) => {
  // State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState(1);
  const [pageInputValue, setPageInputValue] = useState('1');
  const [zoomLevel, setZoomLevel] = useState(100);

  // PDF loading and error state
  const [isPdfLoading, setIsPdfLoading] = useState(true);
  const [pdfError, setPdfError] = useState(false);

  // Chat state
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Sync page input with selected page
  useEffect(() => {
    setPageInputValue(String(selectedPage));
  }, [selectedPage]);

  // Reset loading state when PDF URL changes
  useEffect(() => {
    setIsPdfLoading(true);
    setPdfError(false);
  }, [pdfUrl]);

  // PDF event handlers
  const handlePdfLoad = useCallback(() => {
    setIsPdfLoading(false);
    setPdfError(false);
  }, []);

  const handlePdfError = useCallback(() => {
    setIsPdfLoading(false);
    setPdfError(true);
  }, []);

  const handleOpenInNewTab = useCallback(() => {
    window.open(pdfUrl, '_blank');
  }, [pdfUrl]);

  // Handlers
  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPageInputValue(e.target.value);
  };

  const handlePageInputBlur = () => {
    const page = parseInt(pageInputValue, 10);
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
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

  const handleOpenChat = () => {
    setIsChatOpen(true);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
  };

  // Send a message and simulate AI response
  const handleSendMessage = (content: string) => {
    // Add user message
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: `Based on my analysis of "${documentTitle}", I found the following information regarding your question about "${content.toLowerCase()}"...\n\nThe agreement specifies that the parties have agreed to the terms outlined in Section 3.2, which covers the relevant details for your inquiry.`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  // Handle clicking a suggested question
  const handleSuggestionClick = (question: string) => {
    handleSendMessage(question);
  };

  return (
    <div className={styles.agreementPreview}>
      {/* Document Side */}
      <div className={`${styles.documentSide} ${isChatOpen ? styles.documentSideWithChat : ''}`}>
        {/* Primary Header */}
        <div className={styles.primaryHeader}>
          <div className={styles.headerLeft}>
            <Tooltip content="Back to Agreements">
              <IconButton
                icon="arrow-left"
                size="small"
                kind="tertiary"
                onClick={onBack}
                aria-label="Back to Agreements"
              />
            </Tooltip>
            <span className={styles.documentTitle}>{documentTitle}</span>
            <Badge text="AI-Assisted" kind="emphasis" startElement />
          </div>
          <div className={styles.headerRight}>
            <Tooltip content="Notifications">
              <IconButton
                icon="bell"
                size="small"
                kind="tertiary"
                aria-label="Notifications"
              />
            </Tooltip>
            <ComboButton variant="primary" size="small">
              Download
            </ComboButton>
          </div>
        </div>

        {/* Secondary Toolbar */}
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
              <span className={styles.pageTotalText}>of {totalPages}</span>
              <div className={styles.pageNavButtons}>
                <Tooltip content="Previous page">
                  <IconButton
                    icon="chevron-down"
                    size="small"
                    kind="tertiary"
                    disabled={selectedPage <= 1}
                    onClick={() => setSelectedPage((p) => p - 1)}
                    aria-label="Previous page"
                  />
                </Tooltip>
                <Tooltip content="Next page">
                  <IconButton
                    icon="chevron-up"
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

        {/* Document Body */}
        <div className={styles.documentBody}>
          {/* Left Sidebar */}
          <div className={styles.leftSidebar}>
            <Tooltip content="Highlights" position="right">
              <IconButton
                icon="pencil"
                size="small"
                kind="tertiary"
                aria-label="Highlights"
              />
            </Tooltip>
            <Tooltip content="Comments" position="right">
              <IconButton
                icon="flag"
                size="small"
                kind="tertiary"
                aria-label="Comments"
              />
            </Tooltip>
            <Tooltip content="Document outline" position="right">
              <IconButton
                icon="bulleted-list"
                size="small"
                kind="tertiary"
                aria-label="Document outline"
              />
            </Tooltip>
          </div>

          {/* PDF Viewer */}
          <div
            className={styles.pdfContainer}
            style={{
              '--pdf-zoom': zoomLevel / 100,
            } as React.CSSProperties}
          >
            {/* Loading overlay */}
            {isPdfLoading && !pdfError && (
              <div className={styles.loadingOverlay}>
                <Spinner size="large" />
                <span className={styles.loadingText}>Loading document...</span>
              </div>
            )}

            {/* Error state */}
            {pdfError && (
              <div className={styles.errorState}>
                <Icon name="status-warn" size="large" />
                <p className={styles.errorTitle}>Unable to display this document</p>
                <p className={styles.errorDescription}>
                  The PDF viewer encountered an issue. Try opening the document in a new tab.
                </p>
                <Button kind="secondary" size="small" onClick={handleOpenInNewTab}>
                  Open in new tab
                </Button>
              </div>
            )}

            {/* PDF Object */}
            {!pdfError && (
              <div className={styles.pdfWrapper}>
                <object
                  key={`pdf-page-${selectedPage}`}
                  data={`${pdfUrl}#toolbar=0&navpanes=0&page=${selectedPage}`}
                  type="application/pdf"
                  className={styles.pdfViewer}
                  aria-label={documentTitle}
                  onLoad={handlePdfLoad}
                  onError={handlePdfError}
                >
                  <p>
                    Unable to display PDF.{' '}
                    <a href={pdfUrl}>Download</a> instead.
                  </p>
                </object>
              </div>
            )}

            {/* Floating CTA - only when chat is closed */}
            {!isChatOpen && (
              <Button
                kind="primary"
                size="medium"
                className={styles.floatingCta}
                onClick={handleOpenChat}
                startElement={<Icon name="ai-spark" size="small" />}
              >
                Try Agreement Q&A
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Chat Side */}
      {isChatOpen && (
        <div className={styles.chatSide}>
          <AIChat
            messages={messages}
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
            userName="Akshat"
            assistantName="Docusign AI"
            welcomeTitle="What would you like to know about this agreement?"
            suggestedQuestions={SUGGESTED_QUESTIONS}
            suggestedQuestionsTitle="Commonly asked questions"
            onSuggestionClick={handleSuggestionClick}
            placeholder="Ask about this agreement..."
            showHeader={true}
            onClose={handleCloseChat}
            maxHeight="100%"
            showActions={false}
            className={styles.chatPanel}
          />
        </div>
      )}
    </div>
  );
};

export default AgreementPreview;
