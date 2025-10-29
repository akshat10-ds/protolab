import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from './Spinner';

const meta = {
  title: 'Ink Design System/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Official DocuSign Ink Spinner component (ProgressCircle) - loading indicator for async operations.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Spinner size: small (16px), medium (40px), large (80px)',
    },
    kind: {
      control: 'select',
      options: ['default', 'subtle'],
      description: 'Visual style: default (blue) or subtle (gray)',
    },
    label: {
      control: 'text',
      description: 'Accessible label for screen readers',
    },
    showLabel: {
      control: 'boolean',
      description: 'Whether to show the label text visibly',
    },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default
export const Default: Story = {
  args: {
    size: 'large',
    kind: 'default',
    label: 'Loading...',
    showLabel: false,
  },
};

// Small Size
export const Small: Story = {
  args: {
    size: 'small',
    kind: 'default',
    label: 'Loading...',
  },
};

// Medium Size
export const Medium: Story = {
  args: {
    size: 'medium',
    kind: 'default',
    label: 'Loading...',
  },
};

// Large Size
export const Large: Story = {
  args: {
    size: 'large',
    kind: 'default',
    label: 'Loading...',
  },
};

// All Sizes - Default Kind
export const AllSizes: Story = {
  name: 'All Sizes (Default)',
  render: () => (
    <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <Spinner size="small" kind="default" label="Small spinner" />
        <div style={{ marginTop: '12px', fontSize: '12px', color: '#666' }}>Small (16px)</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Spinner size="medium" kind="default" label="Medium spinner" />
        <div style={{ marginTop: '12px', fontSize: '12px', color: '#666' }}>Medium (40px)</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Spinner size="large" kind="default" label="Large spinner" />
        <div style={{ marginTop: '12px', fontSize: '12px', color: '#666' }}>Large (80px)</div>
      </div>
    </div>
  ),
};

// All Sizes - Subtle Kind
export const AllSizesSubtle: Story = {
  name: 'All Sizes (Subtle)',
  render: () => (
    <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <Spinner size="small" kind="subtle" label="Small spinner" />
        <div style={{ marginTop: '12px', fontSize: '12px', color: '#666' }}>Small (16px)</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Spinner size="medium" kind="subtle" label="Medium spinner" />
        <div style={{ marginTop: '12px', fontSize: '12px', color: '#666' }}>Medium (40px)</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Spinner size="large" kind="subtle" label="Large spinner" />
        <div style={{ marginTop: '12px', fontSize: '12px', color: '#666' }}>Large (80px)</div>
      </div>
    </div>
  ),
};

// Kind Variants
export const KindVariants: Story = {
  name: 'Kind Variants',
  render: () => (
    <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <Spinner size="large" kind="default" label="Default spinner" />
        <div style={{ marginTop: '12px', fontSize: '12px', color: '#666' }}>Default (Blue)</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Spinner size="large" kind="subtle" label="Subtle spinner" />
        <div style={{ marginTop: '12px', fontSize: '12px', color: '#666' }}>Subtle (Gray)</div>
      </div>
    </div>
  ),
};

// Custom Labels
export const CustomLabels: Story = {
  name: 'Custom Labels',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Spinner label="Loading data..." />
      <Spinner label="Processing..." />
      <Spinner label="Uploading files..." />
      <Spinner label="Please wait..." />
    </div>
  ),
};

// In Button
export const InButton: Story = {
  name: 'In Button',
  render: () => (
    <div style={{ display: 'flex', gap: '12px' }}>
      <button
        style={{
          padding: '10px 20px',
          background: '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'wait',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
        disabled
      >
        <div style={{ width: '16px', height: '16px' }}>
          <Spinner size="small" label="Loading" />
        </div>
        Loading...
      </button>
      <button
        style={{
          padding: '10px 20px',
          background: '#10b981',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'wait',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
        disabled
      >
        <div style={{ width: '16px', height: '16px' }}>
          <Spinner size="small" label="Saving" />
        </div>
        Saving...
      </button>
    </div>
  ),
};

// In Card
export const InCard: Story = {
  name: 'In Card',
  render: () => (
    <div
      style={{
        width: '400px',
        padding: '40px',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        textAlign: 'center',
      }}
    >
      <Spinner size="large" label="Loading content" />
      <div style={{ marginTop: '16px', color: '#666' }}>Loading your data...</div>
    </div>
  ),
};

// Overlay Loading
export const OverlayLoading: Story = {
  name: 'Overlay Loading',
  render: () => (
    <div style={{ position: 'relative', width: '500px', height: '300px' }}>
      <div
        style={{
          padding: '20px',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          height: '100%',
        }}
      >
        <h3>Your Content</h3>
        <p>This is some sample content that is being loaded...</p>
      </div>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(255, 255, 255, 0.9)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '8px',
        }}
      >
        <Spinner size="large" label="Loading content" />
      </div>
    </div>
  ),
};

// Full Page Loading
export const FullPageLoading: Story = {
  name: 'Full Page Loading',
  render: () => (
    <div
      style={{
        width: '600px',
        height: '400px',
        background: '#f9fafb',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '8px',
        border: '1px solid #e5e7eb',
      }}
    >
      <Spinner size="large" label="Loading application" />
      <div style={{ marginTop: '20px', fontSize: '18px', fontWeight: 600 }}>
        Loading Application
      </div>
      <div style={{ marginTop: '8px', color: '#666' }}>
        Please wait while we prepare everything for you...
      </div>
    </div>
  ),
};

// Inline Loading
export const InlineLoading: Story = {
  name: 'Inline Loading',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ width: '20px', height: '20px' }}>
          <Spinner size="small" label="Loading" />
        </div>
        <span>Fetching latest data...</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ width: '20px', height: '20px' }}>
          <Spinner size="small" label="Processing" />
        </div>
        <span>Processing your request...</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ width: '20px', height: '20px' }}>
          <Spinner size="small" label="Uploading" />
        </div>
        <span>Uploading files...</span>
      </div>
    </div>
  ),
};

// Loading States
export const LoadingStates: Story = {
  name: 'Loading States',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', width: '600px' }}>
      <div
        style={{
          padding: '24px',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          textAlign: 'center',
        }}
      >
        <Spinner size="medium" label="Loading users" />
        <div style={{ marginTop: '12px', fontSize: '14px', color: '#666' }}>
          Loading users...
        </div>
      </div>
      <div
        style={{
          padding: '24px',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          textAlign: 'center',
        }}
      >
        <Spinner size="medium" label="Loading documents" />
        <div style={{ marginTop: '12px', fontSize: '14px', color: '#666' }}>
          Loading documents...
        </div>
      </div>
      <div
        style={{
          padding: '24px',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          textAlign: 'center',
        }}
      >
        <Spinner size="medium" label="Loading analytics" />
        <div style={{ marginTop: '12px', fontSize: '14px', color: '#666' }}>
          Loading analytics...
        </div>
      </div>
      <div
        style={{
          padding: '24px',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          textAlign: 'center',
        }}
      >
        <Spinner size="medium" label="Loading settings" />
        <div style={{ marginTop: '12px', fontSize: '14px', color: '#666' }}>
          Loading settings...
        </div>
      </div>
    </div>
  ),
};

// Empty State with Spinner
export const EmptyStateWithSpinner: Story = {
  name: 'Empty State with Spinner',
  render: () => (
    <div
      style={{
        width: '500px',
        padding: '60px 20px',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        textAlign: 'center',
      }}
    >
      <Spinner size="large" label="Loading items" />
      <h3 style={{ margin: '24px 0 8px 0' }}>Loading Your Items</h3>
      <p style={{ margin: 0, color: '#666' }}>
        We're fetching your data. This should only take a moment.
      </p>
    </div>
  ),
};

// List Loading
export const ListLoading: Story = {
  name: 'List Loading',
  render: () => (
    <div style={{ width: '400px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h3 style={{ margin: 0 }}>Recent Documents</h3>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              padding: '16px',
              border: '1px solid #e5e7eb',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <div style={{ width: '24px', height: '24px' }}>
              <Spinner size="small" label={`Loading item ${i}`} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ height: '12px', background: '#e5e7eb', borderRadius: '4px', marginBottom: '8px' }} />
              <div style={{ height: '8px', width: '60%', background: '#f3f4f6', borderRadius: '4px' }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

// Form Submission
export const FormSubmission: Story = {
  name: 'Form Submission',
  render: () => (
    <div
      style={{
        width: '400px',
        padding: '24px',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
      }}
    >
      <h3 style={{ margin: '0 0 16px 0' }}>Contact Form</h3>
      <div style={{ opacity: 0.6, pointerEvents: 'none' }}>
        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', marginBottom: '4px' }}>Name</label>
          <input type="text" value="John Doe" style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px' }} />
        </div>
        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', marginBottom: '4px' }}>Email</label>
          <input type="email" value="john@example.com" style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px' }} />
        </div>
      </div>
      <button
        style={{
          width: '100%',
          padding: '12px',
          background: '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'wait',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          fontSize: '16px',
        }}
        disabled
      >
        <div style={{ width: '20px', height: '20px' }}>
          <Spinner size="small" label="Submitting" />
        </div>
        Submitting...
      </button>
    </div>
  ),
};

// Playground
export const Playground: Story = {
  args: {
    size: 'medium',
    label: 'Loading...',
  },
};
