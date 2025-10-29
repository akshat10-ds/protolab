import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Popover } from './Popover';
import { Button } from '../../3-primitives/Button';

const meta: Meta<typeof Popover> = {
  title: 'Ink Design System/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Popover>;

const SampleContent = () => (
  <div>
    <h4 style={{ margin: '0 0 var(--ink-spacing-2) 0', fontSize: 'var(--ink-font-size-md)' }}>
      Popover Title
    </h4>
    <p style={{ margin: '0 0 var(--ink-spacing-3) 0', color: 'var(--ink-neutral-60)' }}>
      This is a popover with custom content. It can contain any React elements.
    </p>
    <Button size="small" variant="primary">
      Action
    </Button>
  </div>
);

export const Default: Story = {
  args: {
    content: <SampleContent />,
    children: <Button>Click to open</Button>,
  },
};

export const Top: Story = {
  args: {
    content: <SampleContent />,
    position: 'top',
    children: <Button>Top popover</Button>,
  },
};

export const Bottom: Story = {
  args: {
    content: <SampleContent />,
    position: 'bottom',
    children: <Button>Bottom popover</Button>,
  },
};

export const Left: Story = {
  args: {
    content: <SampleContent />,
    position: 'left',
    children: <Button>Left popover</Button>,
  },
};

export const Right: Story = {
  args: {
    content: <SampleContent />,
    position: 'right',
    children: <Button>Right popover</Button>,
  },
};

export const NoArrow: Story = {
  args: {
    content: <SampleContent />,
    showArrow: false,
    children: <Button>No arrow</Button>,
  },
};

export const AlignStart: Story = {
  args: {
    content: (
      <div style={{ width: '200px' }}>
        <p style={{ margin: 0 }}>Aligned to start</p>
      </div>
    ),
    position: 'bottom',
    align: 'start',
    children: <Button>Start aligned</Button>,
  },
};

export const AlignCenter: Story = {
  args: {
    content: (
      <div style={{ width: '200px' }}>
        <p style={{ margin: 0 }}>Aligned to center</p>
      </div>
    ),
    position: 'bottom',
    align: 'center',
    children: <Button>Center aligned</Button>,
  },
};

export const AlignEnd: Story = {
  args: {
    content: (
      <div style={{ width: '200px' }}>
        <p style={{ margin: 0 }}>Aligned to end</p>
      </div>
    ),
    position: 'bottom',
    align: 'end',
    children: <Button>End aligned</Button>,
  },
};

export const SimpleContent: Story = {
  args: {
    content: (
      <p style={{ margin: 0 }}>
        A simple text popover
      </p>
    ),
    children: <Button>Simple popover</Button>,
  },
};

export const RichContent: Story = {
  args: {
    content: (
      <div style={{ minWidth: '300px' }}>
        <h4 style={{ margin: '0 0 var(--ink-spacing-3) 0' }}>Account Settings</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ink-spacing-2)' }}>
          <button
            style={{
              padding: 'var(--ink-spacing-2)',
              border: 'none',
              background: 'none',
              textAlign: 'left',
              cursor: 'pointer',
              borderRadius: 'var(--ink-radius-sm)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--ink-neutral-10)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            Profile
          </button>
          <button
            style={{
              padding: 'var(--ink-spacing-2)',
              border: 'none',
              background: 'none',
              textAlign: 'left',
              cursor: 'pointer',
              borderRadius: 'var(--ink-radius-sm)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--ink-neutral-10)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            Preferences
          </button>
          <button
            style={{
              padding: 'var(--ink-spacing-2)',
              border: 'none',
              background: 'none',
              textAlign: 'left',
              cursor: 'pointer',
              borderRadius: 'var(--ink-radius-sm)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--ink-neutral-10)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            Billing
          </button>
          <hr style={{ margin: 'var(--ink-spacing-2) 0', border: 'none', borderTop: '1px solid var(--ink-neutral-20)' }} />
          <button
            style={{
              padding: 'var(--ink-spacing-2)',
              border: 'none',
              background: 'none',
              textAlign: 'left',
              cursor: 'pointer',
              borderRadius: 'var(--ink-radius-sm)',
              color: 'var(--ink-red-60)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--ink-red-10)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            Sign Out
          </button>
        </div>
      </div>
    ),
    children: <Button>Account Menu</Button>,
  },
};

export const ControlledPopover: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div style={{ display: 'flex', gap: 'var(--ink-spacing-3)', alignItems: 'center' }}>
        <Popover
          open={open}
          onOpenChange={setOpen}
          content={
            <div>
              <p style={{ margin: '0 0 var(--ink-spacing-3) 0' }}>
                This is a controlled popover
              </p>
              <Button size="small" onClick={() => setOpen(false)}>
                Close
              </Button>
            </div>
          }
        >
          <Button>Toggle</Button>
        </Popover>
        <Button variant="tertiary" size="small" onClick={() => setOpen(!open)}>
          External Control
        </Button>
      </div>
    );
  },
};

export const FormInPopover: Story = {
  args: {
    content: (
      <div style={{ width: '280px' }}>
        <h4 style={{ margin: '0 0 var(--ink-spacing-3) 0' }}>Quick Add</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ink-spacing-3)' }}>
          <div>
            <label
              htmlFor="name"
              style={{
                display: 'block',
                marginBottom: 'var(--ink-spacing-1)',
                fontSize: 'var(--ink-font-size-sm)',
                fontWeight: 'var(--ink-font-weight-medium)',
              }}
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter name"
              style={{
                width: '100%',
                padding: 'var(--ink-spacing-2)',
                border: '1px solid var(--ink-neutral-30)',
                borderRadius: 'var(--ink-radius-md)',
                fontSize: 'var(--ink-font-size-sm)',
              }}
            />
          </div>
          <div>
            <label
              htmlFor="email"
              style={{
                display: 'block',
                marginBottom: 'var(--ink-spacing-1)',
                fontSize: 'var(--ink-font-size-sm)',
                fontWeight: 'var(--ink-font-weight-medium)',
              }}
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter email"
              style={{
                width: '100%',
                padding: 'var(--ink-spacing-2)',
                border: '1px solid var(--ink-neutral-30)',
                borderRadius: 'var(--ink-radius-md)',
                fontSize: 'var(--ink-font-size-sm)',
              }}
            />
          </div>
          <div style={{ display: 'flex', gap: 'var(--ink-spacing-2)', justifyContent: 'flex-end' }}>
            <Button size="small" variant="tertiary">
              Cancel
            </Button>
            <Button size="small" variant="primary">
              Add
            </Button>
          </div>
        </div>
      </div>
    ),
    children: <Button>Add Contact</Button>,
  },
};

export const AllPositions: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 'var(--ink-spacing-8)',
        padding: 'var(--ink-spacing-12)',
      }}
    >
      <div style={{ gridColumn: '2', textAlign: 'center' }}>
        <Popover
          content={<p style={{ margin: 0 }}>Top position</p>}
          position="top"
        >
          <Button>Top</Button>
        </Popover>
      </div>

      <div style={{ gridColumn: '1', textAlign: 'center' }}>
        <Popover
          content={<p style={{ margin: 0 }}>Left position</p>}
          position="left"
        >
          <Button>Left</Button>
        </Popover>
      </div>

      <div style={{ gridColumn: '2', textAlign: 'center' }}>
        <Popover
          content={<p style={{ margin: 0 }}>Center element</p>}
          position="bottom"
        >
          <Button variant="primary">Center</Button>
        </Popover>
      </div>

      <div style={{ gridColumn: '3', textAlign: 'center' }}>
        <Popover
          content={<p style={{ margin: 0 }}>Right position</p>}
          position="right"
        >
          <Button>Right</Button>
        </Popover>
      </div>

      <div style={{ gridColumn: '2', textAlign: 'center' }}>
        <Popover
          content={<p style={{ margin: 0 }}>Bottom position</p>}
          position="bottom"
        >
          <Button>Bottom</Button>
        </Popover>
      </div>
    </div>
  ),
};
