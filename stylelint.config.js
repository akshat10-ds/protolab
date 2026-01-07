module.exports = {
  // Don't extend any config - use only our custom rules
  rules: {
    // Block hardcoded colors in design system - must use design tokens
    'color-no-hex': true,
    'function-disallowed-list': ['rgb', 'rgba', 'hsl', 'hsla'],

    // Warn on !important (some legitimate uses)
    'declaration-no-important': [true, { severity: 'warning' }],

    // Block hardcoded spacing values - must use design tokens
    // Matches: padding: 16px, margin: 8px, gap: 24px, etc.
    'declaration-property-value-disallowed-list': [{
      // Spacing properties - block raw px values
      '/^(padding|margin|gap)$/': ['/^\\d+px$/'],
      '/^(padding|margin)-(top|right|bottom|left)$/': ['/^\\d+px$/'],
      // Allow percentages, vh, vw, auto, 0, tokens
    }, {
      severity: 'warning',
      message: 'Use design tokens (var(--ink-spacing-*)) instead of hardcoded px values.',
    }],

    // Track stylelint-disable comments for auditing
    'comment-pattern': [
      // Allow most comments but flag stylelint-disable for tracking
      '.*',
      {
        severity: 'warning',
        message: 'stylelint-disable found - document reason for disabling.',
      }
    ],
  },
  overrides: [
    {
      // Allow raw colors in tokens, globals, and base files
      files: ['**/1-tokens/**/*.css', '**/tokens.css', 'src/index.css', 'src/styles/globals.css'],
      rules: {
        'color-no-hex': null,
        'function-disallowed-list': null,
      }
    },
    {
      // Allow raw colors in examples (not production code)
      files: ['src/examples/**/*.css'],
      rules: {
        'color-no-hex': null,
        'function-disallowed-list': null,
      }
    },
    {
      // Allow raw colors in prototypes (not production code)
      files: ['src/prototypes/**/*.css'],
      rules: {
        'color-no-hex': null,
        'function-disallowed-list': null,
      }
    }
  ]
};
