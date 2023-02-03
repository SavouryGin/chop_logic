import { settingsActions as actions, settingsSlice as slice, settingsInitialState as state } from '..';

describe('settingsSlice tests:', () => {
  it('should return the initial state', () => {
    expect(slice.reducer(undefined, { type: undefined })).toEqual(state);
  });

  it('should handle the reset action', () => {
    expect(slice.reducer({ ...state, language: 'ru' }, actions.resetSettings())).toEqual(state);
  });

  it('should set up a flag correctly', () => {
    expect(slice.reducer(state, actions.setUpFlag({ flag: 'isDarkMode', value: true }))).toEqual({
      ...state,
      flags: { ...state.flags, isDarkMode: true },
    });
  });
});
