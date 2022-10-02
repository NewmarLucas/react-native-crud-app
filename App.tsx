import React from 'react';
import { useFonts } from 'expo-font';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import ModalProvider from './src/providers/Modal';
import Routes from './src/routes';
import LoadingProvider from './src/providers/Loading';

export default function App() {
  const [loaded] = useFonts({
    InterBold: require('./src/assets/fonts/Inter-Bold.ttf'),
    InterLight: require('./src/assets/fonts/Inter-Light.ttf'),
    InterMedium: require('./src/assets/fonts/Inter-Medium.ttf'),
    InterSemiBold: require('./src/assets/fonts/Inter-SemiBold.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <LoadingProvider>
        <ModalProvider>
          <Routes />
        </ModalProvider>
      </LoadingProvider>
    </SafeAreaProvider>
  );
}
