import React, { Suspense } from 'react';

function PanelLoadingFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
      Loading...
    </div>
  );
}

export function PanelSuspense({ children }: { children: React.ReactNode }): React.ReactElement {
  return <Suspense fallback={<PanelLoadingFallback />}>{children}</Suspense>;
}
