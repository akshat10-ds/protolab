/**
 * PromptEditor Component
 *
 * Form for creating or editing custom prompts.
 * Allows users to define name, description, and instructions for their prompts.
 */

import React, { useState, useEffect } from 'react';
import { Button, Input, TextArea } from '@/design-system';
import type { Prompt } from '../../data/agreement-studio-types';
import styles from './PromptEditor.module.css';

export interface PromptEditorProps {
  /** ID of prompt to edit, or undefined for creating new */
  promptId?: string | null;
  /** Existing prompt data if editing */
  existingPrompt?: Prompt | null;
  /** Called when save is clicked */
  onSave: (prompt: Omit<Prompt, 'id'> & { id?: string }) => void;
  /** Called when cancel is clicked */
  onCancel: () => void;
}

export const PromptEditor: React.FC<PromptEditorProps> = ({
  promptId,
  existingPrompt,
  onSave,
  onCancel,
}) => {
  const isEditing = !!promptId;

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [instructions, setInstructions] = useState('');

  // Load existing prompt data when editing
  useEffect(() => {
    if (existingPrompt) {
      setTitle(existingPrompt.title);
      setDescription(existingPrompt.description);
      setInstructions(existingPrompt.instructions || '');
    } else {
      // Reset form for new prompt
      setTitle('');
      setDescription('');
      setInstructions('');
    }
  }, [existingPrompt]);

  const handleSave = () => {
    if (!title.trim()) return;

    onSave({
      id: promptId || undefined,
      title: title.trim(),
      description: description.trim(),
      instructions: instructions.trim(),
      icon: 'document', // Default icon for custom prompts
      isCustom: true,
    });
  };

  const isValid = title.trim().length > 0;

  return (
    <div className={styles.promptEditor}>
      <div className={styles.promptEditorContent}>
        <div className={styles.formField}>
          <label className={styles.fieldLabel}>Name</label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Check Auto-Renewal Terms"
          />
        </div>

        <div className={styles.formField}>
          <label className={styles.fieldLabel}>Description</label>
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Brief description of what this prompt does"
          />
        </div>

        <div className={styles.formField}>
          <label className={styles.fieldLabel}>Instructions (optional)</label>
          <TextArea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            placeholder="Detailed instructions for the AI. Include specific questions, format requirements, or focus areas."
            rows={8}
          />
          <p className={styles.fieldHint}>
            Write clear instructions for what the AI should analyze or extract from the documents.
          </p>
        </div>
      </div>

      <div className={styles.promptEditorActions}>
        <Button kind="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button kind="primary" onClick={handleSave} disabled={!isValid}>
          {isEditing ? 'Save Changes' : 'Create Prompt'}
        </Button>
      </div>
    </div>
  );
};

export default PromptEditor;
