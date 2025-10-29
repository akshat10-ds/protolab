import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';
import { Button } from '../../3-primitives/Button';

const meta: Meta<typeof Modal> = {
  title: 'Ink Design System/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Modal>;

// Helper component for interactive stories
const ModalWithTrigger = (args: React.ComponentProps<typeof Modal>) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal {...args} open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export const Default: Story = {
  render: (args) => <ModalWithTrigger {...args} />,
  args: {
    title: 'Modal Title',
    children: (
      <div>
        <p>This is a basic modal with a title, content, and footer.</p>
        <p>Click outside the modal or press ESC to close it.</p>
      </div>
    ),
    footer: (
      <>
        <Button kind="secondary">Cancel</Button>
        <Button kind="brand">Confirm</Button>
      </>
    ),
  },
};

export const Small: Story = {
  render: (args) => <ModalWithTrigger {...args} />,
  args: {
    title: 'Small Modal',
    size: 'small',
    children: (
      <div>
        <p>This is a small modal, suitable for simple confirmations or alerts.</p>
      </div>
    ),
    footer: (
      <>
        <Button kind="secondary">Cancel</Button>
        <Button kind="brand">OK</Button>
      </>
    ),
  },
};

export const Medium: Story = {
  render: (args) => <ModalWithTrigger {...args} />,
  args: {
    title: 'Medium Modal',
    size: 'medium',
    children: (
      <div>
        <p>This is a medium modal, the default size.</p>
        <p>It works well for most use cases like forms or detailed information.</p>
      </div>
    ),
    footer: (
      <>
        <Button kind="secondary">Cancel</Button>
        <Button kind="brand">Save</Button>
      </>
    ),
  },
};

export const Large: Story = {
  render: (args) => <ModalWithTrigger {...args} />,
  args: {
    title: 'Large Modal',
    size: 'large',
    children: (
      <div>
        <p>This is a large modal for content-heavy scenarios.</p>
        <p>Perfect for displaying tables, complex forms, or detailed content.</p>
        <div style={{ height: '200px', backgroundColor: 'var(--ink-neutral-10)', borderRadius: 'var(--ink-radius-md)', marginTop: 'var(--ink-spacing-4)' }} />
      </div>
    ),
    footer: (
      <>
        <Button kind="secondary">Cancel</Button>
        <Button kind="brand">Apply</Button>
      </>
    ),
  },
};

export const ScrollableContent: Story = {
  render: (args) => <ModalWithTrigger {...args} />,
  args: {
    title: 'Terms and Conditions',
    size: 'medium',
    children: (
      <div>
        <h3>Agreement Terms</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <h4>Section 1</h4>
        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        <h4>Section 2</h4>
        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
        <h4>Section 3</h4>
        <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <h4>Section 4</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <h4>Section 5</h4>
        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      </div>
    ),
    footer: (
      <>
        <Button kind="secondary">Decline</Button>
        <Button kind="brand">Accept</Button>
      </>
    ),
  },
};

export const NoFooter: Story = {
  render: (args) => <ModalWithTrigger {...args} />,
  args: {
    title: 'Information',
    children: (
      <div>
        <p>This modal has no footer. The close button in the header is the only way to close it.</p>
      </div>
    ),
  },
};

export const NoTitle: Story = {
  render: (args) => <ModalWithTrigger {...args} />,
  args: {
    children: (
      <div>
        <h3>Custom Header</h3>
        <p>This modal has no title prop, so it doesn't show the default header.</p>
        <p>You can create your own custom header within the children.</p>
      </div>
    ),
    footer: (
      <Button kind="brand">Close</Button>
    ),
  },
};

export const ConfirmationDialog: Story = {
  render: (args) => <ModalWithTrigger {...args} />,
  args: {
    title: 'Delete Document?',
    size: 'small',
    children: (
      <div>
        <p>Are you sure you want to delete this document? This action cannot be undone.</p>
      </div>
    ),
    footer: (
      <>
        <Button kind="secondary">Cancel</Button>
        <Button kind="danger">Delete</Button>
      </>
    ),
  },
};

export const FormModal: Story = {
  render: (args) => <ModalWithTrigger {...args} />,
  args: {
    title: 'Create New Project',
    size: 'medium',
    children: (
      <div>
        <div style={{ marginBottom: 'var(--ink-spacing-4)' }}>
          <label style={{ display: 'block', marginBottom: 'var(--ink-spacing-2)', fontWeight: 'var(--ink-font-weight-medium)' }}>
            Project Name
          </label>
          <input
            type="text"
            placeholder="Enter project name"
            style={{
              width: '100%',
              padding: 'var(--ink-spacing-3)',
              border: '1px solid var(--ink-neutral-30)',
              borderRadius: 'var(--ink-radius-md)',
              fontSize: 'var(--ink-font-size-sm)'
            }}
          />
        </div>
        <div style={{ marginBottom: 'var(--ink-spacing-4)' }}>
          <label style={{ display: 'block', marginBottom: 'var(--ink-spacing-2)', fontWeight: 'var(--ink-font-weight-medium)' }}>
            Description
          </label>
          <textarea
            placeholder="Enter description"
            rows={4}
            style={{
              width: '100%',
              padding: 'var(--ink-spacing-3)',
              border: '1px solid var(--ink-neutral-30)',
              borderRadius: 'var(--ink-radius-md)',
              fontSize: 'var(--ink-font-size-sm)',
              resize: 'vertical'
            }}
          />
        </div>
      </div>
    ),
    footer: (
      <>
        <Button kind="secondary">Cancel</Button>
        <Button kind="brand">Create Project</Button>
      </>
    ),
  },
};

export const NoBackdropClose: Story = {
  render: (args) => <ModalWithTrigger {...args} />,
  args: {
    title: 'Important Action',
    size: 'small',
    closeOnBackdropClick: false,
    children: (
      <div>
        <p>This modal cannot be closed by clicking the backdrop.</p>
        <p>You must use the close button or footer buttons.</p>
      </div>
    ),
    footer: (
      <Button variant="primary">Acknowledge</Button>
    ),
  },
};

export const NoEscapeClose: Story = {
  render: (args) => <ModalWithTrigger {...args} />,
  args: {
    title: 'Complete Required Action',
    size: 'small',
    closeOnEscape: false,
    closeOnBackdropClick: false,
    children: (
      <div>
        <p>This modal cannot be closed with ESC key or backdrop click.</p>
        <p>You must click the button below to proceed.</p>
      </div>
    ),
    footer: (
      <Button variant="primary">I Understand</Button>
    ),
  },
};
