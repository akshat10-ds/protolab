import React from 'react';
import { Stack, Inline, Link, Heading, Text, Icon, Tooltip, iconPaths } from '@/design-system';
import { SelectableComponent } from '../../components/SelectableComponent';
import styles from '../../Showcase.module.css';

export interface TypographyPrimitivesProps {
  activeSubpage: string;
  selectedComponentId?: string | null;
  onComponentSelect?: (componentId: string, props: Record<string, unknown>) => void;
}

// Data definitions for compact rendering
const linkKinds = ['default', 'subtle'] as const;
const linkSizes = ['small', 'medium'] as const;
const headingLevels = [1, 2, 3, 4, 5, 6] as const;
const textSizes = ['xs', 'small', 'md', 'lg', 'xl'] as const;
const textWeights = ['light', 'regular', 'medium', 'semibold', 'bold'] as const;
const textColors = ['primary', 'secondary', 'tertiary', 'success', 'error'] as const;
const iconSizes = [
  { size: 'small', label: '16px' },
  { size: 'medium', label: '24px' },
  { size: 32, label: '32px' },
  { size: 48, label: '48px' },
] as const;
const iconColors = [
  'currentColor',
  'var(--ink-cobalt-60)',
  'var(--ink-red-60)',
  'var(--ink-green-60)',
  'var(--ink-orange-60)',
];
const popularIcons = [
  'check',
  'close',
  'plus',
  'edit',
  'trash',
  'download',
  'search',
  'settings',
  'user',
  'star',
  'bell',
  'calendar',
  'home',
  'info',
  'help-circle',
  'menu',
];

export const TypographyPrimitives: React.FC<TypographyPrimitivesProps> = ({
  activeSubpage,
  selectedComponentId,
  onComponentSelect,
}) => {
  if (activeSubpage === 'link') {
    return (
      <div className={styles.tokenPage}>
        {/* Kinds */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Kinds</h3>
          </div>
          {linkKinds.map((kind) => (
            <div className={styles.demoRow} key={kind}>
              <span className={styles.demoLabel}>{kind}</span>
              <div className={styles.demoPreviewWide}>
                <SelectableComponent
                  componentId={`link-kind-${kind}`}
                  componentProps={{ kind, href: '#', children: `This is a ${kind} link` }}
                  isSelected={selectedComponentId === `link-kind-${kind}`}
                  onSelect={onComponentSelect}
                >
                  <Link kind={kind} href="#">
                    This is a {kind} link
                  </Link>
                </SelectableComponent>
              </div>
              <span className={styles.propsCode}>kind="{kind}"</span>
            </div>
          ))}
        </div>

        {/* Sizes */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Sizes</h3>
          </div>
          {linkSizes.map((size) => (
            <div className={styles.demoRow} key={size}>
              <span className={styles.demoLabel}>{size}</span>
              <div className={styles.demoPreview}>
                <Link size={size} href="#">
                  {size} link
                </Link>
              </div>
              <span className={styles.propsCode}>size="{size}"</span>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Features</h3>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>discrete</span>
            <div className={styles.demoPreviewWide}>
              <Link discrete href="#">
                Hover to see underline
              </Link>
            </div>
            <span className={styles.demoDesc}>Only shows underline on hover</span>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>external</span>
            <div className={styles.demoPreviewWide}>
              <Link external href="https://www.docusign.com">
                External link
              </Link>
            </div>
            <span className={styles.demoDesc}>Opens in new tab with icon</span>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>disabled</span>
            <div className={styles.demoPreviewWide}>
              <Link disabled href="#">
                Disabled link
              </Link>
            </div>
          </div>
        </div>

        {/* In Context */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>In Context</h3>
          </div>
          <div className={styles.interactiveArea}>
            <Text>
              This is a paragraph with a <Link href="#">regular link</Link> and a{' '}
              <Link kind="subtle" href="#">
                subtle link
              </Link>{' '}
              embedded in text.
            </Text>
          </div>
        </div>
      </div>
    );
  }

  if (activeSubpage === 'typography') {
    return (
      <div className={styles.tokenPage}>
        {/* Headings */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Heading Levels</h3>
          </div>
          {headingLevels.map((level) => (
            <div className={styles.demoRow} key={level}>
              <span className={styles.demoLabel}>H{level}</span>
              <div style={{ flex: 1 }}>
                <SelectableComponent
                  componentId={`heading-level-${level}`}
                  componentProps={{ level, children: `Heading Level ${level}` }}
                  isSelected={selectedComponentId === `heading-level-${level}`}
                  onSelect={onComponentSelect}
                >
                  <Heading level={level}>Heading Level {level}</Heading>
                </SelectableComponent>
              </div>
              <span className={styles.propsCode}>level={level}</span>
            </div>
          ))}
        </div>

        {/* Text Sizes */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Text Sizes</h3>
          </div>
          {textSizes.map((size) => (
            <div className={styles.demoRow} key={size}>
              <span className={styles.demoLabel}>{size}</span>
              <div style={{ flex: 1 }}>
                <SelectableComponent
                  componentId={`text-size-${size}`}
                  componentProps={{ size, children: `${size} text` }}
                  isSelected={selectedComponentId === `text-size-${size}`}
                  onSelect={onComponentSelect}
                >
                  <Text size={size}>{size} text</Text>
                </SelectableComponent>
              </div>
              <span className={styles.propsCode}>size="{size}"</span>
            </div>
          ))}
        </div>

        {/* Text Weights */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Text Weights</h3>
          </div>
          {textWeights.map((weight) => (
            <div className={styles.demoRow} key={weight}>
              <span className={styles.demoLabel}>{weight}</span>
              <div style={{ flex: 1 }}>
                <Text weight={weight}>{weight} weight</Text>
              </div>
              <span className={styles.propsCode}>weight="{weight}"</span>
            </div>
          ))}
        </div>

        {/* Text Colors */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Text Colors</h3>
          </div>
          {textColors.map((color) => (
            <div className={styles.demoRow} key={color}>
              <span className={styles.demoLabel}>{color}</span>
              <div style={{ flex: 1 }}>
                <Text color={color}>{color} color</Text>
              </div>
              <span className={styles.propsCode}>color="{color}"</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (activeSubpage === 'icon') {
    const iconNames = Object.keys(iconPaths) as (keyof typeof iconPaths)[];

    return (
      <div className={styles.tokenPage}>
        {/* Sizes */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Sizes</h3>
          </div>
          <div className={styles.demoGrid}>
            {iconSizes.map(({ size, label }) => (
              <div className={styles.demoGridItem} key={label}>
                <SelectableComponent
                  componentId={`icon-size-${label}`}
                  componentProps={{ name: 'star', size }}
                  isSelected={selectedComponentId === `icon-size-${label}`}
                  onSelect={onComponentSelect}
                >
                  <Icon name="star" size={size as any} />
                </SelectableComponent>
                <span className={styles.demoGridLabel}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Colors */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Colors</h3>
          </div>
          <div className={styles.demoGrid}>
            {iconColors.map((color, i) => (
              <div className={styles.demoGridItem} key={i}>
                <Icon name="star" color={color} />
                <span className={styles.demoGridLabel}>
                  {color === 'currentColor' ? 'current' : color.split('--ink-')[1]?.split(')')[0]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Icons */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Popular Icons</h3>
          </div>
          <div className={styles.demoGrid}>
            {popularIcons.map((name) => (
              <div className={styles.demoGridItem} key={name}>
                <Tooltip content={name}>
                  <Icon name={name} size="medium" />
                </Tooltip>
                <span className={styles.demoGridLabel}>{name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* All Icons */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>All Icons ({iconNames.length})</h3>
          </div>
          <div className={styles.interactiveArea} style={{ maxHeight: '300px', overflowY: 'auto' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(50px, 1fr))',
                gap: '8px',
              }}
            >
              {iconNames.map((name) => (
                <Tooltip key={name} content={name}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '8px',
                      cursor: 'pointer',
                    }}
                  >
                    <Icon name={name} size="small" />
                  </div>
                </Tooltip>
              ))}
            </div>
          </div>
        </div>

        {/* Accessibility */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Accessibility</h3>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>aria-label</span>
            <div className={styles.demoPreview}>
              <Icon name="check" aria-label="Success" />
            </div>
            <span className={styles.demoDesc}>For meaningful icons</span>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>aria-hidden</span>
            <div className={styles.demoPreview}>
              <Icon name="status-warn" aria-hidden />
            </div>
            <span className={styles.demoDesc}>For decorative icons</span>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
