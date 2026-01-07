import { useNavigate } from 'react-router-dom';
import { Heading, Text, Button, Stack, Icon } from '@/design-system';
import styles from './PrototypeIndex.module.css';

/**
 * PrototypeIndex
 *
 * A clean, modern gallery page for browsing prototypes.
 * Minimal design with generous whitespace and subtle interactions.
 */

interface PrototypeInfo {
  id: string;
  title: string;
  description: string;
  path: string;
}

const prototypes: PrototypeInfo[] = [
  {
    id: 'docusign-landing',
    title: 'DocuSign Landing',
    description:
      'A landing page experience for the DocuSign app platform with tasks, activity, and quick actions.',
    path: '/prototypes/docusign-landing',
  },
  {
    id: 'simple-form',
    title: 'Simple Form',
    description: 'A basic contact form with text inputs, select dropdown, and validation.',
    path: '/prototypes/simple-form',
  },
  {
    id: 'parties-view',
    title: 'Parties View',
    description: 'View and manage parties with tabbed filtering and search.',
    path: '/prototypes/parties-view',
  },
  // Add more prototypes here as they are created
];

function PrototypeCard({ prototype }: { prototype: PrototypeInfo }) {
  const navigate = useNavigate();

  return (
    <button className={styles.card} onClick={() => navigate(prototype.path)} type="button">
      <div className={styles.cardContent}>
        <div className={styles.cardText}>
          <Text variant="body" weight="medium" className={styles.cardTitle}>
            {prototype.title}
          </Text>
          <Text variant="body" color="secondary" className={styles.cardDescription}>
            {prototype.description}
          </Text>
        </div>
        <div className={styles.cardArrow}>
          <Icon name="arrow-right" size="small" />
        </div>
      </div>
    </button>
  );
}

export function PrototypeIndex() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Header */}
        <header className={styles.header}>
          <Heading level={1} className={styles.title}>
            Prototypes
          </Heading>
          <Text variant="body" color="secondary" className={styles.subtitle}>
            Browse designs built with the Ink Design System
          </Text>
        </header>

        {/* Prototype Grid */}
        {prototypes.length > 0 ? (
          <div className={styles.grid}>
            {prototypes.map((prototype) => (
              <PrototypeCard key={prototype.id} prototype={prototype} />
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <Icon name="folder" size="large" />
            <Text variant="body" color="secondary">
              No prototypes yet. Create one to get started!
            </Text>
          </div>
        )}

        {/* Footer Navigation */}
        <footer className={styles.footer}>
          <Button kind="tertiary" size="small" onClick={() => navigate('/showcase')}>
            <Icon name="arrow-left" size="small" />
            Back to Showcase
          </Button>
        </footer>
      </div>
    </div>
  );
}

export default PrototypeIndex;
