import { LogicalSymbolRawInput } from 'enums';
import constants from './constants';

const validator = {
  isNotPropositionalVariable(char: string): boolean {
    return constants.logicalOperators.includes(char as LogicalSymbolRawInput) || constants.parentheses.includes(char);
  },
};

export default Object.freeze(validator);
