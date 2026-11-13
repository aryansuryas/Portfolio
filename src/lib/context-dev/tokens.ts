export type TokenMode = 'light' | 'dark';

export interface TypographyToken {
  fontFamily: string[];
  fontSize?: string;
  fontWeight?: number;
  lineHeight?: string;
  letterSpacing?: string;
}

export interface FontFaceToken {
  family: string;
  url: string;
  style: string;
  weight: string;
  width?: string;
  unicodeRange?: string;
}

export interface TailwindBrandTokens {
  domain: string;
  mode?: TokenMode;
  colors: Partial<Record<'accent' | 'background' | 'text', string>>;
  typography: {
    headings: Partial<Record<'h1' | 'h2' | 'h3' | 'h4', TypographyToken>>;
    body?: TypographyToken;
  };
  spacing: Partial<Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', string>>;
  shadows: Partial<Record<'sm' | 'md' | 'lg' | 'xl' | 'inner', string>>;
  fontLinks: Record<string, FontFaceToken[]>;
  componentCss: {
    buttons: Partial<Record<'primary' | 'secondary' | 'link', string>>;
    card?: string;
  };
  tailwindConfig: {
    theme: {
      extend: {
        colors: Partial<Record<'brandAccent' | 'brandBackground' | 'brandText', string>>;
        fontFamily: Partial<Record<'brandHeading' | 'brandBody', string[]>>;
        fontSize: Record<string, [string, Record<string, string | number>]>;
        spacing: Partial<
          Record<'brand-xs' | 'brand-sm' | 'brand-md' | 'brand-lg' | 'brand-xl', string>
        >;
        boxShadow: Partial<
          Record<'brand-sm' | 'brand-md' | 'brand-lg' | 'brand-xl' | 'brand-inner', string>
        >;
      };
    };
  };
}

type JsonRecord = Record<string, unknown>;

const isRecord = (value: unknown): value is JsonRecord =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const optionalString = (value: unknown): string | undefined =>
  typeof value === 'string' && value.trim() ? value.trim() : undefined;

const optionalNumber = (value: unknown): number | undefined =>
  typeof value === 'number' && Number.isFinite(value) ? value : undefined;

function readTypography(value: unknown): TypographyToken | undefined {
  if (!isRecord(value)) return undefined;

  const fallbacks = Array.isArray(value.fontFallbacks)
    ? value.fontFallbacks.filter(
        (family): family is string => typeof family === 'string' && !!family.trim()
      )
    : [];
  const primary = optionalString(value.fontFamily);
  const fontFamily = [...new Set([...(primary ? [primary] : []), ...fallbacks])];
  if (!fontFamily.length) return undefined;

  return {
    fontFamily,
    fontSize: optionalString(value.fontSize),
    fontWeight: optionalNumber(value.fontWeight),
    lineHeight: optionalString(value.lineHeight),
    letterSpacing: optionalString(value.letterSpacing),
  };
}

function readFontLinks(fontLinks: unknown): Record<string, FontFaceToken[]> {
  if (!isRecord(fontLinks)) return {};

  return Object.fromEntries(
    Object.entries(fontLinks).flatMap(([family, value]) => {
      if (!isRecord(value)) return [];
      let faces: FontFaceToken[] = [];

      if (Array.isArray(value.faces)) {
        faces = value.faces.flatMap((face) => {
          if (!isRecord(face)) return [];
          const url = optionalString(face.url);
          const weight = optionalString(face.weight);
          if (!url || !weight) return [];
          return [
            {
              family,
              url,
              weight,
              style: optionalString(face.style) ?? 'normal',
              width: optionalString(face.width),
              unicodeRange: optionalString(face.unicodeRange),
            },
          ];
        });
      } else if (isRecord(value.files)) {
        faces = Object.entries(value.files).flatMap(([weight, urlValue]) => {
          const url = optionalString(urlValue);
          return url ? [{ family, url, weight, style: 'normal' }] : [];
        });
      }

      return faces.length ? [[family, faces]] : [];
    })
  );
}

const readCss = (value: unknown): string | undefined =>
  isRecord(value) ? optionalString(value.css) : undefined;

function readSpacing(value: unknown): TailwindBrandTokens['spacing'] {
  if (!isRecord(value)) return {};
  return Object.fromEntries(
    (['xs', 'sm', 'md', 'lg', 'xl'] as const)
      .map((key) => [key, optionalString(value[key])])
      .filter((entry): entry is [(typeof entry)[0], string] => !!entry[1])
  );
}

function readShadows(value: unknown): TailwindBrandTokens['shadows'] {
  if (!isRecord(value)) return {};
  return Object.fromEntries(
    (['sm', 'md', 'lg', 'xl', 'inner'] as const)
      .map((key) => [key, optionalString(value[key])])
      .filter((entry): entry is [(typeof entry)[0], string] => !!entry[1])
  );
}

function readButtonCss(value: unknown): TailwindBrandTokens['componentCss']['buttons'] {
  if (!isRecord(value)) return {};
  return Object.fromEntries(
    (['primary', 'secondary', 'link'] as const)
      .map((key) => [key, readCss(value[key])])
      .filter((entry): entry is [(typeof entry)[0], string] => !!entry[1])
  ) as TailwindBrandTokens['componentCss']['buttons'];
}

export function transformStyleguide(domain: string, input: unknown): TailwindBrandTokens {
  if (!isRecord(input)) {
    throw new Error('Context.dev returned an invalid styleguide response.');
  }

  const colorsInput = isRecord(input.colors) ? input.colors : {};
  const typographyInput = isRecord(input.typography) ? input.typography : {};
  const headingsInput = isRecord(typographyInput.headings) ? typographyInput.headings : {};
  const componentsInput = isRecord(input.components) ? input.components : {};
  const buttonInput = isRecord(componentsInput.button) ? componentsInput.button : {};
  const headings = Object.fromEntries(
    (['h1', 'h2', 'h3', 'h4'] as const)
      .map((key) => [key, readTypography(headingsInput[key])])
      .filter((entry): entry is [(typeof entry)[0], TypographyToken] => !!entry[1])
  ) as TailwindBrandTokens['typography']['headings'];
  const body = readTypography(typographyInput.p);
  const spacing = readSpacing(input.elementSpacing);
  const shadows = readShadows(input.shadows);
  const colors = {
    accent: optionalString(colorsInput.accent),
    background: optionalString(colorsInput.background),
    text: optionalString(colorsInput.text),
  };
  const colorTokens = {
    ...(colors.accent ? { brandAccent: colors.accent } : {}),
    ...(colors.background ? { brandBackground: colors.background } : {}),
    ...(colors.text ? { brandText: colors.text } : {}),
  };

  const fontSize: TailwindBrandTokens['tailwindConfig']['theme']['extend']['fontSize'] = {};
  for (const [key, token] of Object.entries({ ...headings, ...(body ? { body } : {}) })) {
    if (!token.fontSize) continue;
    const options: Record<string, string | number> = {};
    if (token.lineHeight) options.lineHeight = token.lineHeight;
    if (token.letterSpacing) options.letterSpacing = token.letterSpacing;
    if (token.fontWeight !== undefined) options.fontWeight = token.fontWeight;
    fontSize[`brand-${key}`] = [token.fontSize, options];
  }

  const fontHeading =
    headings.h1?.fontFamily ??
    headings.h2?.fontFamily ??
    headings.h3?.fontFamily ??
    headings.h4?.fontFamily;
  const fontBody = body?.fontFamily;
  const spacingKeys = {
    xs: 'brand-xs',
    sm: 'brand-sm',
    md: 'brand-md',
    lg: 'brand-lg',
    xl: 'brand-xl',
  } as const;
  const shadowKeys = {
    sm: 'brand-sm',
    md: 'brand-md',
    lg: 'brand-lg',
    xl: 'brand-xl',
    inner: 'brand-inner',
  } as const;
  const tailwindSpacing = Object.fromEntries(
    Object.entries(spacingKeys).flatMap(([key, outputKey]) =>
      spacing[key as keyof typeof spacing]
        ? [[outputKey, spacing[key as keyof typeof spacing]!]]
        : []
    )
  ) as TailwindBrandTokens['tailwindConfig']['theme']['extend']['spacing'];
  const tailwindShadows = Object.fromEntries(
    Object.entries(shadowKeys).flatMap(([key, outputKey]) =>
      shadows[key as keyof typeof shadows]
        ? [[outputKey, shadows[key as keyof typeof shadows]!]]
        : []
    )
  ) as TailwindBrandTokens['tailwindConfig']['theme']['extend']['boxShadow'];

  const card = readCss(componentsInput.card);
  return {
    domain,
    mode: input.mode === 'light' || input.mode === 'dark' ? input.mode : undefined,
    colors: Object.fromEntries(
      Object.entries(colors).filter((entry): entry is [string, string] => !!entry[1])
    ) as TailwindBrandTokens['colors'],
    typography: { headings, body },
    spacing,
    shadows,
    fontLinks: readFontLinks(input.fontLinks),
    componentCss: {
      buttons: readButtonCss(buttonInput),
      card,
    },
    tailwindConfig: {
      theme: {
        extend: {
          colors: colorTokens,
          fontFamily: {
            ...(fontHeading ? { brandHeading: fontHeading } : {}),
            ...(fontBody ? { brandBody: fontBody } : {}),
          },
          fontSize,
          spacing: tailwindSpacing,
          boxShadow: tailwindShadows,
        },
      },
    },
  };
}
