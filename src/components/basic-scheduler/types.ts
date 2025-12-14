import { Locale } from 'date-fns';

export type ViewType = 'month' | 'week' | 'day';

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  description?: string;
  color?: string;
  allDay?: boolean;
  calendarId?: string;
  // eslint-disable-next-line
  [key: string]: any;
}

export interface ThemeColors {
  primary?: string;
  secondary?: string;
  background?: string;
  foreground?: string;
  border?: string;
  muted?: string;
  accent?: string;
}

export interface CalendarTheme {
  colors?: ThemeColors;
  fontFamily?: string;
  borderRadius?: string;
  // Future: lightColors, darkColors
}

export interface CalendarProps {
  events?: CalendarEvent[];
  view?: ViewType;
  onViewChange?: (view: ViewType) => void;
  date?: Date;
  onDateChange?: (date: Date) => void;
  onEventClick?: (event: CalendarEvent) => void;
  onEventDrop?: (event: CalendarEvent, start: Date, end: Date) => void;
  onEventResize?: (event: CalendarEvent, start: Date, end: Date) => void;
  onEventCreate?: (event: Partial<CalendarEvent>) => void;
  onEventUpdate?: (event: CalendarEvent) => void;
  onEventDelete?: (eventId: string) => void;
  theme?: CalendarTheme;
  locale?: Locale; // from date-fns
  className?: string;
  readOnly?: boolean;
  calendars?: {
    id: string;
    label: string;
    color?: string;
    active?: boolean;
  }[];
  onCalendarToggle?: (calendarId: string, active: boolean) => void;
  isLoading?: boolean;
  isDarkMode?: boolean;
  onThemeToggle?: () => void;
  renderEventForm?: (props: {
    isOpen: boolean;
    onClose: () => void;
    event?: CalendarEvent | null;
    initialDate?: Date;
    onSave: (event: Partial<CalendarEvent>) => void;
    onDelete?: (eventId: string) => void;
  }) => React.ReactNode;
}
