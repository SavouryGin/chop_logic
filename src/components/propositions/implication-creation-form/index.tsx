import Form from 'components/controls/form';
import React, { useState } from 'react';
import TextInput from 'components/controls/text-input';
import constants from 'presets/propositions';
import { ButtonID, GreekSymbol, InputID, LogicalSymbolHexCode } from 'enums';
import { FormValues } from 'types';
import { closePropositionsPopup } from 'pages/propositions/elements/direct-proofs-editor/helpers';
import { formsTexts } from 'texts/propositions';
import { propositionsActions } from 'store/propositions/slice';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppDispatch, useAppSelector } from 'hooks';
import './styles.scss';

const ImplicationCreationForm = () => {
  const dispatch = useAppDispatch();
  const [values, setValues] = useState(constants.implicationCreationInitialValues);
  const isDisabled = values.firstVariable.length === 0 || values.secondVariable.length === 0;
  const language = useAppSelector(settingsSelectors.getLanguage);

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
    </>
  );

  return (
    <div className='implication-creation-form'>
      <p>{formsTexts.implicationCreation[language]}</p>
      <p className='implication-creation-form__formula'>{`${GreekSymbol.Phi} ${LogicalSymbolHexCode.Implication} ( ${GreekSymbol.Psi} ${LogicalSymbolHexCode.Implication} ${GreekSymbol.Phi} )`}</p>
      <Form
        onSubmit={onSubmit}
        initialValues={constants.implicationCreationInitialValues}
        inputs={content}
        submitButtonId={ButtonID.ApplySettings}
        passValues={takeValues}
        isSubmitDisabled={isDisabled}
      />
    </div>
  );
};

export default ImplicationCreationForm;
