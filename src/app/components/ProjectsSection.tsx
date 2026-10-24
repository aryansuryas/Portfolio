'use client';

import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, GitBranch, Globe, X } from 'lucide-react';

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

const PROJECTS: Project[] = [
  {
    title: 'Hand-Frame',
    description: 'Real-time gesture recognition for frame-based interaction.',
    details:
      'A focused computer-vision experience that turns hand movement into a reliable, low-latency interface.',
    architecture:
      'Camera input → OpenCV processing → hand landmark interpretation → responsive UI state.',
    challenge:
      'Making interaction feel immediate while keeping noisy tracking data from producing accidental actions.',
    tags: ['Computer Vision', 'OpenCV', 'Interaction'],
    github: 'https://github.com/aryansuryas/Hand-Frame',
  },
  {
    title: 'World-Map',
    description: 'A clear, polished visualization layer for geography and location data.',
    details:
      'An exploration of information density, hierarchy, and visual storytelling on a global canvas.',
    architecture:
      'Structured location data → projection layer → interactive map primitives → responsive presentation.',
    challenge:
      'Balancing useful detail with a calm interface that remains legible at every viewport size.',
    tags: ['Visualization', 'Maps', 'D3.js'],
    github: 'https://github.com/aryansuryas/World-Map',
  },
  {
    title: 'Portfolio System',
    description: 'This portfolio: editorial typography, motion, and production-minded structure.',
    details:
      'A responsive Next.js experience designed to communicate capability quickly without unnecessary visual noise.',
    architecture:
      'Next.js App Router → composable sections → design tokens → progressively enhanced motion.',
    challenge:
      'Creating a distinctive visual system that stays fast, accessible, and easy to maintain.',
    tags: ['Next.js', 'TypeScript', 'Design Systems'],
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
    <section id="projects" className="section">
      <div className="content-shell">
        <div className="section-heading">
          <p className="eyebrow">01 / Selected work</p>
          <h2>Things I&apos;ve Built</h2>
        </div>
        <div className="project-grid">
          {PROJECTS.map((project, index) => (
            <motion.button
              key={project.title}
              className="project-card"
              onClick={() => setSelected(project)}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -6 }}
            >
              <span className="project-number">0{index + 1}</span>
              <span className="project-card-content">
                <strong>{project.title}</strong>
                <span>{project.description}</span>
              </span>
              <span className="project-arrow">
                <ArrowUpRight size={20} />
              </span>
              <span className="project-tags">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {selected && (
          <motion.div
            className="modal-backdrop"
            role="presentation"
            onClick={() => setSelected(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.article
              className="project-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-title"
              onClick={(event) => event.stopPropagation()}
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
            >
              <button
                className="modal-close"
                onClick={() => setSelected(null)}
                aria-label="Close project details"
              >
                <X size={20} />
              </button>
              <p className="eyebrow">Project details</p>
              <h2 id="project-title">{selected.title}</h2>
              <p className="modal-lede">{selected.details}</p>
              <div className="modal-details">
                <div>
                  <span>Architecture</span>
                  <p>{selected.architecture}</p>
                </div>
                <div>
                  <span>Challenge solved</span>
                  <p>{selected.challenge}</p>
                </div>
              </div>
              <div className="modal-links">
                {selected.github && (
                  <a href={selected.github} target="_blank" rel="noreferrer">
                    <GitBranch size={17} /> GitHub
                  </a>
                )}
                {selected.demo && (
                  <a href={selected.demo} target="_blank" rel="noreferrer">
                    <Globe size={17} /> Live demo
                  </a>
                )}
              </div>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
