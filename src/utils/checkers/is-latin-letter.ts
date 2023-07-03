import regularExpressions from 'utils/regular-expressions';

export function isLatinLetter(input: string): boolean {
  return input.length === 1 && regularExpressions.onlyLatinLetters.test(input);
}
