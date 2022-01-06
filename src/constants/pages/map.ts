import React from 'react';
import { Pages } from 'constants/pages/ids';
import { paths } from 'constants/pages/paths';

type RoutesMapItem = {
  id: Pages;
  url: string;
  element: React.FC;
  title?: string;
};

const Predicates = React.lazy(() => import('pages/predicates'));
const TruthTables = React.lazy(() => import('pages/truth-tables'));
const Propositions = React.lazy(() => import('pages/propositions'));
const Syllogisms = React.lazy(() => import('pages/syllogisms'));

const routesMap: RoutesMapItem[] = [
  {
    id: Pages.Propositions,
    url: paths[Pages.Propositions],
    element: Propositions,
    title: 'Propositions',
  },
  {
    id: Pages.Predicates,
    url: paths[Pages.Predicates],
    element: Predicates,
    title: 'Predicates',
  },
  {
    id: Pages.TruthTables,
    url: paths[Pages.TruthTables],
    element: TruthTables,
    title: 'Truth Tables',
  },
  {
    id: Pages.Syllogisms,
    url: paths[Pages.Syllogisms],
    element: Syllogisms,
    title: 'Syllogisms',
  },
];

export default routesMap;
