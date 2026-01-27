/**
 * AgreementPreviewPage
 *
 * Page wrapper for the Agreement Preview prototype.
 * This is a fullscreen page without the prototype wrapper.
 */

import { AgreementPreview } from '../agreement-preview';

export function AgreementPreviewPage() {
  const handleBack = () => {
    // Navigate back to agreements list
    window.history.back();
  };

  return (
    <AgreementPreview
      documentTitle="FlexCorp-Tally_Statement-of-Work_01"
      pdfUrl="/documents/salesforce-msa-section-24.pdf"
      totalPages={6}
      onBack={handleBack}
    />
  );
}

export default AgreementPreviewPage;
