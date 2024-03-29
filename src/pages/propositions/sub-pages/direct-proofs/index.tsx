import Button from 'components/controls/button';
import PropositionsToolbar from 'pages/propositions/toolbar';
import React from 'react';
import TabList from 'components/tab-list';
import formatClass from 'utils/formatters/format-class-name';
import texts from 'utils/texts/propositions/elements';
import { ButtonID, Icon } from 'enums';
import { DP_PROOFS_TABS } from 'pages/propositions/constants';
import { dpActions } from 'store/propositions/direct-proofs';
import { dpSelectors } from 'store/propositions/direct-proofs/selectors';
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
      <TabList tabs={DP_PROOFS_TABS} className='propositions-direct-proofs__tabs' toolBar={toolBar} />
    </article>
  );
};

export default PropositionsDirectProofs;
