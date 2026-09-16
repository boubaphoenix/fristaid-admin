import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: 'AFRICASECOUR',
  description: 'AFRICASECOUR — les gestes qui sauvent, accessibles à tous.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
