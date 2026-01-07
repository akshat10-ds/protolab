module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['@typescript-eslint', 'react'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    // Constraint Enforcement Rules for Design System

    // 1. Prevent direct lucide-react imports and external library imports
    // MUST use Icon component from design system instead
    'no-restricted-imports': ['error', {
      'paths': [{
        'name': 'lucide-react',
        'message': 'Do not import from lucide-react directly. Use the Icon component from @/design-system instead. Example: <Icon name="search" size="medium" />'
      }],
      'patterns': [
        // lucide-react
        {
          'group': ['lucide-react/*'],
          'message': 'Do not import from lucide-react. Use the Icon component from @/design-system instead.'
        },
        // External UI Libraries
        {
          'group': ['@mui/*', '@material-ui/*'],
          'message': 'Use Ink design system components instead of Material UI.'
        },
        {
          'group': ['@chakra-ui/*'],
          'message': 'Use Ink design system components instead of Chakra UI.'
        },
        {
          'group': ['antd', 'antd/*'],
          'message': 'Use Ink design system components instead of Ant Design.'
        },
        {
          'group': ['@radix-ui/*'],
          'message': 'Use Ink primitives or composites instead of Radix UI.'
        },
        {
          'group': ['react-bootstrap', 'react-bootstrap/*'],
          'message': 'Use Ink design system components instead of React Bootstrap.'
        },
        {
          'group': ['@headlessui/*'],
          'message': 'Use Ink design system components instead of Headless UI.'
        },
        // CSS-in-JS Libraries
        {
          'group': ['styled-components', 'styled-components/*'],
          'message': 'Use CSS modules with design tokens instead of styled-components.'
        },
        {
          'group': ['@emotion/*', 'emotion'],
          'message': 'Use CSS modules with design tokens instead of Emotion.'
        },
        {
          'group': ['@stitches/*'],
          'message': 'Use CSS modules with design tokens instead of Stitches.'
        },
        {
          'group': ['linaria', 'linaria/*'],
          'message': 'Use CSS modules with design tokens instead of Linaria.'
        },
        {
          'group': ['@vanilla-extract/*'],
          'message': 'Use CSS modules with design tokens instead of Vanilla Extract.'
        },
        // Icon Libraries
        {
          'group': ['react-icons', 'react-icons/*'],
          'message': 'Use <Icon name="..." /> from @/design-system instead of react-icons.'
        },
        {
          'group': ['@heroicons/*'],
          'message': 'Use <Icon name="..." /> from @/design-system instead of Heroicons.'
        },
        {
          'group': ['phosphor-react', '@phosphor-icons/*'],
          'message': 'Use <Icon name="..." /> from @/design-system instead of Phosphor Icons.'
        },
        {
          'group': ['@fortawesome/*'],
          'message': 'Use <Icon name="..." /> from @/design-system instead of Font Awesome.'
        },
        {
          'group': ['@tabler/icons-react'],
          'message': 'Use <Icon name="..." /> from @/design-system instead of Tabler Icons.'
        },
        // Utility CSS Libraries
        {
          'group': ['tailwindcss', 'tailwindcss/*'],
          'message': 'Use CSS modules with design tokens instead of Tailwind CSS.'
        },
        {
          'group': ['tachyons', 'tachyons/*'],
          'message': 'Use CSS modules with design tokens instead of Tachyons.'
        },
        {
          'group': ['bootstrap', 'bootstrap/*'],
          'message': 'Use Ink design system components instead of Bootstrap.'
        },
        // Animation Libraries (WARN - legitimate uses exist)
        {
          'group': ['react-spring', 'react-spring/*'],
          'message': 'Ensure animations use design system motion tokens if using react-spring.'
        },
        {
          'group': ['gsap', 'gsap/*'],
          'message': 'Ensure animations use design system motion tokens if using GSAP.'
        },
        // Internal Design System Paths (force barrel imports)
        {
          'group': ['@/design-system/*/*', '!@/design-system/index'],
          'message': 'Import from @/design-system barrel export, not internal paths. Use: import { Component } from "@/design-system"'
        }
      ]
    }],

    // 2. Warn on inline style prop usage
    // Should use design tokens and component props instead
    'react/forbid-component-props': ['warn', {
      'forbid': [{
        'propName': 'style',
        'message': 'Avoid inline styles. Use design tokens (var(--ink-*)) or component props instead.'
      }]
    }],

    // 3. Warn on DOM element style prop
    'react/forbid-dom-props': ['warn', {
      'forbid': [{
        'propName': 'style',
        'message': 'Avoid inline styles. Use design system utilities (Stack, Grid) or design tokens instead.'
      }]
    }],

    // 4. Ensure JSX uses double quotes (design system convention)
    'jsx-quotes': ['warn', 'prefer-double'],

    // 5. Warn on console statements (clean code)
    'no-console': ['warn', {
      'allow': ['warn', 'error']
    }],

    // 6. Block <style>, <link>, and <script> tag injection
    'no-restricted-syntax': ['error',
      {
        'selector': 'JSXElement[openingElement.name.name="style"]',
        'message': 'Do not inject styles via <style> tags. Use CSS modules with design tokens.'
      },
      {
        'selector': 'JSXElement[openingElement.name.name="link"]',
        'message': 'Do not inject external stylesheets via <link> tags. Use CSS modules.'
      },
      {
        'selector': 'JSXElement[openingElement.name.name="script"]',
        'message': 'Avoid inline <script> tags. Use proper module imports.'
      }
    ],

    // 7. Block dangerouslySetInnerHTML (can inject arbitrary styles/HTML)
    'react/no-danger': 'error',

    // 8. Track eslint-disable comments
    'no-warning-comments': ['warn', {
      'terms': ['eslint-disable'],
      'location': 'anywhere'
    }],

    // 9. Warn on @ts-ignore usage
    '@typescript-eslint/ban-ts-comment': ['warn', {
      'ts-expect-error': 'allow-with-description',
      'ts-ignore': true,
      'ts-nocheck': true,
    }],

    // Additional recommended rules from incoming
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'react/prop-types': 'off',
    'react/no-unescaped-entities': 'off',
  },
  ignorePatterns: ['build/', 'dist/', 'node_modules/', '*.config.ts', '*.config.js'],

  // Prototype-specific rules
  overrides: [
    {
      files: ['src/prototypes/**/*.tsx', 'src/examples/**/*.tsx'],
      rules: {
        // Warn when className is used on design system components
        // This catches custom style overrides that should use built-in props
        'no-restricted-syntax': ['warn',
          {
            selector: 'JSXAttribute[name.name="className"][parent.name.name=/^(Button|IconButton|ComboButton|Card|Input|Select|Badge|Chip|Heading|Text|Link|Icon|Modal|Table|List|Tabs|Accordion|Alert|Banner|Callout|Tooltip|Popover|Dropdown|Drawer)$/]',
            message: 'Avoid className on design system components in prototypes. Use built-in props (e.g., inverted, variant, size) instead. If a prop is missing, add it to the component.'
          },
          {
            selector: 'JSXElement[openingElement.name.name="svg"]',
            message: 'Use <Icon name="..." /> from design system instead of inline SVG.'
          }
        ]
      }
    }
  ],
};
