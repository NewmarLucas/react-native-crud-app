import { useState, useEffect } from 'react';
import validate from 'validate.js';

import { FormInterface } from '../helpers/types';

// Este objeto (schema) seria passado como prop para atender diferentes formulários,
// mas como os dois formulários que usarão esta validação tem os mesmos campos,
// deixei ele fixo aqui para não repetir código.
const schema = {
  title: {
    presence: { allowEmpty: false, message: () => 'Este campo é obrigatório' },
  },
  description: {
    presence: { allowEmpty: false, message: () => 'Este campo é obrigatório' },
  },
  price: {
    presence: { allowEmpty: false, message: () => 'Este campo é obrigatório' },
    format: { pattern: '[0-9.]+', message: 'Digite somente números' },
  },
  discountPercentage: {
    presence: { allowEmpty: false, message: () => 'Este campo é obrigatório' },
    format: { pattern: '[0-9.]+', message: 'Digite somente números' },
  },
  rating: {
    presence: { allowEmpty: false, message: () => 'Este campo é obrigatório' },
    format: { pattern: '[0-9.]+', message: 'Digite somente números' },
  },
  stock: {
    presence: { allowEmpty: false, message: () => 'Este campo é obrigatório' },
    format: { pattern: '[0-9]+', message: 'Digite somente números' },
  },
  brand: {
    presence: { allowEmpty: false, message: () => 'Este campo é obrigatório' },
  },
  category: {
    presence: { allowEmpty: false, message: () => 'Este campo é obrigatório' },
  },
};

interface Props {
  initialForm: FormInterface;
}

export const useForm = (props: Props) => {
  const { initialForm } = props;
  const [form, setForm] = useState<FormInterface>(initialForm);

  const handleChange = (name: string, value: string | number) => {
    setForm((form) => ({
      ...form,
      values: {
        ...form.values,
        [name]: value,
      },
      touched: {
        ...form.touched,
        [name]: true,
      },
    }));
  };

  const handleTouch = () => {
    setForm((form) => ({
      ...form,
      touched: {
        title: true,
        description: true,
        price: true,
        discountPercentage: true,
        rating: true,
        stock: true,
        brand: true,
        category: true,
      },
    }));
  };

  useEffect(() => {
    if (!schema) return;

    const errors = validate(form.values, schema, { fullMessages: false });
    setForm((form) => ({
      ...form,
      isValid: !errors,
      errors: errors || [],
    }));
  }, [form.values, setForm, schema]);

  const getFieldError = (
    name:
      | 'title'
      | 'description'
      | 'price'
      | 'discountPercentage'
      | 'rating'
      | 'stock'
      | 'brand'
      | 'category'
  ) => {
    if (form.touched[name] && form.errors[name]) {
      return form.errors[name]?.[0];
    }

    return undefined;
  };

  return {
    form,
    handleChange,
    getFieldError,
    handleTouch,
    setForm,
  };
};
