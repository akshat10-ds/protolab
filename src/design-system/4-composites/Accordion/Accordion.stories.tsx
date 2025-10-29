import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from './Accordion';
import { useState } from 'react';

const meta: Meta<typeof Accordion> = {
  title: 'Layout/Accordion',
  component: Accordion,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Accordion>;

const QuestionIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm.93 12.5h-1.86v-1.86h1.86v1.86zm1.07-5.75c-.47.47-.93.93-.93 1.75H7.93c0-1.33.93-2.13 1.4-2.6.4-.4.6-.6.6-1.15 0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5H5.07c0-1.65 1.35-3 3-3s3 1.35 3 3c0 1.07-.6 1.67-1.07 2.13z" />
  </svg>
);

const InfoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm1 12H7V7h2v5zm0-6H7V4h2v2z" />
  </svg>
);

const SettingsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
    <path d="M13.5 8c0-.3-.02-.59-.06-.88l1.08-.87a.5.5 0 0 0 .12-.63l-1-1.73a.5.5 0 0 0-.61-.22l-1.28.5c-.26-.2-.54-.37-.85-.5l-.19-1.36A.5.5 0 0 0 10.21 2h-2a.5.5 0 0 0-.5.43l-.19 1.36c-.31.13-.59.3-.85.5l-1.28-.5a.5.5 0 0 0-.61.22l-1 1.73a.5.5 0 0 0 .12.63l1.08.87c-.04.29-.06.58-.06.88s.02.59.06.88l-1.08.87a.5.5 0 0 0-.12.63l1 1.73c.13.23.4.3.61.22l1.28-.5c.26.2.54.37.85.5l.19 1.36c.03.24.24.43.5.43h2c.26 0 .47-.19.5-.43l.19-1.36c.31-.13.59-.3.85-.5l1.28.5c.21.08.48.01.61-.22l1-1.73a.5.5 0 0 0-.12-.63l-1.08-.87c.04-.29.06-.58.06-.88z" />
  </svg>
);

const basicItems = [
  {
    id: '1',
    title: 'What is React?',
    content: 'React is a JavaScript library for building user interfaces. It allows you to create reusable UI components and efficiently update the DOM.',
  },
  {
    id: '2',
    title: 'What is TypeScript?',
    content: 'TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. It adds optional static typing and class-based object-oriented programming to the language.',
  },
  {
    id: '3',
    title: 'What is CSS Modules?',
    content: 'CSS Modules are CSS files in which all class names and animation names are scoped locally by default. This helps prevent naming conflicts in large applications.',
  },
];

export const Default: Story = {
  args: {
    items: basicItems,
  },
};

export const WithDefaultOpen: Story = {
  args: {
    items: basicItems,
    defaultOpenItems: ['1', '2'],
  },
};

export const AllowMultiple: Story = {
  args: {
    items: basicItems,
    allowMultiple: true,
  },
};

export const SingleOpen: Story = {
  args: {
    items: basicItems,
    allowMultiple: false,
  },
};

export const WithIcons: Story = {
  args: {
    items: [
      {
        id: '1',
        title: 'Frequently Asked Questions',
        icon: <QuestionIcon />,
        content: 'Here you can find answers to the most common questions about our product and services.',
      },
      {
        id: '2',
        title: 'Important Information',
        icon: <InfoIcon />,
        content: 'Please read this important information about terms of service and privacy policy before using our application.',
      },
      {
        id: '3',
        title: 'Settings & Configuration',
        icon: <SettingsIcon />,
        content: 'Configure your application settings including notifications, theme preferences, and account details.',
      },
    ],
    defaultOpenItems: ['1'],
  },
};

export const WithRichContent: Story = {
  args: {
    items: [
      {
        id: '1',
        title: 'Features',
        content: (
          <ul>
            <li>Fast and performant</li>
            <li>Easy to use</li>
            <li>Highly customizable</li>
            <li>TypeScript support</li>
          </ul>
        ),
      },
      {
        id: '2',
        title: 'Installation',
        content: (
          <div>
            <p>Install the package using npm:</p>
            <pre style={{ background: '#f5f5f5', padding: '12px', borderRadius: '4px' }}>
              npm install @ink/design-system
            </pre>
            <p>Or using yarn:</p>
            <pre style={{ background: '#f5f5f5', padding: '12px', borderRadius: '4px' }}>
              yarn add @ink/design-system
            </pre>
          </div>
        ),
      },
      {
        id: '3',
        title: 'Usage Example',
        content: (
          <pre style={{ background: '#f5f5f5', padding: '12px', borderRadius: '4px', overflow: 'auto' }}>
{`import { Accordion } from '@ink/design-system';

function App() {
  return (
    <Accordion
      items={items}
      allowMultiple
    />
  );
}`}
          </pre>
        ),
      },
    ],
  },
};

export const WithDisabledItem: Story = {
  args: {
    items: [
      {
        id: '1',
        title: 'Available Item',
        content: 'This item is available and can be clicked.',
      },
      {
        id: '2',
        title: 'Disabled Item',
        content: 'This content cannot be viewed.',
        disabled: true,
      },
      {
        id: '3',
        title: 'Another Available Item',
        content: 'This item is also available.',
      },
    ],
  },
};

export const NotBordered: Story = {
  args: {
    items: basicItems,
    bordered: false,
  },
};

export const Interactive: Story = {
  render: () => {
    const [openItems, setOpenItems] = useState<string[]>(['1']);

    return (
      <div>
        <Accordion
          items={basicItems}
          openItems={openItems}
          onOpenItemsChange={setOpenItems}
          allowMultiple
        />
        <div style={{ marginTop: '20px', fontSize: '14px' }}>
          <strong>Open items:</strong> {openItems.length > 0 ? openItems.join(', ') : 'None'}
        </div>
      </div>
    );
  },
};

export const FAQ: Story = {
  render: () => (
    <div style={{ maxWidth: '800px' }}>
      <h2 style={{ marginBottom: '20px' }}>Frequently Asked Questions</h2>
      <Accordion
        items={[
          {
            id: '1',
            title: 'How do I get started?',
            icon: <QuestionIcon />,
            content: 'Getting started is easy! Simply sign up for an account, complete your profile, and you\'ll be ready to use all our features.',
          },
          {
            id: '2',
            title: 'What payment methods do you accept?',
            icon: <QuestionIcon />,
            content: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for enterprise accounts.',
          },
          {
            id: '3',
            title: 'Can I cancel my subscription at any time?',
            icon: <QuestionIcon />,
            content: 'Yes, you can cancel your subscription at any time. Your account will remain active until the end of your current billing period.',
          },
          {
            id: '4',
            title: 'Is my data secure?',
            icon: <QuestionIcon />,
            content: 'Absolutely. We use industry-standard encryption and security practices to protect your data. All data is encrypted both in transit and at rest.',
          },
          {
            id: '5',
            title: 'Do you offer refunds?',
            icon: <QuestionIcon />,
            content: 'We offer a 30-day money-back guarantee for all new subscriptions. If you\'re not satisfied, contact our support team for a full refund.',
          },
        ]}
      />
    </div>
  ),
};

export const ProductDetails: Story = {
  render: () => (
    <div style={{ maxWidth: '600px' }}>
      <Accordion
        items={[
          {
            id: 'description',
            title: 'Description',
            content: (
              <p>
                This premium product is crafted with the finest materials and attention to detail.
                It features a modern design that fits perfectly in any environment, whether at home
                or in the office.
              </p>
            ),
          },
          {
            id: 'specifications',
            title: 'Specifications',
            content: (
              <ul>
                <li>Material: Premium aluminum alloy</li>
                <li>Dimensions: 15" x 10" x 2"</li>
                <li>Weight: 3.5 lbs</li>
                <li>Color: Space Gray</li>
                <li>Warranty: 2 years</li>
              </ul>
            ),
          },
          {
            id: 'shipping',
            title: 'Shipping Information',
            content: (
              <div>
                <p>Free standard shipping on orders over $50.</p>
                <ul>
                  <li>Standard: 5-7 business days</li>
                  <li>Express: 2-3 business days</li>
                  <li>Overnight: 1 business day</li>
                </ul>
              </div>
            ),
          },
          {
            id: 'returns',
            title: 'Returns & Exchanges',
            content: (
              <p>
                We offer hassle-free returns within 30 days of purchase. Items must be in original
                condition with all tags and packaging. Contact our customer service team to initiate
                a return.
              </p>
            ),
          },
        ]}
        defaultOpenItems={['description']}
      />
    </div>
  ),
};
