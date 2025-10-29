import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown, DropdownItemProps } from './Dropdown';
import { Button } from '../../3-primitives/Button';

const meta: Meta<typeof Dropdown> = {
  title: 'Ink Design System/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

// Sample icons
const EditIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M11.333 2L14 4.667L5.333 13.333H2.667V10.667L11.333 2Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CopyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect
      x="5.333"
      y="5.333"
      width="8"
      height="8"
      rx="1"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M10.667 3.333H4C3.264 3.333 2.667 3.931 2.667 4.667V11.333"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const DeleteIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M2.667 4.667h10.666M6.667 7.333v4M9.333 7.333v4M10 4.667V2.667h-4v2M3.333 4.667h9.334v8.666a1 1 0 01-1 1H4.333a1 1 0 01-1-1V4.667z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ShareIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="12" cy="4" r="2" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="4" cy="8" r="2" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M6 7l4-2M6 9l4 2" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const basicItems: DropdownItemProps[] = [
  { label: 'Edit', onClick: () => console.log('Edit clicked') },
  { label: 'Duplicate', onClick: () => console.log('Duplicate clicked') },
  { label: 'Archive', onClick: () => console.log('Archive clicked') },
  { divider: true },
  { label: 'Delete', onClick: () => console.log('Delete clicked') },
];

export const Default: Story = {
  args: {
    items: basicItems,
    children: <Button>Actions</Button>,
  },
};

export const WithIcons: Story = {
  args: {
    items: [
      { label: 'Edit', icon: <EditIcon />, onClick: () => console.log('Edit') },
      { label: 'Copy', icon: <CopyIcon />, onClick: () => console.log('Copy') },
      { label: 'Share', icon: <ShareIcon />, onClick: () => console.log('Share') },
      { divider: true },
      { label: 'Delete', icon: <DeleteIcon />, onClick: () => console.log('Delete') },
    ],
    children: <Button>Menu with Icons</Button>,
  },
};

export const WithDescriptions: Story = {
  args: {
    items: [
      {
        label: 'Create Analysis',
        description: 'Analyze and autofill attributes on many documents',
        onClick: () => console.log('Create Analysis'),
      },
      {
        label: 'Create Mapping',
        description: 'Connect CLM attributes to AI models',
        onClick: () => console.log('Create Mapping'),
      },
      {
        label: 'Apply in Bulk',
        description: 'Upload CSV to apply attribute values',
        onClick: () => console.log('Apply in Bulk'),
      },
    ],
    children: <Button>Create</Button>,
  },
};

export const WithShortcuts: Story = {
  args: {
    items: [
      {
        label: 'Undo',
        icon: <EditIcon />,
        shortcut: 'Ctrl+Z',
        onClick: () => console.log('Undo'),
      },
      {
        label: 'Redo',
        icon: <EditIcon />,
        shortcut: 'Shift+Ctrl+Z',
        onClick: () => console.log('Redo'),
      },
      { divider: true },
      {
        label: 'Cut',
        shortcut: 'Ctrl+X',
        onClick: () => console.log('Cut'),
      },
      {
        label: 'Copy',
        icon: <CopyIcon />,
        shortcut: 'Ctrl+C',
        onClick: () => console.log('Copy'),
      },
      {
        label: 'Paste',
        shortcut: 'Ctrl+V',
        onClick: () => console.log('Paste'),
      },
    ],
    children: <Button>Edit</Button>,
  },
};

export const WithDisabledItems: Story = {
  args: {
    items: [
      { label: 'New File', onClick: () => console.log('New File') },
      { label: 'Open File', onClick: () => console.log('Open File') },
      { label: 'Save', disabled: true, onClick: () => console.log('Save') },
      { label: 'Save As', disabled: true, onClick: () => console.log('Save As') },
      { divider: true },
      { label: 'Exit', onClick: () => console.log('Exit') },
    ],
    children: <Button>File</Button>,
  },
};

export const PositionTop: Story = {
  args: {
    items: basicItems,
    position: 'top',
    children: <Button>Top Menu</Button>,
  },
};

export const PositionBottom: Story = {
  args: {
    items: basicItems,
    position: 'bottom',
    children: <Button>Bottom Menu</Button>,
  },
};

export const PositionLeft: Story = {
  args: {
    items: basicItems,
    position: 'left',
    children: <Button>Left Menu</Button>,
  },
};

export const PositionRight: Story = {
  args: {
    items: basicItems,
    position: 'right',
    children: <Button>Right Menu</Button>,
  },
};

export const AlignStart: Story = {
  args: {
    items: basicItems,
    position: 'bottom',
    align: 'start',
    children: <Button>Start Aligned</Button>,
  },
};

export const AlignCenter: Story = {
  args: {
    items: basicItems,
    position: 'bottom',
    align: 'center',
    children: <Button>Center Aligned</Button>,
  },
};

export const AlignEnd: Story = {
  args: {
    items: basicItems,
    position: 'bottom',
    align: 'end',
    children: <Button>End Aligned</Button>,
  },
};

export const LongList: Story = {
  args: {
    items: Array.from({ length: 20 }, (_, i) => ({
      label: `Item ${i + 1}`,
      onClick: () => console.log(`Item ${i + 1} clicked`),
    })),
    children: <Button>Long List</Button>,
  },
};

export const ControlledDropdown: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div style={{ display: 'flex', gap: 'var(--ink-spacing-3)', alignItems: 'center' }}>
        <Dropdown
          open={open}
          onOpenChange={setOpen}
          items={[
            { label: 'Profile', onClick: () => console.log('Profile') },
            { label: 'Settings', onClick: () => console.log('Settings') },
            { divider: true },
            {
              label: 'Sign Out',
              onClick: () => {
                console.log('Sign Out');
                setOpen(false);
              },
            },
          ]}
        >
          <Button>Account</Button>
        </Dropdown>
        <Button variant="tertiary" size="small" onClick={() => setOpen(!open)}>
          External Toggle
        </Button>
      </div>
    );
  },
};

export const ContextMenu: Story = {
  render: () => (
    <div
      style={{
        padding: 'var(--ink-spacing-8)',
        border: '2px dashed var(--ink-neutral-30)',
        borderRadius: 'var(--ink-radius-lg)',
        textAlign: 'center',
      }}
    >
      <Dropdown
        items={[
          { label: 'Cut', icon: <EditIcon />, shortcut: 'Ctrl+X' },
          { label: 'Copy', icon: <CopyIcon />, shortcut: 'Ctrl+C' },
          { label: 'Paste', shortcut: 'Ctrl+V' },
          { divider: true },
          { label: 'Select All', shortcut: 'Ctrl+A' },
        ]}
      >
        <button
          style={{
            padding: 'var(--ink-spacing-3) var(--ink-spacing-4)',
            border: '1px solid var(--ink-neutral-30)',
            borderRadius: 'var(--ink-radius-md)',
            background: 'var(--ink-white)',
            cursor: 'pointer',
          }}
        >
          Right-click Simulation
        </button>
      </Dropdown>
    </div>
  ),
};

export const KeepOpenOnClick: Story = {
  args: {
    items: [
      { label: 'Option 1', onClick: () => console.log('Option 1') },
      { label: 'Option 2', onClick: () => console.log('Option 2') },
      { label: 'Option 3', onClick: () => console.log('Option 3') },
    ],
    closeOnItemClick: false,
    children: <Button>Keep Open Menu</Button>,
  },
};

export const RichContent: Story = {
  args: {
    items: [
      {
        label: 'John Doe',
        description: 'john.doe@example.com',
        icon: (
          <div
            style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              backgroundColor: 'var(--ink-blue-40)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '10px',
              fontWeight: 'bold',
            }}
          >
            JD
          </div>
        ),
        onClick: () => console.log('Select user'),
      },
      {
        label: 'Jane Smith',
        description: 'jane.smith@example.com',
        icon: (
          <div
            style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              backgroundColor: 'var(--ink-green-40)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '10px',
              fontWeight: 'bold',
            }}
          >
            JS
          </div>
        ),
        onClick: () => console.log('Select user'),
      },
      {
        label: 'Bob Johnson',
        description: 'bob.johnson@example.com',
        icon: (
          <div
            style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              backgroundColor: 'var(--ink-red-40)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '10px',
              fontWeight: 'bold',
            }}
          >
            BJ
          </div>
        ),
        onClick: () => console.log('Select user'),
      },
    ],
    children: <Button>Assign To</Button>,
  },
};

export const MixedContent: Story = {
  args: {
    items: [
      { label: 'Dashboard', icon: <EditIcon /> },
      { label: 'Projects', icon: <CopyIcon /> },
      { divider: true },
      {
        label: 'Recent Files',
        description: 'Access your recently opened files',
        icon: <ShareIcon />,
      },
      {
        label: 'Favorites',
        description: 'View your starred items',
        icon: <EditIcon />,
        shortcut: 'Ctrl+F',
      },
      { divider: true },
      { label: 'Settings', icon: <EditIcon />, shortcut: 'Ctrl+,' },
      { label: 'Help', shortcut: 'F1' },
      { divider: true },
      { label: 'Sign Out', icon: <DeleteIcon />, disabled: false },
    ],
    children: <Button>Full Example</Button>,
  },
};
