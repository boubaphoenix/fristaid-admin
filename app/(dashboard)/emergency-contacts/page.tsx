'use client';

import { useEffect, useState } from 'react';

import { ConfirmByRetypeModal } from '@/components/ConfirmByRetypeModal';

export default function EmergencyContactsPage() {
  const [contacts, setContacts] = useState<Record<string, string> | null>(null);
  const [draftValue, setDraftValue] = useState('');
  const [reason, setReason] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/admin/emergency-contacts')
      .then((r) => r.json())
      .then((data) => {
        setContacts(data.contacts);
        setDraftValue(data.contacts?.samu ?? '');
      });
  }, []);

  async function handleConfirm() {
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await fetch('/api/admin/emergency-contacts', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contacts: { ...contacts, samu: draftValue }, reason }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error ?? 'Échec de la mise à jour.');
        return;
      }
      setContacts(data.contacts);
      setShowConfirm(false);
      setReason('');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!contacts) {
    return <div className="skeleton" style={{ height: 160, maxWidth: 480 }} />;
  }

  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Numéros d'urgence</h1>
      <p style={{ color: 'var(--color-muted-text)', maxWidth: 520 }}>
        Servi en direct à l'app mobile (écran "Consignes sans compte" inclus, accessible sans connexion). Toute
        modification est journalisée avec l'auteur, l'heure et le motif.
      </p>

      <div style={{ maxWidth: 420, background: 'white', border: '1px solid var(--color-border)', borderRadius: 8, padding: 20 }}>
        <label style={{ display: 'block', fontSize: 13, marginBottom: 4, color: 'var(--color-muted-text)' }}>
          Numéro SAMU
        </label>
        <input
          value={draftValue}
          onChange={(e) => setDraftValue(e.target.value)}
          style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid var(--color-border)', fontSize: 16, marginBottom: 16 }}
        />
        {error ? <p style={{ color: 'var(--color-emergency-red)' }}>{error}</p> : null}
        <button
          onClick={() => setShowConfirm(true)}
          disabled={draftValue.trim() === contacts.samu}
          style={{
            padding: '10px 16px',
            borderRadius: 8,
            border: 'none',
            background: 'var(--color-emergency-red)',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          Modifier le numéro
        </button>
      </div>

      {showConfirm ? (
        <ConfirmByRetypeModal
          title={`Confirmer le nouveau numéro SAMU : ${draftValue}`}
          expectedText={draftValue}
          reason={reason}
          onReasonChange={setReason}
          onConfirm={handleConfirm}
          onCancel={() => setShowConfirm(false)}
          isSubmitting={isSubmitting}
        />
      ) : null}
    </div>
  );
}
