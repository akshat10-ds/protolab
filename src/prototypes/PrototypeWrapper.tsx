import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Icon, Text, Divider } from '@/design-system';
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
  const location = useLocation();

  // Extract prototype name from URL: /prototypes/agreement-studio -> agreement-studio
  const prototypeName = location.pathname.split('/').pop() || '';

  const handleFullscreen = () => {
    navigate(`/fullscreen/${prototypeName}`);
  };

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
              <span className={styles.description}>
                <Text variant="body" color="secondary">
                  {description}
                </Text>
              </span>
            </>
          )}
        </div>

        <Button kind="tertiary" size="small" onClick={handleFullscreen} title="Fullscreen">
          <Icon name="arrows-out" size="small" />
        </Button>
      </header>

      <Divider />

      {/* Full-width Prototype Content */}
      <main className={styles.content}>{children}</main>
    </div>
  );
}

export default PrototypeWrapper;
