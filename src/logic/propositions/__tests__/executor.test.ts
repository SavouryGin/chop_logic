import executor from '../executor';
import mocks from '__mocks__/data/propositions/formulas-items';
import { PropositionalError } from 'errors/propositional-error';

describe('Propositions executor tests:', () => {
  it('performIE() creates a correct modus ponens', () => {
    expect(executor.performIE(mocks.implicationEliminationFormula, mocks.implicationEliminationAntecedent)).toEqual(
      mocks.implicationEliminationConsequent,
    );
    expect(executor.performIE(mocks.implicationEliminationAntecedent, mocks.implicationEliminationFormula)).toEqual(
      mocks.implicationEliminationConsequent,
    );
    expect(executor.performIE(mocks.propositionalFormula, mocks.firstSubFormula)).toEqual(mocks.secondSubFormula);
  });

  it('performIE() throws an error if arguments are not valid', () => {
    expect(() => {
      executor.performIE(mocks.implicationEliminationFormula, mocks.implicationEliminationConsequent);
    }).toThrow(PropositionalError);
    expect(() => {
      executor.performIE(mocks.propositionalFormula, mocks.secondSubFormula);
    }).toThrow(PropositionalError);
  });
});
