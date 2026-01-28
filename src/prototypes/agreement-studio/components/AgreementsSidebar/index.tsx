/**
 * AgreementsSidebar Component
 *
 * Shows agreements loaded in context with selection management.
 * Features:
 * - Select all/individual agreement checkboxes
 * - Ripple animation on checkbox interaction
 * - Click to preview document
 * - Pending selection state - only commits on "Chat" button click
 */

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Icon, IconButton, Checkbox, Button } from '@/design-system';
import type { Agreement } from '../../data/agreement-studio-types';
import styles from './AgreementsSidebar.module.css';

export interface AgreementsSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  agreements: Agreement[];
  onAgreementClick: (agreement: Agreement, itemRect: DOMRect | null) => void;
  /** Selected agreement IDs (controlled state from parent) */
  selectedIds: Set<string>;
  /** Callback when selection is confirmed via Chat button */
  onSelectionChange: (selectedIds: Set<string>) => void;
}

export const AgreementsSidebar: React.FC<AgreementsSidebarProps> = ({
  isOpen,
  onClose,
  agreements,
  onAgreementClick,
  selectedIds,
  onSelectionChange,
}) => {
  const itemRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const [rippleId, setRippleId] = useState<string | null>(null);

  // Pending selection state - only committed when user clicks Chat
  const [pendingIds, setPendingIds] = useState<Set<string>>(new Set(selectedIds));

  // Sync pending state when sidebar opens or selectedIds changes externally
  useEffect(() => {
    if (isOpen) {
      setPendingIds(new Set(selectedIds));
    }
  }, [isOpen, selectedIds]);

  const allSelected = pendingIds.size === agreements.length;
  const hasChanges =
    pendingIds.size !== selectedIds.size || ![...pendingIds].every((id) => selectedIds.has(id));

  // Trigger ripple animation on a checkbox
  const triggerRipple = useCallback((id: string) => {
    setRippleId(id);
    setTimeout(() => setRippleId(null), 400); // Match animation duration
  }, []);

  const handleSelectAll = useCallback(() => {
    triggerRipple('select-all');
    if (allSelected) {
      setPendingIds(new Set());
    } else {
      setPendingIds(new Set(agreements.map((a) => a.id)));
    }
  }, [allSelected, agreements, triggerRipple]);

  // Simple toggle function for checkbox onChange
  const toggleItem = useCallback(
    (id: string) => {
      triggerRipple(id);
      const next = new Set(pendingIds);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      setPendingIds(next);
    },
    [pendingIds, triggerRipple]
  );

  // Commit selection and close sidebar
  const handleConfirmSelection = useCallback(() => {
    onSelectionChange(pendingIds);
    onClose();
  }, [pendingIds, onSelectionChange, onClose]);

  const handleItemClick = useCallback(
    (agreement: Agreement) => {
      const itemEl = itemRefs.current.get(agreement.id);
      const rect = itemEl?.getBoundingClientRect() || null;
      onAgreementClick(agreement, rect);
    },
    [onAgreementClick]
  );

  const wrapperClasses = [
    styles.agreementsSidebarWrapper,
    isOpen ? styles.agreementsSidebarWrapperOpen : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={wrapperClasses}>
      <div className={styles.agreementsSidebar}>
        {/* Header with close button */}
        <div className={styles.agreementsSidebarHeader}>
          <span className={styles.agreementsSidebarHeaderTitle}>Sources</span>
          <IconButton
            icon="close"
            size="small"
            kind="tertiary"
            onClick={onClose}
            aria-label="Close"
          />
        </div>

        {/* Select All Row */}
        <button
          type="button"
          className={styles.agreementsSidebarSelectAll}
          onClick={handleSelectAll}
        >
          <span className={styles.agreementsSidebarSelectAllText}>Select all sources</span>
          {/* Wrap checkbox in div to capture click - parent button handles the toggle */}
          <div
            role="presentation"
            className={`${styles.agreementsSidebarCheckbox} ${rippleId === 'select-all' ? styles.checkboxRipple : ''}`}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.stopPropagation();
              }
            }}
          >
            <Checkbox checked={allSelected} onChange={handleSelectAll} label="" showLabel={false} />
          </div>
        </button>

        {/* Divider */}
        <div className={styles.agreementsSidebarDivider} />

        {/* Agreement List */}
        <div className={styles.agreementsSidebarList}>
          {agreements.map((agreement) => {
            const isSelected = pendingIds.has(agreement.id);
            return (
              <button
                key={agreement.id}
                ref={(el) => {
                  if (el) itemRefs.current.set(agreement.id, el);
                  else itemRefs.current.delete(agreement.id);
                }}
                type="button"
                className={styles.agreementsSidebarItem}
                onClick={() => handleItemClick(agreement)}
              >
                <div className={styles.agreementsSidebarItemIcon}>
                  <Icon name="document" size={18} />
                </div>
                <span className={styles.agreementsSidebarItemTitle}>{agreement.fileName}</span>
                {/* Checkbox wrapper - only onChange handles toggle, wrapper just stops propagation */}
                <div
                  role="presentation"
                  className={`${styles.agreementsSidebarCheckbox} ${rippleId === agreement.id ? styles.checkboxRipple : ''}`}
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.stopPropagation();
                    }
                  }}
                >
                  <Checkbox
                    checked={isSelected}
                    onChange={() => toggleItem(agreement.id)}
                    label=""
                    showLabel={false}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer with Chat button */}
        <div className={styles.agreementsSidebarFooter}>
          <Button
            variant="brand"
            size="medium"
            onClick={handleConfirmSelection}
            disabled={pendingIds.size === 0}
            fullWidth
          >
            Chat with {pendingIds.size} {pendingIds.size === 1 ? 'agreement' : 'agreements'}
          </Button>
        </div>
      </div>
    </div>
  );
};
