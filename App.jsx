import { useCallback, useEffect, useRef, useState } from 'react';
import useLenis from './hooks/useLenis';
import Portal from './components/Portal';
import CustomCursor from './components/CustomCursor';
import ProgressBar from './components/ProgressBar';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Statement from './components/Statement';
import HowIBuild from './components/HowIBuild';
import Skills from './components/Skills';
import Journey from './components/Journey';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [phase, setPhase] = useState('portal'); // portal -> expanding -> flash -> revealed -> done
  const timeoutsRef = useRef([]);
  useLenis();

  const isRevealed = phase === 'revealed' || phase === 'done';

  useEffect(() => {
    document.body.classList.toggle('locked', !isRevealed);
  }, [isRevealed]);

  // Clear any still-pending portal timeouts if the app were ever unmounted.
  useEffect(() => () => timeoutsRef.current.forEach(clearTimeout), []);

  const handleEnter = useCallback(() => {
    setPhase('expanding');
    timeoutsRef.current.push(setTimeout(() => setPhase('flash'), 750));
    timeoutsRef.current.push(setTimeout(() => setPhase('revealed'), 1150));
    timeoutsRef.current.push(setTimeout(() => setPhase('done'), 2050));
  }, []);

  const mainClass = ['main-wrap', isRevealed ? 'revealed' : '', phase === 'done' ? 'done' : ''].filter(Boolean).join(' ');

  return (
    <>
      <div id="grid-backdrop" aria-hidden="true" />
      <div id="noise-overlay" aria-hidden="true" />
      <div className="ambient-orb o1" aria-hidden="true" />
      <div className="ambient-orb o2" aria-hidden="true" />

      <ProgressBar />
      <CustomCursor />
      <Portal phase={phase} onEnter={handleEnter} />
      <Nav />

      <div id="main-wrap" className={mainClass}>
        <Hero wordsOn={isRevealed} />
        <Marquee />
        <Statement />
        <HowIBuild />
        <Skills />
        <Journey />
        <Projects />
        <Achievements />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
