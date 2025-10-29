import type { Meta, StoryObj } from '@storybook/react';
import { Stepper } from './Stepper';
import { FileText, CheckCircle, CreditCard, Truck, Package } from 'lucide-react';
import { useState } from 'react';

const meta = {
  title: 'Ink Design System/Stepper',
  component: Stepper,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Stepper component for multi-step processes - simplified for prototyping.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Orientation of the stepper',
    },
    clickable: {
      control: 'boolean',
      description: 'Whether completed steps are clickable',
    },
    showDescription: {
      control: 'boolean',
      description: 'Whether to show step descriptions',
    },
    showConnector: {
      control: 'boolean',
      description: 'Whether to show connector lines',
    },
  },
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Steps
const basicSteps = [
  {
    id: 'step1',
    title: 'Personal Info',
    description: 'Enter your personal details',
  },
  {
    id: 'step2',
    title: 'Account Setup',
    description: 'Create your account',
  },
  {
    id: 'step3',
    title: 'Verification',
    description: 'Verify your email',
  },
  {
    id: 'step4',
    title: 'Complete',
    description: 'Finish setup',
  },
];

export const Default: Story = {
  args: {
    steps: basicSteps,
    activeStep: 1,
  },
};

export const Vertical: Story = {
  args: {
    steps: basicSteps,
    activeStep: 1,
    orientation: 'vertical',
  },
};

export const WithoutDescriptions: Story = {
  args: {
    steps: basicSteps,
    activeStep: 1,
    showDescription: false,
  },
};

export const WithoutConnectors: Story = {
  args: {
    steps: basicSteps,
    activeStep: 1,
    showConnector: false,
  },
};

// With Icons
const stepsWithIcons = [
  {
    id: 'step1',
    title: 'Order Details',
    description: 'Review your order',
    icon: <FileText size={20} />,
  },
  {
    id: 'step2',
    title: 'Payment',
    description: 'Enter payment information',
    icon: <CreditCard size={20} />,
  },
  {
    id: 'step3',
    title: 'Shipping',
    description: 'Set delivery address',
    icon: <Truck size={20} />,
  },
  {
    id: 'step4',
    title: 'Confirmation',
    description: 'Order confirmed',
    icon: <CheckCircle size={20} />,
  },
];

export const WithIcons: Story = {
  args: {
    steps: stepsWithIcons,
    activeStep: 1,
  },
};

export const WithIconsVertical: Story = {
  args: {
    steps: stepsWithIcons,
    activeStep: 2,
    orientation: 'vertical',
  },
};

// Different States
export const AllCompleted: Story = {
  args: {
    steps: basicSteps,
    activeStep: 4,
  },
};

export const FirstStep: Story = {
  args: {
    steps: basicSteps,
    activeStep: 0,
  },
};

export const WithError: Story = {
  args: {
    steps: [
      {
        id: 'step1',
        title: 'Personal Info',
        description: 'Enter your personal details',
        status: 'completed',
      },
      {
        id: 'step2',
        title: 'Payment',
        description: 'Payment failed - please retry',
        status: 'error',
      },
      {
        id: 'step3',
        title: 'Confirmation',
        description: 'Confirm your order',
        status: 'upcoming',
      },
    ],
    activeStep: 1,
  },
};

// Interactive
export const Interactive: Story = {
  render: () => {
    const [activeStep, setActiveStep] = useState(1);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <Stepper
          steps={basicSteps}
          activeStep={activeStep}
          clickable
          onStepClick={(index) => setActiveStep(index)}
        />
        <div style={{
          display: 'flex',
          gap: '8px',
          justifyContent: 'center',
          paddingTop: '16px',
          borderTop: '1px solid #e0e0e0'
        }}>
          <button
            onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
            disabled={activeStep === 0}
            style={{
              padding: '8px 16px',
              border: '1px solid #ccc',
              borderRadius: '6px',
              background: 'white',
              cursor: activeStep === 0 ? 'not-allowed' : 'pointer',
              opacity: activeStep === 0 ? 0.5 : 1,
            }}
          >
            Previous
          </button>
          <button
            onClick={() => setActiveStep(Math.min(basicSteps.length - 1, activeStep + 1))}
            disabled={activeStep === basicSteps.length - 1}
            style={{
              padding: '8px 16px',
              border: '1px solid #5000f7',
              borderRadius: '6px',
              background: '#5000f7',
              color: 'white',
              cursor: activeStep === basicSteps.length - 1 ? 'not-allowed' : 'pointer',
              opacity: activeStep === basicSteps.length - 1 ? 0.5 : 1,
            }}
          >
            Next
          </button>
        </div>
      </div>
    );
  },
};

export const InteractiveVertical: Story = {
  render: () => {
    const [activeStep, setActiveStep] = useState(1);

    return (
      <div style={{ display: 'flex', gap: '32px', maxWidth: '800px' }}>
        <Stepper
          steps={stepsWithIcons}
          activeStep={activeStep}
          orientation="vertical"
          clickable
          onStepClick={(index) => setActiveStep(index)}
        />
        <div style={{
          flex: 1,
          padding: '24px',
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          background: '#f9f9f9'
        }}>
          <h3 style={{ marginTop: 0 }}>{stepsWithIcons[activeStep].title}</h3>
          <p style={{ color: '#666' }}>{stepsWithIcons[activeStep].description}</p>
          <div style={{ display: 'flex', gap: '8px', marginTop: '24px' }}>
            <button
              onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
              disabled={activeStep === 0}
              style={{
                padding: '8px 16px',
                border: '1px solid #ccc',
                borderRadius: '6px',
                background: 'white',
                cursor: activeStep === 0 ? 'not-allowed' : 'pointer',
                opacity: activeStep === 0 ? 0.5 : 1,
              }}
            >
              Previous
            </button>
            <button
              onClick={() => setActiveStep(Math.min(stepsWithIcons.length - 1, activeStep + 1))}
              disabled={activeStep === stepsWithIcons.length - 1}
              style={{
                padding: '8px 16px',
                border: '1px solid #5000f7',
                borderRadius: '6px',
                background: '#5000f7',
                color: 'white',
                cursor: activeStep === stepsWithIcons.length - 1 ? 'not-allowed' : 'pointer',
                opacity: activeStep === stepsWithIcons.length - 1 ? 0.5 : 1,
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  },
};

// Custom Labels
export const CustomLabels: Story = {
  args: {
    steps: [
      {
        id: 'step1',
        title: 'Step A',
        description: 'First step',
        label: 'A',
      },
      {
        id: 'step2',
        title: 'Step B',
        description: 'Second step',
        label: 'B',
      },
      {
        id: 'step3',
        title: 'Step C',
        description: 'Third step',
        label: 'C',
      },
    ],
    activeStep: 1,
  },
};

// With Disabled Steps
export const WithDisabledSteps: Story = {
  args: {
    steps: [
      {
        id: 'step1',
        title: 'Available Step',
        description: 'This step is available',
        status: 'completed',
      },
      {
        id: 'step2',
        title: 'Current Step',
        description: 'You are here',
        status: 'active',
      },
      {
        id: 'step3',
        title: 'Locked Step',
        description: 'Complete previous steps first',
        disabled: true,
      },
      {
        id: 'step4',
        title: 'Another Locked Step',
        description: 'Not yet available',
        disabled: true,
      },
    ],
    activeStep: 1,
    clickable: true,
  },
};

// E-commerce Checkout
export const CheckoutProcess: Story = {
  name: 'E-commerce Checkout',
  render: () => (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '32px', textAlign: 'center' }}>Checkout Process</h2>
      <Stepper
        steps={[
          {
            id: 'cart',
            title: 'Shopping Cart',
            description: '3 items in cart',
            icon: <Package size={20} />,
            status: 'completed',
          },
          {
            id: 'shipping',
            title: 'Shipping',
            description: 'Enter delivery address',
            icon: <Truck size={20} />,
            status: 'active',
          },
          {
            id: 'payment',
            title: 'Payment',
            description: 'Choose payment method',
            icon: <CreditCard size={20} />,
            status: 'upcoming',
          },
          {
            id: 'confirm',
            title: 'Confirmation',
            description: 'Review and confirm',
            icon: <CheckCircle size={20} />,
            status: 'upcoming',
          },
        ]}
        activeStep={1}
      />
    </div>
  ),
};

// Document Workflow
export const DocumentWorkflow: Story = {
  name: 'Document Workflow',
  render: () => (
    <div style={{ maxWidth: '600px' }}>
      <h2 style={{ marginBottom: '24px' }}>Document Processing</h2>
      <Stepper
        steps={[
          {
            id: 'upload',
            title: 'Upload Document',
            description: 'Document uploaded successfully',
            status: 'completed',
          },
          {
            id: 'review',
            title: 'Review Content',
            description: 'Reviewing document content',
            status: 'active',
          },
          {
            id: 'sign',
            title: 'Add Signatures',
            description: 'Collect required signatures',
            status: 'upcoming',
          },
          {
            id: 'complete',
            title: 'Complete',
            description: 'Document is finalized',
            status: 'upcoming',
          },
        ]}
        orientation="vertical"
        activeStep={1}
        showDescription
      />
    </div>
  ),
};

// Playground
export const Playground: Story = {
  args: {
    steps: basicSteps,
    activeStep: 1,
    orientation: 'horizontal',
    clickable: false,
    showDescription: true,
    showConnector: true,
  },
};
