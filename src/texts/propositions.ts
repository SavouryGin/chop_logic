import { TextContainer } from 'types';

export const titles: TextContainer = {
  direct: { en: 'Direct Proofs', ru: 'Аксиоматические доказательства' },
  natural: { en: 'Natural Proofs', ru: 'Структурные доказательства' },
  editor: { en: 'Editor', ru: 'Редактор' },
  axioms: { en: 'Axiom Schemes', ru: 'Схемы аксиом' },
  definitions: { en: 'Definitions', ru: 'Определения' },
  heuristics: { en: 'Heuristics', ru: 'Эвристики' },
  rules: { en: 'Rules', ru: 'Правила' },
  page: { en: 'Propositions', ru: 'Высказывания' },
};

export const fillerText = {
  en: 'Enter a premise or axiom to start the proof',
  ru: 'Введите посылку или аксиому, чтобы начать доказательство',
};

export const fillerNaturalText = {
  en: 'Enter a premise or an assumption to start the proof',
  ru: 'Введите посылку или гипотезу, чтобы начать доказательство',
};

export const formsTexts: TextContainer = {
  enterValues: {
    en: 'Enter values for the meta-variables in the schema:',
    ru: 'Введите значения для мета-переменных в схеме:',
  },
};

export const popupsTexts: TextContainer = {
  deleteConfirmation: {
    en: 'The following formula(s) is going to be removed from the proof as dependencies:',
    ru: 'Следующие формула(-ы) будут также удалены из доказательства как зависимости:',
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
  generalError: {
    en: 'Something went wrong.',
    ru: 'Что-то пошло не так.',
  },
};
