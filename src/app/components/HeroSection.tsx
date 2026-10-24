'use client';

import React from 'react';
import { motion, type Variants } from 'framer-motion';

export default function HeroSection() {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };

  const item: Variants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  return (
    <section id="top" className="min-h-[80vh] flex flex-col justify-center pt-24">
      <div className="content-shell">
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-4xl">
          <motion.h1
            variants={item}
            className="text-[clamp(4rem,15vw,10rem)] font-extrabold leading-[0.9] tracking-tighter mb-8 text-[var(--ink)]"
            style={{ fontFamily: 'var(--font-kholic), var(--font-display)' }}
          >
            <span className="text-[var(--wine)]">A</span>ryan <br />
            <span className="text-[var(--wine)]">S</span>urya S
          </motion.h1>

          <motion.p variants={item} className="text-2xl text-[var(--ink-soft)] max-w-2xl">
            Computer Science & AI Builder. Engineering fast, hyper-scalable applications.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
