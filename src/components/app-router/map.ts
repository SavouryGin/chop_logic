import React from 'react';
import { Icon, Page } from 'enums';
import { paths } from './paths';

type RoutesMapItem = {
  id: Page;
  url: string;
  element: React.FC;
  title: string;
  key: string;
  icon?: Icon;
};

const Predicates = React.lazy(() => import('pages/predicates'));
const TruthTables = React.lazy(() => import('pages/truth-tables'));
const Propositions = React.lazy(() => import('pages/propositions'));
const Syllogisms = React.lazy(() => import('pages/syllogisms'));

export const routesMap: RoutesMapItem[] = [
  {
    id: Page.Propositions,
    key: `page-${Page.Propositions}`,
    url: paths[Page.Propositions],
    element: Propositions,
    title: 'Propositions',
    icon: Icon.Propositions,
  },
  {
    id: Page.Predicates,
    key: `page-${Page.Predicates}`,
    url: paths[Page.Predicates],
    element: Predicates,
    title: 'Predicates',
    icon: Icon.Predicates,
  },
  {
    id: Page.TruthTables,
    key: `page-${Page.TruthTables}`,
    url: paths[Page.TruthTables],
    element: TruthTables,
    title: 'Truth Tables',
    icon: Icon.TruthTables,
  },
  {
    id: Page.Syllogisms,
    key: `page-${Page.Syllogisms}`,
    url: paths[Page.Syllogisms],
    element: Syllogisms,
    title: 'Syllogisms',
    icon: Icon.Syllogisms,
  },
];
