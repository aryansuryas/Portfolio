import TrueFocus from '../reactbits/TrueFocus/TrueFocus';
import Reveal from './Reveal';
import { THEME } from '../constants/theme';

export default function Statement() {
  return (
    <section className="statement-section">
      <div className="wrap">
        <Reveal className="rv-up" style={{ textAlign: 'center' }}>
          <p className="section-eyebrow" style={{ justifyContent: 'center', marginBottom: '2rem' }}>
            PHILOSOPHY
          </p>
          <div className="statement-strip">
            <TrueFocus
              sentence="Design Engineer Ship Repeat"
              blurAmount={6}
              borderColor={THEME.wine}
              glowColor="rgba(122,18,32,0.55)"
              animationDuration={0.4}
              pauseBetweenAnimations={1.2}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
