# Changelog

All notable changes to CalendarKit Basic will be documented in this file.

## [1.0.0] - 2025-12-16

### New Features

#### Event Overlap Detection
- Smart collision detection algorithm for overlapping events
- Events scheduled at the same time are displayed side-by-side
- Automatic column assignment ensures all events remain visible
- Works in both Week and Day views

#### Week Start Configuration
- New `weekStartsOn` prop to configure the first day of the week
- Accepts values 0 (Sunday) through 6 (Saturday)
- Affects Week view, Month view, and Mini Calendar in sidebar
- Default: 0 (Sunday)

```tsx
<BasicScheduler
  weekStartsOn={1} // Start week on Monday
  // ...other props
/>
```

#### Custom Event Renderer
- New `renderEvent` prop for complete control over event appearance
- Receives event data, current view type, and click handler
- Works across all views (Month, Week, Day)

```tsx
<BasicScheduler
  renderEvent={({ event, view, onClick }) => (
    <div onClick={onClick} className="custom-event">
      <span>{event.title}</span>
      {view !== 'month' && <span>{format(event.start, 'h:mm a')}</span>}
    </div>
  )}
  // ...other props
/>
```

#### Event View Modal
- New read-only modal when clicking existing events
- Displays event details (title, date/time, description)
- Color-coded header matching event color
- "Edit" button to switch to edit mode
- "Delete" button for event removal
- Respects `readOnly` prop

### UI/UX Improvements

#### Event Modal Redesign
- Modern card-based layout with rounded corners
- Gradient header with event color integration
- Inline color picker with predefined color dots
- Expandable description textarea
- Smooth open/close animations
- Improved form validation feedback

#### View Headers
- Gradient backgrounds on all view headers
- Glass morphism effect with backdrop blur
- Sticky headers that remain visible while scrolling
- Improved typography and spacing

#### Event Cards
- Glass effect with subtle transparency
- Color accent bars on the left edge
- Smooth hover animations (scale, shadow)
- Better contrast for event text
- Improved time display formatting

#### Dark Mode
- Polished dark mode color palette
- Improved contrast ratios
- Custom scrollbar styling for dark mode
- Better border and shadow treatment

#### Animations
- View transition animations (fade + slide)
- Modal open/close animations with spring physics
- Current time indicator pulse animation
- Hover state micro-interactions

### Mobile Improvements

#### Swipe Navigation
- Swipe left/right to navigate between time periods
- Works on Week, Month, and Day views
- Configurable swipe threshold
- Smooth gesture handling

#### Mobile Bottom Sheet
- Quick access to mini calendar
- Calendar filter toggles
- View switcher
- Optimized touch targets

#### Floating Action Buttons
- Calendar/filter button for quick access
- Create event FAB (respects readOnly)
- Touch-optimized sizing

### Components

#### Loading Skeletons
- `CalendarSkeleton` - Full calendar loading state
- `MonthViewSkeleton` - Month view placeholder
- `WeekViewSkeleton` - Week view placeholder
- `DayViewSkeleton` - Day view placeholder
- Animated shimmer effect

```tsx
import { CalendarSkeleton } from '@anthropic/calendarkit-basic';

{isLoading ? <CalendarSkeleton /> : <BasicScheduler ... />}
```

#### Empty State
- `EmptyState` component for no-events state
- Customizable icon, title, and description
- Optional action button
- Clean, centered layout

```tsx
import { EmptyState } from '@anthropic/calendarkit-basic';

<EmptyState
  title="No events"
  description="Create your first event to get started"
  actionLabel="Create Event"
  onAction={() => openCreateModal()}
/>
```

### Technical Improvements

- Virtualized rendering in Week view for better performance
- Optimized re-renders with proper memoization
- Improved TypeScript types
- Better prop validation
- Cleaner component architecture

### New Exports

```tsx
// Components
export { BasicScheduler } from './scheduler';
export { CalendarSkeleton, MonthViewSkeleton, WeekViewSkeleton, DayViewSkeleton } from './scheduler/components/Skeleton';
export { EmptyState } from './scheduler/components/EmptyState';

// Types
export type { CalendarEvent, ViewType, CalendarProps } from './scheduler/types';
```

---

## [0.1.1] - Initial Release

- Basic calendar with Month, Week, and Day views
- Event creation and editing
- Mini calendar sidebar
- Calendar filtering
- Responsive design
- Light/dark mode support
