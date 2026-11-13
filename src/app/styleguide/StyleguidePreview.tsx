'use client';

import { useState, type FormEvent } from 'react';
import type { TailwindBrandTokens, TypographyToken } from '@/lib/context-dev/tokens';
import { DEFAULT_DOMAIN, DEFAULT_MAX_AGE_MS } from '@/lib/context-dev/constants';

interface ApiResponse {
  tokens: TailwindBrandTokens;
  cache: {
    status?: 'hit' | 'miss' | 'zdr';
    ageMs?: number;
  };
}

interface ApiFailure {
  error?: {
    code?: string;
    message?: string;
  };
}

const COLOR_LABELS = [
  ['accent', 'Accent'],
  ['background', 'Background'],
  ['text', 'Text'],
] as const;

function isApiResponse(value: unknown): value is ApiResponse {
  return (
    typeof value === 'object' &&
    value !== null &&
    'tokens' in value &&
    typeof value.tokens === 'object' &&
    value.tokens !== null
  );
}

function formatTypography(token: TypographyToken): string {
  return [
    token.fontFamily.join(', '),
    token.fontSize,
    token.fontWeight ? `weight ${token.fontWeight}` : undefined,
    token.lineHeight ? `line-height ${token.lineHeight}` : undefined,
    token.letterSpacing ? `letter-spacing ${token.letterSpacing}` : undefined,
  ]
    .filter(Boolean)
    .join(' · ');
}

export default function StyleguidePreview() {
  const [domain, setDomain] = useState(DEFAULT_DOMAIN);
  const [result, setResult] = useState<ApiResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [busy, setBusy] = useState(false);

  async function extractStyleguide(maxAgeMs: number) {
    setBusy(true);
    setErrorMessage('');

    try {
      const params = new URLSearchParams({
        domain: domain.trim() || DEFAULT_DOMAIN,
        maxAgeMs: String(maxAgeMs),
      });
      const response = await fetch(`/api/styleguide?${params}`, { cache: 'no-store' });
      const payload: unknown = await response.json();

      if (!response.ok) {
        const failure = payload as ApiFailure;
        const retryAfter = response.headers.get('Retry-After');
        const retryMessage = retryAfter ? ` Retry after ${retryAfter} seconds.` : '';
        throw new Error(
          `${failure.error?.message ?? 'Could not extract this styleguide.'}${retryMessage}`
        );
      }

      if (!isApiResponse(payload)) {
        throw new Error('The styleguide endpoint returned an unexpected response.');
      }

      setResult(payload);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unexpected styleguide error.');
    } finally {
      setBusy(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void extractStyleguide(DEFAULT_MAX_AGE_MS);
  }

  const tokens = result?.tokens;
  const typographyEntries = [
    ...Object.entries(tokens?.typography.headings ?? {}).map(
      ([key, token]) => [key, token] as const
    ),
    ...(tokens?.typography.body ? [['body', tokens.typography.body] as const] : []),
  ];
  const spacingEntries = Object.entries(tokens?.spacing ?? {});
  const shadowEntries = Object.entries(tokens?.shadows ?? {});
  const componentEntries = [
    ...Object.entries(tokens?.componentCss.buttons ?? {}).map(
      ([key, css]) => [`button ${key}`, css] as const
    ),
    ...(tokens?.componentCss.card ? [['card', tokens.componentCss.card] as const] : []),
  ];
  const fontFaces = Object.values(tokens?.fontLinks ?? {}).flat();

  return (
    <div className="styleguide-page">
      <div className="content-shell">
        <header className="styleguide-header">
          <div>
            <p className="eyebrow">Brand intelligence / Preview</p>
            <h1 className="sec-head">Styleguide tokens</h1>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-[var(--ink-soft)]">
            Extract, inspect, and export a website&apos;s design system as Tailwind theme tokens.
            Nothing is requested until you choose an action.
          </p>
        </header>

        <form className="styleguide-form" onSubmit={handleSubmit}>
          <label className="styleguide-field">
            Website domain
            <input
              autoComplete="url"
              name="domain"
              onChange={(event) => setDomain(event.target.value)}
              placeholder="example.com"
              required
              value={domain}
            />
          </label>
          <p className="styleguide-cost-note">
            Uses cached results up to 3 months old. A cache miss may consume 10 credits.
          </p>
          <button className="styleguide-action" disabled={busy} type="submit">
            {busy ? 'Extracting…' : 'Extract styleguide'}
          </button>
          <button
            className="styleguide-action"
            disabled={busy}
            onClick={() => void extractStyleguide(0)}
            type="button"
          >
            Refresh · may use 10 credits
          </button>
        </form>

        {errorMessage && (
          <p className="styleguide-error" role="alert">
            {errorMessage}
          </p>
        )}
        {busy && (
          <p className="styleguide-status" role="status" aria-live="polite">
            Asking Context.dev to inspect {domain.trim() || DEFAULT_DOMAIN}…
          </p>
        )}

        {result && tokens && (
          <div className="styleguide-result">
            <p className="styleguide-status" role="status">
              Showing {tokens.domain}
              {tokens.mode ? ` · ${tokens.mode} mode` : ''}
              {result.cache.status ? ` · cache ${result.cache.status}` : ''}
              {result.cache.ageMs !== undefined ? ` · ${result.cache.ageMs}ms old` : ''}
            </p>

            <section className="styleguide-card" aria-labelledby="token-colors">
              <h2 id="token-colors">Colors</h2>
              <div className="styleguide-color-list">
                {COLOR_LABELS.map(([key, label]) => {
                  const color = tokens.colors[key];
                  if (!color) return null;
                  return (
                    <div className="styleguide-color" key={key}>
                      <span
                        className="styleguide-color-swatch"
                        style={{ backgroundColor: color }}
                      />
                      <strong>{label}</strong>
                      <span>{color}</span>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="styleguide-card" aria-labelledby="token-type">
              <h2 id="token-type">Typography</h2>
              {typographyEntries.length ? (
                <div className="styleguide-token-list">
                  {typographyEntries.map(([key, token]) => (
                    <div className="styleguide-token" key={key}>
                      <strong>{key}</strong>
                      {formatTypography(token)}
                    </div>
                  ))}
                </div>
              ) : (
                <p>No typography tokens were returned.</p>
              )}
              {fontFaces.length > 0 && (
                <div className="mt-5">
                  <p className="text-sm text-[var(--ink-soft)]">
                    Downloadable font faces were discovered. Review their licenses before shipping
                    font files.
                  </p>
                  {fontFaces.map((face) => (
                    <a
                      className="styleguide-font-link"
                      href={face.url}
                      key={`${face.family}-${face.weight}-${face.style}-${face.url}`}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {face.family} · {face.weight} · {face.style}
                    </a>
                  ))}
                </div>
              )}
            </section>

            <section className="styleguide-card" aria-labelledby="token-spacing">
              <h2 id="token-spacing">Spacing &amp; shadows</h2>
              <div className="styleguide-token-list">
                {spacingEntries.map(([key, value]) => (
                  <div className="styleguide-token" key={`spacing-${key}`}>
                    <strong>Spacing / {key}</strong>
                    {value}
                  </div>
                ))}
                {shadowEntries.map(([key, value]) => (
                  <div className="styleguide-token" key={`shadow-${key}`}>
                    <strong>Shadow / {key}</strong>
                    {value}
                  </div>
                ))}
                {!spacingEntries.length && !shadowEntries.length && (
                  <p>No spacing or shadow tokens were returned.</p>
                )}
              </div>
            </section>

            <section className="styleguide-card" aria-labelledby="token-components">
              <h2 id="token-components">Component CSS</h2>
              {componentEntries.length ? (
                <div className="styleguide-token-list">
                  {componentEntries.map(([key, css]) => (
                    <div className="styleguide-token" key={key}>
                      <strong>{key}</strong>
                      <pre className="styleguide-pre">{css}</pre>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No component CSS was returned.</p>
              )}
            </section>

            <section className="styleguide-card" aria-labelledby="token-tailwind">
              <h2 id="token-tailwind">Tailwind config</h2>
              <pre className="styleguide-pre" tabIndex={0}>
                {JSON.stringify(tokens.tailwindConfig, null, 2)}
              </pre>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
