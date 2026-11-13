'use client';
import React from 'react';
import HeroSection from './components/HeroSection';
import ProjectsSection from './components/ProjectsSection';
import FeaturedWork from './components/FeaturedWork';
import LeetCodeStickyCard from './components/LeetCodeStickyCard';
import AchievementsSection from './components/AchievementsSection';
import EducationSection from './components/EducationSection';
import ContactSection from './components/ContactSection';
import SiteNav from './components/SiteNav';
import SiteFooter from './components/SiteFooter';
import { ThemeProvider } from './components/ThemeProvider';
import AccordionGallery from './components/AccordionGallery';

const GALLERY_ITEMS = [
  {
    image: 'https://picsum.photos/id/1015/900/1200',
    label: 'Languages',
    link: '#tech-stack',
    items: ['Java', 'Python', 'JavaScript', 'C', 'C++'],
  },
  {
    image: 'https://picsum.photos/id/1018/900/1200',
    label: 'Frontend',
    link: '#tech-stack',
    items: ['React.js', 'Next.js', 'TypeScript', 'HTML', 'CSS', 'Tailwind CSS', 'Bootstrap'],
  },
  {
    image: 'https://picsum.photos/id/1043/900/1200',
    label: 'Backend',
    link: '#tech-stack',
    items: ['Node.js', 'Express', 'REST API', 'PHP', 'Flask'],
  },
  {
    image: 'https://picsum.photos/id/1044/900/1200',
    label: 'Tools',
    link: '#tech-stack',
    items: [
      'Git',
      'GitHub',
      'VS Code',
      'Docker',
      'NumPy',
      'Laravel',
      'LangChain',
      'OpenAI',
      'Google Gemini',
      'MediaPipe',
      'OpenCV',
    ],
  },
  {
    image: 'https://picsum.photos/id/106/900/1200',
    label: 'Databases',
    link: '#tech-stack',
    items: ['MySQL', 'PostgreSQL', 'SQLite', 'MongoDB'],
  },
];

export default function HomePage() {
  return (
    <ThemeProvider>
      <SiteNav />
      <main>
        <HeroSection />
        <ProjectsSection />
        <FeaturedWork />
        <section id="tech-stack" className="section bg-[var(--background)]">
          <div className="content-shell">
            <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <p className="eyebrow">03 / Visual Experiments</p>
                <h2 className="sec-head">Ideas in motion.</h2>
              </div>
              <p className="max-w-sm text-base leading-relaxed text-[var(--ink-soft)]">
                Explore the technologies behind the interfaces and experiences I build.
              </p>
            </div>
            <AccordionGallery
              items={GALLERY_ITEMS}
              defaultIndex={2}
              expandRatio={0.52}
              trigger="hover"
            />
          </div>
        </section>
        <LeetCodeStickyCard />
        <AchievementsSection />
        <EducationSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </ThemeProvider>
  );
}
