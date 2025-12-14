import { useState, useMemo } from 'react';
import { 
  addMonths, subMonths, addWeeks, subWeeks, addDays, subDays, 
  differenceInMilliseconds 
} from 'date-fns';
import { RRule } from 'rrule';
import { DragEndEvent } from '@dnd-kit/core';
import { ViewType, CalendarEvent } from '../types';

interface UseCalendarLogicProps {
  events: CalendarEvent[];
  view?: ViewType;
  onViewChange?: (view: ViewType) => void;
  date?: Date;
  onDateChange?: (date: Date) => void;
  onEventClick?: (event: CalendarEvent) => void;
  onEventUpdate?: (event: CalendarEvent) => void;
  onEventCreate?: (event: Partial<CalendarEvent>) => void;
  onEventDelete?: (eventId: string) => void;
  readOnly?: boolean;
}

export const useCalendarLogic = ({
  events,
  view: controlledView,
  onViewChange: controlledOnViewChange,
  date: controlledDate,
  onDateChange: controlledOnDateChange,
  onEventClick,
  onEventUpdate,
  onEventCreate,
  onEventDelete,
  readOnly
}: UseCalendarLogicProps) => {
  const [internalView, setInternalView] = useState<ViewType>('week');
  const [internalDate, setInternalDate] = useState(new Date());
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [modalInitialDate, setModalInitialDate] = useState<Date | undefined>(undefined);

  const view = controlledView ?? internalView;
  const currentDate = controlledDate ?? internalDate;

  // Expand recurring events
  const expandedEvents = useMemo(() => {
    const allEvents: CalendarEvent[] = [];
    
    // Define a range for expansion (e.g., +/- 1 year from current date)
    // For better performance, we could limit this based on the current view range
    const rangeStart = subDays(currentDate, 365);
    const rangeEnd = addDays(currentDate, 365);

    events.forEach(event => {
      if (event.recurrence) {
        try {
            const rule = new RRule({
                freq: RRule[event.recurrence.freq],
                interval: event.recurrence.interval || 1,
                dtstart: new Date(event.start),
                until: event.recurrence.until ? new Date(event.recurrence.until) : undefined,
                count: event.recurrence.count,
            });

            const dates = rule.between(rangeStart, rangeEnd);
            
            dates.forEach(date => {
                const duration = differenceInMilliseconds(new Date(event.end), new Date(event.start));
                allEvents.push({
                    ...event,
                    id: `${event.id}-${date.getTime()}`, // Unique ID for each instance
                    originalEventId: event.id, // Reference to original
                    start: date,
                    end: new Date(date.getTime() + duration),
                });
            });
        } catch (e) {
            console.error("Error parsing recurrence rule", e);
            allEvents.push(event); // Fallback to original
        }
      } else {
        allEvents.push(event);
      }
    });

    return allEvents;
  }, [events, currentDate]);

  const handleViewChange = (newView: ViewType) => {
    if (controlledOnViewChange) {
      controlledOnViewChange(newView);
    } else {
      setInternalView(newView);
    }
  };

  const handleDateChange = (newDate: Date) => {
    if (controlledOnDateChange) {
      controlledOnDateChange(newDate);
    } else {
      setInternalDate(newDate);
    }
  };

  const handlePrev = () => {
    switch (view) {
      case 'month':
        handleDateChange(subMonths(currentDate, 1));
        break;
      case 'week':
        handleDateChange(subWeeks(currentDate, 1));
        break;
      case 'day':
      case 'resource':
        handleDateChange(subDays(currentDate, 1));
        break;
      case 'agenda':
        handleDateChange(subDays(currentDate, 7));
        break;
    }
  };

  const handleNext = () => {
    switch (view) {
      case 'month':
        handleDateChange(addMonths(currentDate, 1));
        break;
      case 'week':
        handleDateChange(addWeeks(currentDate, 1));
        break;
      case 'day':
      case 'resource':
        handleDateChange(addDays(currentDate, 1));
        break;
      case 'agenda':
        handleDateChange(addDays(currentDate, 7));
        break;
    }
  };

  const handleToday = () => {
    handleDateChange(new Date());
  };

  const handleDateClick = (date: Date) => {
    handleDateChange(date);
    handleViewChange('day');
  };

  const handleTimeSlotClick = (date: Date) => {
      if (readOnly) return;
      setSelectedEvent(null);
      setModalInitialDate(date);
      setIsModalOpen(true);
  };
  
  const handleEventClickInternal = (event: CalendarEvent) => {
      if (onEventClick) {
          onEventClick(event);
      }
      
      if (!readOnly) {
        setSelectedEvent(event);
        setModalInitialDate(undefined);
        setIsModalOpen(true);
      }
  };

  const handleCreateEvent = () => {
      if (readOnly) return;
      setSelectedEvent(null);
      setModalInitialDate(new Date());
      setIsModalOpen(true);
  };

  const handleModalSave = (eventData: Partial<CalendarEvent>) => {
      // If we are editing an instance of a recurring event, we might want to split it
      // For simplicity in this version, we just update the original event if it has an ID,
      // or create a new one.
      
      // Check if it's a recurrence instance (has ID like "originalId-timestamp")
      let effectiveEventId = selectedEvent?.id;
      if (selectedEvent?.originalEventId) {
          effectiveEventId = selectedEvent.originalEventId;
      }

      if (effectiveEventId) {
          // Update existing
          if (onEventUpdate) {
              onEventUpdate({
                  ...eventData,
                  id: effectiveEventId
              } as CalendarEvent);
          }
      } else {
          // Create new
          if (onEventCreate) {
              onEventCreate(eventData);
          }
      }
  };
  
  const handleModalDelete = (eventId: string) => {
      // Handle deletion of recurring instances
      let effectiveEventId = eventId;
      if (selectedEvent?.originalEventId && selectedEvent.id === eventId) {
          effectiveEventId = selectedEvent.originalEventId;
      }

      if (onEventDelete) {
          onEventDelete(effectiveEventId);
      }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeEvent = active.data.current?.event as CalendarEvent;
    const overDate = over.data.current?.date as Date;

    if (!activeEvent || !overDate) return;

    const originalStart = new Date(activeEvent.start);
    const originalEnd = new Date(activeEvent.end);
    const duration = differenceInMilliseconds(originalEnd, originalStart);

    let newStart: Date;
    
    if (view === 'month') {
        newStart = new Date(overDate);
        newStart.setHours(originalStart.getHours());
        newStart.setMinutes(originalStart.getMinutes());
        newStart.setSeconds(originalStart.getSeconds());
        newStart.setMilliseconds(originalStart.getMilliseconds());
    } else {
        // Week / Day View Logic
        
        // If we dropped on a specific time slot (overDate), use that directly
        // This is robust for both cross-column drags and same-column moves
        if (overDate) {
             const droppedTime = new Date(overDate);
             newStart = new Date(droppedTime);
             // We can optionally respect the minute offset within the slot if we want fine-grained drag
             // But usually snapping to the slot start (e.g., 9:00, 9:15) is desired behavior
             
             // However, now that we have 15-minute intervals (droppable cells) in Week/Day view,
             // overDate itself is precise to the 15-minute mark (e.g., 10:15).
             // We should prioritize the drop target for start time if available,
             // because visually the user dropped ON that cell.
             
             // The user explicitly asked to "Modify the drop logic to use the exact quarter of the target cell that was selected".
             // This implies strict snapping to the dropped cell, ignoring pixel delta for minute offsets.
             
             newStart = new Date(overDate);
             
             // Preserve seconds/ms just in case, but usually 00
             newStart.setSeconds(0);
             newStart.setMilliseconds(0);
             
        } else {
             // Fallback if no overDate (shouldn't happen if dropped on grid)
             return;
        }
    }

    const newEnd = new Date(newStart.getTime() + duration);

    // Resource Handling
    let newResourceId = activeEvent.resourceId;
    // Check if we dragged onto a resource column/row
    // The 'over' data might contain resourceId if we set it up in DroppableCell
    const overResourceId = over.data.current?.resourceId;
    if (overResourceId) {
        newResourceId = overResourceId;
    }
    
    // Check if event has actually changed
    if (newStart.getTime() === originalStart.getTime() && 
        newEnd.getTime() === originalEnd.getTime() &&
        newResourceId === activeEvent.resourceId
    ) {
      return;
    }

    if (onEventUpdate) {
      onEventUpdate({
        ...activeEvent,
        start: newStart,
        end: newEnd,
        resourceId: newResourceId
      });
    }
  };

  return {
    view,
    currentDate,
    isSidebarOpen,
    setIsSidebarOpen,
    isModalOpen,
    setIsModalOpen,
    selectedEvent,
    modalInitialDate,
    expandedEvents,
    handleViewChange,
    handleDateChange,
    handlePrev,
    handleNext,
    handleToday,
    handleDateClick,
    handleTimeSlotClick,
    handleEventClickInternal,
    handleCreateEvent,
    handleModalSave,
    handleModalDelete,
    handleDragEnd
  };
};
