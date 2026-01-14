/**
 * AgreementStudioPage
 *
 * Page wrapper for the Agreement Studio prototype - a scripted demo
 * showcasing the "Acme Renewal Prep" scenario across 15 agreements.
 */

import { PrototypeWrapper } from '../PrototypeWrapper';
import { AgreementStudio } from '../AgreementStudio';

export function AgreementStudioPage() {
  return (
    <PrototypeWrapper
      title="Agreement Studio"
      description="Scripted demo: Acme Renewal Prep scenario with AI-powered agreement analysis, citations, and conflict detection."
    >
      <AgreementStudio />
    </PrototypeWrapper>
  );
}

export default AgreementStudioPage;
