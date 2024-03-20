import { Product } from './product';

export interface OrderedProduct {
  id: number;
  order_id: number;
  price: number;
  product_id: number;
  product: Product;
}
