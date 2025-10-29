import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta = {
  title: 'Ink Design System/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Official DocuSign Ink Badge component - small status indicators and labels.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['neutral', 'info', 'success', 'warning', 'error'],
      description: 'Badge color variant',
    },
    size: {
      control: 'select',
      options: ['small', 'medium'],
      description: 'Badge size',
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

// Neutral Variant
export const Neutral: Story = {
  args: {
    children: 'Neutral',
    variant: 'neutral',
  },
};

// Info Variant
export const Info: Story = {
  args: {
    children: 'Info',
    variant: 'info',
  },
};

// Success Variant
export const Success: Story = {
  args: {
    children: 'Success',
    variant: 'success',
  },
};

// Warning Variant
export const Warning: Story = {
  args: {
    children: 'Warning',
    variant: 'warning',
  },
};

// Error Variant
export const Error: Story = {
  args: {
    children: 'Error',
    variant: 'error',
  },
};

// Small Size
export const Small: Story = {
  args: {
    children: 'Small',
    size: 'small',
  },
};

// Medium Size (Default)
export const Medium: Story = {
  args: {
    children: 'Medium',
    size: 'medium',
  },
};

// All Variants
export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
      <Badge variant="neutral">Neutral</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
    </div>
  ),
};

// All Sizes
export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
      <Badge size="small">Small</Badge>
      <Badge size="medium">Medium</Badge>
    </div>
  ),
};

// Status Badges
export const StatusBadges: Story = {
  name: 'Status Badges',
  render: () => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
      <Badge variant="success">Active</Badge>
      <Badge variant="warning">Pending</Badge>
      <Badge variant="error">Inactive</Badge>
      <Badge variant="info">Draft</Badge>
      <Badge variant="neutral">Archived</Badge>
    </div>
  ),
};

// Document Status
export const DocumentStatus: Story = {
  name: 'Document Status',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span>Annual Report.pdf</span>
        <Badge variant="success">Signed</Badge>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span>Contract Draft.docx</span>
        <Badge variant="warning">Pending Review</Badge>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span>NDA Agreement.pdf</span>
        <Badge variant="info">Sent</Badge>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span>Old Contract.pdf</span>
        <Badge variant="neutral">Expired</Badge>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span>Invalid Doc.pdf</span>
        <Badge variant="error">Rejected</Badge>
      </div>
    </div>
  ),
};

// Priority Levels
export const PriorityLevels: Story = {
  name: 'Priority Levels',
  render: () => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
      <Badge variant="error">Critical</Badge>
      <Badge variant="warning">High</Badge>
      <Badge variant="info">Medium</Badge>
      <Badge variant="neutral">Low</Badge>
    </div>
  ),
};

// User Roles
export const UserRoles: Story = {
  name: 'User Roles',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span>John Doe</span>
        <Badge variant="error">Admin</Badge>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span>Jane Smith</span>
        <Badge variant="info">Editor</Badge>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span>Bob Johnson</span>
        <Badge variant="neutral">Viewer</Badge>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span>Alice Williams</span>
        <Badge variant="success">Contributor</Badge>
      </div>
    </div>
  ),
};

// Categories/Tags
export const Categories: Story = {
  name: 'Categories/Tags',
  render: () => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
      <Badge variant="info">Design</Badge>
      <Badge variant="success">Development</Badge>
      <Badge variant="warning">Marketing</Badge>
      <Badge variant="neutral">Research</Badge>
      <Badge variant="info">Product</Badge>
      <Badge variant="success">Engineering</Badge>
    </div>
  ),
};

// Notification Counts
export const NotificationCounts: Story = {
  name: 'Notification Counts',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span>Messages</span>
        <Badge variant="error" size="small">5</Badge>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span>Notifications</span>
        <Badge variant="warning" size="small">12</Badge>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span>Updates</span>
        <Badge variant="info" size="small">3</Badge>
      </div>
    </div>
  ),
};

// Version Tags
export const VersionTags: Story = {
  name: 'Version Tags',
  render: () => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
      <Badge variant="success">v2.0.0</Badge>
      <Badge variant="info">v1.9.5</Badge>
      <Badge variant="warning">Beta</Badge>
      <Badge variant="error">Deprecated</Badge>
      <Badge variant="neutral">Legacy</Badge>
    </div>
  ),
};

// Feature Flags
export const FeatureFlags: Story = {
  name: 'Feature Flags',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span>Advanced Analytics</span>
        <Badge variant="success" size="small">New</Badge>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span>AI Suggestions</span>
        <Badge variant="info" size="small">Beta</Badge>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span>Bulk Actions</span>
        <Badge variant="warning" size="small">Preview</Badge>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span>Old Dashboard</span>
        <Badge variant="error" size="small">Sunset</Badge>
      </div>
    </div>
  ),
};

// Product Labels
export const ProductLabels: Story = {
  name: 'Product Labels',
  render: () => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
      <Badge variant="success">In Stock</Badge>
      <Badge variant="warning">Low Stock</Badge>
      <Badge variant="error">Out of Stock</Badge>
      <Badge variant="info">Pre-order</Badge>
      <Badge variant="neutral">Discontinued</Badge>
    </div>
  ),
};

// Mixed Sizes and Variants
export const MixedSizesAndVariants: Story = {
  name: 'Mixed Sizes and Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <div style={{ marginBottom: '8px', fontWeight: 600 }}>Small Badges</div>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          <Badge variant="neutral" size="small">Neutral</Badge>
          <Badge variant="info" size="small">Info</Badge>
          <Badge variant="success" size="small">Success</Badge>
          <Badge variant="warning" size="small">Warning</Badge>
          <Badge variant="error" size="small">Error</Badge>
        </div>
      </div>
      <div>
        <div style={{ marginBottom: '8px', fontWeight: 600 }}>Medium Badges</div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Badge variant="neutral" size="medium">Neutral</Badge>
          <Badge variant="info" size="medium">Info</Badge>
          <Badge variant="success" size="medium">Success</Badge>
          <Badge variant="warning" size="medium">Warning</Badge>
          <Badge variant="error" size="medium">Error</Badge>
        </div>
      </div>
    </div>
  ),
};

// In Context Example
export const InContext: Story = {
  name: 'In Context',
  render: () => (
    <div style={{ maxWidth: '600px' }}>
      <div style={{
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '12px',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>Project Alpha</h3>
          <Badge variant="success">Active</Badge>
        </div>
        <p style={{ margin: '8px 0', color: '#666', fontSize: '14px' }}>
          Main project for Q4 2024 deliverables
        </p>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          <Badge variant="info" size="small">Design</Badge>
          <Badge variant="info" size="small">Development</Badge>
          <Badge variant="warning" size="small">High Priority</Badge>
        </div>
      </div>

      <div style={{
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        padding: '16px',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>Project Beta</h3>
          <Badge variant="warning">Pending</Badge>
        </div>
        <p style={{ margin: '8px 0', color: '#666', fontSize: '14px' }}>
          Waiting for client approval
        </p>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          <Badge variant="info" size="small">Research</Badge>
          <Badge variant="neutral" size="small">Low Priority</Badge>
        </div>
      </div>
    </div>
  ),
};

// Playground
export const Playground: Story = {
  args: {
    children: 'Badge',
    variant: 'info',
    size: 'medium',
  },
};
