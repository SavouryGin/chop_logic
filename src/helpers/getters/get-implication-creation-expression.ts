import PropositionsParser from 'helpers/parsers/propositions-parser';
import { PropositionalExpression } from 'types';

export function getImplicationCreationExpression(firstVariable: string, secondVariable: string): PropositionalExpression {
  if (!firstVariable.length || !secondVariable.length) return [];
  const input = `${firstVariable} => (${secondVariable} => ${firstVariable})`;
  return PropositionsParser.parsePropositionalExpression(input);
}
