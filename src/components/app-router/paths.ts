import { Page } from 'enums';

type PathDictionary = {
  [key in Page]: string;
};

export const paths: PathDictionary = {
  [Page.Home]: '/',
  [Page.NotFound]: '*',
  [Page.Propositions]: 'propositions',
  [Page.Predicates]: 'predicates',
  [Page.TruthTables]: 'truth-tables',
  [Page.Syllogisms]: 'syllogisms',
};
