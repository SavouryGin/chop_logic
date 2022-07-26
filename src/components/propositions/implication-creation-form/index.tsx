import Form from 'components/controls/form';
import FormulaPreview from 'components/controls/formula-preview';
import React, { memo, useState } from 'react';
import TextInput from 'components/controls/text-input';
import Tooltip from 'components/tooltip';
import constants from 'presets/propositions';
import { ButtonID, Icon, InputID } from 'enums';
import { FormValues } from 'types';
import { closePropositionsPopup } from 'pages/propositions/elements/direct-proofs-editor/helpers';
import { formsTexts, tooltipTexts } from 'texts/propositions';
import { propositionsActions } from 'store/propositions/slice';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppDispatch, useAppSelector, useImplicationCreationPreview } from 'hooks';
import './styles.scss';

const ImplicationCreationForm = () => {
  const dispatch = useAppDispatch();
  const [values, setValues] = useState(constants.implicationCreationInitialValues);
  const language = useAppSelector(settingsSelectors.getLanguage);
  const preview = useImplicationCreationPreview(values.firstVariable, values.secondVariable);

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
    dispatch(propositionsActions.createImplication({ ...values }));
    closePropositionsPopup(dispatch, 'isImplicationCreationOpened');
  };

  const takeValues = (input: FormValues) => setValues(input as typeof constants.implicationCreationInitialValues);

  const tooltip = (
    <Tooltip text={tooltipTexts.inputTooltip[language]}>
      <span role='img' aria-label='Hint' className={Icon.Down}></span>
    </Tooltip>
  );

  return (
    <div className='implication-creation-form'>
      <p>{formsTexts.enterValues[language]}</p>
      {tooltip}
      <p className='implication-creation-form__formula'>{constants.implicationCreationFormula}</p>
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

export default memo(ImplicationCreationForm);
