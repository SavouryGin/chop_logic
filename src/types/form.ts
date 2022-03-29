import { LocalText } from './general';

export type InputHandlersProps = {
  onChange?: (e: React.ChangeEvent<FormInput>) => void;
  onBlur?: () => void;
  onFocus?: () => void;
};

export type SelectEntity = {
  option: LocalText;
  value: string | number;
  [key: string]: unknown;
};

export type FormValues = { [key: string]: unknown };

export type FormInput = HTMLInputElement | HTMLSelectElement;

export type FormContextProps = {
  formValues: FormValues;
  onChangeInput: (e: React.ChangeEvent<FormInput>) => void;
};
