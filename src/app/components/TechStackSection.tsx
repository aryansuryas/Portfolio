'use client';

import React, { useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Braces, Database, GitBranch, Layers, Server, Sparkles } from 'lucide-react';
import AppImage from '@/components/ui/AppImage';

const DEV = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/';
const SI = 'https://cdn.simpleicons.org/';

interface StackItem {
  name: string;
  logo?: string;
  tint?: string;
}

interface StackCategory {
  name: string;
  mark: string;
  description: string;
  icon: LucideIcon;
  items: StackItem[];
}

const STACK_DATA: StackCategory[] = [
  {
    name: 'Languages',
    mark: '01',
    description: 'Core languages for structured problem solving.',
    icon: Braces,
    items: [
      { name: 'Java', logo: `${DEV}java/java-original.svg` },
      { name: 'Python', logo: `${DEV}python/python-original.svg` },
      { name: 'C', logo: `${DEV}c/c-original.svg` },
      { name: 'C++', logo: `${DEV}cplusplus/cplusplus-original.svg` },
    ],
  },
  {
    name: 'Frontend',
    mark: '02',
    description: 'Interfaces built for clarity, speed, and responsiveness.',
    icon: Layers,
    items: [
      { name: 'React', logo: `${DEV}react/react-original.svg` },
      { name: 'Next.js', logo: `${DEV}nextjs/nextjs-original.svg` },
      { name: 'TypeScript', logo: `${DEV}typescript/typescript-original.svg` },
      { name: 'Tailwind CSS', logo: `${DEV}tailwindcss/tailwindcss-original.svg` },
    ],
  },
  {
    name: 'Backend & Security',
    mark: '03',
    description: 'Reliable server systems and protected request flows.',
    icon: Server,
    items: [
      { name: 'Node.js', logo: `${DEV}nodejs/nodejs-original.svg` },
      { name: 'Express', logo: `${DEV}express/express-original.svg` },
      { name: 'REST APIs', tint: '#BC0202' },
      { name: 'Authentication', tint: '#BC0202' },
      { name: 'Security', tint: '#BC0202' },
      { name: 'Rate limiting', tint: '#BC0202' },
    ],
  },
  {
    name: 'Data & Delivery',
    mark: '04',
    description: 'Storage, version control, testing, and shipping.',
    icon: Database,
    items: [
      { name: 'SQL', logo: `${DEV}mysql/mysql-original.svg` },
      { name: 'MongoDB', logo: `${DEV}mongodb/mongodb-original.svg` },
      { name: 'Git', logo: `${DEV}git/git-original.svg` },
      { name: 'GitHub', logo: `${SI}github` },
      { name: 'Postman', logo: `${DEV}postman/postman-original.svg` },
    ],
  },
  {
    name: 'AI & Tools',
    mark: '05',
    description: 'AI assistants and frameworks that accelerate delivery.',
    icon: Sparkles,
    items: [
      { name: 'ChatGPT', logo: `${SI}openai` },
      { name: 'Copilot', logo: `${SI}githubcopilot` },
      { name: 'LangChain', logo: `${SI}langchain` },
      { name: 'LeetCode', logo: `${SI}leetcode` },
    ],
  },
  {
    name: 'Systems Thinking',
    mark: '06',
    description: 'Architecture, APIs, performance, and maintainability.',
    icon: GitBranch,
    items: [
      { name: 'API design', tint: '#BC0202' },
      { name: 'Data structures', tint: '#BC0202' },
      { name: 'Testing', tint: '#BC0202' },
      { name: 'Performance', tint: '#BC0202' },
    ],
  },
];

function TechBadge({ item }: { item: StackItem }) {
  const [failed, setFailed] = useState(false);
  return (
    <li className="tech-badge" style={{ ['--tint' as string]: item.tint || 'var(--wine)' }}>
      {item.logo && !failed ? (
        <AppImage
          src={item.logo}
          alt=""
          width={16}
          height={16}
          unoptimized
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="tech-badge-fallback">{item.name.slice(0, 2).toUpperCase()}</span>
      )}
      <span>{item.name}</span>
    </li>
  );
}

export default function TechStackSection() {
  return (
    <section id="tech-stack" className="section technologies-section">
      <div className="content-shell">
        <div className="section-heading">
          <p className="eyebrow">02 / Technologies</p>
          <h2>Tools &amp; Technologies</h2>
        </div>
        <div className="technology-bento">
          {STACK_DATA.map((category) => {
            const Icon = category.icon;
            return (
              <article className="technology-card" key={category.name}>
                <div className="technology-card-header">
                  <span className="technology-icon">
                    <Icon size={18} />
                  </span>
                  <span className="technology-mark">{category.mark}</span>
                </div>
                <h3>{category.name}</h3>
                <p>{category.description}</p>
                <ul>
                  {category.items.map((item) => (
                    <TechBadge key={item.name} item={item} />
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
