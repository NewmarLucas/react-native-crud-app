import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Header, RoundedButton, ProductForm } from '../components';
import { DataInterface, FormInterface } from '../helpers/types';
import { ModalContext } from '../providers/Modal';
import { isValidForm } from '../helpers/utils';
import { LoadingContext } from '../providers/Loading';

export default function Update() {
  const navigation = useNavigation();
  const route: RouteProp<{ params: { product: DataInterface } }, 'params'> =
    useRoute();
  const { product } = route.params;

  const { setShowModal } = useContext(ModalContext);
  const { setLoading } = useContext(LoadingContext);
  const [form, setForm] = useState<FormInterface>({
    title: product.title,
    description: product.description,
    price: product.price,
    discountPercentage: product.discountPercentage,
    rating: product.rating,
    stock: product.stock,
    brand: product.brand,
    category: product.category,
  });

  const handleChange = (name: string, value: string) => {
    setForm((form) => ({
      ...form,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    navigation.navigate('Welcome' as never);
  };

  const handleSave = () => {
    const isValid = isValidForm(form, setShowModal);
    if (!isValid) return;

    setLoading(true);
    fetch(`https://dummyjson.com/products/${product.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((res) => {
        setLoading(false);
        if (res?.id) {
          setShowModal({
            msg: 'Atualizado com sucesso!\n\nComo a API é só para simulação, o produto não terá seus dados alterados no servidor.',
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

      <ProductForm form={form} handleChange={handleChange} />

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
