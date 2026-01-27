# AI Chat Input Component Specification

This document provides a complete, self-contained specification for the AI chat input component used in the Agreement Studio prototype. This is intended for engineering teams building out the production implementation.

---

## Overview

The AI Chat input is a multi-line text input with the following features:
- **Auto-resizing** textarea that grows with content
- **Context source pills** showing loaded data sources
- **Attention animations** (ripple effects) to draw user focus
- **Expand/collapse** functionality for long content
- **AI disclaimer** text below the input
- **Send button** with loading state

---

## Component Architecture

```
┌─────────────────────────────────────────────────────────────┐
│ InputArea                                                   │
├─────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ inputContainer                            [Expand btn]  │ │
│ │ ┌─────────────────────────────────────────────────────┐ │ │
│ │ │ TextArea (auto-resize)                              │ │ │
│ │ │ "Ask anything..."                                   │ │ │
│ │ └─────────────────────────────────────────────────────┘ │ │
│ │ ┌──────────────────────┐              ┌───────────────┐ │ │
│ │ │ 📄 15 agreements  ▼  │              │      ↑        │ │ │
│ │ │  (context pill)      │              │ (send button) │ │ │
│ │ └──────────────────────┘              └───────────────┘ │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│  Responses are generated with AI and are not legal advice.  │
│                      (disclaimer)                           │
└─────────────────────────────────────────────────────────────┘
```

---

## Props Interface

### InputArea Props

```typescript
interface InputAreaProps {
  /** Callback when user sends a message */
  onSend: (content: string) => void;

  /** Placeholder text for the input */
  placeholder?: string; // Default: "Ask anything..."

  /** Disable the input */
  disabled?: boolean; // Default: false

  /** Show loading spinner instead of send button */
  isLoading?: boolean; // Default: false

  /** Show "Add source" button */
  showAddSource?: boolean; // Default: true

  /** Callback when add source is clicked */
  onAddSource?: () => void;

  /** Context source to display (replaces "Add source" button) */
  contextSource?: ContextSource;

  /** Show attention animation on context source pill (ripple effect) */
  showContextAttention?: boolean; // Default: false

  /** Show attention animation on input container (ripple effect) */
  showInputAttention?: boolean; // Default: false

  /** Show AI disclaimer below input */
  showDisclaimer?: boolean; // Default: true

  /** Custom disclaimer text */
  disclaimerText?: string; // Default: "Responses are generated with AI and are not legal advice."

  /** Controlled input value (optional - supports uncontrolled mode) */
  value?: string;

  /** Callback when value changes (for controlled mode) */
  onValueChange?: (value: string) => void;
}

interface ContextSource {
  /** Label to display (e.g., "agreements", "documents") */
  label: string;

  /** Count of items in context */
  count: number;

  /** Click handler for the context pill */
  onClick?: () => void;
}
```

---

## Behavior Specifications

### Auto-Resize Textarea

The textarea automatically grows as the user types:

```typescript
// Minimum height: 40px (single line)
// Maximum height: 200px (normal mode)
// Maximum height: 500px (expanded mode)

const adjustTextAreaHeight = useCallback(() => {
  const textarea = textAreaRef.current;
  if (textarea) {
    const minHeight = 40;
    const maxHeight = isExpanded ? 500 : 200;

    // If empty or very short, use min height
    if (!value || value.length < 50) {
      textarea.style.height = `${minHeight}px`;
      return;
    }

    // Reset to auto to get accurate scrollHeight
    textarea.style.height = 'auto';

    // Clamp between min and max
    const newHeight = Math.max(minHeight, Math.min(textarea.scrollHeight, maxHeight));
    textarea.style.height = `${newHeight}px`;
  }
}, [value, isExpanded]);
```

**Key behavior:**
- Height adjusts on every keystroke
- Transition animation: `height 150ms ease`
- When content exceeds max height, scrollbar appears
- On send, height resets to auto

### Expand/Collapse Button

Shows when content is "long" (> 200 characters OR > 3 lines):

```typescript
const lineCount = (value.match(/\n/g) || []).length + 1;
const isLongContent = value.length > 200 || lineCount > 3;
```

**Button behavior:**
- Position: top-right corner of input container
- Size: 28x28px
- Icon: `arrows-out` (collapsed) / `arrows-in` (expanded)
- Adds right padding to textarea to prevent text overlap

### Keyboard Handling

```typescript
const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
  // Enter (without Shift) = Send message
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    handleSend();
  }
  // Shift+Enter = New line (default behavior)
}, [handleSend]);
```

### Controlled vs Uncontrolled Mode

The component supports both patterns:

```typescript
// Uncontrolled (internal state)
<InputArea onSend={handleSend} placeholder="Ask anything..." />

// Controlled (external state)
const [message, setMessage] = useState('');
<InputArea
  value={message}
  onValueChange={setMessage}
  onSend={handleSend}
/>
```

Implementation:
```typescript
const isControlled = controlledValue !== undefined;
const [internalValue, setInternalValue] = useState('');
const value = isControlled ? controlledValue : internalValue;

const handleValueChange = useCallback((newValue: string) => {
  if (isControlled) {
    onValueChange?.(newValue);
  } else {
    setInternalValue(newValue);
  }
}, [isControlled, onValueChange]);
```

---

## Attention Animations

### Context Source Pill Attention

Draws attention when context is loaded (e.g., agreements selected).

```css
.contextSourcePillAttention::before,
.contextSourcePillAttention::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
}

.contextSourcePillAttention::before {
  animation: pillRippleRing1 800ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

.contextSourcePillAttention::after {
  animation: pillRippleRing2 800ms cubic-bezier(0.4, 0, 0.2, 1) 150ms forwards;
}

@keyframes pillRippleRing1 {
  0% {
    box-shadow: 0 0 0 0 var(--ink-cobalt-140);
    opacity: 0.7;
  }
  100% {
    box-shadow: 0 0 0 12px transparent;
    opacity: 0;
  }
}

@keyframes pillRippleRing2 {
  0% {
    box-shadow: 0 0 0 0 var(--ink-cobalt-120);
    opacity: 0.5;
  }
  100% {
    box-shadow: 0 0 0 20px transparent;
    opacity: 0;
  }
}
```

**Usage pattern:**
```typescript
// Trigger attention when context changes
const [showAttention, setShowAttention] = useState(false);

useEffect(() => {
  if (contextSource) {
    setShowAttention(true);
    // Clear after animation completes
    const timer = setTimeout(() => setShowAttention(false), 900);
    return () => clearTimeout(timer);
  }
}, [contextSource]);
```

### Input Container Attention

Similar ripple effect on the entire input container when a quick action populates the input:

```css
@keyframes inputRippleRing1 {
  0% { box-shadow: 0 0 0 0 var(--ink-cobalt-140); opacity: 0.7; }
  100% { box-shadow: 0 0 0 10px transparent; opacity: 0; }
}

@keyframes inputRippleRing2 {
  0% { box-shadow: 0 0 0 0 var(--ink-cobalt-120); opacity: 0.5; }
  100% { box-shadow: 0 0 0 16px transparent; opacity: 0; }
}
```

---

## Styling Specifications

### Input Container

```css
.inputContainer {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px; /* --ink-spacing-100 */
  padding: 4px 16px 12px; /* spacing-50 / spacing-200 / spacing-150 */
  background: var(--ink-form-control-bg-color-default);
  border: 1px solid var(--ink-border-color-subtle);
  border-radius: 12px; /* --ink-radius-size-m */
}
```

### TextArea (Inside Input)

The textarea is styled to remove default borders and integrate seamlessly:

```css
.textInput {
  border: none !important;
  background: transparent !important;
  resize: none;
  padding: 8px 0 0 0; /* Top padding only */
  min-height: 40px;
  max-height: 200px;
  overflow-y: auto;
  transition: height 150ms ease;
  box-shadow: none !important;
}

.textInput:focus {
  outline: none !important;
  box-shadow: none !important;
}

.textInput::placeholder {
  color: var(--ink-font-color-neutral-subtle);
}
```

### Context Source Pill

```css
.contextSourcePill {
  display: flex;
  align-items: center;
  gap: 4px; /* --ink-spacing-50 */
  padding: 8px 12px; /* spacing-100 / spacing-150 */
  background: var(--ink-neutral-10);
  border: none;
  border-radius: 9999px; /* --ink-radius-full (pill shape) */
  cursor: pointer;
  font-size: 12px; /* --ink-font-size-xs */
  font-weight: 500; /* --ink-font-weight-medium */
  color: var(--ink-font-color-default);
  transition: background 150ms ease;
}

.contextSourcePill:hover:not(:disabled) {
  background: var(--ink-neutral-20);
}
```

### Add Source Button

```css
.addSourceButton {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 12px;
  background: transparent;
  border: 1px dashed var(--ink-border-color-subtle);
  border-radius: 9999px;
  font-size: 11px; /* --ink-font-size-detail-xs */
  font-weight: 500;
  color: var(--ink-font-color-default);
}

.addSourceButton:hover:not(:disabled) {
  border-color: var(--ink-border-color-subtle);
  background: var(--ink-bg-color-muted);
}
```

### Disclaimer Text

```css
.disclaimer {
  margin: 0;
  padding: 0 8px;
  font-size: 10px; /* --ink-font-size-xxs */
  font-weight: 500;
  letter-spacing: 0.16px; /* --ink-letter-spacing-open */
  line-height: 1.4;
  color: var(--ink-font-color-secondary);
  text-align: center;
}
```

### Expand Button

```css
.expandButton {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 28px;
  height: 28px;
  padding: 0;
  background: var(--ink-bg-color-default);
  border: 1px solid var(--ink-border-color-subtle);
  border-radius: 4px; /* --ink-radius-size-xs */
  color: var(--ink-font-color-neutral);
  cursor: pointer;
  z-index: 1;
}

.expandButton:hover {
  background: var(--ink-bg-color-neutral-subtle);
  color: var(--ink-font-color-default);
}
```

---

## Underlying TextArea Primitive

The chat input uses our `TextArea` primitive component with custom styling overrides.

### TextArea Props

```typescript
interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Required label (can be visually hidden) */
  label: string;

  /** Hide label visually while keeping it accessible */
  hideLabel?: boolean;

  /** Error message to display */
  error?: string;

  /** Help text below label */
  description?: string;

  /** Mark as required (shows asterisk) */
  required?: boolean;

  /** Number of visible rows */
  rows?: number; // Default: 4

  /** Resize behavior */
  resize?: 'both' | 'horizontal' | 'vertical' | 'none'; // Default: 'vertical'

  /** Show character count when maxLength set */
  characterCount?: boolean;

  /** Allow typing past maxLength (shows warning) */
  allowOverLimit?: boolean;

  /** Auto-expand to show all content */
  autoExpand?: boolean;

  /** Max height for autoExpand (pixels) */
  autoExpandLimit?: number;

  /** Custom width */
  width?: string;
}
```

### TextArea Usage in Chat

```tsx
<TextArea
  ref={textAreaRef}
  value={value}
  onChange={(e) => handleValueChange(e.target.value)}
  onKeyDown={handleKeyDown}
  placeholder={placeholder}
  disabled={disabled}
  rows={1}
  className={styles.textInput}
  label="Chat message input"
  hideLabel  // Visually hidden but accessible
/>
```

---

## Usage Examples

### Basic Usage

```tsx
import { AIChat } from '@/design-system';

function ChatPanel() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const handleSend = (content: string) => {
    // Add user message
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date()
    }]);

    // Call AI API...
  };

  return (
    <AIChat
      messages={messages}
      onSendMessage={handleSend}
      placeholder="Ask anything..."
    />
  );
}
```

### With Context Source

```tsx
<AIChat
  messages={messages}
  onSendMessage={handleSend}
  contextSource={{
    label: 'agreements',
    count: 15,
    onClick: () => openSourcePicker()
  }}
  showContextAttention={justLoadedContext}
/>
```

### With Controlled Input

```tsx
function ChatWithPrefill() {
  const [inputValue, setInputValue] = useState('');

  const handleQuickAction = (prompt: string) => {
    setInputValue(prompt);
    // Show attention animation
    setShowAttention(true);
  };

  return (
    <AIChat
      messages={messages}
      onSendMessage={handleSend}
      inputValue={inputValue}
      onInputChange={setInputValue}
      showInputAttention={showAttention}
    />
  );
}
```

---

## Design Tokens Used

| Token | Value | Usage |
|-------|-------|-------|
| `--ink-spacing-50` | 4px | Small gaps |
| `--ink-spacing-100` | 8px | Standard gaps, padding |
| `--ink-spacing-150` | 12px | Medium padding |
| `--ink-spacing-200` | 16px | Large padding |
| `--ink-radius-size-xs` | 4px | Small radius |
| `--ink-radius-size-m` | 12px | Input container |
| `--ink-radius-full` | 9999px | Pill shapes |
| `--ink-border-color-subtle` | Light gray | Input borders |
| `--ink-neutral-10` | Very light gray | Pill backgrounds |
| `--ink-neutral-20` | Light gray | Pill hover |
| `--ink-cobalt-120` | Blue | Attention animation |
| `--ink-cobalt-140` | Darker blue | Attention animation |
| `--ink-font-color-default` | Dark gray | Primary text |
| `--ink-font-color-secondary` | Medium gray | Disclaimer |
| `--ink-font-color-neutral-subtle` | Light gray | Placeholder |
| `--ink-font-size-xs` | 12px | Small text |
| `--ink-font-size-xxs` | 10px | Disclaimer |
| `--ink-font-weight-medium` | 500 | Semi-bold text |

---

## Accessibility

- Label is visually hidden but available to screen readers (`hideLabel` prop)
- Placeholder provides additional context
- `aria-describedby` connects to disclaimer text
- Send button has `aria-label="Send message"`
- Expand button has `aria-label` describing current state
- Focus states are visible and meet contrast requirements
- Keyboard navigation: Tab to focus, Enter to send, Shift+Enter for new line

---

## Files Reference

| File | Description |
|------|-------------|
| `src/design-system/5-patterns/AIChat/AIChat.tsx` | Main component with InputArea |
| `src/design-system/5-patterns/AIChat/AIChat.module.css` | All styles |
| `src/design-system/3-primitives/TextArea/TextArea.tsx` | Underlying textarea primitive |
| `src/design-system/3-primitives/TextArea/TextArea.module.css` | TextArea styles |
| `src/design-system/1-tokens/tokens.css` | Design tokens |

---

## Implementation Notes

1. **Auto-resize performance**: The resize calculation runs on every keystroke. For production, consider debouncing if performance is a concern.

2. **Animation cleanup**: Attention animations use CSS `forwards` fill mode. The `showContextAttention` and `showInputAttention` props should be reset to `false` after the animation completes (~900ms).

3. **Controlled mode**: When using controlled mode, ensure the parent component updates state synchronously to avoid input lag.

4. **Send button state**: Disabled when:
   - Input is empty (after trimming)
   - `disabled` prop is true
   - `isLoading` is true

5. **Textarea height reset**: After sending, explicitly reset the textarea height to prevent stale heights from previous content.
