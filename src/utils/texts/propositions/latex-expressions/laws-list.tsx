import { LocalText } from 'types';

type PropositionalLawsListItem = {
  title: LocalText;
  latexExpression: string;
  id: string;
};

export const PROPOSITIONAL_LAWS_LIST: PropositionalLawsListItem[] = [
  {
    title: { ru: 'Закон тождества', en: 'Law of Identity' },
    latexExpression: `$$`,
    id: 'propositional-law-1',
  },
  {
    title: { ru: 'Закон недопущения противоречия', en: 'Law of Non-contradiction' },
    latexExpression: `$$`,
    id: 'propositional-law-2',
  },
  {
    title: { ru: 'Закон исключенного третьего', en: 'Law of Excluded Middle' },
    latexExpression: `$$`,
    id: 'propositional-law-3',
  },
  {
    title: { ru: 'Закон снятия двойного отрицания', en: 'Law of Double Negation' },
    latexExpression: `$$`,
    id: 'propositional-law-4',
  },
  {
    title: { ru: 'Закон контрапозиции', en: 'Law of Transposition' },
    latexExpression: `$$`,
    id: 'propositional-law-5',
  },
  {
    title: { ru: 'Закон противоположности', en: 'Law of Opposites' },
    latexExpression: `$$`,
    id: 'propositional-law-6',
  },
  {
    title: { ru: 'Закон утверждения консеквента', en: 'Law of Assertion of the Consequent' },
    latexExpression: `$$`,
    id: 'propositional-law-7',
  },
  {
    title: { ru: 'Закон отрицания антецедента', en: 'Law of Negation of the Antecedent' },
    latexExpression: `$$`,
    id: 'propositional-law-8',
  },
  {
    title: { ru: 'Правило modus ponens', en: 'Modus Ponens' },
    latexExpression: `$$`,
    id: 'propositional-law-9',
  },
  {
    title: { ru: 'Правило modus tollens', en: 'Modus Tollens' },
    latexExpression: `$$`,
    id: 'propositional-law-10',
  },
  {
    title: { ru: 'Правило силлогизма', en: 'Law of Syllogism' },
    latexExpression: `$$`,
    id: 'propositional-law-11',
  },
  {
    title: { ru: 'Правило объединения посылок', en: 'Law of Importation' },
    latexExpression: `$$`,
    id: 'propositional-law-12',
  },
  {
    title: { ru: 'Правило перестановки посылок', en: 'Law of Parcel Transposition' },
    latexExpression: `$$`,
    id: 'propositional-law-13',
  },
];
