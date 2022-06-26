import { TextContainer } from 'types';

export const titles: TextContainer = {
  direct: { en: 'Direct Proofs', ru: 'Прямые доказательства' },
  natural: { en: 'Natural Proofs', ru: 'Структурные доказательства' },
  definitions: { en: 'Definitions', ru: 'Определения' },
  heuristics: { en: 'Heuristics', ru: 'Эвристики' },
  rules: { en: 'Rules', ru: 'Правила' },
  page: { en: 'Propositions', ru: 'Высказывания' },
};

export const fillerText = {
  en: 'Enter a premise or axiom to start the proof',
  ru: 'Введите посылку или аксиому, чтобы начать доказательство',
};

export const formsTexts: TextContainer = {
  implicationCreation: {
    en: 'Enter values for the meta-variables in the schema:',
    ru: 'Введите значения для мета-переменных в схеме аксиом:',
  },
};

export const errorsTexts: TextContainer = {
  inputError: {
    en: 'One or more invalid characters entered.',
    ru: 'Введены один или несколько недопустимых символов.',
  },
  syntaxError: {
    en: 'The entered character set cannot be converted to a propositional expression.',
    ru: 'Введённый набор символов нельзя преобразовать в пропозициональное выражение.',
  },
  parenthesisError: {
    en: 'Parentheses are incorrectly placed in the expression.',
    ru: 'В выражении неправильно расставлены скобки.',
  },
  semanticError: {
    en: 'The entered expression cannot be converted into a propositional formula.',
    ru: 'Введённое выражение нельзя преобразовать в пропозициональную формулу.',
  },
};
