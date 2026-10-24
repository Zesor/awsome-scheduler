import { CreateInPlaceSteps } from './CreateInPlaceSteps'
import s from './CreateInPlace.module.css'

const FACTS = ['Beside, never on top', 'Overlaps announced', 'Nothing lost on close', 'Or bring your own form']

export function CreateInPlace() {
  return (
    <section className="section" id="create-in-place">
      <div className="wrap">
        <span className="eyebrow" data-reveal>Create in place</span>
        <h2 className="h2" data-reveal style={{ '--i': 1, margin: '14px 0 16px', maxWidth: 760 } as React.CSSProperties}>From a click to an event.<br /><span className="soft">In one sentence.</span></h2>
        <p className={s.intro} data-reveal style={{ '--i': 2 } as React.CSSProperties}>No modal, no form. Type what you mean.</p>
        <div data-reveal style={{ '--i': 3 } as React.CSSProperties}><CreateInPlaceSteps /></div>
        <div className={s.facts}>
          {FACTS.map((f, i) => <h3 key={f} className={s.fact} data-reveal style={{ '--i': i } as React.CSSProperties}>{f}</h3>)}
        </div>
      </div>
    </section>
  )
}
