import DPDefinitionsEn from 'texts/propositions/en/dp-definitions-en';
import DPDefinitionsRu from 'texts/propositions/ru/dp-definitions-ru';
import React from 'react';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppSelector } from 'hooks';
import './styles.scss';

const DirectProofsPropositionDefinitions = (): React.ReactElement => {
  const language = useAppSelector(settingsSelectors.getLanguage);

  switch (language) {
    case 'ru': {
      return <DPDefinitionsRu />;
    }
    default: {
      return <DPDefinitionsEn />;
    }
  }
};

export default DirectProofsPropositionDefinitions;
