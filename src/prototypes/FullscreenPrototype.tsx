/**
 * FullscreenPrototype
 *
 * Renders prototypes without the PrototypeWrapper chrome (no header/back button).
 * Used for fullscreen presentation mode via /fullscreen/:name routes.
 */

import { useParams, Navigate } from 'react-router-dom';
import styles from './FullscreenPrototype.module.css';
import { DocuSignLanding } from './DocuSignLanding';
import { NavigatorAgreements } from './NavigatorAgreements';
import { NavigatorAgreementsAIChat } from './NavigatorAgreementsAIChat';
import { AgreementStudio } from './agreement-studio';
import { AgreementStudioFR } from './AgreementStudioFR';
import { AgentStudio } from './agent-studio';
import { OnboardingAgent } from './onboarding-agent';

// Map route names to prototype components
const PROTOTYPE_MAP: Record<string, React.ComponentType> = {
  'docusign-landing': DocuSignLanding,
  'navigator-agreements': NavigatorAgreements,
  'navigator-agreements-ai-chat': NavigatorAgreementsAIChat,
  'agreement-studio': AgreementStudio,
  'agreement-studio-fr': AgreementStudioFR,
  'agent-studio': AgentStudio,
  'onboarding-agent': OnboardingAgent,
};

export function FullscreenPrototype() {
  const { name } = useParams<{ name: string }>();

  if (!name || !PROTOTYPE_MAP[name]) {
    // Redirect to prototypes index if not found
    return <Navigate to="/prototypes" replace />;
  }

  const PrototypeComponent = PROTOTYPE_MAP[name];

  return (
    <div className={styles.wrapper}>
      <PrototypeComponent />
    </div>
  );
}
