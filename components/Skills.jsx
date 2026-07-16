import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import { SKILLS } from '../data/content';

export default function Skills() {
  return (
    <section id="skills" className="section-pad section-panel">
      <div className="wrap">
        <SectionHeading eyebrow="CAPABILITIES" pre="Technology " emphasis="stack" />
        <div className="skills-grid stagger">
          {SKILLS.map(skill => (
            <Reveal className="rv-up skill-card" key={skill.label}>
              <h3 className="skill-cat-label font-mono">{skill.label}</h3>
              <p className="skill-list-text">{skill.desc}</p>
              <div className="skill-icons" aria-hidden="true">
                {skill.icons.map(icon => (
                  <i className={icon} key={icon}></i>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
