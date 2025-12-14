import React, { useMemo } from 'react';
import { format, isSameDay, isToday, addDays, startOfDay } from 'date-fns';
import { CalendarEvent } from '../types';
import { cn } from '../utils';

interface AgendaViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  onEventClick?: (event: CalendarEvent) => void;
}

export const AgendaView: React.FC<AgendaViewProps> = ({
  currentDate,
  events,
  onEventClick,
}) => {
  // Group events by day for the next 30 days starting from currentDate
  const groupedEvents = useMemo(() => {
    const startDate = startOfDay(currentDate);
    const endDate = addDays(startDate, 30); // Show next 30 days
    
    const groups: { date: Date; events: CalendarEvent[] }[] = [];
    
    // Sort all events by start time first
    const sortedEvents = [...events].sort((a, b) => a.start.getTime() - b.start.getTime());

    // Iterate through the next 30 days
    for (let i = 0; i < 30; i++) {
        const day = addDays(startDate, i);
        const dayEvents = sortedEvents.filter(event => isSameDay(event.start, day));
        
        if (dayEvents.length > 0) {
            groups.push({ date: day, events: dayEvents });
        }
    }
    
    return groups;
  }, [currentDate, events]);

  return (
    <div className="flex flex-col h-full bg-background overflow-y-auto p-4">
      {groupedEvents.length === 0 ? (
        <div className="flex items-center justify-center h-full text-muted-foreground">
          No upcoming events
        </div>
      ) : (
        <div className="max-w-3xl mx-auto w-full space-y-8 pb-10">
            {groupedEvents.map((group) => (
                <div key={group.date.toISOString()} className="flex flex-col gap-2">
                    {/* Date Header */}
                    <div className="sticky top-0 bg-background/95 backdrop-blur-sm py-2 z-10 flex items-baseline gap-3 border-b border-border pb-2">
                        <span className={cn(
                            "text-2xl font-bold",
                            isToday(group.date) ? "text-primary" : "text-foreground"
                        )}>
                            {format(group.date, 'd')}
                        </span>
                        <div className="flex flex-col">
                            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                                {format(group.date, 'EEE')}
                            </span>
                            <span className="text-xs text-muted-foreground/60 font-normal">
                                {format(group.date, 'MMMM yyyy')}
                            </span>
                        </div>
                    </div>

                    {/* Events List */}
                    <div className="flex flex-col gap-3 pl-4 md:pl-12 pt-2">
                        {group.events.map(event => (
                            <div 
                                key={event.id}
                                onClick={() => onEventClick?.(event)}
                                className="group flex items-start gap-4 p-3 rounded-xl border border-border/40 hover:border-primary/50 hover:bg-accent/30 transition-all cursor-pointer bg-card shadow-sm"
                            >
                                {/* Time Column */}
                                <div className="flex flex-col items-end min-w-[80px] pt-0.5">
                                    {event.allDay ? (
                                        <span className="text-xs font-semibold text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                                            All Day
                                        </span>
                                    ) : (
                                        <>
                                            <span className="text-sm font-semibold text-foreground">
                                                {format(event.start, 'h:mm a')}
                                            </span>
                                            <span className="text-xs text-muted-foreground">
                                                {format(event.end, 'h:mm a')}
                                            </span>
                                        </>
                                    )}
                                </div>

                                {/* Color Indicator */}
                                <div 
                                    className="w-1.5 h-full min-h-[40px] rounded-full self-stretch shrink-0" 
                                    style={{ backgroundColor: event.color || 'var(--primary)' }}
                                />

                                {/* Event Details */}
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                                        {event.title}
                                    </h4>
                                    {event.description && (
                                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                            {event.description}
                                        </p>
                                    )}
                                    {event.calendarId && (
                                        <div className="mt-2 flex items-center gap-1.5">
                                            <div className="w-2 h-2 rounded-full bg-current opacity-60" style={{ color: event.color }} />
                                            <span className="text-xs text-muted-foreground font-medium">
                                                Calendar
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
      )}
    </div>
  );
};
