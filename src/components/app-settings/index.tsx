import AppSettingsInputs from './elements';
import Form from 'components/controls/form';
import React, { useState } from 'react';
import formatClass from 'helpers/formatters/format-class-name';
import { AppSettingInitialValues, CommonProps, FormValues } from 'types';
import { ButtonID } from 'enums';
import { settingsSelectors as selectors } from 'store/settings/selectors';
import { settingsActions } from 'store/settings';
import { useAppDispatch, useAppSelector } from 'hooks';
import './styles.scss';

const AppSettings = ({ className }: CommonProps): React.ReactElement => {
  const dispatch = useAppDispatch();
  const settingsInitialValues: AppSettingInitialValues = {
    isDarkMode: useAppSelector(selectors.isDarkMode),
    isSoundsEnabled: useAppSelector(selectors.isSoundsEnabled),
    language: useAppSelector(selectors.language),
  };
  const [formValues, setFormValues] = useState(settingsInitialValues);
  const settingsClassNames = formatClass(['settings', className]);

  const closePopup = () => {
    dispatch(settingsActions.setUpFlag({ flag: 'isSettingOpen', value: false }));
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
        submitButtonId={ButtonID.Apply}
      />
    </div>
  );
};

export default AppSettings;
