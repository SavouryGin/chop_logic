import Checkbox from 'components/controls/checkbox';
import React, { useMemo } from 'react';
import Select from 'components/controls/select';
import { AppSettingInitialValues } from 'types';
import { InputID } from 'enums';
import { languageOptions } from 'presets/settings';

type AppSettingsInputsProps = {
  initialValues: AppSettingInitialValues;
};

const AppSettingsInputs = ({ initialValues }: AppSettingsInputsProps) => {
  const defaultLanguage = useMemo(() => {
    return languageOptions.find((item) => item.value === initialValues.language);
  }, [initialValues.language]);

  return (
    <>
      <Select inputId={InputID.LanguageSelect} name='language' options={languageOptions} defaultOption={defaultLanguage} />
      <Checkbox inputId={InputID.isDarkModeCheckbox} name='isDarkMode' defaultValue={initialValues.isDarkMode} />
      <Checkbox inputId={InputID.isSoundsCheckbox} name='isSoundsEnabled' defaultValue={initialValues.isSoundsEnabled} />
    </>
  );
};

export default AppSettingsInputs;
