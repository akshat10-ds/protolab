/**
 * AgreementStudio Types
 *
 * TypeScript interfaces for the AgreementStudio prototype.
 * Extracted for better code organization.
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
// Thinking Steps Types (agentic reasoning UI)
// =============================================================================

/**
 * Represents a single step in the agent's reasoning process.
 * Each step has an action (what it's doing) and optionally a result (what it learned).
 * This models real agentic behavior where each step's output informs the next.
 */
export interface ThinkingStep {
  id: string;
  /** What the agent is doing (e.g., "Scanning 15 Acme agreements for pricing clauses") */
  action: string;
  /** What the agent found/learned - informs the next step (e.g., "Found 3 documents with pricing terms") */
  result?: string;
}

// =============================================================================
// Markdown Response Types (simplified AI responses)
// =============================================================================

export interface DocumentPreviewData {
  /** Document title */
  title: string;
  /** Label above title (e.g., "Draft Amendment") */
  label?: string;
  /** Status badge text */
  status?: string;
  /** Detail rows to display */
  details: { label: string; value: string }[];
  /** Document ID for opening in full view */
  documentId?: string;
}

export interface MarkdownResponseData {
  /** Markdown content to render */
  content: string;
  /** Map of citation IDs (as strings "1", "2", etc.) to citation data */
  citations: Record<string, CitationData>;
  /** Optional document preview card data */
  documentPreview?: DocumentPreviewData;
  /** Optional thinking steps shown before content */
  thinkingSteps?: ThinkingStep[];
}
