import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Header } from '../components';
import { DataInterface } from '../helpers/types';
import { formatCurrency } from '../helpers/utils';

export default function Update() {
  const route: RouteProp<{ params: { product: DataInterface } }, 'params'> =
    useRoute();
  const { product } = route.params;

  return (
    <View style={styles.container}>
      <Header text='Atualizar dados do produto' showBackButton />
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
