import React, { useContext, useState } from 'react';
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import ImageViewer from 'react-native-image-zoom-viewer';
import { Header, RoundedButton } from '../components';
import { Rating } from 'react-native-ratings';
import { DataInterface } from '../helpers/types';
import { formatCurrency } from '../helpers/utils';
import { LoadingContext } from '../providers/Loading';
import { ModalContext } from '../providers/Modal';

export default function Details() {
  const route: RouteProp<{ params: { product: DataInterface } }, 'params'> =
    useRoute();
  const navigation = useNavigation();
  const { product } = route.params;

  const { setLoading } = useContext(LoadingContext);
  const { setShowModal } = useContext(ModalContext);
  const [showImageModal, setShowImageModal] = useState(false);
  const images = [
    { url: product.thumbnail },
    ...product.images.map((item: string) => ({ url: item })),
  ];

  const updateProduct = () => {
    navigation.navigate('Update' as never, { product } as never);
  };

  const verifyDeleteAction = () => {
    setShowModal({
      msg: `Tem certeza que deseja excluir o item: ${product.title}?`,
      onOk: () => {
        handleDeleteProduct();
      },
      onCancel: () => {},
    });
  };

  const handleDeleteProduct = () => {
    setLoading(true);
    fetch(`https://dummyjson.com/products/${product.id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((res) => {
        setLoading(false);
        if (res?.isDeleted) {
          setShowModal({
            msg: `O produto ${res?.title} foi deletado com sucesso!\n\nComo a API é só para simulação, esse produto não será realmente deletado do servidor.`,
            onOk: () => {
              navigation.navigate('Welcome' as never);
            },
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

  return (
    <View style={styles.container}>
      <Header text='Produto selecionado' showBackButton />

      {product && (
        <ScrollView style={styles.productContent}>
          <TouchableHighlight
            onPress={() => {
              setShowImageModal(true);
            }}
          >
            <Image style={styles.image} source={{ uri: product.thumbnail }} />
          </TouchableHighlight>
          <Modal visible={showImageModal} transparent={true}>
            <ImageViewer
              enableSwipeDown
              onSwipeDown={() => {
                setShowImageModal(false);
              }}
              saveToLocalByLongPress={false}
              imageUrls={images}
            />
          </Modal>

          <View style={styles.titleContainer}>
            <Text style={styles.productTitle}>{product.title}</Text>
            <Text style={styles.productDescription}>{product.description}</Text>
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
              <Text style={styles.detailsLabel}>Desconto:</Text>
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
          <View style={styles.buttonsContainer}>
            <RoundedButton action={updateProduct} text='Alterar' />
            <RoundedButton
              isDeleteButton
              action={verifyDeleteAction}
              text='Excluir'
            />
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
    fontSize: 22,
    fontFamily: 'InterBold',
  },
  productDescription: {
    color: '#fff',
    fontSize: 15,
    fontFamily: 'InterMedium',
    textAlign: 'center',
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
  buttonsContainer: {
    width: '100%',
    paddingVertical: 15,
    height: 165,
    justifyContent: 'space-evenly',
  },
});
