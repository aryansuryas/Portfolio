const svgStyle = { display: 'block', width: '100%', height: '100%' };

export function CodeSenseSVG() {
  return (
    <svg viewBox="0 0 640 400" preserveAspectRatio="none" style={svgStyle} role="img" aria-label="Abstract code editor pattern">
      <rect width="640" height="400" fill="#1a1512" />
      <rect x="0" y="0" width="640" height="30" fill="#221c17" />
      <circle cx="20" cy="15" r="5" fill="#7A1220" />
      <circle cx="38" cy="15" r="5" fill="#A6813F" />
      <circle cx="56" cy="15" r="5" fill="#5B4A3F" />
      <g fontFamily="monospace" fontSize="13">
        <text x="30" y="68" fill="#7A1220">const</text>
        <text x="85" y="68" fill="#FBF7EC">review = await claude.analyze(code);</text>
        <text x="30" y="98" fill="#5B4A3F">// structured feedback engine</text>
        <text x="30" y="128" fill="#7A1220">function</text>
        <text x="105" y="128" fill="#FBF7EC">scoreQuality(ast) {'{'}</text>
        <text x="55" y="158" fill="#FBF7EC">return rules.map(r =&gt; r.check(ast));</text>
        <text x="30" y="188" fill="#FBF7EC">{'}'}</text>
      </g>
      <g stroke="#7A1220" strokeWidth="0.5" opacity="0.3">
        <line x1="0" y1="280" x2="640" y2="280" />
        <line x1="160" y1="260" x2="160" y2="400" />
        <line x1="320" y1="260" x2="320" y2="400" />
        <line x1="480" y1="260" x2="480" y2="400" />
      </g>
      <rect x="480" y="300" width="120" height="14" fill="#7A1220" opacity="0.7" />
      <rect x="40" y="340" width="200" height="14" fill="#A6813F" opacity="0.6" />
    </svg>
  );
}

export function CassGXSVG() {
  return (
    <svg viewBox="0 0 640 400" preserveAspectRatio="none" style={svgStyle} role="img" aria-label="Dark gaming grid pattern">
      <rect width="640" height="400" fill="#100d0b" />
      <g stroke="#7A1220" strokeWidth="0.6" opacity="0.4">
        <line x1="0" y1="100" x2="640" y2="100" />
        <line x1="0" y1="200" x2="640" y2="200" />
        <line x1="0" y1="300" x2="640" y2="300" />
        <line x1="160" y1="0" x2="160" y2="400" />
        <line x1="320" y1="0" x2="320" y2="400" />
        <line x1="480" y1="0" x2="480" y2="400" />
      </g>
      <polygon points="320,120 380,220 260,220" fill="none" stroke="#A6813F" strokeWidth="2.5" />
      <polygon points="320,150 355,210 285,210" fill="#7A1220" />
      <text x="320" y="270" textAnchor="middle" fontFamily="monospace" fontWeight="700" fontSize="26" letterSpacing="9" fill="#FBF7EC">
        CASSGX
      </text>
      <text x="320" y="294" textAnchor="middle" fontFamily="monospace" fontSize="9" letterSpacing="4" fill="#A6813F">
        GAMING · TECH · AI SHORTS
      </text>
    </svg>
  );
}

export function BattlePlanSVG() {
  return (
    <svg viewBox="0 0 640 400" preserveAspectRatio="none" style={svgStyle} role="img" aria-label="Graph node network pattern">
      <rect width="640" height="400" fill="#F1E9D8" />
      <g stroke="#7A1220" strokeWidth="1" opacity="0.55">
        <line x1="100" y1="100" x2="250" y2="60" />
        <line x1="100" y1="100" x2="200" y2="220" />
        <line x1="250" y1="60" x2="400" y2="130" />
        <line x1="200" y1="220" x2="400" y2="130" />
        <line x1="400" y1="130" x2="540" y2="80" />
        <line x1="400" y1="130" x2="480" y2="280" />
        <line x1="200" y1="220" x2="320" y2="330" />
        <line x1="320" y1="330" x2="480" y2="280" />
      </g>
      <g fill="#7A1220">
        <circle cx="100" cy="100" r="9" />
        <circle cx="250" cy="60" r="6" />
        <circle cx="400" cy="130" r="11" />
        <circle cx="200" cy="220" r="7" />
        <circle cx="540" cy="80" r="5" />
        <circle cx="480" cy="280" r="8" />
        <circle cx="320" cy="330" r="6" />
      </g>
      <text x="320" y="385" textAnchor="middle" fontFamily="monospace" fontWeight="700" fontSize="11" letterSpacing="5" fill="#7A1220">
        228 CONCEPTS · 15 PHASES · 9 WEEKS
      </text>
    </svg>
  );
}

export const PROJECT_SVGS = {
  codesense: CodeSenseSVG,
  cassgx: CassGXSVG,
  battleplan: BattlePlanSVG
};
