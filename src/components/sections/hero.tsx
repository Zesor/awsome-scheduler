"use client";

import { AuroraText } from "@/components/aurora-text";
import { Section } from "@/components/section";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { lazy, Suspense } from "react";
import { Calendar, ArrowRight } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

const LazyHeroShowcase = lazy(() =>
  import("@/components/hero-showcase").then((mod) => ({
    default: mod.HeroShowcase,
  }))
);

function HeroPill() {
  return (
    <motion.div
      className="flex w-auto items-center space-x-2 rounded-full bg-primary/20 px-2 py-1 ring-1 ring-accent whitespace-pre"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease }}
    >
      <div className="w-fit rounded-full bg-accent px-2 py-0.5 text-left text-xs font-medium text-primary sm:text-sm">
        v2.0
      </div>
      <p className="text-xs font-medium text-primary sm:text-sm">
        Now with Resource View & Recurring Events
      </p>
      <ArrowRight className="h-3 w-3 text-primary" />
    </motion.div>
  );
}

function HeroTitles() {
  return (
    <div className="flex w-full max-w-3xl flex-col overflow-hidden pt-8">
      <motion.h1
        className="text-left text-4xl font-semibold leading-tighter text-foreground sm:text-5xl md:text-6xl tracking-tighter"
        initial={{ filter: "blur(10px)", opacity: 0, y: 50 }}
        animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          ease,
          staggerChildren: 0.2,
        }}
      >
        <motion.span
          className="inline-block text-balance"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            ease,
          }}
        >
          The React Calendar
          <br />
          <AuroraText className="leading-normal font-bold">
            You&apos;ll Actually Enjoy
          </AuroraText>
        </motion.span>
      </motion.h1>
      <motion.p
        className="text-left max-w-xl leading-normal text-muted-foreground sm:text-lg sm:leading-normal text-balance mt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.6,
          duration: 0.8,
          ease,
        }}
      >
        {siteConfig.hero.description}
      </motion.p>
    </div>
  );
}

function HeroCTA() {
  return (
    <div className="relative mt-8">
      <motion.div
        className="flex w-full max-w-2xl flex-col items-start justify-start space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8, ease }}
      >
        <Link
          href="#pricing"
          className={cn(
            buttonVariants({ variant: "default", size: "lg" }),
            "w-full sm:w-auto text-background flex gap-2 rounded-lg"
          )}
        >
          <Calendar className="h-5 w-5" />
          {siteConfig.hero.cta}
        </Link>
        <Link
          href="#comparison"
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "w-full sm:w-auto flex gap-2 rounded-lg"
          )}
        >
          Live Demo
          <ArrowRight className="h-4 w-4" />
        </Link>
      </motion.div>
      <motion.div
        className="mt-4 flex items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.8 }}
      >
      </motion.div>
    </div>
  );
}

function ShowcaseSkeleton() {
  return (
    <div className="w-full h-full min-h-[400px] lg:min-h-[500px] rounded-xl bg-muted/50 animate-pulse flex items-center justify-center">
      <Calendar className="h-12 w-12 text-muted-foreground/30" />
    </div>
  );
}

export function Hero() {
  return (
    <Section id="hero">
      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-8 w-full p-6 lg:p-12 border-x overflow-hidden">
        <div className="flex flex-col justify-center items-start lg:col-span-1">
          <HeroPill />
          <HeroTitles />
          <HeroCTA />
        </div>
        <div className="relative lg:h-full lg:col-span-1 min-h-[400px] lg:min-h-[500px]">
          <Suspense fallback={<ShowcaseSkeleton />}>
            <LazyHeroShowcase />
          </Suspense>
        </div>
      </div>
    </Section>
  );
}
