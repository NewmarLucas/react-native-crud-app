import React, { useContext, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Header } from '../components';
import { DataInterface, FormInterface } from '../helpers/types';
import { ModalContext } from '../providers/Modal';
import { ProductForm } from '../components/ProductForm';
import { isValidForm } from '../helpers/utils';

export default function Update() {
  const navigation = useNavigation();
  const route: RouteProp<{ params: { product: DataInterface } }, 'params'> =
    useRoute();
  const { product } = route.params;

  const { setShowModal } = useContext(ModalContext);
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

    fetch(`https://dummyjson.com/products/${product.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((res) => {
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
      });
  };

  return (
    <View style={styles.container}>
      <Header text='Atualizar dados do produto' showBackButton />

      <ProductForm form={form} handleChange={handleChange} />

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={{ ...styles.button, backgroundColor: '#19A0CB' }}
          onPress={handleSave}
        >
          <Text style={styles.textButton}>Salvar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ ...styles.button, backgroundColor: '#E20C0C' }}
          onPress={handleCancel}
        >
          <Text style={styles.textButton}>Cancelar</Text>
        </TouchableOpacity>
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
  button: {
    width: '100%',

    borderRadius: 100,
    paddingVertical: 13,
  },
  textButton: {
    textAlign: 'center',
    color: '#fff',
    fontFamily: 'InterMedium',
    fontSize: 16,
  },
});
