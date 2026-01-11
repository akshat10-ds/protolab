import React from 'react';
import {
  Stack,
  Inline,
  Button,
  IconButton,
  Divider,
  Card,
  Skeleton,
  Tooltip,
  Text,
  Link,
} from '@/design-system';
import { SelectableComponent } from '../../components/SelectableComponent';
import styles from '../../Showcase.module.css';

export interface ContainerPrimitivesProps {
  activeSubpage: string;
  selectedComponentId?: string | null;
  onComponentSelect?: (componentId: string, props: Record<string, unknown>) => void;
}

// Data definitions for compact rendering
const dividerSpacings = ['none', 'small', 'medium', 'large'] as const;
const cardVariants = ['light', 'secondary', 'dark'] as const;
const skeletonVariants = ['text', 'circular', 'rectangular', 'rounded'] as const;
const circularSizes = ['xs', 'small', 'md', 'lg', 'xl'] as const;
const tooltipPositions = ['top', 'bottom', 'left', 'right'] as const;

export const ContainerPrimitives: React.FC<ContainerPrimitivesProps> = ({
  activeSubpage,
  selectedComponentId,
  onComponentSelect,
}) => {
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
              <SelectableComponent
                componentId="divider-horizontal"
                componentProps={{}}
                isSelected={selectedComponentId === 'divider-horizontal'}
                onSelect={onComponentSelect}
              >
                <Divider />
              </SelectableComponent>
            </div>
            <span className={styles.propsCode}>default</span>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>vertical</span>
            <div
              className={styles.demoPreview}
              style={{ height: '40px', display: 'flex', alignItems: 'center' }}
            >
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
                <SelectableComponent
                  componentId={`card-variant-${variant}`}
                  componentProps={{ variant }}
                  isSelected={selectedComponentId === `card-variant-${variant}`}
                  onSelect={onComponentSelect}
                >
                  <Card variant={variant}>
                    <Card.Body>
                      <Text>{variant} card</Text>
                    </Card.Body>
                  </Card>
                </SelectableComponent>
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
                  <Button kind="primary" size="small">
                    Action
                  </Button>
                  <Button kind="tertiary" size="small">
                    Cancel
                  </Button>
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
                <Card.Body>
                  <Text>Disabled</Text>
                </Card.Body>
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
              <SelectableComponent
                componentId="skeleton-text"
                componentProps={{ variant: 'text', width: '100%' }}
                isSelected={selectedComponentId === 'skeleton-text'}
                onSelect={onComponentSelect}
              >
                <Stack gap="small">
                  <Skeleton variant="text" width="100%" />
                  <Skeleton variant="text" width="80%" />
                </Stack>
              </SelectableComponent>
            </div>
            <div className={styles.stateCell}>
              <span className={styles.stateLabel}>Circular</span>
              <SelectableComponent
                componentId="skeleton-circular"
                componentProps={{ variant: 'circular', size: 'md' }}
                isSelected={selectedComponentId === 'skeleton-circular'}
                onSelect={onComponentSelect}
              >
                <Skeleton variant="circular" size="md" />
              </SelectableComponent>
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
                <SelectableComponent
                  componentId={`tooltip-position-${position}`}
                  componentProps={{ content: `Tooltip on ${position}`, position }}
                  isSelected={selectedComponentId === `tooltip-position-${position}`}
                  onSelect={onComponentSelect}
                >
                  <Tooltip content={`Tooltip on ${position}`} position={position}>
                    <Button size="small">{position}</Button>
                  </Tooltip>
                </SelectableComponent>
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
