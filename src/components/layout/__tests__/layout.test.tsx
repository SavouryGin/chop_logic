import React from 'react';
import { render, screen } from '@testing-library/react';
import Layout from '../index';

describe('Layout component:', () => {
  beforeEach(() => {
    render(<Layout />);
  });

  it('renders correctly', () => {
    screen.debug();
  });
});
