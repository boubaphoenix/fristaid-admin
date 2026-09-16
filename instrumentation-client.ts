import * as Sentry from '@sentry/nextjs';

// Init côté navigateur — chargé automatiquement par Next.js (convention
// "instrumentation-client.ts", compatible Turbopack, remplace l'ancien
// sentry.client.config.ts).
if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    tracesSampleRate: Number(process.env.NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE ?? 0.2),
    sendDefaultPii: false,
  });
}

// Requis par le SDK pour instrumenter les transitions de route côté
// navigateur (App Router) — sans cet export, Sentry avertit à chaque build
// et les navigations ne sont pas tracées.
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
