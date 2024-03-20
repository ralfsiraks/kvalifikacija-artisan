import { OrderedProduct } from './ordered-product';

export interface OrderHistory {
  created_at: string;
  discount_id: number | null;
  discount_amount: number;
  status: string;
  id: number;
  user_id: number;
  ordered_products: OrderedProduct[];
}
