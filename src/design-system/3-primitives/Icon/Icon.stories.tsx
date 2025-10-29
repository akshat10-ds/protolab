import type { Meta, StoryObj } from '@storybook/react';
import { Icon, IconName } from './Icon';
import { iconPaths } from './iconPaths';
import './Icon.module.css';

const meta: Meta<typeof Icon> = {
  title: 'Ink Design System/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Icon component from the DocuSign Ink Design System. Supports 50 essential icons with customizable size and color.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      options: Object.keys(iconPaths),
      description: 'The name of the icon to display',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large', 32, 48, 64],
      description: 'Size of the icon: small (16px), medium (20px), large (24px), or custom number',
    },
    color: {
      control: 'color',
      description: 'Color of the icon (defaults to currentColor)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: {
    name: 'check',
    size: 'medium',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
      <div style={{ textAlign: 'center' }}>
        <Icon name="home" size="small" />
        <div style={{ fontSize: '12px', marginTop: '8px' }}>Small (16px)</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Icon name="home" size="medium" />
        <div style={{ fontSize: '12px', marginTop: '8px' }}>Medium (20px)</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Icon name="home" size="large" />
        <div style={{ fontSize: '12px', marginTop: '8px' }}>Large (24px)</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Icon name="home" size={32} />
        <div style={{ fontSize: '12px', marginTop: '8px' }}>Custom (32px)</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Icon name="home" size={48} />
        <div style={{ fontSize: '12px', marginTop: '8px' }}>Custom (48px)</div>
      </div>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
      <Icon name="star-filled" size="large" color="#0066FF" />
      <Icon name="star-filled" size="large" color="#FF6B6B" />
      <Icon name="star-filled" size="large" color="#4ECDC4" />
      <Icon name="star-filled" size="large" color="#FFD93D" />
      <Icon name="star-filled" size="large" color="#6BCF7F" />
    </div>
  ),
};

export const NavigationIcons: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '24px', padding: '24px' }}>
      {['arrow-left', 'arrow-right', 'arrow-up', 'arrow-down', 'chevron-left', 'chevron-right', 'chevron-up', 'chevron-down', 'menu', 'close'].map((iconName) => (
        <div key={iconName} style={{ textAlign: 'center', padding: '16px', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
          <Icon name={iconName as IconName} size="large" />
          <div style={{ fontSize: '11px', marginTop: '8px', color: '#666' }}>{iconName}</div>
        </div>
      ))}
    </div>
  ),
};

export const ActionIcons: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '24px', padding: '24px' }}>
      {['add', 'edit', 'delete', 'save', 'search', 'filter', 'refresh', 'download', 'upload', 'share'].map((iconName) => (
        <div key={iconName} style={{ textAlign: 'center', padding: '16px', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
          <Icon name={iconName as IconName} size="large" />
          <div style={{ fontSize: '11px', marginTop: '8px', color: '#666' }}>{iconName}</div>
        </div>
      ))}
    </div>
  ),
};

export const StatusIcons: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '24px', padding: '24px' }}>
      {['check', 'check-circle', 'error', 'warning', 'info', 'help', 'star', 'star-filled', 'heart', 'heart-filled'].map((iconName) => (
        <div key={iconName} style={{ textAlign: 'center', padding: '16px', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
          <Icon name={iconName as IconName} size="large" />
          <div style={{ fontSize: '11px', marginTop: '8px', color: '#666' }}>{iconName}</div>
        </div>
      ))}
    </div>
  ),
};

export const CommonIcons: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '24px', padding: '24px' }}>
      {['user', 'users', 'settings', 'home', 'document', 'folder', 'calendar', 'clock', 'bell', 'mail'].map((iconName) => (
        <div key={iconName} style={{ textAlign: 'center', padding: '16px', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
          <Icon name={iconName as IconName} size="large" />
          <div style={{ fontSize: '11px', marginTop: '8px', color: '#666' }}>{iconName}</div>
        </div>
      ))}
    </div>
  ),
};

export const UIIcons: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '24px', padding: '24px' }}>
      {['more-horizontal', 'more-vertical', 'expand', 'collapse', 'external-link', 'copy', 'paste', 'eye', 'eye-off', 'lock', 'minus'].map((iconName) => (
        <div key={iconName} style={{ textAlign: 'center', padding: '16px', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
          <Icon name={iconName as IconName} size="large" />
          <div style={{ fontSize: '11px', marginTop: '8px', color: '#666' }}>{iconName}</div>
        </div>
      ))}
    </div>
  ),
};

export const AllIcons: Story = {
  render: () => {
    const allIconNames = Object.keys(iconPaths) as IconName[];

    return (
      <div style={{ padding: '24px' }}>
        <h2 style={{ marginBottom: '24px', fontSize: '24px', fontWeight: 600 }}>All 50 Essential Icons</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '16px' }}>
          {allIconNames.map((iconName) => (
            <div
              key={iconName}
              style={{
                textAlign: 'center',
                padding: '16px',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#0066FF';
                e.currentTarget.style.backgroundColor = '#f5f9ff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e0e0e0';
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <Icon name={iconName} size="large" />
              <div style={{ fontSize: '10px', marginTop: '8px', color: '#666', wordBreak: 'break-word' }}>
                {iconName}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  },
};

export const InContext: Story = {
  render: () => (
    <div style={{ padding: '24px', maxWidth: '600px' }}>
      <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
        <Icon name="settings" size="large" />
        Settings Panel
      </h3>

      <div style={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', borderBottom: '1px solid #f0f0f0' }}>
          <Icon name="user" size="medium" color="#666" />
          <span>Profile Settings</span>
          <Icon name="chevron-right" size="small" color="#999" style={{ marginLeft: 'auto' }} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', borderBottom: '1px solid #f0f0f0' }}>
          <Icon name="bell" size="medium" color="#666" />
          <span>Notifications</span>
          <Icon name="chevron-right" size="small" color="#999" style={{ marginLeft: 'auto' }} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', borderBottom: '1px solid #f0f0f0' }}>
          <Icon name="lock" size="medium" color="#666" />
          <span>Privacy & Security</span>
          <Icon name="chevron-right" size="small" color="#999" style={{ marginLeft: 'auto' }} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px' }}>
          <Icon name="help" size="medium" color="#666" />
          <span>Help & Support</span>
          <Icon name="external-link" size="small" color="#999" style={{ marginLeft: 'auto' }} />
        </div>
      </div>

      <div style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
        <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', border: '1px solid #0066FF', borderRadius: '4px', background: '#0066FF', color: 'white', cursor: 'pointer' }}>
          <Icon name="check" size="small" />
          Save Changes
        </button>
        <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', border: '1px solid #ccc', borderRadius: '4px', background: 'white', color: '#333', cursor: 'pointer' }}>
          <Icon name="close" size="small" />
          Cancel
        </button>
      </div>
    </div>
  ),
};

export const StatusMessages: Story = {
  render: () => (
    <div style={{ padding: '24px', maxWidth: '500px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: '#e8f5e9', borderRadius: '8px', border: '1px solid #4caf50' }}>
        <Icon name="check-circle" size="medium" color="#4caf50" />
        <span style={{ color: '#2e7d32' }}>Changes saved successfully!</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: '#fff3e0', borderRadius: '8px', border: '1px solid #ff9800' }}>
        <Icon name="warning" size="medium" color="#ff9800" />
        <span style={{ color: '#e65100' }}>Please review your changes before submitting.</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: '#ffebee', borderRadius: '8px', border: '1px solid #f44336' }}>
        <Icon name="error" size="medium" color="#f44336" />
        <span style={{ color: '#c62828' }}>An error occurred. Please try again.</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: '#e3f2fd', borderRadius: '8px', border: '1px solid #2196f3' }}>
        <Icon name="info" size="medium" color="#2196f3" />
        <span style={{ color: '#1565c0' }}>This action cannot be undone.</span>
      </div>
    </div>
  ),
};

export const Toolbar: Story = {
  render: () => (
    <div style={{ padding: '24px' }}>
      <div style={{ display: 'flex', gap: '4px', padding: '8px', background: '#f5f5f5', borderRadius: '8px', width: 'fit-content' }}>
        <button style={{ padding: '8px', border: 'none', background: 'white', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Add">
          <Icon name="add" size="medium" />
        </button>
        <button style={{ padding: '8px', border: 'none', background: 'white', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Edit">
          <Icon name="edit" size="medium" />
        </button>
        <button style={{ padding: '8px', border: 'none', background: 'white', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Delete">
          <Icon name="delete" size="medium" />
        </button>
        <div style={{ width: '1px', background: '#ddd', margin: '0 4px' }} />
        <button style={{ padding: '8px', border: 'none', background: 'white', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Copy">
          <Icon name="copy" size="medium" />
        </button>
        <button style={{ padding: '8px', border: 'none', background: 'white', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Paste">
          <Icon name="paste" size="medium" />
        </button>
        <div style={{ width: '1px', background: '#ddd', margin: '0 4px' }} />
        <button style={{ padding: '8px', border: 'none', background: 'white', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Download">
          <Icon name="download" size="medium" />
        </button>
        <button style={{ padding: '8px', border: 'none', background: 'white', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Upload">
          <Icon name="upload" size="medium" />
        </button>
        <button style={{ padding: '8px', border: 'none', background: 'white', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Share">
          <Icon name="share" size="medium" />
        </button>
      </div>
    </div>
  ),
};
