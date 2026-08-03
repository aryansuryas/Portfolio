'use client';
import React, { useEffect, useRef } from 'react';

interface AchievementItem {
  id: string;
  category: string;
  badge: string;
  title: string;
  description: string;
  dateOrIssuer: string;
}

const ACHIEVEMENTS: AchievementItem[] = [
  {
    id: 'nptel-java',
    category: 'Certification',
    badge: 'NPTEL / IIT',
    title: 'NPTEL Certified — Programming in Java',
    description:
      'Completed the official NPTEL certification course in Java Programming with high academic distinction, mastering core OOP principles, multithreading, and collections.',
    dateOrIssuer: 'NPTEL / IIT',
  },
  {
    id: 'oracle-oci',
    category: 'Cloud Systems',
    badge: 'Oracle',
    title: 'Oracle Cloud Infrastructure (OCI) Certified',
    description:
      'Certified in Oracle Cloud Infrastructure administration, cloud service deployment, networking architectures, and IAM security controls.',
    dateOrIssuer: 'Oracle Cloud',
  },
  {
    id: 'google-genai',
    category: 'Artificial Intelligence',
    badge: 'Google',
    title: 'Google Generative AI Fundamentals',
    description:
      'Certified in Large Language Models (LLMs), prompt engineering strategies, and generative AI application architectures.',
    dateOrIssuer: 'Google Cloud',
  },
  {
    id: 'achievement-slot-4',
    category: 'Achievement',
    badge: 'Honors / Cert',
    title: 'Technical Distinction & Hackathon Achievement',
    description:
      'Recognized for outstanding technical performance and self-directed project execution across full-stack and AI systems development.',
    dateOrIssuer: 'DSU / Industry',
  },
  {
    id: 'achievement-slot-5',
    category: 'Achievement',
    badge: 'Academic / Tech',
    title: 'Academic Excellence & Project Showcase',
    description:
      'Demonstrated high performance in core Computer Science subjects including Data Structures & Algorithms, Systems Programming, and Web Engineering.',
    dateOrIssuer: 'Bengaluru, IN',
  },
];

export default function AchievementsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            entry.target.classList.remove('reveal-hidden');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -20px 0px' }
    );
    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="achievements"
      ref={sectionRef}
      className="relative"
      style={{ paddingBlock: 'clamp(4rem, 8vw, 7rem)' }}
    >
      <div className="px-[var(--edge)]" style={{ maxWidth: 'var(--container)', margin: '0 auto' }}>
        {/* Header */}
        <div className="flex flex-col gap-2 mb-10">
          <div className="flex items-center gap-3">
            <div className="section-divider" />
            <span
              className="text-xs uppercase tracking-[0.12em] font-semibold"
              style={{ fontFamily: 'var(--font-mono), monospace', color: 'var(--wine)' }}
            >
              04 / Achievements
            </span>
          </div>
          <h2 className="sec-head" style={{ color: 'var(--ink)' }}>
            Key Achievements & Certifications
          </h2>
        </div>

        {/* Achievements List */}
        <div style={{ borderTop: '1px solid var(--paper-line)' }}>
          {ACHIEVEMENTS.map((item, i) => (
            <article
              key={item.id}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              className="reveal-hidden relative transition-all duration-300 hover:bg-[rgba(122,18,32,0.02)]"
              style={{
                borderBottom: '1px solid var(--paper-line)',
                padding: '1.75rem 0',
                transitionDelay: `${i * 80}ms`,
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-3 md:gap-6 items-start">
                {/* Left Tag / Badge - tight spacing */}
                <div className="flex flex-col gap-1 text-left">
                  <span
                    className="inline-block text-[11px] font-semibold uppercase tracking-wider"
                    style={{
                      fontFamily: 'var(--font-mono), monospace',
                      color: 'var(--wine)',
                    }}
                  >
                    {item.badge}
                  </span>
                  <span
                    className="text-[11px] uppercase tracking-wider"
                    style={{
                      fontFamily: 'var(--font-mono), monospace',
                      color: 'var(--ink-faint)',
                    }}
                  >
                    {item.category}
                  </span>
                </div>

                {/* Right Content - Title & Details */}
                <div className="text-left">
                  <h3
                    className="mb-1.5"
                    style={{
                      fontFamily: 'var(--font-fraunces), serif',
                      fontSize: 'clamp(1.15rem, 1.8vw, 1.45rem)',
                      fontWeight: 600,
                      letterSpacing: '-0.01em',
                      lineHeight: 1.25,
                      color: 'var(--ink)',
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '0.92rem',
                      color: 'var(--ink-soft)',
                      lineHeight: 1.6,
                      maxWidth: '65ch',
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
