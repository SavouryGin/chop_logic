export interface PropositionsInitialState {
  flags: PropositionsFlags;
}

export interface PropositionsFlags {
  isPremiseOpened: boolean;
}

export type PropositionsFlag = keyof PropositionsFlags;
