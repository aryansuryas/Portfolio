import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const imageHosts = [
  { protocol: 'https', hostname: 'images.unsplash.com' },
  { protocol: 'https', hostname: 'images.pexels.com' },
  { protocol: 'https', hostname: 'images.pixabay.com' },
  { protocol: 'https', hostname: 'img.rocket.new' },
  { protocol: 'https', hostname: 'cdn.jsdelivr.net' },
  { protocol: 'https', hostname: 'cdn.simpleicons.org' },
];

const nextConfig = {
  outputFileTracingRoot: __dirname,
  devIndicators: false,
  productionBrowserSourceMaps: false,
  distDir: process.env.DIST_DIR || '.next',
  images: {
    remotePatterns: imageHosts,
    minimumCacheTTL: 60,
    qualities: [75, 85, 100],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
  webpack(config, { dev }) {
    if (dev) {
      const ignoredPaths = (process.env.WATCH_IGNORED_PATHS || '')
        .split(',')
        .map((p) => p.trim())
        .filter(Boolean);
      config.watchOptions = {
        ignored: ignoredPaths.length
          ? ignoredPaths.map((p) => `**/${p.replace(/^\/+|\/+$/g, '')}/**`)
          : undefined,
      };
    }
    return config;
  },
};

export default nextConfig;