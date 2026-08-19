'use client';

import { useState } from 'react';

export function VerifyBenchmarkButton({ courseId, lastVerifiedAt }: { courseId: string; lastVerifiedAt: string | null }) {
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [verifiedAt, setVerifiedAt] = useState(lastVerifiedAt);

  async function handleVerify() {
    setStatus('saving');
    try {
      const response = await fetch(`/api/admin/courses/${courseId}/verify-benchmark`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason: 'Vérification benchmark confirmée depuis le dashboard.' }),
      });
      const data = await response.json();
      if (!response.ok) {
        setStatus('error');
        return;
      }
      setVerifiedAt(data.last_benchmark_verified_at);
      setStatus('saved');
    } catch {
      setStatus('error');
    }
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
      <span style={{ fontSize: 13, color: 'var(--color-muted-text)' }}>
        {verifiedAt ? `Dernière vérification : ${new Date(verifiedAt).toLocaleDateString('fr-FR')}` : 'Jamais vérifié'}
      </span>
      <button
        onClick={handleVerify}
        disabled={status === 'saving'}
        style={{
          padding: '8px 14px',
          borderRadius: 8,
          border: '1px solid var(--color-success-green)',
          background: 'var(--color-success-bg)',
          color: 'var(--color-success-green)',
          cursor: 'pointer',
          fontSize: 13,
          fontWeight: 600,
        }}
      >
        {status === 'saving' ? 'Confirmation…' : 'Confirmer la vérification benchmark'}
      </button>
    </div>
  );
}
