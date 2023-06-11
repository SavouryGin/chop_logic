import Button from 'components/controls/button';
import React, { useEffect, useState } from 'react';
import formatClass from 'helpers/formatters/format-class-name';
import { ButtonID, Icon } from 'enums';
import { CommonProps, FormContextProps, FormInput } from 'types';
import { soundPlayer } from 'helpers/sounds';

export const FormContext = React.createContext({} as FormContextProps);

type FormValues = { [key: string]: unknown };

export type FormProps = CommonProps & {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onReset?: () => void;
  inputs: React.ReactElement;
  initialValues: FormValues;
  action?: string;
  isSubmitDisabled?: boolean;
  passValues?: (values: FormValues) => void;
};

const Form = ({ className, onSubmit, inputs, initialValues, passValues, onReset, ...rest }: FormProps): React.ReactElement => {
  const formClassNames = formatClass(['form', className]);
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
    <form className={formClassNames} aria-label='form' action={rest.action || '/'} onSubmit={onSubmit} onReset={onReset}>
      <FormContext.Provider
        value={{
          formValues,
          onChangeInput,
        }}
      >
        {inputs}
      </FormContext.Provider>
      <Button
        buttonId={ButtonID.Apply}
        type='submit'
        icon={Icon.Default}
        sound={soundPlayer.slideClick}
        view='large'
        isDisabled={rest.isSubmitDisabled}
      />
      {!!onReset && (
        <Button
          buttonId={ButtonID.Cancel}
          type='reset'
          icon={Icon.Cancel}
          sound={soundPlayer.slideClick}
          view='flat'
          isDisabled={rest.isSubmitDisabled}
        />
      )}
    </form>
  );
};

export default Form;
