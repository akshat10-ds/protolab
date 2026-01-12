import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ComponentShowcase from './examples/ComponentShowcase';
import DocuSignShellDemo from './examples/DocuSignShellDemo';
import EditorApp from './editor/EditorApp';
import PrototypeIndex from './prototypes/PrototypeIndex';
import SimpleFormPage from './prototypes/pages/SimpleFormPage';
import PartiesViewPage from './prototypes/pages/PartiesViewPage';
import DocuSignLandingPage from './prototypes/pages/DocuSignLandingPage';
import AccordionWizardPage from './prototypes/pages/AccordionWizardPage';
import IterationLab from './lab/IterationLab';

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

        {/* Prototypes - Browse and interact with generated prototypes */}
        <Route path="/prototypes" element={<PrototypeIndex />} />
        <Route path="/prototypes/simple-form" element={<SimpleFormPage />} />
        <Route path="/prototypes/parties-view" element={<PartiesViewPage />} />
        <Route path="/prototypes/docusign-landing" element={<DocuSignLandingPage />} />
        <Route path="/prototypes/accordion-wizard" element={<AccordionWizardPage />} />

        {/* Redirect any other path to showcase */}
        <Route path="*" element={<Navigate to="/showcase" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
