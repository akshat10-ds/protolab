import { useState } from 'react';
import {
  Card,
  Heading,
  Input,
  Select,
  TextArea,
  Checkbox,
  Button,
  Stack,
  Inline,
} from '@/design-system';

/**
 * SimpleForm Prototype
 *
 * A basic contact form demonstrating Ink Design System components:
 * - Card (Layer 3) - Container
 * - Heading (Layer 3) - Title
 * - Input (Layer 3) - Text fields
 * - Select (Layer 3) - Dropdown
 * - TextArea (Layer 3) - Multi-line input
 * - Checkbox (Layer 3) - Boolean input
 * - Button (Layer 3) - Actions
 * - Stack (Layer 2) - Vertical layout
 * - Inline (Layer 2) - Horizontal button layout
 */

const subjectOptions = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'support', label: 'Technical Support' },
  { value: 'sales', label: 'Sales Question' },
  { value: 'feedback', label: 'Feedback' },
];

export function SimpleForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSubmit = () => {
    console.log('Form submitted:', { name, email, subject, message, agreedToTerms });
  };

  const handleCancel = () => {
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
    setAgreedToTerms(false);
  };

  return (
    <Card padding="large">
      <Stack gap="medium">
        <Heading level={2}>Contact Form</Heading>

        <Input
          label="Name"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Select
          label="Subject"
          options={subjectOptions}
          value={subject}
          onChange={(value) => setSubject(value)}
          placeholder="Select a subject"
        />

        <TextArea
          label="Message"
          placeholder="Enter your message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <Checkbox
          label="I agree to the terms and conditions"
          checked={agreedToTerms}
          onChange={(e) => setAgreedToTerms(e.target.checked)}
        />

        <Inline gap="small">
          <Button kind="primary" onClick={handleSubmit}>
            Submit
          </Button>
          <Button kind="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        </Inline>
      </Stack>
    </Card>
  );
}

export default SimpleForm;
