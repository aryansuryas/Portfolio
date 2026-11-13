'use client';

import React from 'react';
import { motion, type Variants } from 'framer-motion';

export default function HeroSection() {
  const container: Variants = {
    show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };

  const item: Variants = {
    hidden: { y: 20 },
    show: { y: 0, opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  return (
    <section id="top" className="relative z-10 min-h-[80vh] flex flex-col justify-center pt-24">
      <div className="content-shell">
        <motion.div variants={container} initial={false} animate="show" className="max-w-4xl">
          <motion.h1
            variants={item}
            className="hero-name whitespace-nowrap text-[clamp(2.65rem,12.5vw,10rem)] font-semibold leading-none tracking-tighter mb-5 text-[var(--ink)]"
          >
            ARYAN SURYA S
          </motion.h1>

          <motion.a
            variants={item}
            className="button resume-download-button mb-7"
            href="/Aryan_Surya_S_Resume.pdf"
            download="Aryan_Surya_S_Resume.pdf"
          >
            Resume
          </motion.a>

          <motion.p variants={item} className="text-2xl text-[var(--ink-soft)] max-w-2xl">
            Computer Science & AI Builder. Engineering fast, hyper-scalable applications.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
