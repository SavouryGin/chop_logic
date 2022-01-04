import Home from 'basic-pages/home';
import Predicates from 'basic-pages/predicates';
import Propositions from 'basic-pages/propositions';
import TruthTables from 'basic-pages/truth-tables';
import Syllogisms from 'basic-pages/syllogisms';
import { Pages } from 'constants/pages/ids';
import { paths } from 'constants/pages/paths';

export interface IRouteMap {
  id: Pages;
  route: string;
  page: React.FC;
}

export const pagesRouteMap: IRouteMap[] = [
  {
    id: Pages.Home,
    route: paths[Pages.Home],
    page: Home,
  },
  {
    id: Pages.Propositions,
    route: paths[Pages.Propositions],
    page: Propositions,
  },
  {
    id: Pages.Predicates,
    route: paths[Pages.Predicates],
    page: Predicates,
  },
  {
    id: Pages.TruthTables,
    route: paths[Pages.TruthTables],
    page: TruthTables
  },
  {
    id: Pages.Syllogisms,
    route: paths[Pages.Syllogisms],
    page: Syllogisms
  }
];