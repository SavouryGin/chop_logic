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
};
