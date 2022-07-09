import { CommonProps } from './general';
import { PropositionalError } from 'errors/propositional-error';
import { PropositionalExpression, PropositionalSymbol } from './propositions';

export type FormulaPreviewProps = CommonProps & {
  preview: PropositionalExpression | PropositionalError;
  passError?: (err: PropositionalError | null) => void;
};

export type FormulaProps = CommonProps & {
  content: PropositionalSymbol[];
};
