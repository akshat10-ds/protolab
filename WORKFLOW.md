# Development Workflow - Mandatory Process

**CRITICAL**: This workflow MUST be followed for every feature, prototype, or change. No exceptions.

---

## 🚨 Core Principles

1. **Plan BEFORE coding** - Show user your approach, get approval
2. **Test BEFORE showing user** - Always verify it works
3. **Commit AFTER user approval** - Keep git history clean
4. **Use existing patterns correctly** - Don't reinvent components
5. **Fix components FIRST** - Then pages improve automatically
6. **Deploy only when approved** - No premature GitHub pushes
7. **Document everything** - Update .MD files with learnings

---

## 📋 Mandatory Workflow Steps

### Step 0: Create Implementation Plan & Get Approval 🆕 CRITICAL
**BEFORE writing ANY code, show the user your plan:**

**Create a detailed plan including:**

1. **Components you'll use** - List each component with its layer
   ```
   Example:
   - DashboardLayout (Layer 6)
   - GlobalNav (Layer 5) - from LayoutWithLocalNav.tsx:139-166
   - LocalNav (Layer 5) - from LayoutWithLocalNav.tsx:171-287
   - Table (Layer 4)
   - SearchInput (Layer 4)
   - Stack/Inline (Layer 2)
   ```

2. **Example files you'll copy from** - Exact file paths and line numbers
   ```
   Example:
   - GlobalNav pattern: src/examples/LayoutWithLocalNav.tsx:139-166
   - LocalNav pattern: src/examples/LayoutWithLocalNav.tsx:171-287
   ```

3. **Key props you'll use** - Show the actual API calls
   ```
   Example:
   <GlobalNav
     logo={<img src="..." />}
     navItems={[...]} // with onClick handlers
     showAppSwitcher={true}
     onAppSwitcherClick={...}
     showSearch={true}
     onSearchClick={...}
     // ... all interactive props
   />
   ```

4. **Flag any unknowns or assumptions**
   ```
   Example:
   ⚠️ Assuming LocalNav supports collapsible sections - will verify in README
   ⚠️ Not sure if Table supports custom cell renderers - need to check
   ```

5. **No new components statement**
   ```
   ✅ No new components needed - using only existing design system
   OR
   ⚠️ Need new component: [Name] - awaiting approval
   ```

6. **Estimated time**
   ```
   Example: 2 hours (1hr implementation, 30min testing, 30min fixes)
   ```

**MANDATORY: Wait for user approval before coding**

**Why this prevents issues:**
- User catches wrong approach in 2-minute review vs 30-minute fix later
- Forces you to find working examples before coding
- Proves you understand the component APIs
- No wasted implementation time on wrong patterns
- User can suggest better components or approaches

---

## 🔍 Search Order Algorithm (MANDATORY)

**When building ANY prototype or feature, search for components in this EXACT order:**

### The 6-Layer Hierarchy (Search Top-Down)

```
Layer 6: Layouts     →  Start here (highest level)
Layer 5: Patterns    →  Then check patterns
Layer 4: Composites  →  Then check composites
Layer 3: Primitives  →  Then use primitives
Layer 2: Utilities   →  Always available for layout
Layer 1: Tokens      →  Use for custom styling
```

### Step-by-Step Component Discovery

**For EVERY prototype request, follow this algorithm:**

#### Step A: Check Layer 6 (Layouts)
```
Question: "Can I use a full page template?"

Check COMPONENT_CATALOG.md:
- DashboardLayout → For dashboards, admin panels, data-heavy apps
- AuthLayout → For login, signup, authentication pages

IF YES: Start with this layout, fill in children
IF NO: Move to Step B
```

#### Step B: Check Layer 5 (Patterns)
```
Question: "What complex UI patterns do I need?"

Check COMPONENT_CATALOG.md:
- VerticalNavigation → Sidebar navigation with collapsible sections
- GlobalNav → Top-level application navigation
- LocalNav → Context-specific navigation

IF YES: Use these patterns for navigation structure
ALWAYS: Continue to Step C for content
```

#### Step C: Check Layer 4 (Composites)
```
Question: "What composed components do I need?"

Check COMPONENT_CATALOG.md (18 composites):
- Table, List → Data display
- Modal, Drawer, Alert → Overlays and feedback
- SearchInput, ComboBox, DatePicker → Advanced inputs
- Tabs, Accordion, Pagination → Navigation and organization
- Breadcrumb, FilterTag → UI utilities

IF YES: Identify ALL needed composites
ALWAYS: Continue to Step D for basic elements
```

#### Step D: Use Layer 3 (Primitives)
```
Question: "What basic building blocks do I need?"

Check COMPONENT_CATALOG.md (26 primitives):
- Button, IconButton, Link → Actions
- Input, Select, Checkbox, Radio, Switch, TextArea → Forms
- Card, Badge, Chip, Avatar → Display
- Heading, Text → Typography
- Icon, Spinner, ProgressBar → Visual elements
- Divider, Callout, Banner, Tooltip → UI helpers

ALWAYS AVAILABLE: Use as needed for implementation
```

#### Step E: Apply Layer 2 (Utilities)
```
Question: "How should I lay out these components?"

Check COMPONENT_CATALOG.md:
- Stack → Vertical or horizontal flex layout
- Grid → CSS Grid with responsive columns
- Inline → Horizontal inline layout
- Container → Max-width centering
- Spacer → Fixed or flexible spacing

ALWAYS USE: For layout structure
```

#### Step F: Reference Layer 1 (Tokens)
```
Question: "What styling tokens should I use?"

Check src/design-system/1-tokens/tokens.css:
- --ink-bg-* → Background colors
- --ink-font-* → Text colors
- --ink-border-* → Border colors
- --ink-spacing-* → Spacing values
- --ink-radius-* → Border radius

ALWAYS USE: For any custom styling needs
```

### Example: Building a Dashboard

**User Request**: "Create a dashboard showing user analytics with filters"

**Search Order Application**:

```
Layer 6 Check:
✅ Found: DashboardLayout
→ Decision: START HERE

Layer 5 Check:
✅ Found: VerticalNavigation
→ Decision: Use for sidebar navigation

Layer 4 Check:
✅ Found: Table (data grid)
✅ Found: SearchInput (search functionality)
✅ Found: FilterTag (active filters)
✅ Found: Pagination (if needed)
→ Decision: Use all these composites

Layer 3 Check:
✅ Need: Card (stat containers)
✅ Need: Button (actions)
✅ Need: Badge (status indicators)
✅ Need: Heading, Text (typography)
→ Decision: Use these primitives

Layer 2 Check:
✅ Need: Grid (for stat cards layout)
✅ Need: Stack (for vertical content)
→ Decision: Use for layout

Layer 1 Check:
✅ Use design tokens for any custom styling
→ Decision: Reference tokens.css

Final Component Tree:
<DashboardLayout navigation={<VerticalNavigation />}>  ← Layer 6
  <Stack direction="vertical" gap="large">             ← Layer 2
    <Grid columns={3} gap="medium">                    ← Layer 2
      <Card><Heading>1,234</Heading></Card>            ← Layer 3
      <Card><Heading>856</Heading></Card>              ← Layer 3
      <Card><Heading>+12%</Heading></Card>             ← Layer 3
    </Grid>
    <Stack direction="horizontal" gap="small">         ← Layer 2
      <SearchInput />                                  ← Layer 4
      <FilterTag label="Active" />                     ← Layer 4
    </Stack>
    <Card>
      <Table columns={cols} data={rows} />             ← Layer 4
      <Pagination currentPage={1} totalPages={10} />   ← Layer 4
    </Card>
  </Stack>
</DashboardLayout>
```

### Critical Rules

**ALWAYS:**
- ✅ Start search at Layer 6
- ✅ Work down through layers sequentially
- ✅ Check COMPONENT_CATALOG.md at each layer
- ✅ Read Layer README for component APIs
- ✅ Find working examples in src/examples/
- ✅ Compose from existing components

**NEVER:**
- ❌ Skip layers in the search order
- ❌ Assume a component doesn't exist without checking
- ❌ Create custom components without exhausting search
- ❌ Jump directly to primitives without checking higher layers
- ❌ Guess component APIs without reading documentation

### When No Exact Match Exists

If you reach Layer 3 and still don't have what you need:

**Option 1: Compose from Primitives + Utilities**
```
Need: Image carousel
No Carousel component found

Compose:
<Stack direction="horizontal">
  <IconButton icon="chevron-left" onClick={prev} />
  <Grid columns={visibleCount}>
    {images.map(img => <Card><img src={img} /></Card>)}
  </Grid>
  <IconButton icon="chevron-right" onClick={next} />
</Stack>
```

**Option 2: Suggest New Component (with User Approval)**
```
If pattern is used across multiple prototypes:
1. Document the composition
2. Propose adding it to Layer 4 or 5
3. Get user approval
4. Create component in appropriate layer
```

### Quick Reference: "Where Do I Start?"

**Building a full page?** → Layer 6 (Layouts)
**Adding navigation?** → Layer 5 (Patterns)
**Need data display?** → Layer 4 (Composites: Table, List)
**Need form inputs?** → Layer 4 (Composites: SearchInput, ComboBox) or Layer 3 (Primitives: Input, Select)
**Need basic UI elements?** → Layer 3 (Primitives: Button, Card, Badge)
**Need layout structure?** → Layer 2 (Utilities: Stack, Grid, Container)
**Need styling values?** → Layer 1 (Tokens)

**For detailed search order documentation, see [SEARCH_ORDER.md](./SEARCH_ORDER.md)**

---

### Step 1: Understand Requirements & Find Examples
**BEFORE writing ANY code:**

- [ ] Read the request carefully
- [ ] **Apply the Search Order Algorithm** (Layer 6 → 5 → 4 → 3 → 2 → 1)
- [ ] Check COMPONENT_CATALOG.md for existing components at each layer
- [ ] Check existing patterns in src/design-system/5-patterns
- [ ] Check layer READMEs for component APIs
- [ ] If using Figma, read FIGMA_GUIDE.md workflow

**CRITICAL - Find Working Examples:**
- [ ] Search src/examples/ for files using the component
  ```bash
  grep -r "GlobalNav" src/examples/
  grep -r "LocalNav" src/examples/
  ```
- [ ] **OPEN and READ the example file completely**
- [ ] **COPY the exact structure** from the working example
- [ ] **ADAPT only the data**, NOT the structure

**DO NOT proceed until you:**
- [ ] Found a working example using the pattern
- [ ] Read the entire example implementation
- [ ] Understand the exact prop structure used
- [ ] Can copy/paste and adapt (not guess/assume)

---

### Step 2: Create Task List (After Approval)
**AFTER user approves your plan:**

- [ ] Use TodoWrite tool to create detailed task list
- [ ] Break down into concrete, testable steps
- [ ] Include testing tasks
- [ ] **DO NOT include commit task** - commits happen after user approval

**Example todo list:**
```
1. Copy GlobalNav pattern from LayoutWithLocalNav.tsx
2. Copy LocalNav pattern from LayoutWithLocalNav.tsx
3. Implement page content with Table and SearchInput
4. Run build verification (npm run build)
5. Test with Playwright - navigate and verify rendering
6. Test interactive elements (clicks, forms)
7. Take screenshot for user review
```

**Note:** Commit step removed - commits only happen after user reviews and approves

---

### Step 3: Implement
**While coding:**

- [ ] Use ONLY existing components from design system
- [ ] Follow hierarchy: Layouts → Patterns → Composites → Primitives → Utilities
- [ ] Check component README for correct prop names and types
- [ ] Don't create custom components unless absolutely necessary
- [ ] If pattern looks wrong, check if you're using it correctly FIRST

**Common mistakes to avoid:**
- ❌ Using wrong prop names
- ❌ Not checking component API documentation
- ❌ Assuming component works like another library
- ❌ Creating inline compositions instead of using patterns

---

### Step 4: Test (MANDATORY - BEFORE SHOWING USER)
**Follow TEST_PLAN.md exactly:**

**⚠️ CRITICAL: Test BEFORE showing user, but commit AFTER user approves**

#### 4.1 Build Verification
```bash
npm run build
```
- [ ] Build succeeds with no errors
- [ ] Fix any build errors BEFORE browser testing

#### 4.2 Browser Testing
**Use Playwright or Chrome DevTools MCP:**

```typescript
// 1. Navigate to page
mcp__playwright__browser_navigate({
  url: "http://localhost:3000/your-page"
})

// 2. Take snapshot (accessibility tree)
mcp__playwright__browser_snapshot()

// 3. Check console for errors
mcp__playwright__browser_console_messages({ onlyErrors: true })

// 4. Take screenshot
mcp__playwright__browser_take_screenshot()

// 5. Test interactions (buttons, forms, etc)
// Click, type, verify state changes

// 6. Verify no errors after interactions
```

**Testing checklist:**
- [ ] Page renders without errors
- [ ] All expected components visible
- [ ] No console errors (warnings OK for prototype)
- [ ] Interactions work (buttons, forms, navigation)
- [ ] Screenshot matches requirements

**IF ANY TESTS FAIL**: Fix issues and re-test. DO NOT show user broken code.

---

### Step 5: Show User & Get Approval (BEFORE COMMIT) 🆕 CRITICAL
**AFTER all tests pass, show user your work:**

**Present to user:**

1. **Local URL** - Where to view the working prototype
   ```
   View at: http://localhost:3000/agreements
   ```

2. **Screenshot** - Visual proof it works
   - Use `mcp__playwright__browser_take_screenshot()`
   - Show key interactions working
   - Highlight any important details

3. **Summary of changes** - What you built
   ```
   Example:
   ✅ Implemented Agreements page with:
   - GlobalNav with app switcher, search, notifications, settings
   - LocalNav with collapsible sections and footer toggle
   - Table with 7 agreement rows
   - Pagination (7 pages)
   - Search and filter UI

   ✅ Components used (no new components):
   - DashboardLayout, GlobalNav, LocalNav (Layers 6-5)
   - Table, SearchInput, FilterTag, Pagination (Layer 4)
   - Button, Badge, Icon, StatusLight (Layer 3)
   ```

4. **Test results** - Prove it works
   ```
   Example:
   ✅ Build: Successful
   ✅ Page loads without errors
   ✅ Console: No errors
   ✅ Interactions tested:
     - Nav item clicks work
     - Table selection works
     - Pagination works
   ```

5. **Console errors (if any)** - Transparency about issues
   ```
   ⚠️ Warning: validateDOMNesting (non-blocking, design system issue)
   ✅ No breaking errors
   ```

**MANDATORY: Wait for user response**

User will either:
- ✅ **Approve** → Proceed to Step 6 (Commit)
- 🔄 **Request changes** → Fix and re-test, show again
- ❌ **Reject approach** → Back to Step 0 (New plan)

**DO NOT COMMIT until user explicitly approves**

**Why this prevents issues:**
- User sees working version before git history is written
- Can iterate without messy "fix" commits
- User might catch UX issues you missed
- Keeps git history clean and professional
- No wasted commits on wrong approach

---

### Step 6: Commit (ONLY AFTER USER APPROVAL) 🆕 UPDATED
**⚠️ PREREQUISITE: User must have explicitly approved in Step 5**

**Commit message format:**
```
type: brief description

- Detailed change 1
- Detailed change 2
- Testing: describe what was tested

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

**Types:**
- `feat:` New feature
- `fix:` Bug fix
- `refactor:` Code restructure
- `docs:` Documentation
- `test:` Test updates
- `style:` CSS/styling

**Example:**
```
fix: correct GlobalNav usage in agreements page

- Use correct GlobalNav API from 5-patterns
- Fix prop names: logo, navItems, showSearch
- Remove custom navigation implementation
- Testing: Verified with Playwright, all components render correctly

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

---

### Step 7: Deploy to GitHub (ONLY When Requested)
**⚠️ Push to GitHub ONLY when user explicitly requests deployment**

**Default behavior: DO NOT PUSH**

Most work should stay local until user is ready to deploy. Push only when:
- User explicitly says "push to GitHub" or "deploy this"
- User asks to create a pull request
- User asks to share the work

**When user requests deployment:**
```bash
git push origin branch-name
```

**Why this matters:**
- Avoids premature Vercel deployments
- User controls when work goes public
- Saves deployment resources
- Allows local iteration without public exposure

**NEVER push automatically after commit**

---

## 🔧 Component-Level Improvements

### When Patterns Look Wrong

**BEFORE assuming pattern is wrong:**

1. [ ] Check if you're using the correct component
2. [ ] Read component README for API
3. [ ] Check existing examples using that component
4. [ ] Verify you're passing correct props
5. [ ] Look at component's .module.css for expected structure

**Example investigation:**
```
Problem: "GlobalNav doesn't look right"

Investigation:
1. Read: src/design-system/5-patterns/GlobalNav/README.md
2. Check: What props does it accept?
3. Check: What's the correct logo prop format?
4. Check: Are navItems structured correctly?
5. Compare: How does ComponentShowcase use it?

Result: Fix usage, don't modify component
```

### When Component Actually Needs Improvement

**Only modify components if:**
- Pattern is used correctly but visually wrong
- Component has a bug
- Component API is missing needed props
- User explicitly requests component changes

**Process for component improvements:**
1. Document issue clearly
2. Propose fix to user
3. Get approval BEFORE modifying component
4. Test component in isolation
5. Test all pages using that component
6. Commit component changes separately

---

## 📝 Documentation Updates

### When to Update Docs

**Update docs when:**
- You discover a missing pattern
- You learn a better way to do something
- You encounter a common mistake
- User provides feedback on process
- Testing reveals issues

### Which Files to Update

**WORKFLOW.md** (this file):
- Process improvements
- New mandatory steps
- Common mistakes to avoid

**TEST_PLAN.md**:
- New test scenarios
- Testing tools improvements
- Common issues and fixes

**CLAUDE.md**:
- AI agent behavior changes
- New constraints or rules
- Component usage patterns

**COMPONENT_CATALOG.md**:
- New components added
- Component API changes

**Layer READMEs**:
- Component API updates
- New props or features
- Usage examples

---

## ❌ Common Violations & Fixes

### Violation 0: Not Finding/Copying Working Examples ⚠️ MOST COMMON
**Problem**: Reading component types but not checking how they're actually used

**Real example from AgreementsPage:**
- ✅ I imported GlobalNav and LocalNav
- ✅ I read GlobalNav.tsx and LocalNav.tsx TypeScript files
- ❌ **I NEVER opened LayoutWithLocalNav.tsx to see working usage**
- ❌ **I guessed at the structure instead of copying**
- Result: Wrong pattern, missing props, non-functional components

**Why this happens:**
- Reading TypeScript interfaces feels like "understanding the API"
- But interfaces don't show structure, nesting, or real-world usage
- Working examples show the ACTUAL pattern to use

**Mandatory fix:**
```bash
# Step 1: Find examples
grep -r "GlobalNav" src/examples/

# Step 2: OPEN and READ the example file
# Read ALL of: src/examples/LayoutWithLocalNav.tsx

# Step 3: COPY the exact structure, adapt data only
# Don't write from memory, keep example open while coding
```

**Prevention with Step 0:**
If I had created an implementation plan BEFORE coding:
```
Implementation Plan for AgreementsPage:

Components:
- GlobalNav (Layer 5) - from LayoutWithLocalNav.tsx:139-166
  Props: logo, navItems with onClick, showAppSwitcher, onAppSwitcherClick,
         showSearch, onSearchClick, showNotifications, onNotificationClick,
         showSettings, onSettingsClick, user, onUserMenuClick

User would immediately see: "Where are the click handlers?" and "Why no showAppSwitcher?"
```

**Prevention checklist:**
- ✅ NEVER use a component without finding a working example first
- ✅ Reading the .tsx file ≠ Understanding how to use it
- ✅ Always ask: "Where is this pattern used successfully?"
- ✅ **NEW: Show your plan with actual props BEFORE coding**

### Violation 1: Committing Before User Approval
**Problem**: Code committed before user sees and approves it

**Consequences**:
- Messy git history with "fix" commits
- Broken code in Git history
- Wastes time fixing after the fact
- User has to ask "did you test?"
- Have to rewrite commits or add more commits

**Fix with new workflow:**
```
ALWAYS follow this order:
1. Write code
2. Run build (npm run build)
3. Run browser tests (Playwright)
4. Fix any issues and re-test
5. Show user (URL + screenshot + summary)
6. WAIT for user approval
7. ONLY THEN commit
8. Push to GitHub only if requested
```

**Why this matters:**
- Git history stays clean (no "oops fix" commits)
- User might catch UX issues before commit
- Can iterate freely without polluting git history

---

### Violation 2: Using Wrong Component Patterns
**Problem**: Not checking how components should be used

**What happened with AgreementsPage:**
```tsx
// ❌ What I did - read TypeScript interface, guessed structure
<GlobalNav
  logo={<Heading level={3}>docusign</Heading>}
  navItems={globalNavItems}
  showSearch
  showNotifications
  notificationCount={3}
  showSettings
  user={{ name: 'Kathie Brown' }}
/>
// PROBLEM: Missing showAppSwitcher, all click handlers, wrong structure

// ✅ What I should have done - copied from LayoutWithLocalNav.tsx
<GlobalNav
  logo={<img src="..." />}
  navItems={[
    { id: 'home', label: 'Home', active: false, onClick: () => {...} },
    { id: 'agreements', label: 'Agreements', active: true, onClick: () => {...} },
  ]}
  showAppSwitcher={true}
  onAppSwitcherClick={() => {...}}
  showSearch={true}
  onSearchClick={() => {...}}
  showNotifications={true}
  notificationCount={3}
  onNotificationClick={() => {...}}
  showSettings={true}
  onSettingsClick={() => {...}}
  user={{ name: 'John Smith' }}
  onUserMenuClick={() => {...}}
/>
```

**Fix**:
1. **FIND working example** - `grep -r "GlobalNav" src/examples/`
2. **OPEN example file** - Read the ENTIRE implementation
3. **COPY structure** - Don't guess, copy working pattern
4. **ADAPT data only** - Change values, NOT structure
5. **NEVER guess API** - Reading types isn't enough

---

### Violation 3: Premature Deployment
**Problem**: Pushing to GitHub without explicit user request

**Consequences**:
- Unfinished work deployed to Vercel
- User sees unreviewed changes in production
- Wastes deployment resources
- Work goes public before user wants it

**Fix with new workflow:**
```
Step 4: Test locally
Step 5: Show user (local URL + screenshot)
Step 6: Get approval → Commit locally
Step 7: ONLY push if user explicitly requests:
        - "push to GitHub"
        - "deploy this"
        - "create a PR"

DEFAULT: Do NOT push
```

**Remember**: Most work stays local. Only push when user explicitly asks.

---

### Violation 4: Not Documenting Learnings
**Problem**: Repeating same mistakes, not updating docs

**Consequences**:
- User has to repeat same feedback
- No improvement in process
- Knowledge not captured

**Fix**:
After user feedback:
1. Update WORKFLOW.md with lesson learned
2. Update relevant README if component-related
3. Update TEST_PLAN.md if testing-related
4. Commit documentation updates

---

## 🎯 Success Checklist

**Before marking ANY work complete:**

- [ ] All tests pass (see TEST_PLAN.md)
- [ ] Used existing components correctly
- [ ] Followed component APIs from READMEs
- [ ] No custom components unless necessary
- [ ] Code matches existing patterns
- [ ] Documentation updated if needed
- [ ] User has seen and approved
- [ ] ONLY THEN deployed to GitHub

---

## 🚀 Quick Reference

### Starting a New Feature (Updated with Step 0)
```bash
Step 0: CREATE PLAN & GET APPROVAL
1. Read COMPONENT_CATALOG.md (what exists?)
2. Find component in src/design-system
3. grep -r "ComponentName" src/examples/  ← FIND EXAMPLES
4. OPEN and READ working example file completely
5. CREATE IMPLEMENTATION PLAN:
   - List components with layers
   - Reference example files (with line numbers)
   - Show key props you'll use
   - Flag unknowns
   - Confirm no new components needed
   - Estimate time
6. SHOW PLAN TO USER → WAIT FOR APPROVAL

Step 1-2: AFTER APPROVAL
7. Create TodoWrite list
8. COPY exact structure from example
9. Implement by adapting example (not guessing)

Step 3-4: TEST
10. npm run build (verify first)
11. Test with Playwright (browser testing)
12. Verify all interactions work

Step 5: SHOW USER AGAIN
13. Present: URL, screenshot, summary, test results
14. WAIT FOR USER APPROVAL

Step 6-7: COMMIT & DEPLOY
15. Commit ONLY after user approves
16. Push to GitHub ONLY if user requests
```

### Fixing Component Patterns
```bash
1. Read component README
2. grep -r "ComponentName" src/examples/ (find usage)
3. OPEN and READ working example
4. Fix usage to match example pattern
5. Test locally (build + browser)
6. Show user the fix
7. Wait for approval
8. THEN commit
```

### When Something Looks Wrong
```bash
1. Am I using the right component?
2. Did I check the README?
3. Am I passing correct props?
4. Did I check examples?
5. IF ALL YES: discuss with user
```

---

## 📚 Related Documents

- [TEST_PLAN.md](./TEST_PLAN.md) - Mandatory testing process
- [CLAUDE.md](./CLAUDE.md) - AI agent instructions
- [COMPONENT_CATALOG.md](./COMPONENT_CATALOG.md) - All components
- [ARCHITECTURE.md](./ARCHITECTURE.md) - System structure
- [FIGMA_GUIDE.md](./FIGMA_GUIDE.md) - Figma to code workflow

---

## 🔄 This Document Evolution

**Update this document when:**
- User provides process feedback
- New patterns emerge
- Common mistakes identified
- Testing workflow improves
- Deployment process changes

**Last updated**: 2025-10-29
**Contributors**: User feedback, Claude Code

---

**Remember**: Plan before coding. Test before showing. Commit after approval. Deploy only when requested.
