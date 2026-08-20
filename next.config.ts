import type { NextConfig } from 'next';
import { withSentryConfig } from '@sentry/nextjs';

const nextConfig: NextConfig = {};

export default withSentryConfig(nextConfig, {
  org: 'africasecour',
  project: 'fristaid-admin',
  silent: true,
  // Source maps envoyées à Sentry pour des stack traces lisibles en
  // production, mais jamais exposées publiquement. Sous Turbopack (défaut
  // Next 16), deleteSourcemapsAfterUpload vaut false par défaut contrairement
  // au chemin webpack — sans ce flag explicite, les .js.map restent servis
  // publiquement sous /_next/static (audit sécurité 2026-08-20).
  widenClientFileUpload: true,
  disableLogger: true,
  sourcemaps: {
    deleteSourcemapsAfterUpload: true,
  },
});
