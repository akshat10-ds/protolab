import React, { useState, useEffect } from 'react';
import { Stack, Heading, Text, Icon, Card } from '@/design-system';
import { SidebarNav } from './showcase2/components/SidebarNav';
import { TokensShowcase } from './showcase2/layers/TokensShowcase';
import { UtilitiesShowcase } from './showcase2/layers/UtilitiesShowcase';
import { PrimitivesShowcase } from './showcase2/layers/PrimitivesShowcase';
import { CompositesShowcase } from './showcase2/layers/CompositesShowcase';
import { PatternsShowcase } from './showcase2/layers/PatternsShowcase';
import { LayoutsShowcase } from './showcase2/layers/LayoutsShowcase';

type LayerView = 'tokens' | 'utilities' | 'primitives' | 'composites' | 'patterns' | 'layouts';

export default function ComponentShowcase2() {
  const [activeLayer, setActiveLayer] = useState<LayerView>('primitives');
  const [activeSubpage, setActiveSubpage] = useState<string>('button');

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'auto';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Scroll to top when subpage changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeSubpage]);

  const renderContent = () => {
    switch (activeLayer) {
      case 'tokens':
        return <TokensShowcase activeSubpage={activeSubpage} />;
      case 'utilities':
        return <UtilitiesShowcase activeSubpage={activeSubpage} />;
      case 'primitives':
        return <PrimitivesShowcase activeSubpage={activeSubpage} />;
      case 'composites':
        return <CompositesShowcase activeSubpage={activeSubpage} />;
      case 'patterns':
        return <PatternsShowcase activeSubpage={activeSubpage} />;
      case 'layouts':
        return <LayoutsShowcase activeSubpage={activeSubpage} />;
      default:
        return (
          <Card>
            <Card.Body>
              <Stack gap="medium" align="center" style={{ padding: '60px 20px' }}>
                <Icon name="construction" size={64} />
                <Heading level={3}>{activeSubpage}</Heading>
                <Text color="secondary" style={{ textAlign: 'center' }}>
                  This section is being built.
                </Text>
              </Stack>
            </Card.Body>
          </Card>
        );
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--ink-neutral-5)' }}>
      {/* Sidebar */}
      <SidebarNav
        activeLayer={activeLayer}
        activeSubpage={activeSubpage}
        onLayerChange={setActiveLayer}
        onSubpageChange={setActiveSubpage}
      />

      {/* Main Content */}
      <div style={{ flex: 1, padding: '40px', maxWidth: '1400px' }}>
        <Stack gap="xlarge">
          {/* Header */}
          <Stack gap="small">
            <Heading level={1}>Ink Design System</Heading>
            <Text color="secondary">
              Comprehensive component showcase organized by architectural layers
            </Text>
          </Stack>

          {/* Dynamic Content */}
          {renderContent()}
        </Stack>
      </div>
    </div>
  );
}
