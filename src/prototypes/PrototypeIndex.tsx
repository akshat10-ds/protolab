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
    title: 'Docusign Landing',
    description:
      'A landing page experience for the Docusign app platform with tasks, activity, and quick actions.',
    path: '/prototypes/docusign-landing',
  },
  {
    id: 'navigator-agreements',
    title: 'Navigator Agreements',
    description: 'Docusign Navigator agreements list with DataTable, filters, and pagination.',
    path: '/prototypes/navigator-agreements',
  },
  {
    id: 'navigator-agreements-ai-chat',
    title: 'Navigator + AI Chat',
    description: 'Navigator Agreements with floating AI CTA button and expandable AI Chat panel.',
    path: '/prototypes/navigator-agreements-ai-chat',
  },
  {
    id: 'agreement-studio',
    title: 'Agreement Studio',
    description:
      'Scripted demo: Acme Renewal Prep with AI-powered agreement analysis, citations, and conflict detection.',
    path: '/prototypes/agreement-studio',
  },
  {
    id: 'agent-studio',
    title: 'Agent Studio',
    description:
      'Agentic AI demo: Visible reasoning steps, tool call visualization, and proposed actions with approval workflow.',
    path: '/prototypes/agent-studio',
  },
  {
    id: 'onboarding-agent',
    title: 'Onboarding Agent',
    description:
      'AI-powered onboarding assistant: Home page entry point with AI chat panel for guiding new users through DocuSign setup.',
    path: '/prototypes/onboarding-agent',
  },
  {
    id: 'agreement-studio-fr',
    title: 'Agreement Studio (FR)',
    description:
      'Version française: Préparation Renouvellement Acme avec analyse contractuelle IA, citations et détection de conflits.',
    path: '/prototypes/agreement-studio-fr',
  },
  {
    id: 'prompt-expansion-demo',
    title: 'Prompt Expansion Demo',
    description:
      'Tab-to-expand interaction with async loading: Inline Hint and Ghost Preview variations.',
    path: '/prototypes/prompt-expansion-demo',
  },
  {
    id: 'agreement-preview',
    title: 'Agreement Preview',
    description:
      'Full-page agreement preview with PDF viewer, toolbar controls, and AI chat panel that pushes content.',
    path: '/prototypes/agreement-preview',
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
