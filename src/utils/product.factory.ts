import { randomUUID } from 'crypto';
import { MockProduct } from '../models-types/product-response.model';

export function factoryMethod (index: number): MockProduct {
  return {
    'id': `${randomUUID()}`,
    'in_stock': true,
    'name': `MOCK Sledgehammer ${index}`,
    'co2_rating': 'D',
    'price': 17.75,
    'product_image': {
      'id': `${randomUUID()}`, 
      'source_url': 'https://unsplash.com/photos/A9dq-L3zzHA',
      'file_name': 'hammer05.avif',
    }
  };
}

export function addMockProducts(count: number): MockProduct[] {
  const generatedProducts = [];
  
  for (let i = 0; i < count; i++) {
    const newProduct = factoryMethod(i+1);
    generatedProducts.push(newProduct);
  }
  return generatedProducts;
}