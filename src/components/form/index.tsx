import Button from 'components/button';
import React, { useEffect, useState } from 'react';
import formatClassName from 'helpers/formatters/format-class-name';
import { FormContextProps, FormInput, FormProps } from 'types';
import { Icon } from 'enums';
import { soundPlayer } from 'helpers/sounds';

export const FormContext = React.createContext({} as FormContextProps);

function Form({ className, onSubmit, inputs, initialValues, passValues, submitButtonId, ...rest }: FormProps): React.ReactElement {
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
    if (passValues) {
      passValues(formValues);
    }
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
      <Button
        buttonId={submitButtonId}
        type='submit'
        icon={Icon.Default}
        sound={soundPlayer.slideClick}
        size='large'
        isDisabled={rest.isSubmitDisabled}
      />
    </form>
  );
}

export default Form;
