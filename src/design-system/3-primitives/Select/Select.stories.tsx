import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';
import { useState } from 'react';

const meta = {
  title: 'Ink Design System/Select',
  component: Select,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Official DocuSign Ink Select component - dropdown selection with accessible design.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label for the select field',
    },
    size: {
      control: 'select',
      options: ['small', 'medium'],
      description: 'Select size',
    },
    error: {
      control: 'text',
      description: 'Error message to display',
    },
    description: {
      control: 'text',
      description: 'Helper text below the select',
    },
    required: {
      control: 'boolean',
      description: 'Marks field as required',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the select',
    },
    hideLabel: {
      control: 'boolean',
      description: 'Visually hides the label (still accessible)',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default State
export const Default: Story = {
  args: {
    label: 'Country',
    children: (
      <>
        <option value="">Select a country</option>
        <option value="us">United States</option>
        <option value="ca">Canada</option>
        <option value="uk">United Kingdom</option>
        <option value="au">Australia</option>
      </>
    ),
  },
};

// With Description
export const WithDescription: Story = {
  args: {
    label: 'Department',
    description: 'Choose your department from the list',
    children: (
      <>
        <option value="">Select department</option>
        <option value="engineering">Engineering</option>
        <option value="sales">Sales</option>
        <option value="marketing">Marketing</option>
        <option value="support">Customer Support</option>
      </>
    ),
  },
};

// Required Field
export const Required: Story = {
  args: {
    label: 'Job Title',
    required: true,
    children: (
      <>
        <option value="">Select title</option>
        <option value="developer">Developer</option>
        <option value="designer">Designer</option>
        <option value="manager">Manager</option>
      </>
    ),
  },
};

// With Error
export const WithError: Story = {
  args: {
    label: 'Priority',
    error: 'Please select a priority level',
    children: (
      <>
        <option value="">Select priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
        <option value="critical">Critical</option>
      </>
    ),
  },
};

// Disabled State
export const Disabled: Story = {
  args: {
    label: 'Disabled select',
    disabled: true,
    value: 'us',
    children: (
      <>
        <option value="us">United States</option>
        <option value="ca">Canada</option>
      </>
    ),
  },
};

// Hidden Label
export const HiddenLabel: Story = {
  args: {
    label: 'Filter by status',
    hideLabel: true,
    children: (
      <>
        <option value="">All statuses</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
        <option value="pending">Pending</option>
      </>
    ),
  },
};

// Small Size
export const SmallSize: Story = {
  args: {
    label: 'Small select',
    size: 'small',
    children: (
      <>
        <option value="">Select option</option>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </>
    ),
  },
};

// With Option Groups
export const WithOptGroups: Story = {
  args: {
    label: 'Location',
    children: (
      <>
        <option value="">Select location</option>
        <optgroup label="North America">
          <option value="us">United States</option>
          <option value="ca">Canada</option>
          <option value="mx">Mexico</option>
        </optgroup>
        <optgroup label="Europe">
          <option value="uk">United Kingdom</option>
          <option value="de">Germany</option>
          <option value="fr">France</option>
        </optgroup>
        <optgroup label="Asia">
          <option value="jp">Japan</option>
          <option value="cn">China</option>
          <option value="in">India</option>
        </optgroup>
      </>
    ),
  },
};

// All Variants
export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '400px' }}>
      <Select label="Default select">
        <option value="">Select option</option>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
      </Select>

      <Select label="Required field" required>
        <option value="">Select option</option>
        <option value="1">Option 1</option>
      </Select>

      <Select label="With description" description="Choose the best option">
        <option value="">Select option</option>
        <option value="1">Option 1</option>
      </Select>

      <Select label="With error" error="This field is required">
        <option value="">Select option</option>
        <option value="1">Option 1</option>
      </Select>

      <Select label="Disabled select" disabled value="1">
        <option value="1">Cannot change</option>
      </Select>

      <Select label="Small size" size="small">
        <option value="">Select option</option>
        <option value="1">Option 1</option>
      </Select>
    </div>
  ),
};

// Form Example
export const FormExample: Story = {
  name: 'Form Example',
  render: () => {
    const [formData, setFormData] = useState({
      country: '',
      state: '',
      city: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setFormData(prev => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    };

    return (
      <form style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '400px' }}>
        <Select
          label="Country"
          name="country"
          required
          value={formData.country}
          onChange={handleChange}
          description="Select your country"
        >
          <option value="">Select country</option>
          <option value="us">United States</option>
          <option value="ca">Canada</option>
          <option value="uk">United Kingdom</option>
        </Select>

        <Select
          label="State/Province"
          name="state"
          required
          value={formData.state}
          onChange={handleChange}
          disabled={!formData.country}
        >
          <option value="">Select state</option>
          <option value="ca">California</option>
          <option value="ny">New York</option>
          <option value="tx">Texas</option>
        </Select>

        <Select
          label="City"
          name="city"
          value={formData.city}
          onChange={handleChange}
          disabled={!formData.state}
        >
          <option value="">Select city</option>
          <option value="sf">San Francisco</option>
          <option value="la">Los Angeles</option>
          <option value="sd">San Diego</option>
        </Select>
      </form>
    );
  },
};

// Different Use Cases
export const UseCases: Story = {
  name: 'Use Cases',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '400px' }}>
      <Select label="Sort by">
        <option value="name">Name</option>
        <option value="date">Date</option>
        <option value="size">Size</option>
        <option value="type">Type</option>
      </Select>

      <Select label="Items per page" size="small">
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </Select>

      <Select label="Time zone">
        <option value="">Select timezone</option>
        <option value="pst">Pacific Time (PT)</option>
        <option value="mst">Mountain Time (MT)</option>
        <option value="cst">Central Time (CT)</option>
        <option value="est">Eastern Time (ET)</option>
      </Select>

      <Select label="Language preference">
        <option value="en">English</option>
        <option value="es">Español</option>
        <option value="fr">Français</option>
        <option value="de">Deutsch</option>
      </Select>
    </div>
  ),
};

// Playground
export const Playground: Story = {
  args: {
    label: 'Select Label',
    description: 'Helper text',
    size: 'medium',
    children: (
      <>
        <option value="">Select option</option>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </>
    ),
  },
};
