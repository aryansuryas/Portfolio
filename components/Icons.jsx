// Inline SVG icon set — replaces the Font Awesome CDN. Every icon is a single
// currentColor path set so it inherits text color and needs zero network requests.

const PATHS = {
  layout: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 21V9" />
    </>
  ),
  server: (
    <>
      <rect x="2" y="3" width="20" height="7" rx="2" />
      <rect x="2" y="14" width="20" height="7" rx="2" />
      <path d="M6 6.5h.01M6 17.5h.01" />
    </>
  ),
  code: <path d="m8 6-6 6 6 6M16 6l6 6-6 6" />,
  sparks: (
    <path d="M12 2l2.1 5.9L20 10l-5.9 2.1L12 18l-2.1-5.9L4 10l5.9-2.1L12 2zM19 15l1 2.8 2.8 1-2.8 1L19 22l-1-2.8-2.8-1 2.8-1 1-2.2z" />
  ),
  cloud: <path d="M17.5 19a4.5 4.5 0 0 0 .4-8.98 7 7 0 0 0-13.6 1.9A4 4 0 0 0 6 19h11.5z" />,
  wrench: (
    <path d="M14.7 6.3a4.5 4.5 0 0 0-6 5.9L3 18a2.1 2.1 0 0 0 3 3l5.8-5.7a4.5 4.5 0 0 0 5.9-6l-3.2 3.2-2.8-.7-.7-2.8 3.7-2.7z" />
  ),
  rocket: (
    <path d="M4.5 16.5 3 21l4.5-1.5M15 4.8C17 3 19.5 2.5 21.5 2.5c0 2-.5 4.5-2.3 6.5L12 16.2 7.8 12 15 4.8zM7.8 12l-3.3 1 2-3.5M12 16.2l-1 3.3 3.5-2M14.5 9.5h.01" />
  ),
  trophy: (
    <path d="M8 21h8m-4-4v4m-6-17h12v5a6 6 0 0 1-12 0V4zM6 6H3.5A1.5 1.5 0 0 0 2 7.5 4.5 4.5 0 0 0 6.5 12M18 6h2.5A1.5 1.5 0 0 1 22 7.5 4.5 4.5 0 0 1 17.5 12" />
  ),
  github: (
    <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
  ),
  linkedin: (
    <>
      <path d="M8 11v5m0-8v.01M12 16v-5m0 0a2.5 2.5 0 0 1 5 0v5" />
      <rect x="3" y="3" width="18" height="18" rx="2" />
    </>
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5h.01" />
    </>
  ),
  youtube: (
    <>
      <path d="M2.5 17a24 24 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49 49 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24 24 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49 49 0 0 1-16.2 0A2 2 0 0 1 2.5 17z" />
      <path d="m10 15 5-3-5-3v6z" />
    </>
  ),
  bluesky: (
    <path d="M12 10.5C10.8 7.9 8 4.5 5 3c-1.6-.8-3 .1-3 2.2 0 3.6 1 7.6 4.5 8.8-2 .4-3.6 1.4-2.2 3.6 2.6 4.1 5.4 1 7.7-3.1 2.3 4.1 5.1 7.2 7.7 3.1 1.4-2.2-.2-3.2-2.2-3.6C21 12.8 22 8.8 22 5.2 22 3.1 20.6 2.2 19 3c-3 1.5-5.8 4.9-7 7.5z" />
  ),
  mail: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 7 10 7L22 7" />
    </>
  ),
  copy: (
    <>
      <rect x="9" y="9" width="12" height="12" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </>
  ),
  check: <path d="m4 12.5 5.5 5.5L20 6.5" />,
  arrowDown: <path d="M12 4v16m0 0 6-6m-6 6-6-6" />,
  arrowUpRight: <path d="M7 17 17 7m0 0H8m9 0v9" />,
  arrowRight: <path d="M4 12h16m0 0-6-6m6 6-6 6" />,
  pin: (
    <>
      <path d="M12 21s-7-6.1-7-11a7 7 0 0 1 14 0c0 4.9-7 11-7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  )
};

export default function Icon({ name, size = 20, strokeWidth = 1.7, className = '' }) {
  const path = PATHS[name];
  if (!path) return null;
  return (
    <svg
      className={`icon ${className}`.trim()}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {path}
    </svg>
  );
}
