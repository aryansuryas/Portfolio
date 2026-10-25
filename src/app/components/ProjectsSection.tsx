'use client';

import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { GitBranch, Globe, X } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  details: string;
  architecture: string;
  challenge: string;
  tags: string[];
  github?: string;
  demo?: string;
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path
        fill="currentColor"
        d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.69c-2.78.6-3.37-1.18-3.37-1.18-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 7.01c.85 0 1.7.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.57c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"
      />
    </svg>
  );
}

const PROJECTS: Project[] = [
  {
    title: 'Parallax Earth',
    description: 'A cinematic scroll-driven journey through 13.8 billion years of history.',
    details:
      'Engineered a full-screen web experience using Three.js and GSAP. Each scroll position is mapped to a distinct cosmic era with synchronized particle systems and ambient audio.',
    architecture: 'React + Three.js + GSAP + Howler.js for spatial audio and smooth transitions.',
    challenge:
      'Orchestrating complex animation sequences while maintaining 60fps across different devices.',
    tags: ['Three.js', 'GSAP', 'React'],
    github: 'https://github.com/aryansuryas/Parallax-Earth',
  },
  {
    title: 'Hand Frame FX',
    description: 'Gesture-controlled visual effects using real-time computer vision.',
    details:
      'Tracks hands via MediaPipe and applies stylized visual effects inside a hand-framed region using OpenCV. Includes jitter smoothing and gesture-based UI controls.',
    architecture: 'Python + OpenCV + MediaPipe + NumPy for real-time landmark processing.',
    challenge:
      'Eliminating tracking jitter and ensuring low-latency mask generation for real-time feedback.',
    tags: ['Python', 'OpenCV', 'MediaPipe'],
    github: 'https://github.com/aryansuryas/Hand-Frame-FX',
  },
  {
    title: 'Hand Frame Addition',
    description: 'Real-time gesture calculator for touchless interaction.',
    details:
      'Detects raised fingers to compute live arithmetic sums. Uses geometric rules for reliable finger extension detection and features a live HUD.',
    architecture: 'Python + MediaPipe for hand landmark interpretation and HUD overlay.',
    challenge:
      'Designing a reliable heuristic for finger curl detection that works across various hand orientations.',
    tags: ['AI', 'Computer Vision', 'Python'],
    github: 'https://github.com/aryansuryas/Hand-Frame-Addition',
  },
];

export default function ProjectsSection() {
  const [selected, setSelected] = React.useState<Project | null>(null);

  useEffect(() => {
    document.body.style.overflow = selected ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [selected]);

  return (
    <section id="projects" className="relative z-10 section bg-[var(--background)]">
      <div className="content-shell">
        <div className="mb-12">
          <div className="max-w-2xl">
            <p className="eyebrow">01 / Selected Work</p>
            <h2 className="sec-head">Featured Projects</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => setSelected(project)}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/5] bg-[var(--paper-panel)] border border-[var(--paper-line)] rounded-[2.5rem] p-10 flex flex-col justify-between overflow-hidden hover:border-[var(--wine)] transition-all duration-700">
                {/* Decorative background number */}
                <span className="absolute top-16 right-6 text-[10rem] font-black text-[var(--ink)]/5 select-none transition-transform duration-700 group-hover:-translate-y-4 group-hover:text-[var(--wine)]/5">
                  {index + 1}
                </span>

                <div className="flex justify-between items-start relative z-10">
                  <span className="text-xs font-bold tracking-widest text-[var(--wine)] uppercase">
                    Build 0{index + 1}
                  </span>
                  {project.github ? (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Open ${project.title} on GitHub`}
                      onClick={(event) => event.stopPropagation()}
                      className="w-12 h-12 rounded-full border border-[var(--paper-line)] flex items-center justify-center bg-[var(--background)] group-hover:bg-[var(--wine)] group-hover:text-white group-hover:border-[var(--wine)] transition-all duration-500"
                    >
                      <GithubIcon />
                    </a>
                  ) : (
                    <div className="w-12 h-12 rounded-full border border-[var(--paper-line)] flex items-center justify-center bg-[var(--background)] group-hover:bg-[var(--wine)] group-hover:text-white group-hover:border-[var(--wine)] transition-all duration-500">
                      <GithubIcon />
                    </div>
                  )}
                </div>

                <div className="relative z-10">
                  <h3 className="section-subhead text-3xl font-bold text-[var(--ink)] mb-4 tracking-tight leading-none group-hover:translate-x-2 transition-transform duration-500">
                    {project.title}
                  </h3>
                  <p className="text-[var(--ink-soft)] text-lg leading-relaxed mb-8 opacity-80 group-hover:opacity-100 transition-opacity">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-[var(--background)] border border-[var(--paper-line)] rounded-full text-[var(--ink-faint)] group-hover:border-[var(--wine)]/30 group-hover:text-[var(--wine)] transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              className="absolute inset-0 bg-[var(--ink)]/40 backdrop-blur-md"
            />

            <motion.article
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-[var(--background)] rounded-[3rem] overflow-hidden shadow-2xl"
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-8 right-8 w-12 h-12 rounded-full border border-[var(--paper-line)] flex items-center justify-center text-[var(--ink-soft)] hover:bg-[var(--ink)] hover:text-white transition-all z-20"
              >
                <X size={20} />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-12 lg:p-16 bg-[var(--paper-panel)] flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-[var(--paper-line)]">
                  <p className="eyebrow text-[var(--wine)] mb-6">Selected Build</p>
                  <h2 className="text-5xl font-bold tracking-tighter text-[var(--ink)] mb-6 leading-[0.9]">
                    {selected.title}
                  </h2>
                  <p className="text-xl text-[var(--ink-soft)] leading-relaxed mb-8">
                    {selected.details}
                  </p>

                  <div className="flex gap-4">
                    {selected.github && (
                      <a href={selected.github} target="_blank" className="button button-primary">
                        <GitBranch size={18} /> Source Code
                      </a>
                    )}
                    {selected.demo && (
                      <a href={selected.demo} target="_blank" className="button button-secondary">
                        <Globe size={18} /> Live Demo
                      </a>
                    )}
                  </div>
                </div>

                <div className="p-12 lg:p-16 flex flex-col justify-center gap-12">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--wine)] mb-4">
                      Architecture
                    </h4>
                    <p className="text-[var(--ink-soft)] leading-relaxed font-medium">
                      {selected.architecture}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--wine)] mb-4">
                      The Challenge
                    </h4>
                    <p className="text-[var(--ink-soft)] leading-relaxed font-medium">
                      {selected.challenge}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selected.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-4 py-2 bg-[var(--paper-panel)] rounded-xl text-sm font-semibold border border-[var(--paper-line)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
