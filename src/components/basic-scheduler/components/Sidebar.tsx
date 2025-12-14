import React, { useState } from 'react';
import { Button } from './ui/button';
import { Plus, ChevronDown, ChevronUp, Search, Globe, Check } from 'lucide-react';
import { MiniCalendar } from './MiniCalendar';
import { cn } from '../utils';

import { ViewType } from '../types';

interface SidebarProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
  onViewChange?: (view: ViewType) => void;
  onEventCreate?: () => void;
  timezone?: string;
  onTimezoneChange?: (timezone: string) => void;
  className?: string;
  readOnly?: boolean;
  calendars?: {
    id: string;
    label: string;
    color?: string;
    active?: boolean;
  }[];
  onCalendarToggle?: (calendarId: string, active: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentDate,
  onDateChange,
  onViewChange,
  onEventCreate,
  timezone,
  onTimezoneChange,
  className,
  readOnly,
  calendars,
  onCalendarToggle
}) => {
  const [calendarsOpen, setCalendarsOpen] = useState(true);
  const [timezoneOpen, setTimezoneOpen] = useState(false);
  
  // Default demo data if no calendars provided
  const defaultCalendars = [
    { id: '1', label: 'My Calendar', color: '#3b82f6', active: true },
    { id: '2', label: 'Birthdays', color: '#10b981', active: true },
    { id: '3', label: 'Tasks', color: '#6366f1', active: true },
  ];

  const displayCalendars = calendars || defaultCalendars;

  const timezones = [
    { value: '', label: 'Local Time' },
    { value: 'America/New_York', label: 'New York (EST)' },
    { value: 'Europe/London', label: 'London (GMT+0)' },
    { value: 'Asia/Tokyo', label: 'Tokyo (JST)' },
    { value: 'Australia/Sydney', label: 'Sydney (AEDT)' },
    { value: 'America/Los_Angeles', label: 'Los Angeles (PST)' },
    { value: 'Europe/Paris', label: 'Paris (CET)' },
  ];

  const selectedTimezoneLabel = timezones.find(t => t.value === (timezone || ''))?.label || 'Local Time';

  return (
    <div className={cn("flex flex-col w-[256px] h-full bg-background border-r border-border pt-3 pb-4 overflow-y-auto hidden lg:flex", className)}>
      {!readOnly && (
        <div className="px-4 mb-6">
            <Button
            className="rounded-full shadow-md bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-6 gap-3 min-w-[140px] justify-start transition-all duration-200 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
            onClick={onEventCreate}
            >
            <Plus className="w-6 h-6" />
            <span className="text-sm font-medium">Create</span>
            </Button>
        </div>
      )}

      <MiniCalendar currentDate={currentDate} onDateChange={onDateChange} onViewChange={onViewChange} />
      <div className="flex-1 px-4 space-y-6 mt-4">
        {/* Calendars List */}
        <div>
          <div 
            className="flex items-center justify-between cursor-pointer hover:bg-accent/50 p-1 -mx-1 rounded mb-1 transition-colors"
            onClick={() => setCalendarsOpen(!calendarsOpen)}
          >
            <span className="text-sm font-medium text-foreground">Calendars</span>
            {calendarsOpen ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
          </div>
          
          {calendarsOpen && (
            <div className="space-y-1 mt-1">
              {displayCalendars.map(cal => (
                <div key={cal.id} className="flex items-center gap-3 py-1.5 px-1 hover:bg-accent/50 rounded cursor-pointer group transition-colors">
                  <div className="relative flex items-center justify-center">
                    <input 
                        type="checkbox" 
                        checked={cal.active ?? true}
                        onChange={(e) => onCalendarToggle?.(cal.id, e.target.checked)}
                        className="peer h-4 w-4 rounded border-border text-primary focus:ring-primary cursor-pointer appearance-none border-2 checked:bg-primary checked:border-primary transition-all"
                        style={{ '--primary-color': cal.color } as React.CSSProperties}
                        data-cal-id={cal.id}
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 peer-checked:opacity-100">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    {/* Custom checkbox color override */}
                    <style>{`
                      /* Scope the style to this specific checkbox using a data attribute or class approach */
                      input[type="checkbox"][data-cal-id="${cal.id}"]:checked {
                        background-color: ${cal.color} !important;
                        border-color: ${cal.color} !important;
                      }
                      /* Focus ring color */
                      input[type="checkbox"][data-cal-id="${cal.id}"]:focus {
                        --tw-ring-color: ${cal.color}40 !important; 
                      }
                    `}</style>
                  </div>
                  <span className="text-sm text-foreground/80 truncate">{cal.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Timezone Selector - Removed */}
      {/* 
      <div className="mt-auto px-4 pt-4 border-t border-border">
          <div className="relative">
              <div className="flex items-center gap-2 mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  <Globe className="w-3 h-3" />
                  Timezone
              </div>
              
              <div className="relative">
                <button 
                    onClick={() => setTimezoneOpen(!timezoneOpen)}
                    className="w-full flex items-center justify-between bg-muted/30 hover:bg-muted/50 border border-border rounded-md py-2 pl-3 pr-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-left"
                >
                    <span className="truncate mr-2">{selectedTimezoneLabel}</span>
                    <ChevronDown className={cn("w-4 h-4 text-muted-foreground transition-transform duration-200", timezoneOpen && "rotate-180")} />
                </button>

                {timezoneOpen && (
                    <>
                        <div className="fixed inset-0 z-40" onClick={() => setTimezoneOpen(false)} />
                        <div className="absolute bottom-full left-0 w-full mb-1 bg-popover border border-border rounded-md shadow-lg z-50 max-h-[240px] overflow-y-auto p-1 animate-in fade-in zoom-in-95 duration-200">
                            {timezones.map(tz => (
                                <div 
                                    key={tz.value}
                                    className={cn(
                                        "px-2 py-1.5 text-sm rounded cursor-pointer flex items-center justify-between",
                                        (timezone || '') === tz.value 
                                            ? "bg-primary/10 text-primary font-medium" 
                                            : "text-foreground hover:bg-accent"
                                    )}
                                    onClick={() => {
                                        onTimezoneChange?.(tz.value);
                                        setTimezoneOpen(false);
                                    }}
                                >
                                    {tz.label}
                                    {(timezone || '') === tz.value && <Check className="w-3 h-3" />}
                                </div>
                            ))}
                        </div>
                    </>
                 )}
               </div>
          </div>
      </div>
      */}
    </div>
  );
};
