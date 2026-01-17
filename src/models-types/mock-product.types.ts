export type MockProductResponse = {
  id: string;
  in_stock: boolean;
  name: string;
  co2_rating: string;
  price: number;
  product_image: { 
    id: string;
    source_url: string;
    file_name: string 
  };
};

export type MockProductsResponse = {
  current_page: number;
  data: MockProductResponse[];
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
};