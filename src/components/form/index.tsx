import React, { useContext, useRef, useState } from 'react';
import formatClassName from 'helpers/formatters/format-class-name';
import { ComponentProps, IFormContextProps } from 'types';
import Button from 'components/button';
import { Icon } from 'enums';
import { soundPlayer } from 'helpers/sounds';

export type FormProps = ComponentProps & {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  inputs: React.ReactElement;
  initialValues: { [key: string]: unknown };
  formRef?: React.MutableRefObject<HTMLFormElement | undefined>;
  action?: string;
};

export const FormContext = React.createContext({} as IFormContextProps);

function Form(props: FormProps): React.ReactElement {
  const { action, className, onSubmit, inputs, initialValues } = props;
  const formClassNames = formatClassName(['form', className]);
  const [form, setForm] = useState(initialValues);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    // Get the name of the field that caused this change event
    // Get the new value of this field
    const { name, value } = e.target;
    console.log('form', e);
    console.log(form);
    // Update state
    setForm({
      ...form,
      [name]: value,
    });
  };

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
      <Button type='submit' icon={Icon.Default} sound={soundPlayer.slideClick} title='Ok' />
    </form>
  );
}

export default Form;
