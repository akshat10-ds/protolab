/**
 * NavigatorAgreementsAIChatPage
 *
 * Page wrapper for the Navigator Agreements with AI Chat prototype.
 */

import { PrototypeWrapper } from '../PrototypeWrapper';
import { NavigatorAgreementsAIChat } from '../NavigatorAgreementsAIChat';

export function NavigatorAgreementsAIChatPage() {
  return (
    <PrototypeWrapper
      title="Navigator Agreements + AI Chat"
      description="DocuSign Navigator with floating AI CTA button and expandable AI Chat panel."
    >
      <NavigatorAgreementsAIChat />
    </PrototypeWrapper>
  );
}

export default NavigatorAgreementsAIChatPage;
