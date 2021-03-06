import DefinitionsOfPropositions from 'pages/propositions/elements/definitions-of-propositions';
import DirectProofsEditor from 'pages/propositions/elements/direct-proofs-editor';
import HeuristicsOfPropositions from 'pages/propositions/elements/heuristics-of-propositions';
import NaturalProofsEditor from 'pages/propositions/elements/natural-proofs-editor';
import React from 'react';
import RulesOfInference from 'pages/propositions/elements/rules-of-inference';
import { GreekSymbol, LogicalSymbolHexCode, LogicalSymbolRawInput } from 'enums';
import { PropositionalSymbol, TabItem } from 'types';
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

export const preparedSymbols: { [key in string]: PropositionalSymbol } = {
  openParenthesis: {
    input: LogicalSymbolRawInput.OpenParenthesis,
    representation: '(',
    type: 'parentheses',
    position: 0,
  },

  closeParenthesis: {
    input: LogicalSymbolRawInput.CloseParenthesis,
    representation: ')',
    type: 'parentheses',
    position: 0,
  },

  implication: {
    input: LogicalSymbolRawInput.Implication,
    representation: LogicalSymbolHexCode.Implication,
    type: 'operator',
    position: 0,
  },

  conjunction: {
    input: LogicalSymbolRawInput.Conjunction,
    representation: LogicalSymbolHexCode.Conjunction,
    type: 'operator',
    position: 0,
  },

  disjunction: {
    input: LogicalSymbolRawInput.Disjunction,
    representation: LogicalSymbolHexCode.Disjunction,
    type: 'operator',
    position: 0,
  },

  equivalence: {
    input: LogicalSymbolRawInput.Equivalence,
    representation: LogicalSymbolHexCode.Equivalence,
    type: 'operator',
    position: 0,
  },

  negation: {
    input: LogicalSymbolRawInput.Negation,
    representation: LogicalSymbolHexCode.Negation,
    type: 'operator',
    position: 0,
  },
};

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
      title: { en: '#', ru: '???' },
    },
    {
      field: 'friendlyExpression',
      title: { en: 'Formula', ru: '??????????????' },
    },
    {
      field: 'comment',
      title: { en: 'Comment', ru: '??????????????.' },
    },
  ],

  implicationCreationInitialValues: { firstVariable: '', secondVariable: '' },

  contradictionRealization: { firstVariable: '', secondVariable: '' },

  implicationDistributionInitialValues: { firstVariable: '', secondVariable: '', thirdVariable: '' },

  implicationCreationFormula: `${GreekSymbol.Phi} ${LogicalSymbolHexCode.Implication} ( ${GreekSymbol.Psi} ${LogicalSymbolHexCode.Implication} ${GreekSymbol.Phi} )`,

  implicationDistributionFormula: `( ${GreekSymbol.Phi} ${LogicalSymbolHexCode.Implication} ( ${GreekSymbol.Psi} ${LogicalSymbolHexCode.Implication} ${GreekSymbol.Chi} )) ${LogicalSymbolHexCode.Implication} (( ${GreekSymbol.Phi} ${LogicalSymbolHexCode.Implication} ${GreekSymbol.Psi} ) ${LogicalSymbolHexCode.Implication} ( ${GreekSymbol.Phi} ${LogicalSymbolHexCode.Implication} ${GreekSymbol.Chi} ))`,

  contradictionRealizationFormula: `( ${LogicalSymbolHexCode.Negation}${GreekSymbol.Phi} ${LogicalSymbolHexCode.Implication} ${GreekSymbol.Psi} ) ${LogicalSymbolHexCode.Implication} (( ${LogicalSymbolHexCode.Negation}${GreekSymbol.Phi} ${LogicalSymbolHexCode.Implication} ${LogicalSymbolHexCode.Negation}${GreekSymbol.Psi} ) ${LogicalSymbolHexCode.Implication} ${GreekSymbol.Phi} )`,
};

export default Object.freeze(constants);
