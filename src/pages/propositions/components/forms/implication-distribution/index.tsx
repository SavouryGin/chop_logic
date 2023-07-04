import Form from 'components/controls/form';
import FormulaPreview from 'components/controls/formula-preview';
import React, { memo, useState } from 'react';
import TextInput from 'components/controls/text-input';
import constants from 'pages/propositions/constants';
import propositionsElementsTexts from 'assets/texts/propositions/elements';
import { FormValues } from 'types';
import { InputID } from 'enums';
import { dpActions as actions } from 'store/propositions/direct-proofs';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppDispatch, useAppSelector, useImplicationDistributionPreview } from 'hooks';
import './styles.scss';

const ImplicationDistributionForm = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const [values, setValues] = useState(constants.implicationDistributionInitialValues);
  const language = useAppSelector(settingsSelectors.language);
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

  const onSubmit = () => {
    dispatch(actions.createImplicationDistribution({ ...values }));
    dispatch(actions.setUpFlag({ flag: 'isImplicationDistributionOpened', value: false }));
  };

  const takeValues = (input: FormValues) => setValues(input as typeof constants.implicationDistributionInitialValues);

  return (
    <div className='implication-distribution-form'>
      <p>{propositionsElementsTexts.enterValues[language]}</p>
      <p className='implication-distribution-form__formula'>{constants.implicationDistributionFormula}</p>
      <Form
        onSubmit={onSubmit}
        initialValues={constants.implicationCreationInitialValues}
        inputs={formContent}
        passValues={takeValues}
        isSubmitDisabled={isFormInvalid}
      />
    </div>
  );
};

export default memo(ImplicationDistributionForm);
