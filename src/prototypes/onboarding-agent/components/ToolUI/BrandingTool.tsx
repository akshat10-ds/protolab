/**
 * BrandingTool Component
 *
 * Tool-based UI for branding setup during onboarding.
 * Uses the tool call card pattern (header, content, footer).
 */

import React, { useState } from 'react';
import { Button, IconButton, Icon } from '@/design-system';
import styles from './ToolUI.module.css';

export interface BrandColors {
  primary: string;
  secondary: string;
  accent?: string;
}

export interface BrandingToolProps {
  /** Detected colors from website */
  detectedColors?: BrandColors;
  /** Company name for display */
  companyName?: string;
  /** Website URL used for detection */
  websiteUrl?: string;
  /** Current step */
  step?: 'detected' | 'customize' | 'preview' | 'applied';
  /** Callback when branding is applied */
  onApply: (colors: BrandColors) => void;
  /** Callback to send sample envelope */
  onSendSample?: () => void;
  /** Callback when user cancels */
  onCancel?: () => void;
}

// Industry-based color suggestions
const INDUSTRY_COLORS: Record<string, BrandColors> = {
  'real-estate': { primary: '#1E3A5F', secondary: '#C9A961' },
  'financial-services': { primary: '#0A2F5C', secondary: '#00875A' },
  'healthcare': { primary: '#0077B6', secondary: '#48CAE4' },
  'technology': { primary: '#6366F1', secondary: '#22D3EE' },
  'legal': { primary: '#1F2937', secondary: '#9CA3AF' },
};

export const BrandingTool: React.FC<BrandingToolProps> = ({
  detectedColors,
  companyName = 'Your Company',
  websiteUrl,
  step = 'detected',
  onApply,
  onSendSample,
}) => {
  const [currentStep, setCurrentStep] = useState(step);
  const [colors, setColors] = useState<BrandColors>(
    detectedColors || { primary: '#4C00FF', secondary: '#FF6B35' }
  );

  const handleColorChange = (key: keyof BrandColors, value: string) => {
    setColors((prev) => ({ ...prev, [key]: value }));
  };

  const handleApplyColors = () => {
    setCurrentStep('applied');
    onApply(colors);
  };

  const handleCustomize = () => {
    setCurrentStep('customize');
  };

  const handlePreview = () => {
    setCurrentStep('preview');
  };

  // Detected colors step
  if (currentStep === 'detected') {
    return (
      <div className={styles.toolCard}>
        {/* Tool Call Header */}
        <div className={styles.toolCardHeader}>
          <h3 className={styles.toolCardTitle}>BRAND COLORS DETECTED</h3>
          {websiteUrl && <span className={styles.toolCardSubtitle}>from {websiteUrl}</span>}
          <div className={styles.toolCardHeaderActions}>
            <IconButton
              icon="overflow-horizontal"
              size="small"
              variant="tertiary"
              aria-label="More options"
            />
          </div>
        </div>

        {/* Content Area */}
        <div className={styles.toolCardContent}>
          <div className={styles.detectedInfo}>
            <Icon name="ai-spark" size={16} />
            <span>We extracted these colors from your company website</span>
          </div>

          <div className={styles.detectedColors}>
            <div className={styles.colorSwatches}>
              <div className={styles.colorSwatch}>
                <div className={styles.colorSwatchBox} style={{ backgroundColor: colors.primary }} />
                <span className={styles.colorSwatchLabel}>Primary</span>
              </div>
              <div className={styles.colorSwatch}>
                <div className={styles.colorSwatchBox} style={{ backgroundColor: colors.secondary }} />
                <span className={styles.colorSwatchLabel}>Secondary</span>
              </div>
            </div>
          </div>

          <p className={styles.stepQuestion}>These colors will apply to email banners, action buttons, and signing buttons.</p>
        </div>

        {/* Tool Call Footer */}
        <div className={styles.toolCardFooter}>
          <Button kind="tertiary" size="small" onClick={handleCustomize}>
            Customize
          </Button>
          <Button kind="secondary" size="small" onClick={handlePreview}>
            Preview
          </Button>
          <Button kind="primary" size="small" onClick={handleApplyColors}>
            Apply Colors
          </Button>
        </div>
      </div>
    );
  }

  // Customize colors step
  if (currentStep === 'customize') {
    return (
      <div className={styles.toolCard}>
        <div className={styles.toolCardHeader}>
          <h3 className={styles.toolCardTitle}>CUSTOMIZE YOUR COLORS</h3>
          <div className={styles.toolCardHeaderActions}>
            <IconButton
              icon="overflow-horizontal"
              size="small"
              variant="tertiary"
              aria-label="More options"
            />
          </div>
        </div>

        <div className={styles.toolCardContent}>
          <p className={styles.stepQuestion}>Enter hex values or use the color picker.</p>

          <div className={styles.colorInputs}>
            <div className={styles.colorInputGroup}>
              <label className={styles.colorInputLabel}>Primary Color</label>
              <div className={styles.colorInputRow}>
                <input
                  type="color"
                  value={colors.primary}
                  onChange={(e) => handleColorChange('primary', e.target.value)}
                  className={styles.colorPickerInput}
                />
                <input
                  type="text"
                  value={colors.primary}
                  onChange={(e) => handleColorChange('primary', e.target.value)}
                  className={styles.colorHexInput}
                  placeholder="#000000"
                />
              </div>
            </div>

            <div className={styles.colorInputGroup}>
              <label className={styles.colorInputLabel}>Secondary Color</label>
              <div className={styles.colorInputRow}>
                <input
                  type="color"
                  value={colors.secondary}
                  onChange={(e) => handleColorChange('secondary', e.target.value)}
                  className={styles.colorPickerInput}
                />
                <input
                  type="text"
                  value={colors.secondary}
                  onChange={(e) => handleColorChange('secondary', e.target.value)}
                  className={styles.colorHexInput}
                  placeholder="#000000"
                />
              </div>
            </div>
          </div>

          <div className={styles.previewSection}>
            <div className={styles.previewLabel}>QUICK PRESETS</div>
            <div className={styles.colorSwatches}>
              {Object.entries(INDUSTRY_COLORS).map(([industry, preset]) => (
                <button
                  key={industry}
                  type="button"
                  className={styles.colorSwatch}
                  onClick={() => setColors(preset)}
                  title={industry.replace('-', ' ')}
                  style={{ cursor: 'pointer' }}
                >
                  <div
                    className={styles.colorSwatchBox}
                    style={{
                      background: `linear-gradient(135deg, ${preset.primary} 50%, ${preset.secondary} 50%)`,
                    }}
                  />
                  <span className={styles.colorSwatchLabel}>{industry.split('-')[0]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.toolCardFooter}>
          <Button
            kind="tertiary"
            size="small"
            onClick={() => setCurrentStep('detected')}
            startElement={<Icon name="arrow-left" size={16} />}
          >
            Back
          </Button>
          <Button kind="secondary" size="small" onClick={handlePreview}>
            Preview
          </Button>
          <Button kind="primary" size="small" onClick={handleApplyColors}>
            Apply Colors
          </Button>
        </div>
      </div>
    );
  }

  // Preview step
  if (currentStep === 'preview') {
    return (
      <div className={styles.toolCard}>
        <div className={styles.toolCardHeader}>
          <h3 className={styles.toolCardTitle}>PREVIEW YOUR BRANDING</h3>
          <div className={styles.toolCardHeaderActions}>
            <IconButton
              icon="overflow-horizontal"
              size="small"
              variant="tertiary"
              aria-label="More options"
            />
          </div>
        </div>

        <div className={styles.toolCardContent}>
          <p className={styles.stepQuestion}>This is how your emails will look.</p>

          <div className={styles.previewSection}>
            <div className={styles.previewLabel}>ENVELOPE PREVIEW</div>
            <div className={styles.previewCard}>
              <div className={styles.previewCardHeader} style={{ borderColor: colors.primary }}>
                <div className={styles.previewCardLogo} style={{ backgroundColor: colors.primary }} />
                <span>{companyName}</span>
              </div>
              <p className={styles.previewCardText}>Please review and sign this document from {companyName}.</p>
              <button
                type="button"
                className={styles.previewCardButton}
                style={{ backgroundColor: colors.secondary }}
              >
                Review Document
              </button>
            </div>
          </div>
        </div>

        <div className={styles.toolCardFooter}>
          <Button
            kind="tertiary"
            size="small"
            onClick={handleCustomize}
            startElement={<Icon name="edit" size={16} />}
          >
            Edit Colors
          </Button>
          {onSendSample && (
            <Button
              kind="secondary"
              size="small"
              onClick={onSendSample}
              startElement={<Icon name="send" size={16} />}
            >
              Send Sample
            </Button>
          )}
          <Button kind="primary" size="small" onClick={handleApplyColors}>
            Apply Colors
          </Button>
        </div>
      </div>
    );
  }

  // Applied step (success state)
  if (currentStep === 'applied') {
    return (
      <div className={styles.toolCard}>
        <div className={styles.toolCardHeader}>
          <h3 className={styles.toolCardTitle}>BRANDING APPLIED</h3>
          <div className={styles.toolCardHeaderActions}>
            <IconButton
              icon="overflow-horizontal"
              size="small"
              variant="tertiary"
              aria-label="More options"
            />
          </div>
        </div>

        <div className={styles.toolCardContent}>
          <div className={styles.detectedInfo}>
            <Icon name="check" size={16} />
            <span>Your colors are now active on all envelopes</span>
          </div>

          <div className={styles.summaryList}>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>Primary</span>
              <div className={styles.colorSwatchBox} style={{ backgroundColor: colors.primary, width: 24, height: 24 }} />
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>Secondary</span>
              <div className={styles.colorSwatchBox} style={{ backgroundColor: colors.secondary, width: 24, height: 24 }} />
            </div>
          </div>
        </div>

        {onSendSample && (
          <div className={styles.toolCardFooter}>
            <Button
              kind="primary"
              size="small"
              onClick={onSendSample}
              startElement={<Icon name="send" size={16} />}
            >
              Send Sample Envelope
            </Button>
          </div>
        )}
      </div>
    );
  }

  return null;
};

export default BrandingTool;
