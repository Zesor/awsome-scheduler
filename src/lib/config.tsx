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
  description: "The Modern React Calendar Component for Developers",
  cta: "Get Started",
  url: process.env.NEXT_PUBLIC_APP_URL || "https://calendarkit.io",
  keywords: [
    "React Calendar",
    "React Calendar Component",
    "Calendar UI",
    "Calendar for React",
    "Next.js Calendar",
    "TypeScript Calendar",
    "Drag and Drop Calendar",
    "React Scheduler",
    "React Planner",
    "Calendar Component Library",
    "Modern Calendar React",
    "Best React Calendar",
    "Calendar UI Component",
    "Event Calendar React",
    "Booking Calendar React",
    "Week View Calendar",
    "Month View Calendar",
    "Day View Calendar",
    "Tailwind Calendar",
    "React Date Picker",
  ],
  links: {
    email: "support@calendarkit.io",
  },
  hero: {
    title: "CalendarKit",
    description:
      "Build scheduling features in minutes, not months. A beautifully crafted React calendar component with drag & drop, dark mode, and full TypeScript support.",
    cta: "Get Started",
    ctaDescription: "npm install @calendarkit/react",
  },
  features: [
    {
      name: "Easy Setup",
      description:
        "npm install & import. Get your first calendar running in under 5 minutes with minimal configuration.",
      icon: <Zap className="h-6 w-6" />,
    },
    {
      name: "Fully Styled",
      description:
        "Beautiful out of the box with Tailwind CSS. Full theme control with CSS variables for complete customization.",
      icon: <Palette className="h-6 w-6" />,
    },
    {
      name: "TypeScript First",
      description:
        "Full type safety with exported types & interfaces. Excellent IDE support and autocomplete.",
      icon: <Code className="h-6 w-6" />,
    },
    {
      name: "Dark Mode",
      description:
        "Built-in light & dark themes that respect system preferences. Toggle with a single prop.",
      icon: <Moon className="h-6 w-6" />,
    },
    {
      name: "Drag & Drop",
      description:
        "Smooth event dragging with snap-to-grid powered by dnd-kit. Resize events intuitively.",
      icon: <Move className="h-6 w-6" />,
    },
    {
      name: "i18n Ready",
      description:
        "Multi-language support with date-fns locales. Built-in translations for common UI elements.",
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
  pricing: [
    {
      name: "Basic",
      price: "$89",
      description: "Perfect for simple scheduling needs.",
      features: [
        "Month view",
        "Week view",
        "Day view",
        "Event creation & editing",
        "Calendar filtering",
        "React 18+ support",
        "Full TypeScript types",
        "MIT License",
      ],
      cta: "Buy Basic",
    },
    {
      name: "Pro",
      price: "$149",
      description: "Everything you need for production apps.",
      features: [
        "Everything in Basic",
        "Agenda view",
        "Resource view",
        "Drag & drop events",
        "Timezone support",
        "Dark / Light mode",
        "Multi-language (i18n)",
        "Recurring events (RRULE)",
        "Event attachments",
        "Guest management",
        "Upload file for event attachments",
        "Download event attachments",
      ],
      popular: true,
      cta: "Buy Pro",
    },
    {
      name: "Universal",
      price: "Coming Soon",
      description: "Multi-framework support for all your projects.",
      features: [
        "Everything in Pro",
        "React",
        "Vue.js",
        "Angular",
        "Svelte",
        "Solid",
        "Web Components",
        "Lifetime updates",
      ],
      comingSoon: true,
      cta: "Notify Me",
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
      text: "CalendarKit saved us weeks of development time. The drag & drop just works, and the TypeScript types are excellent.",
      name: "Sarah Chen",
      company: "Senior Frontend Dev @ TechCorp",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 2,
      text: "Finally, a calendar component that doesn't fight you. Clean API, great docs, and the dark mode support is chef's kiss.",
      name: "Marcus Johnson",
      company: "Fullstack Engineer @ StartupX",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHBvcnRyYWl0fGVufDB8fDB8fHww",
    },
    {
      id: 3,
      text: "We built our entire booking system on CalendarKit Pro. The timezone handling alone was worth the price.",
      name: "Emily Rodriguez",
      company: "Tech Lead @ BookingApp",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHBvcnRyYWl0fGVufDB8fDB8fHww",
    },
    {
      id: 4,
      text: "The recurring events feature saved us from writing complex logic. Just pass the RRULE and it works.",
      name: "David Park",
      company: "React Developer @ SaaSCo",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fHBvcnRyYWl0fGVufDB8fDB8fHww",
    },
    {
      id: 5,
      text: "Best React calendar component I've used. Period. The code is clean and easy to customize.",
      name: "Anna Kowalski",
      company: "Frontend Architect @ Agency",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fHBvcnRyYWl0fGVufDB8fDB8fHww",
    },
    {
      id: 6,
      text: "The API is so intuitive. Our junior devs were productive with CalendarKit on day one.",
      name: "James Wilson",
      company: "Engineering Manager @ DevStudio",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fHBvcnRyYWl0fGVufDB8fDB8fHww",
    },
    {
      id: 7,
      text: "We migrated from a popular calendar library to CalendarKit. The bundle size dropped by 40%.",
      name: "Lisa Thompson",
      company: "Performance Engineer @ FastApp",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDR8fHBvcnRyYWl0fGVufDB8fDB8fHww",
    },
    {
      id: 8,
      text: "Resource view was exactly what we needed for our team scheduling app. Works flawlessly.",
      name: "Michael Brown",
      company: "CTO @ TeamSync",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTJ8fHBvcnRyYWl0fGVufDB8fDB8fHww",
    },
  ],
};

export type SiteConfig = typeof siteConfig;
