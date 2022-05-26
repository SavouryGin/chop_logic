import { PropositionalOperator } from 'enums';
import { PropositionalError } from 'errors/propositional-error';
import { testPropositionalSymbols } from '__mocks__/test-data/propositions';
import factory from '../factory';

describe('Propositions factory tests', () => {
  it('createOperator() method creates a propositional operator correctly', () => {
    expect(factory.createOperator(testPropositionalSymbols[0])).toEqual(PropositionalOperator.Not);
    expect(factory.createOperator(testPropositionalSymbols[1])).toEqual(PropositionalOperator.And);
    expect(factory.createOperator(testPropositionalSymbols[2])).toEqual(PropositionalOperator.Or);
    expect(factory.createOperator(testPropositionalSymbols[3])).toEqual(PropositionalOperator.Implies);
    expect(factory.createOperator(testPropositionalSymbols[4])).toEqual(PropositionalOperator.Equiv);
    expect(factory.createOperator(testPropositionalSymbols[5])).toEqual(PropositionalOperator.Var);
  });

  it('createOperator() method throws an error if the input is incorrect', () => {
    expect(() => {
      factory.createOperator(testPropositionalSymbols[6]);
    }).toThrow(PropositionalError);
  });
});
