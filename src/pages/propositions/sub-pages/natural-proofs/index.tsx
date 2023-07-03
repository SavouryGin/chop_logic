import Button from 'components/controls/button';
import PropositionsToolbar from 'pages/propositions/toolbar';
import React from 'react';
import TabList from 'components/tab-list';
import formatClass from 'utils/formatters/format-class-name';
import texts from 'texts/propositions/elements';
import { ButtonID, Icon } from 'enums';
import { npActions } from 'store/propositions/natural-proofs';
import { npSelectors } from 'store/propositions/natural-proofs/selectors';
import { propositionsNaturalProofsTabs } from 'pages/propositions/constants';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppDispatch, useAppSelector } from 'hooks';
import './styles.scss';

const PropositionsNaturalProofs = (): React.ReactElement => {
  const language = useAppSelector(settingsSelectors.language);
  const isToolbarOpened = useAppSelector(npSelectors.isToolbarOpened);
  const dispatch = useAppDispatch();

  const toggleToolbar = () => {
    dispatch(npActions.setUpFlag({ flag: 'isToolbarOpened', value: !isToolbarOpened }));
  };

  const toolBar = (
    <>
      <h2
        className={formatClass(['propositions-natural-proofs__title', Icon.Propositions])}
      >{`${texts.page[language]} > ${texts.natural[language]}`}</h2>
      <Button buttonId={ButtonID.Tools} icon={isToolbarOpened ? Icon.Up : Icon.Sidebar} onClick={toggleToolbar} />
      <PropositionsToolbar mode='natural' isVisible={isToolbarOpened} />
    </>
  );

  return (
    <article className='propositions-natural-proofs'>
      <TabList tabs={propositionsNaturalProofsTabs} className='propositions-natural-proofs__tabs' toolBar={toolBar} />
    </article>
  );
};

export default PropositionsNaturalProofs;
