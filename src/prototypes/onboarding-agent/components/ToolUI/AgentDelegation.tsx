/**
 * AgentDelegation Component
 *
 * Tool-based UI for showing handoff to downstream agents (Send, Q&A).
 * Uses the tool call card pattern (header, content, footer).
 */

import React from 'react';
import { Button, IconButton, Icon } from '@/design-system';
import styles from './ToolUI.module.css';
import { DELEGATION_CONFIG } from '../../data/onboarding-data';

export type AgentType = 'send' | 'qa';

export interface AgentDelegationProps {
  /** Which agent is being invoked */
  targetAgent: AgentType;
  /** Task description */
  taskDescription?: string;
  /** Callback when user proceeds */
  onProceed?: () => void;
  /** Callback when user wants to cancel */
  onCancel?: () => void;
}

export const AgentDelegation: React.FC<AgentDelegationProps> = ({
  targetAgent,
  taskDescription,
  onProceed,
  onCancel,
}) => {
  const agentConfig = DELEGATION_CONFIG[targetAgent];

  return (
    <div className={styles.toolCard}>
      {/* Tool Call Header */}
      <div className={styles.toolCardHeader}>
        <h3 className={styles.toolCardTitle}>HANDING OFF TO {agentConfig.name.toUpperCase()}</h3>
        <div className={styles.toolCardHeaderActions}>
          <IconButton
            icon="overflow-horizontal"
            size="small"
            variant="tertiary"
            aria-label="More options"
          />
        </div>
      </div>

      {/* Content Area */}
      <div className={styles.toolCardContent}>
        <p className={styles.stepQuestion}>{agentConfig.description}</p>

        <div className={styles.delegationInfo}>
          <div className={styles.delegationTarget}>
            <div className={styles.delegationTargetIcon}>
              <Icon name={targetAgent === 'send' ? 'send' : 'help'} size={20} />
            </div>
            <div className={styles.delegationTargetInfo}>
              <span className={styles.delegationTargetName}>{agentConfig.name}</span>
              {taskDescription && (
                <span className={styles.delegationTargetDescription}>{taskDescription}</span>
              )}
            </div>
          </div>

          <div className={styles.delegationCapabilities}>
            <div className={styles.delegationCapabilitiesLabel}>CAPABILITIES</div>
            {agentConfig.capabilities.map((capability, index) => (
              <div key={index} className={styles.delegationCapabilityItem}>
                <Icon name="check" size={14} />
                <span>{capability}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tool Call Footer */}
      <div className={styles.toolCardFooter}>
        {onCancel && (
          <Button kind="tertiary" size="small" onClick={onCancel}>
            Cancel
          </Button>
        )}
        {onProceed && (
          <Button kind="primary" size="small" onClick={onProceed}>
            Continue
          </Button>
        )}
      </div>
    </div>
  );
};

export default AgentDelegation;
