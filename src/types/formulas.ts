import { CommonProps } from './general';
import { PropositionalSymbol } from './propositions';

export type FormulaPreviewProps = CommonProps & {
  text: string | PropositionalSymbol[];
};

export type FormulaProps = CommonProps & {
  content: PropositionalSymbol[];
};
