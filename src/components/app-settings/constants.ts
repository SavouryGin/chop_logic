import { LocalText, SelectEntity } from 'types';

export const languageOptions: SelectEntity[] = [
  { option: { en: 'English', ru: 'Английский' }, value: 'en' },
  { option: { en: 'Russian', ru: 'Русский' }, value: 'ru' },
];

export const settingsText: LocalText = { en: 'Settings', ru: 'Настройки' };
