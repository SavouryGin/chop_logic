import React, { useState } from 'react';
import Checkbox from 'components/inputs/checkbox';
import Select from 'components/inputs/select';
import Form from 'components/form';
import formatClassName from 'helpers/formatters/format-class-name';
import { ComponentProps, FormValues } from 'types';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppSelector } from 'store/hooks';
import { languageOptions, settingsInitialValues } from './constants';

import './styles.scss';

export type AppSettingsProps = ComponentProps;

function AppSettings(props: AppSettingsProps): React.ReactElement {
  const { className } = props;
  const isDarkMode = useAppSelector(settingsSelectors.getIsDarkMode);
  const formClassNames = formatClassName(['settings', className, { settings_dark: isDarkMode }]);
  const [formValues, setFormValues] = useState(settingsInitialValues);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('form', formValues);
  };

  const takeValues = (values: FormValues) => setFormValues(values as typeof settingsInitialValues);

  const formContent = (
    <>
      <Select name='language' id='language' label='Language' options={languageOptions} defaultOption={languageOptions[0]} />
      <Checkbox name='isDarkMode' id='isDarkMode' label='Dark Mode' />
      <Checkbox name='isFullScreen' id='isFullScreen' label='Full Screen' />
      <Checkbox name='isSoundsEnabled' id='isSoundsEnabled' label='Sounds' />
    </>
  );

  return (
    <div className={formClassNames}>
      <Form onSubmit={onSubmit} initialValues={settingsInitialValues} inputs={formContent} getValues={takeValues} />
    </div>
  );
}

export default AppSettings;
