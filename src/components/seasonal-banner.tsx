"use client";

import { useState, useEffect } from "react";
import { X, Sparkles, Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/config";
import Link from "next/link";

export function SeasonalBanner() {
  const [isDismissed, setIsDismissed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if banner was dismissed in this session
    const dismissed = sessionStorage.getItem("seasonal-banner-dismissed");
    if (!dismissed) {
      setIsVisible(true);
    } else {
      setIsDismissed(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
    sessionStorage.setItem("seasonal-banner-dismissed", "true");
  };

  // Don't show if discount is not active or banner is dismissed
  if (!siteConfig.seasonalDiscount.active || isDismissed || !isVisible) {
    return null;
  }

  return (
    <div className="sticky top-0 z-50 relative bg-gradient-to-r from-green-600 via-green-500 to-green-600 text-white overflow-hidden">
      {/* Scrolling content */}
      <div className="relative h-10 flex items-center">
        <div className="animate-scroll-left flex items-center gap-8 whitespace-nowrap">
          {/* Repeat the content multiple times for seamless scroll */}
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-8">
              <Link
                href="#pricing"
                className="flex items-center gap-2 hover:underline cursor-pointer"
              >
                <Sparkles className="h-4 w-4" />
                <span className="font-semibold">
                  {siteConfig.seasonalDiscount.reason}
                </span>
                <Tag className="h-4 w-4" />
                <span className="font-bold">
                  Save {siteConfig.seasonalDiscount.percentage}% on Pro Plan!
                </span>
                <span className="text-sm opacity-90">
                  Ends {new Date(siteConfig.seasonalDiscount.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
              </Link>
              <span className="text-white/30">•</span>
            </div>
          ))}
        </div>
      </div>

      {/* Close button */}
      <button
        onClick={handleDismiss}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-white/20 transition-colors z-10"
        aria-label="Dismiss banner"
      >
        <X className="h-4 w-4" />
      </button>

      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll-left {
          animation: scroll-left 30s linear infinite;
        }

        .animate-scroll-left:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
