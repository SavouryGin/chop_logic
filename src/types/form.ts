import { ButtonID, InputID } from 'enums';
import { CommonProps, LocalText } from './general';

export type InputHandlersProps = {
  onChange?: () => void;
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

export type FormProps = CommonProps & {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  inputs: React.ReactElement;
  initialValues: FormValues;
  submitButtonId: ButtonID;
  action?: string;
  isSubmitDisabled?: boolean;
  passValues?: (values: FormValues) => void;
};

export type CheckboxProps = CommonProps &
  InputHandlersProps & {
    name: string;
    inputId?: InputID;
    label?: string;
    defaultValue?: boolean;
    isDisabled?: boolean;
    isRequired?: boolean;
    getCheckboxEvent?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setCheckboxValue?: boolean;
  };

export type LabelProps = CommonProps & {
  id: string;
  text?: string;
  isRequired?: boolean;
  isDarkMode?: boolean;
};

export type SelectProps = CommonProps &
  InputHandlersProps & {
    name: string;
    options: SelectEntity[];
    inputId: InputID;
    label?: string;
    defaultOption?: SelectEntity;
    isRequired?: boolean;
    isDisabled?: boolean;
    formId?: string;
  };

export type TextInputProps = CommonProps &
  InputHandlersProps & {
    name: string;
    inputId: InputID;
    label?: string;
    defaultValue?: string;
    placeholder?: string;
    isDisabled?: boolean;
    isRequired?: boolean;
    isReadOnly?: boolean;
    isInvalid?: boolean;
    isAutocomplete?: boolean;
    maxLength?: number;
    minLength?: number;
    value?: string;
  };
