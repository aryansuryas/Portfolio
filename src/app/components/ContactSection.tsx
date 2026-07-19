'use client';
import React, { useRef, useEffect, useState } from 'react';

const SOCIAL_NAV_LINKS = [
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/aryansuryas',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    )
  },
  {
    name: 'Stack Overflow',
    href: 'https://stackoverflow.com/users/aryansuryas',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M15.725 0l-1.72 1.277 6.39 8.588 1.716-1.277L15.725 0zm-3.94 3.418l-1.369 1.644 8.225 6.85 1.369-1.644-8.225-6.85zm-3.15 4.465l-.905 1.94 9.702 4.517.904-1.94-9.701-4.517zm-1.85 4.86l-.44 2.093 10.473 2.201.44-2.092-10.473-2.203zM1.89 15.47V24h19.19v-8.53h-2.133v6.397H4.021v-6.396H1.89zm4.265 2.133v2.13h10.66v-2.13H6.154Z"/>
      </svg>
    )
  },
  {
    name: 'GitHub',
    href: 'https://github.com/aryansuryas',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
      </svg>
    )
  },
  {
    name: 'Email',
    href: 'mailto:aryansuryas@gmail.com',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 010 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
      </svg>
    )
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com/@CassgTechi',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.508a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.003 3.003 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    )
  }
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative reveal-hidden"
      style={{ paddingBlock: 'clamp(5rem, 10vw, 9rem)' }}
    >
      <div
        className="px-[var(--edge)]"
        style={{ maxWidth: 'var(--container)', margin: '0 auto' }}
      >
        {/* Header */}
        <div className="flex flex-col gap-2 mb-12">
          <div className="flex items-center gap-3">
            <div className="section-divider" />
            <span
              className="text-xs uppercase tracking-[0.1em]"
              style={{ fontFamily: 'var(--font-mono), monospace', color: 'var(--wine)' }}
            >
              05 / Contact
            </span>
          </div>
          <h2 className="sec-head" style={{ color: 'var(--ink)' }}>
            Let&apos;s Build Something
          </h2>
        </div>

        {/* Two-column layout */}
        <div
          className="grid gap-16 items-start"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}
        >
          {/* Left — info block */}
          <div>
            <p
              className="mb-8 leading-relaxed"
              style={{ fontSize: '1.1rem', color: 'var(--ink-soft)', fontWeight: 300, maxWidth: '40ch' }}
            >
              Currently open to internships, freelance projects, and interesting
              collaborations. Response time: under 24 hours.
            </p>

            {/* Availability badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
              style={{
                background: 'rgba(30, 25, 18, 0.04)',
                border: '1px solid var(--paper-line)',
              }}
            >
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: '#22c55e', display: 'block' }}
              />
              <span
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ fontFamily: 'var(--font-mono), monospace', color: 'var(--ink-soft)' }}
              >
                Available for work
              </span>
            </div>

            {/* Social navigation bar */}
            <div
              className="flex flex-wrap gap-2.5 p-2.5 rounded-xl mt-4"
              style={{
                background: 'rgba(30, 25, 18, 0.03)',
                border: '1px solid var(--paper-line)',
                maxWidth: 'fit-content'
              }}
            >
              {SOCIAL_NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target={link.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noreferrer noopener"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-lg border transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-sm"
                  style={{
                    background: 'var(--paper)',
                    borderColor: 'var(--paper-line)',
                    color: 'var(--ink)',
                    fontSize: '0.825rem',
                    fontWeight: 600,
                  }}
                >
                  <span style={{ color: 'var(--wine)' }}>{link.icon}</span>
                  <span>{link.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Right — form with levitation effect */}
          <div className="animate-levitate">
            {submitted ? (
              <div
                className="p-10 rounded-xl text-center"
                style={{
                  background: 'var(--paper-panel)',
                  border: '1px solid var(--paper-line)',
                }}
              >
                <div className="text-4xl mb-4">✓</div>
                <h3
                  className="mb-2"
                  style={{
                    fontFamily: 'var(--font-fraunces), serif',
                    fontSize: '1.5rem',
                    color: 'var(--ink)',
                  }}
                >
                  Signal Transmitted
                </h3>
                <p style={{ color: 'var(--ink-soft)', fontSize: '0.95rem' }}>
                  I'll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                {/* Name + Email row */}
                <div
                  className="grid gap-8"
                  style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}
                >
                  <div className="flex flex-col gap-2">
                    <label
                      className="text-xs uppercase tracking-[0.1em]"
                      style={{ fontFamily: 'var(--font-mono), monospace', color: 'var(--brass)' }}
                    >
                      Designation Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Jane Doe"
                      required
                      className="input-underline"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      className="text-xs uppercase tracking-[0.1em]"
                      style={{ fontFamily: 'var(--font-mono), monospace', color: 'var(--brass)' }}
                    >
                      Electronic Address
                    </label>
                    <input
                      type="email"
                      placeholder="e.g., jane@company.com"
                      required
                      className="input-underline"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label
                    className="text-xs uppercase tracking-[0.1em]"
                    style={{ fontFamily: 'var(--font-mono), monospace', color: 'var(--brass)' }}
                  >
                    Project Scope & Requirements
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Detail the technical ambitions..."
                    className="input-underline resize-none"
                    style={{ resize: 'none' }}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="magnetic-btn self-start inline-flex items-center gap-3 px-9 py-4 rounded font-semibold text-sm uppercase tracking-[0.05em] transition-all duration-300"
                  style={{ background: 'var(--wine)', color: 'var(--paper)' }}
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
                  Transmit Signal
                  <span>→</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}