# Future Components to Consider

**Created**: 2025-10-29
**Purpose**: Document production components that might be useful for future prototyping needs
**Status**: Reference only - Add when needed, not proactively

---

## 🎯 Philosophy

These components are **NOT missing** from our system. We have 128% coverage of essential components.

These are **nice-to-have** additions that could speed up specific use cases if they come up frequently in prototypes.

**Recommendation**: Don't add these proactively. Add them only when:
1. You've needed to compose this pattern 3+ times
2. The composed version is complex and error-prone
3. It would save significant time in future prototypes

---

## 📝 Components to Consider (3 total)

### 1. EmptyState Component

**Priority**: 🟡 Low-Medium

**What It Is**:
A component that displays an illustration, heading, description, and optional action button for empty states (no data, no search results, error states, etc.).

**Production Reference**: `EmptyState` component in ds-ui

**When You'd Need It**:
- Empty table states ("No results found")
- Empty list states ("No items yet")
- Error states ("Something went wrong")
- First-time user states ("Get started by...")
- Search with no results

**Current Workaround** (Perfectly Fine):
```tsx
import { Card, Typography, Button, Stack, Icon } from '@/design-system';

function EmptyTableState() {
  return (
    <Card style={{ textAlign: 'center', padding: 'var(--ink-spacing-600)' }}>
      <Stack direction="vertical" gap="medium" align="center">
        <Icon name="inbox" size="xlarge" style={{ opacity: 0.3 }} />
        <div>
          <Typography.Heading level={3}>No results found</Typography.Heading>
          <Typography.Text variant="secondary">
            Try adjusting your search or filters
          </Typography.Text>
        </div>
        <Button onClick={handleClear}>Clear filters</Button>
      </Stack>
    </Card>
  );
}
```

**If You Add This Component**:

**API Design**:
```tsx
<EmptyState
  icon="inbox"  // or custom illustration
  heading="No results found"
  description="Try adjusting your search or filters"
  action={{
    label: 'Clear filters',
    onClick: handleClear
  }}
  variant="default"  // default | error | info | success
/>
```

**Implementation Notes**:
- Use Stack for layout
- Use Icon for icon/illustration
- Use Typography for heading/description
- Use Button for action
- Add variants for different contexts (error, info, etc.)
- Support custom illustrations (not just icons)

**Estimated Implementation Time**: 2-3 hours
- Component: 1 hour
- Variants & styles: 1 hour
- Documentation & showcase: 1 hour

**Decision Criteria**: Add when you've manually composed empty states 3+ times

---

### 2. ToastMessage Component

**Priority**: 🟡 Medium

**What It Is**:
Temporary notification that appears at the top/bottom of the screen, automatically dismisses after a few seconds, and can be stacked (multiple toasts visible at once).

**Production Reference**: `ToastMessage` component in ds-ui

**When You'd Need It**:
- Success messages ("Saved successfully")
- Error notifications ("Failed to update")
- Info messages ("New version available")
- Warning messages ("Connection lost")
- Action confirmations ("Item deleted")

**Current Workaround** (Perfectly Fine):
```tsx
import { Banner } from '@/design-system';

// At top of page
{showToast && (
  <Banner
    kind="success"
    onClose={() => setShowToast(false)}
  >
    Saved successfully
  </Banner>
)}

// Or use Alert component
{showToast && (
  <Alert
    kind="success"
    onClose={() => setShowToast(false)}
    style={{ position: 'fixed', top: 20, right: 20 }}
  >
    Saved successfully
  </Alert>
)}
```

**If You Add This Component**:

**API Design**:
```tsx
// Usage with context/hook
const { showToast } = useToast();

showToast({
  message: 'Saved successfully',
  kind: 'success',  // success | error | info | warning
  duration: 3000,   // auto-dismiss after 3s
  position: 'top-right',  // top-right | top-center | bottom-right | bottom-center
  action: {
    label: 'Undo',
    onClick: handleUndo
  }
});
```

**Implementation Notes**:
- Need ToastProvider context
- Need toast manager (queue, stacking, positioning)
- Use Portal for rendering outside normal DOM
- Auto-dismiss with setTimeout
- Support for swipe-to-dismiss
- Animation enter/exit
- Maximum visible toasts (e.g., 3)

**Estimated Implementation Time**: 4-6 hours
- Toast component: 1 hour
- ToastProvider & manager: 2-3 hours
- Animations & transitions: 1 hour
- Documentation & showcase: 1-2 hours

**Decision Criteria**: Add when you need notifications in 3+ prototypes

**Alternative**: Use Banner/Alert positioned fixed for simpler needs

---

### 3. Timeline Component

**Priority**: 🟢 Low

**What It Is**:
Vertical timeline showing events in chronological order with timestamps, descriptions, and optional icons/avatars.

**Production Reference**: `Timeline` component in ds-ui

**When You'd Need It**:
- Activity feeds ("John commented 2 hours ago")
- Order history ("Shipped on May 15")
- Process tracking ("Step 1 complete, Step 2 in progress")
- Audit logs ("User updated settings at 3:45 PM")
- Version history

**Current Workaround** (Perfectly Fine):
```tsx
import { Stack, Avatar, Typography, Badge } from '@/design-system';

function ActivityTimeline({ events }) {
  return (
    <Stack direction="vertical" gap="large">
      {events.map(event => (
        <div key={event.id} style={{ display: 'flex', gap: 'var(--ink-spacing-200)' }}>
          {/* Vertical line */}
          <div style={{
            width: 2,
            background: 'var(--ink-border-default)',
            position: 'relative'
          }}>
            <Avatar
              size="small"
              src={event.user.avatar}
              style={{ position: 'absolute', left: -14 }}
            />
          </div>

          {/* Content */}
          <div>
            <Typography.Text weight="medium">{event.title}</Typography.Text>
            <Typography.Text variant="secondary" size="small">
              {event.timestamp}
            </Typography.Text>
            <Typography.Text>{event.description}</Typography.Text>
          </div>
        </div>
      ))}
    </Stack>
  );
}
```

**If You Add This Component**:

**API Design**:
```tsx
<Timeline>
  <Timeline.Item
    timestamp="2 hours ago"
    icon={<Icon name="comment" />}
    title="John commented"
    description="Added feedback on the design"
  />
  <Timeline.Item
    timestamp="5 hours ago"
    avatar={<Avatar src={user.avatar} />}
    title="Sarah updated status"
    description="Marked as complete"
    status="success"  // Adds colored dot
  />
  <Timeline.Item
    timestamp="Yesterday"
    icon={<Icon name="file" />}
    title="Document uploaded"
  />
</Timeline>
```

**Implementation Notes**:
- Use Stack for vertical layout
- Vertical line connecting items (CSS border or div)
- Support icon or avatar per item
- Optional status colors
- Optional timestamps
- Alternate left/right layout option

**Estimated Implementation Time**: 3-4 hours
- Timeline & TimelineItem components: 2 hours
- Variants & styling: 1 hour
- Documentation & showcase: 1 hour

**Decision Criteria**: Add when activity feeds needed in 2+ prototypes

---

## 🚫 Components NOT to Add

These production components are explicitly **NOT recommended** for the starter:

### Enterprise/DocuSign-Specific (Don't Add)
- CobrandingPreview, EnvelopeCard, DocumentThumbnail, Signature, SignTag, TaskCard, WorkflowStepper
- **Reason**: Company-specific, not applicable to prototypes

### Group Wrappers (Don't Add)
- ButtonGroup, CheckboxGroup, RadioButtonGroup, ChipGroup, TagGroup
- **Reason**: Use Stack/Grid composition instead

### Advanced UI (Don't Add)
- ColorPicker, ColorSwatch, ZoomControl, Hotspot, StarRating, Meter
- **Reason**: Niche use cases, add complexity, rarely needed

### Toolbar Components (Don't Add)
- ToolbarButton, ToolbarColorButton, ToolbarDropdownInput, ToolbarGroup
- **Reason**: Too specialized for rich text editors

---

## 📊 Decision Matrix

When considering adding a component:

| Question | Answer | Action |
|----------|--------|--------|
| Is it in the "Consider" list? | No | Don't add it |
| Have I needed it 3+ times? | No | Keep using workaround |
| Is the workaround complex/error-prone? | No | Keep using workaround |
| Will it save significant time? | No | Keep using workaround |
| Is it DocuSign/enterprise-specific? | Yes | Don't add it |
| Can it be composed from existing? | Yes | Document pattern instead |
| **All checks pass?** | **Yes** | **Add to appropriate layer** |

---

## 📝 How to Add a Component (If Needed)

### 1. Determine the Layer

- **Layer 3 (Primitive)**: If it's atomic and self-contained
- **Layer 4 (Composite)**: If it composes primitives
- **Layer 5 (Pattern)**: If it's a complex UI pattern

### 2. Implementation Checklist

- [ ] Create component in appropriate layer folder
- [ ] Implement core functionality
- [ ] Add TypeScript types
- [ ] Add CSS module for styling
- [ ] Support all necessary variants
- [ ] Add accessibility (ARIA attributes, keyboard navigation)
- [ ] Create README.md with API documentation
- [ ] Add to layer's index.ts export
- [ ] Add to main design-system index.ts
- [ ] Add to COMPONENT_CATALOG.md
- [ ] Add showcase section in ComponentShowcase2.tsx
- [ ] Test in multiple contexts

### 3. Documentation Template

```markdown
# ComponentName

**Layer**: X - [Primitives/Composites/Patterns]
**Status**: Ready
**Added**: YYYY-MM-DD

## Purpose
[What problem does it solve?]

## When to Use
- [Use case 1]
- [Use case 2]

## API
[Props, types, examples]

## Examples
[Code examples]

## Accessibility
[ARIA attributes, keyboard support]
```

---

## 🎯 Summary

**Current Status**: ✅ **No components needed** - 128% essential coverage

**Future Additions**:
- 🟡 EmptyState (Low-Medium priority) - Add after 3+ manual compositions
- 🟡 ToastMessage (Medium priority) - Add when needed in 3+ prototypes
- 🟢 Timeline (Low priority) - Add when activity feeds needed in 2+ prototypes

**Don't Add**: 73 production components that are enterprise/specialized/deprecated

**Philosophy**: Keep the starter lean. Add components only when they save time, not proactively.

---

**Remember**: The goal is rapid prototyping, not feature parity with production. Every component added increases learning curve and maintenance burden. Only add when the benefit clearly outweighs the cost.

---

**Last Updated**: 2025-10-29
**Status**: Reference document for future decisions
