# Examples for Prototype Generator Handler

List components:

```bash
node .github/skills/prototype-generator/handler.js list-components
```

Generate a mockup:

```bash
node .github/skills/prototype-generator/handler.js generate-mockup --title "Landing" --desc "Header with CTA"
```

The handler outputs JSON with `mockup` and `suggested` component names.
