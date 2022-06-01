import converter from '../converter';
import testData from '__mocks__/test-data/propositions';
import { PropositionalError } from 'errors/propositional-error';

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

  it('convertExpressionToFormula() method throws an error if the main symbol is incorrect', () => {
    expect(() => {
      converter.convertExpressionToFormula([
        testData.openParenthesis,
        {
          input: '5',
          representation: '5',
          type: 'parentheses',
          position: 1,
        },
        testData.closeParenthesis,
      ]);
    }).toThrow(PropositionalError);
  });
});
