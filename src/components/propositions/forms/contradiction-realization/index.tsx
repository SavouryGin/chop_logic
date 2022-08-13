import Form from 'components/controls/form';
import FormulaPreview from 'components/controls/formula-preview';
import React, { memo, useState } from 'react';
import TextInput from 'components/controls/text-input';
import constants from 'presets/propositions';
import { ButtonID, InputID } from 'enums';
import { FormValues } from 'types';
import { propositionsDirectProofsActions as actions } from 'store/propositions/direct-proofs/slice';
import { closePropositionsPopup } from 'pages/propositions/elements/direct-proofs-editor/helpers';
import { formsTexts } from 'texts';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppDispatch, useAppSelector, useContradictionRealizationPreview } from 'hooks';
import './styles.scss';

const ContradictionRealizationForm = () => {
  const dispatch = useAppDispatch();
  const [values, setValues] = useState(constants.contradictionRealization);
  const language = useAppSelector(settingsSelectors.getLanguage);
  const preview = useContradictionRealizationPreview(values.firstVariable, values.secondVariable);

  const hasError = !Array.isArray(preview);
  const isEmpty = !values.firstVariable || !values.secondVariable;
  const isFormInvalid = hasError || isEmpty;
  const formContent = (
    <>
      <TextInput name='firstVariable' inputId={InputID.FirstMetaVariable} className='implication-creation-form__input' />
      <TextInput name='secondVariable' inputId={InputID.SecondMetaVariable} className='implication-creation-form__input' />
      <FormulaPreview preview={preview} />
    </>
  );

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(actions.createContradictionRealization({ ...values }));
    closePropositionsPopup(dispatch, 'isContradictionRealizationOpened');
  };

  const takeValues = (input: FormValues) => setValues(input as typeof constants.contradictionRealization);

  return (
    <div className='contradiction-realization-form'>
      <p>{formsTexts.enterValues[language]}</p>
      <p className='contradiction-realization-form__formula'>{constants.contradictionRealizationFormula}</p>
      <Form
        onSubmit={onSubmit}
        initialValues={constants.implicationCreationInitialValues}
        inputs={formContent}
        submitButtonId={ButtonID.Apply}
        passValues={takeValues}
        isSubmitDisabled={isFormInvalid}
      />
    </div>
  );
};

export default memo(ContradictionRealizationForm);
