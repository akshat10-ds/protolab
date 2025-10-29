import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';
import { useState } from 'react';

const meta = {
  title: 'Ink Design System/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Official DocuSign Ink Input component - supports text, password, and textarea inputs.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label for the input field',
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
      description: 'Input type',
    },
    size: {
      control: 'select',
      options: ['small', 'medium'],
      description: 'Input size',
    },
    error: {
      control: 'text',
      description: 'Error message to display',
    },
    description: {
      control: 'text',
      description: 'Helper text below the input',
    },
    required: {
      control: 'boolean',
      description: 'Marks field as required',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the input',
    },
    hideLabel: {
      control: 'boolean',
      description: 'Visually hides the label (still accessible)',
    },
    multiline: {
      control: 'boolean',
      description: 'Renders as textarea',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default State
export const Default: Story = {
  args: {
    label: 'Email address',
    type: 'email',
    placeholder: 'Enter your email',
  },
};

// With Description
export const WithDescription: Story = {
  args: {
    label: 'Username',
    description: 'Choose a unique username for your account',
    placeholder: 'Enter username',
  },
};

// Required Field
export const Required: Story = {
  args: {
    label: 'Full name',
    required: true,
    placeholder: 'John Doe',
  },
};

// With Error
export const WithError: Story = {
  args: {
    label: 'Email address',
    type: 'email',
    error: 'Please enter a valid email address',
    value: 'invalid-email',
  },
};

// Password Input
export const Password: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    description: 'Must be at least 8 characters',
  },
};

// Disabled State
export const Disabled: Story = {
  args: {
    label: 'Disabled input',
    value: 'Cannot edit this',
    disabled: true,
  },
};

// Hidden Label
export const HiddenLabel: Story = {
  args: {
    label: 'Search',
    hideLabel: true,
    placeholder: 'Search...',
  },
};

// Small Size
export const SmallSize: Story = {
  args: {
    label: 'Small input',
    size: 'small',
    placeholder: 'Small input field',
  },
};

// Multiline (Textarea)
export const Multiline: Story = {
  args: {
    label: 'Description',
    multiline: true,
    rows: 4,
    placeholder: 'Enter a detailed description...',
    description: 'Provide as much detail as possible',
  },
};

// Multiline with Error
export const MultilineWithError: Story = {
  args: {
    label: 'Comments',
    multiline: true,
    rows: 3,
    error: 'Comments must be at least 10 characters',
    value: 'Too short',
  },
};

// All Variants
export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '400px' }}>
      <Input label="Default input" placeholder="Placeholder text" />
      <Input label="Required field" required placeholder="Enter value" />
      <Input label="With description" description="This is helper text" placeholder="Enter value" />
      <Input label="With error" error="This field is required" />
      <Input label="Disabled input" disabled value="Cannot edit" />
      <Input label="Small size" size="small" placeholder="Small input" />
    </div>
  ),
};

// Different Input Types
export const InputTypes: Story = {
  name: 'Input Types',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '400px' }}>
      <Input label="Text" type="text" placeholder="Enter text" />
      <Input label="Email" type="email" placeholder="email@example.com" />
      <Input label="Password" type="password" placeholder="Enter password" />
      <Input label="Number" type="number" placeholder="Enter number" />
      <Input label="Telephone" type="tel" placeholder="(123) 456-7890" />
      <Input label="URL" type="url" placeholder="https://example.com" />
    </div>
  ),
};

// Form Example
export const FormExample: Story = {
  name: 'Form Example',
  render: () => {
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      message: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData(prev => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    };

    return (
      <form style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '400px' }}>
        <Input
          label="First name"
          name="firstName"
          required
          value={formData.firstName}
          onChange={handleChange}
          placeholder="Enter first name"
        />
        <Input
          label="Last name"
          name="lastName"
          required
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Enter last name"
        />
        <Input
          label="Email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          placeholder="email@example.com"
          description="We'll never share your email"
        />
        <Input
          label="Message"
          name="message"
          multiline
          rows={4}
          value={formData.message}
          onChange={handleChange}
          placeholder="Enter your message..."
        />
      </form>
    );
  },
};

// Validation States
export const ValidationStates: Story = {
  name: 'Validation States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '400px' }}>
      <Input
        label="Empty required field"
        required
        error="This field is required"
      />
      <Input
        label="Invalid email"
        type="email"
        value="not-an-email"
        error="Please enter a valid email address"
      />
      <Input
        label="Password too short"
        type="password"
        value="123"
        error="Password must be at least 8 characters"
      />
      <Input
        label="Valid input"
        value="Valid value"
      />
    </div>
  ),
};

// Playground
export const Playground: Story = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    description: 'Helper text',
    size: 'medium',
  },
};
