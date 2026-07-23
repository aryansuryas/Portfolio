'use client';

import React, { useState } from 'react';
import AppImage from '@/components/ui/AppImage';

const DEV = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/';
const SI = 'https://cdn.simpleicons.org/';

interface StackItem {
  n: string;
  l: string;
}
interface StackCategory {
  name: string;
  mark: string;
  desc: string;
  items: StackItem[];
}

const STACK_DATA: StackCategory[] = [
  {
    name: 'Frontend',
    mark: 'FE',
    desc: 'Interfaces, motion, and responsive layouts.',
    items: [
      { n: 'TypeScript', l: DEV + 'typescript/typescript-original.svg' },
      { n: 'JavaScript', l: DEV + 'javascript/javascript-original.svg' },
      { n: 'HTML5', l: DEV + 'html5/html5-original.svg' },
      { n: 'CSS3', l: DEV + 'css3/css3-original.svg' },
    ],
  },
  {
    name: 'Backend',
    mark: 'BE',
    desc: 'Server-side logic, testing, and API plumbing.',
    items: [
      { n: 'Node.js', l: DEV + 'nodejs/nodejs-original.svg' },
      { n: 'Express', l: DEV + 'express/express-original.svg' },
      { n: 'REST API', l: '' },
      { n: 'Testing', l: DEV + 'jest/jest-plain.svg' },
    ],
  },
  {
    name: 'Languages',
    mark: '01',
    desc: 'Core programming languages used across projects.',
    items: [
      { n: 'Java', l: DEV + 'java/java-original.svg' },
      { n: 'C', l: DEV + 'c/c-original.svg' },
      { n: 'Python', l: DEV + 'python/python-original.svg' },
      { n: 'C++', l: DEV + 'cplusplus/cplusplus-original.svg' },
    ],
  },
  {
    name: 'Database',
    mark: 'DB',
    desc: 'Structured and document-oriented data storage.',
    items: [
      { n: 'SQL', l: DEV + 'mysql/mysql-original.svg' },
      { n: 'MongoDB', l: DEV + 'mongodb/mongodb-original.svg' },
    ],
  },
  {
    name: 'Version Control',
    mark: 'VC',
    desc: 'Tracking changes and collaborating safely.',
    items: [
      { n: 'Git', l: DEV + 'git/git-original.svg' },
      { n: 'GitHub', l: SI + 'github' },
    ],
  },
  {
    name: 'API & Web',
    mark: 'API',
    desc: 'Request flows, formats, and testing tools.',
    items: [
      { n: 'REST API', l: '' },
      { n: 'JSON API', l: DEV + 'json/json-original.svg' },
      { n: 'Postman', l: DEV + 'postman/postman-original.svg' },
    ],
  },
  {
    name: 'Platforms',
    mark: 'PX',
    desc: 'Where I practice, build, and ship.',
    items: [
      { n: 'GitHub', l: SI + 'github' },
      { n: 'LeetCode', l: SI + 'leetcode' },
      { n: 'roadmap.sh', l: SI + 'roadmapdotsh' },
    ],
  },
  {
    name: 'AI Tools',
    mark: 'AI',
    desc: 'Models, assistants, and automation workflows.',
    items: [
      { n: 'ChatGPT', l: SI + 'openai' },
      { n: 'Copilot', l: SI + 'githubcopilot' },
      { n: 'Claude', l: SI + 'claude' },
      { n: 'Gemini', l: SI + 'googlegemini' },
      { n: 'Hugging Face', l: SI + 'huggingface' },
      { n: 'LangChain', l: SI + 'langchain' },
      { n: 'Perplexity', l: SI + 'perplexity' },
      { n: 'Lovable', l: SI + 'lovable' },
    ],
  },
];

function fallbackText(name: string) {
  const compact = name.replace(/[^A-Za-z0-9]/g, '');
  return compact ? compact.slice(0, 2).toUpperCase() : '•';
}

function StackItemChip({ item }: { item: StackItem }) {
  const [failed, setFailed] = useState(false);
  return (
    <span className="stack-tool-chip">
      {item.l && !failed ? (
        <AppImage
          src={item.l}
          alt=""
          width={24}
          height={24}
          unoptimized
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="stack-tool-fallback">{fallbackText(item.n)}</span>
      )}
      <span>{item.n}</span>
    </span>
  );
}

function StackCard({ category, index }: { category: StackCategory; index: number }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <article
      className="stack-flip-shell reveal-visible"
      style={{ transitionDelay: `${index * 45}ms` }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <button
        type="button"
        suppressHydrationWarning
        className={`stack-flip-inner${flipped ? ' is-flipped' : ''}`}
        onClick={() => setFlipped((current) => !current)}
        onFocus={() => setFlipped(true)}
        onBlur={() => setFlipped(false)}
        aria-pressed={flipped}
        aria-label={`${flipped ? 'Hide' : 'Show'} ${category.name} technologies`}
      >
        <span className="stack-face stack-face-front">
          <span className="stack-card-mark">{category.mark}</span>
          <span className="stack-card-copy">
            <strong>{category.name}</strong>
            <span>{category.desc}</span>
          </span>
          <span className="stack-card-action">
            Flip to explore <span aria-hidden="true">↗</span>
          </span>
        </span>
        <span className="stack-face stack-face-back">
          <span className="stack-back-header">
            <strong>{category.name}</strong>
            <span aria-hidden="true">↙</span>
          </span>
          <span className="stack-tools-grid">
            {category.items.map((item) => (
              <StackItemChip key={item.n} item={item} />
            ))}
          </span>
        </span>
      </button>
    </article>
  );
}

export default function TechStackSection() {
  return (
    <section
      id="tech-stack"
      className="relative"
      style={{ paddingBlock: 'clamp(5rem, 10vw, 9rem)' }}
    >
      <div className="px-[var(--edge)]" style={{ maxWidth: 'var(--container)', margin: '0 auto' }}>
        <div className="flex flex-col gap-2 mb-12">
          <div className="flex items-center gap-3">
            <div className="section-divider" />
            <span
              className="text-xs uppercase tracking-[0.1em]"
              style={{ fontFamily: 'var(--font-mono-ibm), monospace', color: 'var(--wine)' }}
            >
              03 / Stack
            </span>
          </div>
          <h2 className="sec-head" style={{ color: 'var(--ink)' }}>
            Tools & Technologies
          </h2>
          <p
            className="mt-2 max-w-[55ch] text-sm leading-relaxed"
            style={{ color: 'var(--ink-soft)' }}
          >
            Hover, focus, or tap a card to reveal the tools behind each discipline.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          {/* Row 1: 3 in a row */}
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {STACK_DATA.slice(0, 3).map((category, index) => (
              <StackCard key={category.name} category={category} index={index} />
            ))}
          </div>

          {/* Row 2: 2 in a row */}
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 max-w-[800px] w-full mx-auto">
            {STACK_DATA.slice(3, 5).map((category, index) => (
              <StackCard key={category.name} category={category} index={index + 3} />
            ))}
          </div>

          {/* Row 3: 3 in a row */}
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {STACK_DATA.slice(5, 8).map((category, index) => (
              <StackCard key={category.name} category={category} index={index + 5} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
