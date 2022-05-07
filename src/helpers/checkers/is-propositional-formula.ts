import { PropositionalSymbol } from 'types';

export function isPropositionalFormula(array: any): array is PropositionalSymbol[] {
  if (!array || !Array.isArray(array)) return false;

  for (const item of array) {
    if (item.input === undefined || item.type === undefined) return false;
  }

  return true;
}
