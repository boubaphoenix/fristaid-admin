import { NextResponse, type NextRequest } from 'next/server';

import { SESSION_COOKIE_NAME } from '@/lib/session';

// Le dashboard n'est JAMAIS public (voir plan dashboard admin, §Contraintes
// non négociables) — y compris la vue d'ensemble en lecture seule. Seules
// /login et l'API de login elle-même échappent à cette garde ; le rôle
// admin/superadmin est revérifié à chaque requête backend par
// `requireAdmin`, ce proxy ne fait que router vers /login si le cookie de
// session est absent (il ne décode/valide jamais le JWT).
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
  matcher: ['/((?!privacy|terms|api/session/login|_next/static|_next/image|favicon.ico).*)'],
};
