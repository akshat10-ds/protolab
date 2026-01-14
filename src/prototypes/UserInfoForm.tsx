import { useState } from 'react';
import {
  Card,
  Stack,
  Grid,
  Inline,
  Heading,
  Text,
  Input,
  Select,
  TextArea,
  Switch,
  Checkbox,
  Button,
  Accordion,
} from '@/design-system';
import type { AccordionItemData } from '@/design-system';
import styles from './UserInfoForm.module.css';

/**
 * UserInfoForm
 *
 * A progressive disclosure form using accordions to organize
 * user information collection into logical sections.
 */

// State/Province options for the select
const stateOptions = [
  { value: '', label: 'Select state' },
  { value: 'CA', label: 'California' },
  { value: 'NY', label: 'New York' },
  { value: 'TX', label: 'Texas' },
  { value: 'FL', label: 'Florida' },
  { value: 'WA', label: 'Washington' },
  { value: 'IL', label: 'Illinois' },
  { value: 'PA', label: 'Pennsylvania' },
  { value: 'OH', label: 'Ohio' },
];

// Country options
const countryOptions = [
  { value: '', label: 'Select country' },
  { value: 'US', label: 'United States' },
  { value: 'CA', label: 'Canada' },
  { value: 'UK', label: 'United Kingdom' },
  { value: 'AU', label: 'Australia' },
  { value: 'DE', label: 'Germany' },
  { value: 'FR', label: 'France' },
];

// Language options
const languageOptions = [
  { value: '', label: 'Select language' },
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
  { value: 'zh', label: 'Chinese' },
  { value: 'ja', label: 'Japanese' },
];

// Timezone options
const timezoneOptions = [
  { value: '', label: 'Select timezone' },
  { value: 'PST', label: 'Pacific Time (PST)' },
  { value: 'MST', label: 'Mountain Time (MST)' },
  { value: 'CST', label: 'Central Time (CST)' },
  { value: 'EST', label: 'Eastern Time (EST)' },
  { value: 'UTC', label: 'UTC' },
  { value: 'GMT', label: 'GMT' },
];

export function UserInfoForm() {
  // Track which accordion sections are open
  const [openSections, setOpenSections] = useState<string[]>(['personal']);

  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    streetAddress: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    language: '',
    timezone: '',
    bio: '',
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: false,
  });

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSelectChange = (field: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSwitchChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.checked }));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    alert('Form submitted! Check console for data.');
  };

  const handleCancel = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      streetAddress: '',
      city: '',
      state: '',
      zip: '',
      country: '',
      language: '',
      timezone: '',
      bio: '',
      emailNotifications: true,
      smsNotifications: false,
      marketingEmails: false,
    });
    setOpenSections(['personal']);
  };

  // Define accordion items with form sections
  const accordionItems: AccordionItemData[] = [
    {
      id: 'personal',
      title: 'Personal Information',
      startIcon: 'user',
      subtitle: 'Your name and contact details',
      content: (
        <Stack gap="medium">
          <Grid columns={2} gap="medium">
            <Input
              label="First Name"
              placeholder="John"
              value={formData.firstName}
              onChange={handleInputChange('firstName')}
              required
            />
            <Input
              label="Last Name"
              placeholder="Doe"
              value={formData.lastName}
              onChange={handleInputChange('lastName')}
              required
            />
          </Grid>
          <Input
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleInputChange('email')}
            required
          />
        </Stack>
      ),
    },
    {
      id: 'address',
      title: 'Address Details',
      startIcon: 'home',
      subtitle: 'Where can we reach you?',
      content: (
        <Stack gap="medium">
          <Input
            label="Street Address"
            placeholder="123 Main Street"
            value={formData.streetAddress}
            onChange={handleInputChange('streetAddress')}
          />
          <Grid columns={3} gap="medium">
            <Input
              label="City"
              placeholder="San Francisco"
              value={formData.city}
              onChange={handleInputChange('city')}
            />
            <Select
              label="State"
              options={stateOptions}
              value={formData.state}
              onChange={handleSelectChange('state')}
            />
            <Input
              label="ZIP Code"
              placeholder="94102"
              value={formData.zip}
              onChange={handleInputChange('zip')}
            />
          </Grid>
          <Select
            label="Country"
            options={countryOptions}
            value={formData.country}
            onChange={handleSelectChange('country')}
          />
        </Stack>
      ),
    },
    {
      id: 'preferences',
      title: 'Preferences',
      startIcon: 'settings',
      subtitle: 'Customize your experience',
      content: (
        <Stack gap="medium">
          <Grid columns={2} gap="medium">
            <Select
              label="Language"
              options={languageOptions}
              value={formData.language}
              onChange={handleSelectChange('language')}
            />
            <Select
              label="Timezone"
              options={timezoneOptions}
              value={formData.timezone}
              onChange={handleSelectChange('timezone')}
            />
          </Grid>
          <TextArea
            label="Bio"
            placeholder="Tell us a little about yourself..."
            value={formData.bio}
            onChange={handleInputChange('bio')}
            rows={3}
          />
        </Stack>
      ),
    },
    {
      id: 'notifications',
      title: 'Notifications',
      startIcon: 'bell',
      subtitle: 'How should we contact you?',
      content: (
        <Stack gap="medium">
          <Switch
            label="Email notifications"
            description="Receive updates and alerts via email"
            checked={formData.emailNotifications}
            onChange={handleSwitchChange('emailNotifications')}
          />
          <Switch
            label="SMS notifications"
            description="Get text messages for important updates"
            checked={formData.smsNotifications}
            onChange={handleSwitchChange('smsNotifications')}
          />
          <Checkbox
            label="Marketing communications"
            description="Receive news, tips, and special offers"
            checked={formData.marketingEmails}
            onChange={handleSwitchChange('marketingEmails')}
          />
        </Stack>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <Card>
        <Card.Body>
          <Stack gap="large">
            {/* Header Section */}
            <Stack gap="small">
              <Heading level={2}>Get Started</Heading>
              <Text color="secondary">
                Tell us a bit about yourself to personalize your experience. You can expand each
                section to fill in the details.
              </Text>
            </Stack>

            {/* Accordion Form Sections */}
            <Accordion
              items={accordionItems}
              allowMultiple
              bordered={false}
              openItems={openSections}
              onOpenItemsChange={setOpenSections}
            />

            {/* Action Buttons */}
            <Inline justify="end" gap="small">
              <Button kind="secondary" onClick={handleCancel}>
                Cancel
              </Button>
              <Button kind="brand" onClick={handleSubmit}>
                Submit
              </Button>
            </Inline>
          </Stack>
        </Card.Body>
      </Card>
    </div>
  );
}

export default UserInfoForm;
