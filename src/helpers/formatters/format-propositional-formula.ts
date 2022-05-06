import { PropositionalSymbol } from 'types';

export function formatPropositionalFormula(input: PropositionalSymbol[]): string {
  const output = input.map((item) => item.representation || '');
  return output.join(' ');
}
