import { NextResponse } from 'next/server';

import { adminFetch, BackendError } from '@/lib/backendFetch';

// Proxy fin : le composant client ne peut pas lire le cookie httpOnly ni
// appeler le backend directement (voir lib/backendFetch.ts, server-only).
// Ces routes ne font qu'attacher la session et relayer.
export async function GET() {
  try {
    const data = await adminFetch<{ contacts: Record<string, string> }>('/admin/emergency-contacts');
    return NextResponse.json(data);
  } catch (err) {
    if (err instanceof BackendError) return NextResponse.json({ error: err.message }, { status: err.status });
    throw err;
  }
}

export async function PUT(request: Request) {
  const body = await request.json().catch(() => null);
  try {
    const data = await adminFetch<{ contacts: Record<string, string> }>('/admin/emergency-contacts', {
      method: 'PUT',
      body,
    });
    return NextResponse.json(data);
  } catch (err) {
    if (err instanceof BackendError) return NextResponse.json({ error: err.message }, { status: err.status });
    throw err;
  }
}
