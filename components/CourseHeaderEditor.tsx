'use client';

import { useState } from 'react';

type CourseHeaderEditorProps = {
  courseId: string;
  initial: {
    title: string;
    description: string;
    category: string;
    duration_minutes: number;
    level: string;
    is_published: boolean;
  };
};

// Édition simple — bouton "Enregistrer" direct, sans geste renforcé
// (contrairement aux numéros d'urgence / interrupteur IA, voir plan
// dashboard admin, §Mécanisme de confirmation) : `reason` reste
// obligatoire et journalisé.
export function CourseHeaderEditor({ courseId, initial }: CourseHeaderEditorProps) {
  const [values, setValues] = useState(initial);
  const [reason, setReason] = useState('');
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  async function handleSave() {
    setStatus('saving');
    setError(null);
    try {
      const response = await fetch(`/api/admin/courses/${courseId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, reason }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error ?? 'Échec de la mise à jour.');
        setStatus('error');
        return;
      }
      setStatus('saved');
      setReason('');
    } catch {
      setStatus('error');
      setError('Réseau indisponible.');
    }
  }

  return (
    <div style={cardStyle}>
      <h2 style={{ marginTop: 0, fontSize: 16 }}>Informations générales</h2>

      <Field label="Titre">
        <input value={values.title} onChange={(e) => setValues({ ...values, title: e.target.value })} style={inputStyle} />
      </Field>

      <Field label="Description">
        <textarea
          value={values.description}
          onChange={(e) => setValues({ ...values, description: e.target.value })}
          rows={3}
          style={inputStyle}
        />
      </Field>

      <div style={{ display: 'flex', gap: 12 }}>
        <Field label="Catégorie" style={{ flex: 1 }}>
          <input value={values.category} onChange={(e) => setValues({ ...values, category: e.target.value })} style={inputStyle} />
        </Field>
        <Field label="Niveau" style={{ flex: 1 }}>
          <input value={values.level} onChange={(e) => setValues({ ...values, level: e.target.value })} style={inputStyle} />
        </Field>
        <Field label="Durée (min)" style={{ flex: 1 }}>
          <input
            type="number"
            value={values.duration_minutes}
            onChange={(e) => setValues({ ...values, duration_minutes: Number(e.target.value) })}
            style={inputStyle}
          />
        </Field>
      </div>

      <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, margin: '8px 0 16px' }}>
        <input
          type="checkbox"
          checked={values.is_published}
          onChange={(e) => setValues({ ...values, is_published: e.target.checked })}
        />
        Publié (visible dans l'app)
      </label>

      <Field label="Motif de la modification (obligatoire, journalisé)">
        <textarea value={reason} onChange={(e) => setReason(e.target.value)} rows={2} style={inputStyle} />
      </Field>

      {error ? <p style={{ color: 'var(--color-emergency-red)' }}>{error}</p> : null}
      {status === 'saved' ? <p style={{ color: 'var(--color-success-green)' }}>Enregistré.</p> : null}

      <button
        onClick={handleSave}
        disabled={status === 'saving' || reason.trim().length < 3}
        style={buttonStyle}
      >
        {status === 'saving' ? 'Enregistrement…' : 'Enregistrer'}
      </button>
    </div>
  );
}

function Field({ label, children, style }: { label: string; children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ marginBottom: 12, ...style }}>
      <label style={{ display: 'block', fontSize: 13, marginBottom: 4, color: 'var(--color-muted-text)' }}>{label}</label>
      {children}
    </div>
  );
}

const cardStyle: React.CSSProperties = {
  background: 'white',
  border: '1px solid var(--color-border)',
  borderRadius: 8,
  padding: 20,
  marginBottom: 24,
};

export const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: 10,
  borderRadius: 8,
  border: '1px solid var(--color-border)',
  fontSize: 14,
  fontFamily: 'inherit',
};

export const buttonStyle: React.CSSProperties = {
  padding: '10px 16px',
  borderRadius: 8,
  border: 'none',
  background: 'var(--color-trust-blue)',
  color: 'white',
  cursor: 'pointer',
  fontSize: 14,
  fontWeight: 600,
};
