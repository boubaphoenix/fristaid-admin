'use client';

import { useState } from 'react';

type ManualStatus = 'preparing' | 'shipped' | 'delivered' | 'cancelled';

const STATUS_LABELS: Record<ManualStatus, string> = {
  preparing: 'En préparation',
  shipped: 'Expédiée',
  delivered: 'Livrée',
  cancelled: 'Annulée',
};

// Seules les transitions de suivi de livraison sont pilotables par un
// admin — 'paid'/'failed' restent exclusivement décidées par le paiement
// (voir validators/admin.ts côté backend, updateOrderStatusSchema).
const NEXT_STATUSES: Record<string, ManualStatus[]> = {
  paid: ['preparing', 'cancelled'],
  preparing: ['shipped', 'cancelled'],
  shipped: ['delivered'],
};

export function OrderStatusControl({ orderId, currentStatus }: { orderId: string; currentStatus: string }) {
  const options = NEXT_STATUSES[currentStatus] ?? [];
  const [target, setTarget] = useState<ManualStatus | ''>('');
  const [reason, setReason] = useState('');
  const [status, setStatus] = useState<'idle' | 'saving' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [applied, setApplied] = useState<string | null>(null);

  if (options.length === 0 || applied) {
    return applied ? (
      <span style={{ fontSize: 13, color: 'var(--color-success-green)' }}>Mis à jour : {STATUS_LABELS[applied as ManualStatus] ?? applied}</span>
    ) : null;
  }

  async function handleSubmit() {
    if (!target || reason.trim().length < 3) return;
    setStatus('saving');
    setError(null);
    try {
      const response = await fetch(`/api/admin/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: target, reason }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error ?? 'Échec de la mise à jour.');
        setStatus('error');
        return;
      }
      setApplied(target);
    } catch {
      setError('Échec de la mise à jour.');
      setStatus('error');
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 220 }}>
      <div style={{ display: 'flex', gap: 6 }}>
        <select
          value={target}
          onChange={(e) => setTarget(e.target.value as ManualStatus | '')}
          style={{ borderRadius: 6, border: '1px solid var(--color-border)', padding: '6px 8px', fontSize: 13 }}
        >
          <option value="">Changer le statut…</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {STATUS_LABELS[option]}
            </option>
          ))}
        </select>
        <button
          onClick={handleSubmit}
          disabled={!target || reason.trim().length < 3 || status === 'saving'}
          style={{
            padding: '6px 12px',
            borderRadius: 6,
            border: 'none',
            background: 'var(--color-trust-blue)',
            color: 'white',
            fontSize: 13,
            cursor: 'pointer',
          }}
        >
          {status === 'saving' ? 'Envoi…' : 'Valider'}
        </button>
      </div>
      {target ? (
        <input
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Motif (obligatoire, journalisé)"
          style={{ borderRadius: 6, border: '1px solid var(--color-border)', padding: '6px 8px', fontSize: 13 }}
        />
      ) : null}
      {error ? <span style={{ fontSize: 12, color: 'var(--color-emergency-red)' }}>{error}</span> : null}
    </div>
  );
}
