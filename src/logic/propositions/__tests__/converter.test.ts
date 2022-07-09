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

  it('convertFormulaToUserFriendlyExpression() return an un-parenthesized expression', () => {
    expect(converter.convertFormulaToUserFriendlyExpression(mocks.propositionalFormula)).toEqual(mocks.friendlyPropositionalExpression);
    expect(converter.convertFormulaToUserFriendlyExpression(mocks.firstSubFormula)).toEqual([
      {
        input: '~',
        representation: '¬',
        type: 'operator',
        position: 0,
      },
      {
        input: 'P',
        representation: 'P',
        type: 'variable',
        position: 1,
      },
    ]);
    expect(converter.convertFormulaToUserFriendlyExpression(mocks.secondSubFormula)).toEqual([
      {
        input: '(',
        representation: '(',
        type: 'parentheses',
        position: 0,
      },
      {
        input: 'P',
        representation: 'P',
        type: 'variable',
        position: 1,
      },
      {
        input: '&',
        representation: '∧',
        type: 'operator',
        position: 2,
      },
      {
        input: 'Q',
        representation: 'Q',
        type: 'variable',
        position: 3,
      },
      {
        input: ')',
        representation: ')',
        type: 'parentheses',
        position: 4,
      },
      {
        input: '=>',
        representation: '⇒',
        type: 'operator',
        position: 5,
      },
      {
        input: '~',
        representation: '¬',
        type: 'operator',
        position: 6,
      },
      {
        input: 'P',
        representation: 'P',
        type: 'variable',
        position: 7,
      },
    ]);
  });

  it('convertStringToUserFriendlyExpression() returns an un-parenthesized expression', () => {
    expect(converter.convertStringToUserFriendlyExpression('~p=>((p&q)=>~p)')).toEqual(mocks.friendlyPropositionalExpression);
    expect(converter.convertStringToUserFriendlyExpression('((~p)=>((p&q)=>~p))')).toEqual(mocks.friendlyPropositionalExpression);
    expect(converter.convertStringToUserFriendlyExpression('~ (~p => q)')).toEqual(mocks.secondFriendlyExpression);
  });

  it('implication distribution tests', () => {
    expect(converter.convertToIDExpression('p', '~q', 'r|s')).toEqual(mocks.implicationDistributionExpression);
    expect(converter.convertExpressionToFormula(mocks.implicationDistributionExpression)).toEqual(mocks.implicationDistributionFormula);
    expect(converter.convertFormulaToUserFriendlyExpression(mocks.implicationDistributionFormula)).toEqual(
      mocks.friendlyImplicationDistributionExpression,
    );
  });
});
