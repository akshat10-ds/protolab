/**
 * MatrixRiskBadge Component
 *
 * Displays risk level indicator with emoji and tooltip showing reason.
 */

import React, { useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import type { RiskLevel } from '../../data/agreement-studio-types';
import styles from './MatrixView.module.css';

export interface MatrixRiskBadgeProps {
  /** Risk level */
  level: RiskLevel;
  /** Reason for the risk level */
  reason?: string;
}

const RISK_CONFIG: Record<RiskLevel, { emoji: string; label: string; className: string }> = {
  high: { emoji: '🔴', label: 'High', className: styles.riskHigh },
  medium: { emoji: '🟡', label: 'Medium', className: styles.riskMedium },
  low: { emoji: '🟢', label: 'Low', className: styles.riskLow },
};

export const MatrixRiskBadge: React.FC<MatrixRiskBadgeProps> = ({
  level,
  reason,
}) => {
  const badgeRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({});

  const config = RISK_CONFIG[level];

  const handleMouseEnter = useCallback(() => {
    if (badgeRef.current && reason) {
      const rect = badgeRef.current.getBoundingClientRect();
      const tooltipWidth = 240;

      // Position tooltip to the left of the badge
      let left = rect.left - tooltipWidth - 8;
      const top = rect.top + rect.height / 2;

      // If not enough space on left, position below
      if (left < 16) {
        left = Math.max(16, rect.left);
        setTooltipStyle({
          top: `${rect.bottom + 8}px`,
          left: `${left}px`,
          transform: 'translateY(0)',
        });
      } else {
        setTooltipStyle({
          top: `${top}px`,
          left: `${left}px`,
          transform: 'translateY(-50%)',
        });
      }
      setIsHovered(true);
    }
  }, [reason]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  // Render tooltip in portal
  const tooltip =
    isHovered && reason
      ? createPortal(
          <div
            className={`${styles.riskTooltip} ${styles.riskTooltipVisible}`}
            style={tooltipStyle}
          >
            <span className={styles.riskTooltipLabel}>
              {config.emoji} {config.label} Risk
            </span>
            <span className={styles.riskTooltipReason}>{reason}</span>
          </div>,
          document.body
        )
      : null;

  return (
    <div
      ref={badgeRef}
      className={`${styles.riskBadge} ${config.className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className={styles.riskEmoji}>{config.emoji}</span>
      <span className={styles.riskLabel}>{config.label}</span>
      {tooltip}
    </div>
  );
};

export default MatrixRiskBadge;
