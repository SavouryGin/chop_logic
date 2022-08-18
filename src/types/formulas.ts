import { CommonProps } from './general';
import { PropositionalError } from 'errors/propositional-error';
import { PropositionalExpression, PropositionalSymbol } from './propositions';

export type FormulaPreviewProps = CommonProps & {
  preview: PropositionalExpression | PropositionalError;
};

export type FormulaProps = CommonProps & {
  content: PropositionalSymbol[];
  level?: number;
};
