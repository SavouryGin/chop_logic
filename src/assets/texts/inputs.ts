import { InputID } from 'enums';
import { InputText } from 'types';

export const inputTexts: InputText = {
  [InputID.DefaultInput]: {
    label: { en: 'Input', ru: 'Ввод' },
  },
  [InputID.LanguageSelect]: {
    label: { en: 'Language', ru: 'Язык' },
  },
  [InputID.isDarkModeCheckbox]: {
    label: { en: 'Dark Mode', ru: 'Темная тема' },
  },
  [InputID.isSoundsCheckbox]: {
    label: { en: 'Sounds', ru: 'Звуки' },
  },
};
