import React from 'react';
import {
  Stack,
  Card,
  Heading,
  Text,
  Alert,
  Divider,
  Button,
  Icon,
  Badge,
  Inline,
  AlertBadge,
  Grid,
  Avatar,
} from '@/design-system';
import { GlobalNav, LocalNav, VerticalNavigation } from '@/design-system/5-patterns';
import { List } from '@/design-system/4-composites';
import type { NavigationItem } from '@/design-system/5-patterns';

export interface PatternsShowcaseProps {
  activeSubpage: string;
}

export const PatternsShowcase: React.FC<PatternsShowcaseProps> = ({ activeSubpage }) => {
  // LAYER 5: PATTERNS
  // ========================================

  // GlobalNav
  if (activeSubpage === 'globalnav') {
    const globalNavItems = [
      {
        id: 'insights',
        label: 'Insights',
        active: globalNavActive === 'insights',
        onClick: () => setGlobalNavActive('insights'),
      },
      {
        id: 'campaigns',
        label: 'Campaigns',
        active: globalNavActive === 'campaigns',
        onClick: () => setGlobalNavActive('campaigns'),
      },
      {
        id: 'audiences',
        label: 'Audiences',
        active: globalNavActive === 'audiences',
        onClick: () => setGlobalNavActive('audiences'),
      },
      {
        id: 'reports',
        label: 'Reports',
        active: globalNavActive === 'reports',
        onClick: () => setGlobalNavActive('reports'),
      },
    ];

    return (
      <Stack gap="large">
        <Card>
          <Card.Body>
            <Stack gap="large">
              <Stack gap="small">
                <Inline gap="small" align="center">
                  <Heading level={2}>GlobalNav</Heading>
                  <AlertBadge variant="warning">Layer 5: Pattern</AlertBadge>
                </Inline>
                <Text color="secondary">
                  Global navigation bar with branding, primary navigation, and utility actions.
                  Composed from Avatar (Layer 3) and Icon (Layer 3).
                </Text>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Complete GlobalNav</Heading>
                <div
                  style={{
                    border: '1px solid var(--ink-border-default)',
                    borderRadius: 'var(--ink-radius-size-xs)',
                  }}
                >
                  <GlobalNav
                    logo={
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div
                          style={{
                            width: '32px',
                            height: '32px',
                            background: 'var(--ink-brand-500)',
                            borderRadius: '6px',
                          }}
                        />
                        <Text weight="semibold">Acme</Text>
                      </div>
                    }
                    navItems={globalNavItems}
                    showAppSwitcher={true}
                    onAppSwitcherClick={() => alert('App switcher clicked')}
                    showSearch={true}
                    onSearchClick={() => alert('Search clicked')}
                    showNotifications={true}
                    onNotificationClick={() => alert('Notifications clicked')}
                    notificationCount={5}
                    showSettings={true}
                    onSettingsClick={() => alert('Settings clicked')}
                    user={{
                      name: 'Jane Doe',
                    }}
                    onUserMenuClick={() => alert('User menu clicked')}
                  />
                </div>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>With Notification Badge</Heading>
                <div
                  style={{
                    border: '1px solid var(--ink-border-default)',
                    borderRadius: 'var(--ink-radius-size-xs)',
                  }}
                >
                  <GlobalNav
                    logo={<Text weight="bold">Brand</Text>}
                    navItems={globalNavItems.slice(0, 3)}
                    showNotifications={true}
                    notificationCount={99}
                    onNotificationClick={() => alert('99+ notifications')}
                    user={{ name: 'John Smith' }}
                  />
                </div>
                <Text size="small" color="secondary">
                  Notification count displays as "99+" when exceeding 99
                </Text>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Minimal Configuration</Heading>
                <div
                  style={{
                    border: '1px solid var(--ink-border-default)',
                    borderRadius: 'var(--ink-radius-size-xs)',
                  }}
                >
                  <GlobalNav logo={<Heading level={4}>Logo</Heading>} navItems={globalNavItems} />
                </div>
                <Text size="small" color="secondary">
                  Only logo and navigation items - utility actions are optional
                </Text>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>With All Utilities</Heading>
                <div
                  style={{
                    border: '1px solid var(--ink-border-default)',
                    borderRadius: 'var(--ink-radius-size-xs)',
                  }}
                >
                  <GlobalNav
                    logo={<Text weight="bold">Platform</Text>}
                    navItems={[
                      { id: 'home', label: 'Home', active: true },
                      { id: 'products', label: 'Products' },
                      { id: 'analytics', label: 'Analytics' },
                    ]}
                    showAppSwitcher={true}
                    showSearch={true}
                    showNotifications={true}
                    notificationCount={12}
                    showSettings={true}
                    user={{
                      name: 'Alex Chen',
                      avatar: 'https://i.pravatar.cc/150?img=8',
                    }}
                    onUserMenuClick={() => alert('User profile')}
                  />
                </div>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Active States</Heading>
                <Text size="small" color="secondary">
                  Click navigation items to see active state styling
                </Text>
                <div
                  style={{
                    border: '1px solid var(--ink-border-default)',
                    borderRadius: 'var(--ink-radius-size-xs)',
                  }}
                >
                  <GlobalNav
                    logo={<Text weight="bold">Demo</Text>}
                    navItems={globalNavItems}
                    user={{ name: 'Demo User' }}
                  />
                </div>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Key Features</Heading>
                <Grid columns={2} gap="small">
                  <Badge variant="neutral">App switcher</Badge>
                  <Badge variant="neutral">Primary navigation</Badge>
                  <Badge variant="neutral">Search integration</Badge>
                  <Badge variant="neutral">Notification center</Badge>
                  <Badge variant="neutral">Settings access</Badge>
                  <Badge variant="neutral">User profile menu</Badge>
                  <Badge variant="neutral">Active state tracking</Badge>
                  <Badge variant="neutral">Avatar support</Badge>
                </Grid>
              </Stack>
            </Stack>
          </Card.Body>
        </Card>
      </Stack>
    );
  }

  // LocalNav
  if (activeSubpage === 'localnav') {
    const localNavSections = [
      {
        id: 'status',
        title: 'Status',
        headerLabel: true,
        items: [
          {
            id: 'in-progress',
            label: 'In Progress',
            icon: 'clock' as const,
            badge: '3',
            active: localNavActive === 'in-progress',
            onClick: () => setLocalNavActive('in-progress'),
          },
          {
            id: 'completed',
            label: 'Completed',
            icon: 'check-circle' as const,
            active: localNavActive === 'completed',
            onClick: () => setLocalNavActive('completed'),
          },
          {
            id: 'archived',
            label: 'Archived',
            icon: 'archive' as const,
            active: localNavActive === 'archived',
            onClick: () => setLocalNavActive('archived'),
          },
        ],
      },
      {
        id: 'projects',
        title: 'Projects',
        collapsible: true,
        defaultExpanded: true,
        items: [
          {
            id: 'website-redesign',
            label: 'Website Redesign',
            icon: 'layout' as const,
            hasMenu: true,
            onMenuClick: () => alert('Project menu'),
            active: localNavActive === 'website-redesign',
            onClick: () => setLocalNavActive('website-redesign'),
          },
          {
            id: 'mobile-app',
            label: 'Mobile App',
            icon: 'smartphone' as const,
            badge: '12',
            hasMenu: true,
            onMenuClick: () => alert('Project menu'),
            active: localNavActive === 'mobile-app',
            onClick: () => setLocalNavActive('mobile-app'),
          },
          {
            id: 'dashboard-v2',
            label: 'Dashboard v2',
            icon: 'bar-chart' as const,
            hasMenu: true,
            onMenuClick: () => alert('Project menu'),
            active: localNavActive === 'dashboard-v2',
            onClick: () => setLocalNavActive('dashboard-v2'),
          },
        ],
      },
      {
        id: 'teams',
        title: 'Teams',
        collapsible: true,
        defaultExpanded: false,
        items: [
          {
            id: 'design',
            label: 'Design Team',
            icon: 'users' as const,
            active: localNavActive === 'design',
            onClick: () => setLocalNavActive('design'),
          },
          {
            id: 'engineering',
            label: 'Engineering',
            icon: 'code' as const,
            active: localNavActive === 'engineering',
            onClick: () => setLocalNavActive('engineering'),
          },
          {
            id: 'marketing',
            label: 'Marketing',
            icon: 'megaphone' as const,
            active: localNavActive === 'marketing',
            onClick: () => setLocalNavActive('marketing'),
          },
        ],
      },
    ];

    const simpleSection = [
      {
        id: 'main',
        items: [
          { id: 'overview', label: 'Overview', icon: 'home' as const, active: true },
          { id: 'activity', label: 'Activity', icon: 'activity' as const, badge: '5' },
          { id: 'settings', label: 'Settings', icon: 'settings' as const },
        ],
      },
    ];

    return (
      <Stack gap="large">
        <Card>
          <Card.Body>
            <Stack gap="large">
              <Stack gap="small">
                <Inline gap="small" align="center">
                  <Heading level={2}>LocalNav</Heading>
                  <AlertBadge variant="warning">Layer 5: Pattern</AlertBadge>
                </Inline>
                <Text color="secondary">
                  Context-aware secondary navigation for pages and workspaces. Composed from Icon
                  (Layer 3), Badge (Layer 3), Switch (Layer 3), and Tooltip (Layer 3).
                </Text>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Full-Featured LocalNav</Heading>
                <div
                  style={{
                    maxWidth: '300px',
                    border: '1px solid var(--ink-border-default)',
                    borderRadius: 'var(--ink-radius-size-xs)',
                  }}
                >
                  <LocalNav
                    headerLabel="My Workspace"
                    sections={localNavSections}
                    onHeaderClick={() => alert('Workspace switcher clicked')}
                    activeItemId={localNavActive}
                    footerToggle={{
                      label: 'New navigation',
                      checked: localNavToggle,
                      onChange: setLocalNavToggle,
                      icon: 'zap',
                    }}
                  />
                </div>
                <Text size="small" color="secondary">
                  Click items to see active states, expand/collapse sections, and toggle footer
                  switch
                </Text>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>With Collapsible Sections</Heading>
                <Grid columns={2} gap="medium">
                  <div
                    style={{
                      border: '1px solid var(--ink-border-default)',
                      borderRadius: 'var(--ink-radius-size-xs)',
                    }}
                  >
                    <LocalNav
                      headerLabel="Projects"
                      sections={localNavSections}
                      activeItemId={localNavActive}
                    />
                  </div>
                  <Stack gap="small">
                    <Text weight="medium">Features shown:</Text>
                    <List size="small">
                      <List.Item startElement={<Icon name="check" size="small" />}>
                        Section headers (label & collapsible)
                      </List.Item>
                      <List.Item startElement={<Icon name="check" size="small" />}>
                        Item badges for counts
                      </List.Item>
                      <List.Item startElement={<Icon name="check" size="small" />}>
                        Context menu buttons
                      </List.Item>
                      <List.Item startElement={<Icon name="check" size="small" />}>
                        Active state indicators
                      </List.Item>
                    </List>
                  </Stack>
                </Grid>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Simple Navigation</Heading>
                <div
                  style={{
                    maxWidth: '280px',
                    border: '1px solid var(--ink-border-default)',
                    borderRadius: 'var(--ink-radius-size-xs)',
                  }}
                >
                  <LocalNav
                    headerLabel="Dashboard"
                    sections={simpleSection}
                    onHeaderClick={() => alert('Dashboard selector')}
                  />
                </div>
                <Text size="small" color="secondary">
                  Minimal configuration with single section and no headers
                </Text>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>With Header Action</Heading>
                <div
                  style={{
                    maxWidth: '300px',
                    border: '1px solid var(--ink-border-default)',
                    borderRadius: 'var(--ink-radius-size-xs)',
                  }}
                >
                  <LocalNav
                    headerLabel="Documents"
                    sections={[
                      {
                        id: 'folders',
                        title: 'Folders',
                        headerLabel: true,
                        headerAction: {
                          icon: 'folder-plus',
                          label: 'New folder',
                          onClick: () => alert('Creating new folder...'),
                        },
                        items: [
                          {
                            id: 'design',
                            label: 'Design Files',
                            icon: 'folder' as const,
                            badge: '24',
                          },
                          {
                            id: 'docs',
                            label: 'Documentation',
                            icon: 'folder' as const,
                            badge: '8',
                          },
                          {
                            id: 'assets',
                            label: 'Assets',
                            icon: 'folder' as const,
                            badge: '156',
                          },
                        ],
                      },
                    ]}
                  />
                </div>
                <Text size="small" color="secondary">
                  Section header with action button (hover over "Folders")
                </Text>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Key Features</Heading>
                <Grid columns={2} gap="small">
                  <Badge variant="neutral">Header dropdown</Badge>
                  <Badge variant="neutral">Collapsible sections</Badge>
                  <Badge variant="neutral">Item badges</Badge>
                  <Badge variant="neutral">Context menus</Badge>
                  <Badge variant="neutral">Active indicators</Badge>
                  <Badge variant="neutral">Icon support</Badge>
                  <Badge variant="neutral">Footer toggle</Badge>
                  <Badge variant="neutral">Tooltips</Badge>
                </Grid>
              </Stack>
            </Stack>
          </Card.Body>
        </Card>
      </Stack>
    );
  }

  // VerticalNavigation
  if (activeSubpage === 'verticalnav') {
    const verticalNavItems: NavigationItem[] = [
      {
        id: 'dashboard',
        label: 'Dashboard',
        icon: 'layout',
        items: [
          { id: 'overview', label: 'Overview', icon: 'home' },
          { id: 'analytics', label: 'Analytics', icon: 'bar-chart' },
          { id: 'reports', label: 'Reports', icon: 'file-text' },
        ],
      },
      {
        id: 'users',
        label: 'Users',
        icon: 'users',
        items: [
          { id: 'all-users', label: 'All Users', icon: 'users' },
          { id: 'teams', label: 'Teams', icon: 'users' },
          { id: 'permissions', label: 'Permissions', icon: 'shield' },
        ],
      },
      {
        id: 'content',
        label: 'Content',
        icon: 'file-text',
        items: [
          { id: 'pages', label: 'Pages', icon: 'file' },
          { id: 'media', label: 'Media', icon: 'image' },
          { id: 'documents', label: 'Documents', icon: 'folder' },
        ],
      },
      {
        id: 'settings',
        label: 'Settings',
        icon: 'settings',
      },
    ];

    return (
      <Stack gap="large">
        <Card>
          <Card.Body>
            <Stack gap="large">
              <Stack gap="small">
                <Inline gap="small" align="center">
                  <Heading level={2}>VerticalNavigation</Heading>
                  <AlertBadge variant="warning">Layer 5: Pattern</AlertBadge>
                </Inline>
                <Text color="secondary">
                  Hierarchical sidebar navigation with expandable sub-items. Composed from Icon
                  (Layer 3) and Tooltip (Layer 3).
                </Text>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Expanded Navigation</Heading>
                <div
                  style={{
                    border: '1px solid var(--ink-border-default)',
                    borderRadius: 'var(--ink-radius-size-xs)',
                    display: 'inline-block',
                  }}
                >
                  <VerticalNavigation
                    items={verticalNavItems}
                    activeItemId={verticalNavActiveItem}
                    activeSubItemId={verticalNavActiveSubItem}
                    onItemClick={(itemId) => {
                      setVerticalNavActiveItem(itemId);
                      setVerticalNavCollapsed(false);
                    }}
                    onSubItemClick={(itemId, subItemId) => {
                      setVerticalNavActiveItem(itemId);
                      setVerticalNavActiveSubItem(subItemId);
                    }}
                    collapsed={verticalNavCollapsed}
                    onCollapsedChange={setVerticalNavCollapsed}
                    logo={
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          padding: '8px',
                        }}
                      >
                        <div
                          style={{
                            width: '32px',
                            height: '32px',
                            background: 'var(--ink-brand-500)',
                            borderRadius: '6px',
                          }}
                        />
                        <Text weight="bold">Admin</Text>
                      </div>
                    }
                    footer={
                      <Stack gap="small" style={{ padding: '16px' }}>
                        <Inline gap="small" align="center">
                          <Avatar name="Admin User" size="small" />
                          <Stack gap="small">
                            <Text size="small" weight="medium">
                              Admin User
                            </Text>
                            <Text size="xs" color="secondary">
                              admin@example.com
                            </Text>
                          </Stack>
                        </Inline>
                      </Stack>
                    }
                  />
                </div>
                <Text size="small" color="secondary">
                  Click items to navigate, click chevron icon in header to collapse
                </Text>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Collapsed Navigation</Heading>
                <Grid columns={2} gap="medium">
                  <div
                    style={{
                      border: '1px solid var(--ink-border-default)',
                      borderRadius: 'var(--ink-radius-size-xs)',
                      display: 'inline-block',
                    }}
                  >
                    <VerticalNavigation
                      items={verticalNavItems}
                      activeItemId="users"
                      collapsed={true}
                      logo={
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '8px',
                          }}
                        >
                          <div
                            style={{
                              width: '32px',
                              height: '32px',
                              background: 'var(--ink-brand-500)',
                              borderRadius: '6px',
                            }}
                          />
                        </div>
                      }
                    />
                  </div>
                  <Stack gap="small">
                    <Text weight="medium">Collapsed State</Text>
                    <Text size="small" color="secondary">
                      Shows only icons with tooltips on hover. Logo adjusts automatically. Sub-items
                      are hidden in collapsed mode.
                    </Text>
                    <List size="small">
                      <List.Item startElement={<Icon name="check" size="small" />}>
                        Icons remain visible
                      </List.Item>
                      <List.Item startElement={<Icon name="check" size="small" />}>
                        Tooltips show labels
                      </List.Item>
                      <List.Item startElement={<Icon name="check" size="small" />}>
                        Width: 64px
                      </List.Item>
                    </List>
                  </Stack>
                </Grid>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Without Logo or Footer</Heading>
                <div
                  style={{
                    border: '1px solid var(--ink-border-default)',
                    borderRadius: 'var(--ink-radius-size-xs)',
                    display: 'inline-block',
                  }}
                >
                  <VerticalNavigation
                    items={[
                      { id: 'home', label: 'Home', icon: 'home' },
                      { id: 'explore', label: 'Explore', icon: 'compass' },
                      { id: 'notifications', label: 'Notifications', icon: 'bell' },
                      { id: 'messages', label: 'Messages', icon: 'message-circle' },
                      { id: 'profile', label: 'Profile', icon: 'user' },
                    ]}
                    activeItemId="home"
                    width={240}
                  />
                </div>
                <Text size="small" color="secondary">
                  Simple navigation without logo or footer sections
                </Text>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>With Nested Sub-Items</Heading>
                <div
                  style={{
                    border: '1px solid var(--ink-border-default)',
                    borderRadius: 'var(--ink-radius-size-xs)',
                    display: 'inline-block',
                  }}
                >
                  <VerticalNavigation
                    items={verticalNavItems}
                    activeItemId="dashboard"
                    activeSubItemId="analytics"
                    onItemClick={(itemId) => setVerticalNavActiveItem(itemId)}
                    onSubItemClick={(itemId, subItemId) => {
                      setVerticalNavActiveItem(itemId);
                      setVerticalNavActiveSubItem(subItemId);
                    }}
                    logo={
                      <Text weight="bold" style={{ padding: '16px' }}>
                        Navigation
                      </Text>
                    }
                  />
                </div>
                <Text size="small" color="secondary">
                  Items with sub-items expand when clicked. Active states track both item and
                  sub-item.
                </Text>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Custom Width</Heading>
                <div
                  style={{
                    border: '1px solid var(--ink-border-default)',
                    borderRadius: 'var(--ink-radius-size-xs)',
                    display: 'inline-block',
                  }}
                >
                  <VerticalNavigation
                    items={verticalNavItems.slice(0, 3)}
                    activeItemId="users"
                    width={320}
                    logo={
                      <Text weight="bold" style={{ padding: '16px' }}>
                        Wide Navigation
                      </Text>
                    }
                  />
                </div>
                <Text size="small" color="secondary">
                  Width can be customized (default: 280px, shown: 320px)
                </Text>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Key Features</Heading>
                <Grid columns={2} gap="small">
                  <Badge variant="neutral">Hierarchical items</Badge>
                  <Badge variant="neutral">Expandable sub-items</Badge>
                  <Badge variant="neutral">Collapse/expand</Badge>
                  <Badge variant="neutral">Active states</Badge>
                  <Badge variant="neutral">Icon support</Badge>
                  <Badge variant="neutral">Tooltips (collapsed)</Badge>
                  <Badge variant="neutral">Custom width</Badge>
                  <Badge variant="neutral">Logo & footer slots</Badge>
                </Grid>
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
