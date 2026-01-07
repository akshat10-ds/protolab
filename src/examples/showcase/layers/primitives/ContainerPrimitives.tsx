import React from 'react';
import {
  Stack,
  Inline,
  Button,
  IconButton,
  Divider,
  Card,
  Skeleton,
  Callout,
  Banner,
  Tooltip,
  Text,
  Link,
} from '@/design-system';
import styles from '../../Showcase.module.css';

export interface ContainerPrimitivesProps {
  activeSubpage: string;
}

// Data definitions for compact rendering
const dividerSpacings = ['none', 'small', 'medium', 'large'] as const;
const cardVariants = ['light', 'secondary', 'dark'] as const;
const skeletonVariants = ['text', 'circular', 'rectangular', 'rounded'] as const;
const circularSizes = ['xs', 'small', 'md', 'lg', 'xl'] as const;
const calloutWidths = ['small', 'medium', 'large', 'xlarge'] as const;
const bannerKinds = ['information', 'success', 'warning', 'danger', 'promo', 'subtle', 'neutral'] as const;
const tooltipPositions = ['top', 'bottom', 'left', 'right'] as const;

export const ContainerPrimitives: React.FC<ContainerPrimitivesProps> = ({ activeSubpage }) => {
  if (activeSubpage === 'divider') {
    return (
      <div className={styles.tokenPage}>
        {/* Orientation */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Orientation</h3>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>horizontal</span>
            <div style={{ flex: 1 }}>
              <Divider />
            </div>
            <span className={styles.propsCode}>default</span>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>vertical</span>
            <div className={styles.demoPreview} style={{ height: '40px', display: 'flex', alignItems: 'center' }}>
              <Text>A</Text>
              <Divider orientation="vertical" />
              <Text>B</Text>
            </div>
            <span className={styles.propsCode}>orientation="vertical"</span>
          </div>
        </div>

        {/* Spacing */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Spacing</h3>
          </div>
          {dividerSpacings.map((spacing) => (
            <div className={styles.demoRow} key={spacing}>
              <span className={styles.demoLabel}>{spacing}</span>
              <div style={{ flex: 1 }}>
                <Text size="small">Above</Text>
                <Divider spacing={spacing} />
                <Text size="small">Below</Text>
              </div>
              <span className={styles.propsCode}>spacing="{spacing}"</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (activeSubpage === 'card') {
    return (
      <div className={styles.tokenPage}>
        {/* Variants */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Variants</h3>
          </div>
          <div className={styles.stateRow}>
            {cardVariants.map((variant) => (
              <div className={styles.stateCell} key={variant}>
                <span className={styles.stateLabel}>{variant}</span>
                <Card variant={variant}>
                  <Card.Body>
                    <Text>{variant} card</Text>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Anatomy */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Card Anatomy</h3>
          </div>
          <div className={styles.interactiveArea}>
            <Card>
              <Card.Header>
                <Text weight="semibold">Card Header</Text>
              </Card.Header>
              <Card.Body>
                <Text>Card body content goes here.</Text>
              </Card.Body>
              <Card.Footer>
                <Inline gap="small">
                  <Button kind="primary" size="small">Action</Button>
                  <Button kind="tertiary" size="small">Cancel</Button>
                </Inline>
              </Card.Footer>
            </Card>
          </div>
        </div>

        {/* States */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>States & Options</h3>
          </div>
          <div className={styles.stateRow}>
            <div className={styles.stateCell}>
              <span className={styles.stateLabel}>Disabled</span>
              <Card disabled>
                <Card.Body><Text>Disabled</Text></Card.Body>
              </Card>
            </div>
            <div className={styles.stateCell}>
              <span className={styles.stateLabel}>No Padding</span>
              <Card noPadding>
                <div style={{ background: 'var(--ink-neutral-20)', padding: '12px' }}>
                  <Text>Custom padding</Text>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeSubpage === 'skeleton') {
    return (
      <div className={styles.tokenPage}>
        {/* Variants */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Variants</h3>
          </div>
          <div className={styles.stateRow}>
            <div className={styles.stateCell}>
              <span className={styles.stateLabel}>Text</span>
              <Stack gap="small">
                <Skeleton variant="text" width="100%" />
                <Skeleton variant="text" width="80%" />
              </Stack>
            </div>
            <div className={styles.stateCell}>
              <span className={styles.stateLabel}>Circular</span>
              <Skeleton variant="circular" size="md" />
            </div>
            <div className={styles.stateCell}>
              <span className={styles.stateLabel}>Rectangular</span>
              <Skeleton variant="rectangular" width="100%" height={60} />
            </div>
            <div className={styles.stateCell}>
              <span className={styles.stateLabel}>Rounded</span>
              <Skeleton variant="rounded" width="100%" height={60} />
            </div>
          </div>
        </div>

        {/* Circular Sizes */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Circular Sizes</h3>
          </div>
          <div className={styles.demoGrid}>
            {circularSizes.map((size) => (
              <div className={styles.demoGridItem} key={size}>
                <Skeleton variant="circular" size={size} />
                <span className={styles.demoGridLabel}>{size}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Options */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Options</h3>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>lines</span>
            <div style={{ flex: 1, maxWidth: '300px' }}>
              <Skeleton variant="text" lines={3} />
            </div>
            <span className={styles.propsCode}>lines=3</span>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>no animation</span>
            <div style={{ flex: 1, maxWidth: '300px' }}>
              <Skeleton variant="text" animated={false} width="100%" />
            </div>
            <span className={styles.propsCode}>animated=false</span>
          </div>
        </div>

        {/* Example */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Loading Card Example</h3>
          </div>
          <div className={styles.interactiveArea}>
            <Card>
              <Card.Body>
                <Stack gap="medium">
                  <Inline gap="medium">
                    <Skeleton variant="circular" size="lg" />
                    <Stack gap="small" style={{ flex: 1 }}>
                      <Skeleton variant="text" width="60%" />
                      <Skeleton variant="text" width="40%" />
                    </Stack>
                  </Inline>
                  <Skeleton variant="rectangular" width="100%" height={100} />
                </Stack>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (activeSubpage === 'callout') {
    return (
      <div className={styles.tokenPage}>
        {/* Locations */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Caret Location</h3>
          </div>
          <div className={styles.stateRow}>
            <div className={styles.stateCell}>
              <span className={styles.stateLabel}>Above</span>
              <Callout heading="Above" location="above" closable={false}>Points up</Callout>
            </div>
            <div className={styles.stateCell}>
              <span className={styles.stateLabel}>Below</span>
              <Callout heading="Below" location="below" closable={false}>Points down</Callout>
            </div>
          </div>
        </div>

        {/* Widths */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Widths</h3>
          </div>
          {calloutWidths.map((width) => (
            <div className={styles.demoRow} key={width}>
              <span className={styles.demoLabel}>{width}</span>
              <div style={{ flex: 1 }}>
                <Callout heading={width} width={width} closable={false}>Content</Callout>
              </div>
              <span className={styles.propsCode}>width="{width}"</span>
            </div>
          ))}
        </div>

        {/* Alignment */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Text Alignment</h3>
          </div>
          <div className={styles.stateRow}>
            <div className={styles.stateCell}>
              <span className={styles.stateLabel}>Start</span>
              <Callout heading="Start" alignment="start" closable={false}>Left-aligned</Callout>
            </div>
            <div className={styles.stateCell}>
              <span className={styles.stateLabel}>Center</span>
              <Callout heading="Center" alignment="center" closable={false}>Center-aligned</Callout>
            </div>
            <div className={styles.stateCell}>
              <span className={styles.stateLabel}>End</span>
              <Callout heading="End" alignment="end" closable={false}>Right-aligned</Callout>
            </div>
          </div>
        </div>

        {/* With Actions */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>With Actions</h3>
          </div>
          <div className={styles.interactiveArea}>
            <Callout
              heading="Confirm Action"
              primaryAction={{ label: 'Confirm', onClick: () => {} }}
              secondaryAction={{ label: 'Cancel', onClick: () => {} }}
              closable={false}
            >
              Are you sure you want to proceed?
            </Callout>
          </div>
        </div>

        {/* Glass Effects */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Glass Effects</h3>
          </div>
          <div className={styles.interactiveArea} style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <Stack gap="small">
              <Callout heading="None" glass="none" closable={false}>Solid</Callout>
              <Callout heading="Frost" glass="frost" closable={false}>Frosted</Callout>
              <Callout heading="Tint" glass="tint" closable={false}>Tinted</Callout>
            </Stack>
          </div>
        </div>
      </div>
    );
  }

  if (activeSubpage === 'banner') {
    return (
      <div className={styles.tokenPage}>
        {/* Kinds */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Kinds</h3>
          </div>
          <div className={styles.interactiveArea}>
            <Stack gap="small">
              <Banner kind="information" icon="info">Information banner</Banner>
              <Banner kind="success" icon="status-check">Success banner</Banner>
              <Banner kind="warning" icon="status-warn">Warning banner</Banner>
              <Banner kind="danger" icon="status-error">Danger banner</Banner>
              <Banner kind="promo" icon="star">Promo banner</Banner>
              <Banner kind="subtle">Subtle banner</Banner>
              <Banner kind="neutral">Neutral banner</Banner>
            </Stack>
          </div>
        </div>

        {/* Options */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Options</h3>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>with action</span>
            <div style={{ flex: 1 }}>
              <Banner kind="information" icon="info" action={{ label: 'Learn More', onClick: () => {} }}>
                Banner with action button
              </Banner>
            </div>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>round shape</span>
            <div style={{ flex: 1 }}>
              <Banner kind="success" shape="round">Rounded corners</Banner>
            </div>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>lineWrap</span>
            <div style={{ flex: 1 }}>
              <Banner kind="information" lineWrap>
                This is a longer banner message that wraps to multiple lines for detailed content.
              </Banner>
            </div>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>not closable</span>
            <div style={{ flex: 1 }}>
              <Banner kind="warning" icon="status-warn" closable={false}>Cannot dismiss</Banner>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeSubpage === 'tooltip') {
    return (
      <div className={styles.tokenPage}>
        {/* Positions */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Positions</h3>
          </div>
          <div className={styles.demoGrid}>
            {tooltipPositions.map((position) => (
              <div className={styles.demoGridItem} key={position}>
                <Tooltip content={`Tooltip on ${position}`} position={position}>
                  <Button size="small">{position}</Button>
                </Tooltip>
              </div>
            ))}
          </div>
        </div>

        {/* Triggers */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Different Triggers</h3>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>button</span>
            <div className={styles.demoPreview}>
              <Tooltip content="Tooltip on button">
                <Button kind="brand">Hover me</Button>
              </Tooltip>
            </div>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>icon button</span>
            <div className={styles.demoPreview}>
              <Tooltip content="Help tooltip">
                <IconButton icon="help" variant="secondary" aria-label="Help" />
              </Tooltip>
            </div>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>link</span>
            <div className={styles.demoPreview}>
              <Tooltip content="Tooltip on link">
                <Link href="#">Hover this link</Link>
              </Tooltip>
            </div>
          </div>
        </div>

        {/* Delay */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Custom Delay</h3>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>0ms</span>
            <div className={styles.demoPreview}>
              <Tooltip content="Instant" delay={0}>
                <Button size="small">No delay</Button>
              </Tooltip>
            </div>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>200ms</span>
            <div className={styles.demoPreview}>
              <Tooltip content="Default delay" delay={200}>
                <Button size="small">Default</Button>
              </Tooltip>
            </div>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>1000ms</span>
            <div className={styles.demoPreview}>
              <Tooltip content="Slow tooltip" delay={1000}>
                <Button size="small">Slow</Button>
              </Tooltip>
            </div>
          </div>
        </div>

        {/* States */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>States</h3>
          </div>
          <div className={styles.stateRow}>
            <div className={styles.stateCell}>
              <span className={styles.stateLabel}>Enabled</span>
              <Tooltip content="Active tooltip">
                <Button size="small">Enabled</Button>
              </Tooltip>
            </div>
            <div className={styles.stateCell}>
              <span className={styles.stateLabel}>Disabled</span>
              <Tooltip content="Disabled tooltip" disabled>
                <Button size="small">Disabled</Button>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
