import crypto from 'crypto';
import '@testing-library/jest-dom/extend-expect';

Object.defineProperty(globalThis, 'crypto', {
  value: {
    randomUUID: () => crypto.randomUUID(),
  },
});
