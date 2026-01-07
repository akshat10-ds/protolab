import React from 'react';
import { Stack, Grid, Text, Divider } from '@/design-system';
import styles from '../Showcase.module.css';

/**
 * ShowcaseSection - Wrapper for consistent showcase content sections
 * Provides proper spacing and animation support
 */
interface ShowcaseSectionProps {
  children: React.ReactNode;
}

export const ShowcaseSection: React.FC<ShowcaseSectionProps> = ({ children }) => (
  <Stack gap="medium">{children}</Stack>
);

/**
 * VariantGrid - Displays component variants in a labeled grid
 * Used for showing different variants, sizes, states, etc.
 */
interface VariantGridProps {
  title: string;
  columns?: number;
  children: React.ReactNode;
  showDivider?: boolean;
}

export const VariantGrid: React.FC<VariantGridProps> = ({
  title,
  columns = 3,
  children,
  showDivider = true,
}) => (
  <>
    {showDivider && <Divider />}
    <Stack gap="small">
      <Text size="xs" weight="semibold" color="secondary" className={styles.sectionLabel}>
        {title}
      </Text>
      <Grid columns={columns} gap="medium">
        {children}
      </Grid>
    </Stack>
  </>
);

/**
 * VariantRow - Displays component variants in a horizontal row
 * Alternative to VariantGrid for inline layouts
 */
interface VariantRowProps {
  title: string;
  children: React.ReactNode;
  showDivider?: boolean;
  align?: 'start' | 'center' | 'end';
}

export const VariantRow: React.FC<VariantRowProps> = ({
  title,
  children,
  showDivider = true,
  align = 'center',
}) => (
  <>
    {showDivider && <Divider />}
    <Stack gap="small">
      <Text size="xs" weight="semibold" color="secondary" className={styles.sectionLabel}>
        {title}
      </Text>
      <Stack direction="horizontal" gap="medium" align={align}>
        {children}
      </Stack>
    </Stack>
  </>
);

/**
 * VariantItem - Individual variant with label
 * Used inside VariantGrid for labeled component examples
 */
interface VariantItemProps {
  label: string;
  children: React.ReactNode;
}

export const VariantItem: React.FC<VariantItemProps> = ({ label, children }) => (
  <Stack gap="small">
    <Text size="xs" weight="medium">
      {label}
    </Text>
    {children}
  </Stack>
);

/**
 * DemoCard - Card wrapper for component demos
 * Provides consistent styling for demo content
 */
interface DemoCardProps {
  children: React.ReactNode;
}

export const DemoCard: React.FC<DemoCardProps> = ({ children }) => (
  <div className={styles.demoCard}>
    <div style={{ padding: '20px' }}>{children}</div>
  </div>
);
