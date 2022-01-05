import React, { Suspense } from 'react';
import FallbackPage from 'pages/fallback-page';
import AppRouter from 'components/app-router';

function App(): React.ReactElement {
  return (
    <Suspense fallback={<FallbackPage />}>
      <AppRouter />
    </Suspense>
  );
}

export default App;
