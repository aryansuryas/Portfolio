import React from 'react';

export default function SiteFooter() {
  return (
    <footer
      className="relative"
      style={{
        zIndex: 2,
        borderTop: '1px solid var(--paper-line)',
        paddingBlock: '3rem',
      }}
    >
      <div
        className="px-[var(--edge)] flex justify-center items-center"
        style={{ maxWidth: 'var(--container)', margin: '0 auto' }}
      >
        {/* Copyright */}
        <p
          className="text-sm text-center"
          style={{
            fontFamily: 'var(--font-mono), monospace',
            color: 'var(--ink-soft)',
            fontSize: '0.85rem',
            letterSpacing: '0.05em',
          }}
        >
          © 2026 <span className="brand-name font-semibold transition-all">Aryan Surya S</span>
        </p>
      </div>
    </footer>
  );
}
