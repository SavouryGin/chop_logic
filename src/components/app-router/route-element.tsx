import FallbackPage from 'pages/fallback-page';
import React, { Suspense } from 'react';

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
