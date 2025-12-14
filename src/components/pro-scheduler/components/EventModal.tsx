import React, { useState, useEffect, useRef } from 'react';
import { Modal } from './ui/Modal';
import { CalendarEvent, EventType, EventAttachment } from '../types';
import { format } from 'date-fns';
import { 
    Clock, MapPin, AlignLeft, Trash2, X, Edit2, 
    Users, Paperclip, File, XCircle, Calendar, ChevronDown, Check, Download
  } from 'lucide-react';
import { cn } from '../utils';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event?: CalendarEvent | null; // If provided, we are editing
  initialDate?: Date; // If creating, start from this date
  onSave: (event: Partial<CalendarEvent>) => void;
  onDelete?: (eventId: string) => void;
  calendars?: { id: string; label: string; color?: string }[];
  eventTypes?: EventType[];
  translations: any; 
}

export const EventModal: React.FC<EventModalProps> = ({
  isOpen,
  onClose,
  event,
  initialDate,
  onSave,
  onDelete,
  calendars,
  eventTypes,
  translations
}) => {
  const [mode, setMode] = useState<'view' | 'edit' | 'create'>('create');
  
  const [formData, setFormData] = useState<Partial<CalendarEvent>>({
    title: '',
    description: '',
    location: '',
    start: new Date(),
    end: new Date(),
    allDay: false,
    color: '#3b82f6',
    calendarId: calendars?.[0]?.id,
    type: undefined,
    recurrence: undefined,
    attachments: [],
  });

  const [isCalendarDropdownOpen, setIsCalendarDropdownOpen] = useState(false);
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
  const [isGuestsDropdownOpen, setIsGuestsDropdownOpen] = useState(false);

  // Fake emails for dropdown
  const fakeGuests = [
    'alice@example.com',
    'bob@example.com',
    'charlie@example.com',
    'diana@example.com',
    'evan@example.com'
  ];

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedGuests, setSelectedGuests] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen) {
      if (event) {
        setMode('view');
        setFormData({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end),
          attachments: event.attachments || [],
        });
        setSelectedGuests(event.guests || []); 
      } else {
        setMode('create');
        const start = initialDate || new Date();
        const end = new Date(start);
        end.setHours(start.getHours() + 1);
        
        setFormData({
          title: '',
          description: '',
          location: '',
          start,
          end,
          allDay: false,
          color: '#3b82f6',
          calendarId: calendars?.[0]?.id,
          attachments: [],
        });
        setSelectedGuests([]);
      }
    }
  }, [isOpen, event, initialDate, calendars]);

  const toggleGuest = (email: string) => {
    setSelectedGuests(prev => {
        const newGuests = prev.includes(email) 
            ? prev.filter(e => e !== email)
            : [...prev, email];
        
        // Update formData immediately so it persists if we save
        setFormData(curr => ({ ...curr, guests: newGuests }));
        return newGuests;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
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
      id: event?.id,
    });
    onClose();
  };

  const handleDelete = () => {
    if (event?.id && onDelete) {
      onDelete(event.id);
      onClose();
    }
  };

  const formatDateForInput = (date: Date | undefined) => {
    if (!date) return '';
    return format(date, "yyyy-MM-dd'T'HH:mm");
  };

  const handleDateChange = (field: 'start' | 'end', value: string) => {
    const date = new Date(value);
    
    // Check if user is typing manually (e.g. invalid date while typing)
    if (isNaN(date.getTime())) return;

    if (field === 'start') {
        // If start moves past end, push end forward by same duration
        const duration = formData.end!.getTime() - formData.start!.getTime();
        setFormData(prev => ({ 
            ...prev, 
            start: date,
            end: new Date(date.getTime() + duration)
        }));
    } else {
        // If end moves before start, ensure start is not after end
        if (date < formData.start!) {
             setFormData(prev => ({ ...prev, start: date, end: date }));
        } else {
             setFormData(prev => ({ ...prev, end: date }));
        }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newAttachments: EventAttachment[] = Array.from(e.target.files).map(file => ({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: 'file',
        size: `${(file.size / 1024).toFixed(1)} KB`
      }));
      setFormData(prev => ({
        ...prev,
        attachments: [...(prev.attachments || []), ...newAttachments]
      }));
    }
  };

  const removeAttachment = (id: string) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments?.filter(a => a.id !== id)
    }));
  };

  const handleDownload = (attachment: EventAttachment) => {
    // In a real app, this would trigger a download from a URL
    // For this demo, we'll create a dummy blob
    const element = document.createElement("a");
    const file = new Blob(['Dummy content for ' + attachment.name], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = attachment.name;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    document.body.removeChild(element);
  };

  const renderAttachmentsList = (readOnly = false) => {
    if (!formData.attachments || formData.attachments.length === 0) return null;

    return (
      <div className="mt-2 space-y-2">
        {formData.attachments.map(att => (
          <div key={att.id} className="flex items-center gap-2 p-2 rounded border border-border bg-muted/30">
            <div className="p-1 bg-background rounded shadow-sm">
              <File className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-foreground truncate">{att.name}</div>
              {att.size && <div className="text-xs text-muted-foreground">{att.size}</div>}
            </div>
            {readOnly ? (
                 <button
                    type="button"
                    onClick={() => handleDownload(att)}
                    className="p-1 hover:bg-accent rounded-full text-muted-foreground hover:text-primary transition-colors"
                    title="Download"
                  >
                    <Download className="w-4 h-4" />
                  </button>
            ) : (
              <button
                type="button"
                onClick={() => removeAttachment(att.id)}
                className="p-1 hover:bg-destructive/10 rounded-full text-muted-foreground hover:text-destructive transition-colors"
              >
                <XCircle className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderViewMode = () => (
    <div className="flex flex-col bg-background overflow-hidden w-full max-h-[90vh]">
        {/* Header Actions */}
        <div className="flex justify-end items-center p-2 pl-4 bg-background shrink-0">
            <div className="flex items-center gap-1">
                <button onClick={() => setMode('edit')} className="p-2 hover:bg-accent rounded-full transition-colors text-muted-foreground hover:text-foreground" title="Edit event">
                    <Edit2 className="w-4 h-4" />
                </button>
                <button onClick={handleDelete} className="p-2 hover:bg-destructive/10 rounded-full transition-colors text-muted-foreground hover:text-destructive" title="Delete event">
                    <Trash2 className="w-4 h-4" />
                </button>
                <button onClick={onClose} className="p-2 hover:bg-accent rounded-full transition-colors text-muted-foreground hover:text-foreground" title="Close">
                    <X className="w-5 h-5" />
                </button>
            </div>
        </div>

        <div className="px-4 sm:px-6 py-2 space-y-4 sm:space-y-6 overflow-y-auto flex-1">
            {/* Title & Date */}
            <div className="flex gap-4">
                <div className="mt-1.5 w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: event?.color || '#3b82f6' }} />
                <div>
                    <h2 className="text-xl font-normal text-foreground mb-1 leading-tight">
                        {event?.title || '(No title)'}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        {event?.start && format(new Date(event.start), 'EEEE, MMMM d')} • {event?.start && format(new Date(event.start), 'h:mm a')} – {event?.end && format(new Date(event.end), 'h:mm a')}
                    </p>
                </div>
            </div>

            {/* Location */}
            {event?.location && (
                <div className="flex gap-4 items-start">
                        <MapPin className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                        <p className="text-sm text-foreground/80">{event.location}</p>
                </div>
            )}

            {/* Guests */}
            {event?.guests && event.guests.length > 0 && (
                <div className="flex gap-4 items-start">
                    <Users className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                    <div className="flex-1">
                        <p className="text-sm font-medium text-foreground mb-1">
                            {event.guests.length} {event.guests.length > 1 ? translations.guestsCount : translations.guestCount}
                        </p>
                        <div className="space-y-2 mt-2">
                            {event.guests.map((email, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-xs text-primary font-medium border border-primary/20">
                                        {email[0].toUpperCase()}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <span className="text-sm text-foreground/80 block leading-none truncate">{email}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Description & Attachments */}
            {(event?.description || (event?.attachments && event.attachments.length > 0)) && (
                    <div className="flex gap-4 items-start">
                        <AlignLeft className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                        <div className="flex-1">
                            {event.description && (
                                <div className="text-sm text-foreground/80 whitespace-pre-wrap leading-relaxed mb-2">
                                    {event.description}
                                </div>
                            )}
                            {/* Attachments View */}
                            {event.attachments && event.attachments.length > 0 && (
                                <div className="space-y-2">
                                    {event.attachments.map(att => (
                                        <div key={att.id} className="flex items-center gap-3 p-2 rounded-lg border border-border bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer">
                                            <div className="p-1.5 bg-background rounded shadow-sm text-primary">
                                                <File className="w-4 h-4" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-sm font-medium text-foreground">{att.name}</div>
                                                <div className="text-xs text-muted-foreground">{att.type.toUpperCase()} • {att.size}</div>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => handleDownload(att)}
                                                className="p-1 hover:bg-accent rounded-full text-muted-foreground hover:text-primary transition-colors"
                                                title="Download"
                                            >
                                                <Download className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
            )}
        </div>
    </div>
  );

  const renderEditMode = () => (
    <form onSubmit={handleSubmit} className="flex flex-col bg-background overflow-hidden w-full">
        {/* Header - Minimal Actions */}
        <div className="flex items-center justify-between p-3 bg-background rounded-t-lg border-b border-border shrink-0">
            <h2 className="text-base font-semibold text-foreground">
                {mode === 'edit' ? translations.editEvent : translations.createEvent}
            </h2>
            <button type="button" onClick={onClose} className="p-1.5 hover:bg-accent rounded-full transition-colors text-muted-foreground hover:text-foreground">
                <X className="w-4 h-4" />
            </button>
        </div>

        <div className="px-4 py-3 space-y-3 overflow-y-auto flex-1">
            {/* Title Input */}
            <div>
                <input
                    type="text"
                    required
                    autoFocus
                    className="w-full text-lg border-0 border-b border-border focus:border-primary focus:ring-0 bg-transparent px-0 py-1.5 placeholder-muted-foreground transition-colors text-foreground font-medium"
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                    placeholder={translations.title}
                />
            </div>

            <div className="grid grid-cols-1 gap-3">
                {/* Date & Time Card */}
                <div className="bg-muted/30 p-3 rounded-lg border border-border">
                    <div className="flex items-center gap-2 mb-2 text-sm font-medium text-foreground">
                        <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                        {translations.dateAndTime}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                            <label className="text-xs text-muted-foreground mb-1 block">{translations.start || 'Start'}</label>
                            <input
                                type="datetime-local"
                                className="w-full bg-transparent border-b border-border focus:border-primary focus:ring-0 px-0 py-1 text-sm font-medium text-foreground"
                                value={formatDateForInput(formData.start)}
                                onChange={e => handleDateChange('start', e.target.value)}
                            />
                            {formData.start && (
                                <div className="text-xs text-primary/70 mt-1 font-medium">
                                    {format(formData.start, 'EEE, MMM d • h:mm a')}
                                </div>
                            )}
                        </div>
                        <div className="flex-1 sm:text-right">
                            <label className="text-xs text-muted-foreground mb-1 block">{translations.end || 'End'}</label>
                            <input
                                type="datetime-local"
                                className="w-full bg-transparent border-b border-border focus:border-primary focus:ring-0 px-0 py-1 text-sm font-medium text-foreground sm:text-right"
                                value={formatDateForInput(formData.end)}
                                onChange={e => handleDateChange('end', e.target.value)}
                            />
                            {formData.end && (
                                <div className="text-xs text-primary/70 mt-1 font-medium">
                                    {format(formData.end, 'EEE, MMM d • h:mm a')}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Who's Joining Card */}
                <div className="bg-muted/30 p-3 rounded-lg border border-border">
                    <h3 className="text-sm font-medium text-foreground mb-2">{translations.whosJoining}</h3>
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setIsGuestsDropdownOpen(!isGuestsDropdownOpen)}
                            className="w-full flex items-center justify-between px-3 py-2 bg-background border border-border rounded-lg text-sm text-left hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        >
                            <span className={selectedGuests.length > 0 ? "text-foreground" : "text-muted-foreground"}>
                                {selectedGuests.length > 0
                                    ? `${selectedGuests.length} ${selectedGuests.length > 1 ? translations.guestsCount || 'guests' : translations.guestCount || 'guest'}`
                                    : translations.addGuests || "Add guests"}
                            </span>
                            <ChevronDown className="w-4 h-4 text-muted-foreground" />
                        </button>

                        {isGuestsDropdownOpen && (
                            <div className="absolute z-10 w-full mt-1 bg-popover border border-border rounded-lg shadow-lg max-h-48 overflow-y-auto">
                                {fakeGuests.map(email => (
                                    <div
                                        key={email}
                                        className="px-3 py-2 hover:bg-accent cursor-pointer text-sm flex items-center gap-2 text-foreground"
                                        onClick={() => toggleGuest(email)}
                                    >
                                        <div className={`w-4 h-4 rounded border flex items-center justify-center ${selectedGuests.includes(email) ? 'bg-primary border-primary' : 'border-border'}`}>
                                            {selectedGuests.includes(email) && <Check className="w-3 h-3 text-primary-foreground" />}
                                        </div>
                                        <span>{email}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Selected Guests Chips */}
                    {selectedGuests.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                            {selectedGuests.map(email => (
                                <div key={email} className="flex items-center gap-1 pl-2 pr-1 py-1 bg-primary/10 text-primary rounded-full text-xs border border-primary/20">
                                    <span>{email.split('@')[0]}</span>
                                    <button
                                        type="button"
                                        onClick={() => toggleGuest(email)}
                                        className="p-0.5 hover:bg-primary/20 rounded-full transition-colors"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Where will it be Card */}
                <div className="bg-muted/30 p-3 rounded-lg border border-border">
                    <h3 className="text-sm font-medium text-foreground mb-2">{translations.whereWillItBe}</h3>
                    <input
                        type="text"
                        className="w-full px-2 py-1.5 bg-background border border-border rounded text-sm text-foreground focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                        placeholder={translations.location || "Enter address"}
                        value={formData.location || ''}
                        onChange={e => setFormData({ ...formData, location: e.target.value })}
                    />
                </div>
            </div>

            {/* Description Card */}
            <div className="bg-muted/30 p-3 rounded-lg border border-border">
                <h3 className="text-sm font-medium text-foreground mb-2">{translations.descriptionAndAttachments}</h3>
                <textarea
                    className="w-full bg-transparent border border-border rounded px-2 py-1.5 text-sm min-h-[50px] resize-none text-foreground placeholder-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary/20"
                    placeholder={translations.notes || "Notes..."}
                    value={formData.description || ''}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                />
            </div>

            {/* Recurrence Selector */}
            <div className="bg-muted/30 p-3 rounded-lg border border-border">
                <h3 className="text-sm font-medium text-foreground mb-2">{translations.repeat}</h3>
                <select
                    className="w-full px-2 py-1.5 bg-background border border-border rounded text-sm text-foreground focus:border-primary focus:ring-1 focus:ring-primary/20"
                    value={formData.recurrence?.freq || ''}
                    onChange={e => {
                        if (e.target.value === '') {
                            setFormData({ ...formData, recurrence: undefined });
                        } else {
                            setFormData({
                                ...formData,
                                recurrence: {
                                    freq: e.target.value as 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY',
                                    interval: 1
                                }
                            });
                        }
                    }}
                >
                    <option value="">{translations.noRepeat}</option>
                    <option value="DAILY">{translations.daily}</option>
                    <option value="WEEKLY">{translations.weekly}</option>
                    <option value="MONTHLY">{translations.monthly}</option>
                    <option value="YEARLY">{translations.yearly}</option>
                </select>

                {/* End Repeat Options - Only show if recurrence is set */}
                {formData.recurrence?.freq && (
                    <div className="mt-3 pt-3 border-t border-border/50">
                        <label className="text-xs text-muted-foreground mb-2 block">{translations.endRepeat || 'End repeat'}</label>
                        <div className="flex flex-col gap-2">
                            {/* Never */}
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="recurrenceEnd"
                                    checked={!formData.recurrence?.count && !formData.recurrence?.until}
                                    onChange={() => {
                                        setFormData({
                                            ...formData,
                                            recurrence: {
                                                ...formData.recurrence!,
                                                count: undefined,
                                                until: undefined
                                            }
                                        });
                                    }}
                                    className="w-3.5 h-3.5 text-primary focus:ring-primary/20"
                                />
                                <span className="text-sm text-foreground">{translations.never || 'Never'}</span>
                            </label>

                            {/* After X occurrences */}
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="recurrenceEnd"
                                    checked={!!formData.recurrence?.count}
                                    onChange={() => {
                                        setFormData({
                                            ...formData,
                                            recurrence: {
                                                ...formData.recurrence!,
                                                count: 5,
                                                until: undefined
                                            }
                                        });
                                    }}
                                    className="w-3.5 h-3.5 text-primary focus:ring-primary/20"
                                />
                                <span className="text-sm text-foreground">{translations.afterOccurrences || 'After'}</span>
                                <input
                                    type="number"
                                    min="1"
                                    max="365"
                                    value={formData.recurrence?.count || 5}
                                    onChange={e => {
                                        setFormData({
                                            ...formData,
                                            recurrence: {
                                                ...formData.recurrence!,
                                                count: parseInt(e.target.value) || 1,
                                                until: undefined
                                            }
                                        });
                                    }}
                                    disabled={!formData.recurrence?.count}
                                    className="w-16 px-2 py-1 bg-background border border-border rounded text-sm text-foreground text-center focus:border-primary focus:ring-1 focus:ring-primary/20 disabled:opacity-50"
                                />
                                <span className="text-sm text-foreground">{translations.times || 'times'}</span>
                            </label>

                            {/* Until date */}
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="recurrenceEnd"
                                    checked={!!formData.recurrence?.until}
                                    onChange={() => {
                                        const untilDate = new Date(formData.start || new Date());
                                        untilDate.setMonth(untilDate.getMonth() + 1);
                                        setFormData({
                                            ...formData,
                                            recurrence: {
                                                ...formData.recurrence!,
                                                count: undefined,
                                                until: untilDate
                                            }
                                        });
                                    }}
                                    className="w-3.5 h-3.5 text-primary focus:ring-primary/20"
                                />
                                <span className="text-sm text-foreground">{translations.until || 'Until'}</span>
                                <input
                                    type="date"
                                    value={formData.recurrence?.until ? format(formData.recurrence.until, 'yyyy-MM-dd') : ''}
                                    onChange={e => {
                                        setFormData({
                                            ...formData,
                                            recurrence: {
                                                ...formData.recurrence!,
                                                count: undefined,
                                                until: new Date(e.target.value)
                                            }
                                        });
                                    }}
                                    disabled={!formData.recurrence?.until}
                                    className="flex-1 px-2 py-1 bg-background border border-border rounded text-sm text-foreground focus:border-primary focus:ring-1 focus:ring-primary/20 disabled:opacity-50"
                                />
                            </label>
                        </div>
                    </div>
                )}
            </div>

            {/* Calendar Type Selector */}
            <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-foreground/80">{translations.calendars}:</span>
                <div className="relative">
                    <button
                        type="button"
                        onClick={() => setIsCalendarDropdownOpen(!isCalendarDropdownOpen)}
                        className="flex items-center gap-2 px-3 py-1.5 bg-background border border-border rounded-lg text-sm hover:border-primary transition-colors text-foreground"
                    >
                        <div
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: calendars?.find(c => c.id === formData.calendarId)?.color || formData.color }}
                        />
                        <span>{calendars?.find(c => c.id === formData.calendarId)?.label || translations.selectCalendar}</span>
                        <ChevronDown className="w-3 h-3 text-muted-foreground" />
                    </button>

                    {isCalendarDropdownOpen && (
                        <div className="absolute bottom-full left-0 mb-1 w-48 bg-popover border border-border rounded-lg shadow-lg overflow-hidden z-20">
                            {calendars?.map(cal => (
                                <div
                                    key={cal.id}
                                    className="flex items-center gap-2 px-3 py-2 hover:bg-accent cursor-pointer text-sm text-foreground"
                                    onClick={() => {
                                        setFormData({
                                            ...formData,
                                            calendarId: cal.id,
                                            color: cal.color || formData.color
                                        });
                                        setIsCalendarDropdownOpen(false);
                                    }}
                                >
                                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cal.color }} />
                                    <span className="flex-1">{cal.label}</span>
                                    {formData.calendarId === cal.id && <Check className="w-3 h-3 text-primary" />}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>

        {/* Footer - Always visible */}
        <div className="p-3 border-t border-border flex items-center justify-center bg-background shrink-0">
             <button type="submit" className="px-5 py-2 bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-sm rounded-full shadow-sm transition-all transform active:scale-95 hover:shadow-md">
                {mode === 'edit' ? translations.save : translations.createEvent}
             </button>
        </div>
    </form>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} hideHeader className="p-0 overflow-hidden max-w-lg rounded-2xl shadow-2xl">
      {mode === 'view' && event ? renderViewMode() : renderEditMode()}
    </Modal>
  );
};