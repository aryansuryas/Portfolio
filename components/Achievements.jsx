import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import { ACHIEVEMENTS } from '../data/content';

export default function Achievements() {
  return (
    <section id="achievements" className="section-pad">
      <div className="wrap">
        <SectionHeading eyebrow="RECOGNITION" pre="" emphasis="Achievements" />
        <div className="achievements-grid stagger">
          {ACHIEVEMENTS.map(item => (
            <Reveal className="rv-up ach-card" key={item.title}>
              <i className={item.icon} style={{ color: 'var(--wine)', fontSize: '1.4rem' }} aria-hidden="true"></i>
              <h3 className="ach-title font-head">{item.title}</h3>
              <p className="ach-sub">{item.sub}</p>
              <p className="ach-year font-mono">{item.year}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
