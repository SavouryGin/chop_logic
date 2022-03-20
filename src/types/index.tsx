export type ClassNames = {
  [key in string]: boolean;
};

export type ClassNameProp = string | ClassNames;

export type ComponentProps = {
  className?: ClassNameProp;
  id?: string;
};

export type InputHandlersProps = {
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onBlur?: () => void;
  onFocus?: () => void;
};

export type SelectEntity = {
  option: string;
  value: string | number;
  [key: string]: string | number | object;
};

export type FormValues = { [key: string]: unknown };

export type FormInput = HTMLInputElement | HTMLSelectElement;

export type FormContextProps = {
  form: FormValues;
  onChangeInput: (e: React.ChangeEvent<FormInput>) => void;
};
