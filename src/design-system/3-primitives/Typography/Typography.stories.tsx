import type { Meta, StoryObj } from '@storybook/react';
import { Heading, Text } from './Typography';

const headingMeta = {
  title: 'Ink Design System/Typography/Heading',
  component: Heading,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Official DocuSign Ink Heading component - semantic heading elements with consistent styling.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    level: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6],
      description: 'Heading level (h1-h6)',
    },
    as: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      description: 'Override the HTML element',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '600px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Heading>;

export default headingMeta;
type HeadingStory = StoryObj<typeof headingMeta>;

// Heading Level 1
export const Level1: HeadingStory = {
  args: {
    level: 1,
    children: 'Heading Level 1',
  },
};

// Heading Level 2
export const Level2: HeadingStory = {
  args: {
    level: 2,
    children: 'Heading Level 2',
  },
};

// Heading Level 3
export const Level3: HeadingStory = {
  args: {
    level: 3,
    children: 'Heading Level 3',
  },
};

// Heading Level 4
export const Level4: HeadingStory = {
  args: {
    level: 4,
    children: 'Heading Level 4',
  },
};

// Heading Level 5
export const Level5: HeadingStory = {
  args: {
    level: 5,
    children: 'Heading Level 5',
  },
};

// Heading Level 6
export const Level6: HeadingStory = {
  args: {
    level: 6,
    children: 'Heading Level 6',
  },
};

// All Heading Levels
export const AllHeadingLevels: HeadingStory = {
  name: 'All Heading Levels',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '600px' }}>
      <Heading level={1}>Heading 1 - Main Page Title</Heading>
      <Heading level={2}>Heading 2 - Section Title</Heading>
      <Heading level={3}>Heading 3 - Subsection Title</Heading>
      <Heading level={4}>Heading 4 - Component Title</Heading>
      <Heading level={5}>Heading 5 - Small Title</Heading>
      <Heading level={6}>Heading 6 - Micro Title</Heading>
    </div>
  ),
};

// Semantic Override
export const SemanticOverride: HeadingStory = {
  name: 'Semantic Override',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '600px' }}>
      <div>
        <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
          Displays as h1 but rendered as h2 for SEO
        </p>
        <Heading level={1} as="h2">
          This looks like H1 but is H2 in HTML
        </Heading>
      </div>
      <div>
        <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
          Displays as h3 but rendered as h1 for accessibility
        </p>
        <Heading level={3} as="h1">
          This looks like H3 but is H1 in HTML
        </Heading>
      </div>
    </div>
  ),
};

// In Content
export const HeadingsInContent: HeadingStory = {
  name: 'Headings in Content',
  render: () => (
    <div style={{ width: '600px' }}>
      <Heading level={1}>Article Title</Heading>
      <p style={{ margin: '16px 0', color: '#666', lineHeight: 1.6 }}>
        This is the introduction paragraph that follows the main heading. It provides
        context and sets up the content that follows.
      </p>

      <Heading level={2}>First Section</Heading>
      <p style={{ margin: '12px 0', color: '#666', lineHeight: 1.6 }}>
        Content for the first section. This demonstrates how headings break up content
        into logical sections.
      </p>

      <Heading level={3}>Subsection</Heading>
      <p style={{ margin: '12px 0', color: '#666', lineHeight: 1.6 }}>
        More detailed content in a subsection. Notice how the heading hierarchy helps
        organize the information.
      </p>

      <Heading level={2}>Second Section</Heading>
      <p style={{ margin: '12px 0 0 0', color: '#666', lineHeight: 1.6 }}>
        Content for the second major section of the article.
      </p>
    </div>
  ),
};

// Heading Playground
export const HeadingPlayground: HeadingStory = {
  name: 'Heading Playground',
  args: {
    level: 2,
    children: 'Customize this heading',
  },
};

// Text Component Stories
const textMeta = {
  title: 'Ink Design System/Typography/Text',
  component: Text,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Official DocuSign Ink Text component - flexible text element with size, weight, and color variants.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    as: {
      control: 'select',
      options: ['p', 'span', 'div', 'label'],
      description: 'HTML element to render',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Text size',
    },
    weight: {
      control: 'select',
      options: ['light', 'regular', 'medium', 'semibold', 'bold'],
      description: 'Font weight',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'success', 'error'],
      description: 'Text color',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '600px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Text>;

type TextStory = StoryObj<typeof textMeta>;

// Default Text
export const DefaultText: TextStory = {
  args: {
    children: 'This is default text with regular styling.',
  },
};

// All Sizes
export const AllTextSizes: TextStory = {
  name: 'All Text Sizes',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '600px' }}>
      <Text size="xs">Extra small text (xs) - Used for captions and labels</Text>
      <Text size="sm">Small text (sm) - Used for secondary information</Text>
      <Text size="md">Medium text (md) - Default body text size</Text>
      <Text size="lg">Large text (lg) - Emphasized body text</Text>
      <Text size="xl">Extra large text (xl) - Lead paragraphs</Text>
    </div>
  ),
};

// All Weights
export const AllTextWeights: TextStory = {
  name: 'All Text Weights',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '600px' }}>
      <Text weight="light">Light weight text - Subtle and delicate</Text>
      <Text weight="regular">Regular weight text - Standard body text</Text>
      <Text weight="medium">Medium weight text - Slightly emphasized</Text>
      <Text weight="semibold">Semibold weight text - Important information</Text>
      <Text weight="bold">Bold weight text - Strong emphasis</Text>
    </div>
  ),
};

// All Colors
export const AllTextColors: TextStory = {
  name: 'All Text Colors',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '600px' }}>
      <Text color="primary">Primary color - Main text color for content</Text>
      <Text color="secondary">Secondary color - Supporting text and labels</Text>
      <Text color="tertiary">Tertiary color - Muted or disabled text</Text>
      <Text color="success">Success color - Positive messages and confirmations</Text>
      <Text color="error">Error color - Error messages and warnings</Text>
    </div>
  ),
};

// Size and Weight Combinations
export const SizeWeightCombinations: TextStory = {
  name: 'Size & Weight Combinations',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '600px' }}>
      <div>
        <Text size="xl" weight="bold">Extra Large Bold</Text>
        <Text size="md" color="secondary">Perfect for section introductions</Text>
      </div>
      <div>
        <Text size="lg" weight="semibold">Large Semibold</Text>
        <Text size="sm" color="secondary">Great for card titles</Text>
      </div>
      <div>
        <Text size="md" weight="medium">Medium Medium Weight</Text>
        <Text size="sm" color="secondary">Standard body text with emphasis</Text>
      </div>
      <div>
        <Text size="sm" weight="regular">Small Regular</Text>
        <Text size="xs" color="tertiary">Secondary information and metadata</Text>
      </div>
    </div>
  ),
};

// Different Elements
export const DifferentElements: TextStory = {
  name: 'Different Elements',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '600px' }}>
      <Text as="p">Paragraph element (default)</Text>
      <Text as="span">Span element for inline text</Text>
      <Text as="div">Div element for block text</Text>
      <Text as="label">Label element for form labels</Text>
    </div>
  ),
};

// Typography in UI
export const TypographyInUI: TextStory = {
  name: 'Typography in UI',
  render: () => (
    <div style={{ width: '500px', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '24px' }}>
      <Heading level={2}>User Profile</Heading>
      <Text size="sm" color="secondary" style={{ marginTop: '4px', marginBottom: '24px', display: 'block' }}>
        Manage your personal information
      </Text>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <Text as="label" size="sm" weight="medium" style={{ display: 'block', marginBottom: '4px' }}>
            Full Name
          </Text>
          <Text>John Doe</Text>
        </div>
        <div>
          <Text as="label" size="sm" weight="medium" style={{ display: 'block', marginBottom: '4px' }}>
            Email Address
          </Text>
          <Text>john.doe@example.com</Text>
        </div>
        <div>
          <Text as="label" size="sm" weight="medium" style={{ display: 'block', marginBottom: '4px' }}>
            Member Since
          </Text>
          <Text size="sm" color="secondary">January 15, 2024</Text>
        </div>
      </div>
    </div>
  ),
};

// Article Layout
export const ArticleLayout: TextStory = {
  name: 'Article Layout',
  render: () => (
    <div style={{ width: '600px' }}>
      <Heading level={1}>The Future of Design Systems</Heading>
      <Text size="sm" color="secondary" style={{ marginTop: '8px', marginBottom: '24px', display: 'block' }}>
        Published on January 20, 2024 by Jane Smith
      </Text>

      <Text size="lg" weight="medium" style={{ marginBottom: '16px', display: 'block' }}>
        Design systems have become an essential tool for modern product development,
        enabling teams to build consistent, scalable user interfaces.
      </Text>

      <Text style={{ marginBottom: '16px', display: 'block' }}>
        A well-crafted design system provides a shared language between designers and
        developers, reducing friction and accelerating the design and development process.
        It ensures consistency across products and platforms while maintaining flexibility
        for innovation.
      </Text>

      <Heading level={2} style={{ marginTop: '32px', marginBottom: '16px' }}>
        Key Benefits
      </Heading>

      <Text style={{ marginBottom: '16px', display: 'block' }}>
        Design systems offer numerous advantages for organizations of all sizes. They
        promote consistency, improve efficiency, and enable teams to focus on solving
        user problems rather than reinventing common patterns.
      </Text>

      <Text size="sm" color="tertiary" style={{ marginTop: '32px', display: 'block', fontStyle: 'italic' }}>
        This article is part of our series on modern design practices.
      </Text>
    </div>
  ),
};

// Status Messages
export const StatusMessages: TextStory = {
  name: 'Status Messages',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '500px' }}>
      <div style={{ padding: '16px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px' }}>
        <Text weight="semibold" color="success" style={{ display: 'block', marginBottom: '4px' }}>
          Success!
        </Text>
        <Text size="sm" color="success">
          Your changes have been saved successfully.
        </Text>
      </div>

      <div style={{ padding: '16px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px' }}>
        <Text weight="semibold" color="error" style={{ display: 'block', marginBottom: '4px' }}>
          Error
        </Text>
        <Text size="sm" color="error">
          Unable to process your request. Please try again.
        </Text>
      </div>

      <div style={{ padding: '16px', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
        <Text weight="semibold" style={{ display: 'block', marginBottom: '4px' }}>
          Information
        </Text>
        <Text size="sm" color="secondary">
          Your subscription will renew on March 1, 2024.
        </Text>
      </div>
    </div>
  ),
};

// Card Example
export const CardExample: TextStory = {
  name: 'Card Example',
  render: () => (
    <div style={{ width: '400px', border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
      <div style={{ height: '200px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }} />
      <div style={{ padding: '20px' }}>
        <Heading level={3} style={{ marginBottom: '8px' }}>
          Premium Package
        </Heading>
        <Text size="sm" color="secondary" style={{ marginBottom: '16px', display: 'block' }}>
          Everything you need to get started
        </Text>
        <Text size="xl" weight="bold" style={{ marginBottom: '16px', display: 'block' }}>
          $99.00
          <Text as="span" size="md" weight="regular" color="secondary">
            {' '}/month
          </Text>
        </Text>
        <Text size="sm" style={{ marginBottom: '16px', display: 'block' }}>
          Includes unlimited projects, 50GB storage, priority support, and advanced analytics.
        </Text>
        <button style={{ width: '100%', padding: '12px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '16px', fontWeight: 600 }}>
          Get Started
        </button>
      </div>
    </div>
  ),
};

// Complete Typography Scale
export const CompleteTypographyScale: TextStory = {
  name: 'Complete Typography Scale',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '700px' }}>
      <div>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 600, color: '#666' }}>
          HEADINGS
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Heading level={1}>Heading 1</Heading>
          <Heading level={2}>Heading 2</Heading>
          <Heading level={3}>Heading 3</Heading>
          <Heading level={4}>Heading 4</Heading>
          <Heading level={5}>Heading 5</Heading>
          <Heading level={6}>Heading 6</Heading>
        </div>
      </div>

      <div>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 600, color: '#666' }}>
          TEXT SIZES
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Text size="xs">Extra Small (xs)</Text>
          <Text size="sm">Small (sm)</Text>
          <Text size="md">Medium (md)</Text>
          <Text size="lg">Large (lg)</Text>
          <Text size="xl">Extra Large (xl)</Text>
        </div>
      </div>

      <div>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 600, color: '#666' }}>
          TEXT WEIGHTS
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Text weight="light">Light</Text>
          <Text weight="regular">Regular</Text>
          <Text weight="medium">Medium</Text>
          <Text weight="semibold">Semibold</Text>
          <Text weight="bold">Bold</Text>
        </div>
      </div>

      <div>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 600, color: '#666' }}>
          TEXT COLORS
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Text color="primary">Primary</Text>
          <Text color="secondary">Secondary</Text>
          <Text color="tertiary">Tertiary</Text>
          <Text color="success">Success</Text>
          <Text color="error">Error</Text>
        </div>
      </div>
    </div>
  ),
};

// Text Playground
export const TextPlayground: TextStory = {
  name: 'Text Playground',
  args: {
    size: 'md',
    weight: 'regular',
    color: 'primary',
    children: 'Customize this text',
  },
};
