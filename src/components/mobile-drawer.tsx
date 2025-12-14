"use client";

import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { IoMenuSharp } from "react-icons/io5";

const navLinks = [
  { href: "#comparison", label: "Demo" },
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "/docs", label: "Docs" },
];

export function MobileDrawer() {
  return (
    <Drawer>
      <DrawerTrigger>
        <IoMenuSharp className="text-2xl" />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="px-6">
          <Link
            href="/"
            title="brand-logo"
            className="relative mr-6 flex items-center space-x-2"
          >
            <Icons.logo className="w-auto h-8 text-primary" />
            <DrawerTitle>{siteConfig.name}</DrawerTitle>
          </Link>
          <DrawerDescription>{siteConfig.description}</DrawerDescription>
        </DrawerHeader>

        <nav className="px-6 py-4 space-y-2">
          {navLinks.map((link) => (
            <DrawerClose asChild key={link.href}>
              <Link
                href={link.href}
                className="block py-2 text-lg font-medium text-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            </DrawerClose>
          ))}
        </nav>

        <DrawerFooter className="px-6">
          <DrawerClose asChild>
            <Link
              href="#pricing"
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "text-primary-foreground rounded-lg w-full"
              )}
            >
              {siteConfig.cta}
            </Link>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
