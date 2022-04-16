import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { combineReducers } from '@reduxjs/toolkit';
import { settingsInitialState, settingsSlice } from 'store/settings/slice';
import { testTabs } from '__mocks__/test-data/tablist';
import renderWithRedux from 'helpers/test-utils/render-with-redux';
import { TabListProps } from 'types';

import TabList from 'components/tab-list';

const testProps: TabListProps = {
  tabs: testTabs,
};

const mockedReducer = combineReducers({
  settings: settingsSlice.reducer,
});

const mockedState = {
  settings: settingsInitialState,
};

describe('Tablist component:', () => {
  it('renders the tablist', () => {
    renderWithRedux(<TabList {...testProps} />, mockedReducer, mockedState);
    expect(screen.getByRole('tablist')).toBeInTheDocument();
    screen.debug();
  });
});
