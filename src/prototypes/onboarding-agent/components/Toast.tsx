/**
 * Toast Component
 *
 * Simple notification toast with loading, success, and error states.
 * Used for displaying feedback messages (e.g., "Link copied", "Sharing...").
 */

import React from 'react';
import { Icon, Spinner } from '@/design-system';
import styles from './Toast.module.css';

export interface ToastProps {
  isVisible: boolean;
  message: string;
  status: 'loading' | 'success' | 'error';
}

export const Toast: React.FC<ToastProps> = ({ isVisible, message, status }) => {
  return (
    <div className={`${styles.toast} ${isVisible ? styles.toastVisible : ''}`}>
      <span className={styles.toastIcon}>
        {status === 'loading' && (
          <span className={styles.toastIconLoading}>
            <Spinner size="small" />
          </span>
        )}
        {status === 'success' && (
          <span className={styles.toastIconSuccess}>
            <Icon name="status-check" size={20} />
          </span>
        )}
        {status === 'error' && (
          <span className={styles.toastIconError}>
            <Icon name="status-warn" size={20} />
          </span>
        )}
      </span>
      <span className={styles.toastMessage}>{message}</span>
    </div>
  );
};
