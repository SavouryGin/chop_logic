import PropositionsToolbar from 'pages/propositions/toolbar';
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

  const toolBar = (
    <>
      <h2
        className={formatClass(['propositions-natural-proofs__title', Icon.Propositions])}
      >{`${texts.page[language]} > ${texts.natural[language]}`}</h2>
      <PropositionsToolbar mode='direct' />
    </>
  );

  return (
    <article className='propositions-natural-proofs'>
      <TabList tabs={propositionsNaturalProofsTabs} className='propositions-natural-proofs__tabs' toolBar={toolBar} />
    </article>
  );
};

export default PropositionsNaturalProofs;
