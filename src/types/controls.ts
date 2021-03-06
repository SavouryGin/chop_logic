import { ButtonID, Icon, InputID } from 'enums';
import { CommonProps, LocalText } from './general';

export type ButtonProps = CommonProps & {
  buttonId: ButtonID;
  title?: string;
  icon?: Icon;
  text?: string;
  type?: 'button' | 'submit' | 'reset';
  size?: 'small' | 'normal' | 'large';
  onClick?: () => void;
  sound?: HTMLAudioElement;
  isDisabled?: boolean;
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

export type ButtonText = {
  [key in ButtonID]: {
    title: LocalText;
    innerText?: LocalText;
  };
};

export type InputText = {
  [key in InputID]: {
    label: LocalText;
    defaultTextValue?: LocalText;
    placeholder?: LocalText;
  };
};
