import { PropositionalExpression } from 'types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isPropositionalExpression(array: any): array is PropositionalExpression {
  if (!array || !Array.isArray(array)) return false;

  for (const item of array) {
    if (item.input === undefined || item.type === undefined) return false;
  }

  return true;
}
