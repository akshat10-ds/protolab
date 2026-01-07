import React from 'react';
import {
  Stack,
  Inline,
  Slider,
  Badge,
  Avatar,
  AvatarGroup,
  Chip,
  AlertBadge,
  StatusLight,
  Spinner,
  ProgressBar,
  IconButton,
  Card,
  Text,
  Icon,
} from '@/design-system';
import { SelectableComponent } from '../../components/SelectableComponent';
import styles from '../../Showcase.module.css';

export interface DataPrimitivesProps {
  activeSubpage: string;
  selectedComponentId?: string | null;
  onComponentSelect?: (componentId: string, props: Record<string, unknown>) => void;
}

// Data definitions for compact rendering
const badgeVariants = ['subtle', 'emphasis', 'success', 'warning', 'alert', 'promo'] as const;
const avatarSizes = ['xsmall', 'small', 'medium', 'large'] as const;
const avatarColors = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as const;
const statusKinds = ['neutral', 'success', 'warning', 'alert'] as const;
const spinnerSizes = ['small', 'medium', 'large'] as const;
const progressSizes = ['small', 'medium', 'large'] as const;
const progressVariants = ['primary', 'success', 'warning', 'error'] as const;

export const DataPrimitives: React.FC<DataPrimitivesProps> = ({
  activeSubpage,
  selectedComponentId,
  onComponentSelect,
}) => {
  if (activeSubpage === 'slider') {
    return (
      <div className={styles.tokenPage}>
        {/* Basic */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Basic Usage</h3>
          </div>
          <div className={styles.interactiveArea}>
            <Stack gap="medium">
              <Slider label="Volume" defaultValue={50} />
              <Slider label="Brightness" defaultValue={75} showValue />
            </Stack>
          </div>
        </div>

        {/* Custom Range */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Custom Range & Step</h3>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>0-1000, step 50</span>
            <div style={{ flex: 1, maxWidth: '300px' }}>
              <Slider
                label="Price"
                min={0}
                max={1000}
                step={50}
                defaultValue={500}
                showValue
                hideLabel
              />
            </div>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>0-10, step 1</span>
            <div style={{ flex: 1, maxWidth: '300px' }}>
              <Slider
                label="Rating"
                min={0}
                max={10}
                step={1}
                defaultValue={5}
                showValue
                hideLabel
              />
            </div>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>0-100, step 5</span>
            <div style={{ flex: 1, maxWidth: '300px' }}>
              <Slider
                label="Quality"
                min={0}
                max={100}
                step={5}
                defaultValue={50}
                showValue
                hideLabel
              />
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
              <span className={styles.stateLabel}>Default</span>
              <Slider label="Default" defaultValue={50} hideLabel />
            </div>
            <div className={styles.stateCell}>
              <span className={styles.stateLabel}>Disabled</span>
              <Slider label="Disabled" defaultValue={50} disabled hideLabel />
            </div>
          </div>
        </div>

        {/* With Description */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>With Description</h3>
          </div>
          <div className={styles.interactiveArea}>
            <Slider
              label="Quality"
              description="Higher values = larger file size"
              min={1}
              max={100}
              defaultValue={75}
              showValue
            />
          </div>
        </div>
      </div>
    );
  }

  if (activeSubpage === 'badge') {
    return (
      <div className={styles.tokenPage}>
        {/* Variants */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Variants</h3>
          </div>
          {badgeVariants.map((variant) => (
            <div className={styles.demoRow} key={variant}>
              <span className={styles.demoLabel}>{variant}</span>
              <div className={styles.demoPreview}>
                <SelectableComponent
                  componentId={`badge-variant-${variant}`}
                  componentProps={{
                    variant,
                    children: variant.charAt(0).toUpperCase() + variant.slice(1),
                  }}
                  isSelected={selectedComponentId === `badge-variant-${variant}`}
                  onSelect={onComponentSelect}
                >
                  <Badge variant={variant}>
                    {variant.charAt(0).toUpperCase() + variant.slice(1)}
                  </Badge>
                </SelectableComponent>
              </div>
              <span className={styles.propsCode}>variant="{variant}"</span>
            </div>
          ))}
        </div>

        {/* Use Cases */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Common Use Cases</h3>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>Status</span>
            <div className={styles.demoPreviewWide}>
              <Inline gap="small">
                <Badge variant="success">Active</Badge>
                <Badge variant="warning">Pending</Badge>
                <Badge variant="alert">Inactive</Badge>
              </Inline>
            </div>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>Categories</span>
            <div className={styles.demoPreviewWide}>
              <Inline gap="small">
                <Badge>Design</Badge>
                <Badge>Engineering</Badge>
                <Badge>Marketing</Badge>
              </Inline>
            </div>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>Counts</span>
            <div className={styles.demoPreviewWide}>
              <Inline gap="small">
                <Badge variant="emphasis">12</Badge>
                <Badge variant="alert">99+</Badge>
                <Badge variant="success">3 new</Badge>
              </Inline>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeSubpage === 'avatar') {
    return (
      <div className={styles.tokenPage}>
        {/* Sizes */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Sizes</h3>
          </div>
          <div className={styles.demoGrid}>
            {avatarSizes.map((size) => (
              <div className={styles.demoGridItem} key={size}>
                <Avatar size={size} initials={size.substring(0, 2).toUpperCase()} />
                <span className={styles.demoGridLabel}>{size}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Shapes */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Shapes</h3>
          </div>
          <div className={styles.stateRow}>
            <div className={styles.stateCell}>
              <span className={styles.stateLabel}>Circle</span>
              <Avatar shape="circle" initials="CR" />
            </div>
            <div className={styles.stateCell}>
              <span className={styles.stateLabel}>Square</span>
              <Avatar shape="square" initials="SQ" />
            </div>
          </div>
        </div>

        {/* Color Indices */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Color Indices (0-9)</h3>
          </div>
          <div className={styles.demoGrid}>
            {avatarColors.map((colorIndex) => (
              <div className={styles.demoGridItem} key={colorIndex}>
                <Avatar initials={`C${colorIndex}`} colorIndex={colorIndex as any} />
                <span className={styles.demoGridLabel}>{colorIndex}</span>
              </div>
            ))}
          </div>
        </div>

        {/* With Images */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>With Images</h3>
          </div>
          <div className={styles.demoGrid}>
            <Avatar src="https://i.pravatar.cc/150?img=1" alt="User 1" />
            <Avatar src="https://i.pravatar.cc/150?img=2" alt="User 2" />
            <Avatar src="https://i.pravatar.cc/150?img=3" alt="User 3" />
          </div>
        </div>

        {/* Avatar Group */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Avatar Group</h3>
          </div>
          <div className={styles.interactiveArea}>
            <AvatarGroup max={4}>
              <Avatar initials="JD" />
              <Avatar initials="AB" />
              <Avatar initials="MK" />
              <Avatar initials="SC" />
              <Avatar initials="TW" />
              <Avatar initials="LM" />
            </AvatarGroup>
          </div>
        </div>
      </div>
    );
  }

  if (activeSubpage === 'chip') {
    return (
      <div className={styles.tokenPage}>
        {/* Basic */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Basic Chips</h3>
          </div>
          <div className={styles.demoGrid}>
            <Chip>React</Chip>
            <Chip>TypeScript</Chip>
            <Chip>JavaScript</Chip>
            <Chip>CSS</Chip>
          </div>
        </div>

        {/* With Elements */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>With Start Element</h3>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>Avatar</span>
            <div className={styles.demoPreviewWide}>
              <Inline gap="small">
                <Chip startElement={<Avatar size="xsmall" initials="JD" />}>John Doe</Chip>
                <Chip startElement={<Avatar size="xsmall" initials="AB" />}>Alice Brown</Chip>
              </Inline>
            </div>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>Icon</span>
            <div className={styles.demoPreview}>
              <Chip startElement={<Icon name="star" size="small" />}>Favorite</Chip>
            </div>
          </div>
        </div>

        {/* Interactive */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Interactive</h3>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>Removable</span>
            <div className={styles.demoPreviewWide}>
              <Inline gap="small">
                <Chip onRemove={() => {}}>React</Chip>
                <Chip onRemove={() => {}}>TypeScript</Chip>
              </Inline>
            </div>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>Clickable</span>
            <div className={styles.demoPreviewWide}>
              <Inline gap="small">
                <Chip onClick={() => {}}>All</Chip>
                <Chip onClick={() => {}}>Active</Chip>
              </Inline>
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
              <span className={styles.stateLabel}>Default</span>
              <Chip>Default</Chip>
            </div>
            <div className={styles.stateCell}>
              <span className={styles.stateLabel}>Disabled</span>
              <Chip disabled>Disabled</Chip>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeSubpage === 'alert-badge') {
    return (
      <div className={styles.tokenPage}>
        {/* With Numbers */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>With Numbers</h3>
          </div>
          <div className={styles.demoGrid}>
            {[5, 12, 99].map((value) => (
              <div className={styles.demoGridItem} key={value}>
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  <IconButton icon="bell" variant="secondary" aria-label="Notifications" />
                  <div style={{ position: 'absolute', top: '-4px', right: '-4px' }}>
                    <AlertBadge value={value} />
                  </div>
                </div>
                <span className={styles.demoGridLabel}>{value > 99 ? '99+' : value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Kinds */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Kinds</h3>
          </div>
          <div className={styles.stateRow}>
            <div className={styles.stateCell}>
              <span className={styles.stateLabel}>Emphasis</span>
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <IconButton icon="bell" variant="secondary" aria-label="Notifications" />
                <div style={{ position: 'absolute', top: '-4px', right: '-4px' }}>
                  <AlertBadge kind="emphasis" value={8} />
                </div>
              </div>
            </div>
            <div className={styles.stateCell}>
              <span className={styles.stateLabel}>Subtle</span>
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <IconButton icon="bell" variant="secondary" aria-label="Notifications" />
                <div style={{ position: 'absolute', top: '-4px', right: '-4px' }}>
                  <AlertBadge kind="subtle" value={3} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dot Indicator */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Dot Indicator</h3>
          </div>
          <div className={styles.demoGrid}>
            <div className={styles.demoGridItem}>
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <IconButton icon="bell" variant="secondary" aria-label="Notifications" />
                <div style={{ position: 'absolute', top: '-2px', right: '-2px' }}>
                  <AlertBadge dot />
                </div>
              </div>
              <span className={styles.demoGridLabel}>emphasis</span>
            </div>
            <div className={styles.demoGridItem}>
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <IconButton icon="envelope" variant="secondary" aria-label="Messages" />
                <div style={{ position: 'absolute', top: '-2px', right: '-2px' }}>
                  <AlertBadge dot kind="subtle" />
                </div>
              </div>
              <span className={styles.demoGridLabel}>subtle</span>
            </div>
            <div className={styles.demoGridItem}>
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <Avatar initials="JD" />
                <div style={{ position: 'absolute', top: '2px', right: '2px' }}>
                  <AlertBadge dot />
                </div>
              </div>
              <span className={styles.demoGridLabel}>on avatar</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeSubpage === 'status-light') {
    return (
      <div className={styles.tokenPage}>
        {/* Kinds */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Kinds</h3>
          </div>
          {statusKinds.map((kind) => (
            <div className={styles.demoRow} key={kind}>
              <span className={styles.demoLabel}>{kind}</span>
              <div className={styles.demoPreview}>
                <StatusLight kind={kind}>
                  {kind.charAt(0).toUpperCase() + kind.slice(1)}
                </StatusLight>
              </div>
              <span className={styles.propsCode}>kind="{kind}"</span>
            </div>
          ))}
        </div>

        {/* Filled vs Not Filled */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Filled vs Not Filled</h3>
          </div>
          <div className={styles.stateRow}>
            <div className={styles.stateCell}>
              <span className={styles.stateLabel}>Filled</span>
              <Inline gap="small">
                <StatusLight kind="success" filled>
                  Online
                </StatusLight>
                <StatusLight kind="warning" filled>
                  Away
                </StatusLight>
              </Inline>
            </div>
            <div className={styles.stateCell}>
              <span className={styles.stateLabel}>Not Filled</span>
              <Inline gap="small">
                <StatusLight kind="success" filled={false}>
                  Online
                </StatusLight>
                <StatusLight kind="warning" filled={false}>
                  Away
                </StatusLight>
              </Inline>
            </div>
          </div>
        </div>

        {/* Without Label */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Without Label</h3>
          </div>
          <div className={styles.demoGrid}>
            {statusKinds.map((kind) => (
              <div className={styles.demoGridItem} key={kind}>
                <StatusLight kind={kind} />
                <span className={styles.demoGridLabel}>{kind}</span>
              </div>
            ))}
          </div>
        </div>

        {/* In Context */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>In Context</h3>
          </div>
          <div className={styles.interactiveArea}>
            <Card>
              <Card.Body>
                <Stack gap="small">
                  <Text weight="semibold">System Status</Text>
                  <StatusLight kind="success">API Server: Operational</StatusLight>
                  <StatusLight kind="success">Database: Operational</StatusLight>
                  <StatusLight kind="warning">Cache: Degraded</StatusLight>
                </Stack>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (activeSubpage === 'spinner') {
    return (
      <div className={styles.tokenPage}>
        {/* Sizes */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Sizes</h3>
          </div>
          <div className={styles.demoGrid}>
            {spinnerSizes.map((size) => (
              <div className={styles.demoGridItem} key={size}>
                <Spinner size={size} />
                <span className={styles.demoGridLabel}>{size}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Kinds */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Kinds</h3>
          </div>
          <div className={styles.stateRow}>
            <div className={styles.stateCell}>
              <span className={styles.stateLabel}>Default</span>
              <Spinner kind="default" />
            </div>
            <div className={styles.stateCell}>
              <span className={styles.stateLabel}>Subtle</span>
              <Spinner kind="subtle" />
            </div>
          </div>
        </div>

        {/* With Label */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>With Label</h3>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>hidden label</span>
            <div className={styles.demoPreview}>
              <Spinner label="Loading data..." />
            </div>
            <span className={styles.demoDesc}>Accessible to screen readers</span>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>visible label</span>
            <div className={styles.demoPreview}>
              <Spinner label="Loading..." showLabel />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeSubpage === 'progressbar') {
    return (
      <div className={styles.tokenPage}>
        {/* Sizes */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Sizes</h3>
          </div>
          {progressSizes.map((size) => (
            <div className={styles.demoRow} key={size}>
              <span className={styles.demoLabel}>{size}</span>
              <div style={{ flex: 1, maxWidth: '300px' }}>
                <ProgressBar value={60} size={size} />
              </div>
              <span className={styles.propsCode}>size="{size}"</span>
            </div>
          ))}
        </div>

        {/* Variants */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Variants</h3>
          </div>
          {progressVariants.map((variant) => (
            <div className={styles.demoRow} key={variant}>
              <span className={styles.demoLabel}>{variant}</span>
              <div style={{ flex: 1, maxWidth: '300px' }}>
                <ProgressBar value={65} variant={variant} />
              </div>
              <span className={styles.propsCode}>variant="{variant}"</span>
            </div>
          ))}
        </div>

        {/* Labels */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Labels</h3>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>outside</span>
            <div style={{ flex: 1, maxWidth: '300px' }}>
              <ProgressBar value={65} showLabel />
            </div>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>inside</span>
            <div style={{ flex: 1, maxWidth: '300px' }}>
              <ProgressBar value={65} showLabel labelInside size="large" />
            </div>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>custom</span>
            <div style={{ flex: 1, maxWidth: '300px' }}>
              <ProgressBar value={45} showLabel label="45 of 100 files" />
            </div>
          </div>
        </div>

        {/* Styles */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Styles</h3>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>indeterminate</span>
            <div style={{ flex: 1, maxWidth: '300px' }}>
              <ProgressBar indeterminate />
            </div>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>striped</span>
            <div style={{ flex: 1, maxWidth: '300px' }}>
              <ProgressBar value={70} striped />
            </div>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>animated</span>
            <div style={{ flex: 1, maxWidth: '300px' }}>
              <ProgressBar value={70} striped animated />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
