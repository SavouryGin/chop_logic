import React from 'react';
import { Pages } from 'constants/pages/ids';
import { paths } from 'constants/pages/paths';

type RoutesMapItem = {
  id: Pages;
  path: string;
  element: React.FC;
};

const Home = React.lazy(() => import('pages/home'));
const Predicates = React.lazy(() => import('pages/predicates'));
const TruthTables = React.lazy(() => import('pages/truth-tables'));
const Propositions = React.lazy(() => import('pages/propositions'));
const Syllogisms = React.lazy(() => import('pages/syllogisms'));

const routesMap: RoutesMapItem[] = [
  {
    id: Pages.Home,
    path: paths[Pages.Home],
    element: Home,
  },
  {
    id: Pages.Propositions,
    path: paths[Pages.Propositions],
    element: Propositions,
  },
  {
    id: Pages.Predicates,
    path: paths[Pages.Predicates],
    element: Predicates,
  },
  {
    id: Pages.TruthTables,
    path: paths[Pages.TruthTables],
    element: TruthTables,
  },
  {
    id: Pages.Syllogisms,
    path: paths[Pages.Syllogisms],
    element: Syllogisms,
  },
];

export default routesMap;
