import React from 'react';
import { FormPrimitives } from './primitives/FormPrimitives';
import { DataPrimitives } from './primitives/DataPrimitives';
import { ContainerPrimitives } from './primitives/ContainerPrimitives';
import { TypographyPrimitives } from './primitives/TypographyPrimitives';

// Component groupings
const formPrimitives = [
  'button',
  'iconbutton',
  'input',
  'select',
  'checkbox',
  'radio',
  'switch',
  'textarea',
];
const dataPrimitives = [
  'slider',
  'badge',
  'avatar',
  'chip',
  'alert-badge',
  'status-light',
  'spinner',
  'progressbar',
];
const containerPrimitives = ['divider', 'card', 'skeleton', 'callout', 'banner', 'tooltip'];
const typographyPrimitives = ['link', 'stepper', 'typography', 'icon'];

export interface PrimitivesShowcaseProps {
  activeSubpage: string;
  selectedComponentId?: string | null;
  onComponentSelect?: (componentId: string, props: Record<string, unknown>) => void;
}

export const PrimitivesShowcase: React.FC<PrimitivesShowcaseProps> = ({
  activeSubpage,
  selectedComponentId,
  onComponentSelect,
}) => {
  // Route to appropriate sub-component based on activeSubpage
  if (formPrimitives.includes(activeSubpage)) {
    return (
      <FormPrimitives
        activeSubpage={activeSubpage}
        selectedComponentId={selectedComponentId}
        onComponentSelect={onComponentSelect}
      />
    );
  }

  if (dataPrimitives.includes(activeSubpage)) {
    return (
      <DataPrimitives
        activeSubpage={activeSubpage}
        selectedComponentId={selectedComponentId}
        onComponentSelect={onComponentSelect}
      />
    );
  }

  if (containerPrimitives.includes(activeSubpage)) {
    return (
      <ContainerPrimitives
        activeSubpage={activeSubpage}
        selectedComponentId={selectedComponentId}
        onComponentSelect={onComponentSelect}
      />
    );
  }

  if (typographyPrimitives.includes(activeSubpage)) {
    return (
      <TypographyPrimitives
        activeSubpage={activeSubpage}
        selectedComponentId={selectedComponentId}
        onComponentSelect={onComponentSelect}
      />
    );
  }

  return null;
};
