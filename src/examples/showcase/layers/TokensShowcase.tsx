import React from 'react';
import { Button, Icon } from '@/design-system';
import styles from '../Showcase.module.css';

// Color palette data
const colorPalettes = [
  {
    name: 'Cobalt',
    semantic: 'Brand',
    shades: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140],
  },
  { name: 'Neutral', semantic: 'Grays', shades: [5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100] },
  {
    name: 'Green',
    semantic: 'Success',
    shades: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120],
  },
  {
    name: 'Red',
    semantic: 'Error',
    shades: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130],
  },
  { name: 'Orange', semantic: 'Warning', shades: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100] },
];

export interface TokensShowcaseProps {
  activeSubpage: string;
}

export const TokensShowcase: React.FC<TokensShowcaseProps> = ({ activeSubpage }) => {
  // Color Primitives
  if (activeSubpage === 'color-primitives') {
    return (
      <div className={styles.tokenPage}>
        {colorPalettes.map(({ name, semantic, shades }) => (
          <div className={styles.tokenSection} key={name}>
            <div className={styles.tokenSectionHeader}>
              <h3 className={styles.tokenSectionTitle}>
                {name} ({semantic})
              </h3>
            </div>
            <div className={styles.tokenSwatchRow}>
              {shades.map((shade) => (
                <div className={styles.swatchCell} key={shade}>
                  <div
                    className={styles.swatch}
                    style={{ background: `var(--ink-${name.toLowerCase()}-${shade})` }}
                  />
                  <span className={styles.swatchLabel}>{shade}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Semantic Colors
  if (activeSubpage === 'semantic-colors') {
    const bgTokens = [
      { token: '--ink-bg-default', label: 'Default' },
      { token: '--ink-bg-accent', label: 'Accent' },
      { token: '--ink-bg-accent-emphasis', label: 'Accent Emphasis' },
      { token: '--ink-bg-accent-subtle', label: 'Accent Subtle' },
      { token: '--ink-bg-canvas-document', label: 'Canvas Document' },
      { token: '--ink-bg-canvas-page', label: 'Canvas Page' },
      { token: '--ink-bg-error', label: 'Error' },
      { token: '--ink-bg-error-emphasis', label: 'Error Emphasis' },
      { token: '--ink-bg-error-subtle', label: 'Error Subtle' },
      { token: '--ink-bg-glass-frost', label: 'Glass Frost' },
      { token: '--ink-bg-glass-tint', label: 'Glass Tint' },
      { token: '--ink-bg-inverse', label: 'Inverse' },
      { token: '--ink-bg-popover-close', label: 'Popover Close' },
      { token: '--ink-bg-popover-close-inverse', label: 'Popover Close Inverse' },
      { token: '--ink-bg-scrim', label: 'Scrim' },
      { token: '--ink-bg-success', label: 'Success' },
      { token: '--ink-bg-success-emphasis', label: 'Success Emphasis' },
      { token: '--ink-bg-success-subtle', label: 'Success Subtle' },
      { token: '--ink-bg-warning', label: 'Warning' },
      { token: '--ink-bg-warning-emphasis', label: 'Warning Emphasis' },
      { token: '--ink-bg-warning-subtle', label: 'Warning Subtle' },
    ];

    const fontTokens = [
      { token: '--ink-font-default', label: 'Default' },
      { token: '--ink-font-neutral', label: 'Neutral' },
      { token: '--ink-font-accent', label: 'Accent' },
      { token: '--ink-font-success', label: 'Success' },
      { token: '--ink-font-error', label: 'Error' },
      { token: '--ink-font-warning', label: 'Warning' },
      { token: '--ink-font-disabled', label: 'Disabled' },
      { token: '--ink-font-inverse', label: 'Inverse' },
      { token: '--ink-font-placeholder', label: 'Placeholder' },
    ];

    const borderTokens = [
      { token: '--ink-border-default', label: 'Default' },
      { token: '--ink-border-accent', label: 'Accent' },
      { token: '--ink-border-accent-emphasis', label: 'Accent Emphasis' },
      { token: '--ink-border-accent-subtle', label: 'Accent Subtle' },
      { token: '--ink-border-emphasis', label: 'Emphasis' },
      { token: '--ink-border-emphasis-inverse', label: 'Emphasis Inverse' },
      { token: '--ink-border-subtle', label: 'Subtle' },
      { token: '--ink-border-subtle-inverse', label: 'Subtle Inverse' },
      { token: '--ink-border-error', label: 'Error' },
      { token: '--ink-border-error-emphasis', label: 'Error Emphasis' },
      { token: '--ink-border-error-subtle', label: 'Error Subtle' },
      { token: '--ink-border-success', label: 'Success' },
      { token: '--ink-border-success-emphasis', label: 'Success Emphasis' },
      { token: '--ink-border-success-subtle', label: 'Success Subtle' },
      { token: '--ink-border-warning', label: 'Warning' },
      { token: '--ink-border-warning-emphasis', label: 'Warning Emphasis' },
      { token: '--ink-border-warning-subtle', label: 'Warning Subtle' },
      { token: '--ink-border-focus', label: 'Focus' },
    ];

    const borderWidthTokens = [
      { token: '--ink-border-width-xs', value: '1px', label: 'XS' },
      { token: '--ink-border-width-s', value: '2px', label: 'S' },
    ];

    return (
      <div className={styles.tokenPage}>
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Background Colors</h3>
          </div>
          {bgTokens.map(({ token, label }) => (
            <div className={styles.tokenRow} key={token}>
              <div className={styles.tokenPreview} style={{ background: `var(${token})` }} />
              <span className={styles.tokenName}>{token}</span>
              <span className={styles.tokenValue}>{label}</span>
            </div>
          ))}
        </div>

        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Font Colors</h3>
          </div>
          {fontTokens.map(({ token, label }) => (
            <div className={styles.tokenRow} key={token}>
              <div className={styles.tokenPreviewText} style={{ color: `var(${token})` }}>
                Aa
              </div>
              <span className={styles.tokenName}>{token}</span>
              <span className={styles.tokenValue}>{label}</span>
            </div>
          ))}
        </div>

        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Border Colors</h3>
          </div>
          {borderTokens.map(({ token, label }) => (
            <div className={styles.tokenRow} key={token}>
              <div
                className={styles.tokenPreview}
                style={{ border: `2px solid var(${token})`, background: 'var(--ink-white-100)' }}
              />
              <span className={styles.tokenName}>{token}</span>
              <span className={styles.tokenValue}>{label}</span>
            </div>
          ))}
        </div>

        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Border Widths</h3>
          </div>
          {borderWidthTokens.map(({ token, value, label }) => (
            <div className={styles.spacingRow} key={token}>
              <div
                style={{
                  width: '60px',
                  height: value,
                  background: 'var(--ink-neutral-140)',
                  borderRadius: '1px',
                }}
              />
              <div className={styles.spacingMeta}>
                <span className={styles.spacingToken}>{token}</span>
                <span className={styles.spacingValue}>
                  {label} ({value})
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Typography
  if (activeSubpage === 'typography-tokens') {
    const fontSizes = [
      { token: '--ink-font-size-xs', label: 'Extra Small', value: '12px' },
      { token: '--ink-font-size-sm', label: 'Small', value: '14px' },
      { token: '--ink-font-size-md', label: 'Medium', value: '16px' },
      { token: '--ink-font-size-lg', label: 'Large', value: '18px' },
      { token: '--ink-font-size-xl', label: 'Extra Large', value: '20px' },
      { token: '--ink-font-size-2xl', label: '2X Large', value: '24px' },
      { token: '--ink-font-size-3xl', label: '3X Large', value: '30px' },
      { token: '--ink-font-size-4xl', label: '4X Large', value: '36px' },
    ];

    const fontWeights = [
      { token: '--ink-font-weight-light', label: 'Light', value: '300' },
      { token: '--ink-font-weight-regular', label: 'Regular', value: '400' },
      { token: '--ink-font-weight-medium', label: 'Medium', value: '500' },
      { token: '--ink-font-weight-semibold', label: 'Semibold', value: '600' },
      { token: '--ink-font-weight-bold', label: 'Bold', value: '700' },
    ];

    const lineHeights = [
      { token: '--ink-line-height-tight', label: 'Tight', value: '1.25' },
      { token: '--ink-line-height-normal', label: 'Normal', value: '1.5' },
      { token: '--ink-line-height-relaxed', label: 'Relaxed', value: '1.75' },
    ];

    return (
      <div className={styles.tokenPage}>
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Font Family</h3>
          </div>
          <div className={styles.tokenRow}>
            <span className={styles.tokenName}>--ink-font-family</span>
            <span className={styles.tokenValue}>DS Indigo (System Font Stack)</span>
          </div>
        </div>

        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Font Sizes</h3>
          </div>
          {fontSizes.map(({ token, label, value }) => (
            <div className={styles.typographyRow} key={token}>
              <span className={styles.typographyPreview} style={{ fontSize: `var(${token})` }}>
                {label}
              </span>
              <div className={styles.typographyMeta}>
                <span className={styles.typographyToken}>{token}</span>
                <span className={styles.typographyValue}>{value}</span>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Font Weights</h3>
          </div>
          {fontWeights.map(({ token, label, value }) => (
            <div className={styles.typographyRow} key={token}>
              <span className={styles.typographyPreview} style={{ fontWeight: `var(${token})` }}>
                {label}
              </span>
              <div className={styles.typographyMeta}>
                <span className={styles.typographyToken}>{token}</span>
                <span className={styles.typographyValue}>{value}</span>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Line Heights</h3>
          </div>
          {lineHeights.map(({ token, label, value }) => (
            <div className={styles.typographyRow} key={token}>
              <span className={styles.typographyPreview} style={{ lineHeight: `var(${token})` }}>
                {label}
              </span>
              <div className={styles.typographyMeta}>
                <span className={styles.typographyToken}>{token}</span>
                <span className={styles.typographyValue}>{value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Semantic Typography
  if (activeSubpage === 'semantic-typography') {
    const detailStyles = [
      { name: 'Detail XS', size: 'xs', px: '10px', lh: '1.4' },
      { name: 'Detail S', size: 's', px: '12px', lh: '1.5' },
    ];

    const bodyStyles = [
      { name: 'Body S', size: 's', px: '14px', lh: '1.4' },
      { name: 'Body M', size: 'm', px: '16px', lh: '1.5' },
      { name: 'Body L', size: 'l', px: '20px', lh: '1.5' },
      { name: 'Body XL', size: 'xl', px: '24px', lh: '1.5' },
    ];

    const headingStyles = [
      { name: 'Heading XXS', size: 'xxs', px: '16px', lh: '1.25' },
      { name: 'Heading XS', size: 'xs', px: '20px', lh: '1.25' },
      { name: 'Heading S', size: 's', px: '24px', lh: '1.25' },
      { name: 'Heading M', size: 'm', px: '32px', lh: '1.25' },
    ];

    const displayStyles = [
      { name: 'Display XS', size: 'xs', px: '40px', lh: '1.25' },
      { name: 'Display S', size: 's', px: '48px', lh: '1.25' },
      { name: 'Display M', size: 'm', px: '56px', lh: '1.25' },
      { name: 'Display L', size: 'l', px: '64px', lh: '1.25' },
      { name: 'Display XL', size: 'xl', px: '72px', lh: '1.25' },
    ];

    return (
      <div className={styles.tokenPage}>
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Detail Styles</h3>
          </div>
          {detailStyles.map(({ name, size, px, lh }) => (
            <div className={styles.typographyRow} key={size}>
              <span
                className={styles.typographyPreview}
                style={{
                  fontSize: `var(--ink-font-detail-${size}-size)`,
                  lineHeight: `var(--ink-font-detail-${size}-line-height)`,
                }}
              >
                {name}
              </span>
              <div className={styles.typographyMeta}>
                <span className={styles.typographyToken}>--ink-font-detail-{size}-*</span>
                <span className={styles.typographyValue}>
                  {px} / {lh}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Body Styles</h3>
          </div>
          {bodyStyles.map(({ name, size, px, lh }) => (
            <div className={styles.typographyRow} key={size}>
              <span
                className={styles.typographyPreview}
                style={{
                  fontSize: `var(--ink-font-body-${size}-size)`,
                  lineHeight: `var(--ink-font-body-${size}-line-height)`,
                }}
              >
                {name}
              </span>
              <div className={styles.typographyMeta}>
                <span className={styles.typographyToken}>--ink-font-body-{size}-*</span>
                <span className={styles.typographyValue}>
                  {px} / {lh}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Heading Styles</h3>
          </div>
          {headingStyles.map(({ name, size, px, lh }) => (
            <div className={styles.typographyRow} key={size}>
              <span
                className={styles.typographyPreview}
                style={{
                  fontSize: `var(--ink-font-heading-${size}-size)`,
                  lineHeight: `var(--ink-font-heading-${size}-line-height)`,
                  fontWeight: 600,
                }}
              >
                {name}
              </span>
              <div className={styles.typographyMeta}>
                <span className={styles.typographyToken}>--ink-font-heading-{size}-*</span>
                <span className={styles.typographyValue}>
                  {px} / {lh}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Display Styles</h3>
          </div>
          {displayStyles.map(({ name, size, px, lh }) => (
            <div className={styles.typographyRow} key={size}>
              <span
                className={styles.typographyPreview}
                style={{
                  fontSize: `var(--ink-font-display-${size}-size)`,
                  lineHeight: `var(--ink-font-display-${size}-line-height)`,
                  fontWeight: 700,
                }}
              >
                {name}
              </span>
              <div className={styles.typographyMeta}>
                <span className={styles.typographyToken}>--ink-font-display-{size}-*</span>
                <span className={styles.typographyValue}>
                  {px} / {lh}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Spacing
  if (activeSubpage === 'spacing') {
    const spacingTokens = [
      { token: '--ink-spacing-0', value: '0px' },
      { token: '--ink-spacing-50', value: '4px' },
      { token: '--ink-spacing-100', value: '8px' },
      { token: '--ink-spacing-150', value: '12px' },
      { token: '--ink-spacing-200', value: '16px' },
      { token: '--ink-spacing-250', value: '20px' },
      { token: '--ink-spacing-300', value: '24px' },
      { token: '--ink-spacing-400', value: '32px' },
      { token: '--ink-spacing-500', value: '40px' },
      { token: '--ink-spacing-600', value: '48px' },
      { token: '--ink-spacing-700', value: '64px' },
    ];

    return (
      <div className={styles.tokenPage}>
        <div className={styles.tokenSection}>
          {spacingTokens.map(({ token, value }) => (
            <div className={styles.spacingRow} key={token}>
              <div className={styles.spacingBar} style={{ width: value }} />
              <div className={styles.spacingMeta}>
                <span className={styles.spacingToken}>{token}</span>
                <span className={styles.spacingValue}>{value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Border Radius
  if (activeSubpage === 'border-radius') {
    const radiusTokens = [
      { token: '--ink-radius-size-xs', value: '4px' },
      { token: '--ink-radius-size-s', value: '8px' },
      { token: '--ink-radius-size-m', value: '12px' },
      { token: '--ink-radius-size-l', value: '16px' },
      { token: '--ink-radius-size-full', value: '9999px' },
    ];

    return (
      <div className={styles.tokenPage}>
        <div className={styles.tokenSection}>
          <div className={styles.radiusRow}>
            {radiusTokens.map(({ token, value }) => (
              <div className={styles.radiusCell} key={token}>
                <div className={styles.radiusPreview} style={{ borderRadius: value }} />
                <div className={styles.radiusMeta}>
                  <span className={styles.radiusValue}>{value}</span>
                  <span className={styles.radiusToken}>{token}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Shadows
  if (activeSubpage === 'shadows') {
    const shadowTokens = [
      { token: '--ink-shadow-xs', label: 'Extra Small' },
      { token: '--ink-shadow-sm', label: 'Small' },
      { token: '--ink-shadow-md', label: 'Medium' },
      { token: '--ink-shadow-lg', label: 'Large' },
      { token: '--ink-shadow-xl', label: 'Extra Large' },
      { token: '--ink-elevation-low', label: 'Elevation Low' },
      { token: '--ink-elevation-medium', label: 'Elevation Medium' },
      { token: '--ink-elevation-high', label: 'Elevation High' },
    ];

    return (
      <div className={styles.tokenPage}>
        <div className={styles.tokenSection}>
          {shadowTokens.map(({ token, label }) => (
            <div className={styles.shadowRow} key={token}>
              <div className={styles.shadowPreview} style={{ boxShadow: `var(${token})` }} />
              <div className={styles.shadowMeta}>
                <span className={styles.shadowLabel}>{label}</span>
                <span className={styles.shadowToken}>{token}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Component Tokens
  if (activeSubpage === 'component-tokens') {
    const buttonVariants = [
      { variant: 'brand', label: 'Brand', desc: 'Vibrant purple for brand actions' },
      { variant: 'primary', label: 'Primary', desc: 'Dark purple for primary actions' },
      { variant: 'secondary', label: 'Secondary', desc: 'Outlined for secondary actions' },
      { variant: 'tertiary', label: 'Tertiary', desc: 'Subtle for tertiary actions' },
      { variant: 'danger', label: 'Danger', desc: 'Red for destructive actions' },
    ];

    const formBgTokens = [
      { token: '--ink-form-bg-default', label: 'Default' },
      { token: '--ink-form-bg-disabled', label: 'Disabled' },
      { token: '--ink-form-bg-error', label: 'Error' },
      { token: '--ink-form-bg-selected', label: 'Selected' },
      { token: '--ink-form-bg-highlight', label: 'Highlight' },
    ];

    const formBorderTokens = [
      { token: '--ink-form-border-default', label: 'Default' },
      { token: '--ink-form-border-hover', label: 'Hover' },
      { token: '--ink-form-border-active', label: 'Active' },
      { token: '--ink-form-border-error', label: 'Error' },
      { token: '--ink-form-border-selected', label: 'Selected' },
    ];

    const iconTokens = [
      { token: '--ink-icon-color-default', label: 'Default' },
      { token: '--ink-icon-color-accent', label: 'Accent' },
      { token: '--ink-icon-color-success', label: 'Success' },
      { token: '--ink-icon-color-error', label: 'Error' },
      { token: '--ink-icon-color-warning', label: 'Warning' },
      { token: '--ink-icon-color-disabled', label: 'Disabled' },
      { token: '--ink-icon-color-emphasis', label: 'Emphasis' },
      { token: '--ink-icon-color-subtle', label: 'Subtle' },
      { token: '--ink-icon-color-inverse', label: 'Inverse' },
    ];

    return (
      <div className={styles.tokenPage}>
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Button Tokens</h3>
          </div>
          {buttonVariants.map(({ variant, label, desc }) => (
            <div className={styles.componentTokenRow} key={variant}>
              <div className={styles.componentTokenPreview}>
                <Button kind={variant as any} size="small">
                  {label}
                </Button>
              </div>
              <div className={styles.componentTokenInfo}>
                <div className={styles.componentTokenLabel}>{label}</div>
                <div className={styles.componentTokenDesc}>{desc}</div>
              </div>
              <div className={styles.componentTokenTokens}>
                --ink-button-{variant}-bg, -hover, -active, -text
              </div>
            </div>
          ))}
        </div>

        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Form Background Tokens</h3>
          </div>
          {formBgTokens.map(({ token, label }) => (
            <div className={styles.tokenRow} key={token}>
              <div className={styles.tokenPreview} style={{ background: `var(${token})` }} />
              <span className={styles.tokenName}>{token}</span>
              <span className={styles.tokenValue}>{label}</span>
            </div>
          ))}
        </div>

        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Form Border Tokens</h3>
          </div>
          {formBorderTokens.map(({ token, label }) => (
            <div className={styles.tokenRow} key={token}>
              <div
                className={styles.tokenPreview}
                style={{ border: `2px solid var(${token})`, background: 'var(--ink-white-100)' }}
              />
              <span className={styles.tokenName}>{token}</span>
              <span className={styles.tokenValue}>{label}</span>
            </div>
          ))}
        </div>

        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Icon Color Tokens</h3>
          </div>
          {iconTokens.map(({ token, label }) => (
            <div className={styles.tokenRow} key={token}>
              <div className={styles.tokenPreviewText}>
                <Icon name="star" size="small" style={{ color: `var(${token})` }} />
              </div>
              <span className={styles.tokenName}>{token}</span>
              <span className={styles.tokenValue}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // State Tokens
  if (activeSubpage === 'state-tokens') {
    const itemBgTokens = [
      { token: '--ink-item-bg-hover', label: 'Hover' },
      { token: '--ink-item-bg-hover-subtle', label: 'Hover Subtle' },
      { token: '--ink-item-bg-active', label: 'Active' },
      { token: '--ink-item-bg-active-subtle', label: 'Active Subtle' },
      { token: '--ink-item-bg-selected', label: 'Selected' },
      { token: '--ink-item-bg-selected-subtle', label: 'Selected Subtle' },
    ];

    const itemBorderTokens = [
      { token: '--ink-item-border-hover', label: 'Hover' },
      { token: '--ink-item-border-active', label: 'Active' },
    ];

    const statusTokens = [
      { token: '--ink-status-bg-accent', label: 'Accent' },
      { token: '--ink-status-bg-accent-subtle', label: 'Accent Subtle' },
      { token: '--ink-status-bg-alert', label: 'Alert' },
      { token: '--ink-status-bg-current', label: 'Current' },
      { token: '--ink-status-bg-emphasis', label: 'Emphasis' },
      { token: '--ink-status-bg-future', label: 'Future' },
      { token: '--ink-status-bg-neutral', label: 'Neutral' },
      { token: '--ink-status-bg-past', label: 'Past' },
      { token: '--ink-status-bg-subtle', label: 'Subtle' },
      { token: '--ink-status-bg-subtle-inverse', label: 'Subtle Inverse' },
      { token: '--ink-status-bg-success', label: 'Success' },
      { token: '--ink-status-bg-warning', label: 'Warning' },
    ];

    const messageTokens = [
      { token: '--ink-message-bg-default', label: 'Default' },
      { token: '--ink-message-bg-alert', label: 'Alert' },
      { token: '--ink-message-bg-alert-alternate', label: 'Alert Alternate' },
      { token: '--ink-message-bg-emphasis', label: 'Emphasis' },
      { token: '--ink-message-bg-error', label: 'Error' },
      { token: '--ink-message-bg-promo', label: 'Promo' },
      { token: '--ink-message-bg-subtle', label: 'Subtle' },
      { token: '--ink-message-bg-success', label: 'Success' },
      { token: '--ink-message-bg-warning', label: 'Warning' },
    ];

    const messageBorderTokens = [
      { token: '--ink-message-border-default', label: 'Default' },
      { token: '--ink-message-border-promo', label: 'Promo' },
    ];

    const barFillTokens = [
      { token: '--ink-bar-fill-default', label: 'Default' },
      { token: '--ink-bar-fill-emphasis', label: 'Emphasis' },
      { token: '--ink-bar-fill-success', label: 'Success' },
      { token: '--ink-bar-fill-error', label: 'Error' },
      { token: '--ink-bar-fill-warning', label: 'Warning' },
      { token: '--ink-bar-fill-subtle', label: 'Subtle' },
    ];

    const barTrackTokens = [
      { token: '--ink-bar-track-default', label: 'Default' },
      { token: '--ink-bar-track-emphasis', label: 'Emphasis' },
      { token: '--ink-bar-track-visited', label: 'Visited' },
    ];

    const barWidthTokens = [
      { token: '--ink-bar-width-xs', value: '2px', label: 'XS' },
      { token: '--ink-bar-width-s', value: '4px', label: 'S' },
      { token: '--ink-bar-width-m', value: '8px', label: 'M' },
    ];

    return (
      <div className={styles.tokenPage}>
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Item Background States</h3>
          </div>
          {itemBgTokens.map(({ token, label }) => (
            <div className={styles.tokenRow} key={token}>
              <div className={styles.tokenPreview} style={{ background: `var(${token})` }} />
              <span className={styles.tokenName}>{token}</span>
              <span className={styles.tokenValue}>{label}</span>
            </div>
          ))}
        </div>

        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Item Border States</h3>
          </div>
          {itemBorderTokens.map(({ token, label }) => (
            <div className={styles.tokenRow} key={token}>
              <div
                className={styles.tokenPreview}
                style={{ border: `2px solid var(${token})`, background: 'var(--ink-white-100)' }}
              />
              <span className={styles.tokenName}>{token}</span>
              <span className={styles.tokenValue}>{label}</span>
            </div>
          ))}
        </div>

        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Status Backgrounds</h3>
          </div>
          {statusTokens.map(({ token, label }) => (
            <div className={styles.tokenRow} key={token}>
              <div className={styles.tokenPreview} style={{ background: `var(${token})` }} />
              <span className={styles.tokenName}>{token}</span>
              <span className={styles.tokenValue}>{label}</span>
            </div>
          ))}
        </div>

        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Message Backgrounds</h3>
          </div>
          {messageTokens.map(({ token, label }) => (
            <div className={styles.tokenRow} key={token}>
              <div className={styles.tokenPreview} style={{ background: `var(${token})` }} />
              <span className={styles.tokenName}>{token}</span>
              <span className={styles.tokenValue}>{label}</span>
            </div>
          ))}
        </div>

        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Message Borders</h3>
          </div>
          {messageBorderTokens.map(({ token, label }) => (
            <div className={styles.tokenRow} key={token}>
              <div
                className={styles.tokenPreview}
                style={{ border: `2px solid var(${token})`, background: 'var(--ink-white-100)' }}
              />
              <span className={styles.tokenName}>{token}</span>
              <span className={styles.tokenValue}>{label}</span>
            </div>
          ))}
        </div>

        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Bar Fill Colors</h3>
          </div>
          {barFillTokens.map(({ token, label }) => (
            <div className={styles.spacingRow} key={token}>
              <div
                style={{
                  width: '60px',
                  height: '8px',
                  background: `var(${token})`,
                  borderRadius: '4px',
                }}
              />
              <div className={styles.spacingMeta}>
                <span className={styles.spacingToken}>{token}</span>
                <span className={styles.spacingValue}>{label}</span>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Bar Track Colors</h3>
          </div>
          {barTrackTokens.map(({ token, label }) => (
            <div className={styles.spacingRow} key={token}>
              <div
                style={{
                  width: '60px',
                  height: '8px',
                  background: `var(${token})`,
                  borderRadius: '4px',
                }}
              />
              <div className={styles.spacingMeta}>
                <span className={styles.spacingToken}>{token}</span>
                <span className={styles.spacingValue}>{label}</span>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Bar Widths</h3>
          </div>
          {barWidthTokens.map(({ token, value, label }) => (
            <div className={styles.spacingRow} key={token}>
              <div
                style={{
                  width: '60px',
                  height: value,
                  background: 'var(--ink-cobalt-100)',
                  borderRadius: '2px',
                }}
              />
              <div className={styles.spacingMeta}>
                <span className={styles.spacingToken}>{token}</span>
                <span className={styles.spacingValue}>
                  {label} ({value})
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Motion Tokens
  if (activeSubpage === 'motion') {
    const motionCurves = [
      {
        token: '--ink-motion-curve-default',
        label: 'Default',
        value: 'cubic-bezier(0.35, 0, 0.2, 1)',
      },
      {
        token: '--ink-motion-curve-opacity',
        label: 'Opacity',
        value: 'cubic-bezier(0.33, 0, 0.67, 1)',
      },
      { token: '--ink-motion-curve-snap', label: 'Snap', value: 'cubic-bezier(0.8, 0, 0.65, 1)' },
      {
        token: '--ink-motion-curve-spring',
        label: 'Spring',
        value: 'cubic-bezier(0.3, 1.7, 0.5, 1)',
      },
    ];

    const motionDurations = [
      { token: '--ink-motion-duration-100', value: '100ms' },
      { token: '--ink-motion-duration-200', value: '200ms' },
      { token: '--ink-motion-duration-300', value: '300ms' },
      { token: '--ink-motion-duration-400', value: '400ms' },
      { token: '--ink-motion-duration-500', value: '500ms' },
      { token: '--ink-motion-duration-600', value: '600ms' },
      { token: '--ink-motion-duration-800', value: '800ms' },
      { token: '--ink-motion-duration-1000', value: '1000ms' },
      { token: '--ink-motion-duration-1500', value: '1500ms' },
      { token: '--ink-motion-duration-2000', value: '2000ms' },
      { token: '--ink-motion-duration-3000', value: '3000ms' },
    ];

    return (
      <div className={styles.tokenPage}>
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Motion Curves (Easing)</h3>
          </div>
          {motionCurves.map(({ token, label, value }) => (
            <div className={styles.tokenRow} key={token}>
              <div
                className={styles.motionPreview}
                style={{
                  width: '60px',
                  height: '24px',
                  background: 'var(--ink-cobalt-100)',
                  borderRadius: 'var(--ink-radius-size-xs)',
                  transition: `transform 500ms var(${token})`,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateX(40px)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateX(0)')}
              />
              <span className={styles.tokenName}>{token}</span>
              <span className={styles.tokenValue}>{label}</span>
            </div>
          ))}
          <p
            style={{
              fontSize: 'var(--ink-font-size-sm)',
              color: 'var(--ink-font-neutral)',
              marginTop: 'var(--ink-spacing-200)',
            }}
          >
            Hover over the bars to see the easing curves in action
          </p>
        </div>

        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Motion Durations</h3>
          </div>
          {motionDurations.map(({ token, value }) => (
            <div className={styles.spacingRow} key={token}>
              <div
                style={{
                  width: `${parseInt(value) / 25}px`,
                  maxWidth: '120px',
                  height: '8px',
                  background: 'var(--ink-cobalt-100)',
                  borderRadius: '4px',
                }}
              />
              <div className={styles.spacingMeta}>
                <span className={styles.spacingToken}>{token}</span>
                <span className={styles.spacingValue}>{value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Link Tokens
  if (activeSubpage === 'link-tokens') {
    const linkColorTokens = [
      { token: '--ink-font-link', label: 'Link (default)' },
      { token: '--ink-font-link-hover', label: 'Link Hover' },
      { token: '--ink-font-link-active', label: 'Link Active' },
      { token: '--ink-font-link-visited', label: 'Link Visited' },
      { token: '--ink-font-link-subtle', label: 'Link Subtle' },
      { token: '--ink-font-link-subtle-hover', label: 'Link Subtle Hover' },
    ];

    const linkInverseTokens = [
      { token: '--ink-font-link-inverse', label: 'Link Inverse' },
      { token: '--ink-font-link-inverse-hover', label: 'Link Inverse Hover' },
      { token: '--ink-font-link-inverse-active', label: 'Link Inverse Active' },
      { token: '--ink-font-link-inverse-visited', label: 'Link Inverse Visited' },
    ];

    const linkStyleTokens = [
      { token: '--ink-font-link-text-decoration', value: 'underline', label: 'Text Decoration' },
      { token: '--ink-font-link-underline-offset', value: '3px', label: 'Underline Offset' },
      { token: '--ink-font-link-underline-thickness', value: '1px', label: 'Underline Thickness' },
    ];

    return (
      <div className={styles.tokenPage}>
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Link Colors</h3>
          </div>
          {linkColorTokens.map(({ token, label }) => (
            <div className={styles.tokenRow} key={token}>
              <div
                className={styles.tokenPreviewText}
                style={{ color: `var(${token})`, textDecoration: 'underline' }}
              >
                Link
              </div>
              <span className={styles.tokenName}>{token}</span>
              <span className={styles.tokenValue}>{label}</span>
            </div>
          ))}
        </div>

        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Link Inverse Colors</h3>
          </div>
          <div
            style={{
              background: 'var(--ink-bg-inverse)',
              padding: 'var(--ink-spacing-200)',
              borderRadius: 'var(--ink-radius-size-s)',
            }}
          >
            {linkInverseTokens.map(({ token, label }) => (
              <div className={styles.tokenRow} key={token} style={{ background: 'transparent' }}>
                <div
                  className={styles.tokenPreviewText}
                  style={{ color: `var(${token})`, textDecoration: 'underline' }}
                >
                  Link
                </div>
                <span className={styles.tokenName} style={{ color: 'var(--ink-font-inverse)' }}>
                  {token}
                </span>
                <span className={styles.tokenValue} style={{ color: 'var(--ink-font-inverse)' }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Link Style Tokens</h3>
          </div>
          {linkStyleTokens.map(({ token, value, label }) => (
            <div className={styles.tokenRow} key={token}>
              <span className={styles.tokenName}>{token}</span>
              <span className={styles.tokenValue}>
                {value} ({label})
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // FAB Tokens
  if (activeSubpage === 'fab-tokens') {
    const fabBgTokens = [
      { token: '--ink-fab-bg-primary', label: 'Primary' },
      { token: '--ink-fab-bg-primary-hover', label: 'Primary Hover' },
      { token: '--ink-fab-bg-primary-active', label: 'Primary Active' },
      { token: '--ink-fab-bg-brand', label: 'Brand' },
      { token: '--ink-fab-bg-brand-hover', label: 'Brand Hover' },
      { token: '--ink-fab-bg-brand-active', label: 'Brand Active' },
    ];

    const fabInverseTokens = [
      { token: '--ink-fab-bg-inverse', label: 'Inverse' },
      { token: '--ink-fab-bg-inverse-hover', label: 'Inverse Hover' },
      { token: '--ink-fab-bg-inverse-active', label: 'Inverse Active' },
    ];

    const fabElevationTokens = [
      { token: '--ink-fab-elevation-default', label: 'Default Elevation' },
      { token: '--ink-fab-elevation-hover', label: 'Hover Elevation' },
    ];

    const comboButtonTokens = [
      { token: '--ink-combo-button-border-default', label: 'Default' },
      { token: '--ink-combo-button-border-hover', label: 'Hover' },
      { token: '--ink-combo-button-border-focus', label: 'Focus' },
    ];

    const toggleButtonTokens = [
      { token: '--ink-toggle-button-bg-default', label: 'Background Default' },
      { token: '--ink-toggle-button-bg-selected', label: 'Background Selected' },
      { token: '--ink-toggle-button-bg-hover', label: 'Background Hover' },
      { token: '--ink-toggle-button-border-default', label: 'Border Default' },
      { token: '--ink-toggle-button-text-default', label: 'Text Default' },
      { token: '--ink-toggle-button-text-selected', label: 'Text Selected' },
    ];

    return (
      <div className={styles.tokenPage}>
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>FAB Background Colors</h3>
          </div>
          {fabBgTokens.map(({ token, label }) => (
            <div className={styles.tokenRow} key={token}>
              <div
                className={styles.tokenPreview}
                style={{
                  background: `var(${token})`,
                  borderRadius: 'var(--ink-radius-full)',
                  width: '48px',
                  height: '48px',
                }}
              />
              <span className={styles.tokenName}>{token}</span>
              <span className={styles.tokenValue}>{label}</span>
            </div>
          ))}
        </div>

        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>FAB Inverse Colors</h3>
          </div>
          <div
            style={{
              background: 'var(--ink-bg-inverse)',
              padding: 'var(--ink-spacing-200)',
              borderRadius: 'var(--ink-radius-size-s)',
            }}
          >
            {fabInverseTokens.map(({ token, label }) => (
              <div className={styles.tokenRow} key={token} style={{ background: 'transparent' }}>
                <div
                  className={styles.tokenPreview}
                  style={{
                    background: `var(${token})`,
                    borderRadius: 'var(--ink-radius-full)',
                    width: '48px',
                    height: '48px',
                  }}
                />
                <span className={styles.tokenName} style={{ color: 'var(--ink-font-inverse)' }}>
                  {token}
                </span>
                <span className={styles.tokenValue} style={{ color: 'var(--ink-font-inverse)' }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>FAB Elevation</h3>
          </div>
          {fabElevationTokens.map(({ token, label }) => (
            <div className={styles.shadowRow} key={token}>
              <div
                className={styles.shadowPreview}
                style={{
                  boxShadow: `var(${token})`,
                  borderRadius: 'var(--ink-radius-full)',
                  width: '48px',
                  height: '48px',
                }}
              />
              <div className={styles.shadowMeta}>
                <span className={styles.shadowLabel}>{label}</span>
                <span className={styles.shadowToken}>{token}</span>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Combo Button Borders</h3>
          </div>
          {comboButtonTokens.map(({ token, label }) => (
            <div className={styles.tokenRow} key={token}>
              <div
                className={styles.tokenPreview}
                style={{ border: `2px solid var(${token})`, background: 'var(--ink-white-100)' }}
              />
              <span className={styles.tokenName}>{token}</span>
              <span className={styles.tokenValue}>{label}</span>
            </div>
          ))}
        </div>

        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Toggle Button Tokens</h3>
          </div>
          {toggleButtonTokens.map(({ token, label }) => (
            <div className={styles.tokenRow} key={token}>
              <div
                className={styles.tokenPreview}
                style={{
                  background: token.includes('bg') ? `var(${token})` : 'var(--ink-bg-default)',
                  border: token.includes('border')
                    ? `2px solid var(${token})`
                    : '1px solid var(--ink-border-default)',
                }}
              />
              <span className={styles.tokenName}>{token}</span>
              <span className={styles.tokenValue}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Gradients
  if (activeSubpage === 'gradients') {
    const gradientTokens = [
      { token: '--ink-gradient-pearl', label: 'Pearl', desc: 'Ecru to White' },
      { token: '--ink-gradient-atmosphere', label: 'Atmosphere', desc: 'Cobalt 40 to Cobalt 100' },
      { token: '--ink-gradient-blue-haze', label: 'Blue Haze', desc: 'Cobalt 100 to Cobalt 140' },
      { token: '--ink-gradient-nightglow', label: 'Nightglow', desc: 'Red 70 to Cobalt 100' },
    ];

    return (
      <div className={styles.tokenPage}>
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Gradient Tokens</h3>
          </div>
          {gradientTokens.map(({ token, label, desc }) => (
            <div className={styles.shadowRow} key={token}>
              <div
                className={styles.shadowPreview}
                style={{
                  background: `var(${token})`,
                  width: '120px',
                  height: '60px',
                  borderRadius: 'var(--ink-radius-size-s)',
                }}
              />
              <div className={styles.shadowMeta}>
                <span className={styles.shadowLabel}>{label}</span>
                <span className={styles.shadowToken}>{token}</span>
                <span
                  style={{ fontSize: 'var(--ink-font-size-xs)', color: 'var(--ink-font-neutral)' }}
                >
                  {desc}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Tag Tokens
  if (activeSubpage === 'tag-tokens') {
    const tagTokens = [
      { token: '--ink-tag-bg-active', label: 'Active' },
      { token: '--ink-tag-bg-selected', label: 'Selected' },
      { token: '--ink-tag-bg-selected-active', label: 'Selected Active' },
      { token: '--ink-tag-bg-selected-hover', label: 'Selected Hover' },
    ];

    const tagInverseTokens = [
      { token: '--ink-tag-bg-active-inverse', label: 'Active Inverse' },
      { token: '--ink-tag-bg-selected-inverse', label: 'Selected Inverse' },
      { token: '--ink-tag-bg-selected-active-inverse', label: 'Selected Active Inverse' },
      { token: '--ink-tag-bg-selected-hover-inverse', label: 'Selected Hover Inverse' },
    ];

    return (
      <div className={styles.tokenPage}>
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Tag Background Colors</h3>
          </div>
          {tagTokens.map(({ token, label }) => (
            <div className={styles.tokenRow} key={token}>
              <div
                className={styles.tokenPreview}
                style={{
                  background: `var(${token})`,
                  borderRadius: 'var(--ink-radius-full)',
                  padding: '4px 12px',
                }}
              />
              <span className={styles.tokenName}>{token}</span>
              <span className={styles.tokenValue}>{label}</span>
            </div>
          ))}
        </div>

        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Tag Inverse Colors</h3>
          </div>
          <div
            style={{
              background: 'var(--ink-bg-inverse)',
              padding: 'var(--ink-spacing-200)',
              borderRadius: 'var(--ink-radius-size-s)',
            }}
          >
            {tagInverseTokens.map(({ token, label }) => (
              <div className={styles.tokenRow} key={token} style={{ background: 'transparent' }}>
                <div
                  className={styles.tokenPreview}
                  style={{
                    background: `var(${token})`,
                    borderRadius: 'var(--ink-radius-full)',
                    padding: '4px 12px',
                  }}
                />
                <span className={styles.tokenName} style={{ color: 'var(--ink-font-inverse)' }}>
                  {token}
                </span>
                <span className={styles.tokenValue} style={{ color: 'var(--ink-font-inverse)' }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
};
