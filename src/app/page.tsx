import '@/components/landing/landing.css'
import { DemoProvider } from '@/components/landing/DemoContext'
import { Header } from '@/components/landing/Header'
import { Hero } from '@/components/landing/Hero'

export default function Home() {
  return (
    <DemoProvider>
      <Header />
      <main><Hero /></main>
    </DemoProvider>
  )
}
