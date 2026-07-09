import { useEffect, useRef } from 'react';

export default function ProgressBar() {
  const barRef = useRef(null);
  const tickingRef = useRef(false);

  useEffect(() => {
    const update = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      if (barRef.current) {
        barRef.current.style.width = `${max > 0 ? (h.scrollTop / max) * 100 : 0}%`;
      }
      tickingRef.current = false;
    };

    const onScroll = () => {
      if (!tickingRef.current) {
        requestAnimationFrame(update);
        tickingRef.current = true;
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return <div id="progress" ref={barRef} aria-hidden="true" />;
}
