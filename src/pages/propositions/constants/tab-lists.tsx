import AxiomSchemesForDirectPropositionProofs from 'pages/propositions/tabs/direct-proofs/axiom-schemes';
import DirectProofsEditor from 'pages/propositions/tabs/direct-proofs/editor';
import DirectProofsPropositionDefinitions from 'pages/propositions/tabs/direct-proofs/definitions';
import HeuristicsOfPropositions from 'pages/propositions/tabs/natural-proofs/heuristics';
import NaturalProofsEditor from 'pages/propositions/tabs/natural-proofs/editor';
import NaturalProofsPropositionDefinitions from 'pages/propositions/tabs/natural-proofs/definitions';
import React from 'react';
import ResolutionProofsDefinitions from 'pages/propositions/tabs/resolution-proofs/definitions';
import ResolutionProofsEditor from 'pages/propositions/tabs/resolution-proofs/editor';
import RulesOfInference from 'pages/propositions/tabs/natural-proofs/rules';
import TruthTablesDefinitions from 'pages/propositions/tabs/truth-tables/definitions';
import TruthTablesEditor from 'pages/propositions/tabs/truth-tables/editor';
import TruthTablesLaws from 'pages/propositions/tabs/truth-tables/laws';
import TruthTablesOperands from 'pages/propositions/tabs/truth-tables/operands';
import texts from 'utils/texts/propositions/elements';
import { TabItem } from 'types';

export const DP_PROOFS_TABS: TabItem[] = [
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

export const NP_PROOFS_TABS: TabItem[] = [
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

export const RES_PROOFS_TABS: TabItem[] = [
  {
    tabContent: <ResolutionProofsEditor />,
    tabTitle: texts.editor,
    tabId: 'resolution-proofs-editor',
  },
  {
    tabContent: <ResolutionProofsDefinitions />,
    tabTitle: texts.definitions,
    tabId: 'resolution-proofs-definitions',
  },
  {
    tabContent: <ResolutionProofsDefinitions />,
    tabTitle: texts.converter,
    tabId: 'resolution-proofs-converter',
  },
];

export const TRUTH_TABLES_TABS: TabItem[] = [
  {
    tabContent: <TruthTablesEditor />,
    tabTitle: texts.editor,
    tabId: 'truth-tables-editor',
  },
  {
    tabContent: <TruthTablesDefinitions />,
    tabTitle: texts.definitions,
    tabId: 'truth-tables-definitions',
  },
  {
    tabContent: <TruthTablesOperands />,
    tabTitle: texts.operands,
    tabId: 'truth-tables-operands',
  },
  {
    tabContent: <TruthTablesLaws />,
    tabTitle: texts.laws,
    tabId: 'truth-tables-laws',
  },
];
