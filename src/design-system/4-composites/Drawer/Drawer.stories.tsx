import type { Meta, StoryObj } from '@storybook/react';
import { Drawer } from './Drawer';
import { Button } from '../../3-primitives/Button';
import { Input } from '../../3-primitives/Input';
import { Select } from '../../3-primitives/Select';
import { Stack } from '../../2-utilities/Stack';
import { Text } from '../../3-primitives/Typography';
import { Badge } from '../../3-primitives/Badge';
import { useState } from 'react';

const meta = {
  title: 'Ink Design System/Drawer',
  component: Drawer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Sliding panel drawer component for displaying content in an overlay.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

// Helper component for interactive demos
const DrawerDemo = ({
  position = 'right' as any,
  size = 'medium' as any,
  ...props
}: Partial<React.ComponentProps<typeof Drawer>>) => {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ padding: '20px' }}>
      <Button onClick={() => setOpen(true)}>
        Open {position} Drawer
      </Button>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        position={position}
        size={size}
        title="Drawer Title"
        {...props}
      >
        <Stack gap="large">
          <Text>This is a drawer component that slides in from the {position}.</Text>
          <Text>It can contain any content you need, including forms, information, or interactive elements.</Text>
        </Stack>
      </Drawer>
    </div>
  );
};

// Basic Examples
export const Default: Story = {
  render: () => <DrawerDemo />,
};

export const LeftPosition: Story = {
  render: () => <DrawerDemo position="left" />,
};

export const TopPosition: Story = {
  render: () => <DrawerDemo position="top" />,
};

export const BottomPosition: Story = {
  render: () => <DrawerDemo position="bottom" />,
};

// Size Variants
export const SmallSize: Story = {
  render: () => <DrawerDemo size="small" />,
};

export const LargeSize: Story = {
  render: () => <DrawerDemo size="large" />,
};

export const FullSize: Story = {
  render: () => <DrawerDemo size="full" />,
};

export const CustomSize: Story = {
  render: () => <DrawerDemo customSize="500px" />,
};

// With Form Content
export const WithForm: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div style={{ padding: '20px' }}>
        <Button onClick={() => setOpen(true)}>Open Form Drawer</Button>
        <Drawer
          open={open}
          onClose={() => setOpen(false)}
          title="Edit Profile"
          footer={
            <Stack direction="horizontal" gap="medium" justify="end">
              <Button kind="tertiary" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button kind="primary" onClick={() => setOpen(false)}>
                Save Changes
              </Button>
            </Stack>
          }
        >
          <Stack gap="large">
            <Input label="First Name" defaultValue="John" required />
            <Input label="Last Name" defaultValue="Doe" required />
            <Input label="Email" type="email" defaultValue="john.doe@example.com" required />
            <Select label="Department" required>
              <option value="">Select a department</option>
              <option value="eng">Engineering</option>
              <option value="sales">Sales</option>
              <option value="marketing">Marketing</option>
            </Select>
            <Input label="Bio" type="textarea" rows={4} placeholder="Tell us about yourself..." />
          </Stack>
        </Drawer>
      </div>
    );
  },
};

// With Custom Header Actions
export const WithHeaderActions: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div style={{ padding: '20px' }}>
        <Button onClick={() => setOpen(true)}>Open Drawer with Actions</Button>
        <Drawer
          open={open}
          onClose={() => setOpen(false)}
          title="Document Details"
          headerActions={
            <>
              <Badge variant="success">Active</Badge>
              <Button size="small" kind="tertiary">Edit</Button>
            </>
          }
        >
          <Stack gap="large">
            <Text>Document content and details would appear here.</Text>
          </Stack>
        </Drawer>
      </div>
    );
  },
};

// No Overlay
export const NoOverlay: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div style={{ padding: '20px' }}>
        <Stack gap="large">
          <Button onClick={() => setOpen(true)}>Open Drawer without Overlay</Button>
          <Text>The page content remains interactive when the drawer is open.</Text>
          <Input label="Test Input" placeholder="You can still interact with this..." />
        </Stack>
        <Drawer
          open={open}
          onClose={() => setOpen(false)}
          title="No Overlay Drawer"
          overlay={false}
        >
          <Text>This drawer appears without a backdrop overlay.</Text>
        </Drawer>
      </div>
    );
  },
};

// Prevent Close on Overlay Click
export const NoOverlayClose: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div style={{ padding: '20px' }}>
        <Button onClick={() => setOpen(true)}>Open Persistent Drawer</Button>
        <Drawer
          open={open}
          onClose={() => setOpen(false)}
          title="Persistent Drawer"
          closeOnOverlayClick={false}
          closeOnEscape={false}
        >
          <Stack gap="large">
            <Text>This drawer cannot be closed by clicking the overlay or pressing Escape.</Text>
            <Text>Use the close button or complete the action to dismiss.</Text>
          </Stack>
        </Drawer>
      </div>
    );
  },
};

// Without Close Button
export const NoCloseButton: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div style={{ padding: '20px' }}>
        <Button onClick={() => setOpen(true)}>Open Drawer</Button>
        <Drawer
          open={open}
          onClose={() => setOpen(false)}
          title="No Close Button"
          showCloseButton={false}
          footer={
            <Button fullWidth onClick={() => setOpen(false)}>
              Close Drawer
            </Button>
          }
        >
          <Text>This drawer has no close button in the header.</Text>
        </Drawer>
      </div>
    );
  },
};

// Complex Content Example
export const ComplexContent: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div style={{ padding: '20px' }}>
        <Button onClick={() => setOpen(true)}>Open Settings Drawer</Button>
        <Drawer
          open={open}
          onClose={() => setOpen(false)}
          title="Settings"
          size="large"
          footer={
            <Stack direction="horizontal" gap="medium" justify="space-between">
              <Button kind="tertiary">Reset to Defaults</Button>
              <Stack direction="horizontal" gap="medium">
                <Button kind="secondary" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button kind="primary">Apply Settings</Button>
              </Stack>
            </Stack>
          }
        >
          <Stack gap="xlarge">
            <Stack gap="medium">
              <Text style={{ fontWeight: 600 }}>General Settings</Text>
              <Input label="Application Name" defaultValue="My App" />
              <Select label="Theme">
                <option>Light</option>
                <option>Dark</option>
                <option>Auto</option>
              </Select>
            </Stack>

            <Stack gap="medium">
              <Text style={{ fontWeight: 600 }}>Notifications</Text>
              <Input label="Email Notifications" type="checkbox" defaultChecked />
              <Input label="Push Notifications" type="checkbox" />
              <Input label="SMS Alerts" type="checkbox" />
            </Stack>

            <Stack gap="medium">
              <Text style={{ fontWeight: 600 }}>Privacy</Text>
              <Select label="Profile Visibility">
                <option>Public</option>
                <option>Friends Only</option>
                <option>Private</option>
              </Select>
              <Input label="Show Online Status" type="checkbox" defaultChecked />
            </Stack>
          </Stack>
        </Drawer>
      </div>
    );
  },
};

// Multiple Drawers
export const NestedDrawers: Story = {
  render: () => {
    const [firstOpen, setFirstOpen] = useState(false);
    const [secondOpen, setSecondOpen] = useState(false);

    return (
      <div style={{ padding: '20px' }}>
        <Button onClick={() => setFirstOpen(true)}>Open First Drawer</Button>

        <Drawer
          open={firstOpen}
          onClose={() => setFirstOpen(false)}
          title="First Drawer"
          position="right"
          size="medium"
        >
          <Stack gap="large">
            <Text>This is the first drawer.</Text>
            <Button onClick={() => setSecondOpen(true)}>
              Open Second Drawer
            </Button>
          </Stack>
        </Drawer>

        <Drawer
          open={secondOpen}
          onClose={() => setSecondOpen(false)}
          title="Second Drawer"
          position="left"
          size="small"
          zIndex={1100}
        >
          <Stack gap="large">
            <Text>This is the second drawer with a higher z-index.</Text>
            <Text>Both drawers can be open at the same time.</Text>
          </Stack>
        </Drawer>
      </div>
    );
  },
};