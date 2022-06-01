import parser from '../parser';
import testData from '__mocks__/test-data/propositions';
import { PropositionalError } from 'errors/propositional-error';

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
    expect(parser.splitExpressionByPosition(7, testData.propositionalExpression)).toEqual({
      firstArgument: testData.firstSubExpression,
      secondArgument: testData.secondSubExpression,
    });
    expect(parser.splitExpressionByPosition(18, testData.secondSubExpression)).toEqual({
      firstArgument: testData.thirdSubExpression,
      secondArgument: testData.fourthSubExpression,
    });
    expect(parser.splitExpressionByPosition(13, testData.thirdSubExpression)).toEqual({
      firstArgument: testData.secondVariable,
      secondArgument: testData.thirdVariable,
    });
  });

  it('splitExpressionByPosition() method throws an error if the given arguments are incorrect', () => {
    expect(() => {
      parser.splitExpressionByPosition(100, testData.firstSubExpression);
    }).toThrow(PropositionalError);
    expect(() => {
      parser.splitExpressionByPosition(-1, testData.firstSubExpression);
    }).toThrow(PropositionalError);
    expect(() => {
      parser.splitExpressionByPosition(2, testData.secondSubExpression);
    }).toThrow(PropositionalError);
    expect(() => {
      parser.splitExpressionByPosition(0, []);
    }).toThrow(PropositionalError);
  });

  it('removeSurroundingElements() method returns a correct propositional expression', () => {
    expect(parser.removeSurroundingElements([testData.parenthesis, ...testData.firstSubExpression, testData.parenthesis])).toEqual(
      testData.firstSubExpression,
    );
    expect(parser.removeSurroundingElements([testData.parenthesis, ...testData.secondSubExpression, testData.parenthesis])).toEqual(
      testData.secondSubExpression,
    );
    expect(parser.removeSurroundingElements([testData.parenthesis, testData.parenthesis])).toEqual([]);
    expect(parser.removeSurroundingElements([])).toEqual([]);
  });

  it('removeSurroundingElements() method returns a generic array', () => {
    expect(parser.removeSurroundingElements([1, 2, 3, 4, 5])).toEqual([2, 3, 4]);
    expect(parser.removeSurroundingElements(['a', 'b', 'c'])).toEqual(['b']);
    expect(parser.removeSurroundingElements(['a', 'c'])).toEqual([]);
    expect(parser.removeSurroundingElements([])).toEqual([]);
  });

  it('extractAllSubExpressions() method returns an array of correct propositional expressions', () => {
    expect(parser.extractAllSubExpressions([])).toEqual([]);
    expect(parser.extractAllSubExpressions(testData.propositionalExpression)).toEqual([
      testData.fourthVariable,
      testData.fourthSubExpression,
      testData.thirdVariable,
      testData.secondVariable,
      testData.thirdSubExpression,
      testData.secondSubExpression,
      testData.firstVariable,
      testData.firstSubExpression,
      testData.propositionalExpression,
    ]);
    expect(parser.extractAllSubExpressions(testData.secondSubExpression)).toEqual([
      testData.fourthVariable,
      testData.fourthSubExpression,
      testData.thirdVariable,
      testData.secondVariable,
      testData.thirdSubExpression,
      testData.secondSubExpression,
    ]);
    expect(parser.extractAllSubExpressions(testData.thirdSubExpression)).toEqual([
      testData.thirdVariable,
      testData.secondVariable,
      testData.thirdSubExpression,
    ]);
    expect(parser.extractAllSubExpressions(testData.fourthSubExpression)).toEqual([testData.fourthVariable, testData.fourthSubExpression]);
  });

  it('extractAllSubExpressions() method throws an error if the input expression is incorrect', () => {
    expect(() => {
      parser.extractAllSubExpressions([testData.parenthesis]);
    }).toThrow(PropositionalError);
    expect(() => {
      parser.extractAllSubExpressions([testData.parenthesis, ...testData.fourthSubExpression]);
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

  it('getAllIndexesOfTheSymbol() method returns an array of indexes', () => {
    expect(parser.getAllIndexesOfTheSymbol(testData.propositionalExpression, 'p')).toEqual([4, 11, 22]);
    expect(parser.getAllIndexesOfTheSymbol(testData.propositionalExpression, 'q')).toEqual([15]);
    expect(parser.getAllIndexesOfTheSymbol(testData.propositionalExpression, '=>')).toEqual([7, 18]);
    expect(parser.getAllIndexesOfTheSymbol(testData.firstSubExpression, '~')).toEqual([1]);
    expect(parser.getAllIndexesOfTheSymbol(testData.firstSubExpression, ')')).toEqual([4, 5]);
    expect(parser.getAllIndexesOfTheSymbol(testData.firstSubExpression, 's')).toEqual([]);
    expect(parser.getAllIndexesOfTheSymbol([], ')')).toEqual([]);
  });

  it('findMainOperator() method returns a correct propositional symbol', () => {
    expect(parser.findMainOperator(testData.propositionalExpression)).toEqual(testData.propositionalExpression[7]);
    expect(parser.findMainOperator(testData.firstSubExpression)).toEqual(testData.firstSubExpression[1]);
    expect(parser.findMainOperator(testData.secondSubExpression)).toEqual(testData.secondSubExpression[10]);
    expect(parser.findMainOperator(testData.thirdSubExpression)).toEqual(testData.thirdSubExpression[4]);
    expect(parser.findMainOperator(testData.fourthSubExpression)).toEqual(testData.fourthSubExpression[1]);
    expect(parser.findMainOperator(testData.firstVariable)).toEqual(testData.firstVariable[1]);
    expect(parser.findMainOperator(testData.secondVariable)).toEqual(testData.secondVariable[1]);
  });

  it('findMainOperator() method throws an error if the input expression is incorrect', () => {
    expect(() => {
      parser.findMainOperator([testData.parenthesis]);
    }).toThrow(PropositionalError);
    expect(() => {
      parser.findMainOperator([]);
    }).toThrow(PropositionalError);
    expect(() => {
      parser.findMainOperator([testData.parenthesis, testData.parenthesis, testData.parenthesis]);
    }).toThrow(PropositionalError);
  });
});
