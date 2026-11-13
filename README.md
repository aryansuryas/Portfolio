# Aryan Surya S - Portfolio

A responsive portfolio built with Next.js 15, React 19, TypeScript, and Tailwind CSS.

## Features

- Project cards with an interactive project-details dialog
- Scroll-driven, overlapping Featured Work cards
- Responsive technology gallery and social profile cards
- Education, achievements, resume, and contact form
- Optional Context.dev styleguide preview at `/styleguide`

## Requirements

- Node.js 20 or newer
- npm

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:4028](http://localhost:4028).

## Environment

Copy `.env.example` to `.env.local` and configure the values you need:

- `NEXT_PUBLIC_SITE_URL` sets the canonical site origin. Production defaults to `https://aryansurya.com`; development defaults to `http://localhost:4028`.
- `NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`, and `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` enable contact form submissions. The form reports when these settings are missing.
- `CONTEXT_DEV_API_KEY` enables styleguide extraction. It is server-side only; no extraction request is made until the preview is submitted. A cache miss may consume Context.dev credits.

Never commit `.env.local` or real credentials.

## Validation and token demo

```bash
npm run type-check
npm run lint
npm run test:tokens
npm run build
```

`npm run test:tokens` uses mocked responses and does not call Context.dev. The demo makes a live request and may consume credits:

```bash
npm run tokens:demo -- wildyriftian.com
```

## Deployment

The project is configured for Vercel. Set `NEXT_PUBLIC_SITE_URL` and the required service credentials in the deployment environment.
