import Link from 'next/link';

import { SignOutButton } from '@/components/SignOutButton';

const NAV_ITEMS = [
  { href: '/overview', label: "Vue d'ensemble" },
  { href: '/emergency-contacts', label: "Numéros d'urgence" },
  { href: '/ai-sos-switch', label: 'Interrupteur IA SOS' },
  { href: '/courses', label: 'Cours' },
];

// Coquille visible sur toutes les pages du dashboard (déjà derrière le
// middleware d'authentification, voir middleware.ts) — desktop-first,
// dégrade en pile verticale sous 720px (voir plan §Design/UX, Ravi doit
// pouvoir vérifier un chiffre depuis son téléphone).
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', flexWrap: 'wrap' }}>
      <nav
        style={{
          width: 220,
          minWidth: 220,
          borderRight: '1px solid var(--color-border)',
          padding: 24,
          background: 'var(--color-white)',
        }}
      >
        <div style={{ fontWeight: 700, marginBottom: 24 }}>AFRICASECOUR</div>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link href={item.href} style={{ display: 'block', padding: '10px 12px', borderRadius: 8, textDecoration: 'none' }}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div style={{ marginTop: 32 }}>
          <SignOutButton />
        </div>
      </nav>
      <main style={{ flex: 1, minWidth: 280, padding: 32 }}>{children}</main>
    </div>
  );
}
