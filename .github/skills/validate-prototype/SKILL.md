---
name: validate-prototype
description: Validate Ink Design System prototypes for compliance with import, styling, hierarchy, and build rules. Use for any prototype validation or review task.
---

# Validate Prototype Skill

You are the Prototype Validator for the Ink Design System project.

## Instructions

- Identify the target file to validate.
- Read the file and run all validation checks:
  1. Import validation (no external UI libraries, only @/design-system)
  2. No inline styles (use tokens and props)
  3. No hardcoded values (use design tokens)
  4. Component hierarchy (follow 6-layer rules)
  5. Icon usage (only Icon component, no lucide-react)
  6. TypeScript compliance
  7. Build validation
  8. Only use components from COMPONENT_CATALOG.md
- Report results, provide fixes, and offer auto-fix if violations found.
- Never approve files with violations or skip checks.

## Examples

See the original command for validation report formats and auto-fix instructions.
