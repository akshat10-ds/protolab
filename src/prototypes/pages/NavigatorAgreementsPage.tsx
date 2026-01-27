/**
 * NavigatorAgreementsPage
 *
 * Page wrapper for the Navigator Agreements prototype.
 */

import { PrototypeWrapper } from '../PrototypeWrapper';
import { NavigatorAgreements } from '../NavigatorAgreements';

export function NavigatorAgreementsPage() {
  return (
    <PrototypeWrapper
      title="Navigator Agreements"
      description="Docusign Navigator agreements list with DataTable, filters, and pagination."
    >
      <NavigatorAgreements />
    </PrototypeWrapper>
  );
}

export default NavigatorAgreementsPage;
