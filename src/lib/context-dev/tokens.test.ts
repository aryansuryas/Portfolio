import assert from 'node:assert/strict';
import { test } from 'node:test';
import { transformStyleguide } from './tokens';

const mockedStyleguide = {
  mode: 'light',
  colors: { accent: '#244A3A', background: '#FBF7EC', text: '#26251F' },
  typography: {
    headings: {
      h1: {
        fontFamily: 'Fraunces',
        fontFallbacks: ['Fraunces', 'Georgia', 'serif'],
        fontSize: '56px',
        fontWeight: 600,
        lineHeight: '1.1',
        letterSpacing: '-0.02em',
      },
    },
    p: {
      fontFamily: 'Inter',
      fontFallbacks: ['Inter', 'Arial', 'sans-serif'],
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '1.5',
      letterSpacing: '0',
    },
  },
  elementSpacing: { xs: '4px', sm: '8px', md: '16px', lg: '24px', xl: '32px' },
  shadows: {
    sm: '0 1px 2px #0002',
    md: '0 4px 8px #0002',
    lg: '0 8px 16px #0002',
    xl: '0 16px 32px #0002',
    inner: 'inset 0 1px 2px #0002',
  },
  fontLinks: {
    Fraunces: {
      type: 'google',
      faces: [{ url: 'https://fonts.example/fraunces.woff2', style: 'normal', weight: '400 700' }],
    },
    Inter: { type: 'google' },
  },
  components: {
    button: {
      primary: { css: 'background-color: #244A3A; color: #FBF7EC;' },
      secondary: { css: 'border: 1px solid #244A3A;' },
      link: { css: 'color: #244A3A; text-decoration: underline;' },
    },
    card: { css: 'background-color: #FFFDF7; border-radius: 12px;' },
  },
};

test('maps styleguide fields into Tailwind tokens and component CSS', () => {
  const tokens = transformStyleguide('wildyriftian.com', mockedStyleguide);

  assert.equal(tokens.domain, 'wildyriftian.com');
  assert.equal(tokens.mode, 'light');
  assert.equal(tokens.colors.accent, '#244A3A');
  assert.deepEqual(tokens.tailwindConfig.theme.extend.fontFamily.brandHeading, [
    'Fraunces',
    'Georgia',
    'serif',
  ]);
  assert.deepEqual(tokens.tailwindConfig.theme.extend.fontSize['brand-h1'], [
    '56px',
    { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: 600 },
  ]);
  assert.equal(tokens.tailwindConfig.theme.extend.spacing['brand-md'], '16px');
  assert.equal(
    tokens.tailwindConfig.theme.extend.boxShadow['brand-inner'],
    'inset 0 1px 2px #0002'
  );
  assert.equal(tokens.fontLinks.Fraunces[0].family, 'Fraunces');
  assert.equal(Object.values(tokens.fontLinks).flat().length, 1);
  assert.match(tokens.componentCss.buttons.primary ?? '', /background-color: #244A3A/);
  assert.match(tokens.componentCss.card ?? '', /border-radius: 12px/);
});

test('keeps font fallbacks when a font has no downloadable face', () => {
  const tokens = transformStyleguide('example.com', {
    typography: {
      headings: {
        h2: { fontFallbacks: ['Custom Font', 'Georgia', 'serif'] },
      },
    },
    fontLinks: { 'Custom Font': { type: 'custom' } },
  });

  assert.deepEqual(tokens.typography.headings.h2?.fontFamily, ['Custom Font', 'Georgia', 'serif']);
  assert.deepEqual(tokens.fontLinks, {});
  assert.deepEqual(tokens.tailwindConfig.theme.extend.fontFamily.brandHeading, [
    'Custom Font',
    'Georgia',
    'serif',
  ]);
});

test('handles missing optional styleguide fields without throwing', () => {
  const tokens = transformStyleguide('example.com', { mode: 'dark' });

  assert.equal(tokens.mode, 'dark');
  assert.deepEqual(tokens.colors, {});
  assert.deepEqual(tokens.spacing, {});
  assert.deepEqual(tokens.shadows, {});
  assert.deepEqual(tokens.fontLinks, {});
  assert.deepEqual(tokens.componentCss.buttons, {});
});
