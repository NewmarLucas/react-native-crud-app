import { Platform } from 'react-native';
import { ShowModalInterface } from '../providers/Modal';
import { FormInterface } from './types';

export const formatCurrency = (value?: number) => {
  return Platform.OS === 'android'
    ? '$' +
        Number(value || 0)
          .toFixed(2)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    : Number(value || 0).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      });
};

export const isValidForm = (
  form: FormInterface,
  setShowModal: (
    value: React.SetStateAction<ShowModalInterface | undefined>
  ) => void
) => {
  let isValid = true;

  Object.values(form).forEach((item) => {
    if (item === '') {
      setShowModal({
        msg: 'Preencha todos os campos para continuar!',
      });
      isValid = false;
      return;
    }
  });

  return isValid;
};
