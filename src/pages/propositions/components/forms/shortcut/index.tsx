import Form from 'components/controls/form';
import FormulaPreview from 'components/controls/formula-preview';
import React, { memo, useState } from 'react';
import TextInput from 'components/controls/text-input';
import { FormValues } from 'types';
import { InputID } from 'enums';
import { npActions as actions } from 'store/propositions/natural-proofs';
import { useAppDispatch, usePropositionalFormulaPreview } from 'hooks';
import './styles.scss';

const ShortcutForm = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const shortcutInitialValue = { shortcut: '', comment: '' };
  const [formValue, setFormValue] = useState(shortcutInitialValue);

  const preview = usePropositionalFormulaPreview(formValue.shortcut);
  const hasError = !Array.isArray(preview);
  const isFormInvalid = hasError || !formValue.shortcut || !formValue.comment;
  const formContent = (
    <>
      <TextInput name='shortcut' inputId={InputID.Shortcut} className='shortcut-form__input' isRequired />
      <FormulaPreview preview={preview} />
      <TextInput name='comment' inputId={InputID.Comment} className='shortcut-form__input' isRequired maxLength={50} />
    </>
  );

  const takeValues = (values: FormValues) => setFormValue(values as typeof shortcutInitialValue);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(actions.addShortcut({ rawInput: formValue.shortcut, comment: formValue.comment }));
    dispatch(actions.setUpFlag({ flag: 'isShortcutOpened', value: false }));
  };

  return (
    <div className='shortcut-form'>
      <Form
        onSubmit={onSubmit}
        initialValues={shortcutInitialValue}
        inputs={formContent}
        passValues={takeValues}
        isSubmitDisabled={isFormInvalid}
      />
    </div>
  );
};

export default memo(ShortcutForm);
