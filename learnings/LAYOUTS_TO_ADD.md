# L6 Layouts To Add

> Specifications for new layout templates based on DocuSign production analysis.

---

## Current L6 Layout

### DocuSignShell (Existing)
Already implemented with:
- GlobalNav slot
- LocalNav slot
- Content area
- Responsive behavior

---

## 1. DetailShell Layout

**Purpose**: Full-width layout for detail/view pages without sidebar.

### When to Use
- Agreement detail pages
- Document preview pages
- Any single-item view

### Structure
```tsx
<DetailShell
  header={<DetailHeader title="..." status={...} />}
  alert={<AlertBanner message="..." />}
  tabs={<Tabs items={[...]} />}
  sidebar={<DocumentsSidebar />}
>
  {/* Tab content */}
</DetailShell>
```

### Visual Structure
```
┌─────────────────────────────────────────────────────────────┐
│ GlobalNav (64px)                                             │
├─────────────────────────────────────────────────────────────┤
│ DetailHeader                                                 │
│ [Status] Title                            [Actions]          │
│ Metadata line                                                │
├─────────────────────────────────────────────────────────────┤
│ AlertBanner (conditional)                                    │
├─────────────────────────────────────────────────────────────┤
│ Tabs                                                         │
├────────────────────────────────────┬────────────────────────┤
│ Main Content (scrollable)          │ Right Sidebar (fixed)  │
│                                    │ - Documents            │
│                                    │ - Related info         │
└────────────────────────────────────┴────────────────────────┘
```

### Props
| Prop | Type | Description |
|------|------|-------------|
| header | ReactNode | DetailHeader component |
| alert | ReactNode | Optional alert banner |
| tabs | ReactNode | Tab navigation |
| sidebar | ReactNode | Right sidebar content |
| children | ReactNode | Main content area |

### Key Measurements
- No left sidebar
- Right sidebar: ~250px (optional)
- Content padding: 24px
- Max content width: none

---

## 2. DashboardShell Layout

**Purpose**: Full-width layout for dashboard/home pages.

### When to Use
- Home page
- Overview dashboards
- Any page without left navigation

### Structure
```tsx
<DashboardShell
  hero={
    <HeroBanner
      title="Welcome back, User"
      actions={[...]}
    />
  }
>
  <Grid columns={2}>
    <Card>Tasks</Card>
    <Card>Overview</Card>
  </Grid>
  <Card>Activity</Card>
</DashboardShell>
```

### Visual Structure
```
┌─────────────────────────────────────────────────────────────┐
│ GlobalNav (64px)                                             │
├─────────────────────────────────────────────────────────────┤
│ HeroBanner (purple gradient)                                 │
│ Welcome message + Quick actions                              │
├─────────────────────────────────────────────────────────────┤
│ Content Area                                                 │
│ ┌──────────────────────┐  ┌──────────────────────┐          │
│ │ Widget 1             │  │ Widget 2             │          │
│ └──────────────────────┘  └──────────────────────┘          │
│ ┌───────────────────────────────────────────────────────┐   │
│ │ Full-width widget                                      │   │
│ └───────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Props
| Prop | Type | Description |
|------|------|-------------|
| hero | ReactNode | Hero banner component |
| children | ReactNode | Dashboard content |
| footer | ReactNode | Optional footer |

### Key Measurements
- No sidebar
- Hero: ~120px height
- Content padding: 24-32px
- Grid gap: 24px

---

## 3. SettingsShell Layout

**Purpose**: Settings layout with dedicated settings navigation.

### When to Use
- Admin settings
- Account settings
- Configuration pages

### Structure
```tsx
<SettingsShell
  navigation={
    <SettingsNav
      sections={[
        { title: "ACCOUNT", items: [...] },
        { title: "USERS", items: [...] },
      ]}
    />
  }
>
  <FormSection title="General">...</FormSection>
  <FormSection title="Notifications">...</FormSection>
</SettingsShell>
```

### Visual Structure
```
┌─────────────────────────────────────────────────────────────┐
│ GlobalNav (64px)                                             │
├──────────┬──────────────────────────────────────────────────┤
│ Settings │ Content Area                                      │
│ Nav      │                                                   │
│ (280px)  │ ┌───────────────────────────────────────────┐    │
│          │ │ Section Title                              │    │
│ ACCOUNT  │ │ ─────────────────────────────────────────  │    │
│ - Item1  │ │ Form fields                               │    │
│ - Item2  │ │                                           │    │
│          │ └───────────────────────────────────────────┘    │
│ USERS    │                                                   │
│ - Item1  │ ┌───────────────────────────────────────────┐    │
│          │ │ Section Title                              │    │
│ SIGNING  │ │ ─────────────────────────────────────────  │    │
│ - Item1  │ │ Form fields                               │    │
│          │ └───────────────────────────────────────────┘    │
│          │                                                   │
│          │                    [Save] [Cancel]                │
└──────────┴──────────────────────────────────────────────────┘
```

### Props
| Prop | Type | Description |
|------|------|-------------|
| navigation | ReactNode | Settings navigation |
| children | ReactNode | Settings content |
| footer | ReactNode | Save/cancel buttons |

### Key Measurements
- Settings nav: 280px
- Section headers: 12px, 600 weight, uppercase
- Form field spacing: 24px
- Content max-width: 800px (optional)

---

## 4. WizardShell Layout

**Purpose**: Multi-step workflow with stepper.

### When to Use
- Envelope creation
- Template setup
- Onboarding flows
- Multi-step forms

### Structure
```tsx
<WizardShell
  stepper={
    <Stepper
      steps={["Upload", "Add Recipients", "Review"]}
      currentStep={1}
    />
  }
  footer={
    <WizardFooter
      onBack={handleBack}
      onNext={handleNext}
      nextLabel="Continue"
    />
  }
>
  {/* Step content */}
</WizardShell>
```

### Visual Structure
```
┌─────────────────────────────────────────────────────────────┐
│ GlobalNav (64px) - possibly simplified                       │
├─────────────────────────────────────────────────────────────┤
│ Stepper                                                      │
│ ○────────●────────○                                         │
│ Upload   Recipients  Review                                  │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│ Step Content Area                                            │
│                                                              │
│                                                              │
│                                                              │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│ Footer                                    [Back] [Continue]  │
└─────────────────────────────────────────────────────────────┘
```

### Props
| Prop | Type | Description |
|------|------|-------------|
| stepper | ReactNode | Stepper component |
| children | ReactNode | Current step content |
| footer | ReactNode | Navigation footer |
| onClose | function | Close/cancel handler |

### Key Measurements
- Stepper height: ~80px
- Footer height: ~72px
- Content centered, max-width: 800-1000px
- Content padding: 32px

---

## 5. SubTabShell Layout

**Purpose**: Pages with sub-navigation tabs below GlobalNav.

### When to Use
- Templates page (Templates / Elastic Templates)
- Pages with multiple views of same data

### Structure
```tsx
<SubTabShell
  tabs={[
    { label: "Templates", href: "/templates" },
    { label: "Elastic Templates", href: "/elastic" },
  ]}
  activeTab="templates"
  sidebar={<LocalNav items={...} />}
>
  <PageHeader title="My Templates" />
  <ActionBar ... />
  <DataTable ... />
</SubTabShell>
```

### Visual Structure
```
┌─────────────────────────────────────────────────────────────┐
│ GlobalNav (64px)                                             │
├─────────────────────────────────────────────────────────────┤
│ SubTabs                                                      │
│ [Tab 1] [Tab 2]                                              │
├──────────┬──────────────────────────────────────────────────┤
│ LocalNav │ Content                                           │
│          │                                                   │
└──────────┴──────────────────────────────────────────────────┘
```

### Props
| Prop | Type | Description |
|------|------|-------------|
| tabs | TabItem[] | Tab items |
| activeTab | string | Current active tab |
| sidebar | ReactNode | Optional LocalNav |
| children | ReactNode | Page content |

### Key Measurements
- SubTabs height: ~44px
- SubTabs top: 64px (no gap from GlobalNav)
- Tab padding: 12px 20px
- Active tab: 500 weight, underline indicator

---

## 6. ErrorShell Layout (Pass 5)

**Purpose**: Centered error page layout without sidebar.

### When to Use
- 404 Not Found pages
- 500 Error pages
- Permission denied pages
- Any error state

### Structure
```tsx
<ErrorShell>
  <ErrorIllustration variant="404" />
  <ErrorContent
    title="Looks like this page is not here"
    description="Check your URL, or go back"
    action={<Button variant="outline" onClick={goBack}>Go Back</Button>}
  />
</ErrorShell>
```

### Visual Structure
```
┌─────────────────────────────────────────────────────────────┐
│ GlobalNav (64px, minimal)                                    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│               ~~~~ Illustration ~~~~                         │
│                   (200px height)                             │
│                                                              │
│              Error Title (32px, 700)                         │
│            Description (16px, 400)                           │
│                                                              │
│                  [ Action Button ]                           │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Props
| Prop | Type | Description |
|------|------|-------------|
| children | ReactNode | Error content |
| showNav | boolean | Show minimal nav (default: true) |

### Key Measurements
- No sidebar
- Centered content (both horizontally and vertically)
- Error title: 32px, 700 weight, pure black
- Description: 16px, 400 weight
- Action button: outline variant, 40px height

---

## 7. ReportsShell Layout (Pass 5)

**Purpose**: Reports/analytics layout with chart grids.

### When to Use
- Reports overview
- Analytics dashboards
- Data visualization pages

### Structure
```tsx
<ReportsShell
  sidebar={<ReportsNav sections={...} />}
  header={<PageHeader title="Overview" />}
  search={<SearchInput placeholder="Find reports" />}
>
  <CardGrid columns={2}>
    <RecentsCard items={recents} />
    <FavoritesCard items={favorites} />
  </CardGrid>
  <SectionHeader title="Review your agreements" action={<Link>View Dashboard</Link>} />
  <ChartGrid columns={2}>
    <ChartCard title="Renewals" chart={...} />
    <ChartCard title="Agreement Types" chart={...} />
  </ChartGrid>
</ReportsShell>
```

### Visual Structure
```
┌─────────────────────────────────────────────────────────────┐
│ GlobalNav (64px)                                             │
├──────────┬──────────────────────────────────────────────────┤
│ Reports  │ PageHeader                                        │
│ Nav      ├──────────────────────────────────────────────────┤
│ (220px)  │ Search Input                                      │
│          ├──────────────────────────────────────────────────┤
│ Overview │ ┌────────────┐  ┌────────────┐                   │
│ Dashbrd  │ │ Recents    │  │ Favorites  │                   │
│ Custom   │ └────────────┘  └────────────┘                   │
│ Reports  │ Section Header            [View Dashboard →]      │
│          │ ┌────────────┐  ┌────────────┐                   │
│          │ │ Chart 1    │  │ Chart 2    │                   │
│          │ │ (584x400)  │  │ (584x400)  │                   │
│          │ └────────────┘  └────────────┘                   │
└──────────┴──────────────────────────────────────────────────┘
```

### Key Measurements
- Chart cards: 584px × 400px
- Two-column grid
- Grid gap: 24px
- Sidebar: 220px (narrower than standard 280px)

---

## Implementation Priority

1. **DetailShell** - Needed for all detail views
2. **DashboardShell** - Home page, overview pages
3. **WizardShell** - Envelope creation, key flows
4. **SettingsShell** - Admin pages
5. **SubTabShell** - Templates, specialized pages
6. **ErrorShell** - Error states
7. **ReportsShell** - Analytics pages

---

## Layout Composition Examples

### Navigator Page (Current)
```tsx
<DocuSignShell
  globalNav={<GlobalNav />}
  localNav={<LocalNav items={navigatorNav} />}
>
  <PageHeader title="Completed" badge="AI-Assisted" />
  <InfoBanner message="..." />
  <ActionBar search filters />
  <DataTable columns rows />
  <Pagination />
</DocuSignShell>
```

### Detail Page (New)
```tsx
<DetailShell
  header={<DetailHeader title="Document.pdf" status="Voided" />}
  alert={<AlertBanner variant="warning" message="Expired" />}
  tabs={<Tabs items={["Recipients", "Details"]} />}
  sidebar={<DocumentsSidebar documents={docs} />}
>
  <RecipientList recipients={recipients} />
</DetailShell>
```

### Home Page (New)
```tsx
<DashboardShell
  hero={<HeroBanner title="Welcome back" actions={quickActions} />}
>
  <Grid columns={2}>
    <TasksCard tasks={tasks} />
    <OverviewCard stats={stats} />
  </Grid>
  <ActivityCard items={activity} />
</DashboardShell>
```

---

*Generated from DocuSign production analysis - Pass 1, 2, 3, 4 & 5*
