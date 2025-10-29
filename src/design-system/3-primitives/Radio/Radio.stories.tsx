import type { Meta, StoryObj } from '@storybook/react';
import { Radio } from './Radio';
import { useState } from 'react';

const meta = {
  title: 'Ink Design System/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Official DocuSign Ink Radio component - for mutually exclusive options in a group.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label for the radio button',
    },
    error: {
      control: 'text',
      description: 'Error message to display',
    },
    description: {
      control: 'text',
      description: 'Helper text below the radio',
    },
    hideLabel: {
      control: 'boolean',
      description: 'Visually hides the label (still accessible)',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the radio button',
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
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default State
export const Default: Story = {
  args: {
    label: 'Option 1',
    name: 'default',
    value: 'option1',
  },
};

// Checked State
export const Checked: Story = {
  args: {
    label: 'Selected option',
    name: 'checked',
    value: 'selected',
    checked: true,
  },
};

// Unchecked State
export const Unchecked: Story = {
  args: {
    label: 'Unselected option',
    name: 'unchecked',
    value: 'unselected',
    checked: false,
  },
};

// With Description
export const WithDescription: Story = {
  args: {
    label: 'Premium plan',
    description: 'Best for teams and organizations',
    name: 'plan',
    value: 'premium',
  },
};

// With Error
export const WithError: Story = {
  args: {
    label: 'Option with error',
    error: 'This option is currently unavailable',
    name: 'error',
    value: 'error',
  },
};

// Disabled Unchecked
export const DisabledUnchecked: Story = {
  args: {
    label: 'Disabled option',
    disabled: true,
    checked: false,
    name: 'disabled',
    value: 'disabled',
  },
};

// Disabled Checked
export const DisabledChecked: Story = {
  args: {
    label: 'Cannot change this',
    disabled: true,
    checked: true,
    name: 'disabled-checked',
    value: 'disabled-checked',
  },
};

// Hidden Label
export const HiddenLabel: Story = {
  args: {
    label: 'Hidden label radio',
    hideLabel: true,
    name: 'hidden',
    value: 'hidden',
  },
};

// Simple Radio Group
export const SimpleRadioGroup: Story = {
  name: 'Simple Radio Group',
  render: () => {
    const [selected, setSelected] = useState('option1');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '400px' }}>
        <Radio
          label="Option 1"
          name="simple"
          value="option1"
          checked={selected === 'option1'}
          onChange={(e) => setSelected(e.target.value)}
        />
        <Radio
          label="Option 2"
          name="simple"
          value="option2"
          checked={selected === 'option2'}
          onChange={(e) => setSelected(e.target.value)}
        />
        <Radio
          label="Option 3"
          name="simple"
          value="option3"
          checked={selected === 'option3'}
          onChange={(e) => setSelected(e.target.value)}
        />
      </div>
    );
  },
};

// Radio Group with Descriptions
export const RadioGroupWithDescriptions: Story = {
  name: 'Radio Group with Descriptions',
  render: () => {
    const [plan, setPlan] = useState('basic');

    return (
      <div style={{ width: '400px' }}>
        <div style={{ marginBottom: '16px', fontWeight: 600 }}>Choose a plan</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Radio
            label="Basic"
            description="Perfect for individuals and small teams"
            name="plan"
            value="basic"
            checked={plan === 'basic'}
            onChange={(e) => setPlan(e.target.value)}
          />
          <Radio
            label="Professional"
            description="Great for growing businesses"
            name="plan"
            value="professional"
            checked={plan === 'professional'}
            onChange={(e) => setPlan(e.target.value)}
          />
          <Radio
            label="Enterprise"
            description="For large organizations with advanced needs"
            name="plan"
            value="enterprise"
            checked={plan === 'enterprise'}
            onChange={(e) => setPlan(e.target.value)}
          />
        </div>
      </div>
    );
  },
};

// Radio Group with Disabled Options
export const RadioGroupWithDisabled: Story = {
  name: 'Radio Group with Disabled',
  render: () => {
    const [shipping, setShipping] = useState('standard');

    return (
      <div style={{ width: '400px' }}>
        <div style={{ marginBottom: '16px', fontWeight: 600 }}>Shipping method</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Radio
            label="Standard (5-7 business days)"
            name="shipping"
            value="standard"
            checked={shipping === 'standard'}
            onChange={(e) => setShipping(e.target.value)}
            description="Free shipping"
          />
          <Radio
            label="Express (2-3 business days)"
            name="shipping"
            value="express"
            checked={shipping === 'express'}
            onChange={(e) => setShipping(e.target.value)}
            description="$15.00"
          />
          <Radio
            label="Overnight"
            name="shipping"
            value="overnight"
            disabled
            description="Currently unavailable"
          />
        </div>
      </div>
    );
  },
};

// Payment Method Selection
export const PaymentMethods: Story = {
  name: 'Payment Methods',
  render: () => {
    const [payment, setPayment] = useState('card');

    return (
      <div style={{ width: '400px' }}>
        <div style={{ marginBottom: '16px', fontWeight: 600 }}>Payment method</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Radio
            label="Credit or debit card"
            description="Visa, Mastercard, American Express"
            name="payment"
            value="card"
            checked={payment === 'card'}
            onChange={(e) => setPayment(e.target.value)}
          />
          <Radio
            label="PayPal"
            description="You will be redirected to PayPal"
            name="payment"
            value="paypal"
            checked={payment === 'paypal'}
            onChange={(e) => setPayment(e.target.value)}
          />
          <Radio
            label="Bank transfer"
            description="Direct bank transfer (ACH)"
            name="payment"
            value="bank"
            checked={payment === 'bank'}
            onChange={(e) => setPayment(e.target.value)}
          />
        </div>
      </div>
    );
  },
};

// Notification Preferences
export const NotificationPreferences: Story = {
  name: 'Notification Preferences',
  render: () => {
    const [frequency, setFrequency] = useState('daily');

    return (
      <div style={{ width: '400px' }}>
        <div style={{ marginBottom: '16px', fontWeight: 600 }}>Email frequency</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Radio
            label="Real-time"
            description="Get notified immediately"
            name="frequency"
            value="realtime"
            checked={frequency === 'realtime'}
            onChange={(e) => setFrequency(e.target.value)}
          />
          <Radio
            label="Daily digest"
            description="Once per day summary"
            name="frequency"
            value="daily"
            checked={frequency === 'daily'}
            onChange={(e) => setFrequency(e.target.value)}
          />
          <Radio
            label="Weekly digest"
            description="Once per week summary"
            name="frequency"
            value="weekly"
            checked={frequency === 'weekly'}
            onChange={(e) => setFrequency(e.target.value)}
          />
          <Radio
            label="Never"
            description="Disable all email notifications"
            name="frequency"
            value="never"
            checked={frequency === 'never'}
            onChange={(e) => setFrequency(e.target.value)}
          />
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
      accountType: 'personal',
      subscription: 'monthly',
    });

    return (
      <form style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '400px' }}>
        <div>
          <div style={{ marginBottom: '12px', fontWeight: 600 }}>Account Type</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Radio
              label="Personal"
              name="accountType"
              value="personal"
              checked={formData.accountType === 'personal'}
              onChange={(e) => setFormData(prev => ({ ...prev, accountType: e.target.value }))}
              description="For individual use"
            />
            <Radio
              label="Business"
              name="accountType"
              value="business"
              checked={formData.accountType === 'business'}
              onChange={(e) => setFormData(prev => ({ ...prev, accountType: e.target.value }))}
              description="For teams and organizations"
            />
          </div>
        </div>

        <div>
          <div style={{ marginBottom: '12px', fontWeight: 600 }}>Billing Period</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Radio
              label="Monthly ($19/month)"
              name="subscription"
              value="monthly"
              checked={formData.subscription === 'monthly'}
              onChange={(e) => setFormData(prev => ({ ...prev, subscription: e.target.value }))}
            />
            <Radio
              label="Yearly ($190/year)"
              name="subscription"
              value="yearly"
              checked={formData.subscription === 'yearly'}
              onChange={(e) => setFormData(prev => ({ ...prev, subscription: e.target.value }))}
              description="Save 17%"
            />
          </div>
        </div>
      </form>
    );
  },
};

// All States
export const AllStates: Story = {
  name: 'All States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
      <Radio label="Unchecked" name="states" value="unchecked" checked={false} />
      <Radio label="Checked" name="states" value="checked" checked={true} />
      <Radio label="With description" description="Helper text" name="states" value="description" />
      <Radio label="With error" error="Error message" name="states" value="error" />
      <Radio label="Disabled unchecked" disabled name="states" value="disabled1" />
      <Radio label="Disabled checked" disabled checked name="states" value="disabled2" />
    </div>
  ),
};

// Playground
export const Playground: Story = {
  args: {
    label: 'Radio label',
    description: 'Helper text',
    name: 'playground',
    value: 'value',
  },
};
