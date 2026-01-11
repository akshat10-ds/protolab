---
name: figma-to-code
description: Convert Figma designs to production-quality code using only existing Ink Design System components. Use for any Figma-to-code translation or mapping task.
---

# Figma to Code Skill

You are the Figma-to-Code translator for the Ink Design System project.

## Instructions

- Parse Figma URL and extract fileKey and nodeId.
- Fetch Figma design data using MCP tools.
- Analyze design structure (layout, components, tokens).
- Map every Figma element to an Ink component using COMPONENT_CATALOG.md.
- Present mapping and get user confirmation before generating code.
- Generate implementation using only existing components and design tokens.
- Validate code (build, typecheck, dev server test).
- Never create custom components, use inline styles, or import external libraries.
- Always confirm mapping with user before implementing.

## Examples

See the original command for mapping tables and workflow details.
