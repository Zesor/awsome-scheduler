"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "@/components/section";
import { cn } from "@/lib/utils";
import { Scheduler as ProScheduler, CalendarEvent, ViewType } from "calendarkit-pro";
import { BasicScheduler } from "calendarkit-basic";
import { addDays, startOfWeek, addHours } from "date-fns";
import { fr } from "date-fns/locale";
import { Check, X, Sparkles } from "lucide-react";
import { track } from "@vercel/analytics";

// Calendar colors - match calendarId to color
const calendarColors: Record<string, string> = {
  work: "#3b82f6",      // blue
  personal: "#10b981",  // green
  urgent: "#ef4444",    // red
  family: "#8b5cf6",    // purple
};

// Sample guests for events
const sampleGuests = {
  team: ["alice@company.com", "bob@company.com", "charlie@company.com"],
  client: ["john.doe@client.com", "jane.smith@client.com"],
  manager: ["manager@company.com"],
  family: ["spouse@email.com", "parent@email.com"],
  friends: ["friend1@email.com", "friend2@email.com", "friend3@email.com"],
};

// Generate comprehensive sample events for the demo
const generateDemoEvents = (): CalendarEvent[] => {
  const events: CalendarEvent[] = [];
  const today = new Date();
  const weekStart = startOfWeek(today);

  // Helper to create events with full details
  const createEvent = (
    id: string,
    title: string,
    dayOffset: number,
    hourStart: number,
    duration: number,
    calendarId: string,
    details: {
      description?: string;
      location?: string;
      guests?: string[];
    } = {}
  ): CalendarEvent => {
    const start = addHours(addDays(weekStart, dayOffset), hourStart);
    const end = addHours(start, duration);
    return {
      id,
      title,
      start,
      end,
      calendarId,
      description: details.description,
      location: details.location,
      guests: details.guests,
      color: calendarColors[calendarId] || "#3b82f6",
      allDay: false,
    };
  };

  // Monday (dayOffset = 1)
  events.push(createEvent("1", "Team Standup", 1, 9, 0.5, "work", {
    description: "Daily sync with the engineering team. Review blockers and progress on current sprint items.",
    location: "Meeting Room A - Floor 3",
    guests: sampleGuests.team,
  }));
  events.push(createEvent("2", "React Workshop", 1, 10, 2, "work", {
    description: "Advanced React Patterns workshop covering hooks, context, and performance optimization techniques.",
    location: "Training Center - Building B",
    guests: [...sampleGuests.team, "trainer@external.com"],
  }));
  events.push(createEvent("3", "Lunch with Client", 1, 12, 1, "personal", {
    description: "Discuss Q2 project roadmap and potential expansion of services. Bring contract proposals.",
    location: "The Italian Kitchen, 123 Main St",
    guests: sampleGuests.client,
  }));
  events.push(createEvent("4", "Design Review", 1, 14, 1.5, "work", {
    description: "Review new UI mockups for the dashboard redesign. Prepare feedback on color scheme and navigation flow.",
    location: "Design Studio - Floor 2",
    guests: ["designer@company.com", ...sampleGuests.team.slice(0, 2)],
  }));
  events.push(createEvent("5", "Pick up Kids", 1, 16, 0.5, "family", {
    description: "Pick up Emma and Jack from school. Don't forget soccer gear in the car!",
    location: "Lincoln Elementary School, 456 Oak Ave",
  }));

  // Tuesday (dayOffset = 2)
  events.push(createEvent("6", "Client Call", 2, 9, 1, "urgent", {
    description: "URGENT: Address production issue reported by client. Bring incident report and proposed solutions.",
    location: "Zoom Meeting - Link in calendar invite",
    guests: [...sampleGuests.client, ...sampleGuests.manager],
  }));
  events.push(createEvent("7", "Code Review", 2, 10, 1.5, "work", {
    description: "Review PRs for the authentication feature. Focus on security best practices and test coverage.",
    location: "Engineering Hub - Floor 3",
    guests: sampleGuests.team.slice(0, 2),
  }));
  events.push(createEvent("8", "Strategy Meeting", 2, 12, 1, "work", {
    description: "Q1 Planning session with leadership. Topics: OKRs, budget allocation, team expansion.",
    location: "Executive Boardroom - Floor 5",
    guests: [...sampleGuests.manager, "cto@company.com", "ceo@company.com"],
  }));
  events.push(createEvent("9", "Doctor Appointment", 2, 14, 1, "personal", {
    description: "Annual health checkup. Bring insurance card and list of current medications.",
    location: "City Medical Center, 789 Health Blvd, Suite 200",
  }));
  events.push(createEvent("10", "Sprint Planning", 2, 15, 1.5, "work", {
    description: "Plan next sprint: story point estimation, capacity planning, and sprint goal definition.",
    location: "Agile Room - Floor 3",
    guests: sampleGuests.team,
  }));

  // Wednesday (dayOffset = 3)
  events.push(createEvent("11", "Town Hall", 3, 9, 1, "work", {
    description: "Monthly all-hands meeting. CEO will present quarterly results and company updates.",
    location: "Main Auditorium - Ground Floor",
    guests: ["all-staff@company.com"],
  }));
  events.push(createEvent("12", "Dev Focus Time", 3, 10, 3, "work", {
    description: "Deep work session - No meetings. Focus on implementing the new payment gateway integration.",
    location: "Work from Home",
  }));
  events.push(createEvent("13", "Production Bug", 3, 13, 1, "urgent", {
    description: "CRITICAL: Fix payment processing bug affecting 5% of transactions. Hotfix deployment required.",
    location: "War Room - Floor 3",
    guests: [...sampleGuests.team, ...sampleGuests.manager],
  }));
  events.push(createEvent("14", "Family Dinner", 3, 18, 2, "family", {
    description: "Weekly family dinner at grandma's house. Bring the apple pie!",
    location: "Grandma's House, 321 Maple Lane",
    guests: sampleGuests.family,
  }));

  // Thursday (dayOffset = 4)
  events.push(createEvent("15", "Training Session", 4, 9, 2, "work", {
    description: "AWS certification training - Module 3: EC2 and Auto Scaling. Complete pre-reading before session.",
    location: "Online - AWS Training Portal",
    guests: sampleGuests.team.slice(0, 2),
  }));
  events.push(createEvent("16", "Weekly Sync", 4, 11, 1, "work", {
    description: "Team status update meeting. Each member presents: accomplishments, plans, and blockers.",
    location: "Meeting Room B - Floor 3",
    guests: sampleGuests.team,
  }));
  events.push(createEvent("17", "Gym Session", 4, 12, 1, "personal", {
    description: "Leg day workout with personal trainer. Don't skip the stretching!",
    location: "FitLife Gym, 555 Fitness Way",
  }));
  events.push(createEvent("18", "1:1 with Manager", 4, 14, 0.5, "work", {
    description: "Career development discussion. Topics: promotion timeline, skill development, and Q2 goals.",
    location: "Manager's Office - Floor 4",
    guests: sampleGuests.manager,
  }));
  events.push(createEvent("19", "Urgent Deadline", 4, 15, 2, "urgent", {
    description: "Project X delivery deadline. Final testing, documentation review, and deployment preparation.",
    location: "Engineering Hub - Floor 3",
    guests: [...sampleGuests.team, ...sampleGuests.client],
  }));

  // Friday (dayOffset = 5)
  events.push(createEvent("20", "Team Standup", 5, 9, 0.5, "work", {
    description: "End-of-week standup. Review sprint progress and prepare weekend on-call handoff.",
    location: "Meeting Room A - Floor 3",
    guests: sampleGuests.team,
  }));
  events.push(createEvent("21", "Code Freeze", 5, 10, 1, "urgent", {
    description: "Release v2.5.0 code freeze. Final QA verification and release notes preparation.",
    location: "Release War Room - Floor 3",
    guests: [...sampleGuests.team, "qa-lead@company.com"],
  }));
  events.push(createEvent("22", "Demo Day", 5, 14, 2, "work", {
    description: "Sprint demo to stakeholders. Showcase new features: dashboard redesign, payment integration, and mobile app updates.",
    location: "Demo Theater - Floor 1",
    guests: [...sampleGuests.team, ...sampleGuests.client, ...sampleGuests.manager],
  }));
  events.push(createEvent("23", "Happy Hour", 5, 17, 2, "personal", {
    description: "Friday team bonding at the pub. First round is on the company!",
    location: "The Local Pub, 888 Downtown St",
    guests: sampleGuests.friends,
  }));
  events.push(createEvent("24", "Movie Night", 5, 19, 3, "family", {
    description: "Family movie night! Watching the new animated film. Don't forget the popcorn.",
    location: "AMC Cinema, 999 Entertainment Blvd",
    guests: sampleGuests.family,
  }));

  // Saturday (dayOffset = 6)
  events.push(createEvent("25", "Soccer Practice", 6, 10, 1.5, "family", {
    description: "Kids' soccer practice. Bring water bottles, snacks, and the orange team jerseys.",
    location: "Community Sports Field, 222 Park Ave",
    guests: ["coach@soccerclub.com"],
  }));
  events.push(createEvent("26", "Grocery Shopping", 6, 13, 1, "personal", {
    description: "Weekly grocery run. Check the shared shopping list in the family app before leaving.",
    location: "Whole Foods Market, 333 Organic Lane",
  }));

  // Sunday (dayOffset = 0)
  events.push(createEvent("27", "Brunch", 0, 11, 1.5, "family", {
    description: "Sunday brunch with extended family. Celebrate cousin's birthday!",
    location: "The Brunch Spot, 444 Sunny St",
    guests: [...sampleGuests.family, "cousin@email.com", "aunt@email.com"],
  }));
  events.push(createEvent("28", "Week Planning", 0, 15, 1, "personal", {
    description: "Review upcoming week: check calendar, prepare meal plan, and organize priorities.",
    location: "Home Office",
  }));

  return events;
};

interface FeatureCheck {
  name: string;
  basic: boolean;
  pro: boolean;
}

const featureChecks: FeatureCheck[] = [
  { name: "Month / Week / Day views", basic: true, pro: true },
  { name: "Event creation & editing", basic: true, pro: true },
  { name: "Calendar filtering", basic: true, pro: true },
  { name: "Agenda view", basic: false, pro: true },
  { name: "Resource view", basic: false, pro: true },
  { name: "Drag & drop events", basic: false, pro: true },
  { name: "Timezone support", basic: false, pro: true },
  { name: "Dark / Light mode", basic: false, pro: true },
  { name: "Multi-language (i18n)", basic: false, pro: true },
  { name: "Recurring events", basic: false, pro: true },
];

type PlanType = "basic" | "pro";

export function Comparison() {
  const [activePlan, setActivePlan] = useState<PlanType>("pro");
  const [events, setEvents] = useState<CalendarEvent[]>(generateDemoEvents());
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<ViewType>("week");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [language, setLanguage] = useState<"en" | "fr">("en");
  const [timezone, setTimezone] = useState<string>("");

  // Calendars for filtering - all 4 calendars to match demo events
  const [calendars, setCalendars] = useState([
    { id: "work", label: "Work", color: "#3b82f6", active: true },
    { id: "personal", label: "Personal", color: "#10b981", active: true },
    { id: "urgent", label: "Urgent", color: "#ef4444", active: true },
    { id: "family", label: "Family", color: "#8b5cf6", active: true },
  ]);

  const handleCalendarToggle = (calendarId: string, active: boolean) => {
    setCalendars((prev) =>
      prev.map((cal) => (cal.id === calendarId ? { ...cal, active } : cal))
    );
  };

  // Filter events based on active calendars
  const filteredEvents = useMemo(() => {
    const activeCalendarIds = calendars
      .filter((c) => c.active)
      .map((c) => c.id);
    return events.filter((e) => {
      if (!e.calendarId) return true;
      return activeCalendarIds.includes(e.calendarId);
    });
  }, [events, calendars]);

  // Event handlers
  const handleEventCreate = (newEvent: Partial<CalendarEvent>) => {
    track("Demo Event Created", { plan: activePlan, view: view });
    const event: CalendarEvent = {
      ...newEvent,
      id: Math.random().toString(36).substr(2, 9),
      start: newEvent.start as Date,
      end: newEvent.end as Date,
      title: newEvent.title || "New Event",
    };
    setEvents((prev) => [...prev, event]);
  };

  const handleEventUpdate = (updatedEvent: CalendarEvent) => {
    track("Demo Event Updated", { plan: activePlan, view: view });
    setEvents((prev) =>
      prev.map((e) => (e.id === updatedEvent.id ? updatedEvent : e))
    );
  };

  const handleEventDelete = (eventId: string) => {
    track("Demo Event Deleted", { plan: activePlan, view: view });
    setEvents((prev) => prev.filter((e) => e.id !== eventId));
  };

  // Get current features for active plan
  const currentFeatures = featureChecks.map((f) => ({
    ...f,
    enabled: activePlan === "pro" ? f.pro : f.basic,
  }));

  return (
    <Section id="comparison" title="Demo">
      <div className="border border-b-0">
        {/* Header */}
        <div className="p-6 md:p-10 text-center border-b">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-balance">
            Experience the Difference
          </h2>
          <p className="mt-4 text-muted-foreground text-balance max-w-2xl mx-auto">
            Try both versions below. Create events, switch views, and see why
            developers choose Pro.
          </p>

          {/* Toggle Tabs */}
          <div className="mt-8 flex justify-center">
            <div className="relative flex items-center rounded-full border p-1.5 bg-muted/50">
              <motion.div
                className="absolute h-[calc(100%-12px)] rounded-full bg-background shadow-sm"
                layoutId="plan-toggle"
                initial={false}
                animate={{
                  left: activePlan === "basic" ? "6px" : "50%",
                  width: "calc(50% - 6px)",
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
              />
              <button
                onClick={() => {
                  track("Demo Plan Toggled", { plan: "basic", previous_plan: activePlan });
                  setActivePlan("basic");
                }}
                className={cn(
                  "relative z-10 px-6 py-2.5 text-sm font-medium transition-colors rounded-full",
                  activePlan === "basic"
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Basic
              </button>
              <button
                onClick={() => {
                  track("Demo Plan Toggled", { plan: "pro", previous_plan: activePlan });
                  setActivePlan("pro");
                }}
                className={cn(
                  "relative z-10 px-6 py-2.5 text-sm font-medium transition-colors rounded-full flex items-center gap-2",
                  activePlan === "pro"
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Sparkles className="h-4 w-4" />
                Pro
              </button>
            </div>
          </div>
        </div>

        {/* Scheduler Demo */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePlan}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "h-[600px] md:h-[700px] relative overflow-hidden",
                isDarkMode && activePlan === "pro" ? "dark" : ""
              )}
              style={{
                // Only apply CSS variable overrides for ProScheduler
                // BasicScheduler uses its own native styling
                ...(activePlan === "pro" ? (isDarkMode ? {
                  // Dark mode variables for Pro
                  backgroundColor: "oklch(0.1648 0.0075 270.93)",
                  "--background": "oklch(0.1648 0.0075 270.93)",
                  "--foreground": "oklch(0.9846 0.0018 264.54)",
                  "--card": "oklch(0.2063 0.0073 270.6)",
                  "--card-foreground": "oklch(0.9846 0.0018 264.54)",
                  "--popover": "oklch(0.2063 0.0073 270.6)",
                  "--popover-foreground": "oklch(0.9846 0.0018 264.54)",
                  "--primary": "oklch(0.6222 0.2151 263.68)",
                  "--primary-foreground": "oklch(0.9846 0.0018 264.54)",
                  "--secondary": "oklch(0.2652 0.0118 269.31)",
                  "--secondary-foreground": "oklch(0.9846 0.0018 264.54)",
                  "--muted": "oklch(0.2652 0.0118 269.31)",
                  "--muted-foreground": "oklch(0.6952 0.0202 264.54)",
                  "--accent": "oklch(0.2652 0.0118 269.31)",
                  "--accent-foreground": "oklch(0.9846 0.0018 264.54)",
                  "--border": "oklch(0.2652 0.0118 269.31)",
                  "--input": "oklch(0.2652 0.0118 269.31)",
                  "--ring": "oklch(0.6222 0.2151 263.68)",
                  colorScheme: "dark",
                } as React.CSSProperties : {
                  // Light mode variables for Pro - explicit white theme
                  backgroundColor: "white",
                  "--background": "oklch(1 0 0)",
                  "--foreground": "oklch(0.1648 0.0075 270.93)",
                  "--card": "oklch(1 0 0)",
                  "--card-foreground": "oklch(0.1648 0.0075 270.93)",
                  "--popover": "oklch(1 0 0)",
                  "--popover-foreground": "oklch(0.1648 0.0075 270.93)",
                  "--primary": "oklch(0.4565 0.1878 263.68)",
                  "--primary-foreground": "oklch(0.9846 0.0018 264.54)",
                  "--secondary": "oklch(0.9627 0.0046 270.93)",
                  "--secondary-foreground": "oklch(0.2063 0.0073 270.6)",
                  "--muted": "oklch(0.9627 0.0046 270.93)",
                  "--muted-foreground": "oklch(0.4581 0.0196 264.54)",
                  "--accent": "oklch(0.9627 0.0046 270.93)",
                  "--accent-foreground": "oklch(0.2063 0.0073 270.6)",
                  "--border": "oklch(0.9207 0.0071 270.93)",
                  "--input": "oklch(0.9207 0.0071 270.93)",
                  "--ring": "oklch(0.4565 0.1878 263.68)",
                  colorScheme: "light",
                } as React.CSSProperties) : {
                  // BasicScheduler needs light mode context to display correctly
                  backgroundColor: "white",
                  "--background": "oklch(1 0 0)",
                  "--foreground": "oklch(0.1648 0.0075 270.93)",
                  "--card": "oklch(1 0 0)",
                  "--card-foreground": "oklch(0.1648 0.0075 270.93)",
                  "--popover": "oklch(1 0 0)",
                  "--popover-foreground": "oklch(0.1648 0.0075 270.93)",
                  "--primary": "oklch(0.4565 0.1878 263.68)",
                  "--primary-foreground": "oklch(0.9846 0.0018 264.54)",
                  "--secondary": "oklch(0.9627 0.0046 270.93)",
                  "--secondary-foreground": "oklch(0.2063 0.0073 270.6)",
                  "--muted": "oklch(0.9627 0.0046 270.93)",
                  "--muted-foreground": "oklch(0.4581 0.0196 264.54)",
                  "--accent": "oklch(0.9627 0.0046 270.93)",
                  "--accent-foreground": "oklch(0.2063 0.0073 270.6)",
                  "--border": "oklch(0.9207 0.0071 270.93)",
                  "--input": "oklch(0.9207 0.0071 270.93)",
                  "--ring": "oklch(0.4565 0.1878 263.68)",
                  colorScheme: "light",
                } as React.CSSProperties),
              }}
            >
              {activePlan === "pro" ? (
                <ProScheduler
                  events={filteredEvents}
                  view={view}
                  onViewChange={(v) => {
                    track("Demo View Changed", { plan: activePlan, from_view: view, to_view: v });
                    setView(v);
                  }}
                  date={currentDate}
                  onDateChange={setCurrentDate}
                  calendars={calendars}
                  onCalendarToggle={handleCalendarToggle}
                  onEventCreate={handleEventCreate}
                  onEventUpdate={handleEventUpdate}
                  onEventDelete={handleEventDelete}
                  isDarkMode={isDarkMode}
                  onThemeToggle={() => {
                    track("Demo Theme Toggled", { plan: activePlan, to_theme: !isDarkMode ? "dark" : "light" });
                    setIsDarkMode(!isDarkMode);
                  }}
                  language={language}
                  onLanguageChange={(lang) => {
                    track("Demo Language Changed", { plan: activePlan, language: lang });
                    setLanguage(lang);
                  }}
                  locale={language === "fr" ? fr : undefined}
                  timezone={timezone}
                  onTimezoneChange={(tz) => {
                    track("Demo Timezone Changed", { plan: activePlan, timezone: tz });
                    setTimezone(tz);
                  }}
                  className="h-full"
                />
              ) : (
                <BasicScheduler
                  events={filteredEvents}
                  view={view as "month" | "week" | "day"}
                  onViewChange={(v) => {
                    track("Demo View Changed", { plan: activePlan, from_view: view, to_view: v });
                    setView(v);
                  }}
                  date={currentDate}
                  onDateChange={setCurrentDate}
                  calendars={calendars}
                  onCalendarToggle={handleCalendarToggle}
                  onEventCreate={handleEventCreate}
                  onEventUpdate={handleEventUpdate}
                  onEventDelete={handleEventDelete}
                  className="h-full"
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Feature Checklist */}
        <div className="border-t p-6 md:p-10">
          <h3 className="text-lg font-semibold mb-4 text-center">
            {activePlan === "pro" ? "Pro" : "Basic"} Features
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 max-w-4xl mx-auto">
            {currentFeatures.map((feature) => (
              <motion.div
                key={feature.name}
                layout
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors",
                  feature.enabled
                    ? "bg-green-500/10 text-green-600 dark:text-green-400"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {feature.enabled ? (
                  <Check className="h-4 w-4 shrink-0" />
                ) : (
                  <X className="h-4 w-4 shrink-0" />
                )}
                <span className="truncate">{feature.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
