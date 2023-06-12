import Button from 'components/controls/button';
import React, { useEffect, useState } from 'react';
import formatClass from 'helpers/formatters/format-class-name';
import { ButtonID, Icon } from 'enums';
import { CommonProps, FormContextProps, FormInput } from 'types';
import { soundPlayer } from 'helpers/sounds';

export const FormContext = React.createContext({} as FormContextProps);

type FormValues = { [key: string]: unknown };

export type FormProps = CommonProps & {
  onSubmit: () => void;
  onReset?: () => void;
  inputs: React.ReactElement;
  initialValues: FormValues;
  action?: string;
  isSubmitDisabled?: boolean;
  passValues?: (values: FormValues) => void;
};

const Form = ({ className, onSubmit, inputs, initialValues, passValues, onReset, ...rest }: FormProps): React.ReactElement => {
  const formClass = formatClass(['form', className]);
  const buttonClass = 'form_buttons';
  const [formValues, setFormValues] = useState(initialValues);

  const onChangeInput = (e: React.ChangeEvent<FormInput>) => {
    const isCheckbox = e.target instanceof HTMLInputElement && e.target.type == 'checkbox';
    const name = e.target.name;
    const value = isCheckbox ? (e.target as HTMLInputElement).checked : e.target.value;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  useEffect(() => {
    if (passValues) {
      passValues(formValues);
    }
  }, [formValues]);

  const handleReset = () => {
    setFormValues(initialValues);
    if (onReset) {
      onReset();
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form className={formClass} aria-label='form' action={rest.action || '/'} onSubmit={handleSubmit} onReset={handleReset}>
      <FormContext.Provider
        value={{
          formValues,
          onChangeInput,
        }}
      >
        {inputs}
      </FormContext.Provider>
      <div className={buttonClass}>
        <Button
          buttonId={ButtonID.Apply}
          type='submit'
          icon={Icon.Default}
          sound={soundPlayer.slideClick}
          view='large'
          isDisabled={rest.isSubmitDisabled}
        />
        {!!onReset && <Button buttonId={ButtonID.Reset} type='reset' icon={Icon.Reset} sound={soundPlayer.slideClick} view='large' />}
      </div>
    </form>
  );
};

export default Form;
