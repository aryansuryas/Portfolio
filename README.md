# Aryan Surya S — Portfolio

A modern, editorial-style portfolio website built with Next.js, React, TypeScript, and Tailwind CSS.

## Features
- Responsive landing experience
- Project showcase and technology stack sections
- Education and achievements highlights
- Contact form with EmailJS integration
- Resume download and portfolio navigation

## Tech Stack
- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- EmailJS

## Getting Started

### Install dependencies
```bash
npm install
```

### Run locally
```bash
npm run dev
```

Open http://localhost:4028

## Environment Variables
Create a local file named `.env.local` with:
```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

## Deployment
This project is ready for deployment on Vercel.

## Notes
- Keep `.env.local` out of version control.
- The repository uses `.gitignore` to exclude local environment files and build output.
