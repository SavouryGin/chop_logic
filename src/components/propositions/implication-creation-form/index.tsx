import Form from 'components/controls/form';
import FormulaPreview from 'components/controls/formula-preview';
import React, { useState } from 'react';
import TextInput from 'components/controls/text-input';
import converter from 'logic/propositions/converter';
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
  const implicationCreationInitialValues = { firstVariable: '', secondVariable: '' };
  const [formValue, setFormValue] = useState(implicationCreationInitialValues);
  const isDisabled = formValue.firstVariable.length === 0 || formValue.secondVariable.length === 0;
  const language = useAppSelector(settingsSelectors.getLanguage);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(propositionsActions.createImplication({ ...formValue }));
    closePropositionsPopup(dispatch, 'isImplicationCreationOpened');
  };

  const takeValues = (values: FormValues) => setFormValue(values as typeof implicationCreationInitialValues);

  const content = (
    <>
      <TextInput name='firstVariable' inputId={InputID.FirstMetaVariable} className='implication-creation-form__input' />
      <TextInput name='secondVariable' inputId={InputID.SecondMetaVariable} className='implication-creation-form__input' />
      <FormulaPreview text={converter.convertToICExpression(formValue.firstVariable, formValue.secondVariable)} />
    </>
  );

  return (
    <div className='implication-creation-form'>
      <p>{formsTexts.implicationCreation[language]}</p>
      <p className='implication-creation-form__formula'>{`${GreekSymbol.Phi} ${LogicalSymbolHexCode.Implication} ( ${GreekSymbol.Psi} ${LogicalSymbolHexCode.Implication} ${GreekSymbol.Phi} )`}</p>
      <Form
        onSubmit={onSubmit}
        initialValues={implicationCreationInitialValues}
        inputs={content}
        submitButtonId={ButtonID.ApplySettings}
        passValues={takeValues}
        isSubmitDisabled={isDisabled}
      />
    </div>
  );
};

export default ImplicationCreationForm;
