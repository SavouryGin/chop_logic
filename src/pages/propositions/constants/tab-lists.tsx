import AxiomSchemesForDirectPropositionProofs from 'pages/propositions/tabs/direct-proofs/axiom-schemes';
import DirectProofsEditor from 'pages/propositions/tabs/direct-proofs/editor';
import DirectProofsPropositionDefinitions from 'pages/propositions/tabs/direct-proofs/definitions';
import HeuristicsOfPropositions from 'pages/propositions/tabs/natural-proofs/heuristics';
import NaturalProofsEditor from 'pages/propositions/tabs/natural-proofs/editor';
import NaturalProofsPropositionDefinitions from 'pages/propositions/tabs/natural-proofs/definitions';
import React from 'react';
import RulesOfInference from 'pages/propositions/tabs/natural-proofs/rules';
import { TabItem } from 'types';
import { titles } from 'texts';

export const propositionsDirectProofsTabs: TabItem[] = [
  {
    tabContent: <DirectProofsEditor />,
    tabTitle: titles.direct,
    tabId: 'direct-proofs-editor',
  },
  {
    tabContent: <DirectProofsPropositionDefinitions />,
    tabTitle: titles.definitions,
    tabId: 'direct-proofs-definitions',
  },
  {
    tabContent: <AxiomSchemesForDirectPropositionProofs />,
    tabTitle: titles.axioms,
    tabId: 'axiom-schemes-for-direct-proofs',
  },
];

export const propositionsNaturalProofsTabs: TabItem[] = [
  {
    tabContent: <NaturalProofsEditor />,
    tabTitle: titles.natural,
    tabId: 'natural-proofs-editor',
  },
  {
    tabContent: <NaturalProofsPropositionDefinitions />,
    tabTitle: titles.definitions,
    tabId: 'natural-proofs-definitions',
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
