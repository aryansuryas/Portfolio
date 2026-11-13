'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface ProfileCard {
  title: string;
  meta: string;
  handle?: string;
  description: string;
  href: string;
  image: string;
  imageAlt: string;
  imageAvailable: boolean;
  background: string;
  foreground: string;
  fallback: string;
}

const PROFILE_CARDS: ProfileCard[] = [
  {
    title: 'YouTube',
    meta: 'VIDEO CONTENT',
    description: 'Technology projects, experiments and creative development.',
    href: 'https://www.youtube.com/@aryansuryas',
    image: '/youtube-channel.png',
    imageAlt: 'YouTube channel artwork',
    imageAvailable: false,
    background: '#FF0000',
    foreground: '#18191D',
    fallback: 'YouTube channel artwork will appear here.',
  },
  {
    title: 'LinkedIn',
    meta: 'PROFESSIONAL NETWORK',
    description: 'Computer Science, software development and technology.',
    href: 'https://www.linkedin.com/in/aryansuryas/',
    image: '/linkedin-profile.png',
    imageAlt: 'LinkedIn profile artwork',
    imageAvailable: false,
    background: '#0077B5',
    foreground: '#FFFDF7',
    fallback: 'LinkedIn profile artwork will appear here.',
  },
  {
    title: 'LeetCode',
    meta: 'DATA STRUCTURES & ALGORITHMS',
    handle: '@aryansuryas',
    description: 'Algorithmic problem solving and competitive programming.',
    href: 'https://leetcode.com/u/aryansuryas/',
    image: '/leetcode-profile.png',
    imageAlt: 'LeetCode profile screenshot for aryansuryas',
    imageAvailable: true,
    background: '#FFC021',
    foreground: '#18191D',
    fallback: 'Add the real LeetCode screenshot at public/leetcode-profile.png.',
  },
  {
    title: 'GitHub',
    meta: 'OPEN SOURCE & PROJECTS',
    handle: 'aryansuryas',
    description: 'Selected source code and software projects.',
    href: 'https://github.com/aryansuryas',
    image: '/github-profile.png',
    imageAlt: 'GitHub profile contribution graph',
    imageAvailable: false,
    background: '#18191D',
    foreground: '#FFFDF7',
    fallback: 'GitHub profile artwork will appear here.',
  },
];

function ProfileImage({ card }: { card: ProfileCard }) {
  const [available, setAvailable] = useState(card.imageAvailable);

  if (!available) {
    return (
      <div className="profile-folder-fallback" role="img" aria-label={card.fallback}>
        <span>{card.fallback}</span>
      </div>
    );
  }

  return (
    <Image
      src={card.image}
      alt={card.imageAlt}
      width={1600}
      height={1000}
      loading="lazy"
      decoding="async"
      className="profile-folder-image"
      onError={() => setAvailable(false)}
    />
  );
}

export default function LeetCodeStickyCard() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll<HTMLElement>('.profile-folder-card');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion || !('IntersectionObserver' in window)) {
      cards.forEach((card) => card.classList.add('is-revealed'));
      return;
    }

    section.classList.add('profile-folder-section--observing');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || entry.intersectionRatio < 0.15) return;
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -12% 0px' }
    );

    cards.forEach((card) => observer.observe(card));
    return () => {
      observer.disconnect();
      section.classList.remove('profile-folder-section--observing');
    };
  }, []);

  return (
    <section
      id="leetcode"
      className="profile-folder-section"
      ref={sectionRef}
      aria-labelledby="profile-folder-heading"
    >
      <div className="content-shell">
        <header className="profile-folder-header">
          <div>
            <p className="eyebrow">04 / Profiles</p>
            <h2 className="sec-head" id="profile-folder-heading">
              Around the web
            </h2>
          </div>
          <p className="profile-folder-header-copy">
            A few places where I share projects, ideas, and the work behind them.
          </p>
        </header>
        <div className="profile-folder-stack">
          <ul className="profile-folder-list">
            {PROFILE_CARDS.map((card, index) => (
              <li
                key={card.title}
                className="profile-folder-card"
                style={
                  {
                    '--folder-index': index,
                    '--folder-background': card.background,
                    '--folder-foreground': card.foreground,
                  } as React.CSSProperties
                }
              >
                <a
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${card.title} profile in a new tab`}
                  className="profile-folder-link"
                >
                  <span className="profile-folder-tab">
                    PROFILE {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="profile-folder-content">
                    <span className="profile-folder-title-row">
                      <span className="profile-folder-title">{card.title}</span>
                      <span className="profile-folder-arrow" aria-hidden="true">
                        ↗
                      </span>
                    </span>

                    <span className="profile-folder-meta">
                      <span>{card.meta}</span>
                      {card.handle && <span>{card.handle}</span>}
                      <span>VISIT PROFILE&nbsp; →</span>
                    </span>

                    <span className="profile-folder-divider" />
                    <span className="profile-folder-image-wrap">
                      <ProfileImage card={card} />
                    </span>
                    <span className="profile-folder-description">{card.description}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
