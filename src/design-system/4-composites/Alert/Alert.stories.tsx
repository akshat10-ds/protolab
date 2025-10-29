import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';
import { useState } from 'react';

const meta = {
  title: 'Ink Design System/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Official DocuSign Ink Alert component - displays contextual feedback messages to users.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
      description: 'Alert variant/type',
    },
    title: {
      control: 'text',
      description: 'Optional title for the alert',
    },
    onClose: {
      description: 'Callback when close button is clicked (makes alert dismissible)',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '600px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

// Info Variant
export const Info: Story = {
  args: {
    variant: 'info',
    children: 'This is an informational message to help guide the user.',
  },
};

// Success Variant
export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Your changes have been saved successfully!',
  },
};

// Warning Variant
export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Please review your information before proceeding.',
  },
};

// Error Variant
export const Error: Story = {
  args: {
    variant: 'error',
    children: 'An error occurred while processing your request.',
  },
};

// With Title - Info
export const InfoWithTitle: Story = {
  args: {
    variant: 'info',
    title: 'Information',
    children: 'We have updated our privacy policy. Please review the changes.',
  },
};

// With Title - Success
export const SuccessWithTitle: Story = {
  args: {
    variant: 'success',
    title: 'Success!',
    children: 'Your profile has been updated successfully.',
  },
};

// With Title - Warning
export const WarningWithTitle: Story = {
  args: {
    variant: 'warning',
    title: 'Warning',
    children: 'Your subscription will expire in 3 days. Please renew to avoid interruption.',
  },
};

// With Title - Error
export const ErrorWithTitle: Story = {
  args: {
    variant: 'error',
    title: 'Error',
    children: 'Failed to save changes. Please check your internet connection and try again.',
  },
};

// Dismissible Alert
export const Dismissible: Story = {
  render: () => {
    const [visible, setVisible] = useState(true);

    if (!visible) {
      return (
        <button
          onClick={() => setVisible(true)}
          style={{
            padding: '8px 16px',
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Show Alert
        </button>
      );
    }

    return (
      <Alert
        variant="info"
        title="Dismissible Alert"
        onClose={() => setVisible(false)}
      >
        This alert can be dismissed by clicking the close button.
      </Alert>
    );
  },
};

// All Variants
export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '600px' }}>
      <Alert variant="info">
        This is an informational message to help guide the user.
      </Alert>
      <Alert variant="success">
        Your changes have been saved successfully!
      </Alert>
      <Alert variant="warning">
        Please review your information before proceeding.
      </Alert>
      <Alert variant="error">
        An error occurred while processing your request.
      </Alert>
    </div>
  ),
};

// All Variants with Titles
export const AllVariantsWithTitles: Story = {
  name: 'All Variants with Titles',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '600px' }}>
      <Alert variant="info" title="Information">
        We have updated our privacy policy. Please review the changes.
      </Alert>
      <Alert variant="success" title="Success!">
        Your profile has been updated successfully.
      </Alert>
      <Alert variant="warning" title="Warning">
        Your subscription will expire in 3 days. Please renew to avoid interruption.
      </Alert>
      <Alert variant="error" title="Error">
        Failed to save changes. Please check your internet connection and try again.
      </Alert>
    </div>
  ),
};

// All Variants Dismissible
export const AllVariantsDismissible: Story = {
  name: 'All Variants Dismissible',
  render: () => {
    const [alerts, setAlerts] = useState({
      info: true,
      success: true,
      warning: true,
      error: true,
    });

    const handleClose = (key: keyof typeof alerts) => {
      setAlerts(prev => ({ ...prev, [key]: false }));
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '600px' }}>
        {alerts.info && (
          <Alert variant="info" title="Information" onClose={() => handleClose('info')}>
            We have updated our privacy policy. Please review the changes.
          </Alert>
        )}
        {alerts.success && (
          <Alert variant="success" title="Success!" onClose={() => handleClose('success')}>
            Your profile has been updated successfully.
          </Alert>
        )}
        {alerts.warning && (
          <Alert variant="warning" title="Warning" onClose={() => handleClose('warning')}>
            Your subscription will expire in 3 days.
          </Alert>
        )}
        {alerts.error && (
          <Alert variant="error" title="Error" onClose={() => handleClose('error')}>
            Failed to save changes. Please try again.
          </Alert>
        )}
        {!Object.values(alerts).some(v => v) && (
          <button
            onClick={() => setAlerts({ info: true, success: true, warning: true, error: true })}
            style={{
              padding: '12px',
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            Reset All Alerts
          </button>
        )}
      </div>
    );
  },
};

// Long Content
export const LongContent: Story = {
  args: {
    variant: 'info',
    title: 'Important Information',
    children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  },
};

// Real World Examples
export const RealWorldExamples: Story = {
  name: 'Real World Examples',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '600px' }}>
      <Alert variant="success" title="Document Signed">
        The document "Annual Report 2024.pdf" has been successfully signed by all parties.
      </Alert>

      <Alert variant="warning" title="Action Required">
        You have 3 pending documents that require your signature before the deadline.
      </Alert>

      <Alert variant="error" title="Upload Failed">
        Failed to upload "contract.pdf". The file size exceeds the 10MB limit. Please compress the file and try again.
      </Alert>

      <Alert variant="info" title="New Feature Available">
        We've added bulk signing capabilities! You can now sign multiple documents at once.
      </Alert>
    </div>
  ),
};

// Form Validation Alerts
export const FormValidationAlerts: Story = {
  name: 'Form Validation',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '600px' }}>
      <Alert variant="error" title="Validation Error">
        Please fix the following errors before submitting:
        <ul style={{ margin: '8px 0 0 0', paddingLeft: '20px' }}>
          <li>Email address is required</li>
          <li>Password must be at least 8 characters</li>
          <li>Please accept the terms and conditions</li>
        </ul>
      </Alert>

      <Alert variant="success" title="Form Submitted">
        Your information has been submitted successfully. We'll get back to you within 24 hours.
      </Alert>
    </div>
  ),
};

// System Status Alerts
export const SystemStatusAlerts: Story = {
  name: 'System Status',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '600px' }}>
      <Alert variant="warning" title="Scheduled Maintenance">
        System maintenance is scheduled for tonight at 11:00 PM PST. Expected downtime: 2 hours.
      </Alert>

      <Alert variant="error" title="Service Disruption">
        We're experiencing technical difficulties. Our team is working to resolve the issue.
      </Alert>

      <Alert variant="success" title="All Systems Operational">
        All services are running smoothly. No issues detected.
      </Alert>
    </div>
  ),
};

// Notification Stack
export const NotificationStack: Story = {
  name: 'Notification Stack',
  render: () => {
    const [notifications, setNotifications] = useState([
      { id: 1, variant: 'success' as const, title: 'Payment received', message: 'Your payment of $99.00 has been processed.' },
      { id: 2, variant: 'info' as const, title: 'New message', message: 'You have a new message from Sarah Johnson.' },
      { id: 3, variant: 'warning' as const, title: 'Storage almost full', message: 'You are using 90% of your storage space.' },
    ]);

    const handleClose = (id: number) => {
      setNotifications(notifications.filter(n => n.id !== id));
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '600px' }}>
        {notifications.map(notification => (
          <Alert
            key={notification.id}
            variant={notification.variant}
            title={notification.title}
            onClose={() => handleClose(notification.id)}
          >
            {notification.message}
          </Alert>
        ))}
        {notifications.length === 0 && (
          <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
            No notifications
          </div>
        )}
      </div>
    );
  },
};

// Playground
export const Playground: Story = {
  args: {
    variant: 'info',
    title: 'Alert Title',
    children: 'This is the alert message content.',
  },
};
