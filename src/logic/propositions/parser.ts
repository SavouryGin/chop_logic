import { LogicalSymbol, LogicalSymbolRawInput } from 'enums';
import { PropositionalExpression, PropositionalSymbol } from 'types';

const parser = {
  logicalOperators: [
    LogicalSymbolRawInput.Implication,
    LogicalSymbolRawInput.Conjunction,
    LogicalSymbolRawInput.Disjunction,
    LogicalSymbolRawInput.Negation,
    LogicalSymbolRawInput.Equivalence,
  ],
  parentheses: ['(', ')'],

  parsePropositionalExpression(input: string): PropositionalExpression {
    const output: PropositionalSymbol[] = [];
    const charsArray = this.joinMultiCharsOperators(this.convertStringToCharsArray(input));
    let acc = '';

    for (const char of charsArray) {
      if (this.isNotPropositionalVariable(char)) {
        // Save the previous symbols as a variable
        if (acc.length) {
          output.push(this.convertToPropositionalSymbol(acc));
          acc = '';
        }
        // Push a non-variable symbol to the output array
        output.push(this.convertToPropositionalSymbol(char));
      } else {
        acc += char;
      }
    }
    // Push remaining characters as a variable
    if (acc.length) output.push(this.convertToPropositionalSymbol(acc));

    return output.map((item, index) => {
      return { ...item, index };
    });
  },

  convertStringToCharsArray(input: string): string[] {
    return input
      .split('')
      .filter((char) => char !== '')
      .map((char) => char.trim());
  },

  joinMultiCharsOperators(input: string[]): string[] {
    let acc = '';
    const output: string[] = [];

    for (const char of input) {
      if (['<', '=', '>'].includes(char)) {
        acc += char;
        if (acc === LogicalSymbolRawInput.Implication || acc === LogicalSymbolRawInput.Equivalence) {
          output.push(acc);
          acc = '';
        }
      } else {
        if (!acc.length) output.push(char);
      }
    }
    return output;
  },

  convertToPropositionalSymbol(char: string): PropositionalSymbol {
    if (this.logicalOperators.includes(char as LogicalSymbolRawInput)) {
      return {
        input: char,
        representation: this.getLogicalSymbolRepresentation(char),
        type: 'operator',
      };
    } else if (this.parentheses.includes(char)) {
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
  },

  isNotPropositionalVariable(char: string): boolean {
    return this.logicalOperators.includes(char as LogicalSymbolRawInput) || this.parentheses.includes(char);
  },

  getLogicalSymbolRepresentation(char: string): LogicalSymbol | undefined {
    switch (char) {
      case LogicalSymbolRawInput.Implication: {
        return LogicalSymbol.Implication;
      }
      case LogicalSymbolRawInput.Conjunction: {
        return LogicalSymbol.Conjunction;
      }
      case LogicalSymbolRawInput.Disjunction: {
        return LogicalSymbol.Disjunction;
      }
      case LogicalSymbolRawInput.Negation: {
        return LogicalSymbol.Negation;
      }
      case LogicalSymbolRawInput.Equivalence: {
        return LogicalSymbol.Equivalence;
      }
      default: {
        return undefined;
      }
    }
  },
};

export default Object.freeze(parser);
