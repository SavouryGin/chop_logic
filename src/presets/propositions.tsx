import DefinitionsOfPropositions from 'pages/propositions/elements/definitions-of-propositions';
import DirectProofsEditor from 'pages/propositions/elements/direct-proofs-editor';
import HeuristicsOfPropositions from 'pages/propositions/elements/heuristics-of-propositions';
import NaturalProofsEditor from 'pages/propositions/elements/natural-proofs-editor';
import React from 'react';
import RulesOfInference from 'pages/propositions/elements/rules-of-inference';
import { LogicalSymbolRawInput } from 'enums';
import { TabItem } from 'types';
import { titles } from 'texts';

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

const constants = {
  logicalOperators: [
    LogicalSymbolRawInput.Implication,
    LogicalSymbolRawInput.Conjunction,
    LogicalSymbolRawInput.Disjunction,
    LogicalSymbolRawInput.Negation,
    LogicalSymbolRawInput.Equivalence,
  ],

  parentheses: [LogicalSymbolRawInput.OpenParenthesis, LogicalSymbolRawInput.CloseParenthesis],

  directProofsEditorTableColumns: [
    {
      field: 'step',
      title: { en: '#', ru: '№' },
    },
    {
      field: 'expression',
      title: { en: 'Formula', ru: 'Формула' },
    },
    {
      field: 'comment',
      title: { en: 'Comment', ru: 'Коммент.' },
    },
  ],

  openParenthesisSymbol: {
    input: LogicalSymbolRawInput.OpenParenthesis,
    representation: '(',
    type: 'parentheses',
    position: 0,
  },

  closeParenthesisSymbol: {
    input: LogicalSymbolRawInput.CloseParenthesis,
    representation: ')',
    type: 'parentheses',
    position: 0,
  },

  implicationCreationInitialValues: { firstVariable: '', secondVariable: '' },
};

export default Object.freeze(constants);
