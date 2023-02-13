import { SelectEntity } from 'types';

export const languageOptions: SelectEntity[] = [
  { option: { en: 'English', ru: 'Английский' }, value: 'en' },
  { option: { en: 'Russian', ru: 'Русский' }, value: 'ru' },
];

export const languageStringOptions = ['en', 'ru'];

export const externalLinks: { [key in string]: string } = {
  telegram: 'https://telegram.me/savoury_gin',
  gitHub: 'https://github.com/SavouryGin',
  linkedIn: 'https://www.linkedin.com/in/dmitrii-suroviagin/',
  mail: 'mailto:Dmitrii.Suroviagin@gmail.com',
  facebook: 'https://www.facebook.com/dmitrii.suroviagin',
};
