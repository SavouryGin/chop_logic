import factory from '../factory';
import testData from '__mocks__/test-data/propositions';
import { LogicalSymbolHexCode, PropositionalOperator } from 'enums';
import { PropositionalError } from 'errors/propositional-error';

describe('Propositions factory tests', () => {
  it('createOperator() method returns a propositional operator correctly', () => {
    expect(factory.createOperator(testData.propositionalSymbols[0])).toBe(PropositionalOperator.Not);
    expect(factory.createOperator(testData.propositionalSymbols[1])).toBe(PropositionalOperator.And);
    expect(factory.createOperator(testData.propositionalSymbols[2])).toBe(PropositionalOperator.Or);
    expect(factory.createOperator(testData.propositionalSymbols[3])).toBe(PropositionalOperator.Implies);
    expect(factory.createOperator(testData.propositionalSymbols[4])).toBe(PropositionalOperator.Equiv);
    expect(factory.createOperator(testData.propositionalSymbols[5])).toBe(PropositionalOperator.Var);
  });

  it('createOperator() method throws an error if the input is incorrect', () => {
    expect(() => {
      factory.createOperator(testData.propositionalSymbols[6]);
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
    expect(factory.createPropositionalSymbol('~', 0)).toEqual(testData.propositionalSymbols[0]);
    expect(factory.createPropositionalSymbol('&', 1)).toEqual(testData.propositionalSymbols[1]);
    expect(factory.createPropositionalSymbol('|', 2)).toEqual(testData.propositionalSymbols[2]);
    expect(factory.createPropositionalSymbol('=>', 3)).toEqual(testData.propositionalSymbols[3]);
    expect(factory.createPropositionalSymbol('<=>', 4)).toEqual(testData.propositionalSymbols[4]);
    expect(factory.createPropositionalSymbol('p', 5)).toEqual(testData.propositionalSymbols[5]);
    expect(factory.createPropositionalSymbol(')', 6)).toEqual(testData.propositionalSymbols[6]);
  });

  it('createPropositionalSymbol() method does not confuse symbols', () => {
    expect(factory.createPropositionalSymbol('|', 0)).not.toEqual(testData.propositionalSymbols[0]);
    expect(factory.createPropositionalSymbol('~', 1)).not.toEqual(testData.propositionalSymbols[1]);
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

  it('createAtom() method returns a correct propositional formula', () => {
    expect(factory.createAtom(testData.propositionalSymbols[5])).toEqual(testData.propositionalAtom);

    expect(
      factory.createAtom({
        input: 'a',
        type: 'variable',
        position: 5,
      }),
    ).toEqual({
      operator: PropositionalOperator.Var,
      values: 'A',
    });
  });

  it('createBinary() method returns a correct propositional formula', () => {
    expect(factory.createBinary(PropositionalOperator.And, testData.propositionalAtom, testData.propositionalAtom)).toEqual({
      operator: PropositionalOperator.And,
      values: [testData.propositionalAtom, testData.propositionalAtom],
    });

    expect(factory.createBinary(PropositionalOperator.Or, testData.propositionalAtom, testData.propositionalAtom)).toEqual({
      operator: PropositionalOperator.Or,
      values: [testData.propositionalAtom, testData.propositionalAtom],
    });
  });

  it('createNegation() method returns a correct propositional formula', () => {
    expect(factory.createNegation(testData.propositionalAtom)).toEqual({
      operator: PropositionalOperator.Not,
      values: [testData.propositionalAtom],
    });
  });
});
