import Link from 'next/link'
import Image from 'next/image'
import { A11yLoop } from './A11yLoop'
import s from './PhonesA11y.module.css'

const rv = (i: number) => ({ 'data-reveal': '', style: { '--i': i } as React.CSSProperties })
const Chips = ({ items }: { items: string[] }) => <div className={s.chips}>{items.map((c) => <span key={c}>{c}</span>)}</div>

export function PhonesA11y() {
  return (
    <section className="section" id="phones">
      <div className="wrap">
        <span className="eyebrow" data-reveal>Phones and accessibility</span>
        <h2 className="h2" data-reveal style={{ '--i': 1 } as React.CSSProperties}>Works on every screen.<br /><span className="soft">And for everyone.</span></h2>
        <div className={`bento ${s.root}`}>
          <Link className={`tile ${s.phones}`} href="/docs/phones-and-narrow-calendars" aria-label="Ready for phones: read the phone layout docs" {...rv(2)}>
            <div className="viz" aria-hidden="true">
              <div className={`${s.phone} ${s.p1}`}><Image src="/images/phone.png" alt="" width={712} height={1596} sizes="210px" /></div>
              <div className={`${s.phone} ${s.p2}`}><Image src="/images/phone-sheet.png" alt="" width={712} height={1596} sizes="210px" /></div>
            </div>
            <div className="txt">
              <div className={s.top}><div><h3>Ready for phones</h3><p>Under 768 px of calendar width, it becomes a phone app.</p></div><span className="go" aria-hidden="true">Docs →</span></div>
              <Chips items={['Day view first', 'Drawer', 'Bottom sheets', '44 px targets']} />
            </div>
          </Link>
          <Link className="tile" href="/docs/accessibility" aria-label="Accessible: read the accessibility docs" {...rv(3)}>
            <A11yLoop />
            <div className="txt">
              <div className={s.top}><div><h3>Accessible</h3><p>Every event and slot is a named button.</p></div><span className="go" aria-hidden="true">Docs →</span></div>
              <Chips items={['Tab, Enter, Space, Escape', 'Focus returned', 'WCAG AA colours', 'No shortcuts to learn']} />
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}
