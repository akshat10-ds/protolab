import type { Meta, StoryObj } from '@storybook/react';
import { ProgressBar } from './ProgressBar';

const meta: Meta<typeof ProgressBar> = {
  title: 'Feedback/ProgressBar',
  component: ProgressBar,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = {
  args: {
    value: 50,
  },
};

export const Small: Story = {
  args: {
    value: 65,
    size: 'small',
  },
};

export const Medium: Story = {
  args: {
    value: 65,
    size: 'medium',
  },
};

export const Large: Story = {
  args: {
    value: 65,
    size: 'large',
  },
};

export const Primary: Story = {
  args: {
    value: 75,
    variant: 'primary',
    size: 'medium',
  },
};

export const Success: Story = {
  args: {
    value: 100,
    variant: 'success',
    size: 'medium',
  },
};

export const Warning: Story = {
  args: {
    value: 60,
    variant: 'warning',
    size: 'medium',
  },
};

export const Error: Story = {
  args: {
    value: 30,
    variant: 'error',
    size: 'medium',
  },
};

export const WithLabel: Story = {
  args: {
    value: 75,
    showLabel: true,
  },
};

export const WithCustomLabel: Story = {
  args: {
    value: 45,
    showLabel: true,
    label: '45 / 100 tasks complete',
  },
};

export const LabelInside: Story = {
  args: {
    value: 75,
    showLabel: true,
    labelInside: true,
    size: 'large',
  },
};

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
    variant: 'primary',
  },
};

export const Striped: Story = {
  args: {
    value: 70,
    striped: true,
    size: 'medium',
  },
};

export const StripedAnimated: Story = {
  args: {
    value: 70,
    striped: true,
    animated: true,
    size: 'medium',
  },
};

export const Complete: Story = {
  args: {
    value: 100,
    variant: 'success',
    showLabel: true,
    label: 'Complete!',
  },
};

export const AlmostEmpty: Story = {
  args: {
    value: 5,
    variant: 'error',
    showLabel: true,
  },
};

export const MultipleVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h3 style={{ marginBottom: '8px', fontSize: '14px' }}>Primary - 25%</h3>
        <ProgressBar value={25} variant="primary" showLabel />
      </div>
      <div>
        <h3 style={{ marginBottom: '8px', fontSize: '14px' }}>Success - 50%</h3>
        <ProgressBar value={50} variant="success" showLabel />
      </div>
      <div>
        <h3 style={{ marginBottom: '8px', fontSize: '14px' }}>Warning - 75%</h3>
        <ProgressBar value={75} variant="warning" showLabel />
      </div>
      <div>
        <h3 style={{ marginBottom: '8px', fontSize: '14px' }}>Error - 90%</h3>
        <ProgressBar value={90} variant="error" showLabel />
      </div>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h3 style={{ marginBottom: '8px', fontSize: '14px' }}>Small</h3>
        <ProgressBar value={60} size="small" />
      </div>
      <div>
        <h3 style={{ marginBottom: '8px', fontSize: '14px' }}>Medium</h3>
        <ProgressBar value={60} size="medium" />
      </div>
      <div>
        <h3 style={{ marginBottom: '8px', fontSize: '14px' }}>Large</h3>
        <ProgressBar value={60} size="large" />
      </div>
    </div>
  ),
};
