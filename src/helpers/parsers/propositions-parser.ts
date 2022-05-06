import { LogicalSymbol } from 'enums';
import { PropositionalSymbol } from 'types/formulas';

abstract class PropositionsParser {
  public static logicalOperators = ['=>', '&', '|', '~', '<=>'];
  public static parentheses = ['(', ')'];

  public static parsePropositionalFormula(input: string): PropositionalSymbol[] {
    const output: PropositionalSymbol[] = [];
    const charsArray = PropositionsParser.joinMultiCharsOperators(PropositionsParser.convertStringToCharsArray(input));
    let acc = '';

    for (const char of charsArray) {
      if (PropositionsParser.isNotPropositionalVariable(char)) {
        // Save the previous symbols as a variable
        if (acc.length) {
          output.push(PropositionsParser.convertToPropositionalSymbol(acc));
          acc = '';
        }
        // Push a non-variable symbol to the output array
        output.push(PropositionsParser.convertToPropositionalSymbol(char));
      } else {
        acc += char;
      }
    }
    // Push remaining characters as a variable
    if (acc.length) output.push(PropositionsParser.convertToPropositionalSymbol(acc));

    return output;
  }

  public static convertStringToCharsArray(input: string): string[] {
    return input
      .split('')
      .filter((char) => char !== '')
      .map((char) => char.trim());
  }

  public static joinMultiCharsOperators(input: string[]): string[] {
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

  public static convertToPropositionalSymbol(char: string): PropositionalSymbol {
    if (PropositionsParser.logicalOperators.includes(char)) {
      return {
        input: char,
        representation: PropositionsParser.getLogicalSymbolRepresentation(char),
        type: 'operator',
      };
    } else if (PropositionsParser.parentheses.includes(char)) {
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

  public static isNotPropositionalVariable(char: string): boolean {
    return PropositionsParser.logicalOperators.includes(char) || PropositionsParser.parentheses.includes(char);
  }

  public static getLogicalSymbolRepresentation(char: string): LogicalSymbol | undefined {
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
}

export default PropositionsParser;
