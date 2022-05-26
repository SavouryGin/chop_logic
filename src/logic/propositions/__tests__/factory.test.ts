import { LogicalSymbol, PropositionalOperator } from 'enums';
import { PropositionalError } from 'errors/propositional-error';
import { testPropositionalSymbols } from '__mocks__/test-data/propositions';
import factory from '../factory';

describe('Propositions factory tests', () => {
  it('createOperator() method creates a propositional operator correctly', () => {
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
    expect(factory.getSymbolRepresentation('~')).toBe(LogicalSymbol.Negation);
    expect(factory.getSymbolRepresentation('&')).toBe(LogicalSymbol.Conjunction);
    expect(factory.getSymbolRepresentation('|')).toBe(LogicalSymbol.Disjunction);
    expect(factory.getSymbolRepresentation('=>')).toBe(LogicalSymbol.Implication);
    expect(factory.getSymbolRepresentation('<=>')).toBe(LogicalSymbol.Equivalence);
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
});
