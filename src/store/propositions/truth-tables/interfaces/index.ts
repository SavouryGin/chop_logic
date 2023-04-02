import { LocalText } from 'types';

export interface TruthTablesInitialState {
  flags: TruthTablesFlags;
  error: LocalText | null;
}

export interface TruthTablesFlags {
  isLoading: boolean;
}

export type TruthTablesFlag = keyof TruthTablesFlags;
