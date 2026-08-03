'use client';

import React, { useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  Layers,
  Server,
  Braces,
  Database,
  GitBranch,
  Globe,
  LayoutGrid,
  Sparkles,
} from 'lucide-react';
import AppImage from '@/components/ui/AppImage';

const DEV = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/';
const SI = 'https://cdn.simpleicons.org/';

interface StackItem {
  name: string;
  logo: string;
  tint?: string;
}

interface StackCategory {
  name: string;
  mark: string;
  desc: string;
  icon: LucideIcon;
  items: StackItem[];
}

const STACK_DATA: StackCategory[] = [
  {
    name: 'Frontend',
    mark: 'FE',
    desc: 'Crafting rich interfaces, motion, and responsive experiences.',
    icon: Layers,
    items: [
      { name: 'React', logo: DEV + 'react/react-original.svg', tint: '#61DAFB' },
      { name: 'Next.js', logo: DEV + 'nextjs/nextjs-original.svg', tint: '#000000' },
      { name: 'TypeScript', logo: DEV + 'typescript/typescript-original.svg', tint: '#3178C6' },
      { name: 'JavaScript', logo: DEV + 'javascript/javascript-original.svg', tint: '#F7DF1E' },
      { name: 'Tailwind CSS', logo: DEV + 'tailwindcss/tailwindcss-original.svg', tint: '#06B6D4' },
      { name: 'Three.js', logo: DEV + 'threejs/threejs-original.svg', tint: '#FFFFFF' },
    ],
  },
  {
    name: 'Backend',
    mark: 'BE',
    desc: 'APIs, server logic, and reliable application wiring.',
    icon: Server,
    items: [
      { name: 'Node.js', logo: DEV + 'nodejs/nodejs-original.svg', tint: '#339933' },
      { name: 'Express', logo: DEV + 'express/express-original.svg', tint: '#888888' },
      { name: 'REST API', logo: '', tint: '#7A1220' },
      { name: 'Jest', logo: DEV + 'jest/jest-plain.svg', tint: '#C21325' },
    ],
  },
  {
    name: 'Languages',
    mark: '01',
    desc: 'Core programming languages across personal and professional projects.',
    icon: Braces,
    items: [
      { name: 'Java', logo: DEV + 'java/java-original.svg', tint: '#007396' },
      { name: 'C', logo: DEV + 'c/c-original.svg', tint: '#A8B9CC' },
      { name: 'Python', logo: DEV + 'python/python-original.svg', tint: '#3776AB' },
      { name: 'C++', logo: DEV + 'cplusplus/cplusplus-original.svg', tint: '#00599C' },
    ],
  },
  {
    name: 'Database',
    mark: 'DB',
    desc: 'Structured and document-based storage for modern products.',
    icon: Database,
    items: [
      { name: 'SQL', logo: DEV + 'mysql/mysql-original.svg', tint: '#4479A1' },
      { name: 'MongoDB', logo: DEV + 'mongodb/mongodb-original.svg', tint: '#47A248' },
    ],
  },
  {
    name: 'Version Control',
    mark: 'VC',
    desc: 'Keeping work organized, collaborative, and versioned.',
    icon: GitBranch,
    items: [
      { name: 'Git', logo: DEV + 'git/git-original.svg', tint: '#F05032' },
      { name: 'GitHub', logo: SI + 'github', tint: '#181717' },
    ],
  },
  {
    name: 'API & Web',
    mark: 'API',
    desc: 'Request flows, transport formats, and API testing workflows.',
    icon: Globe,
    items: [
      { name: 'REST API', logo: '', tint: '#7A1220' },
      { name: 'JSON API', logo: DEV + 'json/json-original.svg', tint: '#292929' },
      { name: 'Postman', logo: DEV + 'postman/postman-original.svg', tint: '#FF6C37' },
    ],
  },
  {
    name: 'Platforms',
    mark: 'PX',
    desc: 'Where ideas are built, practiced, and shipped.',
    icon: LayoutGrid,
    items: [
      { name: 'GitHub', logo: SI + 'github', tint: '#181717' },
      { name: 'LeetCode', logo: SI + 'leetcode', tint: '#FFA116' },
      { name: 'roadmap.sh', logo: SI + 'roadmapdotsh', tint: '#FF5533' },
    ],
  },
  {
    name: 'AI Tools',
    mark: 'AI',
    desc: 'Models, assistants, and automation that speed up delivery.',
    icon: Sparkles,
    items: [
      { name: 'ChatGPT', logo: SI + 'openai', tint: '#412991' },
      { name: 'Copilot', logo: SI + 'githubcopilot', tint: '#000000' },
      { name: 'Claude', logo: SI + 'claude', tint: '#D97757' },
      { name: 'Gemini', logo: SI + 'googlegemini', tint: '#8E75B2' },
      { name: 'Hugging Face', logo: SI + 'huggingface', tint: '#FFD21E' },
      { name: 'LangChain', logo: SI + 'langchain', tint: '#1C3C3C' },
      { name: 'Perplexity', logo: SI + 'perplexity', tint: '#20808D' },
      { name: 'Lovable', logo: SI + 'lovable', tint: '#FF385C' },
    ],
  },
];

function fallbackText(name: string) {
  const compact = name.replace(/[^A-Za-z0-9]/g, '');
  return compact ? compact.slice(0, 2).toUpperCase() : '•';
}

function TechBadge({ item }: { item: StackItem }) {
  const [failed, setFailed] = useState(false);

  return (
    <li
      className="tech-badge group/badge"
      style={{ ['--tint' as string]: item.tint || 'var(--wine)' }}
    >
      {item.logo && !failed ? (
        <AppImage
          src={item.logo}
          alt=""
          width={16}
          height={16}
          unoptimized
          className="size-4 shrink-0 object-contain opacity-80 transition-opacity duration-300 group-hover/badge:opacity-100"
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="tech-badge-fallback">{fallbackText(item.name)}</span>
      )}
      <span className="truncate">{item.name}</span>
    </li>
  );
}

function CategoryCard({ category }: { category: StackCategory }) {
  const Icon = category.icon;

  return (
    <article className="group relative overflow-hidden rounded-[1.5rem] border border-[var(--paper-line)] bg-[rgba(251,247,236,0.84)] p-6 shadow-[0_20px_70px_rgba(30,25,18,0.05)] backdrop-blur">
      <div className="absolute inset-x-0 top-0 h-24 bg-[linear-gradient(135deg,rgba(122,18,32,0.06),transparent)]" />
      <header className="relative grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3">
        <span className="grid size-11 shrink-0 place-items-center rounded-2xl border border-[var(--paper-line)] bg-[rgba(122,18,32,0.06)] text-[var(--wine)] transition-colors duration-300 group-hover:border-[rgba(122,18,32,0.28)]">
          <Icon className="size-[18px]" />
        </span>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="tech-card-mark">{category.mark}</span>
            <h3 className="truncate font-display text-[15px] font-semibold tracking-tight text-[var(--ink)]">
              {category.name}
            </h3>
          </div>
          <p className="mt-1 line-clamp-2 text-xs leading-5 text-[var(--ink-soft)]">
            {category.desc}
          </p>
        </div>
      </header>

      <ul className="relative mt-6 flex flex-wrap gap-2">
        {category.items.map((item) => (
          <TechBadge key={item.name} item={item} />
        ))}
      </ul>
    </article>
  );
}

export default function TechStackSection() {
  return (
    <section
      id="tech-stack"
      className="relative overflow-hidden"
      style={{ paddingBlock: 'clamp(5rem, 10vw, 9rem)' }}
    >
      <div className="section-glow" aria-hidden="true" />

      <div
        className="relative px-[var(--edge)]"
        style={{ maxWidth: 'var(--container)', margin: '0 auto' }}
      >
        <div className="max-w-2xl">
          <div className="mb-5 flex items-center gap-3">
            <div className="section-divider !mb-0" />
            <span className="tech-section-label">03 / Stack</span>
          </div>
          <h2 className="sec-head text-[var(--ink)]">Tools &amp; Technologies</h2>
          <p className="mt-4 max-w-[55ch] text-base leading-relaxed text-[var(--ink-soft)]">
            The full toolkit behind each discipline — from interfaces and APIs to databases, version
            control, and AI workflows.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {STACK_DATA.map((category) => (
            <CategoryCard key={category.name} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}
