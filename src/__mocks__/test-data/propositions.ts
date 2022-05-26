import { PropositionalSymbol } from 'types';

export const testPropositionalSymbols: PropositionalSymbol[] = [
  {
    input: '~',
    type: 'operator',
    position: 0,
  },
  {
    input: '&',
    type: 'operator',
    position: 1,
  },
  {
    input: '|',
    type: 'operator',
    position: 2,
  },
  {
    input: '=>',
    type: 'operator',
    position: 3,
  },
  {
    input: '<=>',
    type: 'operator',
    position: 4,
  },
  {
    input: 'A',
    type: 'variable',
    position: 5,
  },
  {
    input: ')',
    type: 'parentheses',
    position: 6,
  },
];
