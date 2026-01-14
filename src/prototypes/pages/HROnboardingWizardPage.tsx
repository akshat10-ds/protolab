import { PrototypeWrapper } from '../PrototypeWrapper';
import { HROnboardingWizard } from '../HROnboardingWizard';

/**
 * HROnboardingWizardPage
 *
 * Page wrapper for the HROnboardingWizard prototype.
 */
export function HROnboardingWizardPage() {
  return (
    <PrototypeWrapper
      title="HR Onboarding Wizard"
      description="A workflow builder for creating customized employee onboarding experiences with data collection, ID verification, and policy acceptance."
    >
      <HROnboardingWizard />
    </PrototypeWrapper>
  );
}

export default HROnboardingWizardPage;
