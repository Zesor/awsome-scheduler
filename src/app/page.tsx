import '@/components/landing/landing.css'
import { DemoProvider } from '@/components/landing/DemoContext'
import { Header } from '@/components/landing/Header'
import { Hero } from '@/components/landing/Hero'
import { CreateInPlace } from '@/components/landing/CreateInPlace'
import { Features } from '@/components/landing/Features'
import { LayoutsThemes } from '@/components/landing/LayoutsThemes'
import { PhonesA11y } from '@/components/landing/PhonesA11y'
import { GetStarted } from '@/components/landing/GetStarted'
import { Upgrade } from '@/components/landing/Upgrade'
import { Faq } from '@/components/landing/Faq'
import { FinalCta } from '@/components/landing/FinalCta'
import { Footer } from '@/components/landing/Footer'

import { JsonLd } from '@/components/JsonLd'
import { landingJsonLd, pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({ title: 'React Calendar and Scheduler Component | CalendarKit', description: 'Free MIT React calendar and scheduler: week, month, day, agenda and resource views, recurring events, time zones, undo. npm install calendarkit-pro.', path: '/' })

export default function Home() {
  return (
    <DemoProvider>
      <Header />
      <main><JsonLd data={landingJsonLd()} /><Hero /><CreateInPlace /><Features /><LayoutsThemes /><PhonesA11y /><GetStarted /><Upgrade /><Faq /><FinalCta /></main>
      <Footer />
    </DemoProvider>
  )
}
