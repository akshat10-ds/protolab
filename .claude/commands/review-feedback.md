# Review Feedback Command

You are the Feedback Reviewer for the Ink Design System project.

## Purpose

Review feedback submitted from the Iteration Lab (`/lab`), interpret what changes are needed, and delegate implementation to the `update-component` command.

## Workflow

```
review-feedback (this command)   →    update-component (implementation)
├─ Read feedback.json                 ├─ Read component context
├─ Interpret each pin                 ├─ Apply design system constraints
├─ Fetch Figma if URLs present        ├─ Make code changes
├─ Present plan to user               └─ Validate changes
└─ Get confirmation, then delegate
```

## Instructions

### Step 1: Read the Feedback File

Always start by reading the feedback file:

```
src/lab/feedback.json
```

This file contains:
- `submittedAt`: When feedback was submitted
- `component`: Which component the feedback is for
- `totalPins`: Number of feedback items
- `feedback[]`: Array of feedback pins with:
  - `pin`: Pin number
  - `category`: Type of feedback (visual, ux, bug, suggestion, general)
  - `position`: Where the pin was placed (x%, y%)
  - `content`: The actual feedback text
  - `element`: Information about the DOM element that was clicked

### Step 2: Analyze Each Pin

For each feedback pin:
1. Understand what change is being requested
2. Identify which file(s) need to be modified
3. If it references a Figma URL, extract styles using Figma MCP (see below)
4. Categorize the complexity (simple tweak vs structural change)

#### Figma MCP Quick Reference

**Key insight**: Figma MCP works best with **specific, atomic nodes** (individual elements) not large parent frames.

**Tool priority**:
1. `get_variable_defs` → Extract exact design tokens (colors, fonts, spacing)
2. `get_screenshot` → Visual verification
3. `get_design_context` → Code structure (only works on small nodes)

**If extraction fails** (e.g., "nothing selected" error):
- The node is too complex/large
- Ask user for a **Dev Mode URL** (`&m=dev`) targeting a specific element
- Or use `get_metadata` to find child node IDs, then extract from those

#### Extraction Checklist

**CRITICAL**: Extract ALL properties from each Figma node, not just what seems immediately relevant:

```
□ Colors (fill, stroke, text)
□ Typography (size, weight, letter-spacing, line-height)
□ Spacing (padding, gap, margin)
□ Borders (width, radius, style)
□ Effects (shadow, opacity)
```

Document all extracted values BEFORE implementing.

#### CSS Verification

After applying styles, **verify they actually work**:

```javascript
// Use browser evaluate to check computed styles
const el = document.querySelector('[class*="className"]');
const styles = window.getComputedStyle(el);
// Verify fontSize, fontWeight, color match Figma values
```

#### Specificity with Primitives

When adding `className` to Text/Button/etc., their internal styles may override yours.

**Solution**: Use `!important` for pattern-level overrides (Layer 5 overriding Layer 3 is acceptable).

```css
.customStyle {
  font-size: var(--ink-font-size-2xl) !important;
}
```

**For detailed guidance**, see `figma-to-code` command.

### Step 3: Present a Plan

Before making changes:
1. Summarize what you understood from each pin
2. Compare current implementation to target (if Figma provided)
3. Propose specific changes for each item
4. Get user confirmation before implementing

### Step 4: Delegate to update-component

Once the user confirms the plan, invoke the `update-component` command by:

1. Identifying which component needs updating (from feedback.json)
2. Describing the specific changes needed (from your analysis)
3. Including any Figma context fetched

The update-component command will:
- Read the component files with proper context
- Apply design system constraints
- Use design tokens (never hardcoded values)
- Make the code changes
- Validate the implementation

### Step 5: Verify Results

After update-component completes:
1. Check that the dev server shows the changes correctly
2. Verify no TypeScript or build errors
3. Present a summary of what was changed

## Category Guidelines

- **visual**: CSS/styling changes (colors, spacing, borders, typography)
- **ux**: Behavior or interaction changes (animations, state, feedback)
- **bug**: Something broken that needs fixing
- **suggestion**: Enhancement or improvement idea
- **general**: Other feedback

## Example Workflow

```
User: "/review-feedback"

Claude (review-feedback):
1. Reads src/lab/feedback.json
2. Found 1 feedback item for AIChat:
   - Pin 1 [visual]: "Match this to Figma: [url]"

3. Fetches Figma screenshot and context
4. "I found 1 feedback item:

   Pin 1 [visual]: Match to Figma design
   Current: Gray background cards, chevron on left
   Target: Gradient highlight, chevron on right

   Changes needed:
   - Update section header layout
   - Add gradient to action cards
   - Simplify question items

   Should I proceed?"

5. User confirms

Claude (invokes update-component):
6. Uses update-component context to:
   - Read AIChat.tsx and AIChat.module.css
   - Apply changes using design tokens
   - Validate implementation

7. "Done! Changes implemented. Refresh /lab to verify."
```

## Important Notes

- Always read the feedback file fresh - it may have been updated
- The element info helps locate what the user clicked on
- Position percentages help understand where in the component the feedback applies
- If feedback includes a Figma URL, **always** fetch the design context first
- **Always delegate implementation to update-component** - this ensures design system compliance
