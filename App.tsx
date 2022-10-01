import React from 'react';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import ModalProvider from './src/providers/Modal';
import Routes from './src/routes';

export default function App() {
  return (
    <SafeAreaProvider>
      <ModalProvider>
        <Routes />
      </ModalProvider>
    </SafeAreaProvider>
  );
}
