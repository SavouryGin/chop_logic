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
