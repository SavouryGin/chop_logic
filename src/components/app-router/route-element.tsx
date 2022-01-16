import React, { Suspense } from 'react';
import FallbackPage from 'pages/fallback-page';

type RouteElementProps = {
  component: React.FC;
};

function RouteElement({ component: Component }: RouteElementProps) {
  return (
    <Suspense fallback={<FallbackPage />}>
      <Component />
    </Suspense>
  );
}

export default RouteElement;
