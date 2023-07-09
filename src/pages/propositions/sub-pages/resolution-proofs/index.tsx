import React from 'react';
import TabList from 'components/tab-list';
import formatClass from 'utils/formatters/format-class-name';
import texts from 'utils/texts/propositions/elements';
import { Icon } from 'enums';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppSelector } from 'hooks';
import './styles.scss';

const PropositionsResolutionProofs = (): React.ReactElement => {
  const language = useAppSelector(settingsSelectors.language);

  const toolBar = (
    <>
      <h2
        className={formatClass(['propositions-resolution-proofs__title', Icon.Propositions])}
      >{`${texts.page[language]} > ${texts.resolution[language]}`}</h2>
    </>
  );

  return (
    <article className='propositions-resolution-proofs'>
      <TabList tabs={[]} className='propositions-resolution-proofs__tabs' toolBar={toolBar} />
    </article>
  );
};

export default PropositionsResolutionProofs;
