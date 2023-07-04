import Form from 'components/controls/form';
import FormulaPreview from 'components/controls/formula-preview';
import React, { memo, useState } from 'react';
import TextInput from 'components/controls/text-input';
import constants from 'pages/propositions/constants';
import propositionsTexts from 'assets/texts/propositions/elements';
import { FormValues } from 'types';
import { InputID } from 'enums';
import { dpActions as actions } from 'store/propositions/direct-proofs';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppDispatch, useAppSelector, useContradictionRealizationPreview } from 'hooks';
import './styles.scss';

const ContradictionRealizationForm = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const [values, setValues] = useState(constants.contradictionRealization);
  const language = useAppSelector(settingsSelectors.language);
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

  const onSubmit = () => {
    dispatch(actions.createContradictionRealization({ ...values }));
    dispatch(actions.setUpFlag({ flag: 'isContradictionRealizationOpened', value: false }));
  };

  const takeValues = (input: FormValues) => setValues(input as typeof constants.contradictionRealization);

  return (
    <div className='contradiction-realization-form'>
      <p>{propositionsTexts.enterValues[language]}</p>
      <p className='contradiction-realization-form__formula'>{constants.contradictionRealizationFormula}</p>
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

export default memo(ContradictionRealizationForm);
