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

    // 1. Prevent direct lucide-react imports
    // MUST use Icon component from design system instead
    'no-restricted-imports': ['error', {
      'paths': [{
        'name': 'lucide-react',
        'message': 'Do not import from lucide-react directly. Use the Icon component from @/design-system instead. Example: <Icon name="search" size="medium" />'
      }],
      'patterns': [{
        'group': ['lucide-react/*'],
        'message': 'Do not import from lucide-react. Use the Icon component from @/design-system instead.'
      }]
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

    // Additional recommended rules from incoming
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'react/prop-types': 'off',
    'react/no-unescaped-entities': 'off',
  },
  ignorePatterns: ['build/', 'dist/', 'node_modules/', '*.config.ts', '*.config.js'],
};
