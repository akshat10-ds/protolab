import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';
import { Button } from '../Button';

const meta: Meta<typeof Tooltip> = {
  title: 'Ink Design System/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    content: 'This is a helpful tooltip',
    children: <Button>Hover me</Button>,
  },
};

export const Top: Story = {
  args: {
    content: 'Tooltip appears on top',
    position: 'top',
    children: <Button>Hover for top tooltip</Button>,
  },
};

export const Bottom: Story = {
  args: {
    content: 'Tooltip appears on bottom',
    position: 'bottom',
    children: <Button>Hover for bottom tooltip</Button>,
  },
};

export const Left: Story = {
  args: {
    content: 'Tooltip appears on left',
    position: 'left',
    children: <Button>Hover for left tooltip</Button>,
  },
};

export const Right: Story = {
  args: {
    content: 'Tooltip appears on right',
    position: 'right',
    children: <Button>Hover for right tooltip</Button>,
  },
};

export const LongContent: Story = {
  args: {
    content: 'This is a much longer tooltip with more detailed information that wraps to multiple lines',
    position: 'top',
    children: <Button>Hover for long tooltip</Button>,
  },
};

export const CustomDelay: Story = {
  args: {
    content: 'This tooltip appears after 1 second',
    delay: 1000,
    children: <Button>Hover (1s delay)</Button>,
  },
};

export const NoDelay: Story = {
  args: {
    content: 'This tooltip appears instantly',
    delay: 0,
    children: <Button>Hover (instant)</Button>,
  },
};

export const Disabled: Story = {
  args: {
    content: 'You should not see this',
    disabled: true,
    children: <Button>Hover (disabled tooltip)</Button>,
  },
};

export const OnIcon: Story = {
  render: () => (
    <Tooltip content="Information about this feature" position="top">
      <button
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 'var(--ink-spacing-2)',
          borderRadius: 'var(--ink-radius-sm)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="var(--ink-neutral-60)">
          <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <path d="M10 6v4M10 13v1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </Tooltip>
  ),
};

export const OnInput: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ink-spacing-2)' }}>
      <label htmlFor="username">Username:</label>
      <Tooltip content="Must be 3-20 characters, letters and numbers only" position="right">
        <input
          id="username"
          type="text"
          placeholder="Enter username"
          style={{
            padding: 'var(--ink-spacing-2) var(--ink-spacing-3)',
            border: '1px solid var(--ink-neutral-30)',
            borderRadius: 'var(--ink-radius-md)',
            fontSize: 'var(--ink-font-size-sm)',
          }}
        />
      </Tooltip>
    </div>
  ),
};

export const AllPositions: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 'var(--ink-spacing-8)',
        padding: 'var(--ink-spacing-10)',
      }}
    >
      <div style={{ gridColumn: '2', textAlign: 'center' }}>
        <Tooltip content="Top position" position="top">
          <Button>Top</Button>
        </Tooltip>
      </div>

      <div style={{ gridColumn: '1', textAlign: 'center' }}>
        <Tooltip content="Left position" position="left">
          <Button>Left</Button>
        </Tooltip>
      </div>

      <div style={{ gridColumn: '2', textAlign: 'center' }}>
        <Tooltip content="Center element" position="bottom">
          <Button variant="primary">Center</Button>
        </Tooltip>
      </div>

      <div style={{ gridColumn: '3', textAlign: 'center' }}>
        <Tooltip content="Right position" position="right">
          <Button>Right</Button>
        </Tooltip>
      </div>

      <div style={{ gridColumn: '2', textAlign: 'center' }}>
        <Tooltip content="Bottom position" position="bottom">
          <Button>Bottom</Button>
        </Tooltip>
      </div>
    </div>
  ),
};

export const InlineElements: Story = {
  render: () => (
    <p style={{ maxWidth: '500px' }}>
      Here is some text with{' '}
      <Tooltip content="This is an inline tooltip" position="top">
        <span
          style={{
            color: 'var(--ink-blue-60)',
            textDecoration: 'underline',
            cursor: 'help',
          }}
        >
          a tooltip
        </span>
      </Tooltip>{' '}
      embedded in it. You can also have{' '}
      <Tooltip content="Another helpful explanation" position="bottom">
        <span
          style={{
            color: 'var(--ink-blue-60)',
            textDecoration: 'underline',
            cursor: 'help',
          }}
        >
          multiple tooltips
        </span>
      </Tooltip>{' '}
      in the same paragraph.
    </p>
  ),
};

export const WithKeyboardFocus: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--ink-spacing-3)' }}>
      <Tooltip content="First button tooltip">
        <Button>Tab to me</Button>
      </Tooltip>
      <Tooltip content="Second button tooltip">
        <Button variant="primary">Then here</Button>
      </Tooltip>
      <Tooltip content="Third button tooltip">
        <Button variant="tertiary">And here</Button>
      </Tooltip>
    </div>
  ),
};
