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

const breadcrumbWithIcons = [
  { label: 'Home', href: '/', icon: <Icon name="home" size="small" /> },
  { label: 'Products', href: '/products', icon: <Icon name="bag" size="small" /> },
  { label: 'Details', icon: <Icon name="info" size="small" /> },
];

const longBreadcrumb = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Electronics', href: '/products/electronics' },
  { label: 'Computers', href: '/products/electronics/computers' },
  { label: 'Laptops', href: '/products/electronics/computers/laptops' },
  { label: 'Gaming' },
];

const separatorVariants = [
  { sep: '>', label: '>' },
  { sep: '·', label: '·' },
  { sep: <Icon name="chevron-right" size="small" />, label: 'icon' },
] as const;

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
    icon: <Icon name="star" size="small" />,
    content: 'Fast, easy to use, and highly customizable.',
  },
  {
    id: '2',
    title: 'Documentation',
    icon: <Icon name="book" size="small" />,
    content: 'Comprehensive documentation with examples.',
  },
  {
    id: '3',
    title: 'Support',
    icon: <Icon name="help" size="small" />,
    content: '24/7 support available for all users.',
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

        {/* With Icons */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>With Icons</h3>
          </div>
          <div className={styles.interactiveArea}>
            <Breadcrumb items={breadcrumbWithIcons} />
          </div>
        </div>

        {/* Custom Separators */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Custom Separators</h3>
          </div>
          {separatorVariants.map(({ sep, label }) => (
            <div className={styles.demoRow} key={label}>
              <span className={styles.demoLabel}>{label}</span>
              <div style={{ flex: 1 }}>
                <Breadcrumb items={breadcrumbItems} separator={sep} />
              </div>
              <span className={styles.propsCode}>separator="{label}"</span>
            </div>
          ))}
        </div>

        {/* With MaxItems */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>With MaxItems</h3>
          </div>
          <div className={styles.interactiveArea}>
            <Breadcrumb items={longBreadcrumb} maxItems={4} />
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoDesc}>6 items collapsed to 4 with ellipsis</span>
            <span className={styles.propsCode}>maxItems={'{4}'}</span>
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
        {/* Default */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Default (Single Open)</h3>
          </div>
          <div className={styles.interactiveArea}>
            <Accordion items={accordionItems} />
          </div>
        </div>

        {/* Allow Multiple */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Allow Multiple Open</h3>
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

        {/* With Icons */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>With Icons</h3>
          </div>
          <div className={styles.interactiveArea}>
            <Accordion items={accordionWithIcons} allowMultiple />
          </div>
        </div>

        {/* Options */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Options</h3>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>no border</span>
            <div style={{ flex: 1 }}>
              <Accordion items={accordionItems.slice(0, 2)} bordered={false} />
            </div>
            <span className={styles.propsCode}>bordered={'{false}'}</span>
          </div>
        </div>

        {/* With Disabled */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>With Disabled Item</h3>
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
        </div>
      </div>
    );
  }

  return null;
};
