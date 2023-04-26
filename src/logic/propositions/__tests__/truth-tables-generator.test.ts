import generator from '../truth-table-generator';
import mocks from '__mocks__/data/propositions/formulas-items';

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
});
