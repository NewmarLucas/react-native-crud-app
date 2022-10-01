import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { EmptyList, Header, ListItem } from '../components';

interface DataInterface {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

const initialState = [
  {
    id: 1,
    title: 'iPhone 9',
    description: 'An apple mobile which is nothing like apple',
    price: 549,
    discountPercentage: 12.96,
    rating: 4.69,
    stock: 94,
    brand: 'Apple',
    category: 'smartphones',
    thumbnail: 'https://dummyjson.com/image/i/products/1/thumbnail.jpg',
    images: [
      'https://dummyjson.com/image/i/products/1/1.jpg',
      'https://dummyjson.com/image/i/products/1/2.jpg',
      'https://dummyjson.com/image/i/products/1/3.jpg',
      'https://dummyjson.com/image/i/products/1/4.jpg',
      'https://dummyjson.com/image/i/products/1/thumbnail.jpg',
    ],
  },
];

export default function Welcome() {
  const [data] = useState<DataInterface[]>(initialState);

  return (
    <View style={styles.container}>
      <Header text='Indice' />

      <View style={styles.listContainer}>
        <View style={styles.listTitleContainer}>
          <Text style={styles.listTitle}>Lista de produtos:</Text>
        </View>

        {data.length === 0 ? (
          <EmptyList text='Nenhum produto encontrado' />
        ) : (
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <ListItem
                key={item.id}
                title={item.title}
                seeMore={() => {}}
                editAction={() => {}}
                deleteAction={() => {}}
              />
            )}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#383838',
  },
  listContainer: {
    marginHorizontal: 16,
    width: '100%',
    marginTop: 30,
  },
  listTitleContainer: {
    width: '100%',
    alignItems: 'center',
  },
  listTitle: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'InterMedium',
  },
});