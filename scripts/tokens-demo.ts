import { loadEnvConfig } from '@next/env';
import { getBrandTokens } from '../src/lib/context-dev/styleguide';

loadEnvConfig(process.cwd());

const domain = process.argv[2] ?? 'wildyriftian.com';

try {
  const result = await getBrandTokens(domain);
  console.log(JSON.stringify(result, null, 2));
} catch (error) {
  const message = error instanceof Error ? error.message : 'Unexpected styleguide error.';
  console.error(message);
  process.exitCode = 1;
}
