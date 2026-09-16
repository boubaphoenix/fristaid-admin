import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AFRICASECOUR',
  description: "AFRICASECOUR — les gestes qui sauvent, accessibles à tous.",
};

// Page d'accueil publique (voir plan Site web africasecour.com) — exclue de
// la garde d'authentification dans proxy.ts. Un admin connecté qui visite
// "/" verra aussi cette page (voir note dans proxy.ts) ; il accède au
// dashboard via /login comme d'habitude.
export default function HomePage() {
  return (
    <main style={containerStyle}>
      <header style={heroStyle}>
        <p style={brandStyle}>AFRICASECOUR</p>
        <h1 style={{ marginBottom: 8 }}>Les gestes qui sauvent, accessibles à tous.</h1>
        <p style={leadStyle}>
          AFRICASECOUR est une application de premiers secours : des cours pour apprendre les bons gestes, un
          module IA SOS pour être guidé pas à pas en cas d'urgence, et un kit de premiers secours physique
          bientôt disponible à la commande.
        </p>

        <div style={storeBadgesStyle}>
          <span style={storeBadgeStyle} aria-disabled="true">
            Google Play — Bientôt disponible
          </span>
          <span style={storeBadgeStyle} aria-disabled="true">
            App Store — Bientôt disponible
          </span>
        </div>
      </header>

      <section style={sectionStyle}>
        <h2>Pour qui ?</h2>
        <div style={audienceGridStyle}>
          <div style={audienceCardStyle}>
            <h3 style={{ marginTop: 0 }}>Grand public</h3>
            <p style={mutedStyle}>
              Des cours courts et concrets pour apprendre à réagir face aux urgences du quotidien — à la maison,
              en famille, entre proches.
            </p>
          </div>
          <div style={audienceCardStyle}>
            <h3 style={{ marginTop: 0 }}>Entreprises et organisations</h3>
            <p style={mutedStyle}>
              Sensibilisation et formation aux premiers secours pour vos équipes, adaptable à votre organisation.
              Contactez-nous pour en discuter.
            </p>
          </div>
        </div>
      </section>

      <footer style={footerStyle}>
        <Link href="/privacy" style={footerLinkStyle}>
          Politique de confidentialité
        </Link>
        <Link href="/terms" style={footerLinkStyle}>
          Conditions d'utilisation
        </Link>
        <Link href="/mentions-legales" style={footerLinkStyle}>
          Mentions légales
        </Link>
        <Link href="/contact" style={footerLinkStyle}>
          Contact
        </Link>
      </footer>
    </main>
  );
}

const containerStyle: React.CSSProperties = {
  maxWidth: 880,
  margin: '0 auto',
  padding: '48px 24px',
  lineHeight: 1.6,
};

const heroStyle: React.CSSProperties = {
  marginBottom: 48,
};

const brandStyle: React.CSSProperties = {
  color: 'var(--color-trust-blue)',
  fontWeight: 700,
  letterSpacing: 1,
  marginBottom: 8,
};

const leadStyle: React.CSSProperties = {
  color: 'var(--color-muted-text)',
  fontSize: 17,
  maxWidth: 640,
};

const storeBadgesStyle: React.CSSProperties = {
  display: 'flex',
  gap: 12,
  flexWrap: 'wrap',
  marginTop: 24,
};

const storeBadgeStyle: React.CSSProperties = {
  display: 'inline-block',
  padding: '10px 16px',
  borderRadius: 8,
  border: '1px solid var(--color-border)',
  color: 'var(--color-muted-text)',
  fontSize: 14,
  fontWeight: 600,
};

const sectionStyle: React.CSSProperties = {
  marginBottom: 48,
};

const audienceGridStyle: React.CSSProperties = {
  display: 'flex',
  gap: 20,
  flexWrap: 'wrap',
  marginTop: 16,
};

const audienceCardStyle: React.CSSProperties = {
  flex: '1 1 280px',
  background: 'var(--color-white)',
  border: '1px solid var(--color-border)',
  borderRadius: 8,
  padding: 20,
};

const mutedStyle: React.CSSProperties = {
  color: 'var(--color-muted-text)',
};

const footerStyle: React.CSSProperties = {
  display: 'flex',
  gap: 20,
  flexWrap: 'wrap',
  paddingTop: 24,
  borderTop: '1px solid var(--color-border)',
};

const footerLinkStyle: React.CSSProperties = {
  color: 'var(--color-trust-blue)',
  fontSize: 14,
  textDecoration: 'none',
};
