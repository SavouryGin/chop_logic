import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { SettingsFlags } from './interfaces';

export const getGenerateSalesInvoiceFlags = (state: RootState): SettingsFlags => state.settings.flags;

export const getIsNavigationOpen = createSelector(getGenerateSalesInvoiceFlags, (data: SettingsFlags): boolean => data.isNavigationOpen);
export const getIsSidebarOpen = createSelector(getGenerateSalesInvoiceFlags, (data: SettingsFlags): boolean => data.isSidebarOpen);
