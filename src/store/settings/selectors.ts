import { RootState } from 'store';

export const getIsNavigationOpen = (state: RootState): boolean => state.settings.isNavigationOpen;
