/**
 * AgreementStudio Components
 *
 * All extracted components for the AgreementStudio prototype.
 */

// Simple components
export { Toast } from './Toast';
export type { ToastProps } from './Toast';

export { FloatingCTA } from './FloatingCTA';
export type { FloatingCTAProps } from './FloatingCTA';

// Document-related components
export { DocumentCanvas } from './DocumentCanvas';
export type { DocumentCanvasProps } from './DocumentCanvas';

export { AgreementsSidebar } from './AgreementsSidebar';
export type { AgreementsSidebarProps } from './AgreementsSidebar';

export { ConflictView } from './ConflictView';
export type { ConflictViewProps } from './ConflictView';

export { RichMessage } from './RichMessage';
export type { RichMessageProps } from './RichMessage';

// Modal components
export { ShareModal } from './ShareModal';
export type { ShareModalProps } from './ShareModal';

// AIPanel components
export { AIPanel, DEFAULT_PANEL_WIDTH, ExpandedPrompt, HistorySidebar } from './AIPanel';
export type {
  AIPanelProps,
  ExpandedPromptProps,
  HistorySidebarProps,
  HistoryItem,
  ChatHistoryData,
} from './AIPanel';
