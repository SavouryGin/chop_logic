import { LocalText } from 'types';

type PropositionalLawsListItem = {
  title: LocalText;
  latexExpressions: string[];
  id: string;
};

export const PROPOSITIONAL_LAWS_LIST: PropositionalLawsListItem[] = [
  {
    title: { ru: 'Закон тождества', en: 'Law of Identity' },
    latexExpressions: [`$$\\vDash p \\rightarrow p$$`],
    id: 'propositional-law-1',
  },
  {
    title: { ru: 'Закон недопущения противоречия', en: 'Law of Non-contradiction' },
    latexExpressions: [`$$\\vDash \\neg (p \\land \\neg p)$$`],
    id: 'propositional-law-2',
  },
  {
    title: { ru: 'Закон исключенного третьего', en: 'Law of Excluded Middle' },
    latexExpressions: [`$$\\vDash p \\lor \\neg p$$`],
    id: 'propositional-law-3',
  },
  {
    title: { ru: 'Закон снятия двойного отрицания', en: 'Law of Double Negation' },
    latexExpressions: [`$$\\vDash \\neg(\\neg p) \\leftrightarrow p$$`],
    id: 'propositional-law-4',
  },
  {
    title: { ru: 'Закон контрапозиции', en: 'Law of Transposition' },
    latexExpressions: [`$$\\vDash (p \\rightarrow q)\\leftrightarrow(\\neg q \\rightarrow \\neg p)$$`],
    id: 'propositional-law-5',
  },
  {
    title: { ru: 'Закон противоположности', en: 'Law of Opposites' },
    latexExpressions: [`$$\\vDash (p\\leftrightarrow q)\\leftrightarrow(\\neg p \\leftrightarrow \\neg q)$$`],
    id: 'propositional-law-6',
  },
  {
    title: { ru: 'Закон утверждения консеквента', en: 'Law of Assertion of the Consequent' },
    latexExpressions: [`$$\\vDash p \\rightarrow (q \\rightarrow p)$$`],
    id: 'propositional-law-7',
  },
  {
    title: { ru: 'Закон отрицания антецедента', en: 'Law of Negation of the Antecedent' },
    latexExpressions: [`$$\\vDash \\neg p \\rightarrow (p \\rightarrow q)$$`],
    id: 'propositional-law-8',
  },
  {
    title: { ru: 'Правило modus ponens', en: 'Modus Ponens' },
    latexExpressions: [`$$\\vDash ((p\\rightarrow q) \\land p)\\rightarrow q$$`],
    id: 'propositional-law-9',
  },
  {
    title: { ru: 'Правило modus tollens', en: 'Modus Tollens' },
    latexExpressions: [`$$\\vDash ((p\\rightarrow q) \\land \\neg q)\\rightarrow \\neg p$$`],
    id: 'propositional-law-10',
  },
  {
    title: { ru: 'Правило силлогизма', en: 'Law of Syllogism' },
    latexExpressions: [`$$\\vDash ((p \\rightarrow q) \\land (q \\rightarrow r)) \\rightarrow (p \\rightarrow r)$$`],
    id: 'propositional-law-11',
  },
  {
    title: { ru: 'Правило объединения посылок', en: 'Law of Importation' },
    latexExpressions: [`$$\\vDash (p\\rightarrow(q\\rightarrow r))\\leftrightarrow((p \\land q)\\rightarrow r)$$`],
    id: 'propositional-law-12',
  },
  {
    title: { ru: 'Правило перестановки посылок', en: 'Law of Parcel Transposition' },
    latexExpressions: [`$$\\vDash (p\\rightarrow (q \\rightarrow r))\\leftrightarrow(q\\rightarrow (p \\rightarrow r))$$`],
    id: 'propositional-law-13',
  },
  //
  {
    title: { ru: 'Законы идемпотентности', en: 'Idempotent Laws' },
    latexExpressions: [`$$\\vDash (p \\land p)\\leftrightarrow p$$`, `$$\\vDash (p \\lor p) \\leftrightarrow p$$`],
    id: 'propositional-law-14',
  },
  {
    title: { ru: 'Законы коммутативности', en: 'Commutative Laws' },
    latexExpressions: [`$$\\vDash (p \\land q) \\leftrightarrow (q \\land p)$$`, `$$\\vDash (p \\lor q)\\leftrightarrow(q \\lor p)$$`],
    id: 'propositional-law-15',
  },
  {
    title: { ru: 'Законы ассоциативности', en: 'Associative Laws' },
    latexExpressions: [
      `$$\\vDash ((p \\land q) \\land r)\\leftrightarrow (p \\land (q \\land r))$$`,
      `$$\\vDash ((p \\lor q) \\lor r)\\leftrightarrow (p \\lor (q \\lor r))$$`,
    ],
    id: 'propositional-law-16',
  },
  {
    title: { ru: 'Законы дистрибутивности', en: 'Distributive Laws' },
    latexExpressions: [
      `$$\\vDash (p \\land (q \\lor r))\\leftrightarrow((p \\land q)\\lor(p \\land r))$$`,
      `$$\\vDash (p \\lor (q \\land r))\\leftrightarrow((p \\lor q)\\land(p \\lor r))$$`,
    ],
    id: 'propositional-law-17',
  },
  {
    title: { ru: 'Законы де Моргана', en: "De Morgan's Laws" },
    latexExpressions: [
      `$$\\vDash \\neg(p \\land q) \\leftrightarrow (\\neg p \\lor \\neg q)$$`,
      `$$\\vDash \\neg(p \\lor q) \\leftrightarrow (\\neg p \\land \\neg q)$$`,
    ],
    id: 'propositional-law-18',
  },
  {
    title: { ru: 'Законы упрощения', en: 'Simplification Laws' },
    latexExpressions: [`$$\\vDash (p \\land q)\\rightarrow p$$`, `$$\\vDash p \\rightarrow (p \\lor q)$$`],
    id: 'propositional-law-19',
  },
  {
    title: { ru: 'Законы поглощения', en: 'Absorption Laws' },
    latexExpressions: [`$$\\vDash (p \\land (p \\lor q))\\leftrightarrow p$$`, `$$\\vDash (p \\lor (p \\land q))\\leftrightarrow p$$`],
    id: 'propositional-law-20',
  },
];
