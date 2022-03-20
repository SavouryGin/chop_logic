import React, { useRef } from 'react';
import Checkbox from 'components/inputs/checkbox';
import Select from 'components/inputs/select';
import TextInput from 'components/inputs/text-input';
import formatClassName from 'helpers/formatters/format-class-name';
import { ComponentProps, SelectEntity } from 'types';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppSelector } from 'store/hooks';

import './styles.scss';
import Button from 'components/button';
import { Icon } from 'enums';
import { soundPlayer } from 'helpers/sounds';
import Form from 'components/form';

export type AppSettingsProps = ComponentProps;

function AppSettings(props: AppSettingsProps): React.ReactElement {
  const { className } = props;
  const isDarkMode = useAppSelector(settingsSelectors.getIsDarkMode);
  // const formClassNames = formatClassName(['settings', className, { settings_dark: isDarkMode }]);
  // const formRef = useRef<HTMLFormElement>(null);
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
  // const [formData, updateFormData] = React.useState(initialValues);

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   console.log('SUBMIT');
  //   console.log(e);
  //   console.log(formData);
  // };

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  //   updateFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  return (
    // // <form className={formClassNames} onSubmit={handleSubmit}>
    //   <Checkbox id='formCheckbox' name='formCheckbox' label='Test checkbox' onChange={handleChange} />
    //   <TextInput name='formInput' label='Text Label' id='formInput' onChange={handleChange} />
    //   <Select
    //     name='formSelect'
    //     label='Label1'
    //     options={selectOptions}
    //     defaultOption={selectOptions[2]}
    //     isRequired
    //     id='formSelect'
    //     onChange={handleChange}
    //   />
    //   <Button type='submit' icon={Icon.Default} sound={soundPlayer.slideClick} title='Ok' />
    // </form>
    <Form
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Submit', e);
      }}
      initialValues={initialValues}
      inputs={
        <>
          <Checkbox id='formCheckbox' name='formCheckbox' label='Test checkbox' />
          <TextInput name='formInput' label='Text Label' id='formInput' />
          <Select name='formSelect' label='Label1' options={selectOptions} defaultOption={selectOptions[2]} isRequired id='formSelect' />
        </>
      }
      // render={() => (
      //   <>
      //     <Checkbox id='formCheckbox' name='formCheckbox' label='Test checkbox' onChange={handleChange} />
      //     <TextInput name='formInput' label='Text Label' id='formInput' onChange={handleChange} />
      //     <Select
      //       name='formSelect'
      //       label='Label1'
      //       options={selectOptions}
      //       defaultOption={selectOptions[2]}
      //       isRequired
      //       id='formSelect'
      //       onChange={handleChange}
      //     />
      //   </>
      // )}
    />
  );
}

export default AppSettings;
