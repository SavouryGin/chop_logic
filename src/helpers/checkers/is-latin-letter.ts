import regularExpressions from 'helpers/regular-expressions';

export function isLatinLetter(input: string): boolean {
  return input.length === 1 && regularExpressions.onlyLatinLetters.test(input);
}
