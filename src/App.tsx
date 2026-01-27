import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { Agentation } from 'agentation';
import ComponentShowcase from './examples/ComponentShowcase';
import DocuSignShellDemo from './examples/DocuSignShellDemo';
import EditorApp from './editor/EditorApp';
import PrototypeIndex from './prototypes/PrototypeIndex';
import { FullscreenPrototype } from './prototypes/FullscreenPrototype';
import DocuSignLandingPage from './prototypes/pages/DocuSignLandingPage';
import NavigatorAgreementsPage from './prototypes/pages/NavigatorAgreementsPage';
import NavigatorAgreementsAIChatPage from './prototypes/pages/NavigatorAgreementsAIChatPage';
import AgreementStudioPage from './prototypes/pages/AgreementStudioPage';
import AgreementStudioFRPage from './prototypes/pages/AgreementStudioFRPage';
import AgreementPreviewPage from './prototypes/pages/AgreementPreviewPage';
import AgentStudioPage from './prototypes/pages/AgentStudioPage';
import OnboardingAgentPage from './prototypes/pages/OnboardingAgentPage';
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
        <Route path="/prototypes/docusign-landing" element={<DocuSignLandingPage />} />
        <Route path="/prototypes/navigator-agreements" element={<NavigatorAgreementsPage />} />
        <Route
          path="/prototypes/navigator-agreements-ai-chat"
          element={<NavigatorAgreementsAIChatPage />}
        />
        <Route path="/prototypes/agreement-studio" element={<AgreementStudioPage />} />
        <Route path="/prototypes/agreement-studio-fr" element={<AgreementStudioFRPage />} />
        <Route path="/prototypes/agreement-preview" element={<AgreementPreviewPage />} />
        <Route path="/prototypes/agent-studio" element={<AgentStudioPage />} />
        <Route path="/prototypes/onboarding-agent" element={<OnboardingAgentPage />} />
        <Route path="/prototypes/prompt-expansion-demo" element={<PromptExpansionDemoPage />} />

        {/* Fullscreen Prototypes - No wrapper chrome, for presentation mode */}
        <Route path="/fullscreen/:name" element={<FullscreenPrototype />} />

        {/* Redirect any other path to showcase */}
        <Route path="*" element={<Navigate to="/showcase" replace />} />
      </Routes>
      <Analytics />
      {import.meta.env.DEV && <Agentation />}
    </BrowserRouter>
  );
}
