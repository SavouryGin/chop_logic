import React from 'react';
import Tooltip from 'components/tooltip';
import renderWithRedux from 'helpers/test-utils/render-with-redux';
import userEvent from '@testing-library/user-event';
import { combineReducers } from '@reduxjs/toolkit';
import { screen } from '@testing-library/react';
import { settingsInitialState, settingsSlice } from 'store/settings/slice';

const testProps = {
  text: 'test tooltip info',
  id: 'test-id',
};

const mockedReducer = combineReducers({
  settings: settingsSlice.reducer,
});

const mockedState = {
  settings: settingsInitialState,
};

describe('Tooltip component:', () => {
  const testChildText = 'Test text';

  it('matches the snapshot', () => {
    const { asFragment } = renderWithRedux(<Tooltip {...testProps}>{testChildText}</Tooltip>, mockedReducer, mockedState);
    expect(asFragment()).toMatchSnapshot();
  });

  it('shows the tooltip text on hover', async () => {
    renderWithRedux(<Tooltip {...testProps}>{testChildText}</Tooltip>, mockedReducer, mockedState);
    expect(screen.queryByText(testProps.text)).not.toBeInTheDocument();
    const element = screen.getByText(testChildText);
    await userEvent.hover(element);
    expect(screen.queryByText(testProps.text)).toBeInTheDocument();
  });
});
