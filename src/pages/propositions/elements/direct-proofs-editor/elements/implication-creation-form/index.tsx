import React, { useState } from 'react';
import Form from 'components/form';
import { FormValues } from 'types';
import { ButtonID, GreekSymbol, InputID, LogicalSymbol } from 'enums';
import { propositionsActions } from 'store/propositions/slice';
import { formsTexts } from 'assets/texts/propositions';
import { useAppDispatch, useAppSelector } from 'hooks';
import TextInput from 'components/inputs/text-input';
import { settingsSelectors } from 'store/settings/selectors';
import { closePropositionsPopup } from 'pages/propositions/elements/direct-proofs-editor/helpers';

function ImplicationCreationForm(): React.ReactElement {
  const dispatch = useAppDispatch();
  const implicationCreationInitialValues = { firstVariable: '', secondVariable: '' };
  const [formValue, setFormValue] = useState(implicationCreationInitialValues);
  const isDisabled = formValue.firstVariable.length === 0 || formValue.secondVariable.length === 0;
  const language = useAppSelector(settingsSelectors.getLanguage);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Dispatch the formula to the store
    dispatch(propositionsActions.createImplication({ ...formValue }));
    // Close the modal window
    closePropositionsPopup(dispatch, 'isImplicationCreationOpened');
  };

  const takeValues = (values: FormValues) => setFormValue(values as typeof implicationCreationInitialValues);

  const inputs = (
    <>
      <TextInput name='firstVariable' inputId={InputID.FirstMetaVariable} />
      <TextInput name='secondVariable' inputId={InputID.SecondMetaVariable} />
    </>
  );

  return (
    <>
      <p>{formsTexts.implicationCreation[language]}</p>
      <p>{`${GreekSymbol.Phi} ${LogicalSymbol.Implication} ( ${GreekSymbol.Psi} ${LogicalSymbol.Implication} ${GreekSymbol.Phi} )`}</p>
      <Form
        onSubmit={onSubmit}
        initialValues={implicationCreationInitialValues}
        inputs={inputs}
        submitButtonId={ButtonID.ApplySettings}
        passValues={takeValues}
        isSubmitDisabled={isDisabled}
      />
    </>
  );
}

export default ImplicationCreationForm;
