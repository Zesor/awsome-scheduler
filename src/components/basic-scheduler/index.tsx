import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CalendarHeader } from './components/CalendarHeader';
import { Sidebar } from './components/Sidebar';
import { MonthView } from './views/MonthView';
import { WeekView } from './views/WeekView';
import { DayView } from './views/DayView';
import { EventModal } from './components/EventModal';
import { CalendarProps } from './types';
import { cn } from './utils';
import { getThemeStyles } from './lib/theme';
import { useCalendarLogic } from './hooks/useCalendarLogic';

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
  className,
  theme,
  renderEventForm,
  readOnly,
  calendars,
  onCalendarToggle,
  isLoading,

}) => {
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
    handleModalDelete
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

  return (
    <div
      className={cn("flex flex-col h-full w-full bg-background text-foreground relative", className)}
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
      />
      
      <div className="flex flex-1 overflow-hidden h-full">
          <div className={cn(
              "transition-all duration-300 ease-in-out h-full",
              isSidebarOpen ? "w-[256px]" : "w-0 overflow-hidden",
              "hidden md:block"
          )}>
              <Sidebar 
                  currentDate={currentDate} 
                  onDateChange={handleDateChange} 
                  onViewChange={handleViewChange}
                  onEventCreate={handleCreateEvent}
                  className="w-full h-full border-r"
                  readOnly={readOnly}
                  calendars={calendars}
                  onCalendarToggle={onCalendarToggle}
              />
          </div>

          <div className="flex-1 flex flex-col overflow-hidden relative h-full">
              {isLoading && (
                  <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/50 backdrop-blur-sm">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
              )}
              <div className="flex-1 overflow-auto p-0 md:p-4 h-full"> 
                <div className="h-full min-w-full">
                      <div
                          key={`${view}-${currentDate.toISOString()}`}
                          className="h-full"
                      >
                          {view === 'month' && (
                              <MonthView
                              currentDate={currentDate}
                              events={events}
                              onEventClick={handleEventClickInternal}
                              onDateClick={handleDateClick}
                              />
                          )}
                          {view === 'week' && (
                              <WeekView
                              currentDate={currentDate}
                              events={events}
                              onEventClick={handleEventClickInternal}
                              onTimeSlotClick={handleTimeSlotClick}
                              />
                          )}
                          {view === 'day' && (
                              <DayView
                                  currentDate={currentDate}
                                  events={events}
                                  onEventClick={handleEventClickInternal}
                                  onTimeSlotClick={handleTimeSlotClick}
                              />
                          )}
                      </div>
                </div>
              </div>
              
              {/* Mobile Create Button (FAB) */}
              <div className="md:hidden absolute bottom-6 right-6">
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
          />
      )}
    </div>
  );
};
