import React from 'react';
import { screen, render } from '@testing-library/react';

import Button from '../index';
import userEvent from '@testing-library/user-event';

describe('Button component:', () => {
  it('renders the button element with the default type', () => {
    render(<Button />);
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveProperty('type', 'button');
  });

  it('has the passed class names', () => {
    render(<Button className={{ 'test-class-1': true, 'test-class-2': false, 'test-class-3': true }} />);
    expect(screen.getByRole('button')).toHaveClass('button', 'test-class-1', 'test-class-3');
  });

  it('has the passed type', () => {
    render(<Button type='reset' />);
    expect(screen.getByRole('button')).toHaveProperty('type', 'reset');
  });

  it('has the passed text', () => {
    render(<Button text='test-text' />);
    expect(screen.getByText('test-text')).toBeInTheDocument();
  });

  it('fires the onClick handler', () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick} />);
    const btn = screen.getByRole('button');
    userEvent.click(btn);
    expect(onClick).toHaveBeenCalledTimes(1);
    userEvent.dblClick(btn);
    expect(onClick).toHaveBeenCalledTimes(3);
  });
});
