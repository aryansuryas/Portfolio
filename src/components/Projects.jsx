import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import ShinyText from '../reactbits/ShinyText/ShinyText';
import { PROJECT_SVGS } from './ProjectSVGs';
import { PROJECTS } from '../data/content';
import { THEME } from '../constants/theme';

export default function Projects() {
  return (
    <section id="work" className="section-pad section-panel">
      <div className="wrap">
        <SectionHeading eyebrow="SELECTED WORK" pre="" emphasis="Projects" />

        {PROJECTS.map(project => {
          const Illustration = PROJECT_SVGS[project.id];
          return (
            <div className="project-row" key={project.id}>
              <Reveal
                className={`rv-${project.mediaReveal} proj-media-col`}
                style={{ order: project.mediaOrder }}
              >
                <span className={`proj-number outline-type proj-number--${project.numberSide}`} aria-hidden="true">
                  {project.number}
                </span>
                <div className="proj-media">
                  <div className="img-inner">
                    <Illustration />
                  </div>
                  <div className="proj-overlay">{project.overlay}</div>
                </div>
              </Reveal>

              <Reveal className={`rv-${project.textReveal}`} style={{ order: project.textOrder }}>
                <p className="proj-era">
                  <ShinyText text={project.era} color={THEME.wine} shineColor={THEME.brass} speed={3} pauseOnHover />
                </p>
                <h3 className="proj-title font-head">{project.title}</h3>
                <p className="proj-desc">{project.desc}</p>
                <a
                  href={project.href}
                  target={project.href.startsWith('http') ? '_blank' : undefined}
                  rel={project.href.startsWith('http') ? 'noopener' : undefined}
                  className="btn btn-solid proj-cta"
                >
                  {project.cta}
                </a>
              </Reveal>
            </div>
          );
        })}
      </div>
    </section>
  );
}
