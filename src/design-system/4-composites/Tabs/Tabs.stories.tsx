import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from './Tabs';
import { useState } from 'react';

const meta = {
  title: 'Ink Design System/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Official DocuSign Ink Tabs component - navigation between different content sections.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '700px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

// Simple Tabs
export const Default: Story = {
  args: {
    tabs: [
      {
        id: 'tab1',
        label: 'Tab 1',
        content: <div style={{ padding: '20px' }}>Content for Tab 1</div>,
      },
      {
        id: 'tab2',
        label: 'Tab 2',
        content: <div style={{ padding: '20px' }}>Content for Tab 2</div>,
      },
      {
        id: 'tab3',
        label: 'Tab 3',
        content: <div style={{ padding: '20px' }}>Content for Tab 3</div>,
      },
    ],
  },
};

// With Default Tab
export const WithDefaultTab: Story = {
  args: {
    defaultTab: 'profile',
    tabs: [
      {
        id: 'account',
        label: 'Account',
        content: <div style={{ padding: '20px' }}>Account settings and information</div>,
      },
      {
        id: 'profile',
        label: 'Profile',
        content: <div style={{ padding: '20px' }}>Edit your profile details</div>,
      },
      {
        id: 'preferences',
        label: 'Preferences',
        content: <div style={{ padding: '20px' }}>Manage your preferences</div>,
      },
    ],
  },
};

// With Disabled Tab
export const WithDisabledTab: Story = {
  args: {
    tabs: [
      {
        id: 'available',
        label: 'Available',
        content: <div style={{ padding: '20px' }}>This tab is available</div>,
      },
      {
        id: 'disabled',
        label: 'Disabled',
        content: <div style={{ padding: '20px' }}>You should not see this</div>,
        disabled: true,
      },
      {
        id: 'another',
        label: 'Another Tab',
        content: <div style={{ padding: '20px' }}>Another available tab</div>,
      },
    ],
  },
};

// Rich Content Tabs
export const RichContent: Story = {
  name: 'Rich Content',
  render: () => (
    <Tabs
      tabs={[
        {
          id: 'overview',
          label: 'Overview',
          content: (
            <div style={{ padding: '24px' }}>
              <h2 style={{ margin: '0 0 16px 0' }}>Project Overview</h2>
              <p style={{ margin: '0 0 12px 0', color: '#666' }}>
                This is a comprehensive overview of the current project status and metrics.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginTop: '20px' }}>
                <div style={{ padding: '16px', background: '#f3f4f6', borderRadius: '8px' }}>
                  <div style={{ fontSize: '24px', fontWeight: 700 }}>156</div>
                  <div style={{ fontSize: '14px', color: '#666' }}>Total Tasks</div>
                </div>
                <div style={{ padding: '16px', background: '#f3f4f6', borderRadius: '8px' }}>
                  <div style={{ fontSize: '24px', fontWeight: 700 }}>89</div>
                  <div style={{ fontSize: '14px', color: '#666' }}>Completed</div>
                </div>
                <div style={{ padding: '16px', background: '#f3f4f6', borderRadius: '8px' }}>
                  <div style={{ fontSize: '24px', fontWeight: 700 }}>67</div>
                  <div style={{ fontSize: '14px', color: '#666' }}>In Progress</div>
                </div>
              </div>
            </div>
          ),
        },
        {
          id: 'details',
          label: 'Details',
          content: (
            <div style={{ padding: '24px' }}>
              <h2 style={{ margin: '0 0 16px 0' }}>Project Details</h2>
              <dl style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: '12px', margin: 0 }}>
                <dt style={{ fontWeight: 600 }}>Project Name:</dt>
                <dd style={{ margin: 0 }}>Website Redesign</dd>
                <dt style={{ fontWeight: 600 }}>Start Date:</dt>
                <dd style={{ margin: 0 }}>January 15, 2024</dd>
                <dt style={{ fontWeight: 600 }}>End Date:</dt>
                <dd style={{ margin: 0 }}>March 30, 2024</dd>
                <dt style={{ fontWeight: 600 }}>Team Size:</dt>
                <dd style={{ margin: 0 }}>8 members</dd>
                <dt style={{ fontWeight: 600 }}>Status:</dt>
                <dd style={{ margin: 0 }}>On Track</dd>
              </dl>
            </div>
          ),
        },
        {
          id: 'team',
          label: 'Team',
          content: (
            <div style={{ padding: '24px' }}>
              <h2 style={{ margin: '0 0 16px 0' }}>Team Members</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {['Sarah Johnson - Project Manager', 'Mike Chen - Lead Developer', 'Emily Davis - Designer', 'Tom Wilson - QA Engineer'].map((member, i) => (
                  <div key={i} style={{ padding: '12px', background: '#f9fafb', borderRadius: '6px' }}>
                    {member}
                  </div>
                ))}
              </div>
            </div>
          ),
        },
      ]}
    />
  ),
};

// Settings Example
export const SettingsExample: Story = {
  name: 'Settings Example',
  render: () => (
    <Tabs
      tabs={[
        {
          id: 'general',
          label: 'General',
          content: (
            <div style={{ padding: '24px' }}>
              <h3 style={{ margin: '0 0 16px 0' }}>General Settings</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Site Name</label>
                  <input type="text" defaultValue="My Website" style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Description</label>
                  <textarea defaultValue="A brief description" style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', minHeight: '100px' }} />
                </div>
              </div>
            </div>
          ),
        },
        {
          id: 'notifications',
          label: 'Notifications',
          content: (
            <div style={{ padding: '24px' }}>
              <h3 style={{ margin: '0 0 16px 0' }}>Notification Preferences</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input type="checkbox" defaultChecked />
                  <span>Email notifications</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input type="checkbox" defaultChecked />
                  <span>Push notifications</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input type="checkbox" />
                  <span>SMS notifications</span>
                </label>
              </div>
            </div>
          ),
        },
        {
          id: 'security',
          label: 'Security',
          content: (
            <div style={{ padding: '24px' }}>
              <h3 style={{ margin: '0 0 16px 0' }}>Security Settings</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <button style={{ padding: '10px 16px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                  Change Password
                </button>
                <button style={{ padding: '10px 16px', background: '#f3f4f6', border: '1px solid #d1d5db', borderRadius: '4px', cursor: 'pointer' }}>
                  Enable Two-Factor Authentication
                </button>
              </div>
            </div>
          ),
        },
      ]}
    />
  ),
};

// Product Details
export const ProductDetails: Story = {
  name: 'Product Details',
  render: () => (
    <Tabs
      tabs={[
        {
          id: 'description',
          label: 'Description',
          content: (
            <div style={{ padding: '24px' }}>
              <h2 style={{ margin: '0 0 12px 0' }}>Premium Wireless Headphones</h2>
              <p style={{ margin: '0 0 16px 0', color: '#666', lineHeight: 1.6 }}>
                Experience crystal-clear audio with our premium wireless headphones.
                Featuring active noise cancellation, 30-hour battery life, and premium
                comfort materials for all-day wear.
              </p>
              <h3 style={{ margin: '16px 0 8px 0', fontSize: '16px' }}>Key Features:</h3>
              <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: 1.8 }}>
                <li>Active Noise Cancellation</li>
                <li>30-hour battery life</li>
                <li>Premium comfort design</li>
                <li>Bluetooth 5.0</li>
                <li>Quick charging</li>
              </ul>
            </div>
          ),
        },
        {
          id: 'specs',
          label: 'Specifications',
          content: (
            <div style={{ padding: '24px' }}>
              <h3 style={{ margin: '0 0 16px 0' }}>Technical Specifications</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  {[
                    ['Driver Size', '40mm'],
                    ['Frequency Response', '20Hz - 20kHz'],
                    ['Impedance', '32 Ohms'],
                    ['Weight', '250g'],
                    ['Bluetooth Version', '5.0'],
                    ['Range', '10 meters'],
                  ].map(([key, value], i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #e5e7eb' }}>
                      <td style={{ padding: '12px 0', fontWeight: 600 }}>{key}</td>
                      <td style={{ padding: '12px 0', color: '#666' }}>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ),
        },
        {
          id: 'reviews',
          label: 'Reviews',
          content: (
            <div style={{ padding: '24px' }}>
              <h3 style={{ margin: '0 0 16px 0' }}>Customer Reviews</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { name: 'Sarah M.', rating: 5, comment: 'Absolutely love these headphones! The sound quality is amazing.' },
                  { name: 'John D.', rating: 4, comment: 'Great battery life and comfortable to wear all day.' },
                  { name: 'Emily R.', rating: 5, comment: 'Best noise cancellation I\'ve experienced in this price range.' },
                ].map((review, i) => (
                  <div key={i} style={{ padding: '16px', background: '#f9fafb', borderRadius: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <strong>{review.name}</strong>
                      <span>{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span>
                    </div>
                    <p style={{ margin: 0, color: '#666' }}>{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          ),
        },
      ]}
    />
  ),
};

// Dashboard Tabs
export const DashboardTabs: Story = {
  name: 'Dashboard Tabs',
  render: () => (
    <Tabs
      tabs={[
        {
          id: 'analytics',
          label: 'Analytics',
          content: (
            <div style={{ padding: '24px' }}>
              <h3 style={{ margin: '0 0 16px 0' }}>Analytics Dashboard</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                <div style={{ padding: '20px', background: '#f0f9ff', borderRadius: '8px', border: '1px solid #bae6fd' }}>
                  <div style={{ fontSize: '14px', color: '#0369a1', marginBottom: '4px' }}>Total Views</div>
                  <div style={{ fontSize: '32px', fontWeight: 700 }}>12,345</div>
                  <div style={{ fontSize: '12px', color: '#22c55e', marginTop: '4px' }}>↑ 12.5%</div>
                </div>
                <div style={{ padding: '20px', background: '#f0fdf4', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
                  <div style={{ fontSize: '14px', color: '#15803d', marginBottom: '4px' }}>Conversions</div>
                  <div style={{ fontSize: '32px', fontWeight: 700 }}>1,234</div>
                  <div style={{ fontSize: '12px', color: '#22c55e', marginTop: '4px' }}>↑ 8.2%</div>
                </div>
              </div>
            </div>
          ),
        },
        {
          id: 'reports',
          label: 'Reports',
          content: (
            <div style={{ padding: '24px' }}>
              <h3 style={{ margin: '0 0 16px 0' }}>Reports</h3>
              <p style={{ color: '#666' }}>Generate and download custom reports.</p>
            </div>
          ),
        },
        {
          id: 'export',
          label: 'Export',
          content: (
            <div style={{ padding: '24px' }}>
              <h3 style={{ margin: '0 0 16px 0' }}>Export Data</h3>
              <p style={{ color: '#666' }}>Export your data in various formats.</p>
            </div>
          ),
        },
      ]}
    />
  ),
};

// Controlled Tabs
export const ControlledTabs: Story = {
  name: 'Controlled Tabs',
  render: () => {
    const [activeTab, setActiveTab] = useState('tab1');

    return (
      <div>
        <div style={{ marginBottom: '16px', padding: '12px', background: '#f3f4f6', borderRadius: '6px' }}>
          Active tab: <strong>{activeTab}</strong>
        </div>
        <Tabs
          defaultTab={activeTab}
          onChange={setActiveTab}
          tabs={[
            {
              id: 'tab1',
              label: 'Tab 1',
              content: <div style={{ padding: '20px' }}>Content for Tab 1</div>,
            },
            {
              id: 'tab2',
              label: 'Tab 2',
              content: <div style={{ padding: '20px' }}>Content for Tab 2</div>,
            },
            {
              id: 'tab3',
              label: 'Tab 3',
              content: <div style={{ padding: '20px' }}>Content for Tab 3</div>,
            },
          ]}
        />
      </div>
    );
  },
};

// Many Tabs
export const ManyTabs: Story = {
  name: 'Many Tabs',
  render: () => (
    <Tabs
      tabs={[
        { id: '1', label: 'Overview', content: <div style={{ padding: '20px' }}>Overview content</div> },
        { id: '2', label: 'Documents', content: <div style={{ padding: '20px' }}>Documents content</div> },
        { id: '3', label: 'Team', content: <div style={{ padding: '20px' }}>Team content</div> },
        { id: '4', label: 'Settings', content: <div style={{ padding: '20px' }}>Settings content</div> },
        { id: '5', label: 'Analytics', content: <div style={{ padding: '20px' }}>Analytics content</div> },
        { id: '6', label: 'Reports', content: <div style={{ padding: '20px' }}>Reports content</div> },
        { id: '7', label: 'Billing', content: <div style={{ padding: '20px' }}>Billing content</div> },
      ]}
    />
  ),
};

// Playground
export const Playground: Story = {
  args: {
    tabs: [
      {
        id: 'tab1',
        label: 'First Tab',
        content: <div style={{ padding: '20px' }}>Content for first tab</div>,
      },
      {
        id: 'tab2',
        label: 'Second Tab',
        content: <div style={{ padding: '20px' }}>Content for second tab</div>,
      },
      {
        id: 'tab3',
        label: 'Third Tab',
        content: <div style={{ padding: '20px' }}>Content for third tab</div>,
      },
    ],
  },
};
