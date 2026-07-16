import { useEffect, useRef } from 'react';

/**
 * Drop-in replacement for the original site's IntersectionObserver reveal
 * system. Renders `as` (default div) with className="rv <className>" and
 * adds "active" the first time it scrolls into view, which is what the
 * .rv / .rv-up / .rv-left / .rv-right / .rv-scale and .tl-item CSS key off.
 */
export default function Reveal({ as: Tag = 'div', className = '', children, ...rest }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      el.classList.add('active');
      return undefined;
    }

    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={`rv ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  );
}
