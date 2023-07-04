import DPAxiomsEn from 'assets/texts/propositions/en/dp-axioms-en';
import DPAxiomsRu from 'assets/texts/propositions/ru/dp-axioms-ru';
import React from 'react';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppSelector } from 'hooks';

const AxiomSchemesForDirectPropositionProofs = (): React.ReactElement | null => {
  const language = useAppSelector(settingsSelectors.language);

  switch (language) {
    case 'ru': {
      return <DPAxiomsRu />;
    }
    case 'en': {
      return <DPAxiomsEn />;
    }
    default:
      return null;
  }
};

export default AxiomSchemesForDirectPropositionProofs;
