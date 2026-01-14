/**
 * AgreementStudio French Page
 *
 * Page wrapper for the French-localized AgreementStudio prototype.
 */

import React from 'react';
import { AgreementStudioFR } from '../AgreementStudioFR';
import PrototypeWrapper from '../PrototypeWrapper';

const AgreementStudioFRPage: React.FC = () => {
  return (
    <PrototypeWrapper
      title="Agreement Studio (FR)"
      description="Prototype de démonstration de l'analyse contractuelle assistée par IA - Version française"
      fullscreen
    >
      <AgreementStudioFR />
    </PrototypeWrapper>
  );
};

export default AgreementStudioFRPage;
