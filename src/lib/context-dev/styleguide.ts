import ContextDev, { APIError } from 'context.dev';
import { DEFAULT_DOMAIN, DEFAULT_MAX_AGE_MS } from './constants';
import { transformStyleguide, type TailwindBrandTokens } from './tokens';

type WebExtractStyleguideParams = NonNullable<
  Parameters<ContextDev['web']['extractStyleguide']>[0]
>;

export interface BrandStyleguideOptions extends Omit<
  WebExtractStyleguideParams,
  'domain' | 'directUrl' | 'maxAgeMs'
> {
  directUrl?: string;
  maxAgeMs?: number;
}

export interface BrandTokenResult {
  tokens: TailwindBrandTokens;
  cache: {
    status?: 'hit' | 'miss' | 'zdr';
    ageMs?: number;
  };
}

export class BrandStyleguideError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly code: string,
    public readonly retryAfter?: string
  ) {
    super(message);
    this.name = 'BrandStyleguideError';
  }
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

function messageForStatus(status: number, fallback: string): string {
  switch (status) {
    case 400:
      return `Context.dev rejected the request. Check the domain and options. ${fallback}`;
    case 401:
      return 'Context.dev rejected the API key. Verify CONTEXT_DEV_API_KEY in the server environment.';
    case 402:
      return 'Context.dev has no remaining credits for this request. Check your account billing and usage.';
    case 408:
      return 'Context.dev timed out while extracting the styleguide. Try again with a longer timeout.';
    case 429:
      return 'Context.dev rate-limited the request. Wait for the Retry-After interval before trying again.';
    default:
      return fallback;
  }
}

export async function getBrandTokens(
  domain?: string,
  options: BrandStyleguideOptions = {}
): Promise<BrandTokenResult> {
  const apiKey = process.env.CONTEXT_DEV_API_KEY?.trim();
  if (!apiKey) {
    throw new BrandStyleguideError(
      'CONTEXT_DEV_API_KEY is not set. Add it to the server environment or .env.local.',
      500,
      'CONTEXT_DEV_API_KEY_MISSING'
    );
  }

  const requestedDomain = domain?.trim();
  const directUrl = options.directUrl?.trim();
  if (directUrl && requestedDomain) {
    throw new BrandStyleguideError(
      'Provide either a domain or directUrl, not both.',
      400,
      'DOMAIN_AND_DIRECT_URL'
    );
  }

  const requestOptions = { ...options };
  delete requestOptions.directUrl;
  delete requestOptions.maxAgeMs;
  const params: WebExtractStyleguideParams = {
    ...requestOptions,
    maxAgeMs: options.maxAgeMs ?? DEFAULT_MAX_AGE_MS,
    ...(directUrl ? { directUrl } : { domain: requestedDomain || DEFAULT_DOMAIN }),
  };

  try {
    const client = new ContextDev({ apiKey });
    const response = await client.web.extractStyleguide(params);
    if (!response.styleguide) {
      throw new BrandStyleguideError(
        'Context.dev did not include styleguide data in its response.',
        502,
        'STYLEGUIDE_MISSING'
      );
    }

    return {
      tokens: transformStyleguide(
        response.domain ??
          requestedDomain ??
          (directUrl ? new URL(directUrl).hostname : DEFAULT_DOMAIN),
        response.styleguide
      ),
      cache: {
        status: response.cache_metadata?.status,
        ageMs: response.cache_metadata?.age_ms,
      },
    };
  } catch (error) {
    if (error instanceof BrandStyleguideError) throw error;

    if (error instanceof APIError) {
      const details = isRecord(error.error) ? error.error : {};
      const apiCode =
        typeof details.code === 'string' ? details.code : `HTTP_${error.status ?? 502}`;
      const apiMessage = typeof details.message === 'string' ? details.message : error.message;
      const status = error.status ?? 502;
      throw new BrandStyleguideError(
        messageForStatus(status, apiMessage),
        status,
        apiCode,
        error.headers?.get('Retry-After') ?? undefined
      );
    }

    const message = error instanceof Error ? error.message : 'Unexpected Context.dev error.';
    throw new BrandStyleguideError(message, 502, 'CONTEXT_DEV_REQUEST_FAILED');
  }
}
