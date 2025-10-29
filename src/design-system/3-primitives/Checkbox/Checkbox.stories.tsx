import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';
import { useState } from 'react';

const meta = {
  title: 'Ink Design System/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Official DocuSign Ink Checkbox component - supports checked, unchecked, and indeterminate states.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label for the checkbox',
    },
    error: {
      control: 'text',
      description: 'Error message to display',
    },
    description: {
      control: 'text',
      description: 'Helper text below the checkbox',
    },
    hideLabel: {
      control: 'boolean',
      description: 'Visually hides the label (still accessible)',
    },
    indeterminate: {
      control: 'boolean',
      description: 'Shows indeterminate state',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the checkbox',
    },
    checked: {
      control: 'boolean',
      description: 'Checked state',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default State
export const Default: Story = {
  args: {
    label: 'Accept terms and conditions',
  },
};

// Checked State
export const Checked: Story = {
  args: {
    label: 'I agree to the terms',
    checked: true,
  },
};

// Unchecked State
export const Unchecked: Story = {
  args: {
    label: 'Subscribe to newsletter',
    checked: false,
  },
};

// Indeterminate State
export const Indeterminate: Story = {
  args: {
    label: 'Select all items',
    indeterminate: true,
  },
};

// With Description
export const WithDescription: Story = {
  args: {
    label: 'Send me email notifications',
    description: 'You will receive updates about your account activity',
  },
};

// With Error
export const WithError: Story = {
  args: {
    label: 'I have read the privacy policy',
    error: 'You must accept the privacy policy to continue',
  },
};

// Disabled Unchecked
export const DisabledUnchecked: Story = {
  args: {
    label: 'Disabled option',
    disabled: true,
    checked: false,
  },
};

// Disabled Checked
export const DisabledChecked: Story = {
  args: {
    label: 'Cannot change this',
    disabled: true,
    checked: true,
  },
};

// Hidden Label
export const HiddenLabel: Story = {
  args: {
    label: 'Hidden label checkbox',
    hideLabel: true,
  },
};

// All States
export const AllStates: Story = {
  name: 'All States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '400px' }}>
      <Checkbox label="Unchecked" checked={false} />
      <Checkbox label="Checked" checked={true} />
      <Checkbox label="Indeterminate" indeterminate={true} />
      <Checkbox label="Disabled unchecked" disabled checked={false} />
      <Checkbox label="Disabled checked" disabled checked={true} />
      <Checkbox label="With description" description="This is a helpful description" />
      <Checkbox label="With error" error="This field is required" />
    </div>
  ),
};

// Interactive Example
export const Interactive: Story = {
  name: 'Interactive',
  render: () => {
    const [checked, setChecked] = useState(false);

    return (
      <div style={{ width: '400px' }}>
        <Checkbox
          label="Toggle me"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          description={checked ? 'Currently checked' : 'Currently unchecked'}
        />
      </div>
    );
  },
};

// Select All Pattern
export const SelectAllPattern: Story = {
  name: 'Select All Pattern',
  render: () => {
    const [items, setItems] = useState([
      { id: 1, label: 'Item 1', checked: false },
      { id: 2, label: 'Item 2', checked: false },
      { id: 3, label: 'Item 3', checked: false },
    ]);

    const allChecked = items.every(item => item.checked);
    const someChecked = items.some(item => item.checked) && !allChecked;

    const handleSelectAll = () => {
      setItems(items.map(item => ({ ...item, checked: !allChecked })));
    };

    const handleItemChange = (id: number) => {
      setItems(items.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
      ));
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '400px' }}>
        <Checkbox
          label="Select all"
          checked={allChecked}
          indeterminate={someChecked}
          onChange={handleSelectAll}
        />
        <div style={{ paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {items.map(item => (
            <Checkbox
              key={item.id}
              label={item.label}
              checked={item.checked}
              onChange={() => handleItemChange(item.id)}
            />
          ))}
        </div>
      </div>
    );
  },
};

// Form Example
export const FormExample: Story = {
  name: 'Form Example',
  render: () => {
    const [formData, setFormData] = useState({
      newsletter: false,
      updates: false,
      terms: false,
    });

    const handleChange = (field: keyof typeof formData) => {
      setFormData(prev => ({ ...prev, [field]: !prev[field] }));
    };

    return (
      <form style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
        <Checkbox
          label="Subscribe to newsletter"
          checked={formData.newsletter}
          onChange={() => handleChange('newsletter')}
          description="Receive weekly updates about new features"
        />
        <Checkbox
          label="Product updates"
          checked={formData.updates}
          onChange={() => handleChange('updates')}
          description="Get notified about product changes"
        />
        <Checkbox
          label="I accept the terms and conditions"
          checked={formData.terms}
          onChange={() => handleChange('terms')}
          error={!formData.terms ? 'You must accept the terms' : undefined}
        />
      </form>
    );
  },
};

// Checkbox List
export const CheckboxList: Story = {
  name: 'Checkbox List',
  render: () => {
    const [preferences, setPreferences] = useState({
      email: true,
      sms: false,
      push: true,
      phone: false,
    });

    const handleChange = (key: keyof typeof preferences) => {
      setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
      <div style={{ width: '400px' }}>
        <div style={{ marginBottom: '12px', fontWeight: 600 }}>Notification Preferences</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Checkbox
            label="Email notifications"
            checked={preferences.email}
            onChange={() => handleChange('email')}
            description="Receive notifications via email"
          />
          <Checkbox
            label="SMS notifications"
            checked={preferences.sms}
            onChange={() => handleChange('sms')}
            description="Receive text messages"
          />
          <Checkbox
            label="Push notifications"
            checked={preferences.push}
            onChange={() => handleChange('push')}
            description="Browser push notifications"
          />
          <Checkbox
            label="Phone calls"
            checked={preferences.phone}
            onChange={() => handleChange('phone')}
            description="Receive important calls"
          />
        </div>
      </div>
    );
  },
};

// Agreement Checkboxes
export const Agreements: Story = {
  name: 'Agreements',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
      <Checkbox
        label="I agree to the Terms of Service"
        description="Please read our terms before continuing"
      />
      <Checkbox
        label="I agree to the Privacy Policy"
        description="We value your privacy and data security"
      />
      <Checkbox
        label="I am at least 18 years old"
      />
      <Checkbox
        label="Send me promotional emails (optional)"
        description="You can unsubscribe at any time"
      />
    </div>
  ),
};

// Playground
export const Playground: Story = {
  args: {
    label: 'Checkbox label',
    description: 'Helper text',
  },
};
