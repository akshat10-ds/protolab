import React, { useState, useCallback } from 'react';
import { Badge } from '@/design-system';
import { GlobalNav, LocalNav, AIChat, ChatMessage } from '@/design-system/5-patterns';
import DocuSignLogo from '@/assets/Docusign Horizontal Black.svg';
import styles from '../Showcase.module.css';

export interface PatternsShowcaseProps {
  activeSubpage: string;
}

// Header menu items for LocalNav Start button dropdown
const headerMenuItems = [
  { id: 'envelopes', label: 'Envelopes', icon: 'envelope' as const, hasSubmenu: true },
  { id: 'create-request', label: 'Create Request', icon: 'document-plus' as const },
  { id: 'maestro', label: 'Maestro Workflows', icon: 'workflow' as const, hasSubmenu: true },
  { id: 'powerform', label: 'Create PowerForm', icon: 'bolt' as const },
  { id: 'workspace', label: 'Create Workspace', icon: 'folder-plus' as const },
];

const docuSignLogo = (
  <img src={DocuSignLogo} alt="DocuSign" style={{ height: '24px', width: 'auto' }} />
);

export const PatternsShowcase: React.FC<PatternsShowcaseProps> = ({ activeSubpage }) => {
  // GlobalNav state
  const [globalNavActive, setGlobalNavActive] = React.useState('agreements');

  // LocalNav state
  const [localNavActive, setLocalNavActive] = React.useState('completed');
  const [localNavToggle, setLocalNavToggle] = React.useState(true);
  const [localNavLocked, setLocalNavLocked] = React.useState(true);
  const [localNavCollapsed, setLocalNavCollapsed] = React.useState(false);

  const handleLockClick = () => {
    const newLocked = !localNavLocked;
    setLocalNavLocked(newLocked);
    setLocalNavCollapsed(!newLocked);
  };

  // GlobalNav items - DocuSign style
  const globalNavItems = [
    {
      id: 'home',
      label: 'Home',
      active: globalNavActive === 'home',
      onClick: () => setGlobalNavActive('home'),
    },
    {
      id: 'agreements',
      label: 'Agreements',
      active: globalNavActive === 'agreements',
      onClick: () => setGlobalNavActive('agreements'),
    },
    {
      id: 'templates',
      label: 'Templates',
      active: globalNavActive === 'templates',
      onClick: () => setGlobalNavActive('templates'),
    },
    {
      id: 'reports',
      label: 'Reports',
      active: globalNavActive === 'reports',
      onClick: () => setGlobalNavActive('reports'),
    },
    {
      id: 'admin',
      label: 'Admin',
      active: globalNavActive === 'admin',
      onClick: () => setGlobalNavActive('admin'),
    },
  ];

  // LocalNav sections - DocuSign Agreements style
  const localNavSections = [
    {
      id: 'main',
      items: [
        {
          id: 'all-agreements',
          label: 'All Agreements',
          icon: 'envelope' as const,
          active: localNavActive === 'all-agreements',
          onClick: () => setLocalNavActive('all-agreements'),
        },
        {
          id: 'drafts',
          label: 'Drafts',
          nested: true,
          active: localNavActive === 'drafts',
          onClick: () => setLocalNavActive('drafts'),
        },
        {
          id: 'in-progress',
          label: 'In Progress',
          nested: true,
          active: localNavActive === 'in-progress',
          onClick: () => setLocalNavActive('in-progress'),
        },
        {
          id: 'completed',
          label: 'Completed',
          nested: true,
          active: localNavActive === 'completed',
          onClick: () => setLocalNavActive('completed'),
        },
        {
          id: 'deleted',
          label: 'Deleted',
          nested: true,
          active: localNavActive === 'deleted',
          onClick: () => setLocalNavActive('deleted'),
        },
      ],
    },
    {
      id: 'folders',
      items: [
        {
          id: 'folders',
          label: 'Folders',
          icon: 'folder' as const,
          hasMenu: true,
          active: localNavActive === 'folders',
          onClick: () => setLocalNavActive('folders'),
        },
      ],
    },
    {
      id: 'features',
      hasDivider: true,
      items: [
        {
          id: 'parties',
          label: 'Parties',
          icon: 'building-person' as const,
          badge: 'New',
          active: localNavActive === 'parties',
          onClick: () => setLocalNavActive('parties'),
        },
        {
          id: 'requests',
          label: 'Requests',
          icon: 'ticket' as const,
          badge: 'New',
          active: localNavActive === 'requests',
          onClick: () => setLocalNavActive('requests'),
        },
        {
          id: 'maestro-workflows',
          label: 'Maestro Workflows',
          icon: 'workflow' as const,
          badge: 'New',
          active: localNavActive === 'maestro-workflows',
          onClick: () => setLocalNavActive('maestro-workflows'),
        },
        {
          id: 'workspaces',
          label: 'Workspaces',
          icon: 'transaction' as const,
          active: localNavActive === 'workspaces',
          onClick: () => setLocalNavActive('workspaces'),
        },
        {
          id: 'powerforms',
          label: 'PowerForms',
          icon: 'flash' as const,
          active: localNavActive === 'powerforms',
          onClick: () => setLocalNavActive('powerforms'),
        },
        {
          id: 'bulk-send',
          label: 'Bulk Send',
          icon: 'document-stack' as const,
          active: localNavActive === 'bulk-send',
          onClick: () => setLocalNavActive('bulk-send'),
        },
      ],
    },
  ];

  if (activeSubpage === 'globalnav') {
    return (
      <div className={styles.tokenPage}>
        {/* Default GlobalNav - DocuSign Style */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Default GlobalNav</h3>
          </div>
          <div style={{ margin: '-1px -1px 0 -1px', overflow: 'hidden' }}>
            <GlobalNav
              logo={docuSignLogo}
              navItems={globalNavItems}
              showAppSwitcher={false}
              showSearch
              searchVariant="pill"
              showNotifications
              notificationCount={1}
              showSettings
              settingsIcon="filter"
              user={{ name: 'AM' }}
            />
          </div>
        </div>

        {/* Key Features */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Features</h3>
          </div>
          <div className={styles.demoGrid}>
            <Badge variant="neutral">Logo</Badge>
            <Badge variant="neutral">Primary navigation</Badge>
            <Badge variant="neutral">Search pill</Badge>
            <Badge variant="neutral">Notifications</Badge>
            <Badge variant="neutral">Settings/Filter</Badge>
            <Badge variant="neutral">Help</Badge>
            <Badge variant="neutral">User avatar</Badge>
          </div>
        </div>
      </div>
    );
  }

  if (activeSubpage === 'localnav') {
    return (
      <div className={styles.tokenPage}>
        {/* Default LocalNav - DocuSign Agreements Style */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Default LocalNav</h3>
          </div>
          <div
            style={{
              height: '720px',
              border: '1px solid var(--ink-border-default)',
              borderRadius: 'var(--ink-radius-size-xs)',
              overflow: 'hidden',
              margin: '0 8px',
            }}
          >
            <LocalNav
              headerLabel="Start"
              headerIcon="plus"
              headerMenuItems={headerMenuItems}
              sections={localNavSections}
              activeItemId={localNavActive}
              collapsed={localNavCollapsed}
              footerToggle={{
                label: 'New navigation',
                checked: localNavToggle,
                onChange: setLocalNavToggle,
              }}
              footerLockButton={{ locked: localNavLocked, onLockClick: handleLockClick }}
            />
          </div>
          <div className={styles.demoRow}>
            <Badge variant={localNavLocked ? 'success' : 'warning'}>
              {localNavLocked ? 'Locked (Expanded)' : 'Unlocked (Collapsible)'}
            </Badge>
            <span className={styles.demoDesc}>Click lock icon to toggle collapse behavior</span>
          </div>
        </div>

        {/* Key Features */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Features</h3>
          </div>
          <div className={styles.demoGrid}>
            <Badge variant="neutral">Start dropdown</Badge>
            <Badge variant="neutral">Nested items</Badge>
            <Badge variant="neutral">Item badges</Badge>
            <Badge variant="neutral">Context menus</Badge>
            <Badge variant="neutral">Active indicators</Badge>
            <Badge variant="neutral">Icon support</Badge>
            <Badge variant="neutral">Footer toggle</Badge>
            <Badge variant="neutral">Lock/unlock</Badge>
          </div>
        </div>
      </div>
    );
  }

  if (activeSubpage === 'aichat') {
    return <AIChatDemo />;
  }

  return null;
};

// AIChat Demo Component
const AIChatDemo: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm here to help you with your documents. How can I assist you today?",
      timestamp: new Date(Date.now() - 60000),
    },
    {
      id: '2',
      role: 'user',
      content: 'I need help understanding the signature process for my contract.',
      timestamp: new Date(Date.now() - 45000),
    },
    {
      id: '3',
      role: 'assistant',
      content:
        "I'd be happy to help you understand the signature process! Here's a quick overview:\n\n1. Upload your document\n2. Add signature fields\n3. Send to recipients\n4. Track completion\n\nWould you like me to walk you through any specific step?",
      timestamp: new Date(Date.now() - 30000),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [showEmpty, setShowEmpty] = useState(false);

  // Sample suggested actions for zero query state
  const suggestedActions = [
    {
      label: 'Send a document',
      description: 'Upload and send documents for signature',
      icon: 'send',
    },
    {
      label: 'Check agreement status',
      description: 'View the status of your pending agreements',
      icon: 'document',
    },
  ];

  // Sample suggested questions for zero query state
  const suggestedQuestions = [
    'How do I add a signature field?',
    'What happens after I send a document?',
    'How can I track who has signed?',
  ];

  const handleSendMessage = useCallback((content: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);

    // Simulate AI response
    setIsLoading(true);
    setTimeout(() => {
      const response: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Thanks for your message! I received: "${content.slice(0, 50)}${content.length > 50 ? '...' : ''}"`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, response]);
      setIsLoading(false);
    }, 1500);
  }, []);

  const handleMessageAction = useCallback((action: string, message: ChatMessage) => {
    if (action === 'copy') {
      navigator.clipboard.writeText(message.content);
    }
  }, []);

  return (
    <div className={styles.tokenPage}>
      {/* Interactive Demo */}
      <div className={styles.tokenSection}>
        <div className={styles.tokenSectionHeader}>
          <h3 className={styles.tokenSectionTitle}>Interactive Demo</h3>
          <button
            onClick={() => setShowEmpty(!showEmpty)}
            style={{
              padding: '4px 12px',
              borderRadius: 'var(--ink-radius-size-xs)',
              border: '1px solid var(--ink-border-default)',
              background: 'var(--ink-bg-default)',
              cursor: 'pointer',
              fontSize: '12px',
            }}
          >
            {showEmpty ? 'Show Conversation' : 'Show Empty State'}
          </button>
        </div>
        <div
          style={{
            height: '500px',
            border: '1px solid var(--ink-border-default)',
            borderRadius: 'var(--ink-radius-size-s)',
            overflow: 'hidden',
          }}
        >
          <AIChat
            messages={showEmpty ? [] : messages}
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
            assistantName="DocuSign Assistant"
            userName={showEmpty ? 'Akshat' : 'You'}
            welcomeTitle={showEmpty ? 'Welcome to DocuSign' : undefined}
            suggestedActions={showEmpty ? suggestedActions : undefined}
            suggestedQuestions={showEmpty ? suggestedQuestions : undefined}
            onSuggestionClick={handleSendMessage}
            showTimestamps
            showActions
            onMessageAction={handleMessageAction}
            maxHeight="500px"
            placeholder="Type a message..."
            showHeader
            onShowHistory={() => console.log('Show history')}
            onNewChat={() => console.log('New chat')}
            onMaximize={() => console.log('Maximize')}
            onClose={() => console.log('Close')}
          />
        </div>
      </div>

      {/* Loading State Demo */}
      <div className={styles.tokenSection}>
        <div className={styles.tokenSectionHeader}>
          <h3 className={styles.tokenSectionTitle}>Loading State</h3>
        </div>
        <div
          style={{
            height: '200px',
            border: '1px solid var(--ink-border-default)',
            borderRadius: 'var(--ink-radius-size-s)',
            overflow: 'hidden',
          }}
        >
          <AIChat
            messages={[
              {
                id: 'loading-1',
                role: 'user',
                content: 'What documents do I have pending?',
                timestamp: new Date(),
              },
            ]}
            onSendMessage={() => {}}
            isLoading={true}
            assistantName="Assistant"
            maxHeight="200px"
            disabled
          />
        </div>
      </div>

      {/* Key Features */}
      <div className={styles.tokenSection}>
        <div className={styles.tokenSectionHeader}>
          <h3 className={styles.tokenSectionTitle}>Features</h3>
        </div>
        <div className={styles.demoGrid}>
          <Badge variant="neutral">Message bubbles</Badge>
          <Badge variant="neutral">User/Assistant avatars</Badge>
          <Badge variant="neutral">Typing indicator</Badge>
          <Badge variant="neutral">Copy message</Badge>
          <Badge variant="neutral">Timestamps</Badge>
          <Badge variant="neutral">Error states</Badge>
          <Badge variant="neutral">Welcome message</Badge>
          <Badge variant="neutral">Auto-scroll</Badge>
          <Badge variant="neutral">Keyboard shortcuts</Badge>
        </div>
      </div>

      {/* Props Overview */}
      <div className={styles.tokenSection}>
        <div className={styles.tokenSectionHeader}>
          <h3 className={styles.tokenSectionTitle}>Props</h3>
        </div>
        <div className={styles.demoGrid}>
          <Badge variant="info">messages</Badge>
          <Badge variant="info">onSendMessage</Badge>
          <Badge variant="info">isLoading</Badge>
          <Badge variant="info">assistantName</Badge>
          <Badge variant="info">showTimestamps</Badge>
          <Badge variant="info">showActions</Badge>
          <Badge variant="info">maxHeight</Badge>
          <Badge variant="info">disabled</Badge>
        </div>
      </div>
    </div>
  );
};
