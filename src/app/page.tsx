import '@/components/landing/landing.css'
import { DemoProvider } from '@/components/landing/DemoContext'
import { Header } from '@/components/landing/Header'
import { Hero } from '@/components/landing/Hero'
import { CreateInPlace } from '@/components/landing/CreateInPlace'
import { Features } from '@/components/landing/Features'
import { LayoutsThemes } from '@/components/landing/LayoutsThemes'
import { PhonesA11y } from '@/components/landing/PhonesA11y'
import { GetStarted } from '@/components/landing/GetStarted'

export default function Home() {
  return (
    <DemoProvider>
      <Header />
      <main><Hero /><CreateInPlace /><Features /><LayoutsThemes /><PhonesA11y /><GetStarted /></main>
    </DemoProvider>
  )
}
