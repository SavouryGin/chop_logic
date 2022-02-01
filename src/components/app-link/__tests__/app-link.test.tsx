import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { screen, render } from '@testing-library/react';
import AppLink from '../index';
import { Icon } from 'enums';

const testProps = {
  path: '/test',
  text: 'Test text',
  icon: Icon.Default,
  isNavigation: false,
  className: 'test-class-name',
};

describe('AppLink component:', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <AppLink {...testProps} />
      </BrowserRouter>,
    );
  });

  it('renders a link element', () => {
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('the link has href attribute with the correct value', () => {
    const href = `http://localhost${testProps.path}`;
    expect(screen.getByRole('link')).toHaveProperty('href', href);
  });

  it('the link contains the passed text', () => {
    expect(screen.getByRole('link')).toHaveTextContent(testProps.text);
  });

  it('contains all necessary class names', () => {
    expect(screen.getByTestId('app-link')).toHaveClass('app-link', testProps.className, testProps.icon);
  });
});
