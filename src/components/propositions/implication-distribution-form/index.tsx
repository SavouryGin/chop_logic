import Form from 'components/controls/form';
import FormulaPreview from 'components/controls/formula-preview';
import React, { useState } from 'react';
import TextInput from 'components/controls/text-input';
import constants from 'presets/propositions';
import { ButtonID, InputID } from 'enums';
import { FormValues } from 'types';
import { PropositionalError } from 'errors/propositional-error';
import { closePropositionsPopup } from 'pages/propositions/elements/direct-proofs-editor/helpers';
import { formsTexts } from 'texts';
import { propositionsActions } from 'store/propositions/slice';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppDispatch, useAppSelector } from 'hooks';
import './styles.scss';

const ImplicationDistributionForm = () => {
  const dispatch = useAppDispatch();
  const [values, setValues] = useState(constants.implicationDistributionInitialValues);
  const [formError, setFormError] = useState<PropositionalError | null>(null);
  const language = useAppSelector(settingsSelectors.getLanguage);

  const isFormEmpty = !values.firstVariable || !values.secondVariable || !values.thirdVariable;
  const isFormInvalid = !!formError || isFormEmpty;
  const previewString = isFormEmpty
    ? ''
    : `(${values.firstVariable} => (${values.secondVariable} => ${values.thirdVariable})) => ((${values.firstVariable} => ${values.secondVariable}) => (${values.firstVariable} => ${values.thirdVariable}))`;

  const takeError = (err: PropositionalError | null) => setFormError(err);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(propositionsActions.createImplication({ ...values }));
    closePropositionsPopup(dispatch, 'isImplicationCreationOpened');
  };

  const takeValues = (input: FormValues) => setValues(input as typeof constants.implicationDistributionInitialValues);

  const content = (
    <>
      <TextInput name='firstVariable' inputId={InputID.FirstMetaVariable} className='implication-distribution-form__input' />
      <TextInput name='secondVariable' inputId={InputID.SecondMetaVariable} className='implication-distribution-form__input' />
      <TextInput name='thirdVariable' inputId={InputID.ThirdMetaVariable} className='implication-distribution-form__input' />
      <FormulaPreview text={previewString} passError={takeError} />
    </>
  );

  return (
    <div className='implication-distribution-form'>
      <p>{formsTexts.enterValues[language]}</p>
      <p className='implication-distribution-form__formula'>{constants.implicationDistributionFormula}</p>
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

export default ImplicationDistributionForm;
