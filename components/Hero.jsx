import { lazy, Suspense } from 'react';
import useMediaQuery from '../hooks/useMediaQuery';
import SideRays from '../reactbits/SideRays/SideRays';
import RotatingText from '../reactbits/RotatingText/RotatingText';
import CircularText from '../reactbits/CircularText/CircularText';
import Reveal from './Reveal';
import { HERO_ROLES, HERO_STATS } from '../data/content';
import { THEME } from '../constants/theme';

// Three.js is a heavy dependency — only fetch its chunk for viewports that
// will actually render the 3D scene (see the isDesktop check below).
const HeroIcosahedron = lazy(() => import('../three/HeroIcosahedron'));

export default function Hero({ wordsOn }) {
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  const handleScrollCue = () => {
    window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero-section">
      <div className="hero-rays-wrap" aria-hidden="true">
        <SideRays
          origin="top-right"
          rayColor1={THEME.brass}
          rayColor2={THEME.wine}
          intensity={1.1}
          spread={1.6}
          opacity={0.24}
          falloff={2.3}
          saturation={1.15}
          blend={0.55}
          speed={1.1}
        />
      </div>

      {isDesktop && (
        <Suspense fallback={null}>
          <HeroIcosahedron />
        </Suspense>
      )}

      <div className="wrap hero-wrap">
        <h1 id="hero-title" className={`font-head hero-title ${wordsOn ? 'words-on' : ''}`.trim()}>
          <span className="word-mask">
            <span>ARYAN</span>
          </span>
          <br />
          <span className="word-mask">
            <span>SURYA&nbsp;S</span>
          </span>
        </h1>

        <RotatingText
          texts={HERO_ROLES}
          mainClassName="hero-role-rotate"
          staggerFrom="last"
          staggerDuration={0.02}
          rotationInterval={2600}
          transition={{ type: 'spring', damping: 28, stiffness: 380 }}
        />

        <Reveal as="p" className="rv-up hero-sub" style={{ transitionDelay: '280ms' }}>
          CSE student, Dayananda Sagar University — Bengaluru, India.
        </Reveal>

        <Reveal className="rv-up hero-cta-row" style={{ transitionDelay: '400ms' }}>
          <a href="#work" className="btn btn-solid">
            View projects
          </a>
          <a href="#contact" className="btn btn-outline">
            Get in touch
          </a>
        </Reveal>
      </div>

      <Reveal className="rv-up wrap hero-stats-wrap" style={{ transitionDelay: '550ms' }}>
        <div className="hairline" />
        <div className="stats-grid">
          {HERO_STATS.map(stat => (
            <div className="stat-box" key={stat.label}>
              <span className="stat-num">{stat.value}</span>
              <p className="stat-label">{stat.label}</p>
            </div>
          ))}
        </div>
        <div className="hairline" />
      </Reveal>

      <button type="button" className="scroll-badge" onClick={handleScrollCue} aria-label="Scroll to explore">
        <CircularText
          text="SCROLL TO EXPLORE • SCROLL TO EXPLORE • "
          onHover="speedUp"
          spinDuration={16}
          className="scroll-badge-ring"
        />
        <span className="scroll-badge-dot" aria-hidden="true">
          <i className="fa-solid fa-arrow-down"></i>
        </span>
      </button>
    </section>
  );
}
