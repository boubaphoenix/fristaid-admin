'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/session/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok) {
        setError(data?.error ?? 'Connexion impossible.');
        return;
      }
      router.push('/overview');
      router.refresh();
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main style={{ maxWidth: 360, margin: '15vh auto', padding: 24 }}>
      <h1 style={{ fontSize: 24, marginBottom: 4 }}>AFRICASECOUR</h1>
      <p style={{ color: 'var(--color-muted-text)', marginBottom: 24 }}>Dashboard admin</p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={inputStyle}
        />
        {error ? <p style={{ color: 'var(--color-emergency-red)', margin: 0 }}>{error}</p> : null}
        <button type="submit" disabled={isSubmitting} style={buttonStyle}>
          {isSubmitting ? 'Connexion…' : 'Se connecter'}
        </button>
      </form>
    </main>
  );
}

const inputStyle: React.CSSProperties = {
  padding: '12px 14px',
  borderRadius: 8,
  border: '1px solid var(--color-border)',
  fontSize: 16,
};

const buttonStyle: React.CSSProperties = {
  padding: '12px 14px',
  borderRadius: 8,
  border: 'none',
  background: 'var(--color-trust-blue)',
  color: 'white',
  fontSize: 16,
  fontWeight: 600,
  cursor: 'pointer',
};
