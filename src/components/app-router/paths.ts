import { Page } from 'enums';
import { PathDictionary } from 'types/routing';

export const paths: PathDictionary = {
  [Page.Home]: '/',
  [Page.NotFound]: '*',
  [Page.Propositions]: 'propositions',
  [Page.Predicates]: 'predicates',
  [Page.TruthTables]: 'truth-tables',
  [Page.Syllogisms]: 'syllogisms',
};
