export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  is_location_offer: boolean;
  is_rental: boolean;
  co2_rating: string;
  in_stock: boolean;
  is_eco_friendly: boolean;
};

export type CartItem = {
  id: string;
  quantity: number;
  discount_percentage: number | null;
  cart_id: string;
  product_id: string;
  product: Product;
};

export type CartResponse = {
  id: string;
  cart_items: CartItem[];
  additional_discount_percentage: number | null;
  lat: string | null;
  lng: string | null;
};