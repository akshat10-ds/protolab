/**
 * PromptLibrary Component
 *
 * Displays the Prompt Library view with categorized prompts and user's custom prompts.
 * Allows users to select prompts to run or edit/create custom prompts.
 */

import React, { useState } from 'react';
import { Icon, IconButton, Dropdown } from '@/design-system';
import type { Prompt, PromptCategory } from '../../data/agreement-studio-types';
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
  const [hoveredPromptId, setHoveredPromptId] = useState<string | null>(null);

  const renderPromptCard = (prompt: Prompt, isCustom = false) => (
    <div
      key={prompt.id}
      className={styles.promptCard}
      onClick={() => onSelectPrompt(prompt)}
      onMouseEnter={() => setHoveredPromptId(prompt.id)}
      onMouseLeave={() => setHoveredPromptId(null)}
    >
      <div className={styles.promptCardIcon}>
        <Icon name={prompt.icon || 'document'} size={18} />
      </div>
      <div className={styles.promptCardContent}>
        <div className={styles.promptCardTitle}>{prompt.title}</div>
        <div className={styles.promptCardDescription}>{prompt.description}</div>
      </div>
      {(hoveredPromptId === prompt.id || isCustom) && (
        <div className={styles.promptCardActions}>
          <Dropdown
            items={[
              {
                label: 'Edit',
                icon: <Icon name="edit" size="small" />,
                onClick: (e) => {
                  e?.stopPropagation();
                  onEditPrompt(prompt.id);
                },
              },
              ...(isCustom
                ? [
                    {
                      label: 'Duplicate',
                      icon: <Icon name="duplicate" size="small" />,
                      onClick: (e) => {
                        e?.stopPropagation();
                        // For now, just create a new prompt
                        onCreatePrompt();
                      },
                    },
                  ]
                : []),
            ]}
            position="bottom"
            align="end"
          >
            <IconButton
              icon="overflow-horizontal"
              size="small"
              kind="tertiary"
              onClick={(e) => e.stopPropagation()}
              aria-label="Prompt options"
            />
          </Dropdown>
        </div>
      )}
    </div>
  );

  const renderCategory = (category: PromptCategory) => (
    <div key={category.id} className={styles.category}>
      <div className={styles.categoryHeader}>
        <span className={styles.categoryTitle}>{category.title}</span>
      </div>
      <div className={styles.categoryPrompts}>
        {category.prompts.map((prompt) => renderPromptCard(prompt))}
      </div>
    </div>
  );

  return (
    <div className={styles.promptLibrary}>
      {/* Page Header */}
      <div className={styles.pageHeader}>
        <h2 className={styles.pageTitle}>Prompts</h2>
        <button
          type="button"
          className={styles.newPromptButton}
          onClick={onCreatePrompt}
        >
          <Icon name="plus" size={14} />
          <span>New</span>
        </button>
      </div>

      <div className={styles.promptLibraryContent}>
        {/* User's Custom Prompts (if any) */}
        {userPrompts.length > 0 && (
          <div className={styles.category}>
            <div className={styles.categoryHeader}>
              <span className={styles.categoryTitle}>My Prompts</span>
            </div>
            <div className={styles.categoryPrompts}>
              {userPrompts.map((prompt) => renderPromptCard(prompt, true))}
            </div>
          </div>
        )}

        {/* Built-in Categories */}
        {PROMPT_LIBRARY.map((category) => renderCategory(category))}
      </div>
    </div>
  );
};

export default PromptLibrary;
