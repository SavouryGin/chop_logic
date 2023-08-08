import React from 'react';
import TTDefinitionsEn from 'utils/texts/propositions/en/tt-definitions';
import TTDefinitionsRu from 'utils/texts/propositions/ru/tt-definitions';
import formatClass from 'utils/formatters/format-class-name';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppSelector } from 'hooks';
import './styles.scss';

const TruthTablesDefinitions = (): React.ReactElement | null => {
  const language = useAppSelector(settingsSelectors.language);
  const isDarkMode = useAppSelector(settingsSelectors.isDarkMode);
  const className = formatClass(['truth-tables-definitions', { 'truth-tables-definitions__dark': isDarkMode }]);

  switch (language) {
    case 'ru': {
      return <TTDefinitionsRu className={className} />;
    }
    case 'en': {
      return <TTDefinitionsEn className={className} />;
    }
    default:
      return null;
  }
};

export default TruthTablesDefinitions;
