import generator from '../truth-table-generator';
import mocks from '__mocks__/data/propositions/formulas-items';
import { LogicalSymbolHexCode, PropositionalOperator } from 'enums';

describe('Truth Table Generator tests', () => {
  it('createVariableColumn() method returns a correct TruthTableColumn', () => {
    const column1 = generator.createVariableColumn('p', 0);
    const column2 = generator.createVariableColumn('q', 2);
    expect(column1).toEqual({
      field: 'p',
      depth: 0,
      operator: 'VAR',
      title: { en: 'P', ru: 'P' },
      operands: [],
    });
    expect(column2).toEqual({
      field: 'q',
      depth: 2,
      operator: 'VAR',
      title: { en: 'Q', ru: 'Q' },
      operands: [],
    });
  });

  it('createNegationColumn() method returns a correct TruthTableColumn', () => {
    const column = generator.createNegationColumn(mocks.propositionalAtom, 0);
    expect(column).toEqual({
      field: '¬ P',
      depth: 0,
      operator: 'NOT',
      title: { en: '¬ P', ru: '¬ P' },
      operands: ['P'],
    });
    const column2 = generator.createNegationColumn(mocks.firstSubFormula, 1);
    expect(column2).toEqual({
      field: '¬ ¬ P',
      depth: 1,
      operator: 'NOT',
      title: { en: '¬ ¬ P', ru: '¬ ¬ P' },
      operands: ['¬ P'],
    });
  });

  it('createBinaryColumn() method returns a correct TruthTableColumn', () => {
    const column = generator.createBinaryColumn({
      firstOperand: mocks.propositionalAtom,
      secondOperand: mocks.propositionalAtom,
      depth: 0,
      operator: PropositionalOperator.And,
      symbol: LogicalSymbolHexCode.Conjunction,
    });

    expect(column).toEqual({
      field: 'P ∧ P',
      depth: 0,
      operator: 'AND',
      title: { en: 'P ∧ P', ru: 'P ∧ P' },
      operands: ['P', 'P'],
    });

    const column2 = generator.createBinaryColumn({
      firstOperand: mocks.firstSubFormula,
      secondOperand: mocks.secondSubFormula,
      depth: 1,
      operator: PropositionalOperator.Implies,
      symbol: LogicalSymbolHexCode.Implication,
    });

    expect(column2).toEqual({
      field: '¬ P ⇒ ( P ∧ Q ) ⇒ ¬ P',
      depth: 1,
      operator: 'IMPLIES',
      title: { en: '¬ P ⇒ ( P ∧ Q ) ⇒ ¬ P', ru: '¬ P ⇒ ( P ∧ Q ) ⇒ ¬ P' },
      operands: ['¬ P', '( P ∧ Q ) ⇒ ¬ P'],
    });
  });

  it('generateTrueFalseCombinations() creates correct arrays of values', () => {
    const arr1 = generator.generateTrueFalseCombinations(1);
    const arr2 = generator.generateTrueFalseCombinations(2);
    const arr3 = generator.generateTrueFalseCombinations(3);
    const arr4 = generator.generateTrueFalseCombinations(4);

    expect(arr1).toEqual([false, true]);

    expect(arr2).toEqual([false, false, false, true, true, false, true, true]);

    expect(arr3).toEqual([
      false,
      false,
      false,
      false,
      false,
      true,
      false,
      true,
      false,
      false,
      true,
      true,
      true,
      false,
      false,
      true,
      false,
      true,
      true,
      true,
      false,
      true,
      true,
      true,
    ]);

    expect(arr4).toEqual([
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      false,
      false,
      true,
      false,
      false,
      false,
      true,
      true,
      false,
      true,
      false,
      false,
      false,
      true,
      false,
      true,
      false,
      true,
      true,
      false,
      false,
      true,
      true,
      true,
      true,
      false,
      false,
      false,
      true,
      false,
      false,
      true,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      true,
      true,
      true,
      false,
      false,
      true,
      true,
      false,
      true,
      true,
      true,
      true,
      false,
      true,
      true,
      true,
      true,
    ]);
  });

  it('splitBooleanArrayByVarsCount() splits the array correctly', () => {
    const arr1 = generator.generateTrueFalseCombinations(1);
    const arr2 = generator.generateTrueFalseCombinations(2);
    const arr3 = generator.generateTrueFalseCombinations(3);
    const arr4 = generator.generateTrueFalseCombinations(4);

    const split1 = generator.splitBooleanArrayByVarsCount(1, arr1);
    const split2 = generator.splitBooleanArrayByVarsCount(2, arr2);
    const split3 = generator.splitBooleanArrayByVarsCount(3, arr3);
    const split4 = generator.splitBooleanArrayByVarsCount(4, arr4);

    expect(split1).toEqual([[false], [true]]);
    expect(split2).toEqual([
      [false, false],
      [false, true],
      [true, false],
      [true, true],
    ]);
    expect(split3).toEqual([
      [false, false, false],
      [false, false, true],
      [false, true, false],
      [false, true, true],
      [true, false, false],
      [true, false, true],
      [true, true, false],
      [true, true, true],
    ]);
    expect(split4).toEqual([
      [false, false, false, false],
      [false, false, false, true],
      [false, false, true, false],
      [false, false, true, true],
      [false, true, false, false],
      [false, true, false, true],
      [false, true, true, false],
      [false, true, true, true],
      [true, false, false, false],
      [true, false, false, true],
      [true, false, true, false],
      [true, false, true, true],
      [true, true, false, false],
      [true, true, false, true],
      [true, true, true, false],
      [true, true, true, true],
    ]);
  });
});
