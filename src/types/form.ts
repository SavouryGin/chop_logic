import { Language } from './general';

export type FormValues = { [key: string]: unknown };

export type FormInput = HTMLInputElement | HTMLSelectElement;

export type FormContextProps = {
  formValues: FormValues;
  onChangeInput: (e: React.ChangeEvent<FormInput>) => void;
};

export type AppSettingInitialValues = {
  isDarkMode: boolean;
  isSoundsEnabled: boolean;
  language: Language;
};
