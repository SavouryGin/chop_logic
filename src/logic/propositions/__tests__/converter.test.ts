import converter from '../converter';
import testData from '__mocks__/test-data/propositions';

describe('Propositions converter tests', () => {
  it('convertStringToExpression() method returns a correct propositional expression', () => {
    expect(converter.convertStringToExpression('( (~(p)) => ( ((p) & (q)) =>  (~(p))) )')).toEqual(testData.propositionalExpression);
    expect(converter.convertStringToExpression('((~(p))=>(((p)&(q))=> (~(p))))')).toEqual(testData.propositionalExpression);
    expect(converter.convertStringToExpression('~')).toEqual([testData.propositionalSymbols[0]]);
  });

  it('convertToICExpression() method returns a correct propositional expression', () => {
    expect(converter.convertToICExpression('(~(p))', '((p) & (q))')).toEqual(testData.propositionalExpression);
  });

  it('convertExpressionToFormula() method returns a correct propositional formula', () => {
    expect(converter.convertExpressionToFormula(testData.propositionalExpression)).toEqual(testData.propositionalFormula);
    expect(converter.convertExpressionToFormula(testData.firstSubExpression)).toEqual(testData.firstSubFormula);
    expect(converter.convertExpressionToFormula(testData.secondSubExpression)).toEqual(testData.secondSubFormula);
  });
});
