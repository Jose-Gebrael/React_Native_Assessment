import 'react-native-gesture-handler/jestSetup';

jest.mock('@react-native-async-storage/async-storage', () => ({
  __esModule: true,
  default: {
    setItem: jest.fn(),
    getItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  },
}));

jest.mock('react-native-maps', () => {
  const React = require('react');
  const {View} = require('react-native');

  const MockMapView = props => <View>{props.children}</View>;
  const MockMarker = props => <View>{props.children}</View>;

  return {
    __esModule: true,
    default: MockMapView,
    MapView: MockMapView,
    Marker: MockMarker,
    PROVIDER_GOOGLE: 'google',
  };
});

jest.mock('react-native-gesture-handler', () => {
  // Mock RNGH for testing
  return {
    __esModule: true,
    default: {},
    GestureHandlerRootView: ({children}) => children,
    Swipeable: () => null,
    DrawerLayout: () => null,
    State: {},
    PanGestureHandler: () => null,
    TapGestureHandler: () => null,
    LongPressGestureHandler: () => null,
    FlingGestureHandler: () => null,
    Directions: {},
  };
});

jest.mock('react-native-onesignal', () => {
  return {
    __esModule: true,
    default: {
      setAppId: jest.fn(),
      promptForPushNotificationsWithUserResponse: jest.fn(),
      setNotificationOpenedHandler: jest.fn(),
      setNotificationWillShowInForegroundHandler: jest.fn(),
      getDeviceState: jest.fn().mockResolvedValue({
        userId: 'mock-user-id',
        isSubscribed: true,
      }),
      addPermissionObserver: jest.fn(),
      removeEventListener: jest.fn(),
    },
  };
});
