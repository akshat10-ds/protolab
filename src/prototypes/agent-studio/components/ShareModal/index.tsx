/**
 * ShareModal Component
 *
 * Google Docs-style share dialog for sharing AI chat conversations.
 * Features:
 * - Link sharing with permission levels (anyone/restricted)
 * - Email invitation with view/edit permissions
 * - Copy link to clipboard functionality
 */

import React, { useState, useCallback } from 'react';
import { Modal, Button, Input, Dropdown, Icon, Text, Stack, Inline } from '@/design-system';
import styles from './ShareModal.module.css';

export interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShare: (email: string, permission: string) => void;
  onCopyLink: () => void;
  shareLink: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  onShare,
  onCopyLink,
  shareLink,
}) => {
  const [email, setEmail] = useState('');
  const [emailPermission, setEmailPermission] = useState<'view' | 'edit'>('view');
  const [linkPermission, setLinkPermission] = useState<'anyone' | 'restricted'>('restricted');
  const [showCopied, setShowCopied] = useState(false);

  const handleCopyLink = useCallback(() => {
    navigator.clipboard.writeText(shareLink);
    setShowCopied(true);
    onCopyLink();
    setTimeout(() => setShowCopied(false), 2000);
  }, [shareLink, onCopyLink]);

  const handleShare = useCallback(() => {
    if (email.trim()) {
      onShare(email, emailPermission);
      setEmail('');
      setEmailPermission('view');
    }
  }, [email, emailPermission, onShare]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && email.trim()) {
        handleShare();
      }
    },
    [email, handleShare]
  );

  const footerContent = (
    <Inline gap="small" justify="end">
      <Button kind="tertiary" size="medium" onClick={onClose}>
        Cancel
      </Button>
      <Button kind="primary" size="medium" onClick={handleShare} disabled={!email.trim()}>
        Share
      </Button>
    </Inline>
  );

  return (
    <Modal open={isOpen} onClose={onClose} size="medium" title="Share" footer={footerContent}>
      <Stack gap="large" className={styles.shareModalContent}>
        {/* Link Sharing Section */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionIcon}>
              <Icon name="link" size="small" />
            </div>
            <div className={styles.sectionTitleGroup}>
              <Text variant="label" weight="medium">
                Get link
              </Text>
              <Text variant="caption" color="subtle">
                {linkPermission === 'anyone'
                  ? 'Anyone on the internet with this link can view'
                  : 'Only people added can access'}
              </Text>
            </div>
          </div>

          <div className={styles.linkInputGroup}>
            <div className={styles.linkInputWrapper}>
              <Input
                label="Share link"
                hideLabel
                value={shareLink}
                readOnly
                className={styles.linkInput}
              />
            </div>
            <Dropdown
              items={[
                {
                  label: 'Anyone with the link',
                  onClick: () => setLinkPermission('anyone'),
                  selected: linkPermission === 'anyone',
                },
                {
                  label: 'Restricted',
                  onClick: () => setLinkPermission('restricted'),
                  selected: linkPermission === 'restricted',
                },
              ]}
            >
              <Button
                kind="secondary"
                size="medium"
                endElement={<Icon name="chevron-down" size="small" />}
                className={styles.permissionButton}
              >
                {linkPermission === 'anyone' ? 'Anyone' : 'Restricted'}
              </Button>
            </Dropdown>
          </div>

          <Button
            kind={showCopied ? 'tertiary' : 'secondary'}
            size="medium"
            startElement={<Icon name={showCopied ? 'check' : 'duplicate'} size="small" />}
            onClick={handleCopyLink}
            className={styles.copyButton}
          >
            {showCopied ? 'Link copied!' : 'Copy link'}
          </Button>
        </section>

        {/* Divider */}
        <hr className={styles.divider} />

        {/* Email Invite Section */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionIcon}>
              <Icon name="envelope" size="small" />
            </div>
            <div className={styles.sectionTitleGroup}>
              <Text variant="label" weight="medium">
                Add people
              </Text>
              <Text variant="caption" color="subtle">
                Invite others via email to collaborate
              </Text>
            </div>
          </div>

          <div className={styles.emailInputGroup}>
            <div className={styles.emailInputWrapper}>
              <Input
                label="Email address"
                hideLabel
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter email address"
                className={styles.emailInput}
              />
            </div>
            <Dropdown
              items={[
                {
                  label: 'Can view',
                  onClick: () => setEmailPermission('view'),
                  selected: emailPermission === 'view',
                },
                {
                  label: 'Can edit',
                  onClick: () => setEmailPermission('edit'),
                  selected: emailPermission === 'edit',
                },
              ]}
            >
              <Button
                kind="secondary"
                size="medium"
                endElement={<Icon name="chevron-down" size="small" />}
                className={styles.permissionButton}
              >
                {emailPermission === 'view' ? 'Can view' : 'Can edit'}
              </Button>
            </Dropdown>
          </div>
        </section>
      </Stack>
    </Modal>
  );
};
