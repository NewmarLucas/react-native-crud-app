import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

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
  error?: string;
}

export const TextInputFilled = (props: Props) => {
  const { value, onChangeText, label, type, error } = props;

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}:</Text>
      <TextInput
        value={`${value}`}
        style={styles.input}
        onChangeText={onChangeText}
        placeholderTextColor='#999'
        keyboardType={type ?? 'default'}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    position: 'relative',
    marginBottom: 20,
    width: '100%',
  },
  input: {
    height: 50,
    width: '100%',
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
  errorText: {
    color: '#E15A5A',
    fontFamily: 'InterBold',
  },
});
