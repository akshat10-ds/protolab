/**
 * PromptLibrary Component
 *
 * Google Gems-inspired design with:
 * - Vertical cards with colorful icons for premade prompts
 * - Collapsible Docusign Prompts section
 * - Always-visible My Prompts section
 */

import React, { useMemo, useState } from 'react';
import { Icon, IconButton, Button, Tooltip, Dropdown, Heading, Text } from '@/design-system';
import type { Prompt } from '../../data/agreement-studio-types';
import { PROMPT_LIBRARY, USER_PROMPTS } from '../../data/agreement-studio-data';
import styles from './PromptLibrary.module.css';

export interface PromptLibraryProps {
  /** Called when a prompt is selected to run */
  onSelectPrompt: (prompt: Prompt) => void;
  /** Called when user wants to edit a prompt */
  onEditPrompt: (promptId: string) => void;
  /** Called when user wants to create a new prompt */
  onCreatePrompt: () => void;
  /** User-created prompts (can be passed in or use default) */
  userPrompts?: Prompt[];
}

export const PromptLibrary: React.FC<PromptLibraryProps> = ({
  onSelectPrompt,
  onEditPrompt,
  onCreatePrompt,
  userPrompts = USER_PROMPTS,
}) => {
  const [docusignPromptsExpanded, setDocusignPromptsExpanded] = useState(false);

  // Flatten all premade prompts from categories
  const allPremadePrompts = useMemo(() => {
    return PROMPT_LIBRARY.flatMap((category) => category.prompts);
  }, []);

  // Show 4 when collapsed, all when expanded
  const visiblePremadePrompts = docusignPromptsExpanded
    ? allPremadePrompts
    : allPremadePrompts.slice(0, 4);

  // Render a vertical card for premade prompts
  const renderPremadeCard = (prompt: Prompt) => {
    return (
      <div key={prompt.id} className={styles.premadeCard} onClick={() => onSelectPrompt(prompt)}>
        <div className={styles.premadeCardHeader}>
          <div className={styles.premadeCardIcon}>
            <Icon name={prompt.icon || 'bolt'} size={18} />
          </div>
          <div className={styles.premadeCardOverflow}>
            <Dropdown
              items={[
                {
                  label: 'Run prompt',
                  icon: <Icon name="control-play" size="small" />,
                  onClick: (e) => {
                    e?.stopPropagation();
                    onSelectPrompt(prompt);
                  },
                },
              ]}
              position="bottom"
              align="end"
            >
              <IconButton
                icon="overflow-vertical"
                size="small"
                kind="tertiary"
                onClick={(e) => e.stopPropagation()}
                aria-label="More options"
              />
            </Dropdown>
          </div>
        </div>
        <Text as="div" size="sm" weight="medium" className={styles.premadeCardTitle}>
          {prompt.title}
        </Text>
        <Text as="div" size="xs" color="secondary" className={styles.premadeCardDescription}>
          {prompt.description}
        </Text>
      </div>
    );
  };

  // Render a list item for user prompts
  const renderUserPromptItem = (prompt: Prompt) => (
    <button
      key={prompt.id}
      type="button"
      className={styles.promptItem}
      onClick={() => onSelectPrompt(prompt)}
    >
      <div className={styles.promptIcon}>
        <Icon name={prompt.icon || 'bolt'} size={18} />
      </div>
      <div className={styles.promptContent}>
        <Text as="div" size="sm" weight="medium" className={styles.promptTitle}>
          {prompt.title}
        </Text>
        <Text as="div" size="xs" color="secondary" className={styles.promptDescription}>
          {prompt.description}
        </Text>
      </div>
      <div className={styles.promptActions}>
        <Tooltip content="Edit">
          <IconButton
            icon="edit"
            size="small"
            kind="tertiary"
            onClick={(e) => {
              e.stopPropagation();
              onEditPrompt(prompt.id);
            }}
            aria-label="Edit prompt"
          />
        </Tooltip>
        <Tooltip content="Run">
          <IconButton
            icon="control-play"
            size="small"
            kind="tertiary"
            onClick={(e) => {
              e.stopPropagation();
              onSelectPrompt(prompt);
            }}
            aria-label="Run prompt"
          />
        </Tooltip>
      </div>
    </button>
  );

  return (
    <div className={styles.promptLibrary}>
      {/* Page Header */}
      <div className={styles.pageHeader}>
        <div className={styles.pageHeaderLeft}>
          <Heading level={2} className={styles.pageTitle}>
            Prompt Library
          </Heading>
          <Text size="sm" color="secondary" className={styles.pageSubtitle}>
            Run pre-built prompts or create your own
          </Text>
        </div>
      </div>

      {/* Content */}
      <div className={styles.content}>
        {/* Docusign Prompts Section */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <Text as="span" size="md" weight="medium" className={styles.sectionTitle}>
              Docusign Prompts
            </Text>
            <IconButton
              icon={docusignPromptsExpanded ? 'chevron-up' : 'chevron-down'}
              size="small"
              kind="tertiary"
              onClick={() => setDocusignPromptsExpanded(!docusignPromptsExpanded)}
              aria-label={docusignPromptsExpanded ? 'Collapse' : 'Expand'}
            />
          </div>
          <div className={styles.premadeGrid}>
            {visiblePremadePrompts.map((prompt) => renderPremadeCard(prompt))}
          </div>
        </div>

        {/* My Prompts Section */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <Text as="span" size="md" weight="medium" className={styles.sectionTitle}>
              My Prompts
            </Text>
            <Button size="small" kind="secondary" onClick={onCreatePrompt}>
              <Icon name="plus" size={14} />
              New Prompt
            </Button>
          </div>
          <div className={styles.promptList}>
            {userPrompts.length > 0 ? (
              userPrompts.map((prompt) => renderUserPromptItem(prompt))
            ) : (
              <div className={styles.emptyState}>
                <Icon name="document-stack" size={24} className={styles.emptyIcon} />
                <Text size="sm" color="secondary">
                  No custom prompts yet
                </Text>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptLibrary;
