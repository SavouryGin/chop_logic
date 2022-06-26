import { ButtonID } from 'enums';
import { ButtonText } from 'types';

export const buttonTexts: ButtonText = {
  [ButtonID.Cancel]: {
    title: { en: 'Cancel', ru: 'Отмена' },
  },
  [ButtonID.Navigation]: {
    title: { en: 'Navigation', ru: 'Навигация' },
  },
  [ButtonID.ColorTheme]: {
    title: { en: 'Color Theme', ru: 'Цветовая тема' },
  },
  [ButtonID.Sounds]: {
    title: { en: 'Sounds', ru: 'Звуки' },
  },
  [ButtonID.Settings]: {
    title: { en: 'Settings', ru: 'Настройки' },
  },
  [ButtonID.FullScreen]: {
    title: { en: 'Full Screen', ru: 'Полный экран' },
  },
  [ButtonID.Tools]: {
    title: { en: 'Tools', ru: 'Инструменты' },
  },
  [ButtonID.ApplySettings]: {
    title: { en: 'Apply Settings', ru: 'Применить настройки' },
    innerText: { en: 'Apply', ru: 'Применить' },
  },
  [ButtonID.Premise]: {
    title: { en: 'Enter premise', ru: 'Ввести посылку' },
    innerText: { en: 'Premise', ru: 'Посылка' },
  },
  [ButtonID.Reiteration]: {
    title: { en: 'Reiterate proof step', ru: 'Повторить шаг доказательства' },
    innerText: { en: 'Reiteration', ru: 'Повтор' },
  },
  [ButtonID.Replace]: {
    title: { en: 'Replace symbol', ru: 'Заменить символ' },
    innerText: { en: 'Replace', ru: 'Заменить' },
  },
  [ButtonID.Delete]: {
    title: { en: 'Delete proof step', ru: 'Удалить шаг доказательства' },
    innerText: { en: 'Delete', ru: 'Удалить' },
  },
  [ButtonID.ImplicationCreation]: {
    title: { en: 'Implication Creation', ru: 'Введение импликации' },
    innerText: { en: 'Implication Creation', ru: 'Введение импликации' },
  },
  [ButtonID.ImplicationDistribution]: {
    title: { en: 'Implication Distribution', ru: 'Дистрибуция импликации' },
    innerText: { en: 'Implication Distribution', ru: 'Дистрибуция импликации' },
  },
  [ButtonID.ImplicationReversal]: {
    title: { en: 'Implication Reversal', ru: 'Обращение импликации' },
    innerText: { en: 'Implication Reversal', ru: 'Обращение импликации' },
  },
  [ButtonID.ImplicationElimination]: {
    title: { en: 'Implication Elimination', ru: 'Удаление импликации' },
    innerText: { en: 'Implication Elimination', ru: 'Удаление импликации' },
  },
};
