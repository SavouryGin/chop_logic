import { ButtonID } from 'enums';
import { ButtonText, LocalText } from 'types';

export const navHeaderText: LocalText = { en: 'Navigation', ru: 'Навигация' };

export const footerText: LocalText = { en: 'Dmitrii Suroviagin', ru: 'Дмитрий Суровягин' };

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
};
