/**
 * Onboarding Agent Prototype
 *
 * AI-powered onboarding assistant combining DocuSignLanding home page
 * with the AI chat experience from Agent Studio.
 *
 * Features:
 * - Home page as entry point (hero, tasks, activity, overview)
 * - AI panel open by default for onboarding assistance
 * - Progressive reasoning visualization (ThinkingSteps)
 * - Agent action cards with execute/cancel
 * - Onboarding-specific suggestions and flows
 */

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { DocuSignShell } from '@/design-system';
import styles from './OnboardingAgent.module.css';

// Components
import { AIPanel, DEFAULT_PANEL_WIDTH } from './components/AIPanel';
import { HomeContent } from './components/HomeContent';

// =============================================================================
// Logo Component
// =============================================================================

const DocuSignLogo = () => (
  <img src="/assets/docusign-logo.svg" alt="DocuSign" className={styles.logo} />
);

// Panel width percentage for "wide" mode
const WIDE_PANEL_WIDTH_PERCENT = 0.4; // 40% of page width

// =============================================================================
// Main Component
// =============================================================================

export function OnboardingAgent() {
  // AI Panel is open by default for onboarding experience
  const [isAIChatOpen, setIsAIChatOpen] = useState(true);
  const [panelWidth, setPanelWidth] = useState(() => {
    // Initialize to 40% of window width for wide panel
    if (typeof window !== 'undefined') {
      return Math.floor(window.innerWidth * WIDE_PANEL_WIDTH_PERCENT);
    }
    return DEFAULT_PANEL_WIDTH;
  });
  const [isResizing, setIsResizing] = useState(false);

  // Track previous window width for resize handling
  const prevWindowWidthRef = useRef(typeof window !== 'undefined' ? window.innerWidth : 1920);

  // Handle window resize - keep panel at fullscreen if it was fullscreen
  useEffect(() => {
    const handleWindowResize = () => {
      const currentWindowWidth = window.innerWidth;
      const prevWindowWidth = prevWindowWidthRef.current;

      // If panel was at/near fullscreen, keep it at fullscreen
      if (panelWidth >= prevWindowWidth - 50) {
        setPanelWidth(currentWindowWidth);
      }
      // If panel is wider than the new window width, clamp it
      else if (panelWidth > currentWindowWidth) {
        setPanelWidth(currentWindowWidth);
      }

      prevWindowWidthRef.current = currentWindowWidth;
    };

    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, [panelWidth]);

  // Global nav items - Home is active for onboarding context
  const globalNavItems = [
    { id: 'home', label: 'Home', active: true },
    { id: 'agreements', label: 'Agreements' },
    { id: 'templates', label: 'Templates' },
    { id: 'reports', label: 'Reports' },
    { id: 'admin', label: 'Admin' },
  ];

  const handleCloseAIChat = useCallback(() => {
    setIsAIChatOpen(false);
    setPanelWidth(DEFAULT_PANEL_WIDTH);
  }, []);

  const handleOpenAIChat = useCallback(() => {
    setIsAIChatOpen(true);
    // Open to 40% of page width by default
    const wideWidth = Math.floor(window.innerWidth * WIDE_PANEL_WIDTH_PERCENT);
    setPanelWidth(wideWidth);
  }, []);

  const handleWidthChange = useCallback((newWidth: number) => {
    setPanelWidth(newWidth);
  }, []);

  const handleStartResize = useCallback(() => {
    setIsResizing(true);
  }, []);

  const handleEndResize = useCallback(() => {
    setIsResizing(false);
  }, []);

  const mainContentStyle = isAIChatOpen
    ? {
        width: `calc(100% - ${panelWidth}px)`,
        transition: isResizing ? 'none' : 'width 250ms cubic-bezier(0.4, 0, 0.2, 1)',
      }
    : {};

  return (
    <div className={styles.layoutContainer}>
      <div className={styles.mainContent} style={mainContentStyle}>
        <DocuSignShell
          globalNav={{
            logo: <DocuSignLogo />,
            navItems: globalNavItems,
            showSearch: true,
            searchVariant: 'pill',
            showSettings: true,
            settingsIcon: 'settings',
            user: { name: 'Akshat Mishra' },
            // Add AI toggle button in nav for when panel is closed
            actions: !isAIChatOpen ? (
              <button
                className={styles.aiToggleButton}
                onClick={handleOpenAIChat}
                aria-label="Open AI Assistant"
              >
                <span className={styles.aiToggleIcon}>✨</span>
                <span>AI Assistant</span>
              </button>
            ) : undefined,
          }}
        >
          <HomeContent userName="Akshat Mishra" />
        </DocuSignShell>
      </div>

      <AIPanel
        isOpen={isAIChatOpen}
        onClose={handleCloseAIChat}
        userName="Akshat"
        panelWidth={panelWidth}
        onWidthChange={handleWidthChange}
        onStartResize={handleStartResize}
        onEndResize={handleEndResize}
        isResizing={isResizing}
      />
    </div>
  );
}

export default OnboardingAgent;
