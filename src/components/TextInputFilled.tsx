import React from 'react';
import { StyleSheet, Text, TextInput } from 'react-native';

interface Props {
  value: string | number;
  label: string;
  onChangeText: (text: string) => void;
  type?: string;
}

export const TextInputFilled = (props: Props) => {
  const { value, onChangeText, label, type } = props;

  return (
    <>
      <Text style={styles.label}>{label}:</Text>
      <TextInput
        value={`${value}`}
        style={styles.input}
        onChangeText={onChangeText}
        placeholderTextColor='#999'
      />
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    width: '100%',
    marginBottom: 20,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    color: '#000',
    fontFamily: 'InterMedium',
    fontSize: 16,
  },
  label: {
    marginBottom: 5,
    color: '#fff',
    fontFamily: 'InterMedium',
  },
});
