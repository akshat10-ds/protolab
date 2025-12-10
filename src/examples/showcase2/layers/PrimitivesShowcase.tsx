import React from 'react';
import {
  Stack,
  Grid,
  Inline,
  Button,
  IconButton,
  Link,
  Input,
  Select,
  Checkbox,
  Radio,
  Switch,
  TextArea,
  Slider,
  Stepper,
  Badge,
  Avatar,
  AvatarGroup,
  Chip,
  AlertBadge,
  StatusLight,
  Divider,
  Card,
  Skeleton,
  Heading,
  Text,
  Spinner,
  ProgressBar,
  Callout,
  Banner,
  Tooltip,
  Icon,
  Alert,
} from '@/design-system';

export interface PrimitivesShowcaseProps {
  activeSubpage: string;
}

export const PrimitivesShowcase: React.FC<PrimitivesShowcaseProps> = ({ activeSubpage }) => {
  if (activeSubpage === 'button') {
    return (
      <Stack gap="large">
        <Stack gap="medium">
          <Heading level={2}>Button</Heading>
          <Text color="secondary">Primary action component with multiple variants and states</Text>
          <Alert kind="info" title="Layer 3: Primitive">
            <Text size="small">
              Uses only tokens (Layer 1) and utilities (Layer 2). No dependencies on other
              components.
            </Text>
          </Alert>
        </Stack>

        <Card>
          <Card.Body>
            <Stack gap="large">
              <Stack gap="medium">
                <Heading level={3}>All Variants (kind)</Heading>
                <Grid columns={5} gap="medium">
                  <Stack gap="small">
                    <Text size="small" weight="semibold">
                      Brand
                    </Text>
                    <Button kind="brand">Brand</Button>
                  </Stack>
                  <Stack gap="small">
                    <Text size="small" weight="semibold">
                      Primary
                    </Text>
                    <Button kind="primary">Primary</Button>
                  </Stack>
                  <Stack gap="small">
                    <Text size="small" weight="semibold">
                      Secondary
                    </Text>
                    <Button kind="secondary">Secondary</Button>
                  </Stack>
                  <Stack gap="small">
                    <Text size="small" weight="semibold">
                      Tertiary
                    </Text>
                    <Button kind="tertiary">Tertiary</Button>
                  </Stack>
                  <Stack gap="small">
                    <Text size="small" weight="semibold">
                      Danger
                    </Text>
                    <Button kind="danger">Danger</Button>
                  </Stack>
                </Grid>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>All Sizes</Heading>
                <Stack direction="horizontal" gap="medium" align="center">
                  <Button kind="brand" size="small">
                    Small
                  </Button>
                  <Button kind="brand" size="medium">
                    Medium
                  </Button>
                  <Button kind="brand" size="large">
                    Large
                  </Button>
                  <Button kind="brand" size="xlarge">
                    XLarge
                  </Button>
                </Stack>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>With Icons (startElement / endElement)</Heading>
                <Grid columns={3} gap="medium">
                  <Button kind="brand" startElement={<Icon name="plus" size="small" />}>
                    Start Icon
                  </Button>
                  <Button kind="primary" endElement={<Icon name="arrow-right" size="small" />}>
                    End Icon
                  </Button>
                  <Button
                    kind="secondary"
                    startElement={<Icon name="download" size="small" />}
                    endElement={<Icon name="external-link" size="small" />}
                  >
                    Both Icons
                  </Button>
                </Grid>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>States</Heading>
                <Grid columns={3} gap="medium">
                  <Stack gap="small">
                    <Text size="small" weight="semibold">
                      Loading
                    </Text>
                    <Button kind="brand" loading>
                      Loading...
                    </Button>
                  </Stack>
                  <Stack gap="small">
                    <Text size="small" weight="semibold">
                      Disabled
                    </Text>
                    <Button kind="brand" disabled>
                      Disabled
                    </Button>
                  </Stack>
                  <Stack gap="small">
                    <Text size="small" weight="semibold">
                      Active
                    </Text>
                    <Button kind="brand" active>
                      Active State
                    </Button>
                  </Stack>
                </Grid>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Full Width</Heading>
                <Button kind="brand" fullWidth>
                  Full Width Button
                </Button>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Rounded (Pill)</Heading>
                <Inline gap="medium">
                  <Button kind="brand" rounded>
                    Rounded Brand
                  </Button>
                  <Button kind="primary" rounded>
                    Rounded Primary
                  </Button>
                  <Button kind="secondary" rounded>
                    Rounded Secondary
                  </Button>
                </Inline>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Menu Trigger</Heading>
                <Inline gap="medium">
                  <Button kind="brand" menuTrigger>
                    Options
                  </Button>
                  <Button kind="secondary" menuTrigger>
                    More Actions
                  </Button>
                </Inline>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>As Link (href)</Heading>
                <Inline gap="medium">
                  <Button kind="brand" href="https://www.docusign.com" target="_blank">
                    Visit DocuSign
                  </Button>
                  <Button
                    kind="secondary"
                    href="#"
                    endElement={<Icon name="external-link" size="small" />}
                  >
                    External Link
                  </Button>
                </Inline>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Inverted (for dark backgrounds)</Heading>
                <div
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    padding: '32px',
                    borderRadius: '8px',
                  }}
                >
                  <Inline gap="medium">
                    <Button inverted kind="primary">
                      Primary Inverted
                    </Button>
                    <Button inverted kind="secondary">
                      Secondary Inverted
                    </Button>
                    <Button inverted kind="tertiary">
                      Tertiary Inverted
                    </Button>
                  </Inline>
                </div>
              </Stack>
            </Stack>
          </Card.Body>
        </Card>
      </Stack>
    );
  }

  // LAYER 3: PRIMITIVES - IconButton
  if (activeSubpage === 'iconbutton') {
    return (
      <Stack gap="large">
        <Stack gap="medium">
          <Heading level={2}>IconButton</Heading>
          <Text color="secondary">Button component with icon-only content for compact actions</Text>
          <Alert kind="info" title="Layer 3: Primitive">
            <Text size="small">
              Uses only tokens and utilities. Wraps Icon component in a button interface.
            </Text>
          </Alert>
        </Stack>

        <Card>
          <Card.Body>
            <Stack gap="large">
              <Stack gap="medium">
                <Heading level={3}>All Variants</Heading>
                <Grid columns={5} gap="medium">
                  <Stack gap="small">
                    <Text size="small" weight="semibold">
                      Brand
                    </Text>
                    <IconButton icon="heart" variant="brand" aria-label="Favorite" />
                  </Stack>
                  <Stack gap="small">
                    <Text size="small" weight="semibold">
                      Primary
                    </Text>
                    <IconButton icon="settings" variant="primary" aria-label="Settings" />
                  </Stack>
                  <Stack gap="small">
                    <Text size="small" weight="semibold">
                      Secondary
                    </Text>
                    <IconButton icon="search" variant="secondary" aria-label="Search" />
                  </Stack>
                  <Stack gap="small">
                    <Text size="small" weight="semibold">
                      Tertiary
                    </Text>
                    <IconButton
                      icon="more-horizontal"
                      variant="tertiary"
                      aria-label="More options"
                    />
                  </Stack>
                  <Stack gap="small">
                    <Text size="small" weight="semibold">
                      Danger
                    </Text>
                    <IconButton icon="trash" variant="danger" aria-label="Delete" />
                  </Stack>
                </Grid>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Sizes</Heading>
                <Inline gap="medium" align="center">
                  <IconButton icon="plus" variant="brand" size="small" aria-label="Add (small)" />
                  <IconButton icon="plus" variant="brand" size="medium" aria-label="Add (medium)" />
                </Inline>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Common Icons</Heading>
                <Inline gap="small">
                  <IconButton icon="edit" variant="secondary" aria-label="Edit" />
                  <IconButton icon="copy" variant="secondary" aria-label="Copy" />
                  <IconButton icon="download" variant="secondary" aria-label="Download" />
                  <IconButton icon="share" variant="secondary" aria-label="Share" />
                  <IconButton icon="close" variant="secondary" aria-label="Close" />
                  <IconButton icon="refresh" variant="secondary" aria-label="Refresh" />
                </Inline>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Disabled State</Heading>
                <Inline gap="medium">
                  <IconButton
                    icon="heart"
                    variant="brand"
                    disabled
                    aria-label="Disabled favorite"
                  />
                  <IconButton
                    icon="settings"
                    variant="primary"
                    disabled
                    aria-label="Disabled settings"
                  />
                </Inline>
              </Stack>
            </Stack>
          </Card.Body>
        </Card>
      </Stack>
    );
  }

  // LAYER 3: PRIMITIVES - Link
  if (activeSubpage === 'link') {
    return (
      <Stack gap="large">
        <Stack gap="medium">
          <Heading level={2}>Link</Heading>
          <Text color="secondary">Hyperlink component with various styles and states</Text>
          <Alert kind="info" title="Layer 3: Primitive">
            <Text size="small">
              Uses only tokens. Provides accessible link styling with hover and focus states.
            </Text>
          </Alert>
        </Stack>

        <Card>
          <Card.Body>
            <Stack gap="large">
              <Stack gap="medium">
                <Heading level={3}>Kinds</Heading>
                <Stack gap="small">
                  <div>
                    <Text
                      size="small"
                      weight="semibold"
                      style={{ marginBottom: '8px', display: 'block' }}
                    >
                      Default
                    </Text>
                    <Link kind="default" href="#">
                      This is a default link
                    </Link>
                  </div>
                  <div>
                    <Text
                      size="small"
                      weight="semibold"
                      style={{ marginBottom: '8px', display: 'block' }}
                    >
                      Subtle
                    </Text>
                    <Link kind="subtle" href="#">
                      This is a subtle link
                    </Link>
                  </div>
                </Stack>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Sizes</Heading>
                <Stack gap="small">
                  <Link size="small" href="#">
                    Small link
                  </Link>
                  <Link size="medium" href="#">
                    Medium link (default)
                  </Link>
                </Stack>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Discrete Mode</Heading>
                <Text size="small" color="secondary">
                  Only shows underline on hover
                </Text>
                <Link discrete href="#">
                  Hover to see underline
                </Link>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>External Links</Heading>
                <Stack gap="small">
                  <Link external href="https://www.docusign.com">
                    External link with icon
                  </Link>
                  <Link external kind="subtle" href="https://www.docusign.com">
                    Subtle external link
                  </Link>
                </Stack>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Disabled State</Heading>
                <Link disabled href="#">
                  Disabled link
                </Link>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>In Context</Heading>
                <Text>
                  This is a paragraph with a <Link href="#">regular link</Link> and also a{' '}
                  <Link kind="subtle" href="#">
                    subtle link
                  </Link>{' '}
                  embedded in the text.
                </Text>
              </Stack>
            </Stack>
          </Card.Body>
        </Card>
      </Stack>
    );
  }

  // LAYER 3: PRIMITIVES - Input
  if (activeSubpage === 'input') {
    const [inputValue, setInputValue] = React.useState('');

    return (
      <Stack gap="large">
        <Stack gap="medium">
          <Heading level={2}>Input</Heading>
          <Text color="secondary">Text input field with label, description, and error states</Text>
          <Alert kind="info" title="Layer 3: Primitive">
            <Text size="small">
              Accessible form input with built-in validation states and helper text.
            </Text>
          </Alert>
        </Stack>

        <Card>
          <Card.Body>
            <Stack gap="large">
              <Stack gap="medium">
                <Heading level={3}>Sizes</Heading>
                <Grid columns={2} gap="medium">
                  <Input
                    label="Small Input"
                    size="small"
                    placeholder="Enter text..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                  <Input
                    label="Medium Input (Default)"
                    size="medium"
                    placeholder="Enter text..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                </Grid>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>With Description</Heading>
                <Input
                  label="Email Address"
                  description="We'll never share your email with anyone else."
                  placeholder="you@example.com"
                  type="email"
                />
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Required Field</Heading>
                <Input label="Required Field" required placeholder="This field is required" />
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Error State</Heading>
                <Input
                  label="Username"
                  error="This username is already taken"
                  placeholder="Enter username"
                />
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Disabled State</Heading>
                <Input
                  label="Disabled Input"
                  disabled
                  placeholder="Cannot edit this"
                  value="Disabled value"
                />
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Hidden Label</Heading>
                <Input label="Search" hideLabel placeholder="Search..." />
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Input Types</Heading>
                <Grid columns={2} gap="medium">
                  <Input label="Text" type="text" placeholder="Text input" />
                  <Input label="Email" type="email" placeholder="email@example.com" />
                  <Input label="Password" type="password" placeholder="Enter password" />
                  <Input label="Number" type="number" placeholder="123" />
                  <Input label="Date" type="date" />
                  <Input label="Time" type="time" />
                </Grid>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Custom Width</Heading>
                <Input label="Custom Width Input" width="300px" placeholder="300px wide" />
              </Stack>
            </Stack>
          </Card.Body>
        </Card>
      </Stack>
    );
  }

  // LAYER 3: PRIMITIVES - Checkbox
  if (activeSubpage === 'checkbox') {
    const [checkboxStates, setCheckboxStates] = React.useState({
      basic: false,
      withDesc: false,
      indeterminate: true,
      checked: true,
    });

    return (
      <Stack gap="large">
        <Stack gap="medium">
          <Heading level={2}>Checkbox</Heading>
          <Text color="secondary">Checkbox input for selecting one or multiple options</Text>
          <Alert kind="info" title="Layer 3: Primitive">
            <Text size="small">
              Accessible checkbox with custom styling and indeterminate state support.
            </Text>
          </Alert>
        </Stack>

        <Card>
          <Card.Body>
            <Stack gap="large">
              <Stack gap="medium">
                <Heading level={3}>Basic Checkbox</Heading>
                <Checkbox
                  label="I agree to the terms and conditions"
                  checked={checkboxStates.basic}
                  onChange={(e) =>
                    setCheckboxStates({ ...checkboxStates, basic: e.target.checked })
                  }
                />
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>With Description</Heading>
                <Checkbox
                  label="Send me email notifications"
                  description="Receive updates about your account activity"
                  checked={checkboxStates.withDesc}
                  onChange={(e) =>
                    setCheckboxStates({ ...checkboxStates, withDesc: e.target.checked })
                  }
                />
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>States</Heading>
                <Stack gap="small">
                  <Checkbox label="Unchecked" checked={false} onChange={() => {}} />
                  <Checkbox
                    label="Checked"
                    checked={checkboxStates.checked}
                    onChange={(e) =>
                      setCheckboxStates({ ...checkboxStates, checked: e.target.checked })
                    }
                  />
                  <Checkbox
                    label="Indeterminate"
                    indeterminate
                    checked={checkboxStates.indeterminate}
                    onChange={(e) =>
                      setCheckboxStates({ ...checkboxStates, indeterminate: e.target.checked })
                    }
                  />
                  <Checkbox
                    label="Disabled Unchecked"
                    disabled
                    checked={false}
                    onChange={() => {}}
                  />
                  <Checkbox label="Disabled Checked" disabled checked={true} onChange={() => {}} />
                </Stack>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Error State</Heading>
                <Checkbox
                  label="You must agree to continue"
                  error="This field is required"
                  checked={false}
                  onChange={() => {}}
                />
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Checkbox Group</Heading>
                <Text size="small" weight="semibold">
                  Select your interests:
                </Text>
                <Stack gap="small">
                  <Checkbox label="Technology" />
                  <Checkbox label="Design" />
                  <Checkbox label="Business" />
                  <Checkbox label="Marketing" />
                </Stack>
              </Stack>
            </Stack>
          </Card.Body>
        </Card>
      </Stack>
    );
  }

  // LAYER 3: PRIMITIVES - Radio
  if (activeSubpage === 'radio') {
    return (
      <Stack gap="large">
        <Stack gap="medium">
          <Heading level={2}>Radio</Heading>
          <Text color="secondary">Radio button for selecting one option from a group</Text>
          <Alert kind="info" title="Layer 3: Primitive">
            <Text size="small">
              Accessible radio input with custom styling. Use the same name prop to group radios.
            </Text>
          </Alert>
        </Stack>

        <Card>
          <Card.Body>
            <Stack gap="large">
              <Stack gap="medium">
                <Heading level={3}>Radio Group</Heading>
                <Stack gap="small">
                  <Radio
                    label="Option 1"
                    name="radio-group"
                    value="option1"
                    checked={radioValue === 'option1'}
                    onChange={(e) => setRadioValue(e.target.value)}
                  />
                  <Radio
                    label="Option 2"
                    name="radio-group"
                    value="option2"
                    checked={radioValue === 'option2'}
                    onChange={(e) => setRadioValue(e.target.value)}
                  />
                  <Radio
                    label="Option 3"
                    name="radio-group"
                    value="option3"
                    checked={radioValue === 'option3'}
                    onChange={(e) => setRadioValue(e.target.value)}
                  />
                </Stack>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>With Description</Heading>
                <Stack gap="small">
                  <Radio
                    label="Standard Shipping"
                    description="Arrives in 5-7 business days"
                    name="shipping"
                    value="standard"
                  />
                  <Radio
                    label="Express Shipping"
                    description="Arrives in 2-3 business days"
                    name="shipping"
                    value="express"
                  />
                  <Radio
                    label="Overnight Shipping"
                    description="Arrives next business day"
                    name="shipping"
                    value="overnight"
                  />
                </Stack>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Disabled State</Heading>
                <Stack gap="small">
                  <Radio label="Available Option" name="disabled-group" value="available" />
                  <Radio label="Disabled Option" name="disabled-group" value="disabled" disabled />
                  <Radio
                    label="Disabled & Selected"
                    name="disabled-group"
                    value="selected"
                    disabled
                    checked
                    onChange={() => {}}
                  />
                </Stack>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Error State</Heading>
                <Radio
                  label="Invalid option"
                  error="This option is not available"
                  name="error-group"
                  value="error"
                />
              </Stack>
            </Stack>
          </Card.Body>
        </Card>
      </Stack>
    );
  }

  // LAYER 3: PRIMITIVES - Switch
  if (activeSubpage === 'switch') {
    const [switches, setSwitches] = React.useState({
      basic: false,
      withLabel: true,
      leftLabel: false,
      withDesc: false,
    });

    return (
      <Stack gap="large">
        <Stack gap="medium">
          <Heading level={2}>Switch</Heading>
          <Text color="secondary">Toggle switch for binary on/off states</Text>
          <Alert kind="info" title="Layer 3: Primitive">
            <Text size="small">
              Toggle control for settings and preferences. Provides immediate state change feedback.
            </Text>
          </Alert>
        </Stack>

        <Card>
          <Card.Body>
            <Stack gap="large">
              <Stack gap="medium">
                <Heading level={3}>Basic Switch (No Label)</Heading>
                <Switch
                  checked={switches.basic}
                  onChange={(checked) => setSwitches({ ...switches, basic: checked })}
                />
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>With Label</Heading>
                <Switch
                  label="Enable notifications"
                  checked={switches.withLabel}
                  onChange={(checked) => setSwitches({ ...switches, withLabel: checked })}
                />
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Label Position</Heading>
                <Stack gap="medium">
                  <Switch
                    label="Label on Right (Default)"
                    labelPosition="right"
                    checked={switchValue}
                    onChange={setSwitchValue}
                  />
                  <Switch
                    label="Label on Left"
                    labelPosition="left"
                    checked={switches.leftLabel}
                    onChange={(checked) => setSwitches({ ...switches, leftLabel: checked })}
                  />
                </Stack>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>With Description</Heading>
                <Switch
                  label="Dark Mode"
                  description="Switch to dark theme across the application"
                  checked={switches.withDesc}
                  onChange={(checked) => setSwitches({ ...switches, withDesc: checked })}
                />
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>States</Heading>
                <Stack gap="small">
                  <Stack gap="small">
                    <Text size="small" weight="semibold">
                      Off State
                    </Text>
                    <Switch label="Disabled" checked={false} onChange={() => {}} />
                  </Stack>
                  <Stack gap="small">
                    <Text size="small" weight="semibold">
                      On State
                    </Text>
                    <Switch label="Enabled" checked={true} onChange={() => {}} />
                  </Stack>
                  <Stack gap="small">
                    <Text size="small" weight="semibold">
                      Disabled Off
                    </Text>
                    <Switch label="Disabled" disabled checked={false} onChange={() => {}} />
                  </Stack>
                  <Stack gap="small">
                    <Text size="small" weight="semibold">
                      Disabled On
                    </Text>
                    <Switch label="Disabled" disabled checked={true} onChange={() => {}} />
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Card.Body>
        </Card>
      </Stack>
    );
  }

  // LAYER 3: PRIMITIVES - TextArea
  if (activeSubpage === 'textarea') {
    return (
      <Stack gap="large">
        <Stack gap="medium">
          <Heading level={2}>TextArea</Heading>
          <Text color="secondary">Multi-line text input with rich features</Text>
          <Alert kind="info" title="Layer 3: Primitive">
            <Text size="small">
              Supports auto-expand, character count, and multiple resize modes.
            </Text>
          </Alert>
        </Stack>

        <Card>
          <Card.Body>
            <Stack gap="large">
              <Stack gap="medium">
                <Heading level={3}>Basic TextArea</Heading>
                <TextArea
                  label="Comments"
                  placeholder="Enter your comments..."
                  value={textAreaValue}
                  onChange={(e) => setTextAreaValue(e.target.value)}
                />
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>With Description</Heading>
                <TextArea
                  label="Bio"
                  description="Tell us about yourself"
                  placeholder="Write a short bio..."
                />
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Required Field</Heading>
                <TextArea label="Required Feedback" required placeholder="This field is required" />
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Custom Rows</Heading>
                <Grid columns={2} gap="medium">
                  <TextArea label="Small (3 rows)" rows={3} placeholder="3 rows" />
                  <TextArea label="Large (8 rows)" rows={8} placeholder="8 rows" />
                </Grid>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Resize Modes</Heading>
                <Grid columns={2} gap="medium">
                  <TextArea
                    label="Vertical (Default)"
                    resize="vertical"
                    placeholder="Can resize vertically"
                  />
                  <TextArea
                    label="Horizontal"
                    resize="horizontal"
                    placeholder="Can resize horizontally"
                  />
                  <TextArea label="Both" resize="both" placeholder="Can resize both ways" />
                  <TextArea label="None" resize="none" placeholder="Cannot resize" />
                </Grid>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Character Count</Heading>
                <TextArea
                  label="Tweet"
                  characterCount
                  maxLength={280}
                  placeholder="What's happening?"
                />
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Allow Over Limit</Heading>
                <TextArea
                  label="Flexible Input"
                  characterCount
                  maxLength={50}
                  allowOverLimit
                  placeholder="You can type over the limit (shows warning)"
                />
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Auto Expand</Heading>
                <TextArea
                  label="Auto-expanding TextArea"
                  autoExpand
                  placeholder="This textarea will grow as you type..."
                  description="The textarea expands to fit content"
                />
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Error State</Heading>
                <TextArea
                  label="Description"
                  error="Description must be at least 50 characters"
                  placeholder="Enter description..."
                />
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Disabled State</Heading>
                <TextArea
                  label="Disabled TextArea"
                  disabled
                  value="This content cannot be edited"
                />
              </Stack>
            </Stack>
          </Card.Body>
        </Card>
      </Stack>
    );
  }

  // LAYER 3: PRIMITIVES - Select
  if (activeSubpage === 'select') {
    return (
      <Stack gap="large">
        <Stack gap="medium">
          <Heading level={2}>Select</Heading>
          <Text color="secondary">Dropdown selection component with label and validation</Text>
          <Alert kind="info" title="Layer 3: Primitive">
            <Text size="small">
              Native select element with consistent styling and accessibility features.
            </Text>
          </Alert>
        </Stack>

        <Card>
          <Card.Body>
            <Stack gap="large">
              <Stack gap="medium">
                <Heading level={3}>Sizes</Heading>
                <Grid columns={2} gap="medium">
                  <Select
                    label="Small Select"
                    size="small"
                    value={selectValue}
                    onChange={(e) => setSelectValue(e.target.value)}
                  >
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </Select>
                  <Select
                    label="Medium Select (Default)"
                    size="medium"
                    value={selectValue}
                    onChange={(e) => setSelectValue(e.target.value)}
                  >
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </Select>
                </Grid>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>With Description</Heading>
                <Select label="Country" description="Select your country of residence">
                  <option value="">Select a country...</option>
                  <option value="us">United States</option>
                  <option value="ca">Canada</option>
                  <option value="uk">United Kingdom</option>
                  <option value="au">Australia</option>
                </Select>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Required Field</Heading>
                <Select label="Required Select" required>
                  <option value="">Choose an option...</option>
                  <option value="1">First Option</option>
                  <option value="2">Second Option</option>
                </Select>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Error State</Heading>
                <Select label="Invalid Selection" error="Please select a valid option">
                  <option value="">Select...</option>
                  <option value="1">Option 1</option>
                  <option value="2">Option 2</option>
                </Select>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Disabled State</Heading>
                <Select label="Disabled Select" disabled>
                  <option value="1">Cannot change this</option>
                </Select>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Hidden Label</Heading>
                <Select label="Filter by status" hideLabel>
                  <option value="all">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </Select>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>With Option Groups</Heading>
                <Select label="Grouped Options">
                  <optgroup label="Fruits">
                    <option value="apple">Apple</option>
                    <option value="banana">Banana</option>
                    <option value="orange">Orange</option>
                  </optgroup>
                  <optgroup label="Vegetables">
                    <option value="carrot">Carrot</option>
                    <option value="broccoli">Broccoli</option>
                    <option value="spinach">Spinach</option>
                  </optgroup>
                </Select>
              </Stack>
            </Stack>
          </Card.Body>
        </Card>
      </Stack>
    );
  }

  // LAYER 3: PRIMITIVES - Slider
  if (activeSubpage === 'slider') {
    return (
      <Stack gap="large">
        <Stack gap="medium">
          <Heading level={2}>Slider</Heading>
          <Text color="secondary">Input control for selecting a numeric value within a range</Text>
          <Alert kind="info" title="Layer 3: Primitive">
            <Text size="small">
              Accessible range input with visual feedback and keyboard support.
            </Text>
          </Alert>
        </Stack>

        <Card>
          <Card.Body>
            <Stack gap="large">
              <Stack gap="medium">
                <Heading level={3}>Basic Slider</Heading>
                <Slider label="Volume" value={sliderValue} onChange={setSliderValue} />
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>With Value Display</Heading>
                <Slider
                  label="Brightness"
                  value={sliderValue}
                  onChange={setSliderValue}
                  showValue
                />
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Custom Range</Heading>
                <Slider
                  label="Price Range"
                  min={0}
                  max={1000}
                  step={50}
                  value={sliderValue}
                  onChange={setSliderValue}
                  showValue
                />
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>With Description</Heading>
                <Slider
                  label="Quality"
                  description="Adjust image quality (higher values = larger file size)"
                  min={1}
                  max={100}
                  value={75}
                  onChange={setSliderValue}
                  showValue
                />
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Step Increments</Heading>
                <Grid columns={2} gap="medium">
                  <Slider
                    label="Step: 1"
                    min={0}
                    max={10}
                    step={1}
                    value={5}
                    onChange={setSliderValue}
                    showValue
                  />
                  <Slider
                    label="Step: 5"
                    min={0}
                    max={100}
                    step={5}
                    value={50}
                    onChange={setSliderValue}
                    showValue
                  />
                </Grid>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Disabled State</Heading>
                <Slider label="Disabled Slider" value={50} onChange={() => {}} disabled />
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Hidden Label</Heading>
                <Slider
                  label="Volume Control"
                  hideLabel
                  value={sliderValue}
                  onChange={setSliderValue}
                  showValue
                />
              </Stack>
            </Stack>
          </Card.Body>
        </Card>
      </Stack>
    );
  }

  // LAYER 3: PRIMITIVES - Stepper
  if (activeSubpage === 'stepper') {
    const steps: Step[] = [
      { id: '1', title: 'Account', description: 'Create your account' },
      { id: '2', title: 'Profile', description: 'Add profile information' },
      { id: '3', title: 'Preferences', description: 'Set your preferences' },
      { id: '4', title: 'Review', description: 'Review and confirm' },
    ];

    const verticalSteps: Step[] = [
      { id: '1', title: 'Completed Step', description: 'This step is done' },
      { id: '2', title: 'Active Step', description: 'Currently on this step' },
      { id: '3', title: 'Upcoming Step', description: 'Not started yet' },
    ];

    return (
      <Stack gap="large">
        <Stack gap="medium">
          <Heading level={2}>Stepper</Heading>
          <Text color="secondary">Progress indicator for multi-step workflows</Text>
          <Alert kind="info" title="Layer 3: Primitive">
            <Text size="small">Shows user progress through a linear sequence of steps.</Text>
          </Alert>
        </Stack>

        <Card>
          <Card.Body>
            <Stack gap="large">
              <Stack gap="medium">
                <Heading level={3}>Horizontal Stepper</Heading>
                <Stepper steps={steps} activeStep={activeStepIndex} />
                <Inline gap="small">
                  <Button
                    kind="secondary"
                    size="small"
                    onClick={() => setActiveStepIndex(Math.max(0, activeStepIndex - 1))}
                    disabled={activeStepIndex === 0}
                  >
                    Previous
                  </Button>
                  <Button
                    kind="brand"
                    size="small"
                    onClick={() =>
                      setActiveStepIndex(Math.min(steps.length - 1, activeStepIndex + 1))
                    }
                    disabled={activeStepIndex === steps.length - 1}
                  >
                    Next
                  </Button>
                </Inline>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Vertical Stepper</Heading>
                <Stepper steps={verticalSteps} activeStep={1} orientation="vertical" />
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Clickable Steps</Heading>
                <Stepper
                  steps={steps}
                  activeStep={activeStepIndex}
                  clickable
                  onStepClick={(index) => setActiveStepIndex(index)}
                />
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Without Descriptions</Heading>
                <Stepper steps={steps} activeStep={1} showDescription={false} />
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Without Connectors</Heading>
                <Stepper steps={steps} activeStep={1} showConnector={false} />
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>With Custom Icons</Heading>
                <Stepper
                  steps={[
                    { id: '1', title: 'Login', icon: <Icon name="user" size="small" /> },
                    { id: '2', title: 'Verify', icon: <Icon name="check" size="small" /> },
                    { id: '3', title: 'Complete', icon: <Icon name="star" size="small" /> },
                  ]}
                  activeStep={1}
                />
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>With Error State</Heading>
                <Stepper
                  steps={[
                    { id: '1', title: 'Step 1', status: 'completed' },
                    { id: '2', title: 'Step 2', status: 'error' },
                    { id: '3', title: 'Step 3', status: 'upcoming' },
                  ]}
                  activeStep={1}
                />
              </Stack>
            </Stack>
          </Card.Body>
        </Card>
      </Stack>
    );
  }

  // LAYER 3: PRIMITIVES - Badge
  if (activeSubpage === 'badge') {
    return (
      <Stack gap="large">
        <Stack gap="medium">
          <Heading level={2}>Badge</Heading>
          <Text color="secondary">Small label component for status, categories, and metadata</Text>
          <Alert kind="info" title="Layer 3: Primitive">
            <Text size="small">Compact component for displaying tags, statuses, and counts.</Text>
          </Alert>
        </Stack>

        <Card>
          <Card.Body>
            <Stack gap="large">
              <Stack gap="medium">
                <Heading level={3}>All Variants</Heading>
                <Inline gap="small">
                  <Badge variant="subtle">Subtle</Badge>
                  <Badge variant="emphasis">Emphasis</Badge>
                  <Badge variant="success">Success</Badge>
                  <Badge variant="warning">Warning</Badge>
                  <Badge variant="alert">Alert</Badge>
                  <Badge variant="promo">Promo</Badge>
                </Inline>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Status Badges</Heading>
                <Inline gap="small">
                  <Badge variant="success">Active</Badge>
                  <Badge variant="warning">Pending</Badge>
                  <Badge variant="alert">Inactive</Badge>
                  <Badge variant="subtle">Draft</Badge>
                </Inline>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Category Badges</Heading>
                <Inline gap="small">
                  <Badge>Design</Badge>
                  <Badge>Engineering</Badge>
                  <Badge>Marketing</Badge>
                  <Badge>Sales</Badge>
                  <Badge>Support</Badge>
                </Inline>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Count Badges</Heading>
                <Inline gap="small">
                  <Badge variant="emphasis">12</Badge>
                  <Badge variant="alert">99+</Badge>
                  <Badge variant="success">3 new</Badge>
                </Inline>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>In Context</Heading>
                <Stack gap="small">
                  <Inline gap="small" align="center">
                    <Text>Project Status:</Text>
                    <Badge variant="success">On Track</Badge>
                  </Inline>
                  <Inline gap="small" align="center">
                    <Text>Priority:</Text>
                    <Badge variant="alert">High</Badge>
                  </Inline>
                  <Inline gap="small" align="center">
                    <Text>Version:</Text>
                    <Badge variant="subtle">v2.1.0</Badge>
                  </Inline>
                </Stack>
              </Stack>
            </Stack>
          </Card.Body>
        </Card>
      </Stack>
    );
  }

  // LAYER 3: PRIMITIVES - Avatar
  if (activeSubpage === 'avatar') {
    return (
      <Stack gap="large">
        <Stack gap="medium">
          <Heading level={2}>Avatar</Heading>
          <Text color="secondary">User profile picture or initials display</Text>
          <Alert kind="info" title="Layer 3: Primitive">
            <Text size="small">
              Shows user images, initials, or placeholder icon with consistent sizing.
            </Text>
          </Alert>
        </Stack>

        <Card>
          <Card.Body>
            <Stack gap="large">
              <Stack gap="medium">
                <Heading level={3}>Sizes</Heading>
                <Inline gap="medium" align="end">
                  <Stack gap="small" align="center">
                    <Avatar size="xsmall" initials="XS" />
                    <Text size="xs" color="secondary">
                      XSmall
                    </Text>
                  </Stack>
                  <Stack gap="small" align="center">
                    <Avatar size="small" initials="SM" />
                    <Text size="xs" color="secondary">
                      Small
                    </Text>
                  </Stack>
                  <Stack gap="small" align="center">
                    <Avatar size="medium" initials="MD" />
                    <Text size="xs" color="secondary">
                      Medium
                    </Text>
                  </Stack>
                  <Stack gap="small" align="center">
                    <Avatar size="large" initials="LG" />
                    <Text size="xs" color="secondary">
                      Large
                    </Text>
                  </Stack>
                </Inline>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>With Initials</Heading>
                <Inline gap="small">
                  <Avatar initials="JD" />
                  <Avatar initials="AB" />
                  <Avatar initials="MK" />
                  <Avatar initials="SC" />
                </Inline>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Shapes</Heading>
                <Inline gap="medium">
                  <Stack gap="small" align="center">
                    <Avatar shape="circle" initials="CR" />
                    <Text size="xs" color="secondary">
                      Circle
                    </Text>
                  </Stack>
                  <Stack gap="small" align="center">
                    <Avatar shape="square" initials="SQ" />
                    <Text size="xs" color="secondary">
                      Square
                    </Text>
                  </Stack>
                </Inline>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Color Indices</Heading>
                <Inline gap="small">
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((colorIndex) => (
                    <Avatar
                      key={colorIndex}
                      initials={`C${colorIndex}`}
                      colorIndex={colorIndex as any}
                    />
                  ))}
                </Inline>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>With Images</Heading>
                <Inline gap="small">
                  <Avatar src="https://i.pravatar.cc/150?img=1" alt="User 1" />
                  <Avatar src="https://i.pravatar.cc/150?img=2" alt="User 2" />
                  <Avatar src="https://i.pravatar.cc/150?img=3" alt="User 3" />
                </Inline>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Placeholder (No Initials)</Heading>
                <Avatar />
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Avatar Group</Heading>
                <AvatarGroup max={4}>
                  <Avatar initials="JD" />
                  <Avatar initials="AB" />
                  <Avatar initials="MK" />
                  <Avatar initials="SC" />
                  <Avatar initials="TW" />
                  <Avatar initials="LM" />
                </AvatarGroup>
              </Stack>
            </Stack>
          </Card.Body>
        </Card>
      </Stack>
    );
  }

  // LAYER 3: PRIMITIVES - Chip
  if (activeSubpage === 'chip') {
    const [chips, setChips] = React.useState(['React', 'TypeScript', 'Node.js', 'Express']);

    return (
      <Stack gap="large">
        <Stack gap="medium">
          <Heading level={2}>Chip</Heading>
          <Text color="secondary">Compact element for tags, filters, and selections</Text>
          <Alert kind="info" title="Layer 3: Primitive">
            <Text size="small">
              Interactive pills for tags, removable items, and filter indicators.
            </Text>
          </Alert>
        </Stack>

        <Card>
          <Card.Body>
            <Stack gap="large">
              <Stack gap="medium">
                <Heading level={3}>Basic Chips</Heading>
                <Inline gap="small">
                  <Chip>React</Chip>
                  <Chip>TypeScript</Chip>
                  <Chip>JavaScript</Chip>
                  <Chip>CSS</Chip>
                </Inline>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>With Start Element</Heading>
                <Inline gap="small">
                  <Chip startElement={<Avatar size="xsmall" initials="JD" />}>John Doe</Chip>
                  <Chip startElement={<Avatar size="xsmall" initials="AB" />}>Alice Brown</Chip>
                  <Chip startElement={<Icon name="star" size="small" />}>Favorite</Chip>
                </Inline>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Removable Chips</Heading>
                <Inline gap="small">
                  {chips.map((chip) => (
                    <Chip key={chip} onRemove={() => setChips(chips.filter((c) => c !== chip))}>
                      {chip}
                    </Chip>
                  ))}
                </Inline>
                {chips.length === 0 && <Text color="secondary">All chips removed</Text>}
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Clickable Chips</Heading>
                <Inline gap="small">
                  <Chip onClick={() => alert('All clicked')}>All</Chip>
                  <Chip onClick={() => alert('Active clicked')}>Active</Chip>
                  <Chip onClick={() => alert('Archived clicked')}>Archived</Chip>
                </Inline>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Disabled State</Heading>
                <Inline gap="small">
                  <Chip disabled>Disabled</Chip>
                  <Chip disabled onRemove={() => {}}>
                    Disabled with Remove
                  </Chip>
                  <Chip disabled onClick={() => {}}>
                    Disabled Clickable
                  </Chip>
                </Inline>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Filter Tags</Heading>
                <Inline gap="small">
                  <Chip onRemove={() => {}}>Status: Active</Chip>
                  <Chip onRemove={() => {}}>Date: Last 7 days</Chip>
                  <Chip onRemove={() => {}}>Category: Design</Chip>
                </Inline>
              </Stack>
            </Stack>
          </Card.Body>
        </Card>
      </Stack>
    );
  }

  // LAYER 3: PRIMITIVES - AlertBadge
  if (activeSubpage === 'alert-badge') {
    return (
      <Stack gap="large">
        <Stack gap="medium">
          <Heading level={2}>AlertBadge</Heading>
          <Text color="secondary">Notification badge showing numeric alerts or indicator dots</Text>
          <Alert kind="info" title="Layer 3: Primitive">
            <Text size="small">
              Used for notification counts and alert indicators on buttons, icons, or avatars.
            </Text>
          </Alert>
        </Stack>

        <Card>
          <Card.Body>
            <Stack gap="large">
              <Stack gap="medium">
                <Heading level={3}>With Numbers</Heading>
                <Inline gap="large" align="center">
                  <div style={{ position: 'relative', display: 'inline-block' }}>
                    <IconButton icon="bell" variant="secondary" aria-label="Notifications" />
                    <div style={{ position: 'absolute', top: '-4px', right: '-4px' }}>
                      <AlertBadge value={5} />
                    </div>
                  </div>
                  <div style={{ position: 'relative', display: 'inline-block' }}>
                    <IconButton icon="mail" variant="secondary" aria-label="Messages" />
                    <div style={{ position: 'absolute', top: '-4px', right: '-4px' }}>
                      <AlertBadge value={12} />
                    </div>
                  </div>
                  <div style={{ position: 'relative', display: 'inline-block' }}>
                    <IconButton icon="shopping-cart" variant="secondary" aria-label="Cart" />
                    <div style={{ position: 'absolute', top: '-4px', right: '-4px' }}>
                      <AlertBadge value={120} />
                    </div>
                  </div>
                </Inline>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Kinds</Heading>
                <Inline gap="large" align="center">
                  <Stack gap="small" align="center">
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                      <IconButton icon="bell" variant="secondary" aria-label="Notifications" />
                      <div style={{ position: 'absolute', top: '-4px', right: '-4px' }}>
                        <AlertBadge kind="emphasis" value={8} />
                      </div>
                    </div>
                    <Text size="xs" color="secondary">
                      Emphasis
                    </Text>
                  </Stack>
                  <Stack gap="small" align="center">
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                      <IconButton icon="bell" variant="secondary" aria-label="Notifications" />
                      <div style={{ position: 'absolute', top: '-4px', right: '-4px' }}>
                        <AlertBadge kind="subtle" value={3} />
                      </div>
                    </div>
                    <Text size="xs" color="secondary">
                      Subtle
                    </Text>
                  </Stack>
                </Inline>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Dot Indicator</Heading>
                <Inline gap="large" align="center">
                  <div style={{ position: 'relative', display: 'inline-block' }}>
                    <IconButton icon="bell" variant="secondary" aria-label="Notifications" />
                    <div style={{ position: 'absolute', top: '-2px', right: '-2px' }}>
                      <AlertBadge dot />
                    </div>
                  </div>
                  <div style={{ position: 'relative', display: 'inline-block' }}>
                    <IconButton icon="mail" variant="secondary" aria-label="Messages" />
                    <div style={{ position: 'absolute', top: '-2px', right: '-2px' }}>
                      <AlertBadge dot kind="subtle" />
                    </div>
                  </div>
                  <div style={{ position: 'relative', display: 'inline-block' }}>
                    <Avatar initials="JD" />
                    <div style={{ position: 'absolute', top: '2px', right: '2px' }}>
                      <AlertBadge dot />
                    </div>
                  </div>
                </Inline>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>On Avatars</Heading>
                <Inline gap="medium">
                  <div style={{ position: 'relative', display: 'inline-block' }}>
                    <Avatar initials="AB" size="large" />
                    <div style={{ position: 'absolute', top: '-4px', right: '-4px' }}>
                      <AlertBadge value={5} />
                    </div>
                  </div>
                  <div style={{ position: 'relative', display: 'inline-block' }}>
                    <Avatar initials="CD" size="large" />
                    <div style={{ position: 'absolute', top: '0', right: '0' }}>
                      <AlertBadge dot />
                    </div>
                  </div>
                </Inline>
              </Stack>
            </Stack>
          </Card.Body>
        </Card>
      </Stack>
    );
  }

  // LAYER 3: PRIMITIVES - StatusLight
  if (activeSubpage === 'status-light') {
    return (
      <Stack gap="large">
        <Stack gap="medium">
          <Heading level={2}>StatusLight</Heading>
          <Text color="secondary">
            Colored indicator dot with optional label for status display
          </Text>
          <Alert kind="info" title="Layer 3: Primitive">
            <Text size="small">
              Visual status indicator with semantic colors for states like online, offline, success,
              error.
            </Text>
          </Alert>
        </Stack>

        <Card>
          <Card.Body>
            <Stack gap="large">
              <Stack gap="medium">
                <Heading level={3}>All Kinds</Heading>
                <Stack gap="small">
                  <StatusLight kind="neutral">Neutral</StatusLight>
                  <StatusLight kind="success">Success / Active</StatusLight>
                  <StatusLight kind="warning">Warning / Pending</StatusLight>
                  <StatusLight kind="alert">Alert / Error</StatusLight>
                </Stack>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Filled (Default)</Heading>
                <Inline gap="medium">
                  <StatusLight kind="success" filled>
                    Online
                  </StatusLight>
                  <StatusLight kind="warning" filled>
                    Away
                  </StatusLight>
                  <StatusLight kind="alert" filled>
                    Busy
                  </StatusLight>
                  <StatusLight kind="neutral" filled>
                    Offline
                  </StatusLight>
                </Inline>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Not Filled</Heading>
                <Inline gap="medium">
                  <StatusLight kind="success" filled={false}>
                    Online
                  </StatusLight>
                  <StatusLight kind="warning" filled={false}>
                    Away
                  </StatusLight>
                  <StatusLight kind="alert" filled={false}>
                    Busy
                  </StatusLight>
                  <StatusLight kind="neutral" filled={false}>
                    Offline
                  </StatusLight>
                </Inline>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Without Label</Heading>
                <Inline gap="medium">
                  <StatusLight kind="success" />
                  <StatusLight kind="warning" />
                  <StatusLight kind="alert" />
                  <StatusLight kind="neutral" />
                </Inline>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>In Context</Heading>
                <Stack gap="small">
                  <Card>
                    <Card.Body>
                      <Inline gap="small" align="center">
                        <Avatar initials="JD" />
                        <Stack gap="none">
                          <Text weight="semibold">John Doe</Text>
                          <StatusLight kind="success" filled={false}>
                            Online
                          </StatusLight>
                        </Stack>
                      </Inline>
                    </Card.Body>
                  </Card>
                  <Card>
                    <Card.Body>
                      <Stack gap="small">
                        <Text weight="semibold">System Status</Text>
                        <Stack gap="small">
                          <StatusLight kind="success">API Server: Operational</StatusLight>
                          <StatusLight kind="success">Database: Operational</StatusLight>
                          <StatusLight kind="warning">Cache: Degraded Performance</StatusLight>
                        </Stack>
                      </Stack>
                    </Card.Body>
                  </Card>
                </Stack>
              </Stack>
            </Stack>
          </Card.Body>
        </Card>
      </Stack>
    );
  }

  // LAYER 3: PRIMITIVES - Divider
  if (activeSubpage === 'divider') {
    return (
      <Stack gap="large">
        <Stack gap="medium">
          <Heading level={2}>Divider</Heading>
          <Text color="secondary">Visual separator between content sections</Text>
          <Alert kind="info" title="Layer 3: Primitive">
            <Text size="small">
              Creates visual separation with customizable orientation and spacing.
            </Text>
          </Alert>
        </Stack>

        <Card>
          <Card.Body>
            <Stack gap="large">
              <Stack gap="medium">
                <Heading level={3}>Horizontal (Default)</Heading>
                <Stack gap="small">
                  <Text>Content above divider</Text>
                  <Divider />
                  <Text>Content below divider</Text>
                </Stack>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Spacing Options</Heading>
                <Stack gap="large">
                  <Stack gap="small">
                    <Text size="small" weight="semibold">
                      No Spacing
                    </Text>
                    <Text>Content</Text>
                    <Divider spacing="none" />
                    <Text>Content</Text>
                  </Stack>
                  <Stack gap="small">
                    <Text size="small" weight="semibold">
                      Small Spacing
                    </Text>
                    <Text>Content</Text>
                    <Divider spacing="small" />
                    <Text>Content</Text>
                  </Stack>
                  <Stack gap="small">
                    <Text size="small" weight="semibold">
                      Medium Spacing (Default)
                    </Text>
                    <Text>Content</Text>
                    <Divider spacing="medium" />
                    <Text>Content</Text>
                  </Stack>
                  <Stack gap="small">
                    <Text size="small" weight="semibold">
                      Large Spacing
                    </Text>
                    <Text>Content</Text>
                    <Divider spacing="large" />
                    <Text>Content</Text>
                  </Stack>
                </Stack>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Vertical</Heading>
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '16px', height: '100px' }}
                >
                  <Text>Left</Text>
                  <Divider orientation="vertical" />
                  <Text>Middle</Text>
                  <Divider orientation="vertical" />
                  <Text>Right</Text>
                </div>
              </Stack>
            </Stack>
          </Card.Body>
        </Card>
      </Stack>
    );
  }

  // LAYER 3: PRIMITIVES - Card
  if (activeSubpage === 'card') {
    return (
      <Stack gap="large">
        <Stack gap="medium">
          <Heading level={2}>Card</Heading>
          <Text color="secondary">Container component with Header, Body, and Footer sections</Text>
          <Alert kind="info" title="Layer 3: Primitive">
            <Text size="small">Flexible container with semantic sections and variant styles.</Text>
          </Alert>
        </Stack>

        <Card>
          <Card.Body>
            <Stack gap="large">
              <Stack gap="medium">
                <Heading level={3}>Basic Card</Heading>
                <Card>
                  <Card.Body>
                    <Text>Simple card with just body content</Text>
                  </Card.Body>
                </Card>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>With Header and Footer</Heading>
                <Card>
                  <Card.Header>
                    <Heading level={4}>Card Title</Heading>
                  </Card.Header>
                  <Card.Body>
                    <Text>
                      Card body content goes here. This is the main content area of the card.
                    </Text>
                  </Card.Body>
                  <Card.Footer>
                    <Inline gap="small">
                      <Button kind="primary" size="small">
                        Action
                      </Button>
                      <Button kind="tertiary" size="small">
                        Cancel
                      </Button>
                    </Inline>
                  </Card.Footer>
                </Card>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Variants</Heading>
                <Grid columns={2} gap="medium">
                  <Card variant="light">
                    <Card.Body>
                      <Stack gap="small">
                        <Text weight="semibold">Light (Default)</Text>
                        <Text size="small" color="secondary">
                          White background
                        </Text>
                      </Stack>
                    </Card.Body>
                  </Card>
                  <Card variant="secondary">
                    <Card.Body>
                      <Stack gap="small">
                        <Text weight="semibold">Secondary</Text>
                        <Text size="small" color="secondary">
                          Gray background
                        </Text>
                      </Stack>
                    </Card.Body>
                  </Card>
                  <Card variant="dark">
                    <Card.Body>
                      <Stack gap="small">
                        <Text weight="semibold">Dark</Text>
                        <Text size="small" color="secondary">
                          Purple gradient background
                        </Text>
                      </Stack>
                    </Card.Body>
                  </Card>
                </Grid>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Disabled State</Heading>
                <Card disabled>
                  <Card.Body>
                    <Text>Disabled card with reduced opacity</Text>
                  </Card.Body>
                </Card>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>No Padding</Heading>
                <Card noPadding>
                  <div style={{ background: 'var(--ink-neutral-20)', padding: '16px' }}>
                    <Text>Card with noPadding prop - custom internal padding</Text>
                  </div>
                </Card>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Nested Cards</Heading>
                <Card>
                  <Card.Header>
                    <Heading level={4}>Outer Card</Heading>
                  </Card.Header>
                  <Card.Body>
                    <Stack gap="medium">
                      <Text>This card contains another card inside it</Text>
                      <Card variant="secondary">
                        <Card.Body>
                          <Text>Inner nested card</Text>
                        </Card.Body>
                      </Card>
                    </Stack>
                  </Card.Body>
                </Card>
              </Stack>
            </Stack>
          </Card.Body>
        </Card>
      </Stack>
    );
  }

  // LAYER 3: PRIMITIVES - Skeleton
  if (activeSubpage === 'skeleton') {
    return (
      <Stack gap="large">
        <Stack gap="medium">
          <Heading level={2}>Skeleton</Heading>
          <Text color="secondary">Loading placeholder that mimics content structure</Text>
          <Alert kind="info" title="Layer 3: Primitive">
            <Text size="small">
              Shows loading state with animated placeholders before content loads.
            </Text>
          </Alert>
        </Stack>

        <Card>
          <Card.Body>
            <Stack gap="large">
              <Stack gap="medium">
                <Heading level={3}>Variants</Heading>
                <Grid columns={2} gap="medium">
                  <Stack gap="small">
                    <Text size="small" weight="semibold">
                      Text (Default)
                    </Text>
                    <Skeleton variant="text" width="100%" />
                    <Skeleton variant="text" width="80%" />
                    <Skeleton variant="text" width="90%" />
                  </Stack>
                  <Stack gap="small">
                    <Text size="small" weight="semibold">
                      Circular
                    </Text>
                    <Skeleton variant="circular" size="md" />
                  </Stack>
                  <Stack gap="small">
                    <Text size="small" weight="semibold">
                      Rectangular
                    </Text>
                    <Skeleton variant="rectangular" width="100%" height={100} />
                  </Stack>
                  <Stack gap="small">
                    <Text size="small" weight="semibold">
                      Rounded
                    </Text>
                    <Skeleton variant="rounded" width="100%" height={100} />
                  </Stack>
                </Grid>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Circular Sizes</Heading>
                <Inline gap="medium" align="end">
                  <Stack gap="small" align="center">
                    <Skeleton variant="circular" size="xs" />
                    <Text size="xs" color="secondary">
                      XS
                    </Text>
                  </Stack>
                  <Stack gap="small" align="center">
                    <Skeleton variant="circular" size="small" />
                    <Text size="xs" color="secondary">
                      SM
                    </Text>
                  </Stack>
                  <Stack gap="small" align="center">
                    <Skeleton variant="circular" size="md" />
                    <Text size="xs" color="secondary">
                      MD
                    </Text>
                  </Stack>
                  <Stack gap="small" align="center">
                    <Skeleton variant="circular" size="lg" />
                    <Text size="xs" color="secondary">
                      LG
                    </Text>
                  </Stack>
                  <Stack gap="small" align="center">
                    <Skeleton variant="circular" size="xl" />
                    <Text size="xs" color="secondary">
                      XL
                    </Text>
                  </Stack>
                </Inline>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Multiple Lines</Heading>
                <Skeleton variant="text" lines={5} />
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Without Animation</Heading>
                <Skeleton variant="text" animated={false} width="100%" />
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Card Loading Example</Heading>
                <Card>
                  <Card.Body>
                    <Stack gap="medium">
                      <Inline gap="medium">
                        <Skeleton variant="circular" size="lg" />
                        <Stack gap="small" style={{ flex: 1 }}>
                          <Skeleton variant="text" width="60%" />
                          <Skeleton variant="text" width="40%" />
                        </Stack>
                      </Inline>
                      <Skeleton variant="rectangular" width="100%" height={200} />
                      <Skeleton variant="text" lines={3} />
                    </Stack>
                  </Card.Body>
                </Card>
              </Stack>
            </Stack>
          </Card.Body>
        </Card>
      </Stack>
    );
  }

  // LAYER 3: PRIMITIVES - Typography
  if (activeSubpage === 'typography') {
    return (
      <Stack gap="large">
        <Stack gap="medium">
          <Heading level={2}>Typography (Heading & Text)</Heading>
          <Text color="secondary">Text and heading components with semantic styling</Text>
          <Alert kind="info" title="Layer 3: Primitive">
            <Text size="small">
              Provides consistent typography with size, weight, and color variants.
            </Text>
          </Alert>
        </Stack>

        <Card>
          <Card.Body>
            <Stack gap="large">
              <Stack gap="medium">
                <Heading level={3}>Heading Levels</Heading>
                <Stack gap="small">
                  <Heading level={1}>Heading Level 1</Heading>
                  <Heading level={2}>Heading Level 2</Heading>
                  <Heading level={3}>Heading Level 3</Heading>
                  <Heading level={4}>Heading Level 4</Heading>
                  <Heading level={5}>Heading Level 5</Heading>
                  <Heading level={6}>Heading Level 6</Heading>
                </Stack>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Text Sizes</Heading>
                <Stack gap="small">
                  <Text size="xs">Extra Small Text (12px)</Text>
                  <Text size="small">Small Text (14px)</Text>
                  <Text size="md">Medium Text (16px) - Default</Text>
                  <Text size="lg">Large Text (18px)</Text>
                  <Text size="xl">Extra Large Text (20px)</Text>
                </Stack>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Text Weights</Heading>
                <Stack gap="small">
                  <Text weight="light">Light Weight (300)</Text>
                  <Text weight="regular">Regular Weight (400) - Default</Text>
                  <Text weight="medium">Medium Weight (500)</Text>
                  <Text weight="semibold">Semibold Weight (600)</Text>
                  <Text weight="bold">Bold Weight (700)</Text>
                </Stack>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Text Colors</Heading>
                <Stack gap="small">
                  <Text color="primary">Primary Color (Default)</Text>
                  <Text color="secondary">Secondary Color</Text>
                  <Text color="tertiary">Tertiary Color</Text>
                  <Text color="success">Success Color</Text>
                  <Text color="error">Error Color</Text>
                </Stack>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Text As Different Elements</Heading>
                <Stack gap="small">
                  <Text as="p">As Paragraph (default)</Text>
                  <Text as="span">As Span</Text>
                  <Text as="div">As Div</Text>
                  <Text as="label">As Label</Text>
                </Stack>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Heading As Different Elements</Heading>
                <Text size="small" color="secondary">
                  Visual level 3, semantic h2
                </Text>
                <Heading level={3} as="h2">
                  Heading Level 3 Styled as H2
                </Heading>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Combinations</Heading>
                <Stack gap="small">
                  <Text size="lg" weight="bold" color="primary">
                    Large Bold Primary Text
                  </Text>
                  <Text size="small" weight="medium" color="secondary">
                    Small Medium Secondary Text
                  </Text>
                  <Text size="xs" weight="light" color="tertiary">
                    Extra Small Light Tertiary Text
                  </Text>
                </Stack>
              </Stack>
            </Stack>
          </Card.Body>
        </Card>
      </Stack>
    );
  }

  // LAYER 3: PRIMITIVES - Spinner
  if (activeSubpage === 'spinner') {
    return (
      <Stack gap="large">
        <Stack gap="medium">
          <Heading level={2}>Spinner</Heading>
          <Text color="secondary">Animated loading indicator</Text>
          <Alert kind="info" title="Layer 3: Primitive">
            <Text size="small">Shows loading state with customizable size and styling.</Text>
          </Alert>
        </Stack>

        <Card>
          <Card.Body>
            <Stack gap="large">
              <Stack gap="medium">
                <Heading level={3}>Sizes</Heading>
                <Inline gap="large" align="center">
                  <Stack gap="small" align="center">
                    <Spinner size="small" />
                    <Text size="xs" color="secondary">
                      Small
                    </Text>
                  </Stack>
                  <Stack gap="small" align="center">
                    <Spinner size="medium" />
                    <Text size="xs" color="secondary">
                      Medium
                    </Text>
                  </Stack>
                  <Stack gap="small" align="center">
                    <Spinner size="large" />
                    <Text size="xs" color="secondary">
                      Large (Default)
                    </Text>
                  </Stack>
                </Inline>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Kinds</Heading>
                <Inline gap="large" align="center">
                  <Stack gap="small" align="center">
                    <Spinner kind="default" />
                    <Text size="xs" color="secondary">
                      Default
                    </Text>
                  </Stack>
                  <Stack gap="small" align="center">
                    <Spinner kind="subtle" />
                    <Text size="xs" color="secondary">
                      Subtle
                    </Text>
                  </Stack>
                </Inline>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>With Label (Hidden)</Heading>
                <Spinner label="Loading data..." />
                <Text size="small" color="secondary">
                  Label is hidden but accessible to screen readers
                </Text>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>With Visible Label</Heading>
                <Spinner label="Loading..." showLabel />
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>In Context</Heading>
                <Card>
                  <Card.Body>
                    <Stack gap="medium" align="center">
                      <Spinner />
                      <Text color="secondary">Loading your content...</Text>
                    </Stack>
                  </Card.Body>
                </Card>
              </Stack>
            </Stack>
          </Card.Body>
        </Card>
      </Stack>
    );
  }

  // LAYER 3: PRIMITIVES - ProgressBar
  if (activeSubpage === 'progressbar') {
    return (
      <Stack gap="large">
        <Stack gap="medium">
          <Heading level={2}>ProgressBar</Heading>
          <Text color="secondary">Visual progress indicator for operations and tasks</Text>
          <Alert kind="info" title="Layer 3: Primitive">
            <Text size="small">
              Shows completion progress with customizable variants and labels.
            </Text>
          </Alert>
        </Stack>

        <Card>
          <Card.Body>
            <Stack gap="large">
              <Stack gap="medium">
                <Heading level={3}>Sizes</Heading>
                <Stack gap="medium">
                  <div>
                    <Text
                      size="small"
                      weight="semibold"
                      style={{ marginBottom: '8px', display: 'block' }}
                    >
                      Small
                    </Text>
                    <ProgressBar value={60} size="small" />
                  </div>
                  <div>
                    <Text
                      size="small"
                      weight="semibold"
                      style={{ marginBottom: '8px', display: 'block' }}
                    >
                      Medium (Default)
                    </Text>
                    <ProgressBar value={60} size="medium" />
                  </div>
                  <div>
                    <Text
                      size="small"
                      weight="semibold"
                      style={{ marginBottom: '8px', display: 'block' }}
                    >
                      Large
                    </Text>
                    <ProgressBar value={60} size="large" />
                  </div>
                </Stack>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Variants</Heading>
                <Stack gap="medium">
                  <div>
                    <Text
                      size="small"
                      weight="semibold"
                      style={{ marginBottom: '8px', display: 'block' }}
                    >
                      Primary
                    </Text>
                    <ProgressBar value={50} variant="primary" />
                  </div>
                  <div>
                    <Text
                      size="small"
                      weight="semibold"
                      style={{ marginBottom: '8px', display: 'block' }}
                    >
                      Success
                    </Text>
                    <ProgressBar value={100} variant="success" />
                  </div>
                  <div>
                    <Text
                      size="small"
                      weight="semibold"
                      style={{ marginBottom: '8px', display: 'block' }}
                    >
                      Warning
                    </Text>
                    <ProgressBar value={75} variant="warning" />
                  </div>
                  <div>
                    <Text
                      size="small"
                      weight="semibold"
                      style={{ marginBottom: '8px', display: 'block' }}
                    >
                      Error
                    </Text>
                    <ProgressBar value={25} variant="error" />
                  </div>
                </Stack>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>With Label (Outside)</Heading>
                <ProgressBar value={65} showLabel />
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>With Label (Inside)</Heading>
                <ProgressBar value={65} showLabel labelInside size="large" />
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Custom Label</Heading>
                <ProgressBar value={45} showLabel label="45 of 100 files processed" />
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Indeterminate (Loading)</Heading>
                <ProgressBar indeterminate />
                <Text size="small" color="secondary">
                  Use when progress is unknown
                </Text>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Striped</Heading>
                <ProgressBar value={70} striped />
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Animated Stripes</Heading>
                <ProgressBar value={70} striped animated />
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Progress Stages</Heading>
                <Stack gap="medium">
                  <div>
                    <Text
                      size="small"
                      color="secondary"
                      style={{ marginBottom: '8px', display: 'block' }}
                    >
                      Starting
                    </Text>
                    <ProgressBar value={10} />
                  </div>
                  <div>
                    <Text
                      size="small"
                      color="secondary"
                      style={{ marginBottom: '8px', display: 'block' }}
                    >
                      In Progress
                    </Text>
                    <ProgressBar value={50} variant="primary" />
                  </div>
                  <div>
                    <Text
                      size="small"
                      color="secondary"
                      style={{ marginBottom: '8px', display: 'block' }}
                    >
                      Almost Done
                    </Text>
                    <ProgressBar value={90} variant="success" />
                  </div>
                  <div>
                    <Text
                      size="small"
                      color="secondary"
                      style={{ marginBottom: '8px', display: 'block' }}
                    >
                      Complete
                    </Text>
                    <ProgressBar value={100} variant="success" showLabel />
                  </div>
                </Stack>
              </Stack>
            </Stack>
          </Card.Body>
        </Card>
      </Stack>
    );
  }

  // LAYER 3: PRIMITIVES - Callout
  if (activeSubpage === 'callout') {
    const [calloutStates, setCalloutStates] = React.useState({
      basic: true,
      withImage: true,
      withActions: true,
    });

    return (
      <Stack gap="large">
        <Stack gap="medium">
          <Heading level={2}>Callout</Heading>
          <Text color="secondary">
            Prominent message box with heading, content, and optional actions
          </Text>
          <Alert kind="info" title="Layer 3: Primitive">
            <Text size="small">
              Used for important messages, tooltips, and contextual information with caret
              positioning.
            </Text>
          </Alert>
        </Stack>

        <Card>
          <Card.Body>
            <Stack gap="large">
              <Stack gap="medium">
                <Heading level={3}>Caret Locations</Heading>
                <Grid columns={2} gap="large">
                  <div>
                    <Text
                      size="small"
                      weight="semibold"
                      style={{ marginBottom: '16px', display: 'block' }}
                    >
                      Above
                    </Text>
                    {calloutStates.basic && (
                      <Callout
                        heading="Callout Above"
                        location="above"
                        onClose={() => setCalloutStates({ ...calloutStates, basic: false })}
                      >
                        This callout points upward
                      </Callout>
                    )}
                  </div>
                  <div>
                    <Text
                      size="small"
                      weight="semibold"
                      style={{ marginBottom: '16px', display: 'block' }}
                    >
                      Below
                    </Text>
                    <Callout heading="Callout Below" location="below" closable={false}>
                      This callout points downward
                    </Callout>
                  </div>
                </Grid>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Width Variants</Heading>
                <Stack gap="medium">
                  <Callout heading="Small Width" width="small" closable={false}>
                    Compact callout for short messages
                  </Callout>
                  <Callout heading="Medium Width" width="medium" closable={false}>
                    Standard width for most use cases
                  </Callout>
                  <Callout heading="Large Width" width="large" closable={false}>
                    Wider callout for more content
                  </Callout>
                  <Callout heading="XLarge Width" width="xlarge" closable={false}>
                    Maximum width for detailed information
                  </Callout>
                </Stack>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Text Alignment</Heading>
                <Grid columns={3} gap="medium">
                  <Callout heading="Start (Default)" alignment="start" closable={false}>
                    Left-aligned text content
                  </Callout>
                  <Callout heading="Center" alignment="center" closable={false}>
                    Center-aligned text content
                  </Callout>
                  <Callout heading="End" alignment="end" closable={false}>
                    Right-aligned text content
                  </Callout>
                </Grid>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>With Actions</Heading>
                {calloutStates.withActions && (
                  <Callout
                    heading="Confirm Action"
                    primaryAction={{ label: 'Confirm', onClick: () => alert('Confirmed!') }}
                    secondaryAction={{
                      label: 'Cancel',
                      onClick: () => setCalloutStates({ ...calloutStates, withActions: false }),
                    }}
                    onClose={() => setCalloutStates({ ...calloutStates, withActions: false })}
                  >
                    Are you sure you want to proceed with this action?
                  </Callout>
                )}
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Glass Effects</Heading>
                <Stack gap="medium">
                  <div
                    style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      padding: '24px',
                      borderRadius: '8px',
                    }}
                  >
                    <Stack gap="medium">
                      <Callout heading="No Glass" glass="none" closable={false}>
                        Standard solid background
                      </Callout>
                      <Callout heading="Frost Effect" glass="frost" closable={false}>
                        Frosted glass appearance
                      </Callout>
                      <Callout heading="Tint Effect" glass="tint" closable={false}>
                        Tinted transparent background
                      </Callout>
                    </Stack>
                  </div>
                </Stack>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Without Close Button</Heading>
                <Callout heading="Information" closable={false}>
                  This callout cannot be dismissed
                </Callout>
              </Stack>
            </Stack>
          </Card.Body>
        </Card>
      </Stack>
    );
  }

  // LAYER 3: PRIMITIVES - Banner
  if (activeSubpage === 'banner') {
    const [bannerStates, setBannerStates] = React.useState({
      info: true,
      warning: true,
      success: true,
    });

    return (
      <Stack gap="large">
        <Stack gap="medium">
          <Heading level={2}>Banner</Heading>
          <Text color="secondary">Full-width notification bar for important messages</Text>
          <Alert kind="info" title="Layer 3: Primitive">
            <Text size="small">
              Used for system-wide notifications, alerts, and announcements at the top or bottom of
              pages.
            </Text>
          </Alert>
        </Stack>

        <Card>
          <Card.Body>
            <Stack gap="large">
              <Stack gap="medium">
                <Heading level={3}>All Kinds</Heading>
                <Stack gap="small">
                  {bannerStates.info && (
                    <Banner
                      kind="information"
                      icon="info"
                      onClose={() => setBannerStates({ ...bannerStates, info: false })}
                    >
                      This is an informational message
                    </Banner>
                  )}
                  <Banner kind="success" icon="check-circle">
                    Your changes have been saved successfully
                  </Banner>
                  {bannerStates.warning && (
                    <Banner
                      kind="warning"
                      icon="alert-triangle"
                      onClose={() => setBannerStates({ ...bannerStates, warning: false })}
                    >
                      Please review your settings before continuing
                    </Banner>
                  )}
                  <Banner kind="danger" icon="alert-circle">
                    An error occurred while processing your request
                  </Banner>
                  <Banner kind="promo" icon="star">
                    Special offer: Get 50% off your first purchase!
                  </Banner>
                  <Banner kind="subtle">This is a subtle banner without strong colors</Banner>
                  <Banner kind="neutral">This is a neutral banner for general information</Banner>
                </Stack>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>With Action Button</Heading>
                <Banner
                  kind="information"
                  icon="info"
                  action={{ label: 'Learn More', onClick: () => alert('Learn more clicked') }}
                >
                  New features are available in this release
                </Banner>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Shape Variants</Heading>
                <Stack gap="small">
                  <Banner kind="information" shape="square">
                    Square corners (default)
                  </Banner>
                  <Banner kind="success" shape="round">
                    Rounded corners
                  </Banner>
                </Stack>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>With Line Wrap</Heading>
                <Banner kind="information" lineWrap>
                  This is a longer banner message that demonstrates the line wrap feature. When
                  lineWrap is enabled, long messages will wrap to multiple lines instead of being
                  truncated. This is useful for important announcements or detailed notifications
                  that need more space.
                </Banner>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>With Bottom Border</Heading>
                <Banner kind="information" bottomBorder>
                  Banner with bottom border for visual separation
                </Banner>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Without Icon</Heading>
                <Banner kind="information">Banner without an icon</Banner>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Without Close Button</Heading>
                <Banner kind="warning" icon="alert-triangle" closable={false}>
                  This banner cannot be dismissed
                </Banner>
              </Stack>
            </Stack>
          </Card.Body>
        </Card>
      </Stack>
    );
  }

  // LAYER 3: PRIMITIVES - Tooltip
  if (activeSubpage === 'tooltip') {
    return (
      <Stack gap="large">
        <Stack gap="medium">
          <Heading level={2}>Tooltip</Heading>
          <Text color="secondary">Contextual information displayed on hover or focus</Text>
          <Alert kind="info" title="Layer 3: Primitive">
            <Text size="small">
              Provides additional context for UI elements. Appears on hover with customizable
              positioning.
            </Text>
          </Alert>
        </Stack>

        <Card>
          <Card.Body>
            <Stack gap="large">
              <Stack gap="medium">
                <Heading level={3}>Positions</Heading>
                <Grid columns={2} gap="large">
                  <Stack gap="medium" align="center">
                    <Tooltip content="Tooltip on top" position="top">
                      <Button>Top</Button>
                    </Tooltip>
                  </Stack>
                  <Stack gap="medium" align="center">
                    <Tooltip content="Tooltip on bottom" position="bottom">
                      <Button>Bottom</Button>
                    </Tooltip>
                  </Stack>
                  <Stack gap="medium" align="center">
                    <Tooltip content="Tooltip on left" position="left">
                      <Button>Left</Button>
                    </Tooltip>
                  </Stack>
                  <Stack gap="medium" align="center">
                    <Tooltip content="Tooltip on right" position="right">
                      <Button>Right</Button>
                    </Tooltip>
                  </Stack>
                </Grid>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>With Different Triggers</Heading>
                <Inline gap="medium">
                  <Tooltip content="Tooltip on button">
                    <Button kind="brand">Hover me</Button>
                  </Tooltip>
                  <Tooltip content="Tooltip on icon button">
                    <IconButton icon="help-circle" variant="secondary" aria-label="Help" />
                  </Tooltip>
                  <Tooltip content="Tooltip on link">
                    <Link href="#">Hover this link</Link>
                  </Tooltip>
                </Inline>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Custom Delay</Heading>
                <Inline gap="medium">
                  <Tooltip content="Instant tooltip" delay={0}>
                    <Button>No Delay</Button>
                  </Tooltip>
                  <Tooltip content="Normal tooltip" delay={200}>
                    <Button>200ms Delay (Default)</Button>
                  </Tooltip>
                  <Tooltip content="Slow tooltip" delay={1000}>
                    <Button>1000ms Delay</Button>
                  </Tooltip>
                </Inline>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Disabled Tooltip</Heading>
                <Tooltip content="This tooltip is disabled" disabled>
                  <Button>Hover me (No tooltip)</Button>
                </Tooltip>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>In Context</Heading>
                <Card variant="secondary">
                  <Card.Body>
                    <Stack gap="small">
                      <Inline gap="small" align="center">
                        <Text weight="semibold">Account Settings</Text>
                        <Tooltip content="Configure your account preferences and personal information">
                          <IconButton
                            icon="help-circle"
                            variant="tertiary"
                            size="small"
                            aria-label="Help"
                          />
                        </Tooltip>
                      </Inline>
                      <Text size="small" color="secondary">
                        Manage your profile and preferences
                      </Text>
                    </Stack>
                  </Card.Body>
                </Card>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Long Content</Heading>
                <Tooltip content="This is a longer tooltip that demonstrates how the tooltip component handles multi-line content when needed">
                  <Button>Tooltip with Long Text</Button>
                </Tooltip>
              </Stack>
            </Stack>
          </Card.Body>
        </Card>
      </Stack>
    );
  }

  // LAYER 3: PRIMITIVES - Icon
  if (activeSubpage === 'icon') {
    const iconNames = Object.keys(iconPaths) as (keyof typeof iconPaths)[];
    const popularIcons = [
      'check',
      'close',
      'plus',
      'minus',
      'edit',
      'trash',
      'copy',
      'download',
      'upload',
      'search',
      'filter',
      'settings',
      'user',
      'users',
      'heart',
      'star',
      'bell',
      'mail',
      'calendar',
      'clock',
      'home',
      'folder',
      'file',
      'image',
      'video',
      'music',
      'link',
      'external-link',
      'arrow-left',
      'arrow-right',
      'arrow-up',
      'arrow-down',
      'chevron-left',
      'chevron-right',
      'chevron-up',
      'chevron-down',
      'info',
      'alert-circle',
      'alert-triangle',
      'check-circle',
      'error',
      'help-circle',
      'more-horizontal',
      'more-vertical',
      'menu',
    ];

    return (
      <Stack gap="large">
        <Stack gap="medium">
          <Heading level={2}>Icon</Heading>
          <Text color="secondary">SVG icon component from the design system icon library</Text>
          <Alert kind="info" title="Layer 3: Primitive">
            <Text size="small">
              Provides access to {iconNames.length}+ icons with consistent sizing and coloring.
            </Text>
          </Alert>
        </Stack>

        <Card>
          <Card.Body>
            <Stack gap="large">
              <Stack gap="medium">
                <Heading level={3}>Sizes</Heading>
                <Inline gap="large" align="end">
                  <Stack gap="small" align="center">
                    <Icon name="star" size="small" />
                    <Text size="xs" color="secondary">
                      Small (16px)
                    </Text>
                  </Stack>
                  <Stack gap="small" align="center">
                    <Icon name="star" size="medium" />
                    <Text size="xs" color="secondary">
                      Medium (24px)
                    </Text>
                  </Stack>
                  <Stack gap="small" align="center">
                    <Icon name="star" size={32} />
                    <Text size="xs" color="secondary">
                      Custom (32px)
                    </Text>
                  </Stack>
                  <Stack gap="small" align="center">
                    <Icon name="star" size={48} />
                    <Text size="xs" color="secondary">
                      Custom (48px)
                    </Text>
                  </Stack>
                </Inline>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Colors</Heading>
                <Inline gap="medium">
                  <Icon name="heart" color="currentColor" />
                  <Icon name="heart" color="var(--ink-cobalt-60)" />
                  <Icon name="heart" color="var(--ink-red-60)" />
                  <Icon name="heart" color="var(--ink-green-60)" />
                  <Icon name="heart" color="var(--ink-orange-60)" />
                </Inline>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Popular Icons</Heading>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
                    gap: '16px',
                  }}
                >
                  {popularIcons.map((iconName) => (
                    <Tooltip key={iconName} content={iconName}>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '4px',
                          padding: '12px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          transition: 'background 0.2s',
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background = 'var(--ink-neutral-10)')
                        }
                        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                      >
                        <Icon name={iconName} size="medium" />
                        <Text
                          size="xs"
                          color="secondary"
                          style={{ textAlign: 'center', wordBreak: 'break-word' }}
                        >
                          {iconName}
                        </Text>
                      </div>
                    </Tooltip>
                  ))}
                </div>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>All Available Icons</Heading>
                <Text size="small" color="secondary">
                  {iconNames.length} icons available
                </Text>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(60px, 1fr))',
                    gap: '8px',
                    maxHeight: '400px',
                    overflowY: 'auto',
                    padding: '8px',
                    background: 'var(--ink-neutral-5)',
                    borderRadius: '4px',
                  }}
                >
                  {iconNames.map((iconName) => (
                    <Tooltip key={iconName} content={iconName}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '8px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          transition: 'background 0.2s',
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background = 'var(--ink-neutral-20)')
                        }
                        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                      >
                        <Icon name={iconName} size="small" />
                      </div>
                    </Tooltip>
                  ))}
                </div>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>With Accessibility</Heading>
                <Inline gap="medium">
                  <Icon name="check" aria-label="Success" />
                  <Icon name="error" aria-label="Error" />
                  <Icon name="warning" aria-hidden />
                </Inline>
                <Text size="small" color="secondary">
                  Use aria-label for meaningful icons, aria-hidden for decorative ones
                </Text>
              </Stack>
            </Stack>
          </Card.Body>
        </Card>
      </Stack>
    );
  }

  return null;
};
