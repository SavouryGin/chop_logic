import React, { useState } from 'react';
import Checkbox from 'components/inputs/checkbox';
import Select from 'components/inputs/select';
import Form from 'components/form';
import formatClassName from 'helpers/formatters/format-class-name';
import { ComponentProps, FormValues } from 'types';
import { ButtonID, InputID } from 'enums';
import { settingsSelectors as selectors } from 'store/settings/selectors';
import { settingsActions } from 'store/settings/slice';
import { useAppDispatch, useAppSelector } from 'hooks';
import { languageOptions } from './constants';

import './styles.scss';

export type AppSettingsProps = ComponentProps;

function AppSettings({ className }: AppSettingsProps): React.ReactElement {
  const dispatch = useAppDispatch();
  const settingsClassNames = formatClassName(['settings', className]);
  const settingsInitialValues = {
    isDarkMode: useAppSelector(selectors.getIsDarkMode),
    isSoundsEnabled: useAppSelector(selectors.getIsSoundsEnabled),
    language: useAppSelector(selectors.getLanguage),
  };
  const [formValues, setFormValues] = useState(settingsInitialValues);
  const defaultLanguage = languageOptions.find((item) => item.value === settingsInitialValues.language);

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
      <Select inputId={InputID.LanguageSelect} name='language' id='language' options={languageOptions} defaultOption={defaultLanguage} />
      <Checkbox inputId={InputID.isDarkModeCheckbox} name='isDarkMode' id='isDarkMode' defaultValue={settingsInitialValues.isDarkMode} />
      <Checkbox
        inputId={InputID.isSoundsCheckbox}
        name='isSoundsEnabled'
        id='isSoundsEnabled'
        defaultValue={settingsInitialValues.isSoundsEnabled}
      />
    </>
  );

  return (
    <div className={settingsClassNames} data-testid='settings'>
      <Form
        onSubmit={onSubmit}
        initialValues={settingsInitialValues}
        inputs={formInputs}
        getValues={takeValues}
        submitButtonId={ButtonID.ApplySettings}
      />
    </div>
  );
}

export default AppSettings;
