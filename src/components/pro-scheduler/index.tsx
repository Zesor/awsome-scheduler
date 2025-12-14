import React, { useId, useState, useMemo } from 'react';
import { DndContext, useSensor, useSensors, PointerSensor, Modifier, DragOverlay } from '@dnd-kit/core';
import { createSnapModifier, restrictToWindowEdges } from '@dnd-kit/modifiers';
import { AnimatePresence, motion } from 'framer-motion';
import { CalendarHeader } from './components/CalendarHeader';
import { Sidebar } from './components/Sidebar';
import { MonthView } from './views/MonthView';
import { WeekView } from './views/WeekView';
import { DayView } from './views/DayView';
import { AgendaView } from './views/AgendaView';
import { ResourceView } from './views/ResourceView';
import { EventModal } from './components/EventModal';
import { CalendarProps, CalendarEvent } from './types';
import { cn } from './utils';
import { getThemeStyles } from './lib/theme';
import { useCalendarLogic } from './hooks/useCalendarLogic';
import { differenceInMinutes, format } from 'date-fns';

export const Scheduler: React.FC<CalendarProps> = ({
  events = [],
  view: controlledView,
  onViewChange: controlledOnViewChange,
  date: controlledDate,
  onDateChange: controlledOnDateChange,
  onEventClick,
  onEventCreate,
  onEventUpdate,
  onEventDelete,
  timezone,
  onTimezoneChange,
  className,
  theme,
  renderEventForm,
  readOnly,
  calendars,
  resources,
  eventTypes,
  onCalendarToggle,
  isLoading,
  isDarkMode,
  onThemeToggle,
  translations, // New Prop
  hideViewSwitcher,
  language,
  onLanguageChange,
  locale // Date-fns locale
}) => {
  const [activeDragEvent, setActiveDragEvent] = useState<CalendarEvent | null>(null);

  const {
    view,
    currentDate,
    isSidebarOpen,
    setIsSidebarOpen,
    isModalOpen,
    setIsModalOpen,
    selectedEvent,
    modalInitialDate,
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
    handleDragEnd,
    expandedEvents // New export
  } = useCalendarLogic({
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
  });

  // DnD Sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const gridSize = 15; // 15px snap (15 minutes if 60px/hr)
  const snapToGrid = createSnapModifier(gridSize);
  const modifiers: Modifier[] = [snapToGrid, restrictToWindowEdges];

  // Disable DnD if readOnly
  const dndSensors = readOnly ? [] : sensors;
  
  const id = useId();

  // Default Translations
  const t = {
    today: 'Today',
    month: 'Month',
    week: 'Week',
    day: 'Day',
    agenda: 'Agenda',
    resource: 'Resource',
    createEvent: 'Create Event',
    editEvent: 'Edit Event',
    delete: 'Delete',
    save: 'Save',
    cancel: 'Cancel',
    title: 'Title',
    start: 'Start',
    end: 'End',
    allDay: 'All Day',
    description: 'Description',
    repeat: 'Repeat',
    noRepeat: 'Does not repeat',
    selectCalendar: 'Select Calendar',
    selectType: 'Select Type',
    daily: 'Daily',
    weekly: 'Weekly',
    monthly: 'Monthly',
    yearly: 'Yearly',
    ...translations
  };

  const handleDragStart = (event: any) => {
    const { active } = event;
    const draggedEvent = expandedEvents.find(e => e.id === active.id);
    if (draggedEvent) {
        setActiveDragEvent(draggedEvent);
    }
  };

  const onDragEndWrapper = (event: any) => {
      setActiveDragEvent(null);
      handleDragEnd(event);
  };
  
  // Calculate height for week/day view drag overlay
  const getDragHeight = () => {
      if (!activeDragEvent) return undefined;
      
      if (view === 'resource') {
        return 80; // Approximate height for resource view events
      }

      if (view !== 'week' && view !== 'day') return undefined;
      const duration = differenceInMinutes(activeDragEvent.end, activeDragEvent.start);
      // 60px per hour
      const height = (duration / 60) * 60; // 60px height base
      // If DayView uses 80px, we should account for that. 
      // Current implementation: WeekView = 60px, DayView = 80px.
      // But DayView uses 80px in DayView.tsx.
      // Let's assume 60px for now as default or pass a prop.
      // Or check view state.
      const hourHeight = view === 'day' ? 80 : 60;
      return (duration / 60) * hourHeight;
  };

  const getDragWidth = () => {
      if (view === 'month') return '100%';
      
      if (view === 'resource' && activeDragEvent) {
          const duration = differenceInMinutes(activeDragEvent.end, activeDragEvent.start);
          const width = (duration / 60) * 100; // 100px per hour in ResourceView
          return `${Math.max(width, 4)}px`;
      }

      // For Week/Day views, use a fixed width that looks like a column
      // Ideally we would measure the column width, but a fixed reasonable width works for the ghost
      return '150px'; 
  };

  // Filter events based on active calendars
  const filteredEvents = useMemo(() => {
      if (!calendars) return expandedEvents;
      const activeCalendarIds = calendars.filter(c => c.active !== false).map(c => c.id);
      return expandedEvents.filter(e => {
          // If event has no calendarId, show it by default OR hide it? 
          // Usually events belong to a calendar. If undefined, maybe show it.
          if (!e.calendarId) return true; 
          return activeCalendarIds.includes(e.calendarId);
      });
  }, [expandedEvents, calendars]);

  return (
    <DndContext 
        id={id} 
        sensors={dndSensors} 
        onDragStart={handleDragStart}
        onDragEnd={onDragEndWrapper} 
        modifiers={modifiers}
    >
      <div
        className={cn("flex flex-col h-full bg-background text-foreground relative", className)}
        style={getThemeStyles(theme)}
      >
        <CalendarHeader
          currentDate={currentDate}
          onPrev={handlePrev}
          onNext={handleNext}
          onToday={handleToday}
          view={view}
          onViewChange={handleViewChange}
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
          isDarkMode={isDarkMode}
          onThemeToggle={onThemeToggle}
          translations={t} // Pass translations
          hideViewSwitcher={hideViewSwitcher}
          language={language}
          onLanguageChange={onLanguageChange}
          locale={locale} // Pass locale
        />
        
        <div className="flex flex-1 overflow-hidden">
            <div className={cn(
                "transition-all duration-300 ease-in-out",
                isSidebarOpen ? "w-[256px]" : "w-0 overflow-hidden",
                "hidden md:block"
            )}>
                <Sidebar 
                    currentDate={currentDate} 
                    onDateChange={handleDateChange} 
                    onViewChange={handleViewChange}
                    onEventCreate={handleCreateEvent}
                    timezone={timezone}
                    onTimezoneChange={onTimezoneChange}
                    className="w-full h-full border-r"
                    readOnly={readOnly}
                    calendars={calendars}
                    onCalendarToggle={onCalendarToggle}
                    translations={t} // Pass translations
                />
            </div>

            <div className="flex-1 flex flex-col overflow-hidden relative">
                {isLoading && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/50 backdrop-blur-sm">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                )}
                <div className="flex-1 overflow-auto p-0 md:p-4"> 
                  <div className="h-full min-w-full">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`${view}-${currentDate.toISOString()}-${timezone || 'local'}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2, ease: "easeInOut" }}
                            className="h-full"
                        >
                            {view === 'month' && (
                                <MonthView
                                currentDate={currentDate}
                                events={filteredEvents}
                                onEventClick={handleEventClickInternal}
                                onDateClick={handleDateClick}
                                timezone={timezone}
                                locale={locale}
                                />
                            )}
                            {view === 'week' && (
                                <WeekView
                                currentDate={currentDate}
                                events={filteredEvents}
                                onEventClick={handleEventClickInternal}
                                onTimeSlotClick={handleTimeSlotClick}
                                timezone={timezone}
                                locale={locale}
                                />
                            )}
                            {view === 'day' && (
                                <DayView
                                    currentDate={currentDate}
                                    events={filteredEvents}
                                    onEventClick={handleEventClickInternal}
                                    onTimeSlotClick={handleTimeSlotClick}
                                    timezone={timezone}
                                    locale={locale}
                                />
                            )}
                            {view === 'agenda' && (
                                <AgendaView
                                    currentDate={currentDate}
                                    events={filteredEvents}
                                    onEventClick={handleEventClickInternal}
                                />
                            )}
                            {view === 'resource' && resources && (
                                <ResourceView
                                    currentDate={currentDate}
                                    events={filteredEvents}
                                    resources={resources}
                                    onEventClick={handleEventClickInternal}
                                    onTimeSlotClick={(date, resourceId) => {
                                        // Handle resource time slot click
                                        // Ideally useCalendarLogic should support resourceId in handleTimeSlotClick
                                        // For now, we can manually trigger the modal
                                        if (readOnly) return;
                                        // Hack: we might need to update useCalendarLogic to accept resourceId
                                        handleTimeSlotClick(date); 
                                    }}
                                    locale={locale}
                                />
                            )}
                        </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
                
                {/* Mobile Create Button (FAB) */}
                <div className="md:hidden absolute bottom-6 right-6 z-50">
                    <button 
                        onClick={handleCreateEvent}
                        className="w-14 h-14 bg-blue-600 rounded-full shadow-lg flex items-center justify-center text-white active:scale-90 transition-transform"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                    </button>
                </div>
            </div>
        </div>
        
        {renderEventForm ? (
            renderEventForm({
                isOpen: isModalOpen,
                onClose: () => setIsModalOpen(false),
                event: selectedEvent,
                initialDate: modalInitialDate,
                onSave: handleModalSave,
                onDelete: handleModalDelete
            })
        ) : (
            <EventModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                event={selectedEvent}
                initialDate={modalInitialDate}
                onSave={handleModalSave}
                onDelete={handleModalDelete}
                calendars={calendars}
                eventTypes={eventTypes}
                translations={t} // Pass translations
            />
        )}
        
        <DragOverlay>
            {activeDragEvent ? (
                <div
                    className={cn(
                    "text-xs px-2 py-1 rounded truncate shadow-lg border border-primary/50 opacity-50 cursor-grabbing overflow-hidden",
                    !activeDragEvent.color && "bg-primary text-primary-foreground",
                    )}
                    style={{
                        backgroundColor: activeDragEvent.color || undefined,
                        color: activeDragEvent.color ? '#fff' : undefined,
                        width: getDragWidth(), // explicit width for better visibility
                        height: getDragHeight() ? `${getDragHeight()}px` : undefined
                    }}
                >
                    <div className="font-semibold truncate">{activeDragEvent.title}</div>
                    {(view === 'week' || view === 'day') && getDragHeight() && getDragHeight()! > 30 && (
                         <div className="text-[10px] opacity-80">
                             {format(activeDragEvent.start, 'h:mm')} - {format(activeDragEvent.end, 'h:mm')}
                         </div>
                    )}
                </div>
            ) : null}
        </DragOverlay>

      </div>
    </DndContext>
  );
};
