export class PropositionalError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PropositionalError';
  }
}
