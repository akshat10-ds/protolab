import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import { Button } from '../Button/Button';
import { Badge } from '../Badge/Badge';
import { Avatar } from '../Avatar/Avatar';

const meta = {
  title: 'Ink Design System/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Official DocuSign Ink Card component - container for content with header, body, and footer sections.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outlined', 'elevated'],
      description: 'Card variant style',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '500px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default Variant
export const Default: Story = {
  args: {
    variant: 'default',
    children: (
      <Card.Body>
        This is a default card with simple content.
      </Card.Body>
    ),
  },
};

// Outlined Variant
export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: (
      <Card.Body>
        This is an outlined card with a border.
      </Card.Body>
    ),
  },
};

// Elevated Variant
export const Elevated: Story = {
  args: {
    variant: 'elevated',
    children: (
      <Card.Body>
        This is an elevated card with a shadow.
      </Card.Body>
    ),
  },
};

// With Header and Body
export const WithHeader: Story = {
  render: () => (
    <Card>
      <Card.Header>
        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>Card Title</h3>
      </Card.Header>
      <Card.Body>
        This card has a header and body section. The header is used for the title
        or primary content identifier.
      </Card.Body>
    </Card>
  ),
};

// With Header, Body, and Footer
export const Complete: Story = {
  render: () => (
    <Card>
      <Card.Header>
        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>Complete Card</h3>
      </Card.Header>
      <Card.Body>
        This is a complete card with header, body, and footer sections.
        Each section can contain any content you need.
      </Card.Body>
      <Card.Footer>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
          <Button kind="tertiary">Cancel</Button>
          <Button kind="primary">Save</Button>
        </div>
      </Card.Footer>
    </Card>
  ),
};

// User Profile Card
export const UserProfile: Story = {
  name: 'User Profile Card',
  render: () => (
    <Card variant="outlined">
      <Card.Header>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Avatar initials="JD" size="large" />
          <div>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>John Doe</h3>
            <p style={{ margin: '4px 0 0 0', color: '#666', fontSize: '14px' }}>Product Designer</p>
          </div>
        </div>
      </Card.Header>
      <Card.Body>
        <p style={{ margin: '0 0 12px 0' }}>
          Passionate designer with 5+ years of experience creating user-centered digital products.
        </p>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Badge variant="info">UI Design</Badge>
          <Badge variant="info">Prototyping</Badge>
          <Badge variant="info">User Research</Badge>
        </div>
      </Card.Body>
      <Card.Footer>
        <Button kind="primary" fullWidth>View Profile</Button>
      </Card.Footer>
    </Card>
  ),
};

// Product Card
export const ProductCard: Story = {
  name: 'Product Card',
  render: () => (
    <Card variant="elevated">
      <Card.Header>
        <div style={{
          width: '100%',
          height: '200px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '48px',
        }}>
          📦
        </div>
      </Card.Header>
      <Card.Body>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>Premium Package</h3>
          <Badge variant="success">In Stock</Badge>
        </div>
        <p style={{ margin: '8px 0', color: '#666' }}>
          Everything you need to get started with our platform.
        </p>
        <p style={{ margin: '12px 0 0 0', fontSize: '24px', fontWeight: 700 }}>
          $99.00
        </p>
      </Card.Body>
      <Card.Footer>
        <Button kind="brand" fullWidth>Add to Cart</Button>
      </Card.Footer>
    </Card>
  ),
};

// Statistics Card
export const StatisticsCard: Story = {
  name: 'Statistics Card',
  render: () => (
    <Card variant="outlined">
      <Card.Body>
        <div style={{ marginBottom: '8px', color: '#666', fontSize: '14px' }}>Total Revenue</div>
        <div style={{ fontSize: '32px', fontWeight: 700, marginBottom: '4px' }}>$45,231.89</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#22c55e' }}>
          <span>↑ 20.1%</span>
          <span style={{ fontSize: '14px' }}>from last month</span>
        </div>
      </Card.Body>
    </Card>
  ),
};

// Notification Card
export const NotificationCard: Story = {
  name: 'Notification Card',
  render: () => (
    <Card>
      <Card.Body>
        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            background: '#3b82f6',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            flexShrink: 0,
          }}>
            🔔
          </div>
          <div style={{ flex: 1 }}>
            <h4 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: 600 }}>
              New message received
            </h4>
            <p style={{ margin: '0 0 8px 0', color: '#666', fontSize: '14px' }}>
              You have a new message from Sarah Johnson regarding the project proposal.
            </p>
            <span style={{ fontSize: '12px', color: '#999' }}>2 minutes ago</span>
          </div>
        </div>
      </Card.Body>
      <Card.Footer>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button kind="tertiary" size="small">Dismiss</Button>
          <Button kind="primary" size="small">View Message</Button>
        </div>
      </Card.Footer>
    </Card>
  ),
};

// Feature Card
export const FeatureCard: Story = {
  name: 'Feature Card',
  render: () => (
    <Card variant="outlined">
      <Card.Body>
        <div style={{
          width: '48px',
          height: '48px',
          background: '#f3f4f6',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          marginBottom: '16px',
        }}>
          ⚡
        </div>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: 600 }}>
          Fast Performance
        </h3>
        <p style={{ margin: 0, color: '#666', lineHeight: 1.6 }}>
          Lightning-fast load times and smooth interactions ensure the best user experience.
        </p>
      </Card.Body>
    </Card>
  ),
};

// All Variants Display
export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', width: '900px' }}>
      <Card variant="default">
        <Card.Body>
          <h4 style={{ margin: '0 0 8px 0' }}>Default</h4>
          <p style={{ margin: 0, color: '#666' }}>Default card style</p>
        </Card.Body>
      </Card>
      <Card variant="outlined">
        <Card.Body>
          <h4 style={{ margin: '0 0 8px 0' }}>Outlined</h4>
          <p style={{ margin: 0, color: '#666' }}>Card with border</p>
        </Card.Body>
      </Card>
      <Card variant="elevated">
        <Card.Body>
          <h4 style={{ margin: '0 0 8px 0' }}>Elevated</h4>
          <p style={{ margin: 0, color: '#666' }}>Card with shadow</p>
        </Card.Body>
      </Card>
    </div>
  ),
};

// Card Grid
export const CardGrid: Story = {
  name: 'Card Grid',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', width: '700px' }}>
      <Card variant="outlined">
        <Card.Body>
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>📄</div>
          <h4 style={{ margin: '0 0 4px 0', fontSize: '16px' }}>Documents</h4>
          <p style={{ margin: 0, fontSize: '24px', fontWeight: 600 }}>1,234</p>
        </Card.Body>
      </Card>
      <Card variant="outlined">
        <Card.Body>
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>✅</div>
          <h4 style={{ margin: '0 0 4px 0', fontSize: '16px' }}>Completed</h4>
          <p style={{ margin: 0, fontSize: '24px', fontWeight: 600 }}>856</p>
        </Card.Body>
      </Card>
      <Card variant="outlined">
        <Card.Body>
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>⏳</div>
          <h4 style={{ margin: '0 0 4px 0', fontSize: '16px' }}>Pending</h4>
          <p style={{ margin: 0, fontSize: '24px', fontWeight: 600 }}>378</p>
        </Card.Body>
      </Card>
      <Card variant="outlined">
        <Card.Body>
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>👥</div>
          <h4 style={{ margin: '0 0 4px 0', fontSize: '16px' }}>Users</h4>
          <p style={{ margin: 0, fontSize: '24px', fontWeight: 600 }}>2,456</p>
        </Card.Body>
      </Card>
    </div>
  ),
};

// Pricing Card
export const PricingCard: Story = {
  name: 'Pricing Card',
  render: () => (
    <Card variant="outlined">
      <Card.Header>
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '20px', fontWeight: 600 }}>Professional</h3>
          <div style={{ fontSize: '36px', fontWeight: 700 }}>
            $29<span style={{ fontSize: '18px', fontWeight: 400, color: '#666' }}>/month</span>
          </div>
        </div>
      </Card.Header>
      <Card.Body>
        <ul style={{ margin: 0, padding: '0 0 0 20px', lineHeight: 2 }}>
          <li>Unlimited projects</li>
          <li>Advanced analytics</li>
          <li>Priority support</li>
          <li>Custom integrations</li>
          <li>Team collaboration</li>
        </ul>
      </Card.Body>
      <Card.Footer>
        <Button kind="brand" fullWidth>Get Started</Button>
      </Card.Footer>
    </Card>
  ),
};

// Playground
export const Playground: Story = {
  args: {
    variant: 'default',
    children: (
      <>
        <Card.Header>
          <h3 style={{ margin: 0 }}>Card Title</h3>
        </Card.Header>
        <Card.Body>
          Card body content goes here. You can add any content you need.
        </Card.Body>
        <Card.Footer>
          <Button kind="primary">Action</Button>
        </Card.Footer>
      </>
    ),
  },
};
