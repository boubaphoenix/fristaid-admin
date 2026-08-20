import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "AFRICASECOUR — Conditions d'utilisation",
};

// Page publique (exclue de la garde d'authentification, voir proxy.ts).
// Brouillon à faire valider par Ravi avant publication : ce n'est pas un
// avis juridique.
export default function TermsPage() {
  return (
    <main style={containerStyle}>
      <h1>Conditions d'utilisation</h1>
      <p style={updatedStyle}>Dernière mise à jour : à compléter à la publication.</p>

      <h2>1. Objet</h2>
      <p>
        AFRICASECOUR est une application d'information et de sensibilisation aux gestes de premiers secours. Ces
        conditions régissent votre utilisation de l'application et du site associé.
      </p>

      <h2>2. Avertissement important</h2>
      <p>
        <strong>
          AFRICASECOUR ne remplace en aucun cas les services d'urgence professionnels ni un avis médical.
        </strong>{' '}
        En cas de doute sur la gravité d'une situation, appelez toujours les secours en premier lieu. Les
        consignes fournies par l'application, y compris celles générées par son module IA SOS, sont des
        conseils généraux et ne constituent pas un diagnostic médical.
      </p>

      <h2>3. Compte utilisateur</h2>
      <p>
        Vous êtes responsable de la confidentialité de vos identifiants et de l'exactitude des informations
        fournies lors de la création de votre compte.
      </p>

      <h2>4. Utilisation acceptable</h2>
      <p>
        Vous vous engagez à ne pas détourner l'application de son usage (contenu pédagogique et guidage
        d'urgence), à ne pas tenter d'accéder aux comptes d'autres utilisateurs, et à respecter les autres
        membres de la communauté dans toute fonctionnalité de partage.
      </p>

      <h2>5. Contenu et propriété intellectuelle</h2>
      <p>
        Le contenu pédagogique, les illustrations et la marque AFRICASECOUR sont protégés. Vous ne pouvez pas
        les reproduire ou les redistribuer sans autorisation écrite.
      </p>

      <h2>6. Commandes de kits de secours</h2>
      <p>
        Les commandes sont traitées via notre prestataire de paiement mobile money. Les conditions de livraison
        et de retour vous sont communiquées au moment de la commande.
      </p>

      <h2>7. Limitation de responsabilité</h2>
      <p>
        Dans les limites permises par la loi, AFRICASECOUR ne saurait être tenue responsable des conséquences
        d'une action ou d'une inaction prise sur la base des consignes fournies par l'application.
      </p>

      <h2>8. Modification des conditions</h2>
      <p>
        Ces conditions peuvent évoluer ; les changements substantiels vous seront notifiés dans l'application.
      </p>

      <h2>9. Nous contacter</h2>
      <p>contact@africasecour.com</p>
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
