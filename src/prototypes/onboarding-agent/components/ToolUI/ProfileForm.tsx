/**
 * ProfileForm Tool Component
 *
 * Tool-based UI for collecting user profile information during onboarding.
 * Uses an accordion-style pattern where completed steps collapse to show selections.
 */

import React, { useState } from 'react';
import { Button, IconButton, Icon, Input } from '@/design-system';
import styles from './ToolUI.module.css';

export interface ProfileData {
  industry?: string;
  industryOther?: string;
  subVertical?: string;
  department?: string;
  role?: string;
}

export interface ProfileFormProps {
  /** Pre-detected values from email domain */
  detectedValues?: {
    company?: string;
    industry?: string;
  };
  /** Callback when profile is complete */
  onComplete: (profile: ProfileData) => void;
}

const INDUSTRIES = [
  { id: 'real-estate', label: 'Real Estate', description: 'Property sales, leasing, and management' },
  { id: 'financial-services', label: 'Financial Services', description: 'Banking, insurance, and investments' },
  { id: 'healthcare', label: 'Healthcare', description: 'Medical providers and life sciences' },
  { id: 'technology', label: 'Technology', description: 'Software and IT services' },
  { id: 'legal', label: 'Legal', description: 'Law firms and legal departments' },
  { id: 'other', label: 'Other', description: 'Different industry not listed above' },
];

const SUB_VERTICALS: Record<string, { id: string; label: string; description: string }[]> = {
  'real-estate': [
    { id: 'residential', label: 'Residential', description: 'Home sales and rentals' },
    { id: 'commercial', label: 'Commercial', description: 'Office and retail properties' },
    { id: 'property-mgmt', label: 'Property Management', description: 'Building operations and maintenance' },
  ],
  'financial-services': [
    { id: 'banking', label: 'Banking', description: 'Retail and commercial banking' },
    { id: 'insurance', label: 'Insurance', description: 'Life, property, and casualty' },
    { id: 'wealth-mgmt', label: 'Wealth Management', description: 'Investment advisory services' },
  ],
  'healthcare': [
    { id: 'hospitals', label: 'Hospitals & Clinics', description: 'Patient care facilities' },
    { id: 'pharma', label: 'Pharmaceuticals', description: 'Drug development and manufacturing' },
    { id: 'insurance', label: 'Health Insurance', description: 'Healthcare coverage providers' },
  ],
  'technology': [
    { id: 'saas', label: 'SaaS', description: 'Cloud-based software products' },
    { id: 'enterprise', label: 'Enterprise Software', description: 'Large-scale business systems' },
    { id: 'consulting', label: 'IT Consulting', description: 'Technology advisory services' },
  ],
  'legal': [
    { id: 'law-firm', label: 'Law Firm', description: 'Private legal practice' },
    { id: 'corporate', label: 'Corporate Legal', description: 'In-house legal teams' },
    { id: 'government', label: 'Government', description: 'Public sector legal work' },
  ],
};

const ROLES = [
  { id: 'admin', label: 'Administrator', description: 'Manage account settings and users' },
  { id: 'manager', label: 'Manager', description: 'Oversee team workflows' },
  { id: 'individual', label: 'Individual Contributor', description: 'Send and sign documents' },
];

export const ProfileForm: React.FC<ProfileFormProps> = ({
  detectedValues,
  onComplete,
}) => {
  const [profile, setProfile] = useState<ProfileData>({
    industry: detectedValues?.industry,
  });
  const [expandedSection, setExpandedSection] = useState<'industry' | 'subVertical' | 'role' | null>('industry');
  const [otherIndustryValue, setOtherIndustryValue] = useState('');

  const hasSubVerticals = profile.industry && profile.industry !== 'other' && SUB_VERTICALS[profile.industry];
  const industryLabel = profile.industry === 'other' && otherIndustryValue
    ? otherIndustryValue
    : INDUSTRIES.find((i) => i.id === profile.industry)?.label;
  const subVerticalLabel = profile.subVertical
    ? SUB_VERTICALS[profile.industry!]?.find((sv) => sv.id === profile.subVertical)?.label
    : null;
  const roleData = ROLES.find((r) => r.id === profile.role);

  const handleIndustrySelect = (industryId: string) => {
    setProfile((prev) => ({ ...prev, industry: industryId, subVertical: undefined }));

    // Don't auto-advance if "Other" is selected - wait for input
    if (industryId === 'other') {
      return;
    }

    // Auto-advance to next section
    if (SUB_VERTICALS[industryId]) {
      setExpandedSection('subVertical');
    } else {
      setExpandedSection('role');
    }
  };

  const handleOtherIndustryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtherIndustryValue(e.target.value);
    setProfile((prev) => ({ ...prev, industryOther: e.target.value }));
  };

  const handleOtherIndustryContinue = () => {
    if (otherIndustryValue.trim()) {
      setExpandedSection('role');
    }
  };

  const handleSubVerticalSelect = (subVerticalId: string) => {
    setProfile((prev) => ({ ...prev, subVertical: subVerticalId }));
    setExpandedSection('role');
  };

  const handleRoleSelect = (roleId: string) => {
    setProfile((prev) => ({ ...prev, role: roleId }));
    setExpandedSection(null);
  };

  const handleComplete = () => {
    onComplete(profile);
  };

  // Determine if profile is complete
  const isOtherIndustryComplete = profile.industry === 'other' && otherIndustryValue.trim();
  const isIndustryComplete = profile.industry && (profile.industry !== 'other' || isOtherIndustryComplete);
  const isComplete = isIndustryComplete && profile.role && (!hasSubVerticals || profile.subVertical);

  return (
    <div className={styles.toolCard}>
      {/* Tool Call Header */}
      <div className={styles.toolCardHeader}>
        <h3 className={styles.toolCardTitle}>SET UP YOUR PROFILE</h3>
        <div className={styles.toolCardHeaderActions}>
          <IconButton
            icon="overflow-horizontal"
            size="small"
            variant="tertiary"
            aria-label="More options"
          />
        </div>
      </div>

      {/* Content Area - Accordion Sections */}
      <div className={styles.toolCardContent}>
        {detectedValues?.company && (
          <div className={styles.detectedInfo}>
            <Icon name="ai-spark" size={16} />
            <span>Detected from your email: <strong>{detectedValues.company}</strong></span>
          </div>
        )}

        {/* Simple Accordion */}
        <div className={styles.accordionContainer}>
          {/* Industry Section */}
          <div className={styles.accordionSection}>
            <button
              type="button"
              className={`${styles.accordionHeader} ${expandedSection === 'industry' ? styles.accordionHeaderExpanded : ''}`}
              onClick={() => setExpandedSection(expandedSection === 'industry' ? null : 'industry')}
            >
              <div className={styles.accordionHeaderContent}>
                <span className={styles.accordionLabel}>Industry</span>
                {isIndustryComplete && expandedSection !== 'industry' && (
                  <span className={styles.accordionValue}>{industryLabel}</span>
                )}
              </div>
              <span className={`${styles.accordionChevron} ${expandedSection === 'industry' ? styles.accordionChevronExpanded : ''}`}>
                <Icon name="chevron-down" size={16} />
              </span>
            </button>

            {expandedSection === 'industry' && (
              <div className={styles.accordionContent}>
                <div className={styles.roleOptions}>
                  {INDUSTRIES.map((industry) => (
                    <button
                      key={industry.id}
                      type="button"
                      className={`${styles.roleOption} ${profile.industry === industry.id ? styles.roleOptionSelected : ''}`}
                      onClick={() => handleIndustrySelect(industry.id)}
                    >
                      <span className={styles.roleOptionLabel}>{industry.label}</span>
                      <span className={styles.roleOptionDescription}>{industry.description}</span>
                    </button>
                  ))}
                </div>
                {/* Show input when "Other" is selected */}
                {profile.industry === 'other' && (
                  <div className={styles.otherInputRow}>
                    <Input
                      placeholder="Enter your industry"
                      value={otherIndustryValue}
                      onChange={handleOtherIndustryChange}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && otherIndustryValue.trim()) {
                          handleOtherIndustryContinue();
                        }
                      }}
                    />
                    {otherIndustryValue.trim() && (
                      <Button
                        kind="secondary"
                        size="small"
                        onClick={handleOtherIndustryContinue}
                      >
                        Continue
                      </Button>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sub-Vertical Section (conditional) */}
          {hasSubVerticals && (
            <div className={styles.accordionSection}>
              <button
                type="button"
                className={`${styles.accordionHeader} ${expandedSection === 'subVertical' ? styles.accordionHeaderExpanded : ''}`}
                onClick={() => profile.industry && setExpandedSection(expandedSection === 'subVertical' ? null : 'subVertical')}
                disabled={!profile.industry}
              >
                <div className={styles.accordionHeaderContent}>
                  <span className={styles.accordionLabel}>Type</span>
                  {profile.subVertical && expandedSection !== 'subVertical' && (
                    <span className={styles.accordionValue}>{subVerticalLabel}</span>
                  )}
                </div>
                <span className={`${styles.accordionChevron} ${expandedSection === 'subVertical' ? styles.accordionChevronExpanded : ''}`}>
                  <Icon name="chevron-down" size={16} />
                </span>
              </button>

              {expandedSection === 'subVertical' && (
                <div className={styles.accordionContent}>
                  <div className={styles.roleOptions}>
                    {SUB_VERTICALS[profile.industry!]?.map((sv) => (
                      <button
                        key={sv.id}
                        type="button"
                        className={`${styles.roleOption} ${profile.subVertical === sv.id ? styles.roleOptionSelected : ''}`}
                        onClick={() => handleSubVerticalSelect(sv.id)}
                      >
                        <span className={styles.roleOptionLabel}>{sv.label}</span>
                        <span className={styles.roleOptionDescription}>{sv.description}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Role Section */}
          <div className={styles.accordionSection}>
            <button
              type="button"
              className={`${styles.accordionHeader} ${expandedSection === 'role' ? styles.accordionHeaderExpanded : ''}`}
              onClick={() => setExpandedSection(expandedSection === 'role' ? null : 'role')}
              disabled={!isIndustryComplete || (hasSubVerticals && !profile.subVertical)}
            >
              <div className={styles.accordionHeaderContent}>
                <span className={styles.accordionLabel}>Role</span>
                {profile.role && expandedSection !== 'role' && (
                  <span className={styles.accordionValue}>{roleData?.label}</span>
                )}
              </div>
              <span className={`${styles.accordionChevron} ${expandedSection === 'role' ? styles.accordionChevronExpanded : ''}`}>
                <Icon name="chevron-down" size={16} />
              </span>
            </button>

            {expandedSection === 'role' && (
              <div className={styles.accordionContent}>
                <div className={styles.roleOptions}>
                  {ROLES.map((role) => (
                    <button
                      key={role.id}
                      type="button"
                      className={`${styles.roleOption} ${profile.role === role.id ? styles.roleOptionSelected : ''}`}
                      onClick={() => handleRoleSelect(role.id)}
                    >
                      <span className={styles.roleOptionLabel}>{role.label}</span>
                      <span className={styles.roleOptionDescription}>{role.description}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tool Call Footer */}
      <div className={styles.toolCardFooter}>
        <Button kind="primary" size="small" onClick={handleComplete} disabled={!isComplete}>
          Confirm
        </Button>
      </div>
    </div>
  );
};

export default ProfileForm;
