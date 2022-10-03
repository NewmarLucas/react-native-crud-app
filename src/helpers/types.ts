export interface DataInterface {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface FormInterface {
  isValid: boolean;
  values: {
    title: string;
    description: string;
    price: string | number;
    discountPercentage: string | number;
    rating: string | number;
    stock: string | number;
    brand: string;
    category: string;
  };
  touched: {
    title: boolean;
    description: boolean;
    price: boolean;
    discountPercentage: boolean;
    rating: boolean;
    stock: boolean;
    brand: boolean;
    category: boolean;
  };
  errors: {
    title: string[] | undefined;
    description: string[] | undefined;
    price: string[] | undefined;
    discountPercentage: string[] | undefined;
    rating: string[] | undefined;
    stock: string[] | undefined;
    brand: string[] | undefined;
    category: string[] | undefined;
  };
}
