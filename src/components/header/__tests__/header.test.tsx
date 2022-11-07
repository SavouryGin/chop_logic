import Header from '../index';
import React from 'react';
import renderWithRedux from 'helpers/test-utils/render-with-redux';
import { ButtonID, Icon } from 'enums';
import { combineReducers } from '@reduxjs/toolkit';
import { fireEvent, screen } from '@testing-library/react';
import { settingsInitialState, settingsSlice } from 'store/settings/slice';

const mockedReducer = combineReducers({
  settings: settingsSlice.reducer,
});

const mockedState = {
  settings: settingsInitialState,
};

describe('Header component:', () => {
  beforeEach(() => {
    renderWithRedux(<Header />, mockedReducer, mockedState);
  });

  it('renders the header element', () => {
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
    expect(header).toHaveClass('header');
  });

  it('contains six basic buttons', () => {
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(6);
    for (const button of buttons) {
      expect(button).toHaveClass('button');
      expect(button).toHaveProperty('type', 'button');
    }
  });

  it('contains the link with the heading text', () => {
    const link = screen.getByRole('link');
    expect(link).toHaveTextContent('Chop Logic');
  });

  it('all the buttons have the correct default icons', () => {
    expect(screen.getByTestId(`button_id_${ButtonID.Navigation}`)).toHaveClass(Icon.Menu);
    expect(screen.getByTestId(`button_id_${ButtonID.ColorTheme}`)).toHaveClass(Icon.DarkMode);
    expect(screen.getByTestId(`button_id_${ButtonID.Sounds}`)).toHaveClass(Icon.NoSound);
    expect(screen.getByTestId(`button_id_${ButtonID.Settings}`)).toHaveClass(Icon.Settings);
    expect(screen.getByTestId(`button_id_${ButtonID.FullScreen}`)).toHaveClass(Icon.Enlarge);
    expect(screen.getByTestId(`button_id_${ButtonID.Tools}`)).toHaveClass(Icon.Sidebar);
  });

  it('all the buttons are clickable and change icons', () => {
    const navBtn = screen.getByTestId(`button_id_${ButtonID.Navigation}`);
    const colorBtn = screen.getByTestId(`button_id_${ButtonID.ColorTheme}`);
    const settingsBtn = screen.getByTestId(`button_id_${ButtonID.Settings}`);
    const fullScreenBtn = screen.getByTestId(`button_id_${ButtonID.FullScreen}`);
    const toolsBtn = screen.getByTestId(`button_id_${ButtonID.Tools}`);

    fireEvent.click(navBtn);
    fireEvent.click(colorBtn);
    fireEvent.click(settingsBtn);
    fireEvent.click(fullScreenBtn);
    fireEvent.click(toolsBtn);

    expect(navBtn).toHaveClass(Icon.Left);
    expect(colorBtn).toHaveClass(Icon.LightMode);
    expect(settingsBtn).toHaveClass(Icon.Settings);
    expect(fullScreenBtn).toHaveClass(Icon.Shrink);
    expect(toolsBtn).toHaveClass(Icon.Right);
  });

  it('should match the snapshot', () => {
    const { asFragment } = renderWithRedux(<Header />, mockedReducer, mockedState);
    expect(asFragment()).toMatchSnapshot();
  });

  it('the settings buttons opens a popup', () => {
    const settingsBtn = screen.getByTestId(`button_id_${ButtonID.Settings}`);
    fireEvent.click(settingsBtn);
    expect(screen.queryByRole('dialog')).toBeInTheDocument();
    expect(screen.queryByRole('form')).toBeInTheDocument();

    const cancelBtn = screen.queryByTitle('Cancel');
    if (cancelBtn) {
      fireEvent.click(cancelBtn);
      expect(screen.queryByRole('dialog')).toBeInTheDocument();
    }
  });

  it('the settings have correct inputs', () => {
    const settingsBtn = screen.getByTestId(`button_id_${ButtonID.Settings}`);
    fireEvent.click(settingsBtn);
    expect(screen.queryByRole('combobox')).toBeInTheDocument();
    expect(screen.queryByLabelText('Language')).toBeInTheDocument();
    expect(screen.queryByLabelText('Dark Mode')).toBeInTheDocument();
    expect(screen.queryByLabelText('Sounds')).toBeInTheDocument();
    expect(screen.queryByTitle('Apply')).toBeInTheDocument();
  });
});
