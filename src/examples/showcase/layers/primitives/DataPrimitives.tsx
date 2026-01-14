import React, { useState } from 'react';
import {
  Stack,
  Inline,
  Slider,
  Badge,
  Avatar,
  AvatarGroup,
  AlertBadge,
  StatusLight,
  Spinner,
  ProgressBar,
  IconButton,
  Card,
  Text,
} from '@/design-system';
import { SelectableComponent } from '../../components/SelectableComponent';
import styles from '../../Showcase.module.css';

export interface DataPrimitivesProps {
  activeSubpage: string;
  selectedComponentId?: string | null;
  onComponentSelect?: (componentId: string, props: Record<string, unknown>) => void;
}

// Controlled Slider wrapper for showcase
const ControlledSlider: React.FC<
  Omit<React.ComponentProps<typeof Slider>, 'value' | 'onChange'> & { defaultValue?: number }
> = ({ defaultValue = 50, ...props }) => {
  const [value, setValue] = useState(defaultValue);
  return <Slider {...props} value={value} onChange={setValue} />;
};

// Controlled Slider with IconButtons
const SliderWithButtons: React.FC<{
  label: string;
  defaultValue?: number;
  startIcon?: string;
  endIcon?: string;
  min?: number;
  max?: number;
  step?: number;
  hideLabel?: boolean;
  description?: string;
  disabled?: boolean;
}> = ({
  label,
  defaultValue = 50,
  startIcon = 'zoom-out',
  endIcon = 'zoom-in',
  min = 0,
  max = 100,
  step = 1,
  hideLabel = false,
  description,
  disabled = false,
}) => {
  const [value, setValue] = useState(defaultValue);
  return (
    <Slider
      label={label}
      value={value}
      onChange={setValue}
      min={min}
      max={max}
      step={step}
      hideLabel={hideLabel}
      description={description}
      disabled={disabled}
      startElement={startIcon}
      endElement={endIcon}
      onStartClick={() => setValue((prev) => Math.max(min, prev - step))}
      onEndClick={() => setValue((prev) => Math.min(max, prev + step))}
    />
  );
};

// Data definitions for compact rendering
const badgeVariants = ['subtle', 'emphasis', 'success', 'warning', 'alert', 'promo'] as const;
const avatarSizes = ['xsmall', 'small', 'medium', 'large'] as const;
const avatarColors = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as const;
const statusKinds = ['neutral', 'success', 'warning', 'alert'] as const;
const spinnerSizes = ['small', 'medium', 'large'] as const;
const progressKinds = ['info', 'success'] as const;
const progressVariants = ['determinate', 'indeterminate'] as const;

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
              <SelectableComponent
                componentId="slider-volume"
                componentProps={{ label: 'Volume', value: 50 }}
                isSelected={selectedComponentId === 'slider-volume'}
                onSelect={onComponentSelect}
              >
                <ControlledSlider label="Volume" defaultValue={50} />
              </SelectableComponent>
              <SelectableComponent
                componentId="slider-brightness"
                componentProps={{ label: 'Brightness', value: 75, showValue: true }}
                isSelected={selectedComponentId === 'slider-brightness'}
                onSelect={onComponentSelect}
              >
                <ControlledSlider label="Brightness" defaultValue={75} showValue />
              </SelectableComponent>
            </Stack>
          </div>
        </div>

        {/* With Start/End IconButtons */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>With Start/End IconButtons</h3>
            <span className={styles.tokenSectionSubtitle}>Click buttons to adjust value</span>
          </div>
          <div className={styles.interactiveArea}>
            <Stack gap="medium">
              <SliderWithButtons
                label="Zoom"
                defaultValue={50}
                startIcon="zoom-out"
                endIcon="zoom-in"
              />
              <SliderWithButtons
                label="Volume"
                defaultValue={70}
                startIcon="volume-slash"
                endIcon="volume-high"
              />
            </Stack>
          </div>
        </div>

        {/* States - Interactive */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>States</h3>
            <span className={styles.tokenSectionSubtitle}>Hover and drag to see color changes</span>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>default</span>
            <div style={{ flex: 1, maxWidth: '300px' }}>
              <ControlledSlider label="Default state" defaultValue={50} hideLabel />
            </div>
            <span className={styles.demoDesc}>Subtle gray track fill</span>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>hover</span>
            <div style={{ flex: 1, maxWidth: '300px' }}>
              <ControlledSlider label="Hover state" defaultValue={50} hideLabel />
            </div>
            <span className={styles.demoDesc}>Hover over track → darker fill</span>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>active</span>
            <div style={{ flex: 1, maxWidth: '300px' }}>
              <ControlledSlider label="Active state" defaultValue={50} hideLabel />
            </div>
            <span className={styles.demoDesc}>Click & drag → purple accent fill</span>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>disabled</span>
            <div style={{ flex: 1, maxWidth: '300px' }}>
              <ControlledSlider label="Disabled state" defaultValue={50} hideLabel disabled />
            </div>
            <span className={styles.demoDesc}>25% opacity</span>
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
              <ControlledSlider
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
              <ControlledSlider
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
        </div>

        {/* With Description */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>With Description</h3>
          </div>
          <div className={styles.interactiveArea}>
            <ControlledSlider
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
                <SelectableComponent
                  componentId={`avatar-size-${size}`}
                  componentProps={{ size, initials: size.substring(0, 2).toUpperCase() }}
                  isSelected={selectedComponentId === `avatar-size-${size}`}
                  onSelect={onComponentSelect}
                >
                  <Avatar size={size} initials={size.substring(0, 2).toUpperCase()} />
                </SelectableComponent>
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
                <SelectableComponent
                  componentId={`statuslight-kind-${kind}`}
                  componentProps={{ kind, children: kind.charAt(0).toUpperCase() + kind.slice(1) }}
                  isSelected={selectedComponentId === `statuslight-kind-${kind}`}
                  onSelect={onComponentSelect}
                >
                  <StatusLight kind={kind}>
                    {kind.charAt(0).toUpperCase() + kind.slice(1)}
                  </StatusLight>
                </SelectableComponent>
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
                <SelectableComponent
                  componentId={`spinner-size-${size}`}
                  componentProps={{ size }}
                  isSelected={selectedComponentId === `spinner-size-${size}`}
                  onSelect={onComponentSelect}
                >
                  <Spinner size={size} />
                </SelectableComponent>
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
        {/* Kinds */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Kinds</h3>
          </div>
          {progressKinds.map((kind) => (
            <div className={styles.demoRow} key={kind}>
              <span className={styles.demoLabel}>{kind}</span>
              <div style={{ flex: 1, maxWidth: '320px' }}>
                <SelectableComponent
                  componentId={`progressbar-kind-${kind}`}
                  componentProps={{ value: 100, kind, showLabel: true }}
                  isSelected={selectedComponentId === `progressbar-kind-${kind}`}
                  onSelect={onComponentSelect}
                >
                  <ProgressBar value={100} kind={kind} showLabel label="Label" />
                </SelectableComponent>
              </div>
              <span className={styles.propsCode}>kind="{kind}"</span>
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
              <div style={{ flex: 1, maxWidth: '320px' }}>
                <ProgressBar
                  value={variant === 'determinate' ? 50 : 0}
                  variant={variant}
                  kind="info"
                  showLabel
                  label="Label"
                />
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
            <span className={styles.demoLabel}>with label</span>
            <div style={{ flex: 1, maxWidth: '320px' }}>
              <ProgressBar value={75} showLabel label="Uploading" />
            </div>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>no label</span>
            <div style={{ flex: 1, maxWidth: '320px' }}>
              <ProgressBar value={75} showLabel={false} />
            </div>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>custom content</span>
            <div style={{ flex: 1, maxWidth: '320px' }}>
              <ProgressBar value={45} showLabel label="Processing" content="45 of 100" />
            </div>
          </div>
        </div>

        {/* Progress Values */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Progress Values</h3>
          </div>
          {[0, 25, 50, 75, 100].map((val) => (
            <div className={styles.demoRow} key={val}>
              <span className={styles.demoLabel}>{val}%</span>
              <div style={{ flex: 1, maxWidth: '320px' }}>
                <ProgressBar value={val} showLabel label="Progress" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};
