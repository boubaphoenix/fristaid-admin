import { redirect } from 'next/navigation';

// Le middleware a déjà écarté les visiteurs sans session avant d'arriver
// ici (voir middleware.ts) — la racine n'est qu'un point d'entrée vers la
// vue d'ensemble, jamais une page affichée telle quelle.
export default function RootPage() {
  redirect('/overview');
}
