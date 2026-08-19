import { NextResponse } from 'next/server';

import { adminFetch, BackendError } from '@/lib/backendFetch';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json().catch(() => ({}));
  try {
    const data = await adminFetch(`/admin/courses/${id}/verify-benchmark`, { method: 'PUT', body });
    return NextResponse.json(data);
  } catch (err) {
    if (err instanceof BackendError) return NextResponse.json({ error: err.message }, { status: err.status });
    throw err;
  }
}
