/**
 * AgentStudio Types
 *
 * TypeScript interfaces for the AgentStudio prototype.
 * Extended from AgreementStudio with agentic features.
 */

import type { SuggestedAction } from '@/design-system';

// =============================================================================
// Rich Message Types - Structured AI responses
// =============================================================================

export interface RichMessageSection {
  id: string;
  title: string;
  icon: string;
  type: 'table' | 'list' | 'text';
  content: RichTableData | RichListItem[] | string;
}

export interface RichTableData {
  headers: string[];
  rows: RichTableRow[];
}

export interface RichTableRow {
  cells: (string | { text: string; citation?: CitationData })[];
}

export interface RichListItem {
  text: string;
  citation?: CitationData;
}

export interface CitationData {
  id: string;
  documentId: string;
  documentTitle: string;
  section: string;
  excerpt: string;
}

export interface RichMessageData {
  id: string;
  title: string;
  subtitle: string;
  sections: RichMessageSection[];
}

// =============================================================================
// Conflict Detection Types
// =============================================================================

export interface ConflictClause {
  documentId: string;
  documentTitle: string;
  section: string;
  text: string;
}

export interface ConflictData {
  id: string;
  title: string;
  description: string;
  clauses: [ConflictClause, ConflictClause]; // Always exactly 2 for side-by-side
  recommendation: string;
  recommendationCitation?: CitationData;
}

// =============================================================================
// Agreement Types
// =============================================================================

export interface Agreement {
  id: string;
  agreementId: string;
  fileName: string;
  fileStatus: 'uploaded' | 'completed' | 'pending';
  fileStatusDetail: string;
  parties: string[];
  status: 'active' | 'inactive' | 'expired';
  statusDate?: string;
  agreementType: string;
  contractValue?: string;
  effectiveDate?: string;
  expirationDate?: string;
  isAIAssisted?: boolean;
}

// =============================================================================
// Prompt Types
// =============================================================================

export interface ExpandedPromptDetails {
  steps: string[];
  estimatedTime: string;
  documentsToAnalyze: number;
}

export interface ExtendedSuggestedAction extends SuggestedAction {
  expansion?: ExpandedPromptDetails;
}

// =============================================================================
// Document Page Types (for Citation Viewer)
// =============================================================================

export interface DocumentPageData {
  pageNumber: number;
  totalPages: number;
  beforeText: string;
  highlightedText: string;
  afterText: string;
  sectionTitle: string;
}

// =============================================================================
// Chat History Types
// =============================================================================

export interface ChatHistoryEntry {
  id: string;
  title: string;
  time: string;
  messages: number;
}

export interface ChatHistoryData {
  today: ChatHistoryEntry[];
  yesterday: ChatHistoryEntry[];
  lastWeek: ChatHistoryEntry[];
}

// =============================================================================
// Agent Thinking Types - Progressive reasoning visualization
// =============================================================================

export type ThinkingStepStatus = 'pending' | 'active' | 'complete' | 'error';

export interface ThinkingStep {
  id: string;
  title: string;
  description?: string;
  status: ThinkingStepStatus;
  progress?: number; // 0-100 for active step
  result?: string;
  duration?: number; // milliseconds
}

export interface ThinkingSequence {
  id: string;
  messageId: string;
  steps: ThinkingStep[];
  isCollapsed?: boolean;
  startTime?: Date;
  endTime?: Date;
}

// =============================================================================
// Agent Action Types - Proposed actions with execute/cancel
// =============================================================================

export type AgentActionType =
  | 'analyze'
  | 'draft'
  | 'route'
  | 'schedule'
  | 'generate'
  | 'update'
  | 'notify';

export type AgentActionStatus =
  | 'proposed'
  | 'executing'
  | 'complete'
  | 'cancelled'
  | 'error';

export interface AgentActionResult {
  success: boolean;
  output: string;
  artifacts?: string[]; // Generated documents, updated records, etc.
  error?: string;
}

export interface AgentAction {
  id: string;
  type: AgentActionType;
  label: string;
  description: string;
  icon: string;
  status: AgentActionStatus;
  parameters?: Record<string, string>;
  result?: AgentActionResult;
}

// =============================================================================
// Tool Execution Types - Tool call visualization
// =============================================================================

export type ToolExecutionStatus = 'pending' | 'executing' | 'complete' | 'error';

export interface ToolExecution {
  id: string;
  tool: string;
  input: Record<string, unknown>;
  output?: string;
  status: ToolExecutionStatus;
  progress?: number; // 0-100
  startTime: Date;
  endTime?: Date;
  error?: string;
}

// =============================================================================
// Agent Response Types - Extended rich message with actions
// =============================================================================

export interface AgentResponseData extends RichMessageData {
  thinkingSequence?: ThinkingSequence;
  proposedActions?: AgentAction[];
  toolExecutions?: ToolExecution[];
}
