import Link from 'next/link';

import { adminFetch } from '@/lib/backendFetch';

type CoursesResponse = {
  max_age_months: number;
  courses: {
    id: string;
    title: string;
    category: string;
    is_published: boolean;
    last_benchmark_verified_at: string | null;
    is_stale: boolean;
  }[];
};

// Liste + alerte de fraîcheur (voir plan §4). Chaque ligne mène à
// l'éditeur structuré par étape + historique d'édition (voir
// app/(dashboard)/courses/[id]/page.tsx).
export default async function CoursesPage() {
  const data = await adminFetch<CoursesResponse>('/admin/courses');

  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Cours</h1>
      <p style={{ color: 'var(--color-muted-text)', maxWidth: 520 }}>
        Alerte de fraîcheur : un cours non re-vérifié depuis plus de {data.max_age_months} mois est signalé
        ci-dessous.
      </p>

      <div style={{ background: 'white', border: '1px solid var(--color-border)', borderRadius: 8, overflow: 'hidden' }}>
        {data.courses.map((course) => (
          <Link
            key={course.id}
            href={`/courses/${course.id}`}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px 16px',
              borderBottom: '1px solid var(--color-border)',
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <div>
              <div style={{ fontWeight: 600 }}>{course.title}</div>
              <div style={{ fontSize: 13, color: 'var(--color-muted-text)' }}>
                {course.last_benchmark_verified_at
                  ? `Vérifié le ${new Date(course.last_benchmark_verified_at).toLocaleDateString('fr-FR')}`
                  : 'Jamais vérifié'}
              </div>
            </div>
            {course.is_stale ? (
              <span
                style={{
                  background: 'var(--color-warning-bg)',
                  color: 'var(--color-warning-orange)',
                  padding: '4px 10px',
                  borderRadius: 999,
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                À revérifier
              </span>
            ) : (
              <span style={{ color: 'var(--color-success-green)', fontSize: 12, fontWeight: 600 }}>À jour</span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
