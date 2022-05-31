import parser from '../parser';
import { PropositionalError } from 'errors/propositional-error';
import {
  testFirstSubExpression,
  testFirstVariable,
  testFourthSubExpression,
  testFourthVariable,
  testParenthesis,
  testPropositionalExpression,
  testSecondSubExpression,
  testSecondVariable,
  testThirdSubExpression,
  testThirdVariable,
} from '__mocks__/test-data/propositions';

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
      firstArgument: testSecondVariable,
      secondArgument: testThirdVariable,
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
    expect(parser.removeSurroundingParenthesis([testParenthesis, ...testFirstSubExpression, testParenthesis])).toEqual(
      testFirstSubExpression,
    );
    expect(parser.removeSurroundingParenthesis([testParenthesis, ...testSecondSubExpression, testParenthesis])).toEqual(
      testSecondSubExpression,
    );
    expect(parser.removeSurroundingParenthesis([testParenthesis, testParenthesis])).toEqual([]);
    expect(parser.removeSurroundingParenthesis([])).toEqual([]);
  });

  it('extractAllSubExpressions() method returns an array of correct propositional expressions', () => {
    expect(parser.extractAllSubExpressions([])).toEqual([]);
    expect(parser.extractAllSubExpressions(testPropositionalExpression)).toEqual([
      testFourthVariable,
      testFourthSubExpression,
      testThirdVariable,
      testSecondVariable,
      testThirdSubExpression,
      testSecondSubExpression,
      testFirstVariable,
      testFirstSubExpression,
      testPropositionalExpression,
    ]);
    expect(parser.extractAllSubExpressions(testSecondSubExpression)).toEqual([
      testFourthVariable,
      testFourthSubExpression,
      testThirdVariable,
      testSecondVariable,
      testThirdSubExpression,
      testSecondSubExpression,
    ]);
    expect(parser.extractAllSubExpressions(testThirdSubExpression)).toEqual([
      testThirdVariable,
      testSecondVariable,
      testThirdSubExpression,
    ]);
    expect(parser.extractAllSubExpressions(testFourthSubExpression)).toEqual([testFourthVariable, testFourthSubExpression]);
  });

  it('extractAllSubExpressions() method throws an error if the input expression is incorrect', () => {
    expect(() => {
      parser.extractAllSubExpressions([testParenthesis]);
    }).toThrow(PropositionalError);
    expect(() => {
      parser.extractAllSubExpressions([testParenthesis, ...testFourthSubExpression]);
    }).toThrow(PropositionalError);
  });

  it('findClosestParenthesis() returns the closest index', () => {
    expect(parser.findClosestParenthesis(1, [2, 5, 4])).toBe(2);
    expect(parser.findClosestParenthesis(3, [2, 5, 4])).toBe(4);
    expect(parser.findClosestParenthesis(3, [2, 5, 6, 7])).toBe(5);
  });

  it('findClosestParenthesis() throws an error if inputs are invalid', () => {
    expect(() => {
      parser.findClosestParenthesis(6, [2, 5, 4]);
    }).toThrow(PropositionalError);
    expect(() => {
      parser.findClosestParenthesis(-1, [-2, -5, -4]);
    }).toThrow(PropositionalError);
    expect(() => {
      parser.findClosestParenthesis(Infinity, [NaN, NaN, NaN]);
    }).toThrow(PropositionalError);
  });
});
