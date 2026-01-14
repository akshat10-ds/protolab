/**
 * Learnings Review Page
 *
 * Exhaustive visual interface for reviewing and approving ALL layout rules
 * extracted from DocuSign production.
 */

import React, { useState } from 'react';
import {
  Stack,
  Card,
  Button,
  Text,
  Heading,
  Badge,
  Banner,
} from '@/design-system';
import styles from './LearningsReview.module.css';

// Learning item structure
interface LearningItem {
  id: string;
  title: string;
  category: 'layout-rule' | 'page-template' | 'pattern' | 'layout';
  description: string;
  details: string[];
  source: string;
  status: 'pending' | 'approved' | 'rejected';
  implementationStatus: 'implemented' | 'partial' | 'missing';
  implementationNotes?: string;
}

// ALL learnings extracted from DocuSign production
const INITIAL_LEARNINGS: LearningItem[] = [
  // =============================================
  // LAYOUT RULES (21 sections from LAYOUT_RULES.md)
  // =============================================
  {
    id: 'lr-1-global-shell',
    title: '1. Global Shell',
    category: 'layout-rule',
    description: 'GlobalNav, LocalNav, and Content Area dimensions',
    details: [
      'GlobalNav: Height 64px, Padding 0px 16px, Position fixed top',
      'LocalNav: Width 280px (expanded), Position fixed left below GlobalNav',
      'Content Area: Left offset 280px, Top offset 64px, No max-width',
      'GlobalNav has 1px border-bottom rgba(19, 0, 50, 0.1)',
    ],
    source: 'learnings/LAYOUT_RULES.md (Section 1)',
    status: 'pending',
    implementationStatus: 'implemented',
    implementationNotes: 'DocuSignShell, GlobalNav, LocalNav exist at L5-L6',
  },
  {
    id: 'lr-2-spacing-system',
    title: '2. Spacing System',
    category: 'layout-rule',
    description: '4px base unit with 8px scale',
    details: [
      'Base unit: 4px',
      'Scale: xs=4px, sm=8px, md=12px, lg=16px, xl=20px, 2xl=24px',
      'Button padding: 4px 12px',
      'Nav item padding: 11px 15px 11px 23px',
      'Table cell padding: 4px 16px',
      'Tab padding: 12px 20px',
      'Card border-radius: 4px (universal)',
    ],
    source: 'learnings/LAYOUT_RULES.md (Section 2)',
    status: 'pending',
    implementationStatus: 'implemented',
    implementationNotes: '--ink-spacing-* tokens match exactly (50=4px, 100=8px, etc.)',
  },
  {
    id: 'lr-3-typography',
    title: '3. Typography Scale',
    category: 'layout-rule',
    description: 'Heading and body text sizes, weights, line heights',
    details: [
      'H1: 32px, 400 weight, 40px line-height (page titles)',
      'H2: 24px, 400 weight, 30px line-height (section headers)',
      'H3: 16px, 500 weight, 20px line-height (card titles)',
      'Body Large: 16px, 400-500 weight (buttons, inputs)',
      'Body: 14px, 400 weight (table cells, nav items)',
      'Caption: 12px, 500-600 weight (table headers, badges)',
      'Font weights: 400 normal, 500 medium, 600 semi-bold, 700 bold',
    ],
    source: 'learnings/LAYOUT_RULES.md (Section 3)',
    status: 'pending',
    implementationStatus: 'implemented',
    implementationNotes: '--ink-font-heading-m=32px, --ink-font-heading-s=24px, --ink-font-body-s=14px all match',
  },
  {
    id: 'lr-4-colors',
    title: '4. Color Semantic Tokens',
    category: 'layout-rule',
    description: 'Text, background, and border color tokens',
    details: [
      'text-primary: rgba(19, 0, 50, 0.9)',
      'text-secondary: rgba(19, 0, 50, 0.7)',
      'text-link: rgb(36, 99, 209)',
      'bg-primary: rgb(38, 5, 89) (brand purple)',
      'bg-ghost: rgba(19, 0, 50, 0.05)',
      'border-subtle: rgba(19, 0, 50, 0.1)',
      'border-medium: rgba(19, 0, 50, 0.5)',
    ],
    source: 'learnings/LAYOUT_RULES.md (Section 4)',
    status: 'pending',
    implementationStatus: 'partial',
    implementationNotes: 'Most colors match. Secondary text is 0.65 in system vs 0.7 in learning',
  },
  {
    id: 'lr-5-component-dimensions',
    title: '5. Component Dimensions',
    category: 'layout-rule',
    description: 'Standard sizes for buttons, inputs, navigation, tables',
    details: [
      'Button height: 40px (standard), 32px (compact/filter)',
      'Input/Search height: 30-32px, font 16px',
      'GlobalNav item height: 64px',
      'LocalNav item height: 48px',
      'Table header: 49px, body row: 68px',
      'Avatar: 40px × 40px',
      'Toggle switch: 44px × 32px',
    ],
    source: 'learnings/LAYOUT_RULES.md (Section 5)',
    status: 'pending',
    implementationStatus: 'partial',
    implementationNotes: 'Components exist but exact dimensions need verification',
  },
  {
    id: 'lr-6-button-variants',
    title: '6. Button Variants',
    category: 'layout-rule',
    description: 'Primary, Secondary, Outline, Filter button styles',
    details: [
      'Primary: bg rgb(38, 5, 89), white text, no border',
      'Secondary/Ghost: bg rgba(19, 0, 50, 0.05), dark text',
      'Outline: transparent bg, 1px border rgba(19, 0, 50, 0.5)',
      'Filter/Compact: 32px height, padding 0px 8px 0px 12px',
      'All buttons: border-radius 4px, font 16px/500',
    ],
    source: 'learnings/LAYOUT_RULES.md (Section 6)',
    status: 'pending',
    implementationStatus: 'implemented',
    implementationNotes: 'Button has brand, primary, secondary, tertiary, danger variants with matching colors',
  },
  {
    id: 'lr-7-status-indicators',
    title: '7. Status Indicators',
    category: 'layout-rule',
    description: 'Status text colors and badge patterns',
    details: [
      'Active: rgb(0, 95, 67) green',
      'Inactive/Expired/Voided: rgba(19, 0, 50, 0.7) muted',
      'Badge: 12px font, 500 weight, with dot indicator',
    ],
    source: 'learnings/LAYOUT_RULES.md (Section 7)',
    status: 'pending',
    implementationStatus: 'implemented',
    implementationNotes: '--ink-status-* and --ink-font-success/warning/error tokens exist',
  },
  {
    id: 'lr-8-visual-hierarchy',
    title: '8. Visual Hierarchy Rules',
    category: 'layout-rule',
    description: 'When to use cards, dividers, section headers',
    details: [
      'Cards: Dashboard widgets, reports, settings sections (NOT tables)',
      'Card styling: 1px border subtle, 4px radius, 16-24px padding',
      'Section headers: 12px, 600 weight, uppercase, muted color',
      'Dividers: 1px border-bottom subtle between major sections',
    ],
    source: 'learnings/LAYOUT_RULES.md (Section 8)',
    status: 'pending',
    implementationStatus: 'implemented',
    implementationNotes: 'Card, Divider primitives exist. --ink-radius-size-xs=4px matches',
  },
  {
    id: 'lr-9-responsive',
    title: '9. Responsive Patterns',
    category: 'layout-rule',
    description: 'Sidebar behavior and content constraints',
    details: [
      'Desktop: 280px fixed sidebar',
      'Tablet/Mobile: Collapsible to icon-only or hidden',
      'No max-width constraint on content',
      'Tables scroll horizontally if needed',
    ],
    source: 'learnings/LAYOUT_RULES.md (Section 9)',
    status: 'pending',
    implementationStatus: 'partial',
    implementationNotes: 'LocalNav exists but collapse behavior may need enhancement',
  },
  {
    id: 'lr-10-zindex',
    title: '10. Z-Index Layers',
    category: 'layout-rule',
    description: 'Stacking order for components',
    details: [
      'Base: 0 (content)',
      'Sticky: 10 (table headers)',
      'Navigation: 100 (GlobalNav, LocalNav)',
      'Dropdown: 200 (menus, popovers)',
      'Modal: 300 (dialogs, overlays)',
      'Toast: 400 (notifications)',
    ],
    source: 'learnings/LAYOUT_RULES.md (Section 10)',
    status: 'pending',
    implementationStatus: 'partial',
    implementationNotes: 'System uses 1000+ scale (--ink-z-modal=1050). Keep current values',
  },
  {
    id: 'lr-11-status-badges',
    title: '11. Status Badge Variants',
    category: 'layout-rule',
    description: 'Colored background badge variants',
    details: [
      'Active: bg rgb(185, 246, 221), text rgb(0, 95, 67)',
      'Inactive: bg rgb(240, 239, 240), text muted',
      'New: bg rgb(43, 40, 67), text white',
      'Badge dimensions: padding 0px 8px, radius 4px, 12px/500',
    ],
    source: 'learnings/LAYOUT_RULES.md (Section 11)',
    status: 'pending',
    implementationStatus: 'implemented',
    implementationNotes: 'Badge primitive with success/warning/error variants. --ink-status-bg-* tokens exist',
  },
  {
    id: 'lr-12-feature-intro',
    title: '12. Feature Introduction Pages',
    category: 'layout-rule',
    description: 'Onboarding page typography and action links',
    details: [
      'Hero title: 32px, 600 weight (heavier than normal)',
      'Section header: 24px, 600 weight',
      'Action links: rgb(108, 58, 230) purple, 16px/500, no underline',
      'Body text: 16px, 400, muted color, 24px line-height',
    ],
    source: 'learnings/LAYOUT_RULES.md (Section 12)',
    status: 'pending',
    implementationStatus: 'partial',
    implementationNotes: 'Typography tokens exist but no FeatureIntro pattern',
  },
  {
    id: 'lr-13-error-pages',
    title: '13. Error Pages',
    category: 'layout-rule',
    description: '404 and error page styling',
    details: [
      'Error title: 32px, 700 weight (bold), pure black',
      'Error description: 16px, 400 weight, black',
      'Layout: Centered, no sidebar',
      'Go Back button: Outline variant, 40px height',
    ],
    source: 'learnings/LAYOUT_RULES.md (Section 13)',
    status: 'pending',
    implementationStatus: 'missing',
    implementationNotes: 'No ErrorShell layout or EmptyState pattern exists',
  },
  {
    id: 'lr-14-subtabs',
    title: '14. Sub-Tabs Pattern',
    category: 'layout-rule',
    description: 'Secondary navigation tabs (All | Recent | Starred)',
    details: [
      'Height: ~44px',
      'Padding: 12px 20px',
      'Font: 14px, 500 weight (active), 400 (inactive)',
      'Used on: Parties page, Templates page',
    ],
    source: 'learnings/LAYOUT_RULES.md (Section 14)',
    status: 'pending',
    implementationStatus: 'partial',
    implementationNotes: 'Tabs composite exists but SubTabs pattern not specific',
  },
  {
    id: 'lr-15-admin-dashboard',
    title: '15. Admin Dashboard Layout',
    category: 'layout-rule',
    description: 'Heavier typography for admin pages',
    details: [
      'Page title: 32px, 700 weight (bold, vs 400 in main app)',
      'Section headers: 24px, 700 weight',
      'Account name: 19px, 700 weight',
      'Promo card title: 24px, 600 weight',
      'Notification title: ~19px, 700 weight',
    ],
    source: 'learnings/LAYOUT_RULES.md (Section 15)',
    status: 'pending',
    implementationStatus: 'partial',
    implementationNotes: 'Typography exists but no admin-specific layout',
  },
  {
    id: 'lr-16-settings-page',
    title: '16. Settings Page Patterns',
    category: 'layout-rule',
    description: 'Form sections, checkboxes, radio buttons',
    details: [
      'Form section: H2 (24px/700) + description + fields',
      'Checkbox row: 40px height, 20px checkbox + 16px label',
      'Radio button: 20px × 20px, label 16px/400',
      'Link buttons: 40px height, outline style',
      'Compact filter dropdown: 32px height, 14px font',
    ],
    source: 'learnings/LAYOUT_RULES.md (Section 16)',
    status: 'pending',
    implementationStatus: 'partial',
    implementationNotes: 'Checkbox, Radio, Select primitives exist. FormSection pattern missing',
  },
  {
    id: 'lr-17-reports',
    title: '17. Reports/Dashboard Patterns',
    category: 'layout-rule',
    description: 'Chart cards and info banners',
    details: [
      'Chart card: 584px × 400px (half content area)',
      'Card title: 16px, 400 weight, 22.4px line-height',
      'Info banner: 54px height, purple bg, white text',
      'Two-column grid layout',
    ],
    source: 'learnings/LAYOUT_RULES.md (Section 17)',
    status: 'pending',
    implementationStatus: 'partial',
    implementationNotes: 'Card and Grid utilities exist. No StatCard or chart components',
  },
  {
    id: 'lr-18-hover-states',
    title: '18. Hover & Interaction States',
    category: 'layout-rule',
    description: 'Button, nav item, link, and table hover styles',
    details: [
      'Primary button hover: bg rgb(43, 4, 127) (lighter purple)',
      'Ghost/Outline hover: bg rgba(19, 0, 50, 0.05)',
      'Nav item hover: bg rgba(19, 0, 50, 0.05)',
      'Nav item active: 4px left border purple, 600 weight, bg subtle',
      'Link hover: text-decoration underline',
      'Table row hover: bg rgba(19, 0, 50, 0.02) (very subtle)',
    ],
    source: 'learnings/LAYOUT_RULES.md (Section 18)',
    status: 'pending',
    implementationStatus: 'implemented',
    implementationNotes: '--ink-cta-bg-*-hover, --ink-item-bg-*-hover tokens exist',
  },
  {
    id: 'lr-19-breakpoints',
    title: '19. Responsive Breakpoints',
    category: 'layout-rule',
    description: 'Desktop, tablet, mobile breakpoints',
    details: [
      'Desktop: 1024px+ (full sidebar 280px, all table columns)',
      'Tablet: 768px-1023px (visible sidebar, truncated columns)',
      'Mobile: <768px (hidden sidebar, minimal table + scroll)',
      'Mobile: hamburger menu, content full width, 16px padding',
    ],
    source: 'learnings/LAYOUT_RULES.md (Section 19)',
    status: 'pending',
    implementationStatus: 'partial',
    implementationNotes: '--ink-breakpoint-s=768px, -m=980px. Desktop threshold differs (980 vs 1024)',
  },
  {
    id: 'lr-20-composition',
    title: '20. Component Composition',
    category: 'layout-rule',
    description: 'How components stack vertically and horizontally',
    details: [
      'List page: GlobalNav → 32px → Title → 16px → Banner → 0px → ActionBar → 85px → Table',
      'ActionBar: Dropdown → 53px → Search → 8px → Filters (8px gap each)',
      'Pagination: Page size left-aligned, navigation right-aligned',
      'Sub-tabs position: y:64 (no gap from GlobalNav)',
      'Error pages: Centered layout, no sidebar',
    ],
    source: 'learnings/LAYOUT_RULES.md (Section 20)',
    status: 'pending',
    implementationStatus: 'missing',
    implementationNotes: 'No PageHeader, ActionBar patterns. Composition rules not codified',
  },
  {
    id: 'lr-21-composition-rules',
    title: '21. Composition Rules Summary',
    category: 'layout-rule',
    description: 'Quick reference for spacing rules',
    details: [
      'Content top padding from GlobalNav: 32px',
      'Title to Banner gap: 16px',
      'Banner to ActionBar: 0px (adjacent)',
      'ActionBar to Table: ~85px (large visual break)',
      'Filter button gap: 8px',
      'Sub-tabs position: y:64 (no gap from GlobalNav)',
    ],
    source: 'learnings/LAYOUT_RULES.md (Section 21)',
    status: 'pending',
    implementationStatus: 'missing',
    implementationNotes: 'Spacing tokens exist but composition patterns not codified',
  },

  // =============================================
  // PAGE TEMPLATES (8 from PAGE_TEMPLATES.md)
  // =============================================
  {
    id: 'pt-1-list-page',
    title: 'Template 1: List Page (Navigator Style)',
    category: 'page-template',
    description: 'Most common page for browsing and managing items',
    details: [
      'Structure: GlobalNav + LocalNav (280px) + Content',
      'Content: PageHeader → InfoBanner → ActionBar → DataTable → Pagination',
      'Table header: 49px, body row: 68px, footer: 51px',
      'Page title: 32px, 400 weight',
      'Action bar height: ~52px',
    ],
    source: 'learnings/PAGE_TEMPLATES.md (Template 1)',
    status: 'pending',
    implementationStatus: 'partial',
    implementationNotes: 'DocuSignShell exists. Missing PageHeader, ActionBar patterns',
  },
  {
    id: 'pt-2-dashboard',
    title: 'Template 2: Dashboard Page (Home)',
    category: 'page-template',
    description: 'Overview page with widgets, stats, quick actions',
    details: [
      'Structure: GlobalNav + HeroBanner + Content (NO sidebar)',
      'Hero banner: purple gradient bg, 24px white welcome text',
      'Quick action buttons: 40px height',
      'Two-column widget grid',
      'Cards: Tasks, Overview stats, Activity, Promo cards',
    ],
    source: 'learnings/PAGE_TEMPLATES.md (Template 2)',
    status: 'pending',
    implementationStatus: 'missing',
    implementationNotes: 'No DashboardShell layout (no sidebar variant)',
  },
  {
    id: 'pt-3-detail',
    title: 'Template 3: Detail Page',
    category: 'page-template',
    description: 'Single item view with metadata, tabs, related content',
    details: [
      'Structure: GlobalNav + DetailHeader + AlertBanner + Tabs + Content + Sidebar',
      'NO left sidebar on detail pages',
      'Right sidebar: ~250px (documents, related info)',
      'Tabs: 44px height, 12px 20px padding',
      'Avatar: 40px, Section header: 12px/600',
    ],
    source: 'learnings/PAGE_TEMPLATES.md (Template 3)',
    status: 'pending',
    implementationStatus: 'missing',
    implementationNotes: 'No DetailShell layout. Tabs composite exists',
  },
  {
    id: 'pt-4-templates',
    title: 'Template 4: Templates Page',
    category: 'page-template',
    description: 'List page with sub-tabs and different sidebar sections',
    details: [
      'Sub-tabs below GlobalNav: [Templates] [Elastic Templates]',
      'Different sidebar sections: ENVELOPE TEMPLATES, WEB FORMS',
      '"Use" button in table rows instead of status',
      'NEW badges on nav items',
    ],
    source: 'learnings/PAGE_TEMPLATES.md (Template 4)',
    status: 'pending',
    implementationStatus: 'partial',
    implementationNotes: 'DocuSignShell + LocalNav exist. SubTabs pattern missing',
  },
  {
    id: 'pt-5-reports',
    title: 'Template 5: Reports Page',
    category: 'page-template',
    description: 'Dashboard-style page with reports and charts',
    details: [
      'Narrower sidebar: 220px (vs standard 280px)',
      'Search input for finding reports',
      'Two-column grid: Recents + Favorites',
      'Chart cards: 584px × 400px',
      'Section headers with "View Dashboard →" links',
    ],
    source: 'learnings/PAGE_TEMPLATES.md (Template 5)',
    status: 'pending',
    implementationStatus: 'missing',
    implementationNotes: 'No ReportsShell layout with narrow sidebar',
  },
  {
    id: 'pt-6-settings',
    title: 'Template 6: Settings Page (Admin)',
    category: 'page-template',
    description: 'Configuration page with form sections',
    details: [
      'Structure: GlobalNav + LocalNav + FormSections',
      'Heavier typography: Title 32px/700, Section 24px/700',
      'FormSection: Header + Description + Fields',
      'Checkbox/Radio: 20px size, 16px/400 label',
      'Row height: 40px',
    ],
    source: 'learnings/PAGE_TEMPLATES.md (Template 6)',
    status: 'pending',
    implementationStatus: 'partial',
    implementationNotes: 'DocuSignShell exists. FormSection pattern missing',
  },
  {
    id: 'pt-7-error',
    title: 'Template 7: Error Page (404)',
    category: 'page-template',
    description: 'Centered error state with minimal chrome',
    details: [
      'GlobalNav minimal (logo only)',
      'NO sidebar, centered layout',
      'Purple decorative illustration (~200px height)',
      'Error title: 32px, 700 weight, pure black',
      'Go Back button: outline style',
    ],
    source: 'learnings/PAGE_TEMPLATES.md (Template 7)',
    status: 'pending',
    implementationStatus: 'missing',
    implementationNotes: 'No ErrorShell layout exists',
  },
  {
    id: 'pt-8-feature-intro',
    title: 'Template 8: Feature Introduction Page',
    category: 'page-template',
    description: 'Onboarding page for new features',
    details: [
      'Hero title: 32px, 600 weight (heavier than normal)',
      'Section header: 24px, 600 weight',
      'Two-column Feature Card grid',
      'Action links: purple rgb(108, 58, 230), no underline',
    ],
    source: 'learnings/PAGE_TEMPLATES.md (Template 8)',
    status: 'pending',
    implementationStatus: 'missing',
    implementationNotes: 'No FeatureIntro layout or FeatureCard pattern',
  },

  // =============================================
  // L5 PATTERNS TO ADD (11 from PATTERNS_TO_ADD.md)
  // =============================================
  {
    id: 'p-1-pageheader',
    title: 'Pattern 1: PageHeader',
    category: 'pattern',
    description: 'Page header with title, badges, and actions',
    details: [
      'Props: title (H1), badge (ReactNode), actions (ReactNode), breadcrumb',
      'Title: 32px, 400 weight, rgba(19, 0, 50, 0.9)',
      'Gap between title and badge: 12px',
      'Actions aligned to right edge',
    ],
    source: 'learnings/PATTERNS_TO_ADD.md (Pattern 1)',
    status: 'pending',
    implementationStatus: 'missing',
    implementationNotes: 'Heading primitive exists but no PageHeader pattern with badge/actions layout',
  },
  {
    id: 'p-2-actionbar',
    title: 'Pattern 2: ActionBar',
    category: 'pattern',
    description: 'Search, filters, and bulk actions for list views',
    details: [
      'Props: primaryDropdown, searchPlaceholder, searchValue, filters[], onClear',
      'Height: ~52px',
      'Search input: 366px width, 30px height',
      'Filter buttons: 32px height',
      'Spacing: 8-16px gap between elements',
    ],
    source: 'learnings/PATTERNS_TO_ADD.md (Pattern 2)',
    status: 'pending',
    implementationStatus: 'missing',
    implementationNotes: 'SearchInput and Button exist but no ActionBar composition pattern',
  },
  {
    id: 'p-3-infobanner',
    title: 'Pattern 3: InfoBanner',
    category: 'pattern',
    description: 'Contextual info or promotional messages',
    details: [
      'Props: icon, message, action (ReactNode), onDismiss, variant',
      'Variants: info, warning, promo',
      'Height: 52px',
      'Padding: 12px 16px',
    ],
    source: 'learnings/PATTERNS_TO_ADD.md (Pattern 3)',
    status: 'pending',
    implementationStatus: 'partial',
    implementationNotes: 'Banner primitive exists with info/warning/error variants. May need promo variant',
  },
  {
    id: 'p-4-detailheader',
    title: 'Pattern 4: DetailHeader',
    category: 'pattern',
    description: 'Header for detail/view pages with status and actions',
    details: [
      'Props: status (Badge), title, metadata (ReactNode), actions',
      'Status badge: 12px font, pill shape',
      'Title: 24px or larger',
      'Metadata: 14px, links underlined',
    ],
    source: 'learnings/PATTERNS_TO_ADD.md (Pattern 4)',
    status: 'pending',
    implementationStatus: 'missing',
    implementationNotes: 'No DetailHeader pattern. Badge and Heading exist as primitives',
  },
  {
    id: 'p-5-formsection',
    title: 'Pattern 5: FormSection',
    category: 'pattern',
    description: 'Grouped form fields with header and description',
    details: [
      'Props: title, description, children, divider (boolean)',
      'Title: 16px, 500 weight',
      'Description: 14px, rgba(19, 0, 50, 0.7)',
      'Field spacing: 16-24px vertical gap',
    ],
    source: 'learnings/PATTERNS_TO_ADD.md (Pattern 5)',
    status: 'pending',
    implementationStatus: 'missing',
    implementationNotes: 'No FormSection pattern. Stack utility can achieve spacing',
  },
  {
    id: 'p-6-emptystate',
    title: 'Pattern 6: EmptyState',
    category: 'pattern',
    description: 'Placeholder when no data exists',
    details: [
      'Props: illustration, title, description, action (Button)',
      'Title: 24px, 400 weight',
      'Description: 14px, muted',
      'Centered layout, padding 48px+',
    ],
    source: 'learnings/PATTERNS_TO_ADD.md (Pattern 6)',
    status: 'pending',
    implementationStatus: 'missing',
    implementationNotes: 'No EmptyState pattern. Can be composed with Stack, Text, Button',
  },
  {
    id: 'p-7-recipientcard',
    title: 'Pattern 7: RecipientCard',
    category: 'pattern',
    description: 'Display recipient info in signing flows',
    details: [
      'Props: avatar {initials, color, imageUrl}, name, email, status, date',
      'Avatar: 40px',
      'Name: 16px, link color',
      'Email: 14px, muted',
      'Status: 14px with icon',
    ],
    source: 'learnings/PATTERNS_TO_ADD.md (Pattern 7)',
    status: 'pending',
    implementationStatus: 'missing',
    implementationNotes: 'No RecipientCard pattern. Avatar and Card primitives exist',
  },
  {
    id: 'p-8-statcard',
    title: 'Pattern 8: StatCard',
    category: 'pattern',
    description: 'Display metric with label for dashboards',
    details: [
      'Props: label, value (number|string), trend, onClick',
      'Label: 14px, rgba(19, 0, 50, 0.7)',
      'Value: 16px+, aligned right',
      'Padding: 12px 16px',
    ],
    source: 'learnings/PATTERNS_TO_ADD.md (Pattern 8)',
    status: 'pending',
    implementationStatus: 'missing',
    implementationNotes: 'No StatCard pattern. Card primitive exists but no stat-specific variant',
  },
  {
    id: 'p-9-statusbadge',
    title: 'Pattern 9: StatusBadge',
    category: 'pattern',
    description: 'Colored status indicators with background variants',
    details: [
      'Variants: active (green bg), inactive (gray bg), new (dark purple bg)',
      'Active: bg rgb(185, 246, 221), text rgb(0, 95, 67)',
      'Inactive: bg rgb(240, 239, 240), text muted',
      'New: bg rgb(43, 40, 67), text white',
      'Dimensions: padding 0px 8px, radius 4px, 12px/500',
    ],
    source: 'learnings/PATTERNS_TO_ADD.md (Pattern 9)',
    status: 'pending',
    implementationStatus: 'implemented',
    implementationNotes: 'Badge primitive has success/warning/error/default variants with --ink-status-bg-* tokens',
  },
  {
    id: 'p-10-featurecard',
    title: 'Pattern 10: FeatureCard',
    category: 'pattern',
    description: 'Feature introduction cards for onboarding pages',
    details: [
      'Props: title, description, action {label, href}',
      'Title: 16px, 500 weight',
      'Description: 16px, 400 weight, muted',
      'Action link: 16px/500, purple rgb(108, 58, 230), no underline',
    ],
    source: 'learnings/PATTERNS_TO_ADD.md (Pattern 10)',
    status: 'pending',
    implementationStatus: 'missing',
    implementationNotes: 'No FeatureCard pattern. Card and Link primitives exist',
  },
  {
    id: 'p-11-subtabs',
    title: 'Pattern 11: SubTabs',
    category: 'pattern',
    description: 'Secondary navigation tabs below page header',
    details: [
      'Props: tabs[] {label, count?}, activeTab, onTabChange',
      'Height: ~44px',
      'Padding: 12px 20px',
      'Font: 14px, 500 weight (active), 400 (inactive)',
    ],
    source: 'learnings/PATTERNS_TO_ADD.md (Pattern 11)',
    status: 'pending',
    implementationStatus: 'partial',
    implementationNotes: 'Tabs composite exists but positioning/styling differs from SubTabs spec',
  },

  // =============================================
  // L6 LAYOUTS TO ADD (7 from LAYOUTS_TO_ADD.md)
  // =============================================
  {
    id: 'l-1-detailshell',
    title: 'Layout 1: DetailShell',
    category: 'layout',
    description: 'Full-width layout for detail/view pages without left sidebar',
    details: [
      'Props: header (DetailHeader), alert, tabs, sidebar, children',
      'Use for: Agreement detail pages, document preview, single-item views',
      'No left sidebar',
      'Optional right sidebar: ~250px',
      'Content padding: 24px',
    ],
    source: 'learnings/LAYOUTS_TO_ADD.md (Layout 1)',
    status: 'pending',
    implementationStatus: 'missing',
    implementationNotes: 'No DetailShell layout. DocuSignShell requires sidebar',
  },
  {
    id: 'l-2-dashboardshell',
    title: 'Layout 2: DashboardShell',
    category: 'layout',
    description: 'Full-width layout for dashboard/home pages',
    details: [
      'Props: hero (HeroBanner), children, footer',
      'Use for: Home page, overview dashboards, no left navigation',
      'No sidebar',
      'Hero: ~120px height',
      'Content padding: 24-32px, grid gap: 24px',
    ],
    source: 'learnings/LAYOUTS_TO_ADD.md (Layout 2)',
    status: 'pending',
    implementationStatus: 'missing',
    implementationNotes: 'No DashboardShell layout. DocuSignShell always has sidebar',
  },
  {
    id: 'l-3-settingsshell',
    title: 'Layout 3: SettingsShell',
    category: 'layout',
    description: 'Settings layout with dedicated settings navigation',
    details: [
      'Props: navigation (SettingsNav), children, footer',
      'Use for: Admin settings, account settings, configuration pages',
      'Settings nav: 280px',
      'Section headers: 12px, 600 weight, uppercase',
      'Form field spacing: 24px, content max-width: 800px (optional)',
    ],
    source: 'learnings/LAYOUTS_TO_ADD.md (Layout 3)',
    status: 'pending',
    implementationStatus: 'partial',
    implementationNotes: 'DocuSignShell with LocalNav can serve settings. Missing max-width constraint',
  },
  {
    id: 'l-4-wizardshell',
    title: 'Layout 4: WizardShell',
    category: 'layout',
    description: 'Multi-step workflow with stepper',
    details: [
      'Props: stepper, children, footer (WizardFooter), onClose',
      'Use for: Envelope creation, template setup, onboarding flows',
      'Stepper height: ~80px',
      'Footer height: ~72px',
      'Content: centered, max-width 800-1000px, padding 32px',
    ],
    source: 'learnings/LAYOUTS_TO_ADD.md (Layout 4)',
    status: 'pending',
    implementationStatus: 'missing',
    implementationNotes: 'No WizardShell layout. Stepper composite exists but no wizard layout',
  },
  {
    id: 'l-5-subtabshell',
    title: 'Layout 5: SubTabShell',
    category: 'layout',
    description: 'Pages with sub-navigation tabs below GlobalNav',
    details: [
      'Props: tabs[], activeTab, sidebar (LocalNav), children',
      'Use for: Templates page, pages with multiple views of same data',
      'SubTabs height: ~44px',
      'SubTabs top: 64px (no gap from GlobalNav)',
      'Tab padding: 12px 20px, active: 500 weight + underline',
    ],
    source: 'learnings/LAYOUTS_TO_ADD.md (Layout 5)',
    status: 'pending',
    implementationStatus: 'missing',
    implementationNotes: 'No SubTabShell layout. Tabs composite exists but not integrated as shell',
  },
  {
    id: 'l-6-errorshell',
    title: 'Layout 6: ErrorShell',
    category: 'layout',
    description: 'Centered error page layout without sidebar',
    details: [
      'Props: children, showNav (boolean, default true)',
      'Use for: 404, 500, permission denied, any error state',
      'No sidebar, centered content (horizontal + vertical)',
      'Error title: 32px, 700 weight, pure black',
      'Description: 16px, 400 weight',
    ],
    source: 'learnings/LAYOUTS_TO_ADD.md (Layout 6)',
    status: 'pending',
    implementationStatus: 'missing',
    implementationNotes: 'No ErrorShell layout. Full-screen centered layouts not available',
  },
  {
    id: 'l-7-reportsshell',
    title: 'Layout 7: ReportsShell',
    category: 'layout',
    description: 'Reports/analytics layout with chart grids',
    details: [
      'Props: sidebar (ReportsNav), header, search, children',
      'Use for: Reports overview, analytics dashboards, data visualization',
      'Sidebar: 220px (narrower than standard 280px)',
      'Chart cards: 584px × 400px',
      'Two-column grid, gap: 24px',
    ],
    source: 'learnings/LAYOUTS_TO_ADD.md (Layout 7)',
    status: 'pending',
    implementationStatus: 'missing',
    implementationNotes: 'No ReportsShell layout. LocalNav fixed at 280px, no narrow variant',
  },
];

const STORAGE_KEY = 'learnings-approval-status-v2';

// Load approval status from localStorage
const loadApprovalStatus = (): Record<string, 'approved' | 'rejected' | 'pending'> => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Failed to load approval status:', e);
  }
  return {};
};

// Save approval status to localStorage
const saveApprovalStatus = (status: Record<string, 'approved' | 'rejected' | 'pending'>) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(status));
  } catch (e) {
    console.error('Failed to save approval status:', e);
  }
};

// Category display names
const CATEGORY_LABELS: Record<string, string> = {
  'layout-rule': 'Layout Rules',
  'page-template': 'Page Templates',
  'pattern': 'L5 Patterns to Build',
  'layout': 'L6 Layouts to Build',
};

// Visual preview component for specific rules
const VisualPreview: React.FC<{ itemId: string }> = ({ itemId }) => {
  switch (itemId) {
    case 'lr-1-global-shell':
      return (
        <div className={styles.visualPreview}>
          <div className={styles.shellPreview} style={{ flexDirection: 'column' }}>
            <div className={styles.shellNav} style={{ height: '24px', width: '100%' }}>GlobalNav (64px)</div>
            <div style={{ display: 'flex', flex: 1 }}>
              <div className={styles.shellSidebar} style={{ width: '80px' }}>LocalNav<br/>(280px)</div>
              <div className={styles.shellContent}>Content Area</div>
            </div>
          </div>
        </div>
      );

    case 'lr-2-spacing-system':
      return (
        <div className={styles.visualPreview}>
          <div className={styles.spacingPreview}>
            {[4, 8, 12, 16, 20, 24].map((size) => (
              <div key={size} className={styles.spacingBox}>
                <div className={styles.spacingVisual} style={{ width: `${size}px`, height: `${size}px` }} />
                <span className={styles.spacingLabel}>{size}px</span>
              </div>
            ))}
          </div>
        </div>
      );

    case 'lr-3-typography':
      return (
        <div className={styles.visualPreview}>
          <div className={styles.typographyPreview}>
            <div className={styles.typoSample}>
              <span className={styles.typoLabel}>H1 (32px)</span>
              <span style={{ fontSize: '32px', fontWeight: 400 }}>Page Title</span>
            </div>
            <div className={styles.typoSample}>
              <span className={styles.typoLabel}>H2 (24px)</span>
              <span style={{ fontSize: '24px', fontWeight: 400 }}>Section Header</span>
            </div>
            <div className={styles.typoSample}>
              <span className={styles.typoLabel}>H3 (16px)</span>
              <span style={{ fontSize: '16px', fontWeight: 500 }}>Card Title</span>
            </div>
            <div className={styles.typoSample}>
              <span className={styles.typoLabel}>Body (14px)</span>
              <span style={{ fontSize: '14px', fontWeight: 400 }}>Regular body text</span>
            </div>
            <div className={styles.typoSample}>
              <span className={styles.typoLabel}>Caption (12px)</span>
              <span style={{ fontSize: '12px', fontWeight: 500 }}>Table header</span>
            </div>
          </div>
        </div>
      );

    case 'lr-4-colors':
      return (
        <div className={styles.visualPreview}>
          <div className={styles.colorSwatches}>
            <div className={styles.colorSwatch}>
              <div className={styles.swatchBox} style={{ background: 'rgba(19, 0, 50, 0.9)' }} />
              <span className={styles.swatchLabel}>text-primary</span>
            </div>
            <div className={styles.colorSwatch}>
              <div className={styles.swatchBox} style={{ background: 'rgba(19, 0, 50, 0.7)' }} />
              <span className={styles.swatchLabel}>text-secondary</span>
            </div>
            <div className={styles.colorSwatch}>
              <div className={styles.swatchBox} style={{ background: 'rgb(36, 99, 209)' }} />
              <span className={styles.swatchLabel}>text-link</span>
            </div>
            <div className={styles.colorSwatch}>
              <div className={styles.swatchBox} style={{ background: 'rgb(38, 5, 89)' }} />
              <span className={styles.swatchLabel}>bg-primary</span>
            </div>
            <div className={styles.colorSwatch}>
              <div className={styles.swatchBox} style={{ background: 'rgba(19, 0, 50, 0.05)' }} />
              <span className={styles.swatchLabel}>bg-ghost</span>
            </div>
            <div className={styles.colorSwatch}>
              <div className={styles.swatchBox} style={{ background: 'rgba(19, 0, 50, 0.1)' }} />
              <span className={styles.swatchLabel}>border-subtle</span>
            </div>
          </div>
        </div>
      );

    case 'lr-5-component-dimensions':
      return (
        <div className={styles.visualPreview}>
          <div className={styles.componentPreview}>
            <div className={styles.dimensionBox}>
              <div className={styles.dimensionVisual} style={{ width: '80px', height: '40px' }}>40px</div>
              <span className={styles.dimensionLabel}>Button</span>
            </div>
            <div className={styles.dimensionBox}>
              <div className={styles.dimensionVisual} style={{ width: '120px', height: '32px' }}>32px</div>
              <span className={styles.dimensionLabel}>Input</span>
            </div>
            <div className={styles.dimensionBox}>
              <div className={styles.dimensionVisual} style={{ width: '60px', height: '48px' }}>48px</div>
              <span className={styles.dimensionLabel}>Nav Item</span>
            </div>
            <div className={styles.dimensionBox}>
              <div className={styles.dimensionVisual} style={{ width: '40px', height: '40px', borderRadius: '50%' }}>40</div>
              <span className={styles.dimensionLabel}>Avatar</span>
            </div>
          </div>
        </div>
      );

    case 'lr-6-button-variants':
      return (
        <div className={styles.visualPreview}>
          <div className={styles.buttonPreview}>
            <span className={`${styles.previewButton} ${styles.primary}`}>Primary</span>
            <span className={`${styles.previewButton} ${styles.secondary}`}>Secondary</span>
            <span className={`${styles.previewButton} ${styles.outline}`}>Outline</span>
          </div>
        </div>
      );

    case 'lr-7-status-indicators':
    case 'lr-11-status-badges':
      return (
        <div className={styles.visualPreview}>
          <div className={styles.badgePreview}>
            <span className={`${styles.previewBadge} ${styles.active}`}>Active</span>
            <span className={`${styles.previewBadge} ${styles.inactive}`}>Inactive</span>
            <span className={`${styles.previewBadge} ${styles.new}`}>New</span>
          </div>
        </div>
      );

    case 'lr-10-zindex':
      return (
        <div className={styles.visualPreview}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
            {[
              { label: 'Content', z: 0, h: 30 },
              { label: 'Sticky', z: 10, h: 40 },
              { label: 'Nav', z: 100, h: 50 },
              { label: 'Dropdown', z: 200, h: 60 },
              { label: 'Modal', z: 300, h: 70 },
              { label: 'Toast', z: 400, h: 80 },
            ].map((item) => (
              <div key={item.label} className={styles.dimensionBox}>
                <div className={styles.dimensionVisual} style={{ width: '50px', height: `${item.h}px` }}>{item.z}</div>
                <span className={styles.dimensionLabel}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      );

    case 'pt-1-list-page':
      return (
        <div className={styles.visualPreview}>
          <div className={styles.shellPreview} style={{ flexDirection: 'column', height: '140px' }}>
            <div className={styles.shellNav} style={{ height: '20px', width: '100%' }}>GlobalNav</div>
            <div style={{ display: 'flex', flex: 1 }}>
              <div className={styles.shellSidebar} style={{ width: '60px', fontSize: '10px' }}>LocalNav</div>
              <div className={styles.shellContent} style={{ flexDirection: 'column', padding: '4px', gap: '2px', alignItems: 'stretch' }}>
                <div style={{ height: '12px', background: 'var(--ink-neutral-20)', borderRadius: '2px' }} />
                <div style={{ height: '8px', background: 'var(--ink-neutral-10)', borderRadius: '2px' }} />
                <div style={{ flex: 1, background: 'var(--ink-neutral-5)', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>Table</div>
              </div>
            </div>
          </div>
        </div>
      );

    case 'pt-2-dashboard':
      return (
        <div className={styles.visualPreview}>
          <div className={styles.shellPreview} style={{ flexDirection: 'column', height: '140px' }}>
            <div className={styles.shellNav} style={{ height: '20px', width: '100%' }}>GlobalNav</div>
            <div style={{ height: '30px', background: 'linear-gradient(90deg, var(--ink-cobalt-140), var(--ink-cobalt-100))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '10px' }}>Hero Banner</div>
            <div className={styles.gridPreview} style={{ padding: '8px', flex: 1 }}>
              <div className={styles.gridRow}>
                <div className={styles.gridCell} style={{ width: '50%', height: '30px' }} />
                <div className={styles.gridCell} style={{ width: '50%', height: '30px' }} />
              </div>
              <div className={styles.gridRow}>
                <div className={styles.gridCell} style={{ width: '50%', height: '30px' }} />
                <div className={styles.gridCell} style={{ width: '50%', height: '30px' }} />
              </div>
            </div>
          </div>
        </div>
      );

    case 'pt-3-detail':
      return (
        <div className={styles.visualPreview}>
          <div className={styles.shellPreview} style={{ flexDirection: 'column', height: '140px' }}>
            <div className={styles.shellNav} style={{ height: '20px', width: '100%' }}>GlobalNav</div>
            <div style={{ display: 'flex', flex: 1 }}>
              <div className={styles.shellContent} style={{ flexDirection: 'column', padding: '4px', gap: '2px', alignItems: 'stretch' }}>
                <div style={{ height: '16px', background: 'var(--ink-neutral-20)', borderRadius: '2px' }} />
                <div style={{ height: '10px', background: 'var(--ink-neutral-10)', borderRadius: '2px', display: 'flex', gap: '4px' }}>
                  <div style={{ width: '30px', background: 'var(--ink-cobalt-100)', opacity: 0.3, borderRadius: '2px' }} />
                  <div style={{ width: '30px', background: 'var(--ink-neutral-20)', borderRadius: '2px' }} />
                </div>
                <div style={{ flex: 1, background: 'var(--ink-neutral-5)', borderRadius: '2px' }} />
              </div>
              <div className={styles.shellSidebar} style={{ width: '60px', fontSize: '10px', borderRight: 'none', borderLeft: '1px solid var(--ink-border-default)' }}>Right Sidebar</div>
            </div>
          </div>
        </div>
      );

    case 'l-1-detailshell':
    case 'l-2-dashboardshell':
    case 'l-3-settingsshell':
    case 'l-4-wizardshell':
    case 'l-5-subtabshell':
    case 'l-6-errorshell':
    case 'l-7-reportsshell':
      return (
        <div className={styles.visualPreview}>
          <div className={styles.shellPreview} style={{ flexDirection: 'column', height: '100px' }}>
            <div className={styles.shellNav} style={{ height: '16px', width: '100%', fontSize: '9px' }}>GlobalNav</div>
            <div style={{ display: 'flex', flex: 1 }}>
              {itemId !== 'l-2-dashboardshell' && itemId !== 'l-6-errorshell' && (
                <div className={styles.shellSidebar} style={{ width: '50px', fontSize: '9px' }}>Nav</div>
              )}
              <div className={styles.shellContent} style={{ fontSize: '9px' }}>
                {itemId === 'l-6-errorshell' ? 'Centered Error' : 'Content'}
              </div>
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
};

export default function LearningsReview() {
  const [learnings, setLearnings] = useState<LearningItem[]>(() => {
    const savedStatus = loadApprovalStatus();
    return INITIAL_LEARNINGS.map(l => ({
      ...l,
      status: savedStatus[l.id] || 'pending',
    }));
  });
  const [submitted, setSubmitted] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [filterImplementation, setFilterImplementation] = useState<string | null>(null);

  // Apply both filters
  const filteredLearnings = learnings.filter(l => {
    const categoryMatch = !filterCategory || l.category === filterCategory;
    const implMatch = !filterImplementation || l.implementationStatus === filterImplementation;
    return categoryMatch && implMatch;
  });

  // Group filtered learnings by category
  const groupedLearnings = filteredLearnings.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, LearningItem[]>);

  // Implementation status counts (for filter tabs)
  const implCounts = {
    implemented: learnings.filter(l => l.implementationStatus === 'implemented').length,
    partial: learnings.filter(l => l.implementationStatus === 'partial').length,
    missing: learnings.filter(l => l.implementationStatus === 'missing').length,
  };

  const stats = {
    total: filteredLearnings.length,
    approved: filteredLearnings.filter(l => l.status === 'approved').length,
    rejected: filteredLearnings.filter(l => l.status === 'rejected').length,
    pending: filteredLearnings.filter(l => l.status === 'pending').length,
  };

  const handleStatusChange = (id: string, status: 'approved' | 'rejected') => {
    setLearnings(prev =>
      prev.map(l => l.id === id ? { ...l, status } : l)
    );
    setSubmitted(false);
  };

  const handleSubmit = () => {
    const status: Record<string, 'approved' | 'rejected' | 'pending'> = {};
    learnings.forEach(l => {
      status[l.id] = l.status;
    });
    saveApprovalStatus(status);
    setSubmitted(true);
  };

  const handleApproveAll = () => {
    const targetIds = filteredLearnings.map(l => l.id);

    setLearnings(prev => prev.map(l =>
      targetIds.includes(l.id) ? { ...l, status: 'approved' } : l
    ));
    setSubmitted(false);
  };

  const handleRejectAll = () => {
    const targetIds = filteredLearnings.map(l => l.id);

    setLearnings(prev => prev.map(l =>
      targetIds.includes(l.id) ? { ...l, status: 'rejected' } : l
    ));
    setSubmitted(false);
  };

  const handleReset = () => {
    setLearnings(INITIAL_LEARNINGS);
    localStorage.removeItem(STORAGE_KEY);
    setSubmitted(false);
  };

  const categories = ['layout-rule', 'page-template', 'pattern', 'layout'];

  return (
    <div className={styles.container}>
      <div className={styles.scrollContent}>
      <div className={styles.header}>
        <Stack gap="small">
          <Heading level={1}>Layout Rules Review</Heading>
          <Text variant="muted" size="large">
            {filteredLearnings.length === learnings.length
              ? `Review and approve ${learnings.length} layout learnings extracted from DocuSign production.`
              : `Showing ${filteredLearnings.length} of ${learnings.length} learnings.`
            }
          </Text>
        </Stack>
      </div>

      {/* Implementation Status Filter */}
      <div className={styles.categoryTabs}>
        <button
          className={`${styles.categoryTab} ${!filterImplementation ? styles.active : ''}`}
          onClick={() => setFilterImplementation(null)}
        >
          All Status ({learnings.length})
        </button>
        <button
          className={`${styles.categoryTab} ${styles.implementedTab} ${filterImplementation === 'implemented' ? styles.active : ''}`}
          onClick={() => setFilterImplementation('implemented')}
        >
          Live ({implCounts.implemented})
        </button>
        <button
          className={`${styles.categoryTab} ${styles.partialTab} ${filterImplementation === 'partial' ? styles.active : ''}`}
          onClick={() => setFilterImplementation('partial')}
        >
          Partial ({implCounts.partial})
        </button>
        <button
          className={`${styles.categoryTab} ${styles.missingTab} ${filterImplementation === 'missing' ? styles.active : ''}`}
          onClick={() => setFilterImplementation('missing')}
        >
          To Build ({implCounts.missing})
        </button>
      </div>

      {/* Category Filter Tabs */}
      <div className={styles.categoryTabs}>
        <button
          className={`${styles.categoryTab} ${!filterCategory ? styles.active : ''}`}
          onClick={() => setFilterCategory(null)}
        >
          All Categories
        </button>
        {categories.map(cat => (
          <button
            key={cat}
            className={`${styles.categoryTab} ${filterCategory === cat ? styles.active : ''}`}
            onClick={() => setFilterCategory(cat)}
          >
            {CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>

      {/* Stats Bar */}
      <div className={styles.statsBar}>
        <div className={styles.stat}>
          <span className={styles.statNumber}>{stats.total}</span>
          <span className={styles.statLabel}>Total</span>
        </div>
        <div className={styles.stat}>
          <span className={`${styles.statNumber} ${styles.approved}`}>{stats.approved}</span>
          <span className={styles.statLabel}>Approved</span>
        </div>
        <div className={styles.stat}>
          <span className={`${styles.statNumber} ${styles.rejected}`}>{stats.rejected}</span>
          <span className={styles.statLabel}>Rejected</span>
        </div>
        <div className={styles.stat}>
          <span className={`${styles.statNumber} ${styles.pending}`}>{stats.pending}</span>
          <span className={styles.statLabel}>Pending</span>
        </div>
      </div>

      {/* Actions */}
      <div className={styles.actions}>
        <Button variant="outline" onClick={handleApproveAll}>
          Approve All {filterCategory ? CATEGORY_LABELS[filterCategory] : ''}
        </Button>
        <Button variant="outline" onClick={handleRejectAll}>
          Reject All {filterCategory ? CATEGORY_LABELS[filterCategory] : ''}
        </Button>
        <Button variant="outline" onClick={handleReset}>
          Reset
        </Button>
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={stats.pending > 0}
        >
          Submit Review
        </Button>
      </div>

      {submitted && (
        <Banner variant="success" className={styles.successBanner}>
          Review submitted! Approval status saved. {stats.approved} approved, {stats.rejected} rejected.
        </Banner>
      )}

      {/* Categories */}
      <div className={styles.categories}>
        {categories
          .filter(cat => !filterCategory || filterCategory === cat)
          .map(cat => (
            <div key={cat} className={styles.categorySection}>
              <Heading level={2} className={styles.categoryHeader}>
                {CATEGORY_LABELS[cat]} ({groupedLearnings[cat]?.filter(l => l.status === 'approved').length || 0}/{groupedLearnings[cat]?.length || 0} approved)
              </Heading>

              {groupedLearnings[cat]?.map((item) => (
                <Card key={item.id} className={styles.learningCard}>
                  <div className={styles.cardHeader}>
                    <div className={styles.cardTitle}>
                      <Text weight="semibold">{item.title}</Text>
                      <div className={styles.badgeGroup}>
                        <span className={`${styles.implementationBadge} ${styles[item.implementationStatus]}`}>
                          {item.implementationStatus === 'implemented' ? 'Live' :
                           item.implementationStatus === 'partial' ? 'Partial' : 'To Build'}
                        </span>
                        <Badge
                          variant={
                            item.status === 'approved' ? 'success' :
                            item.status === 'rejected' ? 'error' : 'default'
                          }
                          size="small"
                        >
                          {item.status}
                        </Badge>
                      </div>
                    </div>
                    <Text variant="muted" size="small">{item.description}</Text>
                  </div>

                  <div className={styles.cardContent}>
                    <ul className={styles.detailsList}>
                      {item.details.map((detail, i) => (
                        <li key={i}>{detail}</li>
                      ))}
                    </ul>
                    {item.implementationNotes && (
                      <div className={`${styles.implementationNotes} ${styles[item.implementationStatus]}`}>
                        <strong>Status:</strong> {item.implementationNotes}
                      </div>
                    )}
                    <VisualPreview itemId={item.id} />
                    <Text variant="muted" size="small" className={styles.source}>
                      {item.source}
                    </Text>
                  </div>

                  <div className={styles.cardActions}>
                    <button
                      className={`${styles.statusButton} ${styles.approveButton} ${item.status === 'approved' ? styles.active : ''}`}
                      onClick={() => handleStatusChange(item.id, 'approved')}
                    >
                      ✓ Approve
                    </button>
                    <button
                      className={`${styles.statusButton} ${styles.rejectButton} ${item.status === 'rejected' ? styles.active : ''}`}
                      onClick={() => handleStatusChange(item.id, 'rejected')}
                    >
                      ✕ Reject
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          ))}
      </div>

      {/* Final Submit */}
      <div className={styles.footer}>
        <Text variant="muted">
          {stats.pending > 0
            ? `Review all ${stats.pending} pending items before submitting.`
            : 'All items reviewed. Ready to submit.'
          }
        </Text>
        <Button
          variant="primary"
          size="large"
          onClick={handleSubmit}
          disabled={stats.pending > 0}
        >
          Submit Review ({stats.approved} approved, {stats.rejected} rejected)
        </Button>
      </div>
      </div>
    </div>
  );
}
