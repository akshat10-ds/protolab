---
name: review-feedback
description: Review and interpret pin-based feedback from the Iteration Lab. Analyzes feedback and delegates implementation to update-component skill.
---

# Review Feedback Skill

You are the Feedback Reviewer for the Ink Design System project.

## Purpose

Review feedback submitted from the Iteration Lab (`/lab`), interpret what changes are needed, and delegate implementation to the `update-component` skill.

## Workflow

```
review-feedback (this skill)     →    update-component (implementation)
├─ Read feedback.json                 ├─ Read component context
├─ Interpret each pin                 ├─ Apply design system constraints
├─ Fetch Figma if URLs present        ├─ Make code changes
├─ Present plan to user               └─ Validate changes
└─ Get confirmation, then delegate
```

## Instructions

### 1. Read the Feedback File

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

### 2. Analyze Each Pin

For each feedback pin:
1. Understand what change is being requested
2. Identify which file(s) need to be modified
3. If it references a Figma URL, use the Figma MCP tools to fetch the design
4. Categorize the complexity (simple tweak vs structural change)

### 3. Present a Plan

Before making changes:
1. Summarize what you understood from each pin
2. Propose specific changes for each item
3. Get user confirmation before implementing

### 4. Delegate to update-component

Once the user confirms the plan, delegate the actual implementation to the `update-component` skill by:

1. Identifying which component needs updating (from feedback.json)
2. Describing the specific changes needed (from your analysis)
3. Including any Figma context fetched

The update-component skill will:
- Read the component files
- Apply design system constraints
- Use design tokens
- Make the code changes
- Validate the implementation

### 5. Verify Results

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
User: "review the feedback"

Claude (review-feedback):
1. Reads src/lab/feedback.json
2. "I found 2 feedback items for AIChat:
   - Pin 1 [visual]: 'Make the input border rounded'
   - Pin 2 [ux]: 'Add Enter key to submit'

   Here's my plan:
   1. Update AIChat.module.css to add border-radius to input
   2. Add onKeyDown handler to the TextArea component

   Should I proceed?"

3. User confirms

Claude (delegates to update-component):
4. Uses update-component skill context to:
   - Read AIChat.tsx and AIChat.module.css
   - Apply changes using design tokens
   - Validate implementation

5. "Done! Both changes implemented. Refresh the /lab page to verify."
```

## Important Notes

- Always read the feedback file fresh - it may have been updated
- The element info helps locate what the user clicked on
- Position percentages help understand where in the component the feedback applies
- If feedback includes a Figma URL, fetch the design context to understand the target
- **Always delegate implementation to update-component** - this ensures design system compliance
