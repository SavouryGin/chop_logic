import { PropositionalError } from 'errors/propositional-error';
import {
  testFirstSubExpression,
  testFourthSubExpression,
  testPropositionalExpression,
  testSecondSubExpression,
  testThirdSubExpression,
} from '__mocks__/test-data/propositions';
import parser from '../parser';

describe('Propositions parser tests', () => {
  it('getCharsArray() method returns a correct array', () => {
    expect(parser.getCharsArray('abc')).toEqual(['a', 'b', 'c']);
    expect(parser.getCharsArray('a b c')).toEqual(['a', 'b', 'c']);
    expect(parser.getCharsArray('   a  bc  ')).toEqual(['a', 'b', 'c']);
    expect(parser.getCharsArray('')).toEqual([]);
    expect(parser.getCharsArray('1')).toEqual(['1']);
  });

  it('joinLogicalSymbols() method returns a correct array', () => {
    expect(parser.joinLogicalSymbols(['a', 'b', 'c'])).toEqual(['a', 'b', 'c']);
    expect(parser.joinLogicalSymbols(['=', '>'])).toEqual(['=>']);
    expect(parser.joinLogicalSymbols(['<', '=', '>'])).toEqual(['<=>']);
    expect(parser.joinLogicalSymbols(['<', '=', '>', 'a', 'b'])).toEqual(['<=>', 'a', 'b']);
    expect(parser.joinLogicalSymbols(['a', '=', '>', 'c'])).toEqual(['a', '=>', 'c']);
    expect(parser.joinLogicalSymbols(['a', '&', 'c'])).toEqual(['a', '&', 'c']);
  });

  it('splitExpressionByPosition() method returns two sub expressions', () => {
    expect(parser.splitExpressionByPosition(7, testPropositionalExpression)).toEqual({
      firstArgument: testFirstSubExpression,
      secondArgument: testSecondSubExpression,
    });
    expect(parser.splitExpressionByPosition(18, testSecondSubExpression)).toEqual({
      firstArgument: testThirdSubExpression,
      secondArgument: testFourthSubExpression,
    });
    expect(parser.splitExpressionByPosition(13, testThirdSubExpression)).toEqual({
      firstArgument: [
        {
          input: '(',
          representation: '(',
          type: 'parentheses',
          position: 10,
        },
        {
          input: 'p',
          representation: 'P',
          type: 'variable',
          position: 11,
        },
        {
          input: ')',
          representation: ')',
          type: 'parentheses',
          position: 12,
        },
      ],
      secondArgument: [
        {
          input: '(',
          representation: '(',
          type: 'parentheses',
          position: 14,
        },
        {
          input: 'q',
          representation: 'Q',
          type: 'variable',
          position: 15,
        },
        {
          input: ')',
          representation: ')',
          type: 'parentheses',
          position: 16,
        },
      ],
    });
  });

  it('splitExpressionByPosition() method throws an error if the given arguments are incorrect', () => {
    expect(() => {
      parser.splitExpressionByPosition(100, testFirstSubExpression);
    }).toThrow(PropositionalError);
    expect(() => {
      parser.splitExpressionByPosition(-1, testFirstSubExpression);
    }).toThrow(PropositionalError);
    expect(() => {
      parser.splitExpressionByPosition(2, testSecondSubExpression);
    }).toThrow(PropositionalError);
    expect(() => {
      parser.splitExpressionByPosition(0, []);
    }).toThrow(PropositionalError);
  });

  it('removeSurroundingParenthesis() method returns a correct propositional expression', () => {
    expect(
      parser.removeSurroundingParenthesis([
        {
          input: '(',
          representation: '(',
          type: 'parentheses',
          position: 0,
        },
        ...testFirstSubExpression,
        {
          input: '(',
          representation: '(',
          type: 'parentheses',
          position: 1,
        },
      ]),
    ).toEqual(testFirstSubExpression);
    expect(
      parser.removeSurroundingParenthesis([
        {
          input: '(',
          representation: '(',
          type: 'parentheses',
          position: 0,
        },
        ...testSecondSubExpression,
        {
          input: '(',
          representation: '(',
          type: 'parentheses',
          position: 1,
        },
      ]),
    ).toEqual(testSecondSubExpression);
    expect(
      parser.removeSurroundingParenthesis([
        {
          input: '(',
          representation: '(',
          type: 'parentheses',
          position: 0,
        },
        {
          input: '(',
          representation: '(',
          type: 'parentheses',
          position: 1,
        },
      ]),
    ).toEqual([]);
    expect(parser.removeSurroundingParenthesis([])).toEqual([]);
  });
});
