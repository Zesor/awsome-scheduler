"use client";

import { Section } from "@/components/section";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export function Features() {
  const features = siteConfig.features;

  return (
    <Section id="features" title="Features">
      <div className="border border-b-0">
        {/* Header */}
        <div className="p-6 md:p-10 text-center border-b">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-balance">
            Developer-First Features
          </h2>
          <p className="mt-4 text-muted-foreground text-balance max-w-2xl mx-auto">
            Everything you need to build great scheduling experiences. Nothing
            you don&apos;t.
          </p>
        </div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map(({ name, description, icon }, index) => (
            <motion.div
              key={name}
              variants={cardVariants}
              className={cn(
                "group flex flex-col gap-y-4 items-center justify-center py-10 px-6 border-b transition-colors hover:bg-secondary/10",
                // Handle borders for different screen sizes
                index < features.length - 1 && "md:border-b",
                index % 2 === 0 && "md:border-r",
                index % 3 !== 2 && "lg:border-r",
                index < features.length - 3 && "lg:border-b",
                // Last row on tablet (2 columns)
                index >= features.length - 2 && "md:border-b-0",
                // Last row on desktop (3 columns)
                index >= features.length - 3 && "lg:border-b-0"
              )}
            >
              <div className="flex flex-col gap-y-3 items-center">
                <div className="bg-gradient-to-b from-primary to-primary/80 p-3 rounded-xl text-white transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/25">
                  {icon}
                </div>
                <h3 className="text-xl font-semibold text-card-foreground text-center text-balance">
                  {name}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground text-balance text-center max-w-sm leading-relaxed">
                {description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}
