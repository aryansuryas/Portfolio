import { useEffect, useState } from 'react';

/**
 * Watches the given section ids and returns whichever one currently sits in
 * the "active" band of the viewport, mirroring the original site's nav
 * highlight behaviour (rootMargin biases the trigger toward the upper third).
 */
export default function useScrollSpy(ids, rootMargin = '-40% 0px -55% 0px') {
  const [activeId, setActiveId] = useState(ids[0]);

  useEffect(() => {
    const sections = ids.map(id => document.getElementById(id)).filter(Boolean);
    if (!sections.length) return undefined;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin }
    );

    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids.join(',')]);

  return activeId;
}
