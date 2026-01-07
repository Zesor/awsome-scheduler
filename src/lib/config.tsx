import { Icons } from "@/components/icons";
import {
  CalendarCheck,
  Zap,
  Palette,
  Code,
  Moon,
  Move,
  Globe,
  Kanban,
  Users,
  PartyPopper,
  Briefcase,
  GraduationCap,
} from "lucide-react";

export const BLUR_FADE_DELAY = 0.15;

export const siteConfig = {
  name: "CalendarKit",
  description: "Free React Calendar & Scheduler Component",
  tagline: "Build scheduling features in minutes",
  cta: "Get Started",
  url: process.env.NEXT_PUBLIC_APP_URL || "https://calendarkit.io",
  seo: {
    title: "CalendarKit - Free React Calendar & Scheduler Component",
    description: "Build scheduling features in minutes. Free, open-source React calendar with drag & drop, dark mode, TypeScript support. Perfect for booking systems & appointment schedulers.",
  },
  keywords: [
    "React Calendar",
    "React Calendar Component",
    "React Scheduler",
    "React Scheduler Component",
    "Scheduler React Component",
    "Calendar Scheduler React",
    "React Calendar Provider",
    "React Scheduler Provider",
    "Calendar Component Provider",
    "Scheduler Component Provider",
    "Calendar UI",
    "Calendar for React",
    "Next.js Calendar",
    "Next.js Scheduler",
    "TypeScript Calendar",
    "TypeScript Scheduler",
    "Drag and Drop Calendar",
    "Drag and Drop Scheduler",
    "React Planner",
    "Calendar Component Library",
    "Scheduler Component Library",
    "Modern Calendar React",
    "Modern Scheduler React",
    "Best React Calendar",
    "Best React Scheduler",
    "Calendar UI Component",
    "Scheduler UI Component",
    "Event Calendar React",
    "Event Scheduler React",
    "Booking Calendar React",
    "Booking Scheduler React",
    "Week View Calendar",
    "Week View Scheduler",
    "Month View Calendar",
    "Month View Scheduler",
    "Day View Calendar",
    "Day View Scheduler",
    "Agenda View Scheduler",
    "Resource Scheduler React",
    "Tailwind Calendar",
    "Tailwind Scheduler",
    "React Date Picker",
    "React Appointment Scheduler",
    "React Event Scheduler",
    "React Meeting Scheduler",
    "Calendar Scheduler Provider",
  ],
  links: {
    email: "support@calendarkit.io",
  },
  hero: {
    title: "CalendarKit",
    description:
      "Build scheduling features in minutes, not months. A beautifully crafted React calendar component with drag & drop, dark mode, and full TypeScript support.",
    cta: "Get Started",
  },
  features: [
    {
      name: "Easy Setup",
      description:
        "npm install & import. Get your first calendar running in under 5 minutes with minimal configuration.",
      icon: <Zap className="h-6 w-6" />,
    },
    {
      name: "Drag & Resize",
      description:
        "Smooth event dragging with snap-to-grid. Resize events by dragging edges with 15-min snap intervals.",
      icon: <Move className="h-6 w-6" />,
    },
    {
      name: "ICS Import/Export",
      description:
        "Full ICS file support for Google Calendar, Outlook, and Apple Calendar. Import and export with one click.",
      icon: <CalendarCheck className="h-6 w-6" />,
    },
    {
      name: "Dark Mode",
      description:
        "Polished light & dark themes with glass effects, custom scrollbars, and smooth transitions.",
      icon: <Moon className="h-6 w-6" />,
    },
    {
      name: "Mobile Ready",
      description:
        "Swipe gestures for navigation, skeleton loading states, and responsive design for all devices.",
      icon: <Palette className="h-6 w-6" />,
    },
    {
      name: "Context Menus",
      description:
        "Right-click events for quick actions: Edit, Delete, Duplicate. Plus notification reminders.",
      icon: <Globe className="h-6 w-6" />,
    },
  ],
  useCases: [
    {
      name: "Project Management",
      description: "Sprint planning, task scheduling, and deadline tracking for agile teams.",
      icon: <Kanban className="h-6 w-6" />,
    },
    {
      name: "Booking & Appointments",
      description: "Medical appointments, salon bookings, and consultation scheduling.",
      icon: <CalendarCheck className="h-6 w-6" />,
    },
    {
      name: "Team Collaboration",
      description: "Meeting coordination, resource allocation, and room booking systems.",
      icon: <Users className="h-6 w-6" />,
    },
    {
      name: "Event Management",
      description: "Conference schedules, event planning, and agenda management.",
      icon: <PartyPopper className="h-6 w-6" />,
    },
    {
      name: "HR & Workforce",
      description: "Shift scheduling, time tracking, and employee availability management.",
      icon: <Briefcase className="h-6 w-6" />,
    },
    {
      name: "Education",
      description: "Class schedules, course planning, and academic calendar systems.",
      icon: <GraduationCap className="h-6 w-6" />,
    },
  ],

  // Seasonal discount configuration
  seasonalDiscount: {
    active: false,
    reason: "Holiday Season Sale", // Can be: "Christmas Sale", "New Year Sale", "Chinese New Year", etc.
    percentage: 25, // 25% off
    endDate: "2026-01-31", // When discount ends
  },

  pricing: [
    {
      name: "Basic",
      price: "Free",
      originalPrice: null,
      description: "Open source React calendar component on npm.",
      features: [
        "Month / Week / Day views",
        "Event creation & editing",
        "Event overlap detection",
        "Custom event renderer",
        "Week start configuration",
        "Mobile swipe gestures",
        "Loading skeletons & empty states",
        "Calendar filtering",
        "Full TypeScript types",
        "MIT License",
      ],
      cta: "View on npm",
      ctaLink: "https://www.npmjs.com/package/calendarkit-basic",
      openSource: true,
    },
    {
      name: "Pro",
      price: "Free",
      originalPrice: null,
      description: "Professional features for production apps. Now open source!",
      features: [
        "Everything in Basic",
        "Agenda & Resource views",
        "Drag & drop + Event resizing",
        "ICS Import/Export",
        "Context menus (right-click)",
        "Mobile swipe gestures",
        "Skeleton loading & empty states",
        "Notification reminders",
        "Timezone support",
        "Dark / Light mode (polished)",
        "Multi-language (i18n)",
        "Recurring events (RRULE)",
        "Guest management & attachments",
      ],
      popular: true,
      cta: "View on npm",
      ctaLink: "https://www.npmjs.com/package/calendarkit-pro",
      openSource: true,
    },
  ],
  footer: {
    links: [
      { text: "Features", url: "#features" },
      { text: "Pricing", url: "#pricing" },
      { text: "Docs", url: "/docs" },
    ],
    bottomText: "All rights reserved.",
  },

  testimonials: [
    {
      id: 1,
      text: "I built this calendar initially for Linguoflow, a language learning platform. After that, I decided to open-source it, FullCalendar and other options are too expen for our needs.",
      name: "Illyas CHIHI",
      company: "Software Engineer @ Co-Founder of Linguoflow & Founder of CalendarKit",
    },
    {
      id: 2,
      text: "CalendarKit saved us weeks of development time. The drag & drop just works, and the TypeScript types are excellent.",
      name: "Valentin Fouillet",
      company: "Fullstack Engineer @Arrowsphere",
    },
    {
      id: 3,
      text: "Finally, a calendar component that doesn't fight you. Clean API, great docs, and the dark mode support is chef's kiss.",
      name: "Thomas Willson",
      company: "Fullstack Engineer @ Freelance",
    },
    {
      id: 4,
      text: "Our student uses basic community version to build educational projects. The drag & drop feature is a game-changer for them, no need to take any extra steps to make it work.",
      name: "Silya Nait-Zerrad",
      company: " @ Epitech Paris",
    },
    {
      id: 5,
      text: "The recurring events feature saved us from writing complex logic. Just pass the RRULE and it works.",
      name: "Antoine Gavira-Bottari",
      company: "DevOps Engineer @ Thales",
    },
    {
      id: 6,
      text: "Resource view was exactly what we needed for our team scheduling app. Works flawlessly.",
      name: "Celine Madaoui",
      company: "Data Engineer @ SNCF",
    },
  ],
};

export type SiteConfig = typeof siteConfig;
