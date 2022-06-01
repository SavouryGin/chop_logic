import { SelectEntity } from 'types';

export const languageOptions: SelectEntity[] = [
  { option: { en: 'English', ru: 'Английский' }, value: 'en' },
  { option: { en: 'Russian', ru: 'Русский' }, value: 'ru' },
];

export const externalLinks: { [key in string]: string } = {
  telegram: 'https://telegram.me/savoury_gin',
  gitHub: 'https://github.com/SavouryGin',
  mail: 'mailto:Dmitrii.Suroviagin@gmail.com',
};
