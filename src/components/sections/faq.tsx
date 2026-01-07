"use client";

import { useState } from "react";
import { Section } from "@/components/section";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What's the difference between Basic and Pro?",
    answer:
      "Basic includes month, week, and day views with event creation and calendar filtering. Pro adds drag & drop, agenda view, resource view, timezone support, dark mode, multi-language support (i18n), recurring events, guest management, and file attachments.",
  },
  {
    question: "Can I use CalendarKit in a commercial project?",
    answer:
      "Yes! Both Basic and Pro come with a commercial license. You can use CalendarKit in unlimited projects, including client work and SaaS applications.",
  },
  {
    question: "Do I get access to the source code?",
    answer:
      "Yes, you receive the full source code with your purchase. This allows you to customize components, modify styles, and integrate deeply with your application.",
  },
  {
    question: "What frameworks are supported?",
    answer:
      "Currently, CalendarKit supports React 18+ and Next.js. Vue, Angular, Svelte, and Solid support is coming soon with our Universal license.",
  },
  {
    question: "How do I handle recurring events?",
    answer:
      "Pro includes built-in support for recurring events using RRULE-style configuration. Simply add a recurrence object to your event with freq (DAILY, WEEKLY, MONTHLY, YEARLY), interval, and either count or until date.",
  },
  {
    question: "Can I customize the event modal?",
    answer:
      "Yes! Use the renderEventForm prop to provide your own custom event form component. You receive all necessary props including event data, save/delete handlers, and modal state.",
  },
  {
    question: "Is timezone support built-in?",
    answer:
      "Pro includes full timezone support using date-fns-tz. Events automatically adjust when users change timezones, and the timezone picker shows all IANA timezone identifiers.",
  },
  {
    question: "How do I add my own translations?",
    answer:
      "Use the translations prop to override any UI strings. Pro includes built-in English and French translations. You can also use date-fns locales for date formatting in any language.",
  },
  {
    question: "What about TypeScript support?",
    answer:
      "CalendarKit is built with TypeScript from the ground up. All components, props, and types are fully typed with excellent IDE autocomplete support.",
  },
  {
    question: "How do I integrate with my backend?",
    answer:
      "CalendarKit is headless when it comes to data - you control the events array. Use the onEventCreate, onEventUpdate, onEventDelete, and onEventDrop callbacks to sync with any REST API, GraphQL, or real-time backend.",
  },
];

function FAQItem({
  item,
  isOpen,
  onToggle,
}: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left"
      >
        <span className="font-medium text-foreground pr-4">{item.question}</span>
        <ChevronDown
          className={cn(
            "h-5 w-5 text-muted-foreground transition-transform shrink-0",
            isOpen && "rotate-180"
          )}
        />
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-300",
          isOpen ? "max-h-96 pb-5" : "max-h-0"
        )}
      >
        <p className="text-muted-foreground">{item.answer}</p>
      </div>
    </div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section id="faq">
      <div className="border border-b-0">
        {/* Header */}
        <div className="p-6 md:p-10 text-center border-b">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-balance">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-muted-foreground text-balance max-w-2xl mx-auto">
            Everything you need to know about CalendarKit. Can&apos;t find what you&apos;re looking for?{" "}
            <a
              href="mailto:support@calendarkit.io"
              className="text-primary hover:underline"
            >
              Contact support
            </a>
          </p>
        </div>

        {/* FAQ List */}
        <div className="max-w-3xl mx-auto px-6 md:px-10 py-2">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              item={faq}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
