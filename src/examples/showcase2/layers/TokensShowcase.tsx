import React from 'react';
import { Stack, Grid, Card, Heading, Text, Divider, Button, Icon } from '@/design-system';

export interface TokensShowcaseProps {
  activeSubpage: string;
}

export const TokensShowcase: React.FC<TokensShowcaseProps> = ({ activeSubpage }) => {
  // Color Primitives
  if (activeSubpage === 'color-primitives') {
    return (
      <Stack gap="large">
        <Stack gap="medium">
          <Heading level={2}>Color Primitives</Heading>
          <Text color="secondary">The foundation color palette with semantic meanings</Text>
        </Stack>

        <Card>
          <Card.Body>
            <Stack gap="large">
              <Stack gap="medium">
                <Heading level={3}>Cobalt (Brand)</Heading>
                <Grid columns={5} gap="small">
                  {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140].map((shade) => (
                    <div key={shade} style={{ textAlign: 'center' }}>
                      <div
                        style={{
                          background: `var(--ink-cobalt-${shade})`,
                          height: '64px',
                          borderRadius: '8px',
                          border: '1px solid var(--ink-neutral-20)',
                        }}
                      />
                      <Text size="xs" color="secondary" style={{ marginTop: '4px' }}>
                        {shade}
                      </Text>
                    </div>
                  ))}
                </Grid>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Neutral (Grays)</Heading>
                <Grid columns={5} gap="small">
                  {[5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((shade) => (
                    <div key={shade} style={{ textAlign: 'center' }}>
                      <div
                        style={{
                          background: `var(--ink-neutral-${shade})`,
                          height: '64px',
                          borderRadius: '8px',
                          border: '1px solid var(--ink-neutral-20)',
                        }}
                      />
                      <Text size="xs" color="secondary" style={{ marginTop: '4px' }}>
                        {shade}
                      </Text>
                    </div>
                  ))}
                </Grid>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Green (Success)</Heading>
                <Grid columns={5} gap="small">
                  {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120].map((shade) => (
                    <div key={shade} style={{ textAlign: 'center' }}>
                      <div
                        style={{
                          background: `var(--ink-green-${shade})`,
                          height: '64px',
                          borderRadius: '8px',
                          border: '1px solid var(--ink-neutral-20)',
                        }}
                      />
                      <Text size="xs" color="secondary" style={{ marginTop: '4px' }}>
                        {shade}
                      </Text>
                    </div>
                  ))}
                </Grid>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Red (Error)</Heading>
                <Grid columns={5} gap="small">
                  {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130].map((shade) => (
                    <div key={shade} style={{ textAlign: 'center' }}>
                      <div
                        style={{
                          background: `var(--ink-red-${shade})`,
                          height: '64px',
                          borderRadius: '8px',
                          border: '1px solid var(--ink-neutral-20)',
                        }}
                      />
                      <Text size="xs" color="secondary" style={{ marginTop: '4px' }}>
                        {shade}
                      </Text>
                    </div>
                  ))}
                </Grid>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Orange (Warning)</Heading>
                <Grid columns={5} gap="small">
                  {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((shade) => (
                    <div key={shade} style={{ textAlign: 'center' }}>
                      <div
                        style={{
                          background: `var(--ink-orange-${shade})`,
                          height: '64px',
                          borderRadius: '8px',
                          border: '1px solid var(--ink-neutral-20)',
                        }}
                      />
                      <Text size="xs" color="secondary" style={{ marginTop: '4px' }}>
                        {shade}
                      </Text>
                    </div>
                  ))}
                </Grid>
              </Stack>
            </Stack>
          </Card.Body>
        </Card>
      </Stack>
    );
  }

  // Semantic Colors
  if (activeSubpage === 'semantic-colors') {
    return (
      <Stack gap="large">
        <Stack gap="medium">
          <Heading level={2}>Semantic Colors</Heading>
          <Text color="secondary">
            Design system color tokens with semantic meanings for consistent usage
          </Text>
        </Stack>

        <Card>
          <Card.Body>
            <Stack gap="large">
              <Stack gap="medium">
                <Heading level={3}>Background Colors</Heading>
                <Text color="secondary">Semantic background tokens for different contexts</Text>
                <Grid columns={3} gap="medium">
                  {[
                    {
                      token: '--ink-bg-default',
                      label: 'Default',
                      desc: 'Standard white background',
                    },
                    {
                      token: '--ink-bg-canvas-page',
                      label: 'Canvas Page',
                      desc: 'Light gray page canvas',
                    },
                    {
                      token: '--ink-bg-canvas-document',
                      label: 'Canvas Doc',
                      desc: 'Document canvas',
                    },
                    { token: '--ink-bg-accent', label: 'Accent', desc: 'Brand accent background' },
                    {
                      token: '--ink-bg-accent-subtle',
                      label: 'Accent Subtle',
                      desc: 'Subtle accent tint',
                    },
                    {
                      token: '--ink-bg-success',
                      label: 'Success',
                      desc: 'Success state background',
                    },
                    { token: '--ink-bg-error', label: 'Error', desc: 'Error state background' },
                    {
                      token: '--ink-bg-warning',
                      label: 'Warning',
                      desc: 'Warning state background',
                    },
                    {
                      token: '--ink-bg-inverse',
                      label: 'Inverse',
                      desc: 'Dark inverse background',
                    },
                  ].map(({ token, label, desc }) => (
                    <Card key={token}>
                      <Card.Body>
                        <Stack gap="small">
                          <div
                            style={{
                              background: `var(${token})`,
                              height: '64px',
                              borderRadius: '8px',
                              border: '1px solid var(--ink-neutral-20)',
                            }}
                          />
                          <Text weight="semibold">{label}</Text>
                          <Text size="xs" color="secondary">
                            {token}
                          </Text>
                          <Text size="xs">{desc}</Text>
                        </Stack>
                      </Card.Body>
                    </Card>
                  ))}
                </Grid>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Font Colors</Heading>
                <Text color="secondary">Semantic text color tokens for different contexts</Text>
                <Grid columns={3} gap="medium">
                  {[
                    { token: '--ink-font-default', label: 'Default', desc: 'Primary text color' },
                    { token: '--ink-font-neutral', label: 'Neutral', desc: 'Secondary text' },
                    { token: '--ink-font-accent', label: 'Accent', desc: 'Brand accent text' },
                    { token: '--ink-font-success', label: 'Success', desc: 'Success message text' },
                    { token: '--ink-font-error', label: 'Error', desc: 'Error message text' },
                    { token: '--ink-font-warning', label: 'Warning', desc: 'Warning message text' },
                    {
                      token: '--ink-font-disabled',
                      label: 'Disabled',
                      desc: 'Disabled state text',
                    },
                    { token: '--ink-font-inverse', label: 'Inverse', desc: 'White text on dark' },
                    {
                      token: '--ink-font-placeholder',
                      label: 'Placeholder',
                      desc: 'Input placeholder',
                    },
                  ].map(({ token, label, desc }) => (
                    <Card key={token}>
                      <Card.Body>
                        <Stack gap="small">
                          <div
                            style={{
                              padding: '16px',
                              background: 'var(--ink-neutral-10)',
                              borderRadius: '8px',
                              textAlign: 'center',
                            }}
                          >
                            <Text style={{ color: `var(${token})` }} weight="semibold">
                              Aa
                            </Text>
                          </div>
                          <Text weight="semibold">{label}</Text>
                          <Text size="xs" color="secondary">
                            {token}
                          </Text>
                          <Text size="xs">{desc}</Text>
                        </Stack>
                      </Card.Body>
                    </Card>
                  ))}
                </Grid>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Border Colors</Heading>
                <Text color="secondary">Semantic border color tokens for UI elements</Text>
                <Grid columns={3} gap="medium">
                  {[
                    { token: '--ink-border-default', label: 'Default', desc: 'Standard borders' },
                    { token: '--ink-border-accent', label: 'Accent', desc: 'Brand accent borders' },
                    { token: '--ink-border-focus', label: 'Focus', desc: 'Focused element border' },
                    {
                      token: '--ink-border-success',
                      label: 'Success',
                      desc: 'Success state border',
                    },
                    { token: '--ink-border-error', label: 'Error', desc: 'Error state border' },
                    {
                      token: '--ink-border-warning',
                      label: 'Warning',
                      desc: 'Warning state border',
                    },
                  ].map(({ token, label, desc }) => (
                    <Card key={token}>
                      <Card.Body>
                        <Stack gap="small">
                          <div
                            style={{
                              background: 'var(--ink-white-100)',
                              height: '64px',
                              borderRadius: '8px',
                              border: `2px solid var(${token})`,
                            }}
                          />
                          <Text weight="semibold">{label}</Text>
                          <Text size="xs" color="secondary">
                            {token}
                          </Text>
                          <Text size="xs">{desc}</Text>
                        </Stack>
                      </Card.Body>
                    </Card>
                  ))}
                </Grid>
              </Stack>
            </Stack>
          </Card.Body>
        </Card>
      </Stack>
    );
  }

  // Typography
  if (activeSubpage === 'typography') {
    return (
      <Stack gap="large">
        <Stack gap="medium">
          <Heading level={2}>Typography Tokens</Heading>
          <Text color="secondary">Font families, sizes, weights, and line heights</Text>
        </Stack>

        <Card>
          <Card.Body>
            <Stack gap="large">
              <Stack gap="medium">
                <Heading level={3}>Font Family</Heading>
                <div style={{ fontFamily: 'var(--ink-font-family)' }}>
                  <Text>DS Indigo (System Font Stack)</Text>
                  <Text size="small" color="secondary">
                    --ink-font-family
                  </Text>
                </div>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Font Sizes</Heading>
                <Stack gap="small">
                  <div style={{ fontSize: 'var(--ink-font-size-xs)' }}>
                    <Text>Extra Small (12px)</Text>
                    <Text size="xs" color="secondary">
                      --ink-font-size-xs
                    </Text>
                  </div>
                  <div style={{ fontSize: 'var(--ink-font-size-sm)' }}>
                    <Text>Small (14px)</Text>
                    <Text size="xs" color="secondary">
                      --ink-font-size-sm
                    </Text>
                  </div>
                  <div style={{ fontSize: 'var(--ink-font-size-md)' }}>
                    <Text>Medium (16px)</Text>
                    <Text size="xs" color="secondary">
                      --ink-font-size-md
                    </Text>
                  </div>
                  <div style={{ fontSize: 'var(--ink-font-size-lg)' }}>
                    <Text>Large (18px)</Text>
                    <Text size="xs" color="secondary">
                      --ink-font-size-lg
                    </Text>
                  </div>
                  <div style={{ fontSize: 'var(--ink-font-size-xl)' }}>
                    <Text>Extra Large (20px)</Text>
                    <Text size="xs" color="secondary">
                      --ink-font-size-xl
                    </Text>
                  </div>
                  <div style={{ fontSize: 'var(--ink-font-size-2xl)' }}>
                    <Text>2X Large (24px)</Text>
                    <Text size="xs" color="secondary">
                      --ink-font-size-2xl
                    </Text>
                  </div>
                  <div style={{ fontSize: 'var(--ink-font-size-3xl)' }}>
                    <Text>3X Large (30px)</Text>
                    <Text size="xs" color="secondary">
                      --ink-font-size-3xl
                    </Text>
                  </div>
                  <div style={{ fontSize: 'var(--ink-font-size-4xl)' }}>
                    <Text>4X Large (36px)</Text>
                    <Text size="xs" color="secondary">
                      --ink-font-size-4xl
                    </Text>
                  </div>
                </Stack>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Font Weights</Heading>
                <Stack gap="small">
                  <div style={{ fontWeight: 'var(--ink-font-weight-light)' }}>
                    <Text>Light (300)</Text>
                    <Text size="xs" color="secondary">
                      --ink-font-weight-light
                    </Text>
                  </div>
                  <div style={{ fontWeight: 'var(--ink-font-weight-regular)' }}>
                    <Text>Regular (400)</Text>
                    <Text size="xs" color="secondary">
                      --ink-font-weight-regular
                    </Text>
                  </div>
                  <div style={{ fontWeight: 'var(--ink-font-weight-medium)' }}>
                    <Text>Medium (500)</Text>
                    <Text size="xs" color="secondary">
                      --ink-font-weight-medium
                    </Text>
                  </div>
                  <div style={{ fontWeight: 'var(--ink-font-weight-semibold)' }}>
                    <Text>Semibold (600)</Text>
                    <Text size="xs" color="secondary">
                      --ink-font-weight-semibold
                    </Text>
                  </div>
                  <div style={{ fontWeight: 'var(--ink-font-weight-bold)' }}>
                    <Text>Bold (700)</Text>
                    <Text size="xs" color="secondary">
                      --ink-font-weight-bold
                    </Text>
                  </div>
                </Stack>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Line Heights</Heading>
                <Stack gap="small">
                  <div style={{ lineHeight: 'var(--ink-line-height-tight)' }}>
                    <Text>Tight (1.25)</Text>
                    <Text size="xs" color="secondary">
                      --ink-line-height-tight
                    </Text>
                  </div>
                  <div style={{ lineHeight: 'var(--ink-line-height-normal)' }}>
                    <Text>Normal (1.5)</Text>
                    <Text size="xs" color="secondary">
                      --ink-line-height-normal
                    </Text>
                  </div>
                  <div style={{ lineHeight: 'var(--ink-line-height-relaxed)' }}>
                    <Text>Relaxed (1.75)</Text>
                    <Text size="xs" color="secondary">
                      --ink-line-height-relaxed
                    </Text>
                  </div>
                </Stack>
              </Stack>
            </Stack>
          </Card.Body>
        </Card>
      </Stack>
    );
  }

  // Semantic Typography
  if (activeSubpage === 'semantic-typography') {
    return (
      <Stack gap="large">
        <Stack gap="medium">
          <Heading level={2}>Semantic Typography</Heading>
          <Text color="secondary">
            Component-specific typography styles with semantic size + line-height pairings
          </Text>
        </Stack>

        <Card>
          <Card.Body>
            <Stack gap="large">
              <Stack gap="medium">
                <Heading level={3}>Detail Text Styles</Heading>
                <Text color="secondary">Small text for captions, labels, and metadata</Text>
                <Stack gap="medium">
                  <div>
                    <div
                      style={{
                        fontSize: 'var(--ink-font-detail-xs-size)',
                        lineHeight: 'var(--ink-font-detail-xs-line-height)',
                      }}
                    >
                      <Text>Detail XS (10px / 1.4)</Text>
                    </div>
                    <Text size="xs" color="secondary">
                      --ink-font-detail-xs-size, --ink-font-detail-xs-line-height
                    </Text>
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 'var(--ink-font-detail-s-size)',
                        lineHeight: 'var(--ink-font-detail-s-line-height)',
                      }}
                    >
                      <Text>Detail S (12px / 1.5)</Text>
                    </div>
                    <Text size="xs" color="secondary">
                      --ink-font-detail-s-size, --ink-font-detail-s-line-height
                    </Text>
                  </div>
                </Stack>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Body Text Styles</Heading>
                <Text color="secondary">Standard text for paragraphs and content</Text>
                <Stack gap="medium">
                  {[
                    { size: 's', px: '14px', lh: '1.4' },
                    { size: 'm', px: '16px', lh: '1.5' },
                    { size: 'l', px: '20px', lh: '1.5' },
                    { size: 'xl', px: '24px', lh: '1.5' },
                  ].map(({ size, px, lh }) => (
                    <div key={size}>
                      <div
                        style={{
                          fontSize: `var(--ink-font-body-${size}-size)`,
                          lineHeight: `var(--ink-font-body-${size}-line-height)`,
                        }}
                      >
                        <Text>
                          Body {size.toUpperCase()} ({px} / {lh})
                        </Text>
                      </div>
                      <Text size="xs" color="secondary">
                        --ink-font-body-{size}-size, --ink-font-body-{size}-line-height
                      </Text>
                    </div>
                  ))}
                </Stack>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Heading Styles</Heading>
                <Text color="secondary">Headings for section titles and hierarchy</Text>
                <Stack gap="medium">
                  {[
                    { size: 'xxs', px: '16px', lh: '1.25' },
                    { size: 'xs', px: '20px', lh: '1.25' },
                    { size: 's', px: '24px', lh: '1.25' },
                    { size: 'm', px: '32px', lh: '1.25' },
                  ].map(({ size, px, lh }) => (
                    <div key={size}>
                      <div
                        style={{
                          fontSize: `var(--ink-font-heading-${size}-size)`,
                          lineHeight: `var(--ink-font-heading-${size}-line-height)`,
                          fontWeight: 'var(--ink-font-weight-semibold)',
                        }}
                      >
                        Heading {size.toUpperCase()} ({px} / {lh})
                      </div>
                      <Text size="xs" color="secondary">
                        --ink-font-heading-{size}-size, --ink-font-heading-{size}-line-height
                      </Text>
                    </div>
                  ))}
                </Stack>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Display Styles</Heading>
                <Text color="secondary">Large text for hero sections and emphasis</Text>
                <Stack gap="medium">
                  {[
                    { size: 'xs', px: '40px', lh: '1.25' },
                    { size: 's', px: '48px', lh: '1.25' },
                    { size: 'm', px: '56px', lh: '1.25' },
                    { size: 'l', px: '64px', lh: '1.25' },
                    { size: 'xl', px: '72px', lh: '1.25' },
                  ].map(({ size, px, lh }) => (
                    <div key={size}>
                      <div
                        style={{
                          fontSize: `var(--ink-font-display-${size}-size)`,
                          lineHeight: `var(--ink-font-display-${size}-line-height)`,
                          fontWeight: 'var(--ink-font-weight-bold)',
                        }}
                      >
                        Display {size.toUpperCase()}
                      </div>
                      <Text size="xs" color="secondary">
                        {px} / {lh} - --ink-font-display-{size}-size, --ink-font-display-{size}
                        -line-height
                      </Text>
                    </div>
                  ))}
                </Stack>
              </Stack>
            </Stack>
          </Card.Body>
        </Card>
      </Stack>
    );
  }

  // Spacing
  if (activeSubpage === 'spacing') {
    return (
      <Stack gap="large">
        <Stack gap="medium">
          <Heading level={2}>Spacing Tokens</Heading>
          <Text color="secondary">Consistent spacing scale for padding, margin, and gaps</Text>
        </Stack>

        <Card>
          <Card.Body>
            <Stack gap="medium">
              <Heading level={3}>Spacing Scale</Heading>
              <Stack gap="small">
                {[
                  { token: '--ink-spacing-0', value: '0px' },
                  { token: '--ink-spacing-50', value: '4px' },
                  { token: '--ink-spacing-100', value: '8px' },
                  { token: '--ink-spacing-150', value: '12px' },
                  { token: '--ink-spacing-200', value: '16px' },
                  { token: '--ink-spacing-250', value: '20px' },
                  { token: '--ink-spacing-300', value: '24px' },
                  { token: '--ink-spacing-400', value: '32px' },
                  { token: '--ink-spacing-500', value: '40px' },
                  { token: '--ink-spacing-600', value: '48px' },
                  { token: '--ink-spacing-700', value: '64px' },
                ].map(({ token, value }) => (
                  <div key={token} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div
                      style={{
                        width: value,
                        height: '32px',
                        background: 'var(--ink-cobalt-60)',
                        borderRadius: '4px',
                      }}
                    />
                    <Stack gap="small">
                      <Text size="small" weight="semibold">
                        {value}
                      </Text>
                      <Text size="xs" color="secondary">
                        {token}
                      </Text>
                    </Stack>
                  </div>
                ))}
              </Stack>
            </Stack>
          </Card.Body>
        </Card>
      </Stack>
    );
  }

  // Border Radius
  if (activeSubpage === 'border-radius') {
    return (
      <Stack gap="large">
        <Stack gap="medium">
          <Heading level={2}>Border & Radius Tokens</Heading>
          <Text color="secondary">Border radius values for consistent rounded corners</Text>
        </Stack>

        <Card>
          <Card.Body>
            <Stack gap="medium">
              <Heading level={3}>Border Radius Scale</Heading>
              <Grid columns={3} gap="medium">
                {[
                  { token: '--ink-radius-size-xs', value: '4px' },
                  { token: '--ink-radius-size-s', value: '8px' },
                  { token: '--ink-radius-size-m', value: '12px' },
                  { token: '--ink-radius-size-l', value: '16px' },
                  { token: '--ink-radius-size-full', value: '9999px' },
                ].map(({ token, value }) => (
                  <div key={token} style={{ textAlign: 'center' }}>
                    <div
                      style={{
                        width: '100px',
                        height: '100px',
                        background: 'var(--ink-cobalt-60)',
                        borderRadius: value,
                        margin: '0 auto 8px',
                      }}
                    />
                    <Stack gap="small">
                      <Text size="small" weight="semibold">
                        {value}
                      </Text>
                      <Text size="xs" color="secondary">
                        {token}
                      </Text>
                    </Stack>
                  </div>
                ))}
              </Grid>
            </Stack>
          </Card.Body>
        </Card>
      </Stack>
    );
  }

  // Shadows
  if (activeSubpage === 'shadows') {
    return (
      <Stack gap="large">
        <Stack gap="medium">
          <Heading level={2}>Shadow Tokens</Heading>
          <Text color="secondary">Elevation shadows for depth and hierarchy</Text>
        </Stack>

        <Card>
          <Card.Body>
            <Stack gap="medium">
              <Heading level={3}>Shadow Scale</Heading>
              <Grid columns={2} gap="medium">
                {[
                  { token: '--ink-shadow-xs', label: 'Extra Small' },
                  { token: '--ink-shadow-sm', label: 'Small' },
                  { token: '--ink-shadow-md', label: 'Medium' },
                  { token: '--ink-shadow-lg', label: 'Large' },
                  { token: '--ink-shadow-xl', label: 'Extra Large' },
                  { token: '--ink-elevation-low', label: 'Elevation Low' },
                  { token: '--ink-elevation-medium', label: 'Elevation Medium' },
                  { token: '--ink-elevation-high', label: 'Elevation High' },
                ].map(({ token, label }) => (
                  <div key={token}>
                    <div
                      style={{
                        width: '100%',
                        height: '80px',
                        background: 'var(--ink-white-100)',
                        boxShadow: `var(${token})`,
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '8px',
                      }}
                    >
                      <Text weight="semibold">{label}</Text>
                    </div>
                    <Text size="xs" color="secondary" style={{ textAlign: 'center' }}>
                      {token}
                    </Text>
                  </div>
                ))}
              </Grid>
            </Stack>
          </Card.Body>
        </Card>
      </Stack>
    );
  }

  // Component Tokens
  if (activeSubpage === 'component-tokens') {
    return (
      <Stack gap="large">
        <Stack gap="medium">
          <Heading level={2}>Component Tokens</Heading>
          <Text color="secondary">
            Semantic tokens specific to UI components like buttons, forms, and icons
          </Text>
        </Stack>

        <Card>
          <Card.Body>
            <Stack gap="large">
              <Stack gap="medium">
                <Heading level={3}>Button Tokens</Heading>
                <Text color="secondary">Component tokens for different button variants</Text>
                <Stack gap="medium">
                  {[
                    {
                      variant: 'brand',
                      label: 'Brand Button',
                      desc: 'Bright vibrant purple for brand actions',
                    },
                    {
                      variant: 'primary',
                      label: 'Primary Button',
                      desc: 'Dark purple for primary actions',
                    },
                    {
                      variant: 'secondary',
                      label: 'Secondary Button',
                      desc: 'Outlined style for secondary actions',
                    },
                    {
                      variant: 'tertiary',
                      label: 'Tertiary Button',
                      desc: 'Subtle background for tertiary actions',
                    },
                    {
                      variant: 'danger',
                      label: 'Danger Button',
                      desc: 'Red for destructive actions',
                    },
                  ].map(({ variant, label, desc }) => (
                    <Card key={variant}>
                      <Card.Body>
                        <Stack gap="small">
                          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <Button variant={variant as any}>{label}</Button>
                          </div>
                          <Text size="xs" weight="semibold">
                            {label}
                          </Text>
                          <Text size="xs" color="secondary">
                            {desc}
                          </Text>
                          <div
                            style={{
                              fontSize: '11px',
                              color: 'var(--ink-font-secondary)',
                              fontFamily: 'monospace',
                            }}
                          >
                            --ink-button-{variant}-bg
                            <br />
                            --ink-button-{variant}-bg-hover
                            <br />
                            --ink-button-{variant}-bg-active
                            <br />
                            --ink-button-{variant}-text
                          </div>
                        </Stack>
                      </Card.Body>
                    </Card>
                  ))}
                </Stack>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Form Tokens</Heading>
                <Text color="secondary">
                  Tokens for form elements like inputs, selects, and controls
                </Text>
                <Grid columns={2} gap="medium">
                  <Card>
                    <Card.Body>
                      <Stack gap="small">
                        <Text weight="semibold">Form Backgrounds</Text>
                        <Stack gap="small">
                          {[
                            { token: '--ink-form-bg-default', label: 'Default' },
                            { token: '--ink-form-bg-disabled', label: 'Disabled' },
                            { token: '--ink-form-bg-error', label: 'Error' },
                            { token: '--ink-form-bg-selected', label: 'Selected' },
                            { token: '--ink-form-bg-highlight', label: 'Highlight' },
                          ].map(({ token, label }) => (
                            <div
                              key={token}
                              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                            >
                              <div
                                style={{
                                  width: '32px',
                                  height: '32px',
                                  background: `var(${token})`,
                                  borderRadius: '4px',
                                  border: '1px solid var(--ink-neutral-20)',
                                  flexShrink: 0,
                                }}
                              />
                              <Stack gap="none">
                                <Text size="xs">{label}</Text>
                                <Text
                                  size="xs"
                                  color="secondary"
                                  style={{ fontFamily: 'monospace' }}
                                >
                                  {token}
                                </Text>
                              </Stack>
                            </div>
                          ))}
                        </Stack>
                      </Stack>
                    </Card.Body>
                  </Card>

                  <Card>
                    <Card.Body>
                      <Stack gap="small">
                        <Text weight="semibold">Form Borders</Text>
                        <Stack gap="small">
                          {[
                            { token: '--ink-form-border-default', label: 'Default' },
                            { token: '--ink-form-border-hover', label: 'Hover' },
                            { token: '--ink-form-border-active', label: 'Active' },
                            { token: '--ink-form-border-error', label: 'Error' },
                            { token: '--ink-form-border-selected', label: 'Selected' },
                          ].map(({ token, label }) => (
                            <div
                              key={token}
                              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                            >
                              <div
                                style={{
                                  width: '32px',
                                  height: '32px',
                                  background: 'var(--ink-white-100)',
                                  borderRadius: '4px',
                                  border: `2px solid var(${token})`,
                                  flexShrink: 0,
                                }}
                              />
                              <Stack gap="none">
                                <Text size="xs">{label}</Text>
                                <Text
                                  size="xs"
                                  color="secondary"
                                  style={{ fontFamily: 'monospace' }}
                                >
                                  {token}
                                </Text>
                              </Stack>
                            </div>
                          ))}
                        </Stack>
                      </Stack>
                    </Card.Body>
                  </Card>
                </Grid>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Icon Tokens</Heading>
                <Text color="secondary">
                  Color tokens for icons in different states and contexts
                </Text>
                <Grid columns={3} gap="medium">
                  {[
                    {
                      token: '--ink-icon-color-default',
                      label: 'Default',
                      desc: 'Standard icon color',
                    },
                    {
                      token: '--ink-icon-color-accent',
                      label: 'Accent',
                      desc: 'Brand accent icons',
                    },
                    {
                      token: '--ink-icon-color-success',
                      label: 'Success',
                      desc: 'Success state icons',
                    },
                    { token: '--ink-icon-color-error', label: 'Error', desc: 'Error state icons' },
                    {
                      token: '--ink-icon-color-warning',
                      label: 'Warning',
                      desc: 'Warning state icons',
                    },
                    {
                      token: '--ink-icon-color-disabled',
                      label: 'Disabled',
                      desc: 'Disabled icons',
                    },
                    {
                      token: '--ink-icon-color-emphasis',
                      label: 'Emphasis',
                      desc: 'High emphasis icons',
                    },
                    {
                      token: '--ink-icon-color-subtle',
                      label: 'Subtle',
                      desc: 'Low emphasis icons',
                    },
                    {
                      token: '--ink-icon-color-inverse',
                      label: 'Inverse',
                      desc: 'Icons on dark backgrounds',
                    },
                  ].map(({ token, label, desc }) => (
                    <Card key={token}>
                      <Card.Body>
                        <Stack gap="small">
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                              padding: '16px',
                              background: 'var(--ink-neutral-10)',
                              borderRadius: '8px',
                            }}
                          >
                            <Icon name="star" style={{ color: `var(${token})` }} />
                          </div>
                          <Text size="xs" weight="semibold">
                            {label}
                          </Text>
                          <Text size="xs">{desc}</Text>
                          <Text size="xs" color="secondary" style={{ fontFamily: 'monospace' }}>
                            {token}
                          </Text>
                        </Stack>
                      </Card.Body>
                    </Card>
                  ))}
                </Grid>
              </Stack>
            </Stack>
          </Card.Body>
        </Card>
      </Stack>
    );
  }

  // State Tokens
  if (activeSubpage === 'state-tokens') {
    return (
      <Stack gap="large">
        <Stack gap="medium">
          <Heading level={2}>State Tokens</Heading>
          <Text color="secondary">
            Tokens for interactive states, status indicators, messages, and progress bars
          </Text>
        </Stack>

        <Card>
          <Card.Body>
            <Stack gap="large">
              <Stack gap="medium">
                <Heading level={3}>Item Tokens</Heading>
                <Text color="secondary">
                  Backgrounds and borders for list items, menu items, and selections
                </Text>
                <Grid columns={2} gap="medium">
                  <Card>
                    <Card.Body>
                      <Stack gap="small">
                        <Text weight="semibold">Item States</Text>
                        <Stack gap="small">
                          {[
                            {
                              token: '--ink-item-bg-hover',
                              label: 'Hover',
                              desc: 'Item hover state',
                            },
                            {
                              token: '--ink-item-bg-active',
                              label: 'Active',
                              desc: 'Item active state',
                            },
                            {
                              token: '--ink-item-bg-selected',
                              label: 'Selected',
                              desc: 'Item selected state',
                            },
                          ].map(({ token, label, desc }) => (
                            <div key={token}>
                              <div
                                style={{
                                  padding: '12px',
                                  background: `var(${token})`,
                                  borderRadius: '4px',
                                  marginBottom: '4px',
                                }}
                              >
                                <Text size="sm">{label} state</Text>
                              </div>
                              <Text size="xs" color="secondary">
                                {desc}
                              </Text>
                              <Text size="xs" color="secondary" style={{ fontFamily: 'monospace' }}>
                                {token}
                              </Text>
                            </div>
                          ))}
                        </Stack>
                      </Stack>
                    </Card.Body>
                  </Card>

                  <Card>
                    <Card.Body>
                      <Stack gap="small">
                        <Text weight="semibold">Item Borders</Text>
                        <Stack gap="small">
                          {[
                            { token: '--ink-item-border-hover', label: 'Hover Border' },
                            { token: '--ink-item-border-active', label: 'Active Border' },
                          ].map(({ token, label }) => (
                            <div key={token}>
                              <div
                                style={{
                                  padding: '12px',
                                  background: 'var(--ink-white-100)',
                                  border: `2px solid var(${token})`,
                                  borderRadius: '4px',
                                  marginBottom: '4px',
                                }}
                              >
                                <Text size="sm">{label}</Text>
                              </div>
                              <Text size="xs" color="secondary" style={{ fontFamily: 'monospace' }}>
                                {token}
                              </Text>
                            </div>
                          ))}
                        </Stack>
                      </Stack>
                    </Card.Body>
                  </Card>
                </Grid>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Status Tokens</Heading>
                <Text color="secondary">Background colors for status indicators and badges</Text>
                <Grid columns={3} gap="medium">
                  {[
                    {
                      token: '--ink-status-bg-accent',
                      label: 'Accent',
                      desc: 'Brand accent status',
                    },
                    { token: '--ink-status-bg-success', label: 'Success', desc: 'Success status' },
                    { token: '--ink-status-bg-alert', label: 'Alert', desc: 'Alert/danger status' },
                    { token: '--ink-status-bg-warning', label: 'Warning', desc: 'Warning status' },
                    { token: '--ink-status-bg-current', label: 'Current', desc: 'Current state' },
                    { token: '--ink-status-bg-future', label: 'Future', desc: 'Future state' },
                    { token: '--ink-status-bg-past', label: 'Past', desc: 'Past state' },
                    { token: '--ink-status-bg-neutral', label: 'Neutral', desc: 'Neutral status' },
                    { token: '--ink-status-bg-subtle', label: 'Subtle', desc: 'Subtle emphasis' },
                  ].map(({ token, label, desc }) => (
                    <Card key={token}>
                      <Card.Body>
                        <Stack gap="small">
                          <div
                            style={{
                              height: '48px',
                              background: `var(${token})`,
                              borderRadius: '8px',
                              border: '1px solid var(--ink-neutral-20)',
                            }}
                          />
                          <Text size="xs" weight="semibold">
                            {label}
                          </Text>
                          <Text size="xs">{desc}</Text>
                          <Text size="xs" color="secondary" style={{ fontFamily: 'monospace' }}>
                            {token}
                          </Text>
                        </Stack>
                      </Card.Body>
                    </Card>
                  ))}
                </Grid>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Message Tokens</Heading>
                <Text color="secondary">
                  Backgrounds and borders for alerts, notifications, and messages
                </Text>
                <Grid columns={2} gap="medium">
                  {[
                    {
                      token: '--ink-message-bg-default',
                      label: 'Default',
                      desc: 'Standard message background',
                    },
                    {
                      token: '--ink-message-bg-alert',
                      label: 'Alert',
                      desc: 'Alert message (high priority)',
                    },
                    { token: '--ink-message-bg-error', label: 'Error', desc: 'Error message' },
                    {
                      token: '--ink-message-bg-success',
                      label: 'Success',
                      desc: 'Success message',
                    },
                    {
                      token: '--ink-message-bg-warning',
                      label: 'Warning',
                      desc: 'Warning message',
                    },
                    {
                      token: '--ink-message-bg-promo',
                      label: 'Promo',
                      desc: 'Promotional message',
                    },
                  ].map(({ token, label, desc }) => (
                    <Card key={token}>
                      <Card.Body>
                        <Stack gap="small">
                          <div
                            style={{
                              padding: '16px',
                              background: `var(${token})`,
                              borderRadius: '8px',
                              border: '1px solid var(--ink-neutral-20)',
                            }}
                          >
                            <Text size="sm">{label} Message</Text>
                          </div>
                          <Text size="xs">{desc}</Text>
                          <Text size="xs" color="secondary" style={{ fontFamily: 'monospace' }}>
                            {token}
                          </Text>
                        </Stack>
                      </Card.Body>
                    </Card>
                  ))}
                </Grid>
              </Stack>

              <Divider />

              <Stack gap="medium">
                <Heading level={3}>Bar Tokens</Heading>
                <Text color="secondary">
                  Colors and widths for progress bars, sliders, and track indicators
                </Text>
                <Stack gap="medium">
                  <Card>
                    <Card.Body>
                      <Stack gap="small">
                        <Text weight="semibold">Bar Fill Colors</Text>
                        <Text size="xs" color="secondary">
                          Colors for progress bar fills and indicators
                        </Text>
                        <Grid columns={2} gap="small">
                          {[
                            { token: '--ink-bar-fill-default', label: 'Default' },
                            { token: '--ink-bar-fill-emphasis', label: 'Emphasis' },
                            { token: '--ink-bar-fill-success', label: 'Success' },
                            { token: '--ink-bar-fill-error', label: 'Error' },
                            { token: '--ink-bar-fill-warning', label: 'Warning' },
                            { token: '--ink-bar-fill-subtle', label: 'Subtle' },
                          ].map(({ token, label }) => (
                            <div key={token}>
                              <div
                                style={{
                                  height: '8px',
                                  background: `var(${token})`,
                                  borderRadius: '4px',
                                  marginBottom: '4px',
                                }}
                              />
                              <Text size="xs">{label}</Text>
                              <Text size="xs" color="secondary" style={{ fontFamily: 'monospace' }}>
                                {token}
                              </Text>
                            </div>
                          ))}
                        </Grid>
                      </Stack>
                    </Card.Body>
                  </Card>

                  <Card>
                    <Card.Body>
                      <Stack gap="small">
                        <Text weight="semibold">Bar Track Colors</Text>
                        <Text size="xs" color="secondary">
                          Background track colors for progress bars
                        </Text>
                        <Stack gap="small">
                          {[
                            { token: '--ink-bar-track-default', label: 'Default Track' },
                            { token: '--ink-bar-track-emphasis', label: 'Emphasis Track' },
                            { token: '--ink-bar-track-visited', label: 'Visited Track' },
                          ].map(({ token, label }) => (
                            <div key={token}>
                              <div
                                style={{
                                  height: '8px',
                                  background: `var(${token})`,
                                  borderRadius: '4px',
                                  marginBottom: '4px',
                                }}
                              />
                              <Text size="xs">{label}</Text>
                              <Text size="xs" color="secondary" style={{ fontFamily: 'monospace' }}>
                                {token}
                              </Text>
                            </div>
                          ))}
                        </Stack>
                      </Stack>
                    </Card.Body>
                  </Card>

                  <Card>
                    <Card.Body>
                      <Stack gap="small">
                        <Text weight="semibold">Bar Widths</Text>
                        <Text size="xs" color="secondary">
                          Standardized bar and progress widths
                        </Text>
                        <Stack gap="small">
                          {[
                            { token: '--ink-bar-width-xs', value: '2px', label: 'Extra Small' },
                            { token: '--ink-bar-width-s', value: '4px', label: 'Small' },
                            { token: '--ink-bar-width-m', value: '8px', label: 'Medium' },
                          ].map(({ token, value, label }) => (
                            <div key={token}>
                              <div
                                style={{
                                  height: value,
                                  width: '100px',
                                  background: 'var(--ink-cobalt-100)',
                                  borderRadius: '2px',
                                  marginBottom: '4px',
                                }}
                              />
                              <Text size="xs">
                                {label} ({value})
                              </Text>
                              <Text size="xs" color="secondary" style={{ fontFamily: 'monospace' }}>
                                {token}
                              </Text>
                            </div>
                          ))}
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

  return null;
};
