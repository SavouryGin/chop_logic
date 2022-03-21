import React, { useEffect, useState } from 'react';
import formatClassName from 'helpers/formatters/format-class-name';
import { ComponentProps, FormContextProps, FormInput, FormValues } from 'types';
import Button from 'components/button';
import { Icon } from 'enums';
import { soundPlayer } from 'helpers/sounds';

export type FormProps = ComponentProps & {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  inputs: React.ReactElement;
  initialValues: FormValues;
  action?: string;
  getValues?: (values: FormValues) => void;
};

export const FormContext = React.createContext({} as FormContextProps);

function Form(props: FormProps): React.ReactElement {
  const { action, className, onSubmit, inputs, initialValues, getValues } = props;
  const formClassNames = formatClassName(['form', className]);
  const [form, setForm] = useState(initialValues);

  const onChangeInput = (e: React.ChangeEvent<FormInput>) => {
    const isCheckbox = e.target instanceof HTMLInputElement && e.target.type == 'checkbox';
    const name = e.target.name;
    const value = isCheckbox ? (e.target as HTMLInputElement).checked : e.target.value;

    setForm({
      ...form,
      [name]: value,
    });
  };

  useEffect(() => {
    if (getValues) getValues(form);
  }, [form]);

  return (
    <form className={formClassNames} action={action || '/'} onSubmit={onSubmit}>
      <FormContext.Provider
        value={{
          form,
          onChangeInput,
        }}
      >
        {inputs}
      </FormContext.Provider>
      <Button type='submit' icon={Icon.Default} sound={soundPlayer.slideClick} title='Ok' size='large' />
    </form>
  );
}

export default Form;
