import React from 'react';
import {
  Stack,
  Grid,
  Card,
  Heading,
  Text,
  Alert,
  Divider,
  Button,
  Input,
  Badge,
  Icon,
  Inline,
  AlertBadge,
  Avatar,
  Checkbox,
  Link,
} from '@/design-system';
import { DashboardLayout, AuthLayout } from '@/design-system/6-layouts';
import { VerticalNavigation, GlobalNav } from '@/design-system/5-patterns';
import { List } from '@/design-system/4-composites';
import type { NavigationItem } from '@/design-system/5-patterns';

export interface LayoutsShowcaseProps {
  activeSubpage: string;
}

export const LayoutsShowcase: React.FC<LayoutsShowcaseProps> = ({ activeSubpage }) => {
  // LAYER 6: LAYOUTS
  // ========================================

  // DashboardLayout
  if (activeSubpage === 'dashboard') {
    const dashboardNavItems: NavigationItem[] = [
      { id: 'home', label: 'Home', icon: 'home' },
      { id: 'analytics', label: 'Analytics', icon: 'bar-chart' },
      { id: 'users', label: 'Users', icon: 'users' },
      { id: 'settings', label: 'Settings', icon: 'settings' },
    ];

    const dashboardGlobalNavItems = [
      { id: 'overview', label: 'Overview', active: true },
      { id: 'team', label: 'Team' },
      { id: 'projects', label: 'Projects' },
    ];

    return (
      <Stack gap="large">
        <Card>
          <Card.Body>
            <Stack gap="large">
              <Stack gap="small">
                <Inline gap="small" align="center">
                  <Heading level={2}>DashboardLayout</Heading>
                  <AlertBadge variant="success">Layer 6: Layout</AlertBadge>
                </Inline>
                <Text color="secondary">
                  Complete dashboard layout template with sidebar navigation, header, and content
                  area. Composes GlobalNav and VerticalNavigation patterns.
                </Text>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Full Dashboard Layout</Heading>
                <div
                  style={{
                    border: '2px solid var(--ink-border-default)',
                    borderRadius: 'var(--ink-radius-size-sm)',
                    overflow: 'hidden',
                    height: '600px',
                  }}
                >
                  <DashboardLayout
                    navigation={
                      <VerticalNavigation
                        items={dashboardNavItems}
                        activeItemId="home"
                        logo={
                          <div style={{ padding: '16px' }}>
                            <Text weight="bold">Dashboard</Text>
                          </div>
                        }
                        footer={
                          <div
                            style={{
                              padding: '16px',
                              borderTop: '1px solid var(--ink-border-default)',
                            }}
                          >
                            <Inline gap="small" align="center">
                              <Avatar name="User" size="small" />
                              <Text size="small" weight="medium">
                                User
                              </Text>
                            </Inline>
                          </div>
                        }
                      />
                    }
                    header={
                      <GlobalNav
                        logo={<Text weight="bold">Admin Panel</Text>}
                        navItems={dashboardGlobalNavItems}
                        showSearch={true}
                        showNotifications={true}
                        notificationCount={3}
                        user={{ name: 'Admin User' }}
                      />
                    }
                  >
                    <Stack gap="large" style={{ padding: '24px' }}>
                      <Stack gap="small">
                        <Heading level={2}>Dashboard Overview</Heading>
                        <Text color="secondary">Welcome to your dashboard</Text>
                      </Stack>

                      <Grid columns={3} gap="medium">
                        <Card>
                          <Card.Body>
                            <Stack gap="small">
                              <Text color="secondary" size="small">
                                Total Users
                              </Text>
                              <Heading level={1}>1,234</Heading>
                              <Badge variant="success">+12% this month</Badge>
                            </Stack>
                          </Card.Body>
                        </Card>
                        <Card>
                          <Card.Body>
                            <Stack gap="small">
                              <Text color="secondary" size="small">
                                Active Sessions
                              </Text>
                              <Heading level={1}>856</Heading>
                              <Badge variant="info">Real-time</Badge>
                            </Stack>
                          </Card.Body>
                        </Card>
                        <Card>
                          <Card.Body>
                            <Stack gap="small">
                              <Text color="secondary" size="small">
                                Revenue
                              </Text>
                              <Heading level={1}>$45.2K</Heading>
                              <Badge variant="success">+8% this week</Badge>
                            </Stack>
                          </Card.Body>
                        </Card>
                      </Grid>

                      <Card>
                        <Card.Header title="Recent Activity" />
                        <Card.Body>
                          <List>
                            <List.Item
                              startElement={<Icon name="user-plus" />}
                              meta="2 minutes ago"
                            >
                              New user registered
                            </List.Item>
                            <List.Item
                              startElement={<Icon name="file-text" />}
                              meta="15 minutes ago"
                            >
                              Report generated
                            </List.Item>
                            <List.Item startElement={<Icon name="settings" />} meta="1 hour ago">
                              Settings updated
                            </List.Item>
                          </List>
                        </Card.Body>
                      </Card>
                    </Stack>
                  </DashboardLayout>
                </div>
                <Text size="small" color="secondary">
                  Complete layout with VerticalNavigation (left), GlobalNav (top), and content area
                </Text>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Without Header</Heading>
                <div
                  style={{
                    border: '2px solid var(--ink-border-default)',
                    borderRadius: 'var(--ink-radius-size-sm)',
                    overflow: 'hidden',
                    height: '400px',
                  }}
                >
                  <DashboardLayout
                    navigation={
                      <VerticalNavigation
                        items={dashboardNavItems}
                        activeItemId="analytics"
                        logo={
                          <div style={{ padding: '16px' }}>
                            <Text weight="bold">App</Text>
                          </div>
                        }
                      />
                    }
                  >
                    <Stack gap="large" style={{ padding: '24px' }}>
                      <Heading level={2}>Analytics Dashboard</Heading>
                      <Grid columns={2} gap="medium">
                        <Card>
                          <Card.Header title="Page Views" />
                          <Card.Body>
                            <Heading level={1}>12,543</Heading>
                            <Text color="secondary" size="small">
                              Last 30 days
                            </Text>
                          </Card.Body>
                        </Card>
                        <Card>
                          <Card.Header title="Conversions" />
                          <Card.Body>
                            <Heading level={1}>342</Heading>
                            <Text color="secondary" size="small">
                              Last 30 days
                            </Text>
                          </Card.Body>
                        </Card>
                      </Grid>
                    </Stack>
                  </DashboardLayout>
                </div>
                <Text size="small" color="secondary">
                  Layout without global navigation header
                </Text>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>With Sidebar</Heading>
                <div
                  style={{
                    border: '2px solid var(--ink-border-default)',
                    borderRadius: 'var(--ink-radius-size-sm)',
                    overflow: 'hidden',
                    height: '500px',
                  }}
                >
                  <DashboardLayout
                    navigation={
                      <VerticalNavigation
                        items={dashboardNavItems}
                        activeItemId="users"
                        logo={
                          <div style={{ padding: '16px' }}>
                            <Text weight="bold">Users</Text>
                          </div>
                        }
                      />
                    }
                    sidebar={
                      <div style={{ padding: '24px', background: 'var(--ink-neutral-5)' }}>
                        <Stack gap="medium">
                          <Heading level={4}>Filters</Heading>
                          <Stack gap="small">
                            <Checkbox defaultChecked>Active Users</Checkbox>
                            <Checkbox>Inactive Users</Checkbox>
                            <Checkbox>Admins Only</Checkbox>
                          </Stack>
                          <Divider />
                          <Heading level={4}>Actions</Heading>
                          <Stack gap="small">
                            <Button size="small" fullWidth>
                              Export CSV
                            </Button>
                            <Button size="small" kind="secondary" fullWidth>
                              Print Report
                            </Button>
                          </Stack>
                        </Stack>
                      </div>
                    }
                  >
                    <Stack gap="large" style={{ padding: '24px' }}>
                      <Stack gap="small">
                        <Heading level={2}>User Management</Heading>
                        <Text color="secondary">Manage and filter users</Text>
                      </Stack>
                      <Card>
                        <Card.Header title="Users List" />
                        <Card.Body>
                          <List>
                            <List.Item startElement={<Avatar name="John Doe" size="small" />}>
                              John Doe
                            </List.Item>
                            <List.Item startElement={<Avatar name="Jane Smith" size="small" />}>
                              Jane Smith
                            </List.Item>
                            <List.Item startElement={<Avatar name="Bob Johnson" size="small" />}>
                              Bob Johnson
                            </List.Item>
                          </List>
                        </Card.Body>
                      </Card>
                    </Stack>
                  </DashboardLayout>
                </div>
                <Text size="small" color="secondary">
                  Layout with optional right sidebar for filters or actions
                </Text>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Minimal Configuration</Heading>
                <div
                  style={{
                    border: '2px solid var(--ink-border-default)',
                    borderRadius: 'var(--ink-radius-size-sm)',
                    overflow: 'hidden',
                    height: '300px',
                  }}
                >
                  <DashboardLayout>
                    <Stack gap="large" style={{ padding: '24px' }}>
                      <Heading level={2}>Simple Dashboard</Heading>
                      <Text color="secondary">
                        Navigation and header are optional. Use this for simple single-page
                        dashboards.
                      </Text>
                      <Card>
                        <Card.Body>
                          <Text>Main content area</Text>
                        </Card.Body>
                      </Card>
                    </Stack>
                  </DashboardLayout>
                </div>
                <Text size="small" color="secondary">
                  Only content area - navigation and header are optional
                </Text>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Key Features</Heading>
                <Grid columns={2} gap="small">
                  <Badge variant="neutral">Sidebar navigation slot</Badge>
                  <Badge variant="neutral">Global header slot</Badge>
                  <Badge variant="neutral">Main content area</Badge>
                  <Badge variant="neutral">Optional right sidebar</Badge>
                  <Badge variant="neutral">Responsive layout</Badge>
                  <Badge variant="neutral">Full-height design</Badge>
                  <Badge variant="neutral">Flexible composition</Badge>
                  <Badge variant="neutral">All slots optional</Badge>
                </Grid>
              </Stack>
            </Stack>
          </Card.Body>
        </Card>
      </Stack>
    );
  }

  // AuthLayout
  if (activeSubpage === 'auth') {
    return (
      <Stack gap="large">
        <Card>
          <Card.Body>
            <Stack gap="large">
              <Stack gap="small">
                <Inline gap="small" align="center">
                  <Heading level={2}>AuthLayout</Heading>
                  <AlertBadge variant="success">Layer 6: Layout</AlertBadge>
                </Inline>
                <Text color="secondary">
                  Centered layout template for authentication flows (login, signup, password reset).
                  Three variants: default, split, and minimal.
                </Text>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Default Variant</Heading>
                <div
                  style={{
                    border: '2px solid var(--ink-border-default)',
                    borderRadius: 'var(--ink-radius-size-sm)',
                    overflow: 'hidden',
                    height: '500px',
                  }}
                >
                  <AuthLayout
                    logo={
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          justifyContent: 'center',
                        }}
                      >
                        <div
                          style={{
                            width: '40px',
                            height: '40px',
                            background: 'var(--ink-brand-500)',
                            borderRadius: '8px',
                          }}
                        />
                        <Text weight="bold" size="xl">
                          Acme Corp
                        </Text>
                      </div>
                    }
                    footer={
                      <Stack gap="small" align="center">
                        <Inline gap="medium">
                          <Link href="#">Privacy Policy</Link>
                          <Link href="#">Terms of Service</Link>
                          <Link href="#">Contact</Link>
                        </Inline>
                        <Text size="small" color="secondary">
                          © 2024 Acme Corp. All rights reserved.
                        </Text>
                      </Stack>
                    }
                  >
                    <Stack gap="large">
                      <Stack gap="small" align="center">
                        <Heading level={2}>Welcome back</Heading>
                        <Text color="secondary">Sign in to your account</Text>
                      </Stack>
                      <Stack gap="medium">
                        <Stack gap="small">
                          <Text size="small" weight="medium">
                            Email
                          </Text>
                          <Input type="email" placeholder="you@example.com" fullWidth />
                        </Stack>
                        <Stack gap="small">
                          <Text size="small" weight="medium">
                            Password
                          </Text>
                          <Input type="password" placeholder="••••••••" fullWidth />
                        </Stack>
                        <Inline justify="space-between" align="center">
                          <Checkbox>Remember me</Checkbox>
                          <Link href="#">Forgot password?</Link>
                        </Inline>
                        <Button kind="brand" fullWidth>
                          Sign in
                        </Button>
                      </Stack>
                      <Divider />
                      <Text size="small" color="secondary" style={{ textAlign: 'center' }}>
                        Don't have an account? <Link href="#">Sign up</Link>
                      </Text>
                    </Stack>
                  </AuthLayout>
                </div>
                <Text size="small" color="secondary">
                  Centered form with logo on top and footer at bottom
                </Text>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Split Variant</Heading>
                <div
                  style={{
                    border: '2px solid var(--ink-border-default)',
                    borderRadius: 'var(--ink-radius-size-sm)',
                    overflow: 'hidden',
                    height: '500px',
                  }}
                >
                  <AuthLayout
                    variant="split"
                    logo={
                      <Stack gap="medium" align="center">
                        <div
                          style={{
                            width: '60px',
                            height: '60px',
                            background: 'white',
                            borderRadius: '12px',
                          }}
                        />
                        <Text weight="bold" size="xl" style={{ color: 'white' }}>
                          Platform
                        </Text>
                        <Text style={{ color: 'white', opacity: 0.9 }}>
                          Build amazing products with our design system
                        </Text>
                      </Stack>
                    }
                    footer={
                      <Text size="small" color="secondary" style={{ textAlign: 'center' }}>
                        © 2024 Platform Inc.
                      </Text>
                    }
                  >
                    <Stack gap="large">
                      <Stack gap="small">
                        <Heading level={2}>Create account</Heading>
                        <Text color="secondary">Get started in minutes</Text>
                      </Stack>
                      <Stack gap="medium">
                        <Stack gap="small">
                          <Text size="small" weight="medium">
                            Full Name
                          </Text>
                          <Input placeholder="John Doe" fullWidth />
                        </Stack>
                        <Stack gap="small">
                          <Text size="small" weight="medium">
                            Email
                          </Text>
                          <Input type="email" placeholder="you@example.com" fullWidth />
                        </Stack>
                        <Stack gap="small">
                          <Text size="small" weight="medium">
                            Password
                          </Text>
                          <Input type="password" placeholder="Create a password" fullWidth />
                        </Stack>
                        <Checkbox>
                          I agree to the <Link href="#">Terms of Service</Link> and{' '}
                          <Link href="#">Privacy Policy</Link>
                        </Checkbox>
                        <Button kind="brand" fullWidth>
                          Create account
                        </Button>
                      </Stack>
                      <Text size="small" color="secondary" style={{ textAlign: 'center' }}>
                        Already have an account? <Link href="#">Sign in</Link>
                      </Text>
                    </Stack>
                  </AuthLayout>
                </div>
                <Text size="small" color="secondary">
                  Split layout with branded left side and form on right
                </Text>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Minimal Variant</Heading>
                <div
                  style={{
                    border: '2px solid var(--ink-border-default)',
                    borderRadius: 'var(--ink-radius-size-sm)',
                    overflow: 'hidden',
                    height: '400px',
                  }}
                >
                  <AuthLayout
                    variant="minimal"
                    logo={
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          marginBottom: '24px',
                        }}
                      >
                        <div
                          style={{
                            width: '48px',
                            height: '48px',
                            background: 'var(--ink-brand-500)',
                            borderRadius: '10px',
                          }}
                        />
                      </div>
                    }
                  >
                    <Stack gap="large">
                      <Stack gap="small" align="center">
                        <Heading level={2}>Reset password</Heading>
                        <Text color="secondary" size="small" style={{ textAlign: 'center' }}>
                          Enter your email and we'll send you a reset link
                        </Text>
                      </Stack>
                      <Stack gap="medium">
                        <Stack gap="small">
                          <Text size="small" weight="medium">
                            Email
                          </Text>
                          <Input type="email" placeholder="you@example.com" fullWidth />
                        </Stack>
                        <Button kind="brand" fullWidth>
                          Send reset link
                        </Button>
                      </Stack>
                      <Text size="small" color="secondary" style={{ textAlign: 'center' }}>
                        <Link href="#">Back to sign in</Link>
                      </Text>
                    </Stack>
                  </AuthLayout>
                </div>
                <Text size="small" color="secondary">
                  Clean minimal layout for simple auth flows
                </Text>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Social Login Example</Heading>
                <div
                  style={{
                    border: '2px solid var(--ink-border-default)',
                    borderRadius: 'var(--ink-radius-size-sm)',
                    overflow: 'hidden',
                    height: '500px',
                  }}
                >
                  <AuthLayout
                    logo={
                      <Text weight="bold" size="xl">
                        Welcome
                      </Text>
                    }
                    footer={
                      <Text size="small" color="secondary">
                        Protected by reCAPTCHA
                      </Text>
                    }
                  >
                    <Stack gap="large">
                      <Stack gap="small" align="center">
                        <Heading level={2}>Sign in</Heading>
                        <Text color="secondary">Choose your preferred method</Text>
                      </Stack>
                      <Stack gap="small">
                        <Button kind="secondary" fullWidth>
                          <Inline gap="small" align="center" justify="center">
                            <Icon name="chrome" />
                            Continue with Google
                          </Inline>
                        </Button>
                        <Button kind="secondary" fullWidth>
                          <Inline gap="small" align="center" justify="center">
                            <Icon name="github" />
                            Continue with GitHub
                          </Inline>
                        </Button>
                      </Stack>
                      <Inline gap="small" align="center">
                        <Divider />
                        <Text size="small" color="secondary" style={{ whiteSpace: 'nowrap' }}>
                          or continue with email
                        </Text>
                        <Divider />
                      </Inline>
                      <Stack gap="medium">
                        <Input type="email" placeholder="Email address" fullWidth />
                        <Input type="password" placeholder="Password" fullWidth />
                        <Button kind="brand" fullWidth>
                          Sign in
                        </Button>
                      </Stack>
                    </Stack>
                  </AuthLayout>
                </div>
                <Text size="small" color="secondary">
                  Login form with social authentication options
                </Text>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Key Features</Heading>
                <Grid columns={2} gap="small">
                  <Badge variant="neutral">Three variants</Badge>
                  <Badge variant="neutral">Centered layout</Badge>
                  <Badge variant="neutral">Logo support</Badge>
                  <Badge variant="neutral">Footer support</Badge>
                  <Badge variant="neutral">Split background</Badge>
                  <Badge variant="neutral">Responsive design</Badge>
                  <Badge variant="neutral">Full-height layout</Badge>
                  <Badge variant="neutral">Flexible content</Badge>
                </Grid>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Variant Comparison</Heading>
                <Grid columns={3} gap="small">
                  <Stack gap="small">
                    <Text weight="medium">Default</Text>
                    <Text size="small" color="secondary">
                      Simple centered form with logo and footer
                    </Text>
                  </Stack>
                  <Stack gap="small">
                    <Text weight="medium">Split</Text>
                    <Text size="small" color="secondary">
                      Branded left panel with form on right
                    </Text>
                  </Stack>
                  <Stack gap="small">
                    <Text weight="medium">Minimal</Text>
                    <Text size="small" color="secondary">
                      Clean layout with no decorative elements
                    </Text>
                  </Stack>
                </Grid>
              </Stack>
            </Stack>
          </Card.Body>
        </Card>
      </Stack>
    );
  }

  return null;
};
