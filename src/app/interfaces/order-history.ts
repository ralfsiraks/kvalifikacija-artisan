import { OrderedProduct } from './ordered-product';

export interface OrderHistory {
  created_at: string;
  discount_id: number | null;
  id: number;
  user_id: number;
  ordered_products: OrderedProduct[];
}
