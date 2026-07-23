'use client';
import React, { useState, useEffect, useRef } from 'react';

interface SocialLink {
  name: string;
  href: string;
  brandColor: string;
  textColor: string;
  svg: React.ReactNode;
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/aryansuryas',
    brandColor: '#0077B5',
    textColor: '#ffffff',
    svg: (
      <svg width="18" height="18" viewBox="0 0 32 32" fill="currentColor">
        <path
          d="M26.111,3H5.889c-1.595,0-2.889,1.293-2.889,2.889V26.111c0,1.595,1.293,2.889,2.889,2.889H26.111c1.595,0,2.889-1.293,2.889-2.889V5.889c0-1.595-1.293-2.889-2.889-2.889ZM10.861,25.389h-3.877V12.87h3.877v12.519Zm-1.957-14.158c-1.267,0-2.293-1.034-2.293-2.31s1.026-2.31,2.293-2.31,2.292,1.034,2.292,2.31-1.026,2.31-2.292,2.31Zm16.485,14.158h-3.858v-6.571c0-1.802-.685-2.809-2.111-2.809-1.551,0-2.362,1.048-2.362,2.809v6.571h-3.718V12.87h3.718v1.686s1.118-2.069,3.775-2.069,4.556,1.621,4.556,4.975v7.926Z"
          fillRule="evenodd"
        ></path>
      </svg>
    ),
  },
  {
    name: 'GitHub',
    href: 'https://github.com/aryansuryas',
    brandColor: '#000000',
    textColor: '#ffffff',
    svg: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"></path>
      </svg>
    ),
  },
  {
    name: 'Stack Overflow',
    href: 'https://stackoverflow.com/users/aryansuryas',
    brandColor: '#F48024',
    textColor: '#ffffff',
    svg: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M15.725 0l-1.72 1.277 6.39 8.588 1.716-1.277L15.725 0zm-3.94 3.418l-1.369 1.644 8.225 6.85 1.369-1.644-8.225-6.85zm-3.15 4.465l-.905 1.94 9.702 4.517.904-1.94-9.701-4.517zm-1.85 4.86l-.44 2.093 10.473 2.201.44-2.092-10.473-2.203zM1.89 15.47V24h19.19v-8.53h-2.133v6.397H4.021v-6.396H1.89zm4.265 2.133v2.13h10.66v-2.13H6.154Z"></path>
      </svg>
    ),
  },
  {
    name: 'Email',
    href: 'mailto:aryansuryas@gmail.com',
    brandColor: '#EA4335',
    textColor: '#ffffff',
    svg: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com',
    brandColor: '#FF0000',
    textColor: '#ffffff',
    svg: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.107C19.53 3.545 12 3.545 12 3.545s-7.53 0-9.388.511a3.003 3.003 0 0 0-2.11 2.107C0 8.021 0 12 0 12s0 3.979.502 5.837a3.003 3.003 0 0 0 2.11 2.107C4.47 20.455 12 20.455 12 20.455s7.53 0 9.388-.511a3.003 3.003 0 0 0 2.11-2.107C24 15.979 24 12 24 12s0-3.979-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"></path>
      </svg>
    ),
  },
  {
    name: 'X',
    href: 'https://x.com',
    brandColor: '#000000',
    textColor: '#ffffff',
    svg: (
      <svg width="18" height="15" viewBox="0 0 300 271" fill="currentColor">
        <path d="m236 0h46l-101 115 118 156h-92.6l-72.5-94.8-83 94.8h-46l107-123-113-148h94.9l65.5 86.6zm-16.1 244h25.5l-165-218h-27.4z"></path>
      </svg>
    ),
  },
  {
    name: 'Reddit',
    href: 'https://reddit.com/user/aryansuryas',
    brandColor: '#FF4500',
    textColor: '#ffffff',
    svg: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"></path>
      </svg>
    ),
  },
  {
    name: 'Google',
    href: 'https://google.com',
    brandColor: '#4285F4',
    textColor: '#ffffff',
    svg: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114A5.519 5.519 0 0 1 8.5 13a5.519 5.519 0 0 1 5.49-5.518c2.4 0 4.162 1.09 4.974 1.87l3.226-3.22c-2.1-1.96-5.023-3.132-8.2-3.132C7.3 3.002 3 7.302 3 13s4.3 9.998 10.99 9.998c6.98 0 10.985-4.91 10.985-10.986 0-.675-.06-1.3-.175-1.727H12.24z"></path>
      </svg>
    ),
  },
  {
    name: 'MetaMask',
    href: 'https://metamask.io',
    brandColor: '#F6851B',
    textColor: '#ffffff',
    svg: (
      <svg width="18" height="18" viewBox="0 0 32 32" fill="currentColor">
        <path d="M30 15.3l-1.3-4.5-9.3-3.6 1.8-3.5 10.8 11.6zM2 15.3l1.3-4.5 9.3-3.6-1.8-3.5L0 15.3zM25.7 24.3l-3.3 5.1 7.1 2 2-6.9-5.8-.2zm-19.4 0l3.3 5.1-7.1 2-2-6.9 5.8-.2z"></path>
      </svg>
    ),
  },
];

export default function SocialSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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
      id="social"
      ref={sectionRef}
      className="relative reveal-hidden"
      style={{ paddingBlock: 'clamp(4rem, 8vw, 7rem)' }}
    >
      <div className="px-[var(--edge)]" style={{ maxWidth: 'var(--container)', margin: '0 auto' }}>
        {/* Header */}
        <div className="flex flex-col gap-2 mb-10">
          <div className="flex items-center gap-3">
            <div className="section-divider" />
            <span
              className="text-xs uppercase tracking-[0.1em]"
              style={{ fontFamily: 'var(--font-mono-ibm), monospace', color: 'var(--wine)' }}
            >
              06 / Connect
            </span>
          </div>
          <h2 className="sec-head" style={{ color: 'var(--ink)' }}>
            Find Me Online
          </h2>
        </div>

        {/* Social connections panel wrapper */}
        <div
          style={{
            background: 'var(--paper-panel)',
            border: '1px solid var(--paper-line)',
            borderRadius: '24px',
            padding: '2.2rem 2.5rem',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1.2rem',
            justifyContent: 'center',
            alignItems: 'center',
            maxWidth: '900px',
            margin: '0 auto',
            boxShadow: '0 8px 32px rgba(30, 25, 18, 0.04)',
          }}
        >
          {SOCIAL_LINKS.map((social, index) => {
            const isHovered = hoveredIndex === index;
            return (
              <a
                key={social.name}
                href={social.href}
                target={social.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noreferrer noopener"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.8rem 1.6rem',
                  borderRadius: '999px',
                  border: isHovered
                    ? `1px solid ${social.brandColor}`
                    : '1px solid var(--paper-line)',
                  background: isHovered ? social.brandColor : 'rgba(251, 247, 236, 0.9)',
                  color: isHovered ? social.textColor : 'var(--ink)',
                  fontWeight: 600,
                  fontSize: '0.92rem',
                  letterSpacing: '0.02em',
                  textDecoration: 'none',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  cursor: 'pointer',
                  transform: isHovered ? 'scale(1.08) translateY(-2px)' : 'none',
                  boxShadow: isHovered ? `0 10px 24px ${social.brandColor}2b` : 'none',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {social.svg}
                </div>
                <span>{social.name}</span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
