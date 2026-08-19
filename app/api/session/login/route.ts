import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { SESSION_COOKIE_NAME } from '@/lib/session';

const BACKEND_API_URL = process.env.BACKEND_API_URL ?? 'http://localhost:4000';
const ADMIN_ROLES = new Set(['admin', 'superadmin']);
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 jours — plus court que le JWT mobile (30j)

// BFF : appelle le login existant du backend (aucune route dédiée à créer
// côté backend, voir plan §Architecture), vérifie le rôle AVANT de créer
// une session dashboard — un compte "user" valide n'obtient jamais de
// cookie, même si `/auth/login` réussit.
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = typeof body?.email === 'string' ? body.email : null;
  const password = typeof body?.password === 'string' ? body.password : null;

  if (!email || !password) {
    return NextResponse.json({ error: 'E-mail ou mot de passe manquant.' }, { status: 400 });
  }

  let response: Response;
  try {
    response = await fetch(`${BACKEND_API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      cache: 'no-store',
    });
  } catch {
    return NextResponse.json({ error: 'Serveur backend injoignable.' }, { status: 502 });
  }

  const data = await response.json().catch(() => null);

  if (!response.ok || !data?.token || !data?.user) {
    const message = data?.error?.message ?? 'E-mail ou mot de passe incorrect.';
    return NextResponse.json({ error: message }, { status: response.status === 200 ? 401 : response.status });
  }

  if (!ADMIN_ROLES.has(data.user.role)) {
    return NextResponse.json({ error: 'Ce compte n’a pas accès au dashboard admin.' }, { status: 403 });
  }

  const store = await cookies();
  store.set(SESSION_COOKIE_NAME, data.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: SESSION_MAX_AGE_SECONDS,
  });

  return NextResponse.json({ email: data.user.email, role: data.user.role });
}
