'use client';

import React, { useEffect, useState } from 'react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { useTheme } from './ThemeProvider';

const NAV_LINKS = [
  { name: 'Work', href: '#projects' },
  { name: 'Tech', href: '#tech-stack' },
  { name: 'Achievements', href: '#achievements' },
  { name: 'Education', href: '#education' },
  { name: 'Tokens', href: '/styleguide' },
];

export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, cycleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 border-b border-[var(--paper-line)] transition-all duration-300 ${
        scrolled
          ? 'bg-[var(--background)]/80 backdrop-blur-xl border-b border-[var(--paper-line)] py-3'
          : 'py-6'
      }`}
    >
      <div className="content-shell flex items-center justify-between">
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
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

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            className="p-2.5 rounded-full border border-[var(--paper-line)] text-[var(--ink)] hover:border-[var(--wine)] hover:text-[var(--wine)] transition-all"
            onClick={cycleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            className="md:hidden p-2.5 rounded-full border border-[var(--paper-line)] text-[var(--ink)] hover:border-[var(--wine)] hover:text-[var(--wine)] transition-all"
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            <Menu size={20} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        id="mobile-navigation"
        className={`fixed inset-0 z-50 flex min-h-screen flex-col bg-[var(--background)] px-[var(--edge)] py-6 transition duration-300 md:hidden ${
          menuOpen ? 'visible opacity-100' : 'invisible pointer-events-none opacity-0'
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--wine)]">
            Navigation
          </span>
          <button
            className="rounded-full border border-[var(--paper-line)] p-2.5 text-[var(--ink)] transition-colors hover:border-[var(--wine)] hover:text-[var(--wine)]"
            onClick={closeMenu}
            aria-label="Close navigation menu"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>
        <nav className="flex flex-1 flex-col justify-center gap-5" aria-label="Mobile navigation">
          {NAV_LINKS.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              onClick={closeMenu}
              className="section-subhead border-b border-[var(--paper-line)] pb-4 text-[clamp(2.25rem,11vw,4.5rem)] font-medium leading-none text-[var(--ink)] transition-colors hover:text-[var(--wine)] focus-visible:text-[var(--wine)]"
            >
              <span className="mr-4 font-mono text-sm text-[var(--wine)]">0{index + 1}</span>
              {link.name}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
