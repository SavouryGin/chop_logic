import Checkbox from 'components/inputs/checkbox';
import Form from 'components/form';
import React, { useState } from 'react';
import Select from 'components/inputs/select';
import formatClassName from 'helpers/formatters/format-class-name';
import { ButtonID, InputID } from 'enums';
import { ComponentProps, FormValues } from 'types';
import { languageOptions } from './constants';
import { settingsSelectors as selectors } from 'store/settings/selectors';
import { settingsActions } from 'store/settings/slice';
import { useAppDispatch, useAppSelector } from 'hooks';

import './styles.scss';

export type AppSettingsProps = ComponentProps;

function AppSettings({ className }: AppSettingsProps): React.ReactElement {
  const dispatch = useAppDispatch();
  const settingsInitialValues = {
    isDarkMode: useAppSelector(selectors.getIsDarkMode),
    isSoundsEnabled: useAppSelector(selectors.getIsSoundsEnabled),
    language: useAppSelector(selectors.getLanguage),
  };
  const [formValues, setFormValues] = useState(settingsInitialValues);
  const defaultLanguage = languageOptions.find((item) => item.value === settingsInitialValues.language);
  const settingsClassNames = formatClassName(['settings', className]);

  const closePopup = () => {
    dispatch(settingsActions.toggleFlag('isModalWindowClosingAnimationActive'));
    // wait for closing CSS animation
    setTimeout(() => {
      dispatch(settingsActions.setUpFlag({ flag: 'isSettingOpen', value: false }));
      dispatch(settingsActions.toggleFlag('isModalWindowClosingAnimationActive'));
    }, 900);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Dispatch the settings to the store
    dispatch(settingsActions.setUpFlag({ flag: 'isDarkMode', value: formValues.isDarkMode }));
    dispatch(settingsActions.setUpFlag({ flag: 'isSoundsEnabled', value: formValues.isSoundsEnabled }));
    dispatch(settingsActions.setLanguage(formValues.language));
    // Close the modal window
    closePopup();
  };

  const takeValues = (values: FormValues) => setFormValues(values as typeof settingsInitialValues);

  const formInputs = (
    <>
      <Select inputId={InputID.LanguageSelect} name='language' options={languageOptions} defaultOption={defaultLanguage} />
      <Checkbox inputId={InputID.isDarkModeCheckbox} name='isDarkMode' defaultValue={settingsInitialValues.isDarkMode} />
      <Checkbox inputId={InputID.isSoundsCheckbox} name='isSoundsEnabled' defaultValue={settingsInitialValues.isSoundsEnabled} />
    </>
  );

  return (
    <div className={settingsClassNames} data-testid='settings'>
      <Form
        onSubmit={onSubmit}
        initialValues={settingsInitialValues}
        inputs={formInputs}
        passValues={takeValues}
        submitButtonId={ButtonID.ApplySettings}
      />
    </div>
  );
}

export default AppSettings;
