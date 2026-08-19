import { cookies } from 'next/headers';

// Le cookie contient directement le JWT signé par fristaid-backend (même
// jeton que celui envoyé en `Authorization: Bearer` par le mobile) — le
// backend reste la seule autorité de vérification/expiration, le
// dashboard ne le décode jamais lui-même. httpOnly + secure + sameSite
// strict : jamais lisible par le JS du navigateur (voir plan dashboard
// admin, §Architecture — "résout la tension cookie vs Bearer").
export const SESSION_COOKIE_NAME = 'admin_session';

export async function getSessionToken(): Promise<string | null> {
  const store = await cookies();
  return store.get(SESSION_COOKIE_NAME)?.value ?? null;
}
