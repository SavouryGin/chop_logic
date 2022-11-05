import App from 'app';
import React from 'react';
import { render, screen } from '@testing-library/react';

describe('Test App component:', () => {
  it('should display layout components', () => {
    render(<App />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('article')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('should render the home page by default', () => {
    render(<App />);
    expect(screen.getByRole('article')).toHaveClass('home');
  });

  it('should match the snapshot', () => {
    const { asFragment } = render(<App />);
    expect(asFragment()).toMatchSnapshot();
  });
});
