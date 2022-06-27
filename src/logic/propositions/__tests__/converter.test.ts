import converter from '../converter';
import mocks from '__mocks__/data/propositions';
import { PropositionalError } from 'errors/propositional-error';

describe('Propositions converter tests', () => {
  it('convertStringToExpression() method returns a correct propositional expression', () => {
    expect(converter.convertStringToExpression('( (~(p)) => ( ((p) & (q)) =>  (~(p))) )')).toEqual(mocks.propositionalExpression);
    expect(converter.convertStringToExpression('((~(p))=>(((p)&(q))=> (~(p))))')).toEqual(mocks.propositionalExpression);
    expect(converter.convertStringToExpression('~')).toEqual([mocks.propositionalSymbols[0]]);
  });

  it('convertStringToExpression() method returns a parenthesized expression', () => {
    expect(converter.convertStringToExpression('~p => ((p&q) => ~p)')).toEqual(mocks.propositionalExpression);
    expect(converter.convertStringToExpression('p')).toEqual(mocks.oneVariableExpression);
    expect(converter.convertStringToExpression('~ p')).toEqual(mocks.oneNegationExpression);
    expect(converter.convertStringToExpression('~~~p')).toEqual(mocks.threeNegationsExpression);
  });

  it('convertToICExpression() method returns a correct propositional expression', () => {
    expect(converter.convertToICExpression('(~(p))', '((p) & (q))')).toEqual(mocks.propositionalExpression);
    expect(converter.convertToICExpression('~p', 'p&q')).toEqual(mocks.propositionalExpression);
    expect(converter.convertToICExpression('(~p)', '(p & q)')).toEqual(mocks.propositionalExpression);
  });

  it('convertExpressionToFormula() method returns a correct propositional formula', () => {
    expect(converter.convertExpressionToFormula(mocks.propositionalExpression)).toEqual(mocks.propositionalFormula);
    expect(converter.convertExpressionToFormula(mocks.firstSubExpression)).toEqual(mocks.firstSubFormula);
    expect(converter.convertExpressionToFormula(mocks.secondSubExpression)).toEqual(mocks.secondSubFormula);
  });

  it('convertExpressionToFormula() method throws an error if the main symbol is incorrect', () => {
    expect(() => {
      converter.convertExpressionToFormula([
        mocks.openParenthesis,
        {
          input: '5',
          representation: '5',
          type: 'parentheses',
          position: 1,
        },
        mocks.closeParenthesis,
      ]);
    }).toThrow(PropositionalError);
  });
});
