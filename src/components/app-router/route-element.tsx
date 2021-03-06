import FallbackPage from 'pages/fallback-page';
import React, { Suspense } from 'react';

const RouteElement = ({ component: Component }: { component: React.FC }) => {
  return (
    <Suspense fallback={<FallbackPage />}>
      <Component />
    </Suspense>
  );
};

export default RouteElement;
