import React from 'react';
import TabList from 'components/tab-list';
import formatClass from 'helpers/formatters/format-class-name';
import texts from 'texts/propositions/elements';
import { Icon } from 'enums';
import { propositionsDirectProofsTabs } from 'pages/propositions/constants';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppSelector } from 'hooks';
import './styles.scss';

const PropositionsDirectProofs = (): React.ReactElement => {
  const language = useAppSelector(settingsSelectors.getLanguage);

  return (
    <article className='propositions-direct-proofs'>
      <h2
        className={formatClass(['propositions-direct-proofs__title', Icon.Propositions])}
      >{`${texts.page[language]} > ${texts.direct[language]}`}</h2>
      <TabList tabs={propositionsDirectProofsTabs} className='propositions-direct-proofs__tabs' />
    </article>
  );
};

export default PropositionsDirectProofs;
