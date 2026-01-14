/**
 * Custom Hooks for AgreementStudio
 *
 * These hooks encapsulate reusable state management patterns
 * extracted from the AIPanel component.
 */

export { usePanelResize } from './usePanelResize';
export type { UsePanelResizeOptions, UsePanelResizeReturn } from './usePanelResize';

export { useChatHistory } from './useChatHistory';
export type {
  UseChatHistoryOptions,
  UseChatHistoryReturn,
  HistoryItem,
  ChatHistoryData,
} from './useChatHistory';

export { useDocumentCanvas } from './useDocumentCanvas';
export type { UseDocumentCanvasOptions, UseDocumentCanvasReturn } from './useDocumentCanvas';

export { useChatMessages } from './useChatMessages';
export type { UseChatMessagesOptions, UseChatMessagesReturn } from './useChatMessages';
