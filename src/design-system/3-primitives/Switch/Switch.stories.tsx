import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from './Switch';
import { useState } from 'react';

const meta: Meta<typeof Switch> = {
  title: 'Forms/Switch',
  component: Switch,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: {},
};

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
};

export const Small: Story = {
  args: {
    size: 'small',
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Enable notifications',
  },
};

export const WithLabelChecked: Story = {
  args: {
    label: 'Enable notifications',
    defaultChecked: true,
  },
};

export const WithDescription: Story = {
  args: {
    label: 'Marketing emails',
    description: 'Receive emails about new products and features',
  },
};

export const LabelOnLeft: Story = {
  args: {
    label: 'Dark mode',
    labelPosition: 'left',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Disabled switch',
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    defaultChecked: true,
    label: 'Disabled checked',
  },
};

export const Interactive: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <div>
        <Switch
          checked={checked}
          onChange={setChecked}
          label="Toggle me"
          description={`Currently: ${checked ? 'On' : 'Off'}`}
        />
        <div style={{ marginTop: '16px', fontSize: '14px' }}>
          State: {checked ? 'Checked' : 'Unchecked'}
        </div>
      </div>
    );
  },
};

export const SettingsPanel: Story = {
  render: () => {
    const [settings, setSettings] = useState({
      notifications: true,
      darkMode: false,
      autoSave: true,
      analytics: false,
    });

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h3 style={{ fontSize: '18px', margin: 0 }}>Settings</h3>
        <Switch
          checked={settings.notifications}
          onChange={(checked) => setSettings({ ...settings, notifications: checked })}
          label="Push notifications"
          description="Receive push notifications on this device"
        />
        <Switch
          checked={settings.darkMode}
          onChange={(checked) => setSettings({ ...settings, darkMode: checked })}
          label="Dark mode"
          description="Use dark theme across the application"
        />
        <Switch
          checked={settings.autoSave}
          onChange={(checked) => setSettings({ ...settings, autoSave: checked })}
          label="Auto-save"
          description="Automatically save changes as you work"
        />
        <Switch
          checked={settings.analytics}
          onChange={(checked) => setSettings({ ...settings, analytics: checked })}
          label="Analytics"
          description="Help us improve by sharing usage data"
        />
      </div>
    );
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <Switch size="small" label="Small switch" defaultChecked />
      <Switch size="medium" label="Medium switch" defaultChecked />
      <Switch size="large" label="Large switch" defaultChecked />
    </div>
  ),
};

export const WithCallback: Story = {
  args: {
    label: 'Click me',
    onChange: (checked) => {
      alert(`Switch is now: ${checked ? 'ON' : 'OFF'}`);
    },
  },
};
