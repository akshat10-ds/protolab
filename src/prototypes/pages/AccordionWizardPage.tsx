import { PrototypeWrapper } from '../PrototypeWrapper';
import { AccordionWizard } from '../AccordionWizard';

/**
 * AccordionWizardPage
 *
 * Page wrapper for the AccordionWizard prototype.
 */
export function AccordionWizardPage() {
  return (
    <PrototypeWrapper
      title="Accordion Wizard"
      description="A multi-step registration wizard using accordion-style navigation to collect user information."
    >
      <AccordionWizard />
    </PrototypeWrapper>
  );
}

export default AccordionWizardPage;
