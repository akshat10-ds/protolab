# Test Plan - AI-Powered Prototype Testing

**Automated testing strategy for prototypes built with the Ink Design System.**

This document defines how AI agents should test prototypes to ensure they work correctly before delivery.

---

## 🎯 Testing Philosophy

**Every prototype must be tested before delivery.**

Tests verify:
- ✅ Visual correctness (matches design/requirements)
- ✅ Functionality (interactions work)
- ✅ No console errors
- ✅ No broken components
- ✅ Accessibility basics
- ✅ Build succeeds

---

## 🛠️ Available Testing Tools

### Chrome DevTools MCP (`mcp__chrome-devtools__*`)
**Best for**: Visual testing, console errors, network requests, performance

**Available Actions**:
- `navigate_page` - Navigate to URL
- `take_snapshot` - Get accessibility tree (better than screenshot)
- `take_screenshot` - Visual screenshot
- `list_console_messages` - Check for errors
- `list_network_requests` - Check API calls
- `click`, `fill`, `type` - Interact with elements
- `evaluate_script` - Run JavaScript

### Playwright MCP (`mcp__playwright__*`)
**Best for**: End-to-end workflows, form submissions, complex interactions

**Available Actions**:
- `browser_navigate` - Go to page
- `browser_snapshot` - Accessibility snapshot
- `browser_take_screenshot` - Visual capture
- `browser_click`, `browser_type` - Interactions
- `browser_fill_form` - Fill multiple fields
- `browser_console_messages` - Error checking
- `browser_network_requests` - Network monitoring

---

## 📋 Test Workflow

### Phase 1: Build Verification
**Before any browser testing, ensure the code compiles.**

```bash
npm run build
```

**Expected**: Build succeeds with no errors.

**If build fails**: Fix errors before proceeding to browser tests.

---

### Phase 2: Visual & Functional Testing

#### Step 1: Navigate to Prototype

**Chrome DevTools**:
```typescript
mcp__chrome-devtools__navigate_page({
  url: "http://localhost:3000/your-prototype"
})
```

**Playwright**:
```typescript
mcp__playwright__browser_navigate({
  url: "http://localhost:3000/your-prototype"
})
```

---

#### Step 2: Take Initial Snapshot

**Get accessibility tree (preferred over screenshot)**:

**Chrome DevTools**:
```typescript
mcp__chrome-devtools__take_snapshot()
```

**Playwright**:
```typescript
mcp__playwright__browser_snapshot()
```

**What to verify**:
- [ ] All expected components render
- [ ] Page structure is correct
- [ ] No missing elements
- [ ] Accessibility tree shows proper roles/labels

---

#### Step 3: Check Console Errors

**Chrome DevTools**:
```typescript
mcp__chrome-devtools__list_console_messages({
  onlyErrors: true
})
```

**Playwright**:
```typescript
mcp__playwright__browser_console_messages({
  onlyErrors: true
})
```

**Expected**: No errors (warnings are acceptable)

**Common errors to watch for**:
- `Cannot read property of undefined`
- `Failed to fetch`
- `Component is not defined`
- `Invariant violation`
- CSS token warnings

---

#### Step 4: Test Interactions

**Test buttons, forms, navigation**:

**Example: Button Click**
```typescript
// Chrome DevTools
mcp__chrome-devtools__take_snapshot() // Get element reference
mcp__chrome-devtools__click({
  uid: "element-reference-from-snapshot",
  element: "Submit button"
})

// Playwright
mcp__playwright__browser_snapshot() // Get element reference
mcp__playwright__browser_click({
  ref: "element-reference",
  element: "Submit button"
})
```

**Example: Form Submission**
```typescript
// Playwright (better for forms)
mcp__playwright__browser_fill_form({
  elements: [
    { uid: "input-name", value: "John Doe" },
    { uid: "input-email", value: "john@example.com" }
  ]
})

mcp__playwright__browser_click({
  ref: "submit-button",
  element: "Submit button"
})
```

**What to verify after interaction**:
- [ ] Expected state change occurred
- [ ] No console errors
- [ ] UI updates correctly
- [ ] Loading states appear if applicable

---

#### Step 5: Test Navigation (if applicable)

**If prototype has multiple pages/sections**:

```typescript
// Click navigation link
mcp__chrome-devtools__click({
  uid: "nav-link",
  element: "Dashboard link"
})

// Wait for navigation
mcp__chrome-devtools__wait_for({
  text: "Dashboard" // Expected text on new page
})

// Verify console has no errors
mcp__chrome-devtools__list_console_messages({
  onlyErrors: true
})
```

---

#### Step 6: Take Final Screenshot

**Capture final state for visual verification**:

```typescript
mcp__chrome-devtools__take_screenshot({
  filename: "prototype-final-state.png"
})
```

**Store in**: `screenshots/` directory for review

---

## 🧪 Test Scenarios by Prototype Type

### Dashboard Prototype

**Test checklist**:
- [ ] Dashboard layout renders
- [ ] Navigation sidebar works
- [ ] Cards display data correctly
- [ ] Table loads and sorts
- [ ] No console errors
- [ ] Charts/graphs render (if applicable)

**Example test**:
```typescript
// 1. Navigate
mcp__playwright__browser_navigate({
  url: "http://localhost:3000/dashboard"
})

// 2. Snapshot
const snapshot = mcp__playwright__browser_snapshot()
// Verify: VerticalNavigation, Cards, Table present

// 3. Check errors
const errors = mcp__playwright__browser_console_messages({ onlyErrors: true })
// Verify: errors.length === 0

// 4. Test nav
mcp__playwright__browser_click({
  ref: "nav-users",
  element: "Users navigation item"
})

// 5. Verify navigation worked
mcp__playwright__browser_wait_for({ text: "Users" })

// 6. Screenshot
mcp__playwright__browser_take_screenshot({
  filename: "dashboard-test.png"
})
```

---

### Form Prototype

**Test checklist**:
- [ ] Form renders with all fields
- [ ] Input validation works
- [ ] Submit button is clickable
- [ ] Error messages display correctly
- [ ] Success state shows after submission
- [ ] No console errors

**Example test**:
```typescript
// 1. Navigate
mcp__playwright__browser_navigate({
  url: "http://localhost:3000/form-demo"
})

// 2. Fill form
mcp__playwright__browser_fill_form({
  elements: [
    { uid: "name-input", value: "Test User" },
    { uid: "email-input", value: "invalid-email" }, // Test validation
    { uid: "password-input", value: "password123" }
  ]
})

// 3. Submit
mcp__playwright__browser_click({
  ref: "submit-button",
  element: "Submit button"
})

// 4. Verify validation error appears
mcp__playwright__browser_snapshot()
// Look for: "Invalid email" message

// 5. Fix email and resubmit
mcp__playwright__browser_type({
  ref: "email-input",
  element: "Email input",
  text: "test@example.com"
})

mcp__playwright__browser_click({
  ref: "submit-button",
  element: "Submit button"
})

// 6. Verify success
mcp__playwright__browser_wait_for({ text: "Success" })

// 7. Check errors
const errors = mcp__playwright__browser_console_messages({ onlyErrors: true })
```

---

### Modal/Overlay Prototype

**Test checklist**:
- [ ] Modal trigger button works
- [ ] Modal opens correctly
- [ ] Modal backdrop is present
- [ ] Close button works
- [ ] Escape key closes modal
- [ ] Focus trap works (tab stays in modal)
- [ ] No console errors

**Example test**:
```typescript
// 1. Navigate
mcp__playwright__browser_navigate({
  url: "http://localhost:3000/modal-demo"
})

// 2. Open modal
mcp__playwright__browser_click({
  ref: "open-modal-btn",
  element: "Open Modal button"
})

// 3. Wait for modal
mcp__playwright__browser_wait_for({ text: "Modal Title" })

// 4. Snapshot with modal open
mcp__playwright__browser_snapshot()
// Verify: Modal, backdrop, close button present

// 5. Test close button
mcp__playwright__browser_click({
  ref: "close-modal-btn",
  element: "Close button"
})

// 6. Verify modal closed
mcp__playwright__browser_snapshot()
// Verify: Modal no longer in accessibility tree

// 7. Test Escape key
mcp__playwright__browser_click({
  ref: "open-modal-btn",
  element: "Open Modal button"
})

mcp__playwright__browser_press_key({ key: "Escape" })

// 8. Verify modal closed again
mcp__playwright__browser_snapshot()
```

---

### Table/List Prototype

**Test checklist**:
- [ ] Table renders with data
- [ ] Column headers present
- [ ] Sorting works (if applicable)
- [ ] Pagination works (if applicable)
- [ ] Row selection works (if applicable)
- [ ] Search/filter works (if applicable)
- [ ] No console errors

**Example test**:
```typescript
// 1. Navigate
mcp__playwright__browser_navigate({
  url: "http://localhost:3000/table-demo"
})

// 2. Snapshot
const snapshot = mcp__playwright__browser_snapshot()
// Verify: Table with rows and columns

// 3. Test sorting
mcp__playwright__browser_click({
  ref: "name-column-header",
  element: "Name column header"
})

// 4. Wait and snapshot
// (Give sort time to apply)
await new Promise(resolve => setTimeout(resolve, 500))
mcp__playwright__browser_snapshot()
// Verify: Data is sorted

// 5. Test pagination (if applicable)
mcp__playwright__browser_click({
  ref: "next-page-btn",
  element: "Next page button"
})

// 6. Verify page changed
mcp__playwright__browser_wait_for({ text: "Page 2" })

// 7. Check errors
const errors = mcp__playwright__browser_console_messages({ onlyErrors: true })
```

---

## 🚨 Common Issues & Fixes

### Issue: Console Errors

**Problem**: `TypeError: Cannot read property 'map' of undefined`

**Likely Cause**: Data prop not provided or component expecting array

**Fix**:
```tsx
// ❌ Wrong
<Table data={undefined} />

// ✅ Correct
<Table data={data || []} />
```

---

### Issue: Component Not Rendering

**Problem**: Component doesn't appear in snapshot

**Likely Cause**: Import error or missing export

**Check**:
1. Component imported correctly
2. Component exported from layer index
3. No TypeScript errors in build

---

### Issue: Styles Not Applied

**Problem**: Component renders but looks unstyled

**Likely Cause**: CSS Module not imported or tokens missing

**Fix**:
```tsx
// ❌ Wrong - missing import
import { Button } from '@/design-system';

// ✅ Correct - CSS Module imported in Button component
import styles from './Button.module.css';
```

---

### Issue: Network Errors

**Problem**: Failed to fetch data

**Likely Cause**: Mock data not set up or API endpoint wrong

**Fix**:
```tsx
// Use mock data for prototypes
const mockData = [/* ... */];

<Table data={mockData} />
```

---

## 📊 Test Report Template

After testing, provide a summary:

```markdown
## Test Results: [Prototype Name]

**Date**: 2025-10-29
**URL**: http://localhost:3000/prototype-path

### Build Status
- [x] Build succeeds
- [ ] Build warnings: (list if any)

### Visual Testing
- [x] All components render correctly
- [x] Layout matches requirements
- [x] No visual glitches
- [ ] Screenshots: `screenshots/prototype-*.png`

### Functional Testing
- [x] Navigation works
- [x] Buttons clickable
- [x] Forms submit correctly
- [x] Modals open/close
- [x] Data displays correctly

### Console Errors
- [x] No errors
- [ ] Warnings: (list if any)

### Accessibility
- [x] Proper ARIA labels
- [x] Keyboard navigation works
- [x] Focus indicators visible

### Network
- [x] No failed requests
- [x] All assets load

### Conclusion
✅ **PASS** - Prototype is ready for delivery

Issues Found: None
```

---

## 🎯 Quick Test Checklist

Before marking a prototype complete:

- [ ] `npm run build` succeeds
- [ ] Navigated to prototype URL
- [ ] Took accessibility snapshot
- [ ] Checked console errors (none found)
- [ ] Tested primary interactions (buttons, forms, navigation)
- [ ] Took final screenshot
- [ ] All expected components render
- [ ] No broken imports
- [ ] Matches design/requirements

**If ALL checked**: ✅ Prototype is ready

**If ANY unchecked**: ❌ Fix issues before delivery

---

## 🔧 Test Automation Script

For repetitive tests, use this pattern:

```typescript
async function testPrototype(url: string, prototypeName: string) {
  // 1. Build
  console.log('Building...');
  await runBuild();

  // 2. Navigate
  console.log('Navigating to prototype...');
  await navigatePage(url);

  // 3. Snapshot
  console.log('Taking snapshot...');
  const snapshot = await takeSnapshot();

  // 4. Check errors
  console.log('Checking console...');
  const errors = await getConsoleErrors();

  // 5. Screenshot
  console.log('Taking screenshot...');
  await takeScreenshot(`${prototypeName}-test.png`);

  // 6. Report
  console.log('Test Results:');
  console.log(`- Components render: ${snapshot.success}`);
  console.log(`- Console errors: ${errors.length}`);
  console.log(`- Status: ${errors.length === 0 ? 'PASS' : 'FAIL'}`);

  return errors.length === 0;
}

// Run test
const passed = await testPrototype(
  'http://localhost:3000/dashboard',
  'dashboard'
);
```

---

## 📚 See Also

- [CLAUDE.md](./CLAUDE.md) - AI agent instructions
- [COMPONENT_CATALOG.md](./COMPONENT_CATALOG.md) - Component reference
- [PROTOTYPE_GUIDE.md](./PROTOTYPE_GUIDE.md) - Common patterns

---

**Remember**: Test every prototype. No exceptions. Quality over speed.
