import generator from '../truth-table-generator';

describe('Truth Table Generator tests', () => {
  it('createVariableColumn() method returns a correct array TruthTableColumn', () => {
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
});
