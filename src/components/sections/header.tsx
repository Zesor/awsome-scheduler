"use client";

import { Icons } from "@/components/icons";
import { MobileDrawer } from "@/components/mobile-drawer";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { track } from "@vercel/analytics";

const navLinks = [
  { href: "#comparison", label: "Demo" },
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "/docs", label: "Docs" },
];

export function Header() {
  return (
    <header className="sticky top-0 h-[var(--header-height)] z-50 p-0 bg-background/60 backdrop-blur">
      <div className="flex justify-between items-center container mx-auto p-2">
        <Link
          href="/"
          title="brand-logo"
          className="relative mr-6 flex items-center space-x-2"
        >
          <Image
            src="/apple-touch-icon.png"
            alt="CalendarKit Logo"
            width={32}
            height={32}
            className="w-8 h-8 rounded-md"
          />
          <span className="font-bold text-lg">{siteConfig.name}</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => track("Header Nav Clicked", { destination: link.label.toLowerCase(), source: "desktop" })}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <Link
            href="https://github.com/Zesor/calendarkit-basic"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => track("Social Clicked", { platform: "github", source: "header" })}
          >
            <Icons.github className="h-5 w-5" />
          </Link>
          <Link
            href="#pricing"
            className={cn(
              buttonVariants({ variant: "default" }),
              "h-9 text-primary-foreground rounded-lg group tracking-tight font-medium"
            )}
            onClick={() => track("Header CTA Clicked", { cta: "Get Started", source: "header" })}
          >
            {siteConfig.cta}
          </Link>
        </div>

        <div className="mt-2 cursor-pointer block lg:hidden">
          <MobileDrawer />
        </div>
      </div>
      <hr className="absolute w-full bottom-0" />
    </header>
  );
}
