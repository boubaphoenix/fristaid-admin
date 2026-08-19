import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: 'AFRICASECOUR — Dashboard admin',
  description: 'Dashboard admin AFRICASECOUR',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
