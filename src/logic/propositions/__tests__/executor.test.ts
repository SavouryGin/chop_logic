import executor from '../executor';
import mocks from '__mocks__/data/propositions/formulas-items';
import tMocks from '__mocks__/data/propositions/table-items';
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

  it('performCI() creates correct conjunctions', () => {
    const data = {
      level: 0,
      dataLength: 1,
      selectedItems: [tMocks.npTableCIandCE[0]],
      assumptionId: null,
    };
    expect(executor.performCI({ ...data })).toEqual([{ ...tMocks.npTableCIandCE[1], id: expect.any(String) }]);
  });

  it('performIEforNP() creates a correct modus ponens', () => {
    const data = {
      level: 1,
      dataLength: 2,
      selectedItems: [tMocks.npTableDataIEandII[0], tMocks.npTableDataIEandII[1]],
      assumptionId: tMocks.npTableDataIEandII[1].assumptionId,
    };
    expect(executor.performIEforNP({ ...data })).toEqual({ ...tMocks.npTableDataIEandII[2], id: expect.any(String) });
  });
});
