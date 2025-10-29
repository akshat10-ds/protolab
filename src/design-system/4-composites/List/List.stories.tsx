import type { Meta, StoryObj } from '@storybook/react';
import { List } from './List';
import { Avatar } from '../Avatar';
import { Badge } from '../../3-primitives/Badge';
import { Button } from '../../3-primitives/Button';
import { Icon } from '../../3-primitives/Icon';
import { Stack } from '../../2-utilities/Stack';
import { useState } from 'react';

const meta = {
  title: 'Ink Design System/List',
  component: List,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'List component for displaying structured data with various layouts and interactive features.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '600px', maxWidth: '100%' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Examples
export const Default: Story = {
  render: () => (
    <List>
      <List.Item>First item</List.Item>
      <List.Item>Second item</List.Item>
      <List.Item>Third item</List.Item>
      <List.Item>Fourth item</List.Item>
    </List>
  ),
};

export const WithDescriptions: Story = {
  render: () => (
    <List>
      <List.Item description="Description for the first item">
        First item
      </List.Item>
      <List.Item description="Description for the second item">
        Second item
      </List.Item>
      <List.Item description="Description for the third item">
        Third item
      </List.Item>
    </List>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <List>
      <List.Item startElement={<Icon name="file" />}>
        Document.pdf
      </List.Item>
      <List.Item startElement={<Icon name="image" />}>
        Image.jpg
      </List.Item>
      <List.Item startElement={<Icon name="video" />}>
        Video.mp4
      </List.Item>
      <List.Item startElement={<Icon name="music" />}>
        Audio.mp3
      </List.Item>
    </List>
  ),
};

export const WithAvatars: Story = {
  render: () => (
    <List size="large">
      <List.Item
        startElement={<Avatar name="John Doe" />}
        description="john.doe@example.com"
        meta="Admin"
      >
        John Doe
      </List.Item>
      <List.Item
        startElement={<Avatar name="Jane Smith" />}
        description="jane.smith@example.com"
        meta="Editor"
      >
        Jane Smith
      </List.Item>
      <List.Item
        startElement={<Avatar name="Bob Johnson" />}
        description="bob.johnson@example.com"
        meta="Viewer"
      >
        Bob Johnson
      </List.Item>
    </List>
  ),
};

export const WithEndElements: Story = {
  render: () => (
    <List>
      <List.Item
        startElement={<Icon name="file" />}
        endElement={<Badge variant="success">Active</Badge>}
      >
        Contract_2024.pdf
      </List.Item>
      <List.Item
        startElement={<Icon name="file" />}
        endElement={<Badge variant="warning">Pending</Badge>}
      >
        Invoice_March.pdf
      </List.Item>
      <List.Item
        startElement={<Icon name="file" />}
        endElement={<Badge variant="error">Expired</Badge>}
      >
        Agreement_2023.pdf
      </List.Item>
    </List>
  ),
};

export const WithActions: Story = {
  render: () => (
    <List>
      <List.Item
        description="Last modified: 2 hours ago"
        endElement={
          <Stack direction="horizontal" gap="small">
            <Button size="small" kind="tertiary">Edit</Button>
            <Button size="small" kind="tertiary">Delete</Button>
          </Stack>
        }
      >
        Document.pdf
      </List.Item>
      <List.Item
        description="Last modified: Yesterday"
        endElement={
          <Stack direction="horizontal" gap="small">
            <Button size="small" kind="tertiary">Edit</Button>
            <Button size="small" kind="tertiary">Delete</Button>
          </Stack>
        }
      >
        Spreadsheet.xlsx
      </List.Item>
    </List>
  ),
};

// Clickable Lists
export const Clickable: Story = {
  render: () => {
    const [selected, setSelected] = useState<number | null>(null);

    return (
      <List hoverable>
        <List.Item
          clickable
          selected={selected === 0}
          onClick={() => setSelected(0)}
          startElement={<Icon name="home" />}
        >
          Home
        </List.Item>
        <List.Item
          clickable
          selected={selected === 1}
          onClick={() => setSelected(1)}
          startElement={<Icon name="user" />}
        >
          Profile
        </List.Item>
        <List.Item
          clickable
          selected={selected === 2}
          onClick={() => setSelected(2)}
          startElement={<Icon name="settings" />}
        >
          Settings
        </List.Item>
        <List.Item
          clickable
          selected={selected === 3}
          onClick={() => setSelected(3)}
          startElement={<Icon name="help-circle" />}
        >
          Help
        </List.Item>
      </List>
    );
  },
};

// Variants
export const Bordered: Story = {
  render: () => (
    <List variant="bordered">
      <List.Item>First item in bordered list</List.Item>
      <List.Item>Second item in bordered list</List.Item>
      <List.Item>Third item in bordered list</List.Item>
    </List>
  ),
};

export const Divided: Story = {
  render: () => (
    <List variant="divided">
      <List.Item>First item with divider</List.Item>
      <List.Item>Second item with divider</List.Item>
      <List.Item>Third item with divider</List.Item>
      <List.Item>Fourth item (no divider after)</List.Item>
    </List>
  ),
};

// Sizes
export const Sizes: Story = {
  render: () => (
    <Stack gap="large">
      <div>
        <h4 style={{ marginBottom: '8px' }}>Small</h4>
        <List size="small">
          <List.Item startElement={<Icon name="star" />}>Small item</List.Item>
          <List.Item startElement={<Icon name="heart" />}>Another small item</List.Item>
        </List>
      </div>

      <div>
        <h4 style={{ marginBottom: '8px' }}>Medium (Default)</h4>
        <List size="medium">
          <List.Item startElement={<Icon name="star" />}>Medium item</List.Item>
          <List.Item startElement={<Icon name="heart" />}>Another medium item</List.Item>
        </List>
      </div>

      <div>
        <h4 style={{ marginBottom: '8px' }}>Large</h4>
        <List size="large">
          <List.Item startElement={<Icon name="star" />}>Large item</List.Item>
          <List.Item startElement={<Icon name="heart" />}>Another large item</List.Item>
        </List>
      </div>
    </Stack>
  ),
};

// Ordered List
export const OrderedList: Story = {
  render: () => (
    <List ordered>
      <List.Item>First step in the process</List.Item>
      <List.Item>Second step in the process</List.Item>
      <List.Item>Third step in the process</List.Item>
      <List.Item>Fourth step in the process</List.Item>
    </List>
  ),
};

// With Meta Information
export const WithMetaInfo: Story = {
  render: () => (
    <List>
      <List.Item meta="2 hours ago">
        New message from John
      </List.Item>
      <List.Item meta="5 hours ago">
        Document shared by Sarah
      </List.Item>
      <List.Item meta="Yesterday">
        Meeting reminder
      </List.Item>
      <List.Item meta="2 days ago">
        Project update
      </List.Item>
    </List>
  ),
};

// Disabled Items
export const WithDisabledItems: Story = {
  render: () => (
    <List>
      <List.Item clickable>Active item (clickable)</List.Item>
      <List.Item clickable disabled>
        Disabled item (not clickable)
      </List.Item>
      <List.Item clickable>Another active item</List.Item>
      <List.Item clickable disabled>
        Another disabled item
      </List.Item>
    </List>
  ),
};

// Complex Example - File Browser
export const FileBrowser: Story = {
  name: 'File Browser Example',
  render: () => {
    const files = [
      { name: 'Documents', type: 'folder', items: 24, modified: '2 hours ago' },
      { name: 'contract.pdf', type: 'pdf', size: '2.4 MB', modified: 'Yesterday' },
      { name: 'presentation.pptx', type: 'ppt', size: '15.7 MB', modified: '3 days ago' },
      { name: 'data.xlsx', type: 'excel', size: '856 KB', modified: 'Last week' },
      { name: 'image.jpg', type: 'image', size: '4.2 MB', modified: 'Last month' },
    ];

    const getIcon = (type: string) => {
      switch (type) {
        case 'folder': return 'folder';
        case 'pdf': return 'file';
        case 'ppt': return 'presentation';
        case 'excel': return 'table';
        case 'image': return 'image';
        default: return 'file';
      }
    };

    return (
      <List variant="divided" hoverable>
        {files.map((file, index) => (
          <List.Item
            key={index}
            clickable
            startElement={<Icon name={getIcon(file.type)} />}
            description={file.type === 'folder' ? `${file.items} items` : file.size}
            meta={file.modified}
            endElement={
              <Button size="small" kind="tertiary">
                <Icon name="more-vertical" size="small" />
              </Button>
            }
          >
            {file.name}
          </List.Item>
        ))}
      </List>
    );
  },
};

// Complex Example - Notifications
export const NotificationsList: Story = {
  name: 'Notifications Example',
  render: () => {
    const notifications = [
      {
        title: 'New document signed',
        description: 'John Doe signed "Employment Contract"',
        time: '5 min ago',
        unread: true,
        type: 'success',
      },
      {
        title: 'Signature requested',
        description: 'Sarah Smith requested your signature on "NDA Agreement"',
        time: '1 hour ago',
        unread: true,
        type: 'info',
      },
      {
        title: 'Document expired',
        description: 'The document "Lease Agreement" has expired',
        time: '2 hours ago',
        unread: false,
        type: 'warning',
      },
      {
        title: 'Payment received',
        description: 'Payment of $500 has been processed',
        time: 'Yesterday',
        unread: false,
        type: 'success',
      },
    ];

    return (
      <List variant="bordered" hoverable>
        {notifications.map((notif, index) => (
          <List.Item
            key={index}
            clickable
            selected={notif.unread}
            startElement={
              <div style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: notif.unread ? 'var(--ink-blue-60)' : 'transparent',
                marginRight: 8,
              }} />
            }
            description={notif.description}
            meta={notif.time}
            endElement={
              <Badge
                variant={notif.type as any}
                size="small"
              >
                {notif.type}
              </Badge>
            }
          >
            {notif.title}
          </List.Item>
        ))}
      </List>
    );
  },
};