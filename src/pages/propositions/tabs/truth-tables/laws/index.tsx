import PropositionLawsEn from 'utils/texts/propositions/en/laws';
import PropositionLawsRu from 'utils/texts/propositions/ru/laws';
import React from 'react';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppSelector } from 'hooks';

const TruthTablesLaws = (): React.ReactElement | null => {
  const language = useAppSelector(settingsSelectors.language);

  switch (language) {
    case 'ru': {
      return <PropositionLawsRu />;
    }
    case 'en': {
      return <PropositionLawsEn />;
    }
    default:
      return null;
  }
};

export default TruthTablesLaws;
