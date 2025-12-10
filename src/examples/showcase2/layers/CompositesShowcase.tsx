import React, { useState } from 'react';
import {
  Stack,
  Grid,
  Inline,
  Container,
  Button,
  Input,
  Select,
  Checkbox,
  Card,
  Heading,
  Text,
  Alert,
  AlertBadge,
  Badge,
  Divider,
  Icon,
  SearchInput,
  FileInput,
  ComboBox,
  DatePicker,
  FileUpload,
  FilterTag,
  Breadcrumb,
  Pagination,
  Tabs,
  Accordion,
  ComboButton,
  Modal,
  Dropdown,
  Table,
  List,
} from '@/design-system';
import type { TableColumn, FileInputFile, ComboBoxOption } from '@/design-system';

export interface CompositesShowcaseProps {
  activeSubpage: string;
}

export const CompositesShowcase: React.FC<CompositesShowcaseProps> = ({ activeSubpage }) => {
  // ==================== LAYER 4: COMPOSITES ====================

  // ALL HOOKS MUST BE CALLED AT THE TOP LEVEL (React Rules of Hooks)
  // These are used by different sections, but must be declared before any conditionals
  const [searchValue, setSearchValue] = useState('');
  const [fileInputValue, setFileInputValue] = useState<FileInputFile[]>([]);
  const [comboBoxValue, setComboBoxValue] = useState('');
  const [datePickerValue, setDatePickerValue] = useState<Date | null>(null);
  const [fileUploadFiles, setFileUploadFiles] = useState<FileInputFile[]>([]);
  const [paginationPage, setPaginationPage] = useState(1);
  const [activeTab, setActiveTab] = useState('tab1');
  const [accordionOpenItems, setAccordionOpenItems] = useState<Set<string>>(new Set(['1']));
  const [modalOpen, setModalOpen] = useState(false);
  const [alertVisible, setAlertVisible] = useState(true);
  const [tableSortColumn, setTableSortColumn] = useState('name');
  const [tableSortDirection, setTableSortDirection] = useState<'asc' | 'desc'>('asc');
  const [tableSelectedRows, setTableSelectedRows] = useState<Set<number>>(new Set());

  // SearchInput
  if (activeSubpage === 'searchinput') {
    const suggestions = searchValue
      ? [
          { id: '1', label: 'React Components', description: 'Build reusable UI elements' },
          { id: '2', label: 'TypeScript Patterns', description: 'Type-safe development' },
          { id: '3', label: 'CSS Modules', description: 'Scoped styling solution' },
        ].filter((s) => s.label.toLowerCase().includes(searchValue.toLowerCase()))
      : [];

    return (
      <Stack gap="large">
        <Card>
          <Card.Body>
            <Stack gap="large">
              <Stack gap="small">
                <Inline gap="small" align="center">
                  <Heading level={2}>SearchInput</Heading>
                  <AlertBadge variant="info">Layer 4: Composite</AlertBadge>
                </Inline>
                <Text color="secondary">
                  Search input with suggestions, debouncing, and keyboard navigation. Composed from
                  Input (Layer 3) with search functionality.
                </Text>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Default Search</Heading>
                <SearchInput
                  placeholder="Search..."
                  value={searchValue}
                  onChange={setSearchValue}
                />
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>With Suggestions</Heading>
                <SearchInput
                  placeholder="Search documentation..."
                  value={searchValue}
                  onChange={setSearchValue}
                  suggestions={suggestions}
                  onSuggestionSelect={(suggestion) => {
                    console.log('Selected:', suggestion);
                    setSearchValue(suggestion.label);
                  }}
                />
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>States</Heading>
                <Grid columns={2} gap="medium">
                  <Stack gap="small">
                    <Text weight="medium">Loading</Text>
                    <SearchInput placeholder="Searching..." loading defaultValue="query" />
                  </Stack>
                  <Stack gap="small">
                    <Text weight="medium">Disabled</Text>
                    <SearchInput placeholder="Search..." disabled />
                  </Stack>
                  <Stack gap="small">
                    <Text weight="medium">Not Clearable</Text>
                    <SearchInput
                      placeholder="Search..."
                      clearable={false}
                      defaultValue="Fixed text"
                    />
                  </Stack>
                  <Stack gap="small">
                    <Text weight="medium">With Search Handler</Text>
                    <SearchInput
                      placeholder="Press Enter to search..."
                      onSearch={(value) => alert(`Searching for: ${value}`)}
                    />
                  </Stack>
                </Grid>
              </Stack>
            </Stack>
          </Card.Body>
        </Card>
      </Stack>
    );
  }

  // FileInput
  if (activeSubpage === 'fileinput') {
    return (
      <Stack gap="large">
        <Card>
          <Card.Body>
            <Stack gap="large">
              <Stack gap="small">
                <Inline gap="small" align="center">
                  <Heading level={2}>FileInput</Heading>
                  <AlertBadge variant="info">Layer 4: Composite</AlertBadge>
                </Inline>
                <Text color="secondary">
                  File input with drag-and-drop, validation, and file preview. Composed from Button
                  (Layer 3) and Icon (Layer 3).
                </Text>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Single File</Heading>
                <FileInput
                  label="Upload Document"
                  value={fileInputValue}
                  onChange={setFileInputValue}
                  accept=".pdf,.doc,.docx"
                />
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Multiple Files</Heading>
                <FileInput
                  label="Upload Images"
                  description="Select multiple image files"
                  value={fileInputValue}
                  onChange={setFileInputValue}
                  accept="image/*"
                  multiple
                />
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>With Size Limit</Heading>
                <FileInput
                  label="Upload (Max 2MB)"
                  value={fileInputValue}
                  onChange={setFileInputValue}
                  maxSize={2 * 1024 * 1024}
                />
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>States</Heading>
                <Grid columns={2} gap="medium">
                  <FileInput
                    label="With Error"
                    error="File size exceeds limit"
                    value={[]}
                    onChange={() => {}}
                  />
                  <FileInput label="Disabled" disabled value={[]} onChange={() => {}} />
                </Grid>
              </Stack>
            </Stack>
          </Card.Body>
        </Card>
      </Stack>
    );
  }

  // ComboBox
  if (activeSubpage === 'combobox') {
    const comboBoxOptions: ComboBoxOption[] = [
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue' },
      { value: 'angular', label: 'Angular' },
      { value: 'svelte', label: 'Svelte' },
      { value: 'solid', label: 'Solid', disabled: true },
    ];

    return (
      <Stack gap="large">
        <Card>
          <Card.Body>
            <Stack gap="large">
              <Stack gap="small">
                <Inline gap="small" align="center">
                  <Heading level={2}>ComboBox</Heading>
                  <AlertBadge variant="info">Layer 4: Composite</AlertBadge>
                </Inline>
                <Text color="secondary">
                  Searchable dropdown with keyboard navigation. Composed from Input (Layer 3) and
                  Icon (Layer 3).
                </Text>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Default ComboBox</Heading>
                <ComboBox
                  label="Select Framework"
                  options={comboBoxOptions}
                  value={comboBoxValue}
                  onChange={setComboBoxValue}
                  placeholder="Choose a framework..."
                />
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>With Description</Heading>
                <ComboBox
                  label="Frontend Framework"
                  description="Select your preferred frontend framework"
                  options={comboBoxOptions}
                  value={comboBoxValue}
                  onChange={setComboBoxValue}
                />
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>States</Heading>
                <Grid columns={2} gap="medium">
                  <ComboBox
                    label="With Error"
                    error="Please select a framework"
                    options={comboBoxOptions}
                    value=""
                    onChange={() => {}}
                  />
                  <ComboBox
                    label="Disabled"
                    disabled
                    options={comboBoxOptions}
                    value=""
                    onChange={() => {}}
                  />
                  <ComboBox
                    label="Required"
                    required
                    options={comboBoxOptions}
                    value=""
                    onChange={() => {}}
                  />
                  <ComboBox
                    label="With Long List"
                    options={Array.from({ length: 20 }, (_, i) => ({
                      value: `item-${i}`,
                      label: `Option ${i + 1}`,
                    }))}
                    value=""
                    onChange={() => {}}
                  />
                </Grid>
              </Stack>
            </Stack>
          </Card.Body>
        </Card>
      </Stack>
    );
  }

  // DatePicker
  if (activeSubpage === 'datepicker') {
    return (
      <Stack gap="large">
        <Card>
          <Card.Body>
            <Stack gap="large">
              <Stack gap="small">
                <Inline gap="small" align="center">
                  <Heading level={2}>DatePicker</Heading>
                  <AlertBadge variant="info">Layer 4: Composite</AlertBadge>
                </Inline>
                <Text color="secondary">
                  Date picker with calendar popup and date range validation. Composed from Input
                  (Layer 3) and Icon (Layer 3).
                </Text>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Basic DatePicker</Heading>
                <DatePicker
                  label="Select Date"
                  value={datePickerValue}
                  onChange={setDatePickerValue}
                  placeholder="Choose a date"
                />
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Date Formats</Heading>
                <Grid columns={3} gap="medium">
                  <DatePicker
                    label="US Format (MM/DD/YYYY)"
                    format="MM/DD/YYYY"
                    value={datePickerValue}
                    onChange={setDatePickerValue}
                  />
                  <DatePicker
                    label="European (DD/MM/YYYY)"
                    format="DD/MM/YYYY"
                    value={datePickerValue}
                    onChange={setDatePickerValue}
                  />
                  <DatePicker
                    label="ISO (YYYY-MM-DD)"
                    format="YYYY-MM-DD"
                    value={datePickerValue}
                    onChange={setDatePickerValue}
                  />
                </Grid>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>With Constraints</Heading>
                <Grid columns={2} gap="medium">
                  <DatePicker
                    label="Future Dates Only"
                    minDate={new Date()}
                    value={datePickerValue}
                    onChange={setDatePickerValue}
                    helperText="Only dates from today onwards"
                  />
                  <DatePicker
                    label="Past Dates Only"
                    maxDate={new Date()}
                    value={datePickerValue}
                    onChange={setDatePickerValue}
                    helperText="Only dates up to today"
                  />
                </Grid>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>States</Heading>
                <Grid columns={2} gap="medium">
                  <DatePicker
                    label="With Error"
                    error
                    helperText="Please select a valid date"
                    value={null}
                    onChange={() => {}}
                  />
                  <DatePicker label="Disabled" disabled value={null} onChange={() => {}} />
                </Grid>
              </Stack>
            </Stack>
          </Card.Body>
        </Card>
      </Stack>
    );
  }

  // FileUpload
  if (activeSubpage === 'fileupload') {
    return (
      <Stack gap="large">
        <Card>
          <Card.Body>
            <Stack gap="large">
              <Stack gap="small">
                <Inline gap="small" align="center">
                  <Heading level={2}>FileUpload</Heading>
                  <AlertBadge variant="info">Layer 4: Composite</AlertBadge>
                </Inline>
                <Text color="secondary">
                  Drag-and-drop file upload with progress tracking. Composed from Icon (Layer 3) and
                  ProgressBar (Layer 3).
                </Text>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Default File Upload</Heading>
                <FileUpload
                  label="Upload Files"
                  helperText="Drag and drop files or click to browse"
                  onFileChange={setFileUploadFiles}
                />
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Single File</Heading>
                <FileUpload
                  label="Profile Picture"
                  multiple={false}
                  accept="image/*"
                  maxSize={5 * 1024 * 1024}
                  helperText="JPG, PNG or GIF. Max 5MB"
                />
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>With File Type Restrictions</Heading>
                <Grid columns={2} gap="medium">
                  <FileUpload
                    label="Documents Only"
                    accept=".pdf,.doc,.docx"
                    helperText="PDF, DOC, DOCX"
                  />
                  <FileUpload label="Images Only" accept="image/*" helperText="Any image format" />
                </Grid>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>States</Heading>
                <Grid columns={2} gap="medium">
                  <FileUpload
                    label="Limited Files (Max 3)"
                    maxFiles={3}
                    helperText="Upload up to 3 files"
                  />
                  <FileUpload label="Disabled" disabled placeholder="Upload is disabled" />
                </Grid>
              </Stack>
            </Stack>
          </Card.Body>
        </Card>
      </Stack>
    );
  }

  // FilterTag
  if (activeSubpage === 'filtertag') {
    return (
      <Stack gap="large">
        <Card>
          <Card.Body>
            <Stack gap="large">
              <Stack gap="small">
                <Inline gap="small" align="center">
                  <Heading level={2}>FilterTag</Heading>
                  <AlertBadge variant="info">Layer 4: Composite</AlertBadge>
                </Inline>
                <Text color="secondary">
                  Interactive filter tag with active state and dismiss option. Composed from Button
                  (Layer 3) and Icon (Layer 3).
                </Text>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Basic Filter Tags</Heading>
                <Inline gap="small">
                  <FilterTag label="All Items" />
                  <FilterTag label="In Progress" />
                  <FilterTag label="Completed" />
                </Inline>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Active State</Heading>
                <Inline gap="small">
                  <FilterTag label="All Items" active />
                  <FilterTag label="In Progress" />
                  <FilterTag label="Completed" />
                </Inline>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Dismissible</Heading>
                <Inline gap="small">
                  <FilterTag
                    label="React"
                    dismissible
                    active
                    onDismiss={() => alert('Removed React')}
                  />
                  <FilterTag
                    label="TypeScript"
                    dismissible
                    active
                    onDismiss={() => alert('Removed TypeScript')}
                  />
                  <FilterTag
                    label="Node.js"
                    dismissible
                    active
                    onDismiss={() => alert('Removed Node.js')}
                  />
                </Inline>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Without Trigger Icon</Heading>
                <Inline gap="small">
                  <FilterTag label="Category" showTrigger={false} />
                  <FilterTag label="Status" showTrigger={false} />
                  <FilterTag label="Priority" showTrigger={false} />
                </Inline>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>States</Heading>
                <Inline gap="small">
                  <FilterTag label="Disabled" disabled />
                  <FilterTag label="Disabled Active" active disabled />
                  <FilterTag label="Disabled Dismissible" dismissible disabled />
                </Inline>
              </Stack>
            </Stack>
          </Card.Body>
        </Card>
      </Stack>
    );
  }

  // Breadcrumb
  if (activeSubpage === 'breadcrumb') {
    const breadcrumbItems = [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Details' },
    ];

    return (
      <Stack gap="large">
        <Card>
          <Card.Body>
            <Stack gap="large">
              <Stack gap="small">
                <Inline gap="small" align="center">
                  <Heading level={2}>Breadcrumb</Heading>
                  <AlertBadge variant="info">Layer 4: Composite</AlertBadge>
                </Inline>
                <Text color="secondary">
                  Navigation breadcrumb trail showing page hierarchy. Composed from Link (Layer 3)
                  and Text (Layer 3).
                </Text>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Default Breadcrumb</Heading>
                <Breadcrumb items={breadcrumbItems} />
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>With Icons</Heading>
                <Breadcrumb
                  items={[
                    { label: 'Home', href: '/', icon: <Icon name="home" size="small" /> },
                    {
                      label: 'Products',
                      href: '/products',
                      icon: <Icon name="package" size="small" />,
                    },
                    { label: 'Details', icon: <Icon name="info" size="small" /> },
                  ]}
                />
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Custom Separator</Heading>
                <Grid columns={1} gap="medium">
                  <Breadcrumb items={breadcrumbItems} separator=">" />
                  <Breadcrumb items={breadcrumbItems} separator="·" />
                  <Breadcrumb
                    items={breadcrumbItems}
                    separator={<Icon name="chevron-right" size="small" />}
                  />
                </Grid>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>With MaxItems</Heading>
                <Breadcrumb
                  items={[
                    { label: 'Home', href: '/' },
                    { label: 'Products', href: '/products' },
                    { label: 'Electronics', href: '/products/electronics' },
                    { label: 'Computers', href: '/products/electronics/computers' },
                    { label: 'Laptops', href: '/products/electronics/computers/laptops' },
                    { label: 'Gaming' },
                  ]}
                  maxItems={4}
                />
              </Stack>
            </Stack>
          </Card.Body>
        </Card>
      </Stack>
    );
  }

  // Pagination
  if (activeSubpage === 'pagination') {
    return (
      <Stack gap="large">
        <Card>
          <Card.Body>
            <Stack gap="large">
              <Stack gap="small">
                <Inline gap="small" align="center">
                  <Heading level={2}>Pagination</Heading>
                  <AlertBadge variant="info">Layer 4: Composite</AlertBadge>
                </Inline>
                <Text color="secondary">
                  Navigate through paginated content. Composed from Button (Layer 3) and Icon (Layer
                  3).
                </Text>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Full Mode</Heading>
                <Pagination
                  currentPage={paginationPage}
                  totalPages={10}
                  onPageChange={setPaginationPage}
                />
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Simple Mode</Heading>
                <Pagination
                  mode="simple"
                  currentPage={paginationPage}
                  totalPages={10}
                  onPageChange={setPaginationPage}
                />
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>With Many Pages</Heading>
                <Pagination currentPage={15} totalPages={50} onPageChange={setPaginationPage} />
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Without First/Last Buttons</Heading>
                <Pagination
                  currentPage={paginationPage}
                  totalPages={10}
                  showFirstLast={false}
                  onPageChange={setPaginationPage}
                />
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>With Items Per Page</Heading>
                <Pagination
                  currentPage={paginationPage}
                  totalPages={10}
                  showItemsPerPage
                  itemsPerPage={25}
                  onPageChange={setPaginationPage}
                  onItemsPerPageChange={(items) => console.log('Items per page:', items)}
                />
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>States</Heading>
                <Pagination currentPage={5} totalPages={10} disabled onPageChange={() => {}} />
              </Stack>
            </Stack>
          </Card.Body>
        </Card>
      </Stack>
    );
  }

  // Tabs
  if (activeSubpage === 'tabs') {
    const tabItems = [
      {
        id: 'tab1',
        label: 'Overview',
        content: (
          <Stack gap="medium" style={{ padding: '20px' }}>
            <Heading level={4}>Overview Tab</Heading>
            <Text>This is the overview content with detailed information about the project.</Text>
          </Stack>
        ),
      },
      {
        id: 'tab2',
        label: 'Details',
        content: (
          <Stack gap="medium" style={{ padding: '20px' }}>
            <Heading level={4}>Details Tab</Heading>
            <Text>Detailed specifications and technical information.</Text>
          </Stack>
        ),
      },
      {
        id: 'tab3',
        label: 'Settings',
        content: (
          <Stack gap="medium" style={{ padding: '20px' }}>
            <Heading level={4}>Settings Tab</Heading>
            <Text>Configure your preferences and settings here.</Text>
          </Stack>
        ),
      },
      {
        id: 'tab4',
        label: 'Disabled',
        content: <div>Should not see this</div>,
        disabled: true,
      },
    ];

    return (
      <Stack gap="large">
        <Card>
          <Card.Body>
            <Stack gap="large">
              <Stack gap="small">
                <Inline gap="small" align="center">
                  <Heading level={2}>Tabs</Heading>
                  <AlertBadge variant="info">Layer 4: Composite</AlertBadge>
                </Inline>
                <Text color="secondary">
                  Tab navigation for organizing content. Composed from Button (Layer 3) and layout
                  utilities.
                </Text>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Default Tabs</Heading>
                <Tabs tabs={tabItems} activeTab={activeTab} onTabChange={setActiveTab} />
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>With Rich Content</Heading>
                <Tabs
                  tabs={[
                    {
                      id: 'analytics',
                      label: 'Analytics',
                      content: (
                        <Stack gap="medium" style={{ padding: '20px' }}>
                          <Heading level={4}>Analytics Dashboard</Heading>
                          <Grid columns={3} gap="medium">
                            <Card>
                              <Card.Body>
                                <Stack gap="small">
                                  <Text size="small" color="secondary">
                                    Total Views
                                  </Text>
                                  <Heading level={2}>12,345</Heading>
                                  <Text size="small" color="success">
                                    ↑ 12.5%
                                  </Text>
                                </Stack>
                              </Card.Body>
                            </Card>
                            <Card>
                              <Card.Body>
                                <Stack gap="small">
                                  <Text size="small" color="secondary">
                                    Conversions
                                  </Text>
                                  <Heading level={2}>1,234</Heading>
                                  <Text size="small" color="success">
                                    ↑ 8.2%
                                  </Text>
                                </Stack>
                              </Card.Body>
                            </Card>
                            <Card>
                              <Card.Body>
                                <Stack gap="small">
                                  <Text size="small" color="secondary">
                                    Revenue
                                  </Text>
                                  <Heading level={2}>$45K</Heading>
                                  <Text size="small" color="success">
                                    ↑ 15.3%
                                  </Text>
                                </Stack>
                              </Card.Body>
                            </Card>
                          </Grid>
                        </Stack>
                      ),
                    },
                    {
                      id: 'reports',
                      label: 'Reports',
                      content: (
                        <Stack gap="medium" style={{ padding: '20px' }}>
                          <Heading level={4}>Reports</Heading>
                          <Text>Generate and download custom reports here.</Text>
                        </Stack>
                      ),
                    },
                  ]}
                />
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Many Tabs</Heading>
                <Tabs
                  tabs={Array.from({ length: 7 }, (_, i) => ({
                    id: `tab-${i}`,
                    label: `Tab ${i + 1}`,
                    content: <div style={{ padding: '20px' }}>Content for Tab {i + 1}</div>,
                  }))}
                />
              </Stack>
            </Stack>
          </Card.Body>
        </Card>
      </Stack>
    );
  }

  // Accordion
  if (activeSubpage === 'accordion') {
    const accordionItems = [
      {
        id: '1',
        title: 'What is React?',
        content:
          'React is a JavaScript library for building user interfaces. It allows you to create reusable UI components and efficiently update the DOM.',
      },
      {
        id: '2',
        title: 'What is TypeScript?',
        content:
          'TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. It adds optional static typing to the language.',
      },
      {
        id: '3',
        title: 'What are Design Systems?',
        content:
          'Design systems are collections of reusable components and patterns that help maintain consistency across products.',
      },
    ];

    return (
      <Stack gap="large">
        <Card>
          <Card.Body>
            <Stack gap="large">
              <Stack gap="small">
                <Inline gap="small" align="center">
                  <Heading level={2}>Accordion</Heading>
                  <AlertBadge variant="info">Layer 4: Composite</AlertBadge>
                </Inline>
                <Text color="secondary">
                  Expandable content sections. Composed from Button (Layer 3), Icon (Layer 3), and
                  layout utilities.
                </Text>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Default (Single Open)</Heading>
                <Accordion items={accordionItems} />
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Allow Multiple Open</Heading>
                <Accordion
                  items={accordionItems}
                  allowMultiple
                  openItems={accordionOpenItems}
                  onOpenItemsChange={setAccordionOpenItems}
                />
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>With Icons</Heading>
                <Accordion
                  items={[
                    {
                      id: '1',
                      title: 'Features',
                      icon: <Icon name="star" size="small" />,
                      content: (
                        <ul style={{ margin: 0, paddingLeft: '20px' }}>
                          <li>Fast and performant</li>
                          <li>Easy to use</li>
                          <li>Highly customizable</li>
                        </ul>
                      ),
                    },
                    {
                      id: '2',
                      title: 'Documentation',
                      icon: <Icon name="book" size="small" />,
                      content: 'Comprehensive documentation with examples and API references.',
                    },
                    {
                      id: '3',
                      title: 'Support',
                      icon: <Icon name="help-circle" size="small" />,
                      content: '24/7 support available for all users.',
                    },
                  ]}
                  allowMultiple
                />
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Not Bordered</Heading>
                <Accordion items={accordionItems} bordered={false} />
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>With Disabled Item</Heading>
                <Accordion
                  items={[
                    { id: '1', title: 'Available Item', content: 'This item can be opened.' },
                    {
                      id: '2',
                      title: 'Disabled Item',
                      content: 'Should not see this.',
                      disabled: true,
                    },
                    { id: '3', title: 'Another Available', content: 'This is also available.' },
                  ]}
                />
              </Stack>
            </Stack>
          </Card.Body>
        </Card>
      </Stack>
    );
  }

  // ComboButton
  if (activeSubpage === 'combobutton') {
    return (
      <Stack gap="large">
        <Card>
          <Card.Body>
            <Stack gap="large">
              <Stack gap="small">
                <Inline gap="small" align="center">
                  <Heading level={2}>ComboButton</Heading>
                  <AlertBadge variant="info">Layer 4: Composite</AlertBadge>
                </Inline>
                <Text color="secondary">
                  Split button with primary action and dropdown menu. Composed from Button (Layer 3)
                  and Icon (Layer 3).
                </Text>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Variants</Heading>
                <Inline gap="medium">
                  <ComboButton
                    variant="brand"
                    onClick={() => alert('Main action')}
                    onDropdownClick={() => alert('Dropdown clicked')}
                  >
                    Brand
                  </ComboButton>
                  <ComboButton
                    variant="primary"
                    onClick={() => alert('Main action')}
                    onDropdownClick={() => alert('Dropdown clicked')}
                  >
                    Primary
                  </ComboButton>
                  <ComboButton
                    variant="secondary"
                    onClick={() => alert('Main action')}
                    onDropdownClick={() => alert('Dropdown clicked')}
                  >
                    Secondary
                  </ComboButton>
                  <ComboButton
                    variant="tertiary"
                    onClick={() => alert('Main action')}
                    onDropdownClick={() => alert('Dropdown clicked')}
                  >
                    Tertiary
                  </ComboButton>
                </Inline>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Sizes</Heading>
                <Inline gap="medium">
                  <ComboButton
                    size="small"
                    onClick={() => alert('Small')}
                    onDropdownClick={() => alert('Dropdown')}
                  >
                    Small
                  </ComboButton>
                  <ComboButton
                    size="medium"
                    onClick={() => alert('Medium')}
                    onDropdownClick={() => alert('Dropdown')}
                  >
                    Medium
                  </ComboButton>
                </Inline>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>With Icons</Heading>
                <Inline gap="medium">
                  <ComboButton
                    startIcon="download"
                    onClick={() => alert('Download')}
                    onDropdownClick={() => alert('Options')}
                  >
                    Download
                  </ComboButton>
                  <ComboButton
                    startIcon="save"
                    variant="primary"
                    onClick={() => alert('Save')}
                    onDropdownClick={() => alert('Save options')}
                  >
                    Save
                  </ComboButton>
                  <ComboButton
                    startIcon="share"
                    variant="secondary"
                    onClick={() => alert('Share')}
                    onDropdownClick={() => alert('Share options')}
                  >
                    Share
                  </ComboButton>
                </Inline>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Compact Mode (Tertiary)</Heading>
                <Inline gap="medium">
                  <ComboButton
                    variant="tertiary"
                    compact
                    startIcon="more-horizontal"
                    onClick={() => alert('Action')}
                    onDropdownClick={() => alert('Menu')}
                  >
                    Compact
                  </ComboButton>
                </Inline>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>States</Heading>
                <Inline gap="medium">
                  <ComboButton disabled onClick={() => {}} onDropdownClick={() => {}}>
                    Disabled
                  </ComboButton>
                </Inline>
              </Stack>
            </Stack>
          </Card.Body>
        </Card>
      </Stack>
    );
  }

  // Modal
  if (activeSubpage === 'modal') {
    return (
      <Stack gap="large">
        <Card>
          <Card.Body>
            <Stack gap="large">
              <Stack gap="small">
                <Inline gap="small" align="center">
                  <Heading level={2}>Modal</Heading>
                  <AlertBadge variant="info">Layer 4: Composite</AlertBadge>
                </Inline>
                <Text color="secondary">
                  Dialog overlay for focused content. Composed from Card (Layer 3), Button (Layer
                  3), and IconButton (Layer 3).
                </Text>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Trigger Modal</Heading>
                <Button onClick={() => setModalOpen(true)}>Open Modal</Button>

                <Modal
                  open={modalOpen}
                  onClose={() => setModalOpen(false)}
                  title="Modal Title"
                  footer={
                    <>
                      <Button kind="secondary" onClick={() => setModalOpen(false)}>
                        Cancel
                      </Button>
                      <Button kind="brand" onClick={() => setModalOpen(false)}>
                        Confirm
                      </Button>
                    </>
                  }
                >
                  <Stack gap="medium">
                    <Text>This is a basic modal with title, content, and footer.</Text>
                    <Text color="secondary">Click outside the modal or press ESC to close it.</Text>
                  </Stack>
                </Modal>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Modal Sizes</Heading>
                <Inline gap="small">
                  <Button
                    size="small"
                    kind="secondary"
                    onClick={() => {
                      const size = 'small';
                      // Would need separate state for each size demo
                    }}
                  >
                    Small
                  </Button>
                  <Button
                    size="small"
                    kind="secondary"
                    onClick={() => {
                      const size = 'medium';
                    }}
                  >
                    Medium
                  </Button>
                  <Button
                    size="small"
                    kind="secondary"
                    onClick={() => {
                      const size = 'large';
                    }}
                  >
                    Large
                  </Button>
                  <Button
                    size="small"
                    kind="secondary"
                    onClick={() => {
                      const size = 'xlarge';
                    }}
                  >
                    XLarge
                  </Button>
                </Inline>
                <Text size="small" color="secondary">
                  Available sizes: small, medium (default), large, xlarge
                </Text>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Modal Features</Heading>
                <Grid columns={2} gap="small">
                  <Badge variant="neutral">closeOnBackdropClick</Badge>
                  <Badge variant="neutral">closeOnEscape</Badge>
                  <Badge variant="neutral">Custom footer</Badge>
                  <Badge variant="neutral">Scrollable content</Badge>
                </Grid>
              </Stack>
            </Stack>
          </Card.Body>
        </Card>
      </Stack>
    );
  }

  // Dropdown
  if (activeSubpage === 'dropdown') {
    const dropdownItems = [
      { label: 'Edit', icon: <Icon name="edit" size="small" />, onClick: () => alert('Edit') },
      {
        label: 'Duplicate',
        icon: <Icon name="copy" size="small" />,
        onClick: () => alert('Duplicate'),
      },
      {
        label: 'Archive',
        icon: <Icon name="archive" size="small" />,
        onClick: () => alert('Archive'),
      },
      { divider: true },
      {
        label: 'Delete',
        icon: <Icon name="trash-2" size="small" />,
        onClick: () => alert('Delete'),
      },
    ];

    return (
      <Stack gap="large">
        <Card>
          <Card.Body>
            <Stack gap="large">
              <Stack gap="small">
                <Inline gap="small" align="center">
                  <Heading level={2}>Dropdown</Heading>
                  <AlertBadge variant="info">Layer 4: Composite</AlertBadge>
                </Inline>
                <Text color="secondary">
                  Context menu with keyboard navigation. Composed from Button (Layer 3) and Icon
                  (Layer 3).
                </Text>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Default Dropdown</Heading>
                <Dropdown items={dropdownItems}>
                  <Button>Actions</Button>
                </Dropdown>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>With Icons</Heading>
                <Dropdown items={dropdownItems}>
                  <Button startIcon="more-vertical">Options</Button>
                </Dropdown>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>With Descriptions</Heading>
                <Dropdown
                  items={[
                    {
                      label: 'Create Analysis',
                      description: 'Analyze and autofill attributes',
                      onClick: () => alert('Create Analysis'),
                    },
                    {
                      label: 'Create Mapping',
                      description: 'Connect CLM attributes to AI models',
                      onClick: () => alert('Create Mapping'),
                    },
                    {
                      label: 'Apply in Bulk',
                      description: 'Upload CSV to apply values',
                      onClick: () => alert('Apply in Bulk'),
                    },
                  ]}
                >
                  <Button>Create</Button>
                </Dropdown>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>With Shortcuts</Heading>
                <Dropdown
                  items={[
                    { label: 'Undo', shortcut: 'Ctrl+Z', onClick: () => alert('Undo') },
                    { label: 'Redo', shortcut: 'Ctrl+Y', onClick: () => alert('Redo') },
                    { divider: true },
                    { label: 'Cut', shortcut: 'Ctrl+X', onClick: () => alert('Cut') },
                    { label: 'Copy', shortcut: 'Ctrl+C', onClick: () => alert('Copy') },
                    { label: 'Paste', shortcut: 'Ctrl+V', onClick: () => alert('Paste') },
                  ]}
                >
                  <Button>Edit</Button>
                </Dropdown>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Positions</Heading>
                <Grid columns={4} gap="medium">
                  <Dropdown items={dropdownItems} position="bottom">
                    <Button size="small" kind="secondary">
                      Bottom
                    </Button>
                  </Dropdown>
                  <Dropdown items={dropdownItems} position="top">
                    <Button size="small" kind="secondary">
                      Top
                    </Button>
                  </Dropdown>
                  <Dropdown items={dropdownItems} position="left">
                    <Button size="small" kind="secondary">
                      Left
                    </Button>
                  </Dropdown>
                  <Dropdown items={dropdownItems} position="right">
                    <Button size="small" kind="secondary">
                      Right
                    </Button>
                  </Dropdown>
                </Grid>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>With Disabled Items</Heading>
                <Dropdown
                  items={[
                    { label: 'Active Item', onClick: () => alert('Active') },
                    { label: 'Disabled Item', disabled: true, onClick: () => {} },
                    { label: 'Another Active', onClick: () => alert('Active') },
                  ]}
                >
                  <Button>Menu</Button>
                </Dropdown>
              </Stack>
            </Stack>
          </Card.Body>
        </Card>
      </Stack>
    );
  }

  // Alert
  if (activeSubpage === 'alert') {
    return (
      <Stack gap="large">
        <Card>
          <Card.Body>
            <Stack gap="large">
              <Stack gap="small">
                <Inline gap="small" align="center">
                  <Heading level={2}>Alert</Heading>
                  <AlertBadge variant="info">Layer 4: Composite</AlertBadge>
                </Inline>
                <Text color="secondary">
                  Contextual feedback messages. Composed from Icon (Layer 3), Button (Layer 3), and
                  Text (Layer 3).
                </Text>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Alert Kinds</Heading>
                <Stack gap="small">
                  <Alert kind="information">
                    This is an informational message to help guide the user.
                  </Alert>
                  <Alert kind="success">Your changes have been saved successfully!</Alert>
                  <Alert kind="warning">Please review your information before proceeding.</Alert>
                  <Alert kind="danger">An error occurred while processing your request.</Alert>
                </Stack>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>With Titles</Heading>
                <Stack gap="small">
                  <Alert kind="information" title="Information">
                    We have updated our privacy policy. Please review the changes.
                  </Alert>
                  <Alert kind="success" title="Success!">
                    Your profile has been updated successfully.
                  </Alert>
                  <Alert kind="warning" title="Warning">
                    Your subscription will expire in 3 days.
                  </Alert>
                  <Alert kind="danger" title="Error">
                    Failed to save changes. Please try again.
                  </Alert>
                </Stack>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Dismissible</Heading>
                {alertVisible && (
                  <Alert
                    kind="information"
                    title="Dismissible Alert"
                    onClose={() => setAlertVisible(false)}
                  >
                    This alert can be dismissed by clicking the close button.
                  </Alert>
                )}
                {!alertVisible && (
                  <Button size="small" kind="secondary" onClick={() => setAlertVisible(true)}>
                    Show Alert
                  </Button>
                )}
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>With Actions</Heading>
                <Alert
                  kind="warning"
                  title="Action Required"
                  action={{
                    label: 'View Details',
                    onClick: () => alert('Action clicked'),
                  }}
                >
                  You have pending documents that require your signature.
                </Alert>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Shapes</Heading>
                <Stack gap="small">
                  <Alert kind="information" shape="square">
                    Square corners (default)
                  </Alert>
                  <Alert kind="information" shape="round">
                    Rounded corners
                  </Alert>
                </Stack>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Other Kinds</Heading>
                <Stack gap="small">
                  <Alert kind="promo">Special promotion: Get 20% off your next purchase!</Alert>
                  <Alert kind="subtle">Subtle information message with lower visual weight.</Alert>
                  <Alert kind="neutral">Neutral message without specific sentiment.</Alert>
                  <Alert kind="neutralDark">Neutral dark message for better contrast.</Alert>
                </Stack>
              </Stack>
            </Stack>
          </Card.Body>
        </Card>
      </Stack>
    );
  }

  // Table
  if (activeSubpage === 'table') {
    const sampleData = [
      { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'active' },
      {
        id: 3,
        name: 'Bob Johnson',
        email: 'bob@example.com',
        role: 'Viewer',
        status: 'inactive',
      },
      {
        id: 4,
        name: 'Alice Brown',
        email: 'alice@example.com',
        role: 'Editor',
        status: 'active',
      },
      {
        id: 5,
        name: 'Charlie Davis',
        email: 'charlie@example.com',
        role: 'Admin',
        status: 'pending',
      },
    ];

    const basicColumns: TableColumn[] = [
      { key: 'name', header: 'Name', sortable: true },
      { key: 'email', header: 'Email', sortable: true },
      { key: 'role', header: 'Role', sortable: true },
      {
        key: 'status',
        header: 'Status',
        sortable: true,
        cell: (row) => {
          const variant =
            row.status === 'active' ? 'success' : row.status === 'pending' ? 'warning' : 'neutral';
          return <Badge variant={variant}>{row.status}</Badge>;
        },
      },
    ];

    return (
      <Stack gap="large">
        <Card>
          <Card.Body>
            <Stack gap="large">
              <Stack gap="small">
                <Inline gap="small" align="center">
                  <Heading level={2}>Table</Heading>
                  <AlertBadge variant="info">Layer 4: Composite</AlertBadge>
                </Inline>
                <Text color="secondary">
                  Data table with sorting, selection, and pagination. Composed from Checkbox (Layer
                  3) and Icon (Layer 3).
                </Text>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Basic Table</Heading>
                <Table columns={basicColumns} data={sampleData} />
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>With Sorting</Heading>
                <Table
                  columns={basicColumns}
                  data={sampleData}
                  sortColumn={tableSortColumn}
                  sortDirection={tableSortDirection}
                  onSortChange={(col, dir) => {
                    setTableSortColumn(col);
                    setTableSortDirection(dir);
                  }}
                />
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>With Selection</Heading>
                <Table
                  columns={basicColumns}
                  data={sampleData}
                  selectable
                  selectedRows={tableSelectedRows}
                  onSelectionChange={setTableSelectedRows}
                  getRowKey={(row) => row.id}
                />
                <Text size="small" color="secondary">
                  Selected: {tableSelectedRows.size} row(s)
                </Text>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Variants</Heading>
                <Stack gap="small">
                  <Text weight="medium">Bordered</Text>
                  <Table columns={basicColumns} data={sampleData.slice(0, 3)} variant="bordered" />
                  <Text weight="medium">Striped</Text>
                  <Table columns={basicColumns} data={sampleData.slice(0, 3)} variant="striped" />
                </Stack>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Sizes</Heading>
                <Grid columns={1} gap="medium">
                  <Stack gap="small">
                    <Text weight="medium">Small</Text>
                    <Table columns={basicColumns} data={sampleData.slice(0, 2)} size="small" />
                  </Stack>
                  <Stack gap="small">
                    <Text weight="medium">Large</Text>
                    <Table columns={basicColumns} data={sampleData.slice(0, 2)} size="large" />
                  </Stack>
                </Grid>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Hoverable Rows</Heading>
                <Table
                  columns={basicColumns}
                  data={sampleData.slice(0, 3)}
                  hoverable
                  onRowClick={(row) => alert(`Clicked: ${row.name}`)}
                />
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Empty State</Heading>
                <Table
                  columns={basicColumns}
                  data={[]}
                  emptyMessage="No users found. Try adjusting your filters."
                />
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Loading State</Heading>
                <Table columns={basicColumns} data={[]} loading />
              </Stack>
            </Stack>
          </Card.Body>
        </Card>
      </Stack>
    );
  }

  // List
  if (activeSubpage === 'list') {
    return (
      <Stack gap="large">
        <Card>
          <Card.Body>
            <Stack gap="large">
              <Stack gap="small">
                <Inline gap="small" align="center">
                  <Heading level={2}>List</Heading>
                  <AlertBadge variant="info">Layer 4: Composite</AlertBadge>
                </Inline>
                <Text color="secondary">
                  Structured list with rich content support. Composed from Icon (Layer 3), Badge
                  (Layer 3), Avatar (Layer 3), and Button (Layer 3).
                </Text>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Basic List</Heading>
                <List>
                  <List.Item>First item in the list</List.Item>
                  <List.Item>Second item in the list</List.Item>
                  <List.Item>Third item in the list</List.Item>
                  <List.Item>Fourth item in the list</List.Item>
                </List>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>With Descriptions</Heading>
                <List>
                  <List.Item description="Additional information about the first item">
                    First item
                  </List.Item>
                  <List.Item description="Additional information about the second item">
                    Second item
                  </List.Item>
                  <List.Item description="Additional information about the third item">
                    Third item
                  </List.Item>
                </List>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>With Icons</Heading>
                <List>
                  <List.Item startElement={<Icon name="file" />}>Document.pdf</List.Item>
                  <List.Item startElement={<Icon name="image" />}>Image.jpg</List.Item>
                  <List.Item startElement={<Icon name="folder" />}>Folder</List.Item>
                </List>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>With End Elements</Heading>
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
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>With Meta Information</Heading>
                <List>
                  <List.Item meta="2 hours ago">New message from John</List.Item>
                  <List.Item meta="5 hours ago">Document shared by Sarah</List.Item>
                  <List.Item meta="Yesterday">Meeting reminder</List.Item>
                </List>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Clickable List</Heading>
                <List hoverable>
                  <List.Item
                    clickable
                    startElement={<Icon name="home" />}
                    onClick={() => alert('Home')}
                  >
                    Home
                  </List.Item>
                  <List.Item
                    clickable
                    startElement={<Icon name="user" />}
                    onClick={() => alert('Profile')}
                  >
                    Profile
                  </List.Item>
                  <List.Item
                    clickable
                    startElement={<Icon name="settings" />}
                    onClick={() => alert('Settings')}
                  >
                    Settings
                  </List.Item>
                </List>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Variants</Heading>
                <Grid columns={1} gap="medium">
                  <Stack gap="small">
                    <Text weight="medium">Bordered</Text>
                    <List variant="bordered">
                      <List.Item>Item in bordered list</List.Item>
                      <List.Item>Another item</List.Item>
                    </List>
                  </Stack>
                  <Stack gap="small">
                    <Text weight="medium">Divided</Text>
                    <List variant="divided">
                      <List.Item>Item with divider</List.Item>
                      <List.Item>Another item</List.Item>
                      <List.Item>Last item</List.Item>
                    </List>
                  </Stack>
                </Grid>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Sizes</Heading>
                <Grid columns={3} gap="medium">
                  <Stack gap="small">
                    <Text weight="medium">Small</Text>
                    <List size="small">
                      <List.Item startElement={<Icon name="star" size="small" />}>
                        Small item
                      </List.Item>
                      <List.Item startElement={<Icon name="heart" size="small" />}>
                        Another small
                      </List.Item>
                    </List>
                  </Stack>
                  <Stack gap="small">
                    <Text weight="medium">Medium</Text>
                    <List size="medium">
                      <List.Item startElement={<Icon name="star" />}>Medium item</List.Item>
                      <List.Item startElement={<Icon name="heart" />}>Another medium</List.Item>
                    </List>
                  </Stack>
                  <Stack gap="small">
                    <Text weight="medium">Large</Text>
                    <List size="large">
                      <List.Item startElement={<Icon name="star" />}>Large item</List.Item>
                      <List.Item startElement={<Icon name="heart" />}>Another large</List.Item>
                    </List>
                  </Stack>
                </Grid>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Ordered List</Heading>
                <List ordered>
                  <List.Item>First step in the process</List.Item>
                  <List.Item>Second step in the process</List.Item>
                  <List.Item>Third step in the process</List.Item>
                </List>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>With Disabled Items</Heading>
                <List>
                  <List.Item clickable onClick={() => alert('Active')}>
                    Active item
                  </List.Item>
                  <List.Item clickable disabled>
                    Disabled item
                  </List.Item>
                  <List.Item clickable onClick={() => alert('Active')}>
                    Another active
                  </List.Item>
                </List>
              </Stack>
            </Stack>
          </Card.Body>
        </Card>
      </Stack>
    );
  }

  // ========================================

  return null;
};
