import Home from 'basic-pages/home';
import Predicates from 'basic-pages/predicates';
import Propositions from 'basic-pages/propositions';
import TruthTables from 'basic-pages/truth-tables';
import Syllogisms from 'basic-pages/syllogisms';
import { Pages } from 'constants/pages/ids';
import { paths } from 'constants/pages/paths';

type RoutesMapItem = {
  id: Pages;
  path: string;
  element: React.FC;
};

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
