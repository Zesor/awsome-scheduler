import Link from 'next/link'
import { FAQ } from '@/lib/faq'
import s from './Faq.module.css'

export function Faq() {
  return (
    <section className="section" id="faq" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <span className="eyebrow" data-reveal>FAQ</span>
        <h2 className="h2" data-reveal style={{ '--i': 1 } as React.CSSProperties}>Questions, answered.<br /><span className="soft">In one sentence each.</span></h2>
        <div className={s.grid}>
          {FAQ.map((f, i) => (
            <div key={f.q} className={s.item} data-reveal style={{ '--i': i % 2 } as React.CSSProperties}>
              <h3>{f.q}</h3>
              <p>{f.a} <Link href={f.href} aria-label={`Read more: ${f.q}`}>Read more</Link></p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
