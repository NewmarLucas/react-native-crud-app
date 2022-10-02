import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Header } from '../components';
import { Rating } from 'react-native-ratings';
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

          <View style={styles.titleContainer}>
            <Text style={styles.productTitle}>{product.title}</Text>
            <Text style={styles.detailsValue}>{product.description}</Text>
          </View>

          <View style={styles.ratingContainer}>
            <Rating
              ratingCount={5}
              startingValue={product.rating}
              type='custom'
              tintColor='#222'
              readonly
            />
          </View>

          <View style={styles.details}>
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
    backgroundColor: '#222',
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
  ratingContainer: {
    marginTop: 15,
  },
  titleContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  detailsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 5,
  },
  productTitle: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'InterBold',
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
    textAlign: 'center',
  },
});
