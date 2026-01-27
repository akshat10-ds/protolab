import { PrototypeWrapper } from '../PrototypeWrapper';
import { DocuSignShell } from '@/design-system/6-layouts';
import { DocuSignLanding } from '../DocuSignLanding';
import styles from '../DocuSignLanding.module.css';

/**
 * DocuSignLandingPage
 *
 * Page wrapper for the DocuSign landing page prototype.
 * Uses PrototypeWrapper for consistency with other prototypes,
 * and DocuSignShell for the full application shell experience.
 */

// Navigation items for GlobalNav
const navItems = [
  { id: 'home', label: 'Home', href: '#', active: true },
  { id: 'agreements', label: 'Agreements', href: '#' },
  { id: 'templates', label: 'Templates', href: '#' },
  { id: 'reports', label: 'Reports', href: '#' },
  { id: 'admin', label: 'Admin', href: '#' },
];

// DocuSign Logo - always use the official logo from assets
const DocuSignLogo = () => (
  <img src="/assets/docusign-logo.svg" alt="DocuSign" className={styles.logo} />
);

export function DocuSignLandingPage() {
  return (
    <PrototypeWrapper
      title="Docusign Landing"
      description="A landing page experience for the Docusign app platform."
    >
      <DocuSignShell
        globalNav={{
          logo: <DocuSignLogo />,
          navItems: navItems,
          showSearch: true,
          searchVariant: 'pill',
          onSearchClick: () => console.log('Search clicked'),
          showSettings: true,
          settingsIcon: 'filter',
          onSettingsClick: () => console.log('Settings clicked'),
          showNotifications: true,
          notificationCount: 1,
          onNotificationClick: () => console.log('Notifications clicked'),
          user: {
            name: 'Akshat Mishra',
          },
          onUserMenuClick: () => console.log('User menu clicked'),
        }}
      >
        <DocuSignLanding userName="Akshat Mishra" />
      </DocuSignShell>
    </PrototypeWrapper>
  );
}

export default DocuSignLandingPage;
