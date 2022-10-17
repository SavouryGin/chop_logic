import React from 'react';
import TabList from 'components/tab-list';
import formatClassName from 'helpers/formatters/format-class-name';
import { Icon } from 'enums';
import { propositionsDirectProofsTabs } from 'pages/propositions/constants';
import { settingsSelectors } from 'store/settings/selectors';
import { titles } from 'texts/propositions';
import { useAppSelector } from 'hooks';
import './styles.scss';

const PropositionsDirectProofs = () => {
  const language = useAppSelector(settingsSelectors.getLanguage);

  return (
    <article className='propositions-direct-proofs'>
      <h2 className={formatClassName(['propositions-direct-proofs__title', Icon.Propositions])}>{titles.page[language]}</h2>
      <TabList tabs={propositionsDirectProofsTabs} className='propositions-direct-proofs__tabs' />
    </article>
  );
};

export default PropositionsDirectProofs;
