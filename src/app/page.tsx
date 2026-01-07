import { SeasonalBanner } from "@/components/seasonal-banner";
import { Comparison } from "@/components/sections/comparison";
import { FAQ } from "@/components/sections/faq";
import { Features } from "@/components/sections/features";
import { Footer } from "@/components/sections/footer";
import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { Pricing } from "@/components/sections/pricing";
import { SchedulerExamples } from "@/components/sections/scheduler-examples";
import { Testimonials } from "@/components/sections/testimonials";
import { TimeSavings } from "@/components/sections/time-savings";
import { UseCases } from "@/components/sections/use-cases";

export default function Home() {
  return (
    <main>
      <SeasonalBanner />
      <Header />
      <Hero />
      <Comparison />
      <SchedulerExamples />
      <UseCases />
      <TimeSavings />
      {/* <Testimonials /> */}
      <Pricing />
      <FAQ />
      <Footer />
    </main>
  );
}
