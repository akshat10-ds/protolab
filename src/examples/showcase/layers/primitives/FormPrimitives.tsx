import React from 'react';
import {
  Stack,
  Inline,
  Button,
  IconButton,
  Input,
  Select,
  Checkbox,
  Radio,
  Switch,
  TextArea,
  Icon,
} from '@/design-system';
import { SelectableComponent } from '../../components/SelectableComponent';
import styles from '../../Showcase.module.css';

export interface FormPrimitivesProps {
  activeSubpage: string;
  selectedComponentId?: string | null;
  onComponentSelect?: (componentId: string, props: Record<string, unknown>) => void;
}

// Data definitions for compact rendering
const buttonKinds = ['brand', 'primary', 'secondary', 'tertiary', 'danger'] as const;
const buttonSizes = ['small', 'medium'] as const;
const iconButtonIcons = [
  { icon: 'edit', label: 'Edit' },
  { icon: 'duplicate', label: 'Copy' },
  { icon: 'download', label: 'Download' },
  { icon: 'share-web', label: 'Share' },
  { icon: 'close', label: 'Close' },
  { icon: 'refresh', label: 'Refresh' },
];
const inputTypes = ['text', 'email', 'password', 'number', 'date', 'time'] as const;
const resizeModes = ['vertical', 'horizontal', 'both', 'none'] as const;

export const FormPrimitives: React.FC<FormPrimitivesProps> = ({
  activeSubpage,
  selectedComponentId,
  onComponentSelect,
}) => {
  if (activeSubpage === 'button') {
    return (
      <div className={styles.tokenPage}>
        {/* Variants */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Variants (kind)</h3>
          </div>
          {buttonKinds.map((kind) => (
            <div className={styles.demoRow} key={kind}>
              <span className={styles.demoLabel}>{kind}</span>
              <div className={styles.demoPreview}>
                <SelectableComponent
                  componentId={`button-kind-${kind}`}
                  componentProps={{ kind, children: kind.charAt(0).toUpperCase() + kind.slice(1) }}
                  isSelected={selectedComponentId === `button-kind-${kind}`}
                  onSelect={onComponentSelect}
                >
                  <Button kind={kind}>{kind.charAt(0).toUpperCase() + kind.slice(1)}</Button>
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
          <div className={styles.stateRow}>
            {buttonSizes.map((size) => (
              <div className={styles.stateCell} key={size}>
                <span className={styles.stateLabel}>
                  {size} ({size === 'small' ? '32px' : '40px'})
                </span>
                <SelectableComponent
                  componentId={`button-size-${size}`}
                  componentProps={{ kind: 'brand', size, children: size }}
                  isSelected={selectedComponentId === `button-size-${size}`}
                  onSelect={onComponentSelect}
                >
                  <Button kind="brand" size={size}>
                    {size.charAt(0).toUpperCase() + size.slice(1)}
                  </Button>
                </SelectableComponent>
              </div>
            ))}
          </div>
        </div>

        {/* Icons */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>With Icons</h3>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>startElement</span>
            <div className={styles.demoPreview}>
              <Button kind="brand" startElement={<Icon name="plus" size="small" />}>
                Add Item
              </Button>
            </div>
            <span className={styles.propsCode}>startElement=&#123;...&#125;</span>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>endElement</span>
            <div className={styles.demoPreview}>
              <Button kind="primary" endElement={<Icon name="arrow-right" size="small" />}>
                Next
              </Button>
            </div>
            <span className={styles.propsCode}>endElement=&#123;...&#125;</span>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>Both</span>
            <div className={styles.demoPreview}>
              <Button
                kind="secondary"
                startElement={<Icon name="download" size="small" />}
                endElement={<Icon name="chevron-down" size="small" />}
              >
                Download
              </Button>
            </div>
            <span className={styles.propsCode}>startElement + endElement</span>
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
              <Button kind="brand">Default</Button>
            </div>
            <div className={styles.stateCell}>
              <span className={styles.stateLabel}>Loading</span>
              <Button kind="brand" loading>
                Saving...
              </Button>
            </div>
            <div className={styles.stateCell}>
              <span className={styles.stateLabel}>Disabled</span>
              <Button kind="brand" disabled>
                Disabled
              </Button>
            </div>
            <div className={styles.stateCell}>
              <span className={styles.stateLabel}>Active</span>
              <Button kind="brand" active>
                Active
              </Button>
            </div>
          </div>
        </div>

        {/* Modifiers */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Modifiers</h3>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>fullWidth</span>
            <div style={{ flex: 1 }}>
              <Button kind="brand" fullWidth>
                Full Width Button
              </Button>
            </div>
            <span className={styles.propsCode}>fullWidth</span>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>menuTrigger</span>
            <div className={styles.demoPreview}>
              <Button kind="secondary" menuTrigger>
                Options
              </Button>
            </div>
            <span className={styles.propsCode}>menuTrigger</span>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>href (link)</span>
            <div className={styles.demoPreview}>
              <Button
                kind="tertiary"
                href="#"
                endElement={<Icon name="external-link" size="small" />}
              >
                Open Link
              </Button>
            </div>
            <span className={styles.propsCode}>href="..."</span>
          </div>
        </div>

        {/* Inverted */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Inverted (dark bg)</h3>
          </div>
          <div
            className={styles.interactiveArea}
            style={{
              background: 'var(--ink-neutral-140)',
              borderRadius: '8px',
              padding: 'var(--ink-spacing-300)',
            }}
          >
            <Stack gap="medium">
              <Inline gap="small" wrap>
                <Button inverted kind="brand">
                  Brand
                </Button>
                <Button inverted kind="primary">
                  Primary
                </Button>
                <Button inverted kind="secondary">
                  Secondary
                </Button>
                <Button inverted kind="tertiary">
                  Tertiary
                </Button>
                <Button inverted kind="danger">
                  Danger
                </Button>
              </Inline>
              <Inline gap="small">
                <Button inverted kind="brand" startElement={<Icon name="plus" size="small" />}>
                  Add
                </Button>
                <Button inverted kind="secondary" loading>
                  Loading
                </Button>
                <Button inverted kind="tertiary" disabled>
                  Disabled
                </Button>
              </Inline>
            </Stack>
          </div>
        </div>
      </div>
    );
  }

  if (activeSubpage === 'iconbutton') {
    return (
      <div className={styles.tokenPage}>
        {/* Variants */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Variants</h3>
          </div>
          {buttonKinds.map((variant) => (
            <div className={styles.demoRow} key={variant}>
              <span className={styles.demoLabel}>{variant}</span>
              <div className={styles.demoPreview}>
                <SelectableComponent
                  componentId={`iconbutton-variant-${variant}`}
                  componentProps={{ icon: 'star', variant, 'aria-label': variant }}
                  isSelected={selectedComponentId === `iconbutton-variant-${variant}`}
                  onSelect={onComponentSelect}
                >
                  <IconButton icon="star" variant={variant} aria-label={variant} />
                </SelectableComponent>
              </div>
              <span className={styles.propsCode}>variant="{variant}"</span>
            </div>
          ))}
        </div>

        {/* Sizes */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Sizes</h3>
          </div>
          <div className={styles.stateRow}>
            {(['small', 'medium'] as const).map((size) => (
              <div className={styles.stateCell} key={size}>
                <span className={styles.stateLabel}>
                  {size} ({size === 'small' ? '32px' : '40px'})
                </span>
                <SelectableComponent
                  componentId={`iconbutton-size-${size}`}
                  componentProps={{ icon: 'plus', variant: 'brand', size, 'aria-label': 'Add' }}
                  isSelected={selectedComponentId === `iconbutton-size-${size}`}
                  onSelect={onComponentSelect}
                >
                  <IconButton icon="plus" variant="brand" size={size} aria-label="Add" />
                </SelectableComponent>
              </div>
            ))}
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
              <IconButton icon="star" variant="brand" aria-label="Default" />
            </div>
            <div className={styles.stateCell}>
              <span className={styles.stateLabel}>Disabled</span>
              <IconButton icon="star" variant="brand" disabled aria-label="Disabled" />
            </div>
          </div>
        </div>

        {/* Common Icons */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Common Icons</h3>
          </div>
          <div className={styles.demoGrid}>
            {iconButtonIcons.map(({ icon, label }) => (
              <div className={styles.demoGridItem} key={icon}>
                <IconButton icon={icon} variant="secondary" aria-label={label} />
                <span className={styles.demoGridLabel}>{icon}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Danger Variant Note */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Danger Variant</h3>
          </div>
          <div className={styles.interactiveArea}>
            <Stack gap="small">
              <Inline gap="medium" align="center">
                <IconButton icon="trash" variant="danger" aria-label="Delete" />
                <span
                  style={{
                    fontSize: 'var(--ink-font-size-sm)',
                    color: 'var(--ink-font-secondary)',
                  }}
                >
                  Transparent bg with red icon; red bg on hover
                </span>
              </Inline>
            </Stack>
          </div>
        </div>
      </div>
    );
  }

  if (activeSubpage === 'input') {
    return (
      <div className={styles.tokenPage}>
        {/* Sizes */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Sizes</h3>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>small</span>
            <div style={{ flex: 1, maxWidth: '300px' }}>
              <Input label="Small" size="small" placeholder="Enter text..." hideLabel />
            </div>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>medium</span>
            <div style={{ flex: 1, maxWidth: '300px' }}>
              <Input label="Medium" size="medium" placeholder="Enter text..." hideLabel />
            </div>
          </div>
        </div>

        {/* Types */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Input Types</h3>
          </div>
          {inputTypes.map((type) => (
            <div className={styles.demoRow} key={type}>
              <span className={styles.demoLabel}>{type}</span>
              <div style={{ flex: 1, maxWidth: '300px' }}>
                <SelectableComponent
                  componentId={`input-type-${type}`}
                  componentProps={{ label: type, type, placeholder: `${type}...`, hideLabel: true }}
                  isSelected={selectedComponentId === `input-type-${type}`}
                  onSelect={onComponentSelect}
                >
                  <Input label={type} type={type} placeholder={`${type}...`} hideLabel />
                </SelectableComponent>
              </div>
              <span className={styles.propsCode}>type="{type}"</span>
            </div>
          ))}
        </div>

        {/* States */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>States</h3>
          </div>
          <div className={styles.stateRow}>
            <div className={styles.stateCell}>
              <span className={styles.stateLabel}>Default</span>
              <Input label="Default" placeholder="Default..." hideLabel />
            </div>
            <div className={styles.stateCell}>
              <span className={styles.stateLabel}>Error</span>
              <Input label="Error" error="Invalid input" placeholder="Error..." hideLabel />
            </div>
            <div className={styles.stateCell}>
              <span className={styles.stateLabel}>Disabled</span>
              <Input label="Disabled" disabled value="Disabled" hideLabel />
            </div>
            <div className={styles.stateCell}>
              <span className={styles.stateLabel}>Required</span>
              <Input label="Required" required placeholder="Required..." hideLabel />
            </div>
          </div>
        </div>

        {/* With Labels */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>With Labels</h3>
          </div>
          <div className={styles.interactiveArea}>
            <Stack gap="medium">
              <Input
                label="Email Address"
                description="We'll never share your email"
                placeholder="you@example.com"
                type="email"
              />
              <Input label="Username" required placeholder="Enter username" />
            </Stack>
          </div>
        </div>
      </div>
    );
  }

  if (activeSubpage === 'checkbox') {
    return (
      <div className={styles.tokenPage}>
        {/* States */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>States</h3>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>unchecked</span>
            <div className={styles.demoPreview}>
              <SelectableComponent
                componentId="checkbox-unchecked"
                componentProps={{ label: 'Unchecked' }}
                isSelected={selectedComponentId === 'checkbox-unchecked'}
                onSelect={onComponentSelect}
              >
                <Checkbox label="Unchecked" />
              </SelectableComponent>
            </div>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>checked</span>
            <div className={styles.demoPreview}>
              <SelectableComponent
                componentId="checkbox-checked"
                componentProps={{ label: 'Checked', checked: true }}
                isSelected={selectedComponentId === 'checkbox-checked'}
                onSelect={onComponentSelect}
              >
                <Checkbox label="Checked" checked />
              </SelectableComponent>
            </div>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>indeterminate</span>
            <div className={styles.demoPreview}>
              <SelectableComponent
                componentId="checkbox-indeterminate"
                componentProps={{ label: 'Indeterminate', indeterminate: true, checked: true }}
                isSelected={selectedComponentId === 'checkbox-indeterminate'}
                onSelect={onComponentSelect}
              >
                <Checkbox label="Indeterminate" indeterminate checked />
              </SelectableComponent>
            </div>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>disabled</span>
            <div className={styles.demoPreview}>
              <Checkbox label="Disabled" disabled />
            </div>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>disabled checked</span>
            <div className={styles.demoPreview}>
              <Checkbox label="Disabled Checked" disabled checked />
            </div>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>error</span>
            <div className={styles.demoPreview}>
              <Checkbox label="With Error" error="Required" />
            </div>
          </div>
        </div>

        {/* With Description */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>With Description</h3>
          </div>
          <div className={styles.interactiveArea}>
            <Checkbox
              label="Email notifications"
              description="Receive updates about your account activity"
              checked
            />
          </div>
        </div>

        {/* Group */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Checkbox Group</h3>
          </div>
          <div className={styles.interactiveArea}>
            <Stack gap="small">
              <Checkbox label="Technology" />
              <Checkbox label="Design" />
              <Checkbox label="Business" />
              <Checkbox label="Marketing" />
            </Stack>
          </div>
        </div>
      </div>
    );
  }

  if (activeSubpage === 'radio') {
    return (
      <div className={styles.tokenPage}>
        {/* Basic Group */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Radio Group</h3>
          </div>
          <div className={styles.interactiveArea}>
            <Stack gap="small">
              <SelectableComponent
                componentId="radio-option1"
                componentProps={{
                  label: 'Option 1',
                  name: 'demo-group',
                  value: '1',
                  defaultChecked: true,
                }}
                isSelected={selectedComponentId === 'radio-option1'}
                onSelect={onComponentSelect}
              >
                <Radio label="Option 1" name="demo-group" value="1" defaultChecked />
              </SelectableComponent>
              <Radio label="Option 2" name="demo-group" value="2" />
              <Radio label="Option 3" name="demo-group" value="3" />
            </Stack>
          </div>
        </div>

        {/* With Description */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>With Description</h3>
          </div>
          <div className={styles.interactiveArea}>
            <Stack gap="small">
              <Radio
                label="Standard"
                description="5-7 business days"
                name="shipping"
                value="standard"
              />
              <Radio
                label="Express"
                description="2-3 business days"
                name="shipping"
                value="express"
              />
              <Radio
                label="Overnight"
                description="Next business day"
                name="shipping"
                value="overnight"
              />
            </Stack>
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
              <Radio label="Default" name="state1" value="1" />
            </div>
            <div className={styles.stateCell}>
              <span className={styles.stateLabel}>Checked</span>
              <Radio label="Checked" name="state2" value="1" defaultChecked />
            </div>
            <div className={styles.stateCell}>
              <span className={styles.stateLabel}>Disabled</span>
              <Radio label="Disabled" name="state3" value="1" disabled />
            </div>
            <div className={styles.stateCell}>
              <span className={styles.stateLabel}>Error</span>
              <Radio label="Error" name="state4" value="1" error="Required" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeSubpage === 'switch') {
    return (
      <div className={styles.tokenPage}>
        {/* States */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>States</h3>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>off</span>
            <div className={styles.demoPreview}>
              <SelectableComponent
                componentId="switch-off"
                componentProps={{ checked: false }}
                isSelected={selectedComponentId === 'switch-off'}
                onSelect={onComponentSelect}
              >
                <Switch checked={false} onChange={() => {}} />
              </SelectableComponent>
            </div>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>on</span>
            <div className={styles.demoPreview}>
              <SelectableComponent
                componentId="switch-on"
                componentProps={{ checked: true }}
                isSelected={selectedComponentId === 'switch-on'}
                onSelect={onComponentSelect}
              >
                <Switch checked={true} onChange={() => {}} />
              </SelectableComponent>
            </div>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>disabled off</span>
            <div className={styles.demoPreview}>
              <Switch disabled checked={false} onChange={() => {}} />
            </div>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>disabled on</span>
            <div className={styles.demoPreview}>
              <Switch disabled checked={true} onChange={() => {}} />
            </div>
          </div>
        </div>

        {/* With Label */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>With Label</h3>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>with label</span>
            <div className={styles.demoPreviewWide}>
              <Switch label="Enable notifications" defaultChecked />
            </div>
          </div>
        </div>

        {/* With Description */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>With Description</h3>
          </div>
          <div className={styles.interactiveArea}>
            <Switch
              label="Dark Mode"
              description="Switch to dark theme across the application"
              defaultChecked
            />
          </div>
        </div>
      </div>
    );
  }

  if (activeSubpage === 'textarea') {
    return (
      <div className={styles.tokenPage}>
        {/* Basic */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Basic</h3>
          </div>
          <div className={styles.interactiveArea}>
            <SelectableComponent
              componentId="textarea-basic"
              componentProps={{ label: 'Comments', placeholder: 'Enter your comments...' }}
              isSelected={selectedComponentId === 'textarea-basic'}
              onSelect={onComponentSelect}
            >
              <TextArea label="Comments" placeholder="Enter your comments..." />
            </SelectableComponent>
          </div>
        </div>

        {/* Resize Modes */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Resize Modes</h3>
          </div>
          {resizeModes.map((mode) => (
            <div className={styles.demoRow} key={mode}>
              <span className={styles.demoLabel}>{mode}</span>
              <div style={{ flex: 1, maxWidth: '300px' }}>
                <TextArea
                  label={mode}
                  resize={mode}
                  placeholder={`resize="${mode}"`}
                  hideLabel
                  rows={2}
                />
              </div>
              <span className={styles.propsCode}>resize="{mode}"</span>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Features</h3>
          </div>
          <div className={styles.interactiveArea}>
            <Stack gap="medium">
              <TextArea
                label="Character Count"
                characterCount
                maxLength={280}
                placeholder="Tweet..."
              />
              <TextArea label="Auto Expand" autoExpand placeholder="This grows as you type..." />
              <TextArea
                label="Allow Over Limit"
                characterCount
                maxLength={50}
                allowOverLimit
                placeholder="Type beyond limit..."
              />
            </Stack>
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
              <TextArea label="Default" placeholder="Default..." hideLabel rows={2} />
            </div>
            <div className={styles.stateCell}>
              <span className={styles.stateLabel}>Error</span>
              <TextArea label="Error" error="Too short" placeholder="Error..." hideLabel rows={2} />
            </div>
            <div className={styles.stateCell}>
              <span className={styles.stateLabel}>Disabled</span>
              <TextArea label="Disabled" disabled value="Cannot edit" hideLabel rows={2} />
            </div>
            <div className={styles.stateCell}>
              <span className={styles.stateLabel}>Required</span>
              <TextArea label="Required" required placeholder="Required..." hideLabel rows={2} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeSubpage === 'select') {
    return (
      <div className={styles.tokenPage}>
        {/* Sizes */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Sizes</h3>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>small</span>
            <div style={{ minWidth: '200px' }}>
              <SelectableComponent
                componentId="select-size-small"
                componentProps={{ label: 'Small', size: 'small', hideLabel: true }}
                isSelected={selectedComponentId === 'select-size-small'}
                onSelect={onComponentSelect}
              >
                <Select label="Small" size="small" hideLabel>
                  <option value="1">Option 1</option>
                  <option value="2">Option 2</option>
                </Select>
              </SelectableComponent>
            </div>
            <span className={styles.propsCode}>size="small"</span>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>medium</span>
            <div style={{ minWidth: '200px' }}>
              <SelectableComponent
                componentId="select-size-medium"
                componentProps={{ label: 'Medium', size: 'medium', hideLabel: true }}
                isSelected={selectedComponentId === 'select-size-medium'}
                onSelect={onComponentSelect}
              >
                <Select label="Medium" size="medium" hideLabel>
                  <option value="1">Option 1</option>
                  <option value="2">Option 2</option>
                </Select>
              </SelectableComponent>
            </div>
            <span className={styles.propsCode}>size="medium"</span>
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
              <Select label="Default" hideLabel>
                <option value="">Select...</option>
                <option value="1">Option 1</option>
              </Select>
            </div>
            <div className={styles.stateCell}>
              <span className={styles.stateLabel}>Error</span>
              <Select label="Error" error="Required" hideLabel>
                <option value="">Select...</option>
              </Select>
            </div>
            <div className={styles.stateCell}>
              <span className={styles.stateLabel}>Disabled</span>
              <Select label="Disabled" disabled hideLabel>
                <option value="1">Disabled</option>
              </Select>
            </div>
            <div className={styles.stateCell}>
              <span className={styles.stateLabel}>Required</span>
              <Select label="Required" required hideLabel>
                <option value="">Select...</option>
              </Select>
            </div>
          </div>
        </div>

        {/* With Labels */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>With Labels</h3>
          </div>
          <div className={styles.interactiveArea}>
            <Stack gap="medium">
              <Select label="Country" description="Select your country of residence">
                <option value="">Select a country...</option>
                <option value="us">United States</option>
                <option value="ca">Canada</option>
                <option value="uk">United Kingdom</option>
              </Select>
              <Select label="Category" required>
                <option value="">Choose an option...</option>
                <option value="1">First Option</option>
                <option value="2">Second Option</option>
              </Select>
            </Stack>
          </div>
        </div>

        {/* Option Groups */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Option Groups</h3>
          </div>
          <div className={styles.interactiveArea}>
            <Select label="Grouped Options">
              <optgroup label="Fruits">
                <option value="apple">Apple</option>
                <option value="banana">Banana</option>
              </optgroup>
              <optgroup label="Vegetables">
                <option value="carrot">Carrot</option>
                <option value="broccoli">Broccoli</option>
              </optgroup>
            </Select>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
