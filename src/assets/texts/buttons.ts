import { ButtonID } from 'enums';
import { LocalText } from 'types';

type ButtonText = {
  [key in ButtonID]: {
    title: LocalText;
    innerText?: LocalText;
  };
};

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
