import { Platform } from 'react-native';

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
