import PropositionsParser from 'helpers/parsers/propositions-parser';
import { PropositionalSymbol } from 'types';

export function getImplicationCreationFormula(firstVariable: string, secondVariable: string): PropositionalSymbol[] {
  if (!firstVariable.length || !secondVariable.length) return [];
  const input = `${firstVariable} => (${secondVariable} => ${firstVariable})`;
  return PropositionsParser.parsePropositionalFormula(input);
}
