import { useState } from 'react';
import {
  Card,
  Heading,
  Text,
  Input,
  Select,
  TextArea,
  Checkbox,
  Button,
  Badge,
  Icon,
  Stack,
  Grid,
  Inline,
  Container,
  Divider,
  Stepper,
  FileUpload,
} from '@/design-system';
import type { Step } from '@/design-system/4-composites/Stepper/Stepper';
import styles from './HROnboardingWizard.module.css';

/**
 * HROnboardingWizard Prototype
 *
 * A wizard-style workflow builder for HR employee onboarding.
 * Features:
 * - Stepper (Layer 4) for step navigation
 * - FileUpload (Layer 4) for document uploads
 * - Input, Select, TextArea, Checkbox (Layer 3) for form fields
 * - Card (Layer 3) for content containers
 * - Stack, Grid, Inline, Container (Layer 2) for layout
 */

// Department options
const departmentOptions = [
  { value: '', label: 'Select department' },
  { value: 'engineering', label: 'Engineering' },
  { value: 'sales', label: 'Sales' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'hr', label: 'Human Resources' },
  { value: 'finance', label: 'Finance' },
  { value: 'operations', label: 'Operations' },
  { value: 'legal', label: 'Legal' },
];

// Position type options
const positionTypeOptions = [
  { value: '', label: 'Select position type' },
  { value: 'full-time', label: 'Full-time' },
  { value: 'part-time', label: 'Part-time' },
  { value: 'contract', label: 'Contract' },
  { value: 'intern', label: 'Intern' },
  { value: 'temporary', label: 'Temporary' },
];

// Form data type
interface WizardFormData {
  // Step 1: Basic Information
  workflowName: string;
  department: string;
  positionType: string;
  description: string;
  // Step 2: Data Collection
  collectPersonalInfo: boolean;
  collectEmergencyContacts: boolean;
  collectBankingDetails: boolean;
  collectPreviousEmployment: boolean;
  collectTaxInfo: boolean;
  collectEducation: boolean;
  // Step 3: ID Verification
  verifyGovernmentId: boolean;
  verifySocialSecurity: boolean;
  verifyBackgroundCheck: boolean;
  verifyDrugScreening: boolean;
  verifyEmploymentEligibility: boolean;
  verifyProfessionalLicense: boolean;
  // Step 4: Policy Acceptance
  policyEmployeeHandbook: boolean;
  policyCodeOfConduct: boolean;
  policyITSecurity: boolean;
  policyRemoteWork: boolean;
  policyConfidentiality: boolean;
  policyNDA: boolean;
  policyNonCompete: boolean;
}

const initialFormData: WizardFormData = {
  workflowName: '',
  department: '',
  positionType: '',
  description: '',
  collectPersonalInfo: true,
  collectEmergencyContacts: true,
  collectBankingDetails: true,
  collectPreviousEmployment: false,
  collectTaxInfo: true,
  collectEducation: false,
  verifyGovernmentId: true,
  verifySocialSecurity: true,
  verifyBackgroundCheck: false,
  verifyDrugScreening: false,
  verifyEmploymentEligibility: true,
  verifyProfessionalLicense: false,
  policyEmployeeHandbook: true,
  policyCodeOfConduct: true,
  policyITSecurity: true,
  policyRemoteWork: false,
  policyConfidentiality: true,
  policyNDA: true,
  policyNonCompete: false,
};

// Stepper steps definition
const wizardSteps: Step[] = [
  { id: 'basic', title: 'Basic Info', description: 'Workflow details' },
  { id: 'data', title: 'Data Collection', description: 'Employee info' },
  { id: 'verify', title: 'ID Verification', description: 'Identity checks' },
  { id: 'policy', title: 'Policies', description: 'Agreements' },
  { id: 'review', title: 'Review', description: 'Submit workflow' },
];

export function HROnboardingWizard() {
  const [formData, setFormData] = useState<WizardFormData>(initialFormData);
  const [activeStep, setActiveStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  // Update form field
  const updateField = <K extends keyof WizardFormData>(field: K, value: WizardFormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Navigation handlers
  const goNext = () => {
    if (activeStep < wizardSteps.length - 1) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const goBack = () => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1);
    }
  };

  const handleStepClick = (stepIndex: number) => {
    // Only allow clicking on completed or current steps
    if (stepIndex <= activeStep) {
      setActiveStep(stepIndex);
    }
  };

  // Submit handler
  const handleSubmit = () => {
    setSubmitted(true);
    console.log('Workflow submitted:', formData);
  };

  // Reset handler
  const handleReset = () => {
    setFormData(initialFormData);
    setActiveStep(0);
    setSubmitted(false);
  };

  // Count selected items
  const countDataFields = () => {
    let count = 0;
    if (formData.collectPersonalInfo) count++;
    if (formData.collectEmergencyContacts) count++;
    if (formData.collectBankingDetails) count++;
    if (formData.collectPreviousEmployment) count++;
    if (formData.collectTaxInfo) count++;
    if (formData.collectEducation) count++;
    return count;
  };

  const countVerificationMethods = () => {
    let count = 0;
    if (formData.verifyGovernmentId) count++;
    if (formData.verifySocialSecurity) count++;
    if (formData.verifyBackgroundCheck) count++;
    if (formData.verifyDrugScreening) count++;
    if (formData.verifyEmploymentEligibility) count++;
    if (formData.verifyProfessionalLicense) count++;
    return count;
  };

  const countPolicies = () => {
    let count = 0;
    if (formData.policyEmployeeHandbook) count++;
    if (formData.policyCodeOfConduct) count++;
    if (formData.policyITSecurity) count++;
    if (formData.policyRemoteWork) count++;
    if (formData.policyConfidentiality) count++;
    if (formData.policyNDA) count++;
    if (formData.policyNonCompete) count++;
    return count;
  };

  // Step 1: Basic Information
  const renderStep1 = () => (
    <Stack gap="medium">
      <Input
        label="Workflow Name"
        placeholder="e.g., New Employee Onboarding"
        value={formData.workflowName}
        onChange={(e) => updateField('workflowName', e.target.value)}
        required
      />
      <Grid columns={2} gap="medium">
        <Select
          label="Department"
          options={departmentOptions}
          value={formData.department}
          onChange={(value) => updateField('department', value)}
          required
        />
        <Select
          label="Position Type"
          options={positionTypeOptions}
          value={formData.positionType}
          onChange={(value) => updateField('positionType', value)}
          required
        />
      </Grid>
      <TextArea
        label="Workflow Description"
        placeholder="Describe the purpose and scope of this onboarding workflow..."
        value={formData.description}
        onChange={(e) => updateField('description', e.target.value)}
        rows={3}
      />
    </Stack>
  );

  // Step 2: Data Collection
  const renderStep2 = () => (
    <Stack gap="medium">
      <Stack gap="small">
        <Text weight="medium">Data Fields to Collect</Text>
        <Text variant="body" color="secondary">
          Select which information to gather from new employees
        </Text>
      </Stack>
      <Card variant="secondary">
        <Card.Body>
          <Stack gap="small">
            <Checkbox
              label="Personal Information (name, date of birth, contact details)"
              checked={formData.collectPersonalInfo}
              onChange={(e) => updateField('collectPersonalInfo', e.target.checked)}
            />
            <Checkbox
              label="Emergency Contacts"
              checked={formData.collectEmergencyContacts}
              onChange={(e) => updateField('collectEmergencyContacts', e.target.checked)}
            />
            <Checkbox
              label="Banking Details (for payroll direct deposit)"
              checked={formData.collectBankingDetails}
              onChange={(e) => updateField('collectBankingDetails', e.target.checked)}
            />
            <Checkbox
              label="Previous Employment History"
              checked={formData.collectPreviousEmployment}
              onChange={(e) => updateField('collectPreviousEmployment', e.target.checked)}
            />
            <Checkbox
              label="Tax Information (W-4, I-9 forms)"
              checked={formData.collectTaxInfo}
              onChange={(e) => updateField('collectTaxInfo', e.target.checked)}
            />
            <Checkbox
              label="Educational Background"
              checked={formData.collectEducation}
              onChange={(e) => updateField('collectEducation', e.target.checked)}
            />
          </Stack>
        </Card.Body>
      </Card>
      <FileUpload
        label="Upload Data Collection Templates (optional)"
        placeholder="Drag and drop template files or click to browse"
        helperText="Supported formats: PDF, DOC, DOCX"
        accept=".pdf,.doc,.docx"
        multiple
        maxFiles={5}
      />
    </Stack>
  );

  // Step 3: ID Verification
  const renderStep3 = () => (
    <Stack gap="medium">
      <Stack gap="small">
        <Text weight="medium">Identity Verification Methods</Text>
        <Text variant="body" color="secondary">
          Select required identity verification checks for new hires
        </Text>
      </Stack>
      <Card variant="secondary">
        <Card.Body>
          <Stack gap="small">
            <Checkbox
              label="Government-issued ID (Driver's License, Passport, State ID)"
              checked={formData.verifyGovernmentId}
              onChange={(e) => updateField('verifyGovernmentId', e.target.checked)}
            />
            <Checkbox
              label="Social Security Number Verification"
              checked={formData.verifySocialSecurity}
              onChange={(e) => updateField('verifySocialSecurity', e.target.checked)}
            />
            <Checkbox
              label="Background Check (via third-party provider)"
              checked={formData.verifyBackgroundCheck}
              onChange={(e) => updateField('verifyBackgroundCheck', e.target.checked)}
            />
            <Checkbox
              label="Drug Screening"
              checked={formData.verifyDrugScreening}
              onChange={(e) => updateField('verifyDrugScreening', e.target.checked)}
            />
            <Checkbox
              label="Employment Eligibility Verification (I-9)"
              checked={formData.verifyEmploymentEligibility}
              onChange={(e) => updateField('verifyEmploymentEligibility', e.target.checked)}
            />
            <Checkbox
              label="Professional License Verification"
              checked={formData.verifyProfessionalLicense}
              onChange={(e) => updateField('verifyProfessionalLicense', e.target.checked)}
            />
          </Stack>
        </Card.Body>
      </Card>
      <FileUpload
        label="Upload ID Verification Instructions (optional)"
        placeholder="Drag and drop instruction documents or click to browse"
        helperText="Supported formats: PDF, DOC, DOCX"
        accept=".pdf,.doc,.docx"
        multiple={false}
        maxFiles={1}
      />
    </Stack>
  );

  // Step 4: Policy Acceptance
  const renderStep4 = () => (
    <Stack gap="medium">
      <Stack gap="small">
        <Text weight="medium">Required Policy Documents</Text>
        <Text variant="body" color="secondary">
          Select which policies new employees must review and accept
        </Text>
      </Stack>
      <Card variant="secondary">
        <Card.Body>
          <Stack gap="small">
            <Checkbox
              label="Employee Handbook"
              checked={formData.policyEmployeeHandbook}
              onChange={(e) => updateField('policyEmployeeHandbook', e.target.checked)}
            />
            <Checkbox
              label="Code of Conduct"
              checked={formData.policyCodeOfConduct}
              onChange={(e) => updateField('policyCodeOfConduct', e.target.checked)}
            />
            <Checkbox
              label="IT Security Policy"
              checked={formData.policyITSecurity}
              onChange={(e) => updateField('policyITSecurity', e.target.checked)}
            />
            <Checkbox
              label="Remote Work Policy"
              checked={formData.policyRemoteWork}
              onChange={(e) => updateField('policyRemoteWork', e.target.checked)}
            />
            <Checkbox
              label="Confidentiality Agreement"
              checked={formData.policyConfidentiality}
              onChange={(e) => updateField('policyConfidentiality', e.target.checked)}
            />
            <Checkbox
              label="Non-Disclosure Agreement (NDA)"
              checked={formData.policyNDA}
              onChange={(e) => updateField('policyNDA', e.target.checked)}
            />
            <Checkbox
              label="Non-Compete Agreement"
              checked={formData.policyNonCompete}
              onChange={(e) => updateField('policyNonCompete', e.target.checked)}
            />
          </Stack>
        </Card.Body>
      </Card>
      <FileUpload
        label="Upload Policy Documents"
        placeholder="Drag and drop policy files or click to browse"
        helperText="Supported formats: PDF, DOC, DOCX. Upload all required policy documents."
        accept=".pdf,.doc,.docx"
        multiple
        maxFiles={10}
      />
    </Stack>
  );

  // Step 5: Review & Submit
  const renderStep5 = () => {
    if (submitted) {
      return (
        <Stack gap="large" align="center">
          <div className={styles.successIcon}>
            <Icon name="check" size="large" />
          </div>
          <Stack gap="small" align="center">
            <Heading level={3}>Workflow Created Successfully!</Heading>
            <Text color="secondary">
              Your HR onboarding workflow has been saved and is ready to use.
            </Text>
          </Stack>
          <Inline gap="medium">
            <Button kind="secondary" onClick={handleReset}>
              Create Another Workflow
            </Button>
            <Button kind="brand">View Workflows</Button>
          </Inline>
        </Stack>
      );
    }

    return (
      <Stack gap="medium">
        <Text color="secondary">
          Review your workflow configuration before creating it.
        </Text>

        {/* Workflow Details */}
        <Card>
          <Card.Body>
            <Stack gap="small">
              <Inline justify="space-between" align="center">
                <Text weight="semibold">Workflow Details</Text>
                <Badge variant="info" size="small">Step 1</Badge>
              </Inline>
              <Divider />
              <Grid columns={2} gap="small">
                <Stack gap="xsmall">
                  <Text variant="body" color="secondary">Name</Text>
                  <Text>{formData.workflowName || 'Not specified'}</Text>
                </Stack>
                <Stack gap="xsmall">
                  <Text variant="body" color="secondary">Department</Text>
                  <Text>
                    {departmentOptions.find((d) => d.value === formData.department)?.label ||
                      'Not selected'}
                  </Text>
                </Stack>
                <Stack gap="xsmall">
                  <Text variant="body" color="secondary">Position Type</Text>
                  <Text>
                    {positionTypeOptions.find((p) => p.value === formData.positionType)?.label ||
                      'Not selected'}
                  </Text>
                </Stack>
              </Grid>
            </Stack>
          </Card.Body>
        </Card>

        {/* Data Collection Summary */}
        <Card>
          <Card.Body>
            <Stack gap="small">
              <Inline justify="space-between" align="center">
                <Inline gap="small" align="center">
                  <Text weight="semibold">Data Collection</Text>
                  <Badge variant="success" size="small">
                    <Icon name="check" size="small" />
                  </Badge>
                </Inline>
                <Badge variant="info" size="small">Step 2</Badge>
              </Inline>
              <Divider />
              <Text color="secondary">{countDataFields()} data fields selected</Text>
              <Inline gap="small" wrap>
                {formData.collectPersonalInfo && <Badge variant="neutral" size="small">Personal Info</Badge>}
                {formData.collectEmergencyContacts && <Badge variant="neutral" size="small">Emergency Contacts</Badge>}
                {formData.collectBankingDetails && <Badge variant="neutral" size="small">Banking Details</Badge>}
                {formData.collectPreviousEmployment && <Badge variant="neutral" size="small">Employment History</Badge>}
                {formData.collectTaxInfo && <Badge variant="neutral" size="small">Tax Info</Badge>}
                {formData.collectEducation && <Badge variant="neutral" size="small">Education</Badge>}
              </Inline>
            </Stack>
          </Card.Body>
        </Card>

        {/* ID Verification Summary */}
        <Card>
          <Card.Body>
            <Stack gap="small">
              <Inline justify="space-between" align="center">
                <Inline gap="small" align="center">
                  <Text weight="semibold">ID Verification</Text>
                  <Badge variant="success" size="small">
                    <Icon name="check" size="small" />
                  </Badge>
                </Inline>
                <Badge variant="info" size="small">Step 3</Badge>
              </Inline>
              <Divider />
              <Text color="secondary">{countVerificationMethods()} verification methods enabled</Text>
              <Inline gap="small" wrap>
                {formData.verifyGovernmentId && <Badge variant="neutral" size="small">Government ID</Badge>}
                {formData.verifySocialSecurity && <Badge variant="neutral" size="small">SSN Verification</Badge>}
                {formData.verifyBackgroundCheck && <Badge variant="neutral" size="small">Background Check</Badge>}
                {formData.verifyDrugScreening && <Badge variant="neutral" size="small">Drug Screening</Badge>}
                {formData.verifyEmploymentEligibility && <Badge variant="neutral" size="small">I-9 Verification</Badge>}
                {formData.verifyProfessionalLicense && <Badge variant="neutral" size="small">License Verification</Badge>}
              </Inline>
            </Stack>
          </Card.Body>
        </Card>

        {/* Policy Acceptance Summary */}
        <Card>
          <Card.Body>
            <Stack gap="small">
              <Inline justify="space-between" align="center">
                <Inline gap="small" align="center">
                  <Text weight="semibold">Policy Acceptance</Text>
                  <Badge variant="success" size="small">
                    <Icon name="check" size="small" />
                  </Badge>
                </Inline>
                <Badge variant="info" size="small">Step 4</Badge>
              </Inline>
              <Divider />
              <Text color="secondary">{countPolicies()} policies required</Text>
              <Inline gap="small" wrap>
                {formData.policyEmployeeHandbook && <Badge variant="neutral" size="small">Employee Handbook</Badge>}
                {formData.policyCodeOfConduct && <Badge variant="neutral" size="small">Code of Conduct</Badge>}
                {formData.policyITSecurity && <Badge variant="neutral" size="small">IT Security</Badge>}
                {formData.policyRemoteWork && <Badge variant="neutral" size="small">Remote Work</Badge>}
                {formData.policyConfidentiality && <Badge variant="neutral" size="small">Confidentiality</Badge>}
                {formData.policyNDA && <Badge variant="neutral" size="small">NDA</Badge>}
                {formData.policyNonCompete && <Badge variant="neutral" size="small">Non-Compete</Badge>}
              </Inline>
            </Stack>
          </Card.Body>
        </Card>
      </Stack>
    );
  };

  // Get current step content
  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return renderStep1();
      case 1:
        return renderStep2();
      case 2:
        return renderStep3();
      case 3:
        return renderStep4();
      case 4:
        return renderStep5();
      default:
        return null;
    }
  };

  // Get step title and description
  const getStepInfo = () => {
    const step = wizardSteps[activeStep];
    const titles = [
      { title: 'Basic Information', description: 'Define the workflow name, department, and position type' },
      { title: 'Data Collection', description: 'Configure what employee information to collect' },
      { title: 'Identity Verification', description: 'Select required identity verification methods' },
      { title: 'Policy Acceptance', description: 'Configure required policy documents for new employees' },
      { title: 'Review & Submit', description: 'Review your workflow configuration before creating' },
    ];
    return titles[activeStep];
  };

  const stepInfo = getStepInfo();

  return (
    <Container size="large" padded>
      <Card>
        <Card.Body>
          <Stack gap="large">
            {/* Wizard Header */}
            <Stack gap="small">
              <Inline gap="small" align="center">
                <Icon name="people" size="medium" />
                <Heading level={2}>Employee Onboarding Workflow</Heading>
              </Inline>
              <Text color="secondary">
                Build a customized onboarding experience for new hires
              </Text>
            </Stack>

            {/* Stepper Navigation */}
            <Stepper
              steps={wizardSteps}
              activeStep={activeStep}
              orientation="horizontal"
              clickable
              onStepClick={handleStepClick}
              showDescription
            />

            {/* Step Content Card */}
            <Card variant="secondary">
              <Card.Body>
                <Stack gap="medium">
                  {/* Step Header */}
                  {!submitted && (
                    <Stack gap="xsmall">
                      <Heading level={4}>{stepInfo.title}</Heading>
                      <Text variant="body" color="secondary">
                        {stepInfo.description}
                      </Text>
                    </Stack>
                  )}

                  {/* Step Content */}
                  {renderStepContent()}

                  {/* Navigation Buttons */}
                  {!submitted && (
                    <>
                      <Divider />
                      <Inline justify="space-between">
                        <Button
                          kind="secondary"
                          onClick={goBack}
                          disabled={activeStep === 0}
                        >
                          <Icon name="arrow-left" size="small" />
                          Back
                        </Button>
                        {activeStep < wizardSteps.length - 1 ? (
                          <Button kind="brand" onClick={goNext}>
                            Continue
                            <Icon name="arrow-right" size="small" />
                          </Button>
                        ) : (
                          <Button kind="brand" onClick={handleSubmit}>
                            <Icon name="check" size="small" />
                            Create Workflow
                          </Button>
                        )}
                      </Inline>
                    </>
                  )}
                </Stack>
              </Card.Body>
            </Card>
          </Stack>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default HROnboardingWizard;
