import Reveal from './Reveal';
import ScrollFloat from '../reactbits/ScrollFloat/ScrollFloat';
import GradientText from '../reactbits/GradientText/GradientText';
import { THEME } from '../constants/theme';

/**
 * Every big section title on the site is built from two React Bits
 * components: the plain-text part scrubs in character-by-character on
 * scroll (ScrollFloat), and the emphasized word shimmers with a wine/brass
 * gradient sweep (GradientText) — replacing the original's static
 * <em> italic treatment with the same visual language, animated.
 */
export default function SectionHeading({ pre = '', emphasis = '', stacked = false, eyebrow = '' }) {
  return (
    <Reveal className="rv-up" style={{ marginTop: '1rem' }}>
      {eyebrow && <p className="section-eyebrow" style={{ marginBottom: '1.1rem' }}>{eyebrow}</p>}
      <div className={`sec-head-row ${stacked ? 'sec-head-row--stack' : ''}`.trim()}>
        {pre && (
          <ScrollFloat
            containerClassName="sec-head"
            textClassName="sec-head-text"
            animationDuration={0.9}
            stagger={0.02}
            scrollStart="center bottom+=15%"
            scrollEnd="bottom bottom-=25%"
          >
            {pre}
          </ScrollFloat>
        )}
        {emphasis && (
          <GradientText
            className="sec-head-emphasis"
            colors={[THEME.wine, THEME.brass, THEME.wine]}
            animationSpeed={5}
            pauseOnHover
          >
            {emphasis}
          </GradientText>
        )}
      </div>
    </Reveal>
  );
}
