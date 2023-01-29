import Label from 'components/controls/label';
import React from 'react';
import { Icon } from 'enums';
import { render, screen } from '@testing-library/react';

describe('Label component:', () => {
  const testProps = {
    text: 'test-label',
    id: 'test-id',
  };

  it('renders the label component', () => {
    render(<Label {...testProps} />);
    const label = screen.getByTestId('label-test-id');
    expect(label).toBeInTheDocument();
    expect(label).toHaveClass('label');
  });

  it('the label has the passed text', () => {
    render(<Label {...testProps} />);
    const text = screen.getByText(testProps.text);
    expect(text).toBeInTheDocument();
    expect(text).toHaveClass('label__text');
  });

  it('displays the required sign', () => {
    render(<Label {...testProps} isRequired />);
    const requiredSign = screen.getByTitle('required');
    expect(requiredSign).toBeInTheDocument();
    expect(requiredSign).toHaveClass('label__asterisk', Icon.Required);
  });

  it('should match the snapshot', () => {
    const { asFragment } = render(<Label {...testProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
