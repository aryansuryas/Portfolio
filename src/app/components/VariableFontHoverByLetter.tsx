'use client';
import * as React from 'react';
import { useState } from 'react';

type Props = {
  label: string;
  fromWeight: number;
  toWeight: number;
  staggerDuration: number;
  staggerFrom: 'first' | 'last' | 'center' | 'random';
  fontSize: string | number;
  color: string;
  onClick?: () => void;
  style?: React.CSSProperties;
};

const COMPONENT_DEFAULTS = {
  label: 'WEIGHT HOVER',
  fromWeight: 800,
  toWeight: 900,
  fontSize: 120,
  color: '#FFFFFF',
  staggerDuration: 30,
  staggerFrom: 'random' as const,
};

export default function VariableFontHoverByLetter(props: Props) {
  const mergedProps = { ...COMPONENT_DEFAULTS, ...props };
  const { label, fromWeight, toWeight, fontSize, color, onClick, style } = mergedProps;
  const [hovered, setHovered] = useState(false);

  const letters = label ? label.split('') : [];
  const fromSettings = `'wght' ${fromWeight}`;
  const toSettings = `'wght' ${toWeight}`;
  const activeWeight = hovered ? toWeight : fromWeight;

  const srOnlyStyle: React.CSSProperties = {
    position: 'absolute',
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: 'hidden',
    clip: 'rect(0,0,0,0)',
    whiteSpace: 'nowrap',
    borderWidth: 0,
  };

  const innerSpanStyle: React.CSSProperties = {
    fontFamily: VARIABLE_FONT_STACK,
    fontSize,
    color,
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        cursor: onClick ? 'pointer' : 'default',
        ...style,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      <style>{INTER_VARIABLE_FONT_FACE}</style>
      {letters.length === 0 ? null : (
        <span style={innerSpanStyle}>
          <span style={srOnlyStyle}>{label}</span>
          {letters.map((letter, i) => {
            const isSpace = letter === ' ';
            return (
              <span
                key={`${letter}-${i}`}
                aria-hidden
                style={{
                  display: 'inline-block',
                  whiteSpace: isSpace ? 'pre' : 'normal',
                  fontWeight: activeWeight,
                  fontVariationSettings: hovered ? toSettings : fromSettings,
                  transition:
                    'font-weight 0.2s ease, font-variation-settings 0.2s ease, transform 0.2s ease',
                  transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
                  transitionDelay: `${Math.min(i * 0.02, 0.24)}s`,
                }}
              >
                {letter}
              </span>
            );
          })}
        </span>
      )}
    </div>
  );
}

const INTER_VARIABLE_FONT_FACE = `
@font-face {
  font-family: "InterVariableFramer";
  src: url("https://rsms.me/inter/font-files/InterVariable.woff2?v=4.0") format("woff2-variations");
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: "InterVariableFramer";
  src: url("https://rsms.me/inter/font-files/InterVariable-Italic.woff2?v=4.0") format("woff2-variations");
  font-weight: 100 900;
  font-style: italic;
  font-display: swap;
}
`;

const VARIABLE_FONT_STACK =
  '"InterVariableFramer", "Inter Variable", "Inter", system-ui, sans-serif';
