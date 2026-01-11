/**
 * TopNav (Site Header) - Standalone Reusable Component
 *
 * This is a thin wrapper around the @ds/components Header that provides
 * a cleaner API for common use cases while maintaining 100% visual fidelity.
 *
 * DEPENDENCIES:
 * - @ds/components: Header (from DocuSign Component Library)
 * - @emotion/react: css (for styling)
 *
 * For 100% visual match, ensure you have access to @ds/components.
 *
 * USAGE:
 * ```tsx
 * import { TopNav } from './reusable-components/TopNav';
 * import type { HeaderProps } from '@ds/components';
 *
 * const headerProps: HeaderProps = {
 *   appId: 'MyApp',
 *   appName: 'My Application',
 *   apiRootUrl: 'https://api.example.com',
 *   accountGuid: 'guid-123',
 *   accountId: '12345',
 *   meToken: 'token',
 *   tabItems: [...],
 * };
 *
 * <TopNav {...headerProps} />
 * ```
 */

import type { HeaderProps } from "@ds/components";
import { Header } from "@ds/components";
import type { SerializedStyles } from "@emotion/react";

// ============================================================================
// TYPES - Re-export for convenience
// ============================================================================

export type { HeaderProps, HeaderOnSwitchCallback, HeaderItem } from "@ds/components";

// Extended props to add custom styling wrapper
export type TopNavProps = HeaderProps & {
  /** Additional CSS styles to wrap the header */
  wrapperStyles?: SerializedStyles;
};

// ============================================================================
// COMPONENT
// ============================================================================

const TopNav = ({ wrapperStyles, ...headerProps }: TopNavProps) => {
  if (wrapperStyles) {
    return (
      <div css={wrapperStyles}>
        <Header {...headerProps} />
      </div>
    );
  }

  return <Header {...headerProps} />;
};

export default TopNav;
