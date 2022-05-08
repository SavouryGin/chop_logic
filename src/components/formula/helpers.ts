import { PropositionalSymbol } from 'types';

export function getPropositionalSymbolClassName(symbol: PropositionalSymbol): string {
  switch (symbol.type) {
    case 'operator': {
      return 'formula__operator';
    }
    case 'parentheses': {
      return 'formula__parentheses';
    }
    case 'variable': {
      return 'formula__variable';
    }
  }
}
