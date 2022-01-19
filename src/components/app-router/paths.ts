import { Pages } from 'enums';

type PathDictionary = {
  [key in Pages]: string;
};

export const paths: PathDictionary = {
  [Pages.Home]: '/',
  [Pages.NotFound]: '*',
  [Pages.Propositions]: 'propositions',
  [Pages.Predicates]: 'predicates',
  [Pages.TruthTables]: 'truth-tables',
  [Pages.Syllogisms]: 'syllogisms',
};
