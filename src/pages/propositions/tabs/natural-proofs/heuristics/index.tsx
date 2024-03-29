import NPHeuristicsEn from 'utils/texts/propositions/en/np-heuristics';
import NPHeuristicsRu from 'utils/texts/propositions/ru/np-heuristics';
import React from 'react';
import formatClass from 'utils/formatters/format-class-name';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppSelector } from 'hooks';
import './styles.scss';

const HeuristicsOfPropositions = (): React.ReactElement | null => {
  const language = useAppSelector(settingsSelectors.language);
  const isDarkMode = useAppSelector(settingsSelectors.isDarkMode);
  const className = formatClass(['natural-proofs-heuristics', { 'natural-proofs-heuristics__dark': isDarkMode }]);

  switch (language) {
    case 'ru': {
      return <NPHeuristicsRu className={className} />;
    }
    case 'en': {
      return <NPHeuristicsEn className={className} />;
    }
    default:
      return null;
  }
};

export default HeuristicsOfPropositions;
