# Development Workflow - Mandatory Process

**CRITICAL**: This workflow MUST be followed for every feature, prototype, or change. No exceptions.

---

## 🚨 Core Principles

1. **Test BEFORE committing** - Always, no exceptions
2. **Use existing patterns correctly** - Don't reinvent components
3. **Fix components FIRST** - Then pages improve automatically
4. **Deploy only when approved** - No premature GitHub pushes
5. **Document everything** - Update .MD files with learnings

---

## 📋 Mandatory Workflow Steps

### Step 1: Understand Requirements
**BEFORE writing ANY code:**

- [ ] Read the request carefully
- [ ] Check COMPONENT_CATALOG.md for existing components
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

### Step 2: Plan Implementation
**BEFORE writing code:**

- [ ] Use TodoWrite tool to create task list
- [ ] Break down into concrete, testable steps
- [ ] Identify which existing components to use
- [ ] Note any component-level improvements needed

**Example todo list:**
```
1. Research existing GlobalNav pattern
2. Check GlobalNav API in 5-patterns/GlobalNav/README.md
3. Implement page using correct GlobalNav props
4. Test with Playwright BEFORE committing
5. Fix any issues found
6. Take screenshot for verification
```

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

### Step 4: Test (MANDATORY - BEFORE COMMITTING)
**Follow TEST_PLAN.md exactly:**

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

**IF ANY TESTS FAIL**: Fix issues and re-test. DO NOT commit broken code.

---

### Step 5: Review Before Commit
**BEFORE committing:**

- [ ] All tests pass
- [ ] Component patterns match existing patterns
- [ ] Used correct component APIs
- [ ] No custom components created unnecessarily
- [ ] Code follows design system architecture

**If patterns don't match:**
1. Check component documentation
2. Look at existing examples
3. Fix implementation to match patterns
4. Re-test

---

### Step 6: Commit (Only After Tests Pass)
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

### Step 7: Get Approval BEFORE Deployment
**DO NOT push to GitHub until user approves:**

1. Show user:
   - Local URL (http://localhost:3000/page)
   - Screenshot
   - List of changes

2. Wait for user approval

3. Only push after explicit approval:
   ```bash
   git push origin branch-name
   ```

**NEVER push automatically after commit.**

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

**Prevention:**
- NEVER use a component without finding a working example first
- Reading the .tsx file ≠ Understanding how to use it
- Always ask: "Where is this pattern used successfully?"

### Violation 1: Committing Without Testing
**Problem**: Code committed before running tests

**Consequences**:
- Broken code in Git history
- Wastes time fixing after the fact
- User has to ask "did you test?"

**Fix**:
```
ALWAYS follow this order:
1. Write code
2. Run tests (TEST_PLAN.md)
3. Fix any issues
4. Re-test
5. ONLY THEN commit
```

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
**Problem**: Pushing to GitHub before user approval

**Consequences**:
- Unfinished work deployed to Vercel
- User sees broken preview
- Wastes deployment resources

**Fix**:
```
Deployment process:
1. Commit locally
2. Show user local version
3. Wait for approval
4. ONLY THEN: git push
```

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

### Starting a New Feature
```bash
1. Read COMPONENT_CATALOG.md (what exists?)
2. Find component in src/design-system
3. grep -r "ComponentName" src/examples/  ← CRITICAL STEP
4. OPEN and READ working example file
5. COPY exact structure from example
6. Create TodoWrite list
7. Implement by adapting example (not guessing)
8. Test with Playwright (TEST_PLAN.md)
9. Commit after tests pass
10. Show user, wait for approval
11. Push to GitHub after approval
```

### Fixing Component Patterns
```bash
1. Read component README
2. Check existing examples
3. Fix usage to match API
4. Test locally
5. Verify it looks correct
6. Commit fix
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

**Remember**: Quality over speed. Test before commit. Use patterns correctly. Deploy only when approved.
