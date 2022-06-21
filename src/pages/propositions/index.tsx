import DefinitionsOfPropositions from './elements/definitions-of-propositions';
import DirectProofsEditor from './elements/direct-proofs-editor';
import HeuristicsOfPropositions from './elements/heuristics-of-propositions';
import NaturalProofsEditor from './elements/natural-proofs-editor';
import React from 'react';
import RulesOfInference from './elements/rules-of-inference';
import TabList from 'components/tab-list';
import formatClassName from 'helpers/formatters/format-class-name';
import { Icon } from 'enums';
import { TabItem } from 'types';
import { settingsSelectors } from 'store/settings/selectors';
import { titles } from 'texts/propositions';
import { useAppSelector } from 'hooks';

import './styles.scss';

export const propositionsTabs: TabItem[] = [
  {
    tabContent: <DirectProofsEditor />,
    tabTitle: titles.direct,
    tabId: 'direct-proofs-editor',
  },
  {
    tabContent: <NaturalProofsEditor />,
    tabTitle: titles.natural,
    tabId: 'natural-proofs-editor',
  },
  {
    tabContent: <DefinitionsOfPropositions />,
    tabTitle: titles.definitions,
    tabId: 'definitions-of-propositions',
  },
  {
    tabContent: <HeuristicsOfPropositions />,
    tabTitle: titles.heuristics,
    tabId: 'heuristics-of-propositions',
  },
  {
    tabContent: <RulesOfInference />,
    tabTitle: titles.rules,
    tabId: 'rules-of-inference',
  },
];

function Propositions(): React.ReactElement {
  const language = useAppSelector(settingsSelectors.getLanguage);

  return (
    <article className='propositions'>
      <h2 className={formatClassName(['propositions__title', Icon.Propositions])}>{titles.page[language]}</h2>
      <TabList tabs={propositionsTabs} className='propositions__tabs' />
    </article>
  );
}

export default Propositions;
