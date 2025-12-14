"use client";

import { Section } from "@/components/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check, Bell, Sparkles } from "lucide-react";
import { useState } from "react";
import { track } from "@vercel/analytics";

// Email capture modal for Universal waitlist
function EmailCaptureModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Track email capture for Universal waitlist
    track("Waitlist Email Submitted", { plan: "Universal", email_domain: email.split("@")[1] });
    // In a real app, you'd send this to your backend
    console.log("Email captured:", email);
    setSubmitted(true);
    setTimeout(() => {
      onClose();
      setSubmitted(false);
      setEmail("");
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative bg-background border rounded-xl p-6 w-full max-w-md mx-4 shadow-2xl"
      >
        {submitted ? (
          <div className="text-center py-4">
            <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-6 w-6 text-green-500" />
            </div>
            <h3 className="text-lg font-semibold mb-2">You&apos;re on the list!</h3>
            <p className="text-sm text-muted-foreground">
              We&apos;ll notify you when Universal is ready.
            </p>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Get Notified</h3>
              <p className="text-sm text-muted-foreground">
                Be the first to know when CalendarKit Universal launches with Vue,
                Angular, Svelte and more.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1">
                  Notify Me
                </Button>
              </div>
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
}

interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  popular?: boolean;
  comingSoon?: boolean;
}

function PricingTierCard({
  tier,
  onNotifyClick,
}: {
  tier: PricingTier;
  onNotifyClick: () => void;
}) {
  const handleCTAClick = () => {
    if (tier.comingSoon) {
      track("Pricing CTA Clicked", { plan: tier.name, action: "waitlist" });
      onNotifyClick();
    } else {
      track("Pricing CTA Clicked", { plan: tier.name, price: tier.price, action: "buy" });
    }
  };

  return (
    <div
      className={cn(
        "relative z-10 flex flex-col h-full border-t lg:border-t-0 lg:border-r last:border-r-0",
        tier.popular && "bg-primary/5",
        tier.comingSoon && "bg-muted/30"
      )}
    >
      {/* Coming Soon Ribbon */}
      {tier.comingSoon && (
        <div className="absolute -top-0 -right-0 overflow-hidden w-24 h-24">
          <div className="absolute top-3 -right-8 rotate-45 bg-primary text-primary-foreground text-xs font-medium py-1 w-32 text-center">
            Soon
          </div>
        </div>
      )}

      <div className="flex flex-col h-full">
        <CardHeader className="border-b p-6">
          <CardTitle className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              {tier.name}
              {tier.popular && <Sparkles className="h-4 w-4 text-primary" />}
            </span>
            {tier.popular && (
              <Badge
                variant="secondary"
                className="bg-primary text-primary-foreground hover:bg-primary"
              >
                Most Popular
              </Badge>
            )}
          </CardTitle>
          <div className="pt-4">
            <div className="text-4xl font-bold tracking-tight">
              {tier.price}
            </div>
            {!tier.comingSoon && (
              <span className="text-sm text-muted-foreground">one-time</span>
            )}
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            {tier.description}
          </p>
        </CardHeader>

        <CardContent className="flex-grow p-6">
          <ul className="space-y-3">
            {tier.features.map((feature, featureIndex) => (
              <li key={featureIndex} className="flex items-start gap-3">
                <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>

        <div className="p-6 pt-0 mt-auto">
          <Button
            size="lg"
            className={cn(
              "w-full",
              tier.popular
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : tier.comingSoon
                ? "bg-muted text-foreground hover:bg-muted/80"
                : "bg-foreground text-background hover:bg-foreground/90"
            )}
            onClick={handleCTAClick}
          >
            {tier.cta}
          </Button>
        </div>
      </div>
    </div>
  );
}

export function Pricing() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Section id="pricing" title="Pricing">
      <div className="border border-b-0">
        {/* Header */}
        <div className="p-6 md:p-10 text-center border-b">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-balance">
            Simple, One-Time Pricing
          </h2>
          <p className="mt-4 text-muted-foreground text-balance max-w-2xl mx-auto">
            Pay once, own forever. Free updates included.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3">
          {(siteConfig.pricing as PricingTier[]).map((tier, index) => (
            <PricingTierCard
              key={index}
              tier={tier}
              onNotifyClick={() => setIsModalOpen(true)}
            />
          ))}
        </div>

        {/* FAQ Link */}
        <div className="p-6 text-center border-t">
          <p className="text-sm text-muted-foreground">
            Have questions?{" "}
            <a
              href="#"
              className="text-primary hover:underline underline-offset-4"
              onClick={() => track("Pricing FAQ Clicked", { source: "pricing_section" })}
            >
              Check our FAQ
            </a>{" "}
            or{" "}
            <a
              href="mailto:support@calendarkit.io"
              className="text-primary hover:underline underline-offset-4"
              onClick={() => track("Contact Clicked", { source: "pricing_section", method: "email" })}
            >
              contact us
            </a>
            .
          </p>
        </div>
      </div>

      {/* Email Capture Modal */}
      <EmailCaptureModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </Section>
  );
}
