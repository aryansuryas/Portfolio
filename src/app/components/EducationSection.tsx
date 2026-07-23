'use client';
import React, { useEffect, useRef, useState } from 'react';

interface EducationMilestone {
  year: string;
  degree: string;
  institution: string;
  score: string;
  scoreLabel: string;
  details: string;
}

const EDUCATION_HISTORY: EducationMilestone[] = [
  {
    year: '2024 - 2028',
    degree: 'Bachelor of Technology (B.Tech)',
    institution: 'Dayananda Sagar University',
    score: '8.56 CGPA',
    scoreLabel: 'Current CGPA',
    details:
      'Pursuing my engineering major in Computer Science & Engineering. Building deep competencies in Data Structures & Algorithms, Full-Stack Architectures, and LLM automation systems.',
  },
  {
    year: '2021 - 2023',
    degree: 'Pre-University College (PUC)',
    institution: 'Deeksha CFL PU College',
    score: '93%',
    scoreLabel: 'Final Percentage',
    details:
      'Completed pre-university education with a core focus on Physics, Chemistry, Mathematics, and Computer Science.',
  },
  {
    year: '2020 - 2021',
    degree: 'Secondary School Education (10th)',
    institution: 'Jain Vidyaniketan',
    score: '96.96%',
    scoreLabel: 'Board Score',
    details:
      'Completed secondary school board examinations with outstanding performance and general academic excellence.',
  },
];

export default function EducationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeHoverIndex, setActiveHoverIndex] = useState<number | null>(null);

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
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="education"
      ref={sectionRef}
      className="relative reveal-hidden"
      style={{ paddingBlock: 'clamp(5rem, 10vw, 9rem)', borderTop: '1px solid var(--paper-line)' }}
    >
      <div className="px-[var(--edge)]" style={{ maxWidth: 'var(--container)', margin: '0 auto' }}>
        {/* Header */}
        <div className="flex flex-col gap-2 mb-12">
          <div className="flex items-center gap-3">
            <div className="section-divider" style={{ marginBottom: 0 }} />
            <span
              className="text-xs uppercase tracking-[0.1em]"
              style={{ fontFamily: 'var(--font-mono), monospace', color: 'var(--wine)' }}
            >
              05 / Journey
            </span>
          </div>
          <h2 className="sec-head" style={{ color: 'var(--ink)' }}>
            Education
          </h2>
          <p
            style={{
              fontSize: '1.05rem',
              color: 'var(--ink-soft)',
              lineHeight: 1.7,
              maxWidth: '45ch',
              margin: '0.5rem 0 0 0',
            }}
          >
            My academic trajectory and qualifications. A path of continuous study, structured
            logical learning, and specialized engineering focus.
          </p>
        </div>

        {/* Destination Vertical Timeline (Placed on the left side of the section) */}
        <div className="relative pl-6 pr-2 md:pl-8 overflow-visible max-w-[850px]">
          {/* Vertical red path line */}
          <div
            style={{
              position: 'absolute',
              left: '21px', // perfectly aligned with the center of the nodes
              top: '12px',
              bottom: '12px',
              width: '4px',
              background: 'var(--wine)', // dark red/wine path
              borderRadius: '999px',
              zIndex: 0,
            }}
          />

          {/* Milestones list */}
          <div className="flex flex-col gap-10">
            {EDUCATION_HISTORY.map((item, index) => {
              const isHovered = activeHoverIndex === index;
              return (
                <div
                  key={item.institution}
                  className="relative pl-8"
                  onMouseEnter={() => setActiveHoverIndex(index)}
                  onMouseLeave={() => setActiveHoverIndex(null)}
                  style={{
                    transition: 'all 0.3s ease',
                    zIndex: 1,
                  }}
                >
                  {/* Destination Circular Node (Solid Black on Red Line) */}
                  <div
                    style={{
                      position: 'absolute',
                      left: '-2.5px', // centers the 21px circle on the 4px line
                      top: '12px',
                      width: '21px',
                      height: '21px',
                      borderRadius: '50%',
                      background: '#000000', // solid black circle
                      border: '3px solid var(--paper)',
                      boxShadow: isHovered
                        ? '0 0 0 4px var(--wine), 0 0 12px rgba(0,0,0,0.4)'
                        : '0 0 0 2px var(--wine)',
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      transform: isHovered ? 'scale(1.25)' : 'none',
                      cursor: 'pointer',
                      zIndex: 2,
                    }}
                  />

                  {/* Milestone Card */}
                  <div
                    style={{
                      background: 'var(--paper-panel)',
                      border: isHovered ? '1px solid var(--wine)' : '1px solid var(--paper-line)',
                      borderRadius: '16px',
                      padding: '1.75rem',
                      backdropFilter: 'blur(10px)',
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      transform: isHovered ? 'translateX(8px)' : 'none',
                      boxShadow: isHovered ? '0 12px 28px rgba(30,25,18,0.06)' : 'none',
                    }}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <span
                        style={{
                          fontFamily: 'var(--font-mono), monospace',
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          color: 'var(--brass)',
                          letterSpacing: '0.05em',
                        }}
                      >
                        {item.year}
                      </span>

                      {/* Score highlight badge */}
                      <div
                        style={{
                          background: 'rgba(122, 18, 32, 0.08)',
                          color: 'var(--wine)',
                          padding: '0.35rem 0.75rem',
                          borderRadius: '999px',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          letterSpacing: '0.02em',
                          border: '1px solid rgba(122, 18, 32, 0.15)',
                        }}
                      >
                        <span
                          style={{
                            fontSize: '0.7rem',
                            fontWeight: 500,
                            opacity: 0.8,
                            marginRight: '0.3rem',
                          }}
                        >
                          {item.scoreLabel}:
                        </span>
                        {item.score}
                      </div>
                    </div>

                    <h3
                      style={{
                        fontFamily: 'var(--font-fraunces), serif',
                        fontSize: '1.35rem',
                        fontWeight: 600,
                        color: 'var(--ink)',
                        margin: '0 0 0.25rem 0',
                        lineHeight: 1.2,
                      }}
                    >
                      {item.degree}
                    </h3>

                    <h4
                      style={{
                        fontSize: '0.98rem',
                        fontWeight: 500,
                        color: 'var(--wine)',
                        margin: '0 0 0.85rem 0',
                      }}
                    >
                      {item.institution}
                    </h4>

                    <p
                      style={{
                        fontSize: '0.9rem',
                        color: 'var(--ink-soft)',
                        lineHeight: 1.6,
                        margin: 0,
                      }}
                    >
                      {item.details}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
