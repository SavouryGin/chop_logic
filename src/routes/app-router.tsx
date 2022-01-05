import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from 'components/main-layout';
import NotFoundPage from 'basic-pages/not-found-page';
import routesMap from './map';

function AppRouter() {
  const appPages = routesMap.map((item) => {
    const page = <MainLayout component={item.element} />;
    return <Route key={`page-${item.id}`} path={item.path} element={page} />;
  });

  return (
    <BrowserRouter>
      <Routes>
        {appPages}
        <Route element={NotFoundPage} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
