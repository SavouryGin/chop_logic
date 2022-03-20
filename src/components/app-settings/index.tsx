import React, { useState } from 'react';
import Checkbox from 'components/inputs/checkbox';
import Select from 'components/inputs/select';
import TextInput from 'components/inputs/text-input';
import Form from 'components/form';
import formatClassName from 'helpers/formatters/format-class-name';
import { ComponentProps, FormValues, SelectEntity } from 'types';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppSelector } from 'store/hooks';

import './styles.scss';

export type AppSettingsProps = ComponentProps;

function AppSettings(props: AppSettingsProps): React.ReactElement {
  const { className } = props;
  const isDarkMode = useAppSelector(settingsSelectors.getIsDarkMode);
  const formClassNames = formatClassName(['settings', className, { settings_dark: isDarkMode }]);
  const selectOptions: SelectEntity[] = [
    { option: 'One', value: 1, add: 123 },
    { option: 'Two', value: 2, asdf: 'asdf' },
    { option: 'Three', value: 3, asdf: {} },
  ];
  const initialValues = {
    formCheckbox: false,
    formInput: '',
    formSelect: selectOptions[0].value,
  };
  const [formValues, setFormValues] = useState(initialValues);

  const formContent = (
    <>
      <Checkbox id='formCheckbox' name='formCheckbox' label='Test checkbox' />
      <TextInput name='formInput' label='Text Label' id='formInput' />
      <Select name='formSelect' label='Label1' options={selectOptions} defaultOption={selectOptions[2]} isRequired id='formSelect' />
    </>
  );

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('form', formValues);
  };

  const takeValues = (values: FormValues) => setFormValues(values as typeof initialValues);

  return (
    <div className={formClassNames}>
      <Form onSubmit={onSubmit} initialValues={initialValues} inputs={formContent} getValues={takeValues} />
    </div>
  );
}

export default AppSettings;
