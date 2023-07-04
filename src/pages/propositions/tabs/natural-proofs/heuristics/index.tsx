import NPHeuristicsEn from 'assets/texts/propositions/en/np-heuristics-en';
import NPHeuristicsRu from 'assets/texts/propositions/ru/np-heuristics-ru';
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
