import Form from 'components/controls/form';
import FormulaPreview from 'components/controls/formula-preview';
import React, { memo, useState } from 'react';
import TextInput from 'components/controls/text-input';
import { ButtonID, InputID } from 'enums';
import { FormValues } from 'types';
import { propositionsNPActions as actions } from 'store/propositions/natural-proofs/slice';
import { closeNaturalProofsPopup } from 'pages/propositions/helpers';
import { settingsSelectors } from 'store/settings/selectors';
import { uiElementTexts } from 'texts';
import { useAppDispatch, useAppSelector, usePropositionalFormulaPreview } from 'hooks';
import './styles.scss';

const AndIntroductionForm = () => {
  const dispatch = useAppDispatch();
  const andIntroInitialValue = { andValue: '' };
  const [formValue, setFormValue] = useState(andIntroInitialValue);
  const language = useAppSelector(settingsSelectors.getLanguage);

  const preview = usePropositionalFormulaPreview(formValue.andValue);
  const hasError = !Array.isArray(preview);
  const isFormInvalid = hasError || !formValue.andValue;
  const formContent = (
    <>
      <p>{uiElementTexts.andIntroductionInfo[language]}</p>
      <TextInput name='andValue' inputId={InputID.Premise} className='and-introduction-form__input' isRequired />
      <FormulaPreview preview={preview} />
    </>
  );

  const takeValues = (values: FormValues) => setFormValue(values as typeof andIntroInitialValue);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(actions.createDisjunction(formValue.andValue));
    closeNaturalProofsPopup(dispatch, 'isOrIntroductionFormOpened');
  };

  return (
    <div className='and-introduction-form'>
      <Form
        onSubmit={onSubmit}
        initialValues={andIntroInitialValue}
        inputs={formContent}
        submitButtonId={ButtonID.Apply}
        passValues={takeValues}
        isSubmitDisabled={isFormInvalid}
      />
    </div>
  );
};

export default memo(AndIntroductionForm);
