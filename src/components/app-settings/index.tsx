import React, { useState } from 'react';
import Checkbox from 'components/inputs/checkbox';
import Select from 'components/inputs/select';
import Form from 'components/form';
import formatClassName from 'helpers/formatters/format-class-name';
import { ComponentProps, FormValues, SelectEntity } from 'types';
import { settingsSelectors } from 'store/settings/selectors';
import { settingsActions } from 'store/settings/slice';
import { useAppDispatch, useAppSelector } from 'hooks';

import './styles.scss';

export type AppSettingsProps = ComponentProps & {
  onClosePopup: () => void;
};

function AppSettings(props: AppSettingsProps): React.ReactElement {
  const { className } = props;
  const settingsClassNames = formatClassName(['settings', className]);
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector(settingsSelectors.getIsDarkMode);
  const isSoundsEnabled = useAppSelector(settingsSelectors.getIsSoundsEnabled);
  const language = useAppSelector(settingsSelectors.getLanguage);
  const settingsInitialValues = { isDarkMode, isSoundsEnabled, language };
  const [formValues, setFormValues] = useState(settingsInitialValues);
  const languageOptions: SelectEntity[] = [
    { option: 'English', value: 'en' },
    { option: 'Russian', value: 'ru' },
  ];
  const defaultLanguage = languageOptions.find((item) => item.value === settingsInitialValues.language);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(settingsActions.setUpFlag({ flag: 'isDarkMode', value: formValues.isDarkMode }));
    dispatch(settingsActions.setUpFlag({ flag: 'isSoundsEnabled', value: formValues.isSoundsEnabled }));
    dispatch(settingsActions.setLanguage(formValues.language));

    // Close the settings popup
    // setTimeout(() => dispatch(settingsActions.setUpFlag({ flag: 'isSettingOpen', value: false })), 900);
    props.onClosePopup();
  };

  const takeValues = (values: FormValues) => setFormValues(values as typeof settingsInitialValues);

  const formContent = (
    <>
      <Select name='language' id='language' label='Language' options={languageOptions} defaultOption={defaultLanguage} />
      <Checkbox name='isDarkMode' id='isDarkMode' label='Dark Mode' defaultValue={settingsInitialValues.isDarkMode} />
      <Checkbox name='isSoundsEnabled' id='isSoundsEnabled' label='Sounds' defaultValue={settingsInitialValues.isSoundsEnabled} />
    </>
  );

  return (
    <div className={settingsClassNames}>
      <Form onSubmit={onSubmit} initialValues={settingsInitialValues} inputs={formContent} getValues={takeValues} />
    </div>
  );
}

export default AppSettings;
