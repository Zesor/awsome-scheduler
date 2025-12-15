import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Sparkles, Bug, Wrench, Package } from "lucide-react";

export const metadata: Metadata = {
  title: "Changelog | CalendarKit",
  description:
    "View the latest updates, features, and bug fixes for CalendarKit Basic and Pro Scheduler.",
};

// Changelog data - Add new versions at the top
interface ChangelogEntry {
  version: string;
  date: string;
  features?: string[];
  fixes?: string[];
  improvements?: string[];
  breaking?: string[];
}

interface ProductChangelog {
  basic: ChangelogEntry[];
  pro: ChangelogEntry[];
}

const changelog: ProductChangelog = {
  basic: [
    {
      version: "1.0.0",
      date: "December 10, 2025",
      features: [
        "Initial release on npm",
        "Month, Week, and Day views",
        "Event creation and editing",
        "Calendar filtering",
        "Full TypeScript support",
        "React 18+ compatibility",
        "MIT License - free and open source",
      ],
    },
  ],
  pro: [
    {
      version: "1.1.0",
      date: "December 15, 2025",
      features: [
        "Event Resizing - Drag the bottom edge of events to resize with 15-minute snap intervals",
        "Notification Reminders - Add multiple reminders per event (5/10/15/30 min, 1h, 1d before)",
        "ICS Import/Export - Full ICS file support including recurring events, all-day events, and attachments",
        "Mobile Swipe Gestures - Swipe left/right to navigate dates on touch devices",
        "Skeleton Loading States - Beautiful per-view skeleton loaders for loading states",
        "Empty States - View-specific illustrations with CTA to create events",
        "Context Menus - Right-click events for quick Edit, Delete, Duplicate actions",
        "Enhanced Drag Preview - Improved styling with event color, shadow, and rotation effects",
        "Enhanced Agenda View - Modern card design with date boxes, Today/Tomorrow labels, duration badges",
        "Page Transitions - Smooth Framer Motion animations on view switches",
      ],
      improvements: [
        "Dark mode polish - Better contrast, custom scrollbars, glass effects",
        "Smooth transitions throughout the UI",
        "Better shadows and focus states",
        "Animated sidebar toggle",
      ],
      fixes: [
        "Timezone dropdown transparency issue (bg-background instead of bg-popover)",
        "Day view overlapping events (ported WeekView positioning logic)",
        "ringColor TypeScript error (changed to boxShadow)",
        "Timezone drag/drop bug - Events now correctly convert between display timezone and storage time",
      ],
    },
    {
      version: "1.0.0",
      date: "December 13, 2025",
      features: [
        "Initial Pro release",
        "Month, Week, Day, Agenda, and Resource views",
        "Drag & drop event scheduling",
        "Dark mode support",
        "Internationalization (i18n) with English and French",
        "Timezone support with IANA timezones",
        "Recurring events with RRULE support",
        "Event attachments and guests",
        "Calendar filtering",
        "Custom event forms",
      ],
    },
  ],
};

function Badge({
  type,
}: {
  type: "feature" | "fix" | "improvement" | "breaking";
}) {
  const styles = {
    feature: "bg-green-500/10 text-green-600 dark:text-green-400",
    fix: "bg-red-500/10 text-red-600 dark:text-red-400",
    improvement: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    breaking: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
  };

  const icons = {
    feature: <Sparkles className="h-3 w-3" />,
    fix: <Bug className="h-3 w-3" />,
    improvement: <Wrench className="h-3 w-3" />,
    breaking: <Package className="h-3 w-3" />,
  };

  const labels = {
    feature: "New",
    fix: "Fix",
    improvement: "Improved",
    breaking: "Breaking",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full ${styles[type]}`}
    >
      {icons[type]}
      {labels[type]}
    </span>
  );
}

function ChangelogSection({
  entries,
  showLatestBadge = false,
}: {
  entries: ChangelogEntry[];
  showLatestBadge?: boolean;
}) {
  return (
    <div className="space-y-12">
      {entries.map((entry, index) => (
        <article
          key={entry.version}
          className="relative pl-8 border-l-2 border-border"
        >
          {/* Version marker */}
          <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-background" />
          </div>

          {/* Version header */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-1">
              <h3 className="text-2xl font-bold">v{entry.version}</h3>
              {showLatestBadge && index === 0 && (
                <span className="px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded-full">
                  Latest
                </span>
              )}
            </div>
            <time className="text-sm text-muted-foreground">{entry.date}</time>
          </div>

          {/* Features */}
          {entry.features && entry.features.length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">
                New Features
              </h4>
              <ul className="space-y-2">
                {entry.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Badge type="feature" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Improvements */}
          {entry.improvements && entry.improvements.length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">
                Improvements
              </h4>
              <ul className="space-y-2">
                {entry.improvements.map((improvement, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Badge type="improvement" />
                    <span className="text-sm">{improvement}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Fixes */}
          {entry.fixes && entry.fixes.length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">
                Bug Fixes
              </h4>
              <ul className="space-y-2">
                {entry.fixes.map((fix, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Badge type="fix" />
                    <span className="text-sm">{fix}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Breaking Changes */}
          {entry.breaking && entry.breaking.length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">
                Breaking Changes
              </h4>
              <ul className="space-y-2">
                {entry.breaking.map((change, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Badge type="breaking" />
                    <span className="text-sm">{change}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </article>
      ))}
    </div>
  );
}

export default function ChangelogPage() {
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
            <h1 className="text-lg font-semibold">Changelog</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container px-4 md:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-4">Changelog</h1>
            <p className="text-lg text-muted-foreground">
              Track all updates, new features, and bug fixes for CalendarKit.
            </p>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Pro Section */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <h2 className="text-2xl font-bold">Pro</h2>
                <span className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                  Premium
                </span>
              </div>
              <ChangelogSection entries={changelog.pro} showLatestBadge />
            </div>

            {/* Basic Section */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <h2 className="text-2xl font-bold">Basic</h2>
                <span className="px-3 py-1 text-xs font-medium bg-green-500/10 text-green-600 dark:text-green-400 rounded-full">
                  Open Source
                </span>
              </div>
              <ChangelogSection entries={changelog.basic} showLatestBadge />
            </div>
          </div>

          {/* Footer */}
          <div className="border-t pt-8 mt-16">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Have feedback?{" "}
                <a
                  href="mailto:support@calendarkit.io"
                  className="text-primary hover:underline"
                >
                  Contact us
                </a>
              </p>
              <Link
                href="/docs"
                className="text-sm text-primary hover:underline"
              >
                View Documentation
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
