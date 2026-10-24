'use client';

import React from 'react';
import { ArrowDownRight, Download } from 'lucide-react';

export default function HeroSection() {
  return (
    <section id="top" className="hero-section">
      <div className="content-shell hero-grid">
        <div className="hero-copy">
          <h1>
              <span>A</span>ryan &nbsp;<span>S</span> urya &nbsp;<span>S</span>
          </h1>
          <p className="eyebrow hero-kicker">Computer Science · AI Builder</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#projects">
              View selected work <ArrowDownRight size={17} />
            </a>
            <a className="button button-secondary" href="/Aryan_Surya_S_Resume.pdf" download>
              Resume <Download size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
