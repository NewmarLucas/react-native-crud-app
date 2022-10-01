import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Header } from '../components';
import { DataInterface } from '../helpers/types';
import { formatCurrency } from '../helpers/utils';

export default function Details() {
  const route: RouteProp<{ params: { product: DataInterface } }, 'params'> =
    useRoute();
  const { product } = route.params;

  return (
    <View style={styles.container}>
      <Header text='Produto selecionado' showBackButton />

      {product && (
        <ScrollView style={styles.productContent}>
          <Image style={styles.image} source={{ uri: product.thumbnail }} />

          <View style={styles.details}>
            <View style={styles.detailsItem}>
              <Text style={styles.detailsLabel}>Nome:</Text>
              <Text style={styles.detailsValue}>{product.title}</Text>
            </View>
            <View style={styles.detailsItem}>
              <Text style={styles.detailsLabel}>Descrição:</Text>
              <Text style={styles.detailsValue}>{product.description}</Text>
            </View>
            <View style={styles.detailsItem}>
              <Text style={styles.detailsLabel}>Preço:</Text>
              <Text style={styles.detailsValue}>
                {formatCurrency(product.price)}
              </Text>
            </View>
            <View style={styles.detailsItem}>
              <Text style={styles.detailsLabel}>Porcentagem de desconto:</Text>
              <Text style={styles.detailsValue}>
                {product.discountPercentage + '%'}
              </Text>
            </View>
            <View style={styles.detailsItem}>
              <Text style={styles.detailsLabel}>Avaliação:</Text>
              <Text style={styles.detailsValue}>{product.rating}</Text>
            </View>
            <View style={styles.detailsItem}>
              <Text style={styles.detailsLabel}>Estoque:</Text>
              <Text style={styles.detailsValue}>{product.stock}</Text>
            </View>
            <View style={styles.detailsItem}>
              <Text style={styles.detailsLabel}>Marca:</Text>
              <Text style={styles.detailsValue}>{product.brand}</Text>
            </View>
            <View style={styles.detailsItem}>
              <Text style={styles.detailsLabel}>Categoria:</Text>
              <Text style={styles.detailsValue}>{product.category}</Text>
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#383838',
  },
  productContent: {
    width: '90%',
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  details: {
    marginTop: 25,
  },
  detailsItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: 5,
  },
  detailsLabel: {
    marginRight: 5,
    color: '#fff',
    fontSize: 16,
    fontFamily: 'InterSemiBold',
  },
  detailsValue: {
    flexShrink: 1,
    color: '#fff',
    fontFamily: 'InterMedium',
  },
});
