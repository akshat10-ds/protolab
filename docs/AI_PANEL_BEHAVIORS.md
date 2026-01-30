# AI Panel Behaviors Documentation

This document catalogs all nuanced behaviors and interactions implemented in the AI panel across prototypes.

---

## Table of Contents

1. [Panel States & Modes](#1-panel-states--modes)
2. [Message Handling](#2-message-handling)
3. [Thinking Steps & Agent Reasoning](#3-thinking-steps--agent-reasoning)
4. [Agent Actions](#4-agent-actions)
5. [Citation & Document Canvas](#5-citation--document-canvas)
6. [Animations & Transitions](#6-animations--transitions)
7. [Attention-Drawing Behaviors](#7-attention-drawing-behaviors)
8. [Keyboard Shortcuts](#8-keyboard-shortcuts)
9. [Resize & Layout Behaviors](#9-resize--layout-behaviors)
10. [Sidebar Interactions](#10-sidebar-interactions)
11. [Scroll Behaviors](#11-scroll-behaviors)
12. [Quick Actions & Suggestions](#12-quick-actions--suggestions)
13. [Error States](#13-error-states)
14. [Edge Cases & Special Rendering](#14-edge-cases--special-rendering)

---

## 1. Panel States & Modes

### Panel Width States

| State | Width | Characteristics |
|-------|-------|-----------------|
| **Closed** | 0px | Completely hidden |
| **Narrow** | 360-699px | Primary chat view, overflow menu for header buttons |
| **Expanded** | 700px+ | Full-width layout, inline history sidebar, all header buttons visible |
| **Full Screen** | Window width | Maximum expansion for document viewing |

### Breakpoint Constants

```typescript
MIN_WIDTH = 360px          // Minimum panel width
NARROW_BREAKPOINT = 700px  // Document canvas takes full width with back button
OVERFLOW_THRESHOLD = 420px // Header shows overflow menu vs inline icons
INLINE_HISTORY = 800px     // History sidebar inline vs modal overlay
```

### Panel Open Behavior
- **Transition**: 250ms cubic-bezier(0.4, 0, 0.2, 1)
- **On first open at narrow width**: Shows "Go wide!" tooltip on drag handle
- **Context attention**: If agreements loaded, triggers ripple on context pill (300ms delay)

---

## 2. Message Handling

### Message States

| Status | Description | Visual |
|--------|-------------|--------|
| `sending` | Message queued/in-flight | Loading indicator |
| `sent` | Successfully delivered | Normal display |
| `error` | Failed delivery | Error icon + "Failed to send" + Retry button |

### Message Matching System

The panel uses a priority-based matching system for scripted responses:

```
1. Exact match: content === scriptedKey
2. Prefix match: content.startsWith(`${key}:`)
3. Action marker: content.includes(`[Action: ${key}]`)
```

### Text Streaming Behavior
- **Interval**: 30ms between words
- **Effect**: Typewriter-style word-by-word reveal
- **Completion**: Triggers rich message data loading when done

### Long User Message Handling
- **Threshold**: >300 characters OR 5+ lines
- **Default state**: Collapsed with "Show more" chevron
- **Click**: Toggles expanded/collapsed
- **Tracking**: `expandedUserMessages` Set tracks state per message ID

### Assistant Message Rendering
- Messages only render once they have content (prevents empty gray bubble flash)
- System messages render as caption-only gray text

---

## 3. Thinking Steps & Agent Reasoning

### Thinking Step Statuses

| Status | Icon | Behavior |
|--------|------|----------|
| `pending` | Circle outline | Awaiting execution |
| `active` | Pulsing dot | Shows progress bar + streaming text + tool calls |
| `complete` | Checkmark | Shows duration (e.g., "2.3s") |
| `error` | X icon | Failed with error message |

### Thinking Sequence Flow

```
1. Initialize all steps as pending
2. Progressive reveal loop:
   ├── Mark step as active
   ├── Show progress bar (0% → 100%)
   ├── Simulate streaming text (typewriter effect)
   ├── Simulate tool call (for steps 2 & 4)
   ├── Variable step durations (realism)
   └── Small delay between steps (200ms)
3. Mark all steps complete
4. Stream response text after thinking
5. Add rich message/conflict data
```

### Tool Call Visualization
- Terminal-style display during step execution
- Shows: Tool name + parameters in real-time
- Updates as tool executes

### Active Step Behaviors
- Auto-scrolls to keep active step visible
- Progress bar animates from 0-100%
- Streaming text shows incremental output
- Tool calls appear in terminal-style block

---

## 4. Agent Actions

### Action Lifecycle

```
proposed → executing → complete
              ↓
           cancelled
              ↓
            error → (retry) → proposed
```

### Action Statuses

| Status | Visual | User Actions |
|--------|--------|--------------|
| `proposed` | Action card with details | Execute, Dismiss buttons |
| `executing` | Progress bar + streaming output | None (in progress) |
| `complete` | Success checkmark + results/artifacts | View artifacts |
| `cancelled` | Cancelled badge | None |
| `error` | Error message | Retry button |

### Action Types & Icons

| Type | Icon | Description |
|------|------|-------------|
| `analyze` | magnifying-glass | Analysis tasks |
| `draft` | document | Document drafting |
| `route` | arrow-right | Routing/forwarding |
| `schedule` | calendar | Scheduling tasks |
| `generate` | sparkles | Content generation |
| `update` | pencil | Update operations |
| `notify` | bell | Notification tasks |

### Execution Behavior
- **Execute**: Sets `executing`, simulates 2000ms work, shows result
- **Cancel**: Immediately sets `cancelled`
- **Retry**: Resets to `proposed`, clears result, allows re-execution

### Result Display
- **Success**: Output string + artifact list (generated files)
- **Artifacts**: Render as clickable tags with document icon
- **Error**: Error message + retry button

---

## 5. Citation & Document Canvas

### Citation Structure

```typescript
{
  id: string,
  documentId: string,
  documentTitle: string,
  section: string,
  excerpt: string
}
```

### Citation Tooltip
- **Trigger**: Hover on citation badge
- **Content**: Source label, document title, excerpt (max 100 chars)
- **Max excerpt**: Truncated with "..." if longer

### Document Canvas Behaviors

| Condition | Behavior |
|-----------|----------|
| Panel narrow (<700px) | Canvas takes full width with back button |
| Panel wide (>=700px) | Canvas takes ~60% width inline |
| Opening | 400ms loading skeleton for polish |
| Closing | Restores previous scroll position |

### Scroll Position Preservation
1. **Save**: Captures scroll position before opening canvas
2. **Open canvas**: Canvas displays with loading skeleton
3. **Close canvas**: Restores saved scroll position
4. **Smooth scroll**: 100ms delay for DOM update

### Document Canvas Features
- Full document view with page navigation
- Citation highlighting on current page
- Page thumbnails sidebar
- Previous/Next page buttons (disabled at boundaries)

---

## 6. Animations & Transitions

### Panel Transitions
- **Open/close**: 250ms cubic-bezier(0.4, 0, 0.2, 1)
- **Resize**: Real-time during drag, smooth release

### Welcome Animations
- **Trigger**: Panel open or "New Chat" action
- **Implementation**: `welcomeKey` state forces re-mount
- **Greeting**: Staggered fade-slide-in (200ms per element)
- **Suggestions**: Cascade with progressive delays

### Shared Element Transition (Agreement → Document)
1. User clicks agreement in sidebar
2. Ghost element created at source position
3. Ghost morphs to document canvas position (250ms)
4. Content: Icon + agreement filename
5. Canvas opens as ghost completes

### Drag Handle Animation
- **Hover**: Bar opacity increases
- **Active**: Bar fully visible
- **Cursor**: `ew-resize` (east-west resize)

---

## 7. Attention-Drawing Behaviors

### Context Attention Animation
- **Trigger**: Panel opens with agreements loaded
- **Delay**: 300ms after open for smooth cascade
- **Effect**: Ripple animation on context source pill
- **Duration**: Auto-dismisses after 1500ms

### Input Attention Animation
- **Trigger**: Quick action populates input field
- **Effect**: Ripple animation on input container
- **Duration**: Auto-dismisses after 700ms
- **Purpose**: Draws eye to filled input

### "Go Wide!" Tooltip
- **Trigger**: First time panel opens at narrow width
- **Location**: On drag handle
- **Dismissal**: User drags to resize OR clicks dismiss
- **Persistence**: Only shows once per session

---

## 8. Keyboard Shortcuts

### Global Shortcuts

| Shortcut | Action |
|----------|--------|
| `Cmd/Ctrl + Enter` | Send message (when in input) |
| `Escape` | Close in priority order (see below) |

### Escape Key Priority

```
1. Document canvas open → Close canvas
2. History sidebar open → Close history
3. Agreements sidebar open → Close agreements
4. AI panel open → Close panel
```

---

## 9. Resize & Layout Behaviors

### Drag Handle
- **Width**: 16px hit area
- **Visual**: 4px visible bar
- **Cursor**: `ew-resize`
- **Constraints**: MIN_WIDTH (360px) to window.innerWidth

### Dynamic Max Width
- Recalculates on window resize
- Prevents panel exceeding viewport
- Smooth constraint enforcement

### Resize Tooltip Dismissal
- "Go wide!" tooltip dismissed on first drag
- Never shows again in session

### Width Persistence
- Panel remembers width between open/close
- Respects constraints on next open

---

## 10. Sidebar Interactions

### History Sidebar

| Panel Width | Display Mode |
|-------------|--------------|
| < 800px | Modal overlay (slides in from left) |
| >= 800px | Inline (takes space from main content) |

### Mutual Exclusivity
- Opening document canvas → Closes agreements sidebar
- Opening agreements sidebar → Closes document canvas
- Both cannot be open simultaneously

### Sidebar Restoration
- If document canvas opened from agreements sidebar
- Closing canvas re-opens agreements sidebar
- Tracked via `docPreviewSource` state

---

## 11. Scroll Behaviors

### Smart Auto-Scroll (AIChat Pattern)

| Event | Scroll Behavior |
|-------|-----------------|
| User sends message | Scroll to bottom (show their message) |
| AI starts response | Scroll to start of response (show beginning) |

- **Timing**: 50ms delay for DOM updates
- **Style**: `behavior: 'smooth'`
- **Opt-out**: `disableAutoScroll` prop for custom handling

### Thinking Steps Auto-Scroll
- Active step automatically scrolled into view
- Keeps current progress visible during long sequences

---

## 12. Quick Actions & Suggestions

### Quick Action Types

| Type | Behavior |
|------|----------|
| **With expansion** | Populates input + triggers input attention |
| **Without expansion** | Sends immediately as suggestion |

### Suggestion Display in Message
- Shows as "Selected" badge in message stream
- Different styling from typed messages
- Tracks origin via `fromSuggestion` metadata

### Checklist Progress
- Completed actions show checkmark
- Actions become disabled after completion
- Title shows: "X of Y done"
- Tracked via `completedSteps` Set

---

## 13. Error States

### Message Delivery Error
- **Visual**: Error icon + "Failed to send" text
- **Action**: Retry button to resend
- **Styling**: Error state in message bubble

### Action Execution Error
- **Visual**: Error section with error icon
- **Message**: Error description displayed
- **Action**: Retry button to re-execute

### Document Loading
- **Loading**: Skeleton displayed (400ms)
- **Not found**: Graceful fallback
- **Page nav**: Disabled at boundaries (first/last page)

---

## 14. Edge Cases & Special Rendering

### Conditional Header Elements

| Condition | Element |
|-----------|---------|
| `messages.length > 0` | Header title visible |
| `agreements.length > 0` | Context source pill visible |
| `panelWidth >= 800px` | History sidebar inline |
| `isOpen === true` | Drag handle visible |

### Special Message Rendering Priority

```
1. Tool UIs (profile form, branding tool, delegation)
2. Branding prompt with Yes/No buttons
3. Rich message with thinking steps + citations
4. Rich message without thinking steps
5. Conflict view with side-by-side comparison
6. User message from suggestion ("Selected" styling)
7. Profile confirmation (with industry/role context)
8. Long user messages (collapsible)
9. Default rendering
```

### Empty State Handling
- Welcome message with greeting
- Suggested questions displayed
- Quick action cards shown
- Context pill if agreements available

---

## Implementation Locations

| Prototype | Path |
|-----------|------|
| Agent Studio | `src/prototypes/agent-studio/components/AIPanel/AIPanel.tsx` |
| Onboarding Agent | `src/prototypes/onboarding-agent/components/AIPanel/AIPanel.tsx` |
| Agreement Studio | `src/prototypes/agreement-studio/components/AIPanel/AIPanel.tsx` |
| Base Pattern | `src/design-system/5-patterns/AIChat/AIChat.tsx` |

---

## State Management Summary

### Core State

| State | Type | Purpose |
|-------|------|---------|
| `messages` | `ChatMessage[]` | All chat messages |
| `isLoading` | `boolean` | AI generating response |
| `isStreaming` | `boolean` | Active streaming (stop button) |
| `streamingText` | `string` | Current streaming text |

### Rich Content State

| State | Type | Purpose |
|-------|------|---------|
| `richMessages` | `Map<string, RichMessageData>` | Tables, lists, citations |
| `conflictMessages` | `Map<string, ConflictData[]>` | Side-by-side comparison |
| `thinkingSteps` | `Map<string, ThinkingStep[]>` | Agent reasoning |
| `agentActions` | `Map<string, AgentAction[]>` | Proposed actions |
| `activeToolCall` | `object \| null` | Current tool execution |

### UI State

| State | Type | Purpose |
|-------|------|---------|
| `panelWidth` | `number` | Current panel width |
| `isExpanded` | `boolean` | Width > 600px |
| `isResizing` | `boolean` | Currently dragging |
| `showResizeTooltip` | `boolean` | "Go wide!" visibility |
| `showContextAttention` | `boolean` | Context pill ripple |
| `showInputAttention` | `boolean` | Input ripple |
| `welcomeKey` | `number` | Forces welcome re-mount |

---

## Data Dependencies

| Constant | Purpose |
|----------|---------|
| `SCRIPTED_RESPONSES` | Rich message templates |
| `CONFLICT_RESPONSES` | Conflict comparison data |
| `THINKING_SEQUENCES` | Agent reasoning definitions |
| `AGENT_ACTIONS` | Proposed action templates |
| `QUICK_ACTIONS` | Suggestion/prompt templates |
| `SUGGESTED_QUESTIONS` | Zero-query state questions |
| `CHAT_HISTORY` | Historical conversations |
| `STORED_CONVERSATIONS` | Pre-loaded threads |

---

*Last updated: January 2026*
