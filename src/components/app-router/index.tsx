import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from 'components/layout';
import RouterElement from 'components/route-element';
import routesMap from 'constants/pages/map';
import NotFoundPage from 'pages/not-found-page';
import Home from 'pages/home';

function AppRouter(): React.ReactElement {
  const pages = routesMap.map((item) => {
    return <Route key={`page-${item.id}`} path={item.url} element={<RouterElement component={item.element} />} />;
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          {pages}
          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
