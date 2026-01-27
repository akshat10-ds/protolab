/**
 * Onboarding Agent Data
 *
 * Scripted demo data for onboarding assistance.
 * Includes quick actions, suggested questions, thinking sequences,
 * agent actions, and tool-based UI configurations.
 *
 * Based on PRD requirements:
 * - Intent-based routing to Send/Q&A agents
 * - Basic account profiling (industry, role)
 * - Branding setup assistance
 * - Agentic Get Signatures
 */

import type {
  ExtendedSuggestedAction,
  RichMessageData,
  ConflictData,
  ThinkingStep,
  AgentAction,
  ChatMessage,
} from './agreement-studio-types';

// =============================================================================
// Tool Call Types - For rendering tool-based UIs
// =============================================================================

export type ToolCallType =
  | 'profile_form'
  | 'branding_tool'
  | 'agent_delegation'
  | 'sample_envelope';

export interface ToolCall {
  type: ToolCallType;
  params?: Record<string, unknown>;
}

// =============================================================================
// Onboarding Checklist - Step-by-step setup tasks
// =============================================================================

export interface OnboardingStep {
  id: string;
  label: string;
  description: string;
  icon: string;
  completed: boolean;
}

export const ONBOARDING_CHECKLIST: OnboardingStep[] = [
  {
    id: 'profile',
    label: 'Set up your profile',
    description: 'Tell us about your business',
    icon: 'user',
    completed: false,
  },
  {
    id: 'branding',
    label: 'Set up your branding',
    description: 'Customize colors for your envelopes',
    icon: 'paint-palette',
    completed: false,
  },
  {
    id: 'send',
    label: 'Send for signature',
    description: 'Create and send your first envelope',
    icon: 'send',
    completed: false,
  },
];

// Legacy export for compatibility
export const QUICK_ACTIONS: ExtendedSuggestedAction[] = ONBOARDING_CHECKLIST.map((step) => ({
  label: step.label,
  description: step.description,
  icon: step.icon,
}));

// =============================================================================
// Suggested Questions - Common onboarding queries
// =============================================================================

export const SUGGESTED_QUESTIONS: string[] = [
  'How do I track document status?',
  'What templates are available?',
];

// =============================================================================
// Chat History - Onboarding context
// =============================================================================

export const CHAT_HISTORY = {
  today: [
    { id: '1', title: 'Branding setup', time: '10:30 AM', messages: 4 },
    { id: '2', title: 'First envelope help', time: '9:15 AM', messages: 3 },
  ],
  yesterday: [
    { id: '3', title: 'Account questions', time: '3:45 PM', messages: 6 },
  ],
  lastWeek: [
    { id: '4', title: 'Getting started', time: 'Monday', messages: 8 },
  ],
};

// =============================================================================
// Stored Conversations - Pre-loaded demo conversations
// =============================================================================

export const STORED_CONVERSATIONS: Record<string, ChatMessage[]> = {
  '1': [
    {
      id: 'demo-user-1',
      role: 'user',
      content: 'I want to set up my company branding',
      timestamp: new Date('2024-01-15T10:30:00'),
    },
    {
      id: 'demo-ai-1',
      role: 'assistant',
      content: 'Great! I can help you customize your branding. Let me check your company website for brand colors.',
      timestamp: new Date('2024-01-15T10:30:15'),
    },
  ],
};

// =============================================================================
// Tool Calls - Map prompts to tool-based UIs
// =============================================================================

export const TOOL_CALLS: Record<string, ToolCall> = {
  'Set up your profile': {
    type: 'profile_form',
    params: {
      detectedValues: {
        company: 'Acme Corp',
        industry: undefined,
      },
    },
  },
  'Set up your branding': {
    type: 'branding_tool',
    params: {
      detectedColors: { primary: '#4C00FF', secondary: '#FF6B35' },
      companyName: 'Acme Corp',
      websiteUrl: 'acme.com',
    },
  },
  'Send for signature': {
    type: 'agent_delegation',
    params: {
      targetAgent: 'send',
      taskDescription: 'Create and send an envelope',
    },
  },
};

// =============================================================================
// Scripted Responses - Rich message responses for onboarding
// =============================================================================

export const SCRIPTED_RESPONSES: Record<string, RichMessageData> = {
  'How do I track document status?': {
    title: 'Tracking Your Documents',
    subtitle: 'Monitor envelope progress',
    sections: [
      {
        icon: 'home',
        title: 'From Your Dashboard',
        items: [
          'View all sent envelopes in the "Sent" tab',
          'Check status: Sent, Delivered, Viewed, Completed',
          'See detailed activity timeline for each envelope',
        ],
      },
      {
        icon: 'bell',
        title: 'Email Notifications',
        items: [
          'Receive alerts when documents are viewed',
          'Get notified when signatures are complete',
          'Set up reminders for pending documents',
        ],
      },
    ],
  },
  'What templates are available?': {
    title: 'Docusign Templates',
    subtitle: 'Pre-built documents for common use cases',
    sections: [
      {
        icon: 'document-stack',
        title: 'Template Gallery',
        items: [
          'NDAs and confidentiality agreements',
          'Sales contracts and proposals',
          'HR onboarding documents',
          'Real estate forms',
        ],
      },
      {
        icon: 'plus',
        title: 'Create Your Own',
        items: [
          'Upload any document as a template',
          'Pre-place signature fields',
          'Set default recipients and roles',
        ],
      },
    ],
  },
  'How do I add team members?': {
    title: 'Adding Team Members',
    subtitle: 'Collaborate with your organization',
    sections: [
      {
        icon: 'people',
        title: 'Invite Users',
        items: [
          'Go to Admin > Users',
          'Click "Add User" and enter their email',
          'Assign a role (Admin, Manager, Sender)',
        ],
      },
      {
        icon: 'settings',
        title: 'Manage Permissions',
        items: [
          'Set sending limits per user',
          'Control template access',
          'Enable or disable features',
        ],
      },
    ],
  },
};

// =============================================================================
// Conflict Responses - Empty for onboarding context
// =============================================================================

export const CONFLICT_RESPONSES: Record<string, ConflictData[]> = {};

// =============================================================================
// Thinking Sequences - Not used in simplified onboarding flow
// =============================================================================

export const THINKING_SEQUENCES: Record<string, ThinkingStep[]> = {};

// =============================================================================
// Agent Actions - Proposed next steps for onboarding
// =============================================================================

export const AGENT_ACTIONS: Record<string, AgentAction[]> = {
  'Set up my branding': [
    {
      id: 'action-1',
      type: 'draft',
      title: 'Apply detected colors',
      description: 'Use the colors we found from your website',
      status: 'proposed',
      confidence: 0.9,
    },
    {
      id: 'action-2',
      type: 'route',
      title: 'Customize colors',
      description: 'Choose your own brand colors',
      status: 'proposed',
      confidence: 0.85,
    },
    {
      id: 'action-3',
      type: 'notify',
      title: 'Send sample envelope',
      description: 'Preview how your branding looks',
      status: 'proposed',
      confidence: 0.8,
    },
  ],
  'Send for signature': [
    {
      id: 'action-1',
      type: 'route',
      title: 'Open envelope composer',
      description: 'Start creating your envelope',
      status: 'proposed',
      confidence: 0.95,
    },
  ],
};

// =============================================================================
// Welcome Message Configuration
// =============================================================================

export const WELCOME_CONFIG = {
  title: "Welcome to Docusign",
  subtitle: "Complete these steps to get started.",
  checklistTitle: "Onboarding checklist",
  questionsTitle: "Questions you can ask",
};

// =============================================================================
// Delegation Configuration
// =============================================================================

export const DELEGATION_CONFIG = {
  send: {
    name: 'Send Agent',
    description: 'Creates and sends envelopes for signature',
    capabilities: ['Upload documents', 'Add recipients', 'Place signature fields', 'Send for signing'],
  },
  qa: {
    name: 'Q&A Agent',
    description: 'Answers questions about Docusign features',
    capabilities: ['Product features', 'How-to guides', 'Best practices', 'Troubleshooting'],
  },
};
