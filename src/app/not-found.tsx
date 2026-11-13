'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  const router = useRouter();

  const handleGoHome = () => {
    router?.push('/');
  };

  const handleGoBack = () => {
    if (window.history.length > 1) window.history.back();
    else router.push('/');
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[var(--background)] p-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <h1 className="text-9xl font-bold text-[var(--wine)] opacity-20">404</h1>
          </div>
        </div>

        <h2 className="text-2xl font-medium text-[var(--ink)] mb-2">Page Not Found</h2>
        <p className="text-[var(--ink-soft)] mb-8">
          The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={handleGoBack} className="button button-primary">
            <ArrowLeft size={16} aria-hidden="true" />
            Go Back
          </button>

          <button onClick={handleGoHome} className="button button-secondary">
            <Home size={16} aria-hidden="true" />
            Back to Home
          </button>
        </div>
      </div>
    </main>
  );
}
