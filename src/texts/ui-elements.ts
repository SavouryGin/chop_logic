import { LocalText } from 'types';

export const uiElementTexts: { [key in string]: LocalText } = {
  navHeader: { en: 'Navigation', ru: 'Навигация' },
  footer: { en: 'Dmitrii Suroviagin', ru: 'Дмитрий Суровягин' },
  settings: { en: 'Settings', ru: 'Настройки' },
  premise: { en: 'Premise', ru: 'Посылка' },
  assumption: { en: 'Assumption', ru: 'Гипотеза' },
  implicationCreation: { en: 'Implication Introduction', ru: 'Введение импликации' },
  implicationDistribution: { en: 'Implication Distribution', ru: 'Дистрибуция импликация' },
  contradictionRealization: { en: 'Contradiction Realization', ru: 'Создание противоречия' },
  replacerForm: { en: 'Replace', ru: 'Замена' },
  confirmation: { en: 'Please confirm the action', ru: 'Пожалуйста, подтвердите действие' },
  orIntroduction: { en: 'Disjunction Introduction', ru: 'Введение дизъюнкции' },
  andIntroduction: { en: 'Conjunction Introduction', ru: 'Введение конъюнкции' },
  orIntroductionInfo: {
    en: 'Enter the formula you wish to disjoin to the checked items',
    ru: 'Введите формулу, которую вы хотите соединить дизъюнкцией с выбранными элементами',
  },
  andIntroductionInfo: {
    en: 'Enter the formula you wish to conjoin to the checked items',
    ru: 'Введите формулу, которую вы хотите соединить конъюнкцией с выбранными элементами',
  },
};
