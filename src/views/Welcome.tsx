import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect, useContext } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { EmptyList, Header, ListItem, RoundedButton } from '../components';
import { DataInterface } from '../helpers/types';
import { LoadingContext } from '../providers/Loading';
import { ModalContext } from '../providers/Modal';

export default function Welcome() {
  const navigation = useNavigation();
  const { setLoading } = useContext(LoadingContext);
  const { setShowModal } = useContext(ModalContext);
  const [data, setData] = useState<DataInterface[]>([]);

  const seeProductDetails = (product: DataInterface) => {
    navigation.navigate('Details' as never, { product } as never);
  };

  const updateProduct = (product: DataInterface) => {
    navigation.navigate('Update' as never, { product } as never);
  };

  const createProduct = () => {
    navigation.navigate('Create' as never);
  };

  const handleDeleteProduct = (productId: number) => {
    setLoading(true);
    fetch(`https://dummyjson.com/products/${productId}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((res) => {
        setLoading(false);
        if (res?.isDeleted) {
          setShowModal({
            msg: `O produto ${res?.title} foi deletado com sucesso!\n\nComo a API é só para simulação, esse produto não será realmente deletado do servidor.`,
          });
          return;
        }
        setShowModal({
          msg: 'Oops... Algo deu errado ao atualizar os dados do produto!',
        });
      })
      .catch(() => {
        setLoading(false);
        setShowModal({
          msg: 'Oops... Algo deu errado ao atualizar os dados do produto!',
        });
      });
  };

  const getData = () => {
    fetch('https://dummyjson.com/products?limit=10')
      .then((res) => res.json())
      .then((res) => {
        setData(res?.products);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <Header text='Indice' />

      <View style={styles.listContainer}>
        <View style={styles.listTitleContainer}>
          <Text style={styles.listTitle}>Lista de produtos</Text>
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
                seeMore={() => {
                  seeProductDetails(item);
                }}
                editAction={() => {
                  updateProduct(item);
                }}
                deleteAction={() => {
                  handleDeleteProduct(item.id);
                }}
              />
            )}
          />
        )}
      </View>
      <View style={styles.buttonContainer}>
        <RoundedButton action={createProduct} text='Cadastrar novo' />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#222',
  },
  listContainer: {
    height: '65%',
    marginHorizontal: 16,
    width: '100%',
    marginTop: 15,
  },
  listTitleContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
  },
  listTitle: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'InterMedium',
  },
  buttonContainer: {
    width: '90%',
    height: 75,
    justifyContent: 'center',
  },
});
