import { LocalText } from 'types';

export class PropositionalError extends Error {
  readonly displayedErrorMessage: LocalText;

  constructor(message: string, displayedErrorMessage: LocalText) {
    super(message);
    this.name = 'PropositionalError';
    this.displayedErrorMessage = displayedErrorMessage;
  }
}
