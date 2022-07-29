import Form from 'components/controls/form';
import FormulaPreview from 'components/controls/formula-preview';
import React, { memo, useState } from 'react';
import TextInput from 'components/controls/text-input';
import Tooltip from 'components/tooltip';
import constants from 'presets/propositions';
import { ButtonID, Icon, InputID } from 'enums';
import { FormValues } from 'types';
import { closePropositionsPopup } from 'pages/propositions/elements/direct-proofs-editor/helpers';
import { formsTexts, tooltipTexts } from 'texts';
import { propositionsActions } from 'store/propositions/slice';
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
    dispatch(propositionsActions.createImplicationDistribution({ ...values }));
    closePropositionsPopup(dispatch, 'isImplicationDistributionOpened');
  };

  const takeValues = (input: FormValues) => setValues(input as typeof constants.implicationDistributionInitialValues);

  const tooltip = <Tooltip text={tooltipTexts.inputTooltip[language]} icon={Icon.Info}></Tooltip>;

  return (
    <div className='implication-distribution-form'>
      <p>
        {formsTexts.enterValues[language]} {tooltip}
      </p>
      <p className='implication-distribution-form__formula'>{constants.implicationDistributionFormula}</p>
      <Form
        onSubmit={onSubmit}
        initialValues={constants.implicationCreationInitialValues}
        inputs={formContent}
        submitButtonId={ButtonID.ApplySettings}
        passValues={takeValues}
        isSubmitDisabled={isFormInvalid}
      />
    </div>
  );
};

export default memo(ImplicationDistributionForm);
