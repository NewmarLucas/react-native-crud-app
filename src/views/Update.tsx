import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Header, RoundedButton, ProductForm } from '../components';
import { DataInterface, FormInterface } from '../helpers/types';
import { ModalContext } from '../providers/Modal';
import { LoadingContext } from '../providers/Loading';
import { useForm } from '../hooks/useForm';

export default function Update() {
  const navigation = useNavigation();
  const route: RouteProp<{ params: { product: DataInterface } }, 'params'> =
    useRoute();
  const { product } = route.params;

  const initialForm: FormInterface = {
    isValid: false,
    values: {
      title: product.title,
      description: product.description,
      price: `${product.price}`,
      discountPercentage: `${product.discountPercentage}`,
      rating: `${product.rating}`,
      stock: `${product.stock}`,
      brand: product.brand,
      category: product.category,
    },
    touched: {
      title: false,
      description: false,
      price: false,
      discountPercentage: false,
      rating: false,
      stock: false,
      brand: false,
      category: false,
    },
    errors: {
      title: [],
      description: [],
      price: [],
      discountPercentage: [],
      rating: [],
      stock: [],
      brand: [],
      category: [],
    },
  };

  const { setShowModal } = useContext(ModalContext);
  const { setLoading } = useContext(LoadingContext);

  const { handleTouch, form, handleChange, getFieldError } = useForm({
    initialForm,
  });

  const handleCancel = () => {
    navigation.navigate('Welcome' as never);
  };

  const handleSave = () => {
    handleTouch();
    if (!form.isValid) return;

    setLoading(true);
    fetch(`https://dummyjson.com/products/${product.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.values),
    })
      .then((res) => res.json())
      .then((res) => {
        setLoading(false);
        if (res?.id) {
          setShowModal({
            msg: 'Atualizado com sucesso!\n\nComo a API ?? s?? para simula????o, o produto n??o ter?? seus dados alterados no servidor.',
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
      <Header text='Atualizar dados do produto' showBackButton />

      <ProductForm
        form={form}
        handleChange={handleChange}
        getFieldError={getFieldError}
      />

      <View style={styles.buttonsContainer}>
        <RoundedButton action={handleSave} text='Salvar' />
        <RoundedButton text='Cancelar' isDeleteButton action={handleCancel} />
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

  buttonsContainer: {
    width: '90%',
    height: 125,
    justifyContent: 'space-evenly',
  },
});
