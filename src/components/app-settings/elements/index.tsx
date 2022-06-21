import Checkbox from 'components/inputs/checkbox';
import React from 'react';
import Select from 'components/inputs/select';
import { AppSettingInitialValues } from 'types';
import { InputID } from 'enums';
import { languageOptions } from 'assets/const/settings';

type AppSettingsInputsProps = {
  initialValues: AppSettingInitialValues;
};

const AppSettingsInputs = ({ initialValues }: AppSettingsInputsProps) => {
  const defaultLanguage = languageOptions.find((item) => item.value === initialValues.language);

  return (
    <>
      <Select inputId={InputID.LanguageSelect} name='language' options={languageOptions} defaultOption={defaultLanguage} />
      <Checkbox inputId={InputID.isDarkModeCheckbox} name='isDarkMode' defaultValue={initialValues.isDarkMode} />
      <Checkbox inputId={InputID.isSoundsCheckbox} name='isSoundsEnabled' defaultValue={initialValues.isSoundsEnabled} />
    </>
  );
};

export default AppSettingsInputs;
