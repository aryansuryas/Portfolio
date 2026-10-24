'use client';

import React, { useEffect, useState } from 'react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, cycleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className={`site-nav ${scrolled ? 'site-nav-scrolled' : ''}`}>
      <div className="site-nav-inner">
        <a href="#top" className="nav-monogram" aria-label="Back to top">
          AS
        </a>
        <div className="nav-actions">
          <button
            className="theme-toggle"
            onClick={cycleTheme}
            aria-label={`Switch theme. Current theme: ${theme}`}
          >
            {theme === 'light' ? <Sun size={17} /> : <Moon size={17} />}
            <span>{theme === 'light' ? 'Light' : 'Dark'}</span>
          </button>
          <a className="nav-cta" href="#contact">
            Let&apos;s talk
          </a>
          <button
            className="mobile-menu-button"
            onClick={() => setOpen(true)}
            aria-label="Open navigation"
          >
            <Menu size={22} />
          </button>
        </div>
      </div>
      <div className={`mobile-nav ${open ? 'mobile-nav-open' : ''}`}>
        <button
          className="mobile-close"
          onClick={() => setOpen(false)}
          aria-label="Close navigation"
        >
          <X size={24} />
        </button>
        <a className="nav-cta" href="#contact" onClick={() => setOpen(false)}>
          Let&apos;s talk
        </a>
      </div>
    </header>
  );
}
