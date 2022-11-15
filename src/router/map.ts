import React from 'react';
import { Icon, Page } from 'enums';
import { RoutesMapItem } from 'types';
import { paths } from './paths';

const Predicates = React.lazy(() => import('pages/predicates'));
const TruthTables = React.lazy(() => import('pages/truth-tables'));
const PropositionsIntroduction = React.lazy(() => import('pages/propositions/sub-pages/introduction'));
const PropositionsDirect = React.lazy(() => import('pages/propositions/sub-pages/direct-proofs'));
const PropositionsNatural = React.lazy(() => import('pages/propositions/sub-pages/natural-proofs'));
const Syllogisms = React.lazy(() => import('pages/syllogisms'));

export const routesMap: RoutesMapItem[] = [
  {
    id: Page.Propositions,
    key: `page-${Page.Propositions}`,
    url: paths[Page.Propositions],
    element: PropositionsIntroduction,
    title: { en: 'Propositions', ru: 'Высказывания' },
    icon: Icon.Propositions,
    parentPageId: Page.Home,
  },
  {
    id: Page.PropositionsDirectProofs,
    key: `page-${Page.PropositionsDirectProofs}`,
    url: paths[Page.PropositionsDirectProofs],
    element: PropositionsDirect,
    title: { en: 'Direct Proofs', ru: 'Аксиоматические док-ва' },
    icon: Icon.File,
    parentPageId: Page.Propositions,
  },
  {
    id: Page.PropositionsNaturalProofs,
    key: `page-${Page.PropositionsNaturalProofs}`,
    url: paths[Page.PropositionsNaturalProofs],
    element: PropositionsNatural,
    title: { en: 'Natural Proofs', ru: 'Структурные док-ва' },
    icon: Icon.Files,
    parentPageId: Page.Propositions,
  },
  {
    id: Page.TruthTables,
    key: `page-${Page.TruthTables}`,
    url: paths[Page.TruthTables],
    element: TruthTables,
    title: { en: 'Truth Tables', ru: 'Таблицы истинности' },
    icon: Icon.TruthTables,
    parentPageId: Page.Propositions,
  },
  {
    id: Page.Predicates,
    key: `page-${Page.Predicates}`,
    url: paths[Page.Predicates],
    element: Predicates,
    title: { en: 'Predicates', ru: 'Предикаты' },
    icon: Icon.Predicates,
    parentPageId: Page.Home,
  },
  {
    id: Page.Syllogisms,
    key: `page-${Page.Syllogisms}`,
    url: paths[Page.Syllogisms],
    element: Syllogisms,
    title: { en: 'Syllogisms', ru: 'Силлогизмы' },
    icon: Icon.Syllogisms,
    parentPageId: Page.Home,
  },
];
