import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from './Skeleton';

const meta = {
  title: 'Ink Design System/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Skeleton loading component for indicating content is being loaded.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'circular', 'rectangular', 'rounded'],
      description: 'Shape variant of the skeleton',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size preset (for circular variant)',
    },
    animated: {
      control: 'boolean',
      description: 'Whether to show shimmer animation',
    },
    lines: {
      control: 'number',
      description: 'Number of lines (for text variant)',
    },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Variants
export const Text: Story = {
  args: {
    variant: 'text',
    width: '100%',
  },
};

export const Circular: Story = {
  args: {
    variant: 'circular',
    size: 'md',
  },
};

export const Rectangular: Story = {
  args: {
    variant: 'rectangular',
    width: 300,
    height: 200,
  },
};

export const Rounded: Story = {
  args: {
    variant: 'rounded',
    width: 300,
    height: 200,
  },
};

// Sizes (Circular)
export const CircularSizes: Story = {
  name: 'Circular Sizes',
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <Skeleton variant="circular" size="xs" />
      <Skeleton variant="circular" size="sm" />
      <Skeleton variant="circular" size="md" />
      <Skeleton variant="circular" size="lg" />
      <Skeleton variant="circular" size="xl" />
    </div>
  ),
};

// Multiple Lines
export const MultipleLines: Story = {
  args: {
    variant: 'text',
    lines: 3,
    width: '100%',
  },
};

export const ManyLines: Story = {
  args: {
    variant: 'text',
    lines: 5,
    width: '100%',
  },
};

// Without Animation
export const WithoutAnimation: Story = {
  args: {
    variant: 'rectangular',
    width: 300,
    height: 200,
    animated: false,
  },
};

// Card Loading Pattern
export const CardLoading: Story = {
  name: 'Card Loading Pattern',
  render: () => (
    <div
      style={{
        width: '320px',
        padding: '24px',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
      }}
    >
      <Skeleton variant="rectangular" width="100%" height={180} />
      <div style={{ marginTop: '16px' }}>
        <Skeleton variant="text" width="60%" />
        <div style={{ marginTop: '8px' }}>
          <Skeleton variant="text" lines={3} />
        </div>
      </div>
    </div>
  ),
};

// User Profile Loading
export const UserProfileLoading: Story = {
  name: 'User Profile Loading',
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', width: '400px' }}>
      <Skeleton variant="circular" size="lg" />
      <div style={{ flex: 1 }}>
        <Skeleton variant="text" width="40%" />
        <div style={{ marginTop: '4px' }}>
          <Skeleton variant="text" width="60%" />
        </div>
      </div>
    </div>
  ),
};

// List Loading
export const ListLoading: Story = {
  name: 'List Loading',
  render: () => (
    <div style={{ width: '500px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {[1, 2, 3, 4].map((item) => (
        <div
          key={item}
          style={{ display: 'flex', gap: '12px', alignItems: 'center' }}
        >
          <Skeleton variant="circular" size="md" />
          <div style={{ flex: 1 }}>
            <Skeleton variant="text" width="70%" />
            <div style={{ marginTop: '4px' }}>
              <Skeleton variant="text" width="90%" />
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
};

// Table Loading
export const TableLoading: Story = {
  name: 'Table Loading',
  render: () => (
    <div style={{ width: '600px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '12px' }}>
        <Skeleton variant="text" width="80%" height={20} />
        <Skeleton variant="text" width="80%" height={20} />
        <Skeleton variant="text" width="80%" height={20} />
      </div>
      {[1, 2, 3, 4, 5].map((row) => (
        <div
          key={row}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '16px',
            marginBottom: '8px',
            paddingBottom: '8px',
            borderBottom: '1px solid #f0f0f0',
          }}
        >
          <Skeleton variant="text" width="90%" />
          <Skeleton variant="text" width="70%" />
          <Skeleton variant="text" width="60%" />
        </div>
      ))}
    </div>
  ),
};

// Article Loading
export const ArticleLoading: Story = {
  name: 'Article Loading',
  render: () => (
    <div style={{ width: '600px' }}>
      <Skeleton variant="text" width="80%" height={32} />
      <div style={{ marginTop: '12px', marginBottom: '16px' }}>
        <Skeleton variant="text" width="40%" />
      </div>
      <Skeleton variant="rectangular" width="100%" height={300} />
      <div style={{ marginTop: '24px' }}>
        <Skeleton variant="text" lines={8} />
      </div>
    </div>
  ),
};

// Dashboard Loading
export const DashboardLoading: Story = {
  name: 'Dashboard Loading',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', width: '800px' }}>
      {[1, 2, 3].map((card) => (
        <div
          key={card}
          style={{
            padding: '20px',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
          }}
        >
          <Skeleton variant="text" width="50%" height={16} />
          <div style={{ marginTop: '12px' }}>
            <Skeleton variant="text" width="80%" height={32} />
          </div>
          <div style={{ marginTop: '16px' }}>
            <Skeleton variant="rectangular" width="100%" height={100} />
          </div>
        </div>
      ))}
    </div>
  ),
};

// Media Card Loading
export const MediaCardLoading: Story = {
  name: 'Media Card Loading',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', width: '700px' }}>
      {[1, 2].map((card) => (
        <div key={card}>
          <Skeleton variant="rounded" width="100%" height={200} />
          <div style={{ marginTop: '12px' }}>
            <Skeleton variant="text" width="80%" height={20} />
            <div style={{ marginTop: '8px' }}>
              <Skeleton variant="text" lines={2} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px' }}>
              <Skeleton variant="circular" size="sm" />
              <Skeleton variant="text" width="40%" />
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
};

// Form Loading
export const FormLoading: Story = {
  name: 'Form Loading',
  render: () => (
    <div style={{ width: '500px' }}>
      <div style={{ marginBottom: '20px' }}>
        <Skeleton variant="text" width="30%" height={16} />
        <div style={{ marginTop: '8px' }}>
          <Skeleton variant="rectangular" width="100%" height={40} />
        </div>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <Skeleton variant="text" width="25%" height={16} />
        <div style={{ marginTop: '8px' }}>
          <Skeleton variant="rectangular" width="100%" height={40} />
        </div>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <Skeleton variant="text" width="35%" height={16} />
        <div style={{ marginTop: '8px' }}>
          <Skeleton variant="rectangular" width="100%" height={100} />
        </div>
      </div>
      <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
        <Skeleton variant="rounded" width={120} height={40} />
        <Skeleton variant="rounded" width={100} height={40} />
      </div>
    </div>
  ),
};

// Custom Dimensions
export const CustomDimensions: Story = {
  name: 'Custom Dimensions',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Skeleton variant="rectangular" width={100} height={100} />
      <Skeleton variant="rectangular" width={200} height={50} />
      <Skeleton variant="rectangular" width="100%" height={150} />
      <Skeleton variant="circular" width={64} height={64} />
    </div>
  ),
};

// Playground
export const Playground: Story = {
  args: {
    variant: 'text',
    width: '100%',
    animated: true,
    lines: 1,
  },
};
