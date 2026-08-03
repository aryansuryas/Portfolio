'use client';
import React, { useRef, useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';

const SOCIAL_NAV_LINKS = [
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/aryansuryas',
    hoverColor: '#0077B5',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: 'Stack Overflow',
    href: 'https://stackoverflow.com/users/aryansuryas',
    hoverColor: '#F48024',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M15.725 0l-1.72 1.277 6.39 8.588 1.716-1.277L15.725 0zm-3.94 3.418l-1.369 1.644 8.225 6.85 1.369-1.644-8.225-6.85zm-3.15 4.465l-.905 1.94 9.702 4.517.904-1.94-9.701-4.517zm-1.85 4.86l-.44 2.093 10.473 2.201.44-2.092-10.473-2.203zM1.89 15.47V24h19.19v-8.53h-2.133v6.397H4.021v-6.396H1.89zm4.265 2.133v2.13h10.66v-2.13H6.154Z" />
      </svg>
    ),
  },
  {
    name: 'GitHub',
    href: 'https://github.com/aryansuryas',
    hoverColor: '#000000',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    name: 'Email',
    href: 'mailto:aryansuryas@gmail.com',
    hoverColor: '#EA4335',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 010 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com/@CassgTechi',
    hoverColor: '#FF0000',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.508a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.003 3.003 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Controlled form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

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

  useEffect(() => {
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    if (publicKey) {
      emailjs.init(publicKey);
    }
  }, []);

  // Input sanitization helper function
  const sanitizeInput = (input: string): string => {
    return input
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<[^>]+>/g, '')
      .trim();
  };

  // Honeypot & spam protection states
  const [honeypot, setHoneypot] = useState('');
  const [mountTime] = useState<number>(() => Date.now());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Spam Protection Check 1: Honeypot field must remain empty
    if (honeypot.trim().length > 0) {
      // Bot detected: simulate success without sending email
      setSubmitted(true);
      return;
    }

    // Spam Protection Check 2: Minimum submission time (1.5 seconds)
    if (Date.now() - mountTime < 1500) {
      setSubmitted(true);
      return;
    }

    // Spam Protection Check 3: Rate Limiting Cooldown (60 seconds)
    const lastSubmission =
      typeof window !== 'undefined' ? localStorage.getItem('last_submission_time') : null;
    if (lastSubmission && Date.now() - parseInt(lastSubmission, 10) < 60000) {
      setError('Please wait a minute before transmitting another signal.');
      return;
    }

    if (!isEmailValid) {
      setEmailTouched(true);
      return;
    }

    // Sanitize user inputs
    const cleanName = sanitizeInput(name);
    const cleanEmail = sanitizeInput(email);
    const cleanMessage = sanitizeInput(message);

    if (!cleanName || !cleanEmail || !cleanMessage) {
      setError('Please fill in all required fields.');
      return;
    }

    setIsSending(true);
    setError(null);

    const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceID || !templateID || !publicKey) {
      setIsSending(false);
      setError('Contact service is not configured. Please reach out directly via email.');
      return;
    }

    const templateParams = {
      from_name: cleanName,
      name: cleanName,
      user_name: cleanName,
      from_email: cleanEmail,
      email: cleanEmail,
      user_email: cleanEmail,
      message: cleanMessage,
      description: cleanMessage,
      notes: cleanMessage,
    };

    emailjs.send(serviceID, templateID, templateParams, publicKey).then(
      () => {
        setIsSending(false);
        setSubmitted(true);
        setName('');
        setEmail('');
        setMessage('');
        setEmailTouched(false);
        if (typeof window !== 'undefined') {
          localStorage.setItem('last_submission_time', Date.now().toString());
        }
      },
      () => {
        setIsSending(false);
        setError('Failed to transmit signal. Please try again later or send an email directly.');
      }
    );
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative reveal-hidden"
      style={{ paddingBlock: 'clamp(5rem, 10vw, 9rem)' }}
    >
      <div className="px-[var(--edge)]" style={{ maxWidth: 'var(--container)', margin: '0 auto' }}>
        {/* Header with top-right Availability Badge */}
        <div className="flex flex-col gap-3 mb-12">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="section-divider" style={{ margin: 0 }} />
              <span
                className="text-xs uppercase tracking-[0.15em] font-semibold"
                style={{ fontFamily: 'var(--font-mono), monospace', color: 'var(--wine)' }}
              >
                07 / Contact
              </span>
            </div>
            {/* Availability badge */}
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full"
              style={{
                background: 'rgba(34, 197, 94, 0.08)',
                border: '1px solid rgba(34, 197, 94, 0.25)',
              }}
            >
              <span
                className="w-2.5 h-2.5 rounded-full animate-pulse"
                style={{ background: '#22c55e', display: 'block' }}
              />
              <span
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ fontFamily: 'var(--font-mono), monospace', color: '#166534' }}
              >
                Available for work
              </span>
            </div>
          </div>
          <h2
            className="sec-head"
            style={{ color: 'var(--ink)', margin: 0, textWrap: 'balance', wordBreak: 'keep-all' }}
          >
            Let&apos;s Build Something
          </h2>
        </div>

        {/* Two-column layout */}
        <div
          className="grid gap-12 lg:gap-16 items-start"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}
        >
          {/* Left — info block */}
          <div>
            <p
              className="mb-8 leading-relaxed"
              style={{
                fontSize: '1.1rem',
                color: 'var(--ink-soft)',
                fontWeight: 300,
                maxWidth: '40ch',
              }}
            >
              Currently open to internships, freelance projects, and interesting collaborations.
              Response time: under 24 hours.
            </p>

            {/* Embedded Larger Social Navigation Icons */}
            <div className="flex flex-wrap items-center gap-4 mt-6">
              {SOCIAL_NAV_LINKS.map((link, index) => {
                const isHovered = hoveredIndex === index;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target={link.href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noreferrer noopener"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '52px',
                      height: '52px',
                      borderRadius: '50%',
                      border: isHovered
                        ? `1px solid ${link.hoverColor}`
                        : '1px solid var(--paper-line)',
                      background: isHovered ? link.hoverColor : 'rgba(251, 247, 236, 0.85)',
                      color: isHovered ? '#ffffff' : 'var(--ink-soft)',
                      boxShadow: isHovered
                        ? `0 10px 22px ${link.hoverColor}40`
                        : '0 4px 12px rgba(30, 25, 18, 0.02)',
                      cursor: 'pointer',
                      transform: isHovered
                        ? 'scale(1.15) translateY(-4px)'
                        : 'scale(1) translateY(0)',
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                    title={link.name}
                  >
                    {link.icon}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right — form without outer card border */}
          <div className="animate-levitate">
            {submitted ? (
              <div className="py-8 text-left">
                <div className="text-4xl mb-4 text-emerald-600">✓</div>
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
                  I&apos;ll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-8 text-left">
                {/* Honeypot field — hidden from real users, tricks spam bots */}
                <div style={{ display: 'none' }} aria-hidden="true">
                  <label htmlFor="website">Do not fill this out if you are human</label>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    tabIndex={-1}
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    autoComplete="off"
                  />
                </div>
                {/* Name + Email row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-2 text-left">
                    <label
                      className="text-xs uppercase tracking-[0.12em] font-semibold"
                      style={{ fontFamily: 'var(--font-mono), monospace', color: 'var(--brass)' }}
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="from_name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g., Jane Doe"
                      maxLength={100}
                      required
                      suppressHydrationWarning
                      className="input-underline"
                    />
                  </div>
                  <div className="flex flex-col gap-2 text-left">
                    <label
                      className="text-xs uppercase tracking-[0.12em] font-semibold"
                      style={{ fontFamily: 'var(--font-mono), monospace', color: 'var(--brass)' }}
                    >
                      Electronic Address
                    </label>
                    <div className="relative flex items-center w-full">
                      <input
                        type="email"
                        name="from_email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (!emailTouched) setEmailTouched(true);
                        }}
                        onBlur={() => setEmailTouched(true)}
                        placeholder="e.g., jane@company.com"
                        maxLength={100}
                        required
                        suppressHydrationWarning
                        className="input-underline w-full min-w-0 pr-12"
                        style={{
                          paddingRight: '2.75rem',
                          borderBottomColor: email
                            ? isEmailValid
                              ? '#22c55e'
                              : emailTouched
                                ? '#ef4444'
                                : 'var(--ink-faint)'
                            : 'var(--ink-faint)',
                        }}
                      />
                      {email && (
                        <span className="pointer-events-none absolute right-0 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center">
                          {isEmailValid ? (
                            <svg
                              className="h-4 w-4 text-emerald-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              strokeWidth="2.5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          ) : (
                            emailTouched && (
                              <svg
                                className="h-4 w-4 text-red-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                strokeWidth="2.5"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            )
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Message / Description */}
                <div className="flex flex-col gap-2 text-left">
                  <label
                    className="text-xs uppercase tracking-[0.12em] font-semibold"
                    style={{ fontFamily: 'var(--font-mono), monospace', color: 'var(--brass)' }}
                  >
                    Project Scope & Requirements
                  </label>
                  <textarea
                    rows={4}
                    name="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Detail your technical ambitions, project scope, or questions..."
                    maxLength={2000}
                    required
                    suppressHydrationWarning
                    className="input-underline resize-none leading-relaxed"
                  />
                </div>

                {/* Submit button aligned to left */}
                <button
                  type="submit"
                  disabled={isSending}
                  suppressHydrationWarning
                  className="magnetic-btn self-start inline-flex items-center gap-3 px-8 py-3.5 rounded-lg font-semibold text-sm uppercase tracking-[0.06em] transition-all duration-300"
                  style={{
                    background: isSending ? 'var(--ink-soft)' : 'var(--wine)',
                    color: 'var(--paper)',
                    cursor: isSending ? 'not-allowed' : 'pointer',
                    opacity: isSending ? 0.7 : 1,
                  }}
                  onMouseEnter={(e) => {
                    if (isSending) return;
                    (e.currentTarget as HTMLElement).style.background = 'var(--wine-dark)';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      '0 10px 20px var(--wine-glow)';
                  }}
                  onMouseLeave={(e) => {
                    if (isSending) return;
                    (e.currentTarget as HTMLElement).style.background = 'var(--wine)';
                    (e.currentTarget as HTMLElement).style.transform = '';
                    (e.currentTarget as HTMLElement).style.boxShadow = '';
                  }}
                >
                  {isSending ? 'Transmitting Signal...' : 'Transmit Signal'}
                  <span className="text-base">→</span>
                </button>

                {error && (
                  <p
                    style={{
                      color: '#ef4444',
                      fontSize: '0.88rem',
                      fontWeight: 500,
                    }}
                  >
                    {error}
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
