import * as Sentry from '@sentry/nextjs';

// Chargé pour le runtime Edge (proxy.ts) via instrumentation.ts.
if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV,
    tracesSampleRate: Number(process.env.SENTRY_TRACES_SAMPLE_RATE ?? 0.2),
    sendDefaultPii: false,
  });
}
