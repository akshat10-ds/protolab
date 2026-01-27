/**
 * Onboarding Agent Page
 *
 * Page wrapper for the Onboarding Agent prototype.
 * AI-powered onboarding assistant with DocuSignLanding home page + AI chat.
 */

import { PrototypeWrapper } from '../PrototypeWrapper';
import { OnboardingAgent } from '../onboarding-agent';

export function OnboardingAgentPage() {
  return (
    <PrototypeWrapper
      title="Onboarding Agent"
      description="AI-powered onboarding assistant combining home page with AI chat experience."
    >
      <OnboardingAgent />
    </PrototypeWrapper>
  );
}

export default OnboardingAgentPage;
