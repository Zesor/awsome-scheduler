"use client";

import { Section } from "@/components/section";
import { siteConfig } from "@/lib/config";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

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

function UseCaseCard({
  name,
  description,
  icon,
  index,
  totalItems,
}: {
  name: string;
  description: string;
  icon: React.ReactNode;
  index: number;
  totalItems: number;
}) {
  // For 6 items:
  // Mobile (1 col): all items get border-bottom except last
  // Tablet (2 cols): left column (0,2,4) gets border-right, rows 2+ get border-top
  // Desktop (3 cols): first 2 of each row (0,1,3,4) get border-right, row 2 gets border-top

  const isLastItem = index === totalItems - 1;
  const isInLeftColumnTablet = index % 2 === 0;
  const isInFirstTwoColsDesktop = index % 3 !== 2; // 0,1,3,4 but not 2,5
  const isInSecondRowDesktop = index >= 3;
  const isInSecondRowTablet = index >= 2;

  return (
    <motion.div
      variants={cardVariants}
      className={cn(
        "group relative p-6",
        // Mobile: border bottom for all except last
        !isLastItem && "border-b",
        // Tablet: right border for left column
        isInLeftColumnTablet && "md:border-r",
        // Tablet: top border for rows 2+
        isInSecondRowTablet && "md:border-t",
        // Desktop: right border for columns 1 & 2 (not column 3)
        isInFirstTwoColsDesktop && "lg:border-r",
        // Desktop: top border for second row
        isInSecondRowDesktop && "lg:border-t",
        // Desktop: remove bottom border
        "lg:border-b-0"
      )}
    >
      <div className="flex flex-col gap-4 h-full">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
            {icon}
          </div>
          <h3 className="font-semibold text-lg tracking-tight">{name}</h3>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

export function UseCases() {
  return (
    <Section id="use-cases" title="Use Cases">
      <div className="border border-b-0">
        {/* Header */}
        <div className="p-6 md:p-10 text-center border-b">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-balance">
            Built for Every Scheduling Need
          </h2>
          <p className="mt-4 text-muted-foreground text-balance max-w-2xl mx-auto">
            From booking systems to project management, CalendarKit adapts to your
            use case with flexible views and customizable features.
          </p>
        </div>

        {/* Use Case Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {siteConfig.useCases.map((useCase, index) => (
            <UseCaseCard
              key={useCase.name}
              name={useCase.name}
              description={useCase.description}
              icon={useCase.icon}
              index={index}
              totalItems={siteConfig.useCases.length}
            />
          ))}
        </motion.div>
      </div>
    </Section>
  );
}
