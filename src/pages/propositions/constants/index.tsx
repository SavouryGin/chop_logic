import { GreekSymbol, LogicalSymbolHexCode, LogicalSymbolRawInput } from 'enums';

export * from './tab-lists';

export * from './symbols';

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
      field: 'friendlyExpression',
      title: { en: 'Formula', ru: 'Формула' },
    },
    {
      field: 'comment',
      title: { en: 'Comment', ru: 'Коммент.' },
    },
  ],

  naturalProofsEditorTableColumns: [
    {
      field: 'step',
      title: { en: '#', ru: '№' },
    },
    {
      field: 'friendlyExpression',
      title: { en: 'Formula', ru: 'Формула' },
    },
    {
      field: 'comment',
      title: { en: 'Comment', ru: 'Коммент.' },
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
