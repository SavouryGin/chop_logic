import React from 'react';
import { Icon, Page } from 'enums';
import { RoutesMapItem } from 'types';
import { paths } from './paths';

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
    title: { en: 'Propositions', ru: 'Высказывания' },
    icon: Icon.Propositions,
  },
  {
    id: Page.Predicates,
    key: `page-${Page.Predicates}`,
    url: paths[Page.Predicates],
    element: Predicates,
    title: { en: 'Predicates', ru: 'Предикаты' },
    icon: Icon.Predicates,
  },
  {
    id: Page.TruthTables,
    key: `page-${Page.TruthTables}`,
    url: paths[Page.TruthTables],
    element: TruthTables,
    title: { en: 'Truth Tables', ru: 'Таблицы' },
    icon: Icon.TruthTables,
  },
  {
    id: Page.Syllogisms,
    key: `page-${Page.Syllogisms}`,
    url: paths[Page.Syllogisms],
    element: Syllogisms,
    title: { en: 'Syllogisms', ru: 'Силлогизмы' },
    icon: Icon.Syllogisms,
  },
];
