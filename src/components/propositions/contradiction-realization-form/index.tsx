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
    dispatch(propositionsActions.createContradictionRealization({ ...values }));
    closePropositionsPopup(dispatch, 'isContradictionRealizationOpened');
  };

  const takeValues = (input: FormValues) => setValues(input as typeof constants.contradictionRealization);

  const tooltip = <Tooltip text={tooltipTexts.inputTooltip[language]} icon={Icon.Info}></Tooltip>;

  return (
    <div className='contradiction-realization-form'>
      <p>
        {formsTexts.enterValues[language]} {tooltip}
      </p>
      <p className='contradiction-realization-form__formula'>{constants.contradictionRealizationFormula}</p>
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

export default memo(ContradictionRealizationForm);
