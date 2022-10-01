import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

interface Props {
  action: () => void;
  text: string;
  isDeleteButton?: boolean;
  style?: object;
}

export const RoundedButton = (props: Props) => {
  const { action, text, isDeleteButton = false, style = {} } = props;

  return (
    <TouchableOpacity
      onPress={action}
      style={{
        ...styles.button,
        ...style,
        backgroundColor: isDeleteButton ? '#E20C0C' : '#19A0CB',
      }}
    >
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',

    borderRadius: 100,
    paddingVertical: 13,
  },
  text: {
    textAlign: 'center',
    color: '#fff',
    fontFamily: 'InterMedium',
    fontSize: 16,
  },
});
