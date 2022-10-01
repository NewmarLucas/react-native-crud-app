import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { useNavigation } from '@react-navigation/native';

interface Props {
  text: string;
  showBackButton?: boolean;
}

export const Header = (props: Props) => {
  const navigation = useNavigation();
  const { text, showBackButton = false } = props;

  return (
    <View style={styles.container}>
      {showBackButton && (
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.leftButton}
        >
          <Feather name='chevron-left' size={35} color='#fff' />
        </TouchableOpacity>
      )}
      <Text style={styles.headerTitle}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 115,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: Constants.statusBarHeight,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 36,
    width: '70%',
    textAlign: 'center',
    fontFamily: 'InterSemiBold',
  },
  leftButton: {
    position: 'absolute',
    top: 40,
    left: 25,
  },
});
