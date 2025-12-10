import React from 'react';
import {
  Stack,
  Grid,
  Inline,
  Container,
  Spacer,
  Card,
  Heading,
  Text,
  Alert,
  Divider,
  Badge,
  Chip,
} from '@/design-system';

export interface UtilitiesShowcaseProps {
  activeSubpage: string;
}

export const UtilitiesShowcase: React.FC<UtilitiesShowcaseProps> = ({ activeSubpage }) => {
  if (activeSubpage === 'stack') {
    return (
      <Stack gap="large">
        <Stack gap="medium">
          <Heading level={2}>Stack</Heading>
          <Text color="secondary">Flexbox layout utility for vertical and horizontal stacking</Text>
          <Alert kind="info" title="Layer 2: Utility">
            <Text size="small">
              Pure layout component. No visual styling. Uses only CSS Flexbox.
            </Text>
          </Alert>
        </Stack>

        <Card>
          <Card.Body>
            <Stack gap="large">
              <Stack gap="medium">
                <Heading level={3}>Direction: Vertical (Default)</Heading>
                <Stack gap="small">
                  <div
                    style={{
                      padding: '12px',
                      background: 'var(--ink-cobalt-10)',
                      borderRadius: '4px',
                    }}
                  >
                    Item 1
                  </div>
                  <div
                    style={{
                      padding: '12px',
                      background: 'var(--ink-cobalt-20)',
                      borderRadius: '4px',
                    }}
                  >
                    Item 2
                  </div>
                  <div
                    style={{
                      padding: '12px',
                      background: 'var(--ink-cobalt-30)',
                      borderRadius: '4px',
                    }}
                  >
                    Item 3
                  </div>
                </Stack>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Direction: Horizontal</Heading>
                <Stack direction="horizontal" gap="small">
                  <div
                    style={{
                      padding: '12px',
                      background: 'var(--ink-cobalt-10)',
                      borderRadius: '4px',
                    }}
                  >
                    Item 1
                  </div>
                  <div
                    style={{
                      padding: '12px',
                      background: 'var(--ink-cobalt-20)',
                      borderRadius: '4px',
                    }}
                  >
                    Item 2
                  </div>
                  <div
                    style={{
                      padding: '12px',
                      background: 'var(--ink-cobalt-30)',
                      borderRadius: '4px',
                    }}
                  >
                    Item 3
                  </div>
                </Stack>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Gap Sizes</Heading>
                <Stack gap="small">
                  <Text size="small" weight="semibold">
                    XXSmall Gap
                  </Text>
                  <Stack gap="none">
                    <div
                      style={{
                        padding: '8px',
                        background: 'var(--ink-green-30)',
                        borderRadius: '4px',
                      }}
                    >
                      Item
                    </div>
                    <div
                      style={{
                        padding: '8px',
                        background: 'var(--ink-green-30)',
                        borderRadius: '4px',
                      }}
                    >
                      Item
                    </div>
                  </Stack>

                  <Text size="small" weight="semibold">
                    XSmall Gap
                  </Text>
                  <Stack gap="small">
                    <div
                      style={{
                        padding: '8px',
                        background: 'var(--ink-green-30)',
                        borderRadius: '4px',
                      }}
                    >
                      Item
                    </div>
                    <div
                      style={{
                        padding: '8px',
                        background: 'var(--ink-green-30)',
                        borderRadius: '4px',
                      }}
                    >
                      Item
                    </div>
                  </Stack>

                  <Text size="small" weight="semibold">
                    Small Gap
                  </Text>
                  <Stack gap="small">
                    <div
                      style={{
                        padding: '8px',
                        background: 'var(--ink-green-30)',
                        borderRadius: '4px',
                      }}
                    >
                      Item
                    </div>
                    <div
                      style={{
                        padding: '8px',
                        background: 'var(--ink-green-30)',
                        borderRadius: '4px',
                      }}
                    >
                      Item
                    </div>
                  </Stack>

                  <Text size="small" weight="semibold">
                    Medium Gap
                  </Text>
                  <Stack gap="medium">
                    <div
                      style={{
                        padding: '8px',
                        background: 'var(--ink-green-30)',
                        borderRadius: '4px',
                      }}
                    >
                      Item
                    </div>
                    <div
                      style={{
                        padding: '8px',
                        background: 'var(--ink-green-30)',
                        borderRadius: '4px',
                      }}
                    >
                      Item
                    </div>
                  </Stack>

                  <Text size="small" weight="semibold">
                    Large Gap
                  </Text>
                  <Stack gap="large">
                    <div
                      style={{
                        padding: '8px',
                        background: 'var(--ink-green-30)',
                        borderRadius: '4px',
                      }}
                    >
                      Item
                    </div>
                    <div
                      style={{
                        padding: '8px',
                        background: 'var(--ink-green-30)',
                        borderRadius: '4px',
                      }}
                    >
                      Item
                    </div>
                  </Stack>

                  <Text size="small" weight="semibold">
                    XLarge Gap
                  </Text>
                  <Stack gap="large">
                    <div
                      style={{
                        padding: '8px',
                        background: 'var(--ink-green-30)',
                        borderRadius: '4px',
                      }}
                    >
                      Item
                    </div>
                    <div
                      style={{
                        padding: '8px',
                        background: 'var(--ink-green-30)',
                        borderRadius: '4px',
                      }}
                    >
                      Item
                    </div>
                  </Stack>
                </Stack>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Alignment Options</Heading>
                <Grid columns={2} gap="medium">
                  <Stack gap="small">
                    <Text size="small" weight="semibold">
                      Align: Start (Default)
                    </Text>
                    <div
                      style={{
                        background: 'var(--ink-neutral-10)',
                        padding: '12px',
                        borderRadius: '4px',
                      }}
                    >
                      <Stack align="start" gap="small">
                        <div
                          style={{
                            padding: '8px',
                            background: 'var(--ink-orange-40)',
                            borderRadius: '4px',
                            width: '80px',
                          }}
                        >
                          Short
                        </div>
                        <div
                          style={{
                            padding: '8px',
                            background: 'var(--ink-orange-40)',
                            borderRadius: '4px',
                            width: '120px',
                          }}
                        >
                          Medium
                        </div>
                        <div
                          style={{
                            padding: '8px',
                            background: 'var(--ink-orange-40)',
                            borderRadius: '4px',
                            width: '160px',
                          }}
                        >
                          Longer Item
                        </div>
                      </Stack>
                    </div>
                  </Stack>

                  <Stack gap="small">
                    <Text size="small" weight="semibold">
                      Align: Center
                    </Text>
                    <div
                      style={{
                        background: 'var(--ink-neutral-10)',
                        padding: '12px',
                        borderRadius: '4px',
                      }}
                    >
                      <Stack align="center" gap="small">
                        <div
                          style={{
                            padding: '8px',
                            background: 'var(--ink-orange-40)',
                            borderRadius: '4px',
                            width: '80px',
                          }}
                        >
                          Short
                        </div>
                        <div
                          style={{
                            padding: '8px',
                            background: 'var(--ink-orange-40)',
                            borderRadius: '4px',
                            width: '120px',
                          }}
                        >
                          Medium
                        </div>
                        <div
                          style={{
                            padding: '8px',
                            background: 'var(--ink-orange-40)',
                            borderRadius: '4px',
                            width: '160px',
                          }}
                        >
                          Longer Item
                        </div>
                      </Stack>
                    </div>
                  </Stack>

                  <Stack gap="small">
                    <Text size="small" weight="semibold">
                      Align: End
                    </Text>
                    <div
                      style={{
                        background: 'var(--ink-neutral-10)',
                        padding: '12px',
                        borderRadius: '4px',
                      }}
                    >
                      <Stack align="end" gap="small">
                        <div
                          style={{
                            padding: '8px',
                            background: 'var(--ink-orange-40)',
                            borderRadius: '4px',
                            width: '80px',
                          }}
                        >
                          Short
                        </div>
                        <div
                          style={{
                            padding: '8px',
                            background: 'var(--ink-orange-40)',
                            borderRadius: '4px',
                            width: '120px',
                          }}
                        >
                          Medium
                        </div>
                        <div
                          style={{
                            padding: '8px',
                            background: 'var(--ink-orange-40)',
                            borderRadius: '4px',
                            width: '160px',
                          }}
                        >
                          Longer Item
                        </div>
                      </Stack>
                    </div>
                  </Stack>

                  <Stack gap="small">
                    <Text size="small" weight="semibold">
                      Align: Stretch
                    </Text>
                    <div
                      style={{
                        background: 'var(--ink-neutral-10)',
                        padding: '12px',
                        borderRadius: '4px',
                      }}
                    >
                      <Stack align="stretch" gap="small">
                        <div
                          style={{
                            padding: '8px',
                            background: 'var(--ink-orange-40)',
                            borderRadius: '4px',
                          }}
                        >
                          Short
                        </div>
                        <div
                          style={{
                            padding: '8px',
                            background: 'var(--ink-orange-40)',
                            borderRadius: '4px',
                          }}
                        >
                          Medium
                        </div>
                        <div
                          style={{
                            padding: '8px',
                            background: 'var(--ink-orange-40)',
                            borderRadius: '4px',
                          }}
                        >
                          Longer Item
                        </div>
                      </Stack>
                    </div>
                  </Stack>
                </Grid>
              </Stack>
            </Stack>
          </Card.Body>
        </Card>
      </Stack>
    );
  }

  if (activeSubpage === 'grid') {
    return (
      <Stack gap="large">
        <Stack gap="medium">
          <Heading level={2}>Grid</Heading>
          <Text color="secondary">CSS Grid layout utility for multi-column responsive layouts</Text>
          <Alert kind="info" title="Layer 2: Utility">
            <Text size="small">Pure layout component. Uses CSS Grid for responsive columns.</Text>
          </Alert>
        </Stack>

        <Card>
          <Card.Body>
            <Stack gap="large">
              <Stack gap="medium">
                <Heading level={3}>Column Configurations</Heading>
                <Stack gap="large">
                  <div>
                    <Text
                      size="small"
                      weight="semibold"
                      style={{ marginBottom: '8px', display: 'block' }}
                    >
                      2 Columns
                    </Text>
                    <Grid columns={2} gap="small">
                      <div
                        style={{
                          padding: '16px',
                          background: 'var(--ink-cobalt-20)',
                          borderRadius: '4px',
                          textAlign: 'center',
                        }}
                      >
                        Col 1
                      </div>
                      <div
                        style={{
                          padding: '16px',
                          background: 'var(--ink-cobalt-20)',
                          borderRadius: '4px',
                          textAlign: 'center',
                        }}
                      >
                        Col 2
                      </div>
                    </Grid>
                  </div>

                  <div>
                    <Text
                      size="small"
                      weight="semibold"
                      style={{ marginBottom: '8px', display: 'block' }}
                    >
                      3 Columns
                    </Text>
                    <Grid columns={3} gap="small">
                      <div
                        style={{
                          padding: '16px',
                          background: 'var(--ink-green-20)',
                          borderRadius: '4px',
                          textAlign: 'center',
                        }}
                      >
                        Col 1
                      </div>
                      <div
                        style={{
                          padding: '16px',
                          background: 'var(--ink-green-20)',
                          borderRadius: '4px',
                          textAlign: 'center',
                        }}
                      >
                        Col 2
                      </div>
                      <div
                        style={{
                          padding: '16px',
                          background: 'var(--ink-green-20)',
                          borderRadius: '4px',
                          textAlign: 'center',
                        }}
                      >
                        Col 3
                      </div>
                    </Grid>
                  </div>

                  <div>
                    <Text
                      size="small"
                      weight="semibold"
                      style={{ marginBottom: '8px', display: 'block' }}
                    >
                      4 Columns
                    </Text>
                    <Grid columns={4} gap="small">
                      <div
                        style={{
                          padding: '16px',
                          background: 'var(--ink-orange-20)',
                          borderRadius: '4px',
                          textAlign: 'center',
                        }}
                      >
                        Col 1
                      </div>
                      <div
                        style={{
                          padding: '16px',
                          background: 'var(--ink-orange-20)',
                          borderRadius: '4px',
                          textAlign: 'center',
                        }}
                      >
                        Col 2
                      </div>
                      <div
                        style={{
                          padding: '16px',
                          background: 'var(--ink-orange-20)',
                          borderRadius: '4px',
                          textAlign: 'center',
                        }}
                      >
                        Col 3
                      </div>
                      <div
                        style={{
                          padding: '16px',
                          background: 'var(--ink-orange-20)',
                          borderRadius: '4px',
                          textAlign: 'center',
                        }}
                      >
                        Col 4
                      </div>
                    </Grid>
                  </div>

                  <div>
                    <Text
                      size="small"
                      weight="semibold"
                      style={{ marginBottom: '8px', display: 'block' }}
                    >
                      6 Columns
                    </Text>
                    <Grid columns={6} gap="small">
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div
                          key={i}
                          style={{
                            padding: '16px',
                            background: 'var(--ink-purple-20)',
                            borderRadius: '4px',
                            textAlign: 'center',
                          }}
                        >
                          {i}
                        </div>
                      ))}
                    </Grid>
                  </div>
                </Stack>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Gap Sizes</Heading>
                <Stack gap="large">
                  <div>
                    <Text
                      size="small"
                      weight="semibold"
                      style={{ marginBottom: '8px', display: 'block' }}
                    >
                      Small Gap
                    </Text>
                    <Grid columns={3} gap="small">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          style={{
                            padding: '12px',
                            background: 'var(--ink-cobalt-30)',
                            borderRadius: '4px',
                            textAlign: 'center',
                          }}
                        >
                          Item {i}
                        </div>
                      ))}
                    </Grid>
                  </div>

                  <div>
                    <Text
                      size="small"
                      weight="semibold"
                      style={{ marginBottom: '8px', display: 'block' }}
                    >
                      Medium Gap
                    </Text>
                    <Grid columns={3} gap="medium">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          style={{
                            padding: '12px',
                            background: 'var(--ink-cobalt-30)',
                            borderRadius: '4px',
                            textAlign: 'center',
                          }}
                        >
                          Item {i}
                        </div>
                      ))}
                    </Grid>
                  </div>

                  <div>
                    <Text
                      size="small"
                      weight="semibold"
                      style={{ marginBottom: '8px', display: 'block' }}
                    >
                      Large Gap
                    </Text>
                    <Grid columns={3} gap="large">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          style={{
                            padding: '12px',
                            background: 'var(--ink-cobalt-30)',
                            borderRadius: '4px',
                            textAlign: 'center',
                          }}
                        >
                          Item {i}
                        </div>
                      ))}
                    </Grid>
                  </div>
                </Stack>
              </Stack>
            </Stack>
          </Card.Body>
        </Card>
      </Stack>
    );
  }

  if (activeSubpage === 'inline') {
    return (
      <Stack gap="large">
        <Stack gap="medium">
          <Heading level={2}>Inline</Heading>
          <Text color="secondary">
            Horizontal layout utility that wraps items to multiple lines
          </Text>
          <Alert kind="info" title="Layer 2: Utility">
            <Text size="small">
              Similar to Stack horizontal, but allows wrapping for inline content like tags or
              chips.
            </Text>
          </Alert>
        </Stack>

        <Card>
          <Card.Body>
            <Stack gap="large">
              <Stack gap="medium">
                <Heading level={3}>Default Inline Layout</Heading>
                <Inline gap="small">
                  {[
                    'React',
                    'TypeScript',
                    'Node.js',
                    'Express',
                    'PostgreSQL',
                    'Docker',
                    'Kubernetes',
                    'AWS',
                  ].map((tech) => (
                    <Chip key={tech} label={tech} />
                  ))}
                </Inline>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Gap Sizes</Heading>
                <Stack gap="large">
                  <div>
                    <Text
                      size="small"
                      weight="semibold"
                      style={{ marginBottom: '8px', display: 'block' }}
                    >
                      XSmall Gap
                    </Text>
                    <Inline gap="small">
                      {['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4', 'Tag 5'].map((tag) => (
                        <Badge key={tag}>{tag}</Badge>
                      ))}
                    </Inline>
                  </div>

                  <div>
                    <Text
                      size="small"
                      weight="semibold"
                      style={{ marginBottom: '8px', display: 'block' }}
                    >
                      Small Gap
                    </Text>
                    <Inline gap="small">
                      {['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4', 'Tag 5'].map((tag) => (
                        <Badge key={tag}>{tag}</Badge>
                      ))}
                    </Inline>
                  </div>

                  <div>
                    <Text
                      size="small"
                      weight="semibold"
                      style={{ marginBottom: '8px', display: 'block' }}
                    >
                      Medium Gap
                    </Text>
                    <Inline gap="medium">
                      {['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4', 'Tag 5'].map((tag) => (
                        <Badge key={tag}>{tag}</Badge>
                      ))}
                    </Inline>
                  </div>

                  <div>
                    <Text
                      size="small"
                      weight="semibold"
                      style={{ marginBottom: '8px', display: 'block' }}
                    >
                      Large Gap
                    </Text>
                    <Inline gap="large">
                      {['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4', 'Tag 5'].map((tag) => (
                        <Badge key={tag}>{tag}</Badge>
                      ))}
                    </Inline>
                  </div>
                </Stack>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Wrapping Behavior</Heading>
                <Text size="small" color="secondary">
                  Resize window to see items wrap to new lines
                </Text>
                <Inline gap="small">
                  {[
                    'JavaScript',
                    'Python',
                    'Java',
                    'C++',
                    'Ruby',
                    'Go',
                    'Rust',
                    'Swift',
                    'Kotlin',
                    'PHP',
                    'C#',
                    'TypeScript',
                    'Scala',
                    'Elixir',
                    'Haskell',
                  ].map((lang) => (
                    <Chip key={lang} label={lang} />
                  ))}
                </Inline>
              </Stack>
            </Stack>
          </Card.Body>
        </Card>
      </Stack>
    );
  }

  if (activeSubpage === 'container') {
    return (
      <Stack gap="large">
        <Stack gap="medium">
          <Heading level={2}>Container</Heading>
          <Text color="secondary">Max-width wrapper for centered content layouts</Text>
          <Alert kind="info" title="Layer 2: Utility">
            <Text size="small">
              Centers content with a maximum width. Responsive and adds horizontal padding.
            </Text>
          </Alert>
        </Stack>

        <Card>
          <Card.Body>
            <Stack gap="large">
              <Stack gap="medium">
                <Heading level={3}>Size: Small (640px)</Heading>
                <div style={{ background: 'var(--ink-neutral-10)', padding: '16px' }}>
                  <Container size="small">
                    <div
                      style={{
                        background: 'var(--ink-cobalt-20)',
                        padding: '16px',
                        borderRadius: '4px',
                      }}
                    >
                      <Text>Content in small container</Text>
                    </div>
                  </Container>
                </div>
              </Stack>

              <Stack gap="medium">
                <Heading level={3}>Size: Medium (768px)</Heading>
                <div style={{ background: 'var(--ink-neutral-10)', padding: '16px' }}>
                  <Container size="medium">
                    <div
                      style={{
                        background: 'var(--ink-green-20)',
                        padding: '16px',
                        borderRadius: '4px',
                      }}
                    >
                      <Text>Content in medium container</Text>
                    </div>
                  </Container>
                </div>
              </Stack>

              <Stack gap="medium">
                <Heading level={3}>Size: Large (1024px)</Heading>
                <div style={{ background: 'var(--ink-neutral-10)', padding: '16px' }}>
                  <Container size="large">
                    <div
                      style={{
                        background: 'var(--ink-orange-20)',
                        padding: '16px',
                        borderRadius: '4px',
                      }}
                    >
                      <Text>Content in large container</Text>
                    </div>
                  </Container>
                </div>
              </Stack>

              <Stack gap="medium">
                <Heading level={3}>Size: XLarge (1280px)</Heading>
                <div style={{ background: 'var(--ink-neutral-10)', padding: '16px' }}>
                  <Container size="xlarge">
                    <div
                      style={{
                        background: 'var(--ink-purple-20)',
                        padding: '16px',
                        borderRadius: '4px',
                      }}
                    >
                      <Text>Content in xlarge container</Text>
                    </div>
                  </Container>
                </div>
              </Stack>
            </Stack>
          </Card.Body>
        </Card>
      </Stack>
    );
  }

  if (activeSubpage === 'spacer') {
    return (
      <Stack gap="large">
        <Stack gap="medium">
          <Heading level={2}>Spacer</Heading>
          <Text color="secondary">
            Flexible or fixed spacing utility for precise layout control
          </Text>
          <Alert kind="info" title="Layer 2: Utility">
            <Text size="small">
              Creates vertical or horizontal space. Can be fixed size or flexible to fill available
              space.
            </Text>
          </Alert>
        </Stack>

        <Card>
          <Card.Body>
            <Stack gap="large">
              <Stack gap="medium">
                <Heading level={3}>Fixed Sizes</Heading>
                <Stack gap="large">
                  {['small', 'medium', 'large', 'xlarge'].map((size) => (
                    <div key={size}>
                      <Text
                        size="small"
                        weight="semibold"
                        style={{ marginBottom: '8px', display: 'block' }}
                      >
                        Size: {size}
                      </Text>
                      <div style={{ background: 'var(--ink-neutral-10)', borderRadius: '4px' }}>
                        <div
                          style={{
                            padding: '8px',
                            background: 'var(--ink-cobalt-30)',
                            borderRadius: '4px 4px 0 0',
                          }}
                        >
                          Before
                        </div>
                        <Spacer size={size as any} />
                        <div
                          style={{
                            padding: '8px',
                            background: 'var(--ink-cobalt-30)',
                            borderRadius: '0 0 4px 4px',
                          }}
                        >
                          After
                        </div>
                      </div>
                    </div>
                  ))}
                </Stack>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Flexible Spacer</Heading>
                <Text size="small" color="secondary">
                  Pushes content apart in a flex container
                </Text>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    background: 'var(--ink-neutral-10)',
                    padding: '16px',
                    borderRadius: '4px',
                  }}
                >
                  <div
                    style={{
                      padding: '12px',
                      background: 'var(--ink-green-30)',
                      borderRadius: '4px',
                    }}
                  >
                    Left
                  </div>
                  <Spacer />
                  <div
                    style={{
                      padding: '12px',
                      background: 'var(--ink-green-30)',
                      borderRadius: '4px',
                    }}
                  >
                    Right
                  </div>
                </div>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Horizontal Spacer</Heading>
                <div
                  style={{
                    display: 'flex',
                    background: 'var(--ink-neutral-10)',
                    padding: '16px',
                    borderRadius: '4px',
                  }}
                >
                  <div
                    style={{
                      padding: '12px',
                      background: 'var(--ink-orange-30)',
                      borderRadius: '4px',
                    }}
                  >
                    Item 1
                  </div>
                  <Spacer size="large" direction="horizontal" />
                  <div
                    style={{
                      padding: '12px',
                      background: 'var(--ink-orange-30)',
                      borderRadius: '4px',
                    }}
                  >
                    Item 2
                  </div>
                </div>
              </Stack>
            </Stack>
          </Card.Body>
        </Card>
      </Stack>
    );
  }

  return null;
};
