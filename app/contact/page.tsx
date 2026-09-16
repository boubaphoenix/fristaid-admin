import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AFRICASECOUR — Contact',
};

// Numéro WhatsApp Business partagé avec l'app mobile (voir
// fristaid-mobile/src/lib/whatsapp.ts) — même format wa.me, même notice de
// transparence. Pas de formulaire dupliqué (voir plan Site web
// africasecour.com, contrainte).
const WHATSAPP_NUMBER = '2250749183081';
const CONTACT_MESSAGE = 'Bonjour, je vous contacte au sujet du site AFRICASECOUR.';
const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(CONTACT_MESSAGE)}`;

// Page publique (exclue de la garde d'authentification, voir proxy.ts).
export default function ContactPage() {
  return (
    <main style={containerStyle}>
      <h1>Nous contacter</h1>
      <p style={leadStyle}>
        Pour toute question, suggestion ou signalement, écrivez-nous directement sur WhatsApp.
      </p>

      <p style={noticeStyle}>Ceci ouvrira WhatsApp — votre numéro sera visible dans la conversation.</p>

      <a href={whatsappUrl} style={buttonStyle} target="_blank" rel="noopener noreferrer">
        Ouvrir WhatsApp
      </a>

      <p style={fallbackStyle}>Vous pouvez aussi nous écrire directement au {WHATSAPP_NUMBER}.</p>
    </main>
  );
}

const containerStyle: React.CSSProperties = {
  maxWidth: 720,
  margin: '0 auto',
  padding: '48px 24px',
  lineHeight: 1.6,
};

const leadStyle: React.CSSProperties = {
  color: 'var(--color-muted-text)',
};

const noticeStyle: React.CSSProperties = {
  color: 'var(--color-muted-text)',
  fontSize: 13,
  marginBottom: 8,
};

const buttonStyle: React.CSSProperties = {
  display: 'inline-block',
  padding: '12px 20px',
  borderRadius: 8,
  border: '1px solid var(--color-trust-blue)',
  color: 'var(--color-trust-blue)',
  textDecoration: 'none',
  fontWeight: 600,
};

const fallbackStyle: React.CSSProperties = {
  color: 'var(--color-muted-text)',
  fontSize: 14,
  marginTop: 16,
};
