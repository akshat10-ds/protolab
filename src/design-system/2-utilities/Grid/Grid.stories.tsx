import type { Meta, StoryObj } from '@storybook/react';
import { Grid } from './Grid';

const meta = {
  title: 'Ink Design System/Grid',
  component: Grid,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Official DocuSign Ink Grid component - responsive grid layout for arranging elements.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    columns: {
      control: 'select',
      options: [1, 2, 3, 4, 6, 'auto'],
      description: 'Number of columns or auto-fit',
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
      options: ['start', 'center', 'end', 'stretch'],
      description: 'Justify items',
    },
  },
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

const Box = ({ children, ...props }: any) => (
  <div style={{ padding: '20px', background: '#e0e7ff', borderRadius: '4px', textAlign: 'center', ...props }}>
    {children}
  </div>
);

// Auto Grid (Default)
export const Auto: Story = {
  args: {
    columns: 'auto',
    gap: 'medium',
    style: { width: '700px' },
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

// 2 Columns
export const TwoColumns: Story = {
  args: {
    columns: 2,
    gap: 'medium',
    style: { width: '600px' },
    children: (
      <>
        <Box>Item 1</Box>
        <Box>Item 2</Box>
        <Box>Item 3</Box>
        <Box>Item 4</Box>
      </>
    ),
  },
};

// 3 Columns
export const ThreeColumns: Story = {
  args: {
    columns: 3,
    gap: 'medium',
    style: { width: '700px' },
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

// 4 Columns
export const FourColumns: Story = {
  args: {
    columns: 4,
    gap: 'medium',
    style: { width: '800px' },
    children: (
      <>
        <Box>Item 1</Box>
        <Box>Item 2</Box>
        <Box>Item 3</Box>
        <Box>Item 4</Box>
        <Box>Item 5</Box>
        <Box>Item 6</Box>
        <Box>Item 7</Box>
        <Box>Item 8</Box>
      </>
    ),
  },
};

// No Gap
export const NoGap: Story = {
  args: {
    columns: 3,
    gap: 'none',
    style: { width: '600px' },
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

// Small Gap
export const SmallGap: Story = {
  args: {
    columns: 3,
    gap: 'small',
    style: { width: '600px' },
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

// Medium Gap
export const MediumGap: Story = {
  args: {
    columns: 3,
    gap: 'medium',
    style: { width: '600px' },
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

// Large Gap
export const LargeGap: Story = {
  args: {
    columns: 3,
    gap: 'large',
    style: { width: '700px' },
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

// Product Grid
export const ProductGrid: Story = {
  name: 'Product Grid',
  render: () => (
    <Grid columns={3} gap="large" style={{ width: '800px' }}>
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
          <div style={{ height: '200px', background: `linear-gradient(135deg, ${i % 2 === 0 ? '#667eea' : '#764ba2'} 0%, ${i % 2 === 0 ? '#764ba2' : '#f093fb'} 100%)` }} />
          <div style={{ padding: '16px' }}>
            <h4 style={{ margin: '0 0 8px 0' }}>Product {i}</h4>
            <p style={{ margin: '0 0 12px 0', color: '#666', fontSize: '14px' }}>
              Description of product {i}
            </p>
            <div style={{ fontSize: '20px', fontWeight: 700 }}>
              ${(i * 10 + 49).toFixed(2)}
            </div>
          </div>
        </div>
      ))}
    </Grid>
  ),
};

// Feature Grid
export const FeatureGrid: Story = {
  name: 'Feature Grid',
  render: () => (
    <Grid columns={3} gap="medium" style={{ width: '800px' }}>
      {[
        { icon: '⚡', title: 'Fast Performance', description: 'Lightning-fast load times' },
        { icon: '🔒', title: 'Secure', description: 'Enterprise-grade security' },
        { icon: '📱', title: 'Responsive', description: 'Works on all devices' },
        { icon: '🎨', title: 'Customizable', description: 'Fully customizable design' },
        { icon: '🚀', title: 'Scalable', description: 'Grows with your business' },
        { icon: '💡', title: 'Intuitive', description: 'Easy to use interface' },
      ].map((feature, i) => (
        <div key={i} style={{ padding: '24px', border: '1px solid #e5e7eb', borderRadius: '8px', textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>{feature.icon}</div>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>{feature.title}</h4>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>{feature.description}</p>
        </div>
      ))}
    </Grid>
  ),
};

// Stats Dashboard
export const StatsDashboard: Story = {
  name: 'Stats Dashboard',
  render: () => (
    <Grid columns={4} gap="medium" style={{ width: '900px' }}>
      {[
        { label: 'Total Users', value: '12,345', change: '+12%', color: '#3b82f6' },
        { label: 'Revenue', value: '$98,765', change: '+8%', color: '#10b981' },
        { label: 'Orders', value: '3,456', change: '+23%', color: '#f59e0b' },
        { label: 'Conversion', value: '3.2%', change: '-2%', color: '#ef4444' },
      ].map((stat, i) => (
        <div key={i} style={{ padding: '20px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
          <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>{stat.label}</div>
          <div style={{ fontSize: '28px', fontWeight: 700, marginBottom: '4px' }}>{stat.value}</div>
          <div style={{ fontSize: '14px', color: stat.color }}>{stat.change}</div>
        </div>
      ))}
    </Grid>
  ),
};

// Team Members
export const TeamMembers: Story = {
  name: 'Team Members',
  render: () => (
    <Grid columns={4} gap="large" style={{ width: '900px' }}>
      {[
        { name: 'Sarah Johnson', role: 'CEO', initials: 'SJ' },
        { name: 'Mike Chen', role: 'CTO', initials: 'MC' },
        { name: 'Emily Davis', role: 'Designer', initials: 'ED' },
        { name: 'Tom Wilson', role: 'Developer', initials: 'TW' },
        { name: 'Lisa Brown', role: 'Marketing', initials: 'LB' },
        { name: 'John Smith', role: 'Sales', initials: 'JS' },
        { name: 'Kate Lee', role: 'Support', initials: 'KL' },
        { name: 'David Park', role: 'Product', initials: 'DP' },
      ].map((member, i) => (
        <div key={i} style={{ textAlign: 'center', padding: '20px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
          <div style={{
            width: '80px',
            height: '80px',
            margin: '0 auto 12px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '24px',
            fontWeight: 600,
          }}>
            {member.initials}
          </div>
          <h4 style={{ margin: '0 0 4px 0', fontSize: '16px' }}>{member.name}</h4>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>{member.role}</p>
        </div>
      ))}
    </Grid>
  ),
};

// Image Gallery
export const ImageGallery: Story = {
  name: 'Image Gallery',
  render: () => (
    <Grid columns="auto" gap="small" style={{ width: '800px' }}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
        <div
          key={i}
          style={{
            height: '200px',
            background: `linear-gradient(135deg, hsl(${i * 40}, 70%, 60%) 0%, hsl(${i * 40 + 40}, 70%, 50%) 100%)`,
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '48px',
            fontWeight: 700,
          }}
        >
          {i}
        </div>
      ))}
    </Grid>
  ),
};

// Pricing Cards
export const PricingCards: Story = {
  name: 'Pricing Cards',
  render: () => (
    <Grid columns={3} gap="large" style={{ width: '900px' }}>
      {[
        { name: 'Basic', price: '$9', features: ['10 Projects', '5GB Storage', 'Email Support'] },
        { name: 'Pro', price: '$29', features: ['Unlimited Projects', '50GB Storage', 'Priority Support', 'Advanced Analytics'], highlight: true },
        { name: 'Enterprise', price: '$99', features: ['Unlimited Everything', 'Dedicated Support', 'Custom Integration', 'SLA'] },
      ].map((plan, i) => (
        <div
          key={i}
          style={{
            padding: '32px',
            border: plan.highlight ? '2px solid #3b82f6' : '1px solid #e5e7eb',
            borderRadius: '8px',
            background: plan.highlight ? '#f0f9ff' : 'white',
          }}
        >
          <h3 style={{ margin: '0 0 8px 0', fontSize: '20px' }}>{plan.name}</h3>
          <div style={{ fontSize: '36px', fontWeight: 700, marginBottom: '20px' }}>
            {plan.price}<span style={{ fontSize: '18px', fontWeight: 400, color: '#666' }}>/mo</span>
          </div>
          <ul style={{ margin: '0 0 24px 0', padding: '0 0 0 20px', lineHeight: 2 }}>
            {plan.features.map((feature, j) => (
              <li key={j}>{feature}</li>
            ))}
          </ul>
          <button
            style={{
              width: '100%',
              padding: '12px',
              background: plan.highlight ? '#3b82f6' : '#f3f4f6',
              color: plan.highlight ? 'white' : '#1f2937',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 600,
            }}
          >
            Choose Plan
          </button>
        </div>
      ))}
    </Grid>
  ),
};

// Blog Posts
export const BlogPosts: Story = {
  name: 'Blog Posts',
  render: () => (
    <Grid columns={2} gap="large" style={{ width: '800px' }}>
      {[
        { title: 'Getting Started with Design Systems', date: 'Jan 15, 2024', category: 'Design' },
        { title: 'Building Scalable React Applications', date: 'Jan 12, 2024', category: 'Development' },
        { title: 'UX Best Practices for 2024', date: 'Jan 10, 2024', category: 'UX' },
        { title: 'The Future of Web Development', date: 'Jan 8, 2024', category: 'Development' },
      ].map((post, i) => (
        <div key={i} style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
          <div style={{ height: '200px', background: `linear-gradient(135deg, hsl(${i * 60}, 70%, 60%) 0%, hsl(${i * 60 + 30}, 70%, 50%) 100%)` }} />
          <div style={{ padding: '20px' }}>
            <div style={{ display: 'inline-block', padding: '4px 12px', background: '#e0e7ff', color: '#3730a3', borderRadius: '12px', fontSize: '12px', marginBottom: '8px' }}>
              {post.category}
            </div>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>{post.title}</h3>
            <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>{post.date}</p>
          </div>
        </div>
      ))}
    </Grid>
  ),
};

// Responsive Grid
export const ResponsiveGrid: Story = {
  name: 'Responsive Grid',
  render: () => (
    <div style={{ width: '900px' }}>
      <h3 style={{ margin: '0 0 16px 0' }}>Auto-fit Grid (Resize to see responsiveness)</h3>
      <Grid columns="auto" gap="medium">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <Box key={i}>Item {i}</Box>
        ))}
      </Grid>
    </div>
  ),
};

// Playground
export const Playground: Story = {
  args: {
    columns: 3,
    gap: 'medium',
    align: 'stretch',
    justify: 'stretch',
    style: { width: '700px' },
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
