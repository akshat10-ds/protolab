import type { Meta, StoryObj } from '@storybook/react';
import { Chip } from './Chip';
import { Icon } from '../Icon';
import { Avatar } from '../Avatar';

const meta = {
  title: 'Components/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic chip with just text
export const Default: Story = {
  args: {
    children: 'Chip Text',
  },
};

// Chip with close button (most common pattern)
export const WithRemove: Story = {
  args: {
    children: 'Chip Text',
    onRemove: () => console.log('Remove clicked'),
  },
};

// Chip with icon (use for categories, tags, filters)
export const WithIcon: Story = {
  args: {
    children: 'Category',
    startElement: <Icon name="star" size="small" />,
    onRemove: () => console.log('Remove clicked'),
  },
};

// Chip with Avatar (use ONLY for user/person chips)
export const WithAvatar: Story = {
  args: {
    children: 'John Doe',
    startElement: <Avatar size="xs" name="John Doe" />,
    onRemove: () => console.log('Remove clicked'),
  },
};

// Clickable chip (for filters, selections)
export const Clickable: Story = {
  args: {
    children: 'Filter Option',
    onClick: () => console.log('Chip clicked'),
    onRemove: () => console.log('Remove clicked'),
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    children: 'Disabled Chip',
    onRemove: () => console.log('Remove clicked'),
    disabled: true,
  },
};

// Multiple chips example
export const MultipleChips: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', maxWidth: '400px' }}>
      <Chip onRemove={() => {}}>Design</Chip>
      <Chip onRemove={() => {}}>Development</Chip>
      <Chip onRemove={() => {}}>Marketing</Chip>
      <Chip
        startElement={<Avatar size="xs" name="John Doe" />}
        onRemove={() => {}}
      >
        John Doe
      </Chip>
      <Chip
        startElement={<Avatar size="xs" name="Jane Smith" />}
        onRemove={() => {}}
      >
        Jane Smith
      </Chip>
      <Chip
        startElement={<Icon name="star" size="small" />}
        onRemove={() => {}}
      >
        Featured
      </Chip>
    </div>
  ),
};

// Usage guidelines story
export const UsageGuidelines: Story = {
  render: () => (
    <div style={{ padding: '20px', maxWidth: '600px' }}>
      <h3 style={{ marginBottom: '16px' }}>Chip Usage Guidelines</h3>

      <div style={{ marginBottom: '24px' }}>
        <h4 style={{ marginBottom: '8px' }}>✅ Use Icon for:</h4>
        <ul style={{ marginLeft: '20px', marginBottom: '12px' }}>
          <li>Categories</li>
          <li>Tags</li>
          <li>Filters</li>
          <li>Status indicators</li>
        </ul>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Chip startElement={<Icon name="star" size="small" />} onRemove={() => {}}>
            Featured
          </Chip>
          <Chip startElement={<Icon name="document" size="small" />} onRemove={() => {}}>
            Document
          </Chip>
          <Chip startElement={<Icon name="calendar" size="small" />} onRemove={() => {}}>
            Scheduled
          </Chip>
        </div>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <h4 style={{ marginBottom: '8px' }}>✅ Use Avatar for:</h4>
        <ul style={{ marginLeft: '20px', marginBottom: '12px' }}>
          <li>User mentions</li>
          <li>Assigned people</li>
          <li>Team members</li>
          <li>Contacts</li>
        </ul>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Chip
            startElement={<Avatar size="xs" name="John Doe" />}
            onRemove={() => {}}
          >
            John Doe
          </Chip>
          <Chip
            startElement={<Avatar size="xs" name="Jane Smith" />}
            onRemove={() => {}}
          >
            Jane Smith
          </Chip>
        </div>
      </div>

      <div>
        <h4 style={{ marginBottom: '8px' }}>✅ Use plain text for:</h4>
        <ul style={{ marginLeft: '20px', marginBottom: '12px' }}>
          <li>Simple tags</li>
          <li>Keywords</li>
          <li>Labels</li>
        </ul>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Chip onRemove={() => {}}>React</Chip>
          <Chip onRemove={() => {}}>TypeScript</Chip>
          <Chip onRemove={() => {}}>Design System</Chip>
        </div>
      </div>
    </div>
  ),
};
