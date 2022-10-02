import React, { useContext, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Header, TextInputFilled } from '../components';
import { DataInterface, FormInterface } from '../helpers/types';
import { formatCurrency } from '../helpers/utils';
import { ModalContext } from '../providers/Modal';
import { ProductForm } from '../components/ProductForm';

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
    Object.values(form).forEach((item) => {
      if (item === '') {
        setShowModal({
          msg: 'Preencha todos os campos para salvar!',
        });
        return;
      }
    });

    setShowModal({
      msg: 'Salvo!',
      onOk: () => {
        navigation.navigate('Welcome' as never);
      },
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
