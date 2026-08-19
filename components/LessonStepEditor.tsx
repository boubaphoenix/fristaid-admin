'use client';

import { useState } from 'react';

import { buttonStyle, inputStyle } from './CourseHeaderEditor';

type LessonStepEditorProps = {
  courseId: string;
  lessonId: string;
  stepId: string;
  stepIndex: number;
  initial: {
    title: string;
    description: string;
    memory_phrase: string | null;
    warning_text: string | null;
    image_key: string;
    image_alt: string;
  };
};

// Formulaire structuré exigé par le plan (§3 Éditeur de contenu de
// cours) : idée principale, à faire, phrase mémoire, erreur à éviter,
// image — jamais d'accès SQL direct. `reason` obligatoire, journalisé
// (voir GET /admin/courses/:id/edit-history).
export function LessonStepEditor({ courseId, lessonId, stepId, stepIndex, initial }: LessonStepEditorProps) {
  const [values, setValues] = useState(initial);
  const [reason, setReason] = useState('');
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  async function handleSave() {
    setStatus('saving');
    setError(null);
    try {
      const response = await fetch(`/api/admin/courses/${courseId}/lessons/${lessonId}/steps/${stepId}`, {
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
    <div style={{ background: 'white', border: '1px solid var(--color-border)', borderRadius: 8, padding: 16, marginBottom: 12 }}>
      <h3 style={{ marginTop: 0, fontSize: 14, color: 'var(--color-muted-text)' }}>Étape {stepIndex + 1}</h3>

      <FormField label="Idée principale">
        <input value={values.title} onChange={(e) => setValues({ ...values, title: e.target.value })} style={inputStyle} />
      </FormField>

      <FormField label="À faire">
        <textarea
          value={values.description}
          onChange={(e) => setValues({ ...values, description: e.target.value })}
          rows={2}
          style={inputStyle}
        />
      </FormField>

      <FormField label="Phrase mémoire">
        <input
          value={values.memory_phrase ?? ''}
          onChange={(e) => setValues({ ...values, memory_phrase: e.target.value || null })}
          style={inputStyle}
        />
      </FormField>

      <FormField label="Erreur à éviter">
        <input
          value={values.warning_text ?? ''}
          onChange={(e) => setValues({ ...values, warning_text: e.target.value || null })}
          style={inputStyle}
        />
      </FormField>

      <div style={{ display: 'flex', gap: 12 }}>
        <FormField label="Image — clé" style={{ flex: 1 }}>
          <input value={values.image_key} onChange={(e) => setValues({ ...values, image_key: e.target.value })} style={inputStyle} />
        </FormField>
        <FormField label="Image — texte alternatif" style={{ flex: 1 }}>
          <input value={values.image_alt} onChange={(e) => setValues({ ...values, image_alt: e.target.value })} style={inputStyle} />
        </FormField>
      </div>

      <FormField label="Motif de la modification (obligatoire, journalisé)">
        <input value={reason} onChange={(e) => setReason(e.target.value)} style={inputStyle} />
      </FormField>

      {error ? <p style={{ color: 'var(--color-emergency-red)', fontSize: 13 }}>{error}</p> : null}
      {status === 'saved' ? <p style={{ color: 'var(--color-success-green)', fontSize: 13 }}>Enregistré.</p> : null}

      <button onClick={handleSave} disabled={status === 'saving' || reason.trim().length < 3} style={buttonStyle}>
        {status === 'saving' ? 'Enregistrement…' : 'Enregistrer cette étape'}
      </button>
    </div>
  );
}

function FormField({ label, children, style }: { label: string; children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ marginBottom: 10, ...style }}>
      <label style={{ display: 'block', fontSize: 12, marginBottom: 3, color: 'var(--color-muted-text)' }}>{label}</label>
      {children}
    </div>
  );
}
