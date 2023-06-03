import Button from 'components/controls/button';
import PropositionsToolbar from 'pages/propositions/toolbar';
import React from 'react';
import TabList from 'components/tab-list';
import formatClass from 'helpers/formatters/format-class-name';
import texts from 'texts/propositions/elements';
import { ButtonID, Icon } from 'enums';
import { dpActions } from 'store/propositions/direct-proofs';
import { dpSelectors } from 'store/propositions/direct-proofs/selectors';
import { propositionsDirectProofsTabs } from 'pages/propositions/constants';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppDispatch, useAppSelector } from 'hooks';
import './styles.scss';

const PropositionsDirectProofs = (): React.ReactElement => {
  const language = useAppSelector(settingsSelectors.language);
  const isToolbarOpened = useAppSelector(dpSelectors.isToolbarOpened);
  const dispatch = useAppDispatch();

  const toggleToolbar = () => {
    dispatch(dpActions.setUpFlag({ flag: 'isToolbarOpened', value: !isToolbarOpened }));
  };

  const toolBar = (
    <>
      <h2
        className={formatClass(['propositions-direct-proofs__title', Icon.Propositions])}
      >{`${texts.page[language]} > ${texts.direct[language]}`}</h2>
      <Button buttonId={ButtonID.Tools} icon={isToolbarOpened ? Icon.Up : Icon.Sidebar} onClick={toggleToolbar} />
      <PropositionsToolbar mode='direct' isVisible={isToolbarOpened} />
    </>
  );

  return (
    <article className='propositions-direct-proofs'>
      <TabList tabs={propositionsDirectProofsTabs} className='propositions-direct-proofs__tabs' toolBar={toolBar} />
    </article>
  );
};

export default PropositionsDirectProofs;
