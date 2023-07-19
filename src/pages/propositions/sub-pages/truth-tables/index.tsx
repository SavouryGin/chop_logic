import React from 'react';
import TabList from 'components/tab-list';
import formatClass from 'utils/formatters/format-class-name';
import texts from 'utils/texts/propositions/elements';
import { Icon } from 'enums';
import { TRUTH_TABLES_TABS } from 'pages/propositions/constants';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppSelector } from 'hooks';
import './styles.scss';

const TruthTables = (): React.ReactElement => {
  const language = useAppSelector(settingsSelectors.language);

  const toolBar = (
    <>
      <h2
        className={formatClass(['truth-tables__title', Icon.Propositions])}
      >{`${texts.page[language]} > ${texts.truthTables[language]}`}</h2>
    </>
  );

  return (
    <article className='truth-tables'>
      <TabList tabs={TRUTH_TABLES_TABS} className='truth-tables__tabs' toolBar={toolBar} />
    </article>
  );
};

export default TruthTables;
