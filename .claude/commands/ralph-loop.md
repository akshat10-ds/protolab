# Ralph Loop - TDD Implementation Runner

You are implementing the Inpage Editor feature using TDD methodology.

## First Step: Read the Test Plan

**READ THE FILE: `ralph`** (located at project root: `/Users/akshat.mishra/Documents/Work/protoLab/ralph`)

This file contains all TDD tests with checkboxes. Find the first unchecked `- [ ]` test and implement it.

## Your Process (RED -> GREEN -> REFACTOR)

For each unchecked test in `ralph`:

1. **READ** the `ralph` file to find the next unchecked `- [ ]` test
2. **RED**: Verify the test currently fails (feature doesn't exist)
3. **GREEN**: Write the minimal code to make that test pass
4. **TEST**: Run `npm run dev` and manually verify OR run build to check compilation
5. **REFACTOR**: Clean up code if needed while keeping test passing
6. **UPDATE**: Mark the test as complete `- [x]` in the `ralph` file
7. **CONTINUE**: Move to the next unchecked test

## Implementation Order (Follow Strictly)

Work through tests in this order:
1. Phase 1: Core Infrastructure (Tests 1.1, 2.1, 2.2)
2. Phase 2: State Connection (Tests 1.2, 1.3, 2.4)
3. Phase 3: Features (Tests 1.5, 2.5, 2.6)
4. Phase 4: Polish (Tests 1.4, 2.7, 2.3)
5. Phase 5: Rollout (Tests 1.8, 2.10)
6. Phase 6: Edge Cases & Integration (E1-E4, I1-I3)

## Key Files Reference

**New files to create:**
- `src/examples/showcase/components/SelectableComponent.tsx`
- `src/examples/showcase/components/InteractivePreview.tsx`

**Files to modify:**
- `src/examples/ComponentShowcase.tsx` - Add state, handlers
- `src/examples/showcase/Showcase.module.css` - Selection styles
- `src/examples/showcase/layers/PrimitivesShowcase.tsx` - Pass props
- `src/examples/showcase/layers/CompositesShowcase.tsx` - Pass props
- `src/examples/showcase/layers/primitives/FormPrimitives.tsx` - Wrap examples
- And other layer/category files as needed

## Rules

1. **One test at a time** - Don't skip ahead
2. **Minimal code** - Only write what's needed to pass current test
3. **Update ralph** - Mark tests complete as you go
4. **Build must pass** - Run `npm run build` periodically to catch type errors
5. **Stay focused** - If blocked, note the issue and move on

## Completion Signal

When ALL tests in `ralph` are marked `- [x]` complete, output:

<promise>RALPH_COMPLETE</promise>

## Start Now

Read the `ralph` file, find the first unchecked test, and begin implementation.
