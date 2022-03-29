import React, { useEffect, useState } from 'react';
import formatClassName from 'helpers/formatters/format-class-name';
import { ComponentProps, FormContextProps, FormInput, FormValues } from 'types';
import Button from 'components/button';
import { ButtonID, Icon } from 'enums';
import { soundPlayer } from 'helpers/sounds';

export type FormProps = ComponentProps & {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  inputs: React.ReactElement;
  initialValues: FormValues;
  submitButtonId: ButtonID;
  action?: string;
  getValues?: (values: FormValues) => void;
};

export const FormContext = React.createContext({} as FormContextProps);

function Form({ className, onSubmit, inputs, initialValues, getValues, submitButtonId, ...rest }: FormProps): React.ReactElement {
  const formClassNames = formatClassName(['form', className]);
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
    if (getValues) getValues(formValues);
  }, [formValues]);

  return (
    <form className={formClassNames} aria-label='form' action={rest.action || '/'} onSubmit={onSubmit}>
      <FormContext.Provider
        value={{
          formValues,
          onChangeInput,
        }}
      >
        {inputs}
      </FormContext.Provider>
      <Button buttonId={submitButtonId} type='submit' icon={Icon.Default} sound={soundPlayer.slideClick} size='large' />
    </form>
  );
}

export default Form;
