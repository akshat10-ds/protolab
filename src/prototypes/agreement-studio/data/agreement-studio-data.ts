/**
 * AgreementStudio Mock Data
 *
 * All mock data constants for the AgreementStudio prototype.
 * Extracted for better code organization and easier updates.
 */

import type { ChatMessage } from '@/design-system';
import type {
  Agreement,
  ExtendedSuggestedAction,
  ChatHistoryData,
  RichMessageData,
  DocumentPageData,
  ConflictData,
  MarkdownResponseData,
  MatrixResponseData,
  PromptCategory,
  Prompt,
} from './agreement-studio-types';

// =============================================================================
// Acme Demo Data - 15 Realistic Agreements
// =============================================================================

export const ALL_AGREEMENTS: Agreement[] = [
  // Non-Acme agreements (shown before search)
  {
    id: 'other-1',
    agreementId: 'MSA-2023-045',
    fileName: 'TechStart Inc - Master Services Agreement',
    fileStatus: 'completed',
    fileStatusDetail: 'Fully executed',
    parties: ['TechStart Inc', 'DocuSign Inc.'],
    status: 'active',
    agreementType: 'MSA',
    effectiveDate: '3/1/2023',
    expirationDate: '2/28/2026',
    isAIAssisted: false,
  },
  {
    id: 'other-2',
    agreementId: 'NDA-2024-012',
    fileName: 'Global Partners - NDA',
    fileStatus: 'completed',
    fileStatusDetail: 'Signed',
    parties: ['Global Partners LLC'],
    status: 'active',
    agreementType: 'NDA',
    effectiveDate: '1/15/2024',
    expirationDate: '1/14/2027',
    isAIAssisted: false,
  },
  {
    id: 'other-3',
    agreementId: 'SOW-2024-008',
    fileName: 'Innovate Labs - SOW Phase 2',
    fileStatus: 'completed',
    fileStatusDetail: 'Active',
    parties: ['Innovate Labs', 'Professional Services'],
    status: 'active',
    agreementType: 'SOW',
    contractValue: '$275,000.00 USD',
    effectiveDate: '2/1/2024',
    expirationDate: '7/31/2024',
    isAIAssisted: true,
  },
  {
    id: 'other-4',
    agreementId: 'MSA-2022-089',
    fileName: 'Summit Group - Master Agreement',
    fileStatus: 'completed',
    fileStatusDetail: 'Renewed',
    parties: ['Summit Group Holdings'],
    status: 'active',
    agreementType: 'MSA',
    effectiveDate: '6/1/2022',
    expirationDate: '5/31/2025',
    isAIAssisted: false,
  },
  {
    id: 'other-5',
    agreementId: 'OF-2024-033',
    fileName: 'Velocity Corp - Order Form Q1',
    fileStatus: 'completed',
    fileStatusDetail: 'Processed',
    parties: ['Velocity Corporation'],
    status: 'active',
    agreementType: 'Order Form',
    contractValue: '$450,000.00 USD',
    effectiveDate: '1/1/2024',
    expirationDate: '12/31/2024',
    isAIAssisted: false,
  },
  // Acme agreements (shown when user searches "Acme")
  {
    id: '1',
    agreementId: 'MSA-2022-001',
    fileName: 'Acme Corp - Master Services Agreement',
    fileStatus: 'completed',
    fileStatusDetail: 'Fully executed',
    parties: ['Acme Corporation', 'DocuSign Inc.'],
    status: 'active',
    agreementType: 'MSA',
    effectiveDate: '1/15/2022',
    expirationDate: '1/14/2027',
    isAIAssisted: true,
  },
  {
    id: '2',
    agreementId: 'OF-2024-001',
    fileName: 'Acme Corp - Order Form 2024',
    fileStatus: 'completed',
    fileStatusDetail: 'Annual renewal',
    parties: ['Acme Corporation'],
    status: 'active',
    agreementType: 'Order Form',
    contractValue: '$1,800,000.00 USD',
    effectiveDate: '1/1/2024',
    expirationDate: '12/31/2024',
    isAIAssisted: true,
  },
  {
    id: '3',
    agreementId: 'SOW-2024-001',
    fileName: 'Acme Corp - SOW Implementation Services',
    fileStatus: 'completed',
    fileStatusDetail: 'Phase 1 complete',
    parties: ['Acme Corporation', 'Professional Services'],
    status: 'active',
    agreementType: 'SOW',
    contractValue: '$450,000.00 USD',
    effectiveDate: '3/15/2024',
    expirationDate: '9/15/2024',
    isAIAssisted: true,
  },
  {
    id: '4',
    agreementId: 'AMD-2022-001',
    fileName: 'Acme Corp - Amendment #1 (Pricing)',
    fileStatus: 'completed',
    fileStatusDetail: 'Price adjustment',
    parties: ['Acme Corporation'],
    status: 'active',
    agreementType: 'Amendment',
    effectiveDate: '6/1/2022',
    isAIAssisted: false,
  },
  {
    id: '5',
    agreementId: 'AMD-2023-001',
    fileName: 'Acme Corp - Amendment #2 (Term Extension)',
    fileStatus: 'completed',
    fileStatusDetail: 'Extended term',
    parties: ['Acme Corporation'],
    status: 'active',
    agreementType: 'Amendment',
    effectiveDate: '1/15/2023',
    isAIAssisted: false,
  },
  {
    id: '6',
    agreementId: 'AMD-2024-001',
    fileName: 'Acme Corp - Amendment #3 (SLA Update)',
    fileStatus: 'completed',
    fileStatusDetail: 'SLA improvements',
    parties: ['Acme Corporation'],
    status: 'active',
    agreementType: 'Amendment',
    effectiveDate: '2/1/2024',
    isAIAssisted: true,
  },
  {
    id: '7',
    agreementId: 'NDA-2022-001',
    fileName: 'Acme Corp - Mutual NDA',
    fileStatus: 'completed',
    fileStatusDetail: 'Fully executed',
    parties: ['Acme Corporation', 'DocuSign Inc.'],
    status: 'active',
    agreementType: 'NDA',
    effectiveDate: '1/10/2022',
    expirationDate: '1/9/2025',
    isAIAssisted: false,
  },
  {
    id: '8',
    agreementId: 'DPA-2022-001',
    fileName: 'Acme Corp - Data Processing Agreement',
    fileStatus: 'completed',
    fileStatusDetail: 'GDPR compliant',
    parties: ['Acme Corporation'],
    status: 'active',
    agreementType: 'DPA',
    effectiveDate: '1/15/2022',
    isAIAssisted: true,
  },
  {
    id: '9',
    agreementId: 'OF-2023-001',
    fileName: 'Acme Corp - Order Form 2023',
    fileStatus: 'completed',
    fileStatusDetail: 'Superseded by 2024',
    parties: ['Acme Corporation'],
    status: 'inactive',
    statusDate: 'Superseded 12/31/2023',
    agreementType: 'Order Form',
    contractValue: '$1,500,000.00 USD',
    effectiveDate: '1/1/2023',
    expirationDate: '12/31/2023',
    isAIAssisted: false,
  },
  {
    id: '10',
    agreementId: 'SOW-2023-001',
    fileName: 'Acme Corp - SOW Consulting Services',
    fileStatus: 'completed',
    fileStatusDetail: 'Completed',
    parties: ['Acme Corporation', 'Consulting Team'],
    status: 'inactive',
    statusDate: 'Completed 12/15/2023',
    agreementType: 'SOW',
    contractValue: '$275,000.00 USD',
    effectiveDate: '6/1/2023',
    expirationDate: '12/15/2023',
    isAIAssisted: true,
  },
  {
    id: '11',
    agreementId: 'SLA-2024-001',
    fileName: 'Acme Corp - Service Level Agreement',
    fileStatus: 'completed',
    fileStatusDetail: 'Enhanced SLA',
    parties: ['Acme Corporation'],
    status: 'active',
    agreementType: 'SLA',
    effectiveDate: '2/1/2024',
    isAIAssisted: true,
  },
  {
    id: '12',
    agreementId: 'BAA-2022-001',
    fileName: 'Acme Corp - Business Associate Agreement',
    fileStatus: 'completed',
    fileStatusDetail: 'HIPAA compliant',
    parties: ['Acme Corporation'],
    status: 'active',
    agreementType: 'BAA',
    effectiveDate: '1/15/2022',
    isAIAssisted: false,
  },
  {
    id: '13',
    agreementId: 'OF-2022-001',
    fileName: 'Acme Corp - Order Form 2022',
    fileStatus: 'completed',
    fileStatusDetail: 'Initial order',
    parties: ['Acme Corporation'],
    status: 'inactive',
    statusDate: 'Superseded 12/31/2022',
    agreementType: 'Order Form',
    contractValue: '$1,200,000.00 USD',
    effectiveDate: '1/15/2022',
    expirationDate: '12/31/2022',
    isAIAssisted: false,
  },
  {
    id: '14',
    agreementId: 'SEC-2024-001',
    fileName: 'Acme Corp - Security Addendum',
    fileStatus: 'completed',
    fileStatusDetail: 'SOC2 requirements',
    parties: ['Acme Corporation'],
    status: 'active',
    agreementType: 'Addendum',
    effectiveDate: '3/1/2024',
    isAIAssisted: true,
  },
  {
    id: '15',
    agreementId: 'INS-2024-001',
    fileName: 'Acme Corp - Insurance Certificate',
    fileStatus: 'uploaded',
    fileStatusDetail: 'Annual renewal',
    parties: ['Acme Corporation', 'Insurance Provider'],
    status: 'active',
    agreementType: 'Certificate',
    effectiveDate: '1/1/2024',
    expirationDate: '12/31/2024',
    isAIAssisted: false,
  },
];

// =============================================================================
// Domain-Specific Prompts for Contract Analysis
// =============================================================================

export const QUICK_ACTIONS: ExtendedSuggestedAction[] = [
  {
    label: 'Summarize Prevailing Terms',
    description: 'Analyze all agreements to identify current governing terms',
    icon: 'document-stack',
    createdBy: 'Docusign',
    isSystem: true,
    expansion: {
      steps: [
        'ROLE: You are a Senior Legal Counsel and Procurement Specialist with expertise in contract architecture and risk mitigation.',
        'TASK: Analyze the provided set of documents (MSA, SOW, Addenda, SLAs, and DPA) to identify and summarize the prevailing terms and the Order of Precedence.',
        'OBJECTIVE: Create a structured summary that tells the procurement team exactly which rules govern the relationship and where conflicting terms exist.',
        'INSTRUCTIONS:',
        '1. Establish the Hierarchy: Define the Order of Precedence as stated in the documents. Which document governs in the event of a conflict?',
        '2. Extract Key Prevailing Clauses: Summarize the final, governing positions on the following "Big Five" areas:\n   • Limitation of Liability (LoL): Caps, exclusions, and super-caps\n   • Indemnification: Scope of coverage (IP, Third-party claims, Data breach)\n   • Termination: Convenience vs. Cause, notice periods, and exit fees\n   • Pricing & Payment: Net terms, price escalation clauses, and "most favored nation" status\n   • Data & IP: Ownership of deliverables vs. background IP',
        '3. Identify Amendment Trail: Track how each key term has evolved across Amendment #1 (Pricing), Amendment #2 (Term Extension), and Amendment #3 (SLA Update).',
        '4. Flag Conflicts: Note any provisions that contradict each other and require resolution per the Order of Precedence.',
        'OUTPUT FORMAT:',
        '• Executive Summary: A 3-sentence overview of the legal posture',
        '• Order of Precedence Table: A ranked list of document authority',
        '• Clause Matrix: A table showing the Topic, the Prevailing Term, and the Source Document with section citations',
      ],
      estimatedTime: '~30 seconds',
      documentsToAnalyze: 15,
    },
  },
  {
    label: 'Check for Conflicts',
    description: 'Find conflicting terms across agreements',
    icon: 'status-warn',
    createdBy: 'Docusign',
    isSystem: true,
    expansion: {
      steps: [
        'ROLE: You are a Contract Harmonization Specialist with expertise in multi-document agreement architecture and conflict resolution.',
        'TASK: Systematically compare all 15 documents to identify contradictory provisions, determine which terms govern, and recommend resolutions.',
        'OBJECTIVE: Produce a conflict resolution matrix that eliminates ambiguity and provides clear guidance on the controlling terms for each disputed area.',
        'INSTRUCTIONS:',
        '1. Establish Hierarchy:\n   • Locate Order of Precedence clause (MSA §2.1)\n   • Document the ranking: Amendments (reverse chronological) > SOWs > Order Forms > MSA\n   • Note any document-specific precedence overrides',
        '2. Systematic Comparison - Check each area for conflicts:\n   • IP Ownership: MSA §7.1 (Provider) vs SOW §5.3 (Customer for custom work)\n   • Termination Notice: MSA §12.2 (90 days) vs Amendment #2 §4 (120 days)\n   • SLA Levels: Original MSA (99.5%) vs Amendment #3 (99.9%)\n   • Support Hours: Original (8x5) vs Amendment #3 (24x7)\n   • Liability Caps: MSA general cap vs any SOW-specific limitations',
        '3. Resolution Analysis:\n   • For each conflict, cite both provisions with exact section references\n   • Apply the Order of Precedence to determine the governing term\n   • Document the rationale for resolution',
        "4. Ambiguity Identification:\n   • Flag provisions where precedence rules don't clearly resolve the conflict\n   • Note any silent amendments (terms not explicitly addressed in later documents)\n   • Identify terms that may require legal interpretation",
        'OUTPUT FORMAT:',
        '• Conflict Register: Numbered list of all identified conflicts\n• Resolution Matrix: Table showing Conflict | Document A Term | Document B Term | Governing Term | Rationale\n• Ambiguity Log: Unresolved items requiring legal review\n• Recommended Amendment Language: Specific clarifications for renewal',
      ],
      estimatedTime: '~40 seconds',
      documentsToAnalyze: 15,
    },
  },
  {
    label: 'Calculate Price Adjustment',
    description: 'Analyze renewal pricing rules and calculate adjustments',
    icon: 'currency-dollar',
    createdBy: 'Docusign',
    isSystem: true,
    expansion: {
      steps: [
        'ROLE: Contract Pricing Analyst',
        'TASK: Analyze price adjustment provisions',
        'OBJECTIVE: Summarize key pricing terms for renewal',
      ],
      estimatedTime: '~30 seconds',
      documentsToAnalyze: 12,
    },
  },
];

export const SUGGESTED_QUESTIONS = [
  'What is the current unit price for Acme?',
  'When does the Acme contract expire?',
  'Are there any conflicting terms across agreements?',
];

// =============================================================================
// No Sources State - Support Actions & Questions
// =============================================================================

/** Actions shown when no agreements are loaded */
export const SUPPORT_ACTIONS: ExtendedSuggestedAction[] = [
  {
    label: 'Learn about upcoming renewals',
    description: 'View agreements expiring soon and key renewal terms',
    icon: 'calendar',
    createdBy: 'Docusign',
    isSystem: true,
    actionType: 'auto-load-renewals', // Will auto-add renewal agreements as source
  },
  {
    label: 'Summarize agreements',
    description: 'Get a summary of selected contract terms',
    icon: 'document-stack',
    createdBy: 'Docusign',
    isSystem: true,
    actionType: 'select-source', // Will prompt user to select agreements
  },
  {
    label: 'What can Agreement Studio do?',
    description: 'Learn about AI-powered contract analysis',
    icon: 'lightbulb',
    createdBy: 'Docusign',
    isSystem: true,
    actionType: 'help',
  },
];

/** Questions shown when no agreements are loaded */
export const SUPPORT_QUESTIONS = [
  'How do I add agreements to analyze?',
  'What types of documents can I upload?',
  'Can I compare terms across multiple contracts?',
];

// =============================================================================
// Chat History - Named Conversations
// =============================================================================

export const CHAT_HISTORY: ChatHistoryData = {
  today: [{ id: '1', title: 'Acme Renewal Prep', time: '2:30 PM', messages: 8 }],
  yesterday: [
    { id: '2', title: 'Q4 Contract Review', time: '4:45 PM', messages: 12 },
    { id: '3', title: 'Vendor Compliance Check', time: '10:00 AM', messages: 6 },
  ],
  lastWeek: [
    { id: '4', title: 'Annual Pricing Analysis', time: 'Mon', messages: 15 },
    { id: '5', title: 'SLA Comparison Report', time: 'Fri', messages: 9 },
  ],
};

// Stored conversations for history - pre-loaded messages for each named conversation
export const STORED_CONVERSATIONS: Record<string, ChatMessage[]> = {
  '1': [], // Current session - starts empty for demo
  '2': [
    {
      id: 'stored-2-1',
      role: 'user',
      content: 'Review all Q4 contracts for renewal status',
      timestamp: new Date('2024-01-12T16:30:00'),
    },
    {
      id: 'stored-2-2',
      role: 'assistant',
      content:
        'I found 23 contracts with Q4 renewal dates. 15 are auto-renewing, 5 require renegotiation, and 3 have termination notices pending.',
      timestamp: new Date('2024-01-12T16:31:00'),
    },
  ],
  '3': [
    {
      id: 'stored-3-1',
      role: 'user',
      content: 'Check vendor compliance status',
      timestamp: new Date('2024-01-12T10:00:00'),
    },
    {
      id: 'stored-3-2',
      role: 'assistant',
      content:
        'All 8 active vendors are currently compliant. 2 certifications are expiring within 30 days and will need renewal verification.',
      timestamp: new Date('2024-01-12T10:01:00'),
    },
  ],
  '4': [
    {
      id: 'stored-4-1',
      role: 'user',
      content: 'Analyze pricing changes across all agreements',
      timestamp: new Date('2024-01-08T14:00:00'),
    },
    {
      id: 'stored-4-2',
      role: 'assistant',
      content:
        'Annual pricing analysis complete. Average price increase: 4.2%. 3 agreements have price protection clauses. Total annual spend: $4.2M.',
      timestamp: new Date('2024-01-08T14:02:00'),
    },
  ],
  '5': [
    {
      id: 'stored-5-1',
      role: 'user',
      content: 'Compare SLA terms across cloud providers',
      timestamp: new Date('2024-01-05T11:00:00'),
    },
    {
      id: 'stored-5-2',
      role: 'assistant',
      content:
        'SLA comparison across 4 cloud providers: Uptime guarantees range from 99.9% to 99.99%. Response times vary from 15 min to 4 hours for P1 issues.',
      timestamp: new Date('2024-01-05T11:03:00'),
    },
  ],
};

// =============================================================================
// Scripted AI Responses - Pre-built responses for demo scenarios
// =============================================================================

export const SCRIPTED_RESPONSES: Record<string, RichMessageData> = {
  'Summarize Prevailing Terms': {
    id: 'prevailing-terms-analysis',
    title: 'PREVAILING TERMS ANALYSIS',
    subtitle: 'Based on 15 Acme agreements',
    sections: [
      {
        id: 'financials',
        title: 'FINANCIALS',
        icon: 'currency-dollar',
        type: 'table',
        content: {
          headers: ['Term', 'Value', 'Source'],
          rows: [
            {
              cells: [
                'Unit Price',
                '$150/unit',
                {
                  text: 'Order Form 2024',
                  citation: {
                    id: 'cit-1',
                    documentId: '2',
                    documentTitle: 'Acme Corp - Order Form 2024',
                    section: '§3.1 Pricing',
                    excerpt:
                      'Unit pricing shall be One Hundred Fifty Dollars ($150.00) per unit, inclusive of standard support and maintenance. Volume discounts apply for orders exceeding 10,000 units per quarter.',
                  },
                },
              ],
            },
            {
              cells: [
                'Annual Minimum',
                '$500K',
                {
                  text: 'MSA §4.2',
                  citation: {
                    id: 'cit-2',
                    documentId: '1',
                    documentTitle: 'Acme Corp - Master Services Agreement',
                    section: '§4.2 Minimum Commitment',
                    excerpt:
                      'Customer commits to a minimum annual spend of Five Hundred Thousand Dollars ($500,000.00 USD) during each Contract Year, calculated on a cumulative basis across all Order Forms.',
                  },
                },
              ],
            },
            {
              cells: [
                'Payment Terms',
                'Net 30',
                {
                  text: 'Order Form 2024',
                  citation: {
                    id: 'cit-3',
                    documentId: '2',
                    documentTitle: 'Acme Corp - Order Form 2024',
                    section: '§5.1 Payment',
                    excerpt:
                      'All invoices are due and payable within thirty (30) days of the invoice date (Net 30). Late payments shall accrue interest at 1.5% per month or the maximum rate permitted by law.',
                  },
                },
              ],
            },
          ],
        },
      },
      {
        id: 'risk-liability',
        title: 'RISK & LIABILITY',
        icon: 'shield',
        type: 'list',
        content: [
          {
            text: 'Aggregate Cap: $2M',
            citation: {
              id: 'cit-4',
              documentId: '1',
              documentTitle: 'Acme Corp - Master Services Agreement',
              section: '§8.1 Limitation of Liability',
              excerpt:
                "IN NO EVENT SHALL EITHER PARTY'S AGGREGATE LIABILITY EXCEED TWO MILLION DOLLARS ($2,000,000.00 USD), EXCEPT FOR BREACHES OF CONFIDENTIALITY OR INDEMNIFICATION OBLIGATIONS.",
            },
          },
          {
            text: 'Indemnification: Mutual',
            citation: {
              id: 'cit-5',
              documentId: '1',
              documentTitle: 'Acme Corp - Master Services Agreement',
              section: '§9 Indemnification',
              excerpt:
                'Each party shall indemnify, defend, and hold harmless the other party from any third-party claims arising from (a) breach of this Agreement, (b) violation of applicable law, or (c) gross negligence or willful misconduct.',
            },
          },
          {
            text: 'IP Ownership: Customer retains',
            citation: {
              id: 'cit-6',
              documentId: '3',
              documentTitle: 'Acme Corp - SOW Implementation Services',
              section: '§5 Intellectual Property',
              excerpt:
                'All Customer Data and pre-existing Customer IP shall remain the sole property of Customer. Any custom developments created specifically for Customer under this SOW shall be assigned to Customer upon full payment.',
            },
          },
        ],
      },
      {
        id: 'key-changes',
        title: 'KEY CHANGES (2024)',
        icon: 'history',
        type: 'list',
        content: [
          {
            text: 'SLA uptime: 99.5% → 99.9%',
            citation: {
              id: 'cit-7',
              documentId: '6',
              documentTitle: 'Acme Corp - Amendment #3 (SLA Update)',
              section: '§2 Service Level Modifications',
              excerpt:
                'Section 6.1 of the MSA is hereby amended to increase the guaranteed uptime from ninety-nine point five percent (99.5%) to ninety-nine point nine percent (99.9%), with corresponding service credits.',
            },
          },
          {
            text: 'Support hours: 8x5 → 24x7',
            citation: {
              id: 'cit-8',
              documentId: '6',
              documentTitle: 'Acme Corp - Amendment #3 (SLA Update)',
              section: '§3 Support Enhancement',
              excerpt:
                'Standard support coverage is upgraded from business hours (8am-5pm, Monday-Friday) to twenty-four hours per day, seven days per week (24x7) at no additional charge, effective February 1, 2024.',
            },
          },
        ],
      },
    ],
  },
};

// =============================================================================
// Document Page Data for Citation Viewer (PDF-like mock pages)
// =============================================================================

export const DOCUMENT_PAGES: Record<string, DocumentPageData> = {
  'cit-1': {
    pageNumber: 3,
    totalPages: 12,
    sectionTitle: '3. PRICING AND PAYMENT',
    beforeText: `3.1 Unit Pricing

The following pricing shall apply to all Products and Services ordered under this Order Form during the Term:`,
    highlightedText: `Unit pricing shall be One Hundred Fifty Dollars ($150.00) per unit, inclusive of standard support and maintenance. Volume discounts apply for orders exceeding 10,000 units per quarter.`,
    afterText: `3.2 Volume Discounts

The following volume discount schedule shall apply:
• 10,000 - 24,999 units: 5% discount
• 25,000 - 49,999 units: 10% discount
• 50,000+ units: 15% discount

The pricing structure outlined in this Order Form supersedes all prior pricing arrangements. Pricing is subject to annual review and adjustment with 90-day written notice.`,
  },
  'cit-2': {
    pageNumber: 4,
    totalPages: 18,
    sectionTitle: '4. MINIMUM COMMITMENT',
    beforeText: `4.1 Annual Commitment

During each Contract Year, Customer agrees to maintain the following minimum purchase obligations:`,
    highlightedText: `Customer commits to a minimum annual spend of Five Hundred Thousand Dollars ($500,000.00 USD) during each Contract Year, calculated on a cumulative basis across all Order Forms.`,
    afterText: `4.2 Shortfall

In the event Customer fails to meet the minimum annual spend commitment, Provider may invoice Customer for the difference between actual spend and the minimum commitment at the end of the applicable Contract Year.

This minimum commitment ensures predictable revenue forecasting and enables Provider to allocate dedicated resources for Customer's account.`,
  },
  'cit-3': {
    pageNumber: 5,
    totalPages: 12,
    sectionTitle: '5. PAYMENT TERMS',
    beforeText: `5.1 Invoicing

Provider shall invoice Customer monthly in arrears for all Products and Services consumed during the preceding month.`,
    highlightedText: `All invoices are due and payable within thirty (30) days of the invoice date (Net 30). Late payments shall accrue interest at 1.5% per month or the maximum rate permitted by law.`,
    afterText: `5.2 Payment Methods

Electronic payment via ACH or wire transfer is preferred. Credit card payments are subject to a 3% processing fee.

5.3 Disputed Invoices

Customer must notify Provider of any invoice disputes within fifteen (15) days of receipt.`,
  },
  'cit-4': {
    pageNumber: 8,
    totalPages: 18,
    sectionTitle: '8. LIMITATION OF LIABILITY',
    beforeText: `8.1 Aggregate Cap

EXCEPT AS OTHERWISE PROVIDED IN SECTION 8.2 (EXCLUSIONS):`,
    highlightedText: `IN NO EVENT SHALL EITHER PARTY'S AGGREGATE LIABILITY EXCEED TWO MILLION DOLLARS ($2,000,000.00 USD), EXCEPT FOR BREACHES OF CONFIDENTIALITY OR INDEMNIFICATION OBLIGATIONS.`,
    afterText: `8.2 Exclusions

The limitations set forth in Section 8.1 shall not apply to:
(a) Breaches of confidentiality obligations under Section 7;
(b) Indemnification obligations under Section 9;
(c) Willful misconduct or gross negligence.

This limitation applies to all claims in the aggregate, whether in contract, tort, or otherwise, and survives termination of this Agreement.`,
  },
  'cit-5': {
    pageNumber: 9,
    totalPages: 18,
    sectionTitle: '9. INDEMNIFICATION',
    beforeText: `9.1 Mutual Indemnification

Subject to the terms and conditions of this Agreement:`,
    highlightedText: `Each party shall indemnify, defend, and hold harmless the other party from any third-party claims arising from (a) breach of this Agreement, (b) violation of applicable law, or (c) gross negligence or willful misconduct.`,
    afterText: `9.2 Indemnification Procedures

The indemnified party shall:
(a) Promptly notify the indemnifying party of any claim;
(b) Grant sole control of the defense to the indemnifying party;
(c) Provide reasonable cooperation and assistance.

Indemnification obligations are subject to prompt notice, sole control of defense, and reasonable cooperation between parties.`,
  },
  'cit-6': {
    pageNumber: 5,
    totalPages: 8,
    sectionTitle: '5. INTELLECTUAL PROPERTY',
    beforeText: `5.1 Customer Property

Customer Data and all pre-existing Customer intellectual property shall remain the sole property of Customer at all times.

5.2 Work Product`,
    highlightedText: `All Customer Data and pre-existing Customer IP shall remain the sole property of Customer. Any custom developments created specifically for Customer under this SOW shall be assigned to Customer upon full payment.`,
    afterText: `5.3 Provider Property

Provider retains ownership of all pre-existing IP, tools, methodologies, and general knowledge that are not specific to Customer's implementation.

5.4 License Grant

Provider grants Customer a perpetual, non-exclusive license to use any Provider IP embedded in the Deliverables.`,
  },
  'cit-7': {
    pageNumber: 2,
    totalPages: 4,
    sectionTitle: '2. SERVICE LEVEL MODIFICATIONS',
    beforeText: `2.1 Uptime Guarantee

Effective as of the Amendment Effective Date, Section 6.1 of the MSA is hereby amended as follows:`,
    highlightedText: `Section 6.1 of the MSA is hereby amended to increase the guaranteed uptime from ninety-nine point five percent (99.5%) to ninety-nine point nine percent (99.9%), with corresponding service credits.`,
    afterText: `2.2 Service Credits

The following service credit schedule shall apply:
• 99.9% - 99.5%: 10% credit
• 99.5% - 99.0%: 25% credit
• Below 99.0%: 50% credit

Uptime is measured monthly and excludes scheduled maintenance windows and force majeure events.`,
  },
  'cit-8': {
    pageNumber: 3,
    totalPages: 4,
    sectionTitle: '3. SUPPORT ENHANCEMENT',
    beforeText: `3.1 Support Hours

Effective as of the Amendment Effective Date, support coverage is enhanced as follows:`,
    highlightedText: `Standard support coverage is upgraded from business hours (8am-5pm, Monday-Friday) to twenty-four hours per day, seven days per week (24x7) at no additional charge, effective February 1, 2024.`,
    afterText: `3.2 Response Times

Priority response times remain unchanged:
• Critical (P1): 1 hour
• High (P2): 4 hours
• Normal (P3): 8 hours
• Low (P4): 24 hours

3.3 Support Channels

Support may be accessed via phone, email, or the online support portal.`,
  },
  // Price Adjustment Scenario - Step 0 Citations
  'cit-pa-1': {
    pageNumber: 4,
    totalPages: 6,
    sectionTitle: '4. PRICE ADJUSTMENTS',
    beforeText: `4.1 Annual Price Adjustment

Effective with each Contract Year renewal, the unit pricing set forth in applicable Order Forms may be adjusted as follows:`,
    highlightedText: `Price adjustments shall be the lesser of: (i) CPI-U annual change, (ii) 5% fixed tariff, or (iii) BLS Producer Price Index change.`,
    afterText: `4.2 Notification

Provider shall notify Customer of any price adjustment at least sixty (60) days prior to the start of each Contract Year.

4.3 Dispute Resolution

In the event of a dispute regarding the applicable price adjustment, the parties shall negotiate in good faith to resolve such dispute within thirty (30) days.`,
  },
  'cit-pa-2': {
    pageNumber: 11,
    totalPages: 18,
    sectionTitle: '11. TERM AND RENEWAL',
    beforeText: `11.1 Initial Term

The initial term of this Agreement shall commence on the Effective Date and continue for five (5) years unless terminated earlier in accordance with Section 12.

11.2 Automatic Renewal`,
    highlightedText: `This Agreement shall automatically renew on January 15 of each year unless terminated with 90 days written notice.`,
    afterText: `11.3 Effect of Renewal

Upon each renewal, the terms and conditions of this Agreement shall continue in full force and effect, subject to any price adjustments as set forth in Section 4 or applicable Amendments.

11.4 Renewal Notification

Provider shall send Customer a renewal reminder at least one hundred twenty (120) days prior to each renewal date.`,
  },
  'cit-pa-3': {
    pageNumber: 3,
    totalPages: 8,
    sectionTitle: '3. PRICING',
    beforeText: `3.1 Unit Pricing

For the 2024 Contract Year, the following pricing shall apply to all Products and Services ordered under this Order Form:`,
    highlightedText: `Unit price for Services shall be $1.20 per unit for the 2024 contract year.`,
    afterText: `3.2 Volume

Customer commits to ordering a minimum of 1,500,000 units during the 2024 Contract Year.

3.3 Volume Discounts

The following volume discount schedule shall apply for orders exceeding the minimum commitment:
• 1,500,001 - 2,000,000 units: 5% discount
• 2,000,001 - 2,500,000 units: 10% discount
• 2,500,001+ units: 15% discount`,
  },
  // Pricing History Citations (Step 1b)
  'cit-ph-1': {
    pageNumber: 3,
    totalPages: 6,
    sectionTitle: '3. PRICING',
    beforeText: `3.1 Unit Pricing

For the 2022 Contract Year, the following pricing shall apply to all Products and Services ordered under this Order Form:`,
    highlightedText: `Unit price for Services shall be $1.00 per unit for the 2022 contract year. Customer commits to ordering a minimum of 1,200,000 units.`,
    afterText: `3.2 Volume Discounts

The following volume discount schedule shall apply for orders exceeding the minimum commitment:
• 1,200,001 - 1,500,000 units: 5% discount
• 1,500,001 - 2,000,000 units: 10% discount

This represents the initial pricing structure established at contract commencement.`,
  },
  'cit-ph-2': {
    pageNumber: 3,
    totalPages: 6,
    sectionTitle: '3. PRICING',
    beforeText: `3.1 Unit Pricing

For the 2023 Contract Year, the following pricing shall apply to all Products and Services ordered under this Order Form:`,
    highlightedText: `Unit price for Services shall be $1.10 per unit for the 2023 contract year. Customer commits to ordering a minimum of 1,360,000 units.`,
    afterText: `3.2 Price Adjustment Rationale

The 10% price increase from $1.00 to $1.10 reflects:
• CPI-U annual change: 8.0%
• Applied rate: 10% (capped at tariff maximum per Amendment 2)

3.3 Volume Discounts

Same discount schedule as prior year applies.`,
  },
  'cit-ph-3': {
    pageNumber: 3,
    totalPages: 8,
    sectionTitle: '3. PRICING',
    beforeText: `3.1 Unit Pricing

For the 2024 Contract Year, the following pricing shall apply to all Products and Services ordered under this Order Form:`,
    highlightedText: `Unit price for Services shall be $1.20 per unit for the 2024 contract year. Customer commits to ordering a minimum of 1,500,000 units.`,
    afterText: `3.2 Price Adjustment Rationale

The 9.1% price increase from $1.10 to $1.20 reflects:
• CPI-U annual change: 4.1%
• BLS Producer Price Index: 3.2%
• Fixed tariff: 5%
• Applied rate: Minimum of above = 3.2% (rounded to $1.20)

3.3 Volume Commitment

Customer volume commitment increased to 1,500,000 units to reflect business growth.`,
  },

  // =============================================================================
  // Summarize Agreements Scenario Citations (cit-md-*)
  // =============================================================================
  'cit-md-1': {
    pageNumber: 3,
    totalPages: 12,
    sectionTitle: '3. PRICING AND PAYMENT',
    beforeText: `3.1 Unit Pricing

The following pricing shall apply to all Products and Services ordered under this Order Form during the Term:`,
    highlightedText: `Unit pricing shall be One Hundred Fifty Dollars ($150.00) per unit, inclusive of standard support and maintenance. Volume discounts apply for orders exceeding 10,000 units per quarter.`,
    afterText: `3.2 Volume Discounts

The following volume discount schedule shall apply:
• 10,000 - 24,999 units: 5% discount
• 25,000 - 49,999 units: 10% discount
• 50,000+ units: 15% discount

The pricing structure outlined in this Order Form supersedes all prior pricing arrangements.`,
  },
  'cit-md-2': {
    pageNumber: 4,
    totalPages: 18,
    sectionTitle: '4. MINIMUM COMMITMENT',
    beforeText: `4.1 Annual Commitment

During each Contract Year, Customer agrees to maintain the following minimum purchase obligations:`,
    highlightedText: `Customer commits to a minimum annual spend of Five Hundred Thousand Dollars ($500,000.00 USD) during each Contract Year, calculated on a cumulative basis across all Order Forms.`,
    afterText: `4.2 Shortfall

In the event Customer fails to meet the minimum annual spend commitment, Provider may invoice Customer for the difference between actual spend and the minimum commitment at the end of the applicable Contract Year.

This minimum commitment ensures predictable revenue forecasting and enables Provider to allocate dedicated resources.`,
  },
  'cit-md-3': {
    pageNumber: 5,
    totalPages: 12,
    sectionTitle: '5. PAYMENT TERMS',
    beforeText: `5.1 Invoicing

Provider shall invoice Customer monthly in arrears for all Products and Services consumed during the preceding month.`,
    highlightedText: `All invoices are due and payable within thirty (30) days of the invoice date (Net 30). Late payments shall accrue interest at 1.5% per month or the maximum rate permitted by law.`,
    afterText: `5.2 Payment Methods

Electronic payment via ACH or wire transfer is preferred. Credit card payments are subject to a 3% processing fee.

5.3 Disputed Invoices

Customer must notify Provider of any invoice disputes within fifteen (15) days of receipt.`,
  },
  'cit-md-4': {
    pageNumber: 8,
    totalPages: 18,
    sectionTitle: '8. LIMITATION OF LIABILITY',
    beforeText: `8.1 Aggregate Cap

EXCEPT AS OTHERWISE PROVIDED IN SECTION 8.2 (EXCLUSIONS):`,
    highlightedText: `IN NO EVENT SHALL EITHER PARTY'S AGGREGATE LIABILITY EXCEED TWO MILLION DOLLARS ($2,000,000.00 USD), EXCEPT FOR BREACHES OF CONFIDENTIALITY OR INDEMNIFICATION OBLIGATIONS.`,
    afterText: `8.2 Exclusions

The limitations set forth in Section 8.1 shall not apply to:
(a) Breaches of confidentiality obligations under Section 7;
(b) Indemnification obligations under Section 9;
(c) Willful misconduct or gross negligence.

This limitation applies to all claims in the aggregate, whether in contract, tort, or otherwise.`,
  },
  'cit-md-5': {
    pageNumber: 9,
    totalPages: 18,
    sectionTitle: '9. INDEMNIFICATION',
    beforeText: `9.1 Mutual Indemnification

Subject to the terms and conditions of this Agreement:`,
    highlightedText: `Each party shall indemnify, defend, and hold harmless the other party from any third-party claims arising from (a) breach of this Agreement, (b) violation of applicable law, or (c) gross negligence or willful misconduct.`,
    afterText: `9.2 Indemnification Procedures

The indemnified party shall:
(a) Promptly notify the indemnifying party of any claim;
(b) Grant sole control of the defense to the indemnifying party;
(c) Provide reasonable cooperation and assistance.

Indemnification obligations are subject to prompt notice and sole control of defense.`,
  },
  'cit-md-6': {
    pageNumber: 5,
    totalPages: 8,
    sectionTitle: '5. INTELLECTUAL PROPERTY',
    beforeText: `5.1 Customer Property

Customer Data and all pre-existing Customer intellectual property shall remain the sole property of Customer at all times.

5.2 Work Product`,
    highlightedText: `All Customer Data and pre-existing Customer IP shall remain the sole property of Customer. Any custom developments created specifically for Customer under this SOW shall be assigned to Customer upon full payment.`,
    afterText: `5.3 Provider Property

Provider retains ownership of all pre-existing IP, tools, methodologies, and general knowledge that are not specific to Customer's implementation.

5.4 License Grant

Provider grants Customer a perpetual, non-exclusive license to use any Provider IP embedded in the Deliverables.`,
  },
  'cit-md-7': {
    pageNumber: 2,
    totalPages: 4,
    sectionTitle: '2. SERVICE LEVEL MODIFICATIONS',
    beforeText: `2.1 Uptime Guarantee

Effective as of the Amendment Effective Date, Section 6.1 of the MSA is hereby amended as follows:`,
    highlightedText: `Section 6.1 of the MSA is hereby amended to increase the guaranteed uptime from ninety-nine point five percent (99.5%) to ninety-nine point nine percent (99.9%), with corresponding service credits.`,
    afterText: `2.2 Service Credits

The following service credit schedule shall apply:
• 99.9% - 99.5%: 10% credit
• 99.5% - 99.0%: 25% credit
• Below 99.0%: 50% credit

Uptime is measured monthly and excludes scheduled maintenance windows.`,
  },
  'cit-md-8': {
    pageNumber: 3,
    totalPages: 4,
    sectionTitle: '3. SUPPORT ENHANCEMENT',
    beforeText: `3.1 Support Hours

Effective as of the Amendment Effective Date, support coverage is enhanced as follows:`,
    highlightedText: `Standard support coverage is upgraded from business hours (8am-5pm, Monday-Friday) to twenty-four hours per day, seven days per week (24x7) at no additional charge, effective February 1, 2024.`,
    afterText: `3.2 Response Times

Priority response times remain unchanged:
• Critical (P1): 1 hour
• High (P2): 4 hours
• Normal (P3): 8 hours
• Low (P4): 24 hours

Support may be accessed via phone, email, or the online support portal.`,
  },

  // =============================================================================
  // Conflict Detection Citations (cit-md-conflict-*)
  // =============================================================================
  'cit-md-conflict-1': {
    pageNumber: 2,
    totalPages: 18,
    sectionTitle: '2. ORDER OF PRECEDENCE',
    beforeText: `2.1 Document Hierarchy

This Agreement may be supplemented by Order Forms, Statements of Work, and Amendments executed by both parties.`,
    highlightedText: `In the event of a conflict between documents, the following order of precedence shall apply: (1) Amendments, in reverse chronological order; (2) Statements of Work; (3) Order Forms; (4) this Master Services Agreement.`,
    afterText: `2.2 Interpretation

Each document shall be read harmoniously where possible. Only when provisions cannot be reconciled shall the order of precedence govern.

2.3 Entire Agreement

Together with all attachments and incorporated documents, this MSA constitutes the entire agreement between the parties.`,
  },
  'cit-md-conflict-2': {
    pageNumber: 1,
    totalPages: 4,
    sectionTitle: '1. EFFECT OF AMENDMENT',
    beforeText: `AMENDMENT NO. 2 TO MASTER SERVICES AGREEMENT

This Amendment No. 2 ("Amendment") is entered into as of March 15, 2023 by and between the parties to that certain Master Services Agreement dated January 15, 2022.`,
    highlightedText: `This Amendment modifies and supplements the Master Services Agreement dated January 15, 2022. In case of conflict, this Amendment shall prevail.`,
    afterText: `1.2 Continuing Effect

Except as expressly modified by this Amendment, the MSA shall remain in full force and effect.

1.3 Capitalized Terms

Capitalized terms used but not defined herein shall have the meanings assigned to them in the MSA.`,
  },

  // =============================================================================
  // Risk Assessment Citations (cit-risk-*)
  // =============================================================================
  'cit-risk-1': {
    pageNumber: 8,
    totalPages: 14,
    sectionTitle: '8. LIMITATION OF LIABILITY',
    beforeText: `8.1 Disclaimer

EXCEPT AS EXPRESSLY PROVIDED HEREIN, PROVIDER MAKES NO WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, OR STATUTORY.`,
    highlightedText: `Provider shall not be liable for any indirect, incidental, special, or consequential damages. No aggregate liability cap is specified under this Agreement.`,
    afterText: `8.2 Customer Acknowledgment

Customer acknowledges that Provider's services are provided "as is" and that Customer assumes all risks associated with the use of such services.

WARNING: The absence of a liability cap exposes Customer to unlimited potential damages.`,
  },
  'cit-risk-2': {
    pageNumber: 12,
    totalPages: 16,
    sectionTitle: '12. LIABILITY AND INDEMNIFICATION',
    beforeText: `12.1 General Indemnification

Each party agrees to indemnify the other for third-party claims arising from breach of this Agreement.

12.2 Special Provisions

In certain circumstances, the following enhanced provisions shall apply:`,
    highlightedText: `Notwithstanding any other provision of this Agreement, Customer acknowledges that Provider's liability shall be unlimited for breaches of this Agreement.`,
    afterText: `12.4 Insurance Requirements

Provider shall maintain comprehensive general liability insurance with minimum coverage of $5,000,000.

NOTE: Unlimited liability provisions are extremely unusual and represent significant risk exposure.`,
  },

  // =============================================================================
  // Table/Matrix Citations (cit-table-*)
  // =============================================================================
  'cit-table-1': {
    pageNumber: 8,
    totalPages: 14,
    sectionTitle: '8. LIMITATION OF LIABILITY',
    beforeText: `8.1 Disclaimer of Damages

TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW:`,
    highlightedText: `Provider shall not be liable for any indirect, incidental, special, or consequential damages. No aggregate liability cap is specified under this Agreement.`,
    afterText: `8.2 Acknowledgment

Customer acknowledges and agrees that the limitations of liability set forth in this Section 8 are fundamental to the Agreement and represent a fair allocation of risk.

RISK ASSESSMENT: HIGH - No liability cap specified`,
  },
  'cit-table-2': {
    pageNumber: 12,
    totalPages: 16,
    sectionTitle: '12. LIABILITY',
    beforeText: `12.1 Limitation

Subject to Section 12.2, each party's liability under this Agreement shall be limited as follows:

12.2 Exceptions

Notwithstanding Section 12.1:`,
    highlightedText: `Notwithstanding any other provision of this Agreement, Customer acknowledges that Provider's liability shall be unlimited for breaches of this Agreement.`,
    afterText: `12.3 Insurance

Provider shall maintain appropriate insurance coverage.

RISK ASSESSMENT: CRITICAL - Unlimited liability exposure`,
  },
  'cit-table-3': {
    pageNumber: 8,
    totalPages: 18,
    sectionTitle: '8. LIMITATION OF LIABILITY',
    beforeText: `8.1 Cap on Liability

EXCEPT FOR OBLIGATIONS UNDER SECTION 9 (INDEMNIFICATION) AND SECTION 10 (CONFIDENTIALITY):`,
    highlightedText: `Neither party's aggregate liability shall exceed two times (2x) the annual fees paid or payable under this Agreement in the twelve (12) months preceding the claim.`,
    afterText: `8.2 Exclusions

The following shall not be subject to the limitation in Section 8.1:
(a) Indemnification obligations;
(b) Breach of confidentiality;
(c) Intellectual property infringement.

RISK ASSESSMENT: MODERATE - Standard 2x annual fees cap`,
  },
  'cit-table-4': {
    pageNumber: 7,
    totalPages: 10,
    sectionTitle: '7. LIABILITY',
    beforeText: `7.1 Limitation of Liability

This Section 7 sets forth the entire liability of each party under this Data Processing Agreement.

7.2 Aggregate Cap`,
    highlightedText: `The total aggregate liability of either party under this Agreement shall not exceed Five Hundred Thousand Dollars ($500,000.00 USD).`,
    afterText: `7.3 Exclusions

The limitation in Section 7.2 shall not apply to:
(a) Data breaches caused by gross negligence;
(b) Violations of data protection laws;
(c) Unauthorized disclosure of personal data.

RISK ASSESSMENT: MODERATE - $500K cap is below industry standard for DPAs`,
  },
  'cit-table-5': {
    pageNumber: 6,
    totalPages: 8,
    sectionTitle: '6. LIMITATION OF LIABILITY',
    beforeText: `6.1 Damages

Neither party shall be liable for any indirect, incidental, special, punitive, or consequential damages.

6.2 Maximum Liability`,
    highlightedText: `The maximum aggregate liability of either party for any claims arising under this Agreement shall be One Million Dollars ($1,000,000.00 USD).`,
    afterText: `6.3 Survival

The limitations of liability set forth in this Section 6 shall survive termination or expiration of this Agreement.

RISK ASSESSMENT: LOW - $1M cap is appropriate for NDA scope`,
  },
  'cit-table-6': {
    pageNumber: 9,
    totalPages: 12,
    sectionTitle: '9. LIABILITY',
    beforeText: `9.1 Limitation

Subject to Section 9.2 (Exclusions), the liability of each party under this Statement of Work shall be limited as set forth below.

9.1.1 Aggregate Cap`,
    highlightedText: `Provider's total liability under this SOW shall not exceed Two Million Dollars ($2,000,000.00 USD) in the aggregate.`,
    afterText: `9.2 Exclusions

The limitation in Section 9.1 shall not apply to:
(a) Gross negligence or willful misconduct;
(b) Breach of confidentiality obligations;
(c) Infringement of intellectual property rights.

RISK ASSESSMENT: LOW - $2M cap is appropriate for SOW value`,
  },
};

// =============================================================================
// Conflict Detection Data - Pre-built conflict responses
// =============================================================================

export const CONFLICT_RESPONSES: Record<string, ConflictData[]> = {
  'Check for Conflicts': [
    {
      id: 'conflict-ip-ownership',
      title: 'IP Ownership',
      description: 'Conflicting intellectual property ownership terms found between MSA and SOW',
      clauses: [
        {
          documentId: '1',
          documentTitle: 'MSA §7.1',
          section: 'Intellectual Property Rights',
          text: '"All Intellectual Property created, developed, or discovered by Provider in the course of performing Services shall be owned exclusively by Provider, with Customer receiving a perpetual, non-exclusive license to use such IP..."',
        },
        {
          documentId: '3',
          documentTitle: 'SOW 2024 §5.3',
          section: 'Work Product Ownership',
          text: '"Customer shall retain sole and exclusive ownership of all Work Product, including any custom developments, integrations, or deliverables created specifically for Customer under this Statement of Work..."',
        },
      ],
      recommendation: 'SOW takes precedence per MSA §2.1 (Order of Precedence)',
      recommendationCitation: {
        id: 'cit-conflict-1',
        documentId: '1',
        documentTitle: 'Acme Corp - Master Services Agreement',
        section: '§2.1 Order of Precedence',
        excerpt:
          'In the event of a conflict between documents, the following order of precedence shall apply: (1) Amendments, in reverse chronological order; (2) Statements of Work; (3) Order Forms; (4) this Master Services Agreement.',
      },
    },
    {
      id: 'conflict-termination',
      title: 'Termination Notice Period',
      description: 'Different termination notice requirements in MSA vs Amendment',
      clauses: [
        {
          documentId: '1',
          documentTitle: 'MSA §12.2',
          section: 'Termination for Convenience',
          text: '"Either party may terminate this Agreement for convenience upon ninety (90) days prior written notice to the other party..."',
        },
        {
          documentId: '5',
          documentTitle: 'Amendment #2 §4',
          section: 'Modified Termination',
          text: '"Section 12.2 is hereby modified to require one hundred twenty (120) days prior written notice for termination for convenience..."',
        },
      ],
      recommendation: 'Amendment #2 supersedes MSA - 120 days notice required',
      recommendationCitation: {
        id: 'cit-conflict-2',
        documentId: '5',
        documentTitle: 'Acme Corp - Amendment #2',
        section: '§1 Effect of Amendment',
        excerpt:
          'This Amendment modifies and supplements the Master Services Agreement dated January 15, 2022. In case of conflict, this Amendment shall prevail.',
      },
    },
  ],
};

// =============================================================================
// Markdown Responses - Simplified AI responses using markdown formatting
// =============================================================================

export const MARKDOWN_RESPONSES: Record<string, MarkdownResponseData> = {
  'Summarize Prevailing Terms': {
    content: `## Prevailing Terms Analysis
*Based on 15 Acme agreements*

### Financials

| Term | Value | Source |
|------|-------|--------|
| Unit Price | $150/unit | [Order Form 2024 §3.1]¹ |
| Annual Minimum | $500K | [MSA §4.2]² |
| Payment Terms | Net 30 | [Order Form 2024 §5.1]³ |

### Risk & Liability

- **Aggregate Cap:** $2M [MSA §8.1]⁴
- **Indemnification:** Mutual [MSA §9]⁵
- **IP Ownership:** Customer retains [SOW §5]⁶

### Key Changes (2024)

- SLA uptime: 99.5% → **99.9%** [Amendment #3 §2]⁷
- Support hours: 8x5 → **24x7** [Amendment #3 §3]⁸

---
*8 citations from 4 documents*`,
    citations: {
      '1': {
        id: 'cit-md-1',
        documentId: '2',
        documentTitle: 'Acme Corp - Order Form 2024',
        section: '§3.1 Pricing',
        excerpt:
          'Unit pricing shall be One Hundred Fifty Dollars ($150.00) per unit, inclusive of standard support and maintenance. Volume discounts apply for orders exceeding 10,000 units per quarter.',
      },
      '2': {
        id: 'cit-md-2',
        documentId: '1',
        documentTitle: 'Acme Corp - Master Services Agreement',
        section: '§4.2 Minimum Commitment',
        excerpt:
          'Customer commits to a minimum annual spend of Five Hundred Thousand Dollars ($500,000.00 USD) during each Contract Year, calculated on a cumulative basis across all Order Forms.',
      },
      '3': {
        id: 'cit-md-3',
        documentId: '2',
        documentTitle: 'Acme Corp - Order Form 2024',
        section: '§5.1 Payment',
        excerpt:
          'All invoices are due and payable within thirty (30) days of the invoice date (Net 30). Late payments shall accrue interest at 1.5% per month or the maximum rate permitted by law.',
      },
      '4': {
        id: 'cit-md-4',
        documentId: '1',
        documentTitle: 'Acme Corp - Master Services Agreement',
        section: '§8.1 Limitation of Liability',
        excerpt:
          "IN NO EVENT SHALL EITHER PARTY'S AGGREGATE LIABILITY EXCEED TWO MILLION DOLLARS ($2,000,000.00 USD), EXCEPT FOR BREACHES OF CONFIDENTIALITY OR INDEMNIFICATION OBLIGATIONS.",
      },
      '5': {
        id: 'cit-md-5',
        documentId: '1',
        documentTitle: 'Acme Corp - Master Services Agreement',
        section: '§9 Indemnification',
        excerpt:
          'Each party shall indemnify, defend, and hold harmless the other party from any third-party claims arising from (a) breach of this Agreement, (b) violation of applicable law, or (c) gross negligence or willful misconduct.',
      },
      '6': {
        id: 'cit-md-6',
        documentId: '3',
        documentTitle: 'Acme Corp - SOW Implementation Services',
        section: '§5 Intellectual Property',
        excerpt:
          'All Customer Data and pre-existing Customer IP shall remain the sole property of Customer. Any custom developments created specifically for Customer under this SOW shall be assigned to Customer upon full payment.',
      },
      '7': {
        id: 'cit-md-7',
        documentId: '6',
        documentTitle: 'Acme Corp - Amendment #3 (SLA Update)',
        section: '§2 Service Level Modifications',
        excerpt:
          'Section 6.1 of the MSA is hereby amended to increase the guaranteed uptime from ninety-nine point five percent (99.5%) to ninety-nine point nine percent (99.9%), with corresponding service credits.',
      },
      '8': {
        id: 'cit-md-8',
        documentId: '6',
        documentTitle: 'Acme Corp - Amendment #3 (SLA Update)',
        section: '§3 Support Enhancement',
        excerpt:
          'Standard support coverage is upgraded from business hours (8am-5pm, Monday-Friday) to twenty-four hours per day, seven days per week (24x7) at no additional charge, effective February 1, 2024.',
      },
    },
  },
  'Check for Conflicts': {
    content: `## Conflict Analysis
*Found 2 conflicts across 15 Acme agreements*

---

### ⚠️ Conflict 1: IP Ownership

**MSA §7.1** — *Intellectual Property Rights*
> "All Intellectual Property created by Provider shall be owned exclusively by Provider, with Customer receiving a perpetual, non-exclusive license..."

**SOW 2024 §5.3** — *Work Product Ownership*
> "Customer shall retain sole and exclusive ownership of all Work Product, including custom developments created specifically for Customer..."

**Resolution:** SOW takes precedence per MSA §2.1 (Order of Precedence) [¹]

---

### ⚠️ Conflict 2: Termination Notice Period

**MSA §12.2** — *Termination for Convenience*
> "Either party may terminate this Agreement for convenience upon ninety (90) days prior written notice..."

**Amendment #2 §4** — *Modified Termination*
> "Section 12.2 is hereby modified to require one hundred twenty (120) days prior written notice..."

**Resolution:** Amendment #2 supersedes MSA — **120 days notice required** [²]

---
*2 citations*`,
    citations: {
      '1': {
        id: 'cit-md-conflict-1',
        documentId: '1',
        documentTitle: 'Acme Corp - Master Services Agreement',
        section: '§2.1 Order of Precedence',
        excerpt:
          'In the event of a conflict between documents, the following order of precedence shall apply: (1) Amendments, in reverse chronological order; (2) Statements of Work; (3) Order Forms; (4) this Master Services Agreement.',
      },
      '2': {
        id: 'cit-md-conflict-2',
        documentId: '5',
        documentTitle: 'Acme Corp - Amendment #2',
        section: '§1 Effect of Amendment',
        excerpt:
          'This Amendment modifies and supplements the Master Services Agreement dated January 15, 2022. In case of conflict, this Amendment shall prevail.',
      },
    },
  },
  'Calculate Price Adjustment': {
    content: `## Acme Corp - Renewal Pricing Analysis

*Analysis of 12 agreements for pricing and renewal terms*

### Key Terms

- **Price Increase Provisions:** Amendment 2 §4.1 establishes a "minimum of three indices" methodology [¹]
- **Renewal Dates:** Auto-renewal on January 15 annually per MSA §11.2 [²]
- **Volume Commitment:** 1,500,000 units annually

### Pricing Methodology

Per Amendment 2, price adjustments are calculated as the **minimum** of:
1. CPI-U annual change
2. 5% fixed tariff
3. BLS Producer Price Index

### Pricing History

| Order Form | Year | Unit Price | Volume | Total Value |
|------------|------|------------|--------|-------------|
| [OF-2022]³ | 2022 | $1.00 | 1.2M units | $1,200,000 |
| [OF-2023]⁴ | 2023 | $1.10 | 1.36M units | $1,500,000 |
| [OF-2024]⁵ | 2024 | $1.20 | 1.5M units | $1,800,000 |

**Current Base Price:** $1.20/unit • **3-Year Growth:** +20% ($1.00 → $1.20)

---

*Would you like me to fetch the current CPI-U and BLS Producer Price Index rates to calculate the 2026 adjustment?*`,
    thinkingSteps: [
      {
        id: '1',
        action: 'Scanning 15 Acme Corp agreements for pricing clauses',
        result:
          'Found 4 documents with pricing terms: Master Services Agreement, Amendment #2, and Order Forms from 2022-2024.',
      },
      {
        id: '2',
        action: 'Checking Amendment #2 §4.1',
        result:
          'This section specifies a "minimum of three indices" formula—the adjustment must be the lesser of CPI-U, a 5% cap, or the BLS Producer Price Index.',
      },
      {
        id: '3',
        action: 'Extracting pricing history from Order Forms',
        result:
          'Compiled 3-year pricing trend: $1.00 (2022) → $1.10 (2023) → $1.20 (2024). Current rate is $1.20/unit with 1.5M annual volume.',
      },
    ],
    citations: {
      '1': {
        id: 'cit-pa-1',
        documentId: '5',
        documentTitle: 'Acme Corp - Amendment #2 (Term Extension)',
        section: '§4.1 Price Adjustments',
        excerpt:
          'Price adjustments shall be the lesser of: (i) CPI-U annual change, (ii) 5% fixed tariff, or (iii) BLS Producer Price Index change.',
      },
      '2': {
        id: 'cit-pa-2',
        documentId: '1',
        documentTitle: 'Acme Corp - Master Services Agreement',
        section: '§11.2 Renewal',
        excerpt:
          'This Agreement shall automatically renew on January 15 of each year unless terminated with 90 days written notice.',
      },
      '3': {
        id: 'cit-ph-1',
        documentId: '13',
        documentTitle: 'Acme Corp - Order Form 2022',
        section: '§3.1 Unit Pricing',
        excerpt:
          'Unit price for Services shall be $1.00 per unit for the 2022 contract year. Customer commits to ordering a minimum of 1,200,000 units.',
      },
      '4': {
        id: 'cit-ph-2',
        documentId: '9',
        documentTitle: 'Acme Corp - Order Form 2023',
        section: '§3.1 Unit Pricing',
        excerpt:
          'Unit price for Services shall be $1.10 per unit for the 2023 contract year. Customer commits to ordering a minimum of 1,360,000 units.',
      },
      '5': {
        id: 'cit-ph-3',
        documentId: '2',
        documentTitle: 'Acme Corp - Order Form 2024',
        section: '§3.1 Unit Pricing',
        excerpt:
          'Unit price for Services shall be $1.20 per unit for the 2024 contract year. Customer commits to ordering a minimum of 1,500,000 units.',
      },
    },
  },
  // Step 3: Calculation results - triggered by "sure", "search", "calculate", etc.
  sure: {
    content: `## 2026 Price Calculation

*Based on current economic indices (as of January 2026)*

I found the latest rates from the Bureau of Labor Statistics:
- **CPI-U Annual Change:** 3.2%
- **BLS Producer Price Index:** 2.8%
- **Fixed Tariff Cap:** 5.0% (per Amendment 2)

### Calculation Results

| Method | Rate | New Price | Annual Increase |
|--------|------|-----------|-----------------|
| BLS Producer Price Index | 2.8% | $1.234 | +$0.034/unit |
| CPI-U | 3.2% | $1.238 | +$0.038/unit |
| Fixed Tariff Cap | 5.0% | $1.260 | +$0.060/unit |

### Recommendation

Per Amendment 2 §4.1, the price adjustment must be the **minimum** of all three methods. [⁷]

**Recommended 2026 Unit Price: $1.234**

This represents a **2.8% increase** from the current $1.20/unit, using the BLS Producer Price Index method.

| | 2025 | 2026 | Change |
|--|------|------|--------|
| Unit Price | $1.20 | $1.234 | +2.8% |
| Annual Value (1.5M units) | $1,800,000 | $1,851,000 | +$51,000 |

---

*Would you like me to draft an amendment with this pricing for your review?*`,
    thinkingSteps: [
      {
        id: '1',
        action: 'Fetching BLS Producer Price Index (Dec 2025)',
        result:
          'The Bureau of Labor Statistics reports a 2.8% year-over-year change in the Producer Price Index for industrial commodities.',
      },
      {
        id: '2',
        action: 'Fetching CPI-U Annual Change (Dec 2025)',
        result:
          'Consumer Price Index for All Urban Consumers shows a 3.2% annual change, reflecting broader inflation trends.',
      },
      {
        id: '3',
        action: 'Applying Amendment #2 §4.1 formula',
        result:
          'Per the contract, the adjustment is the minimum of: CPI-U (3.2%), the 5% cap, or PPI (2.8%). The PPI rate of 2.8% is the lowest and governs.',
      },
      {
        id: '4',
        action: 'Calculating new unit price',
        result:
          'Applying 2.8% to the current $1.20/unit rate yields $1.234/unit. This represents an increase of $0.034 per unit, or approximately $51,000 annually at current volumes.',
      },
    ],
    citations: {
      '7': {
        id: 'cit-calc-1',
        documentId: '5',
        documentTitle: 'Acme Corp - Amendment #2 (Term Extension)',
        section: '§4.1 Price Adjustments',
        excerpt:
          'Annual price adjustments shall be calculated as the lesser of: (i) the annual percentage change in the Consumer Price Index for All Urban Consumers (CPI-U), (ii) five percent (5%), or (iii) the annual percentage change in the Bureau of Labor Statistics Producer Price Index.',
      },
    },
  },
  // Aliases for calculation trigger
  search: {
    content: `## 2026 Price Calculation

*Based on current economic indices (as of January 2026)*

I found the latest rates from the Bureau of Labor Statistics:
- **CPI-U Annual Change:** 3.2%
- **BLS Producer Price Index:** 2.8%
- **Fixed Tariff Cap:** 5.0% (per Amendment 2)

### Calculation Results

| Method | Rate | New Price | Annual Increase |
|--------|------|-----------|-----------------|
| BLS Producer Price Index | 2.8% | $1.234 | +$0.034/unit |
| CPI-U | 3.2% | $1.238 | +$0.038/unit |
| Fixed Tariff Cap | 5.0% | $1.260 | +$0.060/unit |

### Recommendation

Per Amendment 2 §4.1, the price adjustment must be the **minimum** of all three methods. [⁷]

**Recommended 2026 Unit Price: $1.234**

This represents a **2.8% increase** from the current $1.20/unit, using the BLS Producer Price Index method.

| | 2025 | 2026 | Change |
|--|------|------|--------|
| Unit Price | $1.20 | $1.234 | +2.8% |
| Annual Value (1.5M units) | $1,800,000 | $1,851,000 | +$51,000 |

---

*Would you like me to draft an amendment with this pricing for your review?*`,
    citations: {
      '7': {
        id: 'cit-calc-1',
        documentId: '5',
        documentTitle: 'Acme Corp - Amendment #2 (Term Extension)',
        section: '§4.1 Price Adjustments',
        excerpt:
          'Annual price adjustments shall be calculated as the lesser of: (i) the annual percentage change in the Consumer Price Index for All Urban Consumers (CPI-U), (ii) five percent (5%), or (iii) the annual percentage change in the Bureau of Labor Statistics Producer Price Index.',
      },
    },
  },
  calculate: {
    content: `## 2026 Price Calculation

*Based on current economic indices (as of January 2026)*

I found the latest rates from the Bureau of Labor Statistics:
- **CPI-U Annual Change:** 3.2%
- **BLS Producer Price Index:** 2.8%
- **Fixed Tariff Cap:** 5.0% (per Amendment 2)

### Calculation Results

| Method | Rate | New Price | Annual Increase |
|--------|------|-----------|-----------------|
| BLS Producer Price Index | 2.8% | $1.234 | +$0.034/unit |
| CPI-U | 3.2% | $1.238 | +$0.038/unit |
| Fixed Tariff Cap | 5.0% | $1.260 | +$0.060/unit |

### Recommendation

Per Amendment 2 §4.1, the price adjustment must be the **minimum** of all three methods. [⁷]

**Recommended 2026 Unit Price: $1.234**

This represents a **2.8% increase** from the current $1.20/unit, using the BLS Producer Price Index method.

| | 2025 | 2026 | Change |
|--|------|------|--------|
| Unit Price | $1.20 | $1.234 | +2.8% |
| Annual Value (1.5M units) | $1,800,000 | $1,851,000 | +$51,000 |

---

*Would you like me to draft an amendment with this pricing for your review?*`,
    citations: {
      '7': {
        id: 'cit-calc-1',
        documentId: '5',
        documentTitle: 'Acme Corp - Amendment #2 (Term Extension)',
        section: '§4.1 Price Adjustments',
        excerpt:
          'Annual price adjustments shall be calculated as the lesser of: (i) the annual percentage change in the Consumer Price Index for All Urban Consumers (CPI-U), (ii) five percent (5%), or (iii) the annual percentage change in the Bureau of Labor Statistics Producer Price Index.',
      },
    },
  },
  // Alias "yes" to trigger calculation (after combined step 1)
  yes: {
    content: `## 2026 Price Calculation

*Based on current economic indices (as of January 2026)*

I found the latest rates from the Bureau of Labor Statistics:
- **CPI-U Annual Change:** 3.2%
- **BLS Producer Price Index:** 2.8%
- **Fixed Tariff Cap:** 5.0% (per Amendment 2)

### Calculation Results

| Method | Rate | New Price | Annual Increase |
|--------|------|-----------|-----------------|
| BLS Producer Price Index | 2.8% | $1.234 | +$0.034/unit |
| CPI-U | 3.2% | $1.238 | +$0.038/unit |
| Fixed Tariff Cap | 5.0% | $1.260 | +$0.060/unit |

### Recommendation

Per Amendment 2 §4.1, the price adjustment must be the **minimum** of all three methods. [⁷]

**Recommended 2026 Unit Price: $1.234**

This represents a **2.8% increase** from the current $1.20/unit, using the BLS Producer Price Index method.

| | 2025 | 2026 | Change |
|--|------|------|--------|
| Unit Price | $1.20 | $1.234 | +2.8% |
| Annual Value (1.5M units) | $1,800,000 | $1,851,000 | +$51,000 |

---

*Would you like me to draft an amendment with this pricing for your review?*`,
    thinkingSteps: [
      {
        id: '1',
        action: 'Fetching BLS Producer Price Index (Dec 2025)',
        result:
          'The Bureau of Labor Statistics reports a 2.8% year-over-year change in the Producer Price Index for industrial commodities.',
      },
      {
        id: '2',
        action: 'Fetching CPI-U Annual Change (Dec 2025)',
        result:
          'Consumer Price Index for All Urban Consumers shows a 3.2% annual change, reflecting broader inflation trends.',
      },
      {
        id: '3',
        action: 'Applying Amendment #2 §4.1 formula',
        result:
          'Per the contract, the adjustment is the minimum of: CPI-U (3.2%), the 5% cap, or PPI (2.8%). The PPI rate of 2.8% is the lowest and governs.',
      },
      {
        id: '4',
        action: 'Calculating new unit price',
        result:
          'Applying 2.8% to the current $1.20/unit rate yields $1.234/unit. This represents an increase of $0.034 per unit, or approximately $51,000 annually at current volumes.',
      },
    ],
    citations: {
      '7': {
        id: 'cit-calc-1',
        documentId: '5',
        documentTitle: 'Acme Corp - Amendment #2 (Term Extension)',
        section: '§4.1 Price Adjustments',
        excerpt:
          'Annual price adjustments shall be calculated as the lesser of: (i) the annual percentage change in the Consumer Price Index for All Urban Consumers (CPI-U), (ii) five percent (5%), or (iii) the annual percentage change in the Bureau of Labor Statistics Producer Price Index.',
      },
    },
  },
  // Step 3: Draft Amendment - triggered after calculation results
  draft: {
    content: `I've prepared a draft amendment incorporating the 2026 pricing adjustment. The document includes all required terms based on your existing agreements.`,
    thinkingSteps: [
      {
        id: '1',
        action: 'Loading Amendment template',
        result:
          'Using the Acme Corp standard amendment format, which includes required sections for pricing, effective dates, and signature blocks.',
      },
      {
        id: '2',
        action: 'Linking to parent agreement',
        result:
          'Established reference to Master Services Agreement MSA-2022-001 and all prior amendments to maintain the amendment chain.',
      },
      {
        id: '3',
        action: 'Applying pricing terms',
        result:
          'Populated pricing section with new unit price of $1.234 (2.8% increase per PPI methodology) effective January 1, 2026.',
      },
      {
        id: '4',
        action: 'Generating PDF preview',
        result:
          'Amendment #4 is ready for review. The document follows your standard format and can be sent for signature once approved.',
      },
    ],
    citations: {},
    documentPreview: {
      title: 'Amendment #4 - Price Adjustment (2026)',
      label: 'Draft Amendment',
      status: 'Ready for Review',
      details: [
        { label: 'Effective Date', value: 'January 15, 2026' },
        { label: 'New Unit Price', value: '$1.234/unit' },
        { label: 'Adjustment Method', value: 'BLS Producer Price Index (2.8%)' },
        { label: 'Reference', value: 'Amendment 2 §4.1' },
      ],
      documentId: 'draft-amendment-4',
    },
    afterContent: `*Would you like me to create a ticket to track this price adjustment request?*`,
  },

  // Step 5: Create Ticket - triggered when user confirms ticket creation
  'create ticket': {
    content: `Done! I've created a ticket to track this price adjustment request.

## Ticket Created

**PROC-2026-0142** — Acme Corp Annual Price Adjustment (2026)

| Field | Value |
|-------|-------|
| **Status** | Open |
| **Priority** | Medium |
| **Assignee** | Akshat Mishra |
| **Due Date** | January 10, 2026 |
| **Related Agreement** | MSA-2022-001 |`,
    afterContent: `### Description
Annual price adjustment for Acme Corp per Amendment #2 §4.1. New unit price of $1.234/unit (2.8% increase) effective January 15, 2026. Draft amendment prepared and ready for review.

### Attachments
- Amendment #4 - Price Adjustment (2026) [Draft]
- Price Calculation Worksheet`,
    thinkingSteps: [
      {
        id: '1',
        action: 'Creating ticket in Agreement Desk',
        result: 'Generated ticket ID PROC-2026-0142 with standard Agreement Desk workflow.',
      },
      {
        id: '2',
        action: 'Linking related documents',
        result: 'Attached draft Amendment #4 and price calculation details to the ticket.',
      },
      {
        id: '3',
        action: 'Setting due date',
        result:
          'Due date set to January 10, 2026 (5 days before effective date) to allow time for signatures.',
      },
      {
        id: '4',
        action: 'Assigning ticket',
        result: 'Assigned to Akshat Mishra based on agreement ownership in the system.',
      },
    ],
    citations: {},
    customAction: {
      label: 'Open Ticket',
      icon: 'arrow-external',
    },
  },

  // Alias for "yes" response to ticket creation
  'yes create ticket': {
    content: `Done! I've created a ticket to track this price adjustment request.

## Ticket Created

**PROC-2026-0142** — Acme Corp Annual Price Adjustment (2026)

| Field | Value |
|-------|-------|
| **Status** | Open |
| **Priority** | Medium |
| **Assignee** | Akshat Mishra |
| **Due Date** | January 10, 2026 |
| **Related Agreement** | MSA-2022-001 |`,
    afterContent: `### Description
Annual price adjustment for Acme Corp per Amendment #2 §4.1. New unit price of $1.234/unit (2.8% increase) effective January 15, 2026. Draft amendment prepared and ready for review.

### Attachments
- Amendment #4 - Price Adjustment (2026) [Draft]
- Price Calculation Worksheet`,
    thinkingSteps: [
      {
        id: '1',
        action: 'Creating ticket in Agreement Desk',
        result: 'Generated ticket ID PROC-2026-0142 with standard Agreement Desk workflow.',
      },
      {
        id: '2',
        action: 'Linking related documents',
        result: 'Attached draft Amendment #4 and price calculation details to the ticket.',
      },
      {
        id: '3',
        action: 'Setting due date',
        result:
          'Due date set to January 10, 2026 (5 days before effective date) to allow time for signatures.',
      },
      {
        id: '4',
        action: 'Assigning ticket',
        result: 'Assigned to Akshat Mishra based on agreement ownership in the system.',
      },
    ],
    citations: {},
    customAction: {
      label: 'Open Ticket',
      icon: 'arrow-external',
    },
  },

  // =============================================================================
  // Risk Assessment Journey - 4-turn progressive analysis
  // =============================================================================

  // Turn 1: Prose answer about liability exposure
  "What's my liability exposure?": {
    content: `## Liability Exposure Summary

Your total capped liability is **$4.2M** across 13 vendor contracts. However, **2 contracts have uncapped liability** that need immediate attention:

- **Globex SaaS Agreement** — §8.1 has no aggregate cap [¹]
- **Initech Cloud Services** — §12.3 explicitly states "unlimited liability" [²]

These represent significant risk as there's no ceiling on potential damages.

### Quick Stats

- **Capped contracts:** 11 (ranging from $500K to $2M)
- **Uncapped contracts:** 2 (⚠️ high risk)
- **Average cap:** $1.2M per agreement

---

*Would you like me to show you the full breakdown by document?*`,
    citations: {
      '1': {
        id: 'cit-risk-1',
        documentId: 'globex-saas',
        documentTitle: 'Globex SaaS Agreement',
        section: '§8.1 Limitation of Liability',
        excerpt:
          'Provider shall not be liable for any indirect, incidental, special, or consequential damages. No aggregate liability cap is specified under this Agreement.',
      },
      '2': {
        id: 'cit-risk-2',
        documentId: 'initech-cloud',
        documentTitle: 'Initech Cloud Services Agreement',
        section: '§12.3 Liability',
        excerpt:
          "Notwithstanding any other provision of this Agreement, Customer acknowledges that Provider's liability shall be unlimited for breaches of this Agreement.",
      },
    },
  },

  // Alias for natural phrasing
  'liability exposure': {
    content: `## Liability Exposure Summary

Your total capped liability is **$4.2M** across 13 vendor contracts. However, **2 contracts have uncapped liability** that need immediate attention:

- **Globex SaaS Agreement** — §8.1 has no aggregate cap [¹]
- **Initech Cloud Services** — §12.3 explicitly states "unlimited liability" [²]

These represent significant risk as there's no ceiling on potential damages.

### Quick Stats

- **Capped contracts:** 11 (ranging from $500K to $2M)
- **Uncapped contracts:** 2 (⚠️ high risk)
- **Average cap:** $1.2M per agreement

---

*Would you like me to show you the full breakdown by document?*`,
    citations: {
      '1': {
        id: 'cit-risk-1',
        documentId: 'globex-saas',
        documentTitle: 'Globex SaaS Agreement',
        section: '§8.1 Limitation of Liability',
        excerpt:
          'Provider shall not be liable for any indirect, incidental, special, or consequential damages. No aggregate liability cap is specified under this Agreement.',
      },
      '2': {
        id: 'cit-risk-2',
        documentId: 'initech-cloud',
        documentTitle: 'Initech Cloud Services Agreement',
        section: '§12.3 Liability',
        excerpt:
          "Notwithstanding any other provision of this Agreement, Customer acknowledges that Provider's liability shall be unlimited for breaches of this Agreement.",
      },
    },
  },

  // Turn 2: Simple table (1 column - Liability Cap)
  'Show me the breakdown': {
    content: `## Liability Breakdown by Agreement

*Extracted from 6 vendor contracts*

| Agreement | Liability Cap |
|-----------|---------------|
| Globex SaaS | ⚠️ Uncapped [¹] |
| Initech Cloud | ⚠️ Uncapped [²] |
| Acme MSA | 2x annual fees [³] |
| Umbrella DPA | $500K [⁴] |
| TechVenture NDA | $1M [⁵] |
| DataCorp SOW | $2M aggregate [⁶] |

### Summary

- **2 high-risk contracts** with uncapped liability
- **4 contracts** with defined caps ($500K - $2M)
- **Total capped exposure:** $4.2M

---

*Want me to add indemnification terms to this analysis?*`,
    citations: {
      '1': {
        id: 'cit-table-1',
        documentId: 'globex-saas',
        documentTitle: 'Globex SaaS Agreement',
        section: '§8.1 Limitation of Liability',
        excerpt:
          'Provider shall not be liable for any indirect, incidental, special, or consequential damages. No aggregate liability cap is specified under this Agreement.',
      },
      '2': {
        id: 'cit-table-2',
        documentId: 'initech-cloud',
        documentTitle: 'Initech Cloud Services Agreement',
        section: '§12.3 Liability',
        excerpt:
          "Notwithstanding any other provision of this Agreement, Customer acknowledges that Provider's liability shall be unlimited for breaches of this Agreement.",
      },
      '3': {
        id: 'cit-table-3',
        documentId: '1',
        documentTitle: 'Acme Corp - Master Services Agreement',
        section: '§8.1 Limitation of Liability',
        excerpt:
          "Neither party's aggregate liability shall exceed two times (2x) the annual fees paid or payable under this Agreement in the twelve (12) months preceding the claim.",
      },
      '4': {
        id: 'cit-table-4',
        documentId: 'umbrella-dpa',
        documentTitle: 'Umbrella Corp - Data Processing Agreement',
        section: '§7.2 Liability Cap',
        excerpt:
          'The total aggregate liability of either party under this Agreement shall not exceed Five Hundred Thousand Dollars ($500,000.00 USD).',
      },
      '5': {
        id: 'cit-table-5',
        documentId: 'techventure-nda',
        documentTitle: 'TechVenture Inc - NDA',
        section: '§6 Limitation of Liability',
        excerpt:
          'The maximum aggregate liability of either party for any claims arising under this Agreement shall be One Million Dollars ($1,000,000.00 USD).',
      },
      '6': {
        id: 'cit-table-6',
        documentId: 'datacorp-sow',
        documentTitle: 'DataCorp - Statement of Work',
        section: '§9.1 Aggregate Cap',
        excerpt:
          "Provider's total liability under this SOW shall not exceed Two Million Dollars ($2,000,000.00 USD) in the aggregate.",
      },
    },
  },

  // Alias
  'show me the full breakdown': {
    content: `## Liability Breakdown by Agreement

*Extracted from 6 vendor contracts*

| Agreement | Liability Cap |
|-----------|---------------|
| Globex SaaS | ⚠️ Uncapped [¹] |
| Initech Cloud | ⚠️ Uncapped [²] |
| Acme MSA | 2x annual fees [³] |
| Umbrella DPA | $500K [⁴] |
| TechVenture NDA | $1M [⁵] |
| DataCorp SOW | $2M aggregate [⁶] |

### Summary

- **2 high-risk contracts** with uncapped liability
- **4 contracts** with defined caps ($500K - $2M)
- **Total capped exposure:** $4.2M

---

*Want me to add indemnification terms to this analysis?*`,
    citations: {
      '1': {
        id: 'cit-table-1',
        documentId: 'globex-saas',
        documentTitle: 'Globex SaaS Agreement',
        section: '§8.1 Limitation of Liability',
        excerpt:
          'Provider shall not be liable for any indirect, incidental, special, or consequential damages. No aggregate liability cap is specified under this Agreement.',
      },
      '2': {
        id: 'cit-table-2',
        documentId: 'initech-cloud',
        documentTitle: 'Initech Cloud Services Agreement',
        section: '§12.3 Liability',
        excerpt:
          "Notwithstanding any other provision of this Agreement, Customer acknowledges that Provider's liability shall be unlimited for breaches of this Agreement.",
      },
      '3': {
        id: 'cit-table-3',
        documentId: '1',
        documentTitle: 'Acme Corp - Master Services Agreement',
        section: '§8.1 Limitation of Liability',
        excerpt:
          "Neither party's aggregate liability shall exceed two times (2x) the annual fees paid or payable under this Agreement in the twelve (12) months preceding the claim.",
      },
      '4': {
        id: 'cit-table-4',
        documentId: 'umbrella-dpa',
        documentTitle: 'Umbrella Corp - Data Processing Agreement',
        section: '§7.2 Liability Cap',
        excerpt:
          'The total aggregate liability of either party under this Agreement shall not exceed Five Hundred Thousand Dollars ($500,000.00 USD).',
      },
      '5': {
        id: 'cit-table-5',
        documentId: 'techventure-nda',
        documentTitle: 'TechVenture Inc - NDA',
        section: '§6 Limitation of Liability',
        excerpt:
          'The maximum aggregate liability of either party for any claims arising under this Agreement shall be One Million Dollars ($1,000,000.00 USD).',
      },
      '6': {
        id: 'cit-table-6',
        documentId: 'datacorp-sow',
        documentTitle: 'DataCorp - Statement of Work',
        section: '§9.1 Aggregate Cap',
        excerpt:
          "Provider's total liability under this SOW shall not exceed Two Million Dollars ($2,000,000.00 USD) in the aggregate.",
      },
    },
  },

  // Turn 3: Table with 2 columns (Liability + Indemnification)
  'Add indemnification too': {
    content: `## Risk Analysis: Liability & Indemnification

*Extracted from 6 vendor contracts*

| Agreement | Liability Cap | Indemnification |
|-----------|---------------|-----------------|
| Globex SaaS | ⚠️ Uncapped [¹] | One-way (them) [⁷] |
| Initech Cloud | ⚠️ Uncapped [²] | One-way (them) [⁸] |
| Acme MSA | 2x annual fees [³] | Mutual [⁹] |
| Umbrella DPA | $500K [⁴] | Mutual [¹⁰] |
| TechVenture NDA | $1M [⁵] | Mutual [¹¹] |
| DataCorp SOW | $2M aggregate [⁶] | Limited mutual [¹²] |

### Key Finding

⚠️ **Both uncapped contracts also have one-way indemnification** favoring the vendor — this compounds your risk exposure significantly.

- **Mutual indemnification:** 4 contracts ✓
- **One-way (unfavorable):** 2 contracts ⚠️

---

*Would you like the full risk picture with insurance requirements?*`,
    citations: {
      '1': {
        id: 'cit-table-1',
        documentId: 'globex-saas',
        documentTitle: 'Globex SaaS Agreement',
        section: '§8.1 Limitation of Liability',
        excerpt:
          'Provider shall not be liable for any indirect, incidental, special, or consequential damages. No aggregate liability cap is specified under this Agreement.',
      },
      '2': {
        id: 'cit-table-2',
        documentId: 'initech-cloud',
        documentTitle: 'Initech Cloud Services Agreement',
        section: '§12.3 Liability',
        excerpt:
          "Notwithstanding any other provision of this Agreement, Customer acknowledges that Provider's liability shall be unlimited for breaches of this Agreement.",
      },
      '3': {
        id: 'cit-table-3',
        documentId: '1',
        documentTitle: 'Acme Corp - Master Services Agreement',
        section: '§8.1 Limitation of Liability',
        excerpt:
          "Neither party's aggregate liability shall exceed two times (2x) the annual fees paid or payable under this Agreement in the twelve (12) months preceding the claim.",
      },
      '4': {
        id: 'cit-table-4',
        documentId: 'umbrella-dpa',
        documentTitle: 'Umbrella Corp - Data Processing Agreement',
        section: '§7.2 Liability Cap',
        excerpt:
          'The total aggregate liability of either party under this Agreement shall not exceed Five Hundred Thousand Dollars ($500,000.00 USD).',
      },
      '5': {
        id: 'cit-table-5',
        documentId: 'techventure-nda',
        documentTitle: 'TechVenture Inc - NDA',
        section: '§6 Limitation of Liability',
        excerpt:
          'The maximum aggregate liability of either party for any claims arising under this Agreement shall be One Million Dollars ($1,000,000.00 USD).',
      },
      '6': {
        id: 'cit-table-6',
        documentId: 'datacorp-sow',
        documentTitle: 'DataCorp - Statement of Work',
        section: '§9.1 Aggregate Cap',
        excerpt:
          "Provider's total liability under this SOW shall not exceed Two Million Dollars ($2,000,000.00 USD) in the aggregate.",
      },
      '7': {
        id: 'cit-indem-1',
        documentId: 'globex-saas',
        documentTitle: 'Globex SaaS Agreement',
        section: '§9.1 Indemnification',
        excerpt:
          "Customer shall indemnify, defend, and hold harmless Provider from any third-party claims arising from Customer's use of the Services. Provider makes no reciprocal indemnification commitment.",
      },
      '8': {
        id: 'cit-indem-2',
        documentId: 'initech-cloud',
        documentTitle: 'Initech Cloud Services Agreement',
        section: '§13 Indemnification',
        excerpt:
          'Customer agrees to indemnify and hold Provider harmless from all claims, damages, and expenses. This indemnification is one-way and Provider has no corresponding obligation.',
      },
      '9': {
        id: 'cit-indem-3',
        documentId: '1',
        documentTitle: 'Acme Corp - Master Services Agreement',
        section: '§9 Indemnification',
        excerpt:
          'Each party shall indemnify, defend, and hold harmless the other party from any third-party claims arising from (a) breach of this Agreement, (b) violation of applicable law.',
      },
      '10': {
        id: 'cit-indem-4',
        documentId: 'umbrella-dpa',
        documentTitle: 'Umbrella Corp - Data Processing Agreement',
        section: '§8 Mutual Indemnification',
        excerpt:
          'Each party agrees to indemnify the other against claims arising from its own negligence, breach of contract, or violation of applicable data protection laws.',
      },
      '11': {
        id: 'cit-indem-5',
        documentId: 'techventure-nda',
        documentTitle: 'TechVenture Inc - NDA',
        section: '§7 Indemnification',
        excerpt:
          'Each party shall indemnify the other for any breach of confidentiality obligations or misuse of Confidential Information disclosed under this Agreement.',
      },
      '12': {
        id: 'cit-indem-6',
        documentId: 'datacorp-sow',
        documentTitle: 'DataCorp - Statement of Work',
        section: '§10 Limited Indemnification',
        excerpt:
          'Each party indemnifies the other for IP infringement claims only. General indemnification is limited to direct damages up to the contract value.',
      },
    },
  },

  // Alias
  'add indemnification': {
    content: `## Risk Analysis: Liability & Indemnification

*Extracted from 6 vendor contracts*

| Agreement | Liability Cap | Indemnification |
|-----------|---------------|-----------------|
| Globex SaaS | ⚠️ Uncapped [¹] | One-way (them) [⁷] |
| Initech Cloud | ⚠️ Uncapped [²] | One-way (them) [⁸] |
| Acme MSA | 2x annual fees [³] | Mutual [⁹] |
| Umbrella DPA | $500K [⁴] | Mutual [¹⁰] |
| TechVenture NDA | $1M [⁵] | Mutual [¹¹] |
| DataCorp SOW | $2M aggregate [⁶] | Limited mutual [¹²] |

### Key Finding

⚠️ **Both uncapped contracts also have one-way indemnification** favoring the vendor — this compounds your risk exposure significantly.

- **Mutual indemnification:** 4 contracts ✓
- **One-way (unfavorable):** 2 contracts ⚠️

---

*Would you like the full risk picture with insurance requirements?*`,
    citations: {
      '1': {
        id: 'cit-table-1',
        documentId: 'globex-saas',
        documentTitle: 'Globex SaaS Agreement',
        section: '§8.1 Limitation of Liability',
        excerpt:
          'Provider shall not be liable for any indirect, incidental, special, or consequential damages. No aggregate liability cap is specified under this Agreement.',
      },
      '2': {
        id: 'cit-table-2',
        documentId: 'initech-cloud',
        documentTitle: 'Initech Cloud Services Agreement',
        section: '§12.3 Liability',
        excerpt:
          "Notwithstanding any other provision of this Agreement, Customer acknowledges that Provider's liability shall be unlimited for breaches of this Agreement.",
      },
      '3': {
        id: 'cit-table-3',
        documentId: '1',
        documentTitle: 'Acme Corp - Master Services Agreement',
        section: '§8.1 Limitation of Liability',
        excerpt:
          "Neither party's aggregate liability shall exceed two times (2x) the annual fees paid or payable under this Agreement in the twelve (12) months preceding the claim.",
      },
      '4': {
        id: 'cit-table-4',
        documentId: 'umbrella-dpa',
        documentTitle: 'Umbrella Corp - Data Processing Agreement',
        section: '§7.2 Liability Cap',
        excerpt:
          'The total aggregate liability of either party under this Agreement shall not exceed Five Hundred Thousand Dollars ($500,000.00 USD).',
      },
      '5': {
        id: 'cit-table-5',
        documentId: 'techventure-nda',
        documentTitle: 'TechVenture Inc - NDA',
        section: '§6 Limitation of Liability',
        excerpt:
          'The maximum aggregate liability of either party for any claims arising under this Agreement shall be One Million Dollars ($1,000,000.00 USD).',
      },
      '6': {
        id: 'cit-table-6',
        documentId: 'datacorp-sow',
        documentTitle: 'DataCorp - Statement of Work',
        section: '§9.1 Aggregate Cap',
        excerpt:
          "Provider's total liability under this SOW shall not exceed Two Million Dollars ($2,000,000.00 USD) in the aggregate.",
      },
      '7': {
        id: 'cit-indem-1',
        documentId: 'globex-saas',
        documentTitle: 'Globex SaaS Agreement',
        section: '§9.1 Indemnification',
        excerpt:
          "Customer shall indemnify, defend, and hold harmless Provider from any third-party claims arising from Customer's use of the Services. Provider makes no reciprocal indemnification commitment.",
      },
      '8': {
        id: 'cit-indem-2',
        documentId: 'initech-cloud',
        documentTitle: 'Initech Cloud Services Agreement',
        section: '§13 Indemnification',
        excerpt:
          'Customer agrees to indemnify and hold Provider harmless from all claims, damages, and expenses. This indemnification is one-way and Provider has no corresponding obligation.',
      },
      '9': {
        id: 'cit-indem-3',
        documentId: '1',
        documentTitle: 'Acme Corp - Master Services Agreement',
        section: '§9 Indemnification',
        excerpt:
          'Each party shall indemnify, defend, and hold harmless the other party from any third-party claims arising from (a) breach of this Agreement, (b) violation of applicable law.',
      },
      '10': {
        id: 'cit-indem-4',
        documentId: 'umbrella-dpa',
        documentTitle: 'Umbrella Corp - Data Processing Agreement',
        section: '§8 Mutual Indemnification',
        excerpt:
          'Each party agrees to indemnify the other against claims arising from its own negligence, breach of contract, or violation of applicable data protection laws.',
      },
      '11': {
        id: 'cit-indem-5',
        documentId: 'techventure-nda',
        documentTitle: 'TechVenture Inc - NDA',
        section: '§7 Indemnification',
        excerpt:
          'Each party shall indemnify the other for any breach of confidentiality obligations or misuse of Confidential Information disclosed under this Agreement.',
      },
      '12': {
        id: 'cit-indem-6',
        documentId: 'datacorp-sow',
        documentTitle: 'DataCorp - Statement of Work',
        section: '§10 Limited Indemnification',
        excerpt:
          'Each party indemnifies the other for IP infringement claims only. General indemnification is limited to direct damages up to the contract value.',
      },
    },
  },
  '/email-report': {
    // Note: {{RECIPIENT_NAME}}, {{RECIPIENT_TITLE}}, and {{RECIPIENT_FIRST}} are replaced at runtime
    content: `## 📧 Email Draft

---

**To:** {{RECIPIENT_NAME}}, {{RECIPIENT_TITLE}}
**Cc:** Legal Team, Finance
**Subject:** Acme Corp Contract Analysis - Prevailing Terms Summary

---

Hi {{RECIPIENT_FIRST}},

I've completed the analysis of our Acme Corp agreements. Here are the key findings:

### Executive Summary

Our relationship with Acme is governed by 15 documents with the MSA as the foundational agreement. Three amendments have modified key terms, and the Order of Precedence (MSA §2.1) establishes that amendments supersede the base agreement.

### Key Prevailing Terms

| Category | Current Term | Source |
|----------|--------------|--------|
| Unit Price | $150/unit | Order Form 2024 §3.1 |
| Annual Minimum | $500,000 | MSA §4.2 |
| Liability Cap | $2M aggregate | MSA §8.1 |
| SLA Uptime | 99.9% | Amendment #3 §2 |
| Support | 24x7 | Amendment #3 §3 |
| Termination Notice | 120 days | Amendment #2 §4 |

### Conflicts Identified

1. **IP Ownership** - MSA assigns to Provider, but SOW §5.3 assigns custom work to us. *Resolution: SOW prevails per Order of Precedence.*

2. **Termination Period** - MSA says 90 days, Amendment #2 changed to 120 days. *Resolution: Amendment prevails—120 days required.*

### Recommended Actions

- Review IP ownership clause before next SOW
- Calendar the 120-day termination notice window
- Confirm SLA credits are being applied per Amendment #3

Let me know if you need any additional details or want to schedule a review meeting.

Best regards,
Akshat

---

*Generated from analysis of 15 Acme Corp agreements with Docusign*`,
    thinkingSteps: [
      {
        id: '1',
        action: 'Reviewing previous analysis results',
        result: 'Found prevailing terms summary from earlier in this conversation.',
      },
      {
        id: '2',
        action: 'Formatting email for executive audience',
        result: 'Structuring key findings with actionable recommendations.',
      },
      {
        id: '3',
        action: 'Adding context and citations',
        result: 'Email draft ready for review.',
      },
    ],
    citations: {},
  },
};

// =============================================================================
// Matrix Responses - Full risk assessment matrix (Turn 4)
// =============================================================================

export const MATRIX_RESPONSES: Record<string, MatrixResponseData> = {
  // Turn 4: Full risk assessment matrix
  'Full risk assessment': {
    introContent: "I've analyzed all 6 vendor contracts for a comprehensive risk assessment.",
    matrix: {
      id: 'risk-matrix-1',
      title: 'Risk Assessment Matrix',
      columns: [
        { id: 'liability', header: 'Liability Cap', query: 'What is the liability cap?' },
        {
          id: 'indemnity',
          header: 'Indemnification',
          query: 'What are the indemnification terms?',
        },
        { id: 'insurance', header: 'Insurance', query: 'What are the insurance requirements?' },
      ],
      rows: [
        {
          documentId: 'globex-saas',
          documentTitle: 'Globex SaaS',
          cells: {
            liability: {
              value: 'Uncapped',
              status: 'warning',
              note: 'No aggregate cap specified',
              citation: {
                id: 'cit-matrix-1',
                documentId: 'globex-saas',
                documentTitle: 'Globex SaaS Agreement',
                section: '§8.1 Limitation of Liability',
                excerpt:
                  'Provider shall not be liable for any indirect, incidental, special, or consequential damages. No aggregate liability cap is specified under this Agreement.',
              },
            },
            indemnity: {
              value: 'One-way',
              status: 'warning',
              note: 'Favors vendor',
              citation: {
                id: 'cit-matrix-2',
                documentId: 'globex-saas',
                documentTitle: 'Globex SaaS Agreement',
                section: '§9.1 Indemnification',
                excerpt:
                  'Customer shall indemnify, defend, and hold harmless Provider from any third-party claims. Provider makes no reciprocal indemnification commitment.',
              },
            },
            insurance: {
              value: null,
              status: 'not_found',
              note: 'No insurance requirements',
            },
          },
          riskLevel: 'high',
          riskReason:
            'Uncapped liability with one-way indemnification and no insurance requirements',
        },
        {
          documentId: 'initech-cloud',
          documentTitle: 'Initech Cloud',
          cells: {
            liability: {
              value: 'Uncapped',
              status: 'warning',
              note: 'Explicitly unlimited',
              citation: {
                id: 'cit-matrix-3',
                documentId: 'initech-cloud',
                documentTitle: 'Initech Cloud Services Agreement',
                section: '§12.3 Liability',
                excerpt:
                  "Customer acknowledges that Provider's liability shall be unlimited for breaches of this Agreement.",
              },
            },
            indemnity: {
              value: 'One-way',
              status: 'warning',
              note: 'Favors vendor',
              citation: {
                id: 'cit-matrix-4',
                documentId: 'initech-cloud',
                documentTitle: 'Initech Cloud Services Agreement',
                section: '§13 Indemnification',
                excerpt:
                  'Customer agrees to indemnify and hold Provider harmless from all claims. This indemnification is one-way.',
              },
            },
            insurance: {
              value: '$1M',
              status: 'found',
              citation: {
                id: 'cit-matrix-5',
                documentId: 'initech-cloud',
                documentTitle: 'Initech Cloud Services Agreement',
                section: '§14 Insurance',
                excerpt:
                  'Provider maintains commercial general liability insurance with limits of at least $1,000,000 per occurrence.',
              },
            },
          },
          riskLevel: 'high',
          riskReason: 'Uncapped liability with one-way indemnification despite having insurance',
        },
        {
          documentId: '1',
          documentTitle: 'Acme MSA',
          cells: {
            liability: {
              value: '2x fees',
              status: 'found',
              citation: {
                id: 'cit-matrix-6',
                documentId: '1',
                documentTitle: 'Acme Corp - Master Services Agreement',
                section: '§8.1 Limitation of Liability',
                excerpt:
                  "Neither party's aggregate liability shall exceed two times (2x) the annual fees paid under this Agreement.",
              },
            },
            indemnity: {
              value: 'Mutual',
              status: 'found',
              citation: {
                id: 'cit-matrix-7',
                documentId: '1',
                documentTitle: 'Acme Corp - Master Services Agreement',
                section: '§9 Indemnification',
                excerpt:
                  'Each party shall indemnify, defend, and hold harmless the other party from any third-party claims.',
              },
            },
            insurance: {
              value: '$2M',
              status: 'found',
              citation: {
                id: 'cit-matrix-8',
                documentId: '1',
                documentTitle: 'Acme Corp - Master Services Agreement',
                section: '§10 Insurance',
                excerpt:
                  'Provider shall maintain commercial general liability insurance of at least $2,000,000 per occurrence.',
              },
            },
          },
          riskLevel: 'medium',
          riskReason: 'Variable cap tied to fees may be insufficient for large claims',
        },
        {
          documentId: 'umbrella-dpa',
          documentTitle: 'Umbrella DPA',
          cells: {
            liability: {
              value: '$500K',
              status: 'found',
              citation: {
                id: 'cit-matrix-9',
                documentId: 'umbrella-dpa',
                documentTitle: 'Umbrella Corp - Data Processing Agreement',
                section: '§7.2 Liability Cap',
                excerpt:
                  'The total aggregate liability shall not exceed Five Hundred Thousand Dollars ($500,000.00 USD).',
              },
            },
            indemnity: {
              value: 'Mutual',
              status: 'found',
              citation: {
                id: 'cit-matrix-10',
                documentId: 'umbrella-dpa',
                documentTitle: 'Umbrella Corp - Data Processing Agreement',
                section: '§8 Mutual Indemnification',
                excerpt:
                  'Each party agrees to indemnify the other against claims arising from its own negligence or breach.',
              },
            },
            insurance: {
              value: '$5M',
              status: 'found',
              citation: {
                id: 'cit-matrix-11',
                documentId: 'umbrella-dpa',
                documentTitle: 'Umbrella Corp - Data Processing Agreement',
                section: '§9 Insurance Requirements',
                excerpt:
                  'Provider shall maintain cyber liability insurance with limits of at least $5,000,000.',
              },
            },
          },
          riskLevel: 'low',
          riskReason: 'Fixed cap with mutual indemnification and strong insurance coverage',
        },
        {
          documentId: 'techventure-nda',
          documentTitle: 'TechVenture NDA',
          cells: {
            liability: {
              value: '$1M',
              status: 'found',
              citation: {
                id: 'cit-matrix-12',
                documentId: 'techventure-nda',
                documentTitle: 'TechVenture Inc - NDA',
                section: '§6 Limitation of Liability',
                excerpt:
                  'Maximum aggregate liability shall be One Million Dollars ($1,000,000.00 USD).',
              },
            },
            indemnity: {
              value: 'Mutual',
              status: 'found',
              citation: {
                id: 'cit-matrix-13',
                documentId: 'techventure-nda',
                documentTitle: 'TechVenture Inc - NDA',
                section: '§7 Indemnification',
                excerpt:
                  'Each party shall indemnify the other for any breach of confidentiality obligations.',
              },
            },
            insurance: {
              value: '$3M',
              status: 'found',
              citation: {
                id: 'cit-matrix-14',
                documentId: 'techventure-nda',
                documentTitle: 'TechVenture Inc - NDA',
                section: '§8 Insurance',
                excerpt:
                  'Both parties shall maintain professional liability insurance of at least $3,000,000.',
              },
            },
          },
          riskLevel: 'low',
          riskReason: 'Balanced terms with adequate insurance coverage',
        },
        {
          documentId: 'datacorp-sow',
          documentTitle: 'DataCorp SOW',
          cells: {
            liability: {
              value: '$2M',
              status: 'found',
              citation: {
                id: 'cit-matrix-15',
                documentId: 'datacorp-sow',
                documentTitle: 'DataCorp - Statement of Work',
                section: '§9.1 Aggregate Cap',
                excerpt:
                  "Provider's total liability shall not exceed Two Million Dollars ($2,000,000.00 USD) in the aggregate.",
              },
            },
            indemnity: {
              value: 'Limited',
              status: 'uncertain',
              note: 'IP claims only',
              citation: {
                id: 'cit-matrix-16',
                documentId: 'datacorp-sow',
                documentTitle: 'DataCorp - Statement of Work',
                section: '§10 Limited Indemnification',
                excerpt:
                  'Each party indemnifies the other for IP infringement claims only. General indemnification is limited.',
              },
            },
            insurance: {
              value: '$2M',
              status: 'found',
              citation: {
                id: 'cit-matrix-17',
                documentId: 'datacorp-sow',
                documentTitle: 'DataCorp - Statement of Work',
                section: '§11 Insurance',
                excerpt:
                  'Provider maintains errors and omissions insurance with limits of $2,000,000.',
              },
            },
          },
          riskLevel: 'low',
          riskReason: 'Strong liability cap and insurance, though indemnification is limited',
        },
      ],
    },
    summaryContent:
      '⚠️ **Globex and Initech need immediate renegotiation** — both have uncapped liability combined with one-way indemnification.',
    thinkingSteps: [
      {
        id: '1',
        action: 'Analyzing 6 vendor agreements for risk factors',
        result: 'Found liability clauses in all 6 documents with varying cap structures.',
      },
      {
        id: '2',
        action: 'Extracting indemnification terms from each agreement',
        result:
          '4 contracts have mutual indemnification, 2 have one-way terms favoring the vendor.',
      },
      {
        id: '3',
        action: 'Checking insurance requirements and coverage',
        result: '5 of 6 contracts specify insurance requirements ranging from $1M to $5M.',
      },
      {
        id: '4',
        action: 'Computing aggregate risk scores',
        result:
          'Identified 2 high-risk, 1 medium-risk, and 3 low-risk contracts based on combined factors.',
      },
    ],
    citations: {
      '1': {
        id: 'cit-matrix-1',
        documentId: 'globex-saas',
        documentTitle: 'Globex SaaS Agreement',
        section: '§8.1 Limitation of Liability',
        excerpt:
          'Provider shall not be liable for any indirect, incidental, special, or consequential damages. No aggregate liability cap is specified under this Agreement.',
      },
      '2': {
        id: 'cit-matrix-2',
        documentId: 'globex-saas',
        documentTitle: 'Globex SaaS Agreement',
        section: '§9.1 Indemnification',
        excerpt:
          'Customer shall indemnify, defend, and hold harmless Provider from any third-party claims. Provider makes no reciprocal indemnification commitment.',
      },
      '3': {
        id: 'cit-matrix-3',
        documentId: 'initech-cloud',
        documentTitle: 'Initech Cloud Services Agreement',
        section: '§12.3 Liability',
        excerpt:
          "Customer acknowledges that Provider's liability shall be unlimited for breaches of this Agreement.",
      },
      '4': {
        id: 'cit-matrix-4',
        documentId: 'initech-cloud',
        documentTitle: 'Initech Cloud Services Agreement',
        section: '§13 Indemnification',
        excerpt:
          'Customer agrees to indemnify and hold Provider harmless from all claims. This indemnification is one-way.',
      },
    },
  },

  // Alias
  'full risk picture': {
    introContent: "I've analyzed all 6 vendor contracts for a comprehensive risk assessment.",
    matrix: {
      id: 'risk-matrix-1',
      title: 'Risk Assessment Matrix',
      columns: [
        { id: 'liability', header: 'Liability Cap', query: 'What is the liability cap?' },
        {
          id: 'indemnity',
          header: 'Indemnification',
          query: 'What are the indemnification terms?',
        },
        { id: 'insurance', header: 'Insurance', query: 'What are the insurance requirements?' },
      ],
      rows: [
        {
          documentId: 'globex-saas',
          documentTitle: 'Globex SaaS',
          cells: {
            liability: {
              value: 'Uncapped',
              status: 'warning',
              note: 'No aggregate cap specified',
              citation: {
                id: 'cit-matrix-1',
                documentId: 'globex-saas',
                documentTitle: 'Globex SaaS Agreement',
                section: '§8.1 Limitation of Liability',
                excerpt:
                  'Provider shall not be liable for any indirect, incidental, special, or consequential damages. No aggregate liability cap is specified under this Agreement.',
              },
            },
            indemnity: {
              value: 'One-way',
              status: 'warning',
              note: 'Favors vendor',
              citation: {
                id: 'cit-matrix-2',
                documentId: 'globex-saas',
                documentTitle: 'Globex SaaS Agreement',
                section: '§9.1 Indemnification',
                excerpt:
                  'Customer shall indemnify, defend, and hold harmless Provider from any third-party claims. Provider makes no reciprocal indemnification commitment.',
              },
            },
            insurance: {
              value: null,
              status: 'not_found',
              note: 'No insurance requirements',
            },
          },
          riskLevel: 'high',
          riskReason:
            'Uncapped liability with one-way indemnification and no insurance requirements',
        },
        {
          documentId: 'initech-cloud',
          documentTitle: 'Initech Cloud',
          cells: {
            liability: {
              value: 'Uncapped',
              status: 'warning',
              note: 'Explicitly unlimited',
              citation: {
                id: 'cit-matrix-3',
                documentId: 'initech-cloud',
                documentTitle: 'Initech Cloud Services Agreement',
                section: '§12.3 Liability',
                excerpt:
                  "Customer acknowledges that Provider's liability shall be unlimited for breaches of this Agreement.",
              },
            },
            indemnity: {
              value: 'One-way',
              status: 'warning',
              note: 'Favors vendor',
              citation: {
                id: 'cit-matrix-4',
                documentId: 'initech-cloud',
                documentTitle: 'Initech Cloud Services Agreement',
                section: '§13 Indemnification',
                excerpt:
                  'Customer agrees to indemnify and hold Provider harmless from all claims. This indemnification is one-way.',
              },
            },
            insurance: {
              value: '$1M',
              status: 'found',
              citation: {
                id: 'cit-matrix-5',
                documentId: 'initech-cloud',
                documentTitle: 'Initech Cloud Services Agreement',
                section: '§14 Insurance',
                excerpt:
                  'Provider maintains commercial general liability insurance with limits of at least $1,000,000 per occurrence.',
              },
            },
          },
          riskLevel: 'high',
          riskReason: 'Uncapped liability with one-way indemnification despite having insurance',
        },
        {
          documentId: '1',
          documentTitle: 'Acme MSA',
          cells: {
            liability: {
              value: '2x fees',
              status: 'found',
              citation: {
                id: 'cit-matrix-6',
                documentId: '1',
                documentTitle: 'Acme Corp - Master Services Agreement',
                section: '§8.1 Limitation of Liability',
                excerpt:
                  "Neither party's aggregate liability shall exceed two times (2x) the annual fees paid under this Agreement.",
              },
            },
            indemnity: {
              value: 'Mutual',
              status: 'found',
              citation: {
                id: 'cit-matrix-7',
                documentId: '1',
                documentTitle: 'Acme Corp - Master Services Agreement',
                section: '§9 Indemnification',
                excerpt:
                  'Each party shall indemnify, defend, and hold harmless the other party from any third-party claims.',
              },
            },
            insurance: {
              value: '$2M',
              status: 'found',
              citation: {
                id: 'cit-matrix-8',
                documentId: '1',
                documentTitle: 'Acme Corp - Master Services Agreement',
                section: '§10 Insurance',
                excerpt:
                  'Provider shall maintain commercial general liability insurance of at least $2,000,000 per occurrence.',
              },
            },
          },
          riskLevel: 'medium',
          riskReason: 'Variable cap tied to fees may be insufficient for large claims',
        },
        {
          documentId: 'umbrella-dpa',
          documentTitle: 'Umbrella DPA',
          cells: {
            liability: {
              value: '$500K',
              status: 'found',
              citation: {
                id: 'cit-matrix-9',
                documentId: 'umbrella-dpa',
                documentTitle: 'Umbrella Corp - Data Processing Agreement',
                section: '§7.2 Liability Cap',
                excerpt:
                  'The total aggregate liability shall not exceed Five Hundred Thousand Dollars ($500,000.00 USD).',
              },
            },
            indemnity: {
              value: 'Mutual',
              status: 'found',
              citation: {
                id: 'cit-matrix-10',
                documentId: 'umbrella-dpa',
                documentTitle: 'Umbrella Corp - Data Processing Agreement',
                section: '§8 Mutual Indemnification',
                excerpt:
                  'Each party agrees to indemnify the other against claims arising from its own negligence or breach.',
              },
            },
            insurance: {
              value: '$5M',
              status: 'found',
              citation: {
                id: 'cit-matrix-11',
                documentId: 'umbrella-dpa',
                documentTitle: 'Umbrella Corp - Data Processing Agreement',
                section: '§9 Insurance Requirements',
                excerpt:
                  'Provider shall maintain cyber liability insurance with limits of at least $5,000,000.',
              },
            },
          },
          riskLevel: 'low',
          riskReason: 'Fixed cap with mutual indemnification and strong insurance coverage',
        },
        {
          documentId: 'techventure-nda',
          documentTitle: 'TechVenture NDA',
          cells: {
            liability: {
              value: '$1M',
              status: 'found',
              citation: {
                id: 'cit-matrix-12',
                documentId: 'techventure-nda',
                documentTitle: 'TechVenture Inc - NDA',
                section: '§6 Limitation of Liability',
                excerpt:
                  'Maximum aggregate liability shall be One Million Dollars ($1,000,000.00 USD).',
              },
            },
            indemnity: {
              value: 'Mutual',
              status: 'found',
              citation: {
                id: 'cit-matrix-13',
                documentId: 'techventure-nda',
                documentTitle: 'TechVenture Inc - NDA',
                section: '§7 Indemnification',
                excerpt:
                  'Each party shall indemnify the other for any breach of confidentiality obligations.',
              },
            },
            insurance: {
              value: '$3M',
              status: 'found',
              citation: {
                id: 'cit-matrix-14',
                documentId: 'techventure-nda',
                documentTitle: 'TechVenture Inc - NDA',
                section: '§8 Insurance',
                excerpt:
                  'Both parties shall maintain professional liability insurance of at least $3,000,000.',
              },
            },
          },
          riskLevel: 'low',
          riskReason: 'Balanced terms with adequate insurance coverage',
        },
        {
          documentId: 'datacorp-sow',
          documentTitle: 'DataCorp SOW',
          cells: {
            liability: {
              value: '$2M',
              status: 'found',
              citation: {
                id: 'cit-matrix-15',
                documentId: 'datacorp-sow',
                documentTitle: 'DataCorp - Statement of Work',
                section: '§9.1 Aggregate Cap',
                excerpt:
                  "Provider's total liability shall not exceed Two Million Dollars ($2,000,000.00 USD) in the aggregate.",
              },
            },
            indemnity: {
              value: 'Limited',
              status: 'uncertain',
              note: 'IP claims only',
              citation: {
                id: 'cit-matrix-16',
                documentId: 'datacorp-sow',
                documentTitle: 'DataCorp - Statement of Work',
                section: '§10 Limited Indemnification',
                excerpt:
                  'Each party indemnifies the other for IP infringement claims only. General indemnification is limited.',
              },
            },
            insurance: {
              value: '$2M',
              status: 'found',
              citation: {
                id: 'cit-matrix-17',
                documentId: 'datacorp-sow',
                documentTitle: 'DataCorp - Statement of Work',
                section: '§11 Insurance',
                excerpt:
                  'Provider maintains errors and omissions insurance with limits of $2,000,000.',
              },
            },
          },
          riskLevel: 'low',
          riskReason: 'Strong liability cap and insurance, though indemnification is limited',
        },
      ],
    },
    summaryContent:
      '⚠️ **Globex and Initech need immediate renegotiation** — both have uncapped liability combined with one-way indemnification.',
    thinkingSteps: [
      {
        id: '1',
        action: 'Analyzing 6 vendor agreements for risk factors',
        result: 'Found liability clauses in all 6 documents with varying cap structures.',
      },
      {
        id: '2',
        action: 'Extracting indemnification terms from each agreement',
        result:
          '4 contracts have mutual indemnification, 2 have one-way terms favoring the vendor.',
      },
      {
        id: '3',
        action: 'Checking insurance requirements and coverage',
        result: '5 of 6 contracts specify insurance requirements ranging from $1M to $5M.',
      },
      {
        id: '4',
        action: 'Computing aggregate risk scores',
        result:
          'Identified 2 high-risk, 1 medium-risk, and 3 low-risk contracts based on combined factors.',
      },
    ],
    citations: {
      '1': {
        id: 'cit-matrix-1',
        documentId: 'globex-saas',
        documentTitle: 'Globex SaaS Agreement',
        section: '§8.1 Limitation of Liability',
        excerpt:
          'Provider shall not be liable for any indirect, incidental, special, or consequential damages. No aggregate liability cap is specified under this Agreement.',
      },
      '2': {
        id: 'cit-matrix-2',
        documentId: 'globex-saas',
        documentTitle: 'Globex SaaS Agreement',
        section: '§9.1 Indemnification',
        excerpt:
          'Customer shall indemnify, defend, and hold harmless Provider from any third-party claims. Provider makes no reciprocal indemnification commitment.',
      },
      '3': {
        id: 'cit-matrix-3',
        documentId: 'initech-cloud',
        documentTitle: 'Initech Cloud Services Agreement',
        section: '§12.3 Liability',
        excerpt:
          "Customer acknowledges that Provider's liability shall be unlimited for breaches of this Agreement.",
      },
      '4': {
        id: 'cit-matrix-4',
        documentId: 'initech-cloud',
        documentTitle: 'Initech Cloud Services Agreement',
        section: '§13 Indemnification',
        excerpt:
          'Customer agrees to indemnify and hold Provider harmless from all claims. This indemnification is one-way.',
      },
    },
  },
};

// =============================================================================
// Prompt Library Data
// =============================================================================

export const PROMPT_LIBRARY: PromptCategory[] = [
  {
    id: 'contract-analysis',
    title: 'Contract Analysis',
    prompts: [
      {
        id: 'summarize-prevailing',
        title: 'Summarize Prevailing Terms',
        description: 'Identify current governing terms across all agreements',
        icon: 'document-stack',
      },
      {
        id: 'compare-clauses',
        title: 'Compare Clauses',
        description: 'Side-by-side comparison of specific provisions',
        icon: 'layout-grid',
      },
      {
        id: 'extract-key-dates',
        title: 'Extract Key Dates',
        description: 'Find renewal, expiration, and notice dates',
        icon: 'calendar',
      },
      {
        id: 'analyze-financial',
        title: 'Analyze Financial Terms',
        description: 'Review pricing, payments, and contract values',
        icon: 'currency-dollar',
      },
    ],
  },
  {
    id: 'compliance-risk',
    title: 'Compliance & Risk',
    prompts: [
      {
        id: 'check-conflicts',
        title: 'Check for Conflicts',
        description: 'Find conflicting terms across documents',
        icon: 'status-warn',
      },
      {
        id: 'review-risk',
        title: 'Review Risk & Liability',
        description: 'Identify liability caps and indemnification terms',
        icon: 'shield',
      },
      {
        id: 'audit-compliance',
        title: 'Audit Compliance',
        description: 'Check against regulatory requirements',
        icon: 'shield-check',
      },
    ],
  },
];

// User-created prompts (default includes Email Report)
export const USER_PROMPTS: Prompt[] = [
  {
    id: 'email-report',
    title: 'Email Report',
    description: 'Generate a stakeholder email summarizing the analysis',
    icon: 'envelope',
  },
];
