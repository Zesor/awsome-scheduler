"use client";

import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState } from "react";
import { Quote } from "lucide-react";

export function Testimonials() {
  const [showAll, setShowAll] = useState(false);
  const initialDisplayCount = 6;

  return (
    <Section id="testimonials" title="Testimonials">
      <div className="border border-b-0">
        {/* Header */}
        <div className="p-6 md:p-10 text-center border-b">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-balance">
            Loved by Developers
          </h2>
          <p className="mt-4 text-muted-foreground text-balance max-w-2xl mx-auto">
            See what developers are saying about CalendarKit.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="relative pb-24">
          {/* Grid layout for consistent alignment */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {siteConfig.testimonials.map((testimonial, index) => {
              const isHidden = !showAll && index >= initialDisplayCount;
              const isInLeftColSm = index % 2 === 0;
              const isInFirstTwoColsLg = index % 3 !== 2;

              return (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className={cn(
                    "flex flex-col border-b",
                    "transition-colors hover:bg-secondary/10",
                    // Tablet: right border for left column
                    isInLeftColSm && "sm:border-r",
                    // Desktop: right border for columns 1 & 2
                    isInFirstTwoColsLg && "lg:border-r",
                    // Hide items beyond initial count
                    isHidden && "hidden"
                  )}
                >
                  <div className="px-5 py-6 flex-grow">
                    {/* Quote icon */}
                    <Quote className="h-6 w-6 text-primary/20 mb-3" />

                    {/* Quote text */}
                    <p className="text-foreground leading-relaxed mb-4">
                      &ldquo;{testimonial.text}&rdquo;
                    </p>

                    {/* Author */}
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">
                        {testimonial.name}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {testimonial.company}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Gradient overlay */}
          {!showAll && (
            <div className="pointer-events-none absolute bottom-24 left-0 right-0 h-48 bg-gradient-to-t from-background to-transparent z-10"></div>
          )}

          {/* Show more button */}
          <Button
            variant="outline"
            className="absolute bottom-8 left-1/2 -translate-x-1/2 h-10 px-6 z-20"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Show less" : "See more testimonials"}
          </Button>
        </div>
      </div>
    </Section>
  );
}
