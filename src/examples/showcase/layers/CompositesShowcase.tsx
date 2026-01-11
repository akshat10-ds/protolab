import React from 'react';
import { InputComposites } from './composites/InputComposites';
import { NavigationComposites } from './composites/NavigationComposites';
import { OverlayComposites } from './composites/OverlayComposites';

// Component groupings
const inputComposites = [
  'searchinput',
  'fileinput',
  'combobox',
  'datepicker',
  'fileupload',
  'filtertag',
];
const navigationComposites = ['breadcrumb', 'pagination', 'tabs', 'accordion', 'stepper'];
const overlayComposites = [
  'combobutton',
  'modal',
  'dropdown',
  'callout',
  'alert',
  'banner',
  'ai-badge',
  'chip',
  'table',
  'list',
];

export interface CompositesShowcaseProps {
  activeSubpage: string;
}

export const CompositesShowcase: React.FC<CompositesShowcaseProps> = ({ activeSubpage }) => {
  // Route to appropriate sub-component based on activeSubpage
  if (inputComposites.includes(activeSubpage)) {
    return <InputComposites activeSubpage={activeSubpage} />;
  }

  if (navigationComposites.includes(activeSubpage)) {
    return <NavigationComposites activeSubpage={activeSubpage} />;
  }

  if (overlayComposites.includes(activeSubpage)) {
    return <OverlayComposites activeSubpage={activeSubpage} />;
  }

  return null;
};
