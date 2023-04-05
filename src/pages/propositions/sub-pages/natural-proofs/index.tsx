import React from 'react';
import TabList from 'components/tab-list';
import formatClass from 'helpers/formatters/format-class-name';
import texts from 'texts/propositions/elements';
import { Icon } from 'enums';
import { propositionsNaturalProofsTabs } from 'pages/propositions/constants';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppSelector } from 'hooks';
import './styles.scss';

const PropositionsNaturalProofs = (): React.ReactElement => {
  const language = useAppSelector(settingsSelectors.language);

  return (
    <article className='propositions-natural-proofs'>
      <h2
        className={formatClass(['propositions-natural-proofs__title', Icon.Propositions])}
      >{`${texts.page[language]} > ${texts.natural[language]}`}</h2>
      <TabList tabs={propositionsNaturalProofsTabs} className='propositions-natural-proofs__tabs' />
    </article>
  );
};

export default PropositionsNaturalProofs;
