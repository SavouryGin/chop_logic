import React from 'react';
import ShowMoreButton from '../show-more-button';
import renderWithRedux from 'utils/test-utils/render-with-redux';
import userEvent from '@testing-library/user-event';
import { combineReducers } from '@reduxjs/toolkit';
import { screen } from '@testing-library/react';
import { settingsInitialState, settingsSlice } from 'store/settings';

describe('ShowMoreButton component:', () => {
  const testProps = {
    onClick: jest.fn(),
    isOpened: true,
  };

  const mockedReducer = combineReducers({ settings: settingsSlice.reducer });
  const mockedState = { settings: settingsInitialState };

  it('renders the button element with the default type', () => {
    renderWithRedux(<ShowMoreButton {...testProps} />, mockedReducer, mockedState);
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveProperty('type', 'button');
  });

  it('has the passed class names', () => {
    renderWithRedux(
      <ShowMoreButton {...testProps} className={{ 'test-class-1': true, 'test-class-2': false, 'test-class-3': true }} />,
      mockedReducer,
      mockedState,
    );
    expect(screen.getByRole('button')).toHaveClass('show-more-button', 'test-class-1', 'test-class-3', 'chop-icon__caret-up');
  });

  it('fires the onClick handler', async () => {
    renderWithRedux(<ShowMoreButton {...testProps} />, mockedReducer, mockedState);
    const btn = screen.getByRole('button');
    await userEvent.click(btn);
    expect(testProps.onClick).toHaveBeenCalledTimes(1);
    await userEvent.dblClick(btn);
    expect(testProps.onClick).toHaveBeenCalledTimes(3);
  });

  it('could be disabled', () => {
    renderWithRedux(<ShowMoreButton {...testProps} isDisabled={true} />, mockedReducer, mockedState);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should match the snapshot', () => {
    const { asFragment } = renderWithRedux(<ShowMoreButton {...testProps} />, mockedReducer, mockedState);
    expect(asFragment()).toMatchSnapshot();
  });
});
