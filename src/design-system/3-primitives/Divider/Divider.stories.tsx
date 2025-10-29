import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from './Divider';

const meta = {
  title: 'Ink Design System/Divider',
  component: Divider,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Official DocuSign Ink Divider component - separates content with horizontal or vertical lines.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Divider orientation',
    },
    spacing: {
      control: 'select',
      options: ['none', 'small', 'medium', 'large'],
      description: 'Spacing around divider',
    },
  },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

// Horizontal (Default)
export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
    spacing: 'medium',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '500px' }}>
        <Story />
      </div>
    ),
  ],
};

// Vertical
export const Vertical: Story = {
  args: {
    orientation: 'vertical',
    spacing: 'medium',
  },
  decorators: [
    (Story) => (
      <div style={{ height: '200px', display: 'flex' }}>
        <Story />
      </div>
    ),
  ],
};

// No Spacing
export const NoSpacing: Story = {
  args: {
    spacing: 'none',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '500px' }}>
        <Story />
      </div>
    ),
  ],
};

// Small Spacing
export const SmallSpacing: Story = {
  args: {
    spacing: 'small',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '500px' }}>
        <Story />
      </div>
    ),
  ],
};

// Medium Spacing
export const MediumSpacing: Story = {
  args: {
    spacing: 'medium',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '500px' }}>
        <Story />
      </div>
    ),
  ],
};

// Large Spacing
export const LargeSpacing: Story = {
  args: {
    spacing: 'large',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '500px' }}>
        <Story />
      </div>
    ),
  ],
};

// In Content
export const InContent: Story = {
  name: 'In Content',
  render: () => (
    <div style={{ width: '500px' }}>
      <h2 style={{ margin: '0 0 12px 0' }}>Section 1</h2>
      <p style={{ margin: '0 0 16px 0', color: '#666' }}>
        This is the first section with some content. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit.
      </p>
      <Divider spacing="medium" />
      <h2 style={{ margin: '0 0 12px 0' }}>Section 2</h2>
      <p style={{ margin: '0 0 16px 0', color: '#666' }}>
        This is the second section with different content. Sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua.
      </p>
      <Divider spacing="medium" />
      <h2 style={{ margin: '0 0 12px 0' }}>Section 3</h2>
      <p style={{ margin: 0, color: '#666' }}>
        This is the third section. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris.
      </p>
    </div>
  ),
};

// In Card
export const InCard: Story = {
  name: 'In Card',
  render: () => (
    <div style={{ width: '500px', border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
      <div style={{ padding: '20px' }}>
        <h3 style={{ margin: '0 0 8px 0' }}>Card Header</h3>
        <p style={{ margin: 0, color: '#666' }}>Card subtitle or description</p>
      </div>
      <Divider spacing="none" />
      <div style={{ padding: '20px' }}>
        <p style={{ margin: 0 }}>
          Main card content goes here. This is separated from the header by a divider.
        </p>
      </div>
      <Divider spacing="none" />
      <div style={{ padding: '20px', background: '#f9fafb' }}>
        <button style={{ padding: '8px 16px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Action Button
        </button>
      </div>
    </div>
  ),
};

// In List
export const InList: Story = {
  name: 'In List',
  render: () => (
    <div style={{ width: '500px', border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
      <div style={{ padding: '16px' }}>
        <h4 style={{ margin: 0 }}>Item 1</h4>
        <p style={{ margin: '4px 0 0 0', color: '#666', fontSize: '14px' }}>Description for item 1</p>
      </div>
      <Divider spacing="none" />
      <div style={{ padding: '16px' }}>
        <h4 style={{ margin: 0 }}>Item 2</h4>
        <p style={{ margin: '4px 0 0 0', color: '#666', fontSize: '14px' }}>Description for item 2</p>
      </div>
      <Divider spacing="none" />
      <div style={{ padding: '16px' }}>
        <h4 style={{ margin: 0 }}>Item 3</h4>
        <p style={{ margin: '4px 0 0 0', color: '#666', fontSize: '14px' }}>Description for item 3</p>
      </div>
      <Divider spacing="none" />
      <div style={{ padding: '16px' }}>
        <h4 style={{ margin: 0 }}>Item 4</h4>
        <p style={{ margin: '4px 0 0 0', color: '#666', fontSize: '14px' }}>Description for item 4</p>
      </div>
    </div>
  ),
};

// Vertical in Layout
export const VerticalInLayout: Story = {
  name: 'Vertical in Layout',
  render: () => (
    <div style={{ display: 'flex', height: '300px', border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
      <div style={{ flex: 1, padding: '20px' }}>
        <h3 style={{ margin: '0 0 12px 0' }}>Left Section</h3>
        <p style={{ margin: 0, color: '#666' }}>
          Content for the left section. This demonstrates the vertical divider usage.
        </p>
      </div>
      <Divider orientation="vertical" spacing="none" />
      <div style={{ flex: 1, padding: '20px' }}>
        <h3 style={{ margin: '0 0 12px 0' }}>Right Section</h3>
        <p style={{ margin: 0, color: '#666' }}>
          Content for the right section. The vertical divider separates these two areas.
        </p>
      </div>
    </div>
  ),
};

// Multiple Vertical Dividers
export const MultipleVerticalDividers: Story = {
  name: 'Multiple Vertical Dividers',
  render: () => (
    <div style={{ display: 'flex', height: '200px', border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
      <div style={{ flex: 1, padding: '20px', textAlign: 'center' }}>
        <h4 style={{ margin: '0 0 8px 0' }}>Column 1</h4>
        <div style={{ fontSize: '32px', fontWeight: 700 }}>123</div>
      </div>
      <Divider orientation="vertical" spacing="none" />
      <div style={{ flex: 1, padding: '20px', textAlign: 'center' }}>
        <h4 style={{ margin: '0 0 8px 0' }}>Column 2</h4>
        <div style={{ fontSize: '32px', fontWeight: 700 }}>456</div>
      </div>
      <Divider orientation="vertical" spacing="none" />
      <div style={{ flex: 1, padding: '20px', textAlign: 'center' }}>
        <h4 style={{ margin: '0 0 8px 0' }}>Column 3</h4>
        <div style={{ fontSize: '32px', fontWeight: 700 }}>789</div>
      </div>
    </div>
  ),
};

// Settings Sections
export const SettingsSections: Story = {
  name: 'Settings Sections',
  render: () => (
    <div style={{ width: '600px', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '24px' }}>
      <div>
        <h3 style={{ margin: '0 0 12px 0' }}>Profile Settings</h3>
        <p style={{ margin: '0 0 16px 0', color: '#666' }}>
          Update your profile information and preferences.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input type="text" placeholder="Full Name" style={{ padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px' }} />
          <input type="email" placeholder="Email" style={{ padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px' }} />
        </div>
      </div>

      <Divider spacing="large" />

      <div>
        <h3 style={{ margin: '0 0 12px 0' }}>Notification Settings</h3>
        <p style={{ margin: '0 0 16px 0', color: '#666' }}>
          Manage how you receive notifications.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input type="checkbox" defaultChecked />
            <span>Email notifications</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input type="checkbox" defaultChecked />
            <span>Push notifications</span>
          </label>
        </div>
      </div>

      <Divider spacing="large" />

      <div>
        <h3 style={{ margin: '0 0 12px 0' }}>Security</h3>
        <p style={{ margin: '0 0 16px 0', color: '#666' }}>
          Manage your security settings.
        </p>
        <button style={{ padding: '8px 16px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Change Password
        </button>
      </div>
    </div>
  ),
};

// Toolbar Sections
export const ToolbarSections: Story = {
  name: 'Toolbar Sections',
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', padding: '12px 16px', border: '1px solid #e5e7eb', borderRadius: '8px', gap: '16px' }}>
      <button style={{ padding: '8px 12px', background: '#f3f4f6', border: '1px solid #d1d5db', borderRadius: '4px', cursor: 'pointer' }}>
        Bold
      </button>
      <button style={{ padding: '8px 12px', background: '#f3f4f6', border: '1px solid #d1d5db', borderRadius: '4px', cursor: 'pointer' }}>
        Italic
      </button>
      <Divider orientation="vertical" spacing="none" style={{ height: '24px' }} />
      <button style={{ padding: '8px 12px', background: '#f3f4f6', border: '1px solid #d1d5db', borderRadius: '4px', cursor: 'pointer' }}>
        Left
      </button>
      <button style={{ padding: '8px 12px', background: '#f3f4f6', border: '1px solid #d1d5db', borderRadius: '4px', cursor: 'pointer' }}>
        Center
      </button>
      <button style={{ padding: '8px 12px', background: '#f3f4f6', border: '1px solid #d1d5db', borderRadius: '4px', cursor: 'pointer' }}>
        Right
      </button>
      <Divider orientation="vertical" spacing="none" style={{ height: '24px' }} />
      <button style={{ padding: '8px 12px', background: '#f3f4f6', border: '1px solid #d1d5db', borderRadius: '4px', cursor: 'pointer' }}>
        Link
      </button>
    </div>
  ),
};

// Menu Separator
export const MenuSeparator: Story = {
  name: 'Menu Separator',
  render: () => (
    <div style={{ width: '250px', border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
      <div style={{ padding: '8px 16px', cursor: 'pointer' }}>New File</div>
      <div style={{ padding: '8px 16px', cursor: 'pointer' }}>Open</div>
      <div style={{ padding: '8px 16px', cursor: 'pointer' }}>Save</div>
      <Divider spacing="none" />
      <div style={{ padding: '8px 16px', cursor: 'pointer' }}>Export</div>
      <div style={{ padding: '8px 16px', cursor: 'pointer' }}>Print</div>
      <Divider spacing="none" />
      <div style={{ padding: '8px 16px', cursor: 'pointer', color: '#ef4444' }}>Close</div>
    </div>
  ),
};

// Dashboard Layout
export const DashboardLayout: Story = {
  name: 'Dashboard Layout',
  render: () => (
    <div style={{ width: '700px', border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
      <div style={{ padding: '20px' }}>
        <h2 style={{ margin: '0 0 8px 0' }}>Dashboard Overview</h2>
        <p style={{ margin: 0, color: '#666' }}>Welcome back! Here's what's happening today.</p>
      </div>
      <Divider spacing="none" />
      <div style={{ display: 'flex', height: '200px' }}>
        <div style={{ flex: 1, padding: '20px' }}>
          <h3 style={{ margin: '0 0 12px 0', fontSize: '16px' }}>Statistics</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div>Total Users: <strong>1,234</strong></div>
            <div>Active Sessions: <strong>89</strong></div>
            <div>Revenue: <strong>$12,345</strong></div>
          </div>
        </div>
        <Divider orientation="vertical" spacing="none" />
        <div style={{ flex: 1, padding: '20px' }}>
          <h3 style={{ margin: '0 0 12px 0', fontSize: '16px' }}>Recent Activity</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', color: '#666' }}>
            <div>User signed up - 2m ago</div>
            <div>New order received - 15m ago</div>
            <div>Payment processed - 1h ago</div>
          </div>
        </div>
      </div>
    </div>
  ),
};

// All Spacing Variants
export const AllSpacingVariants: Story = {
  name: 'All Spacing Variants',
  render: () => (
    <div style={{ width: '500px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h4 style={{ margin: '0 0 8px 0' }}>No Spacing</h4>
        <div style={{ border: '1px solid #e5e7eb', borderRadius: '4px', padding: '16px' }}>
          <p style={{ margin: 0 }}>Content above</p>
          <Divider spacing="none" />
          <p style={{ margin: 0 }}>Content below</p>
        </div>
      </div>
      <div>
        <h4 style={{ margin: '0 0 8px 0' }}>Small Spacing</h4>
        <div>
          <p style={{ margin: 0 }}>Content above</p>
          <Divider spacing="small" />
          <p style={{ margin: 0 }}>Content below</p>
        </div>
      </div>
      <div>
        <h4 style={{ margin: '0 0 8px 0' }}>Medium Spacing</h4>
        <div>
          <p style={{ margin: 0 }}>Content above</p>
          <Divider spacing="medium" />
          <p style={{ margin: 0 }}>Content below</p>
        </div>
      </div>
      <div>
        <h4 style={{ margin: '0 0 8px 0' }}>Large Spacing</h4>
        <div>
          <p style={{ margin: 0 }}>Content above</p>
          <Divider spacing="large" />
          <p style={{ margin: 0 }}>Content below</p>
        </div>
      </div>
    </div>
  ),
};

// Playground
export const Playground: Story = {
  args: {
    orientation: 'horizontal',
    spacing: 'medium',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '500px' }}>
        <Story />
      </div>
    ),
  ],
};
