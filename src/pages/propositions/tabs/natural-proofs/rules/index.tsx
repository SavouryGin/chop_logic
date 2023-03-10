import NPRulesEn from 'texts/propositions/en/np-rules-en';
import NPRulesRu from 'texts/propositions/ru/np-rules-ru';
import React from 'react';
import formatClass from 'helpers/formatters/format-class-name';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppSelector } from 'hooks';
import './styles.scss';

const RulesOfInference = (): React.ReactElement => {
  const language = useAppSelector(settingsSelectors.getLanguage);
  const isDarkMode = useAppSelector(settingsSelectors.getIsDarkMode);
  const className = formatClass(['natural-proofs-rules', { 'natural-proofs-rules__dark': isDarkMode }]);

  switch (language) {
    case 'ru': {
      return <NPRulesRu className={className} />;
    }
    default: {
      return <NPRulesEn className={className} />;
    }
  }
};

export default RulesOfInference;
