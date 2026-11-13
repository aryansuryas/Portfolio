'use client';

import { useEffect, useRef, type CSSProperties } from 'react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';

interface FeaturedWorkItem {
  title: string;
  year: string;
  category: string;
  disciplines: string[];
  description: string;
  href: string;
  artwork: 'cosmos' | 'vision' | 'gesture';
}

const WORK_ITEMS: FeaturedWorkItem[] = [
  {
    title: 'Parallax Earth',
    year: '2025',
    category: 'Interactive Experience',
    disciplines: ['Creative development', '3D web', 'Motion design'],
    description:
      'A cinematic journey through cosmic time, shaped by scroll, particle systems, and a quiet sense of scale.',
    href: 'https://github.com/aryansuryas/Parallax-Earth',
    artwork: 'cosmos',
  },
  {
    title: 'Hand Frame FX',
    year: '2025',
    category: 'Computer Vision',
    disciplines: ['Real-time vision', 'Interaction design', 'Python'],
    description:
      'A camera-based experiment that turns hand gestures into a responsive canvas for visual effects.',
    href: 'https://github.com/aryansuryas/Hand-Frame-FX',
    artwork: 'vision',
  },
  {
    title: 'Hand Frame Addition',
    year: '2024',
    category: 'Applied AI',
    disciplines: ['Gesture recognition', 'Computer vision', 'Prototyping'],
    description:
      'A touch-free calculator that interprets raised fingers and makes simple arithmetic feel tangible.',
    href: 'https://github.com/aryansuryas/Hand-Frame-Addition',
    artwork: 'gesture',
  },
];

const STAR_POSITIONS = [
  [24, 35],
  [67, 25],
  [217, 51],
  [195, 91],
  [31, 175],
  [213, 192],
  [52, 226],
  [181, 232],
];

function WorkArtwork({ item, index }: { item: FeaturedWorkItem; index: number }) {
  const titleId = `work-art-title-${item.artwork}-${index}`;

  return (
    <svg
      className={`featured-work__art featured-work__art--${item.artwork}`}
      viewBox="0 0 240 260"
      role="img"
      aria-labelledby={titleId}
      focusable="false"
    >
      <title id={titleId}>{`${item.title} project artwork ${index + 1}`}</title>
      <rect width="240" height="260" rx="4" className="featured-work__art-ground" />
      {item.artwork === 'cosmos' && (
        <>
          {STAR_POSITIONS.map(([x, y], starIndex) => (
            <circle
              key={`${x}-${y}`}
              cx={x + ((index * 9) % 17)}
              cy={y + ((index * 13) % 19)}
              r={starIndex % 3 === 0 ? 2 : 1}
              className="featured-work__art-star"
            />
          ))}
          <circle cx="128" cy="128" r="61" className="featured-work__art-planet" />
          <path
            d="M75 143c18-21 56-34 105-31M80 161c28-12 59-15 93-10"
            className="featured-work__art-line"
          />
          <ellipse
            cx="128"
            cy="128"
            rx="97"
            ry="30"
            transform={`rotate(${-27 + index * 14} 128 128)`}
            className="featured-work__art-orbit"
          />
          <circle cx="201" cy="83" r="6" className="featured-work__art-moon" />
        </>
      )}
      {item.artwork === 'vision' && (
        <>
          <path
            d="M34 61 85 45l42 35 50-16 30 55-42 45 12 48-57 18-40-33-45 5-15-57 24-37z"
            className="featured-work__art-network"
          />
          <path
            d="m34 61 98 18 45-15m-92-19-4 108m46-73 38 69m-80 4 84-59m-129 54 45 1 40 33"
            className="featured-work__art-line"
          />
          {[
            [34, 61],
            [85, 45],
            [127, 80],
            [177, 64],
            [207, 119],
            [165, 164],
            [177, 212],
            [120, 230],
            [80, 197],
            [35, 202],
            [20, 145],
            [44, 108],
          ].map(([x, y], pointIndex) => (
            <circle
              key={`${x}-${y}`}
              cx={x + (index % 2 ? 3 : 0)}
              cy={y}
              r={pointIndex % 4 === 0 ? 5 : 3}
              className="featured-work__art-node"
            />
          ))}
          <circle cx="131" cy="125" r="28" className="featured-work__art-core" />
        </>
      )}
      {item.artwork === 'gesture' && (
        <>
          <path
            d="M31 49h178M31 211h178M47 32v196M193 32v196"
            className="featured-work__art-gridline"
          />
          <circle cx="120" cy="121" r="62" className="featured-work__art-ring" />
          <circle cx="120" cy="121" r="45" className="featured-work__art-ring-inner" />
          <path d="M120 59v124M58 121h124" className="featured-work__art-cross" />
          <text x="120" y="130" textAnchor="middle" className="featured-work__art-number">
            1 + 2
          </text>
          <circle cx="120" cy="121" r="5" className="featured-work__art-center" />
          <path d="m155 184 35 19m-109-17-28 17" className="featured-work__art-line" />
        </>
      )}
      <text x="24" y="243" className="featured-work__art-caption">
        FIELD STUDY / 0{index + 1}
      </text>
    </svg>
  );
}

function FeaturedWorkPanel({ item, index }: { item: FeaturedWorkItem; index: number }) {
  return (
    <li
      className="featured-work__item"
      data-featured-item
      style={{ '--work-index': index } as CSSProperties}
    >
      <article className={`featured-work__panel featured-work__panel--${item.artwork}`}>
        <div className="featured-work__paper-topline">
          <p>
            Featured work <span> / 0{index + 1}</span>
          </p>
          <p>{item.category}</p>
        </div>
        <div className="featured-work__intro">
          <div className="featured-work__title-block">
            <h3>{item.title}</h3>
          </div>
          <p className="featured-work__year">
            {item.year}
            <span> / 0{index + 1}</span>
          </p>
        </div>

        <div className="featured-work__body">
          <div className="featured-work__details">
            <p className="featured-work__description">{item.description}</p>
            <ul className="featured-work__disciplines" aria-label="Project disciplines">
              {item.disciplines.map((discipline) => (
                <li key={discipline}>{discipline}</li>
              ))}
            </ul>
            <a
              className="featured-work__project-link"
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              View project <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>

          <div className="featured-work__art-grid">
            {[0, 1, 2].map((artIndex) => (
              <figure className="featured-work__figure" key={artIndex}>
                <WorkArtwork item={item} index={artIndex + index * 3} />
              </figure>
            ))}
          </div>
        </div>

        <span className="featured-work__tape" aria-hidden="true" />
      </article>
    </li>
  );
}

export default function FeaturedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return;

    const items = Array.from(section.querySelectorAll<HTMLElement>('[data-featured-item]'));
    const transitions = Math.max(0, items.length - 1);
    const header = section.querySelector<HTMLElement>('.featured-work__header');
    const stageStart =
      section.getBoundingClientRect().top +
      window.scrollY +
      (header
        ? header.offsetTop +
          header.offsetHeight +
          (Number.parseFloat(window.getComputedStyle(header).marginBottom) || 0)
        : stage.offsetTop);
    const navHeight =
      Number.parseFloat(
        window.getComputedStyle(document.documentElement).getPropertyValue('--nav-h')
      ) || 0;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    section.style.setProperty('--work-transitions', String(transitions));

    let frame = 0;
    const clearTransforms = () => {
      items.forEach((item) => {
        item.style.removeProperty('--card-x');
        item.style.removeProperty('--card-y');
        item.style.removeProperty('--card-angle');
        item.style.removeProperty('--card-scale');
        item.style.removeProperty('--card-opacity');
        item.style.removeProperty('z-index');
        item.classList.remove('is-current');
      });
    };

    const updateCards = () => {
      frame = 0;
      if (reducedMotion.matches) return;

      const progress = Math.min(
        transitions,
        Math.max(0, (window.scrollY - (stageStart - navHeight)) / Math.max(window.innerHeight, 1))
      );
      const currentIndex = Math.min(items.length - 1, Math.floor(progress + 0.5));
      const cardHeight = items[0]?.getBoundingClientRect().height ?? window.innerHeight;

      items.forEach((item, index) => {
        const distance = index - progress;
        const ahead = Math.min(2, Math.max(0, distance));
        const passed = Math.max(0, -distance);
        const direction = index % 2 === 0 ? -1 : 1;
        const x = direction * (2 + ahead * 2);
        const y = ahead * 34 - passed * cardHeight * 1.12;
        const angle = direction * (0.65 + ahead * 0.15 + Math.min(1, passed) * 1.15);
        const scale = 1 - ahead * 0.025 - Math.min(1, passed) * 0.08;
        const opacity = Math.max(0.38, 1 - Math.max(0, passed - 0.25) * 0.72);

        item.style.setProperty('--card-x', `${x.toFixed(1)}px`);
        item.style.setProperty('--card-y', `${y.toFixed(1)}px`);
        item.style.setProperty('--card-angle', `${angle.toFixed(2)}deg`);
        item.style.setProperty('--card-scale', scale.toFixed(4));
        item.style.setProperty('--card-opacity', opacity.toFixed(3));
        item.style.zIndex = String(index < currentIndex ? 10 + index : 100 - index);
        item.classList.toggle('is-current', index === currentIndex);
      });
    };

    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateCards);
    };
    const updateMotionPreference = () => {
      if (reducedMotion.matches) {
        if (frame) window.cancelAnimationFrame(frame);
        frame = 0;
        clearTransforms();
      } else {
        scheduleUpdate();
      }
    };

    const focusHandlers = items.map((item, index) => {
      const handleFocus = () => {
        if (reducedMotion.matches || item.classList.contains('is-current')) return;
        window.scrollTo({
          top: stageStart - navHeight + index * window.innerHeight,
          behavior: 'smooth',
        });
      };
      item.addEventListener('focusin', handleFocus);
      return () => item.removeEventListener('focusin', handleFocus);
    });

    updateMotionPreference();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    reducedMotion.addEventListener('change', updateMotionPreference);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      reducedMotion.removeEventListener('change', updateMotionPreference);
      focusHandlers.forEach((removeHandler) => removeHandler());
    };
  }, []);

  return (
    <section
      id="featured-work"
      className="featured-work-section"
      ref={sectionRef}
      aria-labelledby="featured-work-title"
    >
      <div className="content-shell">
        <header className="featured-work__header">
          <div>
            <p className="eyebrow">02 / Featured Work</p>
            <h2 className="sec-head" id="featured-work-title">
              Selected work
            </h2>
          </div>
          <a className="featured-work__all-link" href="#projects">
            See all works <ArrowDownRight size={17} aria-hidden="true" />
          </a>
        </header>

        <div className="featured-work__stage" ref={stageRef}>
          <ol className="featured-work__list">
            {WORK_ITEMS.map((item, index) => (
              <FeaturedWorkPanel item={item} index={index} key={item.title} />
            ))}
          </ol>
        </div>
        <div className="featured-work__runway" aria-hidden="true" />
      </div>
    </section>
  );
}
