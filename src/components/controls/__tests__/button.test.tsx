import Button from '../button/index';
import React from 'react';
import renderWithRedux from 'utils/testing/render-with-redux';
import userEvent from '@testing-library/user-event';
import { ButtonID, Icon } from 'enums';
import { buttonTexts } from 'utils/texts';
import { combineReducers } from '@reduxjs/toolkit';
import { screen } from '@testing-library/react';
import { settingsInitialState, settingsSlice } from 'store/settings';

describe('Button component:', () => {
  const testProps = {
    icon: Icon.Default,
    buttonId: ButtonID.Cancel,
  };

  const mockedReducer = combineReducers({ settings: settingsSlice.reducer });
  const mockedState = { settings: settingsInitialState };

  it('renders the button element with the default type', () => {
    renderWithRedux(<Button {...testProps} />, mockedReducer, mockedState);
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveProperty('type', 'button');
  });

  it('has the passed class names', () => {
    renderWithRedux(
      <Button {...testProps} className={{ 'test-class-1': true, 'test-class-2': false, 'test-class-3': true }} />,
      mockedReducer,
      mockedState,
    );
    expect(screen.getByRole('button')).toHaveClass('button', 'test-class-1', 'test-class-3');
  });

  it('has the passed type', () => {
    renderWithRedux(<Button {...testProps} type='reset' />, mockedReducer, mockedState);
    expect(screen.getByRole('button')).toHaveProperty('type', 'reset');
  });

  it('has the passed text', () => {
    renderWithRedux(<Button {...testProps} text='test-text' />, mockedReducer, mockedState);
    expect(screen.getByText('test-text')).toBeInTheDocument();
  });

  it('fires the onClick handler', async () => {
    const onClick = jest.fn();
    renderWithRedux(<Button {...testProps} onClick={onClick} />, mockedReducer, mockedState);
    const btn = screen.getByRole('button');
    await userEvent.click(btn);
    expect(onClick).toHaveBeenCalledTimes(1);
    await userEvent.dblClick(btn);
    expect(onClick).toHaveBeenCalledTimes(3);
  });

  it('has the title attribute', () => {
    renderWithRedux(<Button {...testProps} />, mockedReducer, mockedState);
    const title = buttonTexts[testProps.buttonId].title.en;
    expect(screen.getByRole('button')).toHaveProperty('title', title);
  });

  it('the text container has the icon class name', () => {
    renderWithRedux(<Button {...testProps} text='Test' />, mockedReducer, mockedState);
    expect(screen.getByText('Test')).toHaveClass(testProps.icon);
  });

  it('should match the snapshot', () => {
    const { asFragment } = renderWithRedux(<Button {...testProps} text='Test' />, mockedReducer, mockedState);
    expect(asFragment()).toMatchSnapshot();
  });
});
