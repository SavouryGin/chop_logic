import parenthesizer from '../parenthesizer';
import testData from '__mocks__/test-data/propositions';

describe('Parenthesizer tests', () => {
  it('parenthesizeVariables() test', () => {
    expect(parenthesizer.parenthesizeVariables([testData.oneVariableExpression[1]])).toEqual(testData.oneVariableExpression);
    expect(
      parenthesizer.parenthesizeVariables([
        testData.propositionalSymbols[5],
        testData.propositionalSymbols[1],
        testData.propositionalSymbols[5],
      ]),
    ).toEqual(testData.twoVariablesExpression);
  });

  it('parenthesizeNegations() test with one negation', () => {
    expect(parenthesizer.parenthesizeNegations(testData.oneVariableExpression)).toEqual(testData.oneVariableExpression);
    const testInput = [
      testData.propositionalSymbols[0],
      { ...testData.propositionalSymbols[7], position: 1 },
      { ...testData.propositionalSymbols[5], position: 2 },
      { ...testData.propositionalSymbols[6], position: 3 },
    ];

    expect(parenthesizer.parenthesizeNegations(testInput)).toEqual(testData.oneNegationExpression);
  });

  it('parenthesizeNegations() test with three negations', () => {
    const testInput = [
      testData.propositionalSymbols[0],
      { ...testData.propositionalSymbols[0], position: 1 },
      { ...testData.propositionalSymbols[0], position: 2 },
      { ...testData.propositionalSymbols[7], position: 3 },
      { ...testData.propositionalSymbols[5], position: 4 },
      { ...testData.propositionalSymbols[6], position: 5 },
    ];
    expect(parenthesizer.parenthesizeNegations(testInput)).toEqual(testData.threeNegationsExpression);
  });

  it('parenthesizeNegations() test without negations', () => {
    expect(parenthesizer.parenthesizeNegations(testData.oneVariableExpression)).toEqual(testData.oneVariableExpression);
  });
});
