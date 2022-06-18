import React from 'react';
import renderWithRedux from 'helpers/test-utils/render-with-redux';
import { TabListProps } from 'types';
import { combineReducers } from '@reduxjs/toolkit';
import { fireEvent, screen } from '@testing-library/react';
import { settingsInitialState, settingsSlice } from 'store/settings/slice';
import { testTabs } from '__mocks__/data/tablist';

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
  });

  it('renders the correct number of tabs', () => {
    renderWithRedux(<TabList {...testProps} />, mockedReducer, mockedState);
    expect(screen.getAllByRole('tab')).toHaveLength(testTabs.length);
  });

  it('renders only one tabpanel', () => {
    renderWithRedux(<TabList {...testProps} />, mockedReducer, mockedState);
    expect(screen.getByRole('tabpanel')).toBeInTheDocument();
  });

  it('displays titles in the tabs', () => {
    renderWithRedux(<TabList {...testProps} />, mockedReducer, mockedState);
    const tabs = screen.getAllByRole('tab');
    for (let i = 0; i < tabs.length; i++) {
      expect(tabs[i]).toHaveTextContent(testTabs[i].tabTitle.en);
    }
  });

  it('the first tab is selected by default', () => {
    renderWithRedux(<TabList {...testProps} />, mockedReducer, mockedState);
    expect(screen.getByRole('tab', { selected: true })).toHaveAttribute('id', testTabs[0].tabId);
    // All others tabs are not selected
    expect(screen.getAllByRole('tab', { selected: false })).toHaveLength(testTabs.length - 1);
  });

  it('the defaultTabId property can change the selected by default tab', () => {
    const defaultId = testTabs[2].tabId;
    renderWithRedux(<TabList {...testProps} defaultTabId={defaultId} />, mockedReducer, mockedState);
    expect(screen.getByRole('tab', { selected: true })).toHaveAttribute('id', defaultId);
  });

  it('the tabpanel displays only the content for the selected tab', () => {
    renderWithRedux(<TabList {...testProps} />, mockedReducer, mockedState);
    const tabpanel = screen.getByRole('tabpanel');
    expect(tabpanel).toHaveTextContent('Tab content 1');
    expect(tabpanel).not.toHaveTextContent('Tab content 2');
    expect(tabpanel).not.toHaveTextContent('Tab content 3');
    expect(tabpanel).not.toHaveTextContent('Tab content 4');
  });

  it('user can select a new tab by clicking on it', () => {
    renderWithRedux(<TabList {...testProps} />, mockedReducer, mockedState);
    expect(screen.getByRole('tab', { selected: true })).toHaveAttribute('id', testTabs[0].tabId);
    const tabs = screen.getAllByRole('tab');
    fireEvent.click(tabs[1]);
    expect(screen.getByRole('tab', { selected: true })).toHaveAttribute('id', testTabs[1].tabId);
    fireEvent.click(tabs[3]);
    expect(screen.getByRole('tab', { selected: true })).toHaveAttribute('id', testTabs[3].tabId);
  });

  it('the content of the tabpanel changes when user clicks on a new tab', () => {
    renderWithRedux(<TabList {...testProps} />, mockedReducer, mockedState);
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Tab content 1');
    const tabs = screen.getAllByRole('tab');
    fireEvent.click(tabs[1]);
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Tab content 2');
    fireEvent.click(tabs[3]);
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Tab content 4');
  });

  it('the selected tab has different styles', () => {
    renderWithRedux(<TabList {...testProps} />, mockedReducer, mockedState);
    expect(screen.getByRole('tab', { selected: true })).toHaveClass('tab-list__tab', 'tab-list__tab_active');
    const notSelectedTabs = screen.getAllByRole('tab', { selected: false });
    for (const tab of notSelectedTabs) {
      expect(tab).not.toHaveClass('tab-list__tab_active');
      expect(tab).toHaveClass('tab-list__tab');
    }
  });
});
