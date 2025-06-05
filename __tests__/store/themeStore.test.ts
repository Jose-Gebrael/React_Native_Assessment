import {useThemeStore} from '../../src/store/themeStore';

describe('themeStore', () => {
  beforeEach(() => {
    // Reset state before each test
    useThemeStore.setState({
      isDarkMode: false,
      colors: {
        titleColor: '#000000',
        textColor: '#000000',
        appBackground: '#FFFFFF',
        blueButton: '#1C83FF',
        redButton: '#FF6347',
        inputBackground: '#FFFFFF',
        borderColor: '#666666',
        placeholderTextColor: '#999999',
        buttonTextColor: '#FFFFFF',
        textLinkColor: '#1C83FF',
        listBorderColor: '#000000',
        separatorColor: '#000000',
        cardBackgroundColor: '#f8f8f8',
      },
      hydrated: false,
    });
  });

  it('should start with light theme', () => {
    const state = useThemeStore.getState();
    expect(state.isDarkMode).toBe(false);
    expect(state.colors.appBackground).toBe('#FFFFFF');
  });

  it('should toggle to dark theme', () => {
    useThemeStore.getState().toggleTheme();
    const state = useThemeStore.getState();
    expect(state.isDarkMode).toBe(true);
    expect(state.colors.appBackground).toBe('#121212');
  });

  it('should toggle back to light theme', () => {
    useThemeStore.getState().toggleTheme(); // to dark
    useThemeStore.getState().toggleTheme(); // back to light
    const state = useThemeStore.getState();
    expect(state.isDarkMode).toBe(false);
    expect(state.colors.appBackground).toBe('#FFFFFF');
  });
});
