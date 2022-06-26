import { ButtonID } from 'enums';
import { CommonProps, Language } from './general';

export type FormValues = { [key: string]: unknown };

export type FormInput = HTMLInputElement | HTMLSelectElement;

export type FormContextProps = {
  formValues: FormValues;
  onChangeInput: (e: React.ChangeEvent<FormInput>) => void;
};

export type FormProps = CommonProps & {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  inputs: React.ReactElement;
  initialValues: FormValues;
  submitButtonId: ButtonID;
  action?: string;
  isSubmitDisabled?: boolean;
  passValues?: (values: FormValues) => void;
};

export type AppSettingInitialValues = {
  isDarkMode: boolean;
  isSoundsEnabled: boolean;
  language: Language;
};
