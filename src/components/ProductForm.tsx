import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { FormInterface } from '../helpers/types';
import { TextInputFilled } from './TextInputFilled';

interface Props {
  form: FormInterface;
  handleChange: (name: string, value: string) => void;
}

export function ProductForm(props: Props) {
  const { form, handleChange } = props;

  return (
    <ScrollView style={styles.form}>
      <TextInputFilled
        label='Título'
        value={form.title}
        onChangeText={(text) => {
          handleChange('title', text);
        }}
      />
      <TextInputFilled
        label='Descrição'
        value={form.description}
        onChangeText={(text) => {
          handleChange('description', text);
        }}
      />
      <TextInputFilled
        label='Preço'
        value={form.price}
        type='number-pad'
        onChangeText={(text) => {
          handleChange('price', text);
        }}
      />
      <TextInputFilled
        label='Porcentagem de desconto'
        value={form.discountPercentage}
        type='number-pad'
        onChangeText={(text) => {
          handleChange('discountPercentage', text);
        }}
      />
      <TextInputFilled
        label='Avaliação'
        value={form.rating}
        type='number-pad'
        onChangeText={(text) => {
          handleChange('rating', text);
        }}
      />
      <TextInputFilled
        label='Estoque'
        value={form.stock}
        type='number-pad'
        onChangeText={(text) => {
          handleChange('stock', text);
        }}
      />
      <TextInputFilled
        label='Marca'
        value={form.brand}
        onChangeText={(text) => {
          handleChange('brand', text);
        }}
      />
      <TextInputFilled
        label='Categoria'
        value={form.category}
        onChangeText={(text) => {
          handleChange('category', text);
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: {
    width: '90%',
  },
});
