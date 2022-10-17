import Form from 'components/controls/form';
import FormulaPreview from 'components/controls/formula-preview';
import React, { memo, useState } from 'react';
import TextInput from 'components/controls/text-input';
import constants from 'pages/propositions/constants';
import { ButtonID, InputID } from 'enums';
import { FormValues } from 'types';
import { propositionsDPActions as actions } from 'store/propositions/direct-proofs/slice';
import { closeDirectProofsPopup } from 'pages/propositions/helpers';
import { formsTexts } from 'texts';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppDispatch, useAppSelector, useImplicationDistributionPreview } from 'hooks';
import './styles.scss';

const ImplicationDistributionForm = () => {
  const dispatch = useAppDispatch();
  const [values, setValues] = useState(constants.implicationDistributionInitialValues);
  const language = useAppSelector(settingsSelectors.getLanguage);
  const preview = useImplicationDistributionPreview(values.firstVariable, values.secondVariable, values.thirdVariable);

  const hasError = !Array.isArray(preview);
  const isEmpty = !values.firstVariable || !values.secondVariable || !values.thirdVariable;
  const isFormInvalid = hasError || isEmpty;
  const formContent = (
    <>
      <TextInput name='firstVariable' inputId={InputID.FirstMetaVariable} className='implication-distribution-form__input' />
      <TextInput name='secondVariable' inputId={InputID.SecondMetaVariable} className='implication-distribution-form__input' />
      <TextInput name='thirdVariable' inputId={InputID.ThirdMetaVariable} className='implication-distribution-form__input' />
      <FormulaPreview preview={preview} />
    </>
  );

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(actions.createImplicationDistribution({ ...values }));
    closeDirectProofsPopup(dispatch, 'isImplicationDistributionOpened');
  };

  const takeValues = (input: FormValues) => setValues(input as typeof constants.implicationDistributionInitialValues);

  return (
    <div className='implication-distribution-form'>
      <p>{formsTexts.enterValues[language]}</p>
      <p className='implication-distribution-form__formula'>{constants.implicationDistributionFormula}</p>
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

export default memo(ImplicationDistributionForm);
