import React, { useState, useEffect } from 'react';
import { Modal } from './ui/Modal';
import { Button } from './ui/button';
import { CalendarEvent } from '../types';
import { format } from 'date-fns';

import { ChevronDown, Check } from 'lucide-react';
import { cn } from '../utils';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event?: CalendarEvent | null; // If provided, we are editing
  initialDate?: Date; // If creating, start from this date
  onSave: (event: Partial<CalendarEvent>) => void;
  onDelete?: (eventId: string) => void;
  calendars?: { id: string; label: string; color?: string }[];
}

export const EventModal: React.FC<EventModalProps> = ({
  isOpen,
  onClose,
  event,
  initialDate,
  onSave,
  onDelete,
  calendars,
}) => {
  const [formData, setFormData] = useState<Partial<CalendarEvent>>({
    title: '',
    description: '',
    start: new Date(),
    end: new Date(),
    allDay: false,
    color: '#3b82f6', // blue-500
    calendarId: calendars?.[0]?.id,
  });
  
  const [isCalendarDropdownOpen, setIsCalendarDropdownOpen] = useState(false);

  // Close dropdown when clicking outside (handled by the overlay div in render)
  // but if we need it to close when scrolling the modal container, we might need more logic.
  // For now, the fixed overlay handles the "click outside" perfectly.

  // Close dropdown when clicking outside (handled by the overlay div in render)
  // but if we need it to close when scrolling the modal container, we might need more logic.
  // For now, the fixed overlay handles the "click outside" perfectly.


  useEffect(() => {
    if (isOpen) {
      if (event) {
        setFormData({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end),
        });
      } else {
        const start = initialDate || new Date();
        const end = new Date(start);
        end.setHours(start.getHours() + 1);
        
        setFormData({
          title: '',
          description: '',
          start,
          end,
          allDay: false,
          color: '#3b82f6',
          calendarId: calendars?.[0]?.id,
        });
      }
    }
  }, [isOpen, event, initialDate, calendars]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // If a calendar is selected, use its color
    let eventColor = formData.color;
    if (formData.calendarId && calendars) {
        const selectedCal = calendars.find(c => c.id === formData.calendarId);
        if (selectedCal?.color) {
            eventColor = selectedCal.color;
        }
    }

    onSave({
      ...formData,
      color: eventColor,
      id: event?.id, // Keep ID if editing
    });
    onClose();
  };

  const handleDelete = () => {
    if (event?.id && onDelete) {
      onDelete(event.id);
      onClose();
    }
  };

  // Helper to format date for datetime-local input
  const formatDateForInput = (date: Date | undefined) => {
    if (!date) return '';
    return format(date, "yyyy-MM-dd'T'HH:mm");
  };

  const handleDateChange = (field: 'start' | 'end', value: string) => {
    const date = new Date(value);
    setFormData(prev => ({ ...prev, [field]: date }));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={event ? 'Edit Event' : 'Create Event'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Title
          </label>
          <input
            type="text"
            required
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.title || ''}
            onChange={e => setFormData({ ...formData, title: e.target.value })}
            placeholder="Event Title"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Start
            </label>
            <input
              type="datetime-local"
              required
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formatDateForInput(formData.start)}
              onChange={e => handleDateChange('start', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              End
            </label>
            <input
              type="datetime-local"
              required
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formatDateForInput(formData.end)}
              onChange={e => handleDateChange('end', e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="allDay"
            className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            checked={!!formData.allDay}
            onChange={e => setFormData({ ...formData, allDay: e.target.checked })}
          />
          <label htmlFor="allDay" className="text-sm font-medium text-slate-700 dark:text-slate-300">
            All Day Event
          </label>
        </div>

        {calendars && calendars.length > 0 ? (
            <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Calendar
                </label>
                <div className="relative">
                    <button
                        type="button"
                        onClick={() => setIsCalendarDropdownOpen(!isCalendarDropdownOpen)}
                        className="w-full flex items-center justify-between px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-left"
                    >
                        <div className="flex items-center gap-2">
                            <div 
                                className="w-3 h-3 rounded-full" 
                                style={{ backgroundColor: calendars.find(c => c.id === formData.calendarId)?.color || formData.color }}
                            />
                            <span>{calendars.find(c => c.id === formData.calendarId)?.label || 'Select Calendar'}</span>
                        </div>
                        <ChevronDown className={cn("w-4 h-4 text-slate-500 transition-transform", isCalendarDropdownOpen && "rotate-180")} />
                    </button>

                    {isCalendarDropdownOpen && (
                        <>
                            <div className="fixed inset-0 z-40" onClick={() => setIsCalendarDropdownOpen(false)} />
                            <div className="absolute z-50 w-full mt-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md shadow-lg max-h-60 overflow-auto animate-in fade-in zoom-in-95 duration-100">
                                {calendars.map(cal => (
                                    <div
                                        key={cal.id}
                                        className={cn(
                                            "flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors",
                                            formData.calendarId === cal.id && "bg-blue-50 dark:bg-blue-900/20"
                                        )}
                                        onClick={() => {
                                            setFormData({ 
                                                ...formData, 
                                                calendarId: cal.id,
                                                color: cal.color || formData.color 
                                            });
                                            setIsCalendarDropdownOpen(false);
                                        }}
                                    >
                                        <div className="flex items-center gap-2">
                                            <div 
                                                className="w-3 h-3 rounded-full" 
                                                style={{ backgroundColor: cal.color }}
                                            />
                                            <span className="text-sm text-slate-700 dark:text-slate-200">{cal.label}</span>
                                        </div>
                                        {formData.calendarId === cal.id && (
                                            <Check className="w-4 h-4 text-blue-500" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        ) : (
            <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Color
            </label>
            <div className="flex space-x-2">
                {['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#6b7280'].map((color) => (
                <button
                    key={color}
                    type="button"
                    className={`w-6 h-6 rounded-full border-2 ${
                    formData.color === color ? 'border-slate-900 dark:border-white' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setFormData({ ...formData, color })}
                />
                ))}
            </div>
            </div>
        )}

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Description
          </label>
          <textarea
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            value={formData.description || ''}
            onChange={e => setFormData({ ...formData, description: e.target.value })}
            placeholder="Add description..."
          />
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          {event && onDelete && (
            <Button
              type="button"
              variant="destructive"
              onClick={handleDelete}
              className="mr-auto"
            >
              Delete
            </Button>
          )}
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            {event ? 'Update' : 'Create'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
