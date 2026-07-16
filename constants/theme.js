// Design tokens shared between global.css and any component that needs
// raw color values in JS (Three.js materials, React Bits color props, etc).
// Keep these in sync with the CSS custom properties in src/styles/global.css.

export const THEME = {
  paper: '#FBF7EC',
  paperPanel: '#F1E9D8',
  paperLine: 'rgba(30,25,18,0.14)',
  ink: '#1E1912',
  inkSoft: '#40311F',
  inkFaint: 'rgba(30,25,18,0.5)',
  wine: '#7A1220',
  wineDark: '#530C16',
  wineGlow: 'rgba(122,18,32,0.35)',
  brass: '#A6813F'
};

// Numeric hex (0xRRGGBB) versions for three.js Material color props.
export const THEME_HEX = {
  paper: 0xfbf7ec,
  ink: 0x1e1912,
  wine: 0x7a1220,
  wineDark: 0x530c16,
  brass: 0xa6813f
};
