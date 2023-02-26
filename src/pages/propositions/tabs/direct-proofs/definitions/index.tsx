import DPDefinitionsEn from 'texts/propositions/en/dp-definitions-en';
import DPDefinitionsRu from 'texts/propositions/ru/dp-definitions-ru';
import React from 'react';
import formatClass from 'helpers/formatters/format-class-name';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppSelector } from 'hooks';
import './styles.scss';

const DirectProofsPropositionDefinitions = (): React.ReactElement => {
  const language = useAppSelector(settingsSelectors.getLanguage);
  const isDarkMode = useAppSelector(settingsSelectors.getIsDarkMode);
  const className = formatClass(['direct-proofs-definitions', { 'direct-proofs-definitions__dark': isDarkMode }]);

  switch (language) {
    case 'ru': {
      return <DPDefinitionsRu className={className} />;
    }
    default: {
      return <DPDefinitionsEn className={className} />;
    }
  }
};

export default DirectProofsPropositionDefinitions;
