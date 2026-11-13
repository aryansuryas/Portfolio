import { NextResponse } from 'next/server';
import {
  BrandStyleguideError,
  getBrandTokens,
  type BrandStyleguideOptions,
} from '@/lib/context-dev/styleguide';

export const runtime = 'nodejs';

function parseNumber(value: string | null, name: string): number | undefined {
  if (value === null) return undefined;
  const parsed = Number(value);
  if (!Number.isSafeInteger(parsed) || parsed < 0) {
    throw new BrandStyleguideError(`${name} must be a nonnegative integer.`, 400, 'INVALID_OPTION');
  }
  return parsed;
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const domain = url.searchParams.get('domain')?.trim() || undefined;
    const directUrl = url.searchParams.get('directUrl')?.trim() || undefined;
    const colorScheme = url.searchParams.get('colorScheme');
    if (colorScheme && colorScheme !== 'light' && colorScheme !== 'dark') {
      throw new BrandStyleguideError(
        'colorScheme must be light or dark.',
        400,
        'INVALID_COLOR_SCHEME'
      );
    }

    if (directUrl) {
      const parsed = new URL(directUrl);
      if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
        throw new BrandStyleguideError(
          'directUrl must use HTTP or HTTPS.',
          400,
          'INVALID_DIRECT_URL'
        );
      }
    }

    const timeoutMs = parseNumber(url.searchParams.get('timeoutMs'), 'timeoutMs');
    const timeoutBehavior = url.searchParams.get('timeoutBehavior');
    if (timeoutBehavior && timeoutBehavior !== 'fail' && timeoutBehavior !== 'return-partial') {
      throw new BrandStyleguideError(
        'timeoutBehavior must be fail or return-partial.',
        400,
        'INVALID_TIMEOUT_BEHAVIOR'
      );
    }
    if (timeoutBehavior && timeoutMs === undefined) {
      throw new BrandStyleguideError(
        'timeoutBehavior requires timeoutMs.',
        400,
        'TIMEOUT_MS_REQUIRED'
      );
    }

    const options: BrandStyleguideOptions = {
      maxAgeMs: parseNumber(url.searchParams.get('maxAgeMs'), 'maxAgeMs'),
      colorScheme: colorScheme as 'light' | 'dark' | undefined,
      tags: url.searchParams.getAll('tag'),
      ...(timeoutMs !== undefined
        ? {
            timeoutOpts: {
              milliseconds: timeoutMs,
              behavior: timeoutBehavior as 'fail' | 'return-partial' | undefined,
            },
          }
        : {}),
      ...(directUrl ? { directUrl } : {}),
    };

    const result = await getBrandTokens(domain, options);
    return NextResponse.json(result);
  } catch (error) {
    const failure =
      error instanceof BrandStyleguideError
        ? error
        : error instanceof Error && error.name === 'TypeError'
          ? new BrandStyleguideError('Invalid styleguide request URL.', 400, 'INVALID_REQUEST')
          : new BrandStyleguideError(
              'Unexpected error while creating the styleguide.',
              500,
              'INTERNAL_ERROR'
            );
    const headers = failure.retryAfter ? { 'Retry-After': failure.retryAfter } : undefined;
    return NextResponse.json(
      { error: { code: failure.code, message: failure.message } },
      { status: failure.status, headers }
    );
  }
}
