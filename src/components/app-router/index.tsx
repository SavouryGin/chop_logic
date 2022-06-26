import Home from 'pages/home';
import Layout from 'components/layout';
import NotFoundPage from 'pages/not-found-page';
import React, { useMemo } from 'react';
import RouterElement from './route-element';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Page } from 'enums';
import { paths } from 'presets/paths';
import { routesMap } from 'presets/map';

const AppRouter = () => {
  const pages = useMemo(() => {
    return routesMap.map((item) => <Route key={item.key} path={item.url} element={<RouterElement component={item.element} />} />);
  }, [routesMap.length]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={paths[Page.Home]} element={<Layout />}>
          <Route index element={<Home />} />
          {pages}
          <Route path={paths[Page.NotFound]} element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
