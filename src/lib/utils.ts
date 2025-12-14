import { siteConfig } from "@/lib/config";
import { type ClassValue, clsx } from "clsx";
import { Metadata } from "next";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL || siteConfig.url}${path}`;
}

export function constructMetadata({
  title = siteConfig.name,
  description = siteConfig.description,
  image = absoluteUrl("/og"),
  noIndex = false,
  ...props
}: {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
  [key: string]: Metadata[keyof Metadata];
}): Metadata {
  return {
    title: {
      template: "%s | " + siteConfig.name,
      default: `${siteConfig.name} - ${siteConfig.description}`,
    },
    description: description || siteConfig.description,
    keywords: siteConfig.keywords,
    authors: [
      {
        name: siteConfig.name,
        url: siteConfig.url,
      },
    ],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: siteConfig.url,
    },
    openGraph: {
      title,
      description,
      url: siteConfig.url,
      siteName: siteConfig.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: "website",
      locale: "en_US",
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon-16x16.png",
      apple: "/apple-touch-icon.png",
    },
    manifest: "/site.webmanifest",
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },
    ...props,
  };
}

// JSON-LD Structured Data for SEO
export function generateStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        url: siteConfig.url,
        logo: {
          "@type": "ImageObject",
          url: `${siteConfig.url}/logo.png`,
        },
        contactPoint: {
          "@type": "ContactPoint",
          email: siteConfig.links.email,
          contactType: "customer support",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.description,
        publisher: {
          "@id": `${siteConfig.url}/#organization`,
        },
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteConfig.url}/?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "SoftwareApplication",
        name: siteConfig.name,
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Web",
        description: siteConfig.description,
        offers: [
          {
            "@type": "Offer",
            name: "Basic",
            price: "89",
            priceCurrency: "USD",
            description: "Basic calendar component with Month, Week, and Day views",
          },
          {
            "@type": "Offer",
            name: "Pro",
            price: "149",
            priceCurrency: "USD",
            description: "Full-featured calendar with drag & drop, timezone, i18n, and more",
          },
        ],
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "127",
          bestRating: "5",
          worstRating: "1",
        },
        featureList: [
          "React Calendar Component",
          "TypeScript Support",
          "Drag and Drop",
          "Dark Mode",
          "Timezone Support",
          "Internationalization (i18n)",
          "Recurring Events",
          "Resource View",
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${siteConfig.url}/#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "What is CalendarKit?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "CalendarKit is a modern React calendar component library with TypeScript support, drag & drop, dark mode, timezone support, and internationalization. It's designed for developers who need a professional calendar solution.",
            },
          },
          {
            "@type": "Question",
            name: "Does CalendarKit support React and Next.js?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes! CalendarKit supports React 18+ and Next.js out of the box. Vue, Angular, Svelte, and Solid support is coming soon with our Universal license.",
            },
          },
          {
            "@type": "Question",
            name: "Is CalendarKit TypeScript compatible?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "CalendarKit is built with TypeScript from the ground up. All components, props, and types are fully typed with excellent IDE autocomplete support.",
            },
          },
        ],
      },
    ],
  };
}

export function formatDate(date: string) {
  let currentDate = new Date().getTime();
  if (!date.includes("T")) {
    date = `${date}T00:00:00`;
  }
  let targetDate = new Date(date).getTime();
  let timeDifference = Math.abs(currentDate - targetDate);
  let daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  let fullDate = new Date(date).toLocaleString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  if (daysAgo < 1) {
    return "Today";
  } else if (daysAgo < 7) {
    return `${fullDate} (${daysAgo}d ago)`;
  } else if (daysAgo < 30) {
    const weeksAgo = Math.floor(daysAgo / 7);
    return `${fullDate} (${weeksAgo}w ago)`;
  } else if (daysAgo < 365) {
    const monthsAgo = Math.floor(daysAgo / 30);
    return `${fullDate} (${monthsAgo}mo ago)`;
  } else {
    const yearsAgo = Math.floor(daysAgo / 365);
    return `${fullDate} (${yearsAgo}y ago)`;
  }
}
