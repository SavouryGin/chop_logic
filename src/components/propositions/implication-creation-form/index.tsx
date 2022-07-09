import Form from 'components/controls/form';
import FormulaPreview from 'components/controls/formula-preview';
import React, { useState } from 'react';
import TextInput from 'components/controls/text-input';
import constants from 'presets/propositions';
import { ButtonID, InputID } from 'enums';
import { FormValues } from 'types';
import { closePropositionsPopup } from 'pages/propositions/elements/direct-proofs-editor/helpers';
import { formsTexts } from 'texts/propositions';
import { propositionsActions } from 'store/propositions/slice';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppDispatch, useAppSelector, useImplicationCreationPreview } from 'hooks';
import './styles.scss';

const ImplicationCreationForm = () => {
  const dispatch = useAppDispatch();
  const [values, setValues] = useState(constants.implicationCreationInitialValues);
  const language = useAppSelector(settingsSelectors.getLanguage);

  // const isFormEmpty = !values.firstVariable || !values.secondVariable;
  // const isFormInvalid = !!formError || isFormEmpty;
  // const previewString = isFormEmpty ? '' : `${values.firstVariable} => (${values.secondVariable} => ${values.firstVariable})`;
  const preview = useImplicationCreationPreview(values.firstVariable, values.secondVariable);
  const hasError = !Array.isArray(preview);
  const isEmpty = !values.firstVariable || !values.secondVariable;
  const isFormInvalid = hasError || isEmpty;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(propositionsActions.createImplication({ ...values }));
    closePropositionsPopup(dispatch, 'isImplicationCreationOpened');
  };

  const takeValues = (input: FormValues) => setValues(input as typeof constants.implicationCreationInitialValues);

  const content = (
    <>
      <TextInput name='firstVariable' inputId={InputID.FirstMetaVariable} className='implication-creation-form__input' />
      <TextInput name='secondVariable' inputId={InputID.SecondMetaVariable} className='implication-creation-form__input' />
      <FormulaPreview preview={preview} />
    </>
  );

  return (
    <div className='implication-creation-form'>
      <p>{formsTexts.enterValues[language]}</p>
      <p className='implication-creation-form__formula'>{constants.implicationCreationFormula}</p>
      <Form
        onSubmit={onSubmit}
        initialValues={constants.implicationCreationInitialValues}
        inputs={content}
        submitButtonId={ButtonID.ApplySettings}
        passValues={takeValues}
        isSubmitDisabled={isFormInvalid}
      />
    </div>
  );
};

export default ImplicationCreationForm;
