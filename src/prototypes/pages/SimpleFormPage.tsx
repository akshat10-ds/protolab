import { PrototypeWrapper } from '../PrototypeWrapper';
import { SimpleForm } from '../SimpleForm';

/**
 * SimpleFormPage
 *
 * Page wrapper for the SimpleForm prototype.
 */
export function SimpleFormPage() {
  return (
    <PrototypeWrapper
      title="Simple Form"
      description="A basic contact form demonstrating form components from the Ink Design System."
    >
      <SimpleForm />
    </PrototypeWrapper>
  );
}

export default SimpleFormPage;
