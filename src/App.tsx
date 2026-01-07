import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ComponentShowcase from './examples/ComponentShowcase';
import DocuSignShellDemo from './examples/DocuSignShellDemo';
import EditorApp from './editor/EditorApp';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect home to showcase */}
        <Route path="/" element={<Navigate to="/showcase" replace />} />

        {/* Component Showcase - Comprehensive architecture-based view */}
        <Route path="/showcase" element={<ComponentShowcase />} />

        {/* Visual Editor - Build prototypes with drag-and-drop */}
        <Route path="/editor" element={<EditorApp />} />

        {/* DocuSign Shell Demo - Full application shell */}
        <Route path="/shell" element={<DocuSignShellDemo />} />

        {/* Redirect any other path to showcase */}
        <Route path="*" element={<Navigate to="/showcase" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
