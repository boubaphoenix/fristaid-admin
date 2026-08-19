'use client';

import { useEffect, useState } from 'react';

import { ConfirmByRetypeModal } from '@/components/ConfirmByRetypeModal';

export default function AiSosSwitchPage() {
  const [enabled, setEnabled] = useState<boolean | null>(null);
  const [reason, setReason] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/admin/ai-sos-switch')
      .then((r) => r.json())
      .then((data) => setEnabled(data.enabled));
  }, []);

  async function handleConfirm() {
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await fetch('/api/admin/ai-sos-switch', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enabled: !enabled, reason }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error ?? 'Échec de la mise à jour.');
        return;
      }
      setEnabled(data.enabled);
      setShowConfirm(false);
      setReason('');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (enabled === null) {
    return <div className="skeleton" style={{ height: 160, maxWidth: 480 }} />;
  }

  const targetLabel = enabled ? 'Désactiver' : 'Réactiver';

  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Interrupteur d'urgence IA SOS</h1>
      <p style={{ color: 'var(--color-muted-text)', maxWidth: 520 }}>
        Désactivé, tous les incidents — critiques et non critiques — passent par le chemin statique pré-validé,
        avant toute lecture de cache ou tentative d'appel IA. « L'IA SOS ne doit pas chercher à être intelligente
        avant d'être sûre » (arbre de décision v1.1).
      </p>

      <div style={{ maxWidth: 420, background: 'white', border: '1px solid var(--color-border)', borderRadius: 8, padding: 20 }}>
        <p style={{ margin: '0 0 16px', fontSize: 14 }}>
          État actuel :{' '}
          <strong style={{ color: enabled ? 'var(--color-success-green)' : 'var(--color-emergency-red)' }}>
            {enabled ? 'Activé' : 'Désactivé (repli statique forcé)'}
          </strong>
        </p>
        {error ? <p style={{ color: 'var(--color-emergency-red)' }}>{error}</p> : null}
        <button
          onClick={() => setShowConfirm(true)}
          style={{
            padding: '10px 16px',
            borderRadius: 8,
            border: 'none',
            background: 'var(--color-emergency-red)',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          {targetLabel} l'IA SOS
        </button>
      </div>

      {showConfirm ? (
        <ConfirmByRetypeModal
          title={`Confirmer : ${targetLabel.toUpperCase()}`}
          expectedText={targetLabel.toUpperCase()}
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
