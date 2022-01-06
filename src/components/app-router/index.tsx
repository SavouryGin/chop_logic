import React from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import MainLayout from 'components/main-layout';
import routesMap from './map';
import NotFoundPage from 'pages/not-found-page';
import Propositions from 'pages/propositions';
import Home from 'pages/home';
import Predicates from 'pages/predicates';

function AppRouter(): React.ReactElement {
  // const appPages = routesMap.map((item) => {
  //   // const page = <MainLayout component={item.element} />;
  //   return <Route key={`page-${item.id}`} path={item.path} element={<>1</>} />;
  // });

  // console.log(appPages);
  // const location = useLocation();

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path='propositions' element={<Propositions />} />
          <Route path='predicates' element={<Predicates />} />
          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
