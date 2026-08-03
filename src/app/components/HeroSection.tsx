'use client';
import React, { useEffect, useRef } from 'react';
import VariableFontHoverByLetter from './VariableFontHoverByLetter';

export default function HeroSection() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (contentRef.current) {
        contentRef.current.classList.add('reveal-visible');
        contentRef.current.classList.remove('reveal-hidden');
      }
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  // Magnetic effect only for "Get In Touch" button
  const handleMagneticMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
    btn.style.transform = `translate(${x}px, ${y}px)`;
  };

  const handleMagneticLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.transform = 'translate(0, 0)';
  };

  return (
    <section
      className="relative flex items-center min-h-screen hero-section"
      style={{ paddingTop: 'calc(var(--nav-h) + 3rem)', paddingBottom: '4rem' }}
    >
      <div
        className="w-full px-[var(--edge)]"
        style={{ maxWidth: 'var(--container)', margin: '0 auto' }}
      >
        <div ref={contentRef} className="max-w-[720px] reveal-hidden hero-copy">
          {/* Big bold uppercase name */}
          <h1 className="hero-name" style={{ display: 'block', minHeight: '1.2em' }}>
            <VariableFontHoverByLetter
              label="ARYAN SURYA S"
              fromWeight={400}
              toWeight={900}
              fontSize="clamp(3.8rem, 10vw, 8.5rem)"
              color="var(--ink)"
              staggerDuration={30}
              staggerFrom="random"
            />
          </h1>

          {/* Subtitle with pipe separators — dark font */}
          <div
            className="flex flex-wrap items-center gap-0 mb-8"
            style={{
              fontFamily: 'var(--font-mono-ibm), monospace',
              fontSize: 'clamp(0.75rem, 1.5vw, 0.95rem)',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--ink)',
            }}
          >
            <span>AI Builder</span>
            <span style={{ margin: '0 0.75rem', color: 'var(--ink-soft)' }}>|</span>
            <span>MASTERING DSA</span>
            <span style={{ margin: '0 0.75rem', color: 'var(--ink-soft)' }}>|</span>
            <span>CSE Student</span>
          </div>

          {/* Description */}
          <p
            className="mb-10"
            style={{
              fontSize: '1.1rem',
              lineHeight: 1.7,
              color: 'var(--ink-soft)',
              fontWeight: 400,
              maxWidth: '58ch',
            }}
          >
            Full-stack developer and AI systems builder based in Bengaluru. I build fast, scalable
            products with thoughtful interfaces and dependable architecture.
          </p>

          {/* CTAs */}
          <div className="flex gap-4 flex-wrap">
            {/* Resume — Direct download / open document */}
            <a
              href="/Aryan_Surya_S_Resume.pdf"
              download="Aryan_Surya_S_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-9 py-4 rounded font-semibold text-sm uppercase tracking-[0.05em] transition-all duration-300"
              style={{
                background: 'var(--wine)',
                color: 'var(--paper)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'var(--wine-dark)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 10px 20px var(--wine-glow)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'var(--wine)';
                (e.currentTarget as HTMLElement).style.transform = '';
                (e.currentTarget as HTMLElement).style.boxShadow = '';
              }}
            >
              Download Resume / CV
              <span>↓</span>
            </a>

            {/* Get In Touch — magnetic cursor follow */}
            <a
              href="#contact"
              className="magnetic-btn inline-flex items-center gap-3 px-9 py-4 rounded font-semibold text-sm uppercase tracking-[0.05em] transition-all duration-300"
              style={{
                border: '1px solid var(--ink)',
                color: 'var(--ink)',
              }}
              onMouseMove={handleMagneticMove}
              onMouseLeave={(e) => {
                handleMagneticLeave(e);
                (e.currentTarget as HTMLElement).style.background = 'transparent';
                (e.currentTarget as HTMLElement).style.color = 'var(--ink)';
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'var(--ink)';
                (e.currentTarget as HTMLElement).style.color = 'var(--paper)';
              }}
            >
              Get In Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
