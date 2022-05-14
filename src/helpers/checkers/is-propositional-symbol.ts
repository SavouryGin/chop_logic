import { PropositionalSymbol } from 'types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isPropositionalSymbol(item: any): item is PropositionalSymbol {
  if (!item || typeof item !== 'object') return false;
  return item.input !== undefined || item.type !== undefined;
}
