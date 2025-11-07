import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ComponentShowcase from './examples/ComponentShowcase';
import ComponentShowcase2 from './examples/ComponentShowcase2';
import { LayoutsDemo } from './examples/LayoutsDemo';
import LayoutInk from './examples/LayoutInk';
import { LayoutWithLocalNav } from './examples/LayoutWithLocalNav';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect home to showcase2 (comprehensive architecture-based view) */}
        <Route path="/" element={<Navigate to="/showcase2" replace />} />

        {/* Component Showcase 2 - NEW DEFAULT - Comprehensive architecture-based view */}
        <Route path="/showcase2" element={<ComponentShowcase2 />} />

        {/* Component Showcase - DEPRECATED - Legacy flat view */}
        <Route path="/showcase" element={<ComponentShowcase />} />

        {/* Layout Examples */}
        <Route path="/layouts" element={<LayoutsDemo />} />

        {/* Ink Layout Demo */}
        <Route path="/demo" element={<LayoutInk />} />

        {/* LocalNav Layout Example */}
        <Route path="/localnav-demo" element={<LayoutWithLocalNav />} />

        {/* Redirect any other path to showcase */}
        <Route path="*" element={<Navigate to="/showcase" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
