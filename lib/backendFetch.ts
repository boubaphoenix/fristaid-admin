import { getSessionToken } from './session';

const BACKEND_API_URL = process.env.BACKEND_API_URL ?? 'http://localhost:4000';

export class BackendError extends Error {
  readonly status: number;
  readonly code: string;

  constructor(status: number, code: string, message: string) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

// Point de passage unique côté serveur (Server Components / Route
// Handlers) vers l'API backend — attache le JWT du cookie de session en
// `Authorization: Bearer`, jamais exposé au navigateur (voir
// lib/session.ts). N'appeler que depuis du code serveur (jamais un
// composant client).
export async function adminFetch<T>(
  path: string,
  options: { method?: 'GET' | 'POST' | 'PUT' | 'DELETE'; body?: unknown } = {},
): Promise<T> {
  const token = await getSessionToken();
  if (!token) {
    throw new BackendError(401, 'NO_SESSION', 'Session absente.');
  }

  let response: Response;
  try {
    response = await fetch(`${BACKEND_API_URL}${path}`, {
      method: options.method ?? 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
      cache: 'no-store',
    });
  } catch {
    throw new BackendError(0, 'NETWORK_ERROR', 'Impossible de contacter le serveur backend.');
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const code = data?.error?.code ?? 'UNKNOWN_ERROR';
    const message = data?.error?.message ?? "Une erreur inattendue s'est produite.";
    throw new BackendError(response.status, code, message);
  }

  return data as T;
}
