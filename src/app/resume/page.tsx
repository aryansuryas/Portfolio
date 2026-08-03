'use client';

import React from 'react';
import Link from 'next/link';

export default function ResumePage() {
  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div
      className="min-h-screen text-[var(--ink)] relative"
      style={{
        background: 'var(--paper)',
        fontFamily: 'var(--font-jakarta), sans-serif',
      }}
    >
      {/* Top Floating Control Bar (Hidden when printing) */}
      <header
        className="no-print fixed top-0 left-0 w-full z-50 transition-all duration-300"
        style={{
          borderBottom: '1px solid var(--paper-line)',
          background: 'rgba(251, 247, 236, 0.92)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <div
          className="flex justify-between items-center px-[var(--edge)] gap-4 py-3"
          style={{ maxWidth: '1000px', margin: '0 auto' }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-[var(--wine)]"
            style={{ color: 'var(--ink-soft)' }}
          >
            <span>←</span> Back to Portfolio
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              type="button"
              className="inline-flex items-center gap-2 px-4 py-2 rounded text-xs font-semibold uppercase tracking-wider transition-all"
              style={{
                border: '1px solid var(--paper-line)',
                background: 'var(--paper-panel)',
                color: 'var(--ink)',
              }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                />
              </svg>
              Print / Save PDF
            </button>

            <a
              href="/Aryan_Surya_S_Resume.pdf"
              download="Aryan_Surya_S_Resume.pdf"
              className="inline-flex items-center gap-2 px-5 py-2 rounded text-xs font-semibold uppercase tracking-wider transition-all"
              style={{
                background: 'var(--wine)',
                color: 'var(--paper)',
                boxShadow: '0 4px 12px var(--wine-glow)',
              }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Download PDF
            </a>
          </div>
        </div>
      </header>

      {/* Main Resume Document Canvas */}
      <main className="pt-24 pb-16 px-4 sm:px-6 md:px-8">
        <article
          className="resume-document max-w-[850px] mx-auto rounded-2xl p-8 sm:p-12 md:p-14"
          style={{
            background: 'var(--paper-panel)',
            border: '1px solid var(--paper-line)',
            boxShadow: '0 20px 50px rgba(30, 25, 18, 0.05)',
          }}
        >
          {/* Header */}
          <header className="border-b border-[var(--paper-line)] pb-8 mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
              <div>
                <h1
                  className="text-4xl sm:text-5xl font-bold tracking-tight uppercase"
                  style={{
                    fontFamily: 'var(--font-fraunces), serif',
                    color: 'var(--ink)',
                  }}
                >
                  Aryan Surya S
                </h1>
                <p
                  className="text-sm font-semibold uppercase tracking-widest mt-1"
                  style={{
                    fontFamily: 'var(--font-mono-ibm), monospace',
                    color: 'var(--wine)',
                  }}
                >
                  Full-Stack Developer & AI Systems Builder
                </p>
              </div>

              <span
                className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full"
                style={{
                  fontFamily: 'var(--font-mono-ibm), monospace',
                  background: 'rgba(122, 18, 32, 0.08)',
                  color: 'var(--wine)',
                  border: '1px solid rgba(122, 18, 32, 0.2)',
                }}
              >
                Bengaluru, India
              </span>
            </div>

            {/* Contact details bar */}
            <div
              className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm pt-2"
              style={{
                fontFamily: 'var(--font-mono-ibm), monospace',
                color: 'var(--ink-soft)',
              }}
            >
              <a
                href="tel:+917676938466"
                className="hover:text-[var(--wine)] transition-colors flex items-center gap-1.5"
              >
                <span>📞</span> +91 7676938466
              </a>
              <a
                href="mailto:aryansuryas@gmail.com"
                className="hover:text-[var(--wine)] transition-colors flex items-center gap-1.5"
              >
                <span>✉️</span> aryansuryas@gmail.com
              </a>
              <a
                href="https://github.com/aryansuryas"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--wine)] transition-colors flex items-center gap-1.5"
              >
                <span>🌐</span> github.com/aryansuryas
              </a>
              <a
                href="https://linkedin.com/in/aryansuryas"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--wine)] transition-colors flex items-center gap-1.5"
              >
                <span>💼</span> linkedin.com/in/aryansuryas
              </a>
            </div>
          </header>

          {/* Section 01: Professional Summary */}
          <section className="mb-10">
            <h2
              className="text-xs uppercase tracking-[0.18em] font-bold mb-3 flex items-center gap-2"
              style={{
                fontFamily: 'var(--font-mono-ibm), monospace',
                color: 'var(--wine)',
              }}
            >
              <span>{'// 01'}</span> Professional Summary
            </h2>
            <p
              className="leading-relaxed text-sm sm:text-base text-justify"
              style={{ color: 'var(--ink-soft)' }}
            >
              Computer Science Engineering student at Dayananda Sagar University with hands-on
              full-stack development experience across React, Node.js, and Python, and a consistent
              record of self-directed projects spanning 3D web experiences, computer-vision
              applications, and data visualization tools. Oracle Cloud Infrastructure and Google
              Generative AI certified, with active DSA practice and a growing interest in applying
              LLMs to real products. Comfortable owning a project end to end — architecture,
              implementation, and deployment.
            </p>
          </section>

          {/* Section 02: Projects */}
          <section className="mb-10">
            <h2
              className="text-xs uppercase tracking-[0.18em] font-bold mb-6 flex items-center gap-2"
              style={{
                fontFamily: 'var(--font-mono-ibm), monospace',
                color: 'var(--wine)',
              }}
            >
              <span>{'// 02'}</span> Selected Technical Projects
            </h2>

            <div className="space-y-8">
              {/* Project 1 */}
              <div className="border-l-2 border-[var(--paper-line)] pl-5 hover:border-[var(--wine)] transition-colors">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                  <h3
                    className="text-lg font-bold"
                    style={{
                      fontFamily: 'var(--font-fraunces), serif',
                      color: 'var(--ink)',
                    }}
                  >
                    Parallax Earth — Cinematic Scroll Experience
                  </h3>
                  <a
                    href="https://github.com/aryansuryas"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold uppercase tracking-wider text-[var(--wine)] hover:underline"
                    style={{ fontFamily: 'var(--font-mono-ibm), monospace' }}
                  >
                    View Code ↗
                  </a>
                </div>
                <ul
                  className="list-disc list-outside ml-4 space-y-1.5 text-xs sm:text-sm leading-relaxed"
                  style={{ color: 'var(--ink-soft)' }}
                >
                  <li>
                    Engineered a full-screen, scroll-driven cinematic web experience spanning 13.8
                    billion years of cosmic history, mapping each scroll position to a distinct era
                    with its own color palette, typography, and Three.js particle system.
                  </li>
                  <li>
                    Built scroll-synchronized animation sequences with GSAP and ScrollTrigger,
                    coordinating particle systems, starfield rendering, and a Big Bang flash effect
                    across smooth era transitions.
                  </li>
                  <li>
                    Integrated Firebase Firestore to power a live visitor counter, era-based voting,
                    and a leaderboard, with graceful feature degradation when Firebase credentials
                    are absent.
                  </li>
                  <li>
                    Implemented era-based ambient audio with Howler.js, including automatic
                    crossfading between soundtracks as the user scrolls between time periods.
                  </li>
                </ul>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {[
                    'React',
                    'Vite',
                    'Three.js',
                    'GSAP',
                    'Firebase Firestore',
                    'Tailwind CSS',
                    'Framer Motion',
                    'Howler.js',
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[11px] font-medium"
                      style={{
                        background: 'rgba(30, 25, 18, 0.05)',
                        color: 'var(--ink-soft)',
                        fontFamily: 'var(--font-mono-ibm), monospace',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project 2 */}
              <div className="border-l-2 border-[var(--paper-line)] pl-5 hover:border-[var(--wine)] transition-colors">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                  <h3
                    className="text-lg font-bold"
                    style={{
                      fontFamily: 'var(--font-fraunces), serif',
                      color: 'var(--ink)',
                    }}
                  >
                    Hand Frame FX — Gesture-Controlled Visual Effects App
                  </h3>
                  <a
                    href="https://github.com/aryansuryas/Hand-Frame"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold uppercase tracking-wider text-[var(--wine)] hover:underline"
                    style={{ fontFamily: 'var(--font-mono-ibm), monospace' }}
                  >
                    View Code ↗
                  </a>
                </div>
                <ul
                  className="list-disc list-outside ml-4 space-y-1.5 text-xs sm:text-sm leading-relaxed"
                  style={{ color: 'var(--ink-soft)' }}
                >
                  <li>
                    Developed a real-time computer-vision application that tracks both hands via
                    MediaPipe and uses the index and thumb fingertips to frame a live quadrilateral,
                    compositing stylized visual effects only inside that region of the camera feed.
                  </li>
                  <li>
                    Implemented convex-hull mask generation (OpenCV) to render one of four custom
                    visual effects (comic, paper, grid, pixel-glass) in real time over the webcam
                    stream.
                  </li>
                  <li>
                    Applied exponential moving average smoothing to landmark coordinates to
                    eliminate jitter, with dropout tolerance for brief tracking losses.
                  </li>
                  <li>
                    Designed a hands-free UX where bringing both hands together automatically cycles
                    effects, alongside keyboard controls for switching, live recording, and a debug
                    overlay.
                  </li>
                </ul>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {['Python', 'OpenCV', 'MediaPipe Hands', 'NumPy'].map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[11px] font-medium"
                      style={{
                        background: 'rgba(30, 25, 18, 0.05)',
                        color: 'var(--ink-soft)',
                        fontFamily: 'var(--font-mono-ibm), monospace',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project 3 */}
              <div className="border-l-2 border-[var(--paper-line)] pl-5 hover:border-[var(--wine)] transition-colors">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                  <h3
                    className="text-lg font-bold"
                    style={{
                      fontFamily: 'var(--font-fraunces), serif',
                      color: 'var(--ink)',
                    }}
                  >
                    Hand Frame Addition — Real-Time Gesture Calculator
                  </h3>
                  <a
                    href="https://github.com/aryansuryas"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold uppercase tracking-wider text-[var(--wine)] hover:underline"
                    style={{ fontFamily: 'var(--font-mono-ibm), monospace' }}
                  >
                    View Code ↗
                  </a>
                </div>
                <ul
                  className="list-disc list-outside ml-4 space-y-1.5 text-xs sm:text-sm leading-relaxed"
                  style={{ color: 'var(--ink-soft)' }}
                >
                  <li>
                    Built a real-time finger-counting calculator that detects up to two hands using
                    MediaPipe&apos;s 21-point hand landmark model and computes a live sum from the
                    fingers raised on each hand.
                  </li>
                  <li>
                    Designed position-based logic mapping the left hand to the first operand and the
                    right hand to the second, with a live on-screen HUD showing the running addition
                    equation.
                  </li>
                  <li>
                    Implemented handedness-aware geometric rules to detect finger extension —
                    vertical tip-to-knuckle comparison for the four fingers and horizontal
                    comparison for the thumb — to reliably distinguish raised vs. curled fingers.
                  </li>
                </ul>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {['Python', 'OpenCV', 'MediaPipe Hand Landmarker', 'NumPy'].map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[11px] font-medium"
                      style={{
                        background: 'rgba(30, 25, 18, 0.05)',
                        color: 'var(--ink-soft)',
                        fontFamily: 'var(--font-mono-ibm), monospace',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Section 03: Education */}
          <section className="mb-10">
            <h2
              className="text-xs uppercase tracking-[0.18em] font-bold mb-4 flex items-center gap-2"
              style={{
                fontFamily: 'var(--font-mono-ibm), monospace',
                color: 'var(--wine)',
              }}
            >
              <span>{'// 03'}</span> Education & Academic Qualifications
            </h2>

            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-3 border-b border-[var(--paper-line)]">
                <div>
                  <h3
                    className="font-bold text-base"
                    style={{ fontFamily: 'var(--font-fraunces), serif', color: 'var(--ink)' }}
                  >
                    Dayananda Sagar University | Bengaluru
                  </h3>
                  <p className="text-xs sm:text-sm" style={{ color: 'var(--ink-soft)' }}>
                    B.Tech in Computer Science Engineering
                  </p>
                </div>
                <div
                  className="text-xs font-semibold"
                  style={{ fontFamily: 'var(--font-mono-ibm), monospace', color: 'var(--brass)' }}
                >
                  2024 - 2028 | <span className="text-[var(--wine)]">CGPA: 8.56</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-3 border-b border-[var(--paper-line)]">
                <div>
                  <h3
                    className="font-bold text-base"
                    style={{ fontFamily: 'var(--font-fraunces), serif', color: 'var(--ink)' }}
                  >
                    Deeksha CFL PU College
                  </h3>
                  <p className="text-xs sm:text-sm" style={{ color: 'var(--ink-soft)' }}>
                    Pre-University (PCMB), State Board
                  </p>
                </div>
                <div
                  className="text-xs font-semibold"
                  style={{ fontFamily: 'var(--font-mono-ibm), monospace', color: 'var(--brass)' }}
                >
                  2022 - 2024 | <span className="text-[var(--wine)]">93.00%</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div>
                  <h3
                    className="font-bold text-base"
                    style={{ fontFamily: 'var(--font-fraunces), serif', color: 'var(--ink)' }}
                  >
                    Jain Vidyaniketan
                  </h3>
                  <p className="text-xs sm:text-sm" style={{ color: 'var(--ink-soft)' }}>
                    10th Standard Secondary School Education
                  </p>
                </div>
                <div
                  className="text-xs font-semibold"
                  style={{ fontFamily: 'var(--font-mono-ibm), monospace', color: 'var(--brass)' }}
                >
                  2021 - 2022 | <span className="text-[var(--wine)]">96.96%</span>
                </div>
              </div>
            </div>
          </section>

          {/* Section 04: Technical Skills */}
          <section className="mb-10">
            <h2
              className="text-xs uppercase tracking-[0.18em] font-bold mb-4 flex items-center gap-2"
              style={{
                fontFamily: 'var(--font-mono-ibm), monospace',
                color: 'var(--wine)',
              }}
            >
              <span>{'// 04'}</span> Technical Skills
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-lg bg-[rgba(30,25,18,0.02)] border border-[var(--paper-line)]">
                <span
                  className="block font-semibold uppercase text-xs mb-1"
                  style={{ fontFamily: 'var(--font-mono-ibm), monospace', color: 'var(--brass)' }}
                >
                  Programming Languages
                </span>
                <p style={{ color: 'var(--ink-soft)' }}>
                  JavaScript (ES6+), Python, Java, C++, C, Rust
                </p>
              </div>

              <div className="p-4 rounded-lg bg-[rgba(30,25,18,0.02)] border border-[var(--paper-line)]">
                <span
                  className="block font-semibold uppercase text-xs mb-1"
                  style={{ fontFamily: 'var(--font-mono-ibm), monospace', color: 'var(--brass)' }}
                >
                  Frameworks & Libraries
                </span>
                <p style={{ color: 'var(--ink-soft)' }}>
                  React.js, Next.js, HTML5, CSS3, Tailwind CSS, Node.js, Express.js, Django
                </p>
              </div>

              <div className="p-4 rounded-lg bg-[rgba(30,25,18,0.02)] border border-[var(--paper-line)]">
                <span
                  className="block font-semibold uppercase text-xs mb-1"
                  style={{ fontFamily: 'var(--font-mono-ibm), monospace', color: 'var(--brass)' }}
                >
                  Databases
                </span>
                <p style={{ color: 'var(--ink-soft)' }}>MongoDB, MySQL, PostgreSQL</p>
              </div>

              <div className="p-4 rounded-lg bg-[rgba(30,25,18,0.02)] border border-[var(--paper-line)]">
                <span
                  className="block font-semibold uppercase text-xs mb-1"
                  style={{ fontFamily: 'var(--font-mono-ibm), monospace', color: 'var(--brass)' }}
                >
                  Tools & Platforms
                </span>
                <p style={{ color: 'var(--ink-soft)' }}>
                  Git, GitHub, VS Code, Figma, Power BI, Oracle Cloud Infrastructure
                </p>
              </div>

              <div className="p-4 rounded-lg bg-[rgba(30,25,18,0.02)] border border-[var(--paper-line)] sm:col-span-2">
                <span
                  className="block font-semibold uppercase text-xs mb-1"
                  style={{ fontFamily: 'var(--font-mono-ibm), monospace', color: 'var(--brass)' }}
                >
                  Core Competencies
                </span>
                <p style={{ color: 'var(--ink-soft)' }}>
                  Data Structures & Algorithms, Object-Oriented Programming, Problem Solving,
                  Debugging, Version Control
                </p>
              </div>
            </div>
          </section>

          {/* Section 05: Certifications & Achievements */}
          <section className="mb-8">
            <h2
              className="text-xs uppercase tracking-[0.18em] font-bold mb-4 flex items-center gap-2"
              style={{
                fontFamily: 'var(--font-mono-ibm), monospace',
                color: 'var(--wine)',
              }}
            >
              <span>{'// 05'}</span> Certifications & Achievements
            </h2>

            <ul className="space-y-2 text-xs sm:text-sm" style={{ color: 'var(--ink-soft)' }}>
              <li className="flex items-start gap-2">
                <span className="text-[var(--wine)] font-bold">✓</span>
                <span>
                  <strong>Oracle Cloud Infrastructure Certified</strong> — Infrastructure
                  administration and cloud fundamentals.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--wine)] font-bold">✓</span>
                <span>
                  <strong>Google Generative AI Fundamentals</strong> — Large Language Models and AI
                  integration.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--wine)] font-bold">✓</span>
                <span>
                  <strong>NPTEL — Programming in Java</strong> — Elite Distinction certification.
                </span>
              </li>
            </ul>
          </section>

          {/* Bottom Download Bar inside Document */}
          <footer className="no-print pt-8 border-t border-[var(--paper-line)] flex flex-col sm:flex-row justify-between items-center gap-4">
            <p
              className="text-xs"
              style={{ fontFamily: 'var(--font-mono-ibm), monospace', color: 'var(--ink-soft)' }}
            >
              Aryan Surya S — Verified Document Format
            </p>

            <a
              href="/Aryan_Surya_S_Resume.pdf"
              download="Aryan_Surya_S_Resume.pdf"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-xs uppercase tracking-wider transition-all"
              style={{
                background: 'var(--wine)',
                color: 'var(--paper)',
                boxShadow: '0 4px 14px var(--wine-glow)',
              }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Download Resume (PDF)
            </a>
          </footer>
        </article>
      </main>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          .no-print {
            display: none !important;
          }
          body {
            background: white !important;
            color: black !important;
          }
          main {
            padding: 0 !important;
          }
          .resume-document {
            border: none !important;
            box-shadow: none !important;
            padding: 0 !important;
            max-width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
}
