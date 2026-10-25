'use client';

import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { BrainCircuit, Braces, Database, Layers, Server, Wrench } from 'lucide-react';

const DEV = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/';
const SI = 'https://cdn.simpleicons.org/';

interface StackItem {
  name: string;
  logo?: string;
}

interface StackCategory {
  name: string;
  mark: string;
  icon: LucideIcon;
  items: StackItem[];
}

const STACK_DATA: StackCategory[] = [
  {
    name: 'Languages',
    mark: '01',
    icon: Braces,
    items: [
      { name: 'Java', logo: `${DEV}java/java-original.svg` },
      { name: 'Python', logo: `${DEV}python/python-original.svg` },
      { name: 'JavaScript', logo: `${DEV}javascript/javascript-original.svg` },
      { name: 'C', logo: `${DEV}c/c-original.svg` },
      { name: 'C++', logo: `${DEV}cplusplus/cplusplus-original.svg` },
    ],
  },
  {
    name: 'Frontend',
    mark: '02',
    icon: Layers,
    items: [
      { name: 'React.js', logo: `${DEV}react/react-original.svg` },
      { name: 'Next.js', logo: `${DEV}nextjs/nextjs-original.svg` },
      { name: 'TypeScript', logo: `${DEV}typescript/typescript-original.svg` },
      { name: 'JavaScript', logo: `${DEV}javascript/javascript-original.svg` },
      { name: 'HTML', logo: `${DEV}html5/html5-original.svg` },
      { name: 'CSS', logo: `${DEV}css3/css3-original.svg` },
      { name: 'Tailwind CSS', logo: `${SI}tailwindcss` },
      { name: 'Bootstrap', logo: `${DEV}bootstrap/bootstrap-original.svg` },
    ],
  },
  {
    name: 'Backend',
    mark: '03',
    icon: Server,
    items: [
      { name: 'Node.js', logo: `${DEV}nodejs/nodejs-original.svg` },
      { name: 'Express', logo: `${DEV}express/express-original.svg` },
      { name: 'REST API' },
      { name: 'PHP', logo: `${DEV}php/php-original.svg` },
      { name: 'Flask', logo: `${DEV}flask/flask-original.svg` },
    ],
  },
  {
    name: 'AI Tools',
    mark: '04',
    icon: BrainCircuit,
    items: [
      { name: 'LangChain', logo: `${SI}langchain` },
      { name: 'OpenAI', logo: `${SI}openai` },
      { name: 'Google Gemini', logo: `${SI}googlegemini` },
      { name: 'MediaPipe', logo: `${SI}mediapipe` },
      { name: 'OpenCV', logo: `${DEV}opencv/opencv-original.svg` },
    ],
  },
  {
    name: 'Tools',
    mark: '05',
    icon: Wrench,
    items: [
      { name: 'Git', logo: `${DEV}git/git-original.svg` },
      { name: 'GitHub', logo: `${DEV}github/github-original.svg` },
      { name: 'VS Code', logo: `${DEV}vscode/vscode-original.svg` },
      { name: 'Docker', logo: `${DEV}docker/docker-original.svg` },
      { name: 'NumPy', logo: `${DEV}numpy/numpy-original.svg` },
      { name: 'Laravel', logo: `${DEV}laravel/laravel-original.svg` },
    ],
  },
  {
    name: 'Databases',
    mark: '06',
    icon: Database,
    items: [
      { name: 'MySQL', logo: `${DEV}mysql/mysql-original.svg` },
      { name: 'PostgreSQL', logo: `${DEV}postgresql/postgresql-original.svg` },
      { name: 'SQLite', logo: `${DEV}sqlite/sqlite-original.svg` },
      { name: 'MongoDB', logo: `${DEV}mongodb/mongodb-original.svg` },
    ],
  },
];

export default function TechStackSection() {
  return (
    <section id="tech-stack" className="section bg-[var(--background)]">
      <div className="content-shell">
        <h2 className="sec-head mb-12">Tech Stack</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {STACK_DATA.map((category) => (
            <div
              key={category.name}
              className="bg-[var(--paper-panel)] border border-[var(--paper-line)] rounded-3xl p-8"
            >
              <div className="w-12 h-12 rounded-2xl bg-[var(--background)] border border-[var(--paper-line)] flex items-center justify-center text-[var(--wine)] mb-6">
                <category.icon size={24} />
              </div>
              <h3 className="section-subhead text-xl font-bold mb-6">{category.name}</h3>
              <div className="flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <div
                    key={item.name}
                    className="px-3 py-1.5 bg-[var(--background)] border border-[var(--paper-line)] rounded-full text-xs font-semibold"
                  >
                    {item.name}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
