'use client';

import { useEffect } from 'react';
import * as Sentry from '@sentry/nextjs';

// Filet de sécurité pour toute erreur serveur non prévue dans les Server
// Components du dashboard (adminFetchOrRedirect gère déjà le cas 401 en
// amont, voir lib/backendFetch.ts — ceci couvre le reste : 5xx backend,
// erreurs réseau, bugs). Message fixe uniquement, jamais error.message
// interpolé — Next.js redact déjà le détail en prod, mais on ne dépend pas
// uniquement de ce comportement par défaut (audit sécurité 2026-08-20).
export default function DashboardError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <div style={{ maxWidth: 480, margin: '64px auto', textAlign: 'center' }}>
      <h1 style={{ fontSize: 20 }}>Une erreur est survenue</h1>
      <p style={{ color: 'var(--color-muted-text)' }}>
        Le dashboard n'a pas pu charger cette page. Réessayez, ou reconnectez-vous si le problème persiste.
      </p>
      <button
        onClick={() => reset()}
        style={{
          marginTop: 16,
          padding: '10px 16px',
          borderRadius: 8,
          border: 'none',
          background: 'var(--color-trust-blue)',
          color: 'white',
          cursor: 'pointer',
        }}
      >
        Réessayer
      </button>
    </div>
  );
}
