import React from 'react';
import { Stack, Grid, Inline, Container, Spacer, Badge, Chip } from '@/design-system';
import styles from '../Showcase.module.css';

export interface UtilitiesShowcaseProps {
  activeSubpage: string;
}

// Data definitions for compact rendering
const gapSizes = ['none', 'small', 'medium', 'large'] as const;
const alignOptions = ['start', 'center', 'end', 'stretch'] as const;
const columnCounts = [2, 3, 4, 6] as const;
const containerSizes = [
  { size: 'small', width: '640px' },
  { size: 'medium', width: '768px' },
  { size: 'large', width: '1024px' },
  { size: 'xlarge', width: '1280px' },
] as const;
const spacerSizes = ['small', 'medium', 'large', 'xlarge'] as const;

export const UtilitiesShowcase: React.FC<UtilitiesShowcaseProps> = ({ activeSubpage }) => {
  if (activeSubpage === 'stack') {
    return (
      <div className={styles.tokenPage}>
        {/* Direction */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Direction</h3>
          </div>
          <div className={styles.stateRow}>
            <div className={styles.stateCell}>
              <span className={styles.stateLabel}>Vertical (Default)</span>
              <Stack gap="small">
                <div className={styles.utilityBox}>Item 1</div>
                <div className={styles.utilityBoxAlt}>Item 2</div>
                <div className={styles.utilityBox}>Item 3</div>
              </Stack>
            </div>
            <div className={styles.stateCell}>
              <span className={styles.stateLabel}>Horizontal</span>
              <Stack direction="horizontal" gap="small">
                <div className={styles.utilityBox}>Item 1</div>
                <div className={styles.utilityBoxAlt}>Item 2</div>
                <div className={styles.utilityBox}>Item 3</div>
              </Stack>
            </div>
          </div>
        </div>

        {/* Gap Sizes */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Gap Sizes</h3>
          </div>
          {gapSizes.map((gap) => (
            <div className={styles.demoRow} key={gap}>
              <span className={styles.demoLabel}>{gap}</span>
              <div className={styles.demoPreviewWide}>
                <Stack direction="horizontal" gap={gap}>
                  <div className={styles.utilityBoxHighlight}>A</div>
                  <div className={styles.utilityBoxHighlight}>B</div>
                  <div className={styles.utilityBoxHighlight}>C</div>
                </Stack>
              </div>
              <span className={styles.propsCode}>gap="{gap}"</span>
            </div>
          ))}
        </div>

        {/* Alignment */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Alignment</h3>
          </div>
          <div className={styles.stateRow}>
            {alignOptions.map((align) => (
              <div className={styles.stateCell} key={align}>
                <span className={styles.stateLabel}>{align}</span>
                <div className={styles.interactiveArea}>
                  <Stack align={align} gap="small">
                    <div className={styles.utilityBox} style={{ width: '60px' }}>Short</div>
                    <div className={styles.utilityBox} style={{ width: '100px' }}>Medium</div>
                    <div className={styles.utilityBox} style={{ width: '140px' }}>Longer Item</div>
                  </Stack>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (activeSubpage === 'grid') {
    return (
      <div className={styles.tokenPage}>
        {/* Column Configurations */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Column Configurations</h3>
          </div>
          {columnCounts.map((cols) => (
            <div className={styles.demoRow} key={cols}>
              <span className={styles.demoLabel}>{cols} columns</span>
              <div style={{ flex: 1 }}>
                <Grid columns={cols} gap="small">
                  {Array.from({ length: cols }, (_, i) => (
                    <div className={styles.utilityBox} key={i} style={{ textAlign: 'center' }}>
                      {i + 1}
                    </div>
                  ))}
                </Grid>
              </div>
              <span className={styles.propsCode}>columns={cols}</span>
            </div>
          ))}
        </div>

        {/* Gap Sizes */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Gap Sizes</h3>
          </div>
          {(['small', 'medium', 'large'] as const).map((gap) => (
            <div className={styles.demoRow} key={gap}>
              <span className={styles.demoLabel}>{gap}</span>
              <div style={{ flex: 1 }}>
                <Grid columns={3} gap={gap}>
                  {[1, 2, 3].map((i) => (
                    <div className={styles.utilityBoxAlt} key={i} style={{ textAlign: 'center' }}>
                      Item {i}
                    </div>
                  ))}
                </Grid>
              </div>
              <span className={styles.propsCode}>gap="{gap}"</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (activeSubpage === 'inline') {
    const techStack = ['React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Docker', 'Kubernetes', 'AWS'];
    const languages = ['JavaScript', 'Python', 'Java', 'C++', 'Ruby', 'Go', 'Rust', 'Swift', 'Kotlin', 'PHP', 'C#', 'TypeScript', 'Scala', 'Elixir'];

    return (
      <div className={styles.tokenPage}>
        {/* Default Layout */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Default Layout</h3>
          </div>
          <div className={styles.demoGrid}>
            <Inline gap="small">
              {techStack.map((tech) => (
                <Chip key={tech} label={tech} />
              ))}
            </Inline>
          </div>
        </div>

        {/* Gap Sizes */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Gap Sizes</h3>
          </div>
          {(['small', 'medium', 'large'] as const).map((gap) => (
            <div className={styles.demoRow} key={gap}>
              <span className={styles.demoLabel}>{gap}</span>
              <div style={{ flex: 1 }}>
                <Inline gap={gap}>
                  {['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4', 'Tag 5'].map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </Inline>
              </div>
              <span className={styles.propsCode}>gap="{gap}"</span>
            </div>
          ))}
        </div>

        {/* Wrapping Behavior */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Wrapping Behavior</h3>
          </div>
          <div className={styles.demoGrid}>
            <Inline gap="small">
              {languages.map((lang) => (
                <Chip key={lang} label={lang} />
              ))}
            </Inline>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoDesc}>Resize window to see items wrap to new lines</span>
          </div>
        </div>
      </div>
    );
  }

  if (activeSubpage === 'container') {
    return (
      <div className={styles.tokenPage}>
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Container Sizes</h3>
          </div>
          {containerSizes.map(({ size, width }) => (
            <div className={styles.demoRow} key={size}>
              <span className={styles.demoLabel}>{size}</span>
              <span className={styles.demoDesc}>max-width: {width}</span>
              <span className={styles.propsCode}>size="{size}"</span>
            </div>
          ))}
        </div>

        {/* Visual Preview */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Visual Preview</h3>
          </div>
          {containerSizes.map(({ size }) => (
            <div key={size} className={styles.interactiveArea} style={{ marginBottom: '8px' }}>
              <span className={styles.stateLabel} style={{ marginBottom: '8px', display: 'block' }}>{size}</span>
              <Container size={size as any}>
                <div className={styles.utilityBox}>Content in {size} container</div>
              </Container>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (activeSubpage === 'spacer') {
    return (
      <div className={styles.tokenPage}>
        {/* Fixed Sizes */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Fixed Sizes</h3>
          </div>
          {spacerSizes.map((size) => (
            <div className={styles.demoRow} key={size}>
              <span className={styles.demoLabel}>{size}</span>
              <div className={styles.demoPreviewWide}>
                <div className={styles.interactiveArea} style={{ padding: 0 }}>
                  <div className={styles.utilityBox} style={{ borderRadius: '4px 4px 0 0' }}>Before</div>
                  <Spacer size={size} />
                  <div className={styles.utilityBoxAlt} style={{ borderRadius: '0 0 4px 4px' }}>After</div>
                </div>
              </div>
              <span className={styles.propsCode}>size="{size}"</span>
            </div>
          ))}
        </div>

        {/* Flexible Spacer */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Flexible Spacer</h3>
          </div>
          <div className={styles.interactiveArea}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div className={styles.utilityBoxHighlight}>Left</div>
              <Spacer />
              <div className={styles.utilityBoxHighlight}>Right</div>
            </div>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoDesc}>Pushes content apart in a flex container (no size prop = flex: 1)</span>
          </div>
        </div>

        {/* Horizontal Spacer */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Horizontal Spacer</h3>
          </div>
          <div className={styles.interactiveArea}>
            <div style={{ display: 'flex' }}>
              <div className={styles.utilityBox}>Item 1</div>
              <Spacer size="large" direction="horizontal" />
              <div className={styles.utilityBox}>Item 2</div>
            </div>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.propsCode}>direction="horizontal"</span>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
