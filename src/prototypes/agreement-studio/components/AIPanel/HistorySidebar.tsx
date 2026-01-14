/**
 * HistorySidebar Component
 *
 * Renders the chat history sidebar with grouped history items.
 * Supports both inline (wide panel) and overlay (narrow panel) modes.
 */

import React from 'react';
import { Icon, IconButton } from '@/design-system';
import styles from './HistorySidebar.module.css';

export interface HistoryItem {
  id: string;
  title: string;
  time: string;
  messages: number;
}

export interface ChatHistoryData {
  today: HistoryItem[];
  yesterday: HistoryItem[];
  lastWeek: HistoryItem[];
}

export interface HistorySidebarProps {
  /** Chat history data grouped by time period */
  history: ChatHistoryData;
  /** Currently active history item ID */
  activeHistoryId: string | null;
  /** Callback when a history item is clicked */
  onHistoryItemClick: (id: string) => void;
  /** Callback to close the sidebar */
  onClose: () => void;
}

export const HistorySidebar: React.FC<HistorySidebarProps> = ({
  history,
  activeHistoryId,
  onHistoryItemClick,
  onClose,
}) => {
  const renderHistoryGroup = (label: string, items: HistoryItem[]) => {
    if (items.length === 0) return null;

    return (
      <div className={styles.historyGroup}>
        <div className={styles.historyGroupLabel}>{label}</div>
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`${styles.historyItem} ${activeHistoryId === item.id ? styles.historyItemActive : ''}`}
            onClick={() => onHistoryItemClick(item.id)}
          >
            <span className={styles.historyItemIcon}>
              <Icon name="comment" size={16} />
            </span>
            <div className={styles.historyItemContent}>
              <p className={styles.historyItemTitle}>{item.title}</p>
              <span className={styles.historyItemMeta}>
                {item.time} · {item.messages} messages
              </span>
            </div>
          </button>
        ))}
      </div>
    );
  };

  return (
    <>
      <div className={styles.historyHeader}>
        <h3 className={styles.historyTitle}>Chat History</h3>
        <IconButton
          icon="close"
          size="small"
          kind="tertiary"
          onClick={onClose}
          aria-label="Close history"
        />
      </div>
      <div className={styles.historyList}>
        {renderHistoryGroup('Today', history.today)}
        {renderHistoryGroup('Yesterday', history.yesterday)}
        {renderHistoryGroup('Last 7 Days', history.lastWeek)}
      </div>
    </>
  );
};
