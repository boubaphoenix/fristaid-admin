'use client';

import { useRouter } from 'next/navigation';

export function SignOutButton() {
  const router = useRouter();

  async function handleSignOut() {
    await fetch('/api/session/logout', { method: 'POST' });
    router.push('/login');
    router.refresh();
  }

  return (
    <button
      onClick={handleSignOut}
      style={{
        background: 'none',
        border: '1px solid var(--color-border)',
        borderRadius: 8,
        padding: '8px 14px',
        cursor: 'pointer',
        fontSize: 14,
      }}
    >
      Se déconnecter
    </button>
  );
}
