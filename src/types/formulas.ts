import { CommonProps } from './general';
import { PropositionalSymbol } from './propositions';

export type FormulaPreviewProps = CommonProps & {
  text: string;
};

export type FormulaProps = CommonProps & {
  content: PropositionalSymbol[];
};
