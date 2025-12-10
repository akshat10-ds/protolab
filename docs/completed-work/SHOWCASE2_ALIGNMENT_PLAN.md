# ComponentShowcase2 Alignment Plan

**Date**: 2025-11-07
**Goal**: Align ComponentShowcase2 with official DocuSign Ink Design System APIs and token naming

**Reference Source**: `/Users/akshat.mishra/Documents/Claude Prototypes/Review DS Design system Files`

---

## 🎯 **Approach: Layer-by-Layer Validation**

Fix and validate **one layer at a time** (Layer 1 → Layer 6) to prevent cascading issues and ensure incremental confidence.

---

## **LAYER 1: Tokens** 🎨

**Status**: 🔄 In Progress

**What to fix:**
- Verify color primitives display correctly
- Check typography token examples render properly
- Validate spacing scale visualization
- Ensure border radius examples work
- Confirm shadow tokens display

**Changes needed:**
- Fix any `gap="xxsmall/xsmall/xlarge"` → valid Stack gaps
- Verify token naming matches official design system
- Check font loading (DS Indigo)

**Validation checklist:**
- [ ] Color swatches render
- [ ] Typography samples show correct fonts/sizes
- [ ] Spacing examples are visible
- [ ] No console errors
- [ ] Page doesn't look broken/cramped

**Files affected:**
- `/src/examples/ComponentShowcase2.tsx` (Tokens section)

---

## **LAYER 2: Utilities** 📦

**Status**: ⏸️ Pending Layer 1 approval

**What to fix:**
- Stack component examples
- Grid component examples
- Inline component examples
- Container component examples
- Spacer component examples

**Changes needed:**
- Fix all `gap="xxsmall/xsmall/xlarge"` usages
- Verify Stack/Grid prop usage matches our implementation
- Check alignment/justify values are valid

**Validation checklist:**
- [ ] Stack examples show proper spacing
- [ ] Grid layouts render correctly
- [ ] Inline examples work
- [ ] No layout breaking issues

**Files affected:**
- `/src/examples/ComponentShowcase2.tsx` (Utilities section)

---

## **LAYER 3: Primitives** 🧱

**Status**: ⏸️ Pending Layer 2 approval

**Components:**
- Button, IconButton, Link
- Icon (**CRITICAL**)
- Input, Select, Checkbox, Radio, Switch
- TextArea, Slider, Stepper
- Badge, Avatar, Chip, AlertBadge, StatusLight
- Divider, Card, Skeleton
- Typography (Heading, Text)
- Spinner, ProgressBar
- Callout, Banner, Tooltip

**Changes needed:**
- Fix all `<Icon size="sm" />` → `<Icon size="small" />`
- Fix all `<Text color="brand" />` → `<Text color="primary" />` or appropriate alternative
- Verify all primitive prop values are valid

**Validation checklist:**
- [ ] **All icons render** (most critical!)
- [ ] Text colors work for active states
- [ ] All buttons render correctly
- [ ] Form inputs display properly
- [ ] No missing components

**Files affected:**
- `/src/examples/ComponentShowcase2.tsx` (Primitives section)

---

## **LAYER 4: Composites** 🔧

**Status**: ⏸️ Pending Layer 3 approval

**Components:**
- SearchInput, FileInput, ComboBox, DatePicker
- FileUpload, FilterTag
- Breadcrumb, Pagination, Tabs, Accordion
- ComboButton, Modal, Dropdown, Alert
- Table, List

**Changes needed:**
- Fix gaps, icon sizes, text colors in composite examples
- Verify complex component interactions work

**Validation checklist:**
- [ ] Modal opens/closes
- [ ] Tabs switch correctly
- [ ] Table renders
- [ ] Dropdown works
- [ ] All composites display properly

**Files affected:**
- `/src/examples/ComponentShowcase2.tsx` (Composites section)

---

## **LAYER 5: Patterns** 🎭

**Status**: ⏸️ Pending Layer 4 approval

**Components:**
- GlobalNav
- LocalNav
- VerticalNavigation

**Changes needed:**
- Fix icon sizes in navigation
- Fix text colors for active states
- Verify navigation interactions work

**Validation checklist:**
- [ ] GlobalNav renders correctly
- [ ] LocalNav works
- [ ] VerticalNavigation displays properly
- [ ] Active states are visible
- [ ] Navigation is interactive

**Files affected:**
- `/src/examples/ComponentShowcase2.tsx` (Patterns section)

---

## **LAYER 6: Layouts** 🏗️

**Status**: ⏸️ Pending Layer 5 approval

**Components:**
- DashboardLayout
- AuthLayout

**Changes needed:**
- Fix any icon/gap/color issues in layout examples
- Verify layouts compose correctly with patterns

**Validation checklist:**
- [ ] DashboardLayout renders
- [ ] AuthLayout displays
- [ ] Layouts are responsive
- [ ] Everything integrates well

**Files affected:**
- `/src/examples/ComponentShowcase2.tsx` (Layouts section)

---

## 🔍 **Known API Issues to Fix**

### **1. Icon Size**
- ❌ **Wrong**: `<Icon size="sm" />`
- ✅ **Correct**: `<Icon size="small" />`

### **2. Stack Gap**
- ❌ **Wrong**: `gap="xxsmall"`, `gap="xsmall"`, `gap="xlarge"`
- ✅ **Correct**: `gap="small"`, `gap="medium"`, `gap="large"`

### **3. Text Color**
- ❌ **Wrong**: `<Text color="brand" />`
- ✅ **Correct**: `<Text color="primary" />` (for active/emphasized text)

### **4. Official Design System Reference**
- **Spacing tokens**: `spacingGap50`, `spacingGap100`, `spacingGap150`, `spacingGap200`, `spacingGap250`, `spacingGap300`, `spacingGap400`, `spacingGap500`, `spacingGap600`, `spacingGap700`
- **Button sizes**: `'small'`, `'medium'`, `'large'`, `'xlarge'`
- **Button kinds**: `'brand'`, `'primary'`, `'secondary'`, `'tertiary'`, `'danger'`

---

## 📊 **Progress Tracking**

| Layer | Status | Date Completed | Notes |
|-------|--------|----------------|-------|
| Layer 1: Tokens | 🔄 In Progress | - | Starting fixes |
| Layer 2: Utilities | ⏸️ Pending | - | - |
| Layer 3: Primitives | ⏸️ Pending | - | - |
| Layer 4: Composites | ⏸️ Pending | - | - |
| Layer 5: Patterns | ⏸️ Pending | - | - |
| Layer 6: Layouts | ⏸️ Pending | - | - |

---

## 🚀 **Execution Workflow**

For each layer:
1. ✏️ **Fix issues** in that layer's Showcase2 section
2. 🧪 **Test in browser** and report observations
3. 👀 **User validates** - checks the layer independently
4. ✅ **User approves** - gives go-ahead for next layer
5. ➡️ **Move to next layer**

---

## ✅ **Final Validation (After All Layers)**

- [ ] Load `/showcase2` in browser
- [ ] Navigate through ALL 6 layers
- [ ] Verify all icons display
- [ ] Verify all spacing looks correct
- [ ] Verify typography is readable
- [ ] Verify color highlighting works
- [ ] Verify all components render without console errors
- [ ] Document any remaining issues

---

## 📝 **Notes**

- This alignment ensures ComponentShowcase2 uses correct component APIs
- Reference: Official DocuSign Ink Design System files
- Approach: Incremental validation prevents cascading issues
- Goal: Production-ready showcase that accurately demonstrates the design system
