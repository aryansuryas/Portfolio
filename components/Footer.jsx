import { SOCIALS } from '../data/content';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-row">
          <div className="footer-socials">
            {SOCIALS.map(social => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith('http') ? '_blank' : undefined}
                rel={social.href.startsWith('http') ? 'noopener' : undefined}
                className="social-icon"
                aria-label={social.label}
              >
                <i className={social.icon} style={{ fontSize: '24px' }}></i>
              </a>
            ))}
          </div>
          <a href="#hero" className="back-to-top" aria-label="Back to top">
            <i className="fa-solid fa-arrow-up"></i>
          </a>
        </div>
        <div className="hairline footer-hairline" />
        <div className="footer-meta-row font-mono">
          <span className="footer-meta">Architectural monolith · Aryan Surya S</span>
          <span className="footer-meta">© 2026 all rights reserved</span>
        </div>
      </div>
    </footer>
  );
}
