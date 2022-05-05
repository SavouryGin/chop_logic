import { PropositionalSymbol } from 'types/formulas';

const logicalOperators = ['=>', '&', '|', '~', '<=>'];
const parentheses = ['(', ')'];

export function parsePropositionalFormula(input: string): PropositionalSymbol[] {
  console.log('input', input);
  const output: PropositionalSymbol[] = [];

  const charsArray = convertStringToCharsArray(input);
  console.log('charsArray', charsArray);

  let acc = '';

  for (const char of charsArray) {
    if (logicalOperators.includes(char) || parentheses.includes(char)) {
      if (acc.length) {
        output.push(convertToPropositionalSymbol(acc));
        acc = '';
      }

      output.push(convertToPropositionalSymbol(char));
    } else {
      acc += char;
    }
  }

  console.log('output', output);
  return output;
}

function convertStringToCharsArray(input: string): string[] {
  return input
    .split('')
    .filter((char) => char !== '')
    .map((char) => char.trim());
}

function convertToPropositionalSymbol(char: string): PropositionalSymbol {
  if (logicalOperators.includes(char)) {
    return {
      input: char,
      representation: '*',
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
