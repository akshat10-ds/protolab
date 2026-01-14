---
entry: handler.js
---

# Prototype Generator Handler

This folder contains a minimal Node.js handler for the `prototype-generator` skill.

Usage (local):

- `node handler.js list-components` — list components from `COMPONENT_CATALOG.md`.
- `node handler.js generate-mockup --title "My Prototype" --desc "Simple header with CTA"` — generate an ASCII mockup plus component suggestions.

This handler is intentionally minimal and meant to be used as a starting point for integrating a full agent runtime.
