import { DiscountCode } from './discount-code';
import { OrderedProduct } from './ordered-product';

export interface Order {
	id: number;
	user_id: number;
	created_at: string;
	discount_id: number;
	status: string;
	ordered_products: OrderedProduct[];
	discount_code: DiscountCode;
}
