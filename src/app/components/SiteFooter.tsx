import React from 'react';
export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="content-shell footer-minimal footer-centered">
        <p>© {new Date().getFullYear()} Aryan Surya S</p>
      </div>
    </footer>
  );
}
