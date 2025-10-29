import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';

const meta = {
  title: 'Ink Design System/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Official DocuSign Ink Avatar component - displays user profile images, initials, or placeholder.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: 'text',
      description: 'Image URL for the avatar',
    },
    alt: {
      control: 'text',
      description: 'Alt text for the image',
    },
    initials: {
      control: 'text',
      description: 'User initials to display',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Avatar size',
    },
    shape: {
      control: 'select',
      options: ['circle', 'square'],
      description: 'Avatar shape',
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

// With Image
export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=1',
    alt: 'User avatar',
  },
};

// With Initials
export const WithInitials: Story = {
  args: {
    initials: 'JD',
  },
};

// Placeholder
export const Placeholder: Story = {
  args: {},
};

// Small Size
export const Small: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=2',
    alt: 'Small avatar',
    size: 'small',
  },
};

// Medium Size
export const Medium: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=3',
    alt: 'Medium avatar',
    size: 'medium',
  },
};

// Large Size
export const Large: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=4',
    alt: 'Large avatar',
    size: 'large',
  },
};

// Square Shape
export const Square: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=5',
    alt: 'Square avatar',
    shape: 'square',
  },
};

// Circle Shape
export const Circle: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=6',
    alt: 'Circle avatar',
    shape: 'circle',
  },
};

// All Sizes with Images
export const AllSizesWithImages: Story = {
  name: 'All Sizes with Images',
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Avatar src="https://i.pravatar.cc/150?img=7" alt="Small" size="small" />
      <Avatar src="https://i.pravatar.cc/150?img=8" alt="Medium" size="medium" />
      <Avatar src="https://i.pravatar.cc/150?img=9" alt="Large" size="large" />
    </div>
  ),
};

// All Sizes with Initials
export const AllSizesWithInitials: Story = {
  name: 'All Sizes with Initials',
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Avatar initials="AB" size="small" />
      <Avatar initials="CD" size="medium" />
      <Avatar initials="EF" size="large" />
    </div>
  ),
};

// All Sizes Placeholder
export const AllSizesPlaceholder: Story = {
  name: 'All Sizes Placeholder',
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Avatar size="small" />
      <Avatar size="medium" />
      <Avatar size="large" />
    </div>
  ),
};

// Different Shapes
export const DifferentShapes: Story = {
  name: 'Different Shapes',
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Avatar src="https://i.pravatar.cc/150?img=10" shape="circle" />
      <Avatar src="https://i.pravatar.cc/150?img=11" shape="square" />
    </div>
  ),
};

// User List Example
export const UserList: Story = {
  name: 'User List',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Avatar src="https://i.pravatar.cc/150?img=12" size="medium" />
        <div>
          <div style={{ fontWeight: 600 }}>John Doe</div>
          <div style={{ fontSize: '14px', color: '#666' }}>john.doe@example.com</div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Avatar initials="JS" size="medium" />
        <div>
          <div style={{ fontWeight: 600 }}>Jane Smith</div>
          <div style={{ fontSize: '14px', color: '#666' }}>jane.smith@example.com</div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Avatar src="https://i.pravatar.cc/150?img=13" size="medium" />
        <div>
          <div style={{ fontWeight: 600 }}>Bob Johnson</div>
          <div style={{ fontSize: '14px', color: '#666' }}>bob.johnson@example.com</div>
        </div>
      </div>
    </div>
  ),
};

// Avatar Group
export const AvatarGroup: Story = {
  name: 'Avatar Group',
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Avatar src="https://i.pravatar.cc/150?img=14" size="medium" style={{ marginLeft: '-8px' }} />
      <Avatar src="https://i.pravatar.cc/150?img=15" size="medium" style={{ marginLeft: '-8px' }} />
      <Avatar initials="AB" size="medium" style={{ marginLeft: '-8px' }} />
      <Avatar src="https://i.pravatar.cc/150?img=16" size="medium" style={{ marginLeft: '-8px' }} />
      <div
        style={{
          marginLeft: '-8px',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: '#e5e7eb',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '14px',
          fontWeight: 600,
          border: '2px solid white',
        }}
      >
        +5
      </div>
    </div>
  ),
};

// With Status Indicator
export const WithStatusIndicator: Story = {
  name: 'With Status Indicator',
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
      <div style={{ position: 'relative' }}>
        <Avatar src="https://i.pravatar.cc/150?img=17" size="large" />
        <div style={{
          position: 'absolute',
          bottom: '2px',
          right: '2px',
          width: '14px',
          height: '14px',
          borderRadius: '50%',
          background: '#22c55e',
          border: '2px solid white',
        }} />
      </div>
      <div style={{ position: 'relative' }}>
        <Avatar src="https://i.pravatar.cc/150?img=18" size="large" />
        <div style={{
          position: 'absolute',
          bottom: '2px',
          right: '2px',
          width: '14px',
          height: '14px',
          borderRadius: '50%',
          background: '#ef4444',
          border: '2px solid white',
        }} />
      </div>
      <div style={{ position: 'relative' }}>
        <Avatar src="https://i.pravatar.cc/150?img=19" size="large" />
        <div style={{
          position: 'absolute',
          bottom: '2px',
          right: '2px',
          width: '14px',
          height: '14px',
          borderRadius: '50%',
          background: '#f59e0b',
          border: '2px solid white',
        }} />
      </div>
    </div>
  ),
};

// Profile Header
export const ProfileHeader: Story = {
  name: 'Profile Header',
  render: () => (
    <div style={{
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      padding: '24px',
      maxWidth: '500px',
    }}>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'start' }}>
        <Avatar src="https://i.pravatar.cc/150?img=20" size="large" />
        <div style={{ flex: 1 }}>
          <h2 style={{ margin: '0 0 4px 0', fontSize: '24px', fontWeight: 600 }}>Sarah Wilson</h2>
          <p style={{ margin: '0 0 12px 0', color: '#666' }}>Product Designer at DocuSign</p>
          <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.6 }}>
            Passionate about creating intuitive and beautiful user experiences.
            5+ years of experience in product design and user research.
          </p>
        </div>
      </div>
    </div>
  ),
};

// Comment Section
export const CommentSection: Story = {
  name: 'Comment Section',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px' }}>
      <div style={{ display: 'flex', gap: '12px' }}>
        <Avatar src="https://i.pravatar.cc/150?img=21" size="medium" />
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600, marginBottom: '4px' }}>Michael Chen</div>
          <p style={{ margin: '0 0 8px 0', color: '#333' }}>
            Great work on this feature! The user flow is much clearer now.
          </p>
          <span style={{ fontSize: '12px', color: '#999' }}>2 hours ago</span>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '12px' }}>
        <Avatar initials="EB" size="medium" />
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600, marginBottom: '4px' }}>Emily Brown</div>
          <p style={{ margin: '0 0 8px 0', color: '#333' }}>
            Thanks! I'd love to hear your thoughts on the mobile version.
          </p>
          <span style={{ fontSize: '12px', color: '#999' }}>1 hour ago</span>
        </div>
      </div>
    </div>
  ),
};

// Team Members Grid
export const TeamMembersGrid: Story = {
  name: 'Team Members Grid',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', maxWidth: '600px' }}>
      {[
        { src: 'https://i.pravatar.cc/150?img=22', name: 'Alex Turner', role: 'CEO' },
        { initials: 'SM', name: 'Sarah Miller', role: 'CTO' },
        { src: 'https://i.pravatar.cc/150?img=23', name: 'David Lee', role: 'Designer' },
        { initials: 'KJ', name: 'Kate Johnson', role: 'Developer' },
        { src: 'https://i.pravatar.cc/150?img=24', name: 'Tom Wilson', role: 'Product Manager' },
        { initials: 'LB', name: 'Lisa Brown', role: 'Marketing' },
      ].map((member, i) => (
        <div key={i} style={{ textAlign: 'center' }}>
          {member.src ? (
            <Avatar src={member.src} size="large" style={{ margin: '0 auto 8px' }} />
          ) : (
            <Avatar initials={member.initials} size="large" style={{ margin: '0 auto 8px' }} />
          )}
          <div style={{ fontWeight: 600, fontSize: '14px' }}>{member.name}</div>
          <div style={{ color: '#666', fontSize: '12px' }}>{member.role}</div>
        </div>
      ))}
    </div>
  ),
};

// Different Initials
export const DifferentInitials: Story = {
  name: 'Different Initials',
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <Avatar initials="AB" />
      <Avatar initials="CD" />
      <Avatar initials="EF" />
      <Avatar initials="GH" />
      <Avatar initials="IJ" />
      <Avatar initials="KL" />
      <Avatar initials="MN" />
      <Avatar initials="OP" />
    </div>
  ),
};

// All States
export const AllStates: Story = {
  name: 'All States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h4 style={{ margin: '0 0 12px 0' }}>With Image</h4>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Avatar src="https://i.pravatar.cc/150?img=25" size="small" />
          <Avatar src="https://i.pravatar.cc/150?img=26" size="medium" />
          <Avatar src="https://i.pravatar.cc/150?img=27" size="large" />
        </div>
      </div>
      <div>
        <h4 style={{ margin: '0 0 12px 0' }}>With Initials</h4>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Avatar initials="JD" size="small" />
          <Avatar initials="SM" size="medium" />
          <Avatar initials="AB" size="large" />
        </div>
      </div>
      <div>
        <h4 style={{ margin: '0 0 12px 0' }}>Placeholder</h4>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Avatar size="small" />
          <Avatar size="medium" />
          <Avatar size="large" />
        </div>
      </div>
      <div>
        <h4 style={{ margin: '0 0 12px 0' }}>Shapes</h4>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Avatar src="https://i.pravatar.cc/150?img=28" shape="circle" />
          <Avatar src="https://i.pravatar.cc/150?img=29" shape="square" />
        </div>
      </div>
    </div>
  ),
};

// Playground
export const Playground: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=30',
    alt: 'User avatar',
    size: 'medium',
    shape: 'circle',
  },
};
