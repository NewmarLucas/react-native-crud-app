import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { FormInterface } from '../helpers/types';
import { TextInputFilled } from './TextInputFilled';

interface Props {
  form: FormInterface;
  handleChange: (name: string, value: string) => void;
  getFieldError: (
    name:
      | 'title'
      | 'description'
      | 'price'
      | 'discountPercentage'
      | 'rating'
      | 'stock'
      | 'brand'
      | 'category'
  ) => string | undefined;
}

export function ProductForm(props: Props) {
  const { form, handleChange, getFieldError } = props;

  return (
    <ScrollView style={styles.form}>
      <TextInputFilled
        error={getFieldError('title')}
        label='Título'
        value={form.values.title}
        onChangeText={(text) => {
          handleChange('title', text);
        }}
      />
      <TextInputFilled
        error={getFieldError('description')}
        label='Descrição'
        value={form.values.description}
        onChangeText={(text) => {
          handleChange('description', text);
        }}
      />
      <TextInputFilled
        error={getFieldError('price')}
        label='Preço'
        value={form.values.price}
        type='number-pad'
        onChangeText={(text) => {
          handleChange('price', text);
        }}
      />
      <TextInputFilled
        error={getFieldError('discountPercentage')}
        label='Porcentagem de desconto'
        value={form.values.discountPercentage}
        type='number-pad'
        onChangeText={(text) => {
          handleChange('discountPercentage', text);
        }}
      />
      <TextInputFilled
        error={getFieldError('rating')}
        label='Avaliação'
        value={form.values.rating}
        type='number-pad'
        onChangeText={(text) => {
          handleChange('rating', text);
        }}
      />
      <TextInputFilled
        error={getFieldError('stock')}
        label='Estoque'
        value={form.values.stock}
        type='number-pad'
        onChangeText={(text) => {
          handleChange('stock', text);
        }}
      />
      <TextInputFilled
        error={getFieldError('brand')}
        label='Marca'
        value={form.values.brand}
        onChangeText={(text) => {
          handleChange('brand', text);
        }}
      />
      <TextInputFilled
        error={getFieldError('category')}
        label='Categoria'
        value={form.values.category}
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
