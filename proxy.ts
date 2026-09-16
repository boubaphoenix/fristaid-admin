import { NextResponse, type NextRequest } from 'next/server';

import { SESSION_COOKIE_NAME } from '@/lib/session';

// Le dashboard n'est JAMAIS public (voir plan dashboard admin, §Contraintes
// non négociables) — y compris la vue d'ensemble en lecture seule. Seules
// /login et l'API de login elle-même échappent à cette garde ; le rôle
// admin/superadmin est revérifié à chaque requête backend par
// `requireAdmin`, ce proxy ne fait que router vers /login si le cookie de
// session est absent (il ne décode/valide jamais le JWT).
//
// La racine "/" et les pages publiques (site vitrine, voir plan Site web
// africasecour.com) sont exclues via `config.matcher` ci-dessous — un admin
// connecté visitant "/" verra donc la page d'accueil publique plutôt que
// d'être redirigé vers /overview (choix de simplicité assumé : pas de
// branche supplémentaire dans cette logique d'auth).
export function proxy(request: NextRequest) {
  const hasSession = request.cookies.has(SESSION_COOKIE_NAME);
  const isLoginRoute = request.nextUrl.pathname === '/login';

  if (!hasSession && !isLoginRoute) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  if (hasSession && isLoginRoute) {
    return NextResponse.redirect(new URL('/overview', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!privacy|terms|mentions-legales|contact|\\.well-known|api/session/login|_next/static|_next/image|favicon\\.ico|$).*)',
  ],
};
