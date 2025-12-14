import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://calendarkit.io";

  // Static pages with SEO priorities
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/docs`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
  ];

  // SEO landing pages for key search terms
  const seoPages = [
    // React Calendar variations
    { path: "/#features", priority: 0.8 },
    { path: "/#pricing", priority: 0.8 },
    { path: "/#examples", priority: 0.7 },
    { path: "/#faq", priority: 0.6 },
    { path: "/#testimonials", priority: 0.6 },
  ];

  const seoSitemap = seoPages.map((page) => ({
    url: `${baseUrl}${page.path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: page.priority,
  }));

  return [...staticPages, ...seoSitemap];
}
