import { useNavigate } from 'react-router-dom';
import { Stack, Button, Icon, Text, Divider } from '@/design-system';
import styles from './PrototypeWrapper.module.css';

/**
 * PrototypeWrapper
 *
 * A minimal wrapper for prototype pages that provides:
 * - Compact header bar with back navigation, title, and description inline
 * - Full-width content area for the prototype
 */

interface PrototypeWrapperProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function PrototypeWrapper({ title, description, children }: PrototypeWrapperProps) {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      {/* Compact Header Bar */}
      <header className={styles.header}>
        <Button kind="tertiary" size="small" onClick={() => navigate('/prototypes')}>
          <Icon name="arrow-left" size="small" />
          Back
        </Button>

        <div className={styles.titleArea}>
          <Text variant="body" weight="medium">
            {title}
          </Text>
          {description && (
            <>
              <span className={styles.separator}>—</span>
              <Text variant="body" color="secondary">
                {description}
              </Text>
            </>
          )}
        </div>
      </header>

      <Divider />

      {/* Full-width Prototype Content */}
      <main className={styles.content}>{children}</main>
    </div>
  );
}

export default PrototypeWrapper;
