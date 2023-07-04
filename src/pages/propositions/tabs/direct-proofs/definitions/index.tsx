import DPDefinitionsEn from 'assets/texts/propositions/en/dp-definitions-en';
import DPDefinitionsRu from 'assets/texts/propositions/ru/dp-definitions-ru';
import React from 'react';
import formatClass from 'utils/formatters/format-class-name';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppSelector } from 'hooks';
import './styles.scss';

const DirectProofsPropositionDefinitions = (): React.ReactElement | null => {
  const language = useAppSelector(settingsSelectors.language);
  const isDarkMode = useAppSelector(settingsSelectors.isDarkMode);
  const className = formatClass(['direct-proofs-definitions', { 'direct-proofs-definitions__dark': isDarkMode }]);

  switch (language) {
    case 'ru': {
      return <DPDefinitionsRu className={className} />;
    }
    case 'en': {
      return <DPDefinitionsEn className={className} />;
    }
    default:
      return null;
  }
};

export default DirectProofsPropositionDefinitions;
