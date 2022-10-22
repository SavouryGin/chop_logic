import { Page } from 'enums';
import { PathDictionary } from 'types';

export const paths: PathDictionary = {
  [Page.Home]: '/',
  [Page.NotFound]: '*',
  [Page.Propositions]: 'propositions',
  [Page.PropositionsDirectProofs]: 'propositions/direct-proofs',
  [Page.PropositionsNaturalProofs]: 'propositions/natural-proofs',
  [Page.TruthTables]: 'propositions/truth-tables',
  [Page.Predicates]: 'predicates',
  [Page.Syllogisms]: 'syllogisms',
};
