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
            className="hero-name text-[clamp(3.5rem,13vw,10rem)] font-semibold leading-[0.9] tracking-tighter mb-8 text-[var(--ink)]"
          >
            Aryan <br />
            Surya S
          </motion.h1>

          <motion.p variants={item} className="text-2xl text-[var(--ink-soft)] max-w-2xl">
            Computer Science & AI Builder. Engineering fast, hyper-scalable applications.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
