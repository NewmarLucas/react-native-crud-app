import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Header, ProductForm, RoundedButton } from '../components';
import { FormInterface } from '../helpers/types';
import { ModalContext } from '../providers/Modal';
import { LoadingContext } from '../providers/Loading';
import { useForm } from '../hooks/useForm';

const initialForm: FormInterface = {
  isValid: false,
  values: {
    title: '',
    description: '',
    price: '',
    discountPercentage: '',
    rating: '',
    stock: '',
    brand: '',
    category: '',
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

export default function Create() {
  const navigation = useNavigation();

  const { setShowModal } = useContext(ModalContext);
  const { setLoading } = useContext(LoadingContext);

  const { form, handleChange, setForm, handleTouch, getFieldError } = useForm({
    initialForm,
  });

  const handleCancel = () => {
    navigation.navigate('Welcome' as never);
  };

  const handleSave = () => {
    handleTouch();
    if (!form.isValid) return;

    setLoading(true);
    fetch('https://dummyjson.com/products/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.values),
    })
      .then((res) => res.json())
      .then((res) => {
        setLoading(false);
        if (res?.id) {
          setShowModal({
            msg: 'Cadastrado com sucesso!\n\nComo a API é só para simulação, o produto não será realmente adicionado ao servidor.',
            onOk: () => {
              setForm(initialForm);
            },
          });
          return;
        }
        setShowModal({
          msg: 'Oops... Algo deu errado ao cadastrar novo produto!',
        });
      })
      .catch(() => {
        setLoading(false);
        setShowModal({
          msg: 'Oops... Algo deu errado ao cadastrar novo produto!',
        });
      });
  };

  return (
    <View style={styles.container}>
      <Header text='Adicionar produto' showBackButton />

      <ProductForm
        form={form}
        handleChange={handleChange}
        getFieldError={getFieldError}
      />

      <View style={styles.buttonsContainer}>
        <RoundedButton action={handleSave} text='Adicionar' />
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
