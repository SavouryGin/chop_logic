import { LogicalSymbol } from 'enums';
import { PropositionalSymbol } from 'types/formulas';

const logicalOperators = ['=>', '&', '|', '~', '<=>'];
const parentheses = ['(', ')'];

export function parsePropositionalFormula(input: string): PropositionalSymbol[] {
  const output: PropositionalSymbol[] = [];
  const charsArray = joinMultiCharsOperators(convertStringToCharsArray(input));
  let acc = '';

  for (const char of charsArray) {
    if (isNotPropositionalVariable(char)) {
      // Save the previous symbols as a variable
      if (acc.length) {
        output.push(convertToPropositionalSymbol(acc));
        acc = '';
      }
      // Push a non-variable symbol to the output array
      output.push(convertToPropositionalSymbol(char));
    } else {
      acc += char;
    }
  }
  // Push remaining characters as a variable
  if (acc.length) output.push(convertToPropositionalSymbol(acc));

  return output;
}

function convertStringToCharsArray(input: string): string[] {
  return input
    .split('')
    .filter((char) => char !== '')
    .map((char) => char.trim());
}

function isNotPropositionalVariable(char: string): boolean {
  return logicalOperators.includes(char) || parentheses.includes(char);
}

function joinMultiCharsOperators(input: string[]): string[] {
  let acc = '';
  const output: string[] = [];

  for (const char of input) {
    if (['<', '=', '>'].includes(char)) {
      acc += char;
      if (acc === '=>' || acc === '<=>') {
        output.push(acc);
        acc = '';
      }
    } else {
      if (!acc.length) output.push(char);
    }
  }
  return output;
}

function convertToPropositionalSymbol(char: string): PropositionalSymbol {
  if (logicalOperators.includes(char)) {
    return {
      input: char,
      representation: getLogicalSymbolRepresentation(char),
      type: 'operator',
    };
  } else if (parentheses.includes(char)) {
    return {
      input: char,
      representation: char,
      type: 'parentheses',
    };
  } else {
    return {
      input: char,
      representation: char.toLocaleUpperCase(),
      type: 'variable',
    };
  }
}

function getLogicalSymbolRepresentation(char: string): LogicalSymbol | undefined {
  switch (char) {
    case '=>': {
      return LogicalSymbol.Implication;
    }
    case '&': {
      return LogicalSymbol.Conjunction;
    }
    case '|': {
      return LogicalSymbol.Disjunction;
    }
    case '~': {
      return LogicalSymbol.Negation;
    }
    case '<=>': {
      return LogicalSymbol.Equivalence;
    }
    default: {
      return undefined;
    }
  }
}
