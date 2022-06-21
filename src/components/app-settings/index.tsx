import AppSettingsInputs from './elements';
import Form from 'components/form';
import React, { useState } from 'react';
import formatClassName from 'helpers/formatters/format-class-name';
import { AppSettingInitialValues, CommonProps, FormValues } from 'types';
import { ButtonID } from 'enums';
import { settingsSelectors as selectors } from 'store/settings/selectors';
import { settingsActions } from 'store/settings/slice';
import { useAppDispatch, useAppSelector } from 'hooks';
import './styles.scss';

const AppSettings = ({ className }: CommonProps) => {
  const dispatch = useAppDispatch();
  const settingsInitialValues: AppSettingInitialValues = {
    isDarkMode: useAppSelector(selectors.getIsDarkMode),
    isSoundsEnabled: useAppSelector(selectors.getIsSoundsEnabled),
    language: useAppSelector(selectors.getLanguage),
  };
  const [formValues, setFormValues] = useState(settingsInitialValues);
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
    dispatch(settingsActions.setUpFlag({ flag: 'isDarkMode', value: formValues.isDarkMode }));
    dispatch(settingsActions.setUpFlag({ flag: 'isSoundsEnabled', value: formValues.isSoundsEnabled }));
    dispatch(settingsActions.setLanguage(formValues.language));
    closePopup();
  };

  const takeValues = (values: FormValues) => setFormValues(values as AppSettingInitialValues);

  return (
    <div className={settingsClassNames} data-testid='settings'>
      <Form
        onSubmit={onSubmit}
        initialValues={settingsInitialValues}
        inputs={<AppSettingsInputs initialValues={settingsInitialValues} />}
        passValues={takeValues}
        submitButtonId={ButtonID.ApplySettings}
      />
    </div>
  );
};

export default AppSettings;
