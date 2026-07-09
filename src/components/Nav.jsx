import { useMemo } from 'react';
import { NAV_LINKS } from '../data/content';
import useScrollSpy from '../hooks/useScrollSpy';

export default function Nav() {
  const ids = useMemo(() => NAV_LINKS.map(l => l.id), []);
  const activeId = useScrollSpy(ids);

  return (
    <nav id="pill-nav" aria-label="Primary">
      {NAV_LINKS.map(link => (
        <a key={link.id} href={`#${link.id}`} className={`nav-item ${activeId === link.id ? 'active' : ''}`.trim()}>
          <i className={link.icon} aria-hidden="true"></i>
          <span className="nav-text">{link.label}</span>
        </a>
      ))}
    </nav>
  );
}
