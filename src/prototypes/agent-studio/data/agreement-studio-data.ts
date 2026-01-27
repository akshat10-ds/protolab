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
    label: 'Analyze Financial Terms',
    description: 'Extract pricing, payment terms, and contract values',
    icon: 'currency-dollar',
    expansion: {
      steps: [
        'ROLE: You are a Financial Analyst and Contract Negotiation Specialist with deep expertise in SaaS pricing models and commercial terms.',
        'TASK: Extract, analyze, and synthesize all financial provisions across the MSA, Order Forms (2022-2024), and Amendments to create a complete picture of the commercial relationship.',
        'OBJECTIVE: Provide the procurement team with actionable intelligence on pricing trends, commitment obligations, and negotiation leverage for the upcoming renewal.',
        'INSTRUCTIONS:',
        '1. Pricing Analysis:\n   • Extract current unit pricing ($150/unit from OF-2024)\n   • Document volume discount tiers (5% at 10K, 10% at 25K, 15% at 50K+)\n   • Calculate year-over-year price changes across OF-2022 ($1.2M), OF-2023 ($1.5M), OF-2024 ($1.8M)',
        '2. Commitment Review:\n   • Identify minimum annual commitment ($500K per MSA §4.2)\n   • Document shortfall penalty terms and true-up calculations\n   • Note any "use it or lose it" provisions',
        '3. Payment Terms:\n   • Confirm Net 30 payment terms and late payment penalties (1.5%/month)\n   • Check for early payment discounts or alternative payment options\n   • Verify billing frequency (monthly in arrears)',
        '4. Price Protection:\n   • Identify CPI adjustment caps and escalation limitations\n   • Look for "most favored nation" or price parity clauses\n   • Note any price lock periods or guarantees',
        'OUTPUT FORMAT:',
        '• Financial Summary: Key numbers at a glance (TCV, ACV, unit price, growth rate)',
        '• Pricing Trend Chart: Year-over-year comparison with % changes',
        '• Commitment Tracker: Current vs. required spend with gap analysis',
        '• Negotiation Points: Specific clauses that offer leverage for renewal discussions',
      ],
      estimatedTime: '~25 seconds',
      documentsToAnalyze: 15,
    },
  },
  {
    label: 'Review Risk & Liability',
    description: 'Identify liability caps, indemnification, and IP terms',
    icon: 'shield',
    expansion: {
      steps: [
        'ROLE: You are a Risk Management Attorney and Compliance Officer specializing in technology contracts and data protection regulations.',
        'TASK: Conduct a comprehensive risk assessment across all contractual documents to identify exposure points, liability boundaries, and compliance obligations.',
        'OBJECTIVE: Deliver a risk matrix that quantifies exposure and provides specific recommendations for risk mitigation in the renewal negotiation.',
        'INSTRUCTIONS:',
        '1. Liability Analysis:\n   • Document aggregate cap ($2M per MSA §8.1) and per-incident limits\n   • Identify super-cap exclusions (confidentiality breach, indemnification, gross negligence)\n   • Note any unlimited liability scenarios',
        '2. Indemnification Review:\n   • Map mutual indemnification scope from MSA §9\n   • Identify IP infringement coverage and limitations\n   • Document data breach notification and response obligations from DPA',
        '3. IP & Data Ownership:\n   • Resolve conflict between MSA §7.1 (Provider owns) vs SOW §5.3 (Customer owns custom work)\n   • Clarify background IP vs. foreground IP treatment\n   • Document data return/destruction obligations post-termination',
        '4. Insurance Verification:\n   • Cross-reference MSA requirements with Certificate INS-2024-001\n   • Confirm CGL, E&O, and Cyber coverage meets minimums\n   • Note any gaps or upcoming renewal dates',
        '5. Compliance Assessment:\n   • Review GDPR obligations in DPA-2022-001\n   • Check SOC2 requirements from Security Addendum SEC-2024-001\n   • Document audit rights and cooperation obligations',
        'OUTPUT FORMAT:',
        '• Risk Heat Map: Visual matrix of exposure areas (High/Medium/Low)\n• Liability Summary: Cap structure with carve-outs and exceptions\n• IP Ownership Table: Clear delineation of who owns what\n• Compliance Checklist: Current status against contractual requirements\n• Recommended Actions: Specific terms to address in renewal',
      ],
      estimatedTime: '~35 seconds',
      documentsToAnalyze: 15,
    },
  },
  {
    label: 'Check for Conflicts',
    description: 'Find conflicting terms across agreements',
    icon: 'status-warn',
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
];

export const SUGGESTED_QUESTIONS = [
  'What is the current unit price for Acme?',
  'When does the Acme contract expire?',
  'Are there any conflicting terms across agreements?',
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
// Agent Thinking Sequences - Progressive reasoning steps for each action
// =============================================================================

import type { ThinkingStep, AgentAction } from './agreement-studio-types';

export const THINKING_SEQUENCES: Record<string, ThinkingStep[]> = {
  'Check for Conflicts': [
    { id: 's1', title: 'Loading agreement context', status: 'pending' },
    { id: 's2', title: 'Parsing document structure', status: 'pending' },
    { id: 's3', title: 'Extracting clause matrices', status: 'pending' },
    { id: 's4', title: 'Cross-referencing terms', status: 'pending' },
    { id: 's5', title: 'Identifying conflicts', status: 'pending' },
    { id: 's6', title: 'Applying precedence rules', status: 'pending' },
    { id: 's7', title: 'Generating recommendations', status: 'pending' },
  ],
  'Summarize Prevailing Terms': [
    { id: 's1', title: 'Loading agreement hierarchy', status: 'pending' },
    { id: 's2', title: 'Identifying order of precedence', status: 'pending' },
    { id: 's3', title: 'Extracting financial terms', status: 'pending' },
    { id: 's4', title: 'Analyzing risk provisions', status: 'pending' },
    { id: 's5', title: 'Mapping amendment trail', status: 'pending' },
    { id: 's6', title: 'Synthesizing summary', status: 'pending' },
  ],
  'Analyze Financial Terms': [
    { id: 's1', title: 'Scanning pricing clauses', status: 'pending' },
    { id: 's2', title: 'Extracting unit prices', status: 'pending' },
    { id: 's3', title: 'Calculating volume discounts', status: 'pending' },
    { id: 's4', title: 'Mapping commitment obligations', status: 'pending' },
    { id: 's5', title: 'Identifying price protection', status: 'pending' },
    { id: 's6', title: 'Generating financial summary', status: 'pending' },
  ],
  'Review Risk & Liability': [
    { id: 's1', title: 'Scanning liability clauses', status: 'pending' },
    { id: 's2', title: 'Mapping cap structure', status: 'pending' },
    { id: 's3', title: 'Analyzing indemnification scope', status: 'pending' },
    { id: 's4', title: 'Reviewing IP ownership', status: 'pending' },
    { id: 's5', title: 'Verifying insurance requirements', status: 'pending' },
    { id: 's6', title: 'Assessing compliance gaps', status: 'pending' },
    { id: 's7', title: 'Building risk matrix', status: 'pending' },
  ],
};

// =============================================================================
// Agent Actions - Proposed actions for each analysis type
// =============================================================================

export const AGENT_ACTIONS: Record<string, AgentAction[]> = {
  'Check for Conflicts': [
    {
      id: 'action-draft-amendment',
      type: 'draft',
      label: 'Draft Amendment',
      description: 'Create amendment language to resolve IP ownership conflict between MSA §7.1 and SOW §5.3',
      icon: 'document-edit',
      status: 'proposed',
      parameters: {
        'Target': 'MSA §7.1 (IP Ownership)',
        'Resolution': 'Align with SOW §5.3 customer ownership',
      },
    },
    {
      id: 'action-route-legal',
      type: 'route',
      label: 'Escalate to Legal',
      description: 'Send conflicts to legal team for review before renewal negotiations',
      icon: 'send',
      status: 'proposed',
      parameters: {
        'Recipient': 'Legal Review Team',
        'Priority': 'High',
      },
    },
    {
      id: 'action-schedule-review',
      type: 'schedule',
      label: 'Schedule Review',
      description: 'Add renewal review meeting to calendar 90 days before expiration',
      icon: 'calendar',
      status: 'proposed',
      parameters: {
        'Date': '2024-10-15',
        'Duration': '60 minutes',
      },
    },
  ],
  'Summarize Prevailing Terms': [
    {
      id: 'action-generate-report',
      type: 'generate',
      label: 'Generate Executive Summary',
      description: 'Create a one-page executive summary for leadership review',
      icon: 'document-text',
      status: 'proposed',
    },
    {
      id: 'action-notify-stakeholders',
      type: 'notify',
      label: 'Notify Stakeholders',
      description: 'Send summary to procurement and legal stakeholders',
      icon: 'bell',
      status: 'proposed',
    },
  ],
  'Analyze Financial Terms': [
    {
      id: 'action-update-crm',
      type: 'update',
      label: 'Update CRM',
      description: 'Sync contract values and renewal date to Salesforce',
      icon: 'refresh',
      status: 'proposed',
      parameters: {
        'System': 'Salesforce',
        'Fields': 'Contract Value, Renewal Date, Unit Price',
      },
    },
    {
      id: 'action-draft-negotiation',
      type: 'draft',
      label: 'Draft Negotiation Points',
      description: 'Generate negotiation talking points based on pricing analysis',
      icon: 'chat',
      status: 'proposed',
    },
  ],
  'Review Risk & Liability': [
    {
      id: 'action-create-checklist',
      type: 'generate',
      label: 'Create Compliance Checklist',
      description: 'Generate checklist of compliance requirements and current status',
      icon: 'list-check',
      status: 'proposed',
    },
    {
      id: 'action-flag-insurance',
      type: 'notify',
      label: 'Flag Insurance Renewal',
      description: 'Alert risk management about upcoming insurance certificate renewal',
      icon: 'flag',
      status: 'proposed',
      parameters: {
        'Certificate': 'INS-2024-001',
        'Expiration': '2024-12-31',
      },
    },
  ],
};
