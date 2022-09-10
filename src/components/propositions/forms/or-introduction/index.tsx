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

const OrIntroductionForm = () => {
  const dispatch = useAppDispatch();
  const orIntroInitialValue = { orValue: '' };
  const [formValue, setFormValue] = useState(orIntroInitialValue);
  const language = useAppSelector(settingsSelectors.getLanguage);

  const preview = usePropositionalFormulaPreview(formValue.orValue);
  const hasError = !Array.isArray(preview);
  const isFormInvalid = hasError || !formValue.orValue;
  const formContent = (
    <>
      <p>{uiElementTexts.orIntroductionInfo[language]}</p>
      <TextInput name='orValue' inputId={InputID.Premise} className='or-introduction-form__input' isRequired />
      <FormulaPreview preview={preview} />
    </>
  );

  const takeValues = (values: FormValues) => setFormValue(values as typeof orIntroInitialValue);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(actions.createDisjunction(formValue.orValue));
    closeNaturalProofsPopup(dispatch, 'isOrIntroductionFormOpened');
  };

  return (
    <div className='or-introduction-form'>
      <Form
        onSubmit={onSubmit}
        initialValues={orIntroInitialValue}
        inputs={formContent}
        submitButtonId={ButtonID.Apply}
        passValues={takeValues}
        isSubmitDisabled={isFormInvalid}
      />
    </div>
  );
};

export default memo(OrIntroductionForm);
