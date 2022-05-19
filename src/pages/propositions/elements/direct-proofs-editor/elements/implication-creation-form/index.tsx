import React, { useState } from 'react';
import Form from 'components/form';
import TextInput from 'components/inputs/text-input';
import FormulaPreview from 'components/formula-preview';
import factory from 'logic/propositions/factory';
import { FormValues } from 'types';
import { ButtonID, GreekSymbol, InputID, LogicalSymbol } from 'enums';
import { propositionsActions } from 'store/propositions/slice';
import { formsTexts } from 'assets/texts/propositions';
import { useAppDispatch, useAppSelector } from 'hooks';
import { settingsSelectors } from 'store/settings/selectors';
import { closePropositionsPopup } from 'pages/propositions/elements/direct-proofs-editor/helpers';
import './styles.scss';

function ImplicationCreationForm(): React.ReactElement {
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
      <FormulaPreview text={factory.createICExpression(formValue.firstVariable, formValue.secondVariable)} />
    </>
  );

  return (
    <div className='implication-creation-form'>
      <p>{formsTexts.implicationCreation[language]}</p>
      <p className='implication-creation-form__formula'>{`${GreekSymbol.Phi} ${LogicalSymbol.Implication} ( ${GreekSymbol.Psi} ${LogicalSymbol.Implication} ${GreekSymbol.Phi} )`}</p>
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
}

export default ImplicationCreationForm;
