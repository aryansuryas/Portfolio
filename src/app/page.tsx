'use client';
import React from 'react';
import HeroSection from './components/HeroSection';
import ProjectsSection from './components/ProjectsSection';
import TechStackSection from './components/TechStackSection';
import LeetCodeStickyCard from './components/LeetCodeStickyCard';
import AchievementsSection from './components/AchievementsSection';
import EducationSection from './components/EducationSection';
import ContactSection from './components/ContactSection';
import SiteNav from './components/SiteNav';
import SiteFooter from './components/SiteFooter';
import { ThemeProvider } from './components/ThemeProvider';

export default function HomePage() {
  return (
    <ThemeProvider>
      <SiteNav />
      <main>
        <HeroSection />
        <ProjectsSection />
        <TechStackSection />
        <LeetCodeStickyCard />
        <AchievementsSection />
        <EducationSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </ThemeProvider>
  );
}
