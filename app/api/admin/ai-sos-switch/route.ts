import { NextResponse } from 'next/server';

import { adminFetch, BackendError } from '@/lib/backendFetch';

export async function GET() {
  try {
    const data = await adminFetch<{ enabled: boolean }>('/admin/ai-sos-switch');
    return NextResponse.json(data);
  } catch (err) {
    if (err instanceof BackendError) return NextResponse.json({ error: err.message }, { status: err.status });
    throw err;
  }
}

export async function PUT(request: Request) {
  const body = await request.json().catch(() => null);
  try {
    const data = await adminFetch<{ enabled: boolean }>('/admin/ai-sos-switch', { method: 'PUT', body });
    return NextResponse.json(data);
  } catch (err) {
    if (err instanceof BackendError) return NextResponse.json({ error: err.message }, { status: err.status });
    throw err;
  }
}
