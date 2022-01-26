import { RootState } from 'store';

export const getIsNavigationOpen = (state: RootState): boolean => state.settings.isNavigationOpen;
export const getIsSidebarOpen = (state: RootState): boolean => state.settings.isSidebarOpen;
