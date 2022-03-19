import React, { useContext, useRef, useState } from 'react';
import formatClassName from 'helpers/formatters/format-class-name';
import { ComponentProps } from 'types';
import Button from 'components/button';
import { Icon } from 'enums';
import { soundPlayer } from 'helpers/sounds';

export type FormProps = ComponentProps & {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  content: React.ReactElement;
  // render(): JSX.Element;
  formRef?: React.MutableRefObject<HTMLFormElement | undefined>;
  action?: string;
  initialValues: { [key: string]: unknown };
};

interface IFormContextProps {
  form: { [key: string]: unknown };
  handleFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export const FormContext = React.createContext({} as IFormContextProps);

// ToDo: create a generic form
function Form(props: FormProps): React.ReactElement {
  const { action, className, onSubmit, content, initialValues } = props;
  const formClassNames = formatClassName(['form', className]);
  const [form, setForm] = useState(initialValues);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    // Get the name of the field that caused this change event
    // Get the new value of this field
    const { name, value } = e.target;
    console.log('form', e);
    console.log(form);
    // const value = e.target.value;
    // const name = e.target.name;
    // Update state
    // Assign new value to the appropriate form field
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
          handleFormChange,
        }}
      >
        {content}
      </FormContext.Provider>
      <Button type='submit' icon={Icon.Default} sound={soundPlayer.slideClick} title='Ok' />
    </form>
  );
}

export default Form;
