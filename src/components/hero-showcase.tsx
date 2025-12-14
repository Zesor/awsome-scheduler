"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  List,
  LayoutGrid,
  Clock
} from "lucide-react";
import { format, addDays, startOfWeek } from "date-fns";

// Sample events for the showcase
const sampleEvents = [
  { id: 1, title: "Team Standup", time: "9:00 AM", color: "#3b82f6", day: 1 },
  { id: 2, title: "Product Review", time: "2:00 PM", color: "#8b5cf6", day: 1 },
  { id: 3, title: "Design Sprint", time: "10:00 AM", color: "#10b981", day: 2 },
  { id: 4, title: "Client Call", time: "3:00 PM", color: "#f59e0b", day: 2 },
  { id: 5, title: "Code Review", time: "11:00 AM", color: "#ef4444", day: 3 },
  { id: 6, title: "Workshop", time: "9:00 AM", color: "#8b5cf6", day: 4 },
  { id: 7, title: "Demo Day", time: "3:00 PM", color: "#10b981", day: 5 },
];

interface ShowcaseStep {
  view: "month" | "week" | "day" | "agenda";
  label: string;
  description: string;
  isDark: boolean;
}

const showcaseSteps: ShowcaseStep[] = [
  { view: "month", label: "Month View", description: "See the big picture", isDark: false },
  { view: "week", label: "Week View", description: "Plan your week", isDark: false },
  { view: "day", label: "Day View", description: "Focus on today", isDark: false },
  { view: "week", label: "Dark Mode", description: "Easy on the eyes", isDark: true },
  { view: "agenda", label: "Agenda View", description: "List all events", isDark: true },
];

function CalendarHeader({ isDark, currentMonth }: { isDark: boolean; currentMonth: string }) {
  return (
    <div className={cn(
      "flex items-center justify-between px-3 py-2 border-b",
      isDark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"
    )}>
      <div className="flex items-center gap-2">
        <button className={cn(
          "p-1 rounded hover:bg-slate-100",
          isDark && "hover:bg-slate-700"
        )}>
          <ChevronLeft className={cn("w-4 h-4", isDark ? "text-slate-300" : "text-slate-600")} />
        </button>
        <button className={cn(
          "p-1 rounded hover:bg-slate-100",
          isDark && "hover:bg-slate-700"
        )}>
          <ChevronRight className={cn("w-4 h-4", isDark ? "text-slate-300" : "text-slate-600")} />
        </button>
        <span className={cn(
          "text-sm font-medium ml-2",
          isDark ? "text-white" : "text-slate-900"
        )}>
          {currentMonth}
        </span>
      </div>
      <div className="flex items-center gap-1">
        <button className={cn(
          "p-1.5 rounded",
          isDark ? "bg-slate-700 text-white" : "bg-slate-100 text-slate-900"
        )}>
          {isDark ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
}

function MonthView({ isDark }: { isDark: boolean }) {
  const today = new Date();
  const weekStart = startOfWeek(today);
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="flex-1 p-2">
      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        {days.map(day => (
          <div key={day} className={cn(
            "text-[10px] text-center py-1 font-medium",
            isDark ? "text-slate-400" : "text-slate-500"
          )}>
            {day}
          </div>
        ))}
      </div>
      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: 35 }, (_, i) => {
          const dayNum = i - 3 + 1; // Start from a few days before
          const isToday = dayNum === today.getDate();
          const hasEvent = sampleEvents.some(e => e.day === (i % 7));
          const event = sampleEvents.find(e => e.day === (i % 7));

          return (
            <div
              key={i}
              className={cn(
                "aspect-square rounded text-[10px] flex flex-col items-center justify-start p-0.5",
                isDark ? "hover:bg-slate-700" : "hover:bg-slate-50",
                isToday && (isDark ? "bg-primary/20 ring-1 ring-primary" : "bg-primary/10 ring-1 ring-primary")
              )}
            >
              <span className={cn(
                "w-5 h-5 flex items-center justify-center rounded-full text-[10px]",
                isToday && "bg-primary text-white",
                !isToday && (isDark ? "text-slate-300" : "text-slate-700")
              )}>
                {dayNum > 0 && dayNum <= 31 ? dayNum : ""}
              </span>
              {hasEvent && dayNum > 0 && dayNum <= 31 && (
                <div
                  className="w-full h-1 rounded-full mt-0.5"
                  style={{ backgroundColor: event?.color }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function WeekView({ isDark }: { isDark: boolean }) {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const hours = [9, 10, 11, 12, 13, 14, 15, 16];

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Day headers */}
      <div className={cn(
        "grid grid-cols-6 gap-px border-b",
        isDark ? "bg-slate-700 border-slate-700" : "bg-slate-100 border-slate-200"
      )}>
        <div className={cn("p-1", isDark ? "bg-slate-800" : "bg-white")} />
        {days.map((day, i) => (
          <div key={day} className={cn(
            "p-1 text-center",
            isDark ? "bg-slate-800" : "bg-white"
          )}>
            <div className={cn("text-[9px]", isDark ? "text-slate-400" : "text-slate-500")}>{day}</div>
            <div className={cn(
              "text-xs font-medium",
              i === 0 && "text-primary",
              isDark ? "text-white" : "text-slate-900"
            )}>{10 + i}</div>
          </div>
        ))}
      </div>
      {/* Time grid */}
      <div className="flex-1 overflow-hidden">
        <div className={cn(
          "grid grid-cols-6 gap-px h-full",
          isDark ? "bg-slate-700" : "bg-slate-100"
        )}>
          {/* Time column */}
          <div className={cn("flex flex-col", isDark ? "bg-slate-800" : "bg-white")}>
            {hours.map(hour => (
              <div key={hour} className={cn(
                "flex-1 text-[8px] pr-1 text-right",
                isDark ? "text-slate-500" : "text-slate-400"
              )}>
                {hour > 12 ? `${hour - 12}PM` : `${hour}AM`}
              </div>
            ))}
          </div>
          {/* Day columns */}
          {days.map((_, dayIndex) => (
            <div key={dayIndex} className={cn(
              "flex flex-col relative",
              isDark ? "bg-slate-800" : "bg-white"
            )}>
              {hours.map(hour => (
                <div key={hour} className={cn(
                  "flex-1 border-t",
                  isDark ? "border-slate-700" : "border-slate-100"
                )} />
              ))}
              {/* Events */}
              {sampleEvents
                .filter(e => e.day === dayIndex + 1)
                .map(event => (
                  <div
                    key={event.id}
                    className="absolute left-0 right-0 mx-0.5 rounded text-[8px] text-white px-1 py-0.5 truncate"
                    style={{
                      backgroundColor: event.color,
                      top: `${(parseInt(event.time) - 9) * 12.5}%`,
                      height: '20%',
                    }}
                  >
                    {event.title}
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DayView({ isDark }: { isDark: boolean }) {
  const hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
  const todayEvents = sampleEvents.filter(e => e.day === 1);

  return (
    <div className="flex-1 overflow-hidden p-2">
      <div className={cn(
        "text-xs font-medium mb-2 text-center",
        isDark ? "text-white" : "text-slate-900"
      )}>
        Monday, Dec 11
      </div>
      <div className="space-y-1">
        {hours.map(hour => {
          const event = todayEvents.find(e => parseInt(e.time) === hour || (hour === 14 && e.time === "2:00 PM"));
          return (
            <div key={hour} className="flex gap-2 items-start">
              <span className={cn(
                "text-[9px] w-8 text-right shrink-0",
                isDark ? "text-slate-500" : "text-slate-400"
              )}>
                {hour > 12 ? `${hour - 12}PM` : hour === 12 ? '12PM' : `${hour}AM`}
              </span>
              <div className={cn(
                "flex-1 h-6 border-t",
                isDark ? "border-slate-700" : "border-slate-100"
              )}>
                {event && (
                  <div
                    className="h-5 rounded text-[9px] text-white px-1.5 truncate flex items-center"
                    style={{ backgroundColor: event.color }}
                  >
                    {event.title}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AgendaView({ isDark }: { isDark: boolean }) {
  return (
    <div className="flex-1 overflow-hidden p-2">
      <div className="space-y-2">
        {sampleEvents.slice(0, 5).map(event => (
          <div
            key={event.id}
            className={cn(
              "flex items-center gap-2 p-2 rounded-lg",
              isDark ? "bg-slate-700/50" : "bg-slate-50"
            )}
          >
            <div
              className="w-1 h-8 rounded-full shrink-0"
              style={{ backgroundColor: event.color }}
            />
            <div className="flex-1 min-w-0">
              <div className={cn(
                "text-xs font-medium truncate",
                isDark ? "text-white" : "text-slate-900"
              )}>
                {event.title}
              </div>
              <div className={cn(
                "text-[10px]",
                isDark ? "text-slate-400" : "text-slate-500"
              )}>
                {event.time} · Mon {10 + event.day}
              </div>
            </div>
            <Clock className={cn(
              "w-3 h-3 shrink-0",
              isDark ? "text-slate-500" : "text-slate-400"
            )} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function HeroShowcase() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  const step = showcaseSteps[currentStep];

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => (prev + 1) % showcaseSteps.length);
  }, []);

  useEffect(() => {
    if (isPaused || !hasMounted) return;

    const timer = setInterval(() => {
      nextStep();
    }, 3500);

    return () => clearInterval(timer);
  }, [isPaused, nextStep, hasMounted]);

  const currentMonth = format(new Date(), "MMMM yyyy");

  return (
    <div
      className="relative w-full h-full min-h-[350px] lg:min-h-[450px]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Scheduler Container */}
      <motion.div
        className={cn(
          "w-full h-full rounded-xl overflow-hidden shadow-2xl border flex flex-col",
          step.isDark
            ? "bg-slate-900 border-slate-700"
            : "bg-white border-slate-200"
        )}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <CalendarHeader isDark={step.isDark} currentMonth={currentMonth} />

        <AnimatePresence mode="wait">
          <motion.div
            key={`${step.view}-${step.isDark}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col overflow-hidden"
          >
            {step.view === "month" && <MonthView isDark={step.isDark} />}
            {step.view === "week" && <WeekView isDark={step.isDark} />}
            {step.view === "day" && <DayView isDark={step.isDark} />}
            {step.view === "agenda" && <AgendaView isDark={step.isDark} />}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Feature Label Overlay */}
      <motion.div
        className="absolute bottom-3 left-3 right-3 flex items-center justify-between"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className={cn(
          "backdrop-blur-sm rounded-lg px-3 py-1.5 border shadow-lg",
          step.isDark ? "bg-slate-800/90 border-slate-600" : "bg-white/90 border-slate-200"
        )}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
            >
              <p className={cn(
                "text-xs font-semibold",
                step.isDark ? "text-white" : "text-slate-900"
              )}>
                {step.label}
              </p>
              <p className={cn(
                "text-[10px]",
                step.isDark ? "text-slate-400" : "text-slate-500"
              )}>
                {step.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Step Indicators */}
        <div className={cn(
          "flex items-center gap-1.5 backdrop-blur-sm rounded-full px-2 py-1.5 border shadow-lg",
          step.isDark ? "bg-slate-800/90 border-slate-600" : "bg-white/90 border-slate-200"
        )}>
          {showcaseSteps.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentStep(index)}
              className={cn(
                "w-1.5 h-1.5 rounded-full transition-all duration-300",
                index === currentStep
                  ? "bg-primary w-4"
                  : step.isDark
                    ? "bg-slate-600 hover:bg-slate-500"
                    : "bg-slate-300 hover:bg-slate-400"
              )}
              aria-label={`Go to step ${index + 1}`}
            />
          ))}
        </div>
      </motion.div>

      {/* Pause Indicator */}
      <AnimatePresence>
        {isPaused && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={cn(
              "absolute top-3 right-3 backdrop-blur-sm rounded-full px-2 py-1 border shadow-lg",
              step.isDark ? "bg-slate-800/90 border-slate-600" : "bg-white/90 border-slate-200"
            )}
          >
            <span className={cn(
              "text-[10px]",
              step.isDark ? "text-slate-400" : "text-slate-500"
            )}>
              Paused
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
