/**
 * DocuSign Layout Presets
 *
 * Programmatic configuration for prototype generation.
 * Generated from DocuSign production analysis.
 */

// ============================================================================
// SPACING SYSTEM
// ============================================================================

export const spacing = {
  /** Base unit: 4px */
  base: 4,

  /** Spacing scale */
  scale: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    '2xl': 24,
    '3xl': 32,
    '4xl': 48,
  },

  /** Common padding patterns */
  padding: {
    button: '4px 12px',
    buttonCompact: '4px 8px',
    navItem: '11px 15px 11px 23px',
    tableCell: '4px 16px',
    tab: '12px 20px',
    card: '16px',
    section: '24px',
  },
} as const;

// ============================================================================
// TYPOGRAPHY
// ============================================================================

export const typography = {
  /** Font family */
  fontFamily: 'Inter, system-ui, sans-serif',

  /** Font sizes */
  fontSize: {
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '24px',
    xl: '32px',
  },

  /** Font weights */
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  /** Line heights */
  lineHeight: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
  },

  /** Heading presets */
  headings: {
    h1: {
      fontSize: '32px',
      fontWeight: 400,
      lineHeight: '40px',
    },
    h2: {
      fontSize: '24px',
      fontWeight: 400,
      lineHeight: '30px',
    },
    h3: {
      fontSize: '16px',
      fontWeight: 500,
      lineHeight: '20px',
    },
  },

  /** Text presets */
  text: {
    bodyLarge: {
      fontSize: '16px',
      fontWeight: 400,
    },
    body: {
      fontSize: '14px',
      fontWeight: 400,
    },
    caption: {
      fontSize: '12px',
      fontWeight: 500,
    },
    label: {
      fontSize: '12px',
      fontWeight: 600,
      letterSpacing: '0.12px',
    },
  },
} as const;

// ============================================================================
// COLORS
// ============================================================================

export const colors = {
  /** Brand colors */
  brand: {
    primary: 'rgb(38, 5, 89)',
    primaryLight: 'rgb(202, 194, 255)',
    badgeDark: 'rgb(43, 40, 67)',
  },

  /** Text colors */
  text: {
    primary: 'rgba(19, 0, 50, 0.9)',
    secondary: 'rgba(19, 0, 50, 0.7)',
    white: '#ffffff',
    link: 'rgb(36, 99, 209)',
    linkPurple: 'rgb(108, 58, 230)', // Action links in feature cards
    success: 'rgb(0, 95, 67)',
    black: 'rgb(0, 0, 0)', // Error pages
  },

  /** Background colors */
  background: {
    white: '#ffffff',
    ghost: 'rgba(19, 0, 50, 0.05)',
    transparent: 'transparent',
  },

  /** Border colors */
  border: {
    subtle: 'rgba(19, 0, 50, 0.1)',
    medium: 'rgba(19, 0, 50, 0.5)',
    white: 'rgba(255, 255, 255, 0.5)',
  },
} as const;

// ============================================================================
// SHELL DIMENSIONS
// ============================================================================

export const shell = {
  /** GlobalNav (header) */
  globalNav: {
    height: 64,
    padding: '0px 16px',
    borderBottom: `1px solid ${colors.border.subtle}`,
  },

  /** LocalNav (sidebar) */
  localNav: {
    width: 280,
    collapsedWidth: 56,
  },

  /** Content area */
  content: {
    offsetLeft: 280, // sidebar width
    offsetTop: 64, // header height
  },

  /** Footer */
  footer: {
    height: 51,
    padding: '0px 24px',
  },
} as const;

// ============================================================================
// COMPONENT DIMENSIONS
// ============================================================================

export const components = {
  /** Buttons */
  button: {
    height: 40,
    heightCompact: 32,
    borderRadius: 4,
    padding: '4px 12px',
    paddingCompact: '4px 8px',
    fontSize: 16,
    fontWeight: 500,
  },

  /** Inputs */
  input: {
    height: 32,
    fontSize: 16,
    borderRadius: 4,
  },

  /** Search input */
  searchInput: {
    width: 366,
    height: 30,
    fontSize: 16,
  },

  /** Tabs */
  tabs: {
    height: 44,
    padding: '12px 20px',
    fontSize: 14,
    fontWeightActive: 500,
    fontWeightInactive: 400,
  },

  /** Table */
  table: {
    headerHeight: 49,
    rowHeight: 68,
    rowHeightExpanded: 87,
    cellPadding: '4px 16px',
    headerFontSize: 12,
    headerFontWeight: 600,
    cellFontSize: 14,
    cellFontWeight: 400,
  },

  /** Nav items */
  navItem: {
    height: 48,
    padding: '11px 15px 11px 23px',
    fontSize: 14,
    fontWeightActive: 600,
    fontWeightInactive: 400,
  },

  /** Avatar */
  avatar: {
    size: 40,
    borderRadius: '9999px',
    fontSize: 16,
  },

  /** Icon button */
  iconButton: {
    size: 40,
    sizeSmall: 32,
  },

  /** Toggle */
  toggle: {
    width: 44,
    height: 32,
  },

  /** Badge */
  badge: {
    padding: '0px 8px',
    fontSize: 12,
    fontWeight: 500,
    borderRadius: 4,
  },

  /** Cards */
  card: {
    borderRadius: 4,
    border: `1px solid ${colors.border.subtle}`,
    padding: 16,
  },

  /** Charts */
  chart: {
    width: 550,
    height: 305,
    containerWidth: 584,
    containerHeight: 400,
  },
} as const;

// ============================================================================
// BUTTON VARIANTS
// ============================================================================

export const buttonVariants = {
  primary: {
    background: colors.brand.primary,
    color: colors.text.white,
    border: 'none',
    height: components.button.height,
    padding: components.button.padding,
    borderRadius: components.button.borderRadius,
  },
  secondary: {
    background: colors.background.ghost,
    color: colors.text.primary,
    border: 'none',
    height: components.button.height,
    padding: components.button.padding,
    borderRadius: components.button.borderRadius,
  },
  outline: {
    background: colors.background.transparent,
    color: colors.text.primary,
    border: `1px solid ${colors.border.medium}`,
    height: components.button.height,
    padding: components.button.padding,
    borderRadius: components.button.borderRadius,
  },
  ghost: {
    background: colors.background.transparent,
    color: colors.text.primary,
    border: 'none',
    height: components.button.height,
    padding: components.button.padding,
    borderRadius: components.button.borderRadius,
  },
  filter: {
    background: colors.background.transparent,
    color: colors.text.primary,
    border: `1px solid ${colors.border.medium}`,
    height: components.button.heightCompact,
    padding: '0px 8px 0px 12px',
    borderRadius: components.button.borderRadius,
  },
} as const;

// ============================================================================
// PAGE TEMPLATES
// ============================================================================

export const pageTemplates = {
  /** List page (Navigator style) */
  list: {
    hasSidebar: true,
    sidebarWidth: shell.localNav.width,
    components: [
      'PageHeader',
      'InfoBanner?',
      'ActionBar',
      'DataTable',
      'Pagination',
    ],
  },

  /** Detail page */
  detail: {
    hasSidebar: false,
    hasRightSidebar: true,
    rightSidebarWidth: 250,
    components: [
      'DetailHeader',
      'AlertBanner?',
      'Tabs',
      'ContentArea',
      'DocumentsSidebar',
    ],
  },

  /** Dashboard page */
  dashboard: {
    hasSidebar: false,
    components: [
      'HeroBanner',
      'WidgetGrid',
      'ActivitySection',
    ],
  },

  /** Settings page */
  settings: {
    hasSidebar: true,
    sidebarWidth: shell.localNav.width,
    contentMaxWidth: 800,
    components: [
      'SettingsNav',
      'FormSections',
      'SaveCancelFooter',
    ],
  },

  /** Wizard page */
  wizard: {
    hasSidebar: false,
    contentMaxWidth: 900,
    components: [
      'Stepper',
      'StepContent',
      'WizardFooter',
    ],
  },

  /** Feature intro/onboarding page */
  featureIntro: {
    hasSidebar: true,
    sidebarWidth: shell.localNav.width,
    components: [
      'HeroTitle', // 32px, 600 weight
      'BodyText',
      'SectionHeader', // 24px, 600 weight
      'FeatureCardGrid',
    ],
  },

  /** Error page (404) */
  error: {
    hasSidebar: false,
    centered: true,
    components: [
      'ErrorIllustration',
      'ErrorTitle', // 32px, 700 weight
      'ErrorDescription',
      'GoBackButton',
    ],
  },

  /** Admin dashboard (Pass 2) */
  adminDashboard: {
    hasSidebar: true,
    sidebarWidth: shell.localNav.width,
    hasRightSidebar: true, // Promo cards
    rightSidebarWidth: 300,
    typographyWeight: 'heavy', // 700 weight titles
    components: [
      'AccountHeader', // Account name + ID
      'PromoBanner', // With illustration
      'SearchCard', // Find a Setting or User
      'NotificationsCard',
      'PromoSidebar', // Right side promo cards
    ],
  },

  /** Admin settings page (Pass 2) */
  adminSettings: {
    hasSidebar: true,
    sidebarWidth: shell.localNav.width,
    typographyWeight: 'heavy', // 700 weight titles
    components: [
      'PageTitle', // 32px, 700 weight
      'PageDescription',
      'FormSections', // With H2 section headers
      'CheckboxGroups',
      'DropdownFields',
      'LinkButtons', // Navigate to sub-pages
    ],
  },

  /** Reports/Analytics page (Pass 2) */
  reports: {
    hasSidebar: true,
    sidebarWidth: shell.localNav.width,
    components: [
      'PageHeader',
      'InfoBanner?', // "We've updated the Reports page"
      'SearchCombobox',
      'RecentsCard',
      'FavoritesCard',
      'ChartCardGrid', // 584px × 400px cards
    ],
  },
} as const;

// ============================================================================
// STATUS COLORS
// ============================================================================

export const statusColors = {
  active: colors.text.success,
  inactive: colors.text.secondary,
  expired: colors.text.secondary,
  voided: colors.text.secondary,
  pending: colors.text.primary,
  completed: colors.text.success,
} as const;

// ============================================================================
// STATUS BADGE VARIANTS (with backgrounds)
// ============================================================================

export const statusBadges = {
  active: {
    background: 'rgb(185, 246, 221)', // Light green
    color: 'rgb(0, 95, 67)', // Dark green
    padding: '0px 8px',
    borderRadius: 4,
    fontSize: 12,
    fontWeight: 500,
  },
  inactive: {
    background: 'rgb(240, 239, 240)', // Light gray
    color: 'rgba(19, 0, 50, 0.7)', // Muted
    padding: '0px 8px',
    borderRadius: 4,
    fontSize: 12,
    fontWeight: 500,
  },
  new: {
    background: 'rgb(43, 40, 67)', // Dark purple
    color: '#ffffff',
    padding: '0px 8px',
    borderRadius: 4,
    fontSize: 12,
    fontWeight: 500,
  },
} as const;

// ============================================================================
// ADMIN TYPOGRAPHY (Pass 2 - heavier than main app)
// ============================================================================

export const adminTypography = {
  /** Admin page title - bold unlike main app */
  pageTitle: {
    fontSize: '32px',
    fontWeight: 700, // vs 400 in main app
    lineHeight: '48px',
  },

  /** Admin section headers */
  sectionHeader: {
    fontSize: '24px',
    fontWeight: 700,
    lineHeight: '36px',
  },

  /** Account name in sidebar */
  accountName: {
    fontSize: '18.72px',
    fontWeight: 700,
  },

  /** Notification title */
  notificationTitle: {
    fontSize: '18.72px',
    fontWeight: 700,
  },

  /** Promo card title */
  promoCardTitle: {
    fontSize: '24px',
    fontWeight: 600,
    lineHeight: '30px',
  },
} as const;

// ============================================================================
// FORM COMPONENTS (Pass 2)
// ============================================================================

export const formComponents = {
  /** Checkbox */
  checkbox: {
    size: 20,
    rowHeight: 40,
    labelFontSize: 16,
    labelFontWeight: 400,
  },

  /** Radio button */
  radio: {
    size: 20,
    labelFontSize: 16,
    labelFontWeight: 400,
  },

  /** Form dropdown/select */
  dropdown: {
    height: 40,
    heightCompact: 32,
    fontSize: 16,
    fontSizeCompact: 14,
    padding: '0px 8px 0px 12px',
    borderRadius: 4,
  },

  /** Form label */
  label: {
    fontSize: 16,
    fontWeight: 400,
  },

  /** Section description */
  description: {
    fontSize: 16,
    fontWeight: 400,
    lineHeight: '24px',
  },
} as const;

// ============================================================================
// CHART/REPORTS COMPONENTS (Pass 2)
// ============================================================================

export const chartComponents = {
  /** Chart card container */
  chartCard: {
    width: 584,
    height: 400,
    border: '1px solid rgba(19, 0, 50, 0.1)',
    borderRadius: 4,
  },

  /** Card title within chart */
  cardTitle: {
    fontSize: 16,
    fontWeight: 400,
    lineHeight: '22.4px',
  },

  /** Info banner */
  infoBanner: {
    height: 54,
  },
} as const;

// ============================================================================
// HOVER STATES (Pass 3)
// ============================================================================

export const hoverStates = {
  /** Primary button hover */
  primaryButton: {
    default: 'rgb(38, 5, 89)',
    hover: 'rgb(43, 4, 127)', // Lighter purple
  },

  /** Ghost/secondary button hover */
  ghostButton: {
    default: 'transparent',
    hover: 'rgba(19, 0, 50, 0.05)', // Light gray
  },

  /** Nav item hover */
  navItem: {
    default: 'transparent',
    hover: 'rgba(19, 0, 50, 0.05)',
    activeBackground: 'rgba(19, 0, 50, 0.05)',
    activeBorderLeft: '4px solid rgb(38, 5, 89)',
  },

  /** Table row hover */
  tableRow: {
    default: 'transparent',
    hover: 'rgba(19, 0, 50, 0.02)', // Very subtle
  },

  /** Link states */
  link: {
    color: 'rgb(36, 99, 209)',
    textDecoration: 'none',
    hoverTextDecoration: 'underline',
  },
} as const;

// ============================================================================
// RESPONSIVE BREAKPOINTS (Pass 3)
// ============================================================================

export const responsive = {
  /** Breakpoint values */
  breakpoints: {
    mobile: 375,
    tablet: 768,
    desktop: 1024,
    wide: 1280,
  },

  /** Sidebar behavior */
  sidebar: {
    collapseAt: 768, // Sidebar hidden below this
    mobileMenuType: 'hamburger', // 3-line icon
  },

  /** Table behavior */
  table: {
    horizontalScrollAt: 768, // Enable scroll below this
    hideColumnsAt: 768, // Start hiding columns below this
  },

  /** Mobile-specific */
  mobile: {
    contentPadding: 16,
    showBackArrow: true,
    fullWidthContent: true,
  },
} as const;

// ============================================================================
// Z-INDEX LAYERS
// ============================================================================

export const zIndex = {
  base: 0,
  sticky: 10,
  navigation: 100,
  dropdown: 200,
  modal: 300,
  toast: 400,
} as const;

// ============================================================================
// BREAKPOINTS
// ============================================================================

export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

// ============================================================================
// COMPONENT COMPOSITION (Pass 4)
// ============================================================================

/**
 * Vertical composition patterns for list pages (Navigator-style)
 */
export const listPageComposition = {
  /** Spacing between components */
  spacing: {
    globalNavToContent: 32, // Content padding from header
    titleToBanner: 16, // H1 to info banner
    bannerToActionBar: 0, // Adjacent, no gap
    actionBarToTable: 85, // Large gap before table
  },

  /** Component positions (from top) */
  positions: {
    globalNav: { top: 0, height: 64 },
    pageTitle: { top: 96, height: 40 },
    infoBanner: { top: 152, height: 60 },
    actionBar: { top: 212, height: 48 },
    tableHeader: { top: 345, height: 49 },
    tableRow: { height: 68 }, // Repeating rows
  },
} as const;

/**
 * ActionBar horizontal composition
 */
export const actionBarComposition = {
  /** Element gaps */
  gaps: {
    dropdownToSearch: 53,
    searchToIcons: 9,
    betweenFilters: 8, // Consistent 8px gap
    iconButtons: 8,
  },

  /** Element widths */
  widths: {
    searchInput: 366,
    filterButton: 85,
    statusFilter: 87,
    partiesFilter: 89,
    agreementTypeFilter: 148,
    iconButton: 32,
  },
} as const;

/**
 * Pagination horizontal composition
 */
export const paginationComposition = {
  /** Layout pattern: split (left/right) */
  layout: 'split',

  /** Left side */
  left: {
    pageSizeDropdown: { width: 136, height: 32 },
  },

  /** Right side */
  right: {
    prevButton: { width: 32, height: 32 },
    nextButton: { width: 32, height: 32 },
    gap: 4, // Between prev/next buttons
  },
} as const;

/**
 * Templates page composition (with sub-tabs)
 */
export const templatesPageComposition = {
  /** Sub-tabs position */
  subTabs: {
    top: 64, // Immediately below GlobalNav (no gap)
    height: 43.5,
    leftAlignWithContent: 360,
  },

  /** Sidebar sections */
  sidebarSections: {
    sectionHeaderHeight: 32,
    itemHeight: 32,
    sectionGap: 16,
  },
} as const;

/**
 * Error page composition (centered layout)
 */
export const errorPageComposition = {
  layout: 'centered',
  hasSidebar: false,

  positions: {
    illustration: { top: 64, height: 200 },
    errorTitle: { top: 305 },
    errorDescription: { top: 357 },
    goBackButton: { top: 397 },
  },
} as const;

/**
 * Composition rules summary
 */
export const compositionRules = {
  /** Content padding from GlobalNav */
  contentTopPadding: 32,

  /** Related elements gap (title → banner) */
  relatedElementGap: 16,

  /** Adjacent elements (no gap) */
  adjacentElementGap: 0,

  /** Large visual break (before tables) */
  largeBreakGap: 85,

  /** Consistent filter button gap */
  filterButtonGap: 8,

  /** Sub-tabs position (no gap from GlobalNav) */
  subTabsTopPosition: 64,
} as const;

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type Spacing = typeof spacing;
export type Typography = typeof typography;
export type Colors = typeof colors;
export type Shell = typeof shell;
export type Components = typeof components;
export type ButtonVariant = keyof typeof buttonVariants;
export type PageTemplate = keyof typeof pageTemplates;
export type StatusColor = keyof typeof statusColors;
export type StatusBadge = keyof typeof statusBadges;

// ============================================================================
// DEFAULT EXPORT
// ============================================================================

export const layoutPresets = {
  spacing,
  typography,
  colors,
  shell,
  components,
  buttonVariants,
  pageTemplates,
  statusColors,
  statusBadges,
  adminTypography,
  formComponents,
  chartComponents,
  hoverStates,
  responsive,
  zIndex,
  breakpoints,
  // Pass 4: Composition patterns
  listPageComposition,
  actionBarComposition,
  paginationComposition,
  templatesPageComposition,
  errorPageComposition,
  compositionRules,
} as const;

export default layoutPresets;
