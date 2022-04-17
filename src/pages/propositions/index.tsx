import React from 'react';
import TabList from 'components/tab-list';
import DirectProofsEditor from './elements/direct-proofs-editor';
import NaturalProofsEditor from './elements/natural-proofs-editor';
import DefinitionsOfPropositionalLogic from './elements/definitions-of-propositional-logic';
import HeuristicsOfPropositionalLogic from './elements/heuristics-of-propositional-logic';
import RulesOfInference from './elements/rules-of-inference';
import { TabItem } from 'types';

import './styles.scss';

function Propositions(): React.ReactElement {
  const tabs: TabItem[] = [
    {
      tabContent: <DirectProofsEditor />,
      tabTitle: { en: 'Direct Proofs', ru: 'Прямые доказательства' },
      tabId: 'direct-proofs-editor',
    },
    {
      tabContent: <NaturalProofsEditor />,
      tabTitle: { en: 'Natural Proofs', ru: 'Структурные доказательства' },
      tabId: 'natural-proofs-editor',
    },
    {
      tabContent: <DefinitionsOfPropositionalLogic />,
      tabTitle: { en: 'Definitions', ru: 'Определения' },
      tabId: 'definitions-of-propositional-logic',
    },
    {
      tabContent: <HeuristicsOfPropositionalLogic />,
      tabTitle: { en: 'Heuristics', ru: 'Эвристики' },
      tabId: 'heuristics-of-propositional-logic',
    },
    {
      tabContent: <RulesOfInference />,
      tabTitle: { en: 'Rules', ru: 'Правила' },
      tabId: 'rules-of-inference',
    },
  ];

  return (
    <div className='propositions'>
      <TabList tabs={tabs} />
    </div>
  );
}

export default Propositions;
