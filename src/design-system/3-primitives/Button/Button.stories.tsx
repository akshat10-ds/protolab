import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { ArrowRight, Download, Plus, Trash2, ChevronDown, User, Settings, Heart } from 'lucide-react';

const meta = {
  title: 'Ink Design System/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Official DocuSign Ink Button component - simplified for prototyping.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    kind: {
      control: 'select',
      options: ['brand', 'primary', 'secondary', 'tertiary', 'danger'],
      description: 'Button variant/kind',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large', 'xlarge'],
      description: 'Button size',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Makes button full width',
    },
    loading: {
      control: 'boolean',
      description: 'Shows loading state',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button',
    },
    rounded: {
      control: 'boolean',
      description: 'Makes button pill-shaped',
    },
    inverted: {
      control: 'boolean',
      description: 'Inverts colors for dark backgrounds',
    },
    menuTrigger: {
      control: 'boolean',
      description: 'Shows menu trigger arrow',
    },
    active: {
      control: 'boolean',
      description: 'Shows active state',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Variants
export const Brand: Story = {
  args: {
    children: 'Brand Button',
    kind: 'brand',
  },
};

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    kind: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    kind: 'secondary',
  },
};

export const Tertiary: Story = {
  args: {
    children: 'Tertiary Button',
    kind: 'tertiary',
  },
};

export const Danger: Story = {
  args: {
    children: 'Danger Button',
    kind: 'danger',
  },
};

// Sizes
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <Button size="small">Small</Button>
      <Button size="medium">Medium</Button>
      <Button size="large">Large</Button>
      <Button size="xlarge">Extra Large</Button>
    </div>
  ),
};

// With Icons
export const WithStartIcon: Story = {
  args: {
    children: 'Download',
    startElement: <Download />,
  },
};

export const WithEndIcon: Story = {
  args: {
    children: 'Next',
    endElement: <ArrowRight />,
  },
};

export const IconOnly: Story = {
  args: {
    children: <Heart />,
    'aria-label': 'Like',
  },
};

// States
export const Loading: Story = {
  args: {
    children: 'Loading...',
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled',
    disabled: true,
  },
};

export const Active: Story = {
  args: {
    children: 'Active',
    active: true,
  },
};

// Special Types
export const MenuTrigger: Story = {
  args: {
    children: 'Options',
    menuTrigger: true,
  },
};

export const Rounded: Story = {
  args: {
    children: 'Rounded Button',
    rounded: true,
  },
};

export const FullWidth: Story = {
  args: {
    children: 'Full Width Button',
    fullWidth: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

// As Link
export const AsLink: Story = {
  args: {
    children: 'Link Button',
    href: 'https://www.docusign.com',
    target: '_blank',
    endElement: <ArrowRight />,
  },
};

// Inverted (for dark backgrounds)
export const Inverted: Story = {
  render: () => (
    <div style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '40px',
      borderRadius: '8px',
      display: 'flex',
      gap: '16px',
    }}>
      <Button inverted kind="primary">Primary Inverted</Button>
      <Button inverted kind="secondary">Secondary Inverted</Button>
      <Button inverted kind="tertiary">Tertiary Inverted</Button>
    </div>
  ),
};

// All Variants Display
export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
      <Button kind="brand">Brand</Button>
      <Button kind="primary">Primary</Button>
      <Button kind="secondary">Secondary</Button>
      <Button kind="tertiary">Tertiary</Button>
      <Button kind="danger">Danger</Button>
      <Button disabled>Disabled</Button>
    </div>
  ),
};

// Common Patterns
export const ButtonGroup: Story = {
  name: 'Button Group',
  render: () => (
    <div style={{ display: 'flex', gap: '8px' }}>
      <Button kind="tertiary">Cancel</Button>
      <Button kind="primary">Save</Button>
    </div>
  ),
};

export const ActionButtons: Story = {
  name: 'Action Buttons',
  render: () => (
    <div style={{ display: 'flex', gap: '8px' }}>
      <Button kind="primary" startElement={<Plus />}>
        Create New
      </Button>
      <Button kind="secondary" startElement={<Download />}>
        Export
      </Button>
      <Button kind="danger" startElement={<Trash2 />}>
        Delete
      </Button>
    </div>
  ),
};

export const NavigationButtons: Story = {
  name: 'Navigation Buttons',
  render: () => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <Button kind="tertiary">← Back</Button>
      <div style={{ flex: 1 }} />
      <Button kind="secondary">Skip</Button>
      <Button kind="primary" endElement={<ArrowRight />}>
        Continue
      </Button>
    </div>
  ),
};

// Playground
export const Playground: Story = {
  args: {
    children: 'Ink Button',
    kind: 'primary',
    size: 'medium',
  },
};