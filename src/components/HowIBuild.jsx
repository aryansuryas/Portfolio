import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import { FIGURES } from '../data/content';

export default function HowIBuild() {
  return (
    <section className="section-pad">
      <div className="wrap">
        <SectionHeading eyebrow="APPROACH" pre="How I " emphasis="build" />
        <div className="figures-grid stagger">
          {FIGURES.map(fig => (
            <Reveal className="rv-up fig-card" key={fig.tag}>
              <span className="fig-tag">{fig.tag}</span>
              <div>
                <h3 className="fig-title">{fig.title}</h3>
                <p className="fig-desc">{fig.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
