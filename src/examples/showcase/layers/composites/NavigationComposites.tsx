import React, { useState } from 'react';
import {
  Stack,
  Grid,
  Card,
  Heading,
  Text,
  Icon,
  Breadcrumb,
  Pagination,
  Tabs,
  Accordion,
  Stepper,
} from '@/design-system';
import styles from '../../Showcase.module.css';

export interface NavigationCompositesProps {
  activeSubpage: string;
}

// Data definitions for compact rendering
const breadcrumbItems = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Details' },
];

const longBreadcrumb = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Electronics', href: '/products/electronics' },
  { label: 'Computers', href: '/products/electronics/computers' },
  { label: 'Laptops', href: '/products/electronics/computers/laptops' },
  { label: 'Gaming' },
];

const accordionItems = [
  {
    id: '1',
    title: 'What is React?',
    content:
      'React is a JavaScript library for building user interfaces. It allows you to create reusable UI components.',
  },
  {
    id: '2',
    title: 'What is TypeScript?',
    content: 'TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.',
  },
  {
    id: '3',
    title: 'What are Design Systems?',
    content:
      'Design systems are collections of reusable components and patterns that help maintain consistency.',
  },
];

const accordionWithIcons = [
  {
    id: '1',
    title: 'Features',
    startIcon: 'star' as const,
    content: 'Fast, easy to use, and highly customizable.',
  },
  {
    id: '2',
    title: 'Documentation',
    startIcon: 'book' as const,
    content: 'Comprehensive documentation with examples.',
  },
  {
    id: '3',
    title: 'Support',
    startIcon: 'help' as const,
    content: '24/7 support available for all users.',
  },
];

const accordionWithSubtitle = [
  {
    id: '1',
    title: 'Account Settings',
    subtitle: 'Manage your account preferences',
    startIcon: 'user' as const,
    metadata: 'Updated 2 days ago',
    content: 'Configure your profile, password, and notification settings.',
  },
  {
    id: '2',
    title: 'Security',
    subtitle: 'Protect your account',
    startIcon: 'lock' as const,
    metadata: 'Last reviewed 1 week ago',
    content: 'Enable two-factor authentication and manage security keys.',
  },
  {
    id: '3',
    title: 'Billing',
    subtitle: 'Manage your subscription',
    startIcon: 'credit-card' as const,
    metadata: '$29/month',
    content: 'View invoices, update payment methods, and change plans.',
  },
];

export const NavigationComposites: React.FC<NavigationCompositesProps> = ({ activeSubpage }) => {
  const [paginationPage, setPaginationPage] = useState(1);
  const [activeTab, setActiveTab] = useState('tab1');
  const [accordionOpenItems, setAccordionOpenItems] = useState<string[]>(['1']);

  if (activeSubpage === 'breadcrumb') {
    return (
      <div className={styles.tokenPage}>
        {/* Default */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Default Breadcrumb</h3>
          </div>
          <div className={styles.interactiveArea}>
            <Breadcrumb items={breadcrumbItems} />
          </div>
        </div>

        {/* Root Icon */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Root Icon</h3>
          </div>
          <div className={styles.interactiveArea}>
            <Breadcrumb items={breadcrumbItems} rootIcon />
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoDesc}>First item replaced with home icon</span>
            <span className={styles.propsCode}>rootIcon</span>
          </div>
        </div>

        {/* Overflow Menu */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Overflow Menu</h3>
          </div>
          <div className={styles.interactiveArea}>
            <Breadcrumb items={longBreadcrumb} overflowMenu />
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoDesc}>Middle items collapsed to overflow icon</span>
            <span className={styles.propsCode}>overflowMenu</span>
          </div>
        </div>

        {/* Show/Hide Current Page */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Show/Hide Current Page</h3>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>visible</span>
            <div style={{ flex: 1 }}>
              <Breadcrumb items={breadcrumbItems} showCurrentPage />
            </div>
            <span className={styles.propsCode}>showCurrentPage={'{true}'}</span>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>hidden</span>
            <div style={{ flex: 1 }}>
              <Breadcrumb items={breadcrumbItems} showCurrentPage={false} />
            </div>
            <span className={styles.propsCode}>showCurrentPage={'{false}'}</span>
          </div>
        </div>
      </div>
    );
  }

  if (activeSubpage === 'pagination') {
    return (
      <div className={styles.tokenPage}>
        {/* Full Mode */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Full Mode</h3>
          </div>
          <div className={styles.interactiveArea}>
            <Pagination
              currentPage={paginationPage}
              totalPages={10}
              onPageChange={setPaginationPage}
            />
          </div>
        </div>

        {/* Simple Mode */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Simple Mode</h3>
          </div>
          <div className={styles.interactiveArea}>
            <Pagination
              mode="simple"
              currentPage={paginationPage}
              totalPages={10}
              onPageChange={setPaginationPage}
            />
          </div>
        </div>

        {/* Options */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Options</h3>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>many pages</span>
            <div style={{ flex: 1 }}>
              <Pagination currentPage={15} totalPages={50} onPageChange={setPaginationPage} />
            </div>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>no first/last</span>
            <div style={{ flex: 1 }}>
              <Pagination
                currentPage={paginationPage}
                totalPages={10}
                showFirstLast={false}
                onPageChange={setPaginationPage}
              />
            </div>
            <span className={styles.propsCode}>showFirstLast={'{false}'}</span>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>items per page</span>
            <div style={{ flex: 1 }}>
              <Pagination
                currentPage={paginationPage}
                totalPages={10}
                showItemsPerPage
                itemsPerPage={25}
                onPageChange={setPaginationPage}
                onItemsPerPageChange={(items) => console.log('Items:', items)}
              />
            </div>
            <span className={styles.propsCode}>showItemsPerPage</span>
          </div>
        </div>

        {/* States */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>States</h3>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>disabled</span>
            <div style={{ flex: 1 }}>
              <Pagination currentPage={5} totalPages={10} disabled onPageChange={() => {}} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeSubpage === 'tabs') {
    const tabItems = [
      {
        id: 'tab1',
        label: 'Overview',
        content: (
          <div style={{ padding: '16px' }}>
            <Text>Overview content with detailed information.</Text>
          </div>
        ),
      },
      {
        id: 'tab2',
        label: 'Details',
        content: (
          <div style={{ padding: '16px' }}>
            <Text>Detailed specifications and technical information.</Text>
          </div>
        ),
      },
      {
        id: 'tab3',
        label: 'Settings',
        content: (
          <div style={{ padding: '16px' }}>
            <Text>Configure your preferences here.</Text>
          </div>
        ),
      },
      { id: 'tab4', label: 'Disabled', content: <div>Hidden</div>, disabled: true },
    ];

    return (
      <div className={styles.tokenPage}>
        {/* Default */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Default Tabs</h3>
          </div>
          <div className={styles.interactiveArea}>
            <Tabs tabs={tabItems} activeTab={activeTab} onTabChange={setActiveTab} />
          </div>
        </div>

        {/* With Rich Content */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>With Rich Content</h3>
          </div>
          <div className={styles.interactiveArea}>
            <Tabs
              tabs={[
                {
                  id: 'analytics',
                  label: 'Analytics',
                  content: (
                    <Stack gap="medium" style={{ padding: '16px' }}>
                      <Heading level={5}>Analytics Dashboard</Heading>
                      <Grid columns={3} gap="small">
                        <Card>
                          <Card.Body>
                            <Stack gap="none">
                              <Text size="small" color="secondary">
                                Views
                              </Text>
                              <Text weight="bold">12,345</Text>
                            </Stack>
                          </Card.Body>
                        </Card>
                        <Card>
                          <Card.Body>
                            <Stack gap="none">
                              <Text size="small" color="secondary">
                                Conversions
                              </Text>
                              <Text weight="bold">1,234</Text>
                            </Stack>
                          </Card.Body>
                        </Card>
                        <Card>
                          <Card.Body>
                            <Stack gap="none">
                              <Text size="small" color="secondary">
                                Revenue
                              </Text>
                              <Text weight="bold">$45K</Text>
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
                    <div style={{ padding: '16px' }}>
                      <Text>Generate and download custom reports here.</Text>
                    </div>
                  ),
                },
              ]}
            />
          </div>
        </div>

        {/* Many Tabs */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Many Tabs</h3>
          </div>
          <div className={styles.interactiveArea}>
            <Tabs
              tabs={Array.from({ length: 7 }, (_, i) => ({
                id: `tab-${i}`,
                label: `Tab ${i + 1}`,
                content: <div style={{ padding: '16px' }}>Content for Tab {i + 1}</div>,
              }))}
            />
          </div>
        </div>
      </div>
    );
  }

  if (activeSubpage === 'accordion') {
    return (
      <div className={styles.tokenPage}>
        {/* Variants */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Variants</h3>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>bordered</span>
            <div style={{ flex: 1 }}>
              <Accordion items={accordionItems.slice(0, 2)} bordered />
            </div>
            <span className={styles.propsCode}>bordered</span>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>card</span>
            <div style={{ flex: 1 }}>
              <Accordion items={accordionItems.slice(0, 2)} bordered={false} />
            </div>
            <span className={styles.propsCode}>bordered={'{false}'}</span>
          </div>
        </div>

        {/* Item Height */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Item Height</h3>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>compact</span>
            <div style={{ flex: 1 }}>
              <Accordion items={accordionItems.slice(0, 2)} itemHeight="compact" />
            </div>
            <span className={styles.propsCode}>itemHeight="compact"</span>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>default</span>
            <div style={{ flex: 1 }}>
              <Accordion items={accordionItems.slice(0, 2)} itemHeight="default" />
            </div>
            <span className={styles.propsCode}>itemHeight="default"</span>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>tall</span>
            <div style={{ flex: 1 }}>
              <Accordion items={accordionItems.slice(0, 2)} itemHeight="tall" />
            </div>
            <span className={styles.propsCode}>itemHeight="tall"</span>
          </div>
        </div>

        {/* With Start Icons */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>With Start Icons</h3>
          </div>
          <div className={styles.interactiveArea}>
            <Accordion items={accordionWithIcons} allowMultiple />
          </div>
          <div className={styles.demoRow}>
            <span className={styles.propsCode}>startIcon="star"</span>
          </div>
        </div>

        {/* With Subtitle & Metadata */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>With Subtitle & Metadata</h3>
          </div>
          <div className={styles.interactiveArea}>
            <Accordion items={accordionWithSubtitle} bordered={false} />
          </div>
          <div className={styles.demoRow}>
            <span className={styles.propsCode}>subtitle="Description" metadata="Info"</span>
          </div>
        </div>

        {/* Display Level */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Display Level</h3>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>xs (14px)</span>
            <div style={{ flex: 1 }}>
              <Accordion items={accordionItems.slice(0, 2)} displayLevel="xs" />
            </div>
            <span className={styles.propsCode}>displayLevel="xs"</span>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>default (16px)</span>
            <div style={{ flex: 1 }}>
              <Accordion items={accordionItems.slice(0, 2)} />
            </div>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>s (18px)</span>
            <div style={{ flex: 1 }}>
              <Accordion items={accordionItems.slice(0, 2)} displayLevel="s" />
            </div>
            <span className={styles.propsCode}>displayLevel="s"</span>
          </div>
        </div>

        {/* Allow Multiple */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Allow Multiple</h3>
          </div>
          <div className={styles.interactiveArea}>
            <Accordion
              items={accordionItems}
              allowMultiple
              openItems={accordionOpenItems}
              onOpenItemsChange={setAccordionOpenItems}
            />
          </div>
          <div className={styles.demoRow}>
            <span className={styles.propsCode}>allowMultiple</span>
          </div>
        </div>

        {/* States */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>States</h3>
          </div>
          <div className={styles.interactiveArea}>
            <Accordion
              items={[
                { id: '1', title: 'Available Item', content: 'This item can be opened.' },
                { id: '2', title: 'Disabled Item', content: 'Hidden', disabled: true },
                { id: '3', title: 'Another Available', content: 'This is also available.' },
              ]}
            />
          </div>
          <div className={styles.demoRow}>
            <span className={styles.propsCode}>disabled</span>
          </div>
        </div>
      </div>
    );
  }

  if (activeSubpage === 'stepper') {
    const basicSteps = [
      { id: '1', title: 'Account', description: 'Create account' },
      { id: '2', title: 'Profile', description: 'Add info' },
      { id: '3', title: 'Review', description: 'Confirm' },
    ];

    return (
      <div className={styles.tokenPage}>
        {/* Orientation */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Orientation</h3>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>horizontal</span>
            <div style={{ flex: 1 }}>
              <Stepper steps={basicSteps} activeStep={1} />
            </div>
          </div>
          <div className={styles.interactiveArea}>
            <span className={styles.stateLabel} style={{ marginBottom: '8px', display: 'block' }}>
              vertical
            </span>
            <Stepper steps={basicSteps} activeStep={1} orientation="vertical" />
          </div>
        </div>

        {/* Options */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Options</h3>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>clickable</span>
            <div style={{ flex: 1 }}>
              <Stepper steps={basicSteps} activeStep={1} clickable />
            </div>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>no descriptions</span>
            <div style={{ flex: 1 }}>
              <Stepper steps={basicSteps} activeStep={1} showDescription={false} />
            </div>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>no connectors</span>
            <div style={{ flex: 1 }}>
              <Stepper steps={basicSteps} activeStep={1} showConnector={false} />
            </div>
          </div>
        </div>

        {/* With Icons */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Custom Icons</h3>
          </div>
          <div className={styles.interactiveArea}>
            <Stepper
              steps={[
                { id: '1', title: 'Login', icon: <Icon name="user" size="small" /> },
                { id: '2', title: 'Verify', icon: <Icon name="check" size="small" /> },
                { id: '3', title: 'Done', icon: <Icon name="star" size="small" /> },
              ]}
              activeStep={1}
            />
          </div>
        </div>

        {/* With Error */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Error State</h3>
          </div>
          <div className={styles.interactiveArea}>
            <Stepper
              steps={[
                { id: '1', title: 'Complete', status: 'completed' },
                { id: '2', title: 'Error', status: 'error' },
                { id: '3', title: 'Upcoming', status: 'upcoming' },
              ]}
              activeStep={1}
            />
          </div>
        </div>
      </div>
    );
  }

  return null;
};
