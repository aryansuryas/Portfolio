import type { Metadata } from 'next';
import SiteFooter from '../components/SiteFooter';
import SiteNav from '../components/SiteNav';
import { ThemeProvider } from '../components/ThemeProvider';
import StyleguidePreview from './StyleguidePreview';

export const metadata: Metadata = {
  title: 'Styleguide Tokens | Aryan Surya S',
  description: 'Inspect and export extracted website design tokens as a Tailwind theme.',
};

export default function StyleguidePage() {
  return (
    <ThemeProvider>
      <SiteNav />
      <main>
        <StyleguidePreview />
      </main>
      <SiteFooter />
    </ThemeProvider>
  );
}
