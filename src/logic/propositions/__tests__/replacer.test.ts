import mocks from '__mocks__/data/propositions';
import replacer from '../replacer';

describe('Propositions replacer tests', () => {
  it('correctly replace a variable in the table item', () => {
    expect(replacer.replacePropositionalVariableInTableItems(mocks.testTableItem, 'Z', 'P')).toEqual(
      mocks.testTableItemWithReplacedVariable,
    );
  });

  it('correctly replace a variable in the expression', () => {
    expect(replacer.replaceVariableInPropositionalExpression(mocks.testTableItem[0].expression, 'Z', 'P')).toEqual(
      mocks.testTableItemWithReplacedVariable[0].expression,
    );
  });

  it('correctly replace a variable in the raw input', () => {
    expect(replacer.replaceVariableInRawInput(mocks.testTableItem[0].rawInput, 'Z', 'P')).toEqual(
      mocks.testTableItemWithReplacedVariable[0].rawInput,
    );
  });
});
