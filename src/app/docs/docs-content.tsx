"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Book,
  Zap,
  Calendar,
  Settings,
  Code,
  ChevronRight,
  Copy,
  Check,
  ArrowLeft,
  Menu,
  X,
} from "lucide-react";

interface DocsContentProps {
  highlightedCode: Record<string, string>;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  children?: { id: string; label: string }[];
}

const navigation: NavItem[] = [
  {
    id: "getting-started",
    label: "Getting Started",
    icon: <Zap className="h-4 w-4" />,
    children: [
      { id: "installation", label: "Installation" },
      { id: "basic-usage", label: "Basic Usage" },
      { id: "pro-usage", label: "Pro Usage" },
    ],
  },
  {
    id: "core-concepts",
    label: "Core Concepts",
    icon: <Book className="h-4 w-4" />,
    children: [
      { id: "events", label: "Events" },
      { id: "calendars", label: "Calendars" },
      { id: "event-handlers", label: "Event Handlers" },
    ],
  },
  {
    id: "basic-scheduler",
    label: "BasicScheduler",
    icon: <Calendar className="h-4 w-4" />,
    children: [
      { id: "basic-props", label: "Props Reference" },
      { id: "basic-views", label: "Views" },
    ],
  },
  {
    id: "pro-scheduler",
    label: "ProScheduler",
    icon: <Calendar className="h-4 w-4" />,
    children: [
      { id: "pro-props", label: "Props Reference" },
      { id: "pro-views", label: "Views" },
    ],
  },
  {
    id: "features",
    label: "Features",
    icon: <Settings className="h-4 w-4" />,
    children: [
      { id: "theming", label: "Theming" },
      { id: "i18n", label: "Internationalization" },
      { id: "timezone", label: "Timezone Support" },
      { id: "resources", label: "Resource View" },
      { id: "recurring", label: "Recurring Events" },
      { id: "event-resizing", label: "Event Resizing" },
      { id: "notifications", label: "Notifications" },
      { id: "ics-import-export", label: "ICS Import/Export" },
      { id: "context-menus", label: "Context Menus" },
      { id: "mobile-gestures", label: "Mobile Gestures" },
      { id: "loading-states", label: "Loading States" },
    ],
  },
  {
    id: "customization",
    label: "Customization",
    icon: <Code className="h-4 w-4" />,
    children: [{ id: "custom-event-form", label: "Custom Event Form" }],
  },
];

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    // Extract text from HTML
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = code;
    const text = tempDiv.textContent || "";
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={copy}
      className="absolute top-3 right-3 p-2 rounded-md bg-white/10 hover:bg-white/20 transition-colors text-white/70 hover:text-white z-10"
    >
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
    </button>
  );
}

function CodeBlock({
  code,
  title,
}: {
  code: string;
  title?: string;
}) {
  return (
    <div className="relative rounded-lg overflow-hidden border border-border my-4">
      {title && (
        <div className="px-4 py-2 bg-muted/50 border-b border-border text-sm font-medium">
          {title}
        </div>
      )}
      <CopyButton code={code} />
      <div
        className="bg-[#0d1117] font-mono text-sm [&>pre]:!bg-transparent [&>pre]:p-4 [&_code]:break-all overflow-auto max-h-[500px]"
        dangerouslySetInnerHTML={{ __html: code }}
      />
    </div>
  );
}

function ProBadge() {
  return (
    <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded-full">
      Pro
    </span>
  );
}

export function DocsContent({ highlightedCode }: DocsContentProps) {
  const [activeSection, setActiveSection] = useState("installation");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Auto-update active section based on scroll position
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the section that's most visible
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-100px 0px -60% 0px", // Trigger when section is near top
        threshold: 0,
      }
    );

    // Get all section elements
    const sections = navigation
      .flatMap((section) => section.children || [])
      .map((child) => document.getElementById(child.id))
      .filter((el): el is HTMLElement => el !== null);

    // Observe all sections
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm">Back</span>
            </Link>
            <div className="h-4 w-px bg-border" />
            <h1 className="text-lg font-semibold">Documentation</h1>
          </div>
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </header>

      <div className="container flex">
        {/* Sidebar */}
        <aside
          className={cn(
            "fixed md:sticky top-14 left-0 z-40 h-[calc(100vh-3.5rem)] w-64 border-r bg-background overflow-y-auto transition-transform md:translate-x-0",
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <nav className="p-4 space-y-1">
            {navigation.map((section) => (
              <div key={section.id} className="mb-4">
                <div className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-foreground">
                  {section.icon}
                  {section.label}
                </div>
                {section.children && (
                  <div className="ml-4 space-y-1">
                    {section.children.map((child) => (
                      <button
                        key={child.id}
                        onClick={() => scrollToSection(child.id)}
                        className={cn(
                          "w-full flex items-center gap-2 px-3 py-1.5 text-sm rounded-md transition-colors text-left",
                          activeSection === child.id
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        )}
                      >
                        <ChevronRight className="h-3 w-3" />
                        {child.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </aside>

        {/* Mobile overlay */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/50 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 min-w-0 px-4 md:px-8 py-8 md:ml-0">
          <div className="max-w-3xl mx-auto">
            {/* Getting Started */}
            <section id="installation" className="mb-16 scroll-mt-20">
              <h2 className="text-3xl font-bold mb-4">Installation</h2>
              <p className="text-muted-foreground mb-6">
                CalendarKit offers two versions: Basic (free, open source) and Pro (premium features).
              </p>

              <div className="mb-6 p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                <h4 className="font-semibold mb-3 text-green-600 dark:text-green-400">Basic (Free - Open Source)</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Install directly from npm - no purchase needed! Includes month, week, and day views with event management.
                </p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>✓ Month, Week, Day views</li>
                  <li>✓ Event creation & editing</li>
                  <li>✓ Calendar filtering</li>
                  <li>✓ Full TypeScript support</li>
                  <li>✓ MIT License</li>
                </ul>
              </div>

              <div className="mb-6 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <h4 className="font-semibold mb-3 text-blue-600 dark:text-blue-400">Pro (Premium)</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  After purchase, you&apos;ll receive access to a private GitHub repository with full source code.
                </p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>✓ Everything in Basic</li>
                  <li>✓ Drag & drop events</li>
                  <li>✓ Event resizing with 15-min snapping</li>
                  <li>✓ Agenda & Resource views</li>
                  <li>✓ Dark mode & i18n</li>
                  <li>✓ Timezone support</li>
                  <li>✓ Recurring events (RRULE)</li>
                  <li>✓ Event reminders & notifications</li>
                  <li>✓ ICS import/export</li>
                  <li>✓ Context menus (right-click)</li>
                  <li>✓ Mobile swipe gestures</li>
                  <li>✓ Skeleton loading & empty states</li>
                  <li>✓ Event attachments & guests</li>
                  <li>✓ Lifetime updates</li>
                </ul>
              </div>

              <CodeBlock code={highlightedCode.installation} />
            </section>

            <section id="basic-usage" className="mb-16 scroll-mt-20">
              <h2 className="text-3xl font-bold mb-4">Basic Usage</h2>
              <p className="text-muted-foreground mb-6">
                The <code className="px-1.5 py-0.5 bg-muted rounded text-sm">BasicScheduler</code> component provides essential calendar functionality with month, week, and day views.
              </p>
              <CodeBlock
                code={highlightedCode.basicImport}
                title="BasicScheduler Example"
              />
            </section>

            <section id="pro-usage" className="mb-16 scroll-mt-20">
              <h2 className="text-3xl font-bold mb-4">
                Pro Usage
                <ProBadge />
              </h2>
              <p className="text-muted-foreground mb-6">
                The <code className="px-1.5 py-0.5 bg-muted rounded text-sm">ProScheduler</code> includes all Basic features plus drag & drop, agenda view, resource view, timezone support, dark mode, i18n, and recurring events.
              </p>
              <CodeBlock
                code={highlightedCode.proImport}
                title="ProScheduler Example"
              />
            </section>

            {/* Core Concepts */}
            <section id="events" className="mb-16 scroll-mt-20">
              <h2 className="text-3xl font-bold mb-4">Events</h2>
              <p className="text-muted-foreground mb-6">
                Events are the core data structure in CalendarKit. Each event must have a unique ID, title, start, and end date.
              </p>
              <CodeBlock
                code={highlightedCode.eventStructure}
                title="CalendarEvent Interface"
              />
              <div className="mt-6 p-4 bg-muted/50 rounded-lg border">
                <h4 className="font-semibold mb-2">Required Fields</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>
                    <code>id</code> - Unique identifier for the event
                  </li>
                  <li>
                    <code>title</code> - Display name of the event
                  </li>
                  <li>
                    <code>start</code> - JavaScript Date object for start time
                  </li>
                  <li>
                    <code>end</code> - JavaScript Date object for end time
                  </li>
                </ul>
              </div>
            </section>

            <section id="calendars" className="mb-16 scroll-mt-20">
              <h2 className="text-3xl font-bold mb-4">Calendars</h2>
              <p className="text-muted-foreground mb-6">
                Calendars allow users to organize and filter events by category. Each calendar has a color and can be toggled on/off.
              </p>
              <CodeBlock
                code={highlightedCode.calendars}
                title="Calendar Filtering"
              />
            </section>

            <section id="event-handlers" className="mb-16 scroll-mt-20">
              <h2 className="text-3xl font-bold mb-4">Event Handlers</h2>
              <p className="text-muted-foreground mb-6">
                CalendarKit provides callback functions for all user interactions. Use these to sync with your backend or state management.
              </p>
              <CodeBlock
                code={highlightedCode.eventHandlers}
                title="Event Handlers"
              />
            </section>

            {/* BasicScheduler */}
            <section id="basic-props" className="mb-16 scroll-mt-20">
              <h2 className="text-3xl font-bold mb-4">BasicScheduler Props</h2>
              <p className="text-muted-foreground mb-6">
                Complete reference of all props available in BasicScheduler.
              </p>
              <CodeBlock
                code={highlightedCode.basicPropsTable}
                title="BasicScheduler Props Interface"
              />
              <div className="mt-6 overflow-x-auto">
                <table className="w-full text-sm border rounded-lg overflow-hidden">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold">Prop</th>
                      <th className="px-4 py-3 text-left font-semibold">Type</th>
                      <th className="px-4 py-3 text-left font-semibold">Default</th>
                      <th className="px-4 py-3 text-left font-semibold">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="px-4 py-3 font-mono text-xs">events</td>
                      <td className="px-4 py-3 font-mono text-xs">CalendarEvent[]</td>
                      <td className="px-4 py-3 text-muted-foreground">[]</td>
                      <td className="px-4 py-3">Array of events to display</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-mono text-xs">view</td>
                      <td className="px-4 py-3 font-mono text-xs">&apos;month&apos; | &apos;week&apos; | &apos;day&apos;</td>
                      <td className="px-4 py-3 text-muted-foreground">&apos;week&apos;</td>
                      <td className="px-4 py-3">Current calendar view</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-mono text-xs">date</td>
                      <td className="px-4 py-3 font-mono text-xs">Date</td>
                      <td className="px-4 py-3 text-muted-foreground">new Date()</td>
                      <td className="px-4 py-3">Currently focused date</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-mono text-xs">calendars</td>
                      <td className="px-4 py-3 font-mono text-xs">Calendar[]</td>
                      <td className="px-4 py-3 text-muted-foreground">undefined</td>
                      <td className="px-4 py-3">Calendar categories for filtering</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-mono text-xs">locale</td>
                      <td className="px-4 py-3 font-mono text-xs">Locale</td>
                      <td className="px-4 py-3 text-muted-foreground">undefined</td>
                      <td className="px-4 py-3">date-fns locale for date formatting</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-mono text-xs">readOnly</td>
                      <td className="px-4 py-3 font-mono text-xs">boolean</td>
                      <td className="px-4 py-3 text-muted-foreground">false</td>
                      <td className="px-4 py-3">Disable event creation/editing</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-mono text-xs">isLoading</td>
                      <td className="px-4 py-3 font-mono text-xs">boolean</td>
                      <td className="px-4 py-3 text-muted-foreground">false</td>
                      <td className="px-4 py-3">Show loading state</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section id="basic-views" className="mb-16 scroll-mt-20">
              <h2 className="text-3xl font-bold mb-4">BasicScheduler Views</h2>
              <div className="grid gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Month View</h4>
                  <p className="text-sm text-muted-foreground">
                    Traditional calendar grid showing all days in the current month. Events are displayed as colored bars.
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Week View</h4>
                  <p className="text-sm text-muted-foreground">
                    7-day view with hourly grid. Shows event duration visually. Virtualized for performance.
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Day View</h4>
                  <p className="text-sm text-muted-foreground">
                    Single day view with detailed hourly breakdown. 15-minute time slots for precise scheduling.
                  </p>
                </div>
              </div>
            </section>

            {/* ProScheduler */}
            <section id="pro-props" className="mb-16 scroll-mt-20">
              <h2 className="text-3xl font-bold mb-4">
                ProScheduler Props
                <ProBadge />
              </h2>
              <p className="text-muted-foreground mb-6">
                ProScheduler extends BasicScheduler with additional features. All Basic props are available plus:
              </p>
              <CodeBlock
                code={highlightedCode.proPropsTable}
                title="ProScheduler Props Interface"
              />
              <div className="mt-6 overflow-x-auto">
                <table className="w-full text-sm border rounded-lg overflow-hidden">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold">Prop</th>
                      <th className="px-4 py-3 text-left font-semibold">Type</th>
                      <th className="px-4 py-3 text-left font-semibold">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="px-4 py-3 font-mono text-xs">timezone</td>
                      <td className="px-4 py-3 font-mono text-xs">string</td>
                      <td className="px-4 py-3">IANA timezone (e.g., &apos;America/New_York&apos;)</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-mono text-xs">isDarkMode</td>
                      <td className="px-4 py-3 font-mono text-xs">boolean</td>
                      <td className="px-4 py-3">Enable dark theme</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-mono text-xs">language</td>
                      <td className="px-4 py-3 font-mono text-xs">&apos;en&apos; | &apos;fr&apos;</td>
                      <td className="px-4 py-3">UI language for built-in translations</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-mono text-xs">translations</td>
                      <td className="px-4 py-3 font-mono text-xs">CalendarTranslations</td>
                      <td className="px-4 py-3">Custom translation overrides</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-mono text-xs">resources</td>
                      <td className="px-4 py-3 font-mono text-xs">Resource[]</td>
                      <td className="px-4 py-3">Resources for resource view</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-mono text-xs">onEventDrop</td>
                      <td className="px-4 py-3 font-mono text-xs">function</td>
                      <td className="px-4 py-3">Callback when event is dragged</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-mono text-xs">onEventResize</td>
                      <td className="px-4 py-3 font-mono text-xs">function</td>
                      <td className="px-4 py-3">Callback when event is resized</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-mono text-xs">hideViewSwitcher</td>
                      <td className="px-4 py-3 font-mono text-xs">boolean</td>
                      <td className="px-4 py-3">Hide the view toggle buttons</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section id="pro-views" className="mb-16 scroll-mt-20">
              <h2 className="text-3xl font-bold mb-4">
                ProScheduler Views
                <ProBadge />
              </h2>
              <div className="grid gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">All Basic Views</h4>
                  <p className="text-sm text-muted-foreground">
                    Month, Week, and Day views with drag & drop support.
                  </p>
                </div>
                <div className="p-4 border rounded-lg border-primary/50 bg-primary/5">
                  <h4 className="font-semibold mb-2">Agenda View <ProBadge /></h4>
                  <p className="text-sm text-muted-foreground">
                    List view showing upcoming events in chronological order. Perfect for quick overview.
                  </p>
                </div>
                <div className="p-4 border rounded-lg border-primary/50 bg-primary/5">
                  <h4 className="font-semibold mb-2">Resource View <ProBadge /></h4>
                  <p className="text-sm text-muted-foreground">
                    Display events by resource (rooms, people, equipment). Ideal for booking systems.
                  </p>
                </div>
              </div>
            </section>

            {/* Features */}
            <section id="theming" className="mb-16 scroll-mt-20">
              <h2 className="text-3xl font-bold mb-4">
                Theming
                <ProBadge />
              </h2>
              <p className="text-muted-foreground mb-6">
                Customize colors, fonts, and border radius. Includes built-in dark mode support.
              </p>
              <CodeBlock
                code={highlightedCode.theming}
                title="Custom Theme Configuration"
              />
            </section>

            <section id="i18n" className="mb-16 scroll-mt-20">
              <h2 className="text-3xl font-bold mb-4">
                Internationalization
                <ProBadge />
              </h2>
              <p className="text-muted-foreground mb-6">
                Built-in support for English and French. Add custom translations for any language.
              </p>
              <CodeBlock
                code={highlightedCode.i18n}
                title="i18n Configuration"
              />
            </section>

            <section id="timezone" className="mb-16 scroll-mt-20">
              <h2 className="text-3xl font-bold mb-4">
                Timezone Support
                <ProBadge />
              </h2>
              <p className="text-muted-foreground mb-6">
                Display events in any timezone. Users can switch timezones on the fly.
              </p>
              <CodeBlock
                code={highlightedCode.timezone}
                title="Timezone Configuration"
              />
            </section>

            <section id="resources" className="mb-16 scroll-mt-20">
              <h2 className="text-3xl font-bold mb-4">
                Resource View
                <ProBadge />
              </h2>
              <p className="text-muted-foreground mb-6">
                Display events by resource - perfect for room booking, team scheduling, or equipment allocation.
              </p>
              <CodeBlock
                code={highlightedCode.resources}
                title="Resource View Setup"
              />
            </section>

            <section id="recurring" className="mb-16 scroll-mt-20">
              <h2 className="text-3xl font-bold mb-4">
                Recurring Events
                <ProBadge />
              </h2>
              <p className="text-muted-foreground mb-6">
                Create events that repeat daily, weekly, monthly, or yearly. Supports count-based and date-based end rules.
              </p>
              <CodeBlock
                code={highlightedCode.recurring}
                title="Recurring Event Examples"
              />
              <div className="mt-6 p-4 bg-muted/50 rounded-lg border">
                <h4 className="font-semibold mb-2">Recurrence Options</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <code className="bg-muted px-1.5 py-0.5 rounded">freq</code> - Frequency: DAILY, WEEKLY, MONTHLY, YEARLY
                  </li>
                  <li>
                    <code className="bg-muted px-1.5 py-0.5 rounded">interval</code> - Repeat every N periods (default: 1)
                  </li>
                  <li>
                    <code className="bg-muted px-1.5 py-0.5 rounded">count</code> - Total number of occurrences
                  </li>
                  <li>
                    <code className="bg-muted px-1.5 py-0.5 rounded">until</code> - End date for recurrence
                  </li>
                </ul>
              </div>
            </section>

            {/* New Pro Features */}
            <section id="event-resizing" className="mb-16 scroll-mt-20">
              <h2 className="text-3xl font-bold mb-4">
                Event Resizing
                <ProBadge />
              </h2>
              <p className="text-muted-foreground mb-6">
                Drag the bottom edge of events to resize them directly in the week and day views. Events snap to 15-minute intervals with visual feedback during resize.
              </p>
              <CodeBlock
                code={highlightedCode.eventResizing}
                title="Event Resizing"
              />
              <div className="mt-6 p-4 bg-muted/50 rounded-lg border">
                <h4 className="font-semibold mb-2">Features</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>✓ Drag bottom edge to resize events</li>
                  <li>✓ 15-minute snap intervals</li>
                  <li>✓ Visual feedback during resize</li>
                  <li>✓ Works in Week and Day views</li>
                </ul>
              </div>
            </section>

            <section id="notifications" className="mb-16 scroll-mt-20">
              <h2 className="text-3xl font-bold mb-4">
                Notification Reminders
                <ProBadge />
              </h2>
              <p className="text-muted-foreground mb-6">
                Add reminder notifications to events with predefined intervals. Users can set multiple reminders per event.
              </p>
              <CodeBlock
                code={highlightedCode.notifications}
                title="Event Reminders"
              />
              <div className="mt-6 p-4 bg-muted/50 rounded-lg border">
                <h4 className="font-semibold mb-2">Reminder Options</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>✓ 5, 10, 15, 30 minutes before</li>
                  <li>✓ 1 hour before</li>
                  <li>✓ 1 day before</li>
                  <li>✓ Multiple reminders per event</li>
                </ul>
              </div>
            </section>

            <section id="ics-import-export" className="mb-16 scroll-mt-20">
              <h2 className="text-3xl font-bold mb-4">
                ICS Import/Export
                <ProBadge />
              </h2>
              <p className="text-muted-foreground mb-6">
                Import and export calendar events in the standard ICS format. Compatible with Google Calendar, Apple Calendar, Outlook, and more.
              </p>
              <CodeBlock
                code={highlightedCode.icsImportExport}
                title="ICS Import/Export"
              />
              <div className="mt-6 p-4 bg-muted/50 rounded-lg border">
                <h4 className="font-semibold mb-2">Supported Features</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>✓ Full ICS generation and parsing</li>
                  <li>✓ Recurring events support</li>
                  <li>✓ All-day events</li>
                  <li>✓ Attachments support</li>
                  <li>✓ Import/Export buttons in Sidebar</li>
                </ul>
              </div>
            </section>

            <section id="context-menus" className="mb-16 scroll-mt-20">
              <h2 className="text-3xl font-bold mb-4">
                Context Menus
                <ProBadge />
              </h2>
              <p className="text-muted-foreground mb-6">
                Right-click on events to access quick actions like edit, delete, and duplicate.
              </p>
              <CodeBlock
                code={highlightedCode.contextMenus}
                title="Context Menu Usage"
              />
              <div className="mt-6 p-4 bg-muted/50 rounded-lg border">
                <h4 className="font-semibold mb-2">Available Actions</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>✓ Edit event</li>
                  <li>✓ Delete event</li>
                  <li>✓ Duplicate event</li>
                  <li>✓ Customizable via useEventContextMenu hook</li>
                </ul>
              </div>
            </section>

            <section id="mobile-gestures" className="mb-16 scroll-mt-20">
              <h2 className="text-3xl font-bold mb-4">
                Mobile Swipe Gestures
                <ProBadge />
              </h2>
              <p className="text-muted-foreground mb-6">
                Navigate between dates with intuitive swipe gestures on mobile devices.
              </p>
              <CodeBlock
                code={highlightedCode.mobileGestures}
                title="Swipe Gesture Configuration"
              />
              <div className="mt-6 p-4 bg-muted/50 rounded-lg border">
                <h4 className="font-semibold mb-2">Features</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>✓ Swipe left/right to navigate dates</li>
                  <li>✓ Configurable swipe threshold (default: 50px)</li>
                  <li>✓ Works across all views</li>
                  <li>✓ useSwipeGesture hook for custom implementations</li>
                </ul>
              </div>
            </section>

            <section id="loading-states" className="mb-16 scroll-mt-20">
              <h2 className="text-3xl font-bold mb-4">
                Loading States &amp; Empty States
                <ProBadge />
              </h2>
              <p className="text-muted-foreground mb-6">
                Beautiful skeleton loading animations and empty state displays for a polished user experience.
              </p>
              <CodeBlock
                code={highlightedCode.loadingStates}
                title="Loading & Empty States"
              />
              <div className="grid gap-4 mt-6">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Skeleton Loading</h4>
                  <p className="text-sm text-muted-foreground">
                    Per-view skeleton loaders (Month, Week, Day, Agenda) that automatically display when isLoading is true.
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Empty States</h4>
                  <p className="text-sm text-muted-foreground">
                    View-specific illustrations and messages with CTA button to create events.
                  </p>
                </div>
              </div>
            </section>

            {/* Customization */}
            <section id="custom-event-form" className="mb-16 scroll-mt-20">
              <h2 className="text-3xl font-bold mb-4">Custom Event Form</h2>
              <p className="text-muted-foreground mb-6">
                Replace the built-in event form with your own custom component.
              </p>
              <CodeBlock
                code={highlightedCode.customEventForm}
                title="Custom Event Form"
              />
            </section>

            {/* Footer */}
            <div className="border-t pt-8 mt-16">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Need help?{" "}
                  <a
                    href="mailto:support@calendarkit.io"
                    className="text-primary hover:underline"
                  >
                    Contact support
                  </a>
                </p>
                <Link
                  href="/"
                  className="text-sm text-primary hover:underline flex items-center gap-1"
                >
                  Back to home
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
