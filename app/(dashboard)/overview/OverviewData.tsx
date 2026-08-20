import { adminFetchOrRedirect } from '@/lib/backendFetch';

type Overview = {
  active_users_trend: { period_days: number; points: { date: string; active_users: number }[] };
  rank_distribution: { total_users: number; buckets: { title: string; level: number; users: number }[] };
  challenges_completed_by_format: { period_days: number; by_format: { type: string; attempts: number }[] };
  courses_by_completion_rate: {
    courses: { id: string; title: string; started: number; completed: number; completion_rate: number | null }[];
  };
  ai_sos_incidents_triggered: { period_days: number; by_incident_type: { incident_type: string; sessions: number }[] };
  whatsapp_feedback_by_category: { available: boolean; reason?: string };
};

const cardStyle: React.CSSProperties = {
  background: 'var(--color-white)',
  border: '1px solid var(--color-border)',
  borderRadius: 8,
  padding: 20,
};

function CardTitle({ children, periodDays }: { children: React.ReactNode; periodDays?: number }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <h2 style={{ fontSize: 16, margin: 0 }}>{children}</h2>
      {periodDays ? (
        <p style={{ margin: '2px 0 0', fontSize: 13, color: 'var(--color-muted-text)' }}>
          Sur les {periodDays} derniers jours
        </p>
      ) : null}
    </div>
  );
}

// Server Component — chaque chiffre affiché porte son contexte immédiat
// (période, total de référence) plutôt qu'une valeur brute isolée (plan
// §Design/UX : "aucun chiffre brut sans repère").
export async function OverviewData() {
  const data = await adminFetchOrRedirect<Overview>('/admin/overview');

  const totalActiveLastDay = data.active_users_trend.points.at(-1)?.active_users ?? 0;

  return (
    <div style={{ display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
      <div style={cardStyle}>
        <CardTitle periodDays={data.active_users_trend.period_days}>Utilisateurs actifs</CardTitle>
        <p style={{ fontSize: 32, fontWeight: 700, margin: 0 }}>{totalActiveLastDay}</p>
        <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--color-muted-text)' }}>aujourd'hui</p>
      </div>

      <div style={cardStyle}>
        <CardTitle>Distribution des rangs ({data.rank_distribution.total_users} utilisateurs)</CardTitle>
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {data.rank_distribution.buckets.map((b) => (
            <li key={b.level} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
              <span>{b.title}</span>
              <span style={{ fontWeight: 600 }}>{b.users}</span>
            </li>
          ))}
        </ul>
      </div>

      <div style={cardStyle}>
        <CardTitle periodDays={data.challenges_completed_by_format.period_days}>Défis complétés par format</CardTitle>
        {data.challenges_completed_by_format.by_format.length === 0 ? (
          <p style={{ color: 'var(--color-muted-text)', fontSize: 14 }}>Aucune tentative sur la période.</p>
        ) : (
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 4 }}>
            {data.challenges_completed_by_format.by_format.map((f) => (
              <li key={f.type} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                <span>{f.type}</span>
                <span style={{ fontWeight: 600 }}>{f.attempts}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div style={cardStyle}>
        <CardTitle>Cours à surveiller (taux de complétion)</CardTitle>
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {data.courses_by_completion_rate.courses.slice(0, 6).map((c) => (
            <li key={c.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
              <span>{c.title}</span>
              <span style={{ fontWeight: 600 }}>
                {c.completion_rate === null ? '—' : `${Math.round(c.completion_rate * 100)}%`}
                <span style={{ color: 'var(--color-muted-text)', fontWeight: 400 }}> ({c.started} démarrés)</span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div style={cardStyle}>
        <CardTitle periodDays={data.ai_sos_incidents_triggered.period_days}>Incidents IA SOS déclenchés</CardTitle>
        {data.ai_sos_incidents_triggered.by_incident_type.length === 0 ? (
          <p style={{ color: 'var(--color-muted-text)', fontSize: 14 }}>Aucune session sur la période.</p>
        ) : (
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 4 }}>
            {data.ai_sos_incidents_triggered.by_incident_type.map((row) => (
              <li key={row.incident_type} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                <span>{row.incident_type}</span>
                <span style={{ fontWeight: 600 }}>{row.sessions}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div style={cardStyle}>
        <CardTitle>Retours WhatsApp par catégorie</CardTitle>
        <p style={{ color: 'var(--color-muted-text)', fontSize: 14 }}>
          Bientôt disponible — WhatsApp Business reste le canal de traitement message par message ; aucun volume
          agrégé n'est encore journalisé côté serveur.
        </p>
      </div>
    </div>
  );
}
