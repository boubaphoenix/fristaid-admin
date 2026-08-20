import type { NextConfig } from 'next';
import { withSentryConfig } from '@sentry/nextjs';

const nextConfig: NextConfig = {};

export default withSentryConfig(nextConfig, {
  org: 'africasecour',
  project: 'fristaid-admin',
  silent: true,
  // Source maps envoyées à Sentry pour des stack traces lisibles en
  // production, mais jamais exposées publiquement (voir SENTRY_AUTH_TOKEN,
  // requis uniquement au build, jamais commité).
  widenClientFileUpload: true,
  disableLogger: true,
});
