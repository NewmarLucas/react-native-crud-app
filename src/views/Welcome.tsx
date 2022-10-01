import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header } from '../components';

export default function Welcome() {
  return (
    <View style={styles.container}>
      <Header text='Indice' />
      <Text>Oi</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#383838',
  },
});
