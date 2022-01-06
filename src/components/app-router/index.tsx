import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from 'components/layout';
import RouterElement from 'components/route-element';
import NotFoundPage from 'pages/not-found-page';
import Home from 'pages/home';
import { Pages, paths, routesMap } from 'constants/pages';

function AppRouter(): React.ReactElement {
  const pages = routesMap.map((item) => {
    return <Route key={item.key} path={item.url} element={<RouterElement component={item.element} />} />;
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path={paths[Pages.Home]} element={<Layout />}>
          <Route index element={<Home />} />
          {pages}
          <Route path={paths[Pages.NotFound]} element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
