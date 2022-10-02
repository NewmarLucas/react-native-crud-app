import React from 'react';
import { StyleSheet, Text, TextInput } from 'react-native';

interface Props {
  value: string | number;
  label: string;
  onChangeText: (text: string) => void;
  type?:
    | 'default'
    | 'numeric'
    | 'email-address'
    | 'ascii-capable'
    | 'numbers-and-punctuation'
    | 'url'
    | 'number-pad'
    | 'phone-pad'
    | 'name-phone-pad'
    | 'decimal-pad'
    | 'twitter'
    | 'web-search'
    | 'visible-password';
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
        keyboardType={type ?? 'default'}
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
    backgroundColor: '#666',
    color: '#fff',
    fontFamily: 'InterMedium',
    fontSize: 16,
  },
  label: {
    marginBottom: 5,
    color: '#fff',
    fontFamily: 'InterMedium',
  },
});
