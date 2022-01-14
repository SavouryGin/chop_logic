import { RootState } from 'store';

export const getIsMenuOpenStatus = (state: RootState): boolean => state.settings.isMenuOpen;
