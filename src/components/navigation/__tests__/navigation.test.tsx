import Navigation from '../index';
import React from 'react';
import renderWithRedux from 'helpers/test-utils/render-with-redux';
import { Page } from 'enums';
import { combineReducers } from '@reduxjs/toolkit';
import { fireEvent, screen } from '@testing-library/react';
import { routesMap } from 'router/map';
import { settingsInitialState, settingsSlice } from 'store/settings';

describe('Navigation component:', () => {
  const testProps = {
    className: 'test-class-name',
    isOpened: true,
  };

  const mockedReducer = combineReducers({ settings: settingsSlice.reducer });
  const mockedState = { settings: settingsInitialState };

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

  it('the amount of list items equals the number of top pages', () => {
    const pagesCount = routesMap.filter((item) => item.parentPageId === Page.Home).length;
    expect(screen.getAllByRole('listitem')).toHaveLength(pagesCount);
  });

  it('the list contains buttons to open nested links', async () => {
    const pagesCount = routesMap.length;
    const buttons = screen.getAllByRole('button');
    buttons.forEach((button) => {
      fireEvent.click(button);
    });

    const links = await screen.findAllByRole('link');
    expect(links).toHaveLength(pagesCount);
  });

  it('each list item displays the page title', async () => {
    const buttons = screen.getAllByRole('button');
    buttons.forEach((button) => {
      fireEvent.click(button);
    });

    const listItems = await screen.findAllByRole('listitem');
    for (let i = 0; i < listItems.length; i++) {
      expect(listItems[i]).toHaveTextContent(routesMap[i].title.en);
    }
  });

  it('each link has the page icon', async () => {
    const buttons = screen.getAllByRole('button');
    buttons.forEach((button) => {
      fireEvent.click(button);
    });

    const links = await screen.findAllByRole('link');
    for (let i = 0; i < links.length; i++) {
      expect(links[i]).toHaveClass(routesMap[i].icon);
    }
  });

  it('should match the snapshot', () => {
    const { asFragment } = renderWithRedux(<Navigation {...testProps} />, mockedReducer, mockedState);
    expect(asFragment()).toMatchSnapshot();
  });
});
