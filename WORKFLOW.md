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

**DO NOT proceed until you understand:**
- What components exist
- What patterns to use
- What the correct API signatures are

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

**Example**:
```tsx
// ❌ Wrong - made up API
<GlobalNav
  brand="docusign"
  links={navItems}
/>

// ✅ Correct - checked README
<GlobalNav
  logo={<Heading level={3}>docusign</Heading>}
  navItems={navItems}
  showSearch
/>
```

**Fix**:
1. Read component README BEFORE using
2. Check existing examples
3. Use exact prop names from API

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
1. Read COMPONENT_CATALOG.md
2. Check layer READMEs for APIs
3. Create TodoWrite list
4. Implement using existing components
5. Test with Playwright (TEST_PLAN.md)
6. Commit after tests pass
7. Show user, wait for approval
8. Push to GitHub after approval
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
