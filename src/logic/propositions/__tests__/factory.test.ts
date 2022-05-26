import { LogicalSymbolHexCode, PropositionalOperator } from 'enums';
import { PropositionalError } from 'errors/propositional-error';
import { testPropositionalSymbols } from '__mocks__/test-data/propositions';
import factory from '../factory';

describe('Propositions factory tests', () => {
  it('createOperator() method returns a propositional operator correctly', () => {
    expect(factory.createOperator(testPropositionalSymbols[0])).toBe(PropositionalOperator.Not);
    expect(factory.createOperator(testPropositionalSymbols[1])).toBe(PropositionalOperator.And);
    expect(factory.createOperator(testPropositionalSymbols[2])).toBe(PropositionalOperator.Or);
    expect(factory.createOperator(testPropositionalSymbols[3])).toBe(PropositionalOperator.Implies);
    expect(factory.createOperator(testPropositionalSymbols[4])).toBe(PropositionalOperator.Equiv);
    expect(factory.createOperator(testPropositionalSymbols[5])).toBe(PropositionalOperator.Var);
  });

  it('createOperator() method throws an error if the input is incorrect', () => {
    expect(() => {
      factory.createOperator(testPropositionalSymbols[6]);
    }).toThrow(PropositionalError);
  });

  it('getSymbolRepresentation() method transforms the input to the correct logical symbol', () => {
    expect(factory.getSymbolRepresentation('~')).toBe(LogicalSymbolHexCode.Negation);
    expect(factory.getSymbolRepresentation('&')).toBe(LogicalSymbolHexCode.Conjunction);
    expect(factory.getSymbolRepresentation('|')).toBe(LogicalSymbolHexCode.Disjunction);
    expect(factory.getSymbolRepresentation('=>')).toBe(LogicalSymbolHexCode.Implication);
    expect(factory.getSymbolRepresentation('<=>')).toBe(LogicalSymbolHexCode.Equivalence);
  });

  it('getSymbolRepresentation() method throws an error if the input is incorrect', () => {
    expect(() => {
      factory.getSymbolRepresentation('9');
    }).toThrow(PropositionalError);
    expect(() => {
      factory.getSymbolRepresentation('');
    }).toThrow(PropositionalError);
    expect(() => {
      factory.getSymbolRepresentation('asdf');
    }).toThrow(PropositionalError);
    expect(() => {
      factory.getSymbolRepresentation('=');
    }).toThrow(PropositionalError);
  });

  it('createPropositionalSymbol() method returns a correct propositional symbol', () => {
    expect(factory.createPropositionalSymbol('~', 0)).toEqual(testPropositionalSymbols[0]);
    expect(factory.createPropositionalSymbol('&', 1)).toEqual(testPropositionalSymbols[1]);
    expect(factory.createPropositionalSymbol('|', 2)).toEqual(testPropositionalSymbols[2]);
    expect(factory.createPropositionalSymbol('=>', 3)).toEqual(testPropositionalSymbols[3]);
    expect(factory.createPropositionalSymbol('<=>', 4)).toEqual(testPropositionalSymbols[4]);
    expect(factory.createPropositionalSymbol('p', 5)).toEqual(testPropositionalSymbols[5]);
    expect(factory.createPropositionalSymbol(')', 6)).toEqual(testPropositionalSymbols[6]);
  });

  it('createPropositionalSymbol() method does not confuse symbols', () => {
    expect(factory.createPropositionalSymbol('|', 0)).not.toEqual(testPropositionalSymbols[0]);
    expect(factory.createPropositionalSymbol('~', 1)).not.toEqual(testPropositionalSymbols[1]);
  });

  it('createPropositionalSymbol() method throws an error if the input is incorrect', () => {
    expect(() => {
      factory.createPropositionalSymbol('123', 0);
    }).toThrow(PropositionalError);
    expect(() => {
      factory.createPropositionalSymbol('=', 1);
    }).toThrow(PropositionalError);
    expect(() => {
      factory.createPropositionalSymbol('', 2);
    }).toThrow(PropositionalError);
    expect(() => {
      factory.createPropositionalSymbol('<=', 3);
    }).toThrow(PropositionalError);
    expect(() => {
      factory.createPropositionalSymbol('&~', 4);
    }).toThrow(PropositionalError);
  });

  it('createPropositionalSymbol() method accepts only latin letters without spaces as variables', () => {
    expect(() => {
      factory.createPropositionalSymbol('ф', 0);
    }).toThrow(PropositionalError);
    expect(() => {
      factory.createPropositionalSymbol('а', 1);
    }).toThrow(PropositionalError);
    expect(() => {
      factory.createPropositionalSymbol('f-f', 2);
    }).toThrow(PropositionalError);
    expect(() => {
      factory.createPropositionalSymbol('p q', 3);
    }).toThrow(PropositionalError);
    expect(() => {
      factory.createPropositionalSymbol('p&q', 4);
    }).toThrow(PropositionalError);

    expect(factory.createPropositionalSymbol('p', 0)).toEqual({
      input: 'p',
      type: 'variable',
      position: 0,
      representation: 'P',
    });
    expect(factory.createPropositionalSymbol('S', 1)).toEqual({
      input: 'S',
      type: 'variable',
      position: 1,
      representation: 'S',
    });
    expect(factory.createPropositionalSymbol('abc', 2)).toEqual({
      input: 'abc',
      type: 'variable',
      position: 2,
      representation: 'ABC',
    });
  });
});
