"use client";

import { Section } from "@/components/section";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Clock, Code, Sparkles, Zap, TrendingDown, Calendar } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

interface TimeComparisonProps {
  title: string;
  subtitle: string;
  time: string;
  timeUnit: string;
  description: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  highlighted?: boolean;
  details: string[];
}

const timeComparisons: TimeComparisonProps[] = [
  {
    title: "Build from Scratch",
    subtitle: "Solo Developer",
    time: "4-6",
    timeUnit: "weeks",
    description: "Building a production-ready calendar scheduler from scratch requires significant time investment.",
    icon: <Code className="h-6 w-6" />,
    iconBg: "bg-red-500/10",
    iconColor: "text-red-600 dark:text-red-400",
    details: [
      "Design & architecture planning",
      "Core calendar logic & date handling",
      "UI components & styling",
      "Event CRUD operations",
      "Drag & drop functionality",
      "Timezone & i18n support",
      "Testing & bug fixes",
      "Documentation",
    ],
  },
  {
    title: "Build with AI",
    subtitle: "Developer + AI Tools",
    time: "2-3",
    timeUnit: "weeks",
    description: "AI can accelerate development, but you still need to integrate, test, and refine everything.",
    icon: <Sparkles className="h-6 w-6" />,
    iconBg: "bg-orange-500/10",
    iconColor: "text-orange-600 dark:text-orange-400",
    details: [
      "AI-assisted code generation",
      "Manual integration work",
      "Debugging AI-generated code",
      "Component customization",
      "Performance optimization",
      "Cross-browser testing",
      "Edge case handling",
      "Production refinement",
    ],
  },
  {
    title: "Use CalendarKit",
    subtitle: "Production-Ready Solution",
    time: "5-30",
    timeUnit: "minutes",
    description: "Install, configure, and you're ready to ship. Focus on your business logic, not reinventing calendars.",
    icon: <Zap className="h-6 w-6" />,
    iconBg: "bg-green-500/10",
    iconColor: "text-green-600 dark:text-green-400",
    highlighted: true,
    details: [
      "npm install in seconds",
      "Drop-in React component",
      "Full TypeScript support",
      "All features included",
      "Production-tested",
      "Regular updates",
      "Email support",
      "Start building features immediately",
    ],
  },
];

function TimeComparisonCard({ comparison }: { comparison: TimeComparisonProps }) {
  return (
    <motion.div
      variants={cardVariants}
      className={cn(
        "relative flex flex-col border rounded-xl p-6 transition-all duration-300 hover:shadow-lg",
        comparison.highlighted
          ? "border-green-500/50 bg-green-500/5 hover:border-green-500 ring-2 ring-green-500/20"
          : "hover:border-primary/50"
      )}
    >
      {comparison.highlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full whitespace-nowrap">
          Fastest Time to Market
        </div>
      )}

      {/* Icon & Title */}
      <div className="flex items-start gap-4 mb-4">
        <div className={cn("p-3 rounded-xl shrink-0", comparison.iconBg)}>
          <div className={comparison.iconColor}>{comparison.icon}</div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-foreground mb-1">
            {comparison.title}
          </h3>
          <p className="text-sm text-muted-foreground">{comparison.subtitle}</p>
        </div>
      </div>

      {/* Time Display */}
      <div className="flex items-baseline gap-2 mb-4">
        <span className={cn(
          "text-5xl font-bold tracking-tight",
          comparison.highlighted ? "text-green-600 dark:text-green-400" : "text-foreground"
        )}>
          {comparison.time}
        </span>
        <span className="text-xl text-muted-foreground font-medium">
          {comparison.timeUnit}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
        {comparison.description}
      </p>

      {/* Details List */}
      <div className="space-y-2 flex-1">
        {comparison.details.map((detail, index) => (
          <div key={index} className="flex items-start gap-2 text-sm">
            <div className={cn(
              "mt-1 h-1.5 w-1.5 rounded-full shrink-0",
              comparison.highlighted ? "bg-green-500" : "bg-muted-foreground/50"
            )} />
            <span className="text-muted-foreground leading-relaxed">{detail}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export function TimeSavings() {
  return (
    <Section id="time-savings" title="Time Savings">
      <div className="border border-b-0">
        {/* Header */}
        <div className="p-6 md:p-10 text-center border-b">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <TrendingDown className="h-4 w-4" />
            Save Weeks of Development Time
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-balance">
            Stop Building Calendars.
            <br />
            Start Shipping Features.
          </h2>
          <p className="mt-4 text-muted-foreground text-balance max-w-2xl mx-auto leading-relaxed">
            Building a production-ready calendar scheduler is complex and time-consuming.
            See how CalendarKit gets you to market faster than building from scratch or using AI.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="p-6 md:p-10">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {timeComparisons.map((comparison) => (
              <TimeComparisonCard key={comparison.title} comparison={comparison} />
            ))}
          </motion.div>
        </div>

        {/* ROI Bottom Section */}
        <div className="border-t bg-muted/30 p-6 md:p-10">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 text-primary">
              <Calendar className="h-5 w-5" />
              <span className="text-lg font-semibold">Quick ROI Calculation</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              A senior developer costs <span className="font-semibold text-foreground">$75-150/hour</span>.
              Building from scratch = <span className="font-semibold text-foreground">160-240 hours × $75-150</span> =
              <span className="font-bold text-foreground text-lg"> $12,000-36,000</span> in development costs alone.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              CalendarKit Pro = <span className="font-bold text-green-600 dark:text-green-400 text-xl">$149</span> one-time.
              <span className="font-semibold text-foreground"> That's a 99.6% cost reduction</span> and you ship
              <span className="font-semibold text-foreground"> 4-6 weeks faster</span>.
            </p>
            <div className="pt-4">
              <p className="text-sm text-muted-foreground italic">
                Plus ongoing maintenance, bug fixes, and feature updates—all included.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
