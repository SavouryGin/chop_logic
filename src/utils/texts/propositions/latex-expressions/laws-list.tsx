import { LocalText } from 'types';

type PropositionalLawsListItem = {
  title: LocalText;
  latexExpression: string;
  id: string;
};

export const PROPOSITIONAL_LAWS_LIST: PropositionalLawsListItem[] = [
  {
    title: { ru: 'Закон тождества', en: '' },
    latexExpression: '',
    id: 'propositional-law-1',
  },
  {
    title: { ru: 'Закон недопущения противоречия', en: '' },
    latexExpression: '',
    id: 'propositional-law-2',
  },
  {
    title: { ru: 'Закон исключенного третьего', en: '' },
    latexExpression: '',
    id: 'propositional-law-3',
  },
  {
    title: { ru: 'Закон снятия двойного отрицания', en: '' },
    latexExpression: '',
    id: 'propositional-law-4',
  },
  {
    title: { ru: 'Закон контрапозиции', en: '' },
    latexExpression: '',
    id: 'propositional-law-5',
  },
  {
    title: { ru: 'Закон противоположности', en: '' },
    latexExpression: '',
    id: 'propositional-law-6',
  },
  {
    title: { ru: 'Закон утверждения консеквента', en: '' },
    latexExpression: '',
    id: 'propositional-law-7',
  },
  {
    title: { ru: 'Закон отрицания антецедента', en: '' },
    latexExpression: '',
    id: 'propositional-law-8',
  },
  {
    title: { ru: 'Правило modus ponens', en: '' },
    latexExpression: '',
    id: 'propositional-law-9',
  },
  {
    title: { ru: 'Правило modus tollens', en: '' },
    latexExpression: '',
    id: 'propositional-law-10',
  },
  {
    title: { ru: 'Правило силлогизма', en: '' },
    latexExpression: '',
    id: 'propositional-law-11',
  },
  {
    title: { ru: 'Правило объединения посылок', en: '' },
    latexExpression: '',
    id: 'propositional-law-12',
  },
  {
    title: { ru: 'Правило перестановки посылок', en: '' },
    latexExpression: '',
    id: 'propositional-law-13',
  },
];
