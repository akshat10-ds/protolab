import type { Meta, StoryObj } from '@storybook/react';
import { Stack } from './Stack';

const meta = {
  title: 'Ink Design System/Stack',
  component: Stack,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Official DocuSign Ink Stack component - layout component for arranging elements vertically or horizontally.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Stack direction',
    },
    gap: {
      control: 'select',
      options: ['none', 'small', 'medium', 'large'],
      description: 'Gap between items',
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch'],
      description: 'Align items',
    },
    justify: {
      control: 'select',
      options: ['start', 'center', 'end', 'between', 'around'],
      description: 'Justify content',
    },
    wrap: {
      control: 'boolean',
      description: 'Allow items to wrap',
    },
  },
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

const Box = ({ children, ...props }: any) => (
  <div style={{ padding: '16px', background: '#e0e7ff', borderRadius: '4px', ...props }}>
    {children}
  </div>
);

// Vertical Stack (Default)
export const Vertical: Story = {
  args: {
    direction: 'vertical',
    gap: 'medium',
    children: (
      <>
        <Box>Item 1</Box>
        <Box>Item 2</Box>
        <Box>Item 3</Box>
      </>
    ),
  },
};

// Horizontal Stack
export const Horizontal: Story = {
  args: {
    direction: 'horizontal',
    gap: 'medium',
    children: (
      <>
        <Box>Item 1</Box>
        <Box>Item 2</Box>
        <Box>Item 3</Box>
      </>
    ),
  },
};

// No Gap
export const NoGap: Story = {
  args: {
    gap: 'none',
    children: (
      <>
        <Box>Item 1</Box>
        <Box>Item 2</Box>
        <Box>Item 3</Box>
      </>
    ),
  },
};

// Small Gap
export const SmallGap: Story = {
  args: {
    gap: 'small',
    children: (
      <>
        <Box>Item 1</Box>
        <Box>Item 2</Box>
        <Box>Item 3</Box>
      </>
    ),
  },
};

// Medium Gap
export const MediumGap: Story = {
  args: {
    gap: 'medium',
    children: (
      <>
        <Box>Item 1</Box>
        <Box>Item 2</Box>
        <Box>Item 3</Box>
      </>
    ),
  },
};

// Large Gap
export const LargeGap: Story = {
  args: {
    gap: 'large',
    children: (
      <>
        <Box>Item 1</Box>
        <Box>Item 2</Box>
        <Box>Item 3</Box>
      </>
    ),
  },
};

// All Gaps Comparison
export const AllGaps: Story = {
  name: 'All Gaps',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h4 style={{ margin: '0 0 12px 0' }}>No Gap</h4>
        <Stack gap="none">
          <Box>Item 1</Box>
          <Box>Item 2</Box>
          <Box>Item 3</Box>
        </Stack>
      </div>
      <div>
        <h4 style={{ margin: '0 0 12px 0' }}>Small Gap</h4>
        <Stack gap="small">
          <Box>Item 1</Box>
          <Box>Item 2</Box>
          <Box>Item 3</Box>
        </Stack>
      </div>
      <div>
        <h4 style={{ margin: '0 0 12px 0' }}>Medium Gap</h4>
        <Stack gap="medium">
          <Box>Item 1</Box>
          <Box>Item 2</Box>
          <Box>Item 3</Box>
        </Stack>
      </div>
      <div>
        <h4 style={{ margin: '0 0 12px 0' }}>Large Gap</h4>
        <Stack gap="large">
          <Box>Item 1</Box>
          <Box>Item 2</Box>
          <Box>Item 3</Box>
        </Stack>
      </div>
    </div>
  ),
};

// Align Start
export const AlignStart: Story = {
  args: {
    direction: 'horizontal',
    align: 'start',
    children: (
      <>
        <Box style={{ height: '60px' }}>Item 1</Box>
        <Box style={{ height: '80px' }}>Item 2</Box>
        <Box style={{ height: '40px' }}>Item 3</Box>
      </>
    ),
  },
};

// Align Center
export const AlignCenter: Story = {
  args: {
    direction: 'horizontal',
    align: 'center',
    children: (
      <>
        <Box style={{ height: '60px' }}>Item 1</Box>
        <Box style={{ height: '80px' }}>Item 2</Box>
        <Box style={{ height: '40px' }}>Item 3</Box>
      </>
    ),
  },
};

// Align End
export const AlignEnd: Story = {
  args: {
    direction: 'horizontal',
    align: 'end',
    children: (
      <>
        <Box style={{ height: '60px' }}>Item 1</Box>
        <Box style={{ height: '80px' }}>Item 2</Box>
        <Box style={{ height: '40px' }}>Item 3</Box>
      </>
    ),
  },
};

// Align Stretch
export const AlignStretch: Story = {
  args: {
    direction: 'horizontal',
    align: 'stretch',
    children: (
      <>
        <Box>Item 1</Box>
        <Box>Item 2</Box>
        <Box>Item 3</Box>
      </>
    ),
  },
};

// Justify Start
export const JustifyStart: Story = {
  args: {
    direction: 'horizontal',
    justify: 'start',
    style: { width: '500px' },
    children: (
      <>
        <Box>Item 1</Box>
        <Box>Item 2</Box>
        <Box>Item 3</Box>
      </>
    ),
  },
};

// Justify Center
export const JustifyCenter: Story = {
  args: {
    direction: 'horizontal',
    justify: 'center',
    style: { width: '500px' },
    children: (
      <>
        <Box>Item 1</Box>
        <Box>Item 2</Box>
        <Box>Item 3</Box>
      </>
    ),
  },
};

// Justify End
export const JustifyEnd: Story = {
  args: {
    direction: 'horizontal',
    justify: 'end',
    style: { width: '500px' },
    children: (
      <>
        <Box>Item 1</Box>
        <Box>Item 2</Box>
        <Box>Item 3</Box>
      </>
    ),
  },
};

// Justify Between
export const JustifyBetween: Story = {
  args: {
    direction: 'horizontal',
    justify: 'between',
    style: { width: '500px' },
    children: (
      <>
        <Box>Item 1</Box>
        <Box>Item 2</Box>
        <Box>Item 3</Box>
      </>
    ),
  },
};

// Justify Around
export const JustifyAround: Story = {
  args: {
    direction: 'horizontal',
    justify: 'around',
    style: { width: '500px' },
    children: (
      <>
        <Box>Item 1</Box>
        <Box>Item 2</Box>
        <Box>Item 3</Box>
      </>
    ),
  },
};

// With Wrap
export const WithWrap: Story = {
  args: {
    direction: 'horizontal',
    gap: 'medium',
    wrap: true,
    style: { width: '300px' },
    children: (
      <>
        <Box>Item 1</Box>
        <Box>Item 2</Box>
        <Box>Item 3</Box>
        <Box>Item 4</Box>
        <Box>Item 5</Box>
        <Box>Item 6</Box>
      </>
    ),
  },
};

// Form Layout
export const FormLayout: Story = {
  name: 'Form Layout',
  render: () => (
    <Stack gap="large" style={{ width: '400px' }}>
      <div>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Full Name</label>
        <input type="text" style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px' }} />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Email</label>
        <input type="email" style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px' }} />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Message</label>
        <textarea style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', minHeight: '100px' }} />
      </div>
      <Stack direction="horizontal" justify="end" gap="small">
        <button style={{ padding: '8px 16px', background: '#f3f4f6', border: '1px solid #d1d5db', borderRadius: '4px', cursor: 'pointer' }}>
          Cancel
        </button>
        <button style={{ padding: '8px 16px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Submit
        </button>
      </Stack>
    </Stack>
  ),
};

// Card Content
export const CardContent: Story = {
  name: 'Card Content',
  render: () => (
    <div style={{ width: '400px', padding: '24px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
      <Stack gap="medium">
        <h3 style={{ margin: 0 }}>Profile Settings</h3>
        <Stack gap="small">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Username</span>
            <strong>johndoe</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Email</span>
            <strong>john@example.com</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Role</span>
            <strong>Admin</strong>
          </div>
        </Stack>
        <Stack direction="horizontal" gap="small">
          <button style={{ flex: 1, padding: '10px', background: '#f3f4f6', border: '1px solid #d1d5db', borderRadius: '4px', cursor: 'pointer' }}>
            Edit
          </button>
          <button style={{ flex: 1, padding: '10px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Save
          </button>
        </Stack>
      </Stack>
    </div>
  ),
};

// Navigation Bar
export const NavigationBar: Story = {
  name: 'Navigation Bar',
  render: () => (
    <Stack
      direction="horizontal"
      justify="between"
      align="center"
      style={{ width: '800px', padding: '16px 24px', background: '#1e293b', color: 'white', borderRadius: '8px' }}
    >
      <div style={{ fontSize: '18px', fontWeight: 700 }}>Logo</div>
      <Stack direction="horizontal" gap="large">
        <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Home</a>
        <a href="#" style={{ color: 'white', textDecoration: 'none' }}>About</a>
        <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Services</a>
        <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Contact</a>
      </Stack>
      <button style={{ padding: '8px 16px', background: 'white', color: '#1e293b', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
        Sign In
      </button>
    </Stack>
  ),
};

// Stats Grid
export const StatsGrid: Story = {
  name: 'Stats Grid',
  render: () => (
    <Stack direction="horizontal" gap="medium" wrap style={{ width: '600px' }}>
      <div style={{ flex: '1 1 calc(50% - 8px)', padding: '20px', background: '#f0f9ff', borderRadius: '8px', border: '1px solid #bae6fd' }}>
        <div style={{ fontSize: '14px', color: '#0369a1', marginBottom: '4px' }}>Total Users</div>
        <div style={{ fontSize: '32px', fontWeight: 700 }}>12,345</div>
      </div>
      <div style={{ flex: '1 1 calc(50% - 8px)', padding: '20px', background: '#f0fdf4', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
        <div style={{ fontSize: '14px', color: '#15803d', marginBottom: '4px' }}>Revenue</div>
        <div style={{ fontSize: '32px', fontWeight: 700 }}>$98,765</div>
      </div>
      <div style={{ flex: '1 1 calc(50% - 8px)', padding: '20px', background: '#fef3c7', borderRadius: '8px', border: '1px solid #fde68a' }}>
        <div style={{ fontSize: '14px', color: '#92400e', marginBottom: '4px' }}>Orders</div>
        <div style={{ fontSize: '32px', fontWeight: 700 }}>3,456</div>
      </div>
      <div style={{ flex: '1 1 calc(50% - 8px)', padding: '20px', background: '#fce7f3', borderRadius: '8px', border: '1px solid #fbcfe8' }}>
        <div style={{ fontSize: '14px', color: '#831843', marginBottom: '4px' }}>Conversion</div>
        <div style={{ fontSize: '32px', fontWeight: 700 }}>3.2%</div>
      </div>
    </Stack>
  ),
};

// Nested Stacks
export const NestedStacks: Story = {
  name: 'Nested Stacks',
  render: () => (
    <Stack gap="medium" style={{ width: '500px' }}>
      <h3 style={{ margin: 0 }}>Nested Stack Example</h3>
      <Stack gap="small">
        <Stack direction="horizontal" justify="between" align="center">
          <span style={{ fontWeight: 600 }}>Item 1</span>
          <Stack direction="horizontal" gap="small">
            <button style={{ padding: '4px 12px', background: '#f3f4f6', border: '1px solid #d1d5db', borderRadius: '4px', cursor: 'pointer' }}>
              Edit
            </button>
            <button style={{ padding: '4px 12px', background: '#fee2e2', border: '1px solid #fecaca', borderRadius: '4px', cursor: 'pointer' }}>
              Delete
            </button>
          </Stack>
        </Stack>
        <Stack direction="horizontal" justify="between" align="center">
          <span style={{ fontWeight: 600 }}>Item 2</span>
          <Stack direction="horizontal" gap="small">
            <button style={{ padding: '4px 12px', background: '#f3f4f6', border: '1px solid #d1d5db', borderRadius: '4px', cursor: 'pointer' }}>
              Edit
            </button>
            <button style={{ padding: '4px 12px', background: '#fee2e2', border: '1px solid #fecaca', borderRadius: '4px', cursor: 'pointer' }}>
              Delete
            </button>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  ),
};

// Playground
export const Playground: Story = {
  args: {
    direction: 'vertical',
    gap: 'medium',
    align: 'stretch',
    justify: 'start',
    wrap: false,
    children: (
      <>
        <Box>Item 1</Box>
        <Box>Item 2</Box>
        <Box>Item 3</Box>
      </>
    ),
  },
};
