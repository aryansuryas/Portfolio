const defaultSiteUrl =
  process.env.NODE_ENV === 'development' ? 'http://localhost:4028' : 'https://aryansurya.com';

export const SITE_URL = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? defaultSiteUrl);
