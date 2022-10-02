import React, { useContext, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Header } from '../components';
import { FormInterface } from '../helpers/types';
import { ModalContext } from '../providers/Modal';
import { ProductForm } from '../components/ProductForm';

export default function Create() {
  const navigation = useNavigation();

  const { setShowModal } = useContext(ModalContext);
  const [form, setForm] = useState<FormInterface>({
    title: '',
    description: '',
    price: 0,
    discountPercentage: 0,
    rating: 0,
    stock: 0,
    brand: '',
    category: '',
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
      <Header text='Adicionar produto' showBackButton />

      <ProductForm form={form} handleChange={handleChange} />

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={{ ...styles.button, backgroundColor: '#19A0CB' }}
          onPress={handleSave}
        >
          <Text style={styles.textButton}>Adicionar</Text>
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
