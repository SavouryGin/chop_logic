import React from 'react';
import { PropositionalSymbol } from 'types';

export function getPreformattedSymbol(symbol: PropositionalSymbol, key: number): JSX.Element {
  switch (symbol.type) {
    case 'operator': {
      return (
        <span key={`symbol-${key}`} className={'formula__operator'}>
          {` ${symbol.representation} `}
        </span>
      );
    }
    case 'parentheses': {
      return (
        <span key={`symbol-${key}`} className={'formula__parentheses'}>
          {symbol.representation}
        </span>
      );
    }
    case 'variable': {
      return (
        <var key={`symbol-${key}`} className={'formula__variable'}>
          {symbol.representation}
        </var>
      );
    }
  }
}
