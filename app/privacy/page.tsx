import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AFRICASECOUR — Politique de confidentialité',
};

// Page publique (exclue de la garde d'authentification, voir proxy.ts) —
// requise pour la publication sur Google Play / App Store et pour
// l'écran de consentement Google Sign-In. Brouillon à faire valider par
// Ravi avant publication : ce n'est pas un avis juridique, seulement un
// texte cohérent avec les fonctionnalités réellement présentes dans le
// produit (voir fristaid-backend/prisma/schema.prisma et fristaid-mobile).
export default function PrivacyPolicyPage() {
  return (
    <main style={containerStyle}>
      <h1>Politique de confidentialité</h1>
      <p style={updatedStyle}>Dernière mise à jour : à compléter à la publication.</p>

      <p>
        AFRICASECOUR est une application de premiers secours. Cette page explique quelles données nous
        collectons, pourquoi, et comment vous pouvez les contrôler.
      </p>

      <h2>1. Données que nous collectons</h2>
      <ul>
        <li>
          <strong>Compte</strong> : adresse e-mail, mot de passe (jamais stocké en clair), ou identifiant Google
          si vous vous connectez avec Google.
        </li>
        <li>
          <strong>Profil</strong> : nom complet, téléphone et photo de profil — tous optionnels.
        </li>
        <li>
          <strong>Sessions d'urgence (IA SOS)</strong> : le rôle choisi (témoin, victime...), le type d'incident
          et vos réponses aux questions de triage, afin de générer les consignes adaptées. Ces informations sont
          des données de santé déclarées par vous — elles ne sont utilisées que pour vous guider pendant
          l'urgence et ne sont jamais partagées avec des tiers.
        </li>
        <li>
          <strong>Localisation</strong> : uniquement si vous choisissez explicitement de la partager pour
          alerter un proche — jamais collectée en arrière-plan.
        </li>
        <li>
          <strong>Progression et gamification</strong> : cours suivis, quiz réussis, points, classements et
          badges.
        </li>
        <li>
          <strong>Commandes de kits de secours</strong> : adresse de livraison et statut de paiement (traité par
          notre prestataire de paiement mobile money, Bictorys — nous ne stockons jamais vos identifiants de
          paiement).
        </li>
      </ul>

      <h2>2. Pourquoi nous les utilisons</h2>
      <p>
        Fournir des consignes de premiers secours adaptées, sécuriser votre compte, suivre votre progression
        pédagogique, traiter vos commandes de kits, et améliorer le contenu des cours (analyses agrégées et
        anonymisées côté administration, jamais publiées individuellement).
      </p>

      <h2>3. Partage avec des tiers</h2>
      <ul>
        <li>
          <strong>Google</strong> : uniquement si vous choisissez la connexion Google (authentification).
        </li>
        <li>
          <strong>Resend</strong> : envoi des e-mails de vérification de compte et de réinitialisation de mot de
          passe.
        </li>
        <li>
          <strong>Cloudinary</strong> : hébergement des images (photo de profil, contenu pédagogique).
        </li>
        <li>
          <strong>Bictorys</strong> : traitement des paiements de commandes de kits.
        </li>
        <li>
          <strong>WhatsApp</strong> : si vous utilisez le bouton "Nous contacter", votre message est envoyé
          directement via WhatsApp (Meta) — nous ne conservons pas de copie de cette conversation sur nos
          serveurs.
        </li>
      </ul>
      <p>Nous ne vendons jamais vos données à des tiers.</p>

      <h2>4. Conservation et suppression</h2>
      <p>
        Vos données sont conservées tant que votre compte est actif. Vous pouvez demander la suppression de
        votre compte et de vos données à tout moment en nous contactant (coordonnées ci-dessous).
      </p>

      <h2>5. Sécurité</h2>
      <p>
        Les communications entre l'application et nos serveurs sont chiffrées (HTTPS). Les mots de passe sont
        hachés, jamais stockés en clair. L'accès aux outils d'administration est réservé à un nombre restreint
        de comptes autorisés, et chaque action sensible y est journalisée.
      </p>

      <h2>6. Mineurs</h2>
      <p>
        AFRICASECOUR peut être utilisée par des mineurs dans un cadre scolaire ou familial de sensibilisation
        aux premiers secours ; nous ne collectons pas plus de données pour un compte mineur que pour un adulte.
      </p>

      <h2>7. Nous contacter</h2>
      <p>Pour toute question sur cette politique ou pour exercer vos droits : privacy@africasecour.com</p>
    </main>
  );
}

const containerStyle: React.CSSProperties = {
  maxWidth: 720,
  margin: '0 auto',
  padding: '48px 24px',
  lineHeight: 1.6,
};

const updatedStyle: React.CSSProperties = {
  color: 'var(--color-muted-text)',
  fontSize: 14,
};
