/**
 * ESLint Configuration for Design System Hierarchy Enforcement
 *
 * This configuration enforces the 6-layer hierarchy rules:
 * 1. Tokens - no dependencies
 * 2. Utilities - only tokens
 * 3. Primitives - only tokens, utilities, and Icon
 * 4. Composites - only tokens, utilities, primitives
 * 5. Patterns - only layers 1-4
 * 6. Layouts - only layers 1-5
 */

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    // Enforce import restrictions based on hierarchy
    'no-restricted-imports': ['error', {
      patterns: [
        {
          group: ['**/components/**'],
          message: 'Do not import from old /components structure. Use layer-based imports (1-tokens, 2-utilities, 3-primitives, 4-composites, 5-patterns, 6-layouts)'
        },
        {
          group: ['**/icons/**'],
          message: 'Do not import from old /icons structure. Import Icon from 3-primitives/Icon'
        }
      ]
    }]
  },
  overrides: [
    // ========================================================================
    // Layer 1: TOKENS - No dependencies
    // ========================================================================
    {
      files: ['1-tokens/**/*'],
      rules: {
        'no-restricted-imports': ['error', {
          patterns: [
            {
              group: ['../**'],
              message: 'Layer 1 (Tokens) cannot import from any other layer'
            }
          ]
        }]
      }
    },

    // ========================================================================
    // Layer 2: UTILITIES - Only Layer 1
    // ========================================================================
    {
      files: ['2-utilities/**/*'],
      rules: {
        'no-restricted-imports': ['error', {
          patterns: [
            {
              group: ['**/3-primitives/**', '**/4-composites/**', '**/5-patterns/**', '**/6-layouts/**'],
              message: 'Layer 2 (Utilities) can only import from Layer 1 (Tokens). No component imports allowed.'
            }
          ]
        }]
      }
    },

    // ========================================================================
    // Layer 3: PRIMITIVES - Only Layers 1-2 (+ Icon)
    // ========================================================================
    {
      files: ['3-primitives/**/*'],
      excludedFiles: ['3-primitives/Icon/**/*'],
      rules: {
        'no-restricted-imports': ['error', {
          patterns: [
            {
              group: ['**/3-primitives/**/!(Icon)', '../*/!(Icon)'],
              message: 'Layer 3 (Primitives) cannot import from other primitives (except Icon). Use tokens and utilities only.'
            },
            {
              group: ['**/4-composites/**', '**/5-patterns/**', '**/6-layouts/**'],
              message: 'Layer 3 (Primitives) cannot import from Layers 4-6. Primitives are atomic and should only use tokens and utilities.'
            }
          ]
        }]
      }
    },

    // ========================================================================
    // Layer 4: COMPOSITES - Only Layers 1-3
    // ========================================================================
    {
      files: ['4-composites/**/*'],
      rules: {
        'no-restricted-imports': ['error', {
          patterns: [
            {
              group: ['../*', '**/4-composites/**'],
              message: 'Layer 4 (Composites) cannot import from other composites. Use shared primitives instead.'
            },
            {
              group: ['**/5-patterns/**', '**/6-layouts/**'],
              message: 'Layer 4 (Composites) cannot import from Layers 5-6. Composites should only use primitives, utilities, and tokens.'
            }
          ]
        }]
      }
    },

    // ========================================================================
    // Layer 5: PATTERNS - Only Layers 1-4
    // ========================================================================
    {
      files: ['5-patterns/**/*'],
      rules: {
        'no-restricted-imports': ['error', {
          patterns: [
            {
              group: ['**/6-layouts/**'],
              message: 'Layer 5 (Patterns) cannot import from Layer 6 (Layouts). Patterns are used BY layouts, not the other way around.'
            },
            {
              group: ['../*'],
              message: 'Layer 5 (Patterns) should not import from other patterns at the same level. Consider if one should be a composite instead.'
            }
          ]
        }]
      }
    },

    // ========================================================================
    // Layer 6: LAYOUTS - Can use Layers 1-5
    // ========================================================================
    {
      files: ['6-layouts/**/*'],
      rules: {
        'no-restricted-imports': ['error', {
          patterns: [
            {
              group: ['../*'],
              message: 'Layer 6 (Layouts) should not import from other layouts. Each layout should be independent.'
            }
          ]
        }]
      }
    }
  ]
};
