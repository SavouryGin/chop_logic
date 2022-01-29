import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Icon } from 'enums';

import Button from '../index';

const testProps = {
  icon: Icon.Default,
  title: 'Test title',
};

describe('Button component:', () => {
  it('renders the button element with the default type', () => {
    render(<Button {...testProps} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveProperty('type', 'button');
  });

  it('has the passed class names', () => {
    render(<Button {...testProps} className={{ 'test-class-1': true, 'test-class-2': false, 'test-class-3': true }} />);
    expect(screen.getByRole('button')).toHaveClass('button', 'test-class-1', 'test-class-3');
  });

  it('has the passed type', () => {
    render(<Button {...testProps} type='reset' />);
    expect(screen.getByRole('button')).toHaveProperty('type', 'reset');
  });

  it('has the passed text', () => {
    render(<Button {...testProps} text='test-text' />);
    expect(screen.getByText('test-text')).toBeInTheDocument();
  });

  it('fires the onClick handler', () => {
    const onClick = jest.fn();
    render(<Button {...testProps} onClick={onClick} />);
    const btn = screen.getByRole('button');
    userEvent.click(btn);
    expect(onClick).toHaveBeenCalledTimes(1);
    userEvent.dblClick(btn);
    expect(onClick).toHaveBeenCalledTimes(3);
  });

  it('has the title attribute', () => {
    render(<Button {...testProps} />);
    expect(screen.getByRole('button')).toHaveProperty('title', testProps.title);
  });

  it('the text container has the icon class name', () => {
    render(<Button {...testProps} text='Test' />);
    expect(screen.getByText('Test')).toHaveClass(testProps.icon);
  });
});
