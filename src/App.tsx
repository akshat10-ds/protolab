import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ComponentShowcase from "./examples/ComponentShowcase";
import ComponentShowcase2 from "./examples/ComponentShowcase2";
import { LayoutsDemo } from "./examples/LayoutsDemo";
import LayoutInk from "./examples/LayoutInk";
import { LayoutWithLocalNav } from "./examples/LayoutWithLocalNav";
import { AgreementsPage } from "./examples/AgreementsPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect home to component showcase */}
        <Route path="/" element={<Navigate to="/showcase" replace />} />

        {/* Component Showcase - Main landing page */}
        <Route path="/showcase" element={<ComponentShowcase />} />

        {/* Component Showcase 2 - Architecture-based view */}
        <Route path="/showcase2" element={<ComponentShowcase2 />} />

        {/* Layout Examples */}
        <Route path="/layouts" element={<LayoutsDemo />} />

        {/* Ink Layout Demo */}
        <Route path="/demo" element={<LayoutInk />} />

        {/* LocalNav Layout Example */}
        <Route path="/localnav-demo" element={<LayoutWithLocalNav />} />

        {/* Agreements Page Prototype */}
        <Route path="/agreements" element={<AgreementsPage />} />

        {/* Redirect any other path to showcase */}
        <Route path="*" element={<Navigate to="/showcase" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
