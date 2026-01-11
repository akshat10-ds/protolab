import { useState } from 'react';
import {
  Card,
  Heading,
  Text,
  Input,
  Select,
  Checkbox,
  Radio,
  Button,
  Badge,
  Stack,
  Grid,
  Inline,
  Container,
  Accordion,
  Divider,
} from '@/design-system';

/**
 * AccordionWizard Prototype
 *
 * An accordion-style wizard that collects user information in sequential steps.
 * Features:
 * - Accordion (Layer 4) for collapsible step sections
 * - Input, Select, Checkbox, Radio (Layer 3) for form fields
 * - Button (Layer 3) for navigation
 * - Badge (Layer 3) for step completion status
 * - Stack, Grid, Inline (Layer 2) for layout
 */

// State options
const stateOptions = [
  { value: 'ca', label: 'California' },
  { value: 'ny', label: 'New York' },
  { value: 'tx', label: 'Texas' },
  { value: 'fl', label: 'Florida' },
  { value: 'wa', label: 'Washington' },
  { value: 'il', label: 'Illinois' },
];

const countryOptions = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'au', label: 'Australia' },
];

const themeOptions = [
  { value: 'system', label: 'System Default' },
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
];

// Form data type
interface WizardFormData {
  // Step 1: Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  // Step 2: Address Information
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  // Step 3: Account Preferences
  accountType: 'personal' | 'business';
  emailNotifications: boolean;
  smsNotifications: boolean;
  marketingUpdates: boolean;
  theme: string;
}

const initialFormData: WizardFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  streetAddress: '',
  city: '',
  state: '',
  zipCode: '',
  country: 'us',
  accountType: 'personal',
  emailNotifications: true,
  smsNotifications: false,
  marketingUpdates: true,
  theme: 'system',
};

export function AccordionWizard() {
  const [formData, setFormData] = useState<WizardFormData>(initialFormData);
  const [openStep, setOpenStep] = useState<string[]>(['step1']);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [submitted, setSubmitted] = useState(false);

  // Update form field
  const updateField = <K extends keyof WizardFormData>(field: K, value: WizardFormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Navigate to next step
  const goToStep = (currentStep: string, nextStep: string) => {
    setCompletedSteps((prev) => new Set([...prev, currentStep]));
    setOpenStep([nextStep]);
  };

  // Navigate to previous step
  const goBack = (prevStep: string) => {
    setOpenStep([prevStep]);
  };

  // Handle accordion change
  const handleAccordionChange = (openItems: string[]) => {
    setOpenStep(openItems);
  };

  // Submit form
  const handleSubmit = () => {
    setCompletedSteps((prev) => new Set([...prev, 'step4']));
    setSubmitted(true);
    console.log('Wizard submitted:', formData);
  };

  // Reset form
  const handleReset = () => {
    setFormData(initialFormData);
    setOpenStep(['step1']);
    setCompletedSteps(new Set());
    setSubmitted(false);
  };

  // Check if step is complete
  const isStepComplete = (step: string) => completedSteps.has(step);

  // Render step status badge
  const renderStepBadge = (step: string) => {
    if (isStepComplete(step)) {
      return (
        <Badge variant="success" size="small">
          Complete
        </Badge>
      );
    }
    return null;
  };

  // Step 1: Personal Information
  const renderStep1Content = () => (
    <Stack gap="medium">
      <Grid columns={2} gap="medium">
        <Input
          label="First Name"
          placeholder="Enter your first name"
          value={formData.firstName}
          onChange={(e) => updateField('firstName', e.target.value)}
          required
        />
        <Input
          label="Last Name"
          placeholder="Enter your last name"
          value={formData.lastName}
          onChange={(e) => updateField('lastName', e.target.value)}
          required
        />
      </Grid>
      <Input
        label="Email"
        type="email"
        placeholder="Enter your email address"
        value={formData.email}
        onChange={(e) => updateField('email', e.target.value)}
        required
      />
      <Input
        label="Phone"
        type="tel"
        placeholder="(555) 123-4567"
        value={formData.phone}
        onChange={(e) => updateField('phone', e.target.value)}
      />
      <Inline justify="end">
        <Button kind="brand" onClick={() => goToStep('step1', 'step2')}>
          Continue to Step 2
        </Button>
      </Inline>
    </Stack>
  );

  // Step 2: Address Information
  const renderStep2Content = () => (
    <Stack gap="medium">
      <Input
        label="Street Address"
        placeholder="123 Main Street"
        value={formData.streetAddress}
        onChange={(e) => updateField('streetAddress', e.target.value)}
        required
      />
      <Grid columns={2} gap="medium">
        <Input
          label="City"
          placeholder="San Francisco"
          value={formData.city}
          onChange={(e) => updateField('city', e.target.value)}
          required
        />
        <Select
          label="State"
          options={stateOptions}
          value={formData.state}
          onChange={(value) => updateField('state', value)}
          placeholder="Select state"
          required
        />
      </Grid>
      <Grid columns={2} gap="medium">
        <Input
          label="ZIP Code"
          placeholder="94102"
          value={formData.zipCode}
          onChange={(e) => updateField('zipCode', e.target.value)}
          required
        />
        <Select
          label="Country"
          options={countryOptions}
          value={formData.country}
          onChange={(value) => updateField('country', value)}
        />
      </Grid>
      <Inline justify="space-between">
        <Button kind="secondary" onClick={() => goBack('step1')}>
          Back
        </Button>
        <Button kind="brand" onClick={() => goToStep('step2', 'step3')}>
          Continue to Step 3
        </Button>
      </Inline>
    </Stack>
  );

  // Step 3: Account Preferences
  const renderStep3Content = () => (
    <Stack gap="medium">
      <Stack gap="small">
        <Text weight="medium">Account Type</Text>
        <Stack gap="small">
          <Radio
            label="Personal"
            name="accountType"
            value="personal"
            checked={formData.accountType === 'personal'}
            onChange={() => updateField('accountType', 'personal')}
          />
          <Radio
            label="Business"
            name="accountType"
            value="business"
            checked={formData.accountType === 'business'}
            onChange={() => updateField('accountType', 'business')}
          />
        </Stack>
      </Stack>

      <Divider />

      <Stack gap="small">
        <Text weight="medium">Notification Preferences</Text>
        <Checkbox
          label="Email notifications"
          checked={formData.emailNotifications}
          onChange={(e) => updateField('emailNotifications', e.target.checked)}
        />
        <Checkbox
          label="SMS notifications"
          checked={formData.smsNotifications}
          onChange={(e) => updateField('smsNotifications', e.target.checked)}
        />
        <Checkbox
          label="Marketing updates"
          checked={formData.marketingUpdates}
          onChange={(e) => updateField('marketingUpdates', e.target.checked)}
        />
      </Stack>

      <Divider />

      <Select
        label="Theme Preference"
        options={themeOptions}
        value={formData.theme}
        onChange={(value) => updateField('theme', value)}
      />

      <Inline justify="space-between">
        <Button kind="secondary" onClick={() => goBack('step2')}>
          Back
        </Button>
        <Button kind="brand" onClick={() => goToStep('step3', 'step4')}>
          Continue to Review
        </Button>
      </Inline>
    </Stack>
  );

  // Step 4: Review & Submit
  const renderStep4Content = () => (
    <Stack gap="medium">
      {submitted ? (
        <Stack gap="medium" align="center">
          <Badge variant="success" size="large">
            Registration Complete!
          </Badge>
          <Text color="secondary">Thank you for completing the registration wizard.</Text>
          <Button kind="secondary" onClick={handleReset}>
            Start Over
          </Button>
        </Stack>
      ) : (
        <>
          {/* Personal Information Summary */}
          <Card padding="medium">
            <Stack gap="small">
              <Text weight="semibold" color="secondary">
                Personal Information
              </Text>
              <Grid columns={2} gap="small">
                <Text>
                  <Text weight="medium">Name:</Text> {formData.firstName} {formData.lastName}
                </Text>
                <Text>
                  <Text weight="medium">Email:</Text> {formData.email}
                </Text>
                <Text>
                  <Text weight="medium">Phone:</Text> {formData.phone || 'Not provided'}
                </Text>
              </Grid>
            </Stack>
          </Card>

          {/* Address Summary */}
          <Card padding="medium">
            <Stack gap="small">
              <Text weight="semibold" color="secondary">
                Address Information
              </Text>
              <Text>
                {formData.streetAddress}
                <br />
                {formData.city},{' '}
                {stateOptions.find((s) => s.value === formData.state)?.label || formData.state}{' '}
                {formData.zipCode}
                <br />
                {countryOptions.find((c) => c.value === formData.country)?.label ||
                  formData.country}
              </Text>
            </Stack>
          </Card>

          {/* Preferences Summary */}
          <Card padding="medium">
            <Stack gap="small">
              <Text weight="semibold" color="secondary">
                Account Preferences
              </Text>
              <Grid columns={2} gap="small">
                <Text>
                  <Text weight="medium">Account Type:</Text>{' '}
                  {formData.accountType === 'personal' ? 'Personal' : 'Business'}
                </Text>
                <Text>
                  <Text weight="medium">Theme:</Text>{' '}
                  {themeOptions.find((t) => t.value === formData.theme)?.label}
                </Text>
              </Grid>
              <Stack direction="horizontal" gap="small">
                {formData.emailNotifications && (
                  <Badge variant="info" size="small">
                    Email
                  </Badge>
                )}
                {formData.smsNotifications && (
                  <Badge variant="info" size="small">
                    SMS
                  </Badge>
                )}
                {formData.marketingUpdates && (
                  <Badge variant="info" size="small">
                    Marketing
                  </Badge>
                )}
              </Stack>
            </Stack>
          </Card>

          <Inline justify="space-between">
            <Button kind="secondary" onClick={() => goBack('step3')}>
              Back
            </Button>
            <Button kind="brand" onClick={handleSubmit}>
              Submit Registration
            </Button>
          </Inline>
        </>
      )}
    </Stack>
  );

  // Accordion items
  const accordionItems = [
    {
      id: 'step1',
      title: (
        <Inline justify="space-between" align="center" gap="medium">
          <Text weight="medium">Step 1: Personal Information</Text>
          {renderStepBadge('step1')}
        </Inline>
      ),
      content: renderStep1Content(),
    },
    {
      id: 'step2',
      title: (
        <Inline justify="space-between" align="center" gap="medium">
          <Text weight="medium">Step 2: Address Information</Text>
          {renderStepBadge('step2')}
        </Inline>
      ),
      content: renderStep2Content(),
    },
    {
      id: 'step3',
      title: (
        <Inline justify="space-between" align="center" gap="medium">
          <Text weight="medium">Step 3: Account Preferences</Text>
          {renderStepBadge('step3')}
        </Inline>
      ),
      content: renderStep3Content(),
    },
    {
      id: 'step4',
      title: (
        <Inline justify="space-between" align="center" gap="medium">
          <Text weight="medium">Step 4: Review & Submit</Text>
          {renderStepBadge('step4')}
        </Inline>
      ),
      content: renderStep4Content(),
    },
  ];

  return (
    <Container size="medium" padded>
      <Card padding="large">
        <Stack gap="large">
          <Stack gap="small">
            <Heading level={1}>User Registration Wizard</Heading>
            <Text color="secondary">Complete all steps to finish your registration.</Text>
          </Stack>

          <Accordion items={accordionItems} value={openStep} onChange={handleAccordionChange} />
        </Stack>
      </Card>
    </Container>
  );
}

export default AccordionWizard;
