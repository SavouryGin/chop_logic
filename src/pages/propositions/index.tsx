import React from 'react';
import TabList from 'components/tab-list';
import formatClassName from 'helpers/formatters/format-class-name';
import DirectProofsEditor from './elements/direct-proofs-editor';
import NaturalProofsEditor from './elements/natural-proofs-editor';
import DefinitionsOfPropositions from './elements/definitions-of-propositions';
import HeuristicsOfPropositions from './elements/heuristics-of-propositions';
import RulesOfInference from './elements/rules-of-inference';
import { TabItem } from 'types';
import { Icon } from 'enums';
import { pageTitle, tabTitles } from 'assets/texts/propositions';
import { useAppSelector } from 'hooks';
import { settingsSelectors } from 'store/settings/selectors';

import './styles.scss';

function Propositions(): React.ReactElement {
  const language = useAppSelector(settingsSelectors.getLanguage);

  const tabs: TabItem[] = [
    {
      tabContent: <DirectProofsEditor />,
      tabTitle: tabTitles.direct,
      tabId: 'direct-proofs-editor',
    },
    {
      tabContent: <NaturalProofsEditor />,
      tabTitle: tabTitles.natural,
      tabId: 'natural-proofs-editor',
    },
    {
      tabContent: <DefinitionsOfPropositions />,
      tabTitle: tabTitles.definitions,
      tabId: 'definitions-of-propositions',
    },
    {
      tabContent: <HeuristicsOfPropositions />,
      tabTitle: tabTitles.heuristics,
      tabId: 'heuristics-of-propositions',
    },
    {
      tabContent: <RulesOfInference />,
      tabTitle: tabTitles.rules,
      tabId: 'rules-of-inference',
    },
  ];

  return (
    <article className='propositions'>
      <h2 className={formatClassName(['propositions__title', Icon.Propositions])}>{pageTitle[language]}</h2>
      <TabList tabs={tabs} className='propositions__tabs' />
    </article>
  );
}

export default Propositions;
