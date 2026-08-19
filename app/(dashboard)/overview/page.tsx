import { Suspense } from 'react';

import { OverviewData } from './OverviewData';
import { OverviewSkeleton } from './OverviewSkeleton';

export default function OverviewPage() {
  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Vue d'ensemble</h1>
      <Suspense fallback={<OverviewSkeleton />}>
        <OverviewData />
      </Suspense>
    </div>
  );
}
