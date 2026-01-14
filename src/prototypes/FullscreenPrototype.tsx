/**
 * FullscreenPrototype
 *
 * Renders prototypes without the PrototypeWrapper chrome (no header/back button).
 * Used for fullscreen presentation mode via /fullscreen/:name routes.
 */

import { useParams, Navigate } from 'react-router-dom';
import { SimpleForm } from './SimpleForm';
import { PartiesView } from './PartiesView';
import { DocuSignLanding } from './DocuSignLanding';
import { AccordionWizard } from './AccordionWizard';
import { UserInfoForm } from './UserInfoForm';
import { NavigatorAgreements } from './NavigatorAgreements';
import { NavigatorAgreementsAIChat } from './NavigatorAgreementsAIChat';
import { AgreementStudio } from './AgreementStudio';
import { AgreementStudioFR } from './AgreementStudioFR';

// Map route names to prototype components
const PROTOTYPE_MAP: Record<string, React.ComponentType> = {
  'simple-form': SimpleForm,
  'parties-view': PartiesView,
  'docusign-landing': DocuSignLanding,
  'accordion-wizard': AccordionWizard,
  'user-info-form': UserInfoForm,
  'navigator-agreements': NavigatorAgreements,
  'navigator-agreements-ai-chat': NavigatorAgreementsAIChat,
  'agreement-studio': AgreementStudio,
  'agreement-studio-fr': AgreementStudioFR,
};

export function FullscreenPrototype() {
  const { name } = useParams<{ name: string }>();

  if (!name || !PROTOTYPE_MAP[name]) {
    // Redirect to prototypes index if not found
    return <Navigate to="/prototypes" replace />;
  }

  const PrototypeComponent = PROTOTYPE_MAP[name];

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <PrototypeComponent />
    </div>
  );
}
