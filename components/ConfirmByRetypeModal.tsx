'use client';

import { useState } from 'react';

// Geste délibéré exigé pour les actions critiques (numéros d'urgence,
// interrupteur IA SOS) — jamais un simple clic Oui/Non (voir plan
// dashboard admin, §Mécanisme de confirmation + journal). L'utilisateur
// doit retaper `expectedText` exactement avant que le bouton de
// confirmation s'active.
export function ConfirmByRetypeModal({
  title,
  expectedText,
  reason,
  onReasonChange,
  onConfirm,
  onCancel,
  isSubmitting,
}: {
  title: string;
  expectedText: string;
  reason: string;
  onReasonChange: (value: string) => void;
  onConfirm: () => void;
  onCancel: () => void;
  isSubmitting: boolean;
}) {
  const [typed, setTyped] = useState('');
  const matches = typed.trim() === expectedText.trim() && reason.trim().length >= 3;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(38,50,56,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 50,
      }}
    >
      <div style={{ background: 'white', borderRadius: 12, padding: 24, width: 420, maxWidth: '90vw' }}>
        <h2 style={{ marginTop: 0, fontSize: 18 }}>{title}</h2>

        <label style={{ display: 'block', fontSize: 13, marginBottom: 4, color: 'var(--color-muted-text)' }}>
          Motif de la modification (obligatoire, journalisé)
        </label>
        <textarea
          value={reason}
          onChange={(e) => onReasonChange(e.target.value)}
          rows={2}
          style={{ width: '100%', borderRadius: 8, border: '1px solid var(--color-border)', padding: 10, marginBottom: 16 }}
        />

        <label style={{ display: 'block', fontSize: 13, marginBottom: 4, color: 'var(--color-muted-text)' }}>
          Retapez « {expectedText} » pour confirmer
        </label>
        <input
          value={typed}
          onChange={(e) => setTyped(e.target.value)}
          style={{ width: '100%', borderRadius: 8, border: '1px solid var(--color-border)', padding: 10, marginBottom: 20 }}
        />

        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <button onClick={onCancel} style={{ padding: '10px 16px', borderRadius: 8, border: '1px solid var(--color-border)', background: 'white' }}>
            Annuler
          </button>
          <button
            onClick={onConfirm}
            disabled={!matches || isSubmitting}
            style={{
              padding: '10px 16px',
              borderRadius: 8,
              border: 'none',
              background: matches ? 'var(--color-emergency-red)' : 'var(--color-border)',
              color: 'white',
              cursor: matches ? 'pointer' : 'not-allowed',
            }}
          >
            {isSubmitting ? 'Envoi…' : 'Confirmer'}
          </button>
        </div>
      </div>
    </div>
  );
}
