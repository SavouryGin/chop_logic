import { GreekSymbol, InputID } from 'enums';
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
  [InputID.Premise]: {
    label: { en: 'Enter a formula:', ru: 'Введите формулу:' },
  },
  [InputID.FirstMetaVariable]: {
    label: { en: `${GreekSymbol.Phi} :`, ru: `${GreekSymbol.Phi} :` },
  },
  [InputID.SecondMetaVariable]: {
    label: { en: `${GreekSymbol.Psi} :`, ru: `${GreekSymbol.Psi} :` },
  },
  [InputID.ThirdMetaVariable]: {
    label: { en: `${GreekSymbol.Chi} :`, ru: `${GreekSymbol.Chi} :` },
  },
  [InputID.Preview]: {
    label: { en: 'Preview', ru: 'Предпросмотр' },
  },
  [InputID.OldVariable]: {
    label: { en: 'Variable to replace:', ru: 'Переменная для замены:' },
  },
  [InputID.NewVariable]: {
    label: { en: 'New Variable:', ru: 'Новая переменная:' },
  },
};
