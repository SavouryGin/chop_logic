import DPAxiomsEn from 'texts/propositions/en/dp-axioms-en';
import DPAxiomsRu from 'texts/propositions/ru/dp-axioms-ru';
import React from 'react';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppSelector } from 'hooks';
import './styles.scss';

const AxiomSchemesForDirectPropositionProofs = (): React.ReactElement => {
  const language = useAppSelector(settingsSelectors.getLanguage);

  switch (language) {
    case 'ru': {
      return <DPAxiomsRu />;
    }
    default: {
      return <DPAxiomsEn />;
    }
  }
};

export default AxiomSchemesForDirectPropositionProofs;
