'use client';

import React, { useEffect, useState } from 'react';
import { Download, Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeProvider';

const NAV_LINKS = [
  { name: 'Work', href: '#projects' },
  { name: 'Tech', href: '#tech-stack' },
  { name: 'Achievements', href: '#achievements' },
  { name: 'Education', href: '#education' },
];

export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const { theme, cycleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 border-b border-[var(--paper-line)] transition-all duration-300 ${
        scrolled
          ? 'bg-[var(--background)]/80 backdrop-blur-xl border-b border-[var(--paper-line)] py-3'
          : 'py-6'
      }`}
    >
      <div className="content-shell flex items-center justify-between">
        <a href="#top" className="text-xl font-bold tracking-tighter text-[var(--ink)]">
          AS
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-[var(--ink-soft)] hover:text-[var(--wine)] transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            className="button resume-download-button py-2 px-5"
            href="/Aryan_Surya_S_Resume.pdf"
            download="Aryan_Surya_S_Resume.pdf"
          >
            <Download size={16} strokeWidth={2.25} aria-hidden="true" />
            Resume
          </a>
          <button
            className="p-2.5 rounded-full border border-[var(--paper-line)] text-[var(--ink)] hover:border-[var(--wine)] hover:text-[var(--wine)] transition-all"
            onClick={cycleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
}
