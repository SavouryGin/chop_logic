import { Page } from 'enums';
import { PathDictionary } from 'types';

export const paths: PathDictionary = {
  [Page.Home]: '/',
  [Page.NotFound]: '*',
  [Page.Propositions]: 'propositions',
  [Page.PropositionsDirectProofs]: 'direct-proofs',
  [Page.PropositionsNaturalProofs]: 'natural-proofs',
  [Page.PropositionsResolutionProofs]: 'resolution-proofs',
  [Page.TruthTables]: 'truth-tables',
  [Page.Predicates]: 'predicates',
  [Page.Syllogisms]: 'syllogisms',
};
