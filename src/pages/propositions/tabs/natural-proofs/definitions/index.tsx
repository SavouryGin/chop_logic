import NPDefinitionsEn from 'texts/propositions/en/np-definitions-en';
import NPDefinitionsRu from 'texts/propositions/ru/np-definitions-ru';
import React from 'react';
import formatClass from 'utils/formatters/format-class-name';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppSelector } from 'hooks';
import './styles.scss';

const DirectProofsPropositionDefinitions = (): React.ReactElement | null => {
  const language = useAppSelector(settingsSelectors.language);
  const isDarkMode = useAppSelector(settingsSelectors.isDarkMode);
  const className = formatClass(['natural-proofs-definitions', { 'natural-proofs-definitions__dark': isDarkMode }]);

  switch (language) {
    case 'ru': {
      return <NPDefinitionsRu className={className} />;
    }
    case 'en': {
      return <NPDefinitionsEn className={className} />;
    }
    default:
      return null;
  }
};

export default DirectProofsPropositionDefinitions;
