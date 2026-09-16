import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AFRICASECOUR — Mentions légales',
};

// Page publique (exclue de la garde d'authentification, voir proxy.ts).
// Les champs marqués [À COMPLÉTER] ne peuvent pas être inventés — voir plan
// Site web africasecour.com, §Questions ouvertes. Ne pas publier tel quel
// sans les avoir remplis.
export default function LegalNoticePage() {
  return (
    <main style={containerStyle}>
      <h1>Mentions légales</h1>

      <h2>Éditeur du site</h2>
      <ul>
        <li>Raison sociale : [À COMPLÉTER]</li>
        <li>Forme juridique : [À COMPLÉTER]</li>
        <li>Numéro d'immatriculation : [À COMPLÉTER]</li>
        <li>Siège social : [À COMPLÉTER]</li>
        <li>Directeur de la publication : [À COMPLÉTER]</li>
        <li>Contact : contact@africasecour.com</li>
      </ul>

      <h2>Hébergement</h2>
      <p>
        Ce site est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis.
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        L'ensemble du contenu de ce site (textes, illustrations, marque AFRICASECOUR) est protégé. Toute
        reproduction ou redistribution sans autorisation écrite est interdite.
      </p>

      <h2>Nous contacter</h2>
      <p>Pour toute question relative à ces mentions légales : contact@africasecour.com</p>
    </main>
  );
}

const containerStyle: React.CSSProperties = {
  maxWidth: 720,
  margin: '0 auto',
  padding: '48px 24px',
  lineHeight: 1.6,
};
