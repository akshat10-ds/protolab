import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Input,
  Select,
  Card,
  Stack,
  Grid,
  Heading,
  Text,
  Badge,
  Avatar,
  Tabs,
  Icon,
  Divider,
  SearchInput,
  Switch,
  List,
  Table,
  Dropdown,
  Alert,
} from '@/design-system';
import type { TableColumn } from '@/design-system';

export default function LayoutInk() {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('all');
  const [darkMode, setDarkMode] = useState(false);

  // Sample data for the table
  const tableData = [
    {
      id: 1,
      name: 'Vertical Navigation',
      status: 'active',
      updated: '2 hours ago',
      type: 'Navigation',
      author: 'System'
    },
    {
      id: 2,
      name: 'Dashboard Layout',
      status: 'draft',
      updated: '1 day ago',
      type: 'Layout',
      author: 'User'
    },
    {
      id: 3,
      name: 'Data Table',
      status: 'active',
      updated: '3 days ago',
      type: 'Component',
      author: 'Team'
    },
  ];

  const tableColumns: TableColumn[] = [
    {
      key: 'name',
      header: 'Template Name',
      render: (value, row) => (
        <Stack direction="horizontal" gap="small" align="center">
          <Icon name="file-text" size="small" />
          <Text weight="medium">{value}</Text>
        </Stack>
      )
    },
    {
      key: 'type',
      header: 'Type',
      render: (value) => <Badge variant="neutral">{value}</Badge>
    },
    {
      key: 'status',
      header: 'Status',
      render: (value) => (
        <Badge variant={value === 'active' ? 'success' : 'warning'}>
          {value}
        </Badge>
      )
    },
    { key: 'author', header: 'Author' },
    { key: 'updated', header: 'Last Updated' },
    {
      key: 'actions',
      header: '',
      align: 'right',
      render: () => (
        <Dropdown
          items={[
            { label: 'Edit', onClick: () => {} },
            { label: 'Duplicate', onClick: () => {} },
            { divider: true, label: '' },
            { label: 'Delete', onClick: () => {} },
          ]}
        >
          <Button size="small" kind="tertiary">
            <Icon name="more-horizontal" size="small" />
          </Button>
        </Dropdown>
      )
    }
  ];

  const tabItems = [
    { id: 'overview', label: 'Overview', icon: 'home' },
    { id: 'templates', label: 'Templates', icon: 'file-text' },
    { id: 'components', label: 'Components', icon: 'table' },
    { id: 'settings', label: 'Settings', icon: 'settings' },
  ];

  const sidebarItems = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'projects', label: 'Projects', icon: 'folder' },
    { id: 'templates', label: 'Templates', icon: 'file-text' },
    { id: 'components', label: 'Components', icon: 'table' },
    { id: 'analytics', label: 'Analytics', icon: 'presentation' },
    { id: 'settings', label: 'Settings', icon: 'settings' },
  ];

  return (
    <>
      {/* Version Switcher Banner */}
      <div style={{
        background: 'linear-gradient(90deg, var(--ink-primary), var(--ink-primary-dark, #0052CC))',
        padding: '12px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        position: 'relative',
        zIndex: 1000,
      }}>
        <Stack direction="horizontal" gap="medium" align="center">
          <Badge variant="neutral" style={{ background: 'white', color: 'var(--ink-primary)' }}>
            Ink Design System
          </Badge>
          <Text style={{ color: 'white' }}>
            Viewing Ink Design System Version
          </Text>
        </Stack>
        <Stack direction="horizontal" gap="small">
          <Link to="/ink/showcase" style={{ textDecoration: 'none' }}>
            <Button kind="secondary" size="small">
              <Icon name="table" size="small" />
              Component Showcase
            </Button>
          </Link>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Button kind="secondary" size="small">
              <Icon name="arrow-left" size="small" />
              Switch to Radix Version
            </Button>
          </Link>
        </Stack>
      </div>

      <div className="ink-layout" style={{
        display: 'flex',
        height: 'calc(100vh - 56px)', // Adjust for banner height
        background: 'var(--ink-neutral-5)',
        fontFamily: 'var(--ink-font-family)',
        overflow: 'hidden',
      }}>
        {/* Sidebar */}
      <div style={{
        width: sidebarOpen ? '280px' : '60px',
        background: 'white',
        borderRight: '1px solid var(--ink-neutral-20)',
        transition: 'width 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Logo Section */}
        <div style={{
          padding: '20px',
          borderBottom: '1px solid var(--ink-neutral-20)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}>
          <div style={{
            width: '32px',
            height: '32px',
            background: 'var(--ink-primary)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Text size="lg" weight="bold" style={{ color: 'white' }}>I</Text>
          </div>
          {sidebarOpen && (
            <Heading level={5}>Ink Design</Heading>
          )}
        </div>

        {/* Navigation */}
        <Stack gap="small" style={{ padding: '16px', flex: 1 }}>
          {sidebarItems.map(item => (
            <Button
              key={item.id}
              kind="tertiary"
              style={{
                justifyContent: 'flex-start',
                width: '100%',
                padding: sidebarOpen ? '8px 12px' : '8px',
              }}
            >
              <Icon name={item.icon as any} size="small" />
              {sidebarOpen && (
                <span style={{ marginLeft: '12px' }}>{item.label}</span>
              )}
            </Button>
          ))}
        </Stack>

        {/* Toggle Button */}
        <div style={{ padding: '16px', borderTop: '1px solid var(--ink-neutral-20)' }}>
          <Button
            kind="tertiary"
            size="small"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{ width: '100%', justifyContent: 'center' }}
          >
            <Icon name={sidebarOpen ? 'chevron-left' : 'chevron-right'} size="small" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Header */}
        <header style={{
          background: 'white',
          padding: '16px 24px',
          borderBottom: '1px solid var(--ink-neutral-20)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <Stack direction="horizontal" gap="large" align="center">
            <SearchInput
              placeholder="Search templates, components..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '400px' }}
            />
          </Stack>

          <Stack direction="horizontal" gap="medium" align="center">
            <Button kind="secondary" size="medium">
              <Icon name="plus" size="small" />
              New Template
            </Button>
            <Divider orientation="vertical" style={{ height: '24px' }} />
            <Avatar name="John Doe" size="small" />
          </Stack>
        </header>

        {/* Content Area */}
        <main style={{ flex: 1, padding: '24px', overflow: 'auto' }}>
          {/* Tabs */}
          <Tabs
            items={tabItems.map(item => ({
              id: item.id,
              label: item.label,
              content: null, // We'll render content separately
            }))}
            value={selectedTab}
            onChange={setSelectedTab}
          />

          {/* Tab Content */}
          <div style={{ marginTop: '24px' }}>
            {selectedTab === 'overview' && (
              <Stack gap="large">
                <Alert variant="info" title="Welcome to Ink Design System">
                  <Text>
                    This is a fully functional prototype using the Ink Design System components.
                    All Radix UI components have been replaced with Ink equivalents.
                  </Text>
                </Alert>

                <Grid columns={3} gap="medium">
                  <Card variant="elevated">
                    <Card.Header>
                      <Stack direction="horizontal" justify="between" align="center">
                        <Heading level={6}>Total Templates</Heading>
                        <Icon name="file-text" size="small" />
                      </Stack>
                    </Card.Header>
                    <Card.Body>
                      <Text size="xl" weight="bold">42</Text>
                      <Text size="sm" color="secondary">+12% from last month</Text>
                    </Card.Body>
                  </Card>

                  <Card variant="elevated">
                    <Card.Header>
                      <Stack direction="horizontal" justify="between" align="center">
                        <Heading level={6}>Active Projects</Heading>
                        <Icon name="folder" size="small" />
                      </Stack>
                    </Card.Header>
                    <Card.Body>
                      <Text size="xl" weight="bold">8</Text>
                      <Text size="sm" color="secondary">3 pending review</Text>
                    </Card.Body>
                  </Card>

                  <Card variant="elevated">
                    <Card.Header>
                      <Stack direction="horizontal" justify="between" align="center">
                        <Heading level={6}>Team Members</Heading>
                        <Icon name="users" size="small" />
                      </Stack>
                    </Card.Header>
                    <Card.Body>
                      <Text size="xl" weight="bold">16</Text>
                      <Text size="sm" color="secondary">4 online now</Text>
                    </Card.Body>
                  </Card>
                </Grid>

                <Card>
                  <Card.Header>
                    <Stack direction="horizontal" justify="between" align="center">
                      <Heading level={5}>Recent Templates</Heading>
                      <Button kind="tertiary" size="small">View All</Button>
                    </Stack>
                  </Card.Header>
                  <Card.Body>
                    <Table
                      columns={tableColumns}
                      data={tableData}
                      hoverable
                      variant="default"
                    />
                  </Card.Body>
                </Card>
              </Stack>
            )}

            {selectedTab === 'templates' && (
              <Stack gap="large">
                <Stack direction="horizontal" justify="between" align="center">
                  <Heading level={4}>Template Library</Heading>
                  <Stack direction="horizontal" gap="medium">
                    <Select
                      value={selectedTemplate}
                      onChange={(e) => setSelectedTemplate(e.target.value)}
                      style={{ width: '200px' }}
                    >
                      <option value="all">All Templates</option>
                      <option value="navigation">Navigation</option>
                      <option value="layout">Layouts</option>
                      <option value="forms">Forms</option>
                      <option value="data">Data Display</option>
                    </Select>
                    <Button kind="primary">
                      <Icon name="filter" size="small" />
                      Filter
                    </Button>
                  </Stack>
                </Stack>

                <Grid columns={3} gap="medium">
                  {['Navigation Bar', 'Sidebar Layout', 'Data Grid', 'Form Builder', 'Dashboard', 'Settings Panel'].map((name) => (
                    <Card key={name} variant="outlined" style={{ cursor: 'pointer' }}>
                      <Card.Body>
                        <div style={{
                          height: '120px',
                          background: 'var(--ink-neutral-10)',
                          borderRadius: '8px',
                          marginBottom: '12px',
                        }} />
                        <Heading level={6}>{name}</Heading>
                        <Text size="sm" color="secondary">Updated 2 days ago</Text>
                      </Card.Body>
                      <Card.Footer>
                        <Stack direction="horizontal" gap="small">
                          <Button size="small" kind="secondary">Preview</Button>
                          <Button size="small" kind="tertiary">Use Template</Button>
                        </Stack>
                      </Card.Footer>
                    </Card>
                  ))}
                </Grid>
              </Stack>
            )}

            {selectedTab === 'components' && (
              <Stack gap="large">
                <Heading level={4}>Component Gallery</Heading>
                <Text color="secondary">
                  Browse and test all Ink Design System components
                </Text>

                <Grid columns={4} gap="medium">
                  {['Button', 'Input', 'Select', 'Card', 'Modal', 'Table', 'Tabs', 'Badge'].map((comp) => (
                    <Card key={comp} variant="outlined">
                      <Card.Body>
                        <Stack gap="small" align="center">
                          <Icon name="table" size="medium" />
                          <Text weight="medium">{comp}</Text>
                        </Stack>
                      </Card.Body>
                    </Card>
                  ))}
                </Grid>
              </Stack>
            )}

            {selectedTab === 'settings' && (
              <Stack gap="large">
                <Heading level={4}>Settings</Heading>

                <Card>
                  <Card.Header>
                    <Heading level={5}>Preferences</Heading>
                  </Card.Header>
                  <Card.Body>
                    <Stack gap="medium">
                      <Stack direction="horizontal" justify="between" align="center">
                        <div>
                          <Text weight="medium">Dark Mode</Text>
                          <Text size="sm" color="secondary">Enable dark theme (coming soon)</Text>
                        </div>
                        <Switch
                          checked={darkMode}
                          onChange={setDarkMode}
                          disabled
                        />
                      </Stack>
                      <Divider />
                      <Stack direction="horizontal" justify="between" align="center">
                        <div>
                          <Text weight="medium">Notifications</Text>
                          <Text size="sm" color="secondary">Receive email notifications</Text>
                        </div>
                        <Switch defaultChecked />
                      </Stack>
                      <Divider />
                      <Stack direction="horizontal" justify="between" align="center">
                        <div>
                          <Text weight="medium">Auto-save</Text>
                          <Text size="sm" color="secondary">Automatically save changes</Text>
                        </div>
                        <Switch defaultChecked />
                      </Stack>
                    </Stack>
                  </Card.Body>
                </Card>
              </Stack>
            )}
          </div>
        </main>
      </div>
    </div>
    </>
  );
}