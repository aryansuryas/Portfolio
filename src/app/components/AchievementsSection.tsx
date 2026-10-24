'use client';
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface AchievementItem {
  id: string;
  category: string;
  badge: string;
  title: string;
  description: string;
  dateOrIssuer: string;
}

const ACHIEVEMENTS: AchievementItem[] = [
  {
    id: 'nptel-java',
    category: 'Certification',
    badge: 'NPTEL / IIT',
    title: 'NPTEL Certified — Programming in Java',
    description:
      'Completed the official NPTEL certification course in Java Programming with high academic distinction, mastering core OOP principles, multithreading, and collections.',
    dateOrIssuer: 'NPTEL / IIT',
  },
  {
    id: 'oracle-oci',
    category: 'Cloud Systems',
    badge: 'Oracle',
    title: 'Oracle Cloud Infrastructure (OCI) Certified',
    description:
      'Certified in Oracle Cloud Infrastructure administration, cloud service deployment, networking architectures, and IAM security controls.',
    dateOrIssuer: 'Oracle Cloud',
  },
  {
    id: 'google-genai',
    category: 'Artificial Intelligence',
    badge: 'Google',
    title: 'Google Generative AI Fundamentals',
    description:
      'Certified in Large Language Models (LLMs), prompt engineering strategies, and generative AI application architectures.',
    dateOrIssuer: 'Google Cloud',
  },
  {
    id: 'achievement-slot-4',
    category: 'Achievement',
    badge: 'Honors / Cert',
    title: 'Technical Distinction & Hackathon Achievement',
    description:
      'Recognized for outstanding technical performance and self-directed project execution across full-stack and AI systems development.',
    dateOrIssuer: 'DSU / Industry',
  },
];

function AchievementRow({ item, index }: { item: AchievementItem; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative py-10 border-b border-[var(--paper-line)] hover:bg-[var(--wine-glow)]/5 transition-all duration-500 px-4 -mx-4 rounded-xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-6 items-start">
        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--wine)]">
            {item.badge}
          </span>
          <span className="text-[10px] uppercase tracking-wider text-[var(--ink-faint)] font-medium">
            {item.category}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-display text-2xl md:text-3xl font-semibold text-[var(--ink)] tracking-tight group-hover:text-[var(--wine)] transition-colors">
            {item.title}
          </h3>
          <p className="text-[var(--ink-soft)] leading-relaxed max-w-3xl">{item.description}</p>
        </div>
      </div>
    </motion.article>
  );
}

export default function AchievementsSection() {
  return (
    <section id="achievements" className="section relative overflow-hidden">
      <div className="content-shell">
        <div className="mb-16">
          <p className="eyebrow">03 / Distinction</p>
          <h2 className="sec-head">Key Achievements</h2>
        </div>

        <div className="border-t border-[var(--paper-line)]">
          {ACHIEVEMENTS.map((item, i) => (
            <AchievementRow key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
