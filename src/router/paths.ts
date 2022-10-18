import { Page } from 'enums';
import { PathDictionary } from 'types';

export const paths: PathDictionary = {
  [Page.Home]: '/',
  [Page.NotFound]: '*',
  [Page.PropositionsIntro]: 'propositions',
  [Page.PropositionsDirectProofs]: 'propositions/direct-proofs',
  [Page.PropositionsNaturalProofs]: 'propositions/natural-proofs',
  [Page.Predicates]: 'predicates',
  [Page.TruthTables]: 'truth-tables',
  [Page.Syllogisms]: 'syllogisms',
};
