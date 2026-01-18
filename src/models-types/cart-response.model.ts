import { CartProduct } from './product-response.model';

export type CartItem = {
  id: string;
  quantity: number;
  discount_percentage: number | null;
  cart_id: string;
  product_id: string;
  product: CartProduct;
};

export type CartResponse = {
  id: string;
  cart_items: CartItem[];
  additional_discount_percentage: number | null;
  lat: string | null;
  lng: string | null;
};