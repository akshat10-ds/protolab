import React, { useState } from 'react';
import {
  Stack,
  Grid,
  Inline,
  Button,
  Text,
  Alert,
  Banner,
  Badge,
  Icon,
  ComboButton,
  Modal,
  Dropdown,
  Table,
  List,
  Callout,
  AIBadge,
  Chip,
  Avatar,
  Card,
} from '@/design-system';
import type { TableColumn } from '@/design-system';
import styles from '../../Showcase.module.css';

export interface OverlayCompositesProps {
  activeSubpage: string;
}

// Data definitions for compact rendering
const comboVariants = ['brand', 'primary', 'secondary', 'tertiary'] as const;
const comboSizes = ['small', 'medium'] as const;
const comboIcons = [
  { icon: 'download', label: 'Download' },
  { icon: 'save', label: 'Save', variant: 'primary' },
  { icon: 'share', label: 'Share', variant: 'secondary' },
] as const;

const alertKinds = ['information', 'success', 'warning', 'danger'] as const;
const alertOtherKinds = ['promo', 'subtle', 'neutral', 'neutralDark'] as const;
const alertShapes = ['square', 'round'] as const;

const dropdownItems = [
  { label: 'Edit', icon: <Icon name="edit" size="small" />, onClick: () => alert('Edit') },
  {
    label: 'Duplicate',
    icon: <Icon name="carbon-copy" size="small" />,
    onClick: () => alert('Duplicate'),
  },
  { label: 'Archive', icon: <Icon name="inbox" size="small" />, onClick: () => alert('Archive') },
  { divider: true },
  { label: 'Delete', icon: <Icon name="trash" size="small" />, onClick: () => alert('Delete') },
];

const dropdownWithDesc = [
  {
    label: 'Create Analysis',
    description: 'Analyze and autofill attributes',
    onClick: () => alert('Create'),
  },
  {
    label: 'Create Mapping',
    description: 'Connect CLM attributes to AI models',
    onClick: () => alert('Mapping'),
  },
  {
    label: 'Apply in Bulk',
    description: 'Upload CSV to apply values',
    onClick: () => alert('Bulk'),
  },
];

const dropdownWithShortcuts = [
  { label: 'Undo', shortcut: 'Ctrl+Z', onClick: () => alert('Undo') },
  { label: 'Redo', shortcut: 'Ctrl+Y', onClick: () => alert('Redo') },
  { divider: true },
  { label: 'Cut', shortcut: 'Ctrl+X', onClick: () => alert('Cut') },
  { label: 'Copy', shortcut: 'Ctrl+C', onClick: () => alert('Copy') },
  { label: 'Paste', shortcut: 'Ctrl+V', onClick: () => alert('Paste') },
];

const dropdownPositions = ['bottom', 'top', 'left', 'right'] as const;

const sampleData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Viewer', status: 'inactive' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Editor', status: 'active' },
  { id: 5, name: 'Charlie Davis', email: 'charlie@example.com', role: 'Admin', status: 'pending' },
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

const tableVariants = ['bordered', 'striped'] as const;
const tableSizes = ['small', 'large'] as const;
const listVariants = ['bordered', 'divided'] as const;
const listSizes = ['small', 'medium', 'large'] as const;

export const OverlayComposites: React.FC<OverlayCompositesProps> = ({ activeSubpage }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [alertVisible, setAlertVisible] = useState(true);
  const [tableSortColumn, setTableSortColumn] = useState('name');
  const [tableSortDirection, setTableSortDirection] = useState<'asc' | 'desc'>('asc');
  const [tableSelectedRows, setTableSelectedRows] = useState<Set<number>>(new Set());

  if (activeSubpage === 'combobutton') {
    return (
      <div className={styles.tokenPage}>
        {/* Variants */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Variants</h3>
          </div>
          <div className={styles.demoRow}>
            <Inline gap="medium">
              {comboVariants.map((variant) => (
                <ComboButton
                  key={variant}
                  variant={variant}
                  startIcon={variant === 'tertiary' ? 'overflow-horizontal' : undefined}
                  onClick={() => alert('Main action')}
                  onDropdownClick={() => alert('Dropdown')}
                >
                  {variant}
                </ComboButton>
              ))}
            </Inline>
          </div>
        </div>

        {/* Sizes */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Sizes</h3>
          </div>
          <div className={styles.demoRow}>
            <Inline gap="medium">
              {comboSizes.map((size) => (
                <ComboButton
                  key={size}
                  size={size}
                  onClick={() => alert(size)}
                  onDropdownClick={() => alert('Dropdown')}
                >
                  {size}
                </ComboButton>
              ))}
            </Inline>
          </div>
        </div>

        {/* With Icons */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>With Icons</h3>
          </div>
          <div className={styles.demoRow}>
            <Inline gap="medium">
              {comboIcons.map(({ icon, label, variant }) => (
                <ComboButton
                  key={icon}
                  startIcon={icon}
                  variant={variant as any}
                  onClick={() => alert(label)}
                  onDropdownClick={() => alert('Options')}
                >
                  {label}
                </ComboButton>
              ))}
            </Inline>
          </div>
        </div>

        {/* Tertiary (Icon-only) */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Tertiary (Icon-only)</h3>
          </div>
          <div className={styles.stateRow}>
            <div className={styles.stateCell}>
              <span className={styles.stateLabel}>overflow-horizontal</span>
              <ComboButton
                variant="tertiary"
                startIcon="overflow-horizontal"
                onClick={() => alert('Action')}
                onDropdownClick={() => alert('Menu')}
              />
            </div>
            <div className={styles.stateCell}>
              <span className={styles.stateLabel}>settings</span>
              <ComboButton
                variant="tertiary"
                startIcon="settings"
                onClick={() => alert('Settings')}
                onDropdownClick={() => alert('Options')}
              />
            </div>
            <div className={styles.stateCell}>
              <span className={styles.stateLabel}>download</span>
              <ComboButton
                variant="tertiary"
                startIcon="download"
                onClick={() => alert('Download')}
                onDropdownClick={() => alert('Download options')}
              />
            </div>
            <div className={styles.stateCell}>
              <span className={styles.stateLabel}>small</span>
              <ComboButton
                variant="tertiary"
                size="small"
                startIcon="overflow-horizontal"
                onClick={() => alert('Action')}
                onDropdownClick={() => alert('Menu')}
              />
            </div>
          </div>
          <Text size="sm" color="secondary" style={{ marginTop: 'var(--ink-spacing-100)' }}>
            Tertiary variant is always icon-only (compact) per Figma spec
          </Text>
        </div>

        {/* States */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>States</h3>
          </div>
          <div className={styles.stateRow}>
            <div className={styles.stateCell}>
              <span className={styles.stateLabel}>Default</span>
              <ComboButton onClick={() => {}} onDropdownClick={() => {}}>
                Button
              </ComboButton>
            </div>
            <div className={styles.stateCell}>
              <span className={styles.stateLabel}>Disabled</span>
              <ComboButton disabled onClick={() => {}} onDropdownClick={() => {}}>
                Disabled
              </ComboButton>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeSubpage === 'modal') {
    return (
      <div className={styles.tokenPage}>
        {/* Trigger */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Interactive Demo</h3>
          </div>
          <div className={styles.interactiveArea}>
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
              <Stack gap="small">
                <Text>This is a basic modal with title, content, and footer.</Text>
                <Text color="secondary">Click outside or press ESC to close.</Text>
              </Stack>
            </Modal>
          </div>
        </div>

        {/* Sizes */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Available Sizes</h3>
          </div>
          <div className={styles.demoRow}>
            <Inline gap="small">
              {['small', 'medium', 'large', 'xlarge'].map((size) => (
                <Badge key={size} variant="neutral">
                  {size}
                </Badge>
              ))}
            </Inline>
          </div>
        </div>

        {/* Features */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Features</h3>
          </div>
          <div className={styles.demoGrid}>
            {['closeOnBackdropClick', 'closeOnEscape', 'Custom footer', 'Scrollable content'].map(
              (feature) => (
                <Badge key={feature} variant="neutral">
                  {feature}
                </Badge>
              )
            )}
          </div>
        </div>
      </div>
    );
  }

  if (activeSubpage === 'dropdown') {
    return (
      <div className={styles.tokenPage}>
        {/* Default */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Default Dropdown</h3>
          </div>
          <div className={styles.interactiveArea}>
            <Dropdown items={dropdownItems}>
              <Button>Actions</Button>
            </Dropdown>
          </div>
        </div>

        {/* With Descriptions */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>With Descriptions</h3>
          </div>
          <div className={styles.interactiveArea}>
            <Dropdown items={dropdownWithDesc}>
              <Button>Create</Button>
            </Dropdown>
          </div>
        </div>

        {/* With Shortcuts */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>With Shortcuts</h3>
          </div>
          <div className={styles.interactiveArea}>
            <Dropdown items={dropdownWithShortcuts}>
              <Button>Edit</Button>
            </Dropdown>
          </div>
        </div>

        {/* Positions */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Positions</h3>
          </div>
          <div className={styles.stateRow}>
            {dropdownPositions.map((position) => (
              <div className={styles.stateCell} key={position}>
                <span className={styles.stateLabel}>{position}</span>
                <Dropdown items={dropdownItems.slice(0, 3)} position={position}>
                  <Button size="small" kind="secondary">
                    {position}
                  </Button>
                </Dropdown>
              </div>
            ))}
          </div>
        </div>

        {/* Disabled Items */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>With Disabled Items</h3>
          </div>
          <div className={styles.interactiveArea}>
            <Dropdown
              items={[
                { label: 'Active Item', onClick: () => alert('Active') },
                { label: 'Disabled Item', disabled: true, onClick: () => {} },
                { label: 'Another Active', onClick: () => alert('Active') },
              ]}
            >
              <Button>Menu</Button>
            </Dropdown>
          </div>
        </div>
      </div>
    );
  }

  if (activeSubpage === 'alert') {
    return (
      <div className={styles.tokenPage}>
        {/* Kinds */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Alert Kinds</h3>
          </div>
          <Stack gap="small">
            {alertKinds.map((kind) => (
              <Alert key={kind} kind={kind}>
                This is a {kind} alert message.
              </Alert>
            ))}
          </Stack>
        </div>

        {/* With Titles */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>With Titles</h3>
          </div>
          <Stack gap="small">
            {alertKinds.map((kind) => (
              <Alert key={kind} kind={kind} title={kind.charAt(0).toUpperCase() + kind.slice(1)}>
                This is a {kind} alert with a title.
              </Alert>
            ))}
          </Stack>
        </div>

        {/* Dismissible */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Dismissible</h3>
          </div>
          <div className={styles.interactiveArea}>
            {alertVisible ? (
              <Alert
                kind="information"
                title="Dismissible Alert"
                onClose={() => setAlertVisible(false)}
              >
                This alert can be dismissed.
              </Alert>
            ) : (
              <Button size="small" kind="secondary" onClick={() => setAlertVisible(true)}>
                Show Alert
              </Button>
            )}
          </div>
        </div>

        {/* With Action */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>With Action</h3>
          </div>
          <div className={styles.interactiveArea}>
            <Alert
              kind="warning"
              title="Action Required"
              action={{ label: 'View Details', onClick: () => alert('Action clicked') }}
            >
              You have pending documents.
            </Alert>
          </div>
        </div>

        {/* Shapes */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Shapes</h3>
          </div>
          {alertShapes.map((shape) => (
            <div className={styles.demoRow} key={shape}>
              <span className={styles.demoLabel}>{shape}</span>
              <div style={{ flex: 1 }}>
                <Alert kind="information" shape={shape}>
                  {shape} corners
                </Alert>
              </div>
              <span className={styles.propsCode}>shape="{shape}"</span>
            </div>
          ))}
        </div>

        {/* Other Kinds */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Other Kinds</h3>
          </div>
          <Stack gap="small">
            {alertOtherKinds.map((kind) => (
              <Alert key={kind} kind={kind}>
                This is a {kind} alert message.
              </Alert>
            ))}
          </Stack>
        </div>
      </div>
    );
  }

  if (activeSubpage === 'banner') {
    return (
      <div className={styles.tokenPage}>
        {/* Kinds */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Kinds</h3>
          </div>
          <div className={styles.interactiveArea}>
            <Stack gap="small">
              <Banner kind="information" icon="info">
                Information banner
              </Banner>
              <Banner kind="success" icon="status-check">
                Success banner
              </Banner>
              <Banner kind="warning" icon="status-warn">
                Warning banner
              </Banner>
              <Banner kind="danger" icon="status-error">
                Danger banner
              </Banner>
              <Banner kind="promo" icon="star">
                Promo banner
              </Banner>
              <Banner kind="subtle">Subtle banner</Banner>
              <Banner kind="neutral">Neutral banner</Banner>
            </Stack>
          </div>
        </div>

        {/* Options */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Options</h3>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>with action</span>
            <div style={{ flex: 1 }}>
              <Banner
                kind="information"
                icon="info"
                action={{ label: 'Learn More', onClick: () => {} }}
              >
                Banner with action button
              </Banner>
            </div>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>round shape</span>
            <div style={{ flex: 1 }}>
              <Banner kind="success" shape="round">
                Rounded corners
              </Banner>
            </div>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>lineWrap</span>
            <div style={{ flex: 1 }}>
              <Banner kind="information" lineWrap action={{ label: 'Action', onClick: () => {} }}>
                This is a longer banner message that wraps to multiple lines for detailed content.
              </Banner>
            </div>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>not closable</span>
            <div style={{ flex: 1 }}>
              <Banner kind="warning" icon="status-warn" closable={false}>
                Cannot dismiss
              </Banner>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeSubpage === 'table') {
    return (
      <div className={styles.tokenPage}>
        {/* Basic */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Basic Table</h3>
          </div>
          <Table columns={basicColumns} data={sampleData} />
        </div>

        {/* With Sorting */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>With Sorting</h3>
          </div>
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
        </div>

        {/* With Selection */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>With Selection</h3>
          </div>
          <Table
            columns={basicColumns}
            data={sampleData}
            selectable
            selectedRows={tableSelectedRows}
            onSelectionChange={setTableSelectedRows}
            getRowKey={(row) => row.id}
          />
          <div className={styles.demoRow}>
            <Text size="small" color="secondary">
              Selected: {tableSelectedRows.size} row(s)
            </Text>
          </div>
        </div>

        {/* Variants */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Variants</h3>
          </div>
          {tableVariants.map((variant) => (
            <div key={variant} style={{ marginBottom: '16px' }}>
              <div className={styles.demoRow}>
                <span className={styles.demoLabel}>{variant}</span>
                <span className={styles.propsCode}>variant="{variant}"</span>
              </div>
              <Table columns={basicColumns} data={sampleData.slice(0, 2)} variant={variant} />
            </div>
          ))}
        </div>

        {/* Sizes */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Sizes</h3>
          </div>
          {tableSizes.map((size) => (
            <div key={size} style={{ marginBottom: '16px' }}>
              <div className={styles.demoRow}>
                <span className={styles.demoLabel}>{size}</span>
                <span className={styles.propsCode}>size="{size}"</span>
              </div>
              <Table columns={basicColumns} data={sampleData.slice(0, 2)} size={size} />
            </div>
          ))}
        </div>

        {/* States */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>States</h3>
          </div>
          <div className={styles.stateRow}>
            <div className={styles.stateCell}>
              <span className={styles.stateLabel}>Hoverable</span>
              <Table
                columns={basicColumns}
                data={sampleData.slice(0, 2)}
                hoverable
                onRowClick={(row) => alert(row.name)}
              />
            </div>
          </div>
          <div className={styles.stateRow}>
            <div className={styles.stateCell}>
              <span className={styles.stateLabel}>Empty</span>
              <Table columns={basicColumns} data={[]} emptyMessage="No users found." />
            </div>
            <div className={styles.stateCell}>
              <span className={styles.stateLabel}>Loading</span>
              <Table columns={basicColumns} data={[]} loading />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeSubpage === 'list') {
    return (
      <div className={styles.tokenPage}>
        {/* Basic */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Basic List</h3>
          </div>
          <div className={styles.interactiveArea}>
            <List>
              <List.Item>First item in the list</List.Item>
              <List.Item>Second item in the list</List.Item>
              <List.Item>Third item in the list</List.Item>
            </List>
          </div>
        </div>

        {/* With Descriptions */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>With Descriptions</h3>
          </div>
          <div className={styles.interactiveArea}>
            <List>
              <List.Item description="Additional information">First item</List.Item>
              <List.Item description="More details here">Second item</List.Item>
              <List.Item description="Even more info">Third item</List.Item>
            </List>
          </div>
        </div>

        {/* With Icons & End Elements */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>With Icons & End Elements</h3>
          </div>
          <div className={styles.interactiveArea}>
            <List>
              <List.Item
                startElement={<Icon name="document" />}
                endElement={<Badge variant="success">Active</Badge>}
              >
                Contract_2024.pdf
              </List.Item>
              <List.Item
                startElement={<Icon name="document" />}
                endElement={<Badge variant="warning">Pending</Badge>}
              >
                Invoice_March.pdf
              </List.Item>
              <List.Item
                startElement={<Icon name="document" />}
                endElement={<Badge variant="error">Expired</Badge>}
              >
                Agreement_2023.pdf
              </List.Item>
            </List>
          </div>
        </div>

        {/* With Meta */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>With Meta Information</h3>
          </div>
          <div className={styles.interactiveArea}>
            <List>
              <List.Item meta="2 hours ago">New message from John</List.Item>
              <List.Item meta="5 hours ago">Document shared by Sarah</List.Item>
              <List.Item meta="Yesterday">Meeting reminder</List.Item>
            </List>
          </div>
        </div>

        {/* Clickable */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Clickable List</h3>
          </div>
          <div className={styles.interactiveArea}>
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
          </div>
        </div>

        {/* Variants */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Variants</h3>
          </div>
          <div className={styles.stateRow}>
            {listVariants.map((variant) => (
              <div className={styles.stateCell} key={variant}>
                <span className={styles.stateLabel}>{variant}</span>
                <List variant={variant}>
                  <List.Item>Item in {variant} list</List.Item>
                  <List.Item>Another item</List.Item>
                </List>
              </div>
            ))}
          </div>
        </div>

        {/* Sizes */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Sizes</h3>
          </div>
          <div className={styles.stateRow}>
            {listSizes.map((size) => (
              <div className={styles.stateCell} key={size}>
                <span className={styles.stateLabel}>{size}</span>
                <List size={size}>
                  <List.Item
                    startElement={<Icon name="star" size={size === 'small' ? 'small' : 'medium'} />}
                  >
                    {size} item
                  </List.Item>
                  <List.Item
                    startElement={
                      <Icon name="star-filled" size={size === 'small' ? 'small' : 'medium'} />
                    }
                  >
                    Another {size}
                  </List.Item>
                </List>
              </div>
            ))}
          </div>
        </div>

        {/* Ordered & Disabled */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Ordered & Disabled</h3>
          </div>
          <div className={styles.stateRow}>
            <div className={styles.stateCell}>
              <span className={styles.stateLabel}>ordered</span>
              <List ordered>
                <List.Item>First step</List.Item>
                <List.Item>Second step</List.Item>
                <List.Item>Third step</List.Item>
              </List>
            </div>
            <div className={styles.stateCell}>
              <span className={styles.stateLabel}>with disabled</span>
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
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeSubpage === 'callout') {
    return (
      <div className={styles.tokenPage}>
        {/* Arrow Location */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Arrow Location</h3>
          </div>
          <Grid columns={2} gap="medium">
            <Stack gap="xsmall" align="center">
              <Text size="sm" color="secondary">
                above
              </Text>
              <Callout
                heading="Above"
                width="small"
                location="above"
                closeButton={false}
                enableArrow
              >
                Arrow points up
              </Callout>
            </Stack>
            <Stack gap="xsmall" align="center">
              <Text size="sm" color="secondary">
                below
              </Text>
              <Callout
                heading="Below"
                width="small"
                location="below"
                closeButton={false}
                enableArrow
              >
                Arrow points down
              </Callout>
            </Stack>
          </Grid>
        </div>

        {/* Arrow Alignment */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Arrow Alignment</h3>
          </div>
          <Stack gap="medium">
            <Stack gap="xsmall">
              <Text size="sm" color="secondary">
                alignment="start"
              </Text>
              <Callout
                heading="Start"
                width="medium"
                alignment="start"
                closeButton={false}
                enableArrow
              >
                Arrow at left edge
              </Callout>
            </Stack>
            <Stack gap="xsmall">
              <Text size="sm" color="secondary">
                alignment="center" (default)
              </Text>
              <Callout
                heading="Center"
                width="medium"
                alignment="center"
                closeButton={false}
                enableArrow
              >
                Arrow centered
              </Callout>
            </Stack>
            <Stack gap="xsmall">
              <Text size="sm" color="secondary">
                alignment="end"
              </Text>
              <Callout heading="End" width="medium" alignment="end" closeButton={false} enableArrow>
                Arrow at right edge
              </Callout>
            </Stack>
          </Stack>
        </div>

        {/* Width & Close Button */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Widths</h3>
          </div>
          <Stack gap="small">
            <Inline gap="small" align="start">
              <Badge variant="neutral">small</Badge>
              <Badge variant="neutral">medium</Badge>
              <Badge variant="neutral">large</Badge>
              <Badge variant="neutral">xlarge</Badge>
            </Inline>
            <Callout heading="With Close Button" width="small" closeButton enableArrow={false}>
              320px width
            </Callout>
          </Stack>
        </div>

        {/* With Actions */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>With Actions</h3>
          </div>
          <Callout
            heading="Confirm Action"
            width="medium"
            actions
            primaryAction={{ label: 'Confirm', onClick: () => {} }}
            secondaryAction={{ label: 'Cancel', onClick: () => {} }}
            closeButton={false}
            enableArrow={false}
          >
            Are you sure you want to proceed?
          </Callout>
        </div>

        {/* Glass Effects */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Glass Effects</h3>
          </div>
          <Stack gap="medium">
            <Grid columns={2} gap="medium">
              <Stack gap="xsmall" align="center">
                <Text size="sm" color="secondary">
                  glassFrost + closeButton
                </Text>
                <Callout heading="Frost" width="small" glass="glassFrost" closeButton enableArrow>
                  White close icon
                </Callout>
              </Stack>
              <Stack gap="xsmall" align="center">
                <Text size="sm" color="secondary">
                  glassTint + actions
                </Text>
                <Callout
                  heading="Tint"
                  width="small"
                  glass="glassTint"
                  closeButton={false}
                  enableArrow
                  actions
                  primaryAction={{ label: 'Confirm', onClick: () => {} }}
                  secondaryAction={{ label: 'Cancel', onClick: () => {} }}
                >
                  With action buttons
                </Callout>
              </Stack>
            </Grid>
          </Stack>
        </div>
      </div>
    );
  }

  if (activeSubpage === 'ai-badge') {
    return (
      <div className={styles.tokenPage}>
        {/* Default */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Default Usage</h3>
          </div>
          <div className={styles.interactiveArea}>
            <AIBadge />
          </div>
          <div className={styles.demoDesc}>
            Click to open the default info callout. Includes Docusign Iris information and link.
          </div>
        </div>

        {/* Custom Text */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Custom Text</h3>
          </div>
          <div className={styles.demoGrid}>
            <div className={styles.demoGridItem}>
              <AIBadge>AI-Generated</AIBadge>
              <span className={styles.demoGridLabel}>AI-Generated</span>
            </div>
            <div className={styles.demoGridItem}>
              <AIBadge>Powered by AI</AIBadge>
              <span className={styles.demoGridLabel}>Powered by AI</span>
            </div>
            <div className={styles.demoGridItem}>
              <AIBadge>Smart Suggest</AIBadge>
              <span className={styles.demoGridLabel}>Smart Suggest</span>
            </div>
          </div>
        </div>

        {/* Custom Callout Content */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Custom Callout Content</h3>
          </div>
          <div className={styles.interactiveArea}>
            <Stack gap="large">
              <AIBadge
                infoTitle="AI Summary"
                infoContent="Our AI has analyzed this document and extracted key information to help you understand the content quickly."
              >
                AI Summary
              </AIBadge>
              <AIBadge
                infoTitle="Smart Suggestions"
                infoContent="These suggestions are powered by machine learning algorithms trained on millions of similar documents."
                calloutPosition="top"
              >
                Smart Suggest
              </AIBadge>
            </Stack>
          </div>
          <div className={styles.demoDesc}>
            Pass custom infoTitle and infoContent to override the default callout.
          </div>
        </div>

        {/* Without Callout */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Without Callout</h3>
          </div>
          <div className={styles.interactiveArea}>
            <AIBadge infoContent={false}>Static Badge</AIBadge>
          </div>
          <div className={styles.demoDesc}>
            Set infoContent=&#123;false&#125; to disable the callout and make it non-interactive.
          </div>
        </div>

        {/* In Context */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>In Context</h3>
          </div>
          <div className={styles.interactiveArea}>
            <Card>
              <Card.Body>
                <Stack gap="medium">
                  <Inline gap="small" align="center">
                    <AIBadge />
                    <Text weight="semibold">Document Summary</Text>
                  </Inline>
                  <Text color="secondary">
                    This document contains 12 pages covering contract terms, legal obligations, and
                    signature requirements.
                  </Text>
                </Stack>
              </Card.Body>
            </Card>
          </div>
        </div>

        {/* States */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>States</h3>
          </div>
          <div className={styles.stateRow}>
            <div className={styles.stateCell}>
              <span className={styles.stateLabel}>Default</span>
              <AIBadge />
            </div>
            <div className={styles.stateCell}>
              <span className={styles.stateLabel}>Static</span>
              <AIBadge infoContent={false} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeSubpage === 'chip') {
    return (
      <div className={styles.tokenPage}>
        {/* Basic */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Basic Chips</h3>
          </div>
          <div className={styles.demoGrid}>
            <Chip>React</Chip>
            <Chip>TypeScript</Chip>
            <Chip>JavaScript</Chip>
            <Chip>CSS</Chip>
          </div>
        </div>

        {/* With Elements */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>With Start Element</h3>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>Avatar</span>
            <div className={styles.demoPreviewWide}>
              <Inline gap="small">
                <Chip startElement={<Avatar size="xsmall" initials="JD" />}>John Doe</Chip>
                <Chip startElement={<Avatar size="xsmall" initials="AB" />}>Alice Brown</Chip>
              </Inline>
            </div>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>Icon</span>
            <div className={styles.demoPreview}>
              <Chip startElement={<Icon name="star" size="small" />}>Favorite</Chip>
            </div>
          </div>
        </div>

        {/* Interactive */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Interactive</h3>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>Removable</span>
            <div className={styles.demoPreviewWide}>
              <Inline gap="small">
                <Chip onRemove={() => {}}>React</Chip>
                <Chip onRemove={() => {}}>TypeScript</Chip>
              </Inline>
            </div>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>Clickable</span>
            <div className={styles.demoPreviewWide}>
              <Inline gap="small">
                <Chip onClick={() => {}}>All</Chip>
                <Chip onClick={() => {}}>Active</Chip>
              </Inline>
            </div>
          </div>
        </div>

        {/* States */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>States</h3>
          </div>
          <div className={styles.stateRow}>
            <div className={styles.stateCell}>
              <span className={styles.stateLabel}>Default</span>
              <Chip>Default</Chip>
            </div>
            <div className={styles.stateCell}>
              <span className={styles.stateLabel}>Disabled</span>
              <Chip disabled>Disabled</Chip>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
