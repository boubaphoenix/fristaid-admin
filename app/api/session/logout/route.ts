import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { SESSION_COOKIE_NAME } from '@/lib/session';

export async function POST() {
  const store = await cookies();
  store.delete(SESSION_COOKIE_NAME);
  return NextResponse.json({ success: true });
}
