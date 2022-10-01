import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Constants from 'expo-constants';

interface Props {
  text?: string;
}

export const EmptyList = (props: Props) => {
  const { text } = props;

  return (
    <View style={styles.container}>
      <Feather name='search' size={35} color='#eee' />
      <Text style={styles.mainText}>Nada por aqui!</Text>
      {text && <Text style={styles.text}>{text}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 15,
    marginTop: 20,
  },
  mainText: {
    color: '#fff',
    fontFamily: 'InterBold',
    fontSize: 20,
  },
  text: {
    color: '#fff',
    fontFamily: 'InterMedium',
    fontSize: 16,
  },
});
