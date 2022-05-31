import React from 'react';
import renderWithRedux from 'helpers/test-utils/render-with-redux';
import { combineReducers } from '@reduxjs/toolkit';
import { routesMap } from 'components/app-router/map';
import { screen } from '@testing-library/react';
import { settingsInitialState, settingsSlice } from 'store/settings/slice';

import Navigation from '../index';

const testProps = {
  className: 'test-class-name',
};

const mockedReducer = combineReducers({
  settings: settingsSlice.reducer,
});

const mockedState = {
  settings: settingsInitialState,
};

describe('Navigation component:', () => {
  const pagesCount = routesMap.length;

  beforeEach(() => {
    renderWithRedux(<Navigation {...testProps} />, mockedReducer, mockedState);
  });

  it('renders a nav element', () => {
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
    expect(nav).toHaveClass('navigation', testProps.className);
  });

  it('contains the header', () => {
    const header = screen.getByText('Navigation', { exact: true });
    expect(header).toBeInTheDocument();
    expect(header).toHaveClass('navigation__header');
  });

  it('contains a list element', () => {
    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();
    expect(list).toHaveClass('navigation__list');
  });

  it('the amount of list items equals the number of pages', () => {
    expect(screen.getAllByRole('listitem')).toHaveLength(pagesCount);
  });

  it('each list item displays the page title', () => {
    const listItems = screen.getAllByRole('listitem');
    for (let i = 0; i < listItems.length; i++) {
      expect(listItems[i]).toHaveTextContent(routesMap[i].title.en);
    }
  });

  it('the amount of links equals the number of pages', () => {
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(pagesCount);
  });

  it('each link has the page icon', () => {
    const links = screen.getAllByRole('link');
    for (let i = 0; i < links.length; i++) {
      expect(links[i]).toHaveClass(routesMap[i].icon);
    }
  });
});
