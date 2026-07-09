import Reveal from './Reveal';
import { JOURNEY_COL_1, JOURNEY_COL_2 } from '../data/content';

function TimelineItem({ item, delay }) {
  return (
    <Reveal className="rv-up tl-item" style={{ transitionDelay: delay }}>
      <p className="tl-date font-mono">{item.period}</p>
      <h3 className="tl-role font-head">
        {item.role} {item.roleDetail && <span className="tl-role-detail">{item.roleDetail}</span>}
      </h3>
      <p className="tl-org font-mono">{item.org}</p>
      <p className="tl-desc">{item.desc}</p>
    </Reveal>
  );
}

export default function Journey() {
  return (
    <section id="journey" className="section-pad">
      <div className="wrap journey-grid">
        <div className="journey-col">
          {JOURNEY_COL_1.map((item, i) => (
            <TimelineItem item={item} key={item.role} delay={i === 0 ? '0ms' : '150ms'} />
          ))}
        </div>
        <div className="journey-col">
          {JOURNEY_COL_2.map((item, i) => (
            <TimelineItem item={item} key={item.role} delay={i === 0 ? '0ms' : '150ms'} />
          ))}
        </div>
      </div>
    </section>
  );
}
