// Mêmes dimensions que le contenu réel (voir OverviewData) pour qu'aucun
// saut de mise en page ne se produise à la résolution du Suspense (plan
// §Design/UX — "fluide : pas de layout shift pendant le chargement").
export function OverviewSkeleton() {
  return (
    <div style={{ display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="skeleton" style={{ height: 160 }} />
      ))}
    </div>
  );
}
