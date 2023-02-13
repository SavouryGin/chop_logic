import AxiomSchemesForDirectPropositionProofs from 'pages/propositions/tabs/direct-proofs/axiom-schemes';
import DirectProofsEditor from 'pages/propositions/tabs/direct-proofs/editor';
import DirectProofsPropositionDefinitions from 'pages/propositions/tabs/direct-proofs/definitions';
import HeuristicsOfPropositions from 'pages/propositions/tabs/natural-proofs/heuristics';
import NaturalProofsEditor from 'pages/propositions/tabs/natural-proofs/editor';
import NaturalProofsPropositionDefinitions from 'pages/propositions/tabs/natural-proofs/definitions';
import React from 'react';
import RulesOfInference from 'pages/propositions/tabs/natural-proofs/rules';
import texts from 'texts/propositions/elements';
import { TabItem } from 'types';

export const propositionsDirectProofsTabs: TabItem[] = [
  {
    tabContent: <DirectProofsEditor />,
    tabTitle: texts.editor,
    tabId: 'direct-proofs-editor',
  },
  {
    tabContent: <DirectProofsPropositionDefinitions />,
    tabTitle: texts.definitions,
    tabId: 'direct-proofs-definitions',
  },
  {
    tabContent: <AxiomSchemesForDirectPropositionProofs />,
    tabTitle: texts.axioms,
    tabId: 'axiom-schemes-for-direct-proofs',
  },
];

export const propositionsNaturalProofsTabs: TabItem[] = [
  {
    tabContent: <NaturalProofsEditor />,
    tabTitle: texts.editor,
    tabId: 'natural-proofs-editor',
  },
  {
    tabContent: <NaturalProofsPropositionDefinitions />,
    tabTitle: texts.definitions,
    tabId: 'natural-proofs-definitions',
  },
  {
    tabContent: <RulesOfInference />,
    tabTitle: texts.rules,
    tabId: 'rules-of-inference',
  },
  {
    tabContent: <HeuristicsOfPropositions />,
    tabTitle: texts.heuristics,
    tabId: 'heuristics-of-propositions',
  },
];
