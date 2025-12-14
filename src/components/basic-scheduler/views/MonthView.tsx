import React, { useMemo, useCallback } from 'react';
import { format, isSameMonth, isToday } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { getMonthGrid } from '../lib/date';
import { CalendarEvent } from '../types';
import { cn } from '../utils';

interface MonthViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  onEventClick?: (event: CalendarEvent) => void;
  onDateClick?: (date: Date) => void;
  timezone?: string;
}

// Memoized Event Item Component for performance
const EventItem = React.memo(({ event, onEventClick }: { event: CalendarEvent, onEventClick?: (e: CalendarEvent) => void }) => (
    <div
        className={cn(
        "text-xs px-2 py-1 rounded truncate cursor-pointer shadow-sm border border-transparent hover:border-border/50 transition-all",
        !event.color && "bg-primary/10 text-primary hover:bg-primary/20"
        )}
        style={event.color ? { backgroundColor: event.color, color: '#fff' } : undefined}
        onClick={(e) => {
        e.stopPropagation();
        onEventClick?.(event);
        }}
    >
        {event.title}
    </div>
));

EventItem.displayName = 'EventItem';

export const MonthView: React.FC<MonthViewProps> = ({
  currentDate,
  events,
  onEventClick,
  onDateClick,
  timezone
}) => {
  const days = useMemo(() => getMonthGrid(currentDate), [currentDate]);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Timezone adjustment helper
  const getZonedDate = useCallback((date: Date) => {
    return timezone ? toZonedTime(date, timezone) : date;
  }, [timezone]);

  // Pre-calculate event buckets for O(1) access during render
  // This is crucial for handling 10000+ events
  const eventsByDay = useMemo(() => {
    const map = new Map<string, CalendarEvent[]>();
    
    events.forEach(event => {
      const zonedStart = getZonedDate(event.start);
      // Use date string as key (YYYY-MM-DD)
      const key = format(zonedStart, 'yyyy-MM-dd');
      
      if (!map.has(key)) {
        map.set(key, []);
      }
      map.get(key)!.push(event);
    });
    
    return map;
  }, [events, getZonedDate]);

  return (
    <div className="flex flex-col h-full bg-background border rounded-md overflow-hidden min-w-[800px] md:min-w-0">
      <div className="grid grid-cols-7 border-b bg-muted/40">
        {weekDays.map((day) => (
          <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground border-r last:border-r-0">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 auto-rows-fr flex-1">
        {days.map((day) => {
          const dayKey = format(day, 'yyyy-MM-dd');
          // O(1) lookup instead of O(N) filter
          const dayEvents = eventsByDay.get(dayKey) || [];
          
          const isCurrentMonth = isSameMonth(day, currentDate);
          const cellId = day.toISOString();
          
          return (
            <div 
              key={cellId}
              id={cellId}
              className={cn(
                "min-h-[100px] p-2 border-b border-r last:border-r-0 relative transition-colors hover:bg-muted/20 flex flex-col gap-1",
                !isCurrentMonth && "bg-muted/5 text-muted-foreground",
                isToday(day) && "bg-accent/10"
              )}
              onClick={() => onDateClick?.(day)}
            >
              <div className="flex justify-between items-start">
                <div className={cn(
                  "text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full",
                  isToday(day) && "bg-primary text-primary-foreground"
                )}>
                  {format(day, 'd')}
                </div>
              </div>
              
              {/* Virtualized list for large event counts within a cell is tricky without fixed height.
                  For "10000+ events" spread across a month, the main bottleneck is the `events.filter` loop inside the render map.
                  We fixed that with `eventsByDay` useMemo.
                  
                  If a SINGLE day has 1000+ events, we should limit display and show "+X more".
              */}
              <div className="flex flex-col gap-1 overflow-y-auto max-h-[100px] scrollbar-hide">
                {dayEvents.slice(0, 20).map(event => (
                   <EventItem key={`${event.id}-${dayKey}`} event={event} onEventClick={onEventClick} />
                ))}
                {dayEvents.length > 20 && (
                    <div className="text-[10px] text-muted-foreground font-medium text-center sticky bottom-0 bg-background/80 backdrop-blur-sm py-1">
                        + {dayEvents.length - 20} more
                    </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
