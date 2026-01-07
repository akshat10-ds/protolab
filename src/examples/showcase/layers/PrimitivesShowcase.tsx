import React from 'react';
import { FormPrimitives } from './primitives/FormPrimitives';
import { DataPrimitives } from './primitives/DataPrimitives';
import { ContainerPrimitives } from './primitives/ContainerPrimitives';
import { TypographyPrimitives } from './primitives/TypographyPrimitives';

// Component groupings
const formPrimitives = ['button', 'iconbutton', 'input', 'select', 'checkbox', 'radio', 'switch', 'textarea'];
const dataPrimitives = ['slider', 'badge', 'avatar', 'chip', 'alert-badge', 'status-light', 'spinner', 'progressbar'];
const containerPrimitives = ['divider', 'card', 'skeleton', 'callout', 'banner', 'tooltip'];
const typographyPrimitives = ['link', 'stepper', 'typography', 'icon'];

export interface PrimitivesShowcaseProps {
  activeSubpage: string;
}

export const PrimitivesShowcase: React.FC<PrimitivesShowcaseProps> = ({ activeSubpage }) => {
  // Route to appropriate sub-component based on activeSubpage
  if (formPrimitives.includes(activeSubpage)) {
    return <FormPrimitives activeSubpage={activeSubpage} />;
  }

  if (dataPrimitives.includes(activeSubpage)) {
    return <DataPrimitives activeSubpage={activeSubpage} />;
  }

  if (containerPrimitives.includes(activeSubpage)) {
    return <ContainerPrimitives activeSubpage={activeSubpage} />;
  }

  if (typographyPrimitives.includes(activeSubpage)) {
    return <TypographyPrimitives activeSubpage={activeSubpage} />;
  }

  return null;
};
