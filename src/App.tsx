import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ComponentShowcase from './examples/ComponentShowcase';
import DocuSignShellDemo from './examples/DocuSignShellDemo';
import EditorApp from './editor/EditorApp';
import PrototypeIndex from './prototypes/PrototypeIndex';
import { FullscreenPrototype } from './prototypes/FullscreenPrototype';
import SimpleFormPage from './prototypes/pages/SimpleFormPage';
import PartiesViewPage from './prototypes/pages/PartiesViewPage';
import DocuSignLandingPage from './prototypes/pages/DocuSignLandingPage';
import AccordionWizardPage from './prototypes/pages/AccordionWizardPage';
import UserInfoFormPage from './prototypes/pages/UserInfoFormPage';
import NavigatorAgreementsPage from './prototypes/pages/NavigatorAgreementsPage';
import NavigatorAgreementsAIChatPage from './prototypes/pages/NavigatorAgreementsAIChatPage';
import AgreementStudioPage from './prototypes/pages/AgreementStudioPage';
import AgreementStudioFRPage from './prototypes/pages/AgreementStudioFRPage';
import HROnboardingWizardPage from './prototypes/pages/HROnboardingWizardPage';
import { PromptExpansionDemoPage } from './prototypes/pages/PromptExpansionDemoPage';
import IterationLab from './lab/IterationLab';
import LearningsReview from './learnings/LearningsReview';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect home to showcase */}
        <Route path="/" element={<Navigate to="/showcase" replace />} />

        {/* Component Showcase - Comprehensive architecture-based view */}
        <Route path="/showcase" element={<ComponentShowcase />} />
        <Route path="/showcase/:layer/:subpage" element={<ComponentShowcase />} />

        {/* Visual Editor - Build prototypes with drag-and-drop */}
        <Route path="/editor" element={<EditorApp />} />

        {/* DocuSign Shell Demo - Full application shell */}
        <Route path="/shell" element={<DocuSignShellDemo />} />

        {/* Iteration Lab - Iterate on new components with feedback */}
        <Route path="/lab" element={<IterationLab />} />

        {/* Learnings Review - Review and approve layout rules */}
        <Route path="/review-learnings" element={<LearningsReview />} />

        {/* Prototypes - Browse and interact with generated prototypes */}
        <Route path="/prototypes" element={<PrototypeIndex />} />
        <Route path="/prototypes/simple-form" element={<SimpleFormPage />} />
        <Route path="/prototypes/parties-view" element={<PartiesViewPage />} />
        <Route path="/prototypes/docusign-landing" element={<DocuSignLandingPage />} />
        <Route path="/prototypes/accordion-wizard" element={<AccordionWizardPage />} />
        <Route path="/prototypes/user-info-form" element={<UserInfoFormPage />} />
        <Route path="/prototypes/navigator-agreements" element={<NavigatorAgreementsPage />} />
        <Route
          path="/prototypes/navigator-agreements-ai-chat"
          element={<NavigatorAgreementsAIChatPage />}
        />
        <Route path="/prototypes/agreement-studio" element={<AgreementStudioPage />} />
        <Route path="/prototypes/agreement-studio-fr" element={<AgreementStudioFRPage />} />
        <Route path="/prototypes/hr-onboarding-wizard" element={<HROnboardingWizardPage />} />
        <Route path="/prototypes/prompt-expansion-demo" element={<PromptExpansionDemoPage />} />

        {/* Fullscreen Prototypes - No wrapper chrome, for presentation mode */}
        <Route path="/fullscreen/:name" element={<FullscreenPrototype />} />

        {/* Redirect any other path to showcase */}
        <Route path="*" element={<Navigate to="/showcase" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
