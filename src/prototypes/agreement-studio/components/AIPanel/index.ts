/**
 * AIPanel Components
 *
 * Components for the AI Chat Panel:
 * - AIPanel: Main AI chat panel component
 * - ExpandedPrompt: Shows detailed prompt breakdown
 * - HistorySidebar: Chat history sidebar content
 */

export { AIPanel, DEFAULT_PANEL_WIDTH } from './AIPanel';
export type { AIPanelProps } from './AIPanel';

export { ExpandedPrompt } from './ExpandedPrompt';
export type { ExpandedPromptProps } from './ExpandedPrompt';

export { HistorySidebar } from './HistorySidebar';
export type { HistorySidebarProps, HistoryItem, ChatHistoryData } from './HistorySidebar';
