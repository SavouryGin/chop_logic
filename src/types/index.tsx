export type ClassNames = {
  [key in string]: boolean;
};

export type ClassNameProp = string | ClassNames;

export type ComponentProps = {
  className?: ClassNameProp;
  id?: string;
};

export type InputHandlersProps = {
  onChange?: (e: React.ChangeEvent<FormInput>) => void;
  onBlur?: () => void;
  onFocus?: () => void;
};

export type SelectEntity = {
  option: string;
  value: string | number;
  [key: string]: unknown;
};

export type FormValues = { [key: string]: unknown };

export type FormInput = HTMLInputElement | HTMLSelectElement;

export type FormContextProps = {
  formValues: FormValues;
  onChangeInput: (e: React.ChangeEvent<FormInput>) => void;
};
