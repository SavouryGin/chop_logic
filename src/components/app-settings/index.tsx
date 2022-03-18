import React, { useRef } from 'react';
import Checkbox from 'components/inputs/checkbox';
import Select from 'components/inputs/select';
import TextInput from 'components/inputs/text-input';
import formatClassName from 'helpers/formatters/format-class-name';
import { ComponentProps, SelectEntity } from 'types';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppSelector } from 'store/hooks';

import './styles.scss';

export type AppSettingsProps = ComponentProps;

function AppSettings(props: AppSettingsProps): React.ReactElement {
  const { className } = props;
  const isDarkMode = useAppSelector(settingsSelectors.getIsDarkMode);
  const formClassNames = formatClassName(['settings', className, { settings_dark: isDarkMode }]);
  const formRef = useRef(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e);
    console.log(formRef);
  };

  const selectOptions: SelectEntity[] = [
    { option: 'One', value: 1, add: 123 },
    { option: 'Two', value: 2, asdf: 'asdf' },
    { option: 'Three', value: 3, asdf: {} },
  ];

  return (
    <form className={formClassNames} action={'/'} onSubmit={handleSubmit} ref={formRef}>
      <Checkbox id='test-id-1' name='test-name' label='Test checkbox' />
      <TextInput name='text' label='Text Label' id='test-input' />
      <Select name='select1' label='Label1' options={selectOptions} defaultOption={selectOptions[2]} isRequired id='test-select' />
    </form>
  );
}

export default AppSettings;
