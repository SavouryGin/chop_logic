import { CommonProps } from './general';
import { PropositionalError } from 'errors/propositional-error';
import { PropositionalSymbol } from './propositions';

export type FormulaPreviewProps = CommonProps & {
  text: string;
  passError?: (err: PropositionalError | null) => void;
};

export type FormulaProps = CommonProps & {
  content: PropositionalSymbol[];
};
