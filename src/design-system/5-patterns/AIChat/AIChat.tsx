/**
 * AIChat Pattern
 *
 * A complete AI chat interface pattern that composes primitives and utilities
 * to create a conversational UI experience.
 *
 * @layer 5-patterns
 *
 * Sub-components:
 * - AIChat (main container)
 * - AIChat.MessageList (scrollable message area)
 * - AIChat.Message (individual message bubble)
 * - AIChat.InputArea (input + send button)
 * - AIChat.TypingIndicator (AI thinking state)
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Stack } from '../../2-utilities/Stack';
import { Inline } from '../../2-utilities/Inline';
import { Avatar } from '../../3-primitives/Avatar';
import { Text } from '../../3-primitives/Typography';
import { Card } from '../../3-primitives/Card';
import { TextArea } from '../../3-primitives/TextArea';
import { IconButton } from '../../3-primitives/IconButton';
import { Button } from '../../3-primitives/Button';
import { Spinner } from '../../3-primitives/Spinner';
import { Icon } from '../../3-primitives/Icon';
import { Tooltip } from '../../3-primitives/Tooltip';
import { AIBadge } from '../../3-primitives/AIBadge';
import styles from './AIChat.module.css';

// ============================================================================
// Types
// ============================================================================

export type MessageRole = 'user' | 'assistant' | 'system';

export type MessageStatus = 'sending' | 'sent' | 'error';

export interface ChatMessage {
  /** Unique identifier for the message */
  id: string;
  /** Who sent the message */
  role: MessageRole;
  /** Message content (supports markdown in future) */
  content: string;
  /** Timestamp of the message */
  timestamp: Date;
  /** Message delivery status */
  status?: MessageStatus;
  /** Optional metadata */
  metadata?: Record<string, unknown>;
}

export interface SuggestedAction {
  /** Action label */
  label: string;
  /** Action description */
  description?: string;
  /** Icon name */
  icon?: string;
}

export interface AIChatProps {
  /** Array of chat messages to display */
  messages: ChatMessage[];
  /** Callback when user sends a message */
  onSendMessage: (content: string) => void;
  /** Whether the AI is currently generating a response */
  isLoading?: boolean;
  /** Placeholder text for the input */
  placeholder?: string;
  /** User avatar (URL or initials) */
  userAvatar?: string;
  /** AI assistant avatar (URL or initials) */
  assistantAvatar?: string;
  /** AI assistant name */
  assistantName?: string;
  /** User name */
  userName?: string;
  /** Whether to show timestamps */
  showTimestamps?: boolean;
  /** Whether to show message actions (copy, etc.) */
  showActions?: boolean;
  /** Callback when a message action is triggered */
  onMessageAction?: (action: string, message: ChatMessage) => void;
  /** Custom welcome message when no messages */
  welcomeMessage?: React.ReactNode;
  /** Welcome title (e.g., "Welcome to Docusign") */
  welcomeTitle?: string;
  /** Suggested actions to show in zero query state */
  suggestedActions?: SuggestedAction[];
  /** Suggested questions to show in zero query state */
  suggestedQuestions?: string[];
  /** Callback when a suggestion is clicked */
  onSuggestionClick?: (suggestion: string) => void;
  /** Maximum height of the chat container */
  maxHeight?: string;
  /** Additional CSS class */
  className?: string;
  /** Disable input */
  disabled?: boolean;
  /** Whether to show the header */
  showHeader?: boolean;
  /** Callback when history/menu button is clicked */
  onShowHistory?: () => void;
  /** Callback when new chat button is clicked */
  onNewChat?: () => void;
  /** Callback when maximize button is clicked */
  onMaximize?: () => void;
  /** Callback when close button is clicked */
  onClose?: () => void;
}

// ============================================================================
// Sub-components
// ============================================================================

interface MessageProps {
  message: ChatMessage;
  userAvatar?: string;
  assistantAvatar?: string;
  userName?: string;
  assistantName?: string;
  showTimestamp?: boolean;
  showActions?: boolean;
  onAction?: (action: string, message: ChatMessage) => void;
}

const Message: React.FC<MessageProps> = ({
  message,
  userAvatar,
  assistantAvatar,
  userName = 'You',
  assistantName = 'Assistant',
  showTimestamp = false,
  showActions = true,
  onAction,
}) => {
  const isUser = message.role === 'user';
  const isSystem = message.role === 'system';

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(message.content);
    onAction?.('copy', message);
  }, [message, onAction]);

  if (isSystem) {
    return (
      <div className={styles.systemMessage}>
        <Text variant="caption" color="secondary">
          {message.content}
        </Text>
      </div>
    );
  }

  return (
    <div className={`${styles.message} ${isUser ? styles.userMessage : styles.assistantMessage}`}>
      <div className={styles.messageContent}>
        {showTimestamp && (
          <Text variant="caption" color="secondary">
            {formatTime(message.timestamp)}
          </Text>
        )}

        <div className={styles.messageBubble}>
          <Text variant="body">{message.content}</Text>
        </div>

        {showActions && !isUser && (
          <div className={styles.messageActions}>
            <Tooltip content="Copy message">
              <IconButton
                icon="duplicate"
                size="small"
                kind="tertiary"
                onClick={handleCopy}
                aria-label="Copy message"
              />
            </Tooltip>
          </div>
        )}

        {message.status === 'error' && (
          <Inline gap="small" align="center">
            <Icon name="status-warn" size="small" />
            <Text variant="caption" color="danger">
              Failed to send
            </Text>
            <Button kind="tertiary" size="small" onClick={() => onAction?.('retry', message)}>
              Retry
            </Button>
          </Inline>
        )}
      </div>
    </div>
  );
};

interface TypingIndicatorProps {
  assistantName?: string;
  assistantAvatar?: string;
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({
  assistantName = 'Assistant',
  assistantAvatar,
}) => {
  return (
    <div className={`${styles.message} ${styles.assistantMessage}`}>
      <div className={styles.messageAvatar}>
        <Avatar src={assistantAvatar} name={assistantName} size="small" />
      </div>
      <div className={styles.messageContent}>
        <Text variant="label" weight="medium">
          {assistantName}
        </Text>
        <div className={styles.typingIndicator}>
          <span className={styles.typingDot} />
          <span className={styles.typingDot} />
          <span className={styles.typingDot} />
        </div>
      </div>
    </div>
  );
};

interface InputAreaProps {
  onSend: (content: string) => void;
  placeholder?: string;
  disabled?: boolean;
  isLoading?: boolean;
  /** Show "Add source" button */
  showAddSource?: boolean;
  /** Callback when add source is clicked */
  onAddSource?: () => void;
  /** Show AI disclaimer */
  showDisclaimer?: boolean;
  /** Custom disclaimer text */
  disclaimerText?: string;
}

const InputArea: React.FC<InputAreaProps> = ({
  onSend,
  placeholder = 'Ask anything...',
  disabled = false,
  isLoading = false,
  showAddSource = true,
  onAddSource,
  showDisclaimer = true,
  disclaimerText = 'Responses are generated with AI and are not legal advice.',
}) => {
  const [value, setValue] = useState('');

  const handleSend = useCallback(() => {
    const trimmed = value.trim();
    if (trimmed && !disabled && !isLoading) {
      onSend(trimmed);
      setValue('');
    }
  }, [value, onSend, disabled, isLoading]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  const canSend = value.trim().length > 0 && !disabled && !isLoading;

  return (
    <div className={styles.inputArea}>
      <div className={styles.inputContainer}>
        <div className={styles.inputContent}>
          <TextArea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
            className={styles.textInput}
            aria-label="Chat message input"
          />
        </div>
        <div className={styles.inputActions}>
          {showAddSource && (
            <button
              type="button"
              className={styles.addSourceButton}
              onClick={onAddSource}
              disabled={disabled}
            >
              <Icon name="plus" size="small" />
              <span>Add source</span>
            </button>
          )}
          {isLoading ? (
            <Spinner size="small" />
          ) : (
            <IconButton
              icon="arrow-up"
              variant="brand"
              size="small"
              onClick={handleSend}
              disabled={!canSend}
              aria-label="Send message"
            />
          )}
        </div>
      </div>
      {showDisclaimer && (
        <Text variant="caption" color="secondary" align="center" className={styles.disclaimer}>
          {disclaimerText}
        </Text>
      )}
    </div>
  );
};

interface WelcomeProps {
  assistantName?: string;
  userName?: string;
  welcomeTitle?: string;
  suggestedActions?: SuggestedAction[];
  suggestedQuestions?: string[];
  onSuggestionClick?: (suggestion: string) => void;
  children?: React.ReactNode;
}

const Welcome: React.FC<WelcomeProps> = ({
  assistantName = 'Assistant',
  userName,
  welcomeTitle,
  suggestedActions,
  suggestedQuestions,
  onSuggestionClick,
  children,
}) => {
  if (children) {
    return <div className={styles.welcome}>{children}</div>;
  }

  const hasZeroQueryState = userName || suggestedActions?.length || suggestedQuestions?.length;

  if (hasZeroQueryState) {
    return (
      <div className={styles.welcomeZeroQuery}>
        <Stack gap="large">
          {/* Greeting */}
          {userName && (
            <div className={styles.welcomeGreeting}>
              <AIBadge />
              <Text variant="heading" className={styles.greetingName}>
                Hello, {userName}
              </Text>
              <Text variant="body" className={styles.greetingSubtitle}>
                {welcomeTitle || 'What would you like to know?'}
              </Text>
            </div>
          )}

          {/* Suggested Actions */}
          {suggestedActions && suggestedActions.length > 0 && (
            <div className={styles.suggestionsSection}>
              <Inline gap="small" align="center" className={styles.sectionHeader}>
                <Text variant="caption" color="secondary" weight="medium">
                  Actions
                </Text>
                <Icon name="chevron-right" size="small" />
              </Inline>
              <Stack gap="small">
                {suggestedActions.map((action, index) => (
                  <button
                    key={index}
                    type="button"
                    className={styles.suggestionCard}
                    onClick={() => onSuggestionClick?.(action.label)}
                  >
                    <div className={styles.suggestionIcon}>
                      <Icon name={(action.icon as any) || 'bolt'} size="medium" />
                    </div>
                    <div className={styles.suggestionContent}>
                      <Text variant="body" weight="medium">
                        {action.label}
                      </Text>
                      {action.description && (
                        <Text variant="caption" color="secondary">
                          {action.description}
                        </Text>
                      )}
                    </div>
                  </button>
                ))}
              </Stack>
            </div>
          )}

          {/* Suggested Questions */}
          {suggestedQuestions && suggestedQuestions.length > 0 && (
            <div className={styles.suggestionsSection}>
              <Inline gap="small" align="center" className={styles.sectionHeader}>
                <Text variant="caption" color="secondary" weight="medium">
                  Questions you can ask
                </Text>
                <Icon name="chevron-right" size="small" />
              </Inline>
              <Stack gap="small">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    type="button"
                    className={styles.questionCard}
                    onClick={() => onSuggestionClick?.(question)}
                  >
                    <Icon name="help" size="small" />
                    <Text variant="body">{question}</Text>
                  </button>
                ))}
              </Stack>
            </div>
          )}
        </Stack>
      </div>
    );
  }

  return (
    <div className={styles.welcome}>
      <Stack gap="medium" align="center">
        <div className={styles.welcomeIcon}>
          <Icon name="messages" size="large" />
        </div>
        <Text variant="body" color="secondary" align="center">
          Start a conversation with {assistantName}
        </Text>
      </Stack>
    </div>
  );
};

// ============================================================================
// Header Sub-component
// ============================================================================

interface HeaderProps {
  onShowHistory?: () => void;
  onNewChat?: () => void;
  onMaximize?: () => void;
  onClose?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onShowHistory, onNewChat, onMaximize, onClose }) => {
  return (
    <div className={styles.header}>
      <div className={styles.headerLeft}>
        <Tooltip content="History">
          <IconButton
            icon="menu"
            size="small"
            kind="tertiary"
            onClick={onShowHistory}
            aria-label="Show history"
          />
        </Tooltip>
      </div>
      <div className={styles.headerRight}>
        <Tooltip content="New chat">
          <IconButton
            icon="plus"
            size="small"
            kind="tertiary"
            onClick={onNewChat}
            aria-label="New chat"
          />
        </Tooltip>
        <Tooltip content="Maximize">
          <IconButton
            icon="container-enlarge"
            size="small"
            kind="tertiary"
            onClick={onMaximize}
            aria-label="Maximize"
          />
        </Tooltip>
        <Tooltip content="Close">
          <IconButton
            icon="close"
            size="small"
            kind="tertiary"
            onClick={onClose}
            aria-label="Close"
          />
        </Tooltip>
      </div>
    </div>
  );
};

// ============================================================================
// Helper Functions
// ============================================================================

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// ============================================================================
// Main Component
// ============================================================================

export const AIChat: React.FC<AIChatProps> = ({
  messages,
  onSendMessage,
  isLoading = false,
  placeholder = 'Type a message...',
  userAvatar,
  assistantAvatar,
  assistantName = 'Assistant',
  userName = 'You',
  showTimestamps = false,
  showActions = true,
  onMessageAction,
  welcomeMessage,
  welcomeTitle,
  suggestedActions,
  suggestedQuestions,
  onSuggestionClick,
  maxHeight = '600px',
  className,
  disabled = false,
  showHeader = true,
  onShowHistory,
  onNewChat,
  onMaximize,
  onClose,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const isEmpty = messages.length === 0;

  // Use CSS custom property for maxHeight to avoid inline styles
  const containerStyle = {
    '--ai-chat-max-height': maxHeight,
  } as React.CSSProperties;

  return (
    <Card className={`${styles.container} ${className || ''}`} style={containerStyle}>
      {showHeader && (
        <Header
          onShowHistory={onShowHistory}
          onNewChat={onNewChat}
          onMaximize={onMaximize}
          onClose={onClose}
        />
      )}
      <div className={styles.messageList}>
        {isEmpty ? (
          <Welcome
            assistantName={assistantName}
            userName={userName !== 'You' ? userName : undefined}
            welcomeTitle={welcomeTitle}
            suggestedActions={suggestedActions}
            suggestedQuestions={suggestedQuestions}
            onSuggestionClick={onSuggestionClick}
          >
            {welcomeMessage}
          </Welcome>
        ) : (
          <Stack gap="medium" className={styles.messages}>
            {messages.map((message) => (
              <Message
                key={message.id}
                message={message}
                userAvatar={userAvatar}
                assistantAvatar={assistantAvatar}
                userName={userName}
                assistantName={assistantName}
                showTimestamp={showTimestamps}
                showActions={showActions}
                onAction={onMessageAction}
              />
            ))}
            {isLoading && (
              <TypingIndicator assistantName={assistantName} assistantAvatar={assistantAvatar} />
            )}
            <div ref={messagesEndRef} />
          </Stack>
        )}
      </div>

      <InputArea
        onSend={onSendMessage}
        placeholder={placeholder}
        disabled={disabled}
        isLoading={isLoading}
      />
    </Card>
  );
};

// Attach sub-components for compound component pattern
AIChat.displayName = 'AIChat';
