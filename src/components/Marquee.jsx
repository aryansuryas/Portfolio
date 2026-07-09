import { MARQUEE_TEXT } from '../data/content';

export default function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track font-mono marquee-text">
        <span>{MARQUEE_TEXT}</span>
        <span>{MARQUEE_TEXT}</span>
      </div>
    </div>
  );
}
