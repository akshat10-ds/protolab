/**
 * ESLint Configuration for Design System Hierarchy Enforcement
 *
 * This configuration enforces the 6-layer hierarchy rules:
 * Layer 1: Tokens     → no dependencies (only CSS files)
 * Layer 2: Utilities  → only Layer 1
 * Layer 3: Primitives → only Layers 1-2 (+ Icon exception)
 * Layer 4: Composites → only Layers 1-3
 * Layer 5: Patterns   → only Layers 1-4
 * Layer 6: Layouts    → only Layers 1-5
 *
 * Key principle: Each layer can ONLY import from LOWER layers, never from
 * the same layer or higher layers.
 */

export default {
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
    // Global rules for legacy imports
    'no-restricted-imports': ['error', {
      patterns: [
        {
          group: ['**/components/**'],
          message: 'Do not import from old /components structure. Use layer-based imports.'
        },
        {
          group: ['**/icons/**'],
          message: 'Do not import from old /icons structure. Import Icon from 3-primitives/Icon.'
        }
      ]
    }]
  },
  overrides: [
    // ========================================================================
    // Layer 1: TOKENS - No dependencies (only CSS variables)
    // ========================================================================
    {
      files: ['1-tokens/**/*.ts', '1-tokens/**/*.tsx'],
      rules: {
        'no-restricted-imports': ['error', {
          patterns: [
            {
              group: ['**/2-utilities/**', '**/3-primitives/**', '**/4-composites/**', '**/5-patterns/**', '**/6-layouts/**'],
              message: 'Layer 1 (Tokens) cannot import from any other layer.'
            }
          ]
        }]
      }
    },

    // ========================================================================
    // Layer 2: UTILITIES - Only Layer 1 (tokens)
    // ========================================================================
    {
      files: ['2-utilities/**/*.ts', '2-utilities/**/*.tsx'],
      rules: {
        'no-restricted-imports': ['error', {
          patterns: [
            {
              group: ['**/3-primitives/**', '**/4-composites/**', '**/5-patterns/**', '**/6-layouts/**'],
              message: 'Layer 2 (Utilities) can only import from Layer 1 (Tokens).'
            }
          ]
        }]
      }
    },

    // ========================================================================
    // Layer 3: PRIMITIVES - Only Layers 1-2 (+ Icon as shared primitive)
    // Primitives can import Icon since it's a foundational primitive
    // ========================================================================
    {
      files: ['3-primitives/**/*.ts', '3-primitives/**/*.tsx'],
      excludedFiles: ['3-primitives/Icon/**/*'],
      rules: {
        'no-restricted-imports': ['error', {
          patterns: [
            {
              group: ['**/4-composites/**', '**/5-patterns/**', '**/6-layouts/**'],
              message: 'Layer 3 (Primitives) cannot import from Layers 4-6.'
            },
            // Block imports from sibling primitives EXCEPT Icon
            {
              group: [
                '**/3-primitives/Button/**',
                '**/3-primitives/Input/**',
                '**/3-primitives/Select/**',
                '**/3-primitives/Checkbox/**',
                '**/3-primitives/Radio/**',
                '**/3-primitives/Switch/**',
                '**/3-primitives/TextArea/**',
                '**/3-primitives/Slider/**',
                '**/3-primitives/Stepper/**',
                '**/3-primitives/Badge/**',
                '**/3-primitives/Avatar/**',
                '**/3-primitives/Chip/**',
                '**/3-primitives/AlertBadge/**',
                '**/3-primitives/StatusLight/**',
                '**/3-primitives/Divider/**',
                '**/3-primitives/Card/**',
                '**/3-primitives/Skeleton/**',
                '**/3-primitives/Typography/**',
                '**/3-primitives/Spinner/**',
                '**/3-primitives/ProgressBar/**',
                '**/3-primitives/Callout/**',
                '**/3-primitives/Banner/**',
                '**/3-primitives/Tooltip/**',
                '**/3-primitives/Link/**',
                '**/3-primitives/IconButton/**'
              ],
              message: 'Layer 3 (Primitives) cannot import from sibling primitives (except Icon). Primitives should be atomic.'
            }
          ]
        }]
      }
    },

    // ========================================================================
    // Layer 4: COMPOSITES - Only Layers 1-3
    // ========================================================================
    {
      files: ['4-composites/**/*.ts', '4-composites/**/*.tsx'],
      rules: {
        'no-restricted-imports': ['error', {
          patterns: [
            {
              group: ['**/5-patterns/**', '**/6-layouts/**'],
              message: 'Layer 4 (Composites) cannot import from Layers 5-6.'
            },
            // Block imports from sibling composites
            {
              group: ['**/4-composites/**'],
              message: 'Layer 4 (Composites) cannot import from sibling composites. Use shared primitives instead.'
            }
          ]
        }]
      }
    },

    // ========================================================================
    // Layer 5: PATTERNS - Only Layers 1-4
    // ========================================================================
    {
      files: ['5-patterns/**/*.ts', '5-patterns/**/*.tsx'],
      rules: {
        'no-restricted-imports': ['error', {
          patterns: [
            {
              group: ['**/6-layouts/**'],
              message: 'Layer 5 (Patterns) cannot import from Layer 6 (Layouts).'
            },
            // Block imports from sibling patterns
            {
              group: ['**/5-patterns/GlobalNav/**', '**/5-patterns/LocalNav/**'],
              message: 'Layer 5 (Patterns) cannot import from sibling patterns.'
            }
          ]
        }]
      }
    },

    // ========================================================================
    // Layer 6: LAYOUTS - Can use Layers 1-5
    // ========================================================================
    {
      files: ['6-layouts/**/*.ts', '6-layouts/**/*.tsx'],
      rules: {
        'no-restricted-imports': ['error', {
          patterns: [
            // Block imports from sibling layouts
            {
              group: ['**/6-layouts/**'],
              message: 'Layer 6 (Layouts) cannot import from sibling layouts. Each layout should be independent.'
            }
          ]
        }]
      }
    }
  ]
};
