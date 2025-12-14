import React from 'react';
import { format, differenceInMinutes, isToday, isSameDay } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { CalendarEvent } from '../types';
import { cn } from '../utils';
import { DraggableEvent } from '../components/dnd/DraggableEvent';
import { DroppableCell } from '../components/dnd/DroppableCell';
import { Locale } from 'date-fns';

interface DayViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  onEventClick?: (event: CalendarEvent) => void;
  onTimeSlotClick?: (date: Date) => void;
  timezone?: string;
  locale?: Locale;
}

export const DayView: React.FC<DayViewProps> = ({
  currentDate,
  events,
  onEventClick,
  onTimeSlotClick,
  timezone,
  locale
}) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const hourHeight = 80; // Larger height for Day View
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const [now, setNow] = React.useState(new Date());

  React.useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll to 8am on mount
  React.useEffect(() => {
    if (scrollContainerRef.current) {
      const scrollTo8am = 8 * hourHeight;
      scrollContainerRef.current.scrollTop = scrollTo8am;
    }
  }, []);

  // Timezone adjustment helper
  const getZonedDate = (date: Date) => {
    return timezone ? toZonedTime(date, timezone) : date;
  };

  const zonedNow = getZonedDate(now);

  // Filter events for the current day
  const dayEvents = events.filter(e => {
    const zonedStart = getZonedDate(e.start);
    return isSameDay(zonedStart, currentDate);
  });

  const timeFormat = locale?.code === 'fr' ? 'H:mm' : 'h a';
  const eventTimeFormat = locale?.code === 'fr' ? 'H:mm' : 'h:mm a';
  const nowFormat = locale?.code === 'fr' ? 'H:mm' : 'h:mm a';

  return (
    <div className="flex flex-col h-full bg-background border rounded-2xl overflow-hidden shadow-sm">
        {/* Header */}
        <div className="p-4 border-b bg-muted/30 text-center shrink-0 backdrop-blur-sm">
            <h2 className="text-lg font-semibold capitalize">
                {format(currentDate, 'EEEE, MMMM d, yyyy', { locale })}
            </h2>
            {isToday(currentDate) && <span className="text-xs font-medium bg-primary text-primary-foreground px-2 py-0.5 rounded ml-2">Today</span>}
        </div>

        {/* Grid */}
        <div ref={scrollContainerRef} className="flex-1 overflow-y-auto relative">
            <div className="flex relative" style={{ height: hours.length * hourHeight }}>
                {/* Time Labels */}
                <div className="w-20 bg-muted/5 border-r divide-y relative">
                     {hours.map((hour) => (
                        <div 
                            key={hour} 
                            className="relative border-b border-border box-border"
                            style={{ height: hourHeight }}
                        >
                            {hour !== 0 && (
                                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs text-muted-foreground font-medium tabular-nums bg-background/50 px-1 rounded-sm">
                                    {format(new Date().setHours(hour, 0, 0, 0), timeFormat, { locale })}
                                </span>
                            )}
                        </div>
                     ))}
                     
                     {/* Left Side Current Time Indicator (Overlay) */}
                     {isToday(currentDate) && (
                         <div 
                             className="absolute left-0 w-full pointer-events-none z-30 flex justify-end pr-2"
                             style={{
                                 top: `${(zonedNow.getHours() * 60 + zonedNow.getMinutes()) / 60 * hourHeight}px`,
                             }}
                         >
                             <span className="text-[10px] font-bold text-white bg-primary px-1.5 py-0.5 rounded-md shadow-sm -translate-y-1/2">
                                 {format(zonedNow, nowFormat, { locale })}
                             </span>
                         </div>
                     )}
                </div>

                {/* Day Column */}
                <div className="flex-1 relative">
                     {hours.map((hour) => {
                         return (
                            <div 
                                key={hour} 
                                className="border-b border-border/50 border-dashed box-border relative"
                                style={{ height: hourHeight }}
                            >
                                {/* 4 x 15-minute intervals */}
                                {[0, 15, 30, 45].map((minute) => {
                                    const cellDate = new Date(currentDate);
                                    cellDate.setHours(hour, minute, 0, 0);
                                    const cellId = cellDate.toISOString();
                                    
                                    return (
                                        <DroppableCell 
                                            key={minute}
                                            id={cellId}
                                            date={cellDate}
                                            className="w-full absolute left-0 right-0 z-0 transition-colors"
                                            style={{ 
                                                height: '25%', 
                                                top: `${(minute / 60) * 100}%` 
                                            }}
                                        >
                                            <div 
                                                className="h-full w-full bg-transparent cursor-pointer"
                                                onClick={() => onTimeSlotClick?.(cellDate)}
                                            />
                                        </DroppableCell>
                                    );
                                })}
                            </div>
                         );
                     })}

                     {dayEvents.map(event => {
                       const zonedStart = getZonedDate(event.start);
                       const zonedEnd = getZonedDate(event.end);

                       const startMinutes = zonedStart.getHours() * 60 + zonedStart.getMinutes();
                       const durationMinutes = differenceInMinutes(zonedEnd, zonedStart);
                       const top = (startMinutes / 60) * hourHeight;
                       const height = (durationMinutes / 60) * hourHeight;

                       return (
                         <DraggableEvent
                            key={`${event.id}-${currentDate.toISOString()}`}
                            event={event}
                            className="absolute left-2 right-2 z-10"
                            style={{ top: `${top}px` }}
                         >
                            <div
                                className={cn(
                                    "rounded px-3 py-2 text-sm overflow-hidden cursor-pointer hover:brightness-95 border border-white/20 shadow-sm transition-all hover:z-10 hover:shadow-md",
                                    !event.color && "bg-primary text-primary-foreground"
                                )}
                                style={{
                                    height: `${Math.max(height, 40)}px`,
                                    backgroundColor: event.color,
                                    color: event.color ? '#fff' : undefined,
                                }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onEventClick?.(event);
                                }}
                            >
                            <div className="font-semibold">{event.title}</div>
                            <div className="text-xs opacity-90 mb-1">
                                {format(zonedStart, eventTimeFormat, { locale })} - {format(zonedEnd, eventTimeFormat, { locale })}
                            </div>
                            {event.description && (
                                <div className="text-xs opacity-80 line-clamp-2">
                                    {event.description}
                                </div>
                            )}
                            </div>
                         </DraggableEvent>
                       );
                     })}
                     
                     {/* Current Time Indicator */}
                     {isToday(currentDate) && (
                       <div 
                         className="absolute left-0 right-0 z-20 pointer-events-none flex items-center"
                         style={{
                           top: `${(zonedNow.getHours() * 60 + zonedNow.getMinutes()) / 60 * hourHeight}px`
                         }}
                       >
                         {/* Line */}
                         <div className="h-[2px] w-full bg-primary shadow-[0_0_4px_rgba(var(--primary),0.5)]" />
                         {/* Dot */}
                         <div className="absolute -left-1.5 w-3 h-3 bg-primary rounded-full shadow-md ring-2 ring-background" />
                       </div>
                     )}
                </div>
            </div>
        </div>
    </div>
  );
};
