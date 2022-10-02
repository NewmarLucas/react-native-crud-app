import React, { createContext, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

interface LoadingContextInterface {
  setLoading: (loading: boolean) => void;
  loading: boolean;
}

interface Props {
  children: React.ReactNode;
}

export const LoadingContext = createContext<LoadingContextInterface>(
  {} as LoadingContextInterface
);

const LoadingProvider = ({ children }: Props) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ setLoading, loading }}>
      {children}
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size='large' color='#19A0CB' />
        </View>
      )}
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;

const styles = StyleSheet.create({
  loadingContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    justifyContent: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
});
