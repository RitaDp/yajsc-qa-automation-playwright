export type ProductResponse = {
  id: string;
  name: string;
  description: string;
  stock: number;
  price: number;
  is_location_offer: boolean;
  is_rental: boolean;
  co2_rating: string;
  brand_id: string;
  category_id: string;
  product_image_id: string;
  in_stock: boolean;
  is_eco_friendly: boolean;
  product_image: {
    id: string;
    by_name: string;
    by_url: string;
    source_name: string;
    source_url: string;
    file_name: string;
    title: string;
  };
  category: {
    id: string;
    name: string;
    slug: string;
    parent_id: string;
  };
  brand: {
    id: string;
    name: string;
  };
};

export type ProductsResponse = {
  current_page: number;
  data: ProductResponse[];
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
};